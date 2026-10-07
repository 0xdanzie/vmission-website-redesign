# PHASE 2D BRANDING & VISUAL DESIGN BASELINE
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Status:** PHASE 2D — BRANDING & VISUAL DESIGN BASELINE (FROZEN SPECIFICATION)  
**Date:** 2026-09-04  
**Author:** Antigravity (Advanced Agentic Architecture)  
**Governing Baselines:** Builds on `PHASE-2-ARCHITECTURE-BASELINE.md` (IA), `PHASE-2B5-VALIDATION-REPORT.md`, and `PHASE-2C-RESOURCE-BASELINE.md` (Resource Catalog).  
**Execution Rule:** PLANNING & DESIGN SPECIFICATION ONLY — ZERO PRODUCTION SOURCE CODE MODIFIED.

---

## 1. Status & Current State

> [!IMPORTANT]
> **Phase 2D is complete.** A complete, professional, culturally authentic visual identity and UI design specification has been established and documented under `docs/branding/`.
> 
> **Zero production source files, React components, CSS files, routes, data files, or packages were modified.**  
> This specification is now ready for the **Client / Sir Review & Approval Gate** prior to Phase 3 implementation.

---

## 2. Governing Architecture & Resource Relationship

* **Architecture Alignment:** The visual system strictly adheres to the **7-Destination Navigation Hierarchy** approved in Phase 2B (`Home`, `About`, `Ashram`, `Teachings`, `Publications`, `Events`, `Learn` + `Contact` and `Donate / Seva`). Zero visual elements contradict the approved Information Architecture.
* **Resource Relationship:** The media UI components directly accommodate the verified assets cataloged in Phase 2C:
  * Persistent docked audio player for the 7 canonical Teachings categories.
  * Responsive YouTube playlist embeds for the verified Gita video chapters.
  * Digital publication reader and Archive.org download center for *Vedanta Sandesh*, *Vedanta Piyush*, E-Books, and Sanskrit study texts.

---

## 3. Brand Audit: Verified vs. Proposed

| Brand Dimension | Verified Assets from Evidence | Proposed Design Direction | Client Approval Status |
|---|---|---|---|
| **Organization Name** | "Vedanta Mission" & "Vedanta Ashram, Indore" | Header: "VEDANTA MISSION", Subtitle: "INDORE · CENTRAL INDIA" | **PROPOSED** — Client confirmation |
| **Sacred Motto** | "Spreading Love & Light by revealing the basic oneness of all" | Highlighted across home hero, footer, and mobile drawer | **VERIFIED** |
| **Emblem / Crest** | Sacred Om emblem present in prototype | Geometric 8-ray Jyoti sun with central Devanagari Om (`ॐ`) | **PROPOSED** — Client approval required |
| **Color Palette** | Basic prototype colors | Modern Indian Gurukula palette (Ivory, Sandalwood, Terracotta, Antique Brass, Walnut) | **PROPOSED** — Client approval required |
| **Typography** | Prototype imports Fraunces/Inter | Display: `Fraunces`, Reading: `Cormorant Garamond`, UI: `Inter`, Sanskrit: `Noto Serif Devanagari` | **PROPOSED** — Client approval required |
| **Photography** | Authentic Ashram & Guruji photos in `public/images/vmission/` | Documentary natural light photography; request fresh Swamini portraits | **VERIFIED** (Ashram) / **PENDING** (Swaminis) |

---

## 4. Visual Direction: Modern Indian Gurukula

The visual design is governed by an intentional ratio:
> **70% Timeless Indian Ashram & Gurukula + 30% Modern Contemporary Editorial**

The platform creates an atmosphere of contemplation, peace, intellectual clarity, and spiritual welcome. It avoids the commercial cliches of SaaS landing pages, the noisy visual clutter of generic temple sites, and the synthetic falseness of AI-generated spiritual art.

---

## 5. Color System Specification

* **Primary Background:** Warm Temple Ivory (`--vm-color-bg-primary`: `#FDFBF7`) — eliminates stark white glare and mimics aged manuscript parchment.
* **Elevated Surfaces:** Pure Card White (`#FFFFFF`) and Aged Sandalwood (`#F5EDE0`).
* **Primary Brand Accent:** Terracotta Saffron (`--vm-color-accent-saffron`: `#D95D39` / `#BF4D2B`) — inspired by traditional brickwork and sanyasi robes.
* **Secondary Devotional Accent:** Antique Temple Brass (`--vm-color-accent-brass`: `#C5A059` / `#9B783E`) — subtle gold for dividers, badges, and focus rings.
* **Natural Living Accent:** Ashram Grove Green (`#3F5E4D`) — subtle neem and banyan foliage tones.
* **Primary Typography:** Dark Walnut (`--vm-color-text-primary`: `#221D1A`) — achieving a **13.8:1 AAA contrast ratio**.
* **Dark Contrast Surfaces:** Midnight Walnut (`#1E1916`) for the persistent audio player dock, mobile drawer, and global footer.

---

## 6. Typography System Specification

* **Display & Titles:** `Fraunces` (700 / 600 weight) — warm, literary, organic serif with historical gravitas.
* **Scriptural Body Reading:** `Cormorant Garamond` (400 / 500 weight, `19px` desktop / `17px` mobile, line-height `1.75`) — graceful classical serif optimized for long-form study.
* **UI Chrome & Metadata:** `Inter` (500 / 600 weight) — clean, accessible sans-serif for navigation, search bars, buttons, and timestamps.
* **Sanskrit Verses:** `Noto Serif Devanagari` — ensures authentic ligature rendering for Sanskrit Shlokas and mantra citations.

---

## 7. Component Visual Rules

1. **Header Navigation:**
   * Desktop: 80px transparent blurred header transitioning to opaque dark walnut on scroll. Centered editorial links, prominent Om crest, and high-emphasis `Donate / Seva` button.
   * Mobile: Compact 64px bar with 48px hamburger trigger opening a slide-over drawer featuring top action tiles for immediate donation and ashram helpline access.
2. **Teaching Cards:** 16:9 widescreen thumbnail, category tag pill, speaker name, duration, and direct play/download actions. Brass glow hover elevation (`translateY(-4px)`).
3. **Publication Cards:** 3:4 vertical book ratio with drop shadow, cover artwork, and dual "Read Online" / "Download PDF" buttons.
4. **Persistent Audio Dock (`AudioPlayerDock`):** Fixed bottom player in Midnight Walnut (`#1E1916`) with gold scrub bar, 15s skip buttons, speed toggle, and mobile collapse.
5. **Global Footer:** 4 editorial columns, centered newsletter signup banner, verified organization motto, legal trust credits, and zero third-party developer watermarks.

---

## 8. Imagery & Photographic Guidelines

* **Strict Authenticity:** Exclusively authentic photography of Vedanta Ashram, Indore, its resident Acharyas, and real satsangs (`public/images/vmission/README-ASSETS.md`).
* **Architectural Identity:** Consecrated white Gangeshwar Mahadev (Shivling) dome on the terracotta roof, carved wooden threshold doors, and quiet teaching hall.
* **Strict Anti-Patterns:** ZERO AI-generated faces, NO generic stock spirituality (white models in yoga poses), NO unrelated temples, NO artificial deity glows/lens flares, and NO decorative Sanskrit wallpaper.

---

## 9. Responsive Layout & Spacing

* **Containers:** 1200px (Desktop) / 1280px (Wide) with 12-column grid and 32px gutters.
* **Spacing Scale:** Strict 8px increment system (`--vm-space-1` to `--vm-space-24`).
* **Mobile Comfort:** Generous 16px fluid side margins, full-width touch cards, and minimum 48px touch bounding boxes.

---

## 10. Accessibility (WCAG 2.1 AA Compliance)

* **Contrast:** Minimum 4.5:1 for normal text (Dark Walnut on Ivory achieves 13.8:1 AAA).
* **Keyboard Navigation:** High-contrast 2px antique brass `:focus-visible` focus ring across all buttons and inputs.
* **Reduced Motion:** Automatic suppression of transitions and smooth scrolls for users with `prefers-reduced-motion: reduce`.
* **Semantics:** Strict single `<h1>` per page, sequential heading order, and descriptive image alt tags.

---

## 11. Page-by-Page Visual Hierarchy

All 14 core routes have been mapped with defined objectives, hero styles, section sequences, and visual densities in [`docs/branding/page-visual-hierarchy.md`](docs/branding/page-visual-hierarchy.md).

---

## 12. Client Brand Approval Register

The following items are isolated in [`docs/branding/client-brand-verification.md`](docs/branding/client-brand-verification.md) for the upcoming client gate:
* **BVR-01:** Formal approval of the proposed Om Jyoti crest or supply of registered trust seal.
* **BVR-02 & BVR-03:** Approval of the Terracotta Saffron / Antique Brass palette and Fraunces / Cormorant Garamond / Inter typography pairing.
* **BVR-04:** Exact organization naming convention for site header.
* **BVR-05:** Supply of high-resolution matching portraits for Swamini Amitanandaji, Swamini Poornanandaji, and Swamini Samatanandaji.
* **BVR-07 & BVR-08:** Official YouTube channel URL and social media channel confirmations.
* **BVR-09:** Preferred header button terminology (`Donate / Seva` vs. `Donate` vs. `Seva Offering`).

---

## 13. Phase 3 Implementation Handoff

Once the client sign-off gate is completed, Phase 3 (Controlled Implementation) can immediately translate this baseline into production:
1. Transfer token dictionary from [`docs/branding/design-tokens.md`](docs/branding/design-tokens.md) into Next.js `src/app/globals.css`.
2. Connect production catalogs (`teachings-catalog.json`, `publications-catalog.json`) into `src/data/`.
3. Style the Header, Mobile Drawer, Audio Player Dock, and Card components according to [`docs/branding/component-visual-spec.md`](docs/branding/component-visual-spec.md).

---

### STOP CONDITION MET
Phase 2D is complete. No production code, CSS, components, routes, or assets have been modified. All implementation awaits client approval at the formal Phase Gate.
