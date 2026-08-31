# Vedanta Mission — Website Redesign Proposal & Architecture Dossier

**Client:** Vedanta Parmarthic Sewa Trust · Vedanta Ashram, Indore  
**Project:** Next-Generation Digital Gurukula Redesign ("Ascending to the Dome")  
**Date:** August 2026  
**Document Version:** 1.0 (Final Submission)

---

## 1. Executive Summary

Vedanta Mission represents a sacred, traditional Gurukula dedicated to the authentic study of the Upanishads, Bhagavad Gita, and Brahma Sutras under the guidance of Poojya Swami Atmananda Saraswati. 

This proposal presents a comprehensive, high-fidelity digital transformation of the Vedanta Mission web presence. The redesign unifies traditional Vedic aesthetics with state-of-the-art web performance, transforming the website from a static informational brochure into an **immersive, living digital Ashram**.

---

## 2. Existing Website Baseline

The existing digital footprint of Vedanta Mission served as a repository of knowledge but lacked visual continuity, mobile responsiveness, and intuitive pathways for seekers to engage with the Ashram's rich scriptural archives, daily worship, and residential sadhana retreats.

---

## 3. Problems Identified (From Architecture Audit)

1. **Visual Disconnect & Generic Presentation:** Lack of architectural character reflecting the unique white Shivling dome of Sri Gangeshwar Mahadev Mandir.
2. **Fragmented Audio & Scriptural Access:** Seekers struggled to navigate the *Jnana Ganga* audio commentaries sequentially across scriptural chapters.
3. **Static Course Inquiries:** Prospective students lacked interactive syllabus previews and digital submission questionnaires for foundational texts like *Tattva Bodha*.
4. **Dispersed Periodical Archives:** Monthly issues of *Vedanta Sandesh* and *Vedanta Piyush* were difficult to read directly across mobile and desktop viewports.
5. **Absence of Real-Time Administrative Oversight:** Ashram administrators had no centralized interface to track seeker accommodation inquiries, event registrations, and direct donation UTR submissions.

---

## 4. Proposed Vision: The Digital Gurukula

The redesigned platform bridges sacred heritage and modern digital accessibility:
- **Atmospheric Reverence:** Warm terracotta, golden teakwood, sanctum ambient glows, and classical serif typography (*Fraunces*, *Cormorant Garamond*).
- **Zero Barrier Audio Immersion:** Persistent docking audio player supporting uninterrupted discourse listening across all page transitions.
- **Authentic Photographic Lineage:** 100% genuine Ashram photography showcasing Poojya Guruji, resident Swaminis, the consecration sanctum, and global satsangs.

---

## 5. Creative Concept: "Ascending to the Dome"

The centerpiece of the user arrival is a continuous, GPU-accelerated 3D spatial entrance experience:
- **Phase 1 — Arrival:** Full-bleed photograph of the Ashram facade with sacred Sanskrit Mahavakya and subtle camera drift.
- **Phase 2 — Ascending:** Camera pushes upward into the upper terrace and dome in 3D perspective.
- **Phase 3 — Sacred Threshold:** Perspective framing of the carved sanctum doors with warm golden glow.
- **Phase 4 — Parting of Doors:** 3D outward hinge rotation revealing the consecrated altar and light bloom.
- **Phase 5 — Seamless Reveal:** Dissolves seamlessly into the living homepage with zero dark wait states.

---

## 6. Homepage Architecture

- **Cinematic Architectural Hero:** Monumental backdrop of Sri Gangeshwar Mahadev Mandir with daily worship schedule (7:00 AM Abhishek, 6:30 PM Aarti).
- **Sanctum Darshan Spotlight:** Curated 4-card photography grid detailing the landmark Shivling dome, carved threshold, morning aarti, and silent contemplation stage.
- **Teaching Tradition Showcase:** Interactive sliding carousel highlighting classical Mahavakyas, Adi Shankaracharya lineage, and restored discourse archives.
- **Resident Acharyas & Study Programs:** Direct access to monks' biographies and structured courses.

---

## 7. Ashram Campus & Gangeshwar Mahadev Darshan (`/ashram`)

- Detailed architectural history of the Indore campus and the consecrated Shiva Linga dome sanctuary.
- High-resolution interactive photo gallery categorized by Sanctuary, Courtyard, and Teaching Hall.
- Visitor guidelines, sattwic meal schedule, and integrated **"Plan Your Visit" modal** for accommodation booking.

---

## 8. Teaching Tradition & Audio Discourses (`/teachings`)

- **Jnana Ganga Repository:** Structured audio lectures by Swami Atmananda Saraswati categorized by Shastra (Bhagavad Gita, Mandukya Upanishad, Vivekachudamani).
- Category and speaker search filtering.
- One-click streaming through the global floating **AudioPlayerDock**.

---

## 9. Resident Acharyas & Lineage (`/acharyas`)

- Dedicated profiles for:
  - **Poojya Swami Atmananda Saraswati** (Founder & Acharya)
  - **Swamini Amitananda Saraswati**
  - **Swamini Samatananda Saraswati**
  - **Swamini Poornananda Saraswati**
- Comprehensive spiritual biographies, lineage timelines (*Guru-Shishya Parampara*), and published works.

---

## 10. Courses & Structured Study (`/learn`, `/learn/tattva-bodha`)

- Hierarchical curricula from correspondence lessons to full-time residential Gurukula training.
- **Interactive Tattva Bodha Portal:** Lesson 1 text, student questionnaires, and full **Course Application Modal** with instant form validation and toast notification.

---

## 11. Events Calendar & Camps (`/events`)

- Dynamic listing of upcoming residential meditation camps, Gyana Yagnas, and festival celebrations (e.g. Guru Poornima).
- Dedicated event detail pages with schedule breakdowns, registration modal, and historical international discourse archives (Moscow Advaita Congress, Mumbai lectures).

---

## 12. Digital Publications & Ezines (`/publications`)

- Comprehensive catalog of monthly **Vedanta Sandesh** (English/Hindi) and **Vedanta Piyush** (Hindi/Gujarati).
- Interactive **Publication Modal Reader** allowing seekers to preview editorials, Gita commentaries, and download digital issues.

---

## 13. Seva & Dana Portal (`/donate`)

- Clear categorization of giving opportunities: *Daily Annadanam & Bhiksha*, *Student Sponsorship*, *Temple Upkeep*, and *Digital Outreach*.
- Direct Indian Banking (NEFT/RTGS), UPI QR integration, and **UTR Number Submission Form** for instant receipt generation tracking.

---

## 14. Contact & Seeker Support (`/contact`)

- Physical location details for Vedanta Ashram, Indore.
- Comprehensive inquiry routing: Ashram stay, course admission, and publication requests.

---

## 15. Staff / Administrative Portal (`/admin`)

A unified dashboard demonstrating prototype data synchronization:
- **Live Inquiries Management:** View, update status (*New*, *In Review*, *Resolved*), and filter submitted contact requests.
- **Donation Verification:** Audit incoming UTR numbers, amounts, and toggle 80-G receipt status (*Issued*, *Pending*).
- **Course & Event Management:** Add, update, and manage curricula and upcoming camp dates in real time.

---

## 16. Technical Implementation

- **Framework:** Next.js 14.2.15 (React 18.3.1, TypeScript 5.5.3).
- **Rendering:** Static Site Generation (`output: 'export'`) with instant routing and zero server latency.
- **Styling:** Custom CSS Modules with responsive Indian architectural design tokens.
- **Asset Integrity:** 23 authentic high-resolution photographs optimized for instant delivery without external stock reliance.
- **Quality Assurance:** 52 automated QA assertions validating 100% route rendering and image asset health.

---

## 17. Prototype Scope vs. Full Production

| Feature Area | Presentation Prototype (Current) | Full Production Roadmap |
|---|---|---|
| **Data Storage** | Reactive React Context + `localStorage` | PostgreSQL / MongoDB database with Prisma ORM |
| **Admin Access** | Open client-side dashboard | Role-Based Access Control (RBAC) via NextAuth / Supabase |
| **Content Publishing** | Structured TypeScript data models | Headless CMS (Sanity / Strapi) |
| **Donations** | Direct Bank / UPI + UTR tracker form | Automated Payment Gateway (Razorpay / Stripe) + PDF 80-G receipts |
| **Audio Streaming** | Client-side HTML5 audio streaming | Cloudflare Stream / AWS S3 audio CDN with timestamps |

---

## 18. Future Roadmap

1. **Phase 1 (Immediate):** Client walkthrough and feedback incorporation on visual branding and content tone.
2. **Phase 2 (Content Ingestion):** Bulk import of 500+ Jnana Ganga MP3 files and complete 20-year Vedanta Sandesh PDF library.
3. **Phase 3 (Payment & Auth Integration):** Connect verified trust bank accounts to Razorpay payment gateway.
4. **Phase 4 (Launch & DNS Cutover):** Deploy to production domain `vmission.org.in` with multi-region CDN caching.

---

## 19. Team & Project Roles

- **Creative Direction & UI Architecture:** Lead Designer & Concept Architect
- **Frontend & Systems Engineering:** Full-Stack Next.js / TypeScript Engineer
- **Quality Assurance & Verification:** Test Automation & Performance Specialist

---

## 20. Recommended Screenshot Plan for Final Client Proposal

| # | Screen | URL / Context | Highlights to Capture |
|---|---|---|---|
| 1 | **Immersive Entrance** | `/` (Arrival state) | Full-bleed facade, Sanskrit verse, "Begin Continuous Entrance" button |
| 2 | **Sanctum Door Threshold** | `/` (3D Entrance phase) | Carved wooden doors parting in 3D with radiant sanctum light bloom |
| 3 | **Cinematic Hero** | `/` (Homepage top) | Gangeshwar Mahadev Shivling dome backdrop, darshan card, ribbon highlights |
| 4 | **Mandir Spotlight Grid** | `/` (Homepage section) | Curated 4-card photography grid of the Shivling dome and sacred sanctum |
| 5 | **Ashram Campus & Darshan** | `/ashram` | Campus overview, temple darshan schedule, and interactive photo gallery |
| 6 | **Teaching Tradition & Audio** | `/teachings` | Audio discourse cards, category filter bar, and floating AudioPlayerDock |
| 7 | **Resident Acharyas** | `/acharyas` | Monk portraits and Guruji's spiritual biography |
| 8 | **Tattva Bodha Study Portal** | `/learn/tattva-bodha` | Lesson overview, student questionnaire, and interactive application modal |
| 9 | **Events & Sadhana Camps** | `/events` | Calendar grid, upcoming residential camp card, and past archive |
| 10 | **Digital Ezines Reader** | `/publications` | *Vedanta Sandesh* and *Vedanta Piyush* issue grid with modal reader preview |
| 11 | **Seva / Dana Portal** | `/donate` | Direct UPI QR code, bank transfer details, and UTR submission tracker |
| 12 | **Admin Dashboard** | `/admin` | Real-time inquiry manager, donation UTR verification, and course editor |
