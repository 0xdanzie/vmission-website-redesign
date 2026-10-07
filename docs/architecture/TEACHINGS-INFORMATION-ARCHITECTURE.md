# TEACHINGS INFORMATION ARCHITECTURE
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2B — Final Information Architecture + Navigation Proposal (Hardened in Phase 2B.5)  
**Date:** 2026-09-04  
**Status:** VALIDATED ARCHITECTURAL BASELINE — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Builds on Phase 1 live source audit and Phase 2A decision matrix (Section B & C).

---

## 1. Executive Summary & Core Architectural Shift

On the legacy website, spiritual discourses were scattered across **11 separate audio pages** (`/atmabodha-talks/`, `/gita-pravachans-2/`, `/upanishad-talks/`, `/meditation/`, `/chanting/`, etc.) and a disconnected **VM Videos page** (`/vm-videos-2/`).

**The Phase 2B Architecture replaces this fragmented model with a single, unified, library-first Teachings Platform (`/teachings`).** 

Every discourse (whether audio or video) becomes an indexed record within a unified content repository, discoverable via multi-faceted filtering, search, and categorized collections.

---

## 2. Conceptual Hierarchy & User Journey

```text
TEACHINGS HUB (/teachings)
│
├── 1. Global View Modes
│   ├── All Teachings (Unified Library)
│   ├── Audio Discourses Only
│   └── Video Pravachans Only
│
├── 2. Multi-Faceted Filter Engine
│   ├── By Scripture / Category (Gita, Upanishads, Prakarana Granth...)
│   ├── By Speaker / Acharya (Swami Atmanandaji, Swamini Amitanandaji...)
│   ├── By Language (Hindi, English, Sanskrit)
│   └── Keyword & Scripture Search
│
├── 3. Structured Discourse Series / Collection
│   ├── Series Title (e.g., Scriptural Theme or Chapter)
│   ├── Speaker, Scripture, Track Index
│   └── Tracklist / Episode Index
│
└── 4. Teaching Detail & Media Player (/teachings/[id])
    ├── Audio Experience: Persistent Docked Player with Verse Notes & Download
    └── Video Experience: Embedded High-Definition YouTube Player & Syllabus
```

---

## 3. Canonical Category Taxonomy

Consolidating the legacy site's 11 audio sub-pages and video playlists produces **7 canonical scriptural categories**:

| Canonical Category ID | Category Name | Description & Representative Subjects | Legacy Origin |
|---|---|---|---|
| `bhagavad-gita` | **Bhagavad Gita** | In-depth verse-by-verse pravachans on Gita chapters, Upodghata, and Mahayagnas. | `/gita-pravachans-2/` + YouTube playlists |
| `upanishads` | **Upanishads** | Major Mukhya Upanishads: Mandukya, Katha, Kenopanishad, Mundaka, Taittiriya, Ishavasya. | `/upanishad-talks/` |
| `prakarana-granth` | **Prakarana Granth** | Foundational introductory Advaita texts: Atmabodha, Tattva Bodha, Vivekachudamani, Drig Drishya Viveka. | `/atmabodha-talks/`, `/prakarana-granth/`, Box.com series |
| `meditation` | **Meditation (Dhyana)** | Guided meditation instructions, mindfulness, mind transcendence, and stillness practices. | `/meditation/` |
| `chanting` | **Chanting & Bhajans** | Vedic Stotras, Sahasranamas, Suktas, devotional kirtans, and morning Ashram chanting. | `/chanting/` (merged duplicate) |
| `devotional` | **Devotional (Bhakti)** | Hanuman Chalisa talks, Sundarkand discourses, Ramacharitmanas satsangs, Bhakti Yoga. | `/hanuman-chalisa-talks/`, `/sundarkand-talks/` |
| `inspiring-stories` | **Inspiring Stories** | Parables, Puranic allegories, stories of saints, and moral narratives for spiritual seekers. | `/inspiring-stories/` |

---

## 4. Multi-Faceted Filtering Architecture

The `/teachings` repository interface is governed by four primary facet selectors:

```text
+---------------------------------------------------------------------------------------------------------------+
| SEARCH: [ 🔍 Search by scripture, topic, or keyword...                                          ]             |
+---------------------------------------------------------------------------------------------------------------+
| TYPE:       [● All]       [○ Audio Discourses]       [○ Video Pravachans]                                     |
| CATEGORY:   [● All] [Gita] [Upanishads] [Prakarana Granth] [Meditation] [Chanting] [Devotional] [Stories]     |
| SPEAKER:    [● All Acharyas]  [Swami Atmanandaji]  [Swamini Amitanandaji]  [Swamini Samatanandaji]           |
| LANGUAGE:   [● All]  [Hindi]  [English]  [Sanskrit]                                                          |
+---------------------------------------------------------------------------------------------------------------+
```

---

## 5. Audio vs. Video Presentation Architecture

### 5.1 Audio Architecture
- **Primary Hosting Source:** Confirmed external archival mirrors (Archive.org and verified Ashram audio files).
- **Playback Architecture:**
  - **Persistent Bottom Docked Player (`AudioPlayerDock`):** Audio continues playing uninterrupted while the devotee browses other pages.
  - **Player Controls:** Play/Pause, 15s Skip Forward/Back, Scrub Bar, Playback Speed, Volume, Track Title, Acharya Name, and Download MP3 trigger.
  - **Track Sequencing:** Supports continuous auto-advance across a multi-part series.

### 5.2 Video Architecture
- **Primary Hosting Source:** YouTube Playlist embeds identified from the legacy `/vm-videos-2/` page. Official channel ownership must be confirmed with the client during Phase 2C.
- **Playback Architecture:**
  - Responsive embedded YouTube player (`lite-youtube` style).
  - Playlist navigator allowing users to select individual video lectures within a recorded series.

---

## 6. Illustrative Data Model Structure

> [!NOTE]
> The following structure represents a **PROPOSED DATA SCHEMA** for series grouping. Specific titles and track lengths below are illustrative examples to guide schema definition, not migrated production data.

```text
[SERIES CONTAINER — ILLUSTRATIVE EXAMPLE ONLY]
├── ID: "gita-chapter-03"
├── Title: "Bhagavad Gita — Chapter 3: Karma Yoga"
├── Acharya: "H.H. Swami Atmananda Saraswati"
├── Category: "bhagavad-gita"
├── Language: "Hindi"
├── Description: "Verse-by-verse exposition on the path of selfless action..."
├── Thumbnail: "/images/teachings/placeholder.jpg"
└── Episodes / Tracks:
    ├── Track 01: "Upodghata & Verses 1-3" (audioUrl: "[Archive.org / Verified URL]")
    ├── Track 02: "Verses 4-7" (audioUrl: "[Archive.org / Verified URL]")
    └── ...
```

---

## 7. Metadata Schema Alignment (`src/data/teachings.ts`)

| Schema Field | Type | Purpose |
|---|---|---|
| `id` | `string` | Unique slug |
| `title` | `string` | Discourse title |
| `description` | `string` | Theme / summary |
| `category` | `enum` | One of the 7 canonical categories |
| `acharya` | `string` | Canonical name of speaking Acharya |
| `duration` | `string` | Duration indicator |
| `type` | `'audio' \| 'video'` | Media delivery format |
| `audioUrl` | `string` | Streaming/download URL |
| `videoUrl` | `string` | YouTube playlist/video embed URL |
| `thumbnail` | `string` | Thumbnail image path |
| `featured` | `boolean` | Flag for homepage carousel |
| `tags` | `string[]` | Search keywords |

---

## 8. Migration Roadmap for Phase 2C
1. **Catalog Audio URLs:** Extract active MP3 file links from WordPress source and verify Archive.org mirror links.
2. **Catalog YouTube Playlists:** Map confirmed playlist IDs from `/vm-videos-2/` and verify channel details with client.
3. **Populate Production Catalog:** Populate `src/data/teachings.ts` with verified production data entries.
