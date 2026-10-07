const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('====================================================');
console.log('PHASE 4C.1 FULL-CORPUS HEADLESS CHROME VALIDATION');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 1. All 12 verified source covers
const verifiedCovers = [
  '/images/vmission/publications/covers/vs-2021-may-cover.jpg',
  '/images/vmission/publications/covers/vs-2021-jun-cover.jpg',
  '/images/vmission/publications/covers/vs-2021-jul-cover.jpg',
  '/images/vmission/publications/covers/vp-2021-may-cover.jpg',
  '/images/vmission/publications/covers/vp-2021-jun-cover.jpg',
  '/images/vmission/publications/covers/vp-2021-jul-cover.jpg',
  '/images/vmission/publications/ebook-va01.jpg',
  '/images/vmission/publications/ebook-va02.jpg',
  '/images/vmission/publications/ebook-va03.png',
  '/images/vmission/publications/ebook-va04.png',
  '/images/vmission/publications/ebook-va06.jpg',
  '/images/vmission/publications/study-text-tb-mula.jpg'
];

let browserResults = null;

const testRunnerHtml = `
  <!DOCTYPE html>
  <html>
  <head><title>Full Corpus Browser Image Test</title></head>
  <body>
  <div id="container"></div>
  <script>
    (async function() {
      const urls = ${JSON.stringify(verifiedCovers.map(p => `http://localhost:3333${p}`))};
      const results = [];
      for (const url of urls) {
        await new Promise((resolve) => {
          const img = document.createElement('img');
          img.onload = () => {
            results.push({
              url,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              status: 'LOADED'
            });
            resolve();
          };
          img.onerror = () => {
            results.push({
              url,
              naturalWidth: 0,
              naturalHeight: 0,
              status: 'ERROR'
            });
            resolve();
          };
          img.src = url;
          document.getElementById('container').appendChild(img);
        });
      }
      await fetch('/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
      });
    })();
  </script>
  </body>
  </html>
`;

// Start test server on port 3333
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/report') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        browserResults = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (req.url === '/test.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(testRunnerHtml);
    return;
  }

  const filePath = path.join(__dirname, '..', 'public', req.url.split('?')[0]);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3333, async () => {
  console.log('Image test server listening on http://localhost:3333');

  let testPassed = true;

  try {
    const chromeProc = spawn(chromePath, ['--headless=new', '--disable-gpu', 'http://localhost:3333/test.html']);

    // Wait for the report to arrive
    const startTime = Date.now();
    while (!browserResults && Date.now() - startTime < 15000) {
      await new Promise(r => setTimeout(r, 200));
    }
    chromeProc.kill();

    if (!browserResults) {
      console.error('Failed to receive report from Chrome within timeout.');
      testPassed = false;
    } else {
      console.log(`\nChrome evaluated ${browserResults.length} verified cover images:`);
      for (const res of browserResults) {
        if (res.status === 'LOADED' && res.naturalWidth > 0 && res.naturalHeight > 0) {
          console.log(`  ✅ [CHROME LOAD OK] ${res.url} (${res.naturalWidth}x${res.naturalHeight})`);
        } else {
          console.error(`  ❌ [CHROME LOAD FAIL] ${res.url}`);
          testPassed = false;
        }
      }
    }
  } finally {
    server.close();
  }

  // 2. Validate Representative Generated HTML Pages
  console.log('\n--- Validating Representative Statically Built Pages ---');
  const representativePages = [
    { file: '.next/server/app/publications/vs-2021-may.html', name: 'Recent Vedanta Sandesh (vs-2021-may)', expectsCover: true, cover: 'vs-2021-may-cover.jpg' },
    { file: '.next/server/app/publications/vp-2021-may.html', name: 'Recent Vedanta Piyush (vp-2021-may)', expectsCover: true, cover: 'vp-2021-may-cover.jpg' },
    { file: '.next/server/app/publications/vs-000185.html', name: 'Historical Vedanta Sandesh (vs-000185)', expectsCover: false, label: 'VEDANTA SANDESH' },
    { file: '.next/server/app/publications/vp-000272.html', name: 'Historical Vedanta Piyush (vp-000272)', expectsCover: false, label: 'VEDANTA PIYUSH' },
    { file: '.next/server/app/publications/book-000348.html', name: 'E-Book Vol 6 (book-000348)', expectsCover: true, cover: 'ebook-va06.jpg' },
    { file: '.next/server/app/publications/book-000349.html', name: 'E-Book Vol 4 (book-000349)', expectsCover: true, cover: 'ebook-va04.png' },
    { file: '.next/server/app/publications/book-000350.html', name: 'E-Book Vol 3 (book-000350)', expectsCover: true, cover: 'ebook-va03.png' },
    { file: '.next/server/app/publications/book-000351.html', name: 'E-Book Vol 2 (book-000351)', expectsCover: true, cover: 'ebook-va02.jpg' },
    { file: '.next/server/app/publications/book-000352.html', name: 'E-Book Vol 1 (book-000352)', expectsCover: true, cover: 'ebook-va01.jpg' },
    { file: '.next/server/app/publications/book-000353.html', name: 'Tattva Bodha eBook (book-000353)', expectsCover: true, cover: 'study-text-tb-mula.jpg' },
    { file: '.next/server/app/publications/study-text-000354.html', name: 'Upanishad Text (study-text-000354)', expectsCover: false, label: 'ARCHIVAL SANSKRIT TEXT' },
    { file: '.next/server/app/publications/study-text-000370.html', name: 'Prakarana Text (study-text-000370)', expectsCover: false, label: 'ARCHIVAL SANSKRIT TEXT' },
    { file: '.next/server/app/publications/study-text-000404.html', name: 'Tattva Bodha Root Text (study-text-000404)', expectsCover: false, label: 'ARCHIVAL SANSKRIT TEXT' },
    { file: '.next/server/app/publications/study-text-000411.html', name: 'Chant Text (study-text-000411)', expectsCover: false, label: 'ARCHIVAL SANSKRIT TEXT' }
  ];

  let pagesPassed = 0;
  for (const page of representativePages) {
    const pPath = path.join(__dirname, '..', page.file);
    if (!fs.existsSync(pPath)) {
      console.error(`❌ [PAGE MISSING] ${page.file}`);
      testPassed = false;
      continue;
    }
    const html = fs.readFileSync(pPath, 'utf8');

    if (page.expectsCover) {
      if (html.includes(page.cover)) {
        console.log(`  ✅ [RENDERED VERIFIED COVER] ${page.name} contains ${page.cover}`);
        pagesPassed++;
      } else {
        console.error(`  ❌ [MISSING EXPECTED COVER] ${page.name} does not contain ${page.cover}`);
        testPassed = false;
      }
    } else {
      if (html.includes(page.label)) {
        console.log(`  ✅ [RENDERED EDITORIAL PLACEHOLDER] ${page.name} correctly displays ${page.label}`);
        pagesPassed++;
      } else {
        console.error(`  ❌ [MISSING PLACEHOLDER LABEL] ${page.name} does not display ${page.label}`);
        testPassed = false;
      }

      if (html.includes('study-text-tb-mula.jpg')) {
        console.error(`  ❌ [LEAKAGE VIOLATION] ${page.name} contains study-text-tb-mula.jpg!`);
        testPassed = false;
      }
    }
  }

  console.log(`\n====================================================`);
  if (testPassed) {
    console.log(`FULL-CORPUS BROWSER VALIDATION PASSED: 12/12 IMAGES & ${pagesPassed}/${representativePages.length} PAGES VALIDATED`);
    process.exit(0);
  } else {
    console.error('FULL-CORPUS BROWSER VALIDATION ENCOUNTERED FAILURES');
    process.exit(1);
  }
});
