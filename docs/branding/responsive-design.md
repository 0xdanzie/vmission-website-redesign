# RESPONSIVE DESIGN & GRID SYSTEM
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D — Branding + Visual Design Baseline  
**Date:** 2026-09-04  
**Status:** COMPLETE LAYOUT SPECIFICATION — PLANNING ONLY (NO CODE MODIFIED)  
**Governing Baseline:** Grounded in `PHASE-2-ARCHITECTURE-BASELINE.md` and `component-visual-spec.md`.

---

## 1. Responsive Layout Philosophy

The redesign adopts a **spacious, editorial grid** that allows philosophical concepts, discourses, and ashram photography to unfold with unhurried grace. Content containers are generously proportioned, preventing the cramped, cluttered feel of the legacy WordPress site.

---

## 2. Breakpoints & Screen Targets

| Breakpoint Tier | Viewport Width Range | Target Devices | Primary Navigation Mode | Layout Grid |
|---|---|---|---|---|
| **Mobile (sm)** | `< 640px` | Smart phones (iPhone, Android) | Sticky top bar + 48px hamburger + slide drawer | 4-Column Fluid (16px gutters, 16px margins) |
| **Tablet (md)** | `640px – 1023px` | iPads, Android tablets | Top bar with search icon + compact hamburger | 8-Column Fluid (24px gutters, 24px margins) |
| **Desktop (lg)** | `1024px – 1439px` | Laptops, standard monitors | Full inline desktop header with dropdowns & CTA | 12-Column Fixed Container (`1200px` max-width, 32px gutters) |
| **Wide Desktop (xl)**| `≥ 1440px` | Large desktop displays | Wide editorial container with balanced side breathing room | 12-Column Fixed Container (`1280px` max-width, 32px gutters) |

---

## 3. Spacing System & Vertical Rhythm

Vertical spacing follows an intentional **8px incremental rhythm** that ensures consistent spatial breathing across all pages:

| Space Token | Rem Value | Pixel Value | Typical Application |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4px | Micro-gaps between badge icons and text |
| `--space-2` | `0.5rem` | 8px | Button internal padding, tag spacing |
| `--space-3` | `0.75rem` | 12px | Compact card internal padding |
| `--space-4` | `1.0rem` | 16px | Standard card padding, mobile page margins |
| `--space-6` | `1.5rem` | 24px | Desktop grid gutters, form field spacing |
| `--space-8` | `2.0rem` | 32px | Card grid row gaps, subsection separation |
| `--space-12`| `3.0rem` | 48px | Inter-block spacing, hero margin |
| `--space-16`| `4.0rem` | 64px | Major section padding on mobile |
| `--space-20`| `5.0rem` | 80px | Major section padding on desktop |
| `--space-24`| `6.0rem` | 96px | Hero section top/bottom breathing room |

---

## 4. Multi-Column Grid Distributions

### 4.1 Teachings & Media Grids
* **Desktop (`≥1024px`):** 3-column card grid (`grid-template-columns: repeat(3, 1fr)`).
* **Tablet (`640px–1023px`):** 2-column card grid.
* **Mobile (`<640px`):** Single-column vertical stack with full-width tap cards.

### 4.2 Publications Shelf Grids
* **Desktop:** 4-column book/magazine grid (`repeat(4, 1fr)`).
* **Tablet:** 3-column grid.
* **Mobile:** 2-column compact grid.

### 4.3 Ashram & About Editorial Layouts
* **Desktop:** Asymmetric 2-column layout (60% reading narrative / 40% sticky photo gallery or logistical anchor card).
* **Mobile:** Single continuous vertical flow.
