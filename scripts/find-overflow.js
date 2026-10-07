const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--window-size=375,812',
  'http://localhost:3000/learn/'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('learn'));
    if (!tab) {
      console.log('No tab found', tabs);
      proc.kill();
      return;
    }
    const wsUrl = tab.webSocketDebuggerUrl;
    console.log('Connecting to', wsUrl);

    // Use native WebSocket (supported in Node 20+)
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      const msg = JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const docW = document.documentElement.clientWidth;
            const els = Array.from(document.querySelectorAll('*'));
            const overflow = [];
            for (const el of els) {
              const r = el.getBoundingClientRect();
              if (r.right > docW + 1) {
                overflow.push({
                  tag: el.tagName,
                  class: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 50) : '') : '',
                  id: el.id,
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                });
              }
            }
            return {
              clientWidth: docW,
              scrollWidth: document.documentElement.scrollWidth,
              overflowCount: overflow.length,
              sample: overflow.slice(0, 8)
            };
          })()`,
          returnByValue: true
        }
      });
      ws.send(msg);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === 1) {
        console.log('RESULT:', JSON.stringify(data.result.result.value, null, 2));
        ws.close();
        proc.kill();
      }
    };
  } catch (err) {
    console.error('Error:', err);
    proc.kill();
  }
}, 3000);
