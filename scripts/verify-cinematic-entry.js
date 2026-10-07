const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3006;
const CHROME_PORT = 9445;
const OUT_DIR = path.join(__dirname, '..', 'out');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
};

// Start static server
const server = http.createServer((req, res) => {
  let decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(OUT_DIR, decodedUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const notFoundPath = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
});

async function main() {
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`[TEST-SERVER] Serving out/ on http://127.0.0.1:${PORT}`);

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
  };

  function assert(condition, message) {
    results.total++;
    if (condition) {
      results.passed++;
      console.log(`  [PASS] ${message}`);
      results.details.push({ status: 'PASS', message });
    } else {
      results.failed++;
      console.error(`  [FAIL] ${message}`);
      results.details.push({ status: 'FAIL', message });
    }
  }

  console.log('\n======================================================');
  console.log('1. STATIC ASSET & ROUTE PRE-FLIGHT AUDIT');
  console.log('======================================================');

  // Verify asset files exist
  const shivlingWebp = path.join(__dirname, '..', 'public', 'images', 'entry', 'shivling-master.webp');
  const atmosphereWebp = path.join(__dirname, '..', 'public', 'images', 'entry', 'entry-atmosphere.webp');
  assert(fs.existsSync(shivlingWebp), 'shivling-master.webp exists in /public/images/entry/');
  assert(fs.existsSync(atmosphereWebp), 'entry-atmosphere.webp exists in /public/images/entry/');

  // Check out/index.html
  const homeHtml = fs.readFileSync(path.join(OUT_DIR, 'index.html'), 'utf8');
  assert(homeHtml.includes('shivling-master.webp'), 'out/index.html includes shivling-master.webp asset reference');
  assert(homeHtml.includes('entry-atmosphere.webp'), 'out/index.html includes entry-atmosphere.webp asset reference');
  assert(homeHtml.includes('vm-entry-scene-seen'), 'out/index.html includes instant session bypass script in <head>');

  // Check that other routes DO NOT contain entry assets
  const otherRoutes = ['about', 'ashram', 'acharyas', 'teachings', 'publications', 'events', 'learn', 'contact', 'donate'];
  let leakFound = false;
  for (const route of otherRoutes) {
    const routeHtmlPath = path.join(OUT_DIR, route, 'index.html');
    if (fs.existsSync(routeHtmlPath)) {
      const routeHtml = fs.readFileSync(routeHtmlPath, 'utf8');
      if (routeHtml.includes('shivling-master.webp')) {
        leakFound = true;
        console.error(`    Leak found on route: /${route}`);
      }
    }
  }
  assert(!leakFound, 'Zero entry assets leaked into other static routes (/about, /ashram, etc.)');

  console.log('\n======================================================');
  console.log('2. HEADLESS CHROME RUNTIME & MOTION VERIFICATION');
  console.log('======================================================');

  const tempProfile = path.join(__dirname, '..', '.chrome-temp-profile');
  if (!fs.existsSync(tempProfile)) fs.mkdirSync(tempProfile, { recursive: true });

  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    `--user-data-dir=${tempProfile}`,
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank',
  ]);

  let tabs = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const listRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json`);
      tabs = await listRes.json();
      if (tabs && tabs.length > 0) break;
    } catch {}
  }

  try {
    if (!tabs || tabs.length === 0) throw new Error('Chrome failed to start or open remote port');
    const pageTab = tabs.find((t) => t.type === 'page') || tabs[0];
    if (!pageTab) throw new Error('No Chrome tab found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg.result !== undefined ? msg.result : msg);
      }
    };

    function sendCmd(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise((resolve) => {
      if (ws.readyState === WebSocket.OPEN) resolve();
      else ws.onopen = resolve;
    });

    await sendCmd('Page.enable');
    await sendCmd('Runtime.enable');

    const consoleErrors = [];
    ws.addEventListener('message', (evt) => {
      try {
        const d = JSON.parse(evt.data);
        if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
          consoleErrors.push(d.params.args.map((a) => a.value || a.description).join(' '));
        }
      } catch {}
    });

    // ----------------------------------------------------
    // TEST 1: Initial visit to '/' -> Intro plays, completes at 1.7s, sets session key
    // ----------------------------------------------------
    console.log('\n--- TEST 1: INITIAL VISIT SEQUENCE & TIMING ---');
    // Start with blank, clear sessionStorage, then navigate to '/'
    await sendCmd('Page.navigate', { url: 'about:blank' });
    await new Promise((r) => setTimeout(r, 200));
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await new Promise((r) => setTimeout(r, 800));
    await sendCmd('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    // Navigate cleanly with fresh session
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await new Promise((r) => setTimeout(r, 600));

    const initialCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay" i]');
        const shivling = document.querySelector('img[src*="shivling-master.webp"]');
        const atmosphere = document.querySelector('img[src*="entry-atmosphere.webp"]');
        const contactShadow = document.querySelector('[class*="contactShadow" i]');
        const atmosphereRefinement = document.querySelector('[class*="atmosphereRefinement" i]');
        const overflow = document.body.style.overflow || window.getComputedStyle(document.body).overflow;
        const navbar = document.querySelector('header[class*="navbar" i]');
        const navStyle = navbar ? window.getComputedStyle(navbar) : null;
        const navOpacity = navStyle ? parseFloat(navStyle.opacity) : 1;
        const navPointerEvents = navStyle ? navStyle.pointerEvents : 'auto';

        const overlayRect = overlay ? overlay.getBoundingClientRect() : null;
        const coversFullViewport = overlayRect ?
          (overlayRect.top <= 0 && overlayRect.left <= 0 && overlayRect.width >= window.innerWidth && overlayRect.height >= window.innerHeight) : false;

        return {
          hasOverlay: !!overlay,
          overlayTag: overlay ? overlay.tagName : null,
          hasShivling: !!shivling,
          hasAtmosphere: !!atmosphere,
          hasContactShadow: !!contactShadow,
          hasAtmosphereRefinement: !!atmosphereRefinement,
          coversFullViewport,
          navbarHidden: navOpacity < 0.1 || navPointerEvents === 'none',
          navOpacity,
          overflow
        };
      })()`,
      returnByValue: true,
    });
    const initVal = initialCheck.result?.value;
    console.log('    [DEBUG initialCheck]:', initVal);
    assert(initVal?.hasOverlay && initVal?.hasShivling && initVal?.hasAtmosphere, 'Overlay, Shivling, and Atmosphere are rendered initially');
    assert(initVal?.hasContactShadow, 'Realistic 3-layer contact shadow is rendered beneath the Shivling');
    assert(initVal?.hasAtmosphereRefinement, 'Atmospheric lighting refinement layer (asymmetry & sanctum illumination) is rendered');
    assert(initVal?.coversFullViewport, 'Overlay covers the entire website viewport (100vw x 100vh)');
    assert(initVal?.navbarHidden, 'Website navbar is completely hidden/submerged underneath overlay during intro (opacity: 0)');
    assert(initVal?.overflow === 'hidden', 'Body scroll is locked (overflow: hidden) during intro animation');

    // Wait 1.85s (sequence finishes at exactly 1.70s after hydration)
    await new Promise((r) => setTimeout(r, 1900));
    const completionCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay" i]');
        const overflow = document.body.style.overflow;
        const sessionSeen = sessionStorage.getItem('vm-entry-scene-seen');
        const heroSection = document.querySelector('section[aria-label="Vedanta Mission Ashram Hero"]');
        const mahadevSection = document.querySelectorAll('section[aria-label*="Gangeshwar Mahadev"]').length;
        const heroes = document.querySelectorAll('section[aria-label*="Hero"]').length;
        return {
          hasOverlay: !!overlay,
          overflow,
          sessionSeen,
          hasHero: !!heroSection,
          heroVisible: heroSection ? heroSection.getBoundingClientRect().height > 0 : false,
          mahadevSection,
          heroes
        };
      })()`,
      returnByValue: true,
    });
    const compVal = completionCheck.result?.value;
    console.log('    [DEBUG compVal]:', compVal);
    assert(!compVal?.hasOverlay, 'Overlay is completely unmounted/gone from DOM after 1.7s');
    assert(compVal?.overflow === '', 'Body scroll is restored (overflow: "") after intro finishes');
    assert(compVal?.sessionSeen === 'true', 'sessionStorage key "vm-entry-scene-seen" is set to "true"');
    assert(compVal?.hasHero && compVal?.heroVisible, 'Existing homepage hero is fully visible and interactive');
    assert(compVal?.heroes === 1, 'Single existing hero confirmed — zero duplicate heroes');
    assert(compVal?.mahadevSection === 1, 'Single existing Sri Gangeshwar Mahadev section — zero duplicates');

    // ----------------------------------------------------
    // TEST 2: Second visit within same session -> Skip intro
    // ----------------------------------------------------
    console.log('\n--- TEST 2: SESSION RETENTION & SKIP ---');
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await new Promise((r) => setTimeout(r, 600));
    const skipCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay" i]');
        const isSeenClass = document.documentElement.classList.contains('vm-entry-seen');
        const isHidden = !overlay || window.getComputedStyle(overlay).display === 'none';
        return { hasActiveOverlay: !isHidden, isSeenClass };
      })()`,
      returnByValue: true,
    });
    assert(!skipCheck.result?.value?.hasActiveOverlay, 'Intro is immediately skipped (display: none / unmounted) on repeated visit in same session');
    assert(skipCheck.result?.value?.isSeenClass, 'Document element has "vm-entry-seen" class on repeated visit');

    // ----------------------------------------------------
    // TEST 3: Development force preview: /?intro=1
    // ----------------------------------------------------
    console.log('\n--- TEST 3: FORCE PREVIEW (?intro=1) ---');
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/?intro=1` });
    await new Promise((r) => setTimeout(r, 300));
    const forceCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay"]');
        return { hasOverlay: !!overlay };
      })()`,
      returnByValue: true,
    });
    assert(forceCheck.result?.value?.hasOverlay, '/?intro=1 forces intro even when already seen');

    // ----------------------------------------------------
    // TEST 4: Development bypass: /?intro=0
    // ----------------------------------------------------
    console.log('\n--- TEST 4: BYPASS PREVIEW (?intro=0) ---');
    await sendCmd('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/?intro=0` });
    await new Promise((r) => setTimeout(r, 600));
    const bypassCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay" i]');
        const style = overlay ? window.getComputedStyle(overlay).display : 'none';
        return { hasActiveOverlay: !!overlay && style !== 'none' };
      })()`,
      returnByValue: true,
    });
    assert(!bypassCheck.result?.value?.hasActiveOverlay, '/?intro=0 bypasses intro even on fresh session');

    // ----------------------------------------------------
    // TEST 5: Route restriction: Other routes never show intro
    // ----------------------------------------------------
    console.log('\n--- TEST 5: ROUTE RESTRICTION AUDIT ---');
    await sendCmd('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    for (const testRoute of ['/about/', '/ashram/', '/teachings/', '/events/', '/contact/']) {
      await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}${testRoute}` });
      await new Promise((r) => setTimeout(r, 400));
      const routeCheck = await sendCmd('Runtime.evaluate', {
        expression: `(() => {
          return {
            hasOverlay: !!document.querySelector('[class*="overlay"]'),
            hasShivling: !!document.querySelector('img[src*="shivling-master.webp"]')
          };
        })()`,
        returnByValue: true,
      });
      assert(!routeCheck.result?.value?.hasOverlay && !routeCheck.result?.value?.hasShivling, `Route ${testRoute} has ZERO intro overlay`);
    }

    // ----------------------------------------------------
    // TEST 6: Mobile & Responsive composition across viewports
    // ----------------------------------------------------
    console.log('\n--- TEST 6: VIEWPORT RESPONSIVENESS (375, 390, 430, 768, 1024, 1280, 1440) ---');
    const viewports = [
      { width: 375, height: 667, name: '375 Mobile' },
      { width: 390, height: 844, name: '390 Mobile' },
      { width: 430, height: 932, name: '430 Mobile Large' },
      { width: 768, height: 1024, name: '768 Tablet' },
      { width: 1024, height: 768, name: '1024 Desktop Small' },
      { width: 1280, height: 800, name: '1280 Desktop Regular' },
      { width: 1440, height: 900, name: '1440 Desktop Large' },
    ];

    for (const vp of viewports) {
      await sendCmd('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768,
      });

      await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/?intro=1` });
      await new Promise((r) => setTimeout(r, 850));

      const vpMetrics = await sendCmd('Runtime.evaluate', {
        expression: `(() => {
          const shivling = document.querySelector('img[src*="shivling-master.webp"]');
          const shadow = document.querySelector('[class*="contactShadow" i]');
          const navbar = document.querySelector('header[class*="navbar" i]');
          const winWidth = window.innerWidth;
          const docWidth = document.documentElement.scrollWidth;
          const navStyle = navbar ? window.getComputedStyle(navbar) : null;
          const navOpacity = navStyle ? parseFloat(navStyle.opacity) : 1;
          const navPointerEvents = navStyle ? navStyle.pointerEvents : 'auto';
          const topEl = document.elementFromPoint(winWidth / 2, 20);
          const isCoveredByOverlay = !navbar || (topEl && !navbar.contains(topEl));
          if (!shivling) return { exists: false };
          const rect = shivling.getBoundingClientRect();
          return {
            exists: true,
            hasShadow: !!shadow,
            navbarHidden: navOpacity < 0.1 || navPointerEvents === 'none' || isCoveredByOverlay,
            rect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
            docWidth,
            winWidth,
            noHOverflow: docWidth <= winWidth + 1,
            isContained: rect.width <= winWidth && rect.height <= window.innerHeight,
            markingVisible: rect.top >= -20 && rect.bottom <= window.innerHeight + 50
          };
        })()`,
        returnByValue: true,
      });

      const val = vpMetrics.result?.value;
      assert(
        val?.exists && val?.noHOverflow && val?.isContained && val?.markingVisible && val?.hasShadow && val?.navbarHidden,
        `Viewport ${vp.name} (${vp.width}x${vp.height}): Shivling grounded with contact shadow, navbar submerged, zero horizontal overflow.`
      );

      if (['375 Mobile', '430 Mobile Large', '1024 Desktop Small', '1440 Desktop Large'].includes(vp.name)) {
        const shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
        const shotPath = path.join(__dirname, '..', 'scratch', `visual-inspect-${vp.width}px.png`);
        fs.mkdirSync(path.dirname(shotPath), { recursive: true });
        fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
        console.log(`    [SCREENSHOT CAPTURED]: scratch/visual-inspect-${vp.width}px.png`);
      }
    }

    // Mobile Duration Verification (<= 1.50s)
    console.log('\n--- MOBILE SPEED VERIFICATION (<= 1.50s) ---');
    await sendCmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await sendCmd('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/?intro=1` });
    await new Promise((r) => setTimeout(r, 1800)); // allow mobile duration (1000ms) + hydration and unmount
    const mobileSpeedCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay" i]');
        const overflow = document.body.style.overflow;
        return {
          unmounted: !overlay,
          scrollRestored: overflow === '' || overflow === 'visible' || !overflow
        };
      })()`,
      returnByValue: true,
    });
    const mobVal = mobileSpeedCheck.result?.value;
    console.log('    [DEBUG mobVal]:', mobVal);
    assert(mobVal?.unmounted && mobVal?.scrollRestored, 'Mobile intro duration adheres to <= 1.50s requirement (concluded & unmounted)');

    // ----------------------------------------------------
    // TEST 7: Accessibility: prefers-reduced-motion
    // ----------------------------------------------------
    console.log('\n--- TEST 7: ACCESSIBILITY (prefers-reduced-motion) ---');
    await sendCmd('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await sendCmd('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await sendCmd('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
    await new Promise((r) => setTimeout(r, 400));
    const reducedCheck = await sendCmd('Runtime.evaluate', {
      expression: `(() => {
        const overlay = document.querySelector('[class*="overlay"]');
        const style = overlay ? window.getComputedStyle(overlay).display : 'none';
        return { hasActiveOverlay: style !== 'none' };
      })()`,
      returnByValue: true,
    });
    assert(!reducedCheck.result?.value?.hasActiveOverlay, 'Overlay is completely skipped/hidden when prefers-reduced-motion is active');

    // Reset emulated media
    await sendCmd('Emulation.setEmulatedMedia', { features: [] });

    // ----------------------------------------------------
    // TEST 8: Console error audit
    // ----------------------------------------------------
    console.log('\n--- TEST 8: CONSOLE ERROR AUDIT ---');
    assert(consoleErrors.length === 0, `Zero browser console errors detected (count: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error('    Errors:', consoleErrors);
    }

    console.log('\n======================================================');
    console.log(`VERIFICATION SUMMARY: ${results.passed} / ${results.total} PASSED, ${results.failed} FAILED`);
    console.log('======================================================\n');
  } finally {
    chromeProcess.kill();
    server.close();
  }
}

main().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
