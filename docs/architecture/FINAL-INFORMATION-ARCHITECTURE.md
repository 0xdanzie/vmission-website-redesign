# FINAL INFORMATION ARCHITECTURE
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2B — Final Information Architecture + Navigation Proposal (Hardened in Phase 2B.5)  
**Date:** 2026-09-04  
**Status:** VALIDATED ARCHITECTURAL BASELINE — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Builds on Phase 1 (`CURRENT-IMPLEMENTATION-MAP.md`, `CONTENT-MIGRATION-MASTER.md`, `CONTENT-MIGRATION-SUMMARY.md`) and Phase 2A (`MIGRATION-DECISION-MATRIX.md`, `CONTENT-GAP-AUDIT.md`, `CLIENT-VERIFICATION-MATRIX.md`, `PHASE-2A-OPEN-QUESTIONS.md`, `PHASE-2A-SUMMARY.md`).

---

## 1. Architectural Principles & Foundation

The legacy Vedanta Mission website (`vmission.org.in`) exhibited navigational fragmentation, duplicate menu entries, outdated abbreviations (e.g., "Progs", "Pdf"), orphaned content pages, broken URLs, and external links displayed as internal sub-pages.

Phase 2B establishes an information architecture built upon four core architectural principles:

1. **Library-First Architecture for Large Collections:** Teachings (Audio & Video) and Publications (Sandesh, Piyush, E-Books, Study Texts) are transformed from deep, rigid navigation trees into searchable, filterable content libraries. Users find discourse by subject, scripture, or Acharya rather than digging through multi-level menus.
2. **Consolidated Hubs for Place & Organization:** The physical Ashram experience (`/ashram`) and the organizational mission (`/about`) are consolidated into cohesive, narrative-driven hubs rather than sprawling across fragmented WordPress sub-pages.
3. **Evidence-Based Navigation:** Primary navigation status is awarded exclusively to sections with substantial content volume and distinct visitor intent. Speculative or unverified sections (such as an unverified blog or unconfirmed standalone courses) are nested, deferred, or phased.
4. **Frictionless Support & Direct Contact:** Direct contact touchpoints (phone, official email, messaging) and donation pathways are clearly positioned without compromising the contemplative spiritual tone of the site.

---

## 2. Final Proposed Sitemap

> [!NOTE]
> Specific sub-sections (e.g., facilities lists, daily schedules) represent **PROPOSED ARCHITECTURAL STRUCTURES** and are subject to client verification of current on-ground operations.

```text
VEDANTA MISSION PLATFORM
│
├── HOME (/)
│   ├── Cinematic Entrance / Virtual Ashram Gate
│   ├── Hero & Mission Statement
│   ├── Daily Darshan / Satsang Thought (Proposed feature)
│   ├── Core Pillars Overview (Satsang, Swadhyaya, Seva)
│   ├── Featured Teachings (Audio/Video highlights)
│   ├── Featured Publications (Latest confirmed Vedanta Sandesh issue)
│   ├── Upcoming Events & Shivirs Teaser
│   └── Ashram Glimpse & Invitation
│
├── ABOUT (/about)
│   ├── Vision & Mission (#vision)
│   ├── Teaching Lineage & Philosophy (Advaita Vedanta Tradition)
│   ├── Acharyas Overview (/acharyas)
│   │   ├── Poojya Guruji Swami Atmanandaji (/acharyas/swami-atmanandaji) [Client bio verification required]
│   │   ├── Swamini Amitanandaji (/acharyas/swamini-amitanandaji) [Client bio verification required]
│   │   ├── Swamini Poornanandaji (/acharyas/swamini-poornanandaji) [Client bio verification required]
│   │   └── Swamini Samatanandaji (/acharyas/swamini-samatanandaji) [Client bio verification required]
│   ├── Trusts & Legal Governance (#trusts)
│   │   ├── Vedanta Parayan Samiti Trust (VPST) [Client verification of registration details]
│   │   └── Indore Cancer Foundation / Associated Charities [Client confirmation of active relationship]
│   └── Affiliated Centers & Satsang Kendras (#centers — [NEEDS CLIENT CONFIRMATION])
│
├── ASHRAM (/ashram)
│   ├── About Vedanta Ashram, Indore (#about)
│   ├── Ashram Life & Daily Routine (#routine — [PROPOSED STRUCTURE / NEEDS VERIFICATION])
│   ├── Facilities & Infrastructure (#facilities — [PROPOSED STRUCTURE / NEEDS VERIFICATION])
│   │   ├── Satsang / Pravachan Space
│   │   ├── Library / Study Area
│   │   ├── Guest Accommodations / Kutirs
│   │   └── Dining Facility
│   ├── Ashram Parivar (#parivar — monastic & residential community overview)
│   └── Visit & Pilgrimage (#visit)
│       ├── Location & Map
│       ├── Travel Directions (Air, Rail, Road)
│       └── Plan a Visit / Guest Guidelines (Inquiry Form — [RULES NEED VERIFICATION])
│
├── TEACHINGS (/teachings)
│   ├── Unified Media Library (Audio + Video)
│   ├── Type Filtering (All | Audio Discourses | Video Pravachans)
│   ├── Canonical Category Taxonomy:
│   │   ├── Bhagavad Gita
│   │   ├── Upanishads
│   │   ├── Prakarana Granth (Atmabodha, Tattva Bodha, etc.)
│   │   ├── Meditation (Dhyana)
│   │   ├── Chanting & Bhajans
│   │   ├── Devotional (Hanuman Chalisa, Sundarkand)
│   │   └── Inspiring Stories
│   ├── Acharya / Speaker Filter
│   ├── Language Filter (Hindi, English, Sanskrit)
│   ├── Keyword & Scripture Search
│   └── Teaching Detail & Player Experience (/teachings/[id])
│       ├── Persistent Sticky Audio Player / Embedded YouTube Video
│       ├── Scripture Verse Reference & Syllabus Notes (Proposed)
│       └── Related Discourses & Archival Downloads
│
├── PUBLICATIONS (/publications)
│   ├── Unified Publication Repository
│   ├── Category Tabs:
│   │   ├── Vedanta Sandesh (Monthly English E-Zine Archive)
│   │   ├── Vedanta Piyush (Monthly Hindi E-Zine Archive)
│   │   ├── E-Books & Monograms (Verified works by Pujya Guruji & Ashram)
│   │   └── Study & Chant Texts (Sanskrit Texts, Stotras & Pravachan Notes)
│   ├── Filter by Year (Confirmed issues cataloged in Phase 2C)
│   ├── Filter by Language (Hindi, English, Sanskrit)
│   ├── Search Publications by Title / Subject
│   ├── Newsletter Subscription Card (Replaces legacy broken subscribe link)
│   └── Publication Detail Modal / Reader (/publications/[id])
│       ├── In-Browser Digital Reader (Interactive Flipbook / PDF viewer)
│       └── Multi-Mirror Download Links (Archive.org, Google Drive, Box, pCloud)
│
├── EVENTS (/events)
│   ├── Upcoming Programs & Retreats (Gita Shivirs, Sadhana Camps — [CURRENT DATES NEED CLIENT INPUT])
│   ├── Recurring Daily/Weekly Schedule ([NEEDS CLIENT CONFIRMATION])
│   ├── Earlier Programs Archive (Past Shivirs & Historical Events)
│   ├── Photo & Media Gallery of Past Programs
│   └── Event Detail & Registration (/events/[id])
│
├── LEARN (/learn) — *ARCHITECTURAL RECOMMENDATION: SCOPED PRIMARY / CONDITIONAL*
│   ├── Structured Vedanta Learning Tracks (Self-guided study using Teachings)
│   ├── Residential Programs / Gurukula Concept ([DETAILS NEED CLIENT VERIFICATION])
│   └── Course Detail & Inquiry (/learn/[id])
│
├── DONATE (/donate) — *ARCHITECTURAL RECOMMENDATION: PERSISTENT CTA + ROUTE*
│   ├── Purpose of Seva (Ashram Maintenance, Annakshetra, Publications)
│   ├── Donation Methods (Domestic & International)
│   ├── Bank Wire & RTGS/NEFT Details ([GATED: STRICT CLIENT SIGN-OFF REQUIRED])
│   ├── UPI QR Code & Official Handles ([GATED: STRICT CLIENT SIGN-OFF REQUIRED])
│   ├── Tax Exemption Status (80-G Guidelines — [GATED: CLIENT CONFIRMATION REQUIRED])
│   └── Donation Confirmation / Receipt Request Form
│
├── CONTACT (/contact)
│   ├── Ashram Address & Geo-coordinates
│   ├── Official Telephones & WhatsApp Desks ([NEEDS CLIENT VERIFICATION])
│   ├── Official Contact Email ([NEEDS CLIENT VERIFICATION])
│   ├── General Inquiry & Feedback Form
│   └── Newsletter Subscription Module
│
└── UTILITY & SYSTEM
    ├── Admin Management Portal (/admin — protected prototype route)
    ├── Privacy Policy & Terms of Service
    └── 301 Permanent Redirect Specification (Mapped in OLD-TO-NEW-ROUTE-MAPPING.md)
```

---

## 3. Navigation Decision Table

| Proposed Item | Primary Nav? | Target Route | Content Volume | Architectural Nature | Primary Reason | Major Dependency |
|---|:---:|---|---|---|---|---|
| **About** | **YES** | `/about` | Substantial | Consolidated Hub | Essential foundation of organizational identity, philosophy, and lineage. | Final client verification of mission text & trust legal names. |
| **Acharyas** | **NESTED** | `/acharyas` (under About) | 4 Profiles | Dedicated Sub-Hub | Highly critical identity content, but conceptually belongs under lineage/leadership. | Client must supply verified biography text and portraits. |
| **Ashram** | **YES** | `/ashram` | Substantial | Consolidated Single-Page Hub | The physical spiritual center; high user intent for pilgrimage and directions. | Photography and facility verification from Ashram. |
| **Teachings** | **YES** | `/teachings` | High | Searchable / Filterable Library | Core mission offering. Audio categories and confirmed video playlists unified. | Phase 2C media URL cataloging and Archive.org link verification. |
| **Publications** | **YES** | `/publications` | High | Searchable / Filterable Library | High recurring value; confirmed archives of Sandesh, Piyush, E-Books, and texts. | Phase 2C complete issue inventory. |
| **Events** | **YES** | `/events` | Moderate | Calendar / Archive | Essential for community participation, annual festivals, and shivirs. | Current 2026 calendar confirmation from Ashram office. |
| **Learn** | **CONDITIONAL** | `/learn` | Low to Moderate | Course Catalog | High conceptual value for seekers, but currently thin on verified structured course data. | Client confirmation of whether formal ongoing courses exist beyond events. |
| **Donate** | **HYBRID** | `/donate` | Moderate | Action CTA + Page | Vital for non-profit sustenance; requires visibility without crowding editorial nav. | Client sign-off on bank details, UPI handles, and 80-G status. |
| **Contact** | **YES** | `/contact` | Moderate | Utility Page + Action | Direct lifeline for seekers, pilgrims, and donors. | Verification of official email, landline, and WhatsApp numbers. |
| **Blog** | **NO** | Deferred | Unverified | Blog / News | Unverified on live site; old blog status is unresolved. | Client confirmation on whether an active blog exists. |

---

## 4. Evaluation of Primary Navigation Candidates

### 1. About
- **Why it deserves primary navigation:** Introduces the vision of Vedanta Mission, the Advaita tradition, legal trust governance, and the Acharya lineage.
- **Content under it:** Mission & Vision, Philosophy, Acharyas overview link, Trusts (VPST, ICF), and Centers.
- **Nature:** Section hub with scroll targets and linked sub-pages (`/acharyas`).
- **Mobile treatment:** Top-level drawer link with expandable sub-links for Acharyas and Trusts.

### 2. Ashram
- **Why it deserves primary navigation:** Vedanta Ashram in Indore is the physical anchor of the mission. Pilgrims, visitors, and retreatants look specifically for ashram life, facilities, and visit guidelines.
- **Content under it:** Ashram Overview, Routine (proposed), Facilities (proposed), Directions & Travel Map, Visitor Guidelines.
- **Nature:** Rich single-page experience with sticky anchor navigation.
- **Mobile treatment:** Direct link in drawer; quick jumps to "Visit" and "Facilities".

### 3. Teachings
- **Why it deserves primary navigation:** Spiritual teachings are the primary reason online seekers visit the platform.
- **Content under it:** Recorded audio series across 7 canonical categories and confirmed video playlists.
- **Nature:** Dynamic media library with multi-faceted filtering, persistent player dock, and individual discourse views.
- **Mobile treatment:** Direct link to library; filter drawer opens on mobile for touch-friendly facet selection.

### 4. Publications
- **Why it deserves primary navigation:** Houses the literary output of the mission, including monthly periodicals (*Vedanta Sandesh*, *Vedanta Piyush*), books, and scriptural chanting texts.
- **Content under it:** E-Zine archives, verified E-Books, Sanskrit texts, PDF reader, and newsletter subscription.
- **Nature:** Digital repository with year/type filtering and direct PDF downloads.
- **Mobile treatment:** Direct link; responsive grid displaying publication cards with download triggers.

### 5. Events
- **Why it deserves primary navigation:** Keeps the community informed about forthcoming shivirs, festival celebrations, and past event archives.
- **Content under it:** Upcoming events calendar, recurring schedule, earlier event archive, and photo albums.
- **Nature:** Calendar and card feed with detail views.
- **Mobile treatment:** Direct link; chronologically sorted feed.

---

## 5. The "Learn" Section Decision (ARCHITECTURAL RECOMMENDATION)

### Context & Status
The prototype codebase includes a `/learn` route with sample courses. The live WordPress audit revealed mentions of a **Gurukula concept, online Vedanta/Gita classes, and residential meditation camps**, but no formal online learning management system.

### Recommendation (Option D — Scoped Primary Item)
Retain `/learn` in the proposed architecture as a **scoped primary item**, focusing strictly on:
1. **Guided Self-Study Tracks:** Curriculum sequences linking directly to the `/teachings` audio/video library (e.g., "Beginner's Path to Advaita Vedanta").
2. **Residential Study & Gurukula Programs:** Information on long-term residential study at the Ashram.
3. **Class Inquiries:** Contact pathways for participating in ongoing online or local Gita study circles.

> [!WARNING]
> **Client confirmation is required** to verify whether formal ongoing enrollments exist. If none exist, `/learn` should serve as a study guide rather than an empty course-registration portal.

---

## 6. The "Donate" Decision (ARCHITECTURAL RECOMMENDATION)

### Recommendation: Hybrid CTA Button + Dedicated Route
- **Desktop Header:** Positioned on the far right as an elegant action button.
- **Labeling:** Proposed as `Donate / Seva` or `Donate` (exact terminology subject to client preference).
- **Security & Verification Gate:** The financial details on `/donate` (Bank Account, IFSC, UPI VPAs, 80-G status) are **strictly gated** and must NOT be populated with unverified data until signed off by the Ashram trust.

---

## 7. The "Contact" Decision

### Recommendation: Primary Action + Persistent Access
- **Header Placement:** Secondary text link or action button alongside Donate.
- **Page Experience (`/contact`):** Includes physical address, interactive map, direct WhatsApp link, official telephone numbers, official email, and structured inquiry form.
- **Verification Gate:** All specific telephone numbers, email addresses, and WhatsApp desks must be client-verified.

---

## 8. Ashram Information Architecture (PROPOSED STRUCTURE)

The proposed `/ashram` page consolidates 6 legacy sub-pages into a single narrative:
1. **Ashram Introduction:** Overview of Vedanta Ashram on the serene outskirts of Indore, MP.
2. **Daily Routine & Ashram Life (`#routine`):** *[Proposed structure — actual daily schedule must be confirmed with Ashram office]*
3. **Facilities & Accommodations (`#facilities`):** *[Proposed structure — actual room types, hall capacities, and dining arrangements must be verified]*
4. **Ashram Parivar (`#parivar`):** Overview of resident monastic community and sevaks.
5. **Visit, Directions & Guidelines (`#visit`):** Geographical location, transit routes (Devi Ahilyabai Holkar Airport, Indore Junction, road access), and visitor inquiry form.

---

## 9. About Information Architecture

All organizational, administrative, and philosophical identity content is unified under `/about`:
1. **Vision & Mission:** Based on verified organizational motto: "Spreading Love & Light by revealing the basic oneness of all".
2. **Advaita Vedanta Tradition:** Lineage of Adi Shankaracharya.
3. **Acharyas Overview:** High-level summary linking to `/acharyas`.
4. **Trusts & Governance (`#trusts`):** Vedanta Parayan Samiti Trust (VPST) and associated charitable initiatives.
5. **Satsang Centers (`#centers`):** *[Subject to client verification of active branch locations]*

---

## 10. Events vs. Learn Relationship

| Dimension | Events (`/events`) | Learn (`/learn`) |
|---|---|---|
| **Nature of Activity** | **Time-bound, Calendar-driven** | **Curriculum-driven, Ongoing** |
| **Examples** | Forthcoming Gita Jayanti Shibir, Annual Guru Purnima. | Guided Vedanta study syllabus, residential Gurukula program. |
| **Primary Interaction** | "View Schedule", "Register for Camp". | "Explore Syllabus", "Study Discourses in Sequence". |
| **Data Source** | `src/data/events.ts` | `src/data/courses.ts` / `teachings.ts` |

---

## 11. Blog & Announcements Decision

* **Legacy Status:** The old site featured an orphaned "Blog" nav item with unresolved status.
* **Architecture Decision:** **Exclude Blog from Primary Navigation.** News and announcements will be featured on the Homepage and Events feed. Formal written articles belong in *Vedanta Sandesh* or *Vedanta Piyush* under `/publications`.

---

## 12. Newsletter & Subscribe Decision

* **Legacy Problem:** The old site's subscribe link pointed to a broken URL (`http://Sub`).
* **Architecture Decision:** Replace with an integrated **Newsletter Subscription Component** positioned in the Global Footer and on the `/publications` page. (Email provider integration is a Phase 3 dependency).

---

## 13. Search Architecture

1. **In-Library Faceted Search (Phase 2C/3 Priority):** Filter and search by keyword, scripture, topic, and speaker directly inside `/teachings` and `/publications`.
2. **Global Search Modal (Phased):** Universal header search modal indexing across all sections once content migration is complete.

---

## 14. Illustrative User Journeys

> [!NOTE]
> Discourse titles, issue months, and event names below are **ILLUSTRATIVE EXAMPLES** demonstrating user flow, not migrated production records.

* **Journey 1: Seeker Finding an Audio Discourse:** Home → Teachings → Filter by "Bhagavad Gita" → Select discourse → Persistent docked audio player starts.
* **Journey 2: Devotee Reading Latest E-Zine:** Home → Publications → Vedanta Sandesh tab → Read online flipbook or direct PDF download.
* **Journey 3: Visitor Learning About an Acharya:** Home → About → Our Acharyas → View biography card → Detail profile.
* **Journey 4: Pilgrim Visiting the Ashram:** Home → Ashram → Scroll to `#visit` → Review directions & transit routes → Submit visit inquiry.
* **Journey 5: Patron Making a Seva Offering:** Home → Click "Donate / Seva" → Review verified causes → Complete transfer via verified bank wire or UPI QR.
* **Journey 6: Attending a Shibir:** Home → Events → Upcoming Programs → Select Shibir card → Review details & registration instructions.

---

## 15. Client-Dependent Decisions

1. **Learn Navigation Scope:** Confirm whether ongoing structured courses/admissions exist or if study is primarily self-guided and shivir-based.
2. **Donate Button Nomenclature:** Confirm preferred wording (`Donate / Seva` vs. `Donate` vs. `Seva Offering`).
3. **Official Trust Names & Registration:** Supply exact legal entities for receipt issuance and tax exemption disclosures.
4. **Blog Confirmation:** Confirm whether any active blog content exists that needs preservation.
5. **Verified Contact Details:** Provide official Ashram telephone numbers, WhatsApp desk contact, and general inquiries email.
