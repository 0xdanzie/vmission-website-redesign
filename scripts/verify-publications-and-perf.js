const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'qa', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('=== PHASE 5: PUBLICATIONS FLAGSHIP & PERFORMANCE BENCHMARK ===');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const report = {
    publications: {},
    publicationDetail: {},
    performance: {},
    responsive: {},
    accessibility: {}
  };

  try {
    // -------------------------------------------------------------
    // 1. GATE 3 — PUBLICATIONS FLAGSHIP (DESKTOP 1280x800)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Publications Flagship Page ---');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/publications/`, { waitUntil: 'networkidle0' });

    // Verify Scene 01 Arrive: Dynamic stats
    const heroText = await page.$eval('section, div', () => document.body.innerText);
    report.publications.has250Works = heroText.includes('250 Canonical Works') || heroText.includes('250');
    report.publications.hasSandeshCount = heroText.includes('87 monthly issues of Vedanta Sandesh');
    report.publications.hasPiyushCount = heroText.includes('77 monthly issues of Vedanta Piyush');
    report.publications.hasEbooksCount = heroText.includes('6 recovered philosophical e-books');
    report.publications.hasStudyTextsCount = heroText.includes('80 classical study texts');

    console.log('Dynamic Corpus Counts in Hero:', {
      has250Works: report.publications.has250Works,
      hasSandeshCount: report.publications.hasSandeshCount,
      hasPiyushCount: report.publications.hasPiyushCount,
      hasEbooksCount: report.publications.hasEbooksCount,
      hasStudyTextsCount: report.publications.hasStudyTextsCount,
    });

    // Verify Scene 02: E-Book Vault
    const vaultCards = await page.$$eval('#ebook-vault article', cards => cards.map(c => {
      const title = c.querySelector('h3')?.innerText;
      const author = c.querySelector('p')?.innerText;
      const hasVerifiedTag = c.querySelector('span')?.innerText;
      const img = c.querySelector('img')?.getAttribute('src');
      return { title, author, img };
    }));
    report.publications.ebookVaultCardsCount = vaultCards.length;
    report.publications.ebookVaultCards = vaultCards;
    console.log(`E-Book Vault recovered books count: ${vaultCards.length}`);

    // Verify Scene 03: Periodicals & Era navigation
    const eraButtons = await page.$$eval('button', btns => 
      btns.filter(b => b.innerText.includes('Decade') || b.innerText.includes('Eras'))
          .map(b => b.innerText.replace(/\n/g, ' '))
    );
    report.publications.eraButtons = eraButtons;
    console.log('Chronological Era Navigation:', eraButtons);

    // Verify Scene 04: Complete Archive & Performance batched cards
    const initialRenderedCards = await page.$$eval('#archive-browser article', cards => cards.length);
    report.publications.initialRenderedCards = initialRenderedCards;
    console.log(`Initial batched cards rendered in DOM: ${initialRenderedCards} (safe progressive mount)`);

    // Verify status badges (Authentic Cover vs Archival Plate)
    const verifiedBadges = await page.$$eval('span', els => els.filter(e => e.innerText === 'Authentic Cover').length);
    const archivalBadges = await page.$$eval('span', els => els.filter(e => e.innerText === 'Archival Plate').length);
    report.publications.verifiedBadgesCount = verifiedBadges;
    report.publications.archivalBadgesCount = archivalBadges;
    console.log(`Card status indicators: Verified Covers: ${verifiedBadges}, Archival Plates: ${archivalBadges}`);

    // Capture Desktop Screenshot
    const pubDesktopPath = path.join(SCREENSHOT_DIR, 'publications-desktop-1280.png');
    await page.screenshot({ path: pubDesktopPath, fullPage: false });
    console.log(`Saved screenshot: ${pubDesktopPath}`);

    // Test "Load More" pagination interaction
    const loadMoreBtn = await page.$('button[class*="btnLoadMore"]');
    if (loadMoreBtn) {
      await loadMoreBtn.click();
      await new Promise(r => setTimeout(r, 200));
      const cardsAfterLoadMore = await page.$$eval('#archive-browser article', cards => cards.length);
      console.log(`Cards after clicking Load More: ${cardsAfterLoadMore}`);
      report.publications.cardsAfterLoadMore = cardsAfterLoadMore;
    }

    // -------------------------------------------------------------
    // 2. PUBLICATION DETAIL TEST (E-Book & Periodical)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Publication Detail Bookplate ---');
    await page.goto(`${BASE_URL}/publications/book-000348/`, { waitUntil: 'networkidle0' });
    const ebookDetailTitle = await page.$eval('h1', el => el.innerText);
    const ebookDetailCover = await page.$eval('img[class*="coverImg"]', el => el.getAttribute('src'));
    console.log(`E-Book Detail: "${ebookDetailTitle}", cover: ${ebookDetailCover}`);
    report.publicationDetail.ebook = { title: ebookDetailTitle, cover: ebookDetailCover };

    const pubDetailScreenshot = path.join(SCREENSHOT_DIR, 'publication-detail-1280.png');
    await page.screenshot({ path: pubDetailScreenshot, fullPage: false });

    // Archival Placeholder record detail
    await page.goto(`${BASE_URL}/publications/vs-000185/`, { waitUntil: 'networkidle0' });
    const placeholderExists = await page.$eval('div[class*="placeholder"]', el => !!el).catch(() => false);
    console.log(`Placeholder Detail rendered editorial plate: ${placeholderExists}`);
    report.publicationDetail.placeholderRendered = placeholderExists;

    // -------------------------------------------------------------
    // 3. GATE 4 — PERFORMANCE BENCHMARK (Internal Navigation)
    // -------------------------------------------------------------
    console.log('\n--- 3. Measuring Internal Route Navigation Latency ---');

    // Route Transition A: /events/ -> /publications/
    await page.goto(`${BASE_URL}/events/`, { waitUntil: 'networkidle0' });
    const eventsToPubsTiming = await page.evaluate(async () => {
      const link = document.querySelector('a[href="/publications/"], a[href="/publications"]');
      if (!link) return { error: 'Link not found' };
      const start = performance.now();
      link.click();
      // Wait for publications page header to appear
      await new Promise((resolve) => {
        const check = () => {
          if (document.querySelector('h1')?.innerText.includes('Literary Archive')) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
      const duration = performance.now() - start;
      return { duration };
    });
    console.log(`Events → Publications transition time: ${eventsToPubsTiming.duration.toFixed(1)}ms`);
    report.performance.eventsToPublications = eventsToPubsTiming.duration;

    // Route Transition B: /publications/[id] -> /publications/
    await page.goto(`${BASE_URL}/publications/book-000348/`, { waitUntil: 'networkidle0' });
    const pubDetailToPubsTiming = await page.evaluate(async () => {
      const breadcrumb = document.querySelector('a[href="/publications"]');
      if (!breadcrumb) return { error: 'Breadcrumb not found' };
      const start = performance.now();
      breadcrumb.click();
      await new Promise((resolve) => {
        const check = () => {
          if (document.querySelector('h1')?.innerText.includes('Literary Archive')) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
      const duration = performance.now() - start;
      return { duration };
    });
    console.log(`Publications Detail → Publications transition time: ${pubDetailToPubsTiming.duration.toFixed(1)}ms`);
    report.performance.pubDetailToPublications = pubDetailToPubsTiming.duration;

    // Route Transition C: /events/ -> /teachings/
    await page.goto(`${BASE_URL}/events/`, { waitUntil: 'networkidle0' });
    const eventsToTeachingsTiming = await page.evaluate(async () => {
      const link = document.querySelector('a[href="/teachings/"], a[href="/teachings"]');
      if (!link) return { error: 'Link not found' };
      const start = performance.now();
      link.click();
      await new Promise((resolve) => {
        const check = () => {
          if (document.querySelector('h1')?.innerText.includes('Teachings') || document.querySelector('h1')?.innerText.includes('Audio')) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
      const duration = performance.now() - start;
      return { duration };
    });
    console.log(`Events → Teachings transition time: ${eventsToTeachingsTiming.duration.toFixed(1)}ms`);
    report.performance.eventsToTeachings = eventsToTeachingsTiming.duration;

    // -------------------------------------------------------------
    // 4. GATE 6 — RESPONSIVE EXPERIENCE TESTS
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Responsive Viewports (Publications, Events, Learn) ---');
    const viewports = [
      { name: '375px (Mobile)', width: 375, height: 667 },
      { name: '430px (Large Mobile)', width: 430, height: 932 },
      { name: '768px (Tablet)', width: 768, height: 1024 },
      { name: '1024px (Laptop)', width: 1024, height: 768 },
      { name: '1280px (Desktop)', width: 1280, height: 800 },
      { name: '1440px (Wide)', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/publications/`, { waitUntil: 'networkidle0' });
      
      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      report.responsive[vp.name] = { width: vp.width, hasOverflow };
      console.log(`Viewport ${vp.name}: Horizontal overflow = ${hasOverflow}`);

      if (vp.width === 375) {
        const mobilePubPath = path.join(SCREENSHOT_DIR, 'publications-mobile-375.png');
        await page.screenshot({ path: mobilePubPath, fullPage: false });
        console.log(`Saved screenshot: ${mobilePubPath}`);
      }
    }

    // -------------------------------------------------------------
    // 5. GATE 7 — ACCESSIBILITY VERIFICATION
    // -------------------------------------------------------------
    console.log('\n--- 5. Checking Accessibility & Touch Targets ---');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/publications/`, { waitUntil: 'networkidle0' });

    const touchTargetResults = await page.evaluate(() => {
      const interactiveElements = Array.from(document.querySelectorAll('button, a, input'));
      const smallTargets = [];
      interactiveElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check only visible elements
        if (rect.width > 0 && rect.height > 0 && rect.top < 2000) {
          if (rect.height < 40 && rect.width < 40) {
            smallTargets.push({
              tag: el.tagName,
              text: el.innerText || el.getAttribute('aria-label') || el.className,
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        }
      });
      return { totalChecked: interactiveElements.length, smallTargets: smallTargets.slice(0, 5) };
    });
    report.accessibility.touchTargets = touchTargetResults;
    console.log(`Interactive elements evaluated: ${touchTargetResults.totalChecked}`);
    console.log('Touch targets under 40px:', touchTargetResults.smallTargets);

    // Save final report JSON
    const reportPath = path.join(__dirname, '..', 'docs', 'qa', 'phase5-verification-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nFull verification report written to: ${reportPath}`);

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
