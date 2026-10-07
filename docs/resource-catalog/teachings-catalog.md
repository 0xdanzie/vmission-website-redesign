# TEACHINGS RESOURCE CATALOG (PLANNING INVENTORY)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** COMPLETE PLANNING CATALOG — NO APPLICATION CODE MODIFIED  
**Authoritative Basis:** Builds on Phase 1 (`CONTENT-MIGRATION-MASTER.md`), Phase 2A (`MIGRATION-DECISION-MATRIX.md`), and `PHASE-2-ARCHITECTURE-BASELINE.md`.

---

## 1. Cataloging Method & Status Model

All identifiable spiritual audio and video resources from the legacy website (`vmission.org.in`) and Phase 1/2A audits are cataloged below within the **7 Approved Canonical Categories**.

### Status Definitions:
* **VERIFIED:** Content and active URL confirmed from live source HTML.
* **NEEDS CLIENT VERIFICATION:** Resource exists in source, but ownership, rights, or distribution approval is required.
* **NEEDS URL VERIFICATION:** Resource identified in legacy navigation, but deep per-talk MP3 URLs must be scraped or verified.
* **EXTERNAL SOURCE:** Media hosted on third-party platform (Box.com, YouTube, Archive.org).
* **DUPLICATE:** Redundant navigation entry or duplicate media reference.
* **DO NOT MIGRATE:** Deprecated hub page or redundant navigation item.

---

## 2. Summary of Teachings Resources by Category

| Category ID | Canonical Category Name | Audio Series / Items | Video Playlists / Items | Dominant Current Host | Primary Status |
|---|---|:---:|:---:|---|---|
| `bhagavad-gita` | **Bhagavad Gita** | 1 series hub (`/gita-pravachans-2/`) | 7 confirmed YouTube playlists | YouTube / WP Uploads | VERIFIED (Playlists) / NEEDS URL VERIF (Audio) |
| `upanishads` | **Upanishads** | 1 series hub (`/upanishad-talks/`) | 0 confirmed | WP Uploads | NEEDS URL VERIFICATION |
| `prakarana-granth` | **Prakarana Granth** | 3 series (Atma-bodha, Drig Drushya Viveka, Hub) | 0 confirmed | Box.com / WP Uploads | EXTERNAL SOURCE / NEEDS URL VERIF |
| `meditation` | **Meditation (Dhyana)** | 1 series hub (`/meditation/`) | 0 confirmed | WP Uploads | NEEDS URL VERIFICATION |
| `chanting` | **Chanting & Bhajans** | 1 canonical series (`/chanting/`) + 1 duplicate | 0 confirmed | WP Uploads | DUPLICATE RESOLVED / NEEDS URL VERIF |
| `devotional` | **Devotional (Bhakti)** | 2 series (Hanuman Chalisa, Sundarkand) | 0 confirmed | WP Uploads | NEEDS URL VERIFICATION |
| `inspiring-stories` | **Inspiring Stories** | 1 series hub (`/inspiring-stories/`) | 0 confirmed | WP Uploads | NEEDS URL VERIFICATION |
| **TOTALS** | **7 Canonical Categories** | **11 Legacy Audio Entries** | **7 Confirmed Playlists + Hub** | **Mixed (WP, YouTube, Box)** | **Zero code modified** |

---

## 3. Video Teachings Inventory (Confirmed YouTube Playlists)

Video pravachans were hosted via Elementor embeds on `/vm-videos-2/` pointing to YouTube playlists. 
*Note: The YouTube channel URL must be confirmed by the client, but playlist IDs have been extracted directly from live source HTML.*

| Resource ID | Resource Title | Category | Attributed Speaker | Language | YouTube Playlist ID / URL | Host Platform | Verification Status | Migration Decision | Notes & Rationale |
|---|---|---|---|---|---|---|---|---|---|
| `VID-GITA-CH03` | Bhagavad Gita — Chapter 3 (Karma Yoga) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD2jhuKYJuQi7alMy-T8pH4b` | YouTube | **VERIFIED** | **MIGRATE** | Confirmed active playlist in source HTML. Chapter-level discourse series. |
| `VID-GITA-CH12` | Bhagavad Gita — Chapter 12 (Bhakti Yoga — Rishikesh) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD2cqbn2HsS_0jvyfHf22IJz` | YouTube | **VERIFIED** | **MIGRATE** | Recorded during Rishikesh Shivir. High spiritual value. |
| `VID-GITA-UPOD` | Bhagavad Gita — Upodghata (Introduction) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD1rB2HYs9Y5nIGcKmIeos4Y` | YouTube | **VERIFIED** | **MIGRATE** | Foundational introductory lectures on Gita context. |
| `VID-GITA-MAHA` | Gita Mahayagna Discourses | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD1edXBQ4Zye837GjaD9S41D` | YouTube | **VERIFIED** | **MIGRATE** | Special occasion pravachan series. |
| `VID-GITA-CH15` | Bhagavad Gita — Chapter 15 (Purushottama Yoga) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD3pLzOHGrBGy_KXibBWAu2n` | YouTube | **VERIFIED** | **MIGRATE** | Major philosophical chapter; verse-by-verse exposition. |
| `VID-GITA-CH17` | Bhagavad Gita — Chapter 17 (Shraddhatraya Vibhaga Yoga) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD0lNEUIULepnCgZ1vqyncbg` | YouTube | **VERIFIED** | **MIGRATE** | Exposition on the three types of faith, food, and sacrifice. |
| `VID-GITA-CH18` | Bhagavad Gita — Chapter 18 (Moksha Sanyasa Yoga) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `PLVT0gU53weD1S0kuw3mrLflNBC4vKEoN9` | YouTube | **VERIFIED** | **MIGRATE** | The crowning conclusion of the Gita. |
| `VID-HUB-PAGE` | VM Videos Hub Page | `bhagavad-gita` | Multiple | Hindi | `https://www.vmission.org.in/vm-videos-2/` | Old Website | **EXTERNAL SOURCE** | **DO NOT MIGRATE** | WordPress container page. Individual playlist embeds are migrated into `/teachings`. |
| `VID-MORE-01` | Additional Video Playlists (Unparsed remainder of page) | *Multiple* | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/vm-videos-2/` | YouTube | **NEEDS URL VERIFICATION** | **DEFER** | Page contains additional embeds beyond the 7 captured in initial audit. Deep scrape in Phase 3. |

---

## 4. Audio Teachings Inventory (Legacy Audio Collections)

On the old site, audio discourses were presented on separate sub-pages using plugins (jPlayer, Themify Audio Dock). In the new architecture, these are cataloged as series containers within `/teachings`.

| Resource ID | Resource Title | Category | Attributed Speaker | Language | Source URL / Embed Target | Host Platform | Verification Status | Migration Decision | Notes & Rationale |
|---|---|---|---|---|---|---|---|---|---|
| `AUD-PRAK-DRIG` | Drig Drushya Viveka (Audio Series) | `prakarana-granth` | Swami Atmananda Saraswati | Hindi | `https://app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll` | Box.com (External) | **EXTERNAL SOURCE** | **MIGRATE** | Hosted on Box.com. Must verify if Box share link is permanently public or requires re-hosting on Archive.org. |
| `AUD-PRAK-ATMA` | Atma-bodha Lessons | `prakarana-granth` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/atmabodha-talks/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Classical Adi Shankaracharya treatise. MP3 file URLs must be scraped from old WordPress media uploads. |
| `AUD-PRAK-HUB` | Prakarana Granth General Collection | `prakarana-granth` | Swami Atmananda Saraswati | Hindi | `https://vmission.org.in/prakarana-granth/` | Old Website | **NEEDS URL VERIFICATION** | **MERGE INTO EXISTING RESOURCE** | Umbrella page for introductory texts; individual lectures will be mapped to specific treatise titles. |
| `AUD-GITA-TALK` | Bhagavad Gita Pravachans (Audio Series) | `bhagavad-gita` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/gita-pravachans-2/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Audio pravachan series complementing the video playlists. Individual lecture MP3s to be extracted. |
| `AUD-UPAN-TALK` | Upanishad Talks | `upanishads` | Swami Atmananda Saraswati | Hindi | `https://vmission.org.in/upanishad-talks/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Major Upanishad series. Crucial core scriptural content for Advaita seekers. |
| `AUD-MEDT-TALK` | Meditation (Dhyana Sessions) | `meditation` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/meditation/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Practical guidance on stillness, witness consciousness, and contemplation. |
| `AUD-DEVT-HANU` | Hanuman Chalisa Talks | `devotional` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/hanuman-chalisa-talks/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Spiritual/allegorical exposition on Goswami Tulsidas's sacred prayer. |
| `AUD-DEVT-SUND` | Sundarkand Talks | `devotional` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/sundarkand-talks/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | In-depth pravachans on Ramacharitmanas Sundarkand. |
| `AUD-CHNT-BHAJ` | Chanting & Bhajans (Canonical) | `chanting` | Ashram Swaminijis & Sadhaks | Sanskrit / Hindi | `https://vmission.org.in/chanting/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Daily ashram prayers, Stotras, and devotional singing. |
| `AUD-CHNT-DUP1` | Gita Chanting (Duplicate Menu Link) | `chanting` | Ashram Swaminijis & Sadhaks | Sanskrit | `https://www.vmission.org.in/chanting/` | Old Website | **DUPLICATE** | **DO NOT MIGRATE** | Identical target URL as `AUD-CHNT-BHAJ`. Legacy menu duplicate resolved in Phase 2B. |
| `AUD-STOR-INSP` | Inspiring Stories | `inspiring-stories` | Swami Atmananda Saraswati | Hindi | `https://www.vmission.org.in/inspiring-stories/` | Old Website (`wp-content/uploads/`) | **NEEDS URL VERIFICATION** | **MIGRATE** | Spiritual parables and tales of saints. |
| `AUD-HUB-PAGE` | VM Audios Hub Page | *General* | Multiple | Mixed | `https://vmission.org.in/vm-audios/` | Old Website | **DO NOT MIGRATE** | **DO NOT MIGRATE** | WordPress hub page; replaced by `/teachings` repository interface. |

---

## 5. Summary of Gaps & Next Steps for Implementation
1. **MP3 File Scrape:** WordPress media uploads (`wp-content/uploads/*.mp3`) are currently active on `vmission.org.in`. During Phase 3, direct MP3 stream URLs must be extracted and preserved.
2. **External Mirror Validation:** Box.com link for *Drig Drushya Viveka* (`app.box.com/s/70wl6jmk1sddl0pwzyuyj6jk8m2yprll`) should be evaluated for re-uploading to the Ashram's Archive.org collection to prevent access expiration.
3. **Speaker Rights Confirmation:** Formal written confirmation from the Ashram office confirming that all recorded lectures by Pujya Guruji and Swaminijis are cleared for open public streaming.
