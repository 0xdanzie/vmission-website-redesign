# CLIENT VERIFICATION REGISTER (RESOURCE DEPENDENCIES)
## V-Mission / Vedanta Ashram, Indore — Redesign Project
**Phase:** 2C — Resource Architecture + Production Resource Catalog  
**Date:** 2026-09-04  
**Status:** AUTHORITATIVE CLIENT DEPENDENCY REGISTER — PLANNING ONLY  
**Authoritative Basis:** Builds on Phase 2A (`CLIENT-VERIFICATION-MATRIX.md`, `PHASE-2A-OPEN-QUESTIONS.md`) and Phase 2C catalogs.

---

## 1. Purpose & Verification Gate Rules

This register catalogs every content, media, legal, and operational resource that **cannot be published or hardcoded into production without explicit client sign-off**.

### Gate Rules:
1. **Zero Financial Compromise:** Bank accounts, UPI handles, and tax exemption numbers remain suppressed or marked sample until verified in writing.
2. **Identity Integrity:** Acharya biographies and portraits must be officially supplied; placeholder bios will not be indexed.
3. **Distribution Rights:** Archival streaming and download of all recorded discourses and publications must be officially confirmed.

---

## 2. Master Verification Register

| Ref ID | Category / Asset | Specific Item Requiring Verification | Evidence Found in Audit | Proposed Architectural Decision | Impact if Left Unresolved |
|:---:|---|---|---|---|---|
| **VR-01** | **Video** | Official YouTube Channel URL & Ownership | 7 active playlist IDs (`PLVT0gU53weD...`) embedded on `/vm-videos-2/` | Embed playlists directly in `/teachings`; link to official channel once confirmed | Visitors cannot click through to subscribe to official channel; embed branding remains generic |
| **VR-02** | **Audio** | Audio Hosting Storage & Rights | Audio files hosted on WordPress `wp-content/uploads/` and Box.com | Stream from verified mirrors; re-host Box.com files on Archive.org | Risk of audio stream breakage if legacy WordPress server is decommissioned |
| **VR-03** | **Publications** | Publication Rights & Archive.org Mirroring | Multi-mirror distribution confirmed (Archive.org, GDrive, Box, pCloud) | Designate Archive.org as canonical download mirror | Zero bandwidth cost; ensures permanent public accessibility without server overload |
| **VR-04** | **Publications** | *Vedanta Sandesh* Archive Completeness | Confirmed 2026 (Jan–Mar) and 2025 (Jul–Dec); earlier years exist | Launch with confirmed 2025–2026 issues; ingest earlier years in batches | Historical archive launches partially populated |
| **VR-05** | **Publications** | *Vedanta Piyush* Archive Inventory | Hub page `/vedanta-piyush-ezine/` exists on old site | Scrape and catalog Hindi issues in Phase 3 | Hindi e-zine archive remains pending full inventory |
| **VR-06** | **Publications** | *Vedanta Articles* Volume 5 Gap | Old `/e-books/` lists Vol 1, 2, 3, 4, 6 (Volume 5 omitted) | Client confirmation: Was Vol 5 published under a different title or skipped? | Missing volume in sequential series |
| **VR-07** | **Publications** | *Email Excerpts* Publication Consent | pCloud link `u.pc.cd/ETH` on legacy `/e-books/` | Defer publication until client confirms letters are approved for open web | Risk of publishing private or unvetted correspondence |
| **VR-08** | **Publications** | pCloud Short Link Longevity | 8 study texts hosted on short URLs (`u.pc.cd/...`) | Re-upload PDF files to Archive.org or Google Drive | High risk of 404 link-rot if pCloud accounts expire |
| **VR-09** | **Acharyas** | Biographical Profiles & Lineage Text | 4 placeholder bios in prototype; 4 profile pages on old site | Client to supply approved biographical summaries for all 4 Acharyas | Platform cannot launch with placeholder or outdated biography text |
| **VR-10** | **Acharyas** | High-Resolution Acharya Portraits | Stock/placeholder imagery in prototype | Client to supply approved high-resolution portraits | Inconsistent visual identity |
| **VR-11** | **Donations** | Primary Bank Account & IFSC Code | A/C: `02811000003766`, IFSC: `HDFC0001771` on old site | Client must confirm account number and IFSC are currently active | Donors could transfer funds to closed or erroneous bank accounts |
| **VR-12** | **Donations** | UPI Handles & QR Code | 5 individual UPI IDs listed on old donation page | Client to provide single official Trust VPA and approved QR code | High security risk of misdirected religious donations |
| **VR-13** | **Donations** | 80-G Tax Exemption Certificate | Old site did not state 80-G certificate number | Client to confirm 80-G validity and supply official receipt template | Donors cannot claim Indian income tax deduction |
| **VR-14** | **Donations** | FCRA / Foreign Remittance A/C | Foreign A/C: `0281100004040` listed on old site | Client must verify active FCRA compliance and Swift codes | Legal non-compliance for overseas donations |
| **VR-15** | **Contact** | Official Contact Email & WhatsApp Desk | `vmission@gmail.com`, WhatsApp: `+91 98269 59480` | Client confirms official monitored inbox and designated responder | Inquiries and pilgrimage requests go unanswered |
| **VR-16** | **Events** | Current 2026 Program & Shibir Calendar | 2024/2025 sample events in prototype; old site has stale calendar | Client to supply confirmed 2026 dates (e.g. Guru Purnima, Shivirs) | Website displays outdated festival dates |
| **VR-17** | **Learn** | Online Classes & Gurukula Admission Status | Mentions of "Online Classes" and "3-Year Gurukula" on old site | Client to specify if rolling admissions/classes exist | Visitors attempt to enroll in inactive or non-existent courses |
| **VR-18** | **Ashram** | Guest Guidelines & Accommodations | General descriptions of Kutirs on old site | Client to confirm accommodation booking etiquette and facilities | Unrealistic visitor expectations regarding ashram stay |

---

## 3. Recommended Action Plan for Client Review
1. **Immediate Review Package:** Deliver items `VR-09` (Bios), `VR-11` to `VR-14` (Donation details), and `VR-15` (Contact info) to the Ashram office as the primary blocker set.
2. **Phase 3 Staging Gate:** Keep `/donate` bank details and `/acharyas` bios behind staging flags until written authorization is received.
