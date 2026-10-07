const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase53');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  // Tattva Bodha
  { name: 'tattva-bodha-1280.png', url: 'http://localhost:3000/learn/tattva-bodha/', w: 1280, h: 900 },
  { name: 'tattva-bodha-1280-desk.png', url: 'http://localhost:3000/learn/tattva-bodha/#verse-1', w: 1280, h: 1800 },
  { name: 'tattva-bodha-768.png', url: 'http://localhost:3000/learn/tattva-bodha/', w: 768, h: 1024 },
  { name: 'tattva-bodha-430.png', url: 'http://localhost:3000/learn/tattva-bodha/', w: 430, h: 932 },
  { name: 'tattva-bodha-375.png', url: 'http://localhost:3000/learn/tattva-bodha/', w: 375, h: 812 },
  { name: 'tattva-bodha-375-desk.png', url: 'http://localhost:3000/learn/tattva-bodha/#verse-1', w: 375, h: 1600 },

  // Residential Gita
  { name: 'residential-gita-1280.png', url: 'http://localhost:3000/learn/residential-gita/', w: 1280, h: 950 },
  { name: 'residential-gita-375.png', url: 'http://localhost:3000/learn/residential-gita/', w: 375, h: 1200 },

  // Gita Online
  { name: 'gita-online-1280.png', url: 'http://localhost:3000/learn/gita-online/', w: 1280, h: 950 },
  { name: 'gita-online-375.png', url: 'http://localhost:3000/learn/gita-online/', w: 375, h: 1200 },

  // Sangyan
  { name: 'sangyan-1280.png', url: 'http://localhost:3000/learn/sangyan-sanatan-dharma/', w: 1280, h: 950 },
  { name: 'sangyan-375.png', url: 'http://localhost:3000/learn/sangyan-sanatan-dharma/', w: 375, h: 1200 },
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
