const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-5.2');
fs.mkdirSync(outDir, { recursive: true });

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function warmUp(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[WARMED] ${url} (${res.statusCode}, ${data.length} bytes)`);
        setTimeout(resolve, 2000);
      });
    }).on('error', (err) => {
      console.warn(`[WARM-ERR] ${url}:`, err.message);
      resolve();
    });
  });
}

function capture(url, outFile, width = 1280, height = 900) {
  const fullPath = path.join(outDir, outFile);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=${width},${height} --screenshot="${fullPath}" "${url}"`;
    execSync(cmd, { stdio: 'ignore', timeout: 25000 });
    console.log(`[CAPTURED] ${outFile} (${width}x${height})`);
    return fullPath;
  } catch (e) {
    console.error(`[ERROR] ${outFile}:`, e.message);
    return null;
  }
}

async function run() {
  console.log('Pre-warming /events/ route...');
  await warmUp('http://localhost:3000/events/');

  console.log('Capturing verified screenshots for Phase 5.2 Events...');
  capture('http://localhost:3000/events/', 'events-1280-verified.png', 1280, 2200);
  capture('http://localhost:3000/events/', 'events-768-verified.png', 768, 2200);
  capture('http://localhost:3000/events/', 'events-430-verified.png', 430, 2200);
  capture('http://localhost:3000/events/', 'events-375-verified.png', 375, 2200);
  console.log('Capture finished.');
}

run();
