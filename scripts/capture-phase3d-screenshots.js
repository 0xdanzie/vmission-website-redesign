const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-3d0');

const targets = [
  { name: 'phase3d0-publications-grid.png', url: 'http://localhost:3000/publications/' },
  { name: 'phase3d0-teachings-library.png', url: 'http://localhost:3000/teachings/' },
  { name: 'phase3d0-teaching-detail-drigdrushya.png', url: 'http://localhost:3000/teachings/drig-drushya-viveka-01/' },
  { name: 'phase3d0-teaching-detail-meditation.png', url: 'http://localhost:3000/teachings/vedantic-meditation-day1/' },
  { name: 'phase3d0-homepage-baseline-check.png', url: 'http://localhost:3000/' }
];

for (const t of targets) {
  const outFile = path.join(outDir, t.name);
  console.log(`Capturing screenshot for ${t.url} -> ${t.name}...`);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --window-size=1440,1080 --screenshot="${outFile}" "${t.url}"`;
    execSync(cmd, { stdio: 'inherit', timeout: 15000 });
    if (fs.existsSync(outFile)) {
      const stats = fs.statSync(outFile);
      console.log(`  [SUCCESS] ${t.name} captured (${stats.size} bytes)`);
    } else {
      console.error(`  [FAILED] File not found: ${outFile}`);
    }
  } catch (err) {
    console.error(`  [ERROR] capturing ${t.name}:`, err.message);
  }
}
