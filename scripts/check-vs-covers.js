const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const coversDir = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications', 'covers');
const diskFiles = fs.readdirSync(coversDir);

const vsDiskCovers = diskFiles.filter(f => f.startsWith('vs-'));
console.log(`VS disk covers count: ${vsDiskCovers.length}`);

const vsPubs = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');

// For each publication, find if there is an exact or unambiguous match to a disk cover
vsPubs.forEach((p, idx) => {
  // Let's check title: "Vedanta Sandesh — May 2021"
  const m = p.title.match(/Vedanta Sandesh — ([a-zA-Z]+)\s+(\d{4})/);
  if (m) {
    const month = m[1].toLowerCase().substring(0, 3);
    const year = m[2];
    const candidate = `vs-${year}-${month}-cover.jpg`;
    const exists = fs.existsSync(path.join(coversDir, candidate));
    console.log(`[${p.id}] ${p.canonicalId}: "${p.title}" -> ${candidate} (exists: ${exists})`);
  } else {
    console.log(`[${p.id}] ${p.canonicalId}: "${p.title}" -> NO MONTH/YEAR IN TITLE (month: ${p.month}, year: ${p.year})`);
  }
});
