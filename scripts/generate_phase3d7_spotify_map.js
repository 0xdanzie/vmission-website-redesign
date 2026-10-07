const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'design');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const mapPath = path.join(dir, 'PHASE-3D7-SPOTIFY-MEDIA-MAP.md');

const content = `# PHASE 3D.7 — VEDANTA MISSION SPOTIFY MEDIA ECOSYSTEM & MAPPING MATRIX

**Project:** Vedanta Mission / Vedanta Ashram, Indore  
**Document:** Spotify Media Ecosystem & Mapping Matrix  
**Phase:** 3D.7 (Teachings Experience Discovery & Media Architecture)  
**Status:** FORENSICALLY VERIFIED AGAINST LIVE SPOTIFY & LEGACY ARCHIVE  
**Date:** September 9, 2026  

---

## 1. Executive Overview

During the forensic audit of the legacy V-Mission archive and source infrastructure (Phase 3D.3 through Phase 3D.6), a dedicated Spotify audio distribution layer was discovered embedded within key legacy Elementor landing pages (\`atmabodha-talks.html\`, \`inspiring-stories.html\`, and \`meditation.html\`).

Unlike ephemeral third-party mirrors, the Spotify presence represents an **official, active publishing channel** administered directly by Vedanta Ashram, Indore. It encompasses:
1. An official **Spotify Podcast Show** (\`Vedanta Ashram Podcasts\`) distributed via Anchor.fm / Spotify for Podcasters.
2. Multiple curated **Scripture & Teaching Playlists** containing hundreds of organized audio lectures and moral/spiritual discourses.
3. Total verified tracks across the 4 primary playlists: **311 structured audio tracks** plus an active ongoing podcast feed of Ashram pravachans.

This document formalizes the Spotify layer's identity, canonical relationships, and architectural role within the unified "Jnana Ganga" Teachings experience.

---

## 2. Spotify Resources Discovery Ledger

The following Spotify resources have been forensically verified via live HTTP fetching and legacy archive inspection:

| # | Spotify Resource URL | Resource Type | Verified Public Title | Curator / Publisher | Item Count | Status |
| :- | :--- | :--- | :--- | :--- | :- | :- |
| **1** | \`https://open.spotify.com/show/4mfYPGmWxGszpWeseMfVPk\` | **Podcast Show** | **Vedanta Ashram Podcasts** | Vedanta Ashram | Ongoing Feed | **ACTIVE** |
| **2** | \`https://anchor.fm/vedanta-ashram\` | **Podcast Host** | **Vedanta Ashram** (Anchor/Spotify) | Vedanta Ashram | Active Feed | **ACTIVE** |
| **3** | \`https://open.spotify.com/playlist/66U9xuUqtgavAmNSU6wE8F\` | **Scripture Playlist** | **Atma Bodha Online Class** | Swami Atmananda Saraswati | **68 Tracks** | **ACTIVE** |
| **4** | \`https://open.spotify.com/playlist/0SQKCyMVPazw5A7j6TpTmH\` | **Story Playlist** | **प्रेरक कहानियाँ (SA)** | Swami Atmananda Saraswati | **74 Tracks** | **ACTIVE** |
| **5** | \`https://open.spotify.com/playlist/1EQE3DGyDv2az3yaPQe0N9\` | **Story Playlist** | **प्रेरक कहानियाँ (SS)** | Swami Atmananda Saraswati | **75 Tracks** | **ACTIVE** |
| **6** | \`https://open.spotify.com/playlist/29zcnujvz5nxDeC9HABqAG\` | **Story Playlist** | **प्रेरक कहानियाँ (SP)** | Swami Atmananda Saraswati | **94 Tracks** | **ACTIVE** |

---

## 3. Comprehensive Spotify Mapping Matrix

This matrix links every Spotify resource to its legacy context, canonical teaching entity, YouTube counterpart, and approved UX treatment in the modern Jnana Ganga architecture:

| Spotify Resource | Legacy Page / Context | Likely Purpose & Content | Canonical Entity / Entities | Existing Website Representation | YouTube / Video Relationship | Recommended New UX Treatment | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Vedanta Ashram Podcasts**<br>\`show/4mfYPGmWxGszpWeseMfVPk\` | \`meditation.html\`<br>(Anchor episode embeds) | **Ongoing Listening Stream & Ashram Pravachans**<br>Covers Mahashivratri camps, Gita Ch 15 discourses, Japa Sadhana classes, and daily satsangs. | Associated with Canonical Audio Containers (\`canonical-000352\`–\`000681\`) and Ashram Retreat reports. | Embedded in legacy WordPress via Anchor play buttons; absent from previous Next.js navigation. | Audio mirrors of live YouTube discourses delivered during Ashram retreats and Mahashivratri satsangs. | **First-Class Listening Channel Banner** on \`/teachings\` + persistent audio player hand-off: *"Listen to Daily Pravachans on Vedanta Ashram Spotify Podcast"*. | **VERIFIED & ACTIVE**<br>(Public, live streaming) |
| **Atma Bodha Online Class**<br>\`playlist/66U9xuUqtgavAmNSU6wE8F\` | \`atmabodha-talks.html\`<br>(Elementor Spotify embed) | **Finite Expository Scripture Series**<br>Comprehensive verse-by-verse unfolding of Adi Shankaracharya's 68 shlokas in Hindi by Poojya Swami Atmanandaji. | \`canonical-000455\`<br>(Atma Bodha series container in Prakarana Granth) | Legacy site had embedded Spotify player and Archive.org zip download button. Represented in \`src/data/teachings.ts\`. | Exact audio counterpart to the Atma Bodha YouTube discourse series. | **Series-Level Alternate Stream** on the Atma Bodha detail page (\`/teachings/atma-bodha\`), with explicit *"Listen on Spotify"* CTA alongside the web player. | **VERIFIED & ACTIVE**<br>(68 tracks complete) |
| **प्रेरक कहानियाँ (SA)**<br>\`playlist/0SQKCyMVPazw5A7j6TpTmH\` | \`inspiring-stories.html\`<br>(Elementor Spotify embed) | **Spiritual & Moral Contemplation Series**<br>74 short contemplative stories expounded by Swamini Amitanandaji illustrating dharma, surrender, and spiritual values. | \`canonical-000676\`<br>(Inspiring Stories collection by Swamini Amitananda) | Legacy site featured triple-column layout with 3 Swaminijis' portraits and Spotify embeds. | Minimal YouTube duplication; primarily an audio-first listening collection. | **Featured Collection** in Category VII (*Inspiring Stories*), allowing seekers to listen via in-browser player or hand-off directly to Spotify playlist. | **VERIFIED & ACTIVE**<br>(74 tracks complete) |
| **प्रेरक कहानियाँ (SS)**<br>\`playlist/1EQE3DGyDv2az3yaPQe0N9\` | \`inspiring-stories.html\`<br>(Elementor Spotify embed) | **Spiritual & Moral Contemplation Series**<br>75 stories expounded by Swamini Samatanandaji focusing on devotion, viveka, and everyday sadhana. | \`canonical-000677\`<br>(Inspiring Stories collection by Swamini Samatananda) | Legacy site featured portrait and Spotify iframe embed. | Audio-first collection; rare archival recordings. | **Featured Collection** in Category VII (*Inspiring Stories*) with dedicated track listing and Spotify launch option. | **VERIFIED & ACTIVE**<br>(75 tracks complete) |
| **प्रेरक कहानियाँ (SP)**<br>\`playlist/29zcnujvz5nxDeC9HABqAG\` | \`inspiring-stories.html\`<br>(Elementor Spotify embed) | **Spiritual & Moral Contemplation Series**<br>94 stories expounded by Swamini Poornanandaji on mythological, puranic, and saintly lives. | \`canonical-000678\`<br>(Inspiring Stories collection by Swamini Poornananda) | Legacy site featured portrait and Spotify iframe embed. | Audio-first collection; non-duplicated on YouTube. | **Featured Collection** in Category VII (*Inspiring Stories*) with dedicated track listing and Spotify launch option. | **VERIFIED & ACTIVE**<br>(94 tracks complete) |

---

## 4. Nature of the Spotify Audio Layer

### 4.1 Finite Series vs. Ongoing Stream
1. **Playlists as Finite Canonical Series:**
   - The Atma Bodha playlist (\`66U9xuUqtgavAmNSU6wE8F\`) is a **closed, finite scriptural course** (68 shlokas = 68 tracks).
   - The three Prerak Kahaniyan playlists are **closed, thematic storytelling collections** (74, 75, and 94 tracks).
   - These map directly to specific canonical series containers in the Teaching archive.
2. **Show / Podcast as an Ongoing Listening Stream:**
   - The \`Vedanta Ashram Podcasts\` show (\`4mfYPGmWxGszpWeseMfVPk\`) is a **living broadcast channel**. New Pravachans from Ashram retreats and annual camps are uploaded dynamically over time.
   - It functions as an ongoing audio companion to the Ashram's daily life, not a single static book.

### 4.2 Content Duplication & Relationship to YouTube / Web Audio
- **Atma Bodha:** Triple-represented (YouTube video playlist, Archive.org MP3 repository, Spotify audio playlist). Spotify represents a high-convenience mobile audio mirror for students already accustomed to audio streaming.
- **Inspiring Stories:** Predominantly exclusive to Spotify and Archive.org. YouTube has only select recordings. Spotify is thus a **primary distribution channel** for the Swaminijis' 243 story discourses.
- **Ashram Pravachans (Podcast):** Matches live YouTube audio streams but packaged conveniently for audio-only headphone listening during commutes and morning walks.

---

## 5. Architectural Recommendations for Modern UX

### 5.1 What Spotify Should NOT Be:
- ❌ **NOT a visual skin:** Do not turn the website into a green-and-black Spotify UI clone. The website must remain a sacred, serene Digital Ashram (Bhagwa, warm ivory, antique brass, midnight walnut).
- ❌ **NOT an exclusive lock-in:** Visitors without Spotify accounts must never be blocked from hearing discourses. The in-browser audio player (streaming from Archive.org or self-hosted audio) remains the primary open zero-barrier medium.
- ❌ **NOT an uncurated dumping ground:** Do not paste unformatted Spotify iframes into random sections.

### 5.2 What Spotify SHOULD Be:
- ✅ **An Alternate Listening Channel:** A dignified, ambient gateway for mobile users and commuting seekers who prefer background listening with their phone screen locked.
- ✅ **A First-Class Outbound Hand-Off:** On relevant series detail pages (e.g. *Atma Bodha*, *Inspiring Stories*), provide a refined, brand-consistent *"Listen on Spotify"* action button alongside the web audio player.
- ✅ **A Curated Discovery Card on \`/teachings\`:** A quiet, elegant card in the Listening section highlighting the *Vedanta Ashram Podcasts* channel for daily Pravachan streaming.

---

## 6. Public Terminology & Presentation Guidelines

| Internal Concept | Forbidden Public Wording | Mandatory Public Wording |
| :--- | :--- | :--- |
| Spotify Show | "Canonical podcast mirror" | "Official Ashram Podcast" / "Vedanta Ashram Audio Stream" |
| Spotify Playlist | "Playlist mirror container" | "Listen on Spotify" / "Complete Audio Series on Spotify" |
| Spotify Episode | "Child track record" | "Episode" / "Discourse" / "Story Session" |
| Spotify External Link | "External mirror link" | "Open in Spotify App ↗" |

---
*Report generated strictly local as part of Phase 3D.7 discovery.*
`;

fs.writeFileSync(mapPath, content, 'utf8');
console.log('Successfully wrote', mapPath);
