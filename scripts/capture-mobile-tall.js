const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase52');

const viewports = [
  { width: 430, height: 2600, name: '430px-tall' },
  { width: 375, height: 2600, name: '375px-tall' }
];

for (const vp of viewports) {
  const p = path.join(outDir, `events-${vp.name}.png`);
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=${vp.width},${vp.height} --screenshot="${p}" http://localhost:3000/events/`);
  console.log(`Saved ${p}`);
}
