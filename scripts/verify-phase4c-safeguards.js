const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');
const { resolvePublicationCover, isTattvaBodhaAsset } = require('../src/lib/media-identity.ts');

console.log('====================================================');
console.log('PHASE 4C FORENSIC SAFEGUARD VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// -----------------------------------------------------------------------------
// SAFEGUARD 1 & 2: Hero Visual Anchor Verification
// -----------------------------------------------------------------------------
console.log('--- Safeguard 1 & 2: Events and Learn Hero Image Verification ---');

const eventsHeroPath = path.resolve('public/images/vmission/community/residential-camp-gathering.jpg');
const learnHeroPath = path.resolve('public/images/vmission/ashram/teaching-hall-interior.jpg');

assert(fs.existsSync(eventsHeroPath), 'Events hero image exists on disk: residential-camp-gathering.jpg');
assert(fs.existsSync(learnHeroPath), 'Learn hero image exists on disk: teaching-hall-interior.jpg');

function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 0;
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    while (i < buffer.length) {
      if (buffer[i] === 0xff && (buffer[i+1] === 0xc0 || buffer[i+1] === 0xc2)) {
        const height = buffer.readUInt16BE(i + 5);
        const width = buffer.readUInt16BE(i + 7);
        return { width, height };
      }
      i++;
    }
  }
  return { width: 0, height: 0 };
}

const eventsDims = getJpegDimensions(eventsHeroPath);
assert(eventsDims.width === 706 && eventsDims.height === 524, `Events hero exact dimensions verified (706x524): received ${eventsDims.width}x${eventsDims.height}`);

const learnDims = getJpegDimensions(learnHeroPath);
assert(learnDims.width === 706 && learnDims.height === 471, `Learn hero exact dimensions verified (706x471): received ${learnDims.width}x${learnDims.height}`);

const learnPageContent = fs.readFileSync('src/app/learn/page.tsx', 'utf8');
assert(learnPageContent.includes('/images/vmission/ashram/teaching-hall-interior.jpg'), 'Learn page references verified teaching-hall-interior.jpg');
assert(!learnPageContent.includes('Restored Vedantic manuscripts'), 'Learn page does not contain false manuscript claims in alt text');
assert(learnPageContent.includes('Vyasapeeth'), 'Learn page truthfully attributes Vyasapeeth');

// -----------------------------------------------------------------------------
// SAFEGUARD 3: Tattva Bodha Isolation & Scoping
// -----------------------------------------------------------------------------
console.log('\n--- Safeguard 3: Tattva Bodha Isolation & Scoping ---');

const tbResolvers = PUBLICATIONS.filter(p => {
  const resolved = resolvePublicationCover(p.id, p.type, p.coverImage);
  return resolved && resolved.includes('study-text-tb-mula.jpg');
});

assert(tbResolvers.length === 1, `Exactly 1 publication resolves study-text-tb-mula.jpg: found ${tbResolvers.length}`);
assert(tbResolvers[0].id === 'book-000353', `study-text-tb-mula.jpg is strictly scoped to book-000353 (received ${tbResolvers[0]?.id})`);

const st404 = PUBLICATIONS.find(p => p.id === 'study-text-000404');
assert(st404 && (st404.coverImage === null || st404.coverImage === undefined), 'study-text-000404 coverImage is unmapped (null) to prevent leakage');

const leakAttempts = [
  resolvePublicationCover('upanishad-01', 'Study & Chant Texts', '/images/vmission/publications/study-text-tb-mula.jpg'),
  resolvePublicationCover('vs-2022-jan', 'Vedanta Sandesh', '/images/vmission/publications/study-text-tb-mula.jpg'),
  resolvePublicationCover('vp-2021-may', 'Vedanta Piyush', '/images/vmission/publications/study-text-tb-mula.jpg'),
  resolvePublicationCover('random-ebook', 'E-Books', '/images/vmission/publications/study-text-tb-mula.jpg'),
  resolvePublicationCover('study-text-000404', 'Study & Chant Texts', '/images/vmission/publications/study-text-tb-mula.jpg')
];

assert(leakAttempts.every(res => res === null), 'Cross-entity resolution attempts of study-text-tb-mula.jpg return null');

// -----------------------------------------------------------------------------
// SAFEGUARD 4: Audit Trail Preservation
// -----------------------------------------------------------------------------
console.log('\n--- Safeguard 4: Audit Trail Preservation ---');

const trail = JSON.parse(fs.readFileSync('publication_audit_trail.json', 'utf8'));
assert(trail.length === 250, `Audit trail contains all 250 canonical publications (found ${trail.length})`);

const st404Trail = trail.find(t => t.entityId === 'study-text-000404');
assert(st404Trail !== undefined, 'Audit trail records study-text-000404');
assert(st404Trail?.previousMediaPath === '/images/vmission/publications/study-text-tb-mula.jpg', 'Audit trail records previousMediaPath for study-text-000404');
assert(st404Trail?.reasonRemoved && st404Trail.reasonRemoved.includes('Safeguard 3'), 'Audit trail records reasonRemoved citing Safeguard 3');
assert(st404Trail?.replacementState === null, 'Audit trail records replacementState as null for study-text-000404');
assert(st404Trail?.verificationStatus === 'REPLACED_WITH_EDITORIAL_PLACEHOLDER', 'Audit trail records REPLACED_WITH_EDITORIAL_PLACEHOLDER');

const b353Trail = trail.find(t => t.entityId === 'book-000353');
assert(b353Trail !== undefined, 'Audit trail records book-000353');
assert(b353Trail?.replacementState === '/images/vmission/publications/study-text-tb-mula.jpg', 'Audit trail records replacementState as study-text-tb-mula.jpg for book-000353');
assert(b353Trail?.verificationStatus === 'VERIFIED', 'Audit trail records book-000353 as VERIFIED');

// -----------------------------------------------------------------------------
// SAFEGUARD 5 & 6: Entity-Derived Editorial Placeholders
// -----------------------------------------------------------------------------
console.log('\n--- Safeguard 5 & 6: Dynamic Editorial Placeholder Validation ---');

const placeholderCode = fs.readFileSync('src/components/PublicationPlaceholder.tsx', 'utf8');
assert(placeholderCode.includes("case 'Vedanta Sandesh':"), 'Placeholder supports Vedanta Sandesh');
assert(placeholderCode.includes("seriesName = 'VEDANTA SANDESH'"), 'Placeholder derives VEDANTA SANDESH label');
assert(placeholderCode.includes("case 'Vedanta Piyush':"), 'Placeholder supports Vedanta Piyush');
assert(placeholderCode.includes("seriesName = 'VEDANTA PIYUSH'"), 'Placeholder derives VEDANTA PIYUSH label');
assert(placeholderCode.includes("case 'E-Books':"), 'Placeholder supports E-Books');
assert(placeholderCode.includes("seriesName = 'CANONICAL E-BOOK'"), 'Placeholder derives CANONICAL E-BOOK label');
assert(placeholderCode.includes("case 'Study & Chant Texts':"), 'Placeholder supports Study & Chant Texts');
assert(placeholderCode.includes("seriesName = 'ARCHIVAL SANSKRIT TEXT'"), 'Placeholder derives ARCHIVAL SANSKRIT TEXT label');

// -----------------------------------------------------------------------------
// SAFEGUARD 7: Event Focal Point Inspection
// -----------------------------------------------------------------------------
console.log('\n--- Safeguard 7: Event Focal Point Inspection ---');

const eventsPageCode = fs.readFileSync('src/app/events/page.tsx', 'utf8');
assert(eventsPageCode.includes("src: '/images/vmission/ashram/teaching-hall-interior.jpg'") && eventsPageCode.includes("focalPoint: { x: 50, y: 40 }"), 'Epoch 2026 focal point verified: x: 50, y: 40');
assert(eventsPageCode.includes("src: '/images/vmission/ashram/gangeshwar-dome-closeup.jpg'") && eventsPageCode.includes("focalPoint: { x: 50, y: 15 }"), 'Epoch 2024-2025 focal point verified: x: 50, y: 15');
assert(eventsPageCode.includes("src: '/images/vmission/events/rotary-club-mumbai-talk.jpg'") && eventsPageCode.includes("focalPoint: { x: 50, y: 24 }"), 'Epoch 2021-2023 focal point verified: x: 50, y: 24');
assert(eventsPageCode.includes("src: '/images/vmission/events/advaita-congress-moscow.jpg'") && eventsPageCode.includes("focalPoint: { x: 40, y: 22 }"), 'Epoch legacy focal point verified: x: 40, y: 22');

// -----------------------------------------------------------------------------
// SAFEGUARD 8: Source Media Preservation
// -----------------------------------------------------------------------------
console.log('\n--- Safeguard 8: Source Media Asset Preservation ---');

const sourceAssetsToCheck = [
  'public/images/vmission/publications/study-text-tb-mula.jpg',
  'public/images/vmission/publications/study-text-tb-vyakhya.jpg',
  'public/images/vmission/publications/study-text-ab-mula.jpg',
  'public/images/vmission/publications/study-text-ddv-mula.jpg',
  'public/images/vmission/publications/study-text-upadesha-saram.jpg',
  'public/images/vmission/ashram/teaching-hall-interior.jpg',
  'public/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
  'public/images/vmission/community/residential-camp-gathering.jpg',
  'public/images/vmission/events/rotary-club-mumbai-talk.jpg',
  'public/images/vmission/events/advaita-congress-moscow.jpg',
  'public/images/vmission/events/bandra-talk-2010.jpg'
];

sourceAssetsToCheck.forEach(assetPath => {
  assert(fs.existsSync(path.resolve(assetPath)), `Source media asset preserved on disk: ${assetPath}`);
});

console.log('\n====================================================');
console.log(`SAFEGUARD VERIFICATION COMPLETE: ${passedTests} / ${totalTests} PASSED`);
console.log('====================================================');
