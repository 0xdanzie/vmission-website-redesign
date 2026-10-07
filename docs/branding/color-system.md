# COLOR SYSTEM SPECIFICATION (REFINED BHAGWA BASELINE)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D.6 — Bhagwa Brand Refinement + Final Visual System Freeze  
**Date:** 2026-09-05  
**Status:** REFINED & FROZEN — PENDING FINAL APPROVAL GATE (PLANNING SPECIFICATION ONLY)  
**Accessibility Standard:** Strict WCAG 2.1 Level AA / AAA Compliance.

---

## 1. Executive Color Philosophy: Sacred Bhagwa Anchor

The visual identity of Vedanta Mission / Vedanta Ashram, Indore is anchored in **Bhagwa (Saffron / Gerua)**, the ancient symbol of Sannyasa, spiritual radiance (*Tejas*), and Vedic truth (*Satya*). 

Rather than treating saffron as a hesitant accent (<6%), the refined system elevates Bhagwa as the **primary spiritual brand anchor**, surrounded by a calm, dignified architectural palette:

* **Bhagwa (Saffron):** Spiritual identity, sacred authority, interactive focus, active states.
* **Warm Ivory:** Wisdom, sacred palm-leaf parchment, unhurried reading calm (*Swadhyaya*).
* **Deep Ashram Green:** Nature, sacred Bilva and Banyan groves, ashram peace, grounding.
* **Dark Walnut:** Philosophical scholarship, ink of the Acharyas, institutional weight.
* **Antique Brass:** Consecrated temple diya glow, sacred 1px rules, refined emblems.

---

## 2. Calibrated Bhagwa Color Family

| Token Name | HEX Code | Swatch & Name | Intended Use | Contrast on Ivory (`#FDFBF7`) | Contrast with White Text |
|---|---|---|---|:---:|:---:|
| `--vm-bhagwa-50` | `#FDF6F0` | **Dawn Mist** | Active card backgrounds, selected row tint | 1.05:1 (Background) | N/A |
| `--vm-bhagwa-100` | `#FCE8DB` | **Keshari Cream** | Filter pill hover, secondary pill backgrounds | 1.18:1 (Background) | N/A |
| `--vm-bhagwa-200` | `#F8D0B8` | **Gentle Saffron** | Selected container borders, divider accents | 1.45:1 (Graphic border) | N/A |
| `--vm-bhagwa-300` | `#F2A97B` | **Morning Sun** | Subtle iconography, disabled button tint | 2.05:1 (Non-text) | N/A |
| `--vm-bhagwa-500` | `#E06328` | **Sacred Bhagwa (PRIMARY)** | Brand mark, eyebrow badges, hero accents | 3.2:1 (Large text / UI) | 3.5:1 (Large UI bold) |
| `--vm-bhagwa-600` | `#C84E17` | **Deep Gerua (CTA FILL)** | Primary interactive buttons, active tabs | **4.6:1 (Passes AA)** | **4.55:1 (Passes AA)** |
| `--vm-bhagwa-700` | `#A73C0E` | **Sacred Ochre (TEXT)** | High-contrast text links, section headings | **6.2:1 (Passes AAA)** | 5.8:1 (Dark surface text)|
| `--vm-bhagwa-900` | `#5F1E05` | **Sannyasi Umber** | Deep grounding border, dark surface accent | **11.4:1 (Passes AAA)**| 12.1:1 (White text AAA) |

*Key Technical Decision:* **`--vm-bhagwa-500` (`#E06328`)** serves as the luminous visual brand anchor, while **`--vm-bhagwa-600` (`#C84E17`)** is specified for all primary button fills to achieve strict WCAG AA contrast (4.55:1) with pure white text. Text links on light surfaces utilize **`--vm-bhagwa-700` (`#A73C0E`)** (6.2:1 AAA).

---

## 3. Supporting Palette Families

### 3.1 Warm Ivory & Sandalwood Surfaces (60% Total Area)
* `--vm-bg-ivory`: `#FDFBF7` — Default page canvas. Warm, manuscript-inspired, zero glare.
* `--vm-bg-surface`: `#FFFFFF` — Pure white content cards, reader pages, modals.
* `--vm-bg-sand`: `#FAF6EE` — Soft natural sand for alternating section bands.
* `--vm-bg-sandalwood`: `#F5EDE0` — Aged sandalwood for quote boxes and audio player insets.

### 3.2 Deep Ashram Green (5% Area — Nature & Ashram Grounds)
* `--vm-green-bilva`: `#2D4F38` — Muted deep neem/banyan green. Grounding accent (7.8:1 AAA on Ivory).
* `--vm-green-wash`: `#EBF2ED` — Delicate herbal leaf tint for environmental tags.

### 3.3 Dark Walnut Typography & Institutional Surfaces (20% Area)
* `--vm-walnut-dark`: `#1E1916` — Midnight Walnut. Header bar, audio dock, institutional footer (14.2:1 AAA).
* `--vm-walnut-surface`: `#28221E` — Elevated dark surface inside mobile drawer and modals.
* `--vm-text-primary`: `#221D1A` — Deep scholar's ink for primary reading (13.8:1 AAA).
* `--vm-text-muted`: `#574F47` — Secondary metadata, timestamps, author titles (7.1:1 AAA).
* `--vm-text-inverse`: `#FAF6EE` — High-legibility text on dark surfaces (13.5:1 AAA).

### 3.4 Antique Temple Brass (2–3% Area — Sacred Filigree)
* `--vm-brass-accent`: `#C5A059` — Consecrated diya brass for 1px hairline rules, crest linework.
* `--vm-brass-deep`: `#957530` — Aged bronze for accessible gold text and icons (4.8:1 AA on Ivory).

### 3.5 Semantic Status Colors
* `--vm-status-success`: `#276738` (Bilva Leaf Green)
* `--vm-status-warning`: `#B86B12` (Turmeric Ochre)
* `--vm-status-error`: `#B3261E` (Vermilion Red)
* `--vm-status-info`: `#2B5C7D` (Ganga River Blue)

---

## 4. Recommended Surface Area Distribution

```
┌────────────────────────────────────────────────────────┐
│  Warm Temple Ivory & Sandalwood (60%)                   │  Reading Calm & Space
├──────────────────────────────┬─────────────────────────┤
│  Dark Walnut (20%)           │  Bhagwa / Saffron (15%) │  Authority + Spiritual Anchor
├──────────────────────────────┴───┬─────────────────────┤
│  Deep Ashram Green (3%)          │ Antique Brass (2%)  │  Nature + Sacred Detail
└──────────────────────────────────┴─────────────────────┘
```

This ratio prevents "orange noise" while making the Bhagwa identity unmistakable upon first glance.
 flow.
