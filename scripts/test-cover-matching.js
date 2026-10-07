const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const coversDir = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications', 'covers');
const diskFiles = fs.readdirSync(coversDir);

// Build map of available covers on disk: key = "vs-2021-may", "vp-2021-jul", etc.
const diskMap = {};
diskFiles.forEach(f => {
  const m = f.match(/^(vs|vp)-(\d{4})-([a-z]{3})-cover\.(jpg|png|svg)$/);
  if (m) {
    diskMap[`${m[1]}-${m[2]}-${m[3]}`] = `/images/vmission/publications/covers/${f}`;
  }
});

console.log(`Available disk covers: ${Object.keys(diskMap).length}`);

const vsPubs = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');
const vpPubs = PUBLICATIONS.filter(p => p.type === 'Vedanta Piyush');

function findMatchingCover(p) {
  // 1. Direct key from id
  if (diskMap[p.id]) return { cover: diskMap[p.id], reason: 'direct-id' };
  
  // 2. From title: "Vedanta Sandesh — May 2021"
  const titleMatch = p.title.match(/(Sandesh|Piyush)\s*—\s*([a-zA-Z]+)\s+(\d{4})/i);
  if (titleMatch) {
    const prefix = titleMatch[1].toLowerCase() === 'sandesh' ? 'vs' : 'vp';
    const month = titleMatch[2].toLowerCase().substring(0, 3);
    const year = titleMatch[3];
    const key = `${prefix}-${year}-${month}`;
    if (diskMap[key]) return { cover: diskMap[key], reason: 'title-match' };
  }
  
  // 3. From downloadUrl or mirrors
  const allUrls = [p.downloadUrl, p.readOnlineUrl, ...(p.mirrors ? Object.values(p.mirrors) : [])].join(' ');
  const urlMatch = allUrls.match(/(sandesh|piyush)[-_ ]?([a-z]{3,9})[-_ ]?(\d{4})/i) || allUrls.match(/([a-z]{3,9})[-_ ]?(\d{4})[-_ ]?(sandesh|piyush)/i);
  if (urlMatch) {
    // try to match
  }
  
  return null;
}

const vsMatches = vsPubs.map(p => ({ p, match: findMatchingCover(p) }));
const vpMatches = vpPubs.map(p => ({ p, match: findMatchingCover(p) }));

console.log(`VS matched: ${vsMatches.filter(x => x.match).length} / ${vsPubs.length}`);
console.log(`VP matched: ${vpMatches.filter(x => x.match).length} / ${vpPubs.length}`);

// Let's see what matched in VS
const matchedVsTitles = vsMatches.filter(x => x.match).map(x => `${x.p.id} (${x.p.canonicalId}): ${x.p.title} -> ${x.match.cover}`);
console.log('VS Matches sample:', matchedVsTitles.slice(0, 15));

// Let's see what matched in VP
const matchedVpTitles = vpMatches.filter(x => x.match).map(x => `${x.p.id} (${x.p.canonicalId}): ${x.p.title} -> ${x.match.cover}`);
console.log('VP Matches sample:', matchedVpTitles.slice(0, 15));
