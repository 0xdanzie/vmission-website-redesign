const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to recursively get files excluding certain dirs
function getAllFiles(dir, excludeDirs = ['node_modules', '.git', '.next', 'out']) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.isDirectory()) {
      if (!excludeDirs.includes(item.name)) {
        results = results.concat(getAllFiles(path.join(dir, item.name), excludeDirs));
      }
    } else {
      results.push(path.join(dir, item.name));
    }
  }
  return results;
}

const allFiles = getAllFiles(rootDir);
console.log(`Total non-ignored files: ${allFiles.length}`);

// Load all text source files for reference tracing
const codeFiles = allFiles.filter(f => /\.(tsx?|jsx?|css|json|html|md)$/i.test(f));
const fileContents = {};
for (const f of codeFiles) {
  try {
    fileContents[f] = fs.readFileSync(f, 'utf8');
  } catch (e) {
    // binary or unreadable
  }
}

// 1. Search for secrets / sensitive strings
console.log('\n--- 1. SECRETS SCAN ---');
const secretPatterns = [
  /api[_-]?key/i,
  /secret/i,
  /password/i,
  /private[_-]?key/i,
  /bearer/i,
  /mongodb(\+srv)?:\/\//i,
  /postgres:\/\//i,
  /mysql:\/\//i,
  /smtp/i,
  /NEXT_PUBLIC_/
];

const secretMatches = [];
for (const f of codeFiles) {
  const relPath = path.relative(rootDir, f);
  // ignore audit scripts themselves
  if (relPath.startsWith('scripts\\audit-') || relPath.startsWith('scripts/audit-')) continue;
  const content = fileContents[f];
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    secretPatterns.forEach(pattern => {
      if (pattern.test(line)) {
        // filter out harmless references like "secret knowledge" in spiritual context or CSS classes
        if (/secret knowledge|spiritual secret|secret of life|adhyatma/i.test(line)) return;
        secretMatches.push({
          file: relPath,
          line: idx + 1,
          pattern: pattern.toString(),
          sample: line.trim().slice(0, 100)
        });
      }
    });
  });
}
console.log(`Potential secret / sensitive occurrences found: ${secretMatches.length}`);
secretMatches.forEach(m => console.log(`  [${m.file}:${m.line}] matches ${m.pattern}: ${m.sample}`));

// 2. Admin routes inspection
console.log('\n--- 2. ADMIN ROUTES INSPECTION ---');
const adminFiles = allFiles.filter(f => f.includes(path.sep + 'admin' + path.sep));
adminFiles.forEach(f => {
  const rel = path.relative(rootDir, f);
  const content = fs.readFileSync(f, 'utf8');
  const hasAuth = /auth|session|token|login|protect/i.test(content);
  const isClient = /['"]use client['"]/.test(content);
  console.log(`  ${rel}: isClient=${isClient}, mentionsAuth=${hasAuth}`);
});

// 3. DangerouslySetInnerHTML inspection
console.log('\n--- 3. DANGEROUSLY SET INNER HTML ---');
for (const f of codeFiles) {
  const content = fileContents[f];
  if (content && content.includes('dangerouslySetInnerHTML')) {
    const rel = path.relative(rootDir, f);
    console.log(`  DangerouslySetInnerHTML found in: ${rel}`);
  }
}

// 4. File uploads inspection
console.log('\n--- 4. FILE UPLOADS INSPECTION ---');
for (const f of codeFiles) {
  const content = fileContents[f];
  if (content && /type\s*=\s*['"]file['"]/i.test(content)) {
    const rel = path.relative(rootDir, f);
    console.log(`  File upload found in: ${rel}`);
  }
}

// 5. Contact & Donate data storage inspection
console.log('\n--- 5. CONTACT & DONATE STORAGE INSPECTION ---');
for (const f of codeFiles) {
  const rel = path.relative(rootDir, f);
  if (rel.includes('contact') || rel.includes('donate') || rel.includes('DataContext')) {
    const content = fileContents[f];
    const hasLocalStorage = /localStorage/.test(content);
    const hasFetch = /fetch\(/.test(content);
    console.log(`  ${rel}: localStorage=${hasLocalStorage}, fetch=${hasFetch}`);
  }
}

// 6. Security headers check in next.config.js
console.log('\n--- 6. NEXT.CONFIG INSPECTION ---');
const nextConfigPath = path.join(rootDir, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const nc = fs.readFileSync(nextConfigPath, 'utf8');
  console.log(`  next.config.js has headers: ${nc.includes('headers')}`);
}
