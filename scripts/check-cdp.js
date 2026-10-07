const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/Danish Syed/.gemini/antigravity-ide/brain/c0a9221c-720a-410f-8c20-b95c02c934cb';

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop_1440' },
  { width: 1280, height: 800, name: 'desktop_1280' },
  { width: 1024, height: 768, name: 'desktop_1024' },
  { width: 768, height: 1024, name: 'tablet_768' },
  { width: 430, height: 932, name: 'mobile_430' },
  { width: 414, height: 896, name: 'mobile_414' },
  { width: 390, height: 844, name: 'mobile_390' },
  { width: 375, height: 667, name: 'mobile_375' },
  { width: 360, height: 740, name: 'ultranarrow_360' },
];

http.get('http://127.0.0.1:9222/json/list', (res) => {
  let raw = '';
  res.on('data', chunk => raw += chunk);
  res.on('end', async () => {
    const pages = JSON.parse(raw);
    const target = pages.find(p => p.url && p.url.includes('localhost:3000'));
    if (!target) {
      console.log('No tab found');
      return;
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let msgId = 1;
    const send = (method, params = {}) => new Promise((resolve) => {
      const id = msgId++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

    ws.onopen = async () => {
      console.log('Connected to CDP');
      await send('Page.enable');
      await send('DOM.enable');
      await send('Page.reload', { ignoreCache: true });
      await new Promise(r => setTimeout(r, 2000));

      for (const vp of VIEWPORTS) {
        // Set device metrics override
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width <= 768,
        });

        // Small wait for CSS layout pass
        await new Promise(r => setTimeout(r, 200));

        // Evaluate layout metrics
        const evalRes = await send('Runtime.evaluate', {
          expression: `(() => {
            const bp = document.querySelector('[class*="brandPrimary"]');
            const bun = document.querySelector('[class*="brandUltraNarrow"]');
            const bpImg = bp ? bp.querySelector('img') : null;
            const bunImg = bun ? bun.querySelector('img') : null;
            const ham = document.querySelector('[class*="hamburger"]');
            const nav = document.querySelector('[class*="desktopNav"]');
            
            const bpRect = bp ? bp.getBoundingClientRect() : null;
            const hamRect = ham ? ham.getBoundingClientRect() : null;
            const gap = (hamRect && bpRect) ? (hamRect.left - bpRect.right) : null;

            return {
              viewport: ${vp.width},
              innerWidth: window.innerWidth,
              bpDisplay: bp ? window.getComputedStyle(bp).display : null,
              bpImgWidth: bpImg ? window.getComputedStyle(bpImg).width : null,
              bpImgHeight: bpImg ? window.getComputedStyle(bpImg).height : null,
              bunDisplay: bun ? window.getComputedStyle(bun).display : null,
              bunImgWidth: bunImg ? window.getComputedStyle(bunImg).width : null,
              bunImgHeight: bunImg ? window.getComputedStyle(bunImg).height : null,
              navDisplay: nav ? window.getComputedStyle(nav).display : null,
              hamDisplay: ham ? window.getComputedStyle(ham).display : null,
              bpRenderedWidth: bpRect ? Math.round(bpRect.width) : null,
              separationToHamburger: gap ? Math.round(gap) : null
            };
          })()`,
          returnByValue: true
        });

        const metrics = evalRes.result.value;
        console.log(`[${vp.name} (${vp.width}px)]`, JSON.stringify(metrics));

        // Capture screenshot of the top header area
        const ss = await send('Page.captureScreenshot', {
          format: 'png',
          clip: {
            x: 0,
            y: 0,
            width: vp.width,
            height: Math.min(vp.height, 220),
            scale: 1
          }
        });

        const filePath = path.join(ARTIFACT_DIR, `qa_cdp_${vp.name}_${vp.width}.png`);
        fs.writeFileSync(filePath, Buffer.from(ss.data, 'base64'));
      }

      // Reset emulation
      await send('Emulation.clearDeviceMetricsOverride');
      console.log('All viewports QA completed successfully!');
      ws.close();
    };
  });
});
