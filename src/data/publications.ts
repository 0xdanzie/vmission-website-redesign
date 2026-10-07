// Publications Data — Vedanta Mission
// Single source of truth for Vedanta Sandesh, Vedanta Piyush, E-Books, and Study Texts
// Reconciled from Phase 3D.4 Canonical Migration Matrix
// Total Canonical Entities: 250 (Sandesh: 87, Piyush: 77, Books: 6, Study Texts: 80)

export type PublicationType =
  | 'Vedanta Sandesh'
  | 'Vedanta Piyush'
  | 'E-Books'
  | 'Study & Chant Texts';

export type PublicationLanguage =
  | 'English'
  | 'Hindi'
  | 'Gujarati'
  | 'Hindi / Gujarati'
  | 'Sanskrit / Hindi'
  | string;

export interface Publication {
  id: string;
  canonicalId?: string;
  type: PublicationType;
  title: string;
  month?: string;
  year?: number;
  coverImage?: string | null;
  language: PublicationLanguage;
  downloadUrl: string;
  archiveUrl?: string;
  readOnlineUrl?: string;
  mirrors?: Record<string, string> | string[];
  description?: string;
  isLatest?: boolean;
  pageCount?: number;
  author?: string;
  localCover?: string;
  sourceCoverUrl?: string;
  canonicalSource?: string;
  alternateSources?: string[];
}

export const PUBLICATIONS: Publication[] = [
  {
    "id": "vs-2021-may",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000184",
    "canonicalSource": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "alternateSources": [
      "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "https://drive.google.com/file/d/11tChJJ5DA-dnq8UlGFC20Yw6jg-DshBF/view?usp=sharing",
      "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "https://app.box.com/s/8j1jwn1ojwteor2lw4r1srb3rba879ja",
      "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "https://issuu.com/vmission/docs/vedanta_sandesh_apr_2021",
      "http://u.pc.cd/2xVctalK",
      "http://u.pc.cd/dUl7",
      "https://vmission.us10.list-manage.com/track/click?u=09a10c62ff159979591539cf7&id=17ea34467a&e=ad5d26e7d3"
    ]
  },
  {
    "id": "vs-000185",
    "canonicalId": "canonical-000185",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-2 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/1Qnx21VqKWKaZVTX7ArDoKGnLcpw5rTi6/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1Qnx21VqKWKaZVTX7ArDoKGnLcpw5rTi6/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1Qnx21VqKWKaZVTX7ArDoKGnLcpw5rTi6/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1Qnx21VqKWKaZVTX7ArDoKGnLcpw5rTi6/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1-AXVUJGQb48244dNwB3-Z3t2f7qgb26P/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/inpgtfy1nx83unht0xfmrjllef8ym4g9",
      "mirror_3": "https://app.box.com/s/177z3y8k8pczgd5422f4okczhphnn6t8",
      "mirror_4": "https://issuu.com/vmission/docs/vedanta_sandesh_mar_2021",
      "mirror_5": "https://issuu.com/vmission/docs/vedanta_sandesh_feb_2021",
      "mirror_6": "http://u.pc.cd/QsNrtalK",
      "mirror_7": "http://u.pc.cd/dUl7"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000186",
    "canonicalId": "canonical-000186",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-4 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/1HHd7NAm9r1sdcE-Dc1X9p2sxU4BPJjJE/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1HHd7NAm9r1sdcE-Dc1X9p2sxU4BPJjJE/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1HHd7NAm9r1sdcE-Dc1X9p2sxU4BPJjJE/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1HHd7NAm9r1sdcE-Dc1X9p2sxU4BPJjJE/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1BvxPmv7Mbt6-NpJyklDePebSkyab4dxA/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/lize48y1j5du6ik5ql1dodvia2l2ucif",
      "mirror_3": "https://issuu.com/vmission/docs/vedanta_sandesh_jan_2021",
      "mirror_4": "https://issuu.com/vmission/docs/vedanta_sandesh_dec_2020",
      "mirror_5": "http://u.pc.cd/r1TrtalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000187",
    "canonicalId": "canonical-000187",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-6 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/1H3IyOF89qWcHPuyduagFabJ55k1NUyow/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1H3IyOF89qWcHPuyduagFabJ55k1NUyow/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1H3IyOF89qWcHPuyduagFabJ55k1NUyow/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1H3IyOF89qWcHPuyduagFabJ55k1NUyow/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/vgcmuierul5wbu7wumikyzbnxsx8qnq2",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_20sandesh_nov_202020",
      "mirror_3": "http://u.pc.cd/5ndctalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000188",
    "canonicalId": "canonical-000188",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-8 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/1eW1lhhZ9_7dvPMfCdewufwqufsOniSNY/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1eW1lhhZ9_7dvPMfCdewufwqufsOniSNY/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1eW1lhhZ9_7dvPMfCdewufwqufsOniSNY/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1eW1lhhZ9_7dvPMfCdewufwqufsOniSNY/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/uw960yyhzn2vhf5lyesfbryisl9xnvhj",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_oct_2020",
      "mirror_3": "http://u.pc.cd/P2UrtalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000189",
    "canonicalId": "canonical-000189",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-10 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/12BtS0O5exBqIoqz1j1zcuYpiy1FDV5Bj/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/12BtS0O5exBqIoqz1j1zcuYpiy1FDV5Bj/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/12BtS0O5exBqIoqz1j1zcuYpiy1FDV5Bj/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/12BtS0O5exBqIoqz1j1zcuYpiy1FDV5Bj/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/d4zwogkyx07z6l7kh6fhzfe51jmzum3d",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_sept_2020",
      "mirror_3": "http://u.pc.cd/q3zrtalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000190",
    "canonicalId": "canonical-000190",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-12 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/file/d/1qLky38IiIA_KRtmnpCLIPaDVM1WR6DW/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1qLky38IiIA_KRtmnpCLIPaDVM1WR6DW/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1qLky38IiIA_KRtmnpCLIPaDVM1WR6DW/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1qLky38IiIA_KRtmnpCLIPaDVM1WR6DW/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/85ctxuxq8qm832vo3vqreprrb1pacu2q",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_aug_2020",
      "mirror_3": "http://u.pc.cd/W1YrtalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000191",
    "canonicalId": "canonical-000191",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-14 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://app.box.com/s/0pkk3scwt3yucxgb874vivhxlz44mid7",
    "archiveUrl": "https://app.box.com/s/0pkk3scwt3yucxgb874vivhxlz44mid7",
    "readOnlineUrl": "https://app.box.com/s/0pkk3scwt3yucxgb874vivhxlz44mid7",
    "mirrors": {
      "canonical": "https://app.box.com/s/0pkk3scwt3yucxgb874vivhxlz44mid7",
      "mirror_1": "http://u.pc.cd/1bOrtalK"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-2021-jul",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000192",
    "canonicalSource": "https://drive.google.com/file/d/1xdx5dpZ7NLrzLRUsROIpozK_OYL_MChv/view?usp=sharing",
    "alternateSources": [
      "https://app.box.com/s/0pkk3scwt3yucxgb874vivhxlz44mid7",
      "https://issuu.com/vmission/docs/vedanta_sandesh_july_2020",
      "http://u.pc.cd/1bOrtalK"
    ]
  },
  {
    "id": "vs-2021-jun",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000193",
    "canonicalSource": "https://drive.google.com/file/d/13neSs-7TOFGGOXgX842xWv5YM4EM4B0r/view?usp=sharing",
    "alternateSources": [
      "https://app.box.com/s/eyt1189zu4l5990bp3rfrkzj6lpc5xpy",
      "https://issuu.com/vmission/docs/vedanta_sandesh_june_2020",
      "http://u.pc.cd/zdg7",
      "https://www.scribd.com/document/463789592/Vedanta-Sandesh-June-2020"
    ]
  },
  {
    "id": "canonical-000194",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000194",
    "canonicalSource": "https://drive.google.com/open?id=1gxvpYEwns0vwwPr3SgNuwrPCS8Bqb3HB",
    "alternateSources": [
      "https://app.box.com/s/hw7gddkxk8s8qbw2i8174qkz6ylpnnjo",
      "https://issuu.com/vmission/docs/vedanta_sandesh_may_2020",
      "https://my.pcloud.com/publink/show?code=XZsBTKkZgbp3nELw6LQs05YIA42FGk2jw73y",
      "https://www.scribd.com/document/459187997/Vedanta-Sandesh-May-2020"
    ]
  },
  {
    "id": "vs-000195",
    "canonicalId": "canonical-000195",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-21 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://my.pcloud.com/publink/show?code=XZKPpTkZt3p3tGv7yDkjHXrGTiWX4BwoJn3V",
    "archiveUrl": "https://my.pcloud.com/publink/show?code=XZKPpTkZt3p3tGv7yDkjHXrGTiWX4BwoJn3V",
    "readOnlineUrl": "https://my.pcloud.com/publink/show?code=XZKPpTkZt3p3tGv7yDkjHXrGTiWX4BwoJn3V",
    "mirrors": {
      "canonical": "https://my.pcloud.com/publink/show?code=XZKPpTkZt3p3tGv7yDkjHXrGTiWX4BwoJn3V",
      "mirror_1": "https://tinyurl.com/wfkalo4",
      "mirror_2": "https://tinyurl.com/s5te5zr",
      "mirror_3": "http://k9yo.mjt.lu/lnk/AMQAAG1TJB4AAcp7Y_oAAAFHU9kAAAABHZQAAFLOAAl5lwBeg-eQDbMdYfdySwuOwar6meOFBQAI-rU/9/8U-R2oaU5ZHAmPQKOgHNTw/aHR0cHM6Ly9hcHAuYm94LmNvbS9zL3FzemVwZW4xNXloeHpsc3Vta3o1OGlrbWd1bzBveTlp",
      "mirror_4": "http://k9yo.mjt.lu/lnk/AMQAAG1TJB4AAcp7Y_oAAAFHU9kAAAABHZQAAFLOAAl5lwBeg-eQDbMdYfdySwuOwar6meOFBQAI-rU/8/ORUi5JUF2kQ5Xvevld_U8g/aHR0cHM6Ly93d3cuc2NyaWJkLmNvbS9kb2N1bWVudC80NTQxODc1NTMvVmVkYW50YVNhbmRlc2gtQXByMjAyMA"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000196",
    "canonicalId": "canonical-000196",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-23 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1RrOeA6URQAQVxcjAi0WEfL4vYeTdvtpk",
    "archiveUrl": "https://drive.google.com/open?id=1RrOeA6URQAQVxcjAi0WEfL4vYeTdvtpk",
    "readOnlineUrl": "https://drive.google.com/open?id=1RrOeA6URQAQVxcjAi0WEfL4vYeTdvtpk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1RrOeA6URQAQVxcjAi0WEfL4vYeTdvtpk",
      "mirror_1": "https://app.box.com/s/c3ijnex75qw94ktlvhr4eqb0synn88od",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_mar_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZxCHDkZyi9C9EzAxcSq3w0wmANDhXxHT0zX",
      "mirror_4": "https://www.scribd.com/document/448623990/Vedanta-Sandesh-Mar-2020"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000197",
    "canonicalId": "canonical-000197",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-25 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1Xfegk7ZQXMVWZNnI-GCmz3Pu-Kz-DQPD",
    "archiveUrl": "https://drive.google.com/open?id=1Xfegk7ZQXMVWZNnI-GCmz3Pu-Kz-DQPD",
    "readOnlineUrl": "https://drive.google.com/open?id=1Xfegk7ZQXMVWZNnI-GCmz3Pu-Kz-DQPD",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1Xfegk7ZQXMVWZNnI-GCmz3Pu-Kz-DQPD",
      "mirror_1": "https://app.box.com/s/3kcv546u8metsp8yohnvgw40q52jjoi5",
      "mirror_2": "https://issuu.com/vmission/docs/vedantasandesh_feb2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZWwO2kZMy1SbSY7R9mlDtWA1Ap6N4MBpTGX",
      "mirror_4": "https://www.scribd.com/document/444744840/Vedanta-Sandesh-Feb-2020"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000198",
    "canonicalId": "canonical-000198",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-27 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=15QNzvyIDWZM_Fj9OyAUKmdjqRHinxThq",
    "archiveUrl": "https://drive.google.com/open?id=15QNzvyIDWZM_Fj9OyAUKmdjqRHinxThq",
    "readOnlineUrl": "https://drive.google.com/open?id=15QNzvyIDWZM_Fj9OyAUKmdjqRHinxThq",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=15QNzvyIDWZM_Fj9OyAUKmdjqRHinxThq",
      "mirror_1": "https://app.box.com/s/fqiodjnz54zeao8nhzfuad2fq79hjpk4",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_jan_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZfExSkZ8FEviaI92LSxP2Fp8iCgnzldUbny",
      "mirror_4": "https://www.scribd.com/document/441361080/Vedanta-Sandesh-Jan-2020"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000199",
    "canonicalId": "canonical-000199",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-29 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1iV_rj0dWYymNsRN03FDXq_wRQXvaa4WK",
    "archiveUrl": "https://drive.google.com/open?id=1iV_rj0dWYymNsRN03FDXq_wRQXvaa4WK",
    "readOnlineUrl": "https://drive.google.com/open?id=1iV_rj0dWYymNsRN03FDXq_wRQXvaa4WK",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1iV_rj0dWYymNsRN03FDXq_wRQXvaa4WK",
      "mirror_1": "https://app.box.com/s/150l7d8nsjxl7049he9yy4kj7ed98p9p",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_dec_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZepSmkZrauz9D6a3qYjd58fDbWn8jRJ7A9X",
      "mirror_4": "https://www.scribd.com/document/437596523/Vedanta-Sandesh-Dec-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000200",
    "canonicalId": "canonical-000200",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-31 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1YB3rKUuvwRgEv14QyFRvwH4bil6pf-ru",
    "archiveUrl": "https://drive.google.com/open?id=1YB3rKUuvwRgEv14QyFRvwH4bil6pf-ru",
    "readOnlineUrl": "https://drive.google.com/open?id=1YB3rKUuvwRgEv14QyFRvwH4bil6pf-ru",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1YB3rKUuvwRgEv14QyFRvwH4bil6pf-ru",
      "mirror_1": "https://app.box.com/s/cgcrqpj83q2fbpdfbl2zhnic7cqweqlt",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_-_nov_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZESE8kZgGJl6OAqszpSmagfHgxLn4d4LHak",
      "mirror_4": "https://www.scribd.com/document/432932285/Vedanta-Sandesh-Nov-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000201",
    "canonicalId": "canonical-000201",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-33 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1PzORoCU5l9EwsDkxpshNImrANFAvAswg",
    "archiveUrl": "https://drive.google.com/open?id=1PzORoCU5l9EwsDkxpshNImrANFAvAswg",
    "readOnlineUrl": "https://drive.google.com/open?id=1PzORoCU5l9EwsDkxpshNImrANFAvAswg",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1PzORoCU5l9EwsDkxpshNImrANFAvAswg",
      "mirror_1": "https://app.box.com/s/ccj3qfag110t2bv8x9ovzb7xmweg02eg",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_oct_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZ3oXRkZljbcVLvT36fyIj49yW0bQflFqvr7",
      "mirror_4": "https://www.scribd.com/document/427969409/Vedanta-Sandesh-Oct-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000202",
    "canonicalId": "canonical-000202",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-35 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1naSWETdOwEmKHGXLB7AdbI4sl6e7lZyx",
    "archiveUrl": "https://drive.google.com/open?id=1naSWETdOwEmKHGXLB7AdbI4sl6e7lZyx",
    "readOnlineUrl": "https://drive.google.com/open?id=1naSWETdOwEmKHGXLB7AdbI4sl6e7lZyx",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1naSWETdOwEmKHGXLB7AdbI4sl6e7lZyx",
      "mirror_1": "https://app.box.com/s/ztph1e44jiassldmzkwceb0to3hfvlb8",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_sept_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZRjiXkZSDXxBvxzxiLGkT204KtdWBDRH0W7",
      "mirror_4": "https://www.scribd.com/document/423959548/Vedanta-Sandesh-Sept-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000203",
    "canonicalId": "canonical-000203",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-37 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1jKHREqMMRquRMzjfN_xAgU1KMuPMgizW",
    "archiveUrl": "https://drive.google.com/open?id=1jKHREqMMRquRMzjfN_xAgU1KMuPMgizW",
    "readOnlineUrl": "https://drive.google.com/open?id=1jKHREqMMRquRMzjfN_xAgU1KMuPMgizW",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1jKHREqMMRquRMzjfN_xAgU1KMuPMgizW",
      "mirror_1": "https://app.box.com/s/sfwu0wmkbewf4ii7623gks5ri6ad85vo",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_aug_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZdfrv7ZJKoY5hMOWUpU6kGMNF75A8WrH8YX",
      "mirror_4": "https://www.scribd.com/document/420423478/Vedanta-Sandesh-Aug-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000204",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000204",
    "canonicalSource": "https://drive.google.com/open?id=1FrHCqHuOg52_u-hWqY0s0rqkvqU1dnBy",
    "alternateSources": [
      "https://app.box.com/s/jilz1x68mosj9dxe4g5evisyo70opx5p",
      "https://issuu.com/home/published/vedanta_sandesh_-_july_2019",
      "https://pcdn-my.pcloud.com/publink/show?code=XZhjF37ZlEnRqPWqKkXOavYUxB7b5RIf0fBX",
      "https://www.scribd.com/document/415159312/Vedanta-Sandesh-July-2019"
    ]
  },
  {
    "id": "canonical-000205",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000205",
    "canonicalSource": "https://drive.google.com/open?id=1zNJ4blf4yYBLo3xw-vhmf2CGPORP8PyO",
    "alternateSources": [
      "https://app.box.com/s/25xlawgg98fie594fatkygsmpgq9si8w",
      "https://issuu.com/home/published/vedanta_sandesh_-_june_2019",
      "https://pcdn-my.pcloud.com/publink/show?code=XZBOeA7ZSl9ODhTm5Y5MsSliYGHhGFGyRdDX",
      "https://www.scribd.com/document/412018078/Vedanta-Sandesh-June-2019"
    ]
  },
  {
    "id": "canonical-000206",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000206",
    "canonicalSource": "https://drive.google.com/open?id=1YElnLRBk35BHLte2QkeAtBbc8PzIxteY",
    "alternateSources": [
      "https://app.box.com/s/edtdrmuwx8pc9y8z1czzx9juknavmxc7",
      "https://issuu.com/home/published/vedanta_sandesh_-_may_2019",
      "https://pcdn-my.pcloud.com/publink/show?code=XZ1rvO7Z8emrGEqBbk7KjIqKIDQcq01F8bd7",
      "https://www.scribd.com/document/412018018/Vedanta-Sandesh-May-2019-pdf"
    ]
  },
  {
    "id": "vs-000207",
    "canonicalId": "canonical-000207",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-45 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1RLVWrQzpvTHU-LUJWfe7BVDLmvpzmP-6",
    "archiveUrl": "https://drive.google.com/open?id=1RLVWrQzpvTHU-LUJWfe7BVDLmvpzmP-6",
    "readOnlineUrl": "https://drive.google.com/open?id=1RLVWrQzpvTHU-LUJWfe7BVDLmvpzmP-6",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1RLVWrQzpvTHU-LUJWfe7BVDLmvpzmP-6",
      "mirror_1": "https://app.box.com/s/j0fnx2gk3kizijvfvc6cf7nyoc2tghdb",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_apr_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZQO267ZLnpvqnAzaEFFXHc30CgM55ysQqCy",
      "mirror_4": "https://www.scribd.com/document/403884323/Vedanta-Sandesh-Apr-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000208",
    "canonicalId": "canonical-000208",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-47 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1Ux2vZcpbFxp74nI9SGt63S0odVyuhfBG",
    "archiveUrl": "https://drive.google.com/open?id=1Ux2vZcpbFxp74nI9SGt63S0odVyuhfBG",
    "readOnlineUrl": "https://drive.google.com/open?id=1Ux2vZcpbFxp74nI9SGt63S0odVyuhfBG",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1Ux2vZcpbFxp74nI9SGt63S0odVyuhfBG",
      "mirror_1": "https://app.box.com/s/m6n01p9n8yg4o7wvatbvwrljumzbvzn9",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_mar_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZ1rvO7Z8emrGEqBbk7KjIqKIDQcq01F8bd7",
      "mirror_4": "https://pcdn-my.pcloud.com/publink/show?code=XZucid7ZfgQJ35HFOIuctTPPnYuVM7cBlTiX",
      "mirror_5": "https://www.scribd.com/document/400848549/Vedanta-Sandesh-Mar-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000209",
    "canonicalId": "canonical-000209",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-49 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1muCGFK7PhmtVNYRsoOg5BG6DtV1TVGFB",
    "archiveUrl": "https://drive.google.com/open?id=1muCGFK7PhmtVNYRsoOg5BG6DtV1TVGFB",
    "readOnlineUrl": "https://drive.google.com/open?id=1muCGFK7PhmtVNYRsoOg5BG6DtV1TVGFB",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1muCGFK7PhmtVNYRsoOg5BG6DtV1TVGFB",
      "mirror_1": "https://app.box.com/s/8fbi5u0wvtnrmoarvzljdpf0r1l01vdf",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_feb_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZqNBK7ZD1Djo4v9xUL2QHO2mSrh308DKCRk",
      "mirror_4": "https://www.scribd.com/document/398636570/Vedanta-Sandesh-Feb-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000210",
    "canonicalId": "canonical-000210",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-51 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1UFJm6WoHOQCIaPcqVL1SaOW0RuSkCBkm",
    "archiveUrl": "https://drive.google.com/open?id=1UFJm6WoHOQCIaPcqVL1SaOW0RuSkCBkm",
    "readOnlineUrl": "https://drive.google.com/open?id=1UFJm6WoHOQCIaPcqVL1SaOW0RuSkCBkm",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1UFJm6WoHOQCIaPcqVL1SaOW0RuSkCBkm",
      "mirror_1": "https://app.box.com/s/wn2asvasgh3mwfan6db4h2145penh9vb",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_jan_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZoiGC7ZK9zB3xmpB04wM0x0gftjqjDg5kYy",
      "mirror_4": "https://www.scribd.com/document/396612372/Vedanta-Sandesh-Jan-2019"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000211",
    "canonicalId": "canonical-000211",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-53 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1iGT-z3GZyy801ZNHKelFMxFWwRsErI3J",
    "archiveUrl": "https://drive.google.com/open?id=1iGT-z3GZyy801ZNHKelFMxFWwRsErI3J",
    "readOnlineUrl": "https://drive.google.com/open?id=1iGT-z3GZyy801ZNHKelFMxFWwRsErI3J",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1iGT-z3GZyy801ZNHKelFMxFWwRsErI3J",
      "mirror_1": "https://app.box.com/s/jh29d38ozc646glqwcr3ox9jaxz7r0du",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_jan2018",
      "mirror_3": "https://www.scribd.com/document/368187802/Vedanta-Sandesh-Jan-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000212",
    "canonicalId": "canonical-000212",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-55 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1XgcfbtOnmBLPeq0ywiXyhRG6ERG9ZFea",
    "archiveUrl": "https://drive.google.com/open?id=1XgcfbtOnmBLPeq0ywiXyhRG6ERG9ZFea",
    "readOnlineUrl": "https://drive.google.com/open?id=1XgcfbtOnmBLPeq0ywiXyhRG6ERG9ZFea",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1XgcfbtOnmBLPeq0ywiXyhRG6ERG9ZFea",
      "mirror_1": "https://app.box.com/s/2x0iw9jae9p6bwazirbk3tgi8puw20sp",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_-_feb2018",
      "mirror_3": "https://www.scribd.com/document/370519493/Vedanta-Sandesh-Feb-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000213",
    "canonicalId": "canonical-000213",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-57 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1hVoanA6-Wmw7OYG_8866vhnZqLDh5h82",
    "archiveUrl": "https://drive.google.com/open?id=1hVoanA6-Wmw7OYG_8866vhnZqLDh5h82",
    "readOnlineUrl": "https://drive.google.com/open?id=1hVoanA6-Wmw7OYG_8866vhnZqLDh5h82",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1hVoanA6-Wmw7OYG_8866vhnZqLDh5h82",
      "mirror_1": "https://app.box.com/s/lr0qf0xux0ghnqoawhw2ml40vc8tnia1",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_mar_2018",
      "mirror_3": "https://www.scribd.com/document/372684338/Vedanta-Sandesh-Mar-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000214",
    "canonicalId": "canonical-000214",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-59 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1iEPOmHN3F7MSzjz2lRMhj1C46_dS-Tx9",
    "archiveUrl": "https://drive.google.com/open?id=1iEPOmHN3F7MSzjz2lRMhj1C46_dS-Tx9",
    "readOnlineUrl": "https://drive.google.com/open?id=1iEPOmHN3F7MSzjz2lRMhj1C46_dS-Tx9",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1iEPOmHN3F7MSzjz2lRMhj1C46_dS-Tx9",
      "mirror_1": "https://app.box.com/s/2pvdj8icidso63etwn83scuawtmnmf4x",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_apr2018",
      "mirror_3": "https://www.scribd.com/document/375259373/Vedanta-Sandesh-Apr-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000215",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000215",
    "canonicalSource": "https://drive.google.com/open?id=1TDqxclcJ1clSjWTqNXNgXquReYQp0P95",
    "alternateSources": [
      "https://app.box.com/s/9qld8isunknf4q97uivjpk6pxlyaqh32",
      "https://issuu.com/home/published/vedanta_sandesh_-_may_2018",
      "https://www.scribd.com/document/377845416/Vedanta-Sandesh-May-2018"
    ]
  },
  {
    "id": "canonical-000216",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000216",
    "canonicalSource": "https://drive.google.com/open?id=16HKjr4NxbTAwel_ge21r4P3vmgCYccOf",
    "alternateSources": [
      "https://app.box.com/s/pk90sdklwxizbevg4sy8ms7y42omjg1n",
      "https://issuu.com/home/published/vedantasandesh-june_2018",
      "https://www.scribd.com/document/380719762/Vedanta-Sandesh-June-2018"
    ]
  },
  {
    "id": "canonical-000217",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000217",
    "canonicalSource": "https://drive.google.com/open?id=1rjHx1DUbr9iYYZakNSI5hxpe2Uqnfkmo",
    "alternateSources": [
      "https://app.box.com/s/jpchkdqvturv8q4ckjdhlq4fstcvab07",
      "https://issuu.com/home/published/vedanta_sandesh_-_july_2018",
      "https://www.scribd.com/document/382941858/Vedanta-Sandesh-July-2018"
    ]
  },
  {
    "id": "vs-000218",
    "canonicalId": "canonical-000218",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-67 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "archiveUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "readOnlineUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
      "mirror_1": "https://app.box.com/s/dhf4tddlevp4znzjpp5fpl5a6jekpz18",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_aug2018",
      "mirror_3": "https://www.scribd.com/document/385176763/Vedanta-Sandesh-Aug-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000219",
    "canonicalId": "canonical-000219",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-69 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=12E0keYmPzEA3Y0O-eoG-LO0KcShjnFYo",
    "archiveUrl": "https://drive.google.com/open?id=12E0keYmPzEA3Y0O-eoG-LO0KcShjnFYo",
    "readOnlineUrl": "https://drive.google.com/open?id=12E0keYmPzEA3Y0O-eoG-LO0KcShjnFYo",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=12E0keYmPzEA3Y0O-eoG-LO0KcShjnFYo",
      "mirror_1": "https://app.box.com/s/7347nvyfi7vbgj4w71h660he3z4wukw4",
      "mirror_2": "https://www.scribd.com/document/387511842/Vedanta-Sandesh-Sept-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000220",
    "canonicalId": "canonical-000220",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-71 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1cXzATrttmbsdlxvWQHuAQMpYlOKOL69R",
    "archiveUrl": "https://drive.google.com/open?id=1cXzATrttmbsdlxvWQHuAQMpYlOKOL69R",
    "readOnlineUrl": "https://drive.google.com/open?id=1cXzATrttmbsdlxvWQHuAQMpYlOKOL69R",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1cXzATrttmbsdlxvWQHuAQMpYlOKOL69R",
      "mirror_1": "https://app.box.com/s/lnfuixhbhazefppvk3l7d011vmpwbc8r",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2018",
      "mirror_3": "https://www.scribd.com/document/390768072/Vedanta-Piyush-Oct-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000221",
    "canonicalId": "canonical-000221",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-73 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1_dIEGUIGgNYgmwh-nPr_lbhIufK6GGZ9",
    "archiveUrl": "https://drive.google.com/open?id=1_dIEGUIGgNYgmwh-nPr_lbhIufK6GGZ9",
    "readOnlineUrl": "https://drive.google.com/open?id=1_dIEGUIGgNYgmwh-nPr_lbhIufK6GGZ9",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1_dIEGUIGgNYgmwh-nPr_lbhIufK6GGZ9",
      "mirror_1": "https://app.box.com/s/donvsoakb7no5wxmwo7zpir0vhe1ue19",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_nov2018",
      "mirror_3": "https://www.scribd.com/document/392099139/Vedanta-Sandesh-Nov-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000222",
    "canonicalId": "canonical-000222",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-75 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1PSqZcydbh0HOTHUu6Y4Ut-GNW5XudJOn",
    "archiveUrl": "https://drive.google.com/open?id=1PSqZcydbh0HOTHUu6Y4Ut-GNW5XudJOn",
    "readOnlineUrl": "https://drive.google.com/open?id=1PSqZcydbh0HOTHUu6Y4Ut-GNW5XudJOn",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1PSqZcydbh0HOTHUu6Y4Ut-GNW5XudJOn",
      "mirror_1": "https://app.box.com/s/8v7ovokg83ypj0z1sqdsl5in8em3pl2f",
      "mirror_2": "https://issuu.com/home/published/vedanta_sandesh_-_dec_2018",
      "mirror_3": "https://www.scribd.com/document/394591200/Vedanta-Sandesh-Dec-2018"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000223",
    "canonicalId": "canonical-000223",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-77 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVW1YZE1fM0hFZ00",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVW1YZE1fM0hFZ00",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVW1YZE1fM0hFZ00",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWVW1YZE1fM0hFZ00",
      "mirror_1": "https://app.box.com/s/eikx89d5r66ltmsddyuy987wik52eqzy",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_jan2017",
      "mirror_3": "https://www.scribd.com/document/335422842/Vedanta-Sandesh-Jan-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000224",
    "canonicalId": "canonical-000224",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-79 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMzEwSEtnTnpxbVE",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMzEwSEtnTnpxbVE",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMzEwSEtnTnpxbVE",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMzEwSEtnTnpxbVE",
      "mirror_1": "https://app.box.com/s/qq22o6r45hpnjpjhn5eslznkwgi58nvr",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_feb2017",
      "mirror_3": "https://www.scribd.com/document/338079686/Vedanta-Sandesh-Feb-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000225",
    "canonicalId": "canonical-000225",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-81 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWUUdpRmZmQ0Izc0E",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWUUdpRmZmQ0Izc0E",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWUUdpRmZmQ0Izc0E",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWUUdpRmZmQ0Izc0E",
      "mirror_1": "https://app.box.com/s/2f987gylcjcigil73wyst1fruge5xwio",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_mar2017",
      "mirror_3": "https://www.scribd.com/document/340574622/Vedanta-Sandesh-Mar-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000226",
    "canonicalId": "canonical-000226",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-83 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMXBmUnE1WThocVU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMXBmUnE1WThocVU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMXBmUnE1WThocVU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMXBmUnE1WThocVU",
      "mirror_1": "https://app.box.com/s/i44bvtvftiifsqjkl8o33oo1fh57fpb5",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_apr2017",
      "mirror_3": "https://www.scribd.com/document/345197301/Vedanta-Piyush-Apr-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000227",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000227",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWMGk2bmxlczJKWk0",
    "alternateSources": [
      "https://app.box.com/s/q5zrybtvsh8f64165yklmx9us3sys4ii",
      "https://issuu.com/home/published/vedantasandesh_may2017",
      "https://www.scribd.com/document/346900400/Vedanta-Sandesh-May-2017"
    ]
  },
  {
    "id": "canonical-000228",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000228",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWdUt4TGNHTWZtSm8",
    "alternateSources": [
      "https://app.box.com/s/8yu8hmsj749bgv8kdd7diup6u1ebgo8l",
      "https://issuu.com/home/published/vedantasandesh_june2017",
      "https://www.scribd.com/document/350048573/Vedanta-Sandesh-June-2017"
    ]
  },
  {
    "id": "canonical-000229",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000229",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWRWNjNUdSSlpFeGc",
    "alternateSources": [
      "https://app.box.com/s/jf14ns4m7mvr90b9m5mve1lg80d3ukhn",
      "https://issuu.com/home/published/vedantasandesh_july2017",
      "https://www.scribd.com/document/352669166/Vedanta-Sandesh-July-2017"
    ]
  },
  {
    "id": "vs-000230",
    "canonicalId": "canonical-000230",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-91 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "archiveUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "readOnlineUrl": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1WyKUMVVlQctxLvX9hKFmXgwisjb35yQx",
      "mirror_1": "https://app.box.com/s/1w77yn16yr3discbd4wdgq810awo98he",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_aug2017",
      "mirror_3": "https://www.scribd.com/document/355264709/Vedanta-Sandesh-Aug-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000231",
    "canonicalId": "canonical-000231",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-93 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNy1hTnRHN29IaWM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNy1hTnRHN29IaWM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNy1hTnRHN29IaWM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWNy1hTnRHN29IaWM",
      "mirror_1": "https://app.box.com/s/ad5v91esn2r5f0zmrye3tchft4v1oddu",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_sept2017",
      "mirror_3": "https://www.scribd.com/document/357764704/Vedanta-Sandesh-Sept-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000232",
    "canonicalId": "canonical-000232",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-95 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSWV4bDAtWHNLRTA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSWV4bDAtWHNLRTA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSWV4bDAtWHNLRTA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWSWV4bDAtWHNLRTA",
      "mirror_1": "https://app.box.com/s/woxzlwt3314ujkhcyhzchvr0vvhbqofz",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2017",
      "mirror_3": "https://www.scribd.com/document/360364840/Vedanta-Sandesh-Oct-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000233",
    "canonicalId": "canonical-000233",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-97 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWFRWRUExZDI3OU0",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWFRWRUExZDI3OU0",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWFRWRUExZDI3OU0",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWFRWRUExZDI3OU0",
      "mirror_1": "https://app.box.com/s/c01w32btd7cbheqcyq00c7jhxc09ay4l",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_nov2017",
      "mirror_3": "https://www.scribd.com/document/363156692/Vedanta-Sandesh-Nov-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000234",
    "canonicalId": "canonical-000234",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-99 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=1Fxb5gCNSDLE5AreDL87F1YTpNOdFNFnL",
    "archiveUrl": "https://drive.google.com/open?id=1Fxb5gCNSDLE5AreDL87F1YTpNOdFNFnL",
    "readOnlineUrl": "https://drive.google.com/open?id=1Fxb5gCNSDLE5AreDL87F1YTpNOdFNFnL",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1Fxb5gCNSDLE5AreDL87F1YTpNOdFNFnL",
      "mirror_1": "https://app.box.com/s/6ua5wydt0ez6e2s6hb9rq8vykr3y035c",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_dec2017",
      "mirror_3": "https://www.scribd.com/document/366017195/Vedanta-Sandesh-Dec-2017"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000235",
    "canonicalId": "canonical-000235",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-101 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemRpZC16NlMzY3c",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemRpZC16NlMzY3c",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemRpZC16NlMzY3c",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWemRpZC16NlMzY3c",
      "mirror_1": "https://app.box.com/s/0k2ucdd7kyw5i4k1l837mgpybikgskgx",
      "mirror_2": "https://issuu.com/home/published/vs-jan16",
      "mirror_3": "https://www.scribd.com/document/294381818/Vedanta-Sandesh-Jan-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000236",
    "canonicalId": "canonical-000236",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-103 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQVczOTEyS0ZYYjA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQVczOTEyS0ZYYjA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQVczOTEyS0ZYYjA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWQVczOTEyS0ZYYjA",
      "mirror_1": "https://app.box.com/s/w7ketoqllukwpakykaq5j5hcxu1xt9kt",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_feb2016",
      "mirror_3": "https://www.scribd.com/document/297391907/Vedanta-Sandesh-Feb-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000237",
    "canonicalId": "canonical-000237",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-105 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlVJN3pDWEpoTjA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlVJN3pDWEpoTjA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlVJN3pDWEpoTjA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlVJN3pDWEpoTjA",
      "mirror_1": "https://app.box.com/s/qch5bqvudiuu9yi6h5haz0t4ke4tghzc",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_mar2016",
      "mirror_3": "https://www.scribd.com/document/301357481/Vedanta-Sandesh-Mar-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000238",
    "canonicalId": "canonical-000238",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-107 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTjluVXlxeGJiWmc",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTjluVXlxeGJiWmc",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTjluVXlxeGJiWmc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWTjluVXlxeGJiWmc",
      "mirror_1": "https://app.box.com/s/aqk438oipk3zm7ccsxt869xxwvov89nv",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_april2016",
      "mirror_3": "https://www.scribd.com/document/306899829/Vedanta-Sandesh-April-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000239",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000239",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWbGpGRVYxTDlQNEE",
    "alternateSources": [
      "https://app.box.com/s/hw7gddkxk8s8qbw2i8174qkz6ylpnnjo",
      "https://issuu.com/home/published/vedantasandesh_may2016",
      "https://www.scribd.com/document/346900400/Vedanta-Sandesh-May-2017"
    ]
  },
  {
    "id": "canonical-000240",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000240",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWUGFCVEs1a2JhWkk",
    "alternateSources": [
      "https://app.box.com/s/70fw1ua0m7lbt62yiqb28pce6n5z1uo4",
      "https://issuu.com/home/published/vedantasandesh_june2016",
      "https://www.scribd.com/document/314447152/Vedanta-Sandesh-June-2016"
    ]
  },
  {
    "id": "canonical-000241",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000241",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWYmVSV0U5TFNQU2s",
    "alternateSources": [
      "https://app.box.com/s/crms0zusdbjxa5ukwfgcv91iuk6qujlg",
      "https://issuu.com/home/published/vedantasandesh_jul2016",
      "https://www.scribd.com/document/317185359/Vedanta-Sandesh-Jul-2016"
    ]
  },
  {
    "id": "vs-000242",
    "canonicalId": "canonical-000242",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-115 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVG5LZG5iaWhyb0E",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVG5LZG5iaWhyb0E",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVG5LZG5iaWhyb0E",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWVG5LZG5iaWhyb0E",
      "mirror_1": "https://app.box.com/s/t6zcwz1ke37c6lss0birx4xtblu2sd36",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_aug2016",
      "mirror_3": "https://www.scribd.com/document/319826912/VedantaSandesh-Aug2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000243",
    "canonicalId": "canonical-000243",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-117 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQll3SjQ4WTNNX2M",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQll3SjQ4WTNNX2M",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQll3SjQ4WTNNX2M",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWQll3SjQ4WTNNX2M",
      "mirror_1": "https://app.box.com/s/041wow6405sy0648ak1512lyv50uo1to",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_sept2016",
      "mirror_3": "https://www.scribd.com/document/322715725/Vedanta-Sandesh-Sept-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000244",
    "canonicalId": "canonical-000244",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-119 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNTBQa05KT3lFMDA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNTBQa05KT3lFMDA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNTBQa05KT3lFMDA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWNTBQa05KT3lFMDA",
      "mirror_1": "https://app.box.com/s/h25zw9wld8xrhb81cg2ywqb5zg2nrq4r",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2016",
      "mirror_3": "https://www.scribd.com/document/326017656/Vedanta-Sandesh-Oct-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000245",
    "canonicalId": "canonical-000245",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-121 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSzFBeUt0MlBDd00",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSzFBeUt0MlBDd00",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWSzFBeUt0MlBDd00",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWSzFBeUt0MlBDd00",
      "mirror_1": "https://app.box.com/s/t5wcqxgmplsnj1hurp0fu7npjamhjiet",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_nov2016",
      "mirror_3": "https://www.scribd.com/document/329604186/Vedanta-Sandesh-Nov-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000246",
    "canonicalId": "canonical-000246",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-123 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
      "mirror_1": "https://app.box.com/s/yybdq7lisfovqji4prd8ha5jfsmgz3p5",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_dec2016",
      "mirror_3": "https://www.scribd.com/document/332883119/Vedanta-Sandesh-Dec-2016"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000247",
    "canonicalId": "canonical-000247",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-125 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWYmZMMzFzbnUtLVU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWYmZMMzFzbnUtLVU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWYmZMMzFzbnUtLVU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWYmZMMzFzbnUtLVU",
      "mirror_1": "https://app.box.com/s/zywgde5wclodgg51oph7",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_jan2015",
      "mirror_3": "https://www.scribd.com/document/251430559/VedantaSandesh-Jan2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000248",
    "canonicalId": "canonical-000248",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-127 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU25odjVuSE5WdzA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU25odjVuSE5WdzA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU25odjVuSE5WdzA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWU25odjVuSE5WdzA",
      "mirror_1": "https://app.box.com/s/a7oac2hvnvokohzv3hucjm69fylhqxxa",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_feb2015",
      "mirror_3": "https://www.scribd.com/document/254323394/Vedanta-Sandesh-Feb-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000249",
    "canonicalId": "canonical-000249",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-129 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWHQzdkdxdmNkRFk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWHQzdkdxdmNkRFk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWHQzdkdxdmNkRFk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWHQzdkdxdmNkRFk",
      "mirror_1": "https://app.box.com/s/qch5bqvudiuu9yi6h5haz0t4ke4tghzc",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_mar2015",
      "mirror_3": "https://www.scribd.com/document/257273135/Vedanta-Sandesh-Mar-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000250",
    "canonicalId": "canonical-000250",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-131 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWalpNOE9iUGtTZ1E",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWalpNOE9iUGtTZ1E",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWalpNOE9iUGtTZ1E",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWalpNOE9iUGtTZ1E",
      "mirror_1": "https://app.box.com/s/sy9bmydoby1l2ze92k3ufg6voub1vsjn",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_april2015",
      "mirror_3": "https://www.scribd.com/document/260561502/Vedanta-Sandesh-April-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000251",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000251",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWNF9vYmNtT1k4bFE",
    "alternateSources": [
      "https://app.box.com/s/n5xmtfnhvpfxekfnd0rolq9f3eus2u6l",
      "https://issuu.com/home/published/vedantasandesh_may2015",
      "https://www.scribd.com/document/263717648/Vedanta-Sandesh-May-2015"
    ]
  },
  {
    "id": "canonical-000252",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000252",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWN3d6TzN3MDNSNjA",
    "alternateSources": [
      "https://app.box.com/s/g8vqeyv93wcrgjl8e16pawt698zatq34",
      "https://issuu.com/home/published/vedantasandesh_june2015",
      "https://www.scribd.com/document/267294211/Vedanta-Sandesh-June-2015"
    ]
  },
  {
    "id": "canonical-000253",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000253",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWdlFvcG83NGZwV2s",
    "alternateSources": [
      "https://app.box.com/s/95cgtrrr4yqdy2bnehn4ilpgp7lbij7m",
      "https://issuu.com/home/published/vedantasandesh_july2015",
      "https://www.scribd.com/doc/270139201/Vedanta-Sandesh-July-2015"
    ]
  },
  {
    "id": "vs-000254",
    "canonicalId": "canonical-000254",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-139 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ3ZpYXNnMl9HbWc",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ3ZpYXNnMl9HbWc",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ3ZpYXNnMl9HbWc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ3ZpYXNnMl9HbWc",
      "mirror_1": "https://app.box.com/s/ktjrdwj30pr09urmyu3xg4zw3mlgddn0",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_aug2015",
      "mirror_3": "https://www.scribd.com/document/273506736/Vedanta-Sandesh-Aug-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000255",
    "canonicalId": "canonical-000255",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-141 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaUhxb3NHNmUxQnc",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaUhxb3NHNmUxQnc",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaUhxb3NHNmUxQnc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWaUhxb3NHNmUxQnc",
      "mirror_1": "https://app.box.com/s/koqsw3vdj929paeakv2rdvk3vuwjyyoi",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_sept2015",
      "mirror_3": "https://www.scribd.com/document/277387959/Vedanta-Sandesh-Sept-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000256",
    "canonicalId": "canonical-000256",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-143 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaVRINVVVdHl3RUE",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaVRINVVVdHl3RUE",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaVRINVVVdHl3RUE",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWaVRINVVVdHl3RUE",
      "mirror_1": "https://app.box.com/s/9tn7mzuzinhadcz9ju9e3y7abqbyz9va",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2015",
      "mirror_3": "https://www.scribd.com/document/283299268/Vedanta-Sandesh-Oct-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000257",
    "canonicalId": "canonical-000257",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-145 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNGxUbDJPSVZWbGs",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNGxUbDJPSVZWbGs",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNGxUbDJPSVZWbGs",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWNGxUbDJPSVZWbGs",
      "mirror_1": "https://app.box.com/s/kivahu28zdwo8l0ldk2lfpmzmuwkrzlv",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2015",
      "mirror_3": "https://www.scribd.com/document/288072215/Vedanta-Sandesh-Nov-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000258",
    "canonicalId": "canonical-000258",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-147 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWktZSWxNaDJXNDA",
      "mirror_1": "https://app.box.com/s/3y7f4rq9a1o7fkhm0ekgdtu0npmrlpry",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_dec2015",
      "mirror_3": "https://www.scribd.com/document/291757408/Vedanta-Sandesh-Dec-2015"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000259",
    "canonicalId": "canonical-000259",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-149 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRUdHZlVVbW52WFU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRUdHZlVVbW52WFU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRUdHZlVVbW52WFU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWRUdHZlVVbW52WFU",
      "mirror_1": "https://app.box.com/s/x8v7ayqx5irk42z99e95",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_jan2014",
      "mirror_3": "https://www.scribd.com/document/194928607/Vedanta-Sandesh-Jan-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000260",
    "canonicalId": "canonical-000260",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-151 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVVZOOVBGTFV4ZkE",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVVZOOVBGTFV4ZkE",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVVZOOVBGTFV4ZkE",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWVVZOOVBGTFV4ZkE",
      "mirror_1": "https://app.box.com/s/bvyd6i7dm78fx71i2h8n",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_feb2014",
      "mirror_3": "https://www.scribd.com/document/203900239/Vedanta-Sandesh-Feb-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000261",
    "canonicalId": "canonical-000261",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-153 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemluUVJCdjhaMFU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemluUVJCdjhaMFU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWemluUVJCdjhaMFU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWemluUVJCdjhaMFU",
      "mirror_1": "https://app.box.com/s/iia92yk4q9e3xj57fl5s9oddrpvqs6wd",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_mar2014",
      "mirror_3": "https://www.scribd.com/doc/210451153/Vedanta-Sandesh-Mar-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000262",
    "canonicalId": "canonical-000262",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-155 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeUdTVThDMjVKSHM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeUdTVThDMjVKSHM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeUdTVThDMjVKSHM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWeUdTVThDMjVKSHM",
      "mirror_1": "https://app.box.com/s/t8bavm74g1qff13qxrg6",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_april2014",
      "mirror_3": "https://www.scribd.com/document/215746706/Vedanta-Sandesh-April-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000263",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_may_2021",
      "gdrive": "https://drive.google.com/file/d/1AIOYvMLDIm6yu5f-98a3Ks35yzdTiJwS/view?usp=sharing",
      "box": "https://app.box.com/s/93061eghil2rune2vfvdrzhibbnvlyh3",
      "pcloud": "http://u.pc.cd/2xVctalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Sandesh May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-may21_170x240.jpg",
    "canonicalId": "canonical-000263",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWOXp2UklYb0IyYUk",
    "alternateSources": [
      "https://app.box.com/s/ibbojulr4oecdhf5msvy",
      "https://issuu.com/home/published/vedantasandesh_may2014",
      "https://www.scribd.com/doc/221328989/Vedanta-Sandesh-May-2014"
    ]
  },
  {
    "id": "canonical-000264",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/gicj/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_june_2021",
      "gdrive": "https://drive.google.com/file/d/1wUsuS5DaEGjaUUToPqIXqGx7UEnxs975/view?usp=sharing",
      "box": "https://app.box.com/s/tdydm6c6niuieptksbe86l10m71l3mpl",
      "pcloud": "http://u.pc.cd/ncE",
      "archive": "https://archive.org/download/vedanta-sandesh-june-2021/Vedanta%20Sandesh_June%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/gicj/"
    },
    "description": "Vedanta Sandesh June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/vs-jun21_170x240.jpg",
    "canonicalId": "canonical-000264",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWeWRRVDFLOUlBUk0",
    "alternateSources": [
      "https://app.box.com/s/8c7p0ev65s7pxmx9iwfl",
      "https://issuu.com/home/published/vedantasandesh_june2014",
      "https://www.scribd.com/document/227457567/Vedanta-Sandesh-June-2014"
    ]
  },
  {
    "id": "canonical-000265",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
    "readOnlineUrl": "https://pubhtml5.com/iidh/inqo",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_sandesh_july_2021",
      "gdrive": "https://drive.google.com/file/d/1g2PXbN5sgpwqpHoKvfTALLwttkDlQkFt/view?usp=sharing",
      "box": "https://app.box.com/s/ng2jp5q8a20h8l7i3ksrf6lbjz2m8c5s",
      "pcloud": "http://u.pc.cd/EvOitalK",
      "archive": "https://archive.org/download/vedanta-sandesh-july-2021/Vedanta%20Sandesh_July%202021.pdf",
      "flipbook": "https://pubhtml5.com/iidh/inqo"
    },
    "description": "Vedanta Sandesh July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vs-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vs-jul21_170x240.jpg",
    "canonicalId": "canonical-000265",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWODJWcVdNS2FEMFE",
    "alternateSources": [
      "https://app.box.com/s/xi3r1q7fazm9r74gzm0z",
      "https://issuu.com/home/published/vedantasandesh_july2014",
      "https://www.scribd.com/document/232084469/Vedanta-Sandesh-July-2014"
    ]
  },
  {
    "id": "vs-000266",
    "canonicalId": "canonical-000266",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-163 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ2ZDV3ZxeVFZOGc",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ2ZDV3ZxeVFZOGc",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ2ZDV3ZxeVFZOGc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWQ2ZDV3ZxeVFZOGc",
      "mirror_1": "https://app.box.com/s/ipzfeonw4851w02y6o0c",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_aug2014",
      "mirror_3": "https://www.scribd.com/document/235589939/Vedanta-Sandesh-Aug-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000267",
    "canonicalId": "canonical-000267",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-165 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWjRPeGROaDUzdDQ",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWjRPeGROaDUzdDQ",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWjRPeGROaDUzdDQ",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWjRPeGROaDUzdDQ",
      "mirror_1": "https://app.box.com/s/uhu53770ooxc1978zobnfsgoyr63jss3",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_sept2014",
      "mirror_3": "https://www.scribd.com/document/238285899/VedantaSandesh-Sep-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000268",
    "canonicalId": "canonical-000268",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-167 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZzF2eHJQVTZUVlk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZzF2eHJQVTZUVlk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZzF2eHJQVTZUVlk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWZzF2eHJQVTZUVlk",
      "mirror_1": "https://app.box.com/s/5rqfml4yko1y5wrsgwli",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_oct2014",
      "mirror_3": "https://www.scribd.com/document/241549897/Vedanta-Sandesh-Oct-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000269",
    "canonicalId": "canonical-000269",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-169 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWajlKUTlyVEVNTVk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWajlKUTlyVEVNTVk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWajlKUTlyVEVNTVk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWajlKUTlyVEVNTVk",
      "mirror_1": "https://app.box.com/s/gs11kxjqf81fi2tejua4",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_nov2014",
      "mirror_3": "https://www.scribd.com/document/245168056/Vedanta-Sandesh-Nov-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vs-000270",
    "canonicalId": "canonical-000270",
    "type": "Vedanta Sandesh",
    "title": "Vedanta Sandesh — Issue-171 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "English",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZy1KV2FfVVp3TFk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZy1KV2FfVVp3TFk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWZy1KV2FfVVp3TFk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWZy1KV2FfVVp3TFk",
      "mirror_1": "https://app.box.com/s/79s3kicib1gbof3ksxm3",
      "mirror_2": "https://issuu.com/home/published/vedantasandesh_dec2014",
      "mirror_3": "https://www.scribd.com/document/248763238/Vedanta-Sandesh-Dec-2014"
    },
    "description": "Vedanta Sandesh canonical monthly journal ( 2021) sharing scriptural discourses and articles by Swami Atmananda Saraswati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-2021-may",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vp-2021-may-cover.jpg",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1jtuk9M7CrryqJIG6cCJM7WUpNMs8-s4a/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_piyush_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_piyush_may_2021",
      "gdrive": "https://drive.google.com/file/d/1jtuk9M7CrryqJIG6cCJM7WUpNMs8-s4a/view?usp=sharing",
      "box": "https://app.box.com/s/jyo4ghxivh9eh7o6u148gmqp3d28p7o8",
      "pcloud": "http://u.pc.cd/2hyotalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Piyush May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vp-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/may_169x240.jpg",
    "canonicalId": "canonical-000271",
    "canonicalSource": "https://archive.org/download/vedanta-piyush-apr-2021/Vedanta%20Piyush_Apr%202021.pdf",
    "alternateSources": [
      "https://drive.google.com/file/d/1jtuk9M7CrryqJIG6cCJM7WUpNMs8-s4a/view?usp=sharing",
      "https://drive.google.com/file/d/15-JnbomwXTLtwuyDEKhnralfi0GuQdYf/view?usp=sharing",
      "https://app.box.com/s/jyo4ghxivh9eh7o6u148gmqp3d28p7o8",
      "https://app.box.com/s/920jw75u2mspx35k11h2h78c9wipwzeb",
      "https://issuu.com/vmission/docs/vedanta_piyush_may_2021",
      "https://issuu.com/vmission/docs/vedanta_piyush_apr_2021",
      "http://u.pc.cd/2hyotalK",
      "http://u.pc.cd/Gqu"
    ]
  },
  {
    "id": "vp-000272",
    "canonicalId": "canonical-000272",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-2 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/1nxFnE0WOtk09kH-TS4XOcbgcLclVhGxQ/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1nxFnE0WOtk09kH-TS4XOcbgcLclVhGxQ/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1nxFnE0WOtk09kH-TS4XOcbgcLclVhGxQ/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1nxFnE0WOtk09kH-TS4XOcbgcLclVhGxQ/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1NN6owYZz7BmFSkItbxMZ1JJ0-PmcTPLa/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/ehkzrf7m1chf65kgg7surmwze0niyzpe",
      "mirror_3": "https://app.box.com/s/j9boksjwxb7uw7ssfq0aetvruzswcyrr",
      "mirror_4": "https://issuu.com/vmission/docs/vedanta_piyush_mar_2021",
      "mirror_5": "https://issuu.com/vmission/docs/vedanta_piyush_feb_2021",
      "mirror_6": "http://u.pc.cd/R297",
      "mirror_7": "http://u.pc.cd/glsrtalK"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000273",
    "canonicalId": "canonical-000273",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-4 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/1_38kQ7uZGBzMMV0w4ZmUUZG7-j-tKE8b/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1_38kQ7uZGBzMMV0w4ZmUUZG7-j-tKE8b/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1_38kQ7uZGBzMMV0w4ZmUUZG7-j-tKE8b/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1_38kQ7uZGBzMMV0w4ZmUUZG7-j-tKE8b/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1ibFf1rwxpN7gOPoTxCbt5q_a0syjGnje/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/5jhp1yh6vmtj7dlbumlztc2obiduml2t",
      "mirror_3": "https://issuu.com/vmission/docs/vedanta_piyush_jan_2021",
      "mirror_4": "https://issuu.com/vmission/docs/vedanta_piyush_dec_2020",
      "mirror_5": "http://u.pc.cd/b5Y"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000274",
    "canonicalId": "canonical-000274",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-6 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/1WmQhpzDIKOhQ4POHHNRW6PkR9rVFYch7/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1WmQhpzDIKOhQ4POHHNRW6PkR9rVFYch7/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1WmQhpzDIKOhQ4POHHNRW6PkR9rVFYch7/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1WmQhpzDIKOhQ4POHHNRW6PkR9rVFYch7/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/6x97ohkundvib1c0g9yog3vcr35kkkoh",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_sandesh_nov_2020",
      "mirror_3": "http://u.pc.cd/VmActalK"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000275",
    "canonicalId": "canonical-000275",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-8 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/1A3kTF9s1OpgJtqDYJDkqK7BP8vSNmiGm/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1A3kTF9s1OpgJtqDYJDkqK7BP8vSNmiGm/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1A3kTF9s1OpgJtqDYJDkqK7BP8vSNmiGm/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1A3kTF9s1OpgJtqDYJDkqK7BP8vSNmiGm/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/q3op1czuiej4b0gt597wp2r8l923m1wx",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_oct_2020",
      "mirror_3": "http://u.pc.cd/zHirtalK"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000276",
    "canonicalId": "canonical-000276",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-10 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/1XL2tlv7ndL4WUV8pqHRkkc6UsU8o6zIO/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/1XL2tlv7ndL4WUV8pqHRkkc6UsU8o6zIO/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1XL2tlv7ndL4WUV8pqHRkkc6UsU8o6zIO/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1XL2tlv7ndL4WUV8pqHRkkc6UsU8o6zIO/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/xzlvve4jjqu180ythrtelebia3i2x8hg",
      "mirror_2": "https://app.box.com/s/ld9hz9h5whuqxkmh0eh8yg9gy2w6llsm",
      "mirror_3": "https://issuu.com/vmission/docs/vedanta_piyush_sept_2020",
      "mirror_4": "http://u.pc.cd/HfK7"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000277",
    "canonicalId": "canonical-000277",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-12 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/file/d/19XqQSZ9iDzwzSdF-9qJkPbTG-YOKHyi1/view?usp=sharing",
    "archiveUrl": "https://drive.google.com/file/d/19XqQSZ9iDzwzSdF-9qJkPbTG-YOKHyi1/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/19XqQSZ9iDzwzSdF-9qJkPbTG-YOKHyi1/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/19XqQSZ9iDzwzSdF-9qJkPbTG-YOKHyi1/view?usp=sharing",
      "mirror_1": "https://app.box.com/s/zz40s8zo110vpo5kh3ohiw12ukjzc2nn",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush__aug_2020",
      "mirror_3": "http://u.pc.cd/zyYctalK"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000278",
    "canonicalId": "canonical-000278",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-14 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "http://u.pc.cd/LRxrtalK",
    "archiveUrl": "http://u.pc.cd/LRxrtalK",
    "readOnlineUrl": "http://u.pc.cd/LRxrtalK",
    "mirrors": {
      "canonical": "http://u.pc.cd/LRxrtalK"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-2021-jul",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vp-2021-jul-cover.jpg",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://archive.org/download/vedanta-piyush-july-2021/Vedanta%20Piyush_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1YUh1JvF5GT1EBVQlArJA5S0QB-LahFUT/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/ypor/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_piyush_july_2021",
      "gdrive": "https://drive.google.com/file/d/1YUh1JvF5GT1EBVQlArJA5S0QB-LahFUT/view?usp=sharing",
      "box": "https://app.box.com/s/m7qyubi3hcmsmnaomvl0674dvhpho31o",
      "pcloud": "http://u.pc.cd/p8IrtalK",
      "archive": "https://archive.org/download/vedanta-piyush-july-2021/Vedanta%20Piyush_July%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/ypor/"
    },
    "description": "Vedanta Piyush July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vp-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vp-july_169x240.jpg",
    "canonicalId": "canonical-000279",
    "canonicalSource": "https://drive.google.com/file/d/1Of3YkD7z5Rhan7wXDgpCqTmhyQrhMUwn/view?usp=sharing",
    "alternateSources": [
      "https://app.box.com/s/kp6dldv4tkexv7gqz75s95hnl61p7hq3",
      "https://issuu.com/vmission/docs/vedanta_piyush_july_2020"
    ]
  },
  {
    "id": "canonical-000280",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2021",
    "month": "July",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://archive.org/download/vedanta-piyush-july-2021/Vedanta%20Piyush_July%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1YUh1JvF5GT1EBVQlArJA5S0QB-LahFUT/view?usp=sharing",
    "readOnlineUrl": "https://online.pubhtml5.com/iidh/ypor/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_piyush_july_2021",
      "gdrive": "https://drive.google.com/file/d/1YUh1JvF5GT1EBVQlArJA5S0QB-LahFUT/view?usp=sharing",
      "box": "https://app.box.com/s/m7qyubi3hcmsmnaomvl0674dvhpho31o",
      "pcloud": "http://u.pc.cd/p8IrtalK",
      "archive": "https://archive.org/download/vedanta-piyush-july-2021/Vedanta%20Piyush_July%202021.pdf",
      "flipbook": "https://online.pubhtml5.com/iidh/ypor/"
    },
    "description": "Vedanta Piyush July 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vp-2021-jul-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/07/vp-july_169x240.jpg",
    "canonicalId": "canonical-000280",
    "canonicalSource": "https://drive.google.com/file/d/1Of3YkD7z5Rhan7wXDgpCqTmhyQrhMUwn/view?usp=sharing",
    "alternateSources": [
      "https://app.box.com/s/kp6dldv4tkexv7gqz75s95hnl61p7hq3",
      "https://issuu.com/vmission/docs/vedanta_piyush_july_2020",
      "http://u.pc.cd/T0f",
      "https://www.scribd.com/document/469117383/Vedanta-Piyush-July-2020"
    ]
  },
  {
    "id": "vp-2021-jun",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2021",
    "month": "June",
    "year": 2021,
    "coverImage": "/images/vmission/publications/covers/vp-2021-jun-cover.jpg",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://archive.org/download/vedanta-piyush-june-2021/Vedanta%20Piyush_June%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1jx7Pv1nnXEy3cHkoarBfwSMHSpfEis9U/view?usp=sharing",
    "readOnlineUrl": "http://online.pubhtml5.com/iidh/cdlv/",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_piyush_june_2021",
      "gdrive": "https://drive.google.com/file/d/1jx7Pv1nnXEy3cHkoarBfwSMHSpfEis9U/view?usp=sharing",
      "box": "https://app.box.com/s/7wmn6eaadu41owqaevb5ei63k0omputt",
      "pcloud": "http://u.pc.cd/Ycj",
      "archive": "https://archive.org/download/vedanta-piyush-june-2021/Vedanta%20Piyush_June%202021.pdf",
      "flipbook": "http://online.pubhtml5.com/iidh/cdlv/"
    },
    "description": "Vedanta Piyush June 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vp-2021-jun-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/june_170x239.jpg",
    "canonicalId": "canonical-000281",
    "canonicalSource": "https://drive.google.com/file/d/1HmXI4k6RGrX1EAOhiAIodsEqxz6XcCYl/view?usp=sharing",
    "alternateSources": [
      "https://app.box.com/s/xxng4a0ks1ieojxxhgdl21tpqqgol2fp",
      "https://issuu.com/vmission/docs/vedanta_piyush_june_2020",
      "http://u.pc.cd/y38otalK",
      "https://www.scribd.com/document/465352305/Vedanta-Piyush-June-2020"
    ]
  },
  {
    "id": "canonical-000282",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2021",
    "month": "May",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf",
    "archiveUrl": "https://drive.google.com/file/d/1jtuk9M7CrryqJIG6cCJM7WUpNMs8-s4a/view?usp=sharing",
    "readOnlineUrl": "https://issuu.com/vmission/docs/vedanta_piyush_may_2021",
    "mirrors": {
      "issuu": "https://issuu.com/vmission/docs/vedanta_piyush_may_2021",
      "gdrive": "https://drive.google.com/file/d/1jtuk9M7CrryqJIG6cCJM7WUpNMs8-s4a/view?usp=sharing",
      "box": "https://app.box.com/s/jyo4ghxivh9eh7o6u148gmqp3d28p7o8",
      "pcloud": "http://u.pc.cd/2hyotalK",
      "archive": "https://archive.org/download/vedanta-sandesh-may-2021/Vedanta%20Sandesh_May%202021.pdf"
    },
    "description": "Vedanta Piyush May 2021 monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.",
    "isLatest": false,
    "pageCount": 36,
    "localCover": "/images/vmission/publications/covers/vp-2021-may-cover.jpg",
    "sourceCoverUrl": "https://www.vmission.org.in/wp-content/uploads/2021/06/may_169x240.jpg",
    "canonicalId": "canonical-000282",
    "canonicalSource": "https://drive.google.com/open?id=1ioj1qGfb8FTJqwXJPvasfsVnZlaWdAco",
    "alternateSources": [
      "https://app.box.com/s/faast91sr57wavrldpwr4kji5ok8n47r",
      "https://issuu.com/vmission/docs/vedanta_piyush__may_2020",
      "https://my.pcloud.com/publink/show?code=XZumsdkZQnkyV36m0e0B5irgSspFbS6kV2Ky",
      "https://www.scribd.com/document/461223523/Vedanta-Piyush-May-2020"
    ]
  },
  {
    "id": "vp-000283",
    "canonicalId": "canonical-000283",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-22 2021",
    "month": "Monthly Issue",
    "year": 2021,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=167g1XwmTjBxXXIMgBlubrw9oFy-i4g5h",
    "archiveUrl": "https://drive.google.com/open?id=167g1XwmTjBxXXIMgBlubrw9oFy-i4g5h",
    "readOnlineUrl": "https://drive.google.com/open?id=167g1XwmTjBxXXIMgBlubrw9oFy-i4g5h",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=167g1XwmTjBxXXIMgBlubrw9oFy-i4g5h",
      "mirror_1": "https://app.box.com/s/gy4l8i96h67drotjsa4tqbsb99h0a2z2",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush__apr_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZ5LePkZryMpCl7pIlyvP7NMXpjmgJARhMAy",
      "mirror_4": "https://www.scribd.com/document/456338133/Vedanta-Piyush-Apr-2020"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2021) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000284",
    "canonicalId": "canonical-000284",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-24 2020",
    "month": "Monthly Issue",
    "year": 2020,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1i0JARf6ciS5ZajbFVetI2y9hRxupBcnZ",
    "archiveUrl": "https://drive.google.com/open?id=1i0JARf6ciS5ZajbFVetI2y9hRxupBcnZ",
    "readOnlineUrl": "https://drive.google.com/open?id=1i0JARf6ciS5ZajbFVetI2y9hRxupBcnZ",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1i0JARf6ciS5ZajbFVetI2y9hRxupBcnZ",
      "mirror_1": "https://app.box.com/s/ee86hnqt9aqe2wmg2c2hw3yjubjgmzbx",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush__mar_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZ5LePkZryMpCl7pIlyvP7NMXpjmgJARhMAy",
      "mirror_4": "https://www.scribd.com/document/456338133/Vedanta-Piyush-Apr-2020"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2020) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000285",
    "canonicalId": "canonical-000285",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-26 2020",
    "month": "Monthly Issue",
    "year": 2020,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1Y4Pnrkf6XLmL1qJ0u06SwvDhv-FR1wZ8",
    "archiveUrl": "https://drive.google.com/open?id=1Y4Pnrkf6XLmL1qJ0u06SwvDhv-FR1wZ8",
    "readOnlineUrl": "https://drive.google.com/open?id=1Y4Pnrkf6XLmL1qJ0u06SwvDhv-FR1wZ8",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1Y4Pnrkf6XLmL1qJ0u06SwvDhv-FR1wZ8",
      "mirror_1": "https://app.box.com/s/8beupza5nwezsimjsa136k0use2ccpyh",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_feb_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZyMPekZkOmuGFlSAqQ2AL6lriP4OQHzO12y",
      "mirror_4": "https://www.scribd.com/document/450676740/Vedanta-Piyush-Mar-2020"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2020) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000286",
    "canonicalId": "canonical-000286",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-28 2020",
    "month": "Monthly Issue",
    "year": 2020,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1Bz5l_8esTimp2KAoSOwrRXhZQtHXaMao",
    "archiveUrl": "https://drive.google.com/open?id=1Bz5l_8esTimp2KAoSOwrRXhZQtHXaMao",
    "readOnlineUrl": "https://drive.google.com/open?id=1Bz5l_8esTimp2KAoSOwrRXhZQtHXaMao",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1Bz5l_8esTimp2KAoSOwrRXhZQtHXaMao",
      "mirror_1": "https://app.box.com/s/zrkybrfc2q00n69il2bu18y6eh4vryq8",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_jan_2020",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZ2fIWkZzN7QgKXP8a810Y3iy0ixMJmrpsGk",
      "mirror_4": "https://www.scribd.com/document/446202660/Vedanta-Piyush-Feb-2020"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2020) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000287",
    "canonicalId": "canonical-000287",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-30 2020",
    "month": "Monthly Issue",
    "year": 2020,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1ouDp-rbmU9Infn4LaxmULwg3cZKjpG2x",
    "archiveUrl": "https://drive.google.com/open?id=1ouDp-rbmU9Infn4LaxmULwg3cZKjpG2x",
    "readOnlineUrl": "https://drive.google.com/open?id=1ouDp-rbmU9Infn4LaxmULwg3cZKjpG2x",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1ouDp-rbmU9Infn4LaxmULwg3cZKjpG2x",
      "mirror_1": "https://app.box.com/s/xxw3k5rld4682kgyl3xejodfvk4xke06",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_dec_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZkvjjkZsQv5sOLInhpcgCPkd5gaAf67mnXX",
      "mirror_4": "https://www.scribd.com/document/441499206/Vedanta-Piyush-Jan-2020"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2020) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000288",
    "canonicalId": "canonical-000288",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-32 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1ZbCvBWrMe3POC8jFALFEYKuC70Sjnjm2",
    "archiveUrl": "https://drive.google.com/open?id=1ZbCvBWrMe3POC8jFALFEYKuC70Sjnjm2",
    "readOnlineUrl": "https://drive.google.com/open?id=1ZbCvBWrMe3POC8jFALFEYKuC70Sjnjm2",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1ZbCvBWrMe3POC8jFALFEYKuC70Sjnjm2",
      "mirror_1": "https://app.box.com/s/9b21ddr8d1dutze9fguqdn19ypl4ej12",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_nov_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZu3cmkZtb1wCfxUN1Y3SO4ABLKS8bH25AJV",
      "mirror_4": "https://www.scribd.com/document/438759595/Vedanta-Piyush-Dec-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000289",
    "canonicalId": "canonical-000289",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-34 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1VDHB_uftyj4QWREgRdAUwkrFvp9d4HXs",
    "archiveUrl": "https://drive.google.com/open?id=1VDHB_uftyj4QWREgRdAUwkrFvp9d4HXs",
    "readOnlineUrl": "https://drive.google.com/open?id=1VDHB_uftyj4QWREgRdAUwkrFvp9d4HXs",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1VDHB_uftyj4QWREgRdAUwkrFvp9d4HXs",
      "mirror_1": "https://app.box.com/s/2apwqk29ef0npn58ptx9n0ekf6epq64a",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_oct_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZ1m1QkZwsFDN8jfcbmcrPhRNxQ6xze270ty",
      "mirror_4": "https://www.scribd.com/document/434207253/Vedanta-Piyush-Nov-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000290",
    "canonicalId": "canonical-000290",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-36 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "//drive.google.com/open?id=1iKqrKxu44wHPo91o7UHEPTpi2VYS8Fau",
    "archiveUrl": "//drive.google.com/open?id=1iKqrKxu44wHPo91o7UHEPTpi2VYS8Fau",
    "readOnlineUrl": "//drive.google.com/open?id=1iKqrKxu44wHPo91o7UHEPTpi2VYS8Fau",
    "mirrors": {
      "canonical": "//drive.google.com/open?id=1iKqrKxu44wHPo91o7UHEPTpi2VYS8Fau",
      "mirror_1": "https://app.box.com/s/9gq9wmxva3i6mrvbbkej2hdun6lxexn4",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_sept_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZA9NLkZK9jlH7yDku5K1rhA3QSXfYrgkgI7",
      "mirror_4": "https://www.scribd.com/document/429465126/Vedanta-Piyush-Oct-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000291",
    "canonicalId": "canonical-000291",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-38 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://app.box.com/s/yromrzkbbsc2nl0mcaqhid8a0d1gbuj1",
    "archiveUrl": "https://app.box.com/s/yromrzkbbsc2nl0mcaqhid8a0d1gbuj1",
    "readOnlineUrl": "https://app.box.com/s/yromrzkbbsc2nl0mcaqhid8a0d1gbuj1",
    "mirrors": {
      "canonical": "https://app.box.com/s/yromrzkbbsc2nl0mcaqhid8a0d1gbuj1",
      "mirror_1": "https://issuu.com/home/published/vedanta_piyush_-_aug_2019",
      "mirror_2": "https://my.pcloud.com/publink/show?code=XZtkSJkZf1NgoiB3DSHScbDlzwARMXIP6DNy",
      "mirror_3": "http://k9yo.mjt.lu/lnk/ANAAAEiTr6wAAchsxrQAAAFHU9kAAAABHZQAAEHRAAl5lwBdVgBDIGc90laMQgC7Q85Z2MiJUQAI-rU/5/IM7xvGZmrYNCDJu6wL2Jog/aHR0cHM6Ly90aW55dXJsLmNvbS95eWJ2YTRmaA",
      "mirror_4": "https://www.scribd.com/document/425083078/Vedanta-Piyush-Sept-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000292",
    "canonicalId": "canonical-000292",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-40 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://my.pcloud.com/publink/show?code=XZ9nkc7ZlV7RNBlcy9Yayc6fj5CHqyPE7BI7",
    "archiveUrl": "https://my.pcloud.com/publink/show?code=XZ9nkc7ZlV7RNBlcy9Yayc6fj5CHqyPE7BI7",
    "readOnlineUrl": "https://my.pcloud.com/publink/show?code=XZ9nkc7ZlV7RNBlcy9Yayc6fj5CHqyPE7BI7",
    "mirrors": {
      "canonical": "https://my.pcloud.com/publink/show?code=XZ9nkc7ZlV7RNBlcy9Yayc6fj5CHqyPE7BI7",
      "mirror_1": "https://www.scribd.com/document/421988572/Vedanta-Piyush-Aug-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-2019-jul",
    "canonicalId": "canonical-000293",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2019",
    "month": "July",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
    "mirrors": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019",
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018",
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017",
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016",
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (July 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "alternateSources": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019"
    ]
  },
  {
    "id": "vp-2019-jun",
    "canonicalId": "canonical-000294",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2019",
    "month": "June",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
    "mirrors": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019",
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018",
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017",
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016",
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (June 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "alternateSources": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019"
    ]
  },
  {
    "id": "vp-2019-may",
    "canonicalId": "canonical-000295",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2019",
    "month": "May",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
    "mirrors": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019",
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018",
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017",
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016",
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (May 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "alternateSources": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019"
    ]
  },
  {
    "id": "vp-000296",
    "canonicalId": "canonical-000296",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-47 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cb6TKreqvSJInCfBL2Ymf4ZuKWobMyQd",
    "archiveUrl": "https://drive.google.com/open?id=1cb6TKreqvSJInCfBL2Ymf4ZuKWobMyQd",
    "readOnlineUrl": "https://drive.google.com/open?id=1cb6TKreqvSJInCfBL2Ymf4ZuKWobMyQd",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1cb6TKreqvSJInCfBL2Ymf4ZuKWobMyQd",
      "mirror_1": "https://app.box.com/s/gwt7fpvqevpryl96ki3270ogqoydigc8",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_apr_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZtqQE7ZwgjFrXkhKW57kmkbszlLojStLfl7",
      "mirror_4": "https://www.scribd.com/document/405727843/Vedanta-Piyush-Apr-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000297",
    "canonicalId": "canonical-000297",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-49 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1oRYEGIyr3mImz37bpmIDBA4GrO6NL5qH",
    "archiveUrl": "https://drive.google.com/open?id=1oRYEGIyr3mImz37bpmIDBA4GrO6NL5qH",
    "readOnlineUrl": "https://drive.google.com/open?id=1oRYEGIyr3mImz37bpmIDBA4GrO6NL5qH",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1oRYEGIyr3mImz37bpmIDBA4GrO6NL5qH",
      "mirror_1": "https://app.box.com/s/at45ijxipqhy1xtn2hm7afkynmuw35yk",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_mar_2019",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZ1rvO7Z8emrGEqBbk7KjIqKIDQcq01F8bd7",
      "mirror_4": "https://my.pcloud.com/publink/show?code=XZfgcq7ZP3BNg845SojVSYavtEMY2S9zjmEX",
      "mirror_5": "https://www.scribd.com/document/401876205/Vedanta-Piyush-Mar-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000298",
    "canonicalId": "canonical-000298",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-51 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1ICi7Xc8BCjtW6p55UnSjLNHu91fWzD0k",
    "archiveUrl": "https://drive.google.com/open?id=1ICi7Xc8BCjtW6p55UnSjLNHu91fWzD0k",
    "readOnlineUrl": "https://drive.google.com/open?id=1ICi7Xc8BCjtW6p55UnSjLNHu91fWzD0k",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1ICi7Xc8BCjtW6p55UnSjLNHu91fWzD0k",
      "mirror_1": "https://app.box.com/s/z6jx7yyeeeckh6dsomxa5bk1mtdgv7wz",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_feb_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZiC7l7ZB4by982tDYmYT1MQEPkYtk5s8dVV",
      "mirror_4": "https://www.scribd.com/document/399107217/Vedanta-Piyush-Feb-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000299",
    "canonicalId": "canonical-000299",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-53 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1nUsabDQ8bwq_iK21U4g4NCqbhkvuEpAJ",
    "archiveUrl": "https://drive.google.com/open?id=1nUsabDQ8bwq_iK21U4g4NCqbhkvuEpAJ",
    "readOnlineUrl": "https://drive.google.com/open?id=1nUsabDQ8bwq_iK21U4g4NCqbhkvuEpAJ",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1nUsabDQ8bwq_iK21U4g4NCqbhkvuEpAJ",
      "mirror_1": "https://app.box.com/s/0ret5fdyzlgnijn4lct02bz7lfb1wun0",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_jan_2019",
      "mirror_3": "https://my.pcloud.com/publink/show?code=XZihvC7ZrysNBx7YskB3tomwYYuomfdHhVm7",
      "mirror_4": "https://www.scribd.com/document/396617872/Vedanta-Piyush-Jan-2019"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000300",
    "canonicalId": "canonical-000300",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-55 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1M39npPRx7TRI0Ts2eiTWvwlzE9uc6dbH",
    "archiveUrl": "https://drive.google.com/open?id=1M39npPRx7TRI0Ts2eiTWvwlzE9uc6dbH",
    "readOnlineUrl": "https://drive.google.com/open?id=1M39npPRx7TRI0Ts2eiTWvwlzE9uc6dbH",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1M39npPRx7TRI0Ts2eiTWvwlzE9uc6dbH",
      "mirror_1": "https://app.box.com/s/ax5evma4wm9hf7812j1t1e4qxewwsqm2",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_dec_2018",
      "mirror_3": "https://www.scribd.com/document/394860289/Vedanta-Piyush-Dec-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000301",
    "canonicalId": "canonical-000301",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-57 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "archiveUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "readOnlineUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
      "mirror_1": "https://app.box.com/s/64y1k211xndawy1il41d3yq8l2ndqwrd",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_nov_2018",
      "mirror_3": "https://www.scribd.com/document/434207253/Vedanta-Piyush-Nov-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000302",
    "canonicalId": "canonical-000302",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-59 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1rugADGLiJi60sKKxAX10uhhwYuoMQrHd",
    "archiveUrl": "https://drive.google.com/open?id=1rugADGLiJi60sKKxAX10uhhwYuoMQrHd",
    "readOnlineUrl": "https://drive.google.com/open?id=1rugADGLiJi60sKKxAX10uhhwYuoMQrHd",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1rugADGLiJi60sKKxAX10uhhwYuoMQrHd",
      "mirror_1": "https://app.box.com/s/qmm7p69yipq3mbovpmhx1l5d7su0d9xk",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_oct_2018",
      "mirror_3": "https://www.scribd.com/document/429465126/Vedanta-Piyush-Oct-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000303",
    "canonicalId": "canonical-000303",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-61 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "archiveUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "readOnlineUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
      "mirror_1": "https://app.box.com/s/6p3zoz4z2h6u59o06t9kch76nr92zz3l",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_sep_2018",
      "mirror_3": "https://www.scribd.com/document/425083078/Vedanta-Piyush-Sept-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000304",
    "canonicalId": "canonical-000304",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-63 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "archiveUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "readOnlineUrl": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1ZbFq_-XN3gKw-m0H-zh8BepHUZbY8dnV",
      "mirror_1": "https://app.box.com/s/yromrzkbbsc2nl0mcaqhid8a0d1gbuj1",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_aug_2018",
      "mirror_3": "https://www.scribd.com/document/421988572/Vedanta-Piyush-Aug-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000305",
    "canonicalId": "canonical-000305",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2019",
    "month": "July",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
    "mirrors": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019",
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018",
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017",
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016",
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (July 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1QYbXSD5WBmI8hWNwFv9vR480J6uXn3lp",
    "alternateSources": [
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018"
    ]
  },
  {
    "id": "canonical-000306",
    "canonicalId": "canonical-000306",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2019",
    "month": "June",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
    "mirrors": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019",
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018",
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017",
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016",
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (June 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1xH2qKcsuYgXIukwqq6NDtxBHi58chJik",
    "alternateSources": [
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018"
    ]
  },
  {
    "id": "canonical-000307",
    "canonicalId": "canonical-000307",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2019",
    "month": "May",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
    "mirrors": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019",
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018",
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017",
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016",
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (May 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1tgsxKSG5HXaOANi9QP8otAjwlOrA8dsX",
    "alternateSources": [
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018"
    ]
  },
  {
    "id": "vp-000308",
    "canonicalId": "canonical-000308",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-71 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1uMPUMY7lD00WYQkS_H4RKPmPw0J2md2i",
    "archiveUrl": "https://drive.google.com/open?id=1uMPUMY7lD00WYQkS_H4RKPmPw0J2md2i",
    "readOnlineUrl": "https://drive.google.com/open?id=1uMPUMY7lD00WYQkS_H4RKPmPw0J2md2i",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1uMPUMY7lD00WYQkS_H4RKPmPw0J2md2i",
      "mirror_1": "https://app.box.com/s/p6lqulpmk4d0hw8edzctjlg00wfql0dg",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_apr_2018",
      "mirror_3": "https://www.scribd.com/document/405727843/Vedanta-Piyush-Apr-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000309",
    "canonicalId": "canonical-000309",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-73 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1b8Yqkvd4QWltIylLrHLX_g6kb-xWkr98",
    "archiveUrl": "https://drive.google.com/open?id=1b8Yqkvd4QWltIylLrHLX_g6kb-xWkr98",
    "readOnlineUrl": "https://drive.google.com/open?id=1b8Yqkvd4QWltIylLrHLX_g6kb-xWkr98",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1b8Yqkvd4QWltIylLrHLX_g6kb-xWkr98",
      "mirror_1": "https://app.box.com/s/is04cpmsz05g4hp6jf6gvag258kiifnu",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_mar_2018",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZ1rvO7Z8emrGEqBbk7KjIqKIDQcq01F8bd7",
      "mirror_4": "https://www.scribd.com/document/401876205/Vedanta-Piyush-Mar-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000310",
    "canonicalId": "canonical-000310",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-75 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1DuVDjG8RM4aE4nqFa2skhrtlxABknc1f",
    "archiveUrl": "https://drive.google.com/open?id=1DuVDjG8RM4aE4nqFa2skhrtlxABknc1f",
    "readOnlineUrl": "https://drive.google.com/open?id=1DuVDjG8RM4aE4nqFa2skhrtlxABknc1f",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1DuVDjG8RM4aE4nqFa2skhrtlxABknc1f",
      "mirror_1": "https://app.box.com/s/xptecqyxxktxlbxii5oj7hyy55jvj05y",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_feb_2018",
      "mirror_3": "https://www.scribd.com/document/399107217/Vedanta-Piyush-Feb-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000311",
    "canonicalId": "canonical-000311",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-77 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=12OyjsPL0hl7yLC6Bmne6nyiTY-VMTyJ7",
    "archiveUrl": "https://drive.google.com/open?id=12OyjsPL0hl7yLC6Bmne6nyiTY-VMTyJ7",
    "readOnlineUrl": "https://drive.google.com/open?id=12OyjsPL0hl7yLC6Bmne6nyiTY-VMTyJ7",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=12OyjsPL0hl7yLC6Bmne6nyiTY-VMTyJ7",
      "mirror_1": "https://app.box.com/s/8u3dgnuzh8w6yz7718um9tu91f87gq93",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_jan_2018",
      "mirror_3": "https://www.scribd.com/document/396617872/Vedanta-Piyush-Jan-2018"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000312",
    "canonicalId": "canonical-000312",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-79 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1uDOkzjkq_z_cNYZDYMMi40OfwPoqyWpY",
    "archiveUrl": "https://drive.google.com/open?id=1uDOkzjkq_z_cNYZDYMMi40OfwPoqyWpY",
    "readOnlineUrl": "https://drive.google.com/open?id=1uDOkzjkq_z_cNYZDYMMi40OfwPoqyWpY",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1uDOkzjkq_z_cNYZDYMMi40OfwPoqyWpY",
      "mirror_1": "https://app.box.com/s/fg5v72hb8w7c1f4mxftgxt17jsjd8zx5",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_dec_2017",
      "mirror_3": "https://www.scribd.com/document/366887107/Vedanta-Piyush-Dec-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000313",
    "canonicalId": "canonical-000313",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-81 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "archiveUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "readOnlineUrl": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1KT1lXWZr-dntupCbLAH8STMiDn5bAiQ9",
      "mirror_1": "https://app.box.com/s/xrw3awclx36mua8fa3ngl9mj0ba9ciee",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_nov_2017",
      "mirror_3": "https://www.scribd.com/document/363803627/Vedanta-Piyush-Nov-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000314",
    "canonicalId": "canonical-000314",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-83 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVZLV0JSSkt0X0E",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVZLV0JSSkt0X0E",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVZLV0JSSkt0X0E",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVZLV0JSSkt0X0E",
      "mirror_1": "https://app.box.com/s/6gm10t7mwdntsus56wyw0wl8hi82pmv3",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_oct_2017",
      "mirror_3": "https://www.scribd.com/document/361015963/Vedanta-Piyush-Oct-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000315",
    "canonicalId": "canonical-000315",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-85 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRndPY2ozbC10Y3M",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRndPY2ozbC10Y3M",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWRndPY2ozbC10Y3M",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWRndPY2ozbC10Y3M",
      "mirror_1": "https://app.box.com/s/6p3zoz4z2h6u59o06t9kch76nr92zz3l",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_sep_2017",
      "mirror_3": "https://www.scribd.com/document/358264921/Vedanta-Piyush-Sep-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000316",
    "canonicalId": "canonical-000316",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-87 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeGp6cV91aFU4Z0U",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeGp6cV91aFU4Z0U",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeGp6cV91aFU4Z0U",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWeGp6cV91aFU4Z0U",
      "mirror_1": "https://app.box.com/s/4ceb2b4podj238qqlcjbvh2kqoav19t0",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_aug_2017",
      "mirror_3": "https://www.scribd.com/document/356052248/Vedanta-Piyush-Aug-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000317",
    "canonicalId": "canonical-000317",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2019",
    "month": "July",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
    "mirrors": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019",
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018",
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017",
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016",
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (July 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWR0k1cEJ3ajMxWmM",
    "alternateSources": [
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017"
    ]
  },
  {
    "id": "canonical-000318",
    "canonicalId": "canonical-000318",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2019",
    "month": "June",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
    "mirrors": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019",
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018",
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017",
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016",
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (June 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWczQyUF9aVTFCRkU",
    "alternateSources": [
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017"
    ]
  },
  {
    "id": "canonical-000319",
    "canonicalId": "canonical-000319",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2019",
    "month": "May",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
    "mirrors": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019",
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018",
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017",
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016",
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (May 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWMl9TQ2M5NzZQYVk",
    "alternateSources": [
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017"
    ]
  },
  {
    "id": "vp-000320",
    "canonicalId": "canonical-000320",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-95 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU2p4UGtONXNEYnM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU2p4UGtONXNEYnM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWU2p4UGtONXNEYnM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWU2p4UGtONXNEYnM",
      "mirror_1": "https://app.box.com/s/gji6xyev7j0enmxej964qm2d88sgd7vc",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_apr_2017",
      "mirror_3": "https://www.scribd.com/document/345197301/Vedanta-Piyush-Apr-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000321",
    "canonicalId": "canonical-000321",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-97 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
      "mirror_1": "https://app.box.com/s/8koyycvnp4m3lqy117bi8nwfvb492uzb",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_mar_2017",
      "mirror_3": "https://pcdn-my.pcloud.com/publink/show?code=XZ1rvO7Z8emrGEqBbk7KjIqKIDQcq01F8bd7",
      "mirror_4": "https://www.scribd.com/document/341858237/Vedanta-Piyush-March-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000322",
    "canonicalId": "canonical-000322",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-99 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOFo4R09zQm1VcDA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOFo4R09zQm1VcDA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOFo4R09zQm1VcDA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWOFo4R09zQm1VcDA",
      "mirror_1": "https://app.box.com/s/ubwhosnq0od5dljipti9alr1e37w0z4p",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_feb_2017",
      "mirror_3": "https://www.scribd.com/document/338867857/Vedanta-Piyush-Feb-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000323",
    "canonicalId": "canonical-000323",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-101 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWmp4SkhlYWktUHM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWmp4SkhlYWktUHM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWmp4SkhlYWktUHM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWmp4SkhlYWktUHM",
      "mirror_1": "https://app.box.com/s/a8tkx3zvibqeq7ktxkjivih626c4fc8b",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_jan_2017",
      "mirror_3": "https://www.scribd.com/document/336534543/Vedanta-Piyush-Jan-2017"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000324",
    "canonicalId": "canonical-000324",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-103 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdm9nWkNLaGh2eEU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdm9nWkNLaGh2eEU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdm9nWkNLaGh2eEU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWdm9nWkNLaGh2eEU",
      "mirror_1": "https://app.box.com/s/nn4img5dvfaen2ztd2rdheswnqw410eq",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_dec_2016",
      "mirror_3": "https://www.scribd.com/document/333876854/Vedanta-Piyush-Dec-2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000325",
    "canonicalId": "canonical-000325",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-105 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeVQydlJMUFp3bms",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeVQydlJMUFp3bms",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWeVQydlJMUFp3bms",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWeVQydlJMUFp3bms",
      "mirror_1": "https://app.box.com/s/z6im49uwc6hhbp7t6g41nczl2pxnjj2h",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_nov_2016",
      "mirror_3": "https://www.scribd.com/document/330928160/Vedanta-Piyush-Nov2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000326",
    "canonicalId": "canonical-000326",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-107 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOEE4UFNqOHZIWW8",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOEE4UFNqOHZIWW8",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOEE4UFNqOHZIWW8",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWOEE4UFNqOHZIWW8",
      "mirror_1": "https://app.box.com/s/4wx9imt613s0fwwdi0brdck5vrb5cpzo",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_oct_2016",
      "mirror_3": "https://www.scribd.com/document/327417077/Vedanta-Piyush-Oct-2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000327",
    "canonicalId": "canonical-000327",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-109 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTVdXWTVMQVlrczA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTVdXWTVMQVlrczA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWTVdXWTVMQVlrczA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWTVdXWTVMQVlrczA",
      "mirror_1": "https://app.box.com/s/ojcpe19ifon65am7g4piwemup3htdn0y",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_sep_2016",
      "mirror_3": "https://www.scribd.com/document/323546630/Vedanta-Piyush-Sept-2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000328",
    "canonicalId": "canonical-000328",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-111 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVEJSbm1XVTVDbEE",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVEJSbm1XVTVDbEE",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVEJSbm1XVTVDbEE",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWVEJSbm1XVTVDbEE",
      "mirror_1": "https://app.box.com/s/7al5jnx8lkl6xeazaggx2nxwxh8qhqa4",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_aug_2016",
      "mirror_3": "https://www.scribd.com/document/321117058/VedantaPiyush-Aug2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000329",
    "canonicalId": "canonical-000329",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2019",
    "month": "July",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
    "mirrors": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019",
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018",
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017",
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016",
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (July 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=1HKK2PP4wHdD2e6AwGE_vj7CvnE4myKAA",
    "alternateSources": [
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016"
    ]
  },
  {
    "id": "canonical-000330",
    "canonicalId": "canonical-000330",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2019",
    "month": "June",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
    "mirrors": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019",
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018",
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017",
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016",
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (June 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWVGJHZEozM2RQMDA",
    "alternateSources": [
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016"
    ]
  },
  {
    "id": "canonical-000331",
    "canonicalId": "canonical-000331",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2019",
    "month": "May",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
    "mirrors": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019",
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018",
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017",
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016",
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (May 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWZWdNT01xSy1sQ1k",
    "alternateSources": [
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016"
    ]
  },
  {
    "id": "vp-000332",
    "canonicalId": "canonical-000332",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-119 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlJyOXhwSkFCRDQ",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlJyOXhwSkFCRDQ",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlJyOXhwSkFCRDQ",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMlJyOXhwSkFCRDQ",
      "mirror_1": "https://app.box.com/s/aiav9kelcx5c6nphjcdzq2uamhokjfqu",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_apr_2016",
      "mirror_3": "https://www.scribd.com/doc/307531992/Vedanta-Piyush-April2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000333",
    "canonicalId": "canonical-000333",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-121 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMVc1TDB1OE1KRzg",
      "mirror_1": "https://app.box.com",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_mar_2016",
      "mirror_3": "https://www.scribd.com/"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000334",
    "canonicalId": "canonical-000334",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-123 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWd2M4UTMtb2RvbVk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWd2M4UTMtb2RvbVk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWd2M4UTMtb2RvbVk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWd2M4UTMtb2RvbVk",
      "mirror_1": "https://app.box.com/s/p4d9kcj7ddzftykff1y7mxttaht2qwhy",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_feb_2016",
      "mirror_3": "https://www.scribd.com/doc/299238276/Vedanta-Piyush-Feb2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000335",
    "canonicalId": "canonical-000335",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-125 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdl95QU5pVk95Z1U",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdl95QU5pVk95Z1U",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdl95QU5pVk95Z1U",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWdl95QU5pVk95Z1U",
      "mirror_1": "https://app.box.com/s/wsmfusenwu39q0yxiad1mzxr2q0sv0jt",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_jan_2016",
      "mirror_3": "https://www.scribd.com/doc/295386563/Vedanta-Piyush-Jan2016"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000336",
    "canonicalId": "canonical-000336",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-127 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaGdhSUxTUm5DYVk",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaGdhSUxTUm5DYVk",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWaGdhSUxTUm5DYVk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWaGdhSUxTUm5DYVk",
      "mirror_1": "https://app.box.com/s/rx941hqdojbsowjpjoqnidupn0va61d4",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_dec_2015",
      "mirror_3": "https://www.scribd.com/doc/292579262/Vedanta-Piyush-Dec2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000337",
    "canonicalId": "canonical-000337",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-129 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com",
    "archiveUrl": "https://drive.google.com",
    "readOnlineUrl": "https://drive.google.com",
    "mirrors": {
      "canonical": "https://drive.google.com",
      "mirror_1": "https://app.box.com",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_nov_2015",
      "mirror_3": "https://www.scribd.com/"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000338",
    "canonicalId": "canonical-000338",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-131 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOVdkRktZRlJYSHM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOVdkRktZRlJYSHM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWOVdkRktZRlJYSHM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWOVdkRktZRlJYSHM",
      "mirror_1": "https://app.box.com/s/9eu4uwut27twe2u5468e4i8y4rf90wzm",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_oct_2015",
      "mirror_3": "https://www.scribd.com/doc/284480514/Vedanta-Piyush-Oct-2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000339",
    "canonicalId": "canonical-000339",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-133 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdlFESXlSRFFpY1E",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdlFESXlSRFFpY1E",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWdlFESXlSRFFpY1E",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWdlFESXlSRFFpY1E",
      "mirror_1": "https://app.box.com/s/rzp8izos9eq29gz1xnmdglh0g6un0jcj",
      "mirror_2": "https://issuu.com/vmission/docs/vedanta_piyush_-_sep_2015",
      "mirror_3": "https://www.scribd.com/doc/279932730/Vedanta-Piyush-Sept-2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000340",
    "canonicalId": "canonical-000340",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-135 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNWtLYkNQaFRpOGc",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNWtLYkNQaFRpOGc",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWNWtLYkNQaFRpOGc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWNWtLYkNQaFRpOGc",
      "mirror_1": "https://app.box.com/s/trb3006j6vhn495vzk4b02yxrmqvf8r7",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_aug_2015",
      "mirror_3": "https://www.scribd.com/doc/273798971/Vedanta-Piyush-Aug-2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "canonical-000341",
    "canonicalId": "canonical-000341",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — July 2019",
    "month": "July",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1cgtS4FTBuBySnGNnekZA3oAJfZqo1835",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
    "mirrors": [
      "https://app.box.com/s/g8lwvpq253lwd7dzwsvu2jzbtxol5q79",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2019",
      "https://my.pcloud.com/publink/show?code=XZfzmG7ZmhEgWdkCJGjVUPWJLiuHhfcXrG6X",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2019",
      "https://app.box.com/s/7y5vmrvlrnxp47uixxka3wxeq8mloq6i",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2018",
      "https://www.scribd.com/document/417010703/Vedanta-Piyush-July-2018",
      "https://app.box.com/s/cwgjlz7i6cxjagpmoog4k7tdeyzj171q",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2017",
      "https://www.scribd.com/document/353484018/Vedanta-Piyush-July-2017",
      "https://app.box.com/s/e4rb2jrzttz3mldq2dgi6dlukrvn0qv2",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2016",
      "https://www.scribd.com/document/317897885/Vedanta-Piyush-July2016",
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (July 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWZF9Ka1I2eEhuajQ",
    "alternateSources": [
      "https://app.box.com/s/shz91grgdvqrfn2sbufgcfbanyzupv7z",
      "https://issuu.com/home/published/vedanta_piyush_-_july_2015",
      "https://www.scribd.com/doc/270790168/Vedanta-Piyush-July2015"
    ]
  },
  {
    "id": "canonical-000342",
    "canonicalId": "canonical-000342",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — June 2019",
    "month": "June",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1AbNgFM2tXC1XuLz9qYN5g1Qi2X1xyduO",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
    "mirrors": [
      "https://app.box.com/s/md3n9hd5pzrum41aps9xprbdawyz90k4",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2019",
      "https://my.pcloud.com/publink/show?code=XZlasN7ZFViJT9H5Qw0ycvSNqfN325bXoL0y",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2019",
      "https://app.box.com/s/5gu90qhqojkjq47zt1g48v1mgvvaoy8u",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2018",
      "https://www.scribd.com/document/413143913/Vedanta-Piyush-June-2018",
      "https://app.box.com/s/s65ndyqts2eukidhwuxw12ofnh3gntls",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2017",
      "https://www.scribd.com/document/351352062/Vedanta-Piyush-June-2017",
      "https://app.box.com/s/zgiq7kthxvv9a4deird3jv8yap1mhft3",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2016",
      "https://www.scribd.com/doc/314780806/Vedanta-Piyush-June-2016",
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (June 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWNk81b3J3aWFYcFU",
    "alternateSources": [
      "https://app.box.com/s/n8tuf1nh9j7azuqoo5bwzgplpuyt7m5z",
      "https://issuu.com/home/published/vedanta_piyush_-_june_2015",
      "https://www.scribd.com/doc/267826065/Vedanta-Piyush-June-2015"
    ]
  },
  {
    "id": "canonical-000343",
    "canonicalId": "canonical-000343",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — May 2019",
    "month": "May",
    "year": 2019,
    "coverImage": "",
    "language": "Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=1V1dq1T5oGhEirTtACUdyrOB6MmR6dwVD",
    "readOnlineUrl": "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
    "mirrors": [
      "https://app.box.com/s/3esyt9jzwqkpriw7uoyv29fbovjc613l",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2019_774c0e519e9a60",
      "https://my.pcloud.com/publink/show?code=XZ93FI7ZNo0HhQPx2WS5fz4aCvIipXkR6NFk",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2019",
      "https://app.box.com/s/a0pz9lfi2euxpmlgu4jxk20osn1u53nk",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2018",
      "https://www.scribd.com/document/410078073/Vedanta-Piyush-May-2018",
      "https://app.box.com/s/934mddye90249vr0cw6vdaytlrc1kmt5",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2017",
      "https://www.scribd.com/document/348303296/Vedanta-Piyush-May-2017",
      "https://app.box.com/s/jp0aoza21sx9ie41cjne6ent517n7a7d",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2016",
      "https://www.scribd.com/doc/312067524/Vedanta-Piyush-May-2016",
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ],
    "description": "Monthly publication of Vedanta Piyush (May 2019). Preserved in Vedanta Mission historical archive.",
    "canonicalSource": "https://drive.google.com/open?id=0B4gD3HGHwbZWc01oN2taWHZpcHM",
    "alternateSources": [
      "https://app.box.com/s/2qvq25qlkjto7keoerftkul47q0hv1v4",
      "https://issuu.com/home/published/vedanta_piyush_-_may_2015",
      "https://www.scribd.com/doc/264189890/Vedanta-Piyush-May-2015"
    ]
  },
  {
    "id": "vp-000344",
    "canonicalId": "canonical-000344",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-143 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMERmRjZTZW0tcFU",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMERmRjZTZW0tcFU",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMERmRjZTZW0tcFU",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMERmRjZTZW0tcFU",
      "mirror_1": "https://app.box.com/s/ac0tngvh2p9n9izvgow8z4tylditi0ln",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_apr_2015",
      "mirror_3": "https://www.scribd.com/doc/260992221/Vedanta-Piyush-Apr-2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000345",
    "canonicalId": "canonical-000345",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-145 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMFlCdGtLOC1BSjA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMFlCdGtLOC1BSjA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWMFlCdGtLOC1BSjA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWMFlCdGtLOC1BSjA",
      "mirror_1": "https://app.box.com/s/ihhix5jsq6so3ygrtli2pefxckvui7cm",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_mar_2015",
      "mirror_3": "https://www.scribd.com/doc/258009737/Vedanta-Piyush-Mar2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000346",
    "canonicalId": "canonical-000346",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-147 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWcEpmd0xISEttdzA",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWcEpmd0xISEttdzA",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWcEpmd0xISEttdzA",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWcEpmd0xISEttdzA",
      "mirror_1": "https://app.box.com/s/r27w72gf2ms23k8vonozc38hvk0wj1so",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_feb_2015",
      "mirror_3": "https://www.scribd.com/doc/255142380/Vedanta-Piyush-Feb-2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "vp-000347",
    "canonicalId": "canonical-000347",
    "type": "Vedanta Piyush",
    "title": "Vedanta Piyush — Issue-149 2019",
    "month": "Monthly Issue",
    "year": 2019,
    "coverImage": "",
    "language": "Hindi / Gujarati",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWndZQ05HbFgyZnM",
    "archiveUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWndZQ05HbFgyZnM",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWWndZQ05HbFgyZnM",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWWndZQ05HbFgyZnM",
      "mirror_1": "https://app.box.com/s/wjjxno1q871m0f05un8n",
      "mirror_2": "https://issuu.com/home/published/vedanta_piyush_-_jan_2015",
      "mirror_3": "https://www.scribd.com/doc/251910709/Vedanta-Piyush-Jan2015"
    },
    "description": "Vedanta Piyush canonical monthly journal ( 2019) sharing scriptural discourses in Hindi and Gujarati.",
    "isLatest": false,
    "pageCount": 36
  },
  {
    "id": "book-000348",
    "canonicalId": "canonical-000348",
    "type": "E-Books",
    "title": "Vedanta Articles — Volume 6",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/ebook-va06.jpg",
    "language": "Hindi / English",
    "downloadUrl": "https://archive.org/download/vedanta_articles6/VedantaArticles_6.pdf",
    "readOnlineUrl": "https://archive.org/download/vedanta_articles6/VedantaArticles_6.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vedanta_articles6/VedantaArticles_6.pdf",
      "mirror_1": "https://drive.google.com/file/d/1F7LN1UZkHFMXq--CW4_V_nWqpY2phhVK/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/m33lhqsrp3gb34cte8fz3a98te1v1l6p",
      "mirror_3": "https://online.pubhtml5.com/iidh/xgaa/",
      "mirror_4": "https://u.pcloud.link/publink/show?code=XZJJDg5ZdTWfRKvClNz5NtxRUNCG5X2XyLwy"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Vedanta Articles — Volume 6."
  },
  {
    "id": "book-000349",
    "canonicalId": "canonical-000349",
    "type": "E-Books",
    "title": "Vedanta Articles — Volume 4",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/ebook-va04.png",
    "language": "Hindi / English",
    "downloadUrl": "https://archive.org/download/vedanta-articles-part-4/VedantaArticles_Part4.pdf",
    "readOnlineUrl": "https://archive.org/download/vedanta-articles-part-4/VedantaArticles_Part4.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vedanta-articles-part-4/VedantaArticles_Part4.pdf",
      "mirror_1": "https://drive.google.com/file/d/1FBf-GxfwPWqOvvKIP5Hdr4T-1sxu16QA/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/yntnhx9fw1s3x0yugwptqqxg48kw6wfh",
      "mirror_3": "https://online.pubhtml5.com/iidh/tqxf/",
      "mirror_4": "http://u.pc.cd/Oyp7"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Vedanta Articles — Volume 4."
  },
  {
    "id": "book-000350",
    "canonicalId": "canonical-000350",
    "type": "E-Books",
    "title": "Vedanta Articles — Volume 3",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/ebook-va03.png",
    "language": "Hindi / English",
    "downloadUrl": "https://archive.org/download/vedanta-articles-3/Vedanta%20Articles%203.pdf",
    "readOnlineUrl": "https://archive.org/download/vedanta-articles-3/Vedanta%20Articles%203.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vedanta-articles-3/Vedanta%20Articles%203.pdf",
      "mirror_1": "https://drive.google.com/file/d/1Ag6WcNmanbYQP9tB_WkSTD_gG4oDCqsh/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/ycxhigssuwrk6sij7ss92hddi46ml5sh",
      "mirror_3": "https://online.pubhtml5.com/iidh/hngw/",
      "mirror_4": "http://u.pc.cd/yrLotalK"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Vedanta Articles — Volume 3."
  },
  {
    "id": "book-000351",
    "canonicalId": "canonical-000351",
    "type": "E-Books",
    "title": "Vedanta Articles — Volume 2",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/ebook-va02.jpg",
    "language": "Hindi / English",
    "downloadUrl": "https://archive.org/download/vedanta-articles-2/Vedanta%20Articles%20-%202.pdf",
    "readOnlineUrl": "https://archive.org/download/vedanta-articles-2/Vedanta%20Articles%20-%202.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vedanta-articles-2/Vedanta%20Articles%20-%202.pdf",
      "mirror_1": "https://drive.google.com/file/d/1ICylxJnqTKERy661IJQG0EoXLtLSP2vf/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/6ctmsdxc3ffqvu2r05iygl1b1r0amitb",
      "mirror_3": "https://online.pubhtml5.com/iidh/akej/",
      "mirror_4": "http://u.pc.cd/oT8"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Vedanta Articles — Volume 2."
  },
  {
    "id": "book-000352",
    "canonicalId": "canonical-000352",
    "type": "E-Books",
    "title": "Vedanta Articles — Volume 1",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/ebook-va01.jpg",
    "language": "Hindi / English",
    "downloadUrl": "https://archive.org/download/vedanta-articles/Vedanta%20Articles.pdf",
    "readOnlineUrl": "https://archive.org/download/vedanta-articles/Vedanta%20Articles.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vedanta-articles/Vedanta%20Articles.pdf",
      "mirror_1": "https://drive.google.com/file/d/1j7J2y8ityMUZP1ue0dLvSO8a_dBCSxRp/view?usp=sharing",
      "mirror_2": "https://app.box.com/s/anq49u5poeg2gigxj78l9nvksljch0i2",
      "mirror_3": "https://online.pubhtml5.com/iidh/amvb/",
      "mirror_4": "http://u.pc.cd/PlcitalK"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Vedanta Articles — Volume 1."
  },
  {
    "id": "book-000353",
    "canonicalId": "canonical-000353",
    "type": "E-Books",
    "title": "Tattva Bodha (Sanskrit Text & Translation eBook)",
    "author": "Swami Atmananda Saraswati / Vedanta Mission Acharyas",
    "year": 2022,
    "coverImage": "/images/vmission/publications/study-text-tb-mula.jpg",
    "language": "Hindi / English",
    "downloadUrl": "http://issuu.com/vmission/docs/tbodha?e=1022112/2696124#222222",
    "readOnlineUrl": "http://issuu.com/vmission/docs/tbodha?e=1022112/2696124#222222",
    "mirrors": {
      "canonical": "http://issuu.com/vmission/docs/tbodha?e=1022112/2696124#222222"
    },
    "description": "Comprehensive scriptural monograph and e-book treatise: Tattva Bodha (Sanskrit Text & Translation eBook)."
  },
  {
    "id": "study-text-000354",
    "canonicalId": "canonical-000354",
    "type": "Study & Chant Texts",
    "title": "AMRITBINDU UPANISHAD",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://app.box.com/s/x414kbot6s36ia08lk2w3wwy4486pa19",
    "readOnlineUrl": "https://app.box.com/s/x414kbot6s36ia08lk2w3wwy4486pa19",
    "mirrors": {
      "canonical": "https://app.box.com/s/x414kbot6s36ia08lk2w3wwy4486pa19"
    },
    "description": "Scriptural reference and chanting text: AMRITBINDU UPANISHAD. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000355",
    "canonicalId": "canonical-000355",
    "type": "Study & Chant Texts",
    "title": "ISHAVASYA UPANISHAD",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1SfNeMRitKgMppJrvvViJ5v4dcvMjBL7K/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1SfNeMRitKgMppJrvvViJ5v4dcvMjBL7K/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1SfNeMRitKgMppJrvvViJ5v4dcvMjBL7K/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1SfNeMRitKgMppJrvvViJ5v4dcvMjBL7K/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: ISHAVASYA UPANISHAD. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000356",
    "canonicalId": "canonical-000356",
    "type": "Study & Chant Texts",
    "title": "KAIVALYA UPANISHAD",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/11i8xng7CPr9PX39Z3LN4PXO-p93QiS1H/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/11i8xng7CPr9PX39Z3LN4PXO-p93QiS1H/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/11i8xng7CPr9PX39Z3LN4PXO-p93QiS1H/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/11i8xng7CPr9PX39Z3LN4PXO-p93QiS1H/view?usp=sharing",
      "mirror_2": "https://drive.google.com/file/d/11i8xng7CPr9PX39Z3LN4PXO-p93QiS1H/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KAIVALYA UPANISHAD. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000357",
    "canonicalId": "canonical-000357",
    "type": "Study & Chant Texts",
    "title": "KENA UPANISHAD 1",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1pxlhucwKxhhHMaXOglv6phiW75ue7Zke/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1pxlhucwKxhhHMaXOglv6phiW75ue7Zke/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1pxlhucwKxhhHMaXOglv6phiW75ue7Zke/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1pxlhucwKxhhHMaXOglv6phiW75ue7Zke/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KENA UPANISHAD 1. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000358",
    "canonicalId": "canonical-000358",
    "type": "Study & Chant Texts",
    "title": "KENA UPANISHAD 1_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1mQAVBu9_sgNavBHp8RWKdYPPXShCgy2Y/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1mQAVBu9_sgNavBHp8RWKdYPPXShCgy2Y/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1mQAVBu9_sgNavBHp8RWKdYPPXShCgy2Y/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1mQAVBu9_sgNavBHp8RWKdYPPXShCgy2Y/view?usp=sharing",
      "mirror_2": "https://drive.google.com/file/d/1mQAVBu9_sgNavBHp8RWKdYPPXShCgy2Y/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KENA UPANISHAD 1_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000359",
    "canonicalId": "canonical-000359",
    "type": "Study & Chant Texts",
    "title": "KENA UPANISHAD 1_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/12iNn4_dpIb4Jx8_MTMdh-y-bQrDJSziS/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/12iNn4_dpIb4Jx8_MTMdh-y-bQrDJSziS/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/12iNn4_dpIb4Jx8_MTMdh-y-bQrDJSziS/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/12iNn4_dpIb4Jx8_MTMdh-y-bQrDJSziS/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KENA UPANISHAD 1_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000360",
    "canonicalId": "canonical-000360",
    "type": "Study & Chant Texts",
    "title": "KENA UPANISHAD 1_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/17p4wJu7ObE1HkEdR0d68W1eoWbhHeVk-/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/17p4wJu7ObE1HkEdR0d68W1eoWbhHeVk-/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/17p4wJu7ObE1HkEdR0d68W1eoWbhHeVk-/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/17p4wJu7ObE1HkEdR0d68W1eoWbhHeVk-/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KENA UPANISHAD 1_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000361",
    "canonicalId": "canonical-000361",
    "type": "Study & Chant Texts",
    "title": "KENA UPANISHAD 1_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1DVwB5XNrN7dQ24oLS3x-FAycuJoVrFir/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1DVwB5XNrN7dQ24oLS3x-FAycuJoVrFir/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1DVwB5XNrN7dQ24oLS3x-FAycuJoVrFir/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1DVwB5XNrN7dQ24oLS3x-FAycuJoVrFir/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: KENA UPANISHAD 1_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000362",
    "canonicalId": "canonical-000362",
    "type": "Study & Chant Texts",
    "title": "MANDUKYA UPANISHAD 1",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1EVa5wxmS3BiNU9PISN5B2KCu9PouBOKl/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1EVa5wxmS3BiNU9PISN5B2KCu9PouBOKl/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1EVa5wxmS3BiNU9PISN5B2KCu9PouBOKl/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1EVa5wxmS3BiNU9PISN5B2KCu9PouBOKl/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MANDUKYA UPANISHAD 1. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000363",
    "canonicalId": "canonical-000363",
    "type": "Study & Chant Texts",
    "title": "MANDUKYA UPANISHAD 2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1RBjKrt_YFGZ3EmbFvAMd8L3uilXcb0E5/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1RBjKrt_YFGZ3EmbFvAMd8L3uilXcb0E5/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1RBjKrt_YFGZ3EmbFvAMd8L3uilXcb0E5/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1RBjKrt_YFGZ3EmbFvAMd8L3uilXcb0E5/view?usp=sharing",
      "mirror_2": "https://drive.google.com/file/d/1RBjKrt_YFGZ3EmbFvAMd8L3uilXcb0E5/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MANDUKYA UPANISHAD 2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000364",
    "canonicalId": "canonical-000364",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 1_1",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1UIhXOs_hErVj_jspWu-75B_lAptn0FUM/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1UIhXOs_hErVj_jspWu-75B_lAptn0FUM/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1UIhXOs_hErVj_jspWu-75B_lAptn0FUM/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1UIhXOs_hErVj_jspWu-75B_lAptn0FUM/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 1_1. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000365",
    "canonicalId": "canonical-000365",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 1_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/15Km6LYNFn3HS_SyjjrLcw0BEIU48-Ip7/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/15Km6LYNFn3HS_SyjjrLcw0BEIU48-Ip7/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/15Km6LYNFn3HS_SyjjrLcw0BEIU48-Ip7/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/15Km6LYNFn3HS_SyjjrLcw0BEIU48-Ip7/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 1_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000366",
    "canonicalId": "canonical-000366",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 2_1",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1gVMvKlVYfS4QZD4Rl3NgIrKzA7l8e17A/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1gVMvKlVYfS4QZD4Rl3NgIrKzA7l8e17A/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1gVMvKlVYfS4QZD4Rl3NgIrKzA7l8e17A/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1gVMvKlVYfS4QZD4Rl3NgIrKzA7l8e17A/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 2_1. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000367",
    "canonicalId": "canonical-000367",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 2_2",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1bl6W43PJrH8o5L57Ls-Nequ7Mm_HtMhn/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1bl6W43PJrH8o5L57Ls-Nequ7Mm_HtMhn/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1bl6W43PJrH8o5L57Ls-Nequ7Mm_HtMhn/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1bl6W43PJrH8o5L57Ls-Nequ7Mm_HtMhn/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 2_2. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000368",
    "canonicalId": "canonical-000368",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 3_1",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1eD3JCR4-GDTiOYSouEbct8a9knF7g8Y3/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1eD3JCR4-GDTiOYSouEbct8a9knF7g8Y3/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1eD3JCR4-GDTiOYSouEbct8a9knF7g8Y3/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1eD3JCR4-GDTiOYSouEbct8a9knF7g8Y3/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 3_1. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000369",
    "canonicalId": "canonical-000369",
    "type": "Study & Chant Texts",
    "title": "MUNDAKA UPANISHAD 1_1-6",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1dWwQIhBrBB-uzHglyMQrenlV07_zBspu/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1dWwQIhBrBB-uzHglyMQrenlV07_zBspu/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1dWwQIhBrBB-uzHglyMQrenlV07_zBspu/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: MUNDAKA UPANISHAD 1_1-6. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000370",
    "canonicalId": "canonical-000370",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/0B4gD3HGHwbZWVGwzdmM0R2Nfbms/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/0B4gD3HGHwbZWVGwzdmM0R2Nfbms/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/0B4gD3HGHwbZWVGwzdmM0R2Nfbms/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000371",
    "canonicalId": "canonical-000371",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1s_llcqa9Xjypif9GGF-ga2HIRupkT8lh/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1s_llcqa9Xjypif9GGF-ga2HIRupkT8lh/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1s_llcqa9Xjypif9GGF-ga2HIRupkT8lh/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000372",
    "canonicalId": "canonical-000372",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/14Kk6S9bIJ2qtchRNFip4GuHyxmCzAnB7/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/14Kk6S9bIJ2qtchRNFip4GuHyxmCzAnB7/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/14Kk6S9bIJ2qtchRNFip4GuHyxmCzAnB7/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/14Kk6S9bIJ2qtchRNFip4GuHyxmCzAnB7/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000373",
    "canonicalId": "canonical-000373",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1ekY8HaJUoQ7o3hCLBz37mRvL5tbiG3oS/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1ekY8HaJUoQ7o3hCLBz37mRvL5tbiG3oS/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1ekY8HaJUoQ7o3hCLBz37mRvL5tbiG3oS/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1ekY8HaJUoQ7o3hCLBz37mRvL5tbiG3oS/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000374",
    "canonicalId": "canonical-000374",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1RxChKXr4T0DDsw4loUeZGoG5v6T1q5sr/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1RxChKXr4T0DDsw4loUeZGoG5v6T1q5sr/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1RxChKXr4T0DDsw4loUeZGoG5v6T1q5sr/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000375",
    "canonicalId": "canonical-000375",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/114BFGZL0DEWHy8JlCDT1nQG3NfccL_KW/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/114BFGZL0DEWHy8JlCDT1nQG3NfccL_KW/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/114BFGZL0DEWHy8JlCDT1nQG3NfccL_KW/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/114BFGZL0DEWHy8JlCDT1nQG3NfccL_KW/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000376",
    "canonicalId": "canonical-000376",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1BkoaRuP9TeUXD5Wq2XhfN0qdHClWL93J/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1BkoaRuP9TeUXD5Wq2XhfN0qdHClWL93J/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1BkoaRuP9TeUXD5Wq2XhfN0qdHClWL93J/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1BkoaRuP9TeUXD5Wq2XhfN0qdHClWL93J/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000377",
    "canonicalId": "canonical-000377",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1TDIqtI57IjhkFADY1Om2ECBFwi_0nRVP/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1TDIqtI57IjhkFADY1Om2ECBFwi_0nRVP/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1TDIqtI57IjhkFADY1Om2ECBFwi_0nRVP/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1TDIqtI57IjhkFADY1Om2ECBFwi_0nRVP/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000378",
    "canonicalId": "canonical-000378",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
      "mirror_2": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
      "mirror_3": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing",
      "mirror_4": "https://drive.google.com/file/d/1kFytM9voK1YHv035cCkm5j4ayCS7kdiG/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000379",
    "canonicalId": "canonical-000379",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/151HsUH9STrOTHvOsTMwe_GKQARKUAaVT/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/151HsUH9STrOTHvOsTMwe_GKQARKUAaVT/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/151HsUH9STrOTHvOsTMwe_GKQARKUAaVT/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/151HsUH9STrOTHvOsTMwe_GKQARKUAaVT/view?usp=sharing",
      "mirror_2": "https://drive.google.com/file/d/151HsUH9STrOTHvOsTMwe_GKQARKUAaVT/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000380",
    "canonicalId": "canonical-000380",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1rcP_Wg8rK0bVTZSlewcL03FhKvWn3gDA/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1rcP_Wg8rK0bVTZSlewcL03FhKvWn3gDA/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1rcP_Wg8rK0bVTZSlewcL03FhKvWn3gDA/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1rcP_Wg8rK0bVTZSlewcL03FhKvWn3gDA/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000381",
    "canonicalId": "canonical-000381",
    "type": "Study & Chant Texts",
    "title": "Scripture Study Text (Prakarana Study Text)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1EfqyLu72EnghuWr1bNN8W84GZtz6GGjp/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1EfqyLu72EnghuWr1bNN8W84GZtz6GGjp/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1EfqyLu72EnghuWr1bNN8W84GZtz6GGjp/view?usp=sharing",
      "mirror_1": "https://drive.google.com/file/d/1EfqyLu72EnghuWr1bNN8W84GZtz6GGjp/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Scripture Study Text (Prakarana Study Text). Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000382",
    "canonicalId": "canonical-000382",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ADHYASA BHASHYA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/adhyasa-bhashya/Adhyasa%20bhashya.pdf",
    "readOnlineUrl": "https://archive.org/download/adhyasa-bhashya/Adhyasa%20bhashya.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/adhyasa-bhashya/Adhyasa%20bhashya.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ADHYASA BHASHYA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000383",
    "canonicalId": "canonical-000383",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ADHYASA BHASHYA [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1UEbBKJHwOrNF-V5x9TPRKSLG01kiTWbo/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1UEbBKJHwOrNF-V5x9TPRKSLG01kiTWbo/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1UEbBKJHwOrNF-V5x9TPRKSLG01kiTWbo/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ADHYASA BHASHYA [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000384",
    "canonicalId": "canonical-000384",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ATMABODHA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/atmabodha_202109/atmabodha.pdf",
    "readOnlineUrl": "https://archive.org/download/atmabodha_202109/atmabodha.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/atmabodha_202109/atmabodha.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ATMABODHA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000385",
    "canonicalId": "canonical-000385",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ATMABODHA [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1OuwLeYaRxnKixasX-bwLPx_OMAYIE0HW/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1OuwLeYaRxnKixasX-bwLPx_OMAYIE0HW/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1OuwLeYaRxnKixasX-bwLPx_OMAYIE0HW/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ATMABODHA [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000386",
    "canonicalId": "canonical-000386",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ADWAIT MAKARANDA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/adw_mak/adw_mak.pdf",
    "readOnlineUrl": "https://archive.org/download/adw_mak/adw_mak.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/adw_mak/adw_mak.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ADWAIT MAKARANDA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000387",
    "canonicalId": "canonical-000387",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ADWAIT MAKARANDA [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVGwzdmM0R2Nfbms",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWVGwzdmM0R2Nfbms",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWVGwzdmM0R2Nfbms"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ADWAIT MAKARANDA [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000388",
    "canonicalId": "canonical-000388",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ASHTAVAKRA GITA - 1 [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/astavakra-1/Astavakra_1.pdf",
    "readOnlineUrl": "https://archive.org/download/astavakra-1/Astavakra_1.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/astavakra-1/Astavakra_1.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ASHTAVAKRA GITA - 1 [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000389",
    "canonicalId": "canonical-000389",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ASHTAVAKRA GITA - 2 [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/astavakra-2/Astavakra_2.pdf",
    "readOnlineUrl": "https://archive.org/download/astavakra-2/Astavakra_2.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/astavakra-2/Astavakra_2.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ASHTAVAKRA GITA - 2 [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000390",
    "canonicalId": "canonical-000390",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: BHAJA GOVINDAM [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/bhaja-govindam_202109/Bhaja%20Govindam.pdf",
    "readOnlineUrl": "https://archive.org/download/bhaja-govindam_202109/Bhaja%20Govindam.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/bhaja-govindam_202109/Bhaja%20Govindam.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: BHAJA GOVINDAM [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000391",
    "canonicalId": "canonical-000391",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: BHAJA GOVINDAM [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1CdfAAIL0ud9xkTAbqaT-momumj_5rDIf/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1CdfAAIL0ud9xkTAbqaT-momumj_5rDIf/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1CdfAAIL0ud9xkTAbqaT-momumj_5rDIf/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: BHAJA GOVINDAM [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000392",
    "canonicalId": "canonical-000392",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: BHAJA GOVINDAM (With Meaning) [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/bhaja-govindam_202110/Bhaja-govindam.pdf",
    "readOnlineUrl": "https://archive.org/download/bhaja-govindam_202110/Bhaja-govindam.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/bhaja-govindam_202110/Bhaja-govindam.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: BHAJA GOVINDAM (With Meaning) [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000393",
    "canonicalId": "canonical-000393",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: DRG DRUSHYA VIVEKA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/ddv_e_bk/ddv_e_bk.pdf",
    "readOnlineUrl": "https://archive.org/download/ddv_e_bk/ddv_e_bk.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/ddv_e_bk/ddv_e_bk.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: DRG DRUSHYA VIVEKA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000394",
    "canonicalId": "canonical-000394",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: DAKSHINAMURTHY STOTRAM [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/dm-sto/DM_sto.pdf",
    "readOnlineUrl": "https://archive.org/download/dm-sto/DM_sto.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/dm-sto/DM_sto.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: DAKSHINAMURTHY STOTRAM [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000395",
    "canonicalId": "canonical-000395",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: DAKSHINAMURTHY STOTRAM [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1NiutUo1udyWagLMM8nnDtMrr8W4Kg6x0/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1NiutUo1udyWagLMM8nnDtMrr8W4Kg6x0/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1NiutUo1udyWagLMM8nnDtMrr8W4Kg6x0/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: DAKSHINAMURTHY STOTRAM [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000396",
    "canonicalId": "canonical-000396",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: HASTAMALAKA STOTRAM [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/hastamalak-sto/hastamalak.pdf",
    "readOnlineUrl": "https://archive.org/download/hastamalak-sto/hastamalak.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/hastamalak-sto/hastamalak.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: HASTAMALAKA STOTRAM [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000397",
    "canonicalId": "canonical-000397",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: LAGHU VAKYA VRITTI [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/lvv_20211120/lvv.pdf",
    "readOnlineUrl": "https://archive.org/download/lvv_20211120/lvv.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/lvv_20211120/lvv.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: LAGHU VAKYA VRITTI [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000398",
    "canonicalId": "canonical-000398",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: MANISHA PANCHAKAM [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com",
    "readOnlineUrl": "https://drive.google.com",
    "mirrors": {
      "canonical": "https://drive.google.com",
      "mirror_1": "https://drive.google.com"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: MANISHA PANCHAKAM [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000399",
    "canonicalId": "canonical-000399",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: PANCHADASHI - NATAKA DEEP [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/n-deep/n-deep.pdf",
    "readOnlineUrl": "https://archive.org/download/n-deep/n-deep.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/n-deep/n-deep.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: PANCHADASHI - NATAKA DEEP [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000400",
    "canonicalId": "canonical-000400",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: PANCHADASHI - VISHAYANANDA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/panchdashi-15/panchdashi-15.pdf",
    "readOnlineUrl": "https://archive.org/download/panchdashi-15/panchdashi-15.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/panchdashi-15/panchdashi-15.pdf",
      "mirror_1": "https://archive.org/download/panchdashi-15/panchdashi-15.pdf",
      "mirror_2": "https://archive.org/download/panchdashi-15/panchdashi-15.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: PANCHADASHI - VISHAYANANDA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000401",
    "canonicalId": "canonical-000401",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: PANCHADASHI - VISHAYANANDA [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1MYb1PvuzmJD_TG8Vn-UQtdBUp1dF4p-v/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1MYb1PvuzmJD_TG8Vn-UQtdBUp1dF4p-v/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1MYb1PvuzmJD_TG8Vn-UQtdBUp1dF4p-v/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: PANCHADASHI - VISHAYANANDA [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000402",
    "canonicalId": "canonical-000402",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: SADHANA PANCHAKAM [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/sadhna5m/sadhna5m.pdf",
    "readOnlineUrl": "https://archive.org/download/sadhna5m/sadhna5m.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/sadhna5m/sadhna5m.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: SADHANA PANCHAKAM [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000403",
    "canonicalId": "canonical-000403",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: SADHANA PANCHAKAM [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1mPnIs_H99L6tuBuKK_BXmcP7HSoZk5tD/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1mPnIs_H99L6tuBuKK_BXmcP7HSoZk5tD/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1mPnIs_H99L6tuBuKK_BXmcP7HSoZk5tD/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: SADHANA PANCHAKAM [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000404",
    "canonicalId": "canonical-000404",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: TATTVA BODHA [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": null,
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/tb_20211120/tb.pdf",
    "readOnlineUrl": "https://archive.org/download/tb_20211120/tb.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/tb_20211120/tb.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: TATTVA BODHA [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000405",
    "canonicalId": "canonical-000405",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: UPADESH SARAM [ARCHIVE-ORG]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/updesh_sar/updesh_sar.pdf",
    "readOnlineUrl": "https://archive.org/download/updesh_sar/updesh_sar.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/updesh_sar/updesh_sar.pdf"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: UPADESH SARAM [ARCHIVE-ORG]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000406",
    "canonicalId": "canonical-000406",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ↓ PDF [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1i9RO7sxjgsTU2_-9xeHjE5JHsEN4t2qm/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1i9RO7sxjgsTU2_-9xeHjE5JHsEN4t2qm/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1i9RO7sxjgsTU2_-9xeHjE5JHsEN4t2qm/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ↓ PDF [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000407",
    "canonicalId": "canonical-000407",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ↓ PDF [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1HQCx-2CFjjtoqDfbPVGdailGT6Z-lXo4/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1HQCx-2CFjjtoqDfbPVGdailGT6Z-lXo4/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1HQCx-2CFjjtoqDfbPVGdailGT6Z-lXo4/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ↓ PDF [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000408",
    "canonicalId": "canonical-000408",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ↓ PDF [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/17TXhNgVpXBf7u8i_CXBSI2Q8TZZCQVpJ/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/17TXhNgVpXBf7u8i_CXBSI2Q8TZZCQVpJ/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/17TXhNgVpXBf7u8i_CXBSI2Q8TZZCQVpJ/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ↓ PDF [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000409",
    "canonicalId": "canonical-000409",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ↓ PDF [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWM2J4VEdtMlpVR1U",
    "readOnlineUrl": "https://drive.google.com/open?id=0B4gD3HGHwbZWM2J4VEdtMlpVR1U",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=0B4gD3HGHwbZWM2J4VEdtMlpVR1U"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ↓ PDF [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000410",
    "canonicalId": "canonical-000410",
    "type": "Study & Chant Texts",
    "title": "Study Text PDF: ↓ PDF [GOOGLE-DRIVE]",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1dhhv26oDJYjSCNJljAt4BL5ix97x3eP3",
    "readOnlineUrl": "https://drive.google.com/open?id=1dhhv26oDJYjSCNJljAt4BL5ix97x3eP3",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1dhhv26oDJYjSCNJljAt4BL5ix97x3eP3"
    },
    "description": "Scriptural reference and chanting text: Study Text PDF: ↓ PDF [GOOGLE-DRIVE]. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000411",
    "canonicalId": "canonical-000411",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 01 | 1 - 100 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn1-100.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn1-100.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn1-100.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 01 | 1 - 100 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000412",
    "canonicalId": "canonical-000412",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 01 | 1 - 100 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1fLW01X_ypCz7ZOnwxruHUHRWnkyd3t44",
    "readOnlineUrl": "https://drive.google.com/open?id=1fLW01X_ypCz7ZOnwxruHUHRWnkyd3t44",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1fLW01X_ypCz7ZOnwxruHUHRWnkyd3t44"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 01 | 1 - 100 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000413",
    "canonicalId": "canonical-000413",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 02 | 101 - 200 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn101-200.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn101-200.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn101-200.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 02 | 101 - 200 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000414",
    "canonicalId": "canonical-000414",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 02 | 101 - 200 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1j0V6bWiJV7iELBHI5w1TdEbITvWQSGyi",
    "readOnlineUrl": "https://drive.google.com/open?id=1j0V6bWiJV7iELBHI5w1TdEbITvWQSGyi",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1j0V6bWiJV7iELBHI5w1TdEbITvWQSGyi"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 02 | 101 - 200 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000415",
    "canonicalId": "canonical-000415",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 03 | 201 - 300 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn201-300.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn201-300.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn201-300.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 03 | 201 - 300 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000416",
    "canonicalId": "canonical-000416",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 03 | 201 - 300 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=13ABCeou0wE98IJcSkExREeDAGKXVt6hS",
    "readOnlineUrl": "https://drive.google.com/open?id=13ABCeou0wE98IJcSkExREeDAGKXVt6hS",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=13ABCeou0wE98IJcSkExREeDAGKXVt6hS"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 03 | 201 - 300 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000417",
    "canonicalId": "canonical-000417",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 04 | 301 - 400 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn301-400.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn301-400.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn301-400.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 04 | 301 - 400 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000418",
    "canonicalId": "canonical-000418",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 04 | 301 - 400 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1mvXlerZy-V_aM9BoIshMJBVMfFoJ5NUk",
    "readOnlineUrl": "https://drive.google.com/open?id=1mvXlerZy-V_aM9BoIshMJBVMfFoJ5NUk",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1mvXlerZy-V_aM9BoIshMJBVMfFoJ5NUk"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 04 | 301 - 400 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000419",
    "canonicalId": "canonical-000419",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 05 | 401 - 500 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn401-500.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn401-500.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn401-500.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 05 | 401 - 500 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000420",
    "canonicalId": "canonical-000420",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 05 | 401 - 500 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1TrbJgItANmaghkyIQsofBH5h6gImKhmV/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1TrbJgItANmaghkyIQsofBH5h6gImKhmV/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1TrbJgItANmaghkyIQsofBH5h6gImKhmV/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 05 | 401 - 500 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000421",
    "canonicalId": "canonical-000421",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 06 | 501 - 600 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn501-600.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn501-600.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn501-600.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 06 | 501 - 600 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000422",
    "canonicalId": "canonical-000422",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 06 | 501 - 600 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1MZ_vgxby63xSsSJSiTyDc-6vatIrMXU5",
    "readOnlineUrl": "https://drive.google.com/open?id=1MZ_vgxby63xSsSJSiTyDc-6vatIrMXU5",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1MZ_vgxby63xSsSJSiTyDc-6vatIrMXU5"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 06 | 501 - 600 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000423",
    "canonicalId": "canonical-000423",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 07 | 601 - 700 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn601-700.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn601-700.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn601-700.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 07 | 601 - 700 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000424",
    "canonicalId": "canonical-000424",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 07 | 601 - 700 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1K8j93wU38_9_TdNw8C7IGUj03KBHhN0K",
    "readOnlineUrl": "https://drive.google.com/open?id=1K8j93wU38_9_TdNw8C7IGUj03KBHhN0K",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1K8j93wU38_9_TdNw8C7IGUj03KBHhN0K"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 07 | 601 - 700 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000425",
    "canonicalId": "canonical-000425",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 08 | 701 - 800 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn701-800.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn701-800.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn701-800.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 08 | 701 - 800 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000426",
    "canonicalId": "canonical-000426",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 08 | 701 - 800 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1u-i2VJ0Zb6Kngdr7G0XVpQvLk6x2nUrX",
    "readOnlineUrl": "https://drive.google.com/open?id=1u-i2VJ0Zb6Kngdr7G0XVpQvLk6x2nUrX",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1u-i2VJ0Zb6Kngdr7G0XVpQvLk6x2nUrX"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 08 | 701 - 800 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000427",
    "canonicalId": "canonical-000427",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 09 | 801 - 900 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn801-900.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn801-900.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn801-900.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 09 | 801 - 900 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000428",
    "canonicalId": "canonical-000428",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 09 | 801 - 900 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/19M5AoJQLzHLj1RRI2xpwDyq5BOZFB6iD/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/19M5AoJQLzHLj1RRI2xpwDyq5BOZFB6iD/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/19M5AoJQLzHLj1RRI2xpwDyq5BOZFB6iD/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 09 | 801 - 900 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000429",
    "canonicalId": "canonical-000429",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 10 | 901 - 100 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://archive.org/download/vsn01/vsn901-1000.pdf",
    "readOnlineUrl": "https://archive.org/download/vsn01/vsn901-1000.pdf",
    "mirrors": {
      "canonical": "https://archive.org/download/vsn01/vsn901-1000.pdf"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 10 | 901 - 100 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000430",
    "canonicalId": "canonical-000430",
    "type": "Study & Chant Texts",
    "title": "Vishnu Sahasranama PDF - 10 | 901 - 100 | ↓ PDF | ↓ PDF",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/file/d/1kXoiLnRJiU4k-y1ZmMrA_KMH2Kjt-uDA/view?usp=sharing",
    "readOnlineUrl": "https://drive.google.com/file/d/1kXoiLnRJiU4k-y1ZmMrA_KMH2Kjt-uDA/view?usp=sharing",
    "mirrors": {
      "canonical": "https://drive.google.com/file/d/1kXoiLnRJiU4k-y1ZmMrA_KMH2Kjt-uDA/view?usp=sharing"
    },
    "description": "Scriptural reference and chanting text: Vishnu Sahasranama PDF - 10 | 901 - 100 | ↓ PDF | ↓ PDF. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000431",
    "canonicalId": "canonical-000431",
    "type": "Study & Chant Texts",
    "title": "Institutional Document: VPST - 80 G Certificate",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1pAreJbDJ-FMvmbcd6nCxcYMhLNNQ2_2r",
    "readOnlineUrl": "https://drive.google.com/open?id=1pAreJbDJ-FMvmbcd6nCxcYMhLNNQ2_2r",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1pAreJbDJ-FMvmbcd6nCxcYMhLNNQ2_2r"
    },
    "description": "Scriptural reference and chanting text: Institutional Document: VPST - 80 G Certificate. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000432",
    "canonicalId": "canonical-000432",
    "type": "Study & Chant Texts",
    "title": "Institutional Document: VPST - Corpus Form",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1VwdJm4B03vMZHfLFXfV7oMKAGRt3MvhF",
    "readOnlineUrl": "https://drive.google.com/open?id=1VwdJm4B03vMZHfLFXfV7oMKAGRt3MvhF",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1VwdJm4B03vMZHfLFXfV7oMKAGRt3MvhF"
    },
    "description": "Scriptural reference and chanting text: Institutional Document: VPST - Corpus Form. Preserved from the Vedanta Ashram scriptural repository."
  },
  {
    "id": "study-text-000433",
    "canonicalId": "canonical-000433",
    "type": "Study & Chant Texts",
    "title": "Institutional Document: Camp Form 2020 (16-21 Feb)",
    "author": "Adi Shankaracharya / Traditional Acharyas",
    "year": 2021,
    "coverImage": "",
    "language": "Sanskrit / Hindi",
    "downloadUrl": "https://drive.google.com/open?id=1QINbEk95tww4Yx8fyPzpxIg_ulIjMRnc",
    "readOnlineUrl": "https://drive.google.com/open?id=1QINbEk95tww4Yx8fyPzpxIg_ulIjMRnc",
    "mirrors": {
      "canonical": "https://drive.google.com/open?id=1QINbEk95tww4Yx8fyPzpxIg_ulIjMRnc"
    },
    "description": "Scriptural reference and chanting text: Institutional Document: Camp Form 2020 (16-21 Feb). Preserved from the Vedanta Ashram scriptural repository."
  }
];

export const publications: Publication[] = PUBLICATIONS;

export const availableYears: number[] = [
  2022,
  2021,
  2020,
  2019
];

export function getPublicationById(id: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.id === id || p.canonicalId === id);
}

export function getPublicationsByType(type: PublicationType): Publication[] {
  return PUBLICATIONS.filter((p) => p.type === type);
}

export function getPublicationsByYear(year: number): Publication[] {
  return PUBLICATIONS.filter((p) => p.year === year);
}
