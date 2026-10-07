const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

console.log('====================================================');
console.log('PHASE 4C.1 FULL-CORPUS VERIFICATION SUITE');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// 1. Corpus Size
assert(PUBLICATIONS.length === 250, `Corpus contains exactly 250 publications: received ${PUBLICATIONS.length}`);

// 2. E-Books Verification (All 6 e-books mapped to unique, existing source covers)
const ebooks = PUBLICATIONS.filter(p => p.type === 'E-Books');
assert(ebooks.length === 6, `Found exactly 6 canonical E-Books: received ${ebooks.length}`);

const expectedEbookCovers = {
  'book-000348': '/images/vmission/publications/ebook-va06.jpg',
  'book-000349': '/images/vmission/publications/ebook-va04.png',
  'book-000350': '/images/vmission/publications/ebook-va03.png',
  'book-000351': '/images/vmission/publications/ebook-va02.jpg',
  'book-000352': '/images/vmission/publications/ebook-va01.jpg',
  'book-000353': '/images/vmission/publications/study-text-tb-mula.jpg'
};

const uniqueCovers = new Set();
ebooks.forEach(b => {
  const expected = expectedEbookCovers[b.id];
  assert(b.coverImage === expected, `${b.id} ("${b.title}") mapped to ${expected}: received ${b.coverImage}`);
  const absPath = path.join(__dirname, '..', 'public', b.coverImage);
  assert(fs.existsSync(absPath), `Cover file exists on disk: ${b.coverImage}`);
  uniqueCovers.add(b.coverImage);
});

assert(uniqueCovers.size === 6, `All 6 E-Books have unique, non-duplicated covers: found ${uniqueCovers.size}`);

// 3. Tattva Bodha Isolation Rule
const tbCoverUsages = PUBLICATIONS.filter(p => p.coverImage && p.coverImage.includes('study-text-tb-mula.jpg'));
assert(tbCoverUsages.length === 1, `Exactly 1 publication references study-text-tb-mula.jpg: received ${tbCoverUsages.length}`);
assert(tbCoverUsages[0]?.id === 'book-000353', `study-text-tb-mula.jpg scoped strictly to book-000353: received ${tbCoverUsages[0]?.id}`);

const tbRootText = PUBLICATIONS.find(p => p.id === 'study-text-000404' || p.canonicalId === 'canonical-000404');
assert(!tbRootText?.coverImage, `Tattva Bodha root text study-text-000404 has null/empty coverImage to prevent leakage`);

// 4. File existence for all non-empty covers
let missingFiles = 0;
PUBLICATIONS.forEach(p => {
  if (p.coverImage) {
    const absPath = path.join(__dirname, '..', 'public', p.coverImage);
    if (!fs.existsSync(absPath)) {
      missingFiles++;
      console.error(`Missing cover file: ${p.coverImage} for ${p.id}`);
    }
  }
});
assert(missingFiles === 0, `Zero missing cover files across all 250 publications: received ${missingFiles} missing`);

// 5. Forensic Ledger Validation
const ledgerPath = path.join(__dirname, '..', 'docs', 'migration', 'PHASE-4C1-FORENSIC-AUDIT-LEDGER.json');
assert(fs.existsSync(ledgerPath), `Forensic ledger JSON exists at docs/migration/PHASE-4C1-FORENSIC-AUDIT-LEDGER.json`);
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
assert(ledger.length === 250, `Ledger records all 250 publications: received ${ledger.length}`);

const statusCounts = {};
ledger.forEach(r => {
  statusCounts[r.mediaStatus] = (statusCounts[r.mediaStatus] || 0) + 1;
});
console.log('Ledger Status Breakdown:', statusCounts);
assert(statusCounts['VERIFIED SOURCE COVER'] === 12, `12 Verified Source Covers recorded in ledger`);
assert(statusCounts['EDITORIAL PLACEHOLDER'] === 202, `202 Editorial Placeholders recorded in ledger`);
assert(statusCounts['VERIFY HOLD'] === 36, `36 Verify Holds recorded in ledger`);

// 6. CSV Ledger Validation
const csvPath = path.join(__dirname, '..', 'docs', 'migration', 'PHASE-4C1-FORENSIC-AUDIT-LEDGER.csv');
assert(fs.existsSync(csvPath), `Forensic ledger CSV exists at docs/migration/PHASE-4C1-FORENSIC-AUDIT-LEDGER.csv`);
const csvLines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
assert(csvLines.length === 251, `CSV contains 1 header + 250 data rows: received ${csvLines.length}`);

console.log(`\n====================================================`);
console.log(`FULL-CORPUS VERIFICATION COMPLETE: ${passed} / ${total} PASSED`);
console.log(`====================================================`);

if (passed !== total) {
  process.exit(1);
}
