const http = require('http');

const BASE_URL = 'http://localhost:3000';

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

async function verify() {
  console.log('====================================================');
  console.log('     FINAL POST-FIX INTEGRATION VERIFICATION        ');
  console.log('====================================================\n');

  // 1. Root route vs Learn route
  const rootRes = await fetchUrl('/');
  const learnRes = await fetchUrl('/learn');

  const rootHasAscent = rootRes.body.includes('AshramAscent') || rootRes.body.includes('Entering the Ashram') || rootRes.body.includes('Entrance sequence') || rootRes.body.includes('Sri Gangeshwar Mahadev Mandir');
  const rootIsLearn = rootRes.body.includes('Systematic Scriptural Study') && !rootRes.body.includes('Sri Gangeshwar Mahadev Mandir');
  const learnIsLearn = learnRes.body.includes('Systematic Scriptural Study');

  console.log(`1. Root Route ('/'): [HTTP ${rootRes.statusCode}]`);
  console.log(`   - Renders Homepage & Entrance: ${rootHasAscent ? 'YES (VERIFIED)' : 'NO'}`);
  console.log(`   - Is mistakenly LearnPage: ${rootIsLearn ? 'FAIL' : 'NO (FIXED)'}`);

  console.log(`2. Learn Route ('/learn'): [HTTP ${learnRes.statusCode}]`);
  console.log(`   - Renders Learn Page: ${learnIsLearn ? 'YES (VERIFIED)' : 'NO'}`);

  // 3. Acharya profile portrait verification
  const acharyaRes = await fetchUrl('/acharyas/swami-atmananda-saraswati');
  const hasPortraitImg = acharyaRes.body.includes('/images/vmission/acharyas/guruji-portrait-riverside.jpg');
  console.log(`3. Acharya Detail ('/acharyas/swami-atmananda-saraswati'): [HTTP ${acharyaRes.statusCode}]`);
  console.log(`   - Renders Real Portrait Photo: ${hasPortraitImg ? 'YES (VERIFIED)' : 'NO'}`);

  // 4. Admin news route verification
  const adminNewsRes = await fetchUrl('/admin/news');
  const isRedirect = adminNewsRes.statusCode === 307 || adminNewsRes.statusCode === 308 || adminNewsRes.statusCode === 200;
  console.log(`4. Admin News ('/admin/news'): [HTTP ${adminNewsRes.statusCode}] -> ${isRedirect ? 'OK (Redirects/Loads)' : 'FAIL'}`);

  // 5. Check all main routes
  const routes = [
    '/about',
    '/acharyas',
    '/ashram',
    '/learn/tattva-bodha',
    '/events',
    '/events/guru-poornima-2026',
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
    '/admin/contact'
  ];

  console.log('\n5. Checking all other application routes:');
  for (const r of routes) {
    const res = await fetchUrl(r);
    console.log(`   [${res.statusCode}] ${r} (${res.bodyLength} bytes)`);
  }

  console.log('\n====================================================');
  console.log('VERIFICATION COMPLETE.');
}

verify();
