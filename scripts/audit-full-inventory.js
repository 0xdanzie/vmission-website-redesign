const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

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

// Load all project text files for searching references
const textExts = /\.(tsx?|jsx?|css|json|html|md|mjs|cjs)$/i;
const searchableFiles = allFiles.filter(f => textExts.test(f));
const searchableData = searchableFiles.map(f => ({
  path: f,
  rel: path.relative(rootDir, f).replace(/\\/g, '/'),
  content: fs.readFileSync(f, 'utf8')
}));

// Source files only (src/) for public asset referencing
const srcFiles = searchableData.filter(d => d.rel.startsWith('src/'));

// 1. Audit public/ assets
console.log('=== PUBLIC ASSET AUDIT ===');
const publicFiles = allFiles.filter(f => {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  return rel.startsWith('public/');
});

const unusedPublicFiles = [];
const usedPublicFiles = [];

for (const pf of publicFiles) {
  const rel = path.relative(rootDir, pf).replace(/\\/g, '/');
  // strip 'public/' prefix to get URL path
  const urlPath = rel.replace(/^public\//, '/');
  const filename = path.basename(pf);

  // Check if referenced in src
  let isRef = false;
  let refCount = 0;
  const refs = [];

  for (const sf of srcFiles) {
    if (sf.content.includes(urlPath) || sf.content.includes(filename)) {
      isRef = true;
      refCount++;
      refs.push(sf.rel);
    }
  }

  // Also check if referenced anywhere in scripts or docs
  let nonSrcRefCount = 0;
  for (const sf of searchableData) {
    if (!sf.rel.startsWith('src/')) {
      if (sf.content.includes(urlPath) || sf.content.includes(filename)) {
        nonSrcRefCount++;
      }
    }
  }

  const stat = fs.statSync(pf);
  if (!isRef) {
    unusedPublicFiles.push({ rel, size: stat.size, filename, nonSrcRefCount });
  } else {
    usedPublicFiles.push({ rel, size: stat.size, refCount, refs: refs.slice(0, 3) });
  }
}

console.log(`Total public files: ${publicFiles.length}`);
console.log(`Public files directly referenced in src/: ${usedPublicFiles.length}`);
console.log(`Public files NOT directly referenced in src/: ${unusedPublicFiles.length}`);

// Inspect the unused ones in detail
console.log('\nSample unreferenced public files:');
unusedPublicFiles.slice(0, 30).forEach(u => {
  console.log(`  ${u.rel} (${(u.size/1024).toFixed(1)} KB) - nonSrcRefs: ${u.nonSrcRefCount}`);
});

// 2. Audit src/ components
console.log('\n=== SRC COMPONENT AUDIT ===');
const componentFiles = allFiles.filter(f => {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  return rel.startsWith('src/components/') && /\.(tsx|jsx)$/.test(f);
});

const unusedComponents = [];
for (const cf of componentFiles) {
  const rel = path.relative(rootDir, cf).replace(/\\/g, '/');
  const compName = path.basename(cf, path.extname(cf));
  
  let refCount = 0;
  const refs = [];
  for (const sf of srcFiles) {
    if (sf.rel === rel) continue;
    if (sf.content.includes(compName)) {
      refCount++;
      refs.push(sf.rel);
    }
  }
  if (refCount === 0) {
    unusedComponents.push({ rel, compName });
  } else {
    console.log(`  [IN USE] ${compName}: referenced ${refCount} times (e.g. ${refs[0]})`);
  }
}
console.log(`Total components: ${componentFiles.length}, Unused components: ${unusedComponents.length}`);
unusedComponents.forEach(u => console.log(`  [UNUSED] ${u.rel}`));

// 3. Audit src/ styles / CSS modules
console.log('\n=== CSS MODULE AUDIT ===');
const cssFiles = allFiles.filter(f => {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  return rel.startsWith('src/') && rel.endsWith('.module.css');
});

const unusedCss = [];
for (const cssF of cssFiles) {
  const rel = path.relative(rootDir, cssF).replace(/\\/g, '/');
  const cssName = path.basename(cssF);
  let refCount = 0;
  for (const sf of srcFiles) {
    if (sf.rel === rel) continue;
    if (sf.content.includes(cssName)) {
      refCount++;
    }
  }
  if (refCount === 0) {
    unusedCss.push(rel);
  }
}
console.log(`Total CSS modules: ${cssFiles.length}, Unused CSS modules: ${unusedCss.length}`);
unusedCss.forEach(u => console.log(`  [UNUSED CSS] ${u}`));

// 4. Audit scratch/ directory
console.log('\n=== SCRATCH/ AUDIT ===');
const scratchFiles = allFiles.filter(f => {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  return rel.startsWith('scratch/');
});
console.log(`Total files in scratch/: ${scratchFiles.length}`);
scratchFiles.forEach(sf => {
  const rel = path.relative(rootDir, sf).replace(/\\/g, '/');
  const stat = fs.statSync(sf);
  console.log(`  ${rel} (${(stat.size/1024).toFixed(1)} KB)`);
});

// 5. Audit scratch_audit.json and publication_audit_trail.json
console.log('\n=== ROOT JSON AUDIT ===');
['scratch_audit.json', 'publication_audit_trail.json'].forEach(jf => {
  const full = path.join(rootDir, jf);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    let refs = 0;
    for (const sf of searchableData) {
      if (sf.rel !== jf && sf.content.includes(jf)) refs++;
    }
    console.log(`  ${jf}: size=${(stat.size/1024).toFixed(1)} KB, references=${refs}`);
  }
});
