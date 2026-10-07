# PHASE 3B.1 — CONTENT TRACEABILITY MATRIX
## Core Institutional Pages: About, Acharyas, Founder Detail & Ashram
**Phase:** 3B.1 — Core Institutional Pages Implementation  
**Date:** 7 September 2026  
**Status:** AUTHORITATIVE TRACEABILITY BASELINE  
**Governing Rule:** EVERY PARAGRAPH, METADATA FIELD, AND ASSET MUST TRACE TO A VERIFIED INVENTORY ID  

---

## 1. Overview & Verification Protocol

This traceability matrix maps every page section, editorial narrative, photographic asset, institutional record, and contact pathway implemented in Phase 3B.1 directly back to:
- `docs/migration/PHASE-3B0-MASTER-CONTENT-INVENTORY.md`
- `docs/migration/PHASE-3B0-VERIFICATION-REGISTER.md`
- `docs/migration/PHASE-3B0-DUPLICATE-REGISTER.md`

### Verification Tiers:
1. **SOURCE-VERIFIED:** Information supported by verified canonical records, legal documentation, live HTML source extracts, or physical photographic evidence.
2. **PENDING VERIFICATION:** Information requiring explicit, written client confirmation. These items are strictly accompanied by a dignified "under compilation" status and are NEVER presented as fabricated fact.
3. **CONFLICT / VERIFY:** Conflicting records are explicitly surfaced or preserved without silent resolution.

---

## 2. Content Traceability Matrix

### 2.1 Route: `/about` (About Vedanta Mission)

| Page | Section | Source Inventory ID | Content Description / Source Entity | Content Status | Verification State | Implemented Location & Component |
|---|---|---|---|:---:|:---:|---|
| `/about` | **01 — Hero / Who We Are** | `CNT-002`, `CNT-009` | Organizational introduction, 1992 founding by Poojya Guruji, Advaita Vedanta focus, sacred tagline "Spreading 'Love & Light'". | Canonical | **SOURCE-VERIFIED** | `src/app/about/page.tsx` — `<section className={styles.hero}>` |
| `/about` | **02 — Vision & Mission** | `CNT-003`, `CNT-009` | Timeless vision of Jiva-Ishwara-Jagat non-difference, elimination of spiritual confusion through systematic Pramana. | Merged | **SOURCE-VERIFIED** | `src/app/about/page.tsx` — `<section id="vision">` |
| `/about` | **03 — The Vedantic Tradition** | `CNT-004`, `CNT-087` | Shankaracharya Sampradaya, Prasthana Traya (Gita, Upanishads, Brahma Sutra), Guru-Shishya Parampara, Bhashya methodology. | Canonical | **SOURCE-VERIFIED** | `src/app/about/page.tsx` — `<section id="tradition">` |
| `/about` | **04 — Chronology & Milestones** | `CNT-013`, `CNT-118` | 1983 Brahmacharya, 1987 Sanyas, 1992 Mission Founding, 1995 Indore Ashram Gurukula establishment. | Canonical | **SOURCE-VERIFIED** | `src/app/about/page.tsx` — `<section id="milestones">` |
| `/about` | **05 — Trusts & Governance** | `CNT-005`, `CNT-006`, `CNT-118`, `CNT-119`, `CNT-120` | Vedanta Parmarthic Sewa Trust (Indore MP), Ishwara Charitable Trust (Mumbai MH), Ancient Indian Culture Trust (Pending). | Merged | **SOURCE-VERIFIED** (VPST/ICT) / **PENDING** (AICT) / **CONFLICT** (ICF) | `src/app/about/page.tsx` — `<section id="trusts">` |
| `/about` | **06 — Centres & Satsangs** | `CNT-008` | Regional study circles; verified headquarters at Indore Ashram; regional satsangs noted as under compilation without fake list. | Gated | **PENDING VERIFICATION** (No fabricated city list) | `src/app/about/page.tsx` — `<section id="centers">` |
| `/about` | **07 — How the Mission Serves** | `CNT-087`, `CNT-111` | Four sacred pillars: Traditional Pravachan, Free Literature Distribution, Ashram Residential Sadhana, Daily Annakshetra. | Canonical | **SOURCE-VERIFIED** | `src/app/about/page.tsx` — `<section id="service">` |

---

### 2.2 Route: `/acharyas` (Acharya Directory)

| Page | Section | Source Inventory ID | Content Description / Source Entity | Content Status | Verification State | Implemented Location & Component |
|---|---|---|---|:---:|:---:|---|
| `/acharyas` | **Hero / Roster Introduction** | `CNT-012` | Living tradition of teaching, consecrated role of the Acharya in unfolding scriptural Pramana. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/page.tsx` — `<section className={styles.hero}>` |
| `/acharyas` | **Founder Feature Card** | `CNT-013`, `CNT-122` | Poojya Swami Atmananda Saraswati, Founder & Head Acharya, riverside master portrait, key milestone summary. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/page.tsx` — `<div className={styles.founderFeature}>` |
| `/acharyas` | **Resident Acharyas Grid** | `CNT-014`, `CNT-015`, `CNT-016`, `CNT-125`, `CNT-126`, `CNT-127` | Swamini Amitananda Saraswati, Swamini Poornananda Saraswati, Swamini Samatananda Saraswati. | Canonical | **SOURCE-VERIFIED** (Roles & Names) / **PENDING** (Detailed bios) | `src/app/acharyas/page.tsx` — `<div className={styles.residentGrid}>` |
| `/acharyas` | **Parampara Statement** | `CNT-012`, `CNT-142` | Vande Guru Paramparam, Shankara lineage context, traditional transmission. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/page.tsx` — `<section className={styles.parampara}>` |

---

### 2.3 Route: `/acharyas/swami-atmananda-saraswati` (Founder Biography Detail)

| Page | Section | Source Inventory ID | Content Description / Source Entity | Content Status | Verification State | Implemented Location & Component |
|---|---|---|---|:---:|:---:|---|
| `/acharyas/swami-atmananda-saraswati` | **Hero & Master Portrait** | `CNT-013`, `CNT-122` | Canonical high-resolution portrait `guruji-portrait-riverside.jpg` (706×466), full honorifics, role, sacred lineage. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Hero Section |
| `/acharyas/swami-atmananda-saraswati` | **Life Milestones Timeline** | `CNT-013` | Verified Chronology: 1983 (Brahmacharya at Sandeepany), 1987 (Sanyas Deeksha), 1992 (Vedanta Mission), 1995 (Indore Gurukula). | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Milestone Timeline |
| `/acharyas/swami-atmananda-saraswati` | **Spiritual Dedication Narrative** | `CNT-013` | Dissemination of Advaita Vedanta through Gita, Upanishads, Brahma Sutras, and Prakarana Granths; monthly Sandesh e-zine. | Canonical | **SOURCE-VERIFIED** (No unverified family/early history) | `src/app/acharyas/[slug]/page.tsx` — Spiritual Narrative |
| `/acharyas/swami-atmananda-saraswati` | **Teaching Specializations** | `CNT-013`, `CNT-026`, `CNT-027` | Bhagavad Gita, Principal Upanishads, Drig Drushya Viveka, Atma-bodha, Brahma Sutras. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Core Teachings Badges |
| `/acharyas/swami-atmananda-saraswati` | **Related Authentic Teachings** | `CNT-026`, `CNT-027`, `CNT-029` | Verified discourse links (Gita, Drig Drushya, Atma-bodha). | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Teaching Cards |

---

### 2.4 Routes: `/acharyas/swamini-*` (Resident Acharyas Detail)

| Page | Section | Source Inventory ID | Content Description / Source Entity | Content Status | Verification State | Implemented Location & Component |
|---|---|---|---|:---:|:---:|---|
| `/acharyas/swamini-amitananda-saraswati` | **Hero & Portrait** | `CNT-014`, `CNT-125` | Portrait `swamini-amitananda.jpg` in dignified frame, honorific Swamini Amitanandaji, role Senior Acharya. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Hero |
| `/acharyas/swamini-amitananda-saraswati` | **Verified Summary & Archival Note** | `CNT-014` | Canonical service summary; explicit note that comprehensive biographical chronology is being compiled with Ashram office. | Gated | **SOURCE-VERIFIED** summary + **PENDING** archival note | `src/app/acharyas/[slug]/page.tsx` — Bio Section |
| `/acharyas/swamini-poornananda-saraswati` | **Hero & Portrait** | `CNT-015`, `CNT-126` | Portrait `swamini-poornananda.jpg`, honorific Swamini Poornanandaji, role Resident Acharya. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Hero |
| `/acharyas/swamini-poornananda-saraswati` | **Verified Summary & Archival Note** | `CNT-015` | Canonical service summary; explicit note that comprehensive biographical chronology is being compiled with Ashram office. | Gated | **SOURCE-VERIFIED** summary + **PENDING** archival note | `src/app/acharyas/[slug]/page.tsx` — Bio Section |
| `/acharyas/swamini-samatananda-saraswati` | **Hero & Portrait** | `CNT-016`, `CNT-127` | Portrait `swamini-samatananda.jpg`, honorific Swamini Samatanandaji, role Resident Acharya, Sanskrit scholar. | Canonical | **SOURCE-VERIFIED** | `src/app/acharyas/[slug]/page.tsx` — Hero |
| `/acharyas/swamini-samatananda-saraswati` | **Verified Summary & Archival Note** | `CNT-016` | Canonical service summary; explicit note that comprehensive biographical chronology is being compiled with Ashram office. | Gated | **SOURCE-VERIFIED** summary + **PENDING** archival note | `src/app/acharyas/[slug]/page.tsx` — Bio Section |

---

### 2.5 Route: `/ashram` (Consolidated Physical Ashram Experience)

| Page | Section | Source Inventory ID | Content Description / Source Entity | Content Status | Verification State | Implemented Location & Component |
|---|---|---|---|:---:|:---:|---|
| `/ashram` | **01 — Welcome & Overview** | `CNT-017`, `CNT-018`, `CNT-129` | Entrance hero, street-level facade with Gangeshwar Mahadev dome, Gurukula sanctuary overview. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 1 |
| `/ashram` | **02 — Sri Gangeshwar Mahadev Mandir** | `CNT-130`, `CNT-131`, `CNT-132`, `CNT-135`, `CNT-136` | Consecrated white Shivling dome, carved sanctum doors with Nandi, murti, morning aarti and daily worship. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 2 |
| `/ashram` | **03 — Life of the Gurukula** | `CNT-021`, `CNT-133`, `CNT-134` | Discourse hall, courtyard, tradition of contemplative study, living with the teacher. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 3 |
| `/ashram` | **04 — Daily Spiritual Rhythm** | `CNT-021`, `CNT-135` | Descriptive narrative of dawn meditation, morning puja, discourse, bhiksha, evening aarti, silence (operational timings gated). | Merged | **SOURCE-VERIFIED** (Spiritual Flow) / **PENDING** (Exact operational rules) | `src/app/ashram/page.tsx` — Section 4 |
| `/ashram` | **05 — Ashram Parivar** | `CNT-019`, `CNT-020`, `CNT-128` | Monastic community, resident Swaminis, sadhaks, seekers, spiritual kinship. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 5 |
| `/ashram` | **06 — Facilities & Accommodation** | `CNT-022`, `CNT-133` | Simple kutirs, scriptural library, discourse hall, dining space (annakshetra); note on guest guidelines. | Merged | **SOURCE-VERIFIED** (Facilities) / **PENDING** (Booking rules) | `src/app/ashram/page.tsx` — Section 6 |
| `/ashram` | **07 — Visiting & Travel Directions** | `CNT-023`, `CNT-024` | Air (Devi Ahilyabai Holkar Airport), Rail (Indore Junction), Road transit to Sudama Nagar; verified physical postal address. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 7 |
| `/ashram` | **08 — Pilgrimage & Inquiry Pathway** | `CNT-112`, `CNT-114`, `CNT-115` | Contact channel links to `/contact` for planning an ashram stay. | Merged | **SOURCE-VERIFIED** | `src/app/ashram/page.tsx` — Section 8 |
