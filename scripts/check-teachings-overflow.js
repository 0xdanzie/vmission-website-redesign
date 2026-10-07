const puppeteer = require('puppeteer');

const VIEWPORTS = [
  { name: 'Mobile Mini (375px)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 (390px)', width: 390, height: 844 },
  { name: 'iPhone Max (430px)', width: 430, height: 932 },
  { name: 'Tablet (768px)', width: 768, height: 1024 },
  { name: 'Desktop Large (1440px)', width: 1440, height: 900 }
];

const URLS = [
  'http://localhost:3000/teachings',
  'http://localhost:3000/teachings/gita-ch03',
  'http://localhost:3000/teachings/atma-bodha-01'
];

async function checkLayout() {
  console.log('=== RESPONSIVE LAYOUT & OVERFLOW AUDIT ===\n');
  const browser = await puppeteer.launch({ headless: 'new' });
  let allPass = true;

  for (const url of URLS) {
    const pageName = url.replace('http://localhost:3000', '');
    console.log(`Auditing Route: ${pageName}`);
    
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Wait a bit for layout calculation
      await new Promise(r => setTimeout(r, 600));

      const result = await page.evaluate(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasOverflow = scrollWidth > docWidth + 1; // 1px threshold for fractional rounding
        
        let offenders = [];
        if (hasOverflow) {
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 2) {
              offenders.push({
                tag: el.tagName,
                className: (typeof el.className === 'string' ? el.className : '').slice(0, 50),
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          }
        }

        return { docWidth, scrollWidth, hasOverflow, offenders: offenders.slice(0, 3) };
      });

      if (result.hasOverflow) {
        console.error(`  ❌ [FAIL] ${vp.name}: Overflow detected! scrollWidth=${result.scrollWidth}, docWidth=${result.docWidth}`);
        console.error('    Offenders:', result.offenders);
        allPass = false;
      } else {
        console.log(`  ✅ [PASS] ${vp.name}: Zero horizontal overflow (scrollWidth=${result.scrollWidth}, docWidth=${result.docWidth})`);
      }

      await page.close();
    }
    console.log('');
  }

  await browser.close();
  console.log(`Audit Finished. Status: ${allPass ? 'ALL BREAKPOINTS PASSED' : 'FAILURES DETECTED'}`);
  process.exit(allPass ? 0 : 1);
}

checkLayout().catch(err => {
  console.error('Audit script error:', err);
  process.exit(1);
});
