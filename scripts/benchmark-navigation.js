const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

console.log('====================================================');
console.log('GATE 2 & GATE 3: NAVIGATION PERFORMANCE BENCHMARK');
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

// Let's create an evaluation script to run in Chrome
// We'll launch Chrome with remote debugging or evaluate directly via a test driver
async function benchmarkServer(serverBaseUrl, modeLabel) {
  console.log(`\n--- Benchmarking ${modeLabel} at ${serverBaseUrl} ---`);
  
  const results = [];
  
  for (const item of routesToTest) {
    const fullFrom = `${serverBaseUrl}${item.from}`;
    const targetPath = item.to;
    
    // Test script injected into page
    // 1. Navigate to fromUrl
    // 2. Find link matching targetPath
    // 3. Track full document reload vs client-side navigation
    // 4. Click link and measure timing
    const testHtml = `
      <!DOCTYPE html>
      <html>
      <body>
      <script>
        (async () => {
          let unloaded = false;
          window.addEventListener('beforeunload', () => { unloaded = true; });

          // Load the initial page in an iframe to test exact browser execution
          const iframe = document.createElement('iframe');
          iframe.style.width = '1280px';
          iframe.style.height = '800px';
          document.body.appendChild(iframe);

          await new Promise(r => {
            iframe.onload = r;
            iframe.src = '${fullFrom}';
          });

          // Wait 500ms for hydration
          await new Promise(r => setTimeout(r, 500));

          const doc = iframe.contentDocument;
          const win = iframe.contentWindow;

          // Find link to targetPath
          const cleanTarget = '${targetPath}'.replace(/\/+$/, '');
          const links = Array.from(doc.querySelectorAll('a'));
          const targetLink = links.find(a => {
            const h = (a.getAttribute('href') || '').replace(/\/+$/, '');
            return h === cleanTarget;
          });

          if (!targetLink) {
            await fetch('http://localhost:3334/result', {
              method: 'POST',
              body: JSON.stringify({ label: '${item.label}', error: 'Link not found on page' })
            });
            return;
          }

          let clientNavDetected = false;
          let fullReloadDetected = false;

          win.addEventListener('beforeunload', () => { fullReloadDetected = true; });

          const t0 = performance.now();
          targetLink.click();

          // Poll for URL change or DOM destination
          let tFeedback = null;
          let tDestination = null;

          const startPoll = performance.now();
          while (performance.now() - startPoll < 5000) {
            try {
              const currentPath = win.location.pathname;
              if (currentPath.includes(cleanTarget)) {
                tDestination = performance.now() - t0;
                clientNavDetected = !fullReloadDetected;
                break;
              }
            } catch (e) {
              // Cross-origin or unload
              fullReloadDetected = true;
            }
            await new Promise(r => setTimeout(r, 16));
          }

          await fetch('http://localhost:3334/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              label: '${item.label}',
              from: '${item.from}',
              to: '${item.to}',
              clientNav: clientNavDetected,
              fullReload: fullReloadDetected,
              timeToDestinationMs: tDestination ? Math.round(tDestination) : '> 5000',
              success: !!tDestination
            })
          });
        })();
      </script>
      </body>
      </html>
    `;

    // Write temp test runner
    const tmpFile = path.resolve(`temp-bench-${Date.now()}.html`);
    fs.writeFileSync(tmpFile, testHtml);

    let testResult = null;
    const bridgeServer = http.createServer((req, res) => {
      if (req.method === 'POST' && req.url === '/result') {
        let b = '';
        req.on('data', c => b += c);
        req.on('end', () => {
          try {
            testResult = JSON.parse(b);
          } catch {}
          res.writeHead(200);
          res.end('ok');
        });
      }
    });

    await new Promise(r => bridgeServer.listen(3334, r));

    try {
      const proc = spawn(chromePath, ['--headless=new', '--disable-gpu', `http://localhost:3334/test`]);
      // Serve the test HTML on /test
      bridgeServer.on('request', (req, res) => {
        if (req.url === '/test') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(testHtml);
        }
      });

      const s = Date.now();
      while (!testResult && Date.now() - s < 8000) {
        await new Promise(r => setTimeout(r, 150));
      }
      proc.kill();
    } finally {
      bridgeServer.close();
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    }

    if (testResult) {
      results.push(testResult);
      console.log(`  ${testResult.success ? '✅' : '❌'} [${testResult.label}] Destination in ${testResult.timeToDestinationMs}ms | ClientNav: ${testResult.clientNav} | FullReload: ${testResult.fullReload}`);
    } else {
      results.push({ label: item.label, success: false, timeToDestinationMs: 'TIMEOUT', clientNav: false, fullReload: false });
      console.log(`  ❌ [${item.label}] TIMEOUT (No response within 8s)`);
    }
  }

  return results;
}

// Check if production static server is up
async function runAll() {
  console.log('Testing Production Server at http://localhost:3000...');
  const prodResults = await benchmarkServer('http://localhost:3000', 'PRODUCTION (serve-out.js)');
  console.log('\nProduction Benchmark Summary:');
  console.table(prodResults);
}

runAll().catch(console.error);
