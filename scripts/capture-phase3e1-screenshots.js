const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-3e1');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/teachings', name: 'teachings' },
  { path: '/acharyas', name: 'acharyas' },
  { path: '/acharyas/swami-atmananda-saraswati', name: 'acharya-swami-atmananda' },
  { path: '/acharyas/swamini-amitananda-saraswati', name: 'acharya-swamini-amitananda' },
  { path: '/ashram', name: 'ashram' },
  { path: '/teachings/drig-drushya-viveka-01', name: 'teaching-drig-drushya-01' },
  { path: '/teachings/vedantic-meditation-day1', name: 'teaching-meditation-day1' },
  { path: '/publications', name: 'publications' }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 800 },
  { name: 'mobile', width: 390, height: 844 }
];

console.log('Capturing Phase 3E.1 baseline screenshots...');

for (const route of routes) {
  for (const vp of viewports) {
    const filename = `${route.name}-${vp.name}.png`;
    const outFile = path.join(outDir, filename);
    const url = `${BASE_URL}${route.path}`;
    try {
      const cmd = `"${chromePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outFile}" "${url}"`;
      execSync(cmd, { stdio: 'ignore', timeout: 25000 });
      if (fs.existsSync(outFile)) {
        console.log(`[CAPTURED] ${filename} (${vp.width}x${vp.height}) - ${fs.statSync(outFile).size} bytes`);
      } else {
        console.error(`[FAILED] ${filename}`);
      }
    } catch (e) {
      console.error(`[ERROR] ${filename}: ${e.message}`);
    }
  }
}

console.log('Capture complete.');
