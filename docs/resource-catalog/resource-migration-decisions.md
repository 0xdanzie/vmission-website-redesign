# RESOURCE MIGRATION DECISIONS REGISTER
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** COMPLETE DECISION REGISTER — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Builds on Phase 2A (`MIGRATION-DECISION-MATRIX.md`) and Phase 2C catalogs.

---

## 1. Migration Action Definitions

* **MIGRATE:** Resource is verified and will be imported into production Next.js data files or media storage during Phase 3.
* **LINK EXTERNALLY:** Resource remains hosted on verified external platform (e.g. YouTube playlist, Box.com) and is embedded or linked directly.
* **MERGE INTO EXISTING RESOURCE:** Resource content is absorbed into a consolidated canonical page or collection.
* **KEEP AS ARCHIVE:** Historical resource preserved for reference but omitted from primary navigational focus.
* **DEFER:** Resource publication is postponed until client verification or deep scraping is completed.
* **DO NOT MIGRATE:** Redundant, obsolete, or broken legacy element permanently excluded.

---

## 2. Master Migration Decision Table

| Resource ID | Resource Title / Entity | Type | Current Host | Recommended Decision | Target Destination | Justification & Dependencies |
|---|---|---|---|:---:|---|---|
| `VID-GITA-CH03` | Gita Chapter 3 Pravachans | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD2jhuKYJuQi7alMy-T8pH4b`). |
| `VID-GITA-CH12` | Gita Chapter 12 Pravachans | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD2cqbn2HsS_0jvyfHf22IJz`). |
| `VID-GITA-UPOD` | Gita Upodghata | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD1rB2HYs9Y5nIGcKmIeos4Y`). |
| `VID-GITA-MAHA` | Gita Mahayagna Discourses | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD1edXBQ4Zye837GjaD9S41D`). |
| `VID-GITA-CH15` | Gita Chapter 15 Pravachans | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD3pLzOHGrBGy_KXibBWAu2n`). |
| `VID-GITA-CH17` | Gita Chapter 17 Pravachans | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD0lNEUIULepnCgZ1vqyncbg`). |
| `VID-GITA-CH18` | Gita Chapter 18 Pravachans | Video Playlist | YouTube | **LINK EXTERNALLY** | `/teachings` | Confirmed active YouTube playlist (`PLVT0gU53weD1S0kuw3mrLflNBC4vKEoN9`). |
| `VID-HUB-PAGE` | VM Videos Hub Page | Web Page | WordPress | **DO NOT MIGRATE** | N/A (301 Redirect) | Hub container replaced by `/teachings` library view. |
| `AUD-PRAK-DRIG` | Drig Drushya Viveka Audio | Audio Series | Box.com | **MIGRATE** | `/teachings` | Core treatise. Evaluate re-uploading from Box.com to Archive.org. |
| `AUD-PRAK-ATMA` | Atma-bodha Lessons | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-PRAK-HUB` | Prakarana Granth Hub | Web Page | WordPress | **MERGE INTO EXISTING RESOURCE** | `/teachings` | Merged into Prakarana Granth category filter. |
| `AUD-GITA-TALK` | Bhagavad Gita Audio Pravachans | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-UPAN-TALK` | Upanishad Talks Audio | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-MEDT-TALK` | Meditation Audio Talks | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-DEVT-HANU` | Hanuman Chalisa Talks | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-DEVT-SUND` | Sundarkand Talks | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-CHNT-BHAJ` | Chanting & Bhajans (Canonical) | Audio Collection | WordPress Uploads | **MIGRATE** | `/teachings` | Canonical chanting audio collection. |
| `AUD-CHNT-DUP1` | Gita Chanting (Duplicate Link) | Menu Link | WordPress | **DO NOT MIGRATE** | N/A | Redundant duplicate menu entry pointing to same URL. |
| `AUD-STOR-INSP` | Inspiring Stories Audio | Audio Series | WordPress Uploads | **MIGRATE** | `/teachings` | Scrape MP3 links from WordPress uploads during Phase 3. |
| `AUD-HUB-PAGE` | VM Audios Hub Page | Web Page | WordPress | **DO NOT MIGRATE** | N/A (301 Redirect) | Replaced by `/teachings` repository interface. |
| `PUB-SAN-2026` | *Vedanta Sandesh* 2026 Issues (Jan–Mar) | Periodical PDF | Archive.org / GDrive | **MIGRATE** | `/publications` | Confirmed active with 6 working mirrors. |
| `PUB-SAN-2025` | *Vedanta Sandesh* 2025 Issues (Jul–Dec) | Periodical PDF | Archive.org / GDrive | **MIGRATE** | `/publications` | Confirmed active with 6 working mirrors. |
| `PUB-SAN-EARL` | *Vedanta Sandesh* Earlier Archive | Periodical PDF | Various | **DEFER** | `/publications` | Ingest historical issues in Phase 3 after full inventory. |
| `PUB-PIY-HUB` | *Vedanta Piyush* Monthly E-Zine | Periodical PDF | WordPress | **DEFER** | `/publications` | Full issue inventory pending Phase 3 scrape. |
| `PUB-EBK-VA06` | Vedanta Articles — Volume 6 | E-Book PDF | Multi-mirror | **MIGRATE** | `/publications` | Verified flagship book volume. |
| `PUB-EBK-VA04` | Vedanta Articles — Volume 4 | E-Book PDF | Multi-mirror | **MIGRATE** | `/publications` | Verified book volume. |
| `PUB-EBK-VA03` | Vedanta Articles — Volume 3 | E-Book PDF | Multi-mirror | **MIGRATE** | `/publications` | Verified book volume. |
| `PUB-EBK-VA02` | Vedanta Articles — Volume 2 | E-Book PDF | Multi-mirror | **MIGRATE** | `/publications` | Verified book volume. |
| `PUB-EBK-VA01` | Vedanta Articles — Volume 1 | E-Book PDF | Multi-mirror | **MIGRATE** | `/publications` | Verified book volume. |
| `PUB-EBK-GITA` | Articles on Gita (English) | E-Book PDF | pCloud | **MIGRATE** | `/publications` | High-utility monograph; re-host on Archive.org. |
| `PUB-EBK-MAIL` | Email Excerpts (Pujya Guruji) | E-Book PDF | pCloud | **DEFER** | `/publications` | Gated pending client editorial consent. |
| `PUB-TXT-MAHI` | Shiva Mahimna Stotram | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-KATH` | Katha Manjari | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-SHIV` | Shiva Upasana | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-VISH` | Vishnu Sahasranama Vyakhya | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-VAIR` | Vairagya Sandipani | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-SADH` | Sadhana Panchakam Mula Grantha | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-TATT` | Tattvabodha Mula Grantha | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-ATMA` | Atmabodha Mula Grantha | Study Text PDF | pCloud | **MIGRATE** | `/publications` | Re-host pCloud file on canonical storage. |
| `PUB-TXT-DUP-VISH` | Vishnu Sahasranaam Sub-page | Web Page | WordPress | **MERGE INTO EXISTING RESOURCE** | `/publications` | Absorbed into `PUB-TXT-VISH` publication card. |
| `PUB-TXT-PRAV` | Pravachan Text Notes | Text PDF | WordPress | **MIGRATE** | `/publications` | Study notes accompanying pravachans. |
| `PUB-TXT-GENPDF` | General PDF Archive | Document | WordPress | **DEFER** | `/publications` | Inspect page content in Phase 3. |
| `M01` / `M02` | Subscribe Link (`http://Sub`) | Broken Link | Legacy Nav | **DO NOT MIGRATE** | N/A | Decommissioned; replaced with newsletter card. |
| `M06` | Developer credit (`acrosoftwts.com`) | External Link | Legacy Footer | **DO NOT MIGRATE** | N/A | Decommissioned. |
| `M07` | Legacy `.htm` file links | Broken Links | Various | **DO NOT MIGRATE** | N/A | 404 links decommissioned. |

---

## 3. Phase 3 Migration Strategy
1. **Direct Data Migration:** Verified resources marked **MIGRATE** can be safely translated into TypeScript data objects in `src/data/teachings.ts` and `src/data/publications.ts`.
2. **Deferred Resources:** Items marked **DEFER** remain omitted from production data until scraping or client authorization is finalized.
3. **Redirect Execution:** Decommissioned URLs marked **DO NOT MIGRATE** are routed to their canonical Next.js destinations via `next.config.js` redirects.
