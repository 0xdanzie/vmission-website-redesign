# Vedanta Mission — Digital Ashram & Advaita Vedanta Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Pages Prerendered](https://img.shields.io/badge/Static%20Pages-680%20Prerendered-darkgreen?style=flat)](scripts/test-final-qa.js)
[![Cinematic Entry](https://img.shields.io/badge/Entry%20Verification-37%2F37%20Passed-brightgreen?style=flat)](scripts/verify-cinematic-entry.js)

Official modern web portal and scriptural knowledge repository for **Vedanta Mission & Vedanta Ashram, Indore**, dedicated to the authentic study of Advaita Vedanta, the Upanishads, and the Bhagavad Gita under the traditional Shankaracharya lineage and guidance of Poojya Swami Atmananda Saraswati.

---

## Architecture & Technology Stack

- **Framework:** Next.js 14.2.15 (App Router, static export via `output: 'export'`)
- **Language & Runtime:** TypeScript 5.5.3 (strict mode), Node.js `>= 18.17.0`
- **Static Scale:** **680 prerendered static HTML pages** across all dynamic teaching series, monthly publications, events, and courses.
- **Styling:** Modular Vanilla CSS (`*.module.css`) with bespoke architectural tokens, responsive typography scales, and hardware-accelerated animations.
- **Typography:**
  - *Cormorant Garamond* (Sacred display & hero headings)
  - *Plus Jakarta Sans* (Body copy, interactive navigation & UI)
  - *Noto Serif Devanagari* (Sanskrit invocations, mantras & Devanagari script)
- **State Architecture:** Light client-side React Contexts (`DataContext`, `AudioPlayerContext`, `ToastContext`) enabling seamless audio playback and interactive prototype flows across page transitions.

---

## Project Structure

```
V-Mission-CLEAN/
├── src/
│   ├── app/                    # Next.js App Router pages (public routes & admin)
│   ├── components/             # Reusable UI components, modals, audio dock, branding
│   ├── context/                # React Contexts (Audio, Data, Toasts)
│   ├── data/                   # Canonical datasets (acharyas, teachings, publications, events)
│   └── styles/                 # Global styles and design system variables
├── public/
│   ├── brand/vedanta-mission/  # Authoritative brand vector assets, favicons, social cards
│   ├── images/
│   │   ├── entry/              # Consecrated Sri Gangeshwar Mahadev entry scene assets
│   │   └── vmission/           # Curated canonical photography of Ashram and Acharyas
│   ├── _headers                # Edge CDN security headers (CSP, HSTS, frame options)
│   └── robots.txt              # Search engine directives (admin route disallow)
├── scripts/                    # Headless Chrome test runners, verification suites & ledgers
├── docs/                       # Project specifications, brand guidelines & QA audit records
│   ├── architecture/           # System design & console architecture
│   ├── brand/                  # Brand guidelines & asset integration register
│   ├── migration/              # Media and data migration reports
│   └── qa/                     # Full responsive and functional verification test logs
├── package.json                # Project dependencies and npm scripts
├── package-lock.json           # Deterministic dependency lockfile
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js build configuration (export target)
├── .eslintrc.json              # ESLint rules
├── .gitignore                  # Git exclusion rules
└── README.md                   # Repository overview and developer documentation
```

---

## Key Modules & Features

### 1. Consecrated Cinematic Entry Scene
- Consecrated entrance featuring the authentic Shivling of Sri Gangeshwar Mahadev.
- Full-viewport immersion hiding background chrome during introduction.
- Realistic 3-layer contact shadow with subtle ambient lighting.
- Strict performance limits (<= 1.70s desktop, <= 1.50s mobile).
- Immediate session bypass via `sessionStorage` (`vm-entry-scene-seen`) ensuring the scene only plays once per visit.
- Full accessibility bypass for `prefers-reduced-motion`.
- Manual query triggers supported: `/?intro=1` (force play) and `/?intro=0` (force bypass).

### 2. Jnana Ganga Discourses & Continuous Audio Dock
- Searchable library of scriptural commentaries covering the Bhagavad Gita, Principal Upanishads, and Prakarana Granths.
- Persistent bottom audio player supporting continuous listening across route navigation.

### 3. Publications & Periodical Archive
- Complete digital catalog of *Vedanta Sandesh* (English/Hindi) and *Vedanta Piyush* (Hindi/Gujarati) ezines.
- E-Books, study texts, and original treatises by Swami Atmananda Saraswati.

### 4. Gurukula Courses & Events
- Structured curriculum explorer including the flagship *Tattva Bodha* correspondence course.
- Detailed retreat schedules, Gyana Yagnas, and registration workflows.

### 5. Seva & Direct Offering Portal
- Direct bank transfer information (NEFT/RTGS, Cheque, UPI) for Annadanam, Mandir upkeep, and student sponsorship.
- Devotee transaction acknowledgment generator for Section 80-G tax exemption reconciliation.
- Zero collection of sensitive payment credentials (no debit/credit card numbers or CVVs stored).

### 6. Prototype Staff & Operations Console (`/admin`)
- Accessible via the discrete "Staff Login" utility link in the footer (isolated from the public navbar).
- **Prototype Status:** Demonstrates institutional editorial workflows and local session persistence (`DataContext` / `localStorage`).
- **Security Notice:** This console is a frontend prototype. Production deployment requires backend server-side session authentication (OAuth / JWT / SSO).
- **Search Engine Isolation:** Protected with `<meta name="robots" content="noindex, nofollow, noarchive" />` and excluded in `public/robots.txt`.

---

## Local Setup & Development

### Prerequisites
- **Node.js:** `>= 18.17.0` (tested with Node 20 and Node 24)
- **npm:** `>= 9.0.0`

### 1. Clean Installation
Always install dependencies cleanly from `package-lock.json`:
```bash
npm ci
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Static Production Build
```bash
npm run build
```
This compiles the application and generates the complete static website in the `out/` directory (680 HTML pages).

---

## Quality Assurance & Verification

The repository includes automated test runners to verify builds, visual responsiveness, and entry behavior:

```bash
# 1. Typecheck TypeScript without emitting JS
npx tsc --noEmit

# 2. Run ESLint static analysis
npm run lint

# 3. Verify Cinematic Entry in Headless Chrome (37 assertions)
node scripts/verify-cinematic-entry.js

# 4. Run Route & Photographic Asset Integration Suite (52 assertions)
node scripts/test-final-qa.js 3000
```

---

## Deployment Guidelines

Because this application exports as a pure static bundle (`output: 'export'`), it can be hosted on any modern edge CDN or web server:

- **Cloudflare Pages / Netlify:** Deploy the `out/` directory. Preconfigured security headers from `public/_headers` are automatically recognized.
- **Vercel:** Connect the repository and configure build output to `out/`.
- **Apache / Nginx:** Copy `out/` to the web root. Configure standard rewrite rules for HTML routing and set security headers matching `public/_headers`.

---

## Heritage & Attribution

Developed with reverence for **Vedanta Parmarthic Sewa Trust & Vedanta Ashram, Indore**.  
All scriptural commentaries, audio discourses, texts, and archival photographs are the authentic heritage of Vedanta Mission.
