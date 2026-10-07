# PUBLICATIONS RESOURCE CATALOG (PLANNING INVENTORY)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** COMPLETE PLANNING CATALOG — NO APPLICATION CODE MODIFIED  
**Authoritative Basis:** Builds on Phase 1 (`CONTENT-MIGRATION-MASTER.md`), Phase 2A (`MIGRATION-DECISION-MATRIX.md`), and `PHASE-2-ARCHITECTURE-BASELINE.md`.

---

## 1. Cataloging Method & Status Model

All identifiable periodical, literary, and scriptural text resources from the legacy website (`vmission.org.in`) and Phase 1/2A audits are cataloged below within the **4 Approved Canonical Types**:
1. `sandesh`: Vedanta Sandesh (Monthly English E-Zine)
2. `piyush`: Vedanta Piyush (Monthly Hindi E-Zine)
3. `ebook`: E-Books & Monograms
4. `study-text`: Study & Chant Texts

### Status Definitions:
* **VERIFIED:** Issue/title, metadata, and multi-mirror download URLs confirmed from live source HTML.
* **NEEDS CLIENT VERIFICATION:** Resource identified, but editorial consent, rights, or official numbering requires sign-off.
* **NEEDS URL VERIFICATION:** Resource identified in legacy navigation, but exact download URLs require live scraping or verification.
* **EXTERNAL SOURCE:** File hosted on external storage (pCloud short link, Google Drive, Box.com, Archive.org).
* **DUPLICATE:** Redundant sub-page or duplicate text listing.

---

## 2. Summary of Publications Coverage

| Publication Type | Confirmed / Inventoried Resources | Un-inventoried / Missing Scope | Primary Mirror Platform | Overall Status |
|---|:---:|:---:|---|---|
| **Vedanta Sandesh** | 9 confirmed monthly issues (2026: Jan–Mar; 2025: Jul–Dec) | Jan–Jun 2025 + pre-2025 archives | Archive.org, GDrive, Box, pCloud, pubhtml5 | **VERIFIED (Subset)** / Archive pending |
| **Vedanta Piyush** | 1 series container (`/vedanta-piyush-ezine/`) | All individual monthly issues | Multi-mirror (inferred from Sandesh) | **NEEDS URL VERIFICATION** |
| **E-Books & Monograms** | 7 confirmed titles (Vedanta Articles 1–4, 6, Gita Articles, Email Excerpts) | Volume 5 gap investigation | GDrive, Box, Archive.org, pCloud | **VERIFIED (Titles & Hosts)** |
| **Study & Chant Texts** | 8 confirmed Sanskrit texts + 3 legacy sub-pages | Individual PDF text confirmation | pCloud short links (`u.pc.cd/...`) | **VERIFIED (Texts)** / pCloud link-rot risk |
| **TOTALS** | **25+ Confirmed Publications & Issues** | **Historical archives (Piyush & pre-2025 Sandesh)** | **Archive.org (Preferred Mirror)** | **Zero code modified** |

---

## 3. Section A — Vedanta Sandesh (Monthly English E-Zine)

### Archive Coverage Summary:
- **2026 Issues (Confirmed):** January 2026, February 2026, March 2026 (all with 6 mirrors confirmed active).
- **2025 Issues (Confirmed):** July 2025, August 2025, September 2025, October 2025, November 2025, December 2025.
- **2025 Issues (Unverified):** January through June 2025 (not captured in initial browser fetch).
- **Pre-2025 Issues:** Historical archive going back to site founding; complete cataloging to be executed in Phase 3.

| Issue ID | Month & Year | Title | Language | Editor / Lead Author | Confirmed Mirrors Available | Status | Migration Decision |
|---|---|---|---|---|---|---|---|
| `PUB-SAN-2026-03` | March 2026 | Vedanta Sandesh — March 2026 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2026-02` | February 2026 | Vedanta Sandesh — February 2026 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2026-01` | January 2026 | Vedanta Sandesh — January 2026 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-12` | December 2025 | Vedanta Sandesh — December 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-11` | November 2025 | Vedanta Sandesh — November 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-10` | October 2025 | Vedanta Sandesh — October 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-09` | September 2025 | Vedanta Sandesh — September 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-08` | August 2025 | Vedanta Sandesh — August 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-07` | July 2025 | Vedanta Sandesh — July 2025 | English | Swami Atmananda Saraswati | Archive.org Flip, GDrive, Box, Archive PDF, pubhtml5, pCloud | **VERIFIED** | **MIGRATE** |
| `PUB-SAN-2025-H1` | Jan–Jun 2025 | Vedanta Sandesh — Jan to Jun 2025 (6 Issues) | English | Swami Atmananda Saraswati | On old WP page; URLs not yet scraped | **NEEDS URL VERIFICATION** | **DEFER** |
| `PUB-SAN-EARLIER` | Pre-2025 | Vedanta Sandesh Historical Archive | English | Swami Atmananda Saraswati | Archive.org / GDrive mirrors | **NEEDS URL VERIFICATION** | **DEFER** |

---

## 4. Section B — Vedanta Piyush (Monthly Hindi E-Zine)

| Resource ID | Resource Title | Language | Legacy URL | Mirror Hosts | Status | Migration Decision | Notes |
|---|---|---|---|---|---|---|---|
| `PUB-PIY-CONTAINER` | Vedanta Piyush E-Zine Hub | Hindi / Sanskrit | `https://www.vmission.org.in/vedanta-piyush-ezine/` | Inferred multi-mirror | **NEEDS URL VERIFICATION** | **MIGRATE** | Hindi sister publication. Full issue-by-issue inventory must be extracted in Phase 3. |

---

## 5. Section C — E-Books & Monograms (Verified Inventory)

| Resource ID | Book Title | Language | Author | Source URL / Current Hosts | Status | Migration Decision | Notes & Rationale |
|---|---|---|---|---|---|---|---|
| `PUB-EBK-VA06` | Vedanta Articles — Volume 6 | English / Hindi | Swami Atmananda Saraswati | GDrive, Box, Archive.org, Flipbook, pCloud | **VERIFIED** | **MIGRATE** | Most recent volume in the flagship article series. High spiritual value. |
| `PUB-EBK-VA04` | Vedanta Articles — Volume 4 | English / Hindi | Swami Atmananda Saraswati | GDrive, Box, Archive.org, Flipbook, pCloud | **VERIFIED** | **MIGRATE** | Part of foundational series. |
| `PUB-EBK-VA03` | Vedanta Articles — Volume 3 | English / Hindi | Swami Atmananda Saraswati | GDrive, Box, Archive.org, Flipbook, pCloud | **VERIFIED** | **MIGRATE** | Part of foundational series. |
| `PUB-EBK-VA02` | Vedanta Articles — Volume 2 | English / Hindi | Swami Atmananda Saraswati | GDrive, Box, Archive.org, Flipbook, pCloud | **VERIFIED** | **MIGRATE** | Part of foundational series. |
| `PUB-EBK-VA01` | Vedanta Articles — Volume 1 | English / Hindi | Swami Atmananda Saraswati | GDrive, Box, Archive.org, Flipbook, pCloud | **VERIFIED** | **MIGRATE** | Earliest volume in the series. |
| `PUB-EBK-GITA` | Articles on Gita (English) | English | Swami Atmananda Saraswati | `https://u.pc.cd/QXHotalK` (pCloud) | **EXTERNAL SOURCE** | **MIGRATE** | Dedicated monograph on Gita philosophy. High utility for English speakers. |
| `PUB-EBK-MAIL` | Email Excerpts (Pujya Guruji) | English / Hindi | Swami Atmananda Saraswati | `https://u.pc.cd/ETH` (pCloud) | **NEEDS CLIENT VERIFICATION** | **DEFER** | Personal spiritual counsel excerpts. Requires explicit client consent before public distribution. |
| `PUB-EBK-VA05-GAP` | Vedanta Articles — Volume 5 | Unknown | Swami Atmananda Saraswati | Missing from legacy `/e-books/` listing | **MISSING METADATA** | **DEFER** | *Volume 5 Gap Investigation:* Skipped or misnamed on old site. Client confirmation required. |

---

## 6. Section D — Study & Chant Texts (Sanskrit & Stotras)

*All study texts on the legacy site were hosted on pCloud short links (`u.pc.cd/...`). Due to link rot risks associated with URL shorteners, these must be verified and preferably mirrored to Archive.org during Phase 3.*

| Resource ID | Text Title (Scriptural Name) | Language | Current Download URL | Host Platform | Status | Migration Decision | Notes & Rationale |
|---|---|---|---|---|---|---|---|
| `PUB-TXT-MAHI` | Shiva Mahimna Stotram (शिव महिम्न: स्तोत्रम्) | Sanskrit / Hindi | `https://u.pc.cd/UllitalK` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Classical hymn by Pushpadanta with commentary. |
| `PUB-TXT-KATH` | Katha Manjari (कथा मञ्जरी) | Sanskrit / Hindi | `https://u.pc.cd/lV9` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Spiritual narratives in simple Sanskrit with Hindi translation. |
| `PUB-TXT-SHIV` | Shiva Upasana (शिव उपासना) | Sanskrit / Hindi | `https://u.pc.cd/iVectalK` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Ritual and contemplative procedures for Shiva worship. |
| `PUB-TXT-VISH` | Vishnu Sahasranama Vyakhya (विष्णु सहस्रनाम व्याख्या) | Sanskrit / Hindi | `https://u.pc.cd/LS2rtalK` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Thousand names of Lord Vishnu with anvaya and commentary. |
| `PUB-TXT-VAIR` | Vairagya Sandipani (वैराग्य सन्दीपनी) | Sanskrit / Hindi | `https://u.pc.cd/ThcctalK` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Philosophical text on spiritual dispassion. |
| `PUB-TXT-SADH` | Sadhana Panchakam Mula Grantha (साधना पञ्चकम् मूल ग्रन्थ) | Sanskrit | `https://u.pc.cd/hcUrtalK` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Adi Shankaracharya's 40 spiritual precepts for seekers. |
| `PUB-TXT-TATT` | Tattvabodha Mula Grantha (तत्त्वबोध मूल ग्रन्थ) | Sanskrit | `https://u.pc.cd/bXF7` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Foundational Vedanta terminology text. |
| `PUB-TXT-ATMA` | Atmabodha Mula Grantha (आत्मबोध मूल ग्रन्थ) | Sanskrit | `https://u.pc.cd/fc4` | pCloud | **EXTERNAL SOURCE** | **MIGRATE** | Sanskrit root text. Cross-references audio series `AUD-PRAK-ATMA`. |
| `PUB-TXT-DUP-VISH` | Vishnu Sahasranaam (Legacy Sub-page) | Sanskrit | `https://vmission.org.in/vishnu-sahasranaam/` | Old Website | **DUPLICATE** | **MERGE INTO EXISTING RESOURCE** | Sub-page likely duplicating `PUB-TXT-VISH`. Inspect before final merge. |
| `PUB-TXT-PRAV` | Pravachan Text Notes | Hindi / Sanskrit | `https://vmission.org.in/pravachan-text/` | Old Website | **NEEDS URL VERIFICATION** | **MIGRATE** | Transcripts and study notes accompanying audio pravachans. |
| `PUB-TXT-GENPDF` | General PDF Archive | Mixed | `https://vmission.org.in/general-pdf/` | Old Website | **NEEDS URL VERIFICATION** | **MIGRATE** | Miscellaneous PDF documents. Scrape in Phase 3. |

---

## 7. Preferred Hosting Architecture & Link Preservation
- **Primary Canonical Mirror:** Archive.org is the confirmed preferred hosting source for all monthly e-zines and books.
- **pCloud Short Links Risk:** The 8 Sanskrit texts currently depend on pCloud short URLs (`u.pc.cd/*`). In Phase 3, these files should be downloaded, verified, and uploaded to the Ashram's Archive.org or Google Drive collection to ensure permanent availability.
