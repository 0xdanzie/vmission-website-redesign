# DESIGN TOKENS SPECIFICATION (REFINED BASELINE)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D.6 — Bhagwa Brand Refinement + Final Visual System Freeze  
**Date:** 2026-09-05  
**Status:** COMPLETE TOKEN SPECIFICATION — PLANNING ONLY (NO CODE MODIFIED)  
**Implementation Note:** These tokens provide the naming dictionary for Phase 3 CSS implementation.

---

## 1. Color Tokens (`color.*`)

```css
/* Surface & Background */
--vm-color-bg-primary:         #FDFBF7; /* Warm Temple Ivory */
--vm-color-bg-surface:         #FFFFFF; /* Pure Card White */
--vm-color-bg-sand:            #FAF6EE; /* Natural Sand */
--vm-color-bg-sandalwood:      #F5EDE0; /* Sandalwood Tint */
--vm-color-bg-dark:            #1E1916; /* Midnight Walnut */
--vm-color-bg-dark-stone:      #28221E; /* Elevated Dark Surface */

/* Calibrated Bhagwa Family (Primary Spiritual Brand Anchor) */
--vm-color-bhagwa-50:          #FDF6F0; /* Dawn Mist Wash */
--vm-color-bhagwa-100:         #FCE8DB; /* Soft Keshari Cream */
--vm-color-bhagwa-200:         #F8D0B8; /* Gentle Saffron Border */
--vm-color-bhagwa-300:         #F2A97B; /* Morning Sun Glow */
--vm-color-bhagwa-500:         #E06328; /* Primary Sacred Bhagwa */
--vm-color-bhagwa-600:         #C84E17; /* Deep Gerua (Primary Button CTA) */
--vm-color-bhagwa-700:         #A73C0E; /* Sacred Ochre (High Contrast Text Link) */
--vm-color-bhagwa-900:         #5F1E05; /* Sannyasi Robe Umber */

/* Supporting Accents */
--vm-color-accent-brass:        #C5A059; /* Antique Temple Brass */
--vm-color-accent-brass-deep:   #957530; /* Aged Temple Bronze */
--vm-color-accent-green:        #2D4F38; /* Deep Bilva Grove Green */
--vm-color-accent-green-light:  #EBF2ED; /* Neem Leaf Wash */

/* Typography Foreground */
--vm-color-text-primary:       #221D1A; /* Dark Walnut Ink (13.8:1 AAA) */
--vm-color-text-muted:         #574F47; /* Charcoal Umber (7.1:1 AAA) */
--vm-color-text-faint:         #8F857B; /* Muted Stone */
--vm-color-text-inverse:       #FAF6EE; /* Sand Ivory on Dark Surfaces */

/* Semantic Status */
--vm-color-status-success:     #276738;
--vm-color-status-success-bg:  #EDF7F0;
--vm-color-status-warning:     #B86B12;
--vm-color-status-warning-bg:  #FEF8ED;
--vm-color-status-error:       #B3261E;
--vm-color-status-error-bg:    #FDF1EF;
--vm-color-status-info:        #2B5C7D;
--vm-color-status-info-bg:     #EEF5F9;
```

---

## 2. Typography Tokens (`type.*`)

```css
/* Font Families (Reconciled 3-Family System) */
--vm-font-display:             'Cormorant Garamond', Georgia, serif;
--vm-font-sans:                'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
--vm-font-sanskrit:            'Noto Serif Devanagari', 'Cormorant Garamond', serif;

/* Font Sizes (Fluid Clamps) */
--vm-type-size-hero:           clamp(2.125rem, 4.0vw, 3.5rem);
--vm-type-size-h1:             clamp(1.875rem, 3.0vw, 2.5rem);
--vm-type-size-h2:             clamp(1.5rem, 2.2vw, 1.875rem);
--vm-type-size-h3:             clamp(1.25rem, 1.6vw, 1.375rem);
--vm-type-size-lead:           clamp(1.125rem, 1.25vw, 1.25rem);
--vm-type-size-body:           1.0rem;    /* 16px */
--vm-type-size-body-sm:        0.9375rem; /* 15px */
--vm-type-size-meta:           0.8125rem; /* 13px */
--vm-type-size-caption:        0.6875rem; /* 11px */

/* Line Heights */
--vm-type-leading-tight:       1.15;
--vm-type-leading-snug:        1.30;
--vm-type-leading-body:        1.70;
--vm-type-leading-relaxed:     1.85;

/* Letter Spacing */
--vm-type-tracking-tight:      -0.02em;
--vm-type-tracking-normal:     0.0em;
--vm-type-tracking-wide:       0.04em;
--vm-type-tracking-widest:     0.08em;
```

---

## 3. Spatial Tokens (`space.*`)

```css
--vm-space-1:  0.25rem; /* 4px */
--vm-space-2:  0.5rem;  /* 8px */
--vm-space-3:  0.75rem; /* 12px */
--vm-space-4:  1.0rem;  /* 16px */
--vm-space-5:  1.25rem; /* 20px */
--vm-space-6:  1.5rem;  /* 24px */
--vm-space-8:  2.0rem;  /* 32px */
--vm-space-10: 2.5rem; /* 40px */
--vm-space-12: 3.0rem; /* 48px */
--vm-space-16: 4.0rem; /* 64px */
--vm-space-20: 5.0rem; /* 80px */
--vm-space-24: 6.0rem; /* 96px */
```

---

## 4. Border & Radius Tokens (`radius.*`, `border.*`)

```css
/* Radii */
--vm-radius-xs: 2px;
--vm-radius-sm: 4px;   /* Tag pills, small buttons */
--vm-radius-md: 6px;   /* Standard buttons, input fields */
--vm-radius-lg: 8px;   /* Content cards, dialog boxes */
--vm-radius-xl: 12px;  /* Hero frames, feature containers */
--vm-radius-full: 9999px; /* Pill buttons, status dots */

/* Borders */
--vm-border-light:   1px solid rgba(197, 160, 89, 0.20);
--vm-border-default: 1px solid rgba(34, 29, 26, 0.12);
--vm-border-strong:  1px solid rgba(34, 29, 26, 0.24);
--vm-border-brass:   1.5px solid #C5A059;
```

---

## 5. Shadow & Glow Tokens (`shadow.*`)

```css
--vm-shadow-xs: 0 1px 3px rgba(34, 29, 26, 0.05);
--vm-shadow-sm: 0 3px 8px rgba(34, 29, 26, 0.06), 0 1px 2px rgba(197, 160, 89, 0.08);
--vm-shadow-md: 0 8px 24px rgba(34, 29, 26, 0.08), 0 2px 6px rgba(197, 160, 89, 0.06);
--vm-shadow-lg: 0 16px 40px rgba(34, 29, 26, 0.12), 0 4px 12px rgba(197, 160, 89, 0.10);
--vm-shadow-brass-glow: 0 0 20px rgba(197, 160, 89, 0.30);
```

---

## 6. Motion Tokens (`motion.*`)

```css
--vm-motion-duration-fast:   150ms;
--vm-motion-duration-normal: 250ms;
--vm-motion-duration-slow:   400ms;
--vm-motion-ease:            cubic-bezier(0.16, 1, 0.3, 1); /* Elegant decelerate */
```
