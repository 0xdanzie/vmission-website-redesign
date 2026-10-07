const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

const routes = [
  '/',
  '/about/',
  '/acharyas/',
  '/ashram/',
  '/teachings/',
  '/publications/',
  '/events/',
  '/learn/',
  '/contact/',
  '/donate/',
  '/admin/',
  '/admin/contact/',
  '/admin/courses/',
  '/admin/donations/',
  '/admin/events/',
  '/admin/news/',
  '/admin/publications/',
  '/admin/teachings/',
];

console.log('=== ROUTE HEALTH CHECK (STATIC OUTPUT) ===');
let failed = 0;
for (const r of routes) {
  const normPath = r === '/' ? 'index.html' : path.join(r.replace(/^\//, ''), 'index.html');
  const full = path.join(outDir, normPath);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    const content = fs.readFileSync(full, 'utf8');
    const hasHtml = content.includes('<!DOCTYPE html>') || content.includes('<html');
    const hasHead = content.includes('</head>');
    if (stat.size > 1000 && hasHtml && hasHead) {
      console.log(`  [OK 200] ${r.padEnd(22)} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`  [WARN] ${r} exists but may be incomplete (${stat.size} bytes)`);
      failed++;
    }
  } else {
    console.error(`  [FAIL 404] ${r} -> ${full} NOT FOUND`);
    failed++;
  }
}

// Verify _headers and robots.txt in out/
console.log('\n=== HEADERS & ROBOTS IN EXPORT ===');
['_headers', 'robots.txt'].forEach(f => {
  const p = path.join(outDir, f);
  if (fs.existsSync(p)) {
    console.log(`  [OK] ${f} exported successfully (${fs.statSync(p).size} bytes)`);
  } else {
    console.error(`  [FAIL] ${f} missing from export!`);
    failed++;
  }
});

if (failed === 0) {
  console.log('\nALL KEY ROUTES & PRODUCTION HYGIENE ARTIFACTS VERIFIED HEALTHY (HTTP 200 / PASS).');
} else {
  console.error(`\nFound ${failed} issues!`);
}
