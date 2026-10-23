# Vedanta Mission — Digital Ashram & Advaita Vedanta Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-2D4F38?style=flat&logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/Heritage-Vedanta%20Parmarthic%20Sewa%20Trust-C84E17?style=flat)](https://vmission.org.in)

The official web portal and scriptural knowledge repository for **Vedanta Mission & Vedanta Ashram, Indore**, dedicated to the authentic study and dissemination of Advaita Vedanta, the Principal Upanishads, the Bhagavad Gita, and the Brahma Sutras under the traditional Shankaracharya lineage and the guidance of **Poojya Swami Atmananda Saraswati**.

---

## Live Website

- **Production Portal:** [https://vmission-website-redesign.vercel.app/](https://vmission-website-redesign.vercel.app/)
- **Institutional Domain:** [https://vmission.org.in](https://vmission.org.in)

---

## About the Project

Founded in 1992, **Vedanta Mission** operates a traditional residential Gurukula—**Vedanta Ashram**—situated on the tranquil outskirts of Indore in Madhya Pradesh, India. The institution conducts systematic scriptural study programs, month-long residential camps, correspondence courses, and international Gyana Yagnas rooted in the classical *Guru-shishya parampara*.

This web portal serves as the digital sanctuary for seekers worldwide. It unifies decades of institutional assets—including full-length audio commentaries, monthly publications (*Vedanta Sandesh* and *Vedanta Piyush*), correspondence course curricula, retreat registrations, and Acharya discourses—within an architectural, contemplative digital interface that reflects the stillness of the Ashram.

---

## Experience & Design Philosophy

The website is designed around the concept of a **"Digital Ashram"**: a space of quietude, reverence, and intellectual clarity.

- **Contemplative Architecture:** Interfaces prioritize spacious margins, natural proportions, and generous whitespace over density, encouraging focused contemplation.
- **Editorial Typography:** Clear typographic hierarchies balance classical literary serifs with highly legible sans-serif utility typography.
- **Atmospheric Harmony:** Color palettes mirror the physical materials of the Ashram—terracotta Gerua robes, warm sandstone walls, consecrated ivory marble, and dark walnut woodwork.
- **Restrained Motion:** Motion is treated as an editorial tool rather than visual decoration, ensuring that navigation feels fluid, calm, and dignified.

---

## Visual Language

The design system is defined through centralized CSS custom properties in `src/app/globals.css`:

### Color Palette

| Token | Value | Role |
|---|---|---|
| `--vm-bhagwa` | `#E06328` | Sacred Bhagwa (Saffron); primary brand color & accents |
| `--vm-gerua` | `#C84E17` | Traditional Gerua; primary interactive buttons and key CTAs |
| `--vm-ochre` | `#A73C0E` | High-contrast deep ochre for emphasized headings on light backgrounds |
| `--vm-ivory` | `#FDFBF7` | Consecrated ivory; primary document canvas and page background |
| `--vm-sand` | `#FAF6EE` | Light sandstone tone for cards, dividers, and grouped surfaces |
| `--vm-bg-ashram` | `#F0E9DD` | Warm ashram sandstone utilized for badges and event containers |
| `--vm-walnut` | `#1E1916` | Deep walnut charcoal; primary text color and dark background tone |
| `--vm-walnut-surface` | `#28221E` | Contemplative elevated dark surface for footer and audio dock |
| `--vm-green` | `#2D4F38` | Forest leaf tone; reserved for status indicators and verified badges |

### Typography

The typography system employs three complementary font families served via Google Fonts:

1. **Cormorant Garamond** (`--font-display` / `--font-serif`): Classical serif typeface utilized for monumental headings, section titles, and chapter markers.
2. **Plus Jakarta Sans** (`--font-ui` / `--font-sans`): Clean, modern sans-serif utilized for body reading copy, navigation, interactive controls, and metadata.
3. **Noto Serif Devanagari** (`--font-sanskrit` / `--font-devanagari`): Traditional Devanagari serif typeface utilized for authentic Sanskrit mantras, shlokas, and scriptural invocations.

---

## Motion & Interaction Philosophy

The motion language is engineered to preserve natural browser behavior while delivering a subtle, premium feel:

- **Native Document Scrolling:** Vertical document scrolling remains completely native. The application strictly avoids scroll-jacking, wheel interception, forced snapping, or simulated inertia.
- **Progressive Section Entry:** Content sections enter the viewport with a gentle transform (`translateY(18px) → translateY(0)`) and opacity fade over 650ms using a refined editorial ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Stable Reverse Scrolling:** Once a section enters the viewport, it remains permanently revealed via `IntersectionObserver.unobserve()`. Elements never disappear or replay animations when the visitor scrolls back upward.
- **Subtle Micro-Depth:** Key architectural photographs (the Sri Gangeshwar Mahadev Shivling dome, Ashram teaching hall, and founder portraits) utilize hardware-accelerated transforms (`translate3d`) clamped to 4–6px on desktop and 2–3px on mobile.
- **Consecrated Entry Overlay:** An immersive arrival scene featuring the authentic Shivling of Sri Gangeshwar Mandir precedes the initial visit. It completes in under 1.70 seconds and immediately registers in `sessionStorage` (`vm-entry-scene-seen`) so returning visitors bypass it instantly. It can be triggered manually via `/?intro=1` or skipped via `/?intro=0`.
- **Page Transitions:** Navigating between routes activates a subtle ~300ms top hairline indicator, with the document scroll position reset smoothly to the top (`window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`).
- **Sticky Navigation Stability:** The global navbar observes a 20px scroll threshold, smoothly transitioning between a lighter glassmorphic state and a solid elevated state with no sudden layout recalculation.
- **Strict Reduced Motion:** When `prefers-reduced-motion: reduce` is enabled, all animations, transitions, scroll effects, and introductory overlays are immediately disabled.

---

## Core Visitor Experiences

### 1. Sacred Arrival & Heritage (`/`)
An architectural hero introduction presenting the core identity of Vedanta Mission, the consecrated Shivling of Sri Gangeshwar Mahadev, the line of Acharyas, and quick pathways to study materials.

### 2. Vedanta Ashram Campus (`/ashram`)
Comprehensive information regarding the physical Gurukula in Indore, including Sri Gangeshwar Mahadev Mandir, daily temple worship schedules, the discourse library, student accommodations, and visitor protocols.

### 3. Spiritual Lineage & Acharyas (`/acharyas`, `/acharyas/[slug]`)
Detailed biographical profiles and teaching backgrounds of the resident and visiting teachers:
- **Poojya Swami Atmananda Saraswati** (Founder & Acharya)
- **Swamini Amitananda Saraswati**
- **Swamini Samatananda Saraswati**
- **Swamini Poornananda Saraswati**

### 4. Jnana Ganga Teachings Library (`/teachings`, `/teachings/[id]`)
An indexed discourse repository containing hundreds of hours of scriptural commentaries covering:
- Major Upanishads (*Katha*, *Kena*, *Mundaka*, *Mandukya*, *Taittiriya*, *Chandogya*)
- The *Bhagavad Gita* (chapter-by-chapter detailed discourses)
- Classical Prakarana Granths (*Tattva Bodha*, *Atma Bodha*, *Vivekachudamani*, *Drig Drishya Viveka*)

### 5. Persistent Audio Player Dock
A persistent bottom player (`AudioPlayerDock`) driven by React Context that continues audio playback uninterrupted while visitors explore different pages, discourses, and study texts.

### 6. Publications & Periodical Archive (`/publications`, `/publications/[id]`)
A complete digital archive containing over 460 monthly magazine editions:
- ***Vedanta Sandesh***: Monthly bilingual (English & Hindi) spiritual e-magazine.
- ***Vedanta Piyush***: Gujarati & Hindi devotional and philosophical digest.
- E-Books, original Sanskrit commentaries, and downloadable study texts.

### 7. Gurukula Courses (`/learn`, `/learn/tattva-bodha`, `/learn/[id]`)
Structured study curriculum explorer including the flagship **Tattva Bodha Correspondence Course**, complete with syllabus outlines, reference literature, and online enrollment inquiry forms.

### 8. Events & Retreats Calendar (`/events`, `/events/[eventId]`)
Chronological listings of active, upcoming, and archival gatherings, including residential meditation camps, Navaratri Sadhana camps, Guru Poornima assemblies, and international lecture tours.

### 9. Seva & Contributions (`/donate`)
Transparent donation instructions supporting Ashram activities (Annadanam, Sadhu Seva, Mandir Seva, and student sponsorship). Provides direct NEFT, RTGS, and UPI banking coordinates alongside a Section 80-G tax exemption receipt generator.

### 10. Contact & Visit Planning (`/contact`)
Visitor guides, Ashram location map coordinates, transportation guidance from Indore Airport / Railway Station, and inquiry submission forms.

---

## Architecture & Technology Stack

The application is built on a modern, decoupled architecture designed for absolute performance, high security, and minimal operational maintenance.

### Technology Stack Table

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `14.2.15` | Application framework, routing, server components & API handlers |
| **Runtime & UI** | React | `18.3.1` | Component architecture and client hydration |
| **Language** | TypeScript | `5.5.3` | Type safety and reliable data contracts across all modules |
| **Styling** | CSS Modules | Native | Scoped, zero-runtime styling using native CSS custom properties |
| **Database & Auth** | Supabase PostgreSQL | `^2.118.0` | Relational database, Auth, RLS policies, and secure RPC functions |
| **SSR / Session** | `@supabase/ssr` | `^0.12.7` | Cookie-based session management in Server Components & Middleware |
| **State Management** | React Context | Native | Continuous audio playback, optimistic updates, and admin permissions |
| **Fonts** | Google Fonts | CDN | Cormorant Garamond, Plus Jakarta Sans, Noto Serif Devanagari |
| **Deployment** | Vercel / Node.js Runtime | Production | Next.js hosting with server middleware, edge caching, and SSL |

### Application Architecture

```
                    ┌───────────────────────────────┐
                    │      Next.js App Router       │
                    │   (Public & Admin Interfaces) │
                    └───────┬───────────────┬───────┘
                            │               │
             (Public Routes)│               │(Admin Routes & Auth)
                            ▼               ▼
            ┌─────────────────────┐   ┌─────────────────────────────┐
            │   Page Pre-render   │   │   Next.js Session Guard     │
            │   & Edge Caching    │   │     (src/middleware.ts)     │
            └─────────┬───────────┘   └──────────────┬──────────────┘
                      │                              │
                      ▼                              ▼
            ┌───────────────────────────────────────────────┐
            │               State Layer                     │
            │           (src/context/DataContext)           │
            └───────┬───────────────────────────────┬───────┘
                    │                               │
     (Read / Write) │                               │ (Fallback Offline)
                    ▼                               ▼
    ┌─────────────────────────────┐   ┌─────────────────────────────┐
    │     Supabase PostgreSQL     │   │      Canonical Datasets     │
    │  Row-Level Security & RPCs  │   │  (src/data/*.ts contracts)  │
    └─────────────────────────────┘   └─────────────────────────────┘
```

1. **Hybrid Rendering & Performance:** Public scriptural discourses, periodicals, retreat schedules, and curriculum pages benefit from Next.js caching and static optimization, while administrative record management and payment verification interact directly with Supabase PostgreSQL.
2. **Server-Side Session Middleware:** All `/admin/*` operations (excluding `/admin/login/`) are guarded at the server level by `src/middleware.ts`, validating authenticated sessions and staff roles before rendering pages or executing operations.
3. **Continuous Audio Stream:** Audio playback is decoupled from page routing via `AudioPlayerContext`, maintaining uninterrupted listening across all navigation flows.
4. **Resilient Data Architecture:** PostgreSQL schemas in `supabase/migrations/` enforce data constraints, foreign keys, and audit timestamps. When operating without active Supabase credentials during development, `DataContext` automatically falls back to bundled canonical datasets in `src/data/`.

---

## Project Structure

```
.
├── public/
│   ├── brand/vedanta-mission/   # Authoritative vector logos, favicons, app icons, social cards
│   ├── images/
│   │   ├── entry/               # Consecrated Sri Gangeshwar Mahadev entry scene assets
│   │   └── vmission/            # Curated canonical photography of Ashram and Acharyas
│   ├── _headers                 # Edge CDN security headers (CSP, HSTS, X-Frame-Options)
│   └── robots.txt               # Directives disallowing /admin from crawler indexing
├── scripts/                     # Idempotent database seed utilities (seed-teachings.js, seed-batch2.js)
├── supabase/
│   └── migrations/              # Versioned SQL migrations (schema, RLS, indexes, and secure RPCs)
├── src/
│   ├── app/                     # Next.js App Router (public pages & admin console)
│   │   ├── about/               # About the Mission & Gurukula
│   │   ├── acharyas/            # Lineage & Acharya biographies
│   │   ├── admin/               # Staff operations & Supabase CMS console
│   │   ├── ashram/              # Ashram facilities & Mandir information
│   │   ├── contact/             # Contact information & visit planner
│   │   ├── donate/              # Seva offerings & 80-G receipt workflow
│   │   ├── events/              # Spiritual camps & assembly schedules
│   │   ├── learn/               # Gurukula courses & Tattva Bodha
│   │   ├── publications/        # Vedanta Sandesh & Vedanta Piyush ezines
│   │   ├── teachings/           # Jnana Ganga scriptural discourse library
│   │   ├── globals.css          # Design tokens, color system, and motion variables
│   │   └── layout.tsx           # Root HTML structure, fonts, and global providers
│   ├── components/              # Modular UI components, modals, audio dock, navigation
│   │   ├── admin/               # Admin console SVG icon library (AdminIcons.tsx)
│   │   ├── cinematic/           # Entry overlay, PageTransition, ScrollMotion, TactileFrame
│   │   └── immersive/           # AshramAscent visual component
│   ├── context/                 # React Contexts (AudioPlayerContext, DataContext, ToastContext)
│   ├── data/                    # Canonical datasets (acharyas, teachings, publications, events)
│   ├── lib/                     # Supabase SSR client/server utilities and data mappers
│   │   ├── supabase/            # Browser client (client.ts) and server client (server.ts)
│   │   └── cms-mappers.ts       # Type mappers between database rows and frontend models
│   ├── middleware.ts            # Next.js session refresh and /admin route protection
│   └── styles/                  # Motion utilities, responsive breakpoints, and keyframes
├── next.config.js               # Next.js configuration (trailingSlash, unoptimized images)
├── package.json                 # Project dependencies and npm scripts
├── package-lock.json            # Deterministic dependency lockfile
├── tsconfig.json                # TypeScript strict configuration
├── next-env.d.ts                # Next.js TypeScript declarations
├── .eslintrc.json               # ESLint configuration
└── README.md                    # Project documentation
```

---

## Public Information Architecture & Routes

### Primary Public Routes

| Route | Description | Rendering |
|---|---|---|
| `/` | Homepage & Sacred Arrival Scene | Static (SSG) |
| `/about` | Mission History, Guiding Principles & Lineage | Static (SSG) |
| `/ashram` | Ashram Facilities, Temple Worship & Visitor Guide | Static (SSG) |
| `/acharyas` | Directory of Resident & Visiting Acharyas | Static (SSG) |
| `/acharyas/[slug]` | Individual Acharya Biographies & Audio Collections | Static (SSG, 4 profiles) |
| `/teachings` | Jnana Ganga Scriptural Discourse Explorer | Static (SSG) |
| `/teachings/[id]` | Discourse Series Detail & Audio Stream | Static (SSG, 86 series) |
| `/publications` | Periodicals Archive (*Vedanta Sandesh* / *Piyush*) | Static (SSG) |
| `/publications/[id]` | Individual Monthly Ezine Issue & Reader | Static (SSG, 467 editions) |
| `/events` | Spiritual Camps, Gyana Yagnas & Retreats Calendar | Static (SSG) |
| `/events/[eventId]` | Event Information, Schedule & Registration | Static (SSG, 83 events) |
| `/learn` | Gurukula Curriculum & Correspondence Courses | Static (SSG) |
| `/learn/tattva-bodha` | Flagship Tattva Bodha Course Curriculum | Static (SSG) |
| `/learn/[id]` | Individual Course Syllabus & Application | Static (SSG, 8 courses) |
| `/donate` | Seva Offerings, Bank Accounts & 80-G Tax Receipts | Static (SSG) |
| `/contact` | Ashram Directions, Contact Information & Inquiries | Static (SSG) |

---

## Administrative Console & Supabase CMS

The portal includes an administrative operations console accessible at `/admin`.

### CMS Capabilities & Role Governance

- **Institutional Operations Console:** Accessible at `/admin`, providing authenticated Ashram staff with tools to manage discourses, publications, retreats, courses, seeker stay inquiries, and Section 80-G tax exemption seva donations.
- **Role-Aware Authorization:**
  - **Administrator:** Full content catalog management, seva offering verification, 80-G tax receipt issuance, internal donation creation, deletion capabilities, and system audit logs.
  - **Editor:** Content publishing and seeker inquiry review, with permission to verify payments via secure RPC (`verify_payment`) while masking sensitive donor PAN and contact data (`get_staff_donations`). Editors are restricted from issuing tax receipts, deleting donations, or accessing raw financial donor information.
- **Database Security:** Protected by PostgreSQL Row-Level Security (RLS) policies and security-definer RPCs. Public or anonymous requests cannot tamper with administrative records or access private donor contact/tax information.
- **Development Baseline Simulation:** In local development environments without an active Supabase connection, `DataContext` automatically provides a local simulated baseline for offline UI/UX testing.
- **Search Engine Isolation:** All administrative routes are excluded from search crawler indexing via `<meta name="robots" content="noindex, nofollow, noarchive" />` and `public/robots.txt`.

---

## Accessibility & Responsive Design

The codebase adheres to accessibility best practices:

- **Semantic Landmark Hierarchy:** Standard HTML5 landmarks (`<header role="banner">`, `<nav role="navigation">`, `<main id="main-content">`, `<footer role="contentinfo">`) ensure clear navigation with assistive technologies.
- **Contrast Ratios:** Contrast between text and background surfaces meets WCAG AA standards (e.g., Deep Walnut `#1E1916` on Ivory `#FDFBF7`, and High-Contrast Ochre `#A73C0E` on Sandstone).
- **Responsive Layouts:** Layouts scale smoothly across viewport sizes (375px mobile, 768px tablet, 1024px desktop, 1440px wide monitors).
- **Touch Targets:** Interactive controls (buttons, links, audio controls) maintain a minimum target size of 44×44px on touch devices.
- **Keyboard Navigation:** Dropdown menus, modals, and interactive cards support standard keyboard focus and `Escape` key dismissal.
- **Reduced Motion Support:** Respects `@media (prefers-reduced-motion: reduce)`, disabling animations and transitions for users with vestibular sensitivities.

---

## Local Development

### Prerequisites

- **Node.js:** `>= 18.17.0` (LTS recommended)
- **npm:** `>= 9.0.0`

### 1. Installation

Install all project dependencies deterministically from `package-lock.json`:

```bash
npm ci
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Public Supabase Project Coordinates (Required for live CMS operations)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-publishable-key

# Optional base path (leave empty for root deployment)
# NEXT_PUBLIC_BASE_PATH=
```

> [!NOTE]
> **Development vs. Production Projects:** Use a dedicated development Supabase project or local Supabase instance during development. Production deployments must configure their own production Supabase project via hosting provider environment variables (e.g. Vercel Project Settings). Never commit `.env.local`, credentials, or secret keys to version control.

### 3. Database Migrations & Canonical Seeding

The repository contains versioned SQL migrations under `supabase/migrations/`:

1. `20261022141500_create_teachings_and_admin_profiles.sql` — Core teachings schema, admin profiles, and staff authentication.
2. `20261022164500_create_publications_courses_events_acharyas.sql` — Publications, courses, retreats, and acharya profiles.
3. `20261022231000_create_inquiries_and_donations.sql` — Seeker inquiries and seva donation records.
4. `20261023120000_secure_donations_editor_verification.sql` — Corrective RPCs enforcing donor privacy and role-restricted operations.

To populate initial institutional records into Supabase, the repository provides idempotent seed scripts:

```bash
# Validate data contracts without writing to database:
node scripts/seed-teachings.js --dry-run
node scripts/seed-batch2.js --dry-run

# Execute import against the configured development Supabase instance:
# Requires SUPABASE_SECRET_KEY in environment or .env.local
node scripts/seed-teachings.js
node scripts/seed-batch2.js
```

### 4. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will hot-reload as source files change.

### 5. Type Checking & Quality

Validate TypeScript types across the entire codebase:

```bash
npm run typecheck
npm run lint
```

### 6. Production Build

Compile the Next.js project:

```bash
npm run build
```

This compiles all public pages and dynamic administrative routes, verifying types, lint rules, and route configurations.

---

## Deployment

The application runs as a standard Next.js 14 App Router project with Node.js runtime support for middleware session handling:

- **Vercel (Production Host):** Connect the GitHub repository. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Project Settings > Environment Variables. Vercel automatically runs `next build` and serves the application with Edge Middleware and global CDN optimization.
- **Self-Hosted Node.js / Docker:** Run `npm run build` and launch the production server with `npm start` (or a container running `next start` on Node.js >= 18.17.0). Configure a reverse proxy (e.g., Nginx, Caddy, Cloudflare) with HTTPS termination and standard headers.

---

## Project Status

- **Public Website:** Production-ready. All scriptural discourse collections, ezines, and Gurukula course materials are compiled and active.
- **Administrative CMS:** Production-ready. Fully integrated with Supabase PostgreSQL, role-based access control (Admin vs Editor), secure donation verification, and audit logging.

---

## Content, Heritage & Attribution

All scriptural commentaries, audio discourses, texts, ezine archives, and photographs are the intellectual and spiritual heritage of **Vedanta Parmarthic Sewa Trust & Vedanta Ashram, Indore**.

This digital portal was crafted with deep reverence for traditional Advaita Vedanta and the timeless lineage of Adi Shankaracharya.

---

## Credits

- **Institution:** Vedanta Mission & Vedanta Ashram, Indore, Madhya Pradesh, India
- **Founder & Spiritual Guide:** Poojya Swami Atmananda Saraswati
- **Trust:** Vedanta Parmarthic Sewa Trust (Regd. 1992)
- **Production URL:** [https://vmission-website-redesign.vercel.app/](https://vmission-website-redesign.vercel.app/)
