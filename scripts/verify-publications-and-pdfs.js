const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Extract ebooksData and studyTextsData from generate-publications-data.js
const code = fs.readFileSync(path.join(__dirname, 'generate-publications-data.js'), 'utf8');

// Run in VM to get the data arrays
const vm = require('vm');
const sandbox = { fs, path, __dirname, console, sandeshList: [], piyushList: [] };
vm.createContext(sandbox);

// Let's inspect ebooksData and studyTextsData
const extractRegex = /(const ebooksData = [\s\S]*?const studyTextsData = [\s\S]*?\];)/;
const match = code.match(extractRegex);

if (!match) {
  console.error('Failed to match ebooks and study texts arrays');
  process.exit(1);
}

vm.runInContext(match[1] + '\nsandboxData = { ebooksData, studyTextsData };', sandbox);
const { ebooksData, studyTextsData } = sandbox.sandboxData;

console.log(`Found ${ebooksData.length} E-Books and ${studyTextsData.length} Study Texts.`);

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'] || res.headers['x-archive-orig-content-length'],
          location: res.headers['location']
        });
      });
      req.on('error', (err) => resolve({ error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ error: 'Timeout' }); });
      req.end();
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

(async () => {
  console.log('\n======================================================');
  console.log('   FORENSIC AUDIT: E-BOOKS PDF & COVER RESOLUTION');
  console.log('======================================================');
  for (const eb of ebooksData) {
    const pdfRes = await checkUrl(eb.downloadUrl);
    const coverRes = await checkUrl(eb.coverImage);
    console.log(`\nE-BOOK: [${eb.id}] "${eb.title}"`);
    console.log(`  PDF:   ${eb.downloadUrl}`);
    console.log(`         Status: ${pdfRes.statusCode || pdfRes.error} | Length: ${pdfRes.contentLength || 'N/A'} | Type: ${pdfRes.contentType || 'N/A'}`);
    console.log(`  Cover: ${eb.coverImage}`);
    console.log(`         Status: ${coverRes.statusCode || coverRes.error} | Length: ${coverRes.contentLength || 'N/A'}`);
  }

  console.log('\n======================================================');
  console.log('   FORENSIC AUDIT: STUDY TEXTS PDF RESOLUTION');
  console.log('======================================================');
  for (const st of studyTextsData) {
    const pdfRes = await checkUrl(st.downloadUrl);
    console.log(`\nSTUDY TEXT: [${st.id}] "${st.title}"`);
    console.log(`  PDF:   ${st.downloadUrl}`);
    console.log(`         Status: ${pdfRes.statusCode || pdfRes.error} | Length: ${pdfRes.contentLength || 'N/A'} | Type: ${pdfRes.contentType || 'N/A'}`);
  }
})();
