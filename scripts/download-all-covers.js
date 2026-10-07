const fs = require('fs');
const path = require('path');

const sandesh = JSON.parse(fs.readFileSync(path.join(__dirname, 'sandesh_extracted.json'), 'utf8'));
const piyush = JSON.parse(fs.readFileSync(path.join(__dirname, 'piyush_extracted.json'), 'utf8'));

const outDir = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications', 'covers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Map of remote URL -> local file
const urlMap = {};

async function download(url, filename) {
  const dest = path.join(outDir, filename);
  if (fs.existsSync(dest)) {
    return true;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed ${res.status}: ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return true;
  } catch (e) {
    console.error(`Error ${url}: ${e.message}`);
    return false;
  }
}

async function run() {
  console.log('Downloading Sandesh covers...');
  let sSuccess = 0;
  for (const s of sandesh) {
    const ext = path.extname(new URL(s.coverImage).pathname) || '.jpg';
    const filename = `${s.id}-cover${ext}`;
    const ok = await download(s.coverImage, filename);
    if (ok) {
      sSuccess++;
      s.localCover = `/images/vmission/publications/covers/${filename}`;
    }
  }
  console.log(`Sandesh covers downloaded: ${sSuccess} / ${sandesh.length}`);

  console.log('Downloading Piyush covers...');
  let pSuccess = 0;
  for (const p of piyush) {
    const ext = path.extname(new URL(p.coverImage).pathname) || '.jpg';
    const filename = `${p.id}-cover${ext}`;
    const ok = await download(p.coverImage, filename);
    if (ok) {
      pSuccess++;
      p.localCover = `/images/vmission/publications/covers/${filename}`;
    }
  }
  console.log(`Piyush covers downloaded: ${pSuccess} / ${piyush.length}`);

  fs.writeFileSync(path.join(__dirname, 'sandesh_extracted.json'), JSON.stringify(sandesh, null, 2));
  fs.writeFileSync(path.join(__dirname, 'piyush_extracted.json'), JSON.stringify(piyush, null, 2));
  console.log('Updated sandesh_extracted.json and piyush_extracted.json with localCover paths!');
}

run();
