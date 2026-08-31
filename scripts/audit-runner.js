const http = require('http');
const fs = require('fs');
const path = require('path');

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
          contentType: res.headers['content-type'] || '',
          bodyLength: data.length,
          bodySnippet: data.slice(0, 300),
          isHtml: (res.headers['content-type'] || '').includes('text/html'),
          hasError: data.includes('Internal Server Error') || data.includes('Unhandled Runtime Error') || data.includes('Application error')
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        path: urlPath,
        statusCode: 'ERR',
        error: err.message
      });
    });
  });
}

async function runAudit() {
  console.log('=== 1. AUDITING ROUTES ===');
  const routesToTest = [
    '/',
    '/about',
    '/acharyas',
    '/acharyas/swami-atmananda-saraswati',
    '/acharyas/swamini-amitananda',
    '/acharyas/swamini-poornananda',
    '/acharyas/swamini-samatananda',
    '/ashram',
    '/learn',
    '/learn/tattva-bodha',
    '/events',
    '/events/camp-2024-gita',
    '/events/rotary-mumbai-2023',
    '/events/advaita-congress-moscow',
    '/teachings',
    '/publications',
    '/donate',
    '/contact',
    '/admin',
    '/admin/events',
    '/admin/courses',
    '/admin/teachings',
    '/admin/publications',
    '/admin/news',
    '/admin/contact',
    '/admin/donations'
  ];

  for (const r of routesToTest) {
    const res = await fetchUrl(r);
    console.log(`Route [${res.statusCode}] ${r} (${res.bodyLength || 0} bytes) ${res.hasError ? '❌ HAS ERROR' : '✓'}`);
    if (res.statusCode !== 200 && res.statusCode !== 307 && res.statusCode !== 308) {
      console.log(`   -> Snippet: ${res.bodySnippet ? res.bodySnippet.replace(/\s+/g, ' ').slice(0, 150) : ''}`);
    }
  }

  console.log('\n=== 2. EXTRACTING AND VERIFYING ALL IMAGE PATHS ===');
  const imageRegex = /['"](\/(?:images|graphics|favicon)[^'"]+\.(?:jpg|jpeg|png|svg|webp|avif|ico))['"]/g;
  const foundImages = new Set();

  function scanDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      const full = path.join(dir, f.name);
      if (f.isDirectory()) {
        scanDir(full);
      } else if (/\.(tsx|ts|jsx|js|css|md)$/.test(f.name)) {
        const content = fs.readFileSync(full, 'utf8');
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
          foundImages.add(match[1]);
        }
      }
    }
  }

  scanDir(path.join(__dirname, '..', 'src'));

  console.log(`Found ${foundImages.size} unique image references across src/`);
  const imageResults = [];
  for (const imgPath of Array.from(foundImages).sort()) {
    const diskPath = path.join(__dirname, '..', 'public', imgPath.replace(/^\//, ''));
    const existsOnDisk = fs.existsSync(diskPath);
    const res = await fetchUrl(imgPath);
    imageResults.push({
      path: imgPath,
      existsOnDisk,
      diskPath,
      httpStatus: res.statusCode,
      bodyLength: res.bodyLength
    });
    console.log(`Image [HTTP ${res.statusCode}] [Disk: ${existsOnDisk ? 'YES' : 'NO'}] ${imgPath}`);
  }

  console.log('\n=== 3. CHECKING ALL ASSET FILES IN public/ ===');
  const publicAssets = [];
  function scanPublic(dir, prefix = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      const rel = path.join(prefix, f.name);
      const full = path.join(dir, f.name);
      if (f.isDirectory()) {
        scanPublic(full, rel);
      } else {
        publicAssets.push('/' + rel.replace(/\\/g, '/'));
      }
    }
  }
  scanPublic(path.join(__dirname, '..', 'public'));
  console.log(`Total files in public/: ${publicAssets.length}`);

  // Check if any public asset is unreferenced
  const unreferenced = publicAssets.filter(p => !foundImages.has(p) && !p.endsWith('.md') && !p.endsWith('.ico'));
  console.log(`Public files unreferenced in src/: ${unreferenced.length}`);
  unreferenced.forEach(p => console.log(`   - ${p}`));

  console.log('\nAudit complete.');
}

runAudit();
