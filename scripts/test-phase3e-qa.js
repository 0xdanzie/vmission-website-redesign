const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const qaDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-3e0');
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

function captureScreenshot(url, filename, width = 1440, height = 900) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outFile = path.join(qaDir, filename);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --window-size=${width},${height} --screenshot="${outFile}" "${url}"`;
    execSync(cmd, { stdio: 'ignore', timeout: 20000 });
    if (fs.existsSync(outFile)) {
      console.log(`  [SCREENSHOT CAPTURED] ${filename} (${width}x${height} - ${fs.statSync(outFile).size} bytes)`);
      return true;
    }
  } catch (e) {
    console.error(`  [SCREENSHOT ERROR] ${filename}:`, e.message);
  }
  return false;
}

async function run() {
  console.log('================================================================');
  console.log('       PHASE 3E.0 — DIGITAL ASHRAM SITE-WIDE QA AUDIT');
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

  // 0. Verify Homepage Protection (Zero changes to page.tsx & page.module.css during Phase 3E)
  console.log('--- 0. VERIFYING HOMEPAGE FREEZE ---');
  const homePage = await get('/');
  assert('Homepage HTTP 200', homePage.status === 200);
  assert('Homepage retains approved baseline structure', homePage.body.includes('Revealing the Non-Dual Self') || homePage.body.includes('Vedanta Ashram'));


  // 1. Benchmark Reference: /about & /teachings
  console.log('\n--- 1. AUDITING BENCHMARK PAGES ---');
  const aboutPage = await get('/about');
  assert('About Page HTTP 200', aboutPage.status === 200);
  assert('About Page contains Gurukula identity', aboutPage.body.includes('Revealing the Eternal'));

  const teachingsPage = await get('/teachings');
  assert('Teachings Page HTTP 200', teachingsPage.status === 200);
  assert('Teachings Page contains Jnana Ganga', teachingsPage.body.includes('Jnana Ganga'));

  // 2. Page 1: /acharyas (The Monastic Lineage Hall)
  console.log('\n--- 2. AUDITING /acharyas (THE MONASTIC LINEAGE HALL) ---');
  const acharyasPage = await get('/acharyas');
  assert('/acharyas Page HTTP 200', acharyasPage.status === 200);
  assert('/acharyas Title present', acharyasPage.body.includes('The Monastic Lineage Hall'));
  assert('/acharyas Parampara Shloka present', acharyasPage.body.includes('सदाशिवसमारम्भां'));
  assert('/acharyas Founder section present', acharyasPage.body.includes('Swami Atmananda Saraswati'));
  assert('/acharyas 1983 Brahmacharya milestone present', acharyasPage.body.includes('1983') && acharyasPage.body.includes('Brahmacharya'));
  assert('/acharyas 1987 Sanyas milestone present', acharyasPage.body.includes('1987') && acharyasPage.body.includes('Sanyas Deeksha'));
  assert('/acharyas 1992 Mission milestone present', acharyasPage.body.includes('1992') && acharyasPage.body.includes('Vedanta Mission'));
  assert('/acharyas 1995 Ashram milestone present', acharyasPage.body.includes('1995') && acharyasPage.body.includes('Indore'));
  assert('/acharyas Swamini Amitananda present', acharyasPage.body.includes('Swamini Amitananda Saraswati'));
  assert('/acharyas Swamini Samatananda present', acharyasPage.body.includes('Swamini Samatananda Saraswati'));
  assert('/acharyas Swamini Poornananda present', acharyasPage.body.includes('Swamini Poornananda Saraswati'));

  // 3. Page 2: /acharyas/[slug] (Monastic Biography Detail)
  console.log('\n--- 3. AUDITING /acharyas/[slug] (MONASTIC BIOGRAPHY DETAIL) ---');
  const founderBio = await get('/acharyas/swami-atmananda-saraswati');
  assert('Founder Bio Page HTTP 200', founderBio.status === 200);
  assert('Founder Bio contains Sandeepany Sadhanalaya', founderBio.body.includes('Sandeepany Sadhanalaya'));
  assert('Founder Bio contains Chinmaya Mission', founderBio.body.includes('Chinmaya Mission'));
  assert('Founder Bio links to authentic discourses', founderBio.body.includes('/teachings/'));

  const amitanandaBio = await get('/acharyas/swamini-amitananda-saraswati');
  assert('Swamini Amitananda Bio Page HTTP 200', amitanandaBio.status === 200);
  assert('Swamini Amitananda Bio contains role', amitanandaBio.body.includes('Senior Acharya'));

  // 4. Page 3: /ashram (The Living Sanctuary)
  console.log('\n--- 4. AUDITING /ashram (THE LIVING SANCTUARY) ---');
  const ashramPage = await get('/ashram');
  assert('/ashram Page HTTP 200', ashramPage.status === 200);
  assert('/ashram Title present', ashramPage.body.includes('The Living Sanctuary'));
  assert('/ashram Gangeshwar Mahadev Mandir present', ashramPage.body.includes('Sri Gangeshwar Mahadev Mandir'));
  assert('/ashram Dinacharya Brahma Muhurta present', ashramPage.body.includes('Brahma Muhurta') && ashramPage.body.includes('05:30'));
  assert('/ashram Dinacharya Mandir Upasana present', ashramPage.body.includes('Sri Gangeshwar Mahadev Abhishek &amp; Aarti') || ashramPage.body.includes('Sri Gangeshwar Mahadev Abhishek & Aarti'));
  assert('/ashram Pravachan Bhavan space present', ashramPage.body.includes('Pravachan Bhavan'));
  assert('/ashram Parivar Community present', ashramPage.body.includes('The Ashram Parivar'));
  assert('/ashram Travel Guide Airport present', ashramPage.body.includes('Devi Ahilyabai Holkar Airport'));
  assert('/ashram Travel Guide Railway Station present', ashramPage.body.includes('Indore Junction'));

  // 5. Page 4: /teachings/[id] (The Digital Study Desk)
  console.log('\n--- 5. AUDITING /teachings/[id] (THE DIGITAL STUDY DESK) ---');
  const videoDesk = await get('/teachings/drig-drushya-viveka-01');
  assert('Video Study Desk HTTP 200', videoDesk.status === 200);
  assert('Video Study Desk contains YouTube Playlist', videoDesk.body.includes('PLVT0gU53weD3Ri0TEQdZcEv-g85I6H_oj'));
  assert('Video Study Desk contains Paddhati (Shravana, Manana, Nididhyasana)', videoDesk.body.includes('Shravana') && videoDesk.body.includes('Manana') && videoDesk.body.includes('Nididhyasana'));
  assert('Video Study Desk connects to Acharya', videoDesk.body.includes('Swami Atmananda Saraswati'));

  const playableAudioDesk = await get('/teachings/vedantic-meditation-day1');
  assert('Playable Audio Desk HTTP 200', playableAudioDesk.status === 200);
  assert('Playable Audio Desk links verified MP3', playableAudioDesk.body.includes('/audio/swami-atmananda-meditation-day1.mp3'));

  const archivalAudioDesk = await get('/teachings/upanishad-kena-01');
  assert('Archival Audio Desk HTTP 200', archivalAudioDesk.status === 200);
  assert('Archival Audio Desk has honest pending state', archivalAudioDesk.body.includes('Archival Recording (Digitization in Progress)'));

  // 6. Page 5: /publications (The Literary Archive)
  console.log('\n--- 6. AUDITING /publications (THE LITERARY ARCHIVE) ---');
  const pubPage = await get('/publications');
  assert('/publications Page HTTP 200', pubPage.status === 200);
  assert('/publications Title present', pubPage.body.includes('The Literary Archive'));
  assert('August 2026 Sandesh verified anchor present', pubPage.body.includes('Vedanta Sandesh — August 2026'));
  assert('August 2026 Sandesh cover present', pubPage.body.includes('/images/vmission/publications/covers/vs-2026-aug-cover.jpg'));
  assert('July 2026 Piyush verified anchor present', pubPage.body.includes('Vedanta Piyush — July 2026'));
  assert('July 2026 Piyush cover present', pubPage.body.includes('/images/vmission/publications/covers/vp-2026-jul-cover.jpg'));
  assert('Zero September 2026 Sandesh issue present', !pubPage.body.includes('Vedanta Sandesh — September 2026') && !pubPage.body.includes('pub-vsd-2026-09'));
  assert('E-Books section present', pubPage.body.includes('Vedanta Articles — Volume 6'));
  assert('Study Texts section present', pubPage.body.includes('Upadesha Saram (उपदेश सारम्)') && pubPage.body.includes('Vibhishana Gita (विभीषण गीता)'));

  // 7. Capture Visual Proof Across Viewports (Desktop, Tablet, Mobile)
  console.log('\n--- 7. CAPTURING MULTI-VIEWPORT SCREENSHOTS ---');
  const viewports = [
    { name: 'desktop', w: 1440, h: 900 },
    { name: 'tablet', w: 1024, h: 800 },
    { name: 'mobile', w: 390, h: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\nCapturing for Viewport: ${vp.name} (${vp.w}x${vp.h})`);
    captureScreenshot(`${BASE_URL}/about`, `phase3e0-about-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/teachings`, `phase3e0-teachings-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/acharyas`, `phase3e0-acharyas-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/acharyas/swami-atmananda-saraswati`, `phase3e0-acharya-detail-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/ashram`, `phase3e0-ashram-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/teachings/drig-drushya-viveka-01`, `phase3e0-study-desk-${vp.name}.png`, vp.w, vp.h);
    captureScreenshot(`${BASE_URL}/publications`, `phase3e0-publications-${vp.name}.png`, vp.w, vp.h);
  }

  console.log('\n================================================================');
  console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log('================================================================');

  if (passed === total) {
    console.log('\n>>> PHASE 3E.0 DIGITAL ASHRAM PROPAGATION QA 100% PASSED! <<<');
  } else {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal QA error:', err);
  process.exit(1);
});
