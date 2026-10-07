const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'design');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const blueprintPath = path.join(dir, 'PHASE-3D7-TEACHINGS-UX-BLUEPRINT.md');

const content = `# PHASE 3D.7 — TEACHINGS EXPERIENCE ARCHITECTURE & SAFE UI BLUEPRINT
## Jnana Ganga: The Living Stream of Scriptural Wisdom

**Project:** Vedanta Mission / Vedanta Ashram, Indore  
**Document:** Master UX, Media Architecture & CSS Safety Blueprint  
**Phase:** 3D.7 (Design & Architectural Discovery)  
**Status:** ARCHITECTURAL SPECIFICATION (NO-CODE / READ-ONLY)  
**Date:** September 9, 2026  

---

## 1. UX Objectives

The primary objective of the new Teachings experience is to transform the massive 735-entity canonical audio and video repository into an authentic, serene, and deeply structured **Digital Ashram (Jnana Ganga)**.

### 1.1 The Core Experience Metaphor
Visitors should feel as though they are stepping into the tranquil teaching sanctum of Vedanta Ashram in Indore:
- **Serene, contemplative, and unhurried:** Free from algorithm-driven anxiety, clickbait thumbnails, or cluttered streaming walls.
- **Rooted in Shankara Advaita Vedanta tradition:** The interface reflects the traditional discipline of *Shravana* (listening), *Manana* (reflection), and *Nididhyasana* (meditation).
- **Curated at the entrance, structured in the middle, complete at the archive level:**
  - **Entrance (Arrival):** A welcoming, atmospheric threshold offering clear orientation, landmark foundational series, and daily contemplation.
  - **Middle (Study):** Clear categorization across the Seven Canonical Paths, distinct Series vs. Session hierarchy, and dedicated Study Desks.
  - **Archive Level (Explorer):** Comprehensive, high-precision search and filtering across all 735 verified recordings without overwhelming casual seekers.

### 1.2 Key Architectural Problems in the Current State to Solve
1. **Two-Tier Disconnect:** Currently, the page renders a curated list of ~20 items at the top and an un-styled "Archive Explorer" table at the bottom. These must be unified into a cohesive, tiered browsing experience.
2. **Exposure of Technical Canonical IDs:** Badges such as \`<code>canonical-000465</code>\` were temporarily exposed in the Phase 3D.5 explorer. These must be **completely eliminated** from the public visual interface.
3. **Series vs. Session Conflation:** A 14-lecture series and an isolated audio track currently look almost identical in card presentations. They must have distinct visual treatments, badges, and interaction models.
4. **Disjointed Audio/Video Playback:** Playing an audio file triggers a floating bar, while video links navigate off-site or open generic modals without continuity.
5. **Untapped Spotify Layer:** The active 311-track Spotify audio archive discovered in Phase 3D.7 is not yet surfaced as an ambient listening channel.

---

## 2. User Journeys (10 Specific Personas & Scenarios)

### Journey 1: First-Time Visitor (Knows Nothing About Vedanta)
- **Persona:** A curious seeker who heard about Vedanta Ashram and wants to understand what Advaita Vedanta teaches.
- **Entry Point:** \`/teachings\` landing page.
- **First Decision:** Notices the *"Begin Your Journey — Foundational Inquiries"* section in the hero/arrival area.
- **Discovery Path:** Clicks on *"Tattva Bodha"* or *"Introduction to Vedanta"*.
- **Series Selection:** Arrives at the *Tattva Bodha* series overview (clear synopsis, what to expect, 1-year study perspective).
- **Session Selection:** Chooses *"Session 01: The Nature of the Seeker (Adhikari)"*.
- **Consumption Action:** Listens to the first 45-minute lecture on the built-in Study Desk with synchronized summary notes.
- **Next Action:** Sees *"Continue to Session 02"* or downloads the companion root Sanskrit text PDF.

### Journey 2: Visitor Looking for Bhagavad Gita
- **Persona:** A student specifically seeking verse-by-verse Gita exposition by Poojya Swami Atmanandaji.
- **Entry Point:** \`/teachings\` with category filter or direct search.
- **First Decision:** Clicks on Canonical Path I: **Bhagavad Gita (श्रीमद्भगवद्गीता)**.
- **Discovery Path:** Views the Chapter Index (Chapters 1 through 18 clearly laid out with chapter titles and verse ranges).
- **Series Selection:** Selects *Chapter 12: Bhakti Yoga (14 Sessions)*.
- **Session Selection:** Chooses *Session 04: The Twelve Marks of a Devotee*.
- **Consumption Action:** Watches the embedded YouTube lecture in the cinematic video frame.
- **Next Action:** Explores the companion *Gita Ch 12 Monograph* in the Publications archive.

### Journey 3: Visitor Looking for a Specific Scripture (e.g. Mandukya Upanishad)
- **Persona:** An academic or experienced seeker seeking a specific Upanishad or Prakarana Granth.
- **Entry Point:** Global Teachings Search or Path II: **Upanishads (उपनिषदः)**.
- **First Decision:** Types "Mandukya" into the search field or clicks *Upanishads*.
- **Discovery Path:** Filtered view reveals Mandukya Karika discourses (Audio + Video).
- **Series Selection:** Selects *Mandukya Upanishad with Gaudapada Karika*.
- **Session Selection:** Selects Agama Prakarana discourse.
- **Consumption Action:** Plays direct high-definition audio stream.
- **Next Action:** Bookmarks the series or downloads the complete series zip from Archive.org.

### Journey 4: Visitor Who Simply Wants Something to Listen To (Commuter / Daily Sadhana)
- **Persona:** A working professional commuting home or practicing evening contemplation who wants ambient, uplifting satsang.
- **Entry Point:** Mobile \`/teachings\`.
- **First Decision:** Taps the ambient *"Daily Pravachan & Audio Stream"* card.
- **Discovery Path:** Sees options for *"Recent Ashram Satsang"* and *"Official Spotify Podcast"*.
- **Series Selection:** Taps *"Listen on Spotify App"* or starts the web mini-player.
- **Session Selection:** Plays the latest Mahashivratri discourse.
- **Consumption Action:** Locks phone screen; audio continues uninterrupted via background Spotify stream or persistent web audio.
- **Next Action:** Subscribes to the *Vedanta Ashram Podcasts* channel on Spotify.

### Journey 5: Visitor Who Wants to Watch a Discourse (Visual Learner)
- **Persona:** A devotee who prefers seeing Poojya Guruji speak in the Ashram sanctum.
- **Entry Point:** \`/teachings?type=video\`.
- **First Decision:** Clicks the "Video" format toggle.
- **Discovery Path:** Visual grid displays video series with high-resolution Ashram video thumbnails.
- **Series Selection:** Selects *Vivekachudamani Discourse Series*.
- **Session Selection:** Opens the playlist video theater.
- **Consumption Action:** Watches lecture in full-screen cinematic modal with session picker on the side.
- **Next Action:** Clicks "Next Lecture" without leaving the viewing environment.

### Journey 6: Returning Visitor Continuing a Series
- **Persona:** A registered seeker enrolled in a 20-part Upanishad course who listened to Session 07 yesterday.
- **Entry Point:** Returns to \`/teachings\` or direct series URL.
- **First Decision:** Sees *"Recently Studied"* / *"Resume Series"* cue (saved via local browser state).
- **Discovery Path:** Directly jumps to Session 08.
- **Series Selection:** Pre-selected.
- **Session Selection:** Taps Session 08.
- **Consumption Action:** Resumes playback exactly where left off.
- **Next Action:** Advances to Session 09.

### Journey 7: Devotee Looking for an Old Discourse (Archival Seeker)
- **Persona:** A longtime ashram associate searching for a 1998 discourse delivered in Indore or Mumbai.
- **Entry Point:** \`/teachings\` -> Archive Explorer section.
- **First Decision:** Opens the Archive Explorer and filters by Year (e.g. "1998" or "2002") and Teacher.
- **Discovery Path:** Results list shows authentic historical audio files cataloged with recording year.
- **Series Selection:** Identifies the historic camp recording.
- **Session Selection:** Directly accesses the MP3 or Archive.org preserved file.
- **Consumption Action:** Streams or downloads the historical recording.
- **Next Action:** Shares the recording link with fellow seekers.

### Journey 8: Advanced Seeker Looking for a Specific Teacher/Session
- **Persona:** A student specifically studying talks by Swamini Amitananda Saraswati or Swami Samvidanandaji.
- **Entry Point:** \`/teachings\` -> Teacher dropdown filter.
- **First Decision:** Selects specific teacher from the filter list.
- **Discovery Path:** Filtered library shows all discourses attributed to that Acharya across all 7 paths.
- **Series Selection:** Browses the Acharya's distinct thematic series (e.g. *Bhaja Govindam* or *Inspiring Stories*).
- **Session Selection:** Selects desired session.
- **Consumption Action:** Engages with the Study Desk.
- **Next Action:** Navigates to the Acharya's full biography on \`/acharyas/[slug]\`.

### Journey 9: Visitor Who Discovers the Spotify Listening Option
- **Persona:** A millennial or overseas seeker who exclusively uses Spotify for podcasts and daily audio.
- **Entry Point:** Atma Bodha or Inspiring Stories page.
- **First Decision:** Notices the discreet *"Listen on Spotify"* badge.
- **Discovery Path:** Clicks *"Open in Spotify App"*.
- **Series Selection:** Seamless deep-link opens the Spotify app directly to the 68-track *Atma Bodha Online Class* playlist.
- **Session Selection:** Chooses track inside Spotify.
- **Consumption Action:** Listens while jogging or driving with full native lockscreen controls.
- **Next Action:** Follows Vedanta Ashram on Spotify for future releases.

### Journey 10: Mobile Visitor (375px–430px Screen)
- **Persona:** A seeker browsing on a mobile phone on 4G connectivity.
- **Entry Point:** Mobile browser arrival at \`/teachings\`.
- **First Decision:** Compact, touch-friendly Category Carousel allows horizontal swiping between the 7 paths.
- **Discovery Path:** Clean, stacked cards with large touch targets (>= 48px), legible Devanagari, and no horizontal layout blowouts.
- **Series Selection:** Taps card with bottom-sheet drawer opening for track selection.
- **Session Selection:** Selects session with clear duration and play icon.
- **Consumption Action:** Persistent bottom audio pill stays docked above the mobile nav bar, displaying track title and play/pause button.
- **Next Action:** Taps bottom pill to expand full-screen mobile listening sheet.

---

## 3. Information Architecture: The Three-Tier Model

To reconcile **curation**, **structure**, and **completeness**, the Information Architecture is organized into three distinct depth tiers:

\`\`\`mermaid
graph TD
    A["Level 1: Entrance & Arrival (/teachings)"] --> B["Curated Highlights (Begin Here, Daily Stream, Featured)"]
    A --> C["Seven Canonical Paths Navigation (Taxonomy)"]
    C --> D["Level 2: Structured Series & Category Hub (/teachings?category=...)"]
    D --> E["Series Collection Cards (Container Level)"]
    E --> F["Level 3: Study Desk & Session Player (/teachings/[slug])"]
    F --> G["Session Tracklist & Player (Audio / Video / Notes)"]
    F --> H["Companion Study Text & Publications"]
    D --> I["Level 3B: Complete Canonical Archive Explorer"]
    I --> J["High-Precision Search & Deep Archival Filters"]
\`\`\`

### 3.1 Tier 1: The Threshold (Arrival & Orientation)
- **Atmospheric Hero:** Sacred imagery of the Vedanta Ashram teaching sanctum with calm typography (*Jnana Ganga — The Repository of Living Knowledge*).
- **"Begin Here" / Foundational Compass:** Direct guidance for beginners (Tattva Bodha, Bhagavad Gita Introduction).
- **Living Audio Stream Banner:** Daily Pravachan and official Spotify podcast broadcast channel.
- **The Seven Canonical Paths:** Editorial grid allowing seekers to filter by scriptural path.

### 3.2 Tier 2: The Structured Middle (Series & Collections)
- **Category Browsing:** Displays structured **Series Containers** (e.g. *Gita Chapter 12*, *Mundaka Upanishad*, *Vivekachudamani*).
- **Clear Series Metrics:** Shows total session count, teacher, media types available (Audio / Video), and language.
- **Differentiation:** Individual standalone lectures are clearly demarcated from comprehensive multi-part series.

### 3.3 Tier 3: The Study Desk & Archive Level (Deep Study & Completeness)
- **Interactive Study Desk (\`/teachings/[slug]\`):**
  - High-definition media player (cinematic video frame or interactive audio player).
  - Complete sequential session index (Track 1 to Track N).
  - Traditional three-fold discipline synopsis (*Shravana*, *Manana*, *Nididhyasana*).
  - Companion classical study text integration (links directly to verified PDF in Publications).
  - External listening hand-offs (Spotify, Archive.org, YouTube).
- **Power User Archive Explorer:**
  - Placed gracefully below the curated collections.
  - Allows searching all 735 canonical entities by scripture, teacher, year, language, or host platform.

---

## 4. Public Content Hierarchy Analysis & Recommendation

We evaluated the two competing hierarchical models for visitor comprehension and content scale:

### Model A: Scripture-First (Recommended)
\`\`\`text
Teachings (Jnana Ganga)
  └── Canonical Category (e.g. Upanishads)
        └── Series / Collection (e.g. Mandukya Upanishad)
              └── Individual Session (e.g. Session 04: Karika 1.6)
                    └── Media Player (Audio / Video / Study Notes)
\`\`\`

### Model B: Format-First
\`\`\`text
Teachings
  └── Format (Listen / Watch / Study)
        └── Category
              └── Series
                    └── Session
\`\`\`

### Verdict & Recommendation: **Adopt Model A (Scripture-First)**
- **Why Model A Wins:** In traditional Advaita Vedanta, the seeker's inquiry begins with the **subject and scripture** (*Vishaya* and *Adhikara*), not whether it is encoded as MP3 or MP4. Many core series (like *Atma Bodha* or *Gita Ch 12*) have **both audio and video available simultaneously**. Model B fragments a single sacred teaching into two separate silos, forcing the user to check both tabs.
- **How Format is Handled:** Format (Audio vs Video) is implemented as a **fluid filter toggle** within Model A, rather than a hard architectural split.

---

## 5. Separation of Series from Sessions (Mandatory Design Rule)

A series/container MUST NOT look visually identical to an individual session card.

| Design Element | Series / Collection Container | Individual Session / Track |
| :--- | :--- | :--- |
| **Card Type** | **Broad Architectural Box (Album / Tome)** | **Streamlined Editorial Row / Track Item** |
| **Visual Badge** | \`SERIES · 14 SESSIONS\` or \`MULTI-PART COURSE\` | \`SESSION 04 · 48 MIN\` |
| **Media Indicator** | Combined Emblem (\`🎙️ Audio + ▶ Video\`) | Single Action Icon (\`▶ Play MP3\` or \`▶ Watch\`) |
| **Primary CTA** | *"Explore Complete Series →"* | *"Play Discourse"* / *"Watch Lecture"* |
| **Action Behavior** | Navigates to Series Study Desk | Launches playback immediately in player |
| **Hierarchy Level** | Parent Container | Child Asset |

---

## 6. Dedicated Audio Experience Blueprint

### 6.1 Audio Playback Architecture
1. **Persistent Bottom Mini-Player:**
   - Docks smoothly at the bottom of the screen when playback begins.
   - Preserves playback state across page navigation between \`/teachings\`, \`/about\`, \`/ashram\`, etc.
   - Controls: Play/Pause, -15s rewind, +30s skip, progress scrub bar, track title, speaker name, volume/mute.
   - Playback Speed: 0.75x, 1.0x, 1.25x, 1.5x (crucial for study listening).
2. **Expanded Study Desk Listening Mode:**
   - On \`/teachings/[slug]\`, audio expands into a prominent, tactile listening desk with waveform visualization, session notes, and full chapter tracklist.
3. **Queue & Series Continuation:**
   - When Session 01 finishes, the player automatically cues Session 02 with a gentle 5-second countdown and "Play Next" prompt.
4. **Spotify Hand-Off:**
   - A dedicated, brand-styled *"Listen on Spotify"* button appears alongside the web player for users who want mobile background playback.
5. **Resilient Fallback Hierarchy:**
   - Primary: Self-hosted or Archive.org direct MP3 stream.
   - Secondary: Google Drive / Box stream resolver.
   - Tertiary: Outbound Archive.org download link.

---

## 7. Dedicated Video Experience Blueprint

### 7.1 Video Presentation Architecture
1. **Cinematic Video Frame:**
   - 16:9 responsive container framed with subtle antique brass borders and dark walnut scrim.
   - Uses privacy-enhanced \`youtube-nocookie.com\` embeds to protect visitor privacy.
2. **Playlist Video Theater:**
   - Left / Main Pane: Active video playback.
   - Right / Collapsible Pane: Sequential lecture list with active playing indicator.
3. **Inline Player vs. Modal:**
   - **On Study Desk Page (\`/teachings/[slug]\`):** Embedded inline as the hero study element.
   - **On Archive Explorer / Cards:** Opens a focused, distraction-free theatre modal to prevent disruptive page redirects.
4. **Mobile Video Behavior:**
   - Stacks gracefully with sticky video frame at top and scrollable lecture index underneath.

---

## 8. Spotify Integration Model

Based on the forensic findings in [PHASE-3D7-SPOTIFY-MEDIA-MAP.md](file:///c:/Users/Danish%20Syed/OneDrive/Desktop/MyWebsite/V-Mission/docs/design/PHASE-3D7-SPOTIFY-MEDIA-MAP.md):

1. **Ambient Ashram Broadcast Card on \`/teachings\`:**
   - Prominently surfaces the official **Vedanta Ashram Podcasts** feed for daily satsangs.
   - Metadata: *"Vedanta Ashram Podcasts · Official Audio Stream"*.
   - CTA: *"Listen to Daily Pravachans on Spotify ↗"*.
2. **Series-Level Mirror Integration:**
   - For **Atma Bodha** (\`canonical-000455\`) and **Inspiring Stories** (\`canonical-000676\`–\`000678\`), provide a dedicated *"Spotify Playlist"* button on the Study Desk header.
3. **Zero Lock-In Guarantee:**
   - Spotify links are strictly complementary. All 311 tracks remain 100% playable via web MP3/Archive.org without requiring a Spotify login.

---

## 9. Search & Filtering Model (Power-User Layer)

1. **Progressive Disclosure:**
   - Primary view presents simple, elegant Category tabs and a clean search input.
   - Secondary power-user filters (Teacher, Format, Language, Year) appear on a quiet toolbar without dominating the page.
2. **Instant Asynchronous Search:**
   - Client-side search across title, scripture, teacher, topics, and Devanagari transliterations with sub-10ms response time.
3. **Empty States with Graceful Recovery:**
   - When a search yields no results, render a contemplative message:  
     *"No recordings currently match your inquiry. The Jnana Ganga archive contains 735 authentic discourses. Try adjusting your search term or exploring by Canonical Path."*
   - Includes a one-click *"Reset All Filters"* button.

---

## 10. Mobile-First Model (375px to Desktop)

1. **Responsive Viewport Support:**
   - Fully tested and optimized for 375px (iPhone SE), 390px (iPhone 14), 430px (iPhone Pro Max), 768px (iPad), and 1536px+ (Desktop).
2. **Elimination of Horizontal Blowout:**
   - Strict CSS clamping: \`max-width: 100vw; overflow-x: hidden;\`.
   - Sanskrit transliteration words and long scripture titles utilize \`overflow-wrap: break-word\` and \`hyphens: auto\`.
3. **Touch Targets:**
   - All interactive pills, play buttons, and tab selectors maintain a minimum touch target of **48px × 48px**.
4. **Mobile Audio Pill:**
   - Sits docked above the mobile bottom navigation with safe-area insets (\`env(safe-area-inset-bottom)\`).

---

## 11. Digital Ashram Art Direction & Visual Language

The visual design must strictly maintain continuity with Vedanta Mission's approved cinematic design system:

| Design Token | Value / Treatment | Atmospheric Purpose |
| :--- | :--- | :--- |
| **Bhagwa (Sacred Saffron)** | \`#c05621\` / \`#dd6b20\` / \`hsl(24, 75%, 48%)\` | Primary spiritual illumination, active states, sacred badges |
| **Midnight Walnut** | \`#16120e\` / \`#1c1612\` / \`#231c16\` | Deep sanctuary shadow, tactile card backgrounds, serene depth |
| **Warm Ivory** | \`#fdfbf7\` / \`#f7f3eb\` / \`#ede6d8\` | Crisp classical contrast, manuscript reading ground |
| **Antique Brass** | \`#c5a059\` / \`#d4af37\` | Ornamental borders, subtle dividers, scholarly dignity |
| **Serif Typography** | Cinzel (Display), Cormorant Garamond (Scripture) | Ancient timelessness, Gurukula lineage, sacred dignity |
| **Sans-Serif Body** | Inter | High-contrast modern legibility for long study sessions |
| **Motion** | 300ms–500ms cubic-bezier transitions | Quiet, slow, meditative pacing; zero jarring pops or bounces |

---

## 12. Public Terminology Rules

### Approved Public Terms
- **Teaching** / **Discourse** / **Satsang** / **Lecture**
- **Series** / **Study Course** / **Collection**
- **Session** / **Part** / **Episode**
- **Jnana Ganga** / **The Living Stream of Knowledge**
- **Canonical Path** / **Traditional Subject**
- **Study Desk** / **Scriptural Exposition**
- **Listening** / **Watching** / **Study Text**

---

## 13. Forbidden Public Terminology

The following internal database and migration terms **MUST NEVER** appear in any public-facing component:
- ❌ **canonical ID** / **canonical-000465**
- ❌ **canonical entity**
- ❌ **legacy record** / **raw inventory item**
- ❌ **container record** / **child asset**
- ❌ **mirror URL** / **source mirror**
- ❌ **migration status** / **MIGRATION_PENDING**
- ❌ **provenance record**

---

## 14. Canonical-ID Visibility Enforcement Rule

### Non-Negotiable Enforcement Policy:
1. Canonical IDs (e.g. \`canonical-000465\`, \`canonical-001173\`) are **strictly internal data keys**.
2. Any public card, header, metadata strip, tooltip, or badge displaying a raw \`canonicalId\` is a **P0 visual defect**.
3. All public routes, links, and cards must display human-friendly titles, scripture names, session numbers, and clean slugs (e.g. \`/teachings/gita-ch-12-session-04\` or \`/teachings/atma-bodha\`).
4. Internal canonical IDs remain preserved exclusively inside TypeScript data files, test scripts, provenance logs, and migration reconciliation documents.

---

## 15. CSS Safety Architecture & Blast-Radius Protection

To ensure **zero regression** on the homepage, navbar, footer, and benchmark pages, the implementation phase must adhere to the following safety protocol:

### 15.1 Scoped CSS Modules Only
- All new or modified styles must reside strictly within:
  - \`src/app/teachings/page.module.css\`
  - \`src/app/teachings/[id]/page.module.css\`
  - \`src/components/TeachingsArchiveExplorer.module.css\`
  - Or newly created scoped component modules (e.g. \`src/components/teachings/SeriesCard.module.css\`).

### 15.2 Global CSS Lock (Strictly Untouched)
The following files are **FROZEN** and must NOT be edited during the Teachings implementation:
- \`src/app/globals.css\` (LOCKED)
- \`src/app/page.module.css\` (LOCKED)
- \`src/app/about/page.module.css\` (LOCKED)
- \`src/app/ashram/page.module.css\` (LOCKED)
- \`src/components/Navbar.module.css\` (LOCKED)
- \`src/components/Footer.module.css\` (LOCKED)

### 15.3 Selector Isolation Rules
- ❌ **FORBIDDEN:** Universal or bare HTML tag selectors:  
  \`button { ... }\`, \`.card { ... }\`, \`h2 { ... }\`, \`section { ... }\`
- ✅ **MANDATORY:** Scoped module classes:  
  \`.teachingCard { ... }\`, \`.seriesTitle { ... }\`, \`.audioDeskContainer { ... }\`

### 15.4 Blast-Radius Verification Command
Before completing any implementation phase, execute a git diff check to guarantee no locked files were touched:
\`\`\`bash
git diff --name-only origin/main -- src/app/globals.css src/components/Navbar* src/components/Footer* src/app/page.*
\`\`\`
*(Must return empty).*

---

## 16. Implementation Boundaries

### Included in Next Phase (Phase 3D.8):
- Refactoring \`/teachings\` landing page layout to match the Three-Tier Model.
- Removing all raw canonical ID badges from \`TeachingsArchiveExplorer.tsx\`.
- Introducing distinct visual treatments for **Series Containers** vs. **Individual Sessions**.
- Adding the **Spotify Broadcast Card** and series-level Spotify hand-off buttons.
- Harmonizing the upper curated list with the lower 735-entity archive explorer.

### Deferred to Phase 3D.9 or Later:
- Persistent site-wide global audio player daemon (cross-route streaming context).
- User study bookmarks / local playback resume state sync.
- Interactive Sanskrit verse audio-sync highlighter.

---

## 17. Unresolved Decisions Requiring Human Approval

1. **Default View on \`/teachings\` Landing Page:**
   - *Option A:* Show curated Series Containers first, with the full 735-entity archive explorer accessible via a prominent tab/button.
   - *Option B:* Show curated Series Containers on top, followed by an integrated paginated archive feed below.
   - *Recommendation:* Option B (unified single-page scroll with fast filters).
2. **Spotify Integration Prominence:**
   - Confirm whether the *"Vedanta Ashram Podcasts"* Spotify channel should appear as an editorial banner above the categories or as an ambient card within the Listening filter.
   - *Recommendation:* Ambient card within Listening filter + header button on matching series.
3. **URL Slug Resolution for Archival Items:**
   - Confirm keeping dual resolution (resolves both semantic slugs like \`drig-drushya-viveka\` and internal IDs invisibly behind the scenes).

---

## 18. Recommended Next Implementation Phase

**Proceed to PHASE 3D.8: CONTROLLED TEACHINGS UX HARDENING & MEDIA REFINEMENT**
- Implement the approved Three-Tier layout.
- Cleanse all raw canonical IDs from public rendering.
- Apply the distinct Series vs. Session design models.
- Integrate Spotify external listening hand-offs.
- Enforce full CSS safety boundaries.

---
*Blueprint established strictly local. Zero code modifications performed in Phase 3D.7.*
`;

fs.writeFileSync(blueprintPath, content, 'utf8');
console.log('Successfully wrote', blueprintPath);
