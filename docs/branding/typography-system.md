# TYPOGRAPHY SYSTEM SPECIFICATION (FINAL RECONCILED BASELINE)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D.6 — Bhagwa Brand Refinement + Final Visual System Freeze  
**Date:** 2026-09-05  
**Status:** FROZEN & LOCKED FOR IMPLEMENTATION GATE (PLANNING SPECIFICATION ONLY)  
**Font Installation Status:** Zero font files or packages installed in Phase 2D.6. Google Font CDN links specified for Phase 3.

---

## 1. Typography Philosophy: Philosophical Scholarship & Digital Poise

Spiritual study (*Swadhyaya*) demands hours of immersive reading of Upanishadic commentaries, Sanskrit shlokas, and editorial e-zines. The typography system resolves previous inconsistencies across Phase 2D and 2D.5 into a **disciplined 3-family hierarchy**:

1. **Sacred Display & Headings:** **`Cormorant Garamond`** *(Google Font)*  
   Classical manuscript serif inspired by Claude Garamont’s 16th-century typography. Provides traditional dignity, reverent proportions, and contemplative warmth.
2. **Contemporary Body, UI & Navigation:** **`Plus Jakarta Sans`** *(Google Font)*  
   Warm geometric humanist sans-serif. Highly legible at small sizes (13-15px), crisp on OLED mobile displays, and visually harmonious with Indian letterforms.
3. **Canonical Devanagari & Sanskrit Mantras:** **`Noto Serif Devanagari`** *(Google Font)*  
   Scholarly open-source Devanagari typeface engineered by Google/Monotype. Delivers flawless conjunct ligatures (संयुक्त अक्षर), matra placement, and authentic Vedic chanting marks without ascender clipping.

### Font Reconciliation Decisions:
* **Retired `Fraunces`:** While expressive, its organic display "softness" felt slightly informal/magazine-like compared to the austere Vedic gravity of `Cormorant Garamond`.
* **Retired `Inter`:** Inter is technologically clean but visually sterile for an Indian ashram. `Plus Jakarta Sans` introduces warm humanist apertures and subtle geometric curves that feel hospitable and contemporary.
* **Retired `Cinzel`:** Uppercase eyebrow tags and section labels are easily rendered in tracked `Plus Jakarta Sans` (`letter-spacing: 0.12em; text-transform: uppercase`), eliminating an unnecessary fourth font request.
* **Retired `Rozha One` / `Mukta`:** `Noto Serif Devanagari` provides the exact serif weight and scholarly poise that matches `Cormorant Garamond` seamlessly.

---

## 2. Typographic Hierarchy & Scale

| Style / Level | Font Family | Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing | Primary Usage |
|---|---|:---:|:---:|:---:|:---:|:---:|---|
| **Display Hero** | `Cormorant Garamond`, serif | 700 | `3.5rem` (56px) | `2.125rem` (34px) | 1.15 | `-0.015em` | Homepage hero entrance headline |
| **Heading 1 (H1)** | `Cormorant Garamond`, serif | 700 | `2.5rem` (40px) | `1.875rem` (30px) | 1.20 | `-0.01em` | Primary page headers (`/teachings`, `/ashram`) |
| **Heading 2 (H2)** | `Cormorant Garamond`, serif | 600 | `1.875rem` (30px) | `1.5rem` (24px) | 1.25 | `-0.005em` | Major section headers, scripture series titles |
| **Heading 3 (H3)** | `Cormorant Garamond`, serif | 600 | `1.375rem` (22px) | `1.25rem` (20px) | 1.30 | `0.0em` | Teaching & publication card titles, modal titles |
| **Eyebrow / Badge** | `Plus Jakarta Sans`, sans-serif | 700 | `0.75rem` (12px) | `0.6875rem` (11px) | 1.20 | `+0.12em` | Section tags, category pills (UPPERCASE) |
| **Lead Paragraph** | `Cormorant Garamond`, serif | 500 (Italic) | `1.25rem` (20px) | `1.125rem` (18px) | 1.65 | `0.01em` | Article introductions, mission statements |
| **Body Text (Primary)**| `Plus Jakarta Sans`, sans-serif | 400 | `1.0rem` (16px) | `0.9375rem` (15px) | 1.65 | `0.0em` | Long-form reading, descriptions, bios, guides |
| **Body Small / Meta** | `Plus Jakarta Sans`, sans-serif | 500 | `0.8125rem` (13px) | `0.8125rem` (13px) | 1.50 | `0.01em` | Duration, track count, date, author subtitle |
| **Sanskrit Shloka** | `Noto Serif Devanagari`, serif | 600 | `1.25rem` (20px) | `1.125rem` (18px) | 1.85 | `0.02em` | Root verses, Upanishadic mantras, invocations |
| **Button / CTA** | `Plus Jakarta Sans`, sans-serif | 600 | `0.9375rem` (15px) | `0.9375rem` (15px) | 1.00 | `+0.02em` | Primary buttons, Donate CTA, interactive tabs |

---

## 3. Special Text Treatments

### 3.1 Sanskrit Scripture & Shloka Block
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥              │
│  "Lead me from the unreal to the real; from darkness to light; from death   │
│   to immortality." — Brihadaranyaka Upanishad (1.3.28)                      │
└─────────────────────────────────────────────────────────────────────────────┘
```
- **Styling:** Centered, set in `Noto Serif Devanagari` (600 weight) with `--vm-bhagwa-700` (`#A73C0E`), bordered top and bottom with 1px Antique Brass dividers (`#C5A05940`), followed by Cormorant Garamond italic English translation.

### 3.2 Long-Form Swadhyaya Reading Mode
- Max line length constrained to `68ch` to prevent eye fatigue.
- Paragraph spacing set to `1.5em` with 16px font size on desktop and 15px on mobile.

