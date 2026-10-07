# Vedanta Mission — Digital Ashram & Advaita Vedanta Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Static Export](https://img.shields.io/badge/Static%20Pages-680%20Prerendered-2D4F38?style=flat)](https://vmission-website-redesign.vercel.app/)
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
| **Framework** | Next.js (App Router) | `14.2.15` | Application framework, routing, and static HTML generation |
| **Runtime & UI** | React | `18.3.1` | Component architecture and client hydration |
| **Language** | TypeScript | `5.5.3` | Type safety and reliable data contracts across all modules |
| **Styling** | CSS Modules | Native | Scoped, zero-runtime styling using native CSS custom properties |
| **Export Target** | Static Site Generation | `output: 'export'` | Complete pre-compilation into static HTML, CSS, and JS |
| **State Management** | React Context | Native | Client-side continuous audio playback and transient UI state |
| **Fonts** | Google Fonts | CDN | Cormorant Garamond, Plus Jakarta Sans, Noto Serif Devanagari |
| **Deployment** | Vercel / Edge CDN | Production | Global content delivery, instant edge caching, and SSL termination |

### Application Architecture

```
                    ┌───────────────────────────────┐
                    │     Canonical Datasets        │
                    │   (src/data/*.ts contracts)   │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      Next.js App Router       │
                    │  generateStaticParams() (SSG) │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │     Static Export Bundle      │
                    │    680 Pre-rendered Pages     │
                    │            (out/)             │
                    └───────────────┬───────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────┐                   ┌─────────────────────────────┐
│   Global Edge CDN Hosting   │                   │    Client Hydration Layer   │
│  (Vercel / Cloudflare Pages)│                   │   (Audio Dock, Modals, Nav) │
└─────────────────────────────┘                   └─────────────────────────────┘
```

1. **Pure Static Export:** All 680 application routes—including every dynamic discourse chapter and monthly ezine issue—are pre-rendered into static HTML during `npm run build`. No Node.js runtime or server execution is required in production.
2. **Client Hydration Islands:** Static pages hydrate lightweight client components where interactivity is required (audio dock, mobile menu drawer, filter bars, inquiry modals, and scroll reveal observers).
3. **Continuous Audio Stream:** Audio playback is decoupled from page routing via `AudioPlayerContext`, maintaining playback across route transitions.
4. **Structured Canonical Data:** Scriptural texts, event schedules, acharya biographies, and publication archives are managed in type-safe TypeScript models within `src/data/`, serving as the single source of truth.

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
├── src/
│   ├── app/                     # Next.js App Router (public pages & admin console)
│   │   ├── about/               # About the Mission & Gurukula
│   │   ├── acharyas/            # Lineage & Acharya biographies
│   │   ├── admin/               # Operations & CMS prototype console
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
│   │   ├── cinematic/           # Entry overlay, PageTransition, ScrollMotion, TactileFrame
│   │   └── immersive/           # AshramAscent visual component
│   ├── context/                 # React Contexts (AudioPlayerContext, DataContext, ToastContext)
│   ├── data/                    # Canonical datasets (acharyas, teachings, publications, events)
│   └── styles/                  # Motion utilities, responsive breakpoints, and keyframes
├── next.config.js               # Static export configuration (output: 'export', trailingSlash)
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

## Administrative Console & Prototype Notice

The portal includes an administrative operations console accessible at `/admin`.

### Important Prototype Notice

- **Frontend Prototype Only:** The `/admin` console is a client-side interface built to demonstrate editorial workflows, content catalog indexing, enquiry reviews, and 80-G receipt management.
- **Local Client State:** Data modifications made in `/admin` are handled via `DataContext` and stored in browser `localStorage`.
- **No Server Authentication:** The interface does not include server-side authentication, session encryption, or a production database connection.
- **Production Precaution:** Production deployments must either gate the `/admin` path behind edge authentication (e.g., Cloudflare Access, HTTP Basic Auth, or OAuth) or exclude the route prior to public publication.
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

### 2. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will hot-reload as source files change.

### 3. Type Checking

Validate TypeScript types across the entire codebase:

```bash
npm run typecheck
```

### 4. Linting

Run ESLint to check for code style and syntax issues:

```bash
npm run lint
```

### 5. Production Build

Compile the project and generate the complete static site:

```bash
npm run build
```

This generates **680 static HTML pages** along with optimized CSS and JavaScript bundles inside the `out/` directory.

---

## Deployment

Because the application exports as a pure static bundle (`output: 'export'`), it can be hosted on any modern edge platform or web server:

- **Vercel (Current Production Host):** Connect the GitHub repository. Vercel automatically runs `next build` and serves the static output across its global edge network.
- **Cloudflare Pages / Netlify:** Configure the build command as `npm run build` and the publish directory as `out`. Preconfigured security headers from `public/_headers` are automatically applied.
- **Apache / Nginx / Traditional Web Server:** Copy the contents of `out/` directly to the web root. Configure standard URL rewrite rules to serve `index.html` files for directory routes and apply the security headers defined in `public/_headers`.

---

## Project Status

- **Public Website:** Production-ready. All public routes, media collections, and publication archives are fully compiled and deployed.
- **Administrative Console:** Frontend prototype for demonstration and workflow modeling.

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
