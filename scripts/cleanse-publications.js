const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'publications.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update Publication interface to make coverImage optional
content = content.replace(
  '  coverImage: string;\n',
  '  coverImage?: string;\n'
);

const startIdx = content.indexOf('export const PUBLICATIONS');
const arrayStart = content.indexOf('[', startIdx);
const exportPubsIdx = content.indexOf('export const publications', startIdx);
const arrayEnd = content.lastIndexOf('];', exportPubsIdx);

const arrayText = content.substring(arrayStart, arrayEnd + 1);
const items = eval(arrayText);

const seenIds = new Set();
const seenCoversByUniqueIssue = new Set();

let idFixCount = 0;
let tbSeverCount = 0;
let missingCoverClearCount = 0;
let collisionClearCount = 0;
let verifiedKeptCount = 0;

const cleanedItems = items.map(p => {
  const item = { ...p };

  // 1. Ensure unique IDs
  if (seenIds.has(item.id) && item.canonicalId) {
    item.id = item.canonicalId;
    idFixCount++;
  }
  seenIds.add(item.id);

  // 2. Validate and clean coverImage
  const currentCover = item.coverImage;
  const fileExists = currentCover && fs.existsSync(path.join(process.cwd(), 'public', currentCover));

  if (!fileExists) {
    item.coverImage = '';
    missingCoverClearCount++;
  } else if (currentCover.includes('study-text-tb-mula.jpg')) {
    // Strictly isolate Tattva Bodha
    if (item.id === 'study-text-000404' || item.id === 'book-000353') {
      verifiedKeptCount++;
    } else {
      item.coverImage = '';
      tbSeverCount++;
    }
  } else {
    // Verified asset exists on disk (VS / VP issue covers)
    if (seenCoversByUniqueIssue.has(currentCover)) {
      // Mapping collision: already used for another canonical record
      item.coverImage = '';
      collisionClearCount++;
    } else {
      seenCoversByUniqueIssue.add(currentCover);
      verifiedKeptCount++;
    }
  }

  return item;
});

console.log('Cleaned Items Summary:');
console.log('  Total Items:', cleanedItems.length);
console.log('  IDs Fixed via canonicalId:', idFixCount);
console.log('  Tattva Bodha Leaks Severed:', tbSeverCount);
console.log('  Missing / 404 Covers Cleared:', missingCoverClearCount);
console.log('  Mapping Collision Covers Cleared:', collisionClearCount);
console.log('  Verified Covers Preserved:', verifiedKeptCount);

const newArrayString = JSON.stringify(cleanedItems, null, 2);
const newContent = content.substring(0, arrayStart) + newArrayString + content.substring(arrayEnd + 1);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully written cleansed publications data to src/data/publications.ts');
