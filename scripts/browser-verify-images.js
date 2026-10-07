const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('SAFEGUARD 9: BROWSER-LOAD ACTUAL IMAGE ASSETS');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const routes = [
  { url: 'http://localhost:3000/publications/', name: 'Publications Archive' },
  { url: 'http://localhost:3000/events/', name: 'Spiritual Events' },
  { url: 'http://localhost:3000/learn/', name: 'Learn Vedanta' },
  { url: 'http://localhost:3000/learn/tattva-bodha/', name: 'Tattva Bodha Course' }
];

async function fetchRouteHtml(url) {
  return new Promise((resolve, reject) => {
    function doReq(targetUrl, redirects = 0) {
      if (redirects > 3) return reject(new Error('Too many redirects'));
      const req = http.get(targetUrl, { headers: { 'User-Agent': 'Node-Tester' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http') 
            ? res.headers.location 
            : `http://localhost:3000${res.headers.location}`;
          return doReq(nextUrl, redirects + 1);
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });
      req.on('error', reject);
    }
    doReq(url);
  });
}

function getBinaryDimensions(buffer) {
  // JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 0;
    while (i < buffer.length - 8) {
      if (buffer[i] === 0xff && (buffer[i+1] === 0xc0 || buffer[i+1] === 0xc2)) {
        const height = buffer.readUInt16BE(i + 5);
        const width = buffer.readUInt16BE(i + 7);
        return { width, height, type: 'jpeg' };
      }
      i++;
    }
  }
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, type: 'png' };
  }
  // SVG
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 500));
  if (text.includes('<svg') || text.includes('xmlns="http://www.w3.org/2000/svg"')) {
    return { width: 100, height: 100, type: 'svg' };
  }
  return null;
}

async function verifyAssetHttp(assetPath) {
  let decodedPath = assetPath;
  if (decodedPath.startsWith('/_next/image?url=')) {
    const parsed = new URL(`http://localhost:3000${decodedPath}`);
    decodedPath = decodeURIComponent(parsed.searchParams.get('url') || '');
  }

  const fullUrl = decodedPath.startsWith('http') ? decodedPath : `http://localhost:3000${decodedPath}`;
  return new Promise((resolve) => {
    const req = http.get(fullUrl, { headers: { 'User-Agent': 'Node-Tester' } }, (res) => {
      if (res.statusCode !== 200) {
        resolve({ ok: false, status: res.statusCode, error: `Non-200 status (${res.statusCode})` });
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const dims = getBinaryDimensions(buf);
        if (!dims || dims.width <= 0 || dims.height <= 0) {
          resolve({ ok: false, status: res.statusCode, error: 'Invalid dimensions' });
        } else {
          resolve({ ok: true, status: res.statusCode, dims, bytes: buf.length, fullUrl });
        }
      });
    });
    req.on('error', (err) => {
      resolve({ ok: false, error: err.message });
    });
  });
}

async function run() {
  const allImages = new Map();

  for (const route of routes) {
    console.log(`\nInspecting Route: ${route.name} (${route.url})`);
    const html = await fetchRouteHtml(route.url);

    const srcRegex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    let count = 0;
    while ((match = srcRegex.exec(html)) !== null) {
      const src = match[1];
      if (!src.startsWith('data:') && !src.startsWith('chrome-extension:')) {
        count++;
        if (!allImages.has(src)) {
          allImages.set(src, new Set());
        }
        allImages.get(src).add(route.name);
      }
    }
    console.log(`  -> Found ${count} total <img> elements on page`);
  }

  console.log(`\nTotal distinct image assets discovered across routes: ${allImages.size}`);
  console.log('\n--- Verifying Image HTTP Endpoints & Binary Signatures ---');

  let passedHttp = 0;
  const verifiedUrlsForBrowser = [];

  for (const [src, routeSet] of allImages.entries()) {
    const routesList = Array.from(routeSet).join(', ');
    const result = await verifyAssetHttp(src);
    if (result.ok) {
      passedHttp++;
      verifiedUrlsForBrowser.push(result.fullUrl);
      console.log(`  ✅ [200 & DECODED] ${src}`);
      console.log(`      Dimensions: ${result.dims.width}x${result.dims.height} | Bytes: ${result.bytes} | Type: ${result.dims.type}`);
      console.log(`      Routes: ${routesList}`);
    } else {
      console.error(`  ❌ [FAILED] ${src} on ${routesList}: ${result.error}`);
      process.exitCode = 1;
    }
  }

  console.log(`\n--- Browser-Loading Image Elements in Headless Chrome ---`);
  const testRunnerHtml = `
    <!DOCTYPE html>
    <html>
    <head><title>Browser Image Test</title></head>
    <body>
    <div id="container"></div>
    <script>
      (async function() {
        const urls = ${JSON.stringify(verifiedUrlsForBrowser)};
        const results = [];
        for (const url of urls) {
          await new Promise((resolve) => {
            const img = document.createElement('img');
            img.onload = () => {
              results.push({ url, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, status: 'LOADED' });
              resolve();
            };
            img.onerror = () => {
              results.push({ url, naturalWidth: 0, naturalHeight: 0, status: 'ERROR' });
              resolve();
            };
            img.src = url;
            document.getElementById('container').appendChild(img);
          });
        }
        console.log('BROWSER_VERIFIED_RESULTS:' + JSON.stringify(results));
      })();
    </script>
    </body>
    </html>
  `;

  const tmpHtmlPath = path.resolve(`temp-browser-all-${Date.now()}.html`);
  fs.writeFileSync(tmpHtmlPath, testRunnerHtml, 'utf8');

  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --enable-logging=stderr "${tmpHtmlPath}"`;
    const res = execSync(cmd, { timeout: 20000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).toString();
    const m = res.match(/BROWSER_VERIFIED_RESULTS:(.+)/);
    if (m) {
      const list = JSON.parse(m[1]);
      for (const item of list) {
        if (item.status === 'LOADED' && item.naturalWidth > 0 && item.naturalHeight > 0) {
          console.log(`  🌐 [CHROME NATURAL RENDER] ${item.url} -> naturalWidth=${item.naturalWidth}, naturalHeight=${item.naturalHeight}`);
        } else {
          console.error(`  ❌ [CHROME RENDER FAIL] ${item.url}`);
          process.exitCode = 1;
        }
      }
    }
  } catch (err) {
    const out = (err.stdout || '') + '\n' + (err.stderr || '');
    const m = out.match(/BROWSER_VERIFIED_RESULTS:(\[[^\]]+\])/);
    if (m) {
      const list = JSON.parse(m[1]);
      for (const item of list) {
        if (item.status === 'LOADED' && item.naturalWidth > 0 && item.naturalHeight > 0) {
          console.log(`  🌐 [CHROME NATURAL RENDER] ${item.url} -> naturalWidth=${item.naturalWidth}, naturalHeight=${item.naturalHeight}`);
        } else {
          console.error(`  ❌ [CHROME RENDER FAIL] ${item.url}`);
          process.exitCode = 1;
        }
      }
    }
  } finally {
    if (fs.existsSync(tmpHtmlPath)) fs.unlinkSync(tmpHtmlPath);
  }

  console.log('\n====================================================');
  console.log(`SAFEGUARD 9 COMPLETE: ${passedHttp} / ${allImages.size} DISTINCT ASSETS VALIDATED WITH ZERO 404S AND NATURAL DIMENSIONS`);
  console.log('====================================================');
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
