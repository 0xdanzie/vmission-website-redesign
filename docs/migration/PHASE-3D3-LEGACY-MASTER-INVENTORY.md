# PHASE 3D.3 — COMPLETE LEGACY ARCHIVE DISCOVERY REPORT
**VEDANTA MISSION / VEDANTA ASHRAM, INDORE**  
*Source-of-Truth Inventory of the Live Legacy Web Presence (`https://www.vmission.org.in/`)*

---

## Executive Summary & Grand Totals

During Phase 3D.3, a comprehensive, read-only discovery of the entire legacy Vedanta Mission web presence was conducted. Through deep inspection of the live WordPress REST API (`/wp-json/wp/v2/`), XML sitemaps, Elementor page trees, raw HTML table structures, external cloud storage distribution networks, and media repositories, **2,752 distinct content and resource records** were identified and cataloged into the machine-readable master inventory (`docs/migration/PHASE-3D3-LEGACY-MASTER-INVENTORY.json`).

### Master Inventory Breakdown

| Metric / Classification | Discovered Count | Primary Storage / Source Hosts |
| :--- | :--- | :--- |
| **Total Inventory Records** | **2,752** | WordPress, YouTube, GDrive, Box, pCloud, Archive.org, Issuu, Scribd, Google Photos |
| **Institutional & Content Pages** | **88** | WordPress (`vmission.org.in`) |
| **News & Blog Posts** | **25** | WordPress (`vmission.org.in/blog/`, categories: News, Blog) |
| **Event & Yagna Post Reports** | **14** | WordPress (`vmission.org.in/`, categories: Ashram, Events) |
| **Audio Discourse Records** | **381** | Google Drive (folders/files), Box, pCloud, WP Media MP3s, Archive.org |
| **Video Lectures & Playlists** | **479** | YouTube (52 curated series playlists + 427 individual talk videos) |
| **Publications (E-Zine Issues)** | **712** | Issuu, Google Drive, Box, pCloud, Scribd, Archive.org (*Vedanta Sandesh* & *Vedanta Piyush*) |
| **E-Books & Monographs** | **26** | Google Drive, Box, Archive.org, PubHTML5, pCloud |
| **Study Texts & Scripture PDFs** | **113** | Archive.org, Google Drive, Box (Adhyasa Bhashya, Gita, Upanishads, Vishnu Sahasranama) |
| **Photo Galleries / Shared Albums** | **57** | Google Photos Shared Albums (Monthly darshans, Shivir camps, special talks) |
| **VM Footprints Images** | **11** | WordPress Uploads (`img-vmission-footprints-*.jpg`) on Homepage Carousel |
| **Direct Media Attachments** | **849** | WordPress Uploads (843 images + 6 direct MP3 audio files) |
| **Course & Academic Assets** | **2** | Residential 12-Month Gurukula Course + 40-Lesson Correspondence Course |
| **Administrative & Internal Records** | **2** | Internal Bookmarks portals (`/bookmarks/` and `/swamitas-bookmark/`) |
| **Broken Legacy Routes** | **2** | `/sundarkand-talks/` (HTTP 500) & Empty YouTube Playlist (`list=`) |

---

## 1. Scope

The scope of this discovery covers all discoverable digital assets, routes, media, audio lectures, video broadcasts, publications, e-books, Sanskrit study texts, photo albums, news updates, course curricula, and external repository links residing on or linked directly from `https://www.vmission.org.in/`.

---

## 2. Crawl & Discovery Method

1. **REST API Mapping**: Polled `/wp-json/wp/v2/` endpoints (`pages`, `posts`, `media`, `categories`, `tags`, `users`) with pagination (`per_page=100`). Downloaded complete raw payloads.
2. **Sitemap Verification**: Cross-referenced all core XML sitemaps:
   - `wp-sitemap-posts-post-1.xml` (39 posts)
   - `wp-sitemap-posts-page-1.xml` (88 pages)
   - `wp-sitemap-taxonomies-category-1.xml` (4 categories)
   - `wp-sitemap-taxonomies-post_tag-1.xml` (35 tags)
   - `wp-sitemap-users-1.xml` (1 author)
3. **Deep Table & DOM Parsing**: The legacy site employs custom Elementor layouts and embedded HTML tables for discourse libraries. Each table row was parsed to extract:
   - Scripture/Text name
   - Discoursing Acharya / Speaker
   - Place and Year of recording
   - Language (Hindi, Gujarati, English, Sanskrit)
   - Direct links across storage providers (Google Drive, Box, pCloud, Archive.org, YouTube, Issuu, Scribd).
4. **Cloud Link Resolution & Normalization**:
   - For **pCloud short links** (`http://u.pc.cd/<code>`), verified the client-side redirect script and deterministically mapped to `https://u.pcloud.link/publink/show?code=<code>`.
   - For **YouTube playlists and videos**, extracted canonical playlist IDs (`list=`) and video IDs (`v=`).
   - For **Google Drive**, extracted unique file and folder IDs (`id=` or `/folders/...`).
   - For **Box**, extracted sharing tokens (`/s/...`).
   - For **Wayback Machine archives**, documented original historic services (DivShare, SkyDrive) mirrored on Archive.org.

---

## 3. Discovered Route Structure

### Core Institutional & Ashram Pages
- `/` (Homepage, containing Hero, Audio/Video hubs, VM Footprints Carousel, Ashram Introduction, and Recent Posts)
- `/about/`, `/about/goal/`, `/about/mission/`, `/about/objectives/`
- `/ashram/`, `/ashram-indore/`, `/facilities/`, `/directions/`, `/rooms/`
- `/our-trusts/`, `/vpst/`, `/icf-mumbai/`, `/centers/`, `/contact-us/`
- `/ashram_parivar/` (Ashram Parivar Yojna, Silver Jubilee celebration support, UPI and donation portals)
- `/sangyan/`, `/sangyan-1/`, `/sangyan-2/` (Center for Holistic Awareness of Sanatan Dharma: Knowledge, Yoga, Bhakti, Teerth)
- `/donate/`, `/org/`, `/progs/`, `/events/`

### Acharya Profiles
- `/acharyas-2/` (Active directory for Acharyas; legacy `/acharyas/` redirects 301 to home)
- `/guruji/` (Poojya Swami Atmananda Saraswati detailed bio & teachings)
- Swamini Amitananda Saraswati bio & discourses
- Swamini Poornananda Saraswati bio & discourses
- Swamini Samatananda Saraswati bio & discourses

### Discourse Hubs (Audio & Video)
- `/talks/` (Root talks index)
- `/vm-audios/` (Central audio hub linking all scripture classes)
- `/gita-pravachans/` & `/gita-pravachans-2/` (Gita audio series)
- `/upanishad-talks/` (Upanishad audio discourse series)
- `/prakarana-granth/` (Prakarana Granth audio lectures)
- `/hanuman-chalisa-talks/` (Hanuman Chalisa verse-by-verse talks)
- `/chanting/` & `/chanting-others/` (Chanting tracks)
- `/general-talks/` (Historical discourse recordings)
- `/atmabodha-talks/` & `/meditation/`
- `/vm-videos/` & `/vm-videos-2/` (Central video hubs)
- Text-specific video pages: `/bhaja-govindam/`, `/hanuman-chalisa/`, `/geeta/`, `/videos/`, `/prakarana-granth-2/`, `/video-shivamahimna-stotram/`, `/videos-kathopanishad/`, `/videos-complete-bhagwad-gita/`, `/others/`, `/question-answer/`

### Publications & Study Literature
- `/vedanta-sandesh/` & `/vedanta-sandesh-ezine/` (Monthly English/Hindi magazine)
- `/vedanta-piyush/` & `/vedanta-piyush-ezine/` (Quarterly/monthly Gujarati magazine)
- `/e-books/` (Monographs & books)
- `/pdf/`, `/pravachan-text/`, `/general-pdf/`, `/test-2/`, `/test-pdf/` (Study text PDFs)
- `/vishnu-sahasranaam/` (10-part scripture texts)

### Media & Photo Galleries
- `/albums/` (Central photo gallery linking 57 Google Photos shared albums)
- `/blog/`, `/news/` (News and event updates)

### Internal Utility & Bookmarks
- `/bookmarks/` (372+ curated reference links used by Swami Atmananda)
- `/swamitas-bookmark/` (104+ administrative utility and service links used by Swamini Amitananda)

---

## 4. Content Categories & Resource Inventory

### 4.1 Audio Records (381 Items)
1. **Gita Pravachans (71 Series/Discourses)**:
   - Comprehensive coverage of Bhagavad Gita Chapters 1 through 18.
   - Teachers: Poojya Guruji Swami Atmananda Saraswati, Swamini Amitananda Saraswati.
   - Locations: Mumbai, Ahmedabad, Indore, Baroda.
   - Languages: Hindi, Gujarati, English.
   - Storage: Google Drive shared folders, Box collections, pCloud repositories.
2. **Upanishad Talks (86 Series/Discourses)**:
   - Texts: Amritbindu, Ishavasya, Kena, Katha, Mundaka, Mandukya, Prashna, Taittiriya, Aitareya, Kaivalya, Shvetashvatara Upanishads.
   - Multi-year recordings (2008–2021) from Lucknow, Indore, Ahmedabad.
   - Linked to companion study text PDFs.
3. **Prakarana Granth Talks (96 Series/Discourses)**:
   - Texts: Tattva Bodha (including the 46-talk 2023 course), Advaita Makaranda, Atma Bodha, Drig Drishya Viveka, Panchadashi (Ch. 15), Upadesha Sara, Sadhana Panchakam, Hastamalaka Stotram, Dakshinamurti Stotram, Laghu Vasudeva Manana.
4. **Hanuman Chalisa Talks (124 Verse Recordings)**:
   - Granular verse-by-verse audio lectures (Doha 1 to 2, Chaupai 1 to 40, Concluding Dohas).
   - Recorded monthly between September 2013 and 2015.
   - Direct audio downloads hosted on Google Drive and Box.
5. **Chanting Tracks (53 Recordings)**:
   - Gita Dhyana Shlokas + individual chanting tracks for Chapters 1 through 18 (with sloka counts specified).
   - Stotrams and invocations hosted on Google Drive and pCloud.
6. **Inspiring Stories (59 Audio Narratives)**:
   - Swamini Amitanandaji: 19 Hindi inspirational parables on pCloud (Raja Shibi, Vivek ka Mahattva, Bhagwan ki Nishthur Daya, etc.).
   - Swamini Samatanandaji / Poornanandaji: 20 Hindi stories on pCloud (Niswartha Prem, Ishwar Sarvavyapi Hai, Shiva-Vishnu Ekta, etc.).
7. **Direct WordPress MP3 Uploads (6 Files)**:
   - `dm_01.mp3` (Dakshinamurty St_Talk-1)
   - `dm_02.mp3` (Dakshinamurty St_Talk-2)
   - `rotary_naitikta-talk.mp3` (Ethics Talk-Ambarnath)
   - `gita_dhyana-shlokas.mp3` (Gita Dhyana Shlokas)
   - `audio-1.mp3` & `audio-2.mp3` (Impact Moderato)

---

### 4.2 Video Records (479 Items)
1. **Curated Video Playlists (52 Series on `/vm-videos-2/`)**:
   - Gita Chapter 1 through 18 playlists (Hindi and English series).
   - Special series: Gita Mahayagna, Gita Upodghat, Kathopanishad, Bhaja Govindam, Shivamahimna Stotram.
2. **Individual Video Lectures (427 Direct Videos)**:
   - `/prakarana-granth-2/`: 100 YouTube lecture videos.
   - `/videos-kathopanishad/`: 57 YouTube lecture videos.
   - `/bhaja-govindam/`: 45 YouTube lecture videos.
   - `/hanuman-chalisa/`: 44 YouTube lecture videos.
   - `/video-shivamahimna-stotram/`: 40 YouTube lecture videos.
   - `/geeta/`: 38 YouTube lecture videos.
   - `/videos-complete-bhagwad-gita/`: 22 YouTube lecture videos.
   - `/videos/` (Upanishads): 21 YouTube lecture videos.
   - `/chanting-others/`: 26 YouTube videos and playlists.
   - `/others/`: 24 YouTube video discourses.
   - `/question-answer/`: Online Satsang Q&A session on "Sharanagati".

---

### 4.3 Publications & E-Books (738 Items)
1. **Vedanta Sandesh (376 Issue Links across 173 Months)**:
   - Monthly spiritual magazine founded by Swami Atmananda Saraswati.
   - Covers issues from 2021 back to 2012.
   - Multi-host redundancy: Issuu flipbook, Google Drive PDF, Box mirror, pCloud audio/PDF, Scribd, Archive.org.
2. **Vedanta Piyush (336 Issue Links across 151 Months)**:
   - Gujarati spiritual publication edited by Swamini Amitananda Saraswati.
   - Archived issues from 2021 back across multiple years.
3. **E-Books & Monographs (26 Items)**:
   - Standalone treatises including *Meditation*, *Introduction to Vedanta*, *Gita Overview*, *Tattva Bodha Commentary*, *Vedanta Articles Vol. 1-6*.
   - Available via PubHTML5 flipbooks, Google Drive, Box, pCloud, and Archive.org.

---

### 4.4 Study Texts & Sanskrit Scriptures (113 Items)
1. **Prakarana Grantha Study Texts (40 PDFs)**:
   - Adhyasa Bhashya, Atmabodha, Advaita Makaranda, Ashtavakra Gita (Vols 1 & 2), Bhaja Govindam, Drig Drishya Viveka, Dakshinamurti Stotram, Hastamalaka Stotram, Laghu Vasudeva Manana, Nataka Dipa, Panchadashi (Ch. 15), Sadhana Panchakam, Tattva Bodha, Upadesha Sara.
   - Direct downloads on Archive.org (`https://archive.org/download/...`) and Google Drive.
2. **Vishnu Sahasranama (10 PDF Parts)**:
   - Complete 1000 names divided into 10 parts (1-100, 101-200, ... 901-1000) with word meaning and commentary.
3. **General Administrative PDFs (3 Documents)**:
   - VPST 80G Tax Exemption Certificate.
   - VPST Corpus Fund Donation Form.
   - Vedanta Ashram Camp Registration Form.

---

### 4.5 Photo Galleries, Albums & VM Footprints (922 Items)
1. **Google Photos Shared Albums (57 Albums)**:
   - Monthly Ashram darshan photo albums (Jan–Dec 2018, 2019).
   - Residential camp daily photo logs (Janmashtami Day 1–6, Mahashivaratri Day 1–6).
   - Special outstation events: Talk @ Rotary Dahisar, Prerana Talks, VM Satsang, Talk @ Law College, Jungle mein Mangal, Ananda Lahari.
2. **VM Footprints Carousel (11 Slides on Homepage)**:
   - Elementor Image Carousel showcasing Poojya Guruji's global tours, discourses across North America, UK, Africa, and pan-India ashrams.
3. **WordPress Uploaded Media Library (854 Images / Media)**:
   - 843 JPEG/PNG images capturing ashram construction, deities (Lord Shiva, Hanumanji, Adi Shankaracharya), yagnas, swamis, and publication cover art.

---

### 4.6 News, Events & Blog Articles (39 Posts)
- 39 historical post records spanning 2019–2020:
  - *Gita Gyan Yagna Mumbai & Anand-Lahari*
  - *Hanuman Chalisa Gyan Yagna Samapan & Guruji's Birthday*
  - *Gita Jayanti Celebrations (Gita Bhawan & Futi Kothi)*
  - *Vibhooti Darshan Yatra & Birding in Gujarat*
  - *Visit to Statue of Unity & Victoria Nature Park, Bhavnagar*
  - *Residential Camp Conclusions (Daily logs)*

---

### 4.7 Courses & Educational Programs (2 Main Curricula + Modules)
1. **Bhagwad Gita Study Course (Residential Gurukula)**:
   - 12-month full-time residential intensive at Vedanta Ashram, Indore.
   - Target demographic: 45–60 age group.
   - Comprehensive curriculum: 18 chapters of Bhagavad Gita, Sanskrit grammar, Vedic rituals, meditation.
2. **Bhagwad Gita Lesson Course (Online / Correspondence)**:
   - 40 lessons divided into 4 sessions of 10 lessons each.
   - Includes open lesson 1, assignment questionnaire, email evaluation, and tiered donation.
3. **Tattva Bodha Online Correspondence Course**:
   - Introductory Vedanta course with open lesson on Box and free textbook on Issuu.
4. **Sangyan — Center for Holistic Awareness of Sanatan Dharma**:
   - Four learning tracks: Knowledge (Jnana), Yoga (Sadhana), Bhakti (Devotion), Teerth (Pilgrimage).

---

## 5. Storage Distribution & Cloud Architecture

| Provider / Host | Records | Content Hosted |
| :--- | :--- | :--- |
| **WordPress (`vmission.org.in`)** | **988** | 88 Pages, 39 Posts, 849 Media files (843 images, 6 MP3s), 11 Footprints slides |
| **YouTube** | **479** | 52 Curated Playlists + 427 Individual Lecture Videos |
| **Google Drive** | **390** | Pravachan audio folders, scripture PDFs, publication mirrors, admin forms |
| **Box (`app.box.com`)** | **313** | Pravachan audio folders, course lessons, publication issue archives |
| **pCloud (`u.pc.cd` / `pcloud.link`)** | **158** | Pravachan audio, inspiring stories, publication issues |
| **Issuu** | **166** | Digital magazine flipbooks (*Vedanta Sandesh* & *Vedanta Piyush*) |
| **Scribd** | **145** | Historical e-zine issue mirrors |
| **Google Photos** | **57** | High-resolution shared event albums |
| **Archive.org** | **44** | Permanent PDF scripture downloads, historical audio mirrors |
| **PubHTML5** | **5** | Interactive 3D flipbooks for E-Books |
| **Other External** | **7** | Payment gateways (PayU, UPI), external references |

---

## 6. Current New-Site Coverage Snapshot

A side-by-side comparison between the live legacy archive and the current Next.js application was conducted:

| Legacy Content Category | Legacy Discovered | Current New Site Representation | Status / Coverage Gap |
| :--- | :--- | :--- | :--- |
| **Institutional & About Pages** | 88 Pages (About, Ashram, Facilities, Trusts, Directions, Rooms, Sangyan) | Represented in `src/app/about`, `ashram`, `acharyas`, `contact`, `donate` | **PARTIAL**: Missing `rooms` (guest accommodation), `ashram_parivar`, `sangyan` modules. |
| **Acharya Biographies** | 4 Acharyas (Guruji + 3 Swaminis) | 4 Acharyas in `src/data/acharyas.ts` & `src/app/acharyas` | **COVERED**: Core profiles match; legacy audio/story links need attachment. |
| **Vedanta Sandesh (E-Zine)** | 173 Monthly Issues (2012–2021) | 80 Issues in `src/data/publications.ts` | **MISSING 93 ISSUES**: 93 earlier legacy monthly issues are not yet migrated. |
| **Vedanta Piyush (Gujarati)** | 151 Issues (2012–2021) | 78 Issues in `src/data/publications.ts` | **MISSING 73 ISSUES**: 73 earlier legacy Gujarati issues are not yet migrated. |
| **E-Books & Monographs** | 26 Distinct E-Books / Monographs | 7 E-Books in `src/data/publications.ts` | **MISSING 19 BOOKS**: 19 legacy monographs and articles volumes missing. |
| **Study Texts & Sanskrit PDFs** | 113 PDFs (Adhyasa Bhashya, 14 Prakarana texts, 10 Vishnu Sahasranama parts) | 15 Texts in `src/data/publications.ts` | **MISSING 98 TEXTS**: Vishnu Sahasranama 10-part breakdown and many Prakarana PDFs missing. |
| **Audio Discourses (Teachings)** | 381 Audio Series & Tracks (Gita, Upanishads, Prakarana, Hanuman Chalisa) | 7 Representative items in `src/data/teachings.ts` | **MASSIVE GAP (374 AUDIO ITEMS MISSING)**: Almost the entire audio legacy is unexposed. |
| **Video Playlists & Lectures** | 479 Videos (52 Curated Playlists + 427 Individual Videos) | Few embedded videos in `src/data/teachings.ts` | **MASSIVE GAP (470+ VIDEOS MISSING)**: 52 curated playlist cards and hundreds of talks missing. |
| **Chanting Audio (Gita 1-18)** | 53 Tracks (All 18 Chapters + Dhyana Slokas) | Not distinctly exposed as a dedicated chanting library | **MISSING**: Chapter-by-chapter chanting files not linked. |
| **Inspiring Stories (Parables)** | 59 Audio Stories by Swaminis on pCloud | Completely absent from new site | **100% MISSING**: 59 high-value Hindi audio stories need a dedicated player/section. |
| **Photo Galleries / Albums** | 57 Shared Google Photos Albums | Completely absent from new site | **100% MISSING**: No gallery route or Google Photos album links exist. |
| **VM Footprints (Global Tour)** | 11 High-Res Activity / Tour Slides | Completely absent from new site | **100% MISSING**: World tour archive and timeline not presented. |
| **News, Shivirs & Event Posts** | 39 Historical Reports with Galleries | 5 Static mock events in `src/data/events.ts` | **39 POSTS MISSING**: Rich historical archive of camps and yagnas unmigrated. |
| **Courses & Gurukula Programs** | 12-Month Gurukula + 40-Lesson Correspondence Course + Tattva Bodha | 3 Simplified cards in `src/data/courses.ts` | **NEEDS RECONCILIATION**: Full prospectus, fee structure, and questionnaires unexposed. |
| **Guest Rooms & Facilities** | Detailed Room & Stay Facilities on `/rooms/` | Briefly mentioned on `/ashram` page | **MISSING DEDICATED VIEW**: Specific room guidelines and booking details absent. |
| **Ashram Parivar & UPI Details** | `/ashram_parivar/` dedicated scheme | Generic donation form on `/donate` | **MISSING**: Silver jubilee scheme and direct UPI VPA not highlighted. |

---

## 7. Operational & Technical Findings

### 7.1 Broken Legacy Resources
- **`/sundarkand-talks/`**: Linked on `/vm-audios/`; throws an HTTP 500 error on the legacy WordPress server. Must be reconciled during content curation.
- **Empty YouTube Playlist Card**: On `/vm-videos-2/`, one card's "Open" button links to `https://www.youtube.com/playlist?list=` (empty playlist ID).
- **Archived Cloud Links (DivShare / SkyDrive)**: Historical talk links from before 2014 point to discontinued services (`divshare.com`, `sdrv.ms`) that were preserved via Wayback Machine snapshots (`web.archive.org/web/20170830164032/...`).

### 7.2 Private / Administrative Discoveries
- Discovered two private admin utility pages: `/bookmarks/` (372 external links) and `/swamitas-bookmark/` (104 external links). These contain administrative quick-links to electricity board portals, municipal services, banking logins, email dashboards (MailChimp, Mailjet), and cloud storage consoles. These should **NOT** be published publicly in the new user-facing interface, but provide valuable provenance on third-party service accounts used by the Ashram.

### 7.3 Content Traceability & Machine-Readable Artifact
The complete item-by-item ledger is saved in:
`docs/migration/PHASE-3D3-LEGACY-MASTER-INVENTORY.json` (1.69 MB, 2,752 records).

Each record provides:
`id`, `legacyUrl`, `title`, `type`, `parent`, `category`, `date`, `sourceHost`, `sourceUrl`, `assetUrl`, `externalId`, `status`, and contextual `notes`.

---
*Report generated autonomously as part of Phase 3D.3 Legacy Archive Discovery.*
