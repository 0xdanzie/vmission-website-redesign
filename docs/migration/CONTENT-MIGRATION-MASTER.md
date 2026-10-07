# CONTENT MIGRATION MASTER INVENTORY
## V-Mission / Vedanta Ashram, Indore — Phase 1 Audit
**Audit Date:** 2026-09-04  
**Auditor:** Antigravity (Phase 1 — DO NOT MODIFY)  
**Source:** vmission.org.in (live WordPress site) + Next.js prototype inspection  
**Status:** READ-ONLY PLANNING DOCUMENT

---

## Summary

This document inventories ALL meaningful content found on the original V-Mission website (vmission.org.in) and the current Next.js prototype, classifies each item, and proposes a migration destination.

**Classification Legend:**
- `KEEP` — Useful content that can remain substantially unchanged
- `MERGE` — Duplicate/overlapping content that should become one canonical resource
- `MIGRATE` — Valuable content to bring into the redesigned system
- `ARCHIVE` — Historical material to remain accessible but de-emphasized
- `REWRITE` — Content that needs structural/readability improvement
- `REPLACE` — Asset to be replaced with better/verified material
- `REMOVE` — Obsolete, broken, or unusable material
- `VERIFY` — Requires client confirmation before action

---

## Current Implementation Map

*See: `CURRENT-IMPLEMENTATION-MAP.md` for full detail.*

The prototype has:
- Next.js 14.2.15 (App Router), React 18.3.1
- 23 routes across public (~15) and admin (~8) sections
- Static TypeScript data files as content source
- AudioPlayerContext for persistent audio player
- CSS Modules with premium Indian architectural design

---

## Source: Original V-Mission Website — Navigation Structure

**Original site URL:** https://www.vmission.org.in  
**CMS:** WordPress 7.0.3 with Elementor 3.29.1  
**Theme:** Custom `vmission` theme (Twenty Sixteen derivative)  

### Top-Level Navigation (verified from live HTML source)

```
Acharyas
  ├── Poojya Guruji        → https://vmission.org.in/guruji/
  ├── Swamini Amitananda   → https://www.vmission.org.in/p-swamini-amitananda-saraswati/
  ├── Swamini Poornananda  → https://www.vmission.org.in/p-swamini-poornananda-saraswati/
  └── Swamini Samatananda  → https://www.vmission.org.in/p-swamini-samatananda-saraswati/

Progs
  ├── Forthcoming Programs → https://www.vmission.org.in/forthcoming-programs/
  ├── Earlier Progs        → https://www.vmission.org.in/earlier-programs/
  ├── Albums               → https://www.vmission.org.in/albums/
  └── Kinds of Activities  → https://www.vmission.org.in/kinds-of-activities/

Audio / Video
  ├── Audios               → https://vmission.org.in/vm-audios/
  │   ├── Drig Drushya Viveka   → https://app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll
  │   ├── Atma-bodha Lessons    → https://www.vmission.org.in/atmabodha-talks/
  │   ├── Meditation            → https://www.vmission.org.in/meditation/
  │   ├── Gita Talks            → https://www.vmission.org.in/gita-pravachans-2/
  │   ├── Upanishad             → https://vmission.org.in/upanishad-talks/
  │   ├── Prakarana Granth      → https://vmission.org.in/prakarana-granth/
  │   ├── Hanuman Chalisa Talks → https://vmission.org.in/hanuman-chalisa-talks/
  │   ├── Sundarkand Talks      → https://vmission.org.in/sundarkand-talks/
  │   ├── Gita Chanting         → https://www.vmission.org.in/chanting/
  │   ├── Chanting & Bhajans    → https://vmission.org.in/chanting/ (DUPLICATE)
  │   └── Inspiring Stories     → https://www.vmission.org.in/inspiring-stories/
  └── Videos               → https://www.vmission.org.in/vm-videos-2/

Pdf
  ├── Publications (ebooks) → https://www.vmission.org.in/e-books/
  ├── Vishnu Sahasranaam    → https://vmission.org.in/vishnu-sahasranaam/
  ├── Pravachan Text        → https://vmission.org.in/pravachan-text/
  ├── Vedanta Sandesh       → https://www.vmission.org.in/vedanta-sandesh-ezine/
  ├── Vedanta Piyush        → https://www.vmission.org.in/vedanta-piyush-ezine/
  ├── General Pdf           → https://vmission.org.in/general-pdf/
  └── Subscribe             → http://Sub  [MALFORMED — BROKEN]

Ashram
  ├── Introduction          → https://www.vmission.org.in/introduction/
  ├── Parivar               → https://vmission.org.in/ashram_parivar/
  ├── Activities            → https://vmission.org.in/activities/
  ├── gita_course           → https://www.vmission.org.in/ashram/gita_course  [RAW SLUG]
  ├── Facilities            → https://www.vmission.org.in/facilities/
  ├── Directions            → https://www.vmission.org.in/directions/
  └── Org
      ├── About             → https://vmission.org.in/vision/
      ├── Our Trusts
      │   ├── VPST @ Indore → https://vmission.org.in/vpst-at-indore/
      │   └── ICF @ Mumbai  → https://vmission.org.in/icf-at-mumbai/
      └── Centers           → https://www.vmission.org.in/centers/

Parivar (Top-level, duplicate) → https://vmission.org.in/ashram_parivar/

Donate
  ├── Donation By           → https://vmission.org.in/donate
  └── Donation For          → https://vmission.org.in/donation-for/

Blog                         → http://www.vmission.org.in/blog  [UNKNOWN STATUS]

Contact                      → https://www.vmission.org.in/contact-us/
```

---

## Content Migration Inventory

### Section A — Acharyas

| ID | Old URL | Content Title | Type | Classification | Proposed New Location | Client Verify | Notes |
|----|---------|--------------|------|---------------|----------------------|---------------|-------|
| A01 | `/acharyas-2/` | Acharyas Overview Page | page | MIGRATE | `/acharyas` | YES | Main acharyas listing |
| A02 | `vmission.org.in/guruji/` | Poojya Guruji (Swami Atmanandaji) | biography | MIGRATE | `/acharyas/swami-atmanandaji` | YES | Bio content needs verification |
| A03 | `/p-swamini-amitananda-saraswati/` | Swamini Amitananda Saraswati | biography | MIGRATE | `/acharyas/swamini-amitanandaji` | YES | Bio content needs verification |
| A04 | `/p-swamini-poornananda-saraswati/` | Swamini Poornananda Saraswati | biography | MIGRATE | `/acharyas/swamini-poornanandaji` | YES | Bio content needs verification |
| A05 | `/p-swamini-samatananda-saraswati/` | Swamini Samatananda Saraswati | biography | MIGRATE | `/acharyas/swamini-samatanandaji` | YES | Bio content needs verification |

**Duplicate Note:** "Parivar" (`/ashram_parivar/`) appears both under Ashram submenu AND as a top-level menu item — duplicate navigation entry.

---

### Section B — Audio Inventory

| ID | Old URL | Content Title | Category | Platform | Classification | Proposed New Location | Notes |
|----|---------|--------------|----------|----------|---------------|----------------------|-------|
| B01 | `vmission.org.in/vm-audios/` | VM Audios Hub Page | hub/index | vmission.org.in | MERGE | `/teachings` (audio section) | Landing page for all audios |
| B02 | `app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll` | Drig Drushya Viveka | Prakarana Granth | Box.com | MIGRATE | `/teachings` → category: Prakarana Granth | VERIFY Box link status |
| B03 | `vmission.org.in/atmabodha-talks/` | Atma-bodha Lessons | Prakarana Granth | vmission.org.in | MIGRATE | `/teachings` → category: Prakarana Granth | VERIFY audio embed/link status |
| B04 | `vmission.org.in/meditation/` | Meditation | Meditation | vmission.org.in | MIGRATE | `/teachings` → category: Meditation | VERIFY page content |
| B05 | `vmission.org.in/gita-pravachans-2/` | Gita Talks (Pravachans) | Bhagavad Gita | vmission.org.in | MIGRATE | `/teachings` → category: Bhagavad Gita | VERIFY audio embed/link status |
| B06 | `vmission.org.in/upanishad-talks/` | Upanishad Talks | Upanishads | vmission.org.in | MIGRATE | `/teachings` → category: Upanishads | VERIFY audio embed/link status |
| B07 | `vmission.org.in/prakarana-granth/` | Prakarana Granth Hub | Prakarana Granth | vmission.org.in | MIGRATE | `/teachings` → category: Prakarana Granth | Hub page — may contain multiple sub-series |
| B08 | `vmission.org.in/hanuman-chalisa-talks/` | Hanuman Chalisa Talks | Devotional | vmission.org.in | MIGRATE | `/teachings` → category: Devotional | VERIFY page content |
| B09 | `vmission.org.in/sundarkand-talks/` | Sundarkand Talks | Devotional | vmission.org.in | MIGRATE | `/teachings` → category: Devotional | VERIFY page content |
| B10 | `vmission.org.in/chanting/` | Gita Chanting | Chanting & Bhajans | vmission.org.in | MERGE | `/teachings` → category: Chanting | Duplicate: menu items "Gita Chanting" AND "Chanting & Bhajans" BOTH point to same URL |
| B11 | `vmission.org.in/inspiring-stories/` | Inspiring Stories | Discourses | vmission.org.in | MIGRATE | `/teachings` → category: Stories | VERIFY page content |

**Audio Notes:**
- The old website uses multiple audio plugins: Themify Audio Dock, Audio Player with Playlist Ultimate (jPlayer), Audio Album plugin, MediaElement.js
- Actual audio files appear to be hosted on `vmission.org.in/wp-content/uploads/` (e.g., `audio-1.mp3`, `audio-2.mp3` found in source)
- Some audio is hosted on Box.com (external dependency)
- Audio permissions: All audio is presumed Vedanta Mission's own content — VERIFY ownership before redistribution

---

### Section C — Video Inventory

| ID | Old URL | Content Title | Platform | Classification | Proposed New Location | Notes |
|----|---------|--------------|----------|---------------|----------------------|-------|
| C01 | `vmission.org.in/vm-videos-2/` | VM Videos Hub Page | vmission.org.in | MIGRATE | `/teachings` (video section) | VERIFY: YouTube channel linked? |
| C02 | (UNKNOWN — requires browser inspection) | YouTube Video Library | YouTube | VERIFY | `/teachings` → video category | YouTube channel URL not captured in source HTML |
| C03 | (UNKNOWN) | Video talks/pravachans | UNKNOWN | VERIFY | `/teachings` → video | Need browser inspection of `/vm-videos-2/` |

**Video Notes:**
- The old site uses Elementor video widget (YouTube embeds)
- Actual YouTube channel URL: UNKNOWN — NEEDS CLIENT VERIFICATION
- WhatsApp message widget mentions: "Online Vedanta & Gita Classes" — suggests live/recorded video classes exist

---

### Section D — E-Books / Publications Inventory

**Source page verified:** `vmission.org.in/e-books/` (Publications EBooks)

| ID | Content Title | Language | Hosts Available | Classification | Proposed New Location | Notes |
|----|--------------|----------|----------------|---------------|----------------------|-------|
| D01 | Vedanta Articles - 6 | UNKNOWN | GDrive, Box, Archive.org, Flipbook (pubhtml5), pCloud | MIGRATE | `/publications` → E-Books | Most recent volume |
| D02 | Vedanta Articles - 4 | UNKNOWN | GDrive, Box, Archive.org, Flipbook (pubhtml5), pCloud | MIGRATE | `/publications` → E-Books | |
| D03 | Vedanta Articles - 3 | UNKNOWN | GDrive, Box, Archive.org, Flipbook (pubhtml5), pCloud | MIGRATE | `/publications` → E-Books | |
| D04 | Vedanta Articles - 2 | UNKNOWN | GDrive, Box, Archive.org, Flipbook (pubhtml5), pCloud | MIGRATE | `/publications` → E-Books | |
| D05 | Vedanta Articles - 1 | UNKNOWN | GDrive, Box, Archive.org, Flipbook (pubhtml5), pCloud | MIGRATE | `/publications` → E-Books | |
| D06 | Articles on Gita (Eng) | English | pCloud (`u.pc.cd/QXHotalK`) | MIGRATE | `/publications` → E-Books | |
| D07 | Email excerpts (P.Guruji) | UNKNOWN | pCloud (`u.pc.cd/ETH`) | MIGRATE | `/publications` → E-Books | VERIFY — personal emails? |
| D08 | शिव महिम्न: स्तोत्रम् (Shiva Mahimna Stotram) | Sanskrit/Hindi | pCloud (`u.pc.cd/UllitalK`) | MIGRATE | `/publications` → Study Texts | |
| D09 | कथा मञ्जरी (Katha Manjari) | Sanskrit/Hindi | pCloud (`u.pc.cd/lV9`) | MIGRATE | `/publications` → Study Texts | |
| D10 | शिव उपासना (Shiva Upasana) | Sanskrit/Hindi | pCloud (`u.pc.cd/iVectalK`) | MIGRATE | `/publications` → Study Texts | |
| D11 | विष्णु सहस्रनाम व्याख्या (Vishnu Sahasranama Vyakhya) | Sanskrit/Hindi | pCloud (`u.pc.cd/LS2rtalK`) | MIGRATE | `/publications` → Study Texts | |
| D12 | वैराग्य सन्दीपनी (Vairagya Sandipani) | Sanskrit/Hindi | pCloud (`u.pc.cd/ThcctalK`) | MIGRATE | `/publications` → Study Texts | |
| D13 | साधना पञ्चकम् मूल ग्रन्थ (Sadhana Panchakam) | Sanskrit | pCloud (`u.pc.cd/hcUrtalK`) | MIGRATE | `/publications` → Study Texts | |
| D14 | तत्त्वबोध मूल ग्रन्थ (Tattvabodha) | Sanskrit | pCloud (`u.pc.cd/bXF7`) | MIGRATE | `/publications` → Study Texts | |
| D15 | आत्मबोध मूल ग्रन्थ (Atmabodha) | Sanskrit | pCloud (`u.pc.cd/fc4`) | MIGRATE | `/publications` → Study Texts | Also exists as audio series (B03) |
| D16 | Vishnu Sahasranaam (sub-page) | UNKNOWN | vmission.org.in/vishnu-sahasranaam/ | VERIFY | `/publications` → Study Texts | Separate page from D11 — may duplicate |
| D17 | Pravachan Text | UNKNOWN | vmission.org.in/pravachan-text/ | VERIFY | `/publications` → Pravachan | UNKNOWN content |
| D18 | General PDF | UNKNOWN | vmission.org.in/general-pdf/ | VERIFY | `/publications` | UNKNOWN — needs browser inspection |

**E-Book Notes:**
- Publications are hosted redundantly across: Google Drive, Box.com, Archive.org, pCloud, pubhtml5 Flipbook
- pCloud short URLs (`u.pc.cd/...`) may have limited validity — VERIFY each URL before migration
- Ownership: All publications are Vedanta Mission originals — VERIFY explicit distribution permission

---

### Section E — Vedanta Sandesh (E-Zine)

**Source:** `vmission.org.in/vedanta-sandesh-ezine/`

| ID | Content Title | Classification | Notes |
|----|--------------|---------------|-------|
| E01 | Vedanta Sandesh — Monthly E-Zine (all issues) | MIGRATE | Long-running monthly publication. Specific issues not captured in this audit — needs browser inspection of the full page for all issue links. Hosted on Archive.org/Issuu/GDrive UNKNOWN |

**NEEDS VERIFICATION:** Number of Vedanta Sandesh issues, year range, hosting platform for each issue, download availability.

---

### Section F — Vedanta Piyush (E-Zine)

**Source:** `vmission.org.in/vedanta-piyush-ezine/`

| ID | Content Title | Classification | Notes |
|----|--------------|---------------|-------|
| F01 | Vedanta Piyush — Monthly E-Zine (all issues) | MIGRATE | Separate Hindi/Sanskrit e-zine. Same structure as Vedanta Sandesh. Specific issues not captured — needs browser inspection. |

---

### Section G — Courses / Programs

**Note:** The original website does not have an explicit "Courses" page separate from "Progs." Courses exist embedded within program pages and the WhatsApp message mentions "Online Vedanta & Gita Classes" and "Residential Meditation Camp."

| ID | Old URL | Content Title | Type | Classification | Proposed New Location | Notes |
|----|---------|--------------|------|---------------|----------------------|-------|
| G01 | `vmission.org.in/forthcoming-programs/` | Forthcoming Programs | programs | MIGRATE | `/events` or `/learn` | Current programs need verification |
| G02 | `vmission.org.in/earlier-programs/` | Earlier Programs (archive) | archive | ARCHIVE | `/events/archive` | Historical programs |
| G03 | `vmission.org.in/kinds-of-activities/` | Kinds of Activities | page | MIGRATE | `/about` or `/learn` | Describes program types |
| G04 | `vmission.org.in/ashram/gita_course` | Gita Course (Ashram) | course | VERIFY | `/learn` | Raw slug in menu — UNKNOWN page status |
| G05 | WhatsApp message (live) | Residential Meditation Camp 2026 (26–29 July) | event | VERIFY | `/events` | Specific current event — client must confirm |
| G06 | WhatsApp message (live) | Online Vedanta & Gita Classes | course | VERIFY | `/learn` | VERIFY registration/schedule details |
| G07 | Donate page text | 3-Year Residential Course for Students (Gurukula) | course | MIGRATE | `/learn` | Mentioned in donation page — "totally free, full-time" |

---

### Section H — Events

| ID | Content Title | Type | Classification | Notes |
|----|--------------|------|---------------|-------|
| H01 | Forthcoming Programs page | upcoming events | MIGRATE | Needs current content from client |
| H02 | Earlier Programs archive | past events archive | ARCHIVE | Historical — accessible but not primary navigation |
| H03 | Albums (photos) | photo gallery | MIGRATE | `/events/albums` or separate gallery section — VERIFY |
| H04 | Guru Poornima celebration | recurring event | MIGRATE | WhatsApp confirms ongoing — include in events |
| H05 | Maha Shivratri | recurring event | MIGRATE | Mentioned in donation for section |
| H06 | Shri Krishna Janmastami | recurring event | MIGRATE | Mentioned in donation for section |
| H07 | Deepawali | recurring event | MIGRATE | Mentioned in donation for section |

---

### Section I — Ashram Information

| ID | Old URL | Content Title | Classification | Proposed New Location | Notes |
|----|---------|--------------|---------------|----------------------|-------|
| I01 | `vmission.org.in/ashram/` | Ashram Overview | MIGRATE | `/ashram` | Main ashram page |
| I02 | `vmission.org.in/introduction/` | Ashram Introduction | MERGE | `/ashram` (sub-section) | Merge into main ashram page |
| I03 | `vmission.org.in/ashram_parivar/` | Ashram Parivar (Family/Community) | MIGRATE | `/ashram` or `/about` | VERIFY content scope |
| I04 | `vmission.org.in/activities/` | Ashram Activities | MIGRATE | `/ashram` or `/about` | VERIFY page content |
| I05 | `vmission.org.in/facilities/` | Ashram Facilities | MIGRATE | `/ashram` (facilities section) | Physical facilities listing |
| I06 | `vmission.org.in/directions/` | Directions to Ashram | MIGRATE | `/ashram` (directions section) or `/contact` | Physical address + map |
| I07 | (from donate page) | Physical Address | contact info | KEEP | `/contact` + `/ashram` | **Verified:** Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009, MP, India |

---

### Section J — Organizational Information

| ID | Old URL | Content Title | Classification | Proposed New Location | Notes |
|----|---------|--------------|---------------|----------------------|-------|
| J01 | `vmission.org.in/vision/` | Vision / About Org | MIGRATE | `/about` | Mission and vision |
| J02 | `vmission.org.in/our-trusts/` | Our Trusts | MIGRATE | `/about` (trusts section) | VERIFY current trust registration details |
| J03 | `vmission.org.in/vpst-at-indore/` | VPST @ Indore | MIGRATE | `/about` (trusts section) | Vedanta Parmarthik Sewa Trust |
| J04 | `vmission.org.in/icf-at-mumbai/` | ICF @ Mumbai | VERIFY | `/about` (trusts section) | Indian Culture Foundation — VERIFY current status |
| J05 | `vmission.org.in/centers/` | Centers | VERIFY | `/about` | UNKNOWN — may list regional centers |
| J06 | `vmission.org.in/org/` | Org Overview | MERGE | `/about` | Redundant with J01/J02 |
| J07 | (from homepage header) | Tagline | KEEP | All pages | "Spreading 'Love & Light' by revealing the basic oneness of all" |

---

### Section K — Donation Information

**Source: Verified from live `/donate/` page**

| ID | Content Item | Classification | Proposed New Location | Notes |
|----|-------------|---------------|----------------------|-------|
| K01 | Bank Account: Vedanta Parmarthik Sewa Trust | MIGRATE | `/donate` | **VERIFY WITH CLIENT before publishing** |
| K02 | Account Number: 02811000003766 | MIGRATE | `/donate` | CLIENT VERIFY — sensitive financial info |
| K03 | IFSC: HDFC0001771 | MIGRATE | `/donate` | CLIENT VERIFY |
| K04 | Bank: HDFC Bank, Annapoorna Road Branch, Indore-452009 | MIGRATE | `/donate` | CLIENT VERIFY |
| K05 | UPI — VPS Trust: `vedantaparmarthicsew.65038308@hdfcbank` | MIGRATE | `/donate` | CLIENT VERIFY |
| K06 | UPI — Swami Atmanandaji: `swatma@upi` | MIGRATE | `/donate` | CLIENT VERIFY |
| K07 | UPI — Swamini Amitanandaji: `swamita@upi` | MIGRATE | `/donate` | CLIENT VERIFY |
| K08 | UPI — Swamini Samatanandaji: `swsamata@upi` | MIGRATE | `/donate` | CLIENT VERIFY |
| K09 | UPI — Swamini Poornanandaji: `swpoorna@okhdfcbank` | MIGRATE | `/donate` | CLIENT VERIFY |
| K10 | PayPal: `paypal.me/swatma` | MIGRATE | `/donate` | CLIENT VERIFY |
| K11 | Donation by NEFT, UPI, eWallet (PayTm), Cheque, PayPal, WesternUnion, Telegraphic/Wire | MIGRATE | `/donate` | 7 donation methods documented |
| K12 | For Foreign Donations A/C: Swami Atmananda Saraswati, A/C: 0281100004040 | MIGRATE | `/donate` | CLIENT VERIFY |
| K13 | Swift Code: HDFCINBB, BIC: HDFCINBBXXX, MICR: 452240003 | MIGRATE | `/donate` | CLIENT VERIFY |
| K14 | Donation For: Pooja & Abhisheka, Bhiksha, Student support | MIGRATE | `/donate` | Multiple donation purpose categories |
| K15 | Ashram Occasions for Donations (Guru Poornima, Shivratri, Janmastami, etc.) | MIGRATE | `/donate` | CLIENT VERIFY |
| K16 | 80-G status / Tax exemption info | VERIFY | `/donate` | NOT FOUND in audit — NEEDS CLIENT VERIFICATION |

---

### Section L — Contact Information

**Source: Verified from live `/contact-us/` page**

| ID | Content Item | Classification | Proposed New Location | Notes |
|----|-------------|---------------|----------------------|-------|
| L01 | Email: vmission@gmail.com | MIGRATE | `/contact` | CLIENT VERIFY — still active? |
| L02 | WhatsApp: +91 98269 59480 | MIGRATE | `/contact` | CLIENT VERIFY |
| L03 | WhatsApp (Donate contact): 7000361938 | MIGRATE | `/donate` | Different number for donations |
| L04 | Postal Address: Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009, MP, India | MIGRATE | `/contact` + `/ashram` | CLIENT VERIFY |
| L05 | Contact Form (CF7) | MIGRATE | `/contact` | Replace with Next.js form implementation |
| L06 | Phone: +91-9826959480 | MIGRATE | `/contact` | CLIENT VERIFY |

---

### Section M — Broken / Malformed Links

| ID | URL | Problem | Action |
|----|-----|---------|--------|
| M01 | `http://Sub` | Malformed URL — Subscribe link | REMOVE — replace with proper email list subscription |
| M02 | `http://sub/` | Same as above (alternate form) | REMOVE |
| M03 | `http://www.vmission.org.in/blog` | HTTP (not HTTPS), blog path status UNKNOWN | VERIFY |
| M04 | `vmission.org.in/ashram/gita_course` | Raw slug in nav menu — page exists? UNKNOWN | VERIFY |
| M05 | `http://u.pc.cd/*` (multiple pCloud short links) | Short URL dependency — link rot risk | VERIFY all pCloud URLs remain active |
| M06 | `http://acrosoftwts.com/` (developer credit) | External developer site | REMOVE from new site |
| M07 | Various `.htm` paths (legacy) | Legacy HTM pages — many confirmed 404 | REMOVE — do not link |

---

### Section N — Duplicate Content

| Duplicates | Problem | Recommendation |
|-----------|---------|---------------|
| "Gita Chanting" & "Chanting & Bhajans" in Audio menu | Both link to same URL (`/chanting/`) | MERGE into single "Chanting & Bhajans" entry |
| "Parivar" appears as top-level nav AND under Ashram sub-menu | Duplicate nav entry | MERGE — single entry under Ashram |
| "Introduction" (`/introduction/`) vs Ashram main page | Duplicate Ashram intro | MERGE into `/ashram` |
| "Org" page vs multiple About sub-pages | Redundant org overview | MERGE into single `/about` section |
| VPST donation page vs main donate page | Overlapping content | MERGE into `/donate` with trust info |
| Blog (`/blog`) vs other content | Blog appears orphaned/external | VERIFY current blog status |

---

### Section O — External Resource Status

| Resource | URL | Status | Notes |
|----------|-----|--------|-------|
| Google Drive (e-books) | `drive.google.com/file/d/...` | WORKING (multiple verified) | Dependency on Google Drive access |
| Box.com (audio) | `app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll` | UNKNOWN | VERIFY |
| Archive.org (e-books) | `archive.org/download/...` | WORKING (multiple verified) | Stable long-term host |
| pCloud (e-books) | `u.pc.cd/...` or `u.pcloud.link/...` | UNKNOWN | Short link rot risk — VERIFY |
| pubhtml5 Flipbook | `online.pubhtml5.com/iidh/...` | UNKNOWN | VERIFY |
| PayPal | `paypal.me/swatma` | UNKNOWN | CLIENT VERIFY |
| YouTube (videos) | UNKNOWN channel | UNKNOWN | YouTube channel URL not found in source — CLIENT VERIFY |
| WhatsApp Button | `+91 7000361938` | WORKING | Active in live site |

---

## Classification Summary

### KEEP
- Organization tagline: "Spreading 'Love & Light' by revealing the basic oneness of all"
- Physical address (verified from source)
- WhatsApp contact numbers (verify current)

### MIGRATE (HIGH PRIORITY)
- All 4 Acharya biographies (with client verification of content)
- All audio teaching categories (11 categories → `/teachings`)
- All e-books (Vedanta Articles 1-6 + Sanskrit texts) → `/publications`
- Vedanta Sandesh issues → `/publications`
- Vedanta Piyush issues → `/publications`
- Donation information (bank/UPI details — with client verification)
- Ashram information (Introduction, Facilities, Directions)
- Contact information
- Forthcoming Programs → `/events`
- Org Vision/About → `/about`
- Trust information (VPST + ICF) → `/about`

### MIGRATE (MEDIUM PRIORITY)
- Videos → `/teachings`
- Ashram Activities → `/ashram`
- Ashram Parivar → `/ashram` or `/about`
- Kinds of Activities → `/learn` or `/about`
- Photo Albums → `/events` or gallery

### ARCHIVE
- Earlier Programs (historical event archive)
- Old news posts (if any)

### MERGE
- Gita Chanting + Chanting & Bhajans → single teaching category
- Parivar (duplicate nav) → single entry
- Ashram Introduction + Ashram main → single page
- Org Overview + About → single `/about`

### REMOVE
- `http://Sub` malformed subscribe link
- Legacy `.htm` links (confirmed 404)
- Developer credit link (acrosoft)

### VERIFY
- Blog (`/blog`) — current status
- 80-G / tax exemption status
- YouTube channel URL
- ICF @ Mumbai — current operational status
- Gita Course page (`/ashram/gita_course`)
- All pCloud short URLs
- Box.com audio links
- Centers page content
- Vishnu Sahasranaam sub-page (vs standalone e-book)
- Pravachan Text page content
- General PDF page content

---

## Proposed New Information Architecture

```
HOME (/)
ABOUT (/about)
  ├── Mission & Vision
  ├── Acharyas (/acharyas → /acharyas/[id])
  └── Trusts & Organization
ASHRAM (/ashram)
  ├── About the Ashram
  ├── Facilities
  ├── Daily Life / Activities
  └── Directions & Visit
LEARN (/learn)
  ├── Courses & Programs (/learn/[id])
  ├── Residential Programs
  └── Online Classes
TEACHINGS (/teachings)
  ├── Audio Library → categories: Bhagavad Gita, Upanishads, Prakarana Granth,
  │                               Meditation, Chanting & Bhajans, Devotional,
  │                               Inspiring Stories, Drig Drushya Viveka
  ├── Video Library
  └── Browse / Search by Acharya or Category
PUBLICATIONS (/publications)
  ├── Vedanta Sandesh (monthly)
  ├── Vedanta Piyush (monthly)
  ├── E-Books (Vedanta Articles series)
  └── Study Texts (Sanskrit root texts + commentaries)
EVENTS (/events)
  ├── Forthcoming Programs
  ├── Recurring Celebrations
  └── Earlier Programs (archive)
DONATE (/donate)
  └── Donation methods (NEFT, UPI, Cheque, PayPal, WesternUnion, eWallet)
CONTACT (/contact)
```

**NOTE:** This is a preliminary proposed architecture for client review. Final IA to be confirmed in Phase 2.

---

## Migration Matrix

| Old Content | Current Problem | Action | New Location | Priority | Client Approval |
|-------------|----------------|--------|-------------|----------|----------------|
| Acharya bios (4) | Sample data in prototype | MIGRATE + CLIENT VERIFY bios | `/acharyas/[id]` | HIGH | YES |
| Audio teachings (11 categories) | Not linked to real audio | MIGRATE + map to real hosts | `/teachings` | HIGH | YES (permissions) |
| E-Books (Vedanta Articles 1-6) | Not in prototype | MIGRATE + verify hosts | `/publications` | HIGH | YES |
| Sanskrit study texts (D08-D15) | Not in prototype | MIGRATE + verify hosts | `/publications` | HIGH | YES |
| Vedanta Sandesh issues | Not in prototype | MIGRATE | `/publications` | HIGH | YES |
| Vedanta Piyush issues | Not in prototype | MIGRATE | `/publications` | HIGH | YES |
| Donation bank details | Not verified in prototype | MIGRATE + CLIENT VERIFY | `/donate` | HIGH | YES — financial info |
| Physical address / Contact | Prototype has placeholder | MIGRATE | `/contact` | HIGH | YES |
| Ashram Facilities / Directions | Prototype incomplete | MIGRATE | `/ashram` | HIGH | NO |
| Forthcoming Programs | Sample events in prototype | REPLACE with real events | `/events` | HIGH | YES |
| Blog content | Status unknown | VERIFY | TBD | MEDIUM | YES |
| Videos | Not linked to real YouTube | MIGRATE | `/teachings` | MEDIUM | YES |
| Ashram Parivar | Not in prototype | MIGRATE | `/ashram` | MEDIUM | NO |
| Org Trusts detail | Not in prototype | MIGRATE | `/about` | MEDIUM | YES — trust info |
| Subscribe system | Broken (`http://Sub`) | REPLACE with proper email list | Footer/Contact | MEDIUM | YES |
| Gita Chanting duplicate | Duplicate nav entry | MERGE | `/teachings` | LOW | NO |
| Photo Albums | Not in prototype | MIGRATE | `/events` | LOW | YES |
| Blog posts | Unknown status | VERIFY then ARCHIVE or MIGRATE | TBD | LOW | YES |

---

## Risks

1. **External hosting dependency** — Publications and audio rely on pCloud, Google Drive, Box.com, Archive.org. Each is a single point of failure. Short pCloud URLs are especially vulnerable to link rot.
2. **Financial information accuracy** — Bank account numbers, UPI IDs, and IFSC codes must be 100% verified by client before publishing.
3. **Acharya biography accuracy** — Prototype bios are sample data; real biographical content requires client sign-off.
4. **Audio permissions** — All audio content assumed to be Vedanta Mission's own; verify before new distribution platform.
5. **YouTube channel link unknown** — Video content location not captured; requires client to provide.
6. **Broken subscribe system** — No functional email newsletter system exists (malformed URL in old site).
7. **80-G / tax information missing** — Donation page on old site does not explicitly mention 80-G exemption status; this is legally important for donors.
8. **Event data is stale** — All events in the prototype are sample data; forthcoming programs must be obtained from client.
9. **Parivar/Activities pages** — Content not inspected in this audit (browser required for rendered content).
10. **ICF Mumbai operational status** — Unknown whether Indian Culture Foundation is still active.
11. **Blog status** — Blog link uses HTTP and status is unknown; may be deprecated.
12. **Multiple audio plugins on old site** — Migration to a single clean audio system will require re-structuring audio content.

---

## Client Verification Required

> The following items MUST be verified with the client/organization before any migration or publication.

- [ ] All Acharya biographical content
- [ ] Bank account numbers (A/C: 02811000003766 and 0281100004040)
- [ ] IFSC code (HDFC0001771)
- [ ] All UPI IDs (5 IDs for Trust and 4 Acharyas)
- [ ] Swift/BIC codes for foreign donations
- [ ] PayPal link (`paypal.me/swatma`)
- [ ] All WhatsApp contact numbers (+91 98269 59480 and 7000361938)
- [ ] Email address (vmission@gmail.com — still active?)
- [ ] 80-G / tax exemption certificate status
- [ ] YouTube channel URL
- [ ] Current forthcoming programs and dates
- [ ] Residential Meditation Camp 2026 (26–29 July) — confirmed?
- [ ] Online Vedanta & Gita Classes — registration details
- [ ] Blog status (active / deprecated)
- [ ] ICF @ Mumbai — still operational?
- [ ] Centers page — how many centers, current details
- [ ] Trust registration details (VPST)
- [ ] Audio content permissions for new platform distribution
- [ ] Publication rights for all e-books
- [ ] Approved organization logo for new branding
- [ ] Approved brand colors and typography

---

*This document is a READ-ONLY planning artifact created during Phase 1 of the V-Mission redesign project.*
*No website modifications have been made.*
*Next step: Client review of this inventory → Phase 2 Migration Matrix Review → Navigation Proposal → Controlled Implementation*
