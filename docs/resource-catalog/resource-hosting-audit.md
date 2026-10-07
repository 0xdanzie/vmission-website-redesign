# RESOURCE HOSTING & INFRASTRUCTURE AUDIT
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** COMPLETE AUDIT REPORT — PLANNING ONLY (NO CODE MODIFIED)  
**Scope:** Systematic evaluation of external cloud hosts, streaming mirrors, domain stability, and link-rot risks.

---

## 1. Executive Summary of Hosting Ecosystem

The legacy V-Mission digital presence relied on a decentralized, heterogeneous mix of third-party cloud hosting services, short links, and self-hosted WordPress media directories.

```text
[V-MISSION HOSTING ECOSYSTEM]
├── Archive.org ─────── Preferred primary mirror for Vedanta Sandesh PDFs & Flipbooks (Low Risk)
├── YouTube ─────────── Primary platform for video pravachan playlists (Low Risk)
├── Google Drive ────── Backup cloud storage for publications (Medium Risk - Access permissions)
├── Box.com ─────────── Hosting Drig Drushya Viveka audio & publication mirrors (Medium Risk)
├── pCloud (u.pc.cd) ── Short links for 8 Sanskrit study texts & monographs (HIGH RISK - Link Rot)
├── pubhtml5 ────────── Supplementary interactive flipbook reader (Medium Risk)
├── WordPress Uploads ─ Local server storage for MP3 files (vmission.org.in/wp-content/uploads/)
└── Malformed / Dead ── http://Sub, acrosoftwts.com, legacy .htm paths (DO NOT MIGRATE)
```

---

## 2. Comprehensive Domain & Platform Audit

| Hosting Platform / Domain | Resource Types Hosted | Observed URL Patterns | Production Viability | Risk Level | Architectural Recommendation |
|---|---|---|---|:---:|---|
| **Archive.org** (`archive.org`) | *Vedanta Sandesh* PDFs & in-browser flipbooks | `archive.org/download/vedantasandesh_[month][year]/...` | **EXCELLENT** | **LOW** | **Designate as CANONICAL PRIMARY MIRROR** for all publications. Permanent public preservation, zero hosting costs, high uptime. |
| **YouTube** (`youtube.com`) | Recorded Gita Chapter playlists | `youtube.com/playlist?list=PLVT0gU53weD...` | **EXCELLENT** | **LOW** | **Direct Embed in `/teachings`**. Responsive `lite-youtube` embeds; client must confirm official channel URL. |
| **Google Drive** (`drive.google.com`) | E-Book & E-Zine backup mirrors | `drive.google.com/open?id=...` / folder shares | **GOOD** | **MEDIUM** | **Secondary Fallback Mirror**. Public permissions can occasionally break if workspace governance changes. |
| **Box.com** (`app.box.com`) | *Drig Drushya Viveka* audio & publication backups | `app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll` | **MODERATE** | **MEDIUM** | **Secondary Mirror**. Enterprise link-sharing policies can expire. Recommend mirroring audio to Archive.org. |
| **pCloud Short Links** (`u.pc.cd`) | 8 Sanskrit study texts, Gita monograph, Email excerpts | `u.pc.cd/QXHotalK`, `u.pc.cd/UllitalK`, etc. | **POOR** | **HIGH** | **HIGH LINK-ROT RISK**. URL shorteners frequently break or get flagged. Download and re-host assets on Archive.org in Phase 3. |
| **pubhtml5** (`pubhtml5.com`) | Interactive web flipbook previews | `pubhtml5.com/homepage/...` | **MODERATE** | **MEDIUM** | **Supplementary Reader Only**. Third-party ad-supported embeds should not replace native Next.js PDF viewing. |
| **Legacy WordPress** (`vmission.org.in/wp-content/uploads/`) | Audio lectures (`audio-1.mp3`, etc.), E-book covers | `vmission.org.in/wp-content/uploads/2026/03/...` | **CONDITIONAL** | **HIGH** | **Must Migrate Assets**. When the legacy WordPress site is retired, all uploaded MP3s and images will disappear unless copied. |
| **Legacy Developer Link** (`acrosoftwts.com`) | Old developer credit link in footer | `http://acrosoftwts.com/` | **UNACCEPTABLE** | **LOW** | **DO NOT MIGRATE**. Legacy third-party developer link; remove completely. |
| **Malformed Protocol** (`http://Sub`) | Defunct subscribe button in menu | `http://Sub`, `http://sub/` | **BROKEN** | **HIGH** | **DECOMMISSION**. Replaced by native newsletter subscription component. |

---

## 3. Analysis of Delivery Modes

### 3.1 Direct Download Assets (PDFs & Documents)
- **Current State:** Distributed across Archive.org direct download links, Google Drive file viewers, Box.com downloads, and pCloud short links.
- **Target Architecture:** Every publication record in `/publications` will feature a primary download button linking directly to the high-speed Archive.org PDF stream, with an optional "Mirrors" dropdown offering Google Drive and Box.com fallbacks.

### 3.2 Embedded Streaming Media (Video Pravachans)
- **Current State:** Embedded YouTube playlists on `/vm-videos-2/`.
- **Target Architecture:** Standardized responsive video container within `/teachings` supporting full-screen viewing, playlist navigation, and closed captions.

### 3.3 Continuous Audio Streaming
- **Current State:** Scattered WordPress audio plugins (jPlayer, Themify Audio Dock) streaming local MP3 files.
- **Target Architecture:** Unified `AudioPlayerDock` component consuming streaming audio URLs (Archive.org / cloud CDN) with persistent playback across routes.

---

## 4. Remediation Checklist for Phase 3 Implementation
1. [ ] **Download pCloud Assets:** Fetch all 8 Sanskrit texts from `u.pc.cd/*` and upload to canonical storage.
2. [ ] **Archive WordPress Media Uploads:** Perform a complete `wget`/`rsync` backup of `vmission.org.in/wp-content/uploads/` to rescue all original MP3 files before DNS cutover.
3. [ ] **Verify Box.com Streaming:** Test if Box.com audio streams permit direct HTML5 audio streaming or if audio files must be re-hosted.
4. [ ] **Configure Domain SSL:** Ensure all external media embeds and links use strict `https://` protocols to prevent mixed-content security warnings.
