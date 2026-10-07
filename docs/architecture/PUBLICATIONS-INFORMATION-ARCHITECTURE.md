# PUBLICATIONS INFORMATION ARCHITECTURE
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2B — Final Information Architecture + Navigation Proposal (Hardened in Phase 2B.5)  
**Date:** 2026-09-04  
**Status:** VALIDATED ARCHITECTURAL BASELINE — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Builds on Phase 1 publications inventory and Phase 2A decision matrix (Section D).

---

## 1. Executive Summary & Core Architectural Shift

The legacy website managed publications through a fragmented "Pdf" navigation menu with six disjointed sub-items:
- `/e-books/`
- `/vedanta-sandesh-ezine/`
- `/vedanta-piyush-ezine/`
- `/vishnu-sahasranaam/`
- `/pravachan-text/`
- `/general-pdf/`
- `/subscribe/` (broken `http://Sub` link)

**Phase 2B unifies all literary, scriptural, and periodical assets into a single digital Publications Repository (`/publications`).**

Users can seamlessly toggle between monthly e-zines, original books, and sacred Sanskrit chanting texts in one consistent interface.

---

## 2. Conceptual Hierarchy & Repository Model

```text
PUBLICATIONS REPOSITORY (/publications)
│
├── 1. Primary Classification Tabs
│   ├── Vedanta Sandesh (Monthly English E-Zine)
│   ├── Vedanta Piyush (Monthly Hindi E-Zine)
│   ├── E-Books & Monograms (Books by Pujya Guruji & Swaminijis)
│   └── Study & Chant Texts (Sanskrit Texts, Stotras & Pravachan Notes)
│
├── 2. Faceted Archive Browsing
│   ├── Filter by Year (Confirmed issues cataloged in Phase 2C)
│   ├── Filter by Language (English, Hindi, Sanskrit)
│   ├── Search by Title / Subject
│   └── Sort by (Latest First | Title A-Z)
│
├── 3. Newsletter Subscription Banner
│   └── "Receive Vedanta Sandesh on the 1st of every month directly in your inbox"
│
└── 4. Publication Detail & Reading Experience (/publications/[id] or Modal)
    ├── Cover Art & Metadata (Issue #, Month/Year, Author)
    ├── Summary / Contents
    ├── In-Browser Digital Reader (PDF / Flipbook preview)
    └── Multi-Mirror Download Links (Archive.org, Google Drive, Box, pCloud)
```

---

## 3. Four Core Publication Facets

### 3.1 Vedanta Sandesh (English Monthly E-Zine)
* **Description:** The monthly English electronic magazine of Vedanta Mission, containing editorials, scriptural commentaries, ashram updates, and spiritual articles.
* **Archive Scope:**
  - *Confirmed Inventoried Issues (Phase 2A):* 2026 (Jan, Feb, Mar) and 2025 (Jul, Aug, Sep, Oct, Nov, Dec).
  - *Full Scope:* Prior years exist on external mirrors; complete inventory to be established in Phase 2C.
* **Storage Mirrors:** Multi-mirror distribution confirmed in source (Archive.org Flip, Archive.org PDF, Google Drive, Box.com, pubhtml5 flipbook, pCloud).

### 3.2 Vedanta Piyush (Hindi Monthly E-Zine)
* **Description:** The Hindi sister publication delivering Upanishadic wisdom and satsang summaries for Hindi-speaking devotees.
* **Archive Scope:** *[Inventory of individual issues to be cataloged in Phase 2C]*

### 3.3 E-Books & Monograms (Verified Inventory)
* **Description:** Books and treatise collections authored by Pujya Guruji and Ashram Acharyas.
* **Confirmed Catalog (Directly from Phase 1 Audit):**
  - *Vedanta Articles — Volume 6*
  - *Vedanta Articles — Volume 4*
  - *Vedanta Articles — Volume 3*
  - *Vedanta Articles — Volume 2*
  - *Vedanta Articles — Volume 1*
  - *Articles on Gita (English)*
  - *Email Excerpts (Pujya Guruji)*

### 3.4 Study & Chant Texts (Verified Inventory)
* **Description:** Sanskrit texts, Stotras, and study aids formatted for chanting and parayana.
* **Confirmed Catalog (Directly from Phase 1 Audit):**
  - *Shiva Mahimna Stotram (शिव महिम्न: स्तोत्रम्)*
  - *Katha Manjari (कथा मञ्जरी)*
  - *Shiva Upasana (शिव उपासना)*
  - *Vishnu Sahasranama Vyakhya (विष्णु सहस्रनाम व्याख्या)*
  - *Vairagya Sandipani (वैराग्य सन्दीपनी)*
  - *Sadhana Panchakam Mula Grantha (साधना पञ्चकम् मूल ग्रन्थ)*
  - *Tattvabodha Mula Grantha (तत्त्वबोध मूल ग्रन्थ)*
  - *Atmabodha Mula Grantha (आत्मबोध मूल ग्रन्थ)*
  - *Pravachan Text notes*

---

## 4. Multi-Mirror Storage & Delivery Model

V-Mission publications are hosted across multiple external platforms. Archive.org is recommended as the preferred primary mirror:

```text
[V-MISSION PUBLICATION RECORD]
            │
            ├── PREFERRED MIRROR: Archive.org (Stable, ad-free public archive)
            │      ├── Direct PDF Download Link
            │      └── In-browser Flipbook Embed
            │
            ├── BACKUP MIRROR 1: Google Drive (Ashram backup drive)
            │
            ├── BACKUP MIRROR 2: Box.com / pCloud
            │
            └── INTERACTIVE: pubhtml5 / In-browser PDF
```

---

## 5. In-Browser Reading vs. Download Experience

1. **"Read Online" (In-Browser):** Launches an interactive flipbook or lightweight PDF modal reader for quick reading without downloading.
2. **"Download PDF" (Local Save):** Direct download trigger fetching the PDF from the confirmed archival mirror.

---

## 6. Newsletter Subscription Architecture

The broken legacy link (`http://Sub`) is replaced with an on-page newsletter subscription module:

```text
+---------------------------------------------------------------------------------------------------------------+
|  📬 SUBSCRIBE TO VEDANTA SANDESH & VEDANTA PIYUSH                                                             |
|  Receive new monthly issues directly in your inbox on the 1st of every month.                                 |
|                                                                                                               |
|  [ Your Name                   ]  [ Your Email Address               ]  [ Subscribe Free ]                    |
|  🔒 Your privacy is respected. Zero spam. Unsubscribe anytime.                                                |
+---------------------------------------------------------------------------------------------------------------+
```

---

## 7. Metadata Schema Alignment (`src/data/publications.ts`)

| Schema Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique slug (e.g., `vedanta-sandesh-2026-03`) |
| `title` | `string` | Official publication title |
| `description` | `string` | Summary of lead topics |
| `type` | `'sandesh' \| 'piyush' \| 'ebook' \| 'study-text'` | Publication type |
| `issueNumber` | `string?` | Issue identifier |
| `month` | `string?` | Release month |
| `year` | `number` | Publication year |
| `language` | `'English' \| 'Hindi' \| 'Sanskrit'` | Primary language |
| `author` | `string?` | Author or editor |
| `coverImage` | `string` | Cover image URL |
| `downloadUrl` | `string` | Canonical direct download link |
| `readOnlineUrl` | `string?` | Flipbook or viewer embed link |
| `fileSize` | `string` | File size indicator |
| `featured` | `boolean` | Flag for homepage highlighting |

---

## 8. Migration Roadmap for Phase 2C
1. **Catalog Full Sandesh Archive:** Extract and verify download URLs for all confirmed issues.
2. **Catalog Piyush Archive:** Identify and verify download links for Hindi issues.
3. **Verify E-Book & Study Text URLs:** Verify that pCloud / GDrive / Archive.org URLs for D01–D15 remain active.
4. **Populate Production Registry:** Populate `src/data/publications.ts` with verified publication records.
