const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase53');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureUrl(url, width, height, isMobile, filename, scrollSelector = null) {
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--window-size=1400,1200',
    url
  ]);

  await new Promise(r => setTimeout(r, 2200));

  try {
    const listRes = await fetch('http://127.0.0.1:9225/json/list');
    const tabs = await listRes.json();
    const tab = tabs[0];
    if (!tab || !tab.webSocketDebuggerUrl) {
      throw new Error('No debugger url');
    }
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = async () => {
        let id = 1;
        const send = (method, params = {}) => {
          return new Promise(res => {
            const curId = id++;
            const handler = (evt) => {
              const data = JSON.parse(evt.data);
              if (data.id === curId) {
                ws.removeEventListener('message', handler);
                res(data.result);
              }
            };
            ws.addEventListener('message', handler);
            ws.send(JSON.stringify({ id: curId, method, params }));
          });
        };

        if (isMobile) {
          await send('Emulation.setDeviceMetricsOverride', {
            width,
            height,
            deviceScaleFactor: 2,
            mobile: true
          });
          await send('Emulation.setTouchEmulationEnabled', { enabled: true });
        } else {
          await send('Emulation.setDeviceMetricsOverride', {
            width,
            height,
            deviceScaleFactor: 2,
            mobile: false
          });
        }

        if (scrollSelector) {
          await send('Runtime.evaluate', {
            expression: `
              const el = document.querySelector('${scrollSelector}');
              if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
            `
          });
          await new Promise(r => setTimeout(r, 400));
        }

        await new Promise(r => setTimeout(r, 500));
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, filename), Buffer.from(shot.data, 'base64'));
        console.log(`Saved: ${filename}`);
        ws.close();
        resolve();
      };
      ws.onerror = reject;
    });
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 500));
  }
}

async function run() {
  const tasks = [
    // Tattva Bodha
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 1280, h: 900, m: false, f: 'tattva-bodha-1280.png' },
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 1280, h: 900, m: false, f: 'tattva-bodha-1280-desk.png', s: '#verse-1' },
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 768, h: 1024, m: false, f: 'tattva-bodha-768.png' },
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 430, h: 932, m: true, f: 'tattva-bodha-430.png' },
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 375, h: 812, m: true, f: 'tattva-bodha-375.png' },
    { url: 'http://localhost:3000/learn/tattva-bodha', w: 375, h: 812, m: true, f: 'tattva-bodha-375-desk.png', s: '#verse-1' },

    // Residential Gita
    { url: 'http://localhost:3000/learn/residential-gita', w: 1280, h: 900, m: false, f: 'residential-gita-1280.png' },
    { url: 'http://localhost:3000/learn/residential-gita', w: 375, h: 812, m: true, f: 'residential-gita-375.png' },

    // Gita Online
    { url: 'http://localhost:3000/learn/gita-online', w: 1280, h: 900, m: false, f: 'gita-online-1280.png' },
    { url: 'http://localhost:3000/learn/gita-online', w: 375, h: 812, m: true, f: 'gita-online-375.png' },

    // Sangyan
    { url: 'http://localhost:3000/learn/sangyan-sanatan-dharma', w: 1280, h: 900, m: false, f: 'sangyan-1280.png' },
    { url: 'http://localhost:3000/learn/sangyan-sanatan-dharma', w: 375, h: 812, m: true, f: 'sangyan-375.png' },
  ];

  for (const t of tasks) {
    try {
      await captureUrl(t.url, t.w, t.h, t.m, t.f, t.s);
    } catch (err) {
      console.error(`Failed ${t.f}:`, err.message);
    }
  }
  console.log('ALL DONE');
}

run();
