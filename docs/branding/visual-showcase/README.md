# Visual Showcase — Vedanta Mission / Vedanta Ashram, Indore
## Phase 2D.8 — High-Fidelity Design Showcase

> **IMPORTANT: This is a visual planning document only.**
> It is NOT production code. It is NOT connected to the Next.js application. It does NOT modify any routes, components, or assets. It is intended exclusively for human visual review prior to Phase 3 implementation.

---

## What This Showcase Is

A high-fidelity, single-file HTML visual showcase demonstrating the complete final visual identity for the Vedanta Mission website redesign — exactly as it should look when implemented in Phase 3.

Reviewers open `index.html` in any browser and can scroll through all screens.

---

## How to Open

1. Open `docs/branding/visual-showcase/index.html` in any modern browser (Chrome, Edge, Firefox, Safari)
2. Use the fixed top navigation bar to jump between screens
3. No server required — it is a static file

---

## Screens Included

| # | Screen | Viewport | Status |
|:---:|---|:---:|---|
| 1 | **Homepage** — Hero, Featured Teachings, Publications, Events, Audio Dock, Footer | Desktop | ✓ Complete |
| 2 | **About / Acharyas** — Founder portrait, Guru Parampara, Resident Acharyas | Desktop | ✓ Complete |
| 3 | **Ashram** — Cinematic hero, Gangeshwar Mahadev, Teaching Hall, Dinacharya, Visitor Guide | Desktop | ✓ Complete |
| 4 | **Teachings Library** — 7-category filter, Search, 3-column card grid | Desktop | ✓ Complete |
| 5 | **Teaching Detail** — Video player, Playlist accordion, Sidebar related | Desktop | ✓ Complete |
| 6 | **Publications Library** — 4-type tabs, Search, 4-column grid, verified issues | Desktop | ✓ Complete |
| 7 | **Publication Detail** — Cover display, metadata, Read/Download, mirror note | Desktop | ✓ Complete |
| 8 | **Donate / Seva** — Scriptural framing, Seva categories, Gated financial section | Desktop | ✓ Complete |
| 9 | **Contact** — Contact info card, Inquiry form, gated details | Desktop | ✓ Complete |
| 10 | **Mobile Home** | 390px | ✓ Complete |
| 11 | **Mobile Teachings** — Horizontal filter track resolved | 390px | ✓ Complete |
| 12 | **Mobile Publications** — Horizontal type tabs | 390px | ✓ Complete |
| 13 | **Component Showcase** — Buttons, pills, badges, inputs, cards, audio dock, gated states | — | ✓ Complete |
| 14 | **Bhagwa Balance Comparison** — Version A (recommended) vs. Version B (stronger) + Dark vs. Light | — | ✓ Complete |

**Total: 14 screens / visual panels.**

---

## Final Visual System Used

### Color Palette (Final — Phase 2D.6)

| Role | Token | HEX |
|---|---|---|
| Primary Bhagwa | `--vm-bhagwa-500` | `#E06328` |
| Deep Gerua CTA | `--vm-bhagwa-600` | `#C84E17` |
| Sacred Ochre Text | `--vm-bhagwa-700` | `#A73C0E` |
| Warm Temple Ivory | `--vm-ivory` | `#FDFBF7` |
| Midnight Walnut | `--vm-walnut` | `#1E1916` |
| Deep Bilva Green | `--vm-green` | `#2D4F38` |
| Antique Brass | `--vm-brass` | `#C5A059` |

### Typography (Final — 3-Family System)

| Family | Role |
|---|---|
| **Cormorant Garamond** | Display / H1–H3 / Scripture leads / Pull quotes |
| **Plus Jakarta Sans** | Body / UI / Navigation / Buttons / Metadata |
| **Noto Serif Devanagari** | Sanskrit / Hindi / Devanagari text |

Retired families (Fraunces, Inter, Cinzel, Rozha One, Mukta) are NOT used in this showcase.

---

## Assets Used in This Showcase

### Real Ashram Images (from `public/images/vmission/`)

| Image File | Used In |
|---|---|
| `ashram-entrance-cinematic.jpg` | Homepage hero |
| `guruji-portrait-riverside.jpg` | About / Founder portrait |
| `guruji-teaching-closeup.jpg` | Teaching cards |
| `satsang-with-acharya.jpg` | Teaching card (Mandukya Karika) |
| `teaching-hall-interior.jpg` | Teaching card + Ashram screen |
| `sanctum-doors-threshold.jpg` | Ashram screen (Gangeshwar section) |
| `residential-camp-gathering.jpg` | Teaching card |
| `sanctum-interior-stage.jpg` | Teaching card |
| `gangeshwar-dome-closeup.jpg` | Ashram page hero |
| `ashram-facade-dome.jpg` | Mobile home hero |
| `swamini-amitananda.jpg` | Acharya cards |
| `swamini-poornananda.jpg` | Acharya cards |
| `swamini-samatananda.jpg` | Acharya cards |
| `vedanta-sandesh-dec20.jpg` | Publications preview |

All images use graceful `onerror` fallback placeholders. If the HTML file is opened from its current directory location relative to the project root, images load directly via relative paths.

### Content from Verified Catalogs

Real resource titles used (from `docs/resource-catalog/teachings-catalog.json` and `publications-catalog.json`):
- Bhagavad Gita — Chapter 3 (Karma Yoga) · `id: vid-gita-ch03` · VERIFIED
- Bhagavad Gita — Chapter 12 (Bhakti Yoga — Rishikesh) · `id: vid-gita-ch12` · VERIFIED
- Bhagavad Gita — Upodghata · `id: vid-gita-upod` · VERIFIED
- Vedanta Sandesh — March 2026, February 2026, January 2026, December 2025 · VERIFIED
- Vivekachudamani, Mandukya Karika — illustrative (catalog titles confirmed)
- Shiva Mahimna Stotram — from study-text catalog · VERIFIED

---

## What Requires Client Approval (Clearly Labelled in Showcase)

The following elements are explicitly marked inside the showcase with `CLIENT APPROVAL REQUIRED` or `PENDING CLIENT VERIFICATION` labels:

- Official logo / registered Trust seal (proposed Om/Jyoti concept shown as draft)
- Acharya portraits for Swamini Amitanandaji, Poornanandaji, Samatanandaji, Samvidanandaji (placeholder cards shown)
- Acharya biographies (not shown)
- Banking / UPI / 80G details in Donate page (gated section shown empty)
- Telephone, WhatsApp, Email contact details (gated)
- Full Ashram address (gated)
- Dinacharya schedule (marked illustrative)
- 2026 event calendar dates (marked placeholder)

---

## What Is NOT in This Showcase

- Production Next.js code (none)
- Live media (no actual audio streams or YouTube embeds — static representations only)
- Real payment flows
- Complete historical publication archive
- Tablet intermediate views (only Desktop + 390px mobile frames)

---

## Design Authority

All design decisions in this showcase derive from:

- **Visual authority:** `PHASE-2D6-BHAGWA-BRAND-REFINEMENT.md`
- **Architecture authority:** `PHASE-2-ARCHITECTURE-BASELINE.md`
- **Resource authority:** `PHASE-2C-RESOURCE-BASELINE.md`
- **Master approval document:** `PHASE-2-FINAL-APPROVAL-PACKAGE.md`
- **Token dictionary:** `docs/branding/design-tokens.md`
- **Component spec:** `docs/branding/component-visual-spec.md`

---

## Production Safety

**Zero production files were modified to create this showcase.**

| Area | Status |
|---|---|
| `src/app/` | UNCHANGED |
| `src/components/` | UNCHANGED |
| `src/data/` | UNCHANGED |
| `globals.css` | UNCHANGED |
| `package.json` | UNCHANGED |
| `next.config.js` | UNCHANGED |

This showcase is a standalone HTML file with embedded CSS and Google Fonts. It will not affect the running Next.js site in any way.

---

*Phase 2D.8 — Visual Showcase · Vedanta Mission / Vedanta Ashram, Indore*
*Prepared by Antigravity · Planning document only*
