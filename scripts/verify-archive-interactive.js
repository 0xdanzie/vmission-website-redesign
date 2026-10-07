const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('====================================================');
console.log('TESTING COMPLETE ARCHIVE INTERACTIVE CAPABILITIES');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let receivedResults = null;

const bridgeServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/save-archive-test') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        receivedResults = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400);
        res.end(e.message);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

bridgeServer.listen(3336, async () => {
  const runnerHtml = `<!DOCTYPE html>
<html>
<head><title>Archive Interactive Test</title></head>
<body>
<iframe id="testFrame" style="width: 1280px; height: 900px;" src="/publications/"></iframe>
<script>
  (async () => {
    const iframe = document.getElementById('testFrame');
    await new Promise(r => iframe.onload = r);
    await new Promise(r => setTimeout(r, 400));

    const doc = iframe.contentDocument;
    const results = {};

    // 1. Initial count
    const initialArticles = doc.querySelectorAll('#archive-browser article').length;
    results.initialCardCount = initialArticles; // Expect 24

    // 2. Click "Load Next 24"
    const loadMoreBtn = doc.querySelector('button[class*="btnLoadMore"]');
    if (loadMoreBtn) {
      loadMoreBtn.click();
      await new Promise(r => setTimeout(r, 100));
      results.afterLoadMoreCount = doc.querySelectorAll('#archive-browser article').length; // Expect 48
    }

    // 3. Click "View All"
    const loadAllBtn = doc.querySelector('button[class*="btnLoadAll"]');
    if (loadAllBtn) {
      loadAllBtn.click();
      await new Promise(r => setTimeout(r, 100));
      results.afterLoadAllCount = doc.querySelectorAll('#archive-browser article').length; // Expect 250
    }

    // 4. Test Category Filter "E-Books"
    const typeTabs = Array.from(doc.querySelectorAll('button[class*="typeTab"]'));
    const ebookTab = typeTabs.find(t => t.innerText.includes('E-Books'));
    if (ebookTab) {
      ebookTab.click();
      await new Promise(r => setTimeout(r, 100));
      results.ebooksFilteredCount = doc.querySelectorAll('#archive-browser article').length; // Expect 6
    }

    // 5. Test Year Filter "2020"
    const yearPills = Array.from(doc.querySelectorAll('button[class*="yearPill"]'));
    const pill2020 = yearPills.find(p => p.innerText.trim() === '2020');
    // First reset to All Archive
    typeTabs[0].click();
    await new Promise(r => setTimeout(r, 100));
    if (pill2020) {
      pill2020.click();
      await new Promise(r => setTimeout(r, 100));
      results.year2020FilteredCount = doc.querySelectorAll('#archive-browser article').length; // Expect 4
    }

    // 6. Test Search Query "Mandukya"
    const allYearsPill = yearPills.find(p => p.innerText.trim() === 'All');
    allYearsPill.click();
    await new Promise(r => setTimeout(r, 100));

    const searchInput = doc.querySelector('input[type="search"]');
    if (searchInput) {
      searchInput.value = 'Mandukya';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise(r => setTimeout(r, 150));
      results.searchMandukyaCount = doc.querySelectorAll('#archive-browser article').length;
    }

    await fetch('http://localhost:3336/save-archive-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
  })();
</script>
</body>
</html>`;

  const outRunnerPath = path.join(__dirname, '..', 'out', 'archive-test-runner.html');
  fs.writeFileSync(outRunnerPath, runnerHtml, 'utf8');

  try {
    const chromeProc = spawn(chromePath, ['--headless=new', '--disable-gpu', 'http://localhost:3000/archive-test-runner.html']);
    const startWait = Date.now();
    while (!receivedResults && Date.now() - startWait < 20000) {
      await new Promise(r => setTimeout(r, 300));
    }
    chromeProc.kill();

    if (receivedResults) {
      console.log('Interactive Archive Test Results:', receivedResults);
      const outJsonPath = path.join(__dirname, '..', 'docs', 'qa', 'PHASE-5.1-ARCHIVE-INTERACTIVE.json');
      fs.writeFileSync(outJsonPath, JSON.stringify(receivedResults, null, 2));
    } else {
      console.error('Archive test timed out.');
    }
  } finally {
    bridgeServer.close();
    if (fs.existsSync(outRunnerPath)) fs.unlinkSync(outRunnerPath);
  }
});
