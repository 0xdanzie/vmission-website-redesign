const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase53');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { slug: 'tattva-bodha', url: 'http://localhost:3000/learn/tattva-bodha/' },
  { slug: 'residential-gita', url: 'http://localhost:3000/learn/residential-gita/' },
  { slug: 'gita-online', url: 'http://localhost:3000/learn/gita-online/' },
  { slug: 'sangyan-sanatan-dharma', url: 'http://localhost:3000/learn/sangyan-sanatan-dharma/' }
];

for (const p of pages) {
  const p1280 = path.join(outDir, `${p.slug}-before-1280px.png`);
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1800 --screenshot="${p1280}" ${p.url}`);
  console.log(`Saved ${p1280}`);
}
