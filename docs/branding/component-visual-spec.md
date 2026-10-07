# COMPONENT VISUAL SPECIFICATIONS
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D — Branding + Visual Design Baseline  
**Date:** 2026-09-04  
**Status:** COMPLETE COMPONENT VISUAL SPECIFICATION — PLANNING ONLY (NO CODE MODIFIED)  
**Governing Baseline:** Grounded in `PHASE-2-ARCHITECTURE-BASELINE.md` and `color-system.md`.

---

## 1. Header & Navigation System

### 1.1 Desktop Header
* **Height:** 80px (default), compacts to 68px on scroll (`scrollY > 16px`).
* **Background:** Transparent with `backdrop-filter: blur(16px)` over hero; transitions to `rgba(30, 25, 22, 0.95)` (Midnight Walnut) on scroll with a 1px bottom border (`rgba(197, 160, 89, 0.2)`).
* **Brand Wordmark:** Left-aligned. Om emblem (36px) in terracotta gold paired with serif "VEDANTA MISSION" in ivory white, with subtitle "INDORE · CENTRAL INDIA" in 10px uppercase letterspaced sans.
* **Navigation Links:** Centered cluster. `Inter` 14px, weight 500. Color: `#FAF6EE` with 80% opacity. Hover: 100% opacity + soft gold underline glow. Active route: bold with solid 2px gold underline bar.
* **Donate / Seva Button:** Far right. Pill-shaped or 6px rounded rectangle. Background: terracotta saffron gradient (`#D95D39` to `#BF4D2B`). Text: `#FFFFFF` 14px bold. Shadow: `0 2px 8px rgba(217, 93, 57, 0.35)`.

### 1.2 Mobile Drawer
* **Panel:** Enters from right; width 320px (or 85vw on small screens). Surface: `rgba(26, 22, 19, 0.98)` with dark brass accent divider.
* **Header:** Om emblem + close button (48px touch bounding box).
* **Action Cards:** Top 2-column card row: "Donate / Seva" (Terracotta accent) and "Contact Ashram" (Muted brass outline).
* **Link Items:** 48px height minimum. Single-level accordions with smooth chevron indicator rotation.

---

## 2. Card Design System

### 2.1 Teaching Card (Audio & Video)
```text
┌─────────────────────────────────────────────────────────┐
│ [THUMBNAIL IMAGE — 16:9 Aspect Ratio]                   │
│ ┌──────────────────────┐        ┌─────────────────────┐ │
│ │ 🎵 AUDIO DISCOURSE   │        │ ⏱️ 48 MINS          │ │
│ └──────────────────────┘        └─────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Bhagavad Gita — Chapter 3 (Karma Yoga)                 │
│ H.H. Swami Atmananda Saraswati · Hindi                  │
│                                                         │
│ Verse-by-verse exposition on the path of selfless...    │
├─────────────────────────────────────────────────────────┤
│ [▶ Listen Now]                       [📥 Download MP3]  │
└─────────────────────────────────────────────────────────┘
```
* **Surface:** `#FFFFFF` on ivory background; 8px border-radius; 1px border (`rgba(34, 29, 26, 0.08)`).
* **Hover State:** Lift 4px (`translateY(-4px)`), box-shadow expands to `0 12px 28px rgba(34, 29, 26, 0.08)`, border turns brass (`--vm-brass-border`).
* **Thumbnail:** Crisp 16:9 image with category badge pinned top-left and duration badge pinned top-right.

### 2.2 Publication Card (E-Zine & E-Book)
* **Aspect Ratio:** 3:4 vertical book/magazine orientation.
* **Cover Display:** Rendered with realistic paper drop shadow (`--vm-shadow-md`) and 4px corner radius.
* **Action Buttons:** Dual action: "Read Online" (primary outlined button) and "PDF Download" (solid button with file size indicator).

### 2.3 Acharya Card
* **Portrait:** Vertical 4:5 ratio with natural lighting (e.g. Guruji's riverside portrait).
* **Frame:** Elegant 1px double border (inner ivory, outer brass).
* **Text Block:** Name in `Fraunces` bold 20px, spiritual role in letterspaced gold uppercase, verified teaching specializations below.

---

## 3. Button System

| Variant | Normal State | Hover State | Active / Focus State | Radius & Padding |
|---|---|---|---|---|
| **Primary (Terracotta)** | Background: `#D95D39`, Text: `#FFFFFF` | Background: `#BF4D2B`, Box-shadow: `0 4px 12px rgba(217,93,57,0.3)` | Scale: `0.98`, Focus ring: 2px solid `#C5A059` | 6px radius; `10px 22px` |
| **Secondary (Brass Outline)** | Border: 1.5px solid `#C5A059`, Text: `#9B783E` | Background: `#FAF5E8`, Border: `#9B783E` | Background: `#F5EDE0`, Focus ring: 2px solid `#C5A059` | 6px radius; `10px 20px` |
| **Tertiary (Ghost / Text)** | Transparent background, Text: `#221D1A` | Background: `rgba(34, 29, 26, 0.05)`, Text: `#9E381C` | Underline accent, Focus ring: 2px solid `#D95D39` | 4px radius; `8px 14px` |
| **Destructive** | Background: `#B93826`, Text: `#FFFFFF` | Background: `#962B1C` | Focus ring: 2px solid `#B93826` | 6px radius; `10px 20px` |

---

## 4. Form Elements

* **Text Inputs & Textareas:**
  * Background: `#FFFFFF`. Border: 1px solid `rgba(34, 29, 26, 0.16)`. Radius: 6px. Padding: `12px 16px`.
  * Typography: `Inter` 15px, color: `#221D1A`. Placeholder: `#8F857B`.
  * Focus State: Border color shifts to terracotta (`#D95D39`) with soft amber glow ring (`0 0 0 3px rgba(217, 93, 57, 0.18)`).
* **Select Dropdowns:** Styled native look with custom brass chevron arrow.
* **Error State:** Border: `#B93826`. Accompanied by 12px text in red below field with alert icon.
* **Success State:** Border: `#2E6B47`. Accompanied by subtle green checkmark.

---

## 5. Persistent Audio Player Dock (`AudioPlayerDock`)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [▶/⏸] [⏮ 15s] [⏭ 15s] │ 03:24 ━━━━━●──────────────────────── 48:15 │ "Bhagavad Gita — Ch. 3" · Guruji │ [1.0x] [🔊] [✕] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
* **Position:** Fixed to bottom of viewport (`bottom: 0`, `z-index: 1000`).
* **Surface:** Dark Walnut (`#1E1916`) with 1px top border in antique brass (`#C5A059`).
* **Controls:**
  * Large circular play/pause button (40px) in terracotta saffron.
  * Scrub Bar: 4px height with smooth gold thumb drag.
  * Speed Selector: Pill selector toggling `0.75x`, `1.0x`, `1.25x`, `1.5x`.
* **Mobile Collapse:** On mobile screens (<768px), compacts to a 54px mini-bar with play/pause, track title marquee, and expandable full-sheet drawer.

---

## 6. Global Footer Layout

* **Surface:** Deep Midnight Walnut (`#1E1916`), text in warm sand (`#FAF6EE`).
* **Top Accent:** 2px continuous antique brass divider (`#C5A059`).
* **Column Structure:** 4 balanced editorial columns (About & Mission, Sacred Teachings, Digital Publications, Connect & Seva).
* **Newsletter Bar:** Centered high-contrast email subscription form with clear privacy disclosure.
* **Copyright & Governance:** Official attribution to Vedanta Mission / Vedanta Parayan Samiti Trust; zero third-party developer watermarks.
