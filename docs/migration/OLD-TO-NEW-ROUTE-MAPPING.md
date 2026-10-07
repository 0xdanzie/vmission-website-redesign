# OLD TO NEW ROUTE MAPPING SPECIFICATION
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2B — Final Information Architecture + Navigation Proposal (Hardened in Phase 2B.5)  
**Date:** 2026-09-04  
**Status:** VALIDATED ARCHITECTURAL BASELINE — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Synthesizes legacy inventory from Phase 1 (`CONTENT-MIGRATION-MASTER.md`) and migration classifications from Phase 2A (`MIGRATION-DECISION-MATRIX.md`).

---

## 1. Redirect Strategy & SEO Preservation

To preserve search engine equity, prevent 404 errors for external spiritual back-links, and ensure devotees with existing bookmarks land on the correct content, verified legacy WordPress URLs will be mapped to their new Next.js destinations via **HTTP 301 Permanent Redirects** during Phase 3.

### Mapping Classification Types:
* **DIRECT:** 1-to-1 equivalence between legacy page and new dedicated route.
* **MERGE:** Multiple fragmented legacy pages combined into a single, cohesive hub page.
* **LIBRARY REDIRECT:** Legacy topic sub-page redirected into a filtered view of a unified media or publication library.
* **ARCHIVE:** Historical or event-specific content directed to an archival listing.
* **REMOVE / 410:** Obsolete, duplicate, or broken URLs permanently decommissioned.
* **VERIFY:** Mapping dependent on pending client confirmation.

---

## 2. Master Route Mapping Table

| ID | Old WordPress URL | Old Page Purpose | Proposed New Route | Mapping Type | HTTP Code | Architectural Notes & Rationale |
|:---:|---|---|---|:---:|:---:|---|
| **R01** | `/` | Old Homepage | `/` | **DIRECT** | 200 | New cinematic entrance + spiritual homepage |
| **R02** | `/about-us/` | Legacy About Page | `/about` | **DIRECT** | 301 | Main organizational vision & mission hub |
| **R03** | `/vision/` | Vision & Mission Sub-page | `/about#vision` | **MERGE** | 301 | Merged into main narrative of `/about` |
| **R04** | `/org/` | Organization Overview | `/about` | **MERGE** | 301 | Legacy administrative page absorbed into `/about` |
| **R05** | `/our-trusts/` | Trusts Menu Parent | `/about#trusts` | **MERGE** | 301 | Governance details merged into `/about` |
| **R06** | `/vpst-at-indore/` | Vedanta Parayan Samiti Trust | `/about#trusts` | **MERGE** | 301 | Specific trust page merged into `/about#trusts` |
| **R07** | `/icf-at-mumbai/` | Indore Cancer Foundation | `/about#trusts` | **VERIFY** | 301 | Associated charity; verify current status |
| **R08** | `/centers/` | Satsang Centers Sub-page | `/about#centers` | **VERIFY** | 301 | Subject to client verification of active centers |
| **R09** | `/acharyas-2/` | Acharyas Listing Menu | `/acharyas` | **DIRECT** | 301 | Directory of all four revered Acharyas |
| **R10** | `/guruji/` | Poojya Guruji Swami Atmanandaji | `/acharyas/swami-atmanandaji` | **DIRECT** | 301 | Dedicated profile page with verified bio |
| **R11** | `/p-swamini-amitananda-saraswati/` | Swamini Amitananda Saraswati | `/acharyas/swamini-amitanandaji` | **DIRECT** | 301 | Dedicated profile page with verified bio |
| **R12** | `/p-swamini-poornananda-saraswati/` | Swamini Poornananda Saraswati | `/acharyas/swamini-poornanandaji` | **DIRECT** | 301 | Dedicated profile page with verified bio |
| **R13** | `/p-swamini-samatananda-saraswati/` | Swamini Samatananda Saraswati | `/acharyas/swamini-samatanandaji` | **DIRECT** | 301 | Dedicated profile page with verified bio |
| **R14** | `/ashram/` | Ashram Introduction Hub | `/ashram` | **DIRECT** | 301 | New consolidated physical ashram experience |
| **R15** | `/introduction/` | Legacy Ashram Intro | `/ashram#about` | **MERGE** | 301 | Merged into top section of `/ashram` |
| **R16** | `/ashram_parivar/` | Monastic Community | `/ashram#parivar` | **MERGE** | 301 | Merged into Parivar section of `/ashram` |
| **R17** | `/activities/` | Ashram Daily Activities | `/ashram#routine` | **MERGE** | 301 | Daily routine merged into `/ashram` |
| **R18** | `/ashram/gita_course` | Ashram Gita Course Slug | `/learn` | **VERIFY** | 301 | Raw slug in old menu; verify content existence |
| **R19** | `/facilities/` | Ashram Facilities & Kutirs | `/ashram#facilities` | **MERGE** | 301 | Facilities section merged into `/ashram` |
| **R20** | `/directions/` | How to Reach Ashram | `/ashram#visit` | **MERGE** | 301 | Location & transit guide merged into `/ashram` |
| **R21** | `/vm-audios/` | Old Audio Portal | `/teachings?type=audio` | **LIBRARY REDIRECT** | 301 | Redirects to audio filtered view of library |
| **R22** | `/vm-videos-2/` | Old Video Portal | `/teachings?type=video` | **LIBRARY REDIRECT** | 301 | Redirects to video filtered view of library |
| **R23** | `/gita-pravachans-2/` | Gita Audio Talks Page | `/teachings?category=bhagavad-gita` | **LIBRARY REDIRECT** | 301 | Filtered directly to Bhagavad Gita discourses |
| **R24** | `/upanishad-talks/` | Upanishad Audio Talks | `/teachings?category=upanishads` | **LIBRARY REDIRECT** | 301 | Filtered directly to Upanishadic discourses |
| **R25** | `/atmabodha-talks/` | Atmabodha Audio Talks | `/teachings?category=prakarana-granth` | **LIBRARY REDIRECT** | 301 | Filtered directly to Prakarana Granth library |
| **R26** | `/prakarana-granth/` | Prakarana Granth Hub | `/teachings?category=prakarana-granth` | **LIBRARY REDIRECT** | 301 | Canonical category filter |
| **R27** | `/meditation/` | Meditation Talks | `/teachings?category=meditation` | **LIBRARY REDIRECT** | 301 | Filtered directly to Meditation discourses |
| **R28** | `/chanting/` | Chanting & Bhajans | `/teachings?category=chanting` | **LIBRARY REDIRECT** | 301 | Resolves old duplicate menu links |
| **R29** | `/hanuman-chalisa-talks/` | Hanuman Chalisa Series | `/teachings?category=devotional` | **LIBRARY REDIRECT** | 301 | Filtered directly to Devotional discourses |
| **R30** | `/sundarkand-talks/` | Sundarkand Pravachans | `/teachings?category=devotional` | **LIBRARY REDIRECT** | 301 | Filtered directly to Devotional discourses |
| **R31** | `/inspiring-stories/` | Stories Audio Page | `/teachings?category=inspiring-stories` | **LIBRARY REDIRECT** | 301 | Filtered directly to Inspiring Stories |
| **R32** | `/e-books/` | Legacy E-Books Page | `/publications?type=ebook` | **LIBRARY REDIRECT** | 301 | Filtered directly to E-Books & Monograms |
| **R33** | `/vedanta-sandesh-ezine/` | Monthly Sandesh E-Zine | `/publications?type=sandesh` | **LIBRARY REDIRECT** | 301 | Filtered directly to Vedanta Sandesh archive |
| **R34** | `/vedanta-piyush-ezine/` | Monthly Piyush E-Zine | `/publications?type=piyush` | **LIBRARY REDIRECT** | 301 | Filtered directly to Vedanta Piyush archive |
| **R35** | `/vishnu-sahasranaam/` | Vishnu Sahasranama Text | `/publications?type=texts` | **LIBRARY REDIRECT** | 301 | Filtered directly to Sanskrit Study Texts |
| **R36** | `/pravachan-text/` | Pravachan Study Notes | `/publications?type=texts` | **LIBRARY REDIRECT** | 301 | Filtered directly to Sanskrit Study Texts |
| **R37** | `/general-pdf/` | General PDF Archive | `/publications` | **LIBRARY REDIRECT** | 301 | Main publications repository |
| **R38** | `/progs/` | Legacy Programs Menu | `/events` | **DIRECT** | 301 | Forthcoming & past events calendar |
| **R39** | `/forthcoming-programs/` | Forthcoming Shibir Page | `/events` | **MERGE** | 301 | Upcoming programs feed on `/events` |
| **R40** | `/earlier-programs/` | Earlier Programs Page | `/events#archive` | **ARCHIVE** | 301 | Past event reports and shivir archive |
| **R41** | `/albums/` | Photo Albums Page | `/events#albums` | **MERGE** | 301 | Program photo gallery |
| **R42** | `/kinds-of-activities/` | Program Types Overview | `/about` | **MERGE** | 301 | Overview of spiritual activities |
| **R43** | `/donate` | Donation Page | `/donate` | **DIRECT** | 301 | Verified bank, UPI, and seva options |
| **R44** | `/donation-for/` | Donation Causes Sub-page | `/donate` | **MERGE** | 301 | Consolidated into single donate page |
| **R45** | `/contact-us/` | Legacy Contact Page | `/contact` | **DIRECT** | 301 | Unified contact, WhatsApp desk & address |
| **R46** | `http://Sub` | Malformed Subscribe URL | N/A | **REMOVE** | N/A | Malformed external string; decommissioned |
| **R47** | `/blog/` | Legacy Blog Hub | `/events` or `/publications` | **VERIFY** | 301 | Dependent on whether active blog posts exist |

---

## 3. Implementation Plan (Phase 3 Dependency)

During Phase 3 (Implementation), these 301 permanent redirects will be configured in `next.config.js` via the `redirects()` function. No redirect code is to be executed during Phase 2.
