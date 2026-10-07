const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'archive_data');

function extractHrefs(html) {
  const regex = /href=["']([^"']+)["']/gi;
  const hrefs = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1]);
  }
  return hrefs;
}

function extractImages(html) {
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  const imgs = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    imgs.push(match[1]);
  }
  return imgs;
}

function extractIframes(html) {
  const regex = /<iframe[^>]+src=["']([^"']+)["']/gi;
  const iframes = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    iframes.push(match[1]);
  }
  return iframes;
}

function analyze() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'pages_index.json');
  const summary = {};

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const html = content.content?.rendered || '';
    
    const hrefs = extractHrefs(html);
    const imgs = extractImages(html);
    const iframes = extractIframes(html);

    // Audio links (.mp3)
    const mp3s = hrefs.filter(h => h.toLowerCase().includes('.mp3'));
    // PDF links (.pdf)
    const pdfs = hrefs.filter(h => h.toLowerCase().includes('.pdf'));
    // YouTube links
    const youtube = hrefs.concat(iframes).filter(h => h.includes('youtube.com') || h.includes('youtu.be'));
    // GDrive links
    const gdrive = hrefs.filter(h => h.includes('drive.google.com'));
    // Box links
    const box = hrefs.filter(h => h.includes('box.com'));
    // pCloud links
    const pcloud = hrefs.filter(h => h.includes('pcloud') || h.includes('pc.cd'));
    // Archive.org links
    const archiveOrg = hrefs.filter(h => h.includes('archive.org'));
    // Issuu links
    const issuu = hrefs.filter(h => h.includes('issuu.com'));

    summary[file] = {
      title: content.title?.rendered,
      totalHrefs: hrefs.length,
      totalImages: imgs.length,
      mp3s: Array.from(new Set(mp3s)),
      pdfs: Array.from(new Set(pdfs)),
      youtube: Array.from(new Set(youtube)),
      gdrive: Array.from(new Set(gdrive)),
      box: Array.from(new Set(box)),
      pcloud: Array.from(new Set(pcloud)),
      archiveOrg: Array.from(new Set(archiveOrg)),
      issuu: Array.from(new Set(issuu)),
      sampleImages: imgs.slice(0, 5)
    };
  }

  fs.writeFileSync(path.join(__dirname, 'archive_summary.json'), JSON.stringify(summary, null, 2));
  console.log('Archive summary written to scripts/archive_summary.json');

  for (const [file, data] of Object.entries(summary)) {
    console.log(`\n=== ${file} (${data.title}) ===`);
    console.log(`Images: ${data.totalImages}, MP3s: ${data.mp3s.length}, PDFs: ${data.pdfs.length}, YouTube: ${data.youtube.length}, GDrive: ${data.gdrive.length}, Archive.org: ${data.archiveOrg.length}, pCloud: ${data.pcloud.length}`);
  }
}

analyze();
