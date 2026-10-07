# RESOURCE DUPLICATE REGISTER & CONSOLIDATION SPECIFICATION
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** COMPLETE DUPLICATE ANALYSIS — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Builds on Phase 2A (`MIGRATION-DECISION-MATRIX.md`, Section N).

---

## 1. Executive Summary

Over years of legacy WordPress maintenance, the old V-Mission site accumulated redundant navigation entries, overlapping content sub-pages, split media hubs, and multi-mirror publication links. 

This register documents every verified duplicate, designates the **single canonical destination** in the redesigned Next.js platform, and defines how legacy URLs will be preserved via 301 redirects.

---

## 2. Duplicate Analysis & Canonical Designations

### 2.1 Navigation & Category Duplicates

| Duplicate Ref | Redundant / Secondary Instances | Primary Canonical Resource | Architectural Resolution | 301 Redirect Handling |
|---|---|---|---|---|
| **DUP-01** | `vmission.org.in/chanting/` labeled as **"Gita Chanting"** in Audio sub-menu. | `vmission.org.in/chanting/` labeled as **"Chanting & Bhajans"**. | Consolidate into single canonical category `chanting` in `/teachings`. Eliminate redundant "Gita Chanting" navigation label. | `/chanting/` permanently redirects to `/teachings?category=chanting`. |
| **DUP-02** | Top-level menu item **"Parivar"** (`vmission.org.in/ashram_parivar/`). | Ashram sub-menu item **"Parivar"** (`vmission.org.in/ashram_parivar/`). | Eliminate top-level navigation entry. Retain "Ashram Parivar" as an in-page section (`/ashram#parivar`). | Legacy `/ashram_parivar/` permanently redirects to `/ashram#parivar`. |
| **DUP-03** | Standalone hub page **"VM Audios"** (`vmission.org.in/vm-audios/`). | Unified `/teachings` media library. | Standalone hub is decommissioned. The library interface handles category filtering natively. | `/vm-audios/` permanently redirects to `/teachings?type=audio`. |
| **DUP-04** | Standalone hub page **"VM Videos"** (`vmission.org.in/vm-videos-2/`). | Unified `/teachings` media library. | Standalone video page decommissioned. Videos are integrated into `/teachings` under the "Video" type filter. | `/vm-videos-2/` permanently redirects to `/teachings?type=video`. |

---

### 2.2 Institutional & Organizational Page Duplicates

| Duplicate Ref | Redundant / Secondary Instances | Primary Canonical Resource | Architectural Resolution | 301 Redirect Handling |
|---|---|---|---|---|
| **DUP-05** | **"Ashram Introduction"** (`vmission.org.in/introduction/`). | Main **"Ashram"** page (`vmission.org.in/ashram/`). | Consolidate introduction into the top hero and overview section of `/ashram`. | `/introduction/` permanently redirects to `/ashram#about`. |
| **DUP-06** | **"Org Overview"** (`vmission.org.in/org/`) and sub-items. | Unified **"About"** hub (`/about`). | "Org" was sterile corporate shorthand. All mission, vision, and governance content is absorbed into `/about`. | `/org/` permanently redirects to `/about`. |
| **DUP-07** | **"Vision"** (`/vision/`) and **"About Us"** (`/about-us/`). | Unified **"About"** page (`/about`). | Merged into single vision and mission statement on `/about#vision`. | Both `/vision/` and `/about-us/` redirect to `/about`. |
| **DUP-08** | **"VPST @ Indore"** page (`/vpst-at-indore/`) duplicate banking text. | Dedicated **"Donate"** hub (`/donate`). | Legal trust history belongs in `/about#trusts`; verified banking and payment methods belong exclusively in `/donate`. | `/vpst-at-indore/` redirects to `/about#trusts`. |

---

### 2.3 Publication & Text Duplicates

| Duplicate Ref | Redundant / Secondary Instances | Primary Canonical Resource | Architectural Resolution | 301 Redirect Handling |
|---|---|---|---|---|
| **DUP-09** | **Vishnu Sahasranaam sub-page** (`/vishnu-sahasranaam/`). | **Vishnu Sahasranama Vyakhya PDF** (`PUB-TXT-VISH`). | The sub-page on the old site points to the same sacred text. Consolidate into a single publication record in `/publications`. | `/vishnu-sahasranaam/` permanently redirects to `/publications?type=texts`. |
| **DUP-10** | **Multi-Mirror Publication Links:** Each Sandesh issue had 6 redundant links (Archive Flip, Archive PDF, GDrive, Box, pCloud, pubhtml5). | Canonical **Archive.org Download & Viewer** with fallback mirrors. | Single publication card in `/publications` with one primary download button and secondary mirror options. | Direct links preserved in metadata schema array (`mirrors[]`). |

---

## 3. Consolidation Benefits
1. **Zero Devotee Confusion:** Visitors never encounter two links with different names leading to identical content.
2. **SEO Backlink Consolidation:** PageRank and external backlinks scattered across 6 WordPress URLs are funneled into high-authority canonical Next.js routes.
3. **Clean Codebase:** Elimination of duplicated data objects in `src/data/` schemas.
