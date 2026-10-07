const fs = require('fs');

const at = JSON.parse(fs.readFileSync('./publication_audit_trail.json', 'utf8'));

const recoveredBooks = {
  'book-000348': {
    media: '/images/vmission/publications/ebook-va06.jpg',
    reason: 'Recovered authentic publisher cover scan from WordPress /e-books/ (Screenshot-2025-11-17-072223_167x238.jpg)'
  },
  'book-000349': {
    media: '/images/vmission/publications/ebook-va04.png',
    reason: 'Recovered authentic publisher cover scan from WordPress /e-books/ (v-arti4_169x239.png)'
  },
  'book-000350': {
    media: '/images/vmission/publications/ebook-va03.png',
    reason: 'Recovered authentic publisher cover scan from WordPress /e-books/ (v-arti3_169x239.png)'
  },
  'book-000351': {
    media: '/images/vmission/publications/ebook-va02.jpg',
    reason: 'Recovered authentic publisher cover scan from WordPress /e-books/ (cp_170x240.jpg)'
  },
  'book-000352': {
    media: '/images/vmission/publications/ebook-va01.jpg',
    reason: 'Recovered authentic publisher cover scan from WordPress /e-books/ (v-arti_170x240.jpg)'
  }
};

at.forEach(entry => {
  if (recoveredBooks[entry.entityId]) {
    const rec = recoveredBooks[entry.entityId];
    entry.previousMediaPath = '/images/vmission/publications/book-placeholder.jpg';
    entry.reasonRemoved = 'Legacy placeholder replaced by recovered authentic source cover';
    entry.replacementState = rec.media;
    entry.verificationStatus = 'VERIFIED_SOURCE_COVER';
    entry.notes = rec.reason;
  }
});

fs.writeFileSync('./publication_audit_trail.json', JSON.stringify(at, null, 2));
console.log('Updated publication_audit_trail.json with recovered e-book covers.');
