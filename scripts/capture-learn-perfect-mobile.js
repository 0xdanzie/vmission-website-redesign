const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase52');

async function captureDevice(width, height, isMobile, filename) {
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=1200,1200',
    'http://localhost:3000/learn/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('learn'));
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = async () => {
        // Set exact device metrics override
        ws.send(JSON.stringify({
          id: 1,
          method: 'Emulation.setDeviceMetricsOverride',
          params: {
            width,
            height,
            deviceScaleFactor: 1,
            mobile: isMobile
          }
        }));

        await new Promise(r => setTimeout(r, 800));

        // Capture screenshot
        ws.send(JSON.stringify({
          id: 2,
          method: 'Page.captureScreenshot',
          params: { format: 'png', captureBeyondViewport: true }
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === 2 && data.result && data.result.data) {
          const buf = Buffer.from(data.result.data, 'base64');
          const p = path.join(outDir, filename);
          fs.writeFileSync(p, buf);
          console.log(`Saved exact mobile render ${p} (${buf.length} bytes)`);
          ws.close();
          resolve();
        }
      };

      ws.onerror = reject;
    });
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 1000));
  }
}

(async () => {
  await captureDevice(375, 812, true, 'learn-exact-375px.png');
  await captureDevice(430, 932, true, 'learn-exact-430px.png');
  console.log('Complete');
})();
