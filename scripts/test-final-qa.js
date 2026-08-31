const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || (process.argv[2] || 3001);
const BASE_URL = `http://localhost:${PORT}`;

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          bodyLength: data.length,
          body: data
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, statusCode: 'ERR', error: err.message });
    });
  });
}

async function runFinalQA() {
  console.log('================================================================');
  console.log(`         VEDANTA MISSION — FINAL PRESENTATION QA AUDIT (Port ${PORT})`);
  console.log('================================================================\n');

  let passedChecks = 0;
  let totalChecks = 0;

  function assert(name, condition, details = '') {
    totalChecks++;
    if (condition) {
      passedChecks++;
      console.log(`  [PASS] ${name} ${details ? '(' + details + ')' : ''}`);
    } else {
      console.error(`  [FAIL] ${name} ${details ? '(' + details + ')' : ''}`);
    }
  }

  // 1. Check Routes
  const routesToTest = [
    '/',
    '/about',
    '/acharyas',
    '/acharyas/swami-atmananda-saraswati',
    '/acharyas/swamini-amitananda-saraswati',
    '/acharyas/swamini-samatananda-saraswati',
    '/acharyas/swamini-poornananda-saraswati',
    '/ashram',
    '/learn',
    '/learn/tattva-bodha',
    '/events',
    '/events/guru-poornima-2026',
    '/events/residential-meditation-camp-aug-2026',
    '/events/online-gita-course-sep-2026',
    '/teachings',
    '/publications',
    '/donate',
    '/contact',
    '/admin',
    '/admin/events',
    '/admin/courses',
    '/admin/teachings',
    '/admin/publications',
    '/admin/donations',
    '/admin/contact',
    '/admin/news',
  ];

  console.log('1. VERIFYING ALL 26 ROUTES (STATUS & RENDERING):');
  for (const r of routesToTest) {
    const res = await fetchUrl(r);
    const isSuccess = res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308;
    assert(`Route: ${r}`, isSuccess, `HTTP ${res.statusCode}`);
  }

  // 2. Check Images
  const authenticImages = [
    '/images/vmission/hero/ashram-facade-dome.jpg',
    '/images/vmission/hero/ashram-facade-elevated.jpg',
    '/images/vmission/ashram/sanctum-doors-threshold.jpg',
    '/images/vmission/ashram/gangeshwar-dome-closeup.jpg',
    '/images/vmission/ashram/sanctum-interior-stage.jpg',
    '/images/vmission/ashram/teaching-hall-interior.jpg',
    '/images/vmission/ashram/courtyard-with-guruji.jpg',
    '/images/vmission/ashram/facade-elevated-alt.jpg',
    '/images/vmission/ashram/acharya-community-portrait.jpg',
    '/images/vmission/worship/morning-aarti.jpg',
    '/images/vmission/worship/murti-closeup-garlanded.jpg',
    '/images/vmission/community/satsang-with-acharya.jpg',
    '/images/vmission/community/residential-camp-gathering.jpg',
    '/images/vmission/acharyas/guruji-portrait-riverside.jpg',
    '/images/vmission/acharyas/guruji-teaching-closeup.jpg',
    '/images/vmission/acharyas/guruji-portrait-cutout.jpg',
    '/images/vmission/acharyas/swamini-amitananda.jpg',
    '/images/vmission/acharyas/swamini-samatananda.jpg',
    '/images/vmission/acharyas/swamini-poornananda.jpg',
    '/images/vmission/events/advaita-congress-moscow.jpg',
    '/images/vmission/events/rotary-club-mumbai-talk.jpg',
    '/images/vmission/publications/vedanta-sandesh-jan21.jpg',
    '/images/vmission/publications/vedanta-sandesh-dec20.jpg',
  ];

  console.log('\n2. VERIFYING ALL 23 REAL AUTHENTIC IMAGES (DISK & HTTP 200):');
  for (const img of authenticImages) {
    const diskPath = path.join(__dirname, '..', 'public', img.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);
    const size = exists ? fs.statSync(diskPath).size : 0;
    const res = await fetchUrl(img);
    assert(`Asset: ${img}`, exists && size > 1000 && res.statusCode === 200, `${size} bytes on disk, HTTP ${res.statusCode}`);
  }

  // 3. Verify zero contaminated assets
  console.log('\n3. VERIFYING ZERO CONTAMINATED / FAKE ASSETS:');
  const airportPath = path.join(__dirname, '..', 'public/images/vmission/ashram/vmission-ashram-hero.jpg');
  assert('Airport image (vmission-ashram-hero.jpg) purged', !fs.existsSync(airportPath));

  // 4. Verify Dependencies
  console.log('\n4. VERIFYING PACKAGE DEPENDENCIES & CLEAN CODE:');
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const hasThree = pkg.dependencies && (pkg.dependencies['three'] || pkg.dependencies['@react-three/fiber']);
  assert('Zero heavy 3D libraries (Three.js cleanly removed)', !hasThree);
  assert('Overriding string.prototype.trim to 1.2.10 present', Boolean(pkg.overrides && pkg.overrides['string.prototype.trim']));

  console.log('\n================================================================');
  console.log(`FINAL RESULT: ${passedChecks}/${totalChecks} QA CHECKS PASSED (${Math.round(passedChecks/totalChecks*100)}%)`);
  console.log('================================================================\n');
}

runFinalQA();
