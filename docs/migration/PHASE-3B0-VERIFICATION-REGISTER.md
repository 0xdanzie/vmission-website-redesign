# PHASE 3B.0 — CLIENT VERIFICATION & SOURCE TRACEABILITY REGISTER
## Vedanta Mission / Vedanta Ashram, Indore
**Phase:** 3B.0 — Content Reconciliation + Master Migration Baseline  
**Date:** 7 September 2026  
**Status:** COMPLETE & AUTHORITATIVE VERIFICATION REGISTER  
**Governing Rule:** SEPARATE SOURCE-VERIFIED FROM PENDING VERIFICATION — NEVER INVENT CLIENT DATA  

---

## 1. Architectural Integrity & Verification Protocol

To prevent the publication of unverified claims, inaccurate legal entities, or erroneous financial accounts, every piece of critical content in the redesign must be classified into one of two strict tiers:

1. **SOURCE-VERIFIED:** Information supported by verified canonical records, legal documentation, live HTML source extracts, or physical artifacts.
2. **PENDING VERIFICATION:** Information requiring explicit, written client confirmation from the Ashram office or Poojya Guruji before public release.

> [!CAUTION]
> Under no circumstances may an item marked `PENDING VERIFICATION` be converted into a confirmed public claim or hardcoded into production client interfaces without written authorization.

---

## 2. Founder & Acharya Content Verification

### 2.1 Poojya Guruji Swami Atmananda Saraswati

| Attribute | Verified Status | Evidence / Source | Proposed Text / Value | Verification Gate |
|---|:---:|---|---|---|
| **Canonical Name** | **SOURCE-VERIFIED** | Live website, publications, legal trusts | Swami Atmananda Saraswati | Approved |
| **Traditional Honorific** | **SOURCE-VERIFIED** | Devotee discourse tradition | Poojya Guruji (पूज्य गुरुजी) | Approved |
| **Brahmacharya Initiation** | **SOURCE-VERIFIED** | Canonical bio record | 1983 (Sandeepany Sadhanalaya, Mumbai) | Approved |
| **Sanyas Deeksha Year** | **SOURCE-VERIFIED** | Canonical bio record, Homepage Ch 4 | 1987 | Approved |
| **Vedanta Mission Founding** | **SOURCE-VERIFIED** | Canonical bio record, Homepage Ch 4 | 1992 | Approved |
| **Indore Gurukula Establishment** | **SOURCE-VERIFIED** | Canonical bio record, Homepage Ch 4 | 1995 (Sudama Nagar, Indore) | Approved |
| **Spiritual Lineage** | **SOURCE-VERIFIED** | Historical teaching slides | Adi Shankaracharya Lineage · Chinmaya Mission | Approved |
| **Extended Life Story & Dates** | **PENDING VERIFICATION** | Early draft biographies | Early pre-monastic details, exact family origins | **CLIENT SIGN-OFF REQUIRED** before publishing full narrative |
| **Canonical Portrait** | **SOURCE-VERIFIED** | `public/images/vmission/acharyas/` | `guruji-portrait-riverside.jpg` (706×466) | Approved high-res master |

### 2.2 Resident Acharyas

| Acharya Name | Role / Title | Current Image Status | Biography Status | Verification Gate |
|---|---|---|---|---|
| **Swamini Amitananda Saraswati** | Senior Acharya | `swamini-amitananda.jpg` (300×280) — Low Res | Basic profile in `acharyas.ts` | **CLIENT SIGN-OFF REQUIRED** on biographical summary; request high-res portrait. |
| **Swamini Poornananda Saraswati** | Resident Acharya | `swamini-poornananda.jpg` (300×280) — Low Res | Basic profile in `acharyas.ts` | **CLIENT SIGN-OFF REQUIRED** on biographical summary; request high-res portrait. |
| **Swamini Samatananda Saraswati** | Resident Acharya | `swamini-samatananda.jpg` (300×280) — Low Res | Basic profile in `acharyas.ts` | **CLIENT SIGN-OFF REQUIRED** on biographical summary; request high-res portrait. |

---

## 3. Trusts & Legal Governance Verification

| Entity Name | Location | Role / Status | Status Classification | Legal Verification Requirement |
|---|---|---|:---:|---|
| **Vedanta Parmarthic Sewa Trust** | Indore, Madhya Pradesh | Primary Public Charitable Trust | **SOURCE-VERIFIED** | Registration details confirmed; confirm current active 80-G certificate number. |
| **Ishwara Charitable Trust** | Mumbai, Maharashtra | Public Charitable Trust (Philanthropic) | **SOURCE-VERIFIED** | Confirmed registered public charitable trust. |
| **Ancient Indian Culture Trust** | Mumbai, Maharashtra | Cultural Preservation Trust | **PENDING VERIFICATION** | **DO NOT UPGRADE TO CONFIRMED.** Must verify active registration number and board details. |
| **ICF @ Mumbai Entity** | Mumbai, Maharashtra | Associated Trust / Sub-page | **CONFLICT / VERIFY** | Resolve conflict between "Indian Culture Foundation" and "Indore Cancer Foundation". |

---

## 4. Financial & Donation Verification (STRICT CLIENT GATE)

> [!WARNING]
> Financial data represents the highest security and compliance risk. The live Next.js application must never expose unverified bank accounts or personal UPI handles.

| Field / Asset | Value in Old Site / Prototype | Status Classification | Action / Gate Rule |
|---|---|:---:|---|
| **Primary Bank Account** | A/C: `02811000003766` | **PENDING VERIFICATION** | Written confirmation from VPST treasurer that account is active and unrestricted. |
| **Bank Name & Branch** | HDFC Bank, Annapoorna Road, Indore-452009 | **SOURCE-VERIFIED** | Branch verified; confirm continued operational use. |
| **IFSC Code** | `HDFC0001771` | **SOURCE-VERIFIED** | Verified active IFSC for Annapoorna Rd Branch. |
| **Foreign Remittance A/C** | A/C: `0281100004040` (Swami Atmananda) | **PENDING VERIFICATION** | Confirm active FCRA compliance and foreign wire instructions. |
| **Swift / BIC Code** | `HDFCINBB` / `HDFCINBBXXX` | **SOURCE-VERIFIED** | Standard HDFC international routing codes. |
| **Official Trust UPI** | `vedantaparmarthicsew.65038308@hdfcbank` | **PENDING VERIFICATION** | Confirm active VPA and request official high-res QR code image. |
| **Individual UPI Handles (4)**| `swatma@upi`, `swamita@upi`, etc. | **PENDING VERIFICATION** | Suppress from public UI unless explicitly requested by the Acharyas. |
| **PayPal Handle** | `paypal.me/swatma` | **PENDING VERIFICATION** | Confirm active international receipt capability. |
| **80-G Tax Exemption** | Claimed on footer & about | **PENDING VERIFICATION** | Client must provide 80-G certificate number and validity dates. |

---

## 5. Contact, Travel & Communication Verification

| Communication Channel | Documented Value | Status Classification | Action / Gate Rule |
|---|---|:---:|---|
| **Physical Address** | Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009 | **SOURCE-VERIFIED** | Authoritative physical address. Fully verified. |
| **Official Contact Email** | `vmission@gmail.com` | **PENDING VERIFICATION** | Confirm mailbox is monitored daily by ashram office staff. |
| **General Phone / WhatsApp** | `+91 98269 59480` | **PENDING VERIFICATION** | Confirm designated ashram helpline responder. |
| **Secondary Donation WhatsApp**| `+91 7000361938` | **PENDING VERIFICATION** | Resolve dual-number discrepancy: designate specific helpline roles. |
| **Guest Accommodation Policy**| Kutirs & guest rooms | **PENDING VERIFICATION** | Supply official booking rules, stay durations, and pilgrim etiquette. |

---

## 6. Events & Retreats Verification

| Event Record | Current Documented Dates | Status Classification | Action / Gate Rule |
|---|---|:---:|---|
| **Guru Poornima 2026/2027** | Mentioned July 10 in prototype data | **PENDING VERIFICATION** | Confirm exact dates for upcoming annual sacred celebrations. |
| **Residential Meditation Camp**| Mentioned July 26–29, 2026 in WhatsApp | **PENDING VERIFICATION** | Confirm whether 2026 camp took place or if 2027 dates are scheduled. |
| **Online Gita Course Batch** | September 2026 batch in prototype | **PENDING VERIFICATION** | Confirm whether live registration batches are active. |
| **Historical Programs Archive**| Multi-year shivir and yagna reports | **SOURCE-VERIFIED** | Preserved for historical events archive on `/events#archive`. |

---

## 7. Structured Study (Learn / Courses) Verification

| Study Offering | Documented Status | Status Classification | Action / Gate Rule |
|---|---|:---:|---|
| **Tattva Bodha Online** | 4 sessions × 10 lessons | **PENDING VERIFICATION** | Confirm whether email evaluation of questionnaires is actively staffed. |
| **Gita Online Lessons** | 40 lessons covering 18 chapters | **PENDING VERIFICATION** | Confirm whether registration is open and lessons are distributed. |
| **Residential Gurukula Program**| 3-year full-time course (Free) vs 12-month course (Rs 25,000/mo fee) | **CONFLICT / VERIFY** | **CRITICAL POLICY RESOLUTION NEEDED.** Resolve conflict before publishing course fees. |
| **Weekly Online Classes** | Mentioned in WhatsApp widget | **PENDING VERIFICATION** | Confirm Zoom/YouTube streaming links, days of week, and timings. |

---

## 8. Resource Hosting & Link-Rot Risk Register

| Resource Group | Current Host Platform | Risk Level | Mitigation & Implementation Action |
|---|---|:---:|---|
| **Sanskrit Study Texts (8)** | pCloud short links (`u.pc.cd/*`) | **HIGH RISK** | Download all 8 PDFs immediately; re-upload to Archive.org / GDrive. |
| **Legacy Audio Discourses (11)**| WordPress `wp-content/uploads/` | **HIGH RISK** | Scrape direct MP3 files before legacy WordPress server shutdown. |
| **Drig Drushya Viveka Audio** | Box.com (`app.box.com/...`) | **MEDIUM RISK** | Mirror Box files to Archive.org to eliminate single-account dependency. |
| **Vedanta Sandesh (2025–2026)** | Archive.org | **VERIFIED / STABLE** | Designated canonical mirror for all publication issues. |
| **YouTube Video Playlists (7)** | YouTube (`youtube.com`) | **VERIFIED / STABLE** | Embed verified playlist IDs directly in `/teachings`. |
| **Email Excerpts PDF** | pCloud (`u.pc.cd/ETH`) | **CONSENT GATE** | Do not migrate without written client consent for publishing personal counsel. |
