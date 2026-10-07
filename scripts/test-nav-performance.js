const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('====================================================');
console.log('GATE 2 & GATE 3: BROWSER NAVIGATION BENCHMARK');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routesToTest = [
  { from: '/events/', to: '/about/', label: '/events → /about' },
  { from: '/events/', to: '/learn/', label: '/events → /learn' },
  { from: '/events/', to: '/teachings/', label: '/events → /teachings' },
  { from: '/events/', to: '/publications/', label: '/events → /publications' },
  { from: '/learn/', to: '/about/', label: '/learn → /about' },
  { from: '/learn/', to: '/teachings/', label: '/learn → /teachings' },
  { from: '/publications/', to: '/events/', label: '/publications → /events' },
  { from: '/events/guru-poornima-2026/', to: '/events/', label: '/events/[eventId] → /events' },
  { from: '/learn/tattva-bodha/', to: '/learn/', label: '/learn/[id] → /learn' },
  { from: '/publications/vs-2021-may/', to: '/publications/', label: '/publications/[id] → /publications' }
];

let receivedResults = null;

// Start receiver bridge on 3334
const bridgeServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/save-results') {
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

bridgeServer.listen(3334, async () => {
  console.log('Bridge receiver listening on http://localhost:3334');

  const runnerHtml = `<!DOCTYPE html>
<html>
<head><title>Navigation Benchmark Runner</title></head>
<body>
<h2>Running Navigation Benchmarks...</h2>
<div id="status">Starting...</div>
<iframe id="testFrame" style="width: 1200px; height: 800px; border: 1px solid #ccc;"></iframe>
<script>
  (async () => {
    const statusEl = document.getElementById('status');
    const iframe = document.getElementById('testFrame');
    const routes = ${JSON.stringify(routesToTest)};
    const results = [];

    for (const r of routes) {
      statusEl.textContent = 'Testing ' + r.label;
      
      // 1. Load initial page
      await new Promise(resolve => {
        iframe.onload = resolve;
        iframe.src = r.from;
      });

      // Wait 350ms for hydration
      await new Promise(res => setTimeout(res, 350));

      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;

      let fullReloadOccurred = false;
      win.addEventListener('beforeunload', () => { fullReloadOccurred = true; });

      // Find the link
      const targetClean = r.to.replace(/\\/+$/, '');
      const links = Array.from(doc.querySelectorAll('a'));
      const link = links.find(a => {
        const href = (a.getAttribute('href') || '').replace(/\\/+$/, '');
        return href === targetClean;
      });

      if (!link) {
        results.push({
          label: r.label,
          from: r.from,
          to: r.to,
          success: false,
          error: 'Link not found on page'
        });
        continue;
      }

      // 2. Measure Click to Destination
      const t0 = performance.now();
      link.click();

      // Poll for destination URL and content
      let arrived = false;
      let tArrived = 0;
      const startPoll = performance.now();

      while (performance.now() - startPoll < 4000) {
        try {
          const curPath = (win.location.pathname || '').replace(/\\/+$/, '');
          if (curPath === targetClean) {
            tArrived = performance.now() - t0;
            arrived = true;
            break;
          }
        } catch (e) {
          fullReloadOccurred = true;
        }
        await new Promise(res => setTimeout(res, 10));
      }

      results.push({
        label: r.label,
        from: r.from,
        to: r.to,
        success: arrived,
        timeToDestinationMs: arrived ? Math.round(tArrived) : '> 4000',
        clientNav: arrived && !fullReloadOccurred,
        fullReload: fullReloadOccurred
      });

      // Brief delay between tests
      await new Promise(res => setTimeout(res, 200));
    }

    statusEl.textContent = 'COMPLETE';
    await fetch('http://localhost:3334/save-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
  })();
</script>
</body>
</html>`;

  const outRunnerPath = path.join(__dirname, '..', 'out', 'nav-runner.html');
  fs.writeFileSync(outRunnerPath, runnerHtml, 'utf8');
  console.log('Created out/nav-runner.html');

  try {
    const chromeProc = spawn(chromePath, ['--headless=new', '--disable-gpu', 'http://localhost:3000/nav-runner.html']);

    const startWait = Date.now();
    while (!receivedResults && Date.now() - startWait < 35000) {
      await new Promise(r => setTimeout(r, 250));
    }
    chromeProc.kill();

    if (receivedResults) {
      console.log('\n====================================================');
      console.log('PRODUCTION NAVIGATION BENCHMARK RESULTS');
      console.log('====================================================');
      console.table(receivedResults);

      const outJsonPath = path.join(__dirname, '..', 'docs', 'qa', 'PHASE-4D-NAVIGATION-BENCHMARK.json');
      fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });
      fs.writeFileSync(outJsonPath, JSON.stringify(receivedResults, null, 2));
      console.log(`Saved benchmark results to ${outJsonPath}`);
    } else {
      console.error('Timed out waiting for benchmark results from Chrome.');
    }
  } finally {
    bridgeServer.close();
    if (fs.existsSync(outRunnerPath)) fs.unlinkSync(outRunnerPath);
  }
});
