# Vedanta Mission — Next-Generation Website Redesign

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![QA Status](https://img.shields.io/badge/QA%20Assertions-52%2F52%20Passed-brightgreen?style=flat)](scripts/test-final-qa.js)

A high-fidelity interactive redesign prototype for **Vedanta Mission & Vedanta Ashram, Indore**, honoring traditional Advaita Vedanta and the vision of Poojya Swami Atmananda Saraswati.

---

## Live Demo

- **Production Deployment:** [https://vmission-website-redesign.vercel.app](https://vmission-website-redesign.vercel.app) *(or connect your Vercel project)*
- **Local Dev Server:** `http://localhost:3000`

---

## Creative Concept: "Ascending to the Dome"

The website introduces a continuous 3D spatial arrival sequence that transitions seekers from the physical Ashram courtyard into the sacred consecrated sanctum of Sri Gangeshwar Mahadev before revealing the living digital gurukula:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Real Ashram    │  ──►  │    Mandir Dome  │  ──►  │ Sacred Carved   │  ──►  │ Live Homepage   │
│  Courtyard      │       │    Aperture     │       │ Wooden Doors    │       │ Living Gurukula │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Arrival:** Full-bleed authentic photography of the Vedanta Ashram campus with subtle atmospheric camera drift and the sacred Sanskrit Mahavakya (*सत्यं ज्ञानमनन्तं ब्रह्म*).
2. **Ascending:** Continuous 3D upward camera push toward the upper terrace and dome.
3. **Threshold:** Spatial perspective alignment with the consecrated teakwood sanctum doors.
4. **Enter:** 3D parting of the carved doors with radiant warm sanctum glow and atmospheric light bloom.
5. **Living Gurukula:** Smooth dissolve into the architectural hero section and interactive scriptural repository.

*Instant accessibility is built-in: seekers can click "Skip to Homepage ✕", press the <kbd>ESC</kbd> key, or enable reduced motion at any time.*

---

## Key Features

- **Immersive Ashram Arrival:** High-performance GPU-accelerated CSS 3D entrance without heavy WebGL engine overhead.
- **Cinematic Homepage Hero:** Dominant architectural backdrop featuring Sri Gangeshwar Mahadev Shivling dome, daily darshan schedule, and lineage highlights.
- **100% Authentic V-Mission Imagery:** Curated repository of 23 authentic photographs spanning Guruji's discourses, Swaminis, sanctum worship, and sadhana camps.
- **Ashram Campus & Gangeshwar Mahadev Darshan:** Interactive photography gallery, campus facilities, daily Vedic puja timings, and accommodation booking modal.
- **Jnana Ganga Audio Discourses:** Built-in floating audio player dock with verse-by-verse scriptural commentaries by Swami Atmananda Saraswati.
- **Vedantic Learning Programs & Correspondence:** Structured curricula including *Tattva Bodha* correspondence course lessons, syllabus breakdown, and interactive application modal.
- **Events & Residential Sadhana Retreats:** Comprehensive event calendar, registration modal, and past international discourse archives.
- **Digital Ezines & Publications:** Complete digital reader for monthly *Vedanta Sandesh* and *Vedanta Piyush* periodicals with category filtering and modal reader.
- **Seva & Dana Offering Portal:** Dedicated direct donation portal supporting Annadanam, student sponsorship, and temple upkeep with UTR submission tracker.
- **Staff / Admin Prototype:** Fully reactive administrative dashboard demonstrating real-time data persistence (`localStorage`) for inquiries, event management, course admissions, and donation verification.

---

## Technology Stack

- **Framework:** Next.js 14.2.15 (App Router, Static Site Generation / SSG export ready)
- **UI & Logic:** React 18.3.1, TypeScript 5.5.3
- **Styling:** Vanilla CSS Modules with bespoke Indian architectural design tokens, serif typography, and 60fps GPU transforms
- **State Management:** Reactive React Contexts (`DataContext`, `AudioPlayerContext`, `ToastContext`) with client-side synchronization

---

## Getting Started Locally

### Prerequisites
- Node.js `>= 18.17.0`
- npm `>= 9.0.0`

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/<your-username>/vmission-website-redesign.git
cd vmission-website-redesign

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Quality Assurance & Verification

```bash
# Validate TypeScript types
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle (32 static pages)
npm run build

# Run automated 52-point presentation QA test suite
node scripts/test-final-qa.js 3000
```

---

## Prototype Scope & Production Roadmap

This project is a **high-fidelity interactive proposal and presentation prototype**. 

For final production deployment, the following standard enhancements would be integrated:
- **Backend & Database:** Persistent cloud database (PostgreSQL / MongoDB) replacing prototype `localStorage`.
- **Authentication:** Role-based authentication (NextAuth / Supabase) for the Admin portal.
- **Content Management System (CMS):** Headless CMS (Sanity / Strapi) for Ashram administrators to publish monthly ezines and discourses without code changes.
- **Payment Gateway:** Integration with Razorpay / Stripe for automated 80-G tax exemption receipts and instant donation processing.
- **Content Migration:** Ingestion of full multi-year archives of *Jnana Ganga* audio MP3s and PDF publications.
- **Production CDN & SEO:** Subresource integrity, OpenGraph metadata validation, and multi-region CDN caching.

---

## Team & Roles

| Name | Role | Responsibilities |
|---|---|---|
| *Team Member 1* | Lead UI/UX & Creative Direction | Visual identity, 3D entrance concept, Indian architectural tokens |
| *Team Member 2* | Full-Stack / Frontend Engineering | Next.js architecture, state management, component engineering |
| *Team Member 3* | Quality Assurance & Content Integration | Asset curation, test suite automation, documentation |

---

## License & Heritage

Developed with reverence for **Vedanta Parmarthic Sewa Trust & Vedanta Ashram, Indore**.  
All archival discourses, texts, and photographs are property of Vedanta Mission.
