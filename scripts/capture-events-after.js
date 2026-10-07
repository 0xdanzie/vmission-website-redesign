const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase52');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { width: 1280, height: 1000, name: '1280px' },
  { width: 1280, height: 2600, name: '1280px-tall' },
  { width: 768, height: 1024, name: '768px' },
  { width: 768, height: 2400, name: '768px-tall' },
  { width: 430, height: 932, name: '430px' },
  { width: 430, height: 2600, name: '430px-tall' },
  { width: 375, height: 812, name: '375px' },
  { width: 375, height: 2600, name: '375px-tall' }
];

for (const vp of viewports) {
  const p = path.join(outDir, `events-after-${vp.name}.png`);
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=${vp.width},${vp.height} --screenshot="${p}" http://localhost:3000/events/`);
  console.log(`Saved ${p}`);
}
