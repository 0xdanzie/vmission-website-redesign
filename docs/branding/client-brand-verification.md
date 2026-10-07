# CLIENT BRAND VERIFICATION REGISTER
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2D.6 — Bhagwa Brand Refinement + Final Visual System Freeze (Reconciled)
**Date:** 2026-09-05 (Reconciled from Phase 2D original dated 2026-09-04)
**Status:** RECONCILED & FROZEN — PENDING CLIENT / SIR APPROVAL GATE (PLANNING ONLY)
**Authoritative Basis:** `PHASE-2D6-BHAGWA-BRAND-REFINEMENT.md` (final visual authority). Supersedes Phase 2D version of this register.

> **RECONCILIATION NOTE (Phase 2D.7):** BVR-02 has been updated from "Terracotta Saffron `#D95D39`" (Phase 2D intermediate) to the active Bhagwa-led palette. BVR-03 has been updated from `Fraunces` / `Inter` (Phase 2D intermediate) to the active 3-family typography system. The old values are retired; they are documented in `PHASE-2D6-BHAGWA-BRAND-REFINEMENT.md` §6 as retired candidates with rationale.

---

## 1. Executive Summary

To ensure complete institutional alignment, every proposed brand asset, color choice, typographic family, and naming convention is classified below into:
* **VERIFIED:** Existing confirmed asset from project source material.
* **PROPOSED:** Architectural design recommendation.
* **CLIENT APPROVAL REQUIRED:** Explicit sign-off required prior to production deployment.

---

## 2. Brand Verification Register

| Ref ID | Brand Element | Current Project State | Proposed Direction | Classification | Client Action Required |
|:---:|---|---|---|:---:|---|
| **BVR-01** | **Primary Logo Artwork** | Prototype uses SVG Om crest in `BrandLogo.tsx` | Sacred circular crest with 8-ray Jyoti and Om, paired with serif wordmark | **PROPOSED** | Confirm if this crest is approved or if an official registered trust seal must be used. |
| **BVR-02** | **Primary Brand Colors** | Prototype uses old terracotta `#D95D39` (retired) | Bhagwa-led Gurukula palette: Primary Bhagwa `#E06328`, Deep Gerua CTA `#C84E17`, Sacred Ochre text `#A73C0E`, Warm Temple Ivory `#FDFBF7`, Midnight Walnut `#1E1916`, Bilva Green `#2D4F38`, Antique Brass `#C5A059` | **PROPOSED** | Formally approve the Bhagwa-led palette for production. See `color-system.md` and `PHASE-2D6-BHAGWA-BRAND-REFINEMENT.md` §5. |
| **BVR-03** | **Typography Families** | Prototype imports Fraunces, Cormorant Garamond, Inter (Fraunces & Inter are retired) | 3-Family System: Display/Headings: `Cormorant Garamond`; Body/UI/Navigation: `Plus Jakarta Sans`; Sanskrit/Hindi: `Noto Serif Devanagari` | **PROPOSED** | Approve the 3-family typographic system for public site. See `typography-system.md`. |
| **BVR-04** | **Organization Naming** | Mixed: Vedanta Mission vs. Vedanta Ashram | Primary: "Vedanta Mission", Subtitle: "Vedanta Ashram, Indore" | **PROPOSED** | Confirm exact naming hierarchy for header and legal documents. |
| **BVR-05** | **Acharya Portraits** | Good Guruji portrait exists; Swamini portraits are 300x280 cutouts | Fresh high-resolution natural portraits for Swaminijis | **CLIENT APPROVAL REQUIRED** | Supply high-resolution approved portraits for all four Acharyas. |
| **BVR-06** | **Ashram Architecture Photos** | Excellent real photos in `public/images/vmission/` | High-res showcase of Gangeshwar Mahadev dome, sanctum doors, and courtyard | **VERIFIED** | Confirm if any newly renovated spaces need inclusion. |
| **BVR-07** | **YouTube Channel Identity** | 7 verified playlist IDs; channel URL not in HTML | Embed confirmed playlists under unified Teachings library | **CLIENT APPROVAL REQUIRED** | Confirm official YouTube channel link and channel display name. |
| **BVR-08** | **Social Media Presence** | WhatsApp confirmed; other social accounts unverified | Only display officially monitored social accounts | **CLIENT APPROVAL REQUIRED** | Confirm if official Facebook, X, or Instagram accounts exist. |
| **BVR-09** | **Seva Button Nomenclature** | Prototype uses "Donate / Seva" | Proposed header CTA: `Donate / Seva` or `Donate` | **PROPOSED** | Client to designate preferred term (`Donate` vs `Donate / Seva` vs `Seva`). |
| **BVR-10** | **Publication Branding** | Original cover styles for Sandesh & E-Books | Maintain original cover artwork with realistic paper shadow in reader | **VERIFIED** | Supply high-resolution master cover files for future issues. |

---

## 3. Brand Sign-Off Process for Phase 3
Prior to initiating Phase 3 implementation, the client review gate will review `PHASE-2-FINAL-APPROVAL-PACKAGE.md` as the single approval-facing document, supported by `PHASE-2D6-BHAGWA-BRAND-REFINEMENT.md` as the visual source of truth. Once approved, the design token dictionary in `design-tokens.md` will be transferred directly into Next.js `globals.css`.
