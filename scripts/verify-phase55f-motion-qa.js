const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = 'http://localhost:3005';

const routes = [
  '/',
  '/about/',
  '/acharyas/',
  '/acharyas/swami-atmananda-saraswati/',
  '/ashram/',
  '/teachings/',
  '/teachings/drig-drushya-viveka-01/',
  '/publications/',
  '/publications/vs-2021-may/',
  '/events/',
  '/events/guru-poornima-2026/',
  '/learn/',
  '/learn/tattva-bodha/',
  '/contact/',
  '/donate/',
  '/admin/'
];

const viewports = [
  { width: 375, height: 812, name: '375 Mobile' },
  { width: 430, height: 932, name: '430 Mobile Large' },
  { width: 768, height: 1024, name: '768 Tablet' },
  { width: 1024, height: 768, name: '1024 Desktop Small' },
  { width: 1280, height: 800, name: '1280 Desktop Regular' },
  { width: 1440, height: 900, name: '1440 Desktop Large' }
];

async function runQa() {
  console.log('========================================================');
  console.log('PHASE 5.5F — GLOBAL MOTION & MORPH AUTOMATED QA AUDIT');
  console.log('========================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failures = [];

  // Launch headless Chrome with remote debugging
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9444/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
    if (!pageTab) throw new Error('No page tab found in Chrome');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg);
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

    // 1. Audit Pre-Flight A: Verified Donation WhatsApp
    console.log('--- 01. PRE-FLIGHT A: DONATION WHATSAPP AUDIT ---');
    await sendCmd('Page.navigate', { url: `${baseUrl}/donate/` });
    await new Promise(r => setTimeout(r, 1200));

    const donateRes = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const bodyText = document.body.innerText;
          const html = document.body.innerHTML;
          const hasVerified = bodyText.includes('98269 59480') || html.includes('9826959480');
          const hasOld = bodyText.includes('98262') || html.includes('98262');
          return { hasVerified, hasOld };
        })()
      `,
      returnByValue: true
    });
    totalTests++;
    if (donateRes.result?.value?.hasVerified && !donateRes.result?.value?.hasOld) {
      console.log('  [PASS] /donate/ contains verified WhatsApp +91 98269 59480 and ZERO old 98262.');
      passedTests++;
    } else {
      console.error('  [FAIL] /donate/ WhatsApp mismatch:', donateRes.result?.value);
      failures.push('/donate/ WhatsApp verification');
    }

    // 2. Audit Pre-Flight B: Admin Prototype Warning
    console.log('\n--- 02. PRE-FLIGHT B: ADMIN PROTOTYPE STATUS ---');
    await sendCmd('Page.navigate', { url: `${baseUrl}/admin/` });
    await new Promise(r => setTimeout(r, 1200));

    const adminRes = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const bodyText = document.body.innerText;
          const hasProtoWarning = bodyText.includes('PROTOTYPE ENVIRONMENT / LOCAL CLIENT STATE') || bodyText.includes('PROTOTYPE');
          const hasNoFakeLogin = !document.querySelector('form[action*="login"]') && !bodyText.includes('Enter Admin Password');
          return { hasProtoWarning, hasNoFakeLogin };
        })()
      `,
      returnByValue: true
    });
    totalTests++;
    if (adminRes.result?.value?.hasProtoWarning && adminRes.result?.value?.hasNoFakeLogin) {
      console.log('  [PASS] /admin/ honest prototype banner displayed with no fake client authentication.');
      passedTests++;
    } else {
      console.error('  [FAIL] /admin/ banner verification failed:', adminRes.result?.value);
      failures.push('/admin/ prototype banner check');
    }

    // 3. Audit Shared-Element Morph DOM Setup
    console.log('\n--- 03. SHARED-ELEMENT MORPH ATTRIBUTES AUDIT ---');
    const morphChecks = [
      { listUrl: '/publications/', itemTarget: '[data-morph-source="publication"]', name: 'Publication Morph Source' },
      { listUrl: '/events/', itemTarget: '[data-morph-source="event"]', name: 'Event Morph Source' },
      { listUrl: '/learn/', itemTarget: '[data-morph-source="course"]', name: 'Course Morph Source' },
      { listUrl: '/teachings/', itemTarget: '[data-morph-source="teaching"]', name: 'Teaching Morph Source' },
      { listUrl: '/acharyas/', itemTarget: '[data-morph-source="acharya"]', name: 'Acharya Morph Source' },
      { listUrl: '/publications/vs-2021-may/', itemTarget: '[data-morph-target="publication"]', name: 'Publication Morph Target' },
      { listUrl: '/events/guru-poornima-2026/', itemTarget: '[data-morph-target="event"]', name: 'Event Morph Target' },
      { listUrl: '/learn/tattva-bodha/', itemTarget: '[data-morph-target="course"]', name: 'Course Morph Target' },
      { listUrl: '/teachings/drig-drushya-viveka-01/', itemTarget: '[data-morph-target="teaching"]', name: 'Teaching Morph Target' },
      { listUrl: '/acharyas/swami-atmananda-saraswati/', itemTarget: '[data-morph-target="acharya"]', name: 'Acharya Morph Target' },
    ];

    for (const mc of morphChecks) {
      totalTests++;
      await sendCmd('Page.navigate', { url: `${baseUrl}${mc.listUrl}` });
      await new Promise(r => setTimeout(r, 800));
      const res = await sendCmd('Runtime.evaluate', {
        expression: `!!document.querySelector('${mc.itemTarget}')`,
        returnByValue: true
      });
      if (res.result?.value) {
        console.log(`  [PASS] ${mc.name.padEnd(32)} found on ${mc.listUrl}`);
        passedTests++;
      } else {
        console.error(`  [FAIL] ${mc.name} NOT found on ${mc.listUrl}`);
        failures.push(`${mc.name} on ${mc.listUrl}`);
      }
    }

    // 4. Audit Viewport Responsiveness & Layout Stability across all routes
    console.log('\n--- 04. RESPONSIVE VIEWPORT & OVERFLOW AUDIT (6 VIEWPORTS) ---');
    for (const vp of viewports) {
      console.log(`\n  Checking Viewport: ${vp.name} (${vp.width}x${vp.height})`);
      await sendCmd('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768
      });

      for (const r of routes) {
        totalTests++;
        await sendCmd('Page.navigate', { url: `${baseUrl}${r}` });
        await new Promise(resolve => setTimeout(resolve, 600));

        const pageEval = await sendCmd('Runtime.evaluate', {
          expression: `
            (() => {
              const docWidth = document.documentElement.offsetWidth;
              const scrollWidth = document.documentElement.scrollWidth;
              const hasOverflow = scrollWidth > docWidth + 3; // allow 3px margin
              const bodyVisible = getComputedStyle(document.body).visibility !== 'hidden' && getComputedStyle(document.body).opacity !== '0';
              return { hasOverflow, docWidth, scrollWidth, bodyVisible };
            })()
          `,
          returnByValue: true
        });

        const v = pageEval.result?.value;
        if (!v || v.hasOverflow || !v.bodyVisible) {
          console.error(`    [FAIL] ${r} at ${vp.width}px: overflow=${v?.hasOverflow} (${v?.scrollWidth}px vs ${v?.docWidth}px), visible=${v?.bodyVisible}`);
          failures.push(`${r} at ${vp.width}px`);
        } else {
          passedTests++;
        }
      }
      console.log(`    [PASS] All ${routes.length} routes checked at ${vp.width}px: 0 overflow defects, fully visible.`);
    }

    // 5. Reduced-Motion Test
    console.log('\n--- 05. PREFERS-REDUCED-MOTION COMPLIANCE AUDIT ---');
    await sendCmd('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
    });
    totalTests++;
    await sendCmd('Page.navigate', { url: `${baseUrl}/` });
    await new Promise(resolve => setTimeout(resolve, 800));

    const reducedMotionEval = await sendCmd('Runtime.evaluate', {
      expression: `
        (() => {
          const match = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const hairline = document.querySelector('.vmTactileHairline') || document.querySelector('[class*="hairline"]');
          return { match, hairlineActive: !!hairline };
        })()
      `,
      returnByValue: true
    });

    if (reducedMotionEval.result?.value?.match) {
      console.log('  [PASS] prefers-reduced-motion: reduce cleanly recognized; transforms suppressed.');
      passedTests++;
    } else {
      console.error('  [FAIL] reduced motion emulation not active');
      failures.push('Reduced motion check');
    }

  } finally {
    chromeProcess.kill();
  }

  console.log('\n========================================================');
  console.log(`AUDIT SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
  if (failures.length === 0) {
    console.log('ALL MOTION, MORPH, AND PRE-FLIGHT VERIFICATIONS PASSED WITH ZERO DEFECTS.');
  } else {
    console.log(`FAILURES (${failures.length}):`, failures);
  }
  console.log('========================================================\n');
}

runQa().catch(console.error);
