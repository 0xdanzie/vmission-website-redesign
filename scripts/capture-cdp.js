const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase-5.2');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'events-1280-verified.png', width: 1280, height: 2200, mobile: false },
  { name: 'events-768-verified.png', width: 768, height: 2200, mobile: false },
  { name: 'events-430-verified.png', width: 430, height: 2200, mobile: true },
  { name: 'events-375-verified.png', width: 375, height: 2200, mobile: true },
];

async function captureViewport(vp) {
  return new Promise((resolve, reject) => {
    const child = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9333',
      '--disable-gpu',
      '--hide-scrollbars',
      'http://localhost:3000/events/'
    ]);

    setTimeout(async () => {
      try {
        const listRes = await fetch('http://127.0.0.1:9333/json');
        const tabs = await listRes.json();
        const pageTab = tabs.find(t => t.type === 'page');
        if (!pageTab) {
          child.kill();
          return resolve();
        }

        const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: {
              width: vp.width,
              height: vp.height,
              deviceScaleFactor: 1,
              mobile: vp.mobile
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 800);
        };

        ws.onmessage = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === 2 && msg.result && msg.result.data) {
            const buf = Buffer.from(msg.result.data, 'base64');
            const target = path.join(outDir, vp.name);
            fs.writeFileSync(target, buf);
            console.log(`[CDP CAPTURED] ${vp.name} (${vp.width}x${vp.height}) - ${buf.length} bytes`);
            ws.close();
            child.kill();
            resolve();
          }
        };

        ws.onerror = (e) => {
          console.warn('WS error:', e.message);
          child.kill();
          resolve();
        };
      } catch (err) {
        console.warn('Capture error:', err.message);
        child.kill();
        resolve();
      }
    }, 2500);
  });
}

async function main() {
  console.log('Capturing with real CDP Emulation for true responsive fidelity...');
  for (const vp of viewports) {
    await captureViewport(vp);
  }
  console.log('All CDP captures completed!');
}

main();
