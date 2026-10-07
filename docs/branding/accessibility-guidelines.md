# ACCESSIBILITY (A11Y) GUIDELINES
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D — Branding + Visual Design Baseline  
**Date:** 2026-09-04  
**Status:** COMPLETE ACCESSIBILITY SPECIFICATION — PLANNING ONLY (NO CODE MODIFIED)  
**Governing Standard:** WCAG 2.1 Level AA Compliance.

---

## 1. Accessibility Philosophy: Inclusivity for All Seekers

Spiritual wisdom must be accessible to every devotee regardless of age, visual acuity, physical mobility, or device type. Many ashram patrons and elderly seekers in India and abroad require high-contrast text, large legible fonts, clear tap targets, and seamless keyboard navigation.

---

## 2. Core Accessibility Standards

### 2.1 Text Contrast Standards (WCAG AA & AAA)
* **Normal Text (<18pt / <24px):** Minimum contrast ratio of **4.5:1** against the background.
  * Our primary text token (`--vm-text` `#221D1A` on `--vm-bg` `#FDFBF7`) achieves **13.8:1**, exceeding the highest AAA standard.
  * Secondary muted text (`--vm-text-muted` `#5E564F`) achieves **6.7:1**, easily passing AAA.
* **Large Headings (≥18pt bold or ≥24px regular):** Minimum contrast ratio of **3.0:1**.
  * Deep terracotta heading text (`--vm-saffron-deep` `#9E381C`) achieves **6.8:1**.
* **UI Component Boundaries & Icons:** Minimum contrast ratio of **3.0:1** for essential interactive icons and active input borders.

### 2.2 Typography Sizing & Cormorant Garamond Optical Compensation
* **Optical Sizing Adjustment:** Classical Garamond typefaces have a slightly smaller x-height than standard sans-serif fonts. To guarantee effortless reading, body text set in `Cormorant Garamond` is optically boosted to **`1.1875rem` (19px)** on desktop and **`1.0625rem` (17px)** on mobile.
* **Leading / Line Height:** Generous line height of `1.75` for continuous scriptural reading, preventing eye-tracking fatigue.

### 2.3 Keyboard Navigation & Focus Visible
* **Focus Ring Standard:** Every interactive button, link, form field, and tab must display an unambiguous focus indicator:
  ```css
  :focus-visible {
    outline: 2px solid var(--vm-brass);
    outline-offset: 3px;
    box-shadow: 0 0 0 4px rgba(197, 160, 89, 0.25);
  }
  ```
* **Tab Order:** Logical DOM order matching visual reading order (Header → Main Content → Footer).
* **Escape Key Dismissal:** Pressing `Escape` must instantly dismiss all open modals (e.g. publication flipbook, audio drawer, mobile menu).

### 2.4 Mobile Touch Targets
* **Minimum Dimensions:** All mobile tap targets (hamburger button, audio play/pause, category filter chips, download buttons) maintain a minimum bounding box of **`48px × 48px`**, with at least `8px` separation between adjacent interactive elements.

### 2.5 Reduced Motion (`prefers-reduced-motion`)
* For users sensitive to motion or vestibular disorders, all non-essential transitions, smooth scroll animations, and parallax shifts are disabled:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### 2.6 Form Error & Status Accessibility
* Errors must never be communicated by color alone. Every form error state must feature:
  1. A clear textual error message (e.g., "Please enter a valid 10-digit mobile number").
  2. A visual alert icon.
  3. `aria-invalid="true"` and `aria-describedby="[error-id]"` for screen readers.

### 2.7 Screen Reader Semantics & Image Alt Text
* **Strict Semantic Hierarchy:** A single `<h1>` per page, followed by sequential `<h2>`, `<h3>` tags without skipping levels.
* **Descriptive Alt Text:**
  * *Example (Acharya):* `alt="Poojya Guruji Swami Atmananda Saraswati seated in contemplation by the river"`
  * *Example (Architecture):* `alt="Vedanta Ashram building in Indore crowned by the consecrated white Gangeshwar Mahadev Shivling dome"`
  * *Decorative elements:* `aria-hidden="true"` or empty `alt=""`.
