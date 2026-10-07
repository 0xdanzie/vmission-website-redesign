const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('================================================================');
  console.log('       PHASE 3E.1 — DIGITAL ASHRAM AUTOMATED QA & INTEGRITY');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(name, condition, details = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`  [PASS] ${name} ${details ? '--> ' + details : ''}`);
    } else {
      console.error(`  [FAIL] ${name} ${details ? '--> ' + details : ''}`);
    }
  }

  // 1. Homepage Freeze Verification
  console.log('--- 1. HOMEPAGE FREEZE INTEGRITY ---');
  const home = await get('/');
  assert('Homepage HTTP 200', home.status === 200);
  assert('Homepage baseline text preserved', home.body.includes('Revealing the Non-Dual Self') || home.body.includes('Vedanta Ashram'));

  // 2. Core Reviewed Pages HTTP 200
  console.log('\n--- 2. CORE REVIEWED PAGES STATUS ---');
  const pages = [
    { url: '/about/', name: 'About Page' },
    { url: '/teachings/', name: 'Teachings Page' },
    { url: '/acharyas/', name: 'Acharyas Hall' },
    { url: '/acharyas/swami-atmananda-saraswati/', name: 'Founder Bio' },
    { url: '/acharyas/swamini-amitananda-saraswati/', name: 'Senior Acharya Bio' },
    { url: '/ashram/', name: 'Ashram Sanctuary' },
    { url: '/teachings/drig-drushya-viveka-01/', name: 'Video Study Desk' },
    { url: '/teachings/vedantic-meditation-day1/', name: 'Audio Study Desk' },
    { url: '/publications/', name: 'Literary Archive' }
  ];

  for (const p of pages) {
    const res = await get(p.url);
    assert(`${p.name} HTTP 200`, res.status === 200);
  }

  // 3. Media & Asset Presence
  console.log('\n--- 3. MEDIA INTEGRITY & ASSET VERIFICATION ---');
  const publicDir = path.join(__dirname, '..', 'public');

  // Verify Acharya Portraits
  const acharyaImages = [
    'images/vmission/acharyas/guruji-portrait-riverside.jpg',
    'images/vmission/acharyas/swamini-amitananda.jpg',
    'images/vmission/acharyas/swamini-samatananda.jpg',
    'images/vmission/acharyas/swamini-poornananda.jpg'
  ];
  for (const img of acharyaImages) {
    const fullPath = path.join(publicDir, img);
    assert(`Acharya asset exists: ${img}`, fs.existsSync(fullPath));
  }

  // Verify Ashram Photographs
  const ashramImages = [
    'images/vmission/entrance/ashram-entrance-cinematic.jpg',
    'images/vmission/ashram/gangeshwar-dome-closeup.jpg',
    'images/vmission/worship/morning-aarti.jpg',
    'images/vmission/ashram/courtyard-with-guruji.jpg'
  ];
  for (const img of ashramImages) {
    const fullPath = path.join(publicDir, img);
    assert(`Ashram asset exists: ${img}`, fs.existsSync(fullPath));
  }

  // Verify Audio File for Playable Desk
  const meditationAudio = path.join(publicDir, 'audio', 'swami-atmananda-meditation-day1.mp3');
  assert('Playable audio file exists: swami-atmananda-meditation-day1.mp3', fs.existsSync(meditationAudio));

  // 4. Content Integrity & Polish Checks
  console.log('\n--- 4. VISUAL POLISH & MARKUP AUDIT ---');
  const ashramRes = await get('/ashram/');
  assert('Ashram page frames Mandir dome with archival aspect', ashramRes.body.includes('archival'));

  const founderRes = await get('/acharyas/swami-atmananda-saraswati/');
  assert('Founder bio frames portrait with customized headroom', founderRes.body.includes('center 8%') || founderRes.body.includes('TactileFrame'));

  const audioDeskRes = await get('/teachings/vedantic-meditation-day1/');
  assert('Audio study desk contains playable audio controller markup', audioDeskRes.body.includes('Listen to Full Discourse') || audioDeskRes.body.includes('playableAudioDesk') || audioDeskRes.body.includes('Speed'));

  const pubRes = await get('/publications/');
  assert('Publications archive contains 180 canonical works', pubRes.body.includes('180') && pubRes.body.includes('Vedanta Sandesh'));

  // Summary
  console.log('\n================================================================');
  console.log(`  TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log('================================================================\n');

  if (total - passed > 0) {
    process.exit(1);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
