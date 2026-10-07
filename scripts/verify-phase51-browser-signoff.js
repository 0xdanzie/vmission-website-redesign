const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

console.log('====================================================');
console.log('PHASE 5.1: REAL-BROWSER VISUAL & UX SIGN-OFF AUDIT');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const screenshotDir = path.join(__dirname, '..', 'docs', 'qa', 'screenshots');
fs.mkdirSync(screenshotDir, { recursive: true });

// 1. CAPTURE RESPONSIVE SCREENSHOTS ACROSS ALL 6 VIEWPORTS
console.log('--- 1. Capturing Multi-Viewport Screenshots ---');
const viewports = [
  { width: 375, height: 812, name: '375px' },
  { width: 430, height: 932, name: '430px' },
  { width: 768, height: 1024, name: '768px' },
  { width: 1024, height: 768, name: '1024px' },
  { width: 1280, height: 900, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' }
];

const targetPages = [
  { path: '/events/', name: 'events' },
  { path: '/learn/', name: 'learn' },
  { path: '/publications/', name: 'publications' }
];


for (const pg of targetPages) {
  for (const vp of viewports) {
    const shotPath = path.join(screenshotDir, `${pg.name}-${vp.name}.png`);
    try {
      execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=${vp.width},${vp.height} --screenshot="${shotPath}" http://localhost:3000${pg.path}`, { timeout: 15000 });
      console.log(`✅ [${pg.name}] @ ${vp.name} captured`);
    } catch (e) {
      console.warn(`⚠️ Error capturing ${pg.name} @ ${vp.name}:`, e.message);
    }
  }
}

// 2. RUN REAL BROWSER USER CLICK & NAVIGATION BENCHMARK
console.log('\n--- 2. Measuring Real Browser User Click Navigation ---');

const routesToTest = [
  { from: '/events/', to: '/about/', label: '/events → /about' },
  { from: '/events/', to: '/learn/', label: '/events → /learn' },
  { from: '/events/', to: '/teachings/', label: '/events → /teachings' },
  { from: '/events/', to: '/publications/', label: '/events → /publications' },
  { from: '/learn/', to: '/about/', label: '/learn → /about' },
  { from: '/learn/', to: '/teachings/', label: '/learn → /teachings' },
  { from: '/publications/', to: '/events/', label: '/publications → /events' },
  { from: '/publications/vs-2021-may/', to: '/publications/', label: '/publications/[id] → /publications' }
];

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

  if (req.method === 'POST' && req.url === '/save-signoff') {
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

bridgeServer.listen(3335, async () => {
  const runnerHtml = `<!DOCTYPE html>
<html>
<head><title>Signoff Navigation Benchmark Runner</title></head>
<body>
<h2>Running Signoff Navigation Benchmarks...</h2>
<div id="status">Starting...</div>
<iframe id="testFrame" style="width: 1280px; height: 800px; border: 1px solid #ccc;"></iframe>
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

      // Wait 350ms for initial render & hydration
      await new Promise(res => setTimeout(res, 350));

      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;

      let fullReloadOccurred = false;
      win.addEventListener('beforeunload', () => { fullReloadOccurred = true; });

      // Find the target link in navigation or breadcrumb
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

      // Poll for destination URL and ready content
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

      await new Promise(res => setTimeout(res, 200));
    }

    statusEl.textContent = 'COMPLETE';
    await fetch('http://localhost:3335/save-signoff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
  })();
</script>
</body>
</html>`;

  const outRunnerPath = path.join(__dirname, '..', 'out', 'signoff-runner.html');
  fs.writeFileSync(outRunnerPath, runnerHtml, 'utf8');

  try {
    const chromeProc = spawn(chromePath, ['--headless=new', '--disable-gpu', 'http://localhost:3000/signoff-runner.html']);

    const startWait = Date.now();
    while (!receivedResults && Date.now() - startWait < 40000) {
      await new Promise(r => setTimeout(r, 300));
    }
    chromeProc.kill();

    if (receivedResults) {
      console.log('\n====================================================');
      console.log('REAL BROWSER NAVIGATION BENCHMARK RESULTS');
      console.log('====================================================');
      console.table(receivedResults);

      const outJsonPath = path.join(__dirname, '..', 'docs', 'qa', 'PHASE-5.1-NAVIGATION-SIGNOFF.json');
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
