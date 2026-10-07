const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

let passCount = 0;
let failCount = 0;

function assert(condition, message, details = '') {
  if (condition) {
    console.log(`[PASS] ${message} ${details ? '--> ' + details : ''}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message} ${details ? '--> ' + details : ''}`);
    failCount++;
  }
}

function get(urlPath) {
  return new Promise((resolve, reject) => {
    function fetchUrl(target) {
      http.get(target, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : `${BASE_URL}${res.headers.location}`;
          fetchUrl(redirectUrl);
          return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }).on('error', reject);
    }
    fetchUrl(`${BASE_URL}${urlPath}`);
  });
}

async function run() {
  console.log('============================================================');
  console.log('  PHASE 3D.8-FINAL — TEACHINGS EXPERIENCE FORENSIC QA AUDIT');
  console.log('============================================================\n');

  // --- 1. PRE-FLIGHT REPOSITORY AND INVARIANT CHECKS ---
  console.log('--- 1. PRE-FLIGHT REPOSITORY & DATA CHECKS ---');
  
  const explorerPath = path.join(__dirname, '../src/components/TeachingsArchiveExplorer.tsx');
  const explorerContent = fs.readFileSync(explorerPath, 'utf8');
  assert(!explorerContent.includes('<code>canonical-') && !explorerContent.includes('canonical-00'), 'TeachingsArchiveExplorer has no raw canonical ID leakage');

  const pagePath = path.join(__dirname, '../src/app/teachings/page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  assert(!/canonical-\d{6}/.test(pageContent), 'teachings/page.tsx contains no raw canonical ID pattern');
  assert(pageContent.includes('SPOTIFY_SERIES_MAP'), 'teachings/page.tsx contains verified SPOTIFY_SERIES_MAP');
  assert(pageContent.includes('OFFICIAL_PODCAST_URL'), 'teachings/page.tsx contains OFFICIAL_PODCAST_URL');

  const detailPath = path.join(__dirname, '../src/app/teachings/[id]/page.tsx');
  const detailContent = fs.readFileSync(detailPath, 'utf8');
  assert(!/canonical-\d{6}/.test(detailContent), 'teachings/[id]/page.tsx contains no raw canonical ID pattern');
  assert(detailContent.includes('DetailVideoDesk'), 'teachings/[id]/page.tsx integrates DetailVideoDesk');
  assert(detailContent.includes('DetailAudioController'), 'teachings/[id]/page.tsx integrates DetailAudioController');

  // --- 2. CANONICAL CATEGORIES & EXCLUSIONS AUDIT ---
  console.log('\n--- 2. CANONICAL CATEGORIES & EXCLUSIONS AUDIT ---');
  const teachingsData = fs.readFileSync(path.join(__dirname, '../src/data/teachings.ts'), 'utf8');
  const expectedCategories = [
    'bhagavad-gita',
    'upanishads',
    'prakarana-granth',
    'meditation',
    'chanting',
    'devotional',
    'inspiring-stories'
  ];
  expectedCategories.forEach(cat => {
    assert(teachingsData.includes(`id: '${cat}'`), `Category '${cat}' correctly declared in CANONICAL_CATEGORIES`);
  });

  const videoArchiveData = fs.readFileSync(path.join(__dirname, '../src/data/videoArchive.ts'), 'utf8');
  assert(videoArchiveData.includes('"canonicalId": "canonical-000786"') && videoArchiveData.includes('"visibility": "EXCLUDED"'), 'canonical-000786 is correctly excluded in videoArchive.ts');

  // --- 3. ARCHIVE EXPLORER DATASETS ---
  console.log('\n--- 3. ARCHIVE EXPLORER DATASETS ---');
  const audioArchiveData = fs.readFileSync(path.join(__dirname, '../src/data/audioArchive.ts'), 'utf8');
  const audioMatch = audioArchiveData.match(/export const CANONICAL_AUDIO_ARCHIVE: CanonicalAudioEntity\[\] = (\[[\s\S]*?\n\];)/);
  if (audioMatch) {
    const audioList = JSON.parse(audioMatch[1].replace(/;\s*$/, ''));
    assert(audioList.length === 330, 'CANONICAL_AUDIO_ARCHIVE exact count is 330', `Actual: ${audioList.length}`);
  }

  const videoMatch = videoArchiveData.match(/export const CANONICAL_VIDEO_ARCHIVE: CanonicalVideoEntity\[\] = (\[[\s\S]*?\n\];)/);
  if (videoMatch) {
    const videoList = JSON.parse(videoMatch[1].replace(/;\s*$/, ''));
    const publicVideos = videoList.filter(v => v.visibility !== 'EXCLUDED');
    assert(publicVideos.length === 404, 'publicVideoArchive exact count is 404', `Actual: ${publicVideos.length}`);
  }

  // --- 4. HTTP ROUTE AUDIT (LIVE DEV SERVER) ---
  console.log('\n--- 4. HTTP ROUTE AUDIT ---');
  const routesToTest = [
    { url: '/teachings/', label: 'Teachings Main Page', expectedText: 'Jnana Ganga' },
    { url: '/teachings/drig-drushya-viveka-01/', label: 'Prakarana Granth (Drig Drushya Viveka)', expectedText: 'Drig Drushya Viveka' },
    { url: '/teachings/drig-drushya-viveka/', label: 'Slug Alias Resolution (drig-drushya-viveka)', expectedText: 'Drig Drushya Viveka' },
    { url: '/teachings/gita-ch03/', label: 'Bhagavad Gita (Chapter 3)', expectedText: 'Karma Yoga' },
    { url: '/teachings/gita-chapter-03/', label: 'Slug Alias Resolution (gita-chapter-03)', expectedText: 'Karma Yoga' },
    { url: '/teachings/upanishad-kena-01/', label: 'Upanishad (Kenopanishad Audio)', expectedText: 'Kenopanishad' },
    { url: '/teachings/meditation-dhyana-01/', label: 'Meditation (Session 1: Turning Within)', expectedText: 'Vedantic Meditation' },
    { url: '/teachings/chanting-gita-dhyanam-01/', label: 'Chanting (Gita Dhyanam)', expectedText: 'Gita Dhyanam' },
    { url: '/teachings/hanuman-chalisa-short/', label: 'Devotional (Hanuman Chalisa)', expectedText: 'Hanuman Chalisa' },
    { url: '/teachings/vedanta-satsang-collection/', label: 'Inspiring Stories / Satsang', expectedText: 'Vedanta Satsang' },
    { url: '/learn/tattva-bodha/', label: 'Tattva Bodha Gateway Destination', expectedText: 'Tattva Bodha' }
  ];

  for (const r of routesToTest) {
    try {
      const res = await get(r.url);
      assert(res.status === 200, `${r.label} HTTP 200`, `Status: ${res.status}`);
      assert(res.body.includes(r.expectedText), `${r.label} content verified`, `Contains: "${r.expectedText}"`);
    } catch (e) {
      assert(false, `${r.label} HTTP Request Failed`, e.message);
    }
  }

  // --- 5. SEARCH & FILTER INTEGRITY ---
  console.log('\n--- 5. SEARCH & FILTER ORDERING INVARIANTS ---');
  const matchTeachings = teachingsData.match(/export const teachings: Teaching\[\] = (\[[\s\S]*?\n\];)/);
  if (matchTeachings) {
    const list = JSON.parse(matchTeachings[1].replace(/;\s*$/, ''));
    const gitaResults = list.filter(t => 
      t.title.toLowerCase().includes('gita') || 
      t.scripture.toLowerCase().includes('gita') ||
      t.description.toLowerCase().includes('gita')
    );
    assert(gitaResults.length > 0, 'Known "gita" query matches records', `Count: ${gitaResults.length}`);
    assert(gitaResults[0].title.toLowerCase().includes('gita') || gitaResults[0].scripture.toLowerCase().includes('gita'), 'First "gita" result is scripture/title matched');
  }

  console.log(`\n============================================================`);
  console.log(`AUDIT COMPLETE: ${passCount} PASSED, ${failCount} FAILED.`);
  console.log(`============================================================\n`);

  process.exit(failCount > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Audit crashed with error:', err);
  process.exit(1);
});
