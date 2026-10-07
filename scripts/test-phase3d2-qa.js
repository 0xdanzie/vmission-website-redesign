const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const qaDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-3d2');
if (!fs.existsSync(qaDir)) {
  fs.mkdirSync(qaDir, { recursive: true });
}

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function captureScreenshot(url, filename) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outFile = path.join(qaDir, filename);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --window-size=1440,1080 --screenshot="${outFile}" "${url}"`;
    execSync(cmd, { stdio: 'ignore', timeout: 15000 });
    if (fs.existsSync(outFile)) {
      console.log(`  [SCREENSHOT CAPTURED] ${filename} (${fs.statSync(outFile).size} bytes)`);
      return true;
    }
  } catch (e) {
    console.error(`  [SCREENSHOT ERROR] ${filename}:`, e.message);
  }
  return false;
}

async function run() {
  console.log('================================================================');
  console.log('       PHASE 3D.2 — MASTER ARCHIVE RECONCILIATION QA AUDIT');
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

  // 1. Publications page loads
  const pubPage = await get('/publications');
  assert('Publications Page HTTP 200', pubPage.status === 200);

  // 2. Sandesh Issue Audits
  console.log('\n--- AUDITING REPRESENTATIVE VEDANTA SANDESH ISSUES ---');
  // Recent: August 2026
  assert('Sandesh Aug 2026 Title present', pubPage.body.includes('Vedanta Sandesh — August 2026'));
  assert('Sandesh Aug 2026 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vs-2026-aug-cover.jpg'));
  assert('Sandesh Aug 2026 Download link present', pubPage.body.includes('https://archive.org/download/vedantasandesh_aug2026/VedantaSandesh_Aug2026.pdf'));

  // 2024: January 2024
  assert('Sandesh Jan 2024 Title present', pubPage.body.includes('Vedanta Sandesh — January 2024'));
  assert('Sandesh Jan 2024 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vs-2024-jan-cover.jpg'));
  assert('Sandesh Jan 2024 Download link present', pubPage.body.includes('https://archive.org/download/vedanta-sandesh-jan-24/VedantaSandesh_Jan%2024.pdf'));

  // 2022: June 2022
  assert('Sandesh Jun 2022 Title present', pubPage.body.includes('Vedanta Sandesh — June 2022'));
  assert('Sandesh Jun 2022 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vs-2022-jun-cover.jpg'));
  assert('Sandesh Jun 2022 Download link present', pubPage.body.includes('https://archive.org/download/vedanta-sandesh-june-2022/Vedanta%20Sandesh_June%202022.pdf'));

  // 2020: January 2020
  assert('Sandesh Jan 2020 Title present', pubPage.body.includes('Vedanta Sandesh — January 2020'));
  assert('Sandesh Jan 2020 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vs-2020-jan-cover.jpg'));
  assert('Sandesh Jan 2020 Download link present', pubPage.body.includes('https://drive.google.com/open?id=1Xfegk7ZQXMVWZNnI-GCmz3Pu-Kz-DQPD'));

  // Zero September 2026 Sandesh
  assert('Zero September 2026 Sandesh in DOM', !pubPage.body.includes('Vedanta Sandesh — September 2026') && !pubPage.body.includes('pub-vsd-2026-09'));

  // 3. Piyush Issue Audits
  console.log('\n--- AUDITING REPRESENTATIVE VEDANTA PIYUSH ISSUES ---');
  // Recent: July 2026
  assert('Piyush Jul 2026 Title present', pubPage.body.includes('Vedanta Piyush — July 2026'));
  assert('Piyush Jul 2026 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vp-2026-jul-cover.jpg'));
  assert('Piyush Jul 2026 Download link present', pubPage.body.includes('https://archive.org/download/vedantapiyush_july26/Vedanta%20Piyush_July26.pdf'));

  // 2024: March 2024
  assert('Piyush Mar 2024 Title present', pubPage.body.includes('Vedanta Piyush — March 2024'));
  assert('Piyush Mar 2024 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vp-2024-mar-cover.jpg'));
  assert('Piyush Mar 2024 Download link present', pubPage.body.includes('https://archive.org/download/vedanta-piyush-mar-24/VedantaPiyush_Mar24.pdf'));

  // 2021: January 2021
  assert('Piyush Jan 2021 Title present', pubPage.body.includes('Vedanta Piyush — January 2021'));
  assert('Piyush Jan 2021 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vp-2021-jan-cover.jpg'));

  // 2023: September/October 2023 authentic shared cover
  assert('Piyush Sep 2023 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vp-2023-sep-cover.png'));
  assert('Piyush Oct 2023 Cover asset present', pubPage.body.includes('/images/vmission/publications/covers/vp-2023-oct-cover.png'));

  // 4. E-Books Audit
  console.log('\n--- AUDITING E-BOOKS ---');
  assert('Vedanta Articles Vol 6 present', pubPage.body.includes('Vedanta Articles — Volume 6'));
  assert('Vedanta Articles Vol 6 Local Cover present', pubPage.body.includes('/images/vmission/publications/ebook-va06.jpg'));
  assert('Vedanta Articles Vol 6 Download PDF present', pubPage.body.includes('https://archive.org/download/vedanta_articles6/VedantaArticles_6.pdf'));

  assert('Articles on Gita present', pubPage.body.includes('Articles on Gita (English)'));
  assert('Articles on Gita Local Cover present', pubPage.body.includes('/images/vmission/publications/ebook-gita.jpg'));
  assert('Articles on Gita Download Mirror present', pubPage.body.includes('https://u.pcloud.link/publink/show?code=QXHotalK'));

  // 5. Study & Chant Texts Audit
  console.log('\n--- AUDITING STUDY & CHANT TEXTS ---');
  assert('Upadesha Saram present', pubPage.body.includes('Upadesha Saram (उपदेश सारम्)'));
  assert('Upadesha Saram Authentic Cover present', pubPage.body.includes('/images/vmission/publications/study-text-upadesha-saram.jpg'));
  assert('Upadesha Saram Download present', pubPage.body.includes('https://archive.org/download/updesh_sar/updesh_sar.pdf'));

  assert('Vibhishana Gita present', pubPage.body.includes('Vibhishana Gita (विभीषण गीता)'));
  assert('Vibhishana Gita Authentic Cover present', pubPage.body.includes('/images/vmission/publications/study-text-vibhishana-gita.jpg'));
  assert('Vibhishana Gita Download present', pubPage.body.includes('https://u.pcloud.link/publink/show?code=OXartalK'));

  // 6. Teaching Media & Video Verification
  console.log('\n--- AUDITING TEACHING MEDIA & PLAYLIST OFFSET ---');
  const drigPage = await get('/teachings/drig-drushya-viveka-01');
  assert('Drig Drushya Viveka Detail Page HTTP 200', drigPage.status === 200);
  assert('Drig Drushya Viveka authentic video ID embedded', drigPage.body.includes('DefzkQ0BAr0'));
  assert('Drig Drushya Viveka authentic playlist ID embedded', drigPage.body.includes('PLVT0gU53weD3Ri0TEQdZcEv-g85I6H_oj'));

  // 7. Audio Teachings Verification
  console.log('\n--- AUDITING AUDIO RECORDINGS ---');
  const meditationPage = await get('/teachings/vedantic-meditation-day1');
  assert('Meditation Day 1 Detail Page HTTP 200', meditationPage.status === 200);
  assert('Playable Meditation Day 1 Title present', meditationPage.body.includes('Vedantic Meditation — Session 1: Turning Within'));
  assert('Playable Meditation Audio File linked', meditationPage.body.includes('/audio/swami-atmananda-meditation-day1.mp3'));

  const kenaPage = await get('/teachings/upanishad-kena-01');
  assert('Kenopanishad Detail Page HTTP 200', kenaPage.status === 200);
  assert('Kenopanishad Title present', kenaPage.body.includes('Kenopanishad — Audio Pravachan Series'));
  assert('Kenopanishad marked pending (Digitization in Progress)', kenaPage.body.includes('Archival Recording (Digitization in Progress)'));

  // 8. Capture Visual Proof Screenshots
  console.log('\n--- CAPTURING AUDIT SCREENSHOTS ---');
  captureScreenshot(`${BASE_URL}/publications`, 'phase3d2-publications-grid.png');
  captureScreenshot(`${BASE_URL}/teachings/drig-drushya-viveka-01`, 'phase3d2-drig-drushya-restored.png');
  captureScreenshot(`${BASE_URL}/teachings`, 'phase3d2-teachings-library.png');

  console.log('\n================================================================');
  console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log('================================================================');

  if (passed === total) {
    console.log('PHASE 3D.2 QA AUDIT FULLY PASSED!');
  } else {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal QA error:', err);
  process.exit(1);
});
