# PHASE 3B.0 — DUPLICATE REGISTER & CONSOLIDATION SPECIFICATION
## Vedanta Mission / Vedanta Ashram, Indore
**Phase:** 3B.0 — Content Reconciliation + Master Migration Baseline  
**Date:** 7 September 2026  
**Status:** COMPLETE DUPLICATE AUDIT & RESOLUTION SPECIFICATION  
**Governing Rule:** NO DUPLICATE CONTENT MAY BE MIGRATED AS INDEPENDENT PRODUCTION CODE  

---

## 1. Executive Summary

Over more than two decades of organic maintenance across legacy WordPress installations, multiple audio plugins, and external cloud repositories, the old V-Mission web presence accumulated significant redundancy. 

This register isolates **every discovered duplicate item** across:
1. Navigation hierarchies
2. Content pages & sub-pages
3. Teaching categories
4. Audio discourse records
5. Publications & periodicals
6. Ashram physical descriptions
7. Trust & governance records
8. Founder & Acharya biographical content
9. Events & shivirs
10. PDFs & Sanskrit scriptural texts
11. External resource links and mirrors

For every item, this document specifies the **duplicate instance**, the **single canonical item**, the **authoritative reason for consolidation**, and the **final destination** in the approved Next.js architecture.

---

## 2. Duplicate Register

| Duplicate Ref | Duplicate Item | Canonical Item | Reason for Consolidation | Final Destination |
|---|---|---|---|---|
| **DUP-NAV-01** | Nav item "Gita Chanting" (`/chanting/`) under Audio/Video menu. | Nav item "Chanting & Bhajans" (`/chanting/`). | Both navigation links targeted the exact same URL (`/chanting/`), confusing users with duplicate labels. | Unified `/teachings?category=chanting`. Sub-filter handles Chanting. |
| **DUP-NAV-02** | Top-level main menu item "Parivar" (`/ashram_parivar/`). | Sub-menu item "Parivar" under "Ashram" (`/ashram_parivar/`). | "Parivar" was exposed simultaneously as a top-level menu link and an Ashram sub-link. | Consolidated in-page section `/ashram#parivar`. Top-level link eliminated. |
| **DUP-PAGE-01** | Standalone page "Vision" (`/vision/`). | Unified About page (`/about`). | "Vision" contained mission statements that naturally form Chapter 1 of the institutional story. | Section `/about#vision`. 301 redirect from `/vision/`. |
| **DUP-PAGE-02** | Standalone page "Org" (`/org/`). | Unified About page (`/about`). | "Org" was redundant administrative overview content that belongs under organizational governance. | Section `/about#governance`. 301 redirect from `/org/`. |
| **DUP-PAGE-03** | Menu parent "Our Trusts" (`/our-trusts/`). | Trusts & Governance section of About (`/about#trusts`). | Empty/thin container page serving solely as a menu header on WordPress. | Section `/about#trusts`. 301 redirect from `/our-trusts/`. |
| **DUP-PAGE-04** | Sub-page "VPST @ Indore" (`/vpst-at-indore/`). | Dedicated Trust profile on About + Donate. | Legal history belongs on About; financial banking details belong exclusively on Donate. | Narrative to `/about#trusts`; financial to `/donate`. 301 redirect from `/vpst-at-indore/`. |
| **DUP-PAGE-05** | Standalone page "Ashram Introduction" (`/introduction/`). | Consolidated Ashram hub (`/ashram`). | Redundant introductory text that fragmented the physical ashram presentation. | Top section `/ashram#about`. 301 redirect from `/introduction/`. |
| **DUP-PAGE-06** | Standalone page "Donation For" (`/donation-for/`). | Dedicated Seva Causes section of Donate. | Separate causes page divided the donation flow across multiple URLs. | In-page section `/donate#purposes`. 301 redirect from `/donation-for/`. |
| **DUP-PAGE-07** | Programs parent "Progs" (`/progs/`). | Unified Events page (`/events`). | Thin WordPress parent container with abbreviated label. | Unified `/events` portal. 301 redirect from `/progs/`. |
| **DUP-HUB-01** | Standalone page "VM Audios" (`/vm-audios/`). | Unified `/teachings` media library (`?type=audio`). | Fragmented audio portal. Next.js library handles audio filtration seamlessly in one place. | Filtered route `/teachings?type=audio`. 301 redirect from `/vm-audios/`. |
| **DUP-HUB-02** | Standalone page "VM Videos" (`/vm-videos-2/`). | Unified `/teachings` media library (`?type=video`). | Fragmented video portal. Next.js library handles video filtration seamlessly in one place. | Filtered route `/teachings?type=video`. 301 redirect from `/vm-videos-2/`. |
| **DUP-HUB-03** | Standalone page "Prakarana Granth" (`/prakarana-granth/`). | Category filter in `/teachings` (`?category=prakarana-granth`). | Intermediate hub page with no independent content beyond listing treatises. | Filtered route `/teachings?category=prakarana-granth`. 301 redirect from `/prakarana-granth/`. |
| **DUP-HUB-04** | Standalone page "E-Books" (`/e-books/`). | Publications library E-Books tab (`/publications?type=ebook`). | Legacy container page. Unified publications library provides tabbed navigation across all literary formats. | Filtered route `/publications?type=ebook`. 301 redirect from `/e-books/`. |
| **DUP-CAT-01** | Audio category "Gita Pravachans" vs Video playlists for Gita. | Unified canonical category `bhagavad-gita`. | Audio and video discourses on Bhagavad Gita were split into separate silos. | Unified `/teachings?category=bhagavad-gita` with Audio/Video format toggles. |
| **DUP-CAT-02** | Audio category "Drig Drushya Viveka" vs "Atma-bodha Lessons". | Unified canonical category `prakarana-granth`. | Individual treatises were listed as top-level menu categories rather than grouped by scriptural taxonomy. | Filter `/teachings?category=prakarana-granth` with individual scripture tagging. |
| **DUP-CAT-03** | "Hanuman Chalisa Talks" & "Sundarkand Talks" separate categories. | Unified canonical category `devotional`. | Individual devotional texts were exposed as standalone categories, bloating the menu. | Category `/teachings?category=devotional` with text badges. |
| **DUP-TXT-01** | Legacy sub-page "Vishnu Sahasranaam" (`/vishnu-sahasranaam/`). | Sanskrit Study Text record `PUB-TXT-VISH` (`LS2rtalK`). | Old sub-page pointed to the identical sacred text as the e-book listing. | Single publication card in `/publications?type=texts`. 301 redirect from `/vishnu-sahasranaam/`. |
| **DUP-TXT-02** | Atma-bodha Sanskrit root text (`fc4`) vs Atma-bodha audio series (`/atmabodha-talks/`). | Cross-referenced independent records (`PUB-TXT-ATMA` & `AUD-PRAK-ATMA`). | Complementary media for the same treatise. Must link to each other rather than being isolated. | Text in `/publications`; audio in `/teachings`; cross-linked via `scripture: "Atma-bodha"`. |
| **DUP-TXT-03** | Tattva Bodha root text (`bXF7`) vs Tattva Bodha online course. | Cross-referenced independent records (`PUB-TXT-TATT` & `learn/tattva-bodha`). | Text PDF serves as the study companion to the online course. | Text in `/publications`; course in `/learn`; mutual cross-referencing. |
| **DUP-MIR-01** | Multi-mirror publication links (Archive Flip, Archive PDF, GDrive, Box, pCloud, pubhtml5) for Sandesh issues. | Canonical Archive.org record with secondary mirror array in metadata. | Legacy page displayed 6 separate links per issue, cluttering the interface. | Single publication card in `/publications` with primary Archive.org button and "Other Mirrors" modal. |
| **DUP-FIN-01** | Bank account details displayed on `/donate`, `/vpst-at-indore/`, and home footer. | Canonical financial record in `src/data/` rendered exclusively via `/donate`. | Scrambled banking info across multiple pages creates inconsistency and update hazards. | Single source of truth rendered on `/donate`. Footer links to `/donate` rather than printing raw bank numbers. |
| **DUP-FIN-02** | Five distinct individual UPI IDs (Trust, Guruji, Swamini Amitananda, Swamini Samatananda, Swamini Poornananda). | Official Trust UPI handle (`vedantaparmarthicsew.65038308@hdfcbank`). | Devotees risk sending institutional seva to personal accounts without clear attribution. | Trust UPI is canonical. Individual handles suppressed pending explicit client instruction. |
| **DUP-CRS-01** | "3-Year Full-Time Gurukula Course (Free)" vs "12-Month Residential Gita Course (Rs 25,000/mo)". | Gated under Client Verification (`VR-17`). | Direct conflict in source documentation regarding fees and duration of residential study. | Stored in `courses.ts` with strict `VERIFY` status. Displayed only after client resolves policy. |
| **DUP-EVT-01** | Duplicate festival listings across events page, donation page, and daily routine. | Canonical recurring annual events in `src/data/events.ts`. | Guru Poornima and Shivratri were described with varying times and descriptions across 3 pages. | Single canonical event definition referenced across `/events` and `/ashram`. |
| **DUP-BIO-01** | Poojya Guruji biographical snippets in homepage Ch 4, `/about`, `/acharyas`, and old `/guruji/`. | Canonical biography entity in `src/data/acharyas.ts` (`swami-atmananda-saraswati`). | Multiple inconsistent biographical summaries with differing tone and detail level. | Detailed bio on `/acharyas/swami-atmananda-saraswati`; concise editorial excerpt on homepage Ch 4. |

---

## 3. Consolidation Rules for Phase 3 Implementation

1. **Zero Data Object Duplication:** No two records in `src/data/*.ts` may share identical target media or download URLs unless explicitly marked as related cross-format assets (e.g., text PDF + audio discourse).
2. **Deterministic Routing:** Every legacy URL in the duplicate register MUST be mapped to its single canonical destination in `docs/migration/PHASE-3B0-ROUTE-MAPPING.md` and eventually configured as an HTTP 301 redirect.
3. **Suppression of Redundant Mirrors:** In user interfaces, never show 6 buttons for one magazine. Display one prominent canonical download button (Archive.org) with auxiliary links tucked into an accessible dropdown or modal.
4. **Institutional Seva Unification:** All donation, seva, bank account, and UPI references must route to `/donate`. No raw bank account numbers may be printed on informational or biographical pages.
