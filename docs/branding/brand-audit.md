# BRAND IDENTITY AUDIT
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D — Branding + Visual Design Baseline  
**Date:** 2026-09-04  
**Status:** COMPLETE AUDIT REPORT — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Synthesizes findings from Phase 1, Phase 2A, Phase 2B.5, and prototype codebase assets.

---

## 1. Executive Summary

This audit establishes the baseline of verified institutional brand elements versus proposed design directions. It ensures that the visual identity reflects the genuine Advaita Vedanta lineage of H.H. Swami Atmananda Saraswati and the sacred physical presence of Vedanta Ashram, Indore, without introducing generic corporate or unverified religious tropes.

---

## 2. Organization Naming Hierarchy

Evidence across the legacy WordPress website, legal documents, donation records, and prototype reveals a multi-tiered naming convention:

| Level | Brand / Entity Expression | Source Evidence | Architectural Usage in Redesign | Status |
|---|---|---|---|---|
| **Primary Institutional Identity** | **Vedanta Mission** | Old site header, domain (`vmission.org.in`), publications | Primary brand wordmark across header, metadata, and communications | **VERIFIED** |
| **Physical Sanctuary & Seat** | **Vedanta Ashram, Indore** | Facade signage ("वेदान्त आश्रम"), postal address, WhatsApp | Subtitle / physical anchor on logo, footer, and `/ashram` | **VERIFIED** |
| **Governing Legal Trust** | **Vedanta Parayan Samiti Trust (VPST)** | Old donation page, legal records | Legal governance, tax exemptions (80-G), and receipt issuance | **NEEDS CLIENT CONFIRMATION** |
| **Associated Charitable Initiative** | **Indore Cancer Foundation (ICF)** | Old site `/icf-at-mumbai/` sub-page | Referenced under `/about#trusts` as a charitable partner | **NEEDS CLIENT CONFIRMATION** |
| **Colloquial / Devotee Shorthand** | **V-Mission** | Old audio/video URLs (`/vm-audios/`, `/vm-videos-2/`) | Informal project abbreviation; avoided in formal UI typography | **INTERNAL CONTEXT** |

---

## 3. Brand Identity Classification: Verified vs. Proposed vs. Client-Gated

### 3.1 Verified Brand Assets (Supported by Project Evidence)
1. **Sacred Motto / Tagline:** *"Spreading Love & Light by revealing the basic oneness of all"* (Confirmed on live homepage HTML, prototype header, and social messages).
2. **Physical Ashram Architectural Anchor:** Gangeshwar Mahadev (Shivling) dome consecrated on the roof of Vedanta Ashram, Indore; terracotta facade; carved wooden sanctum doors.
3. **Monastic Lineage:** Disciples of Adi Shankaracharya tradition under the guidance of H.H. Swami Atmananda Saraswati (Guruji), alongside Swamini Amitananda, Swamini Poornananda, and Swamini Samatananda.
4. **Official Flagship Periodicals:** *Vedanta Sandesh* (English monthly e-zine) and *Vedanta Piyush* (Hindi monthly e-zine).
5. **Real Ashram Photography:** High-resolution photographic assets verified in `public/images/vmission/` (facade, riverside Guruji portrait, sanctum doors, pravachan hall).

### 3.2 Proposed Design Direction (Architectural Recommendations)
1. **Logo Treatment:** Circular sacred crest combining an outer aura ring, 8-ray Jyoti (Light of Knowledge), inner sanctuary circle, and central Devanagari Om (`ॐ`), paired with serif wordmark "VEDANTA MISSION" and subtitle "INDORE · CENTRAL INDIA".
2. **Color Palette:** Warm temple ivory (`#FDFBF7`), aged sandalwood (`#F5EDE0`), muted terracotta saffron (`#D95D39`), antique temple brass (`#C5A059`), and deep walnut text (`#221D1A`).
3. **Typography Pairing:** Editorial display serif (`Fraunces`), classical manuscript serif (`Cormorant Garamond`), and clean modern sans (`Inter`).
4. **Card & Reader UX:** Floating cards with warm brass glow on hover, docked persistent audio player, and in-browser flipbook preview modal.

### 3.3 Client Verification Required (Strictly Gated)
1. **Official Registered Logo:** Confirmation whether an official registered seal or vector trademark exists for Vedanta Mission / VPST.
2. **Legal Trust Name on Receipts:** Verification whether the exact name on bank accounts is "Vedanta Parayan Samiti Trust" or "Vedanta Parmarthik Sewa Trust".
3. **Approved Acharya Lineage Titles:** Exact formal prefix titles (e.g. *Poojya Guruji Swami Atmananda Saraswati* vs. *H.H. Swami Atmananda Saraswati*).
4. **Official Primary Brand Colors:** Sign-off on whether the terracotta-saffron and antique-gold palette is officially sanctioned.

---

## 4. Legacy Branding Anti-Patterns Identified

The audit identified several legacy branding deficiencies that must NOT be carried over:
* **Informal Abbreviations:** Menu items like `Progs`, `Pdf`, `VM Audios`, `VM Videos` degraded institutional dignity.
* **Orphaned Corporate Shorthand:** Using `Org` in navigation sounded like an administrative NGO rather than an authentic spiritual ashram.
* **Developer Watermarking:** Outdated developer credit links (`acrosoftwts.com`) in footer.
* **Low-Resolution Small Cutouts:** Small 300x280px cutout portraits of Swaminijis should be upgraded to natural high-resolution portraits upon client supply.
