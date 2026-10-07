const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/publications.ts', 'utf8');

// Find start of array: export const PUBLICATIONS: Publication[] = [
const startIdx = content.indexOf('export const PUBLICATIONS');
const arrayStart = content.indexOf('[', startIdx);
const exportPubsIdx = content.indexOf('export const publications', startIdx);
const arrayEnd = content.lastIndexOf('];', exportPubsIdx);

// Extract the array text and evaluate it
const arrayText = content.substring(arrayStart, arrayEnd + 1);
const items = eval(arrayText);

console.log('Total parsed publications:', items.length);

let existing = 0;
let missing = 0;
let tbLeakCount = 0;
const missingByPath = {};
const existingByPath = {};
const auditTrail = [];

items.forEach(p => {
  const cover = p.coverImage;
  let fileExists = false;
  if (cover) {
    const localPath = path.join(process.cwd(), 'public', cover);
    fileExists = fs.existsSync(localPath);
  }
  
  let isTbLeak = false;
  if (cover && cover.includes('study-text-tb-mula.jpg')) {
    if (p.id !== 'book-000353' && !p.title.toLowerCase().includes('tattva bodha')) {
      isTbLeak = true;
      tbLeakCount++;
    }
  }

  if (fileExists) {
    existing++;
    existingByPath[cover] = (existingByPath[cover] || 0) + 1;
  } else {
    missing++;
    if (cover) {
      missingByPath[cover] = (missingByPath[cover] || 0) + 1;
    }
  }

  auditTrail.push({
    id: p.id,
    type: p.type,
    title: p.title,
    year: p.year,
    month: p.month,
    currentMedia: cover,
    fileExists,
    isTbLeak
  });
});

console.log('Existing on disk:', existing);
console.log('Missing from disk:', missing);
console.log('Tattva Bodha Leak Cases:', tbLeakCount);

console.log('\nMissing paths breakdown:');
for (const [k, v] of Object.entries(missingByPath)) {
  console.log(`  ${k}: ${v} items`);
}

// Category breakdown
const catBreakdown = {};
items.forEach(p => {
  catBreakdown[p.type] = (catBreakdown[p.type] || 0) + 1;
});
console.log('\nCategory breakdown:', catBreakdown);

// Study texts cover analysis
const studyTexts = items.filter(p => p.type === 'Study & Chant Texts');
console.log('\nStudy & Chant Texts count:', studyTexts.length);
const studyTextCovers = {};
studyTexts.forEach(p => {
  studyTextCovers[p.coverImage] = (studyTextCovers[p.coverImage] || 0) + 1;
});
console.log('Study text covers distribution:', studyTextCovers);

// Ebooks analysis
const ebooks = items.filter(p => p.type === 'E-Books');
console.log('\nEbooks count:', ebooks.length);
ebooks.forEach(e => {
  const localPath = e.coverImage ? path.join(process.cwd(), 'public', e.coverImage) : '';
  const exists = e.coverImage ? fs.existsSync(localPath) : false;
  console.log(`  ${e.id} | ${e.title} | ${e.coverImage} | exists: ${exists}`);
});

fs.writeFileSync('scratch_audit.json', JSON.stringify(auditTrail, null, 2));
