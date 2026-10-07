const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase54');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  { name: 'publications-1280.png', url: 'http://localhost:3000/publications/', w: 1280, h: 900 },
  { name: 'publications-vault-1280.png', url: 'http://localhost:3000/publications/#ebook-vault', w: 1280, h: 1200 },
  { name: 'publications-375.png', url: 'http://localhost:3000/publications/', w: 375, h: 812 },
  { name: 'detail-authentic-1280.png', url: 'http://localhost:3000/publications/book-000348/', w: 1280, h: 950 },
  { name: 'detail-placeholder-1280.png', url: 'http://localhost:3000/publications/vs-000185/', w: 1280, h: 950 },
];

for (const t of targets) {
  const p = path.join(outDir, t.name);
  console.log(`Capturing ${t.name}...`);
  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=${t.w},${t.h} --screenshot="${p}" "${t.url}"`, {
      timeout: 15000
    });
    console.log(`Saved ${t.name}`);
  } catch (err) {
    console.error(`Error capturing ${t.name}:`, err.message);
  }
}

console.log('Capture pass complete.');
