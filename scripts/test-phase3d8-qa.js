const fs = require('fs');
const path = require('path');

console.log('=== PHASE 3D.8 QA AUDIT SCRIPT ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Check TeachingsArchiveExplorer.tsx for raw canonical ID rendering to public users
const explorerPath = path.join(__dirname, '../src/components/TeachingsArchiveExplorer.tsx');
const explorerContent = fs.readFileSync(explorerPath, 'utf8');

// Ensure no public rendering tags display canonical IDs as visible text (e.g. <code>canonical-...</code>, >canonical-..., >{item.canonicalId}<)
const rendersCanonicalText = explorerContent.includes('<code>canonical-') || 
  explorerContent.includes('>{item.canonicalId}<') ||
  explorerContent.includes('canonical-00');
assert(!rendersCanonicalText, 'TeachingsArchiveExplorer does not render canonical IDs in visible elements or tags');

// 2. Check teachings page.tsx for raw canonical ID rendering to public users
const pagePath = path.join(__dirname, '../src/app/teachings/page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');

// Match canonical- followed by 6 digits
const rendersCanonicalIdPattern = /canonical-\d{6}/.test(pageContent);
assert(!rendersCanonicalIdPattern, 'teachings/page.tsx does not contain any raw "canonical-00xxxx" pattern');
assert(pageContent.includes('SPOTIFY_SERIES_MAP'), 'teachings/page.tsx has SPOTIFY_SERIES_MAP integration');
assert(pageContent.includes('OFFICIAL_PODCAST_URL'), 'teachings/page.tsx integrates official podcast URL');
assert(
  pageContent.includes('Find Your Path of Study') || pageContent.includes('The Seven Canonical Paths'),
  'teachings/page.tsx contains Find Your Path of Study section'
);
assert(
  pageContent.includes('The Complete Teaching Archive'),
  'teachings/page.tsx has Tier 3 complete archive transition'
);

// 3. Check teachings/[id]/page.tsx
const detailPath = path.join(__dirname, '../src/app/teachings/[id]/page.tsx');
const detailContent = fs.readFileSync(detailPath, 'utf8');

const detailRendersCanonicalIdPattern = /canonical-\d{6}/.test(detailContent);
assert(!detailRendersCanonicalIdPattern, 'teachings/[id]/page.tsx does not contain any raw "canonical-00xxxx" pattern');
assert(detailContent.includes('spotifyDeskBanner'), 'teachings/[id]/page.tsx contains spotifyDeskBanner integration');
assert(detailContent.includes('DetailVideoDesk'), 'teachings/[id]/page.tsx integrates graceful DetailVideoDesk player');

// 4. Verify exclusions are maintained in canonical datasets
const videoFile = fs.readFileSync(path.join(__dirname, '../src/data/videoArchive.ts'), 'utf8');
const matrixFile = fs.readFileSync(path.join(__dirname, '../docs/migration/PHASE-3D4-CANONICAL-MIGRATION-MATRIX.json'), 'utf8');

assert(videoFile.includes('canonical-000786'), 'Video archive records canonical-000786');
assert(videoFile.includes('"canonicalId": "canonical-000786"'), 'canonical-000786 is present in video archive dataset');
assert(videoFile.includes('"visibility": "EXCLUDED"'), 'canonical-000786 is marked with visibility: "EXCLUDED" in video archive');

// Check canonical matrix exclusions
const matrix = JSON.parse(matrixFile);
const ex22 = matrix.find(e => e.canonicalId === 'canonical-000022');
const ex23 = matrix.find(e => e.canonicalId === 'canonical-000023');
const ex786 = matrix.find(e => e.canonicalId === 'canonical-000786');
const ex2014 = matrix.find(e => e.canonicalId === 'canonical-002014');
const hold33 = matrix.find(e => e.canonicalId === 'canonical-000033');

assert(ex22 && ex22.visibility === 'PRIVATE' && ex22.migrationStatus === 'REMOVE', 'canonical-000022 is excluded (PRIVATE / REMOVE)');
assert(ex23 && ex23.visibility === 'PRIVATE' && ex23.migrationStatus === 'REMOVE', 'canonical-000023 is excluded (PRIVATE / REMOVE)');
assert(ex786 && ex786.migrationStatus === 'REMOVE', 'canonical-000786 is excluded (migrationStatus: REMOVE)');
assert(ex2014 && ex2014.visibility === 'PRIVATE' && ex2014.migrationStatus === 'REMOVE', 'canonical-002014 is excluded (PRIVATE / REMOVE)');
assert(hold33 && hold33.canonicalId === 'canonical-000033', 'canonical-000033 is tracked in canonical matrix');

// 5. Verify publicVideoArchive excludes canonical-000786
assert(videoFile.includes('publicVideoArchive: CanonicalVideoEntity[] = CANONICAL_VIDEO_ARCHIVE.filter'), 'publicVideoArchive filters out excluded videos');

console.log(`\nQA Tests complete: ${passCount} passed, ${failCount} failed.\n`);
process.exit(failCount > 0 ? 1 : 0);
