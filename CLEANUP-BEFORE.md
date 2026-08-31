# V-MISSION — CLEANUP-BEFORE AUDIT & BASELINE REPORT
**Date:** August 29, 2026  
**Status:** Pre-Cleanup Checkpoint  
**Project:** Vedanta Mission / Vedanta Ashram, Indore Next.js 14 Redesign Prototype

---

## 1. Package Dependencies & Overrides Baseline

```json
{
  "name": "vedanta-mission-website",
  "version": "0.2.0",
  "private": true,
  "dependencies": {
    "next": "14.2.15",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.14.10",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.15",
    "typescript": "5.5.3"
  },
  "overrides": {
    "string.prototype.trim": "1.2.10"
  }
}
```

* Zero heavy 3D engine bloat (Three.js cleanly purged).
* ESLint `es-abstract/2025/ToString` resolution locked via `overrides`.

---

## 2. Full Route Inventory (26 Routes Verified)

### Public Experience
1. `/` — Cinematic Homepage + AshramAscent Spatial 3D Entrance
2. `/about` — Gurukula Mission, Lineage, and Philosophy
3. `/acharyas` — Resident Acharyas List & Parampara
4. `/acharyas/[slug]` — Individual Acharya Biography & Media
5. `/ashram` — Indore Ashram Campus, Mandir, Guidelines & Plan Visit
6. `/learn` — Systematic Vedantic Learning & Methodologies
7. `/learn/tattva-bodha` — Tattva Bodha Systematic Study Course
8. `/events` — Upcoming Satsangs, Camps & Retreats Calendar
9. `/events/[eventId]` — Detailed Event Registration & Schedule
10. `/teachings` — Jnana Ganga Audio & Discourse Library
11. `/publications` — Monthly Ezines (*Vedanta Sandesh* & *Vedanta Piyush*)
12. `/donate` — Seva Offerings & 80-G Tax Exemption Portal
13. `/contact` — Ashram Stay & Spiritual Inquiries Form

### Staff Operations & CMS Portal
14. `/admin` — Ashram Staff Operations Dashboard
15. `/admin/events` — Event & Camp Management
16. `/admin/courses` — Academic Course Administration
17. `/admin/teachings` — Audio Library & Media Publishing
18. `/admin/publications` — Ezine Issues & PDF Manager
19. `/admin/donations` — Seva Offerings & 80-G Certificate Queue
20. `/admin/contact` — Seeker & Stay Inquiries Queue
21. `/admin/news` — 307 Redirect to `/admin/publications`

---

## 3. Major Components Inventory (`src/components/`)

| Component | Status | Usage Context |
|---|---|---|
| `AshramAscent` (in `immersive/`) | USED | 3D Spatial Continuous Entrance Sequence (`/`) |
| `Navbar` | USED | Public Header Navigation & Mobile Trigger |
| `MobileDrawer` | USED | Mobile Slide-Out Navigation |
| `Footer` | USED | Public Footer with Trust & Lineage Meta |
| `BrandLogo` | USED | Header & Footer Authentic Om Emblem |
| `Button` | USED | Standardized Design System Buttons |
| `Badge` | USED | Status & Category Pill Badges |
| `SectionHeader` | USED | Curated Typography Section Intros |
| `AshramImage` | USED | Responsive Authentic Asset Renderer |
| `AshramGallery` | USED | Interactive Ashram Photo Gallery Modal |
| `AcharyaCard` | USED | 4:5 Dignified Portrait Acharya Cards |
| `CourseCard` | USED | Curricula & Study Program Cards |
| `EventCard` | USED | Event Calendar Tiles with Date Badges |
| `TeachingCard` | USED | Audio Lecture Cards with Inline Player Trigger |
| `PublicationCard` | USED | Ezine Cover Tiles with Download Triggers |
| `PublicationModal` | USED | Issue Preview Reader Modal |
| `PlanVisitModal` | USED | Ashram Stay & Visit Booking Modal |
| `CourseApplicationModal` | USED | Correspondence Course Admission Modal |
| `AudioPlayerDock` | USED | Persistent Global Bottom Audio Player |
| `ToastStack` | USED | Non-blocking Toast Notification Queue |
| `SearchBar` | USED | Real-Time Audio Library Search Filter |
| `FilterBar` | USED | Category & Topic Multi-Filter Pills |
| `TimelineItem` | USED | Historical & Daily Schedule Milestones |
| `EmptyState` | USED | Filter Zero-Result Fallbacks |
| `OrnamentalDivider` | UNUSED | Standalone SVG divider (0 active references) |

---

## 4. Image Asset Inventory (`public/images/vmission/`)

* **Hero (2 assets):** `ashram-facade-dome.jpg`, `ashram-facade-elevated.jpg`
* **Ashram (7 assets):** `sanctum-doors-threshold.jpg`, `gangeshwar-dome-closeup.jpg`, `sanctum-interior-stage.jpg`, `teaching-hall-interior.jpg`, `courtyard-with-guruji.jpg`, `facade-elevated-alt.jpg`, `acharya-community-portrait.jpg`
* **Worship (2 assets):** `morning-aarti.jpg`, `murti-closeup-garlanded.jpg`
* **Community (2 assets):** `satsang-with-acharya.jpg`, `residential-camp-gathering.jpg`
* **Acharyas (6 assets):** `guruji-portrait-riverside.jpg`, `guruji-teaching-closeup.jpg`, `guruji-portrait-cutout.jpg`, `swamini-amitananda.jpg`, `swamini-samatananda.jpg`, `swamini-poornananda.jpg`
* **Events (3 assets):** `advaita-congress-moscow.jpg`, `rotary-club-mumbai-talk.jpg`, `bandra-talk-2010.jpg`
* **Publications (5 assets):** `vedanta-sandesh-jan21.jpg`, `vedanta-sandesh-dec20.jpg`, `vedanta-sandesh-sep20.jpg`, `vedanta-sandesh-cover.svg`, `vedanta-piyush-cover.svg`
* **Graphics (4 fallback SVGs):** `ashram-library.svg`, `gangeshwar-mandir.svg`, `hero-fallback.svg`, `acharya-placeholder.svg`
* **Favicon:** `public/favicon.svg`

---

## 5. Configuration Files Baseline

* `package.json` & `package-lock.json`
* `tsconfig.json`
* `next.config.js`
* `.eslintrc.json`
* `.gitignore`

---

## 6. Scripts Baseline (`scripts/`)

* `scripts/test-final-qa.js` (QA test suite runner)
* `scripts/verify-all.js` (Endpoint verification runner)
* `scripts/audit-runner.js` (Audit runner)
* `scripts/test-acharyas.js` (Temporary test snippet — candidate for safe cleanup)
* `scripts/reorganize-assets.js` (One-time asset mover — candidate for safe cleanup)
