const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/publications.ts', 'utf8');
const startIdx = content.indexOf('export const PUBLICATIONS');
const arrayStart = content.indexOf('[', startIdx);
const exportPubsIdx = content.indexOf('export const publications', startIdx);
const arrayEnd = content.lastIndexOf('];', exportPubsIdx);

const arrayText = content.substring(arrayStart, arrayEnd + 1);
const items = eval(arrayText);

console.log('=== AUTHORITATIVE PUBLICATION DATA AUDIT (GATE 1) ===');
console.log('Total publications count:', items.length);

const byType = {};
const byYear = {};
const byLanguage = {};
let withRealCover = 0;
let withoutRealCover = 0;

items.forEach(p => {
  // Type
  byType[p.type] = (byType[p.type] || 0) + 1;
  
  // Year
  const yr = p.year ? String(p.year) : 'No Year';
  byYear[yr] = (byYear[yr] || 0) + 1;

  // Language
  byLanguage[p.language] = (byLanguage[p.language] || 0) + 1;

  // Real cover file verification
  if (p.coverImage) {
    const fullPath = path.join(process.cwd(), 'public', p.coverImage);
    if (fs.existsSync(fullPath)) {
      withRealCover++;
    } else {
      withoutRealCover++;
    }
  } else {
    withoutRealCover++;
  }
});

console.log('\nExact Count by Publication Type:');
Object.entries(byType).forEach(([type, count]) => {
  console.log(`  - ${type}: ${count}`);
});

console.log('\nExact Count by Language:');
Object.entries(byLanguage).forEach(([lang, count]) => {
  console.log(`  - ${lang}: ${count}`);
});

console.log(`\nCover Status:`);
console.log(`  - Verified Real Cover on disk: ${withRealCover}`);
console.log(`  - Editorial Archival Placeholder: ${withoutRealCover}`);

// Years
const sortedYears = Object.keys(byYear).filter(y => y !== 'No Year').map(Number).sort((a,b) => a - b);
console.log('\nYear Distribution across ALL 250 items:');
sortedYears.forEach(y => {
  console.log(`  - Year ${y}: ${byYear[y]} items`);
});
if (byYear['No Year']) {
  console.log(`  - Undated/No Year: ${byYear['No Year']} items`);
}

// By Type and Year Breakdown
console.log('\nPer-Type Year Distribution:');
for (const type of Object.keys(byType)) {
  const subset = items.filter(p => p.type === type);
  const yrs = {};
  subset.forEach(p => {
    const y = p.year || 'Undated';
    yrs[y] = (yrs[y] || 0) + 1;
  });
  console.log(`  [${type}] (Total: ${subset.length}) =>`, yrs);
}

// E-Books detailed inspection
console.log('\n--- E-Books Detailed Audit ---');
const ebooks = items.filter(p => p.type === 'E-Books');
ebooks.forEach(eb => {
  const pPath = eb.coverImage ? path.join(process.cwd(), 'public', eb.coverImage) : null;
  const exists = pPath ? fs.existsSync(pPath) : false;
  console.log(`  - [${eb.id}] "${eb.title}"`);
  console.log(`    Cover: ${eb.coverImage} (on disk: ${exists})`);
  console.log(`    Year: ${eb.year || 'N/A'} | Lang: ${eb.language} | Author: ${eb.author || 'N/A'}`);
  console.log(`    Download: ${eb.downloadUrl}`);
});

// Study & Chant Texts inspection
console.log('\n--- Study & Chant Texts Sample ---');
const study = items.filter(p => p.type === 'Study & Chant Texts');
const studyWithCovers = study.filter(s => s.coverImage && fs.existsSync(path.join(process.cwd(), 'public', s.coverImage)));
console.log(`  Total: ${study.length} | With verified cover files: ${studyWithCovers.length}`);
studyWithCovers.forEach(s => {
  console.log(`    - [${s.id}] "${s.title}" => ${s.coverImage}`);
});
