# FINAL NAVIGATION SPECIFICATION
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2B — Final Information Architecture + Navigation Proposal (Hardened in Phase 2B.5)  
**Date:** 2026-09-04  
**Status:** VALIDATED ARCHITECTURAL BASELINE — PLANNING ONLY (NO CODE MODIFIED)  
**Authoritative Basis:** Synthesizes findings from Phase 1, Phase 2A, and `FINAL-INFORMATION-ARCHITECTURE.md`.

---

## 1. Desktop Header Navigation Specification

### 1.1 Header Structure & Layout
The desktop header provides an uncluttered, dignified, and serene browsing experience.

```text
+-------------------------------------------------------------------------------------------------------------------------+
|  [ॐ VEDANTA MISSION]     About ▾   Ashram   Teachings ▾   Publications ▾   Events   Learn     [Contact]  [Donate / Seva]  |
+-------------------------------------------------------------------------------------------------------------------------+
```

### 1.2 Header Item Sequence & Proposed Roles

| Order | Element | Target Route | Type | Purpose & Behavior |
|:---:|---|---|---|---|
| **0** | **Brand Logo** | `/` | Home Link | Sacred Om symbol + "Vedanta Mission" wordmark. (Exact logo artwork/branding to be finalized in Phase 2D). |
| **1** | **About** | `/about` | Dropdown | Overview of Mission, Vision, Advaita Tradition, Lineage of Acharyas, and Trusts. |
| **2** | **Ashram** | `/ashram` | Direct Link | The physical sanctuary in Indore: Overview, facilities, daily life, and pilgrimage directions. |
| **3** | **Teachings** | `/teachings` | Dropdown / Mega-Row | Direct entry to the core audio & video library, plus quick links to scripture categories (Gita, Upanishads, Prakarana Granth). |
| **4** | **Publications** | `/publications` | Dropdown | Direct entry to literary archives: Vedanta Sandesh, Vedanta Piyush, E-Books, and Study Texts. |
| **5** | **Events** | `/events` | Direct Link | Forthcoming shivirs, annual festivals, recurring schedule, and past event archives. |
| **6** | **Learn** | `/learn` | Direct Link | *Architectural Recommendation (Conditional):* Scoped study tracks and residential study information. |
| **7** | **Contact** | `/contact` | Secondary Action | Direct contact information, Ashram WhatsApp helpline, inquiry form, and travel assistance. |
| **8** | **Donate / Seva** | `/donate` | Primary Action CTA | *Architectural Recommendation:* Distinct accent button for voluntary seva, annakshetra, and trust support. Exact label subject to client confirmation. |

---

## 2. Dropdown & Sub-Menu Rules

### 2.1 Core Dropdown Principles
1. **Zero Deep Nesting:** No dropdown may exceed **1 sub-level depth** (Hover/Click item → Sub-menu panel → Target destination).
2. **Predictable Hover/Focus:** Dropdowns open on hover with an intentional 150ms delay (to avoid accidental flashing) or on keyboard focus.
3. **Parent Clickability:** Clicking the parent item (e.g., clicking "About" directly) navigates to the primary hub page (`/about`).
4. **Content-Oriented Grouping:** Dropdown panels use clean grouping headers with brief descriptive subtitles.

### 2.2 Dropdown Specifications per Navigation Item

#### A. "About" Dropdown
* **Trigger:** Hover/Focus on `About`
* **Direct Click Target:** `/about`
* **Panel Width:** ~280px (Single column card)
* **Proposed Items:**
  1. **Vision & Mission** (`/about#vision`) — *Spreading Love & Light through Advaita Vedanta*
  2. **Our Acharyas** (`/acharyas`) — *Spiritual Lineage & Disciples of H.H. Swami Atmanandaji*
  3. **Trusts & Governance** (`/about#trusts`) — *Vedanta Parayan Samiti Trust & Philanthropic Works*
  4. **Centers & Satsangs** (`/about#centers`) — *Affiliated study groups [Subject to client verification]*

#### B. "Ashram" Link
* **Trigger:** Direct click
* **Target:** `/ashram`
* **Dropdown Needed?** **NO.** The Ashram page is designed as a single-page narrative. Sub-sections are navigated via in-page sticky sub-navigation on `/ashram` itself.

#### C. "Teachings" Dropdown (Mega-Row Panel)
* **Trigger:** Hover/Focus on `Teachings`
* **Direct Click Target:** `/teachings`
* **Panel Layout:** Multi-column panel
* **Structure:**
  * **Column 1: Formats & Library**
    - **All Teachings (Library Hub)** (`/teachings`) — *Full searchable repository*
    - **Audio Pravachans** (`/teachings?type=audio`) — *Recorded discourses & series*
    - **Video Talks** (`/teachings?type=video`) — *Recorded video pravachans*
  * **Column 2: Scriptural Categories**
    - **Bhagavad Gita** (`/teachings?category=bhagavad-gita`)
    - **Upanishads** (`/teachings?category=upanishads`)
    - **Prakarana Granth** (`/teachings?category=prakarana-granth`)
    - **Meditation & Chanting** (`/teachings?category=meditation`)

#### D. "Publications" Dropdown
* **Trigger:** Hover/Focus on `Publications`
* **Direct Click Target:** `/publications`
* **Panel Width:** ~300px
* **Proposed Items:**
  1. **Vedanta Sandesh** (`/publications?type=sandesh`) — *Monthly English E-Zine archive*
  2. **Vedanta Piyush** (`/publications?type=piyush`) — *Monthly Hindi E-Zine archive*
  3. **E-Books & Monograms** (`/publications?type=ebook`) — *Original works by Pujya Guruji*
  4. **Study & Chant Texts** (`/publications?type=texts`) — *Sanskrit texts, Stotras & Gita anvaya*

#### E. "Events" & "Learn" Links
* **Trigger:** Direct clicks
* **Targets:** `/events` and `/learn`
* **Dropdown Needed?** **NO.** Direct links prevent decision paralysis. Sub-filtering occurs within the pages.

---

## 3. Persistent Action Buttons (CTA Integration)

### 3.1 Donate / Seva Button (ARCHITECTURAL RECOMMENDATION)
* **Visual Treatment:** Pill or soft-rounded rectangle button with warm golden tone, crisp typography, and subtle micro-interaction.
* **Semantic Anchor:** `<Link href="/donate" className="btnDonate">Donate / Seva</Link>`
* **Status:** Terminology (`Donate / Seva` vs `Donate` vs `Seva Offering`) is an architectural recommendation awaiting client confirmation.

### 3.2 Contact Link / Button
* **Visual Treatment:** Clean outline or subtle ghost button next to the Donate button.
* **Semantic Anchor:** `<Link href="/contact" className="btnContact">Contact</Link>`
* **Status:** Contact destination confirmed; actual phone and WhatsApp numbers are gated pending client verification.

---

## 4. Mobile Navigation Architecture

The mobile navigation is touch-optimized and avoids deep accordion nesting:

### 4.1 Mobile Header Bar
- **Height:** 64px
- **Elements:** Compact Brand Mark (Left) + Hamburger Menu Trigger (Right, 48px tap target).

### 4.2 Mobile Slide-Over Drawer Structure
```text
+--------------------------------------------------------+
|  [ॐ Vedanta Mission]                               [✕] |
|  "Spreading Love & Light by revealing oneness..."       |
+--------------------------------------------------------+
|  [❤️ DONATE / SEVA]            [📞 CONTACT ASHRAM]     |
+--------------------------------------------------------+
|  Home                                                  |
|  About                                               ▾ |
|    ├── Overview & Mission                              |
|    ├── Our Acharyas                                    |
|    └── Trusts & Governance                             |
|  Ashram (Vedanta Ashram, Indore)                       |
|  Teachings (Audio & Video Library)                   ▾ |
|    ├── Browse All Teachings                            |
|    ├── Bhagavad Gita                                   |
|    ├── Upanishads                                      |
|    └── Meditation & Chanting                           |
|  Publications (E-Zines & Books)                      ▾ |
|    ├── Vedanta Sandesh (Monthly)                       |
|    ├── Vedanta Piyush                                  |
|    └── E-Books & Study Texts                           |
|  Events & Shivirs                                      |
|  Learn & Courses                                       |
+--------------------------------------------------------+
|  Ashram Contact Desks:                                 |
|  📍 Indore, Madhya Pradesh, India                      |
|  💬 WhatsApp: [Official Number — Pending Verification] |
|  ✉️ Email: [Official Email — Pending Verification]     |
+--------------------------------------------------------+
```

---

## 5. Global Footer Navigation Architecture (PROPOSED LAYOUT)

```text
+---------------------------------------------------------------------------------------------------------------+
| VEDANTA MISSION                                                                                               |
| "Spreading Love & Light by revealing the basic oneness of all"                                                |
+----------------------+----------------------+----------------------+------------------------------------------+
| ABOUT & ASHRAM       | SACRED TEACHINGS     | PUBLICATIONS         | CONNECT & SEVA                           |
| • Mission & Vision   | • Audio Discourses   | • Vedanta Sandesh    | • Plan a Visit / Directions              |
| • Our Acharyas       | • Video Pravachans   | • Vedanta Piyush     | • Donate / Ashram Seva                   |
| • Vedanta Ashram     | • Bhagavad Gita      | • E-Books            | • Verified Bank & UPI                    |
| • Facilities & Life  | • Upanishad Talks    | • Study Texts        | • Contact Us                             |
| • Trusts & Governance| • Prakarana Granth   | • Monthly Newsletter | • Official WhatsApp Desk                 |
| • Affiliated Centers | • Chanting & Bhajans | • Archive Mirrors    | • Admin Portal                           |
+----------------------+----------------------+----------------------+------------------------------------------+
| NEWSLETTER SUBSCRIPTION: [Enter your email address...] [Subscribe to Vedanta Sandesh]                         |
+---------------------------------------------------------------------------------------------------------------+
| © 2026 Vedanta Mission / Vedanta Parayan Samiti Trust. All Rights Reserved. | Privacy Policy | Terms of Seva    |
+---------------------------------------------------------------------------------------------------------------+
```

---

## 6. Interaction States & Transitions

1. **Sticky Header Behavior:**
   - **At Top (`scrollY < 16px`):** Semi-transparent background with delicate backdrop blur (`backdrop-filter: blur(12px)`).
   - **Scrolled (`scrollY >= 16px`):** Opaque dark surface (`rgba(18, 16, 14, 0.95)`) with subtle border separator.
2. **Active Link Indication:** Active routes receive a warm gold underline indicator (`border-b-2 border-amber-500`).
3. **Keyboard Accessibility:** Full keyboard tab navigation (`tabindex="0"`) with distinct `:focus-visible` focus rings.
