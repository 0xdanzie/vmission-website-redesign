# PHASE 3B.0 — ROUTE MAPPING SPECIFICATION & MATRIX
## Vedanta Mission / Vedanta Ashram, Indore
**Phase:** 3B.0 — Content Reconciliation + Master Migration Baseline  
**Date:** 7 September 2026  
**Status:** COMPLETE & AUTHORITATIVE ROUTE MAPPING BASELINE  
**Governing Rule:** PLANNING SPECIFICATION ONLY — NO REDIRECT CODE IN NEXT.CONFIG.JS YET  

---

## 1. Redirect Strategy & Architectural Principles

During the upcoming technical implementation phases, all legacy URLs discovered from `vmission.org.in` must be permanently mapped to their approved Next.js destinations to:
1. **Preserve Decades of Search Authority (SEO):** Prevent Google and search crawlers from losing indexed pages and spiritual search rankings.
2. **Prevent Broken Bookmarks for Seekers:** Ensure thousands of international devotees who have bookmarked specific pravachans land directly on the correct media player or publication reader.
3. **Eliminate 404 Not Found Errors:** Gracefully handle legacy WordPress and Elementor paths.
4. **Decommission Malformed Legacy Strings:** Properly handle or remove defective URLs (`http://Sub`, `.htm` paths).

---

## 2. Master Route Mapping Matrix

| Old WordPress URL | Proposed New Route | Proposed New Section | Action | Redirect Needed | Current Status | Notes & Rationale |
|---|---|---|:---:|:---:|:---:|---|
| `/` | `/` | All Sections (Ch 1–9) | **REPLACE** | 200 OK | **LOCKED** | Homepage baseline frozen in Phase 3A.6. |
| `/about-us/` | `/about` | Overview / Story | **MIGRATE** | 301 Permanent | Architectural Baseline | Main institutional about hub. |
| `/vision/` | `/about` | `#vision` | **MERGE** | 301 Permanent | Architectural Baseline | Merged into main vision section of `/about`. |
| `/org/` | `/about` | `#governance` | **MERGE** | 301 Permanent | Architectural Baseline | Absorbed into governance section of `/about`. |
| `/our-trusts/` | `/about` | `#trusts` | **MERGE** | 301 Permanent | Architectural Baseline | Absorbed into trusts overview section of `/about`. |
| `/vpst-at-indore/` | `/about` | `#trusts-vpst` | **MERGE** | 301 Permanent | Pending Client Verify | Trust profile on `/about`; banking details to `/donate`. |
| `/icf-at-mumbai/` | `/about` | `#trusts-icf` | **VERIFY** | 301 Permanent | Pending Client Verify | CONFLICT / VERIFY: Indian Culture Foundation status. |
| `/centers/` | `/about` | `#centers` | **VERIFY** | 301 Permanent | Pending Client Verify | Conditional on verified active satsang centers. |
| `/acharyas-2/` | `/acharyas` | Directory Grid | **MIGRATE** | 301 Permanent | Architectural Baseline | Canonical roster of all 4 revered Acharyas. |
| `/guruji/` | `/acharyas/swami-atmananda-saraswati` | Biography & Teachings | **MIGRATE** | 301 Permanent | Pending Bio Verify | Dedicated profile for Poojya Guruji. |
| `/p-swamini-amitananda-saraswati/` | `/acharyas/swamini-amitananda-saraswati` | Biography & Teachings | **MIGRATE** | 301 Permanent | Pending Bio Verify | Dedicated profile for Swamini Amitanandaji. |
| `/p-swamini-poornananda-saraswati/` | `/acharyas/swamini-poornananda-saraswati` | Biography & Teachings | **MIGRATE** | 301 Permanent | Pending Bio Verify | Dedicated profile for Swamini Poornanandaji. |
| `/p-swamini-samatananda-saraswati/` | `/acharyas/swamini-samatananda-saraswati` | Biography & Teachings | **MIGRATE** | 301 Permanent | Pending Bio Verify | Dedicated profile for Swamini Samatanandaji. |
| `/ashram/` | `/ashram` | Sacred Arrival | **MIGRATE** | 301 Permanent | Architectural Baseline | Central physical ashram portal. |
| `/introduction/` | `/ashram` | `#about` | **MERGE** | 301 Permanent | Architectural Baseline | Merged into Ashram overview narrative. |
| `/ashram_parivar/` (Ashram menu) | `/ashram` | `#parivar` | **MERGE** | 301 Permanent | Architectural Baseline | Merged into resident community narrative. |
| `/ashram_parivar/` (Top menu) | `/ashram` | `#parivar` | **MERGE** | 301 Permanent | Architectural Baseline | Duplicate top-level nav item consolidated. |
| `/activities/` | `/ashram` | `#routine` | **MERGE** | 301 Permanent | Architectural Baseline | Daily spiritual rhythm and mandir schedule. |
| `/facilities/` | `/ashram` | `#facilities` | **MERGE** | 301 Permanent | Architectural Baseline | Kutirs, library, discourse hall, dining. |
| `/directions/` | `/ashram` | `#visit` | **MERGE** | 301 Permanent | Architectural Baseline | Travel transit guide (Air, Rail, Road). |
| `/ashram/gita_course` | `/learn` | Course Catalog | **VERIFY** | 301 Permanent | Pending Course Verify | Raw slug in legacy menu; routes to study hub. |
| `/vm-audios/` | `/teachings` | `?type=audio` | **MERGE** | 301 Permanent | Architectural Baseline | Redirects to audio-filtered view of teachings. |
| `/vm-videos-2/` | `/teachings` | `?type=video` | **MERGE** | 301 Permanent | Architectural Baseline | Redirects to video-filtered view of teachings. |
| `/gita-pravachans-2/` | `/teachings` | `?category=bhagavad-gita` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Bhagavad Gita discourses. |
| `/upanishad-talks/` | `/teachings` | `?category=upanishads` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Upanishadic discourses. |
| `/atmabodha-talks/` | `/teachings` | `?category=prakarana-granth` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Prakarana Granth library. |
| `/prakarana-granth/` | `/teachings` | `?category=prakarana-granth` | **MERGE** | 301 Permanent | Architectural Baseline | Canonical category filter. |
| `/meditation/` | `/teachings` | `?category=meditation` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Meditation discourses. |
| `/chanting/` (Gita Chanting) | `/teachings` | `?category=chanting` | **MERGE** | 301 Permanent | Architectural Baseline | Resolves legacy duplicate menu item. |
| `/chanting/` (Chanting & Bhajans) | `/teachings` | `?category=chanting` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Chanting & Bhajans. |
| `/hanuman-chalisa-talks/` | `/teachings` | `?category=devotional` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Devotional discourses. |
| `/sundarkand-talks/` | `/teachings` | `?category=devotional` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Devotional discourses. |
| `/inspiring-stories/` | `/teachings` | `?category=inspiring-stories` | **MIGRATE** | 301 Permanent | Architectural Baseline | Direct filter to Inspiring Stories. |
| `/e-books/` | `/publications` | `?type=ebook` | **MERGE** | 301 Permanent | Architectural Baseline | Filtered directly to E-Books & Monograms. |
| `/vedanta-sandesh-ezine/` | `/publications` | `?type=sandesh` | **MIGRATE** | 301 Permanent | Architectural Baseline | Filtered directly to Vedanta Sandesh archive. |
| `/vedanta-piyush-ezine/` | `/publications` | `?type=piyush` | **MIGRATE** | 301 Permanent | Architectural Baseline | Filtered directly to Vedanta Piyush archive. |
| `/vishnu-sahasranaam/` | `/publications` | `?type=texts` | **MERGE** | 301 Permanent | Architectural Baseline | Filtered directly to Sanskrit Study Texts. |
| `/pravachan-text/` | `/publications` | `?type=texts` | **MIGRATE** | 301 Permanent | Architectural Baseline | Filtered directly to Sanskrit Study Texts. |
| `/general-pdf/` | `/publications` | Library Overview | **MIGRATE** | 301 Permanent | Architectural Baseline | Main publications repository. |
| `http://Sub` / `http://sub/` | N/A | N/A | **REMOVE** | 410 Gone / None | Obsolete Defect | Malformed external string; decommissioned. |
| `/progs/` | `/events` | Calendar Hub | **MERGE** | 301 Permanent | Architectural Baseline | Consolidated into main events calendar. |
| `/forthcoming-programs/` | `/events` | Upcoming Feed | **MIGRATE** | 301 Permanent | Pending Client Dates | Upcoming events schedule. |
| `/earlier-programs/` | `/events` | `#archive` | **ARCHIVE** | 301 Permanent | Architectural Baseline | Past shivir reports and event archive. |
| `/albums/` | `/events` | `#gallery` | **MIGRATE** | 301 Permanent | Architectural Baseline | Event photographs and shivir gallery. |
| `/kinds-of-activities/` | `/about` | `#activities` | **MERGE** | 301 Permanent | Architectural Baseline | Narrative description of spiritual activities. |
| `/donate` / `/donate/` | `/donate` | Donation Portal | **MIGRATE** | 200 / 301 | Sensitive Financial | Primary seva and contribution hub. |
| `/donation-for/` | `/donate` | `#purposes` | **MERGE** | 301 Permanent | Architectural Baseline | Consolidated causes section on `/donate`. |
| `/contact-us/` | `/contact` | Central Desk | **MIGRATE** | 301 Permanent | Architectural Baseline | Unified contact and inquiry desk. |
| `http://www.vmission.org.in/blog` | `/events` | `#archive` | **REMOVE** | 301 Permanent | Pending Post Audit | Unmaintained blog path; redirect to events archive. |
| `http://acrosoftwts.com/` | N/A | N/A | **REMOVE** | None | Decommissioned | Legacy vendor footer credit. |

---

## 3. Summary of Route Actions

- **Total Routes Analyzed:** 50
- **Direct 301 Permanent Redirects:** 44 routes
- **Direct 200 OK Endpoints:** 2 routes (`/`, `/donate`)
- **Decommissioned / Removed (410 or None):** 4 routes (`http://Sub`, `http://sub/`, `/blog`, `acrosoftwts.com`)

---

## 4. Technical Blueprint for Phase 3 Implementation

When Phase 3 starts implementation, these redirects will be mapped into `next.config.js` via the `redirects()` configuration block:

```javascript
// Sample Next.js Redirect Implementation Pattern (For Phase 3 Technical Use)
async redirects() {
  return [
    { source: '/about-us', destination: '/about', permanent: true },
    { source: '/vision', destination: '/about#vision', permanent: true },
    { source: '/org', destination: '/about', permanent: true },
    { source: '/our-trusts', destination: '/about#trusts', permanent: true },
    { source: '/vpst-at-indore', destination: '/about#trusts', permanent: true },
    { source: '/guruji', destination: '/acharyas/swami-atmananda-saraswati', permanent: true },
    { source: '/vm-audios', destination: '/teachings?type=audio', permanent: true },
    { source: '/vm-videos-2', destination: '/teachings?type=video', permanent: true },
    { source: '/vedanta-sandesh-ezine', destination: '/publications?type=sandesh', permanent: true },
    { source: '/vedanta-piyush-ezine', destination: '/publications?type=piyush', permanent: true },
    { source: '/contact-us', destination: '/contact', permanent: true },
  ];
}
```
