const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const coversDir = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications', 'covers');
const diskFiles = fs.readdirSync(coversDir);

console.log(`Total files in covers dir: ${diskFiles.length}`);

// Map disk files by normalized key: e.g. "vs-2021-may" or "vp-2021-may"
const diskMap = {};
diskFiles.forEach(f => {
  // e.g. vs-2021-may-cover.jpg -> key: vs-2021-may
  const match = f.match(/^(vs|vp)-(\d{4})-([a-z]{3})-cover\.(jpg|png|svg)$/);
  if (match) {
    const key = `${match[1]}-${match[2]}-${match[3]}`;
    diskMap[key] = f;
  }
});

console.log(`Indexed ${Object.keys(diskMap).length} standard covers.`);

// Check publications matching
const vsPubs = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');
const vpPubs = PUBLICATIONS.filter(p => p.type === 'Vedanta Piyush');

console.log(`\nVedanta Sandesh publications count: ${vsPubs.length}`);
let vsMatched = 0;
let vsUnmatched = [];

vsPubs.forEach(p => {
  // Try matching by id or month/year
  let key = p.id;
  if (p.year && p.month) {
    const mStr = p.month.toLowerCase().substring(0, 3);
    key = `vs-${p.year}-${mStr}`;
  }
  if (diskMap[key]) {
    vsMatched++;
  } else {
    vsUnmatched.push({ id: p.id, title: p.title, year: p.year, month: p.month, canonicalId: p.canonicalId });
  }
});

console.log(`VS Matched: ${vsMatched}, Unmatched: ${vsUnmatched.length}`);
console.log('Sample unmatched VS:', vsUnmatched.slice(0, 10));

console.log(`\nVedanta Piyush publications count: ${vpPubs.length}`);
let vpMatched = 0;
let vpUnmatched = [];

vpPubs.forEach(p => {
  let key = p.id;
  if (p.year && p.month) {
    const mStr = p.month.toLowerCase().substring(0, 3);
    key = `vp-${p.year}-${mStr}`;
  }
  if (diskMap[key]) {
    vpMatched++;
  } else {
    vpUnmatched.push({ id: p.id, title: p.title, year: p.year, month: p.month, canonicalId: p.canonicalId });
  }
});

console.log(`VP Matched: ${vpMatched}, Unmatched: ${vpUnmatched.length}`);
console.log('Sample unmatched VP:', vpUnmatched.slice(0, 10));
