// Data: Events — Vedanta Mission
// Unified Spiritual Programs, Camps & Historical Gyan Yagna Archive
// Traceable to Phase 3D.4 Canonical Content Reconciliation & Phase 3D.5 Controlled Migration

export interface VMEvent {
  id: string;
  slug?: string;
  canonicalId?: string;
  title: string;
  type: 'Satsang' | 'Gyana Yagna' | 'Camp' | 'Celebration' | 'Course' | 'Workshop';
  entityType?: 'event' | 'camp' | 'celebration' | 'course-announcement' | 'ongoing-class' | 'publication-release';
  teacher: string;
  location: string;
  city: string;
  startDate: string; // ISO date string
  endDate: string;
  description: string;
  schedule?: { time: string; activity: string }[];
  registration: 'open' | 'closed' | 'limited';
  fee?: string;
  isPast?: boolean;
  isArchival?: boolean;
  sourceUrl?: string;
  is_published?: boolean;
  featuredMediaUrl?: string;
  localImagePath?: string;
  imageUrl?: string;
  sourcePostId?: number;
}

export const events: VMEvent[] = [
  {
    "id": "guru-poornima-2026",
    "title": "Guru Poornima Celebrations",
    "type": "Celebration",
    "entityType": "celebration",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2026-07-10",
    "endDate": "2026-07-10",
    "description": "Join us at Vedanta Ashram for the annual Guru Poornima celebrations — a day of puja, pravachana, and collective contemplation honoring the tradition of the Guru. The program includes morning puja at the Shiv Mandir, a public discourse by Poojya Guruji, and a communal prasadam distribution.",
    "schedule": [
      {
        "time": "7:00 AM",
        "activity": "Puja at Shiv Mandir"
      },
      {
        "time": "10:00 AM",
        "activity": "Guru Poornima Discourse by Poojya Guruji"
      },
      {
        "time": "12:30 PM",
        "activity": "Prasadam & Annadanam"
      },
      {
        "time": "5:30 PM",
        "activity": "Evening Arati & Satsang"
      }
    ],
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true
  },
  {
    "id": "residential-meditation-camp-aug-2026",
    "title": "Residential Meditation & Vedanta Camp",
    "type": "Camp",
    "entityType": "camp",
    "teacher": "Swamini Amitananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2026-08-26",
    "endDate": "2026-08-29",
    "description": "A four-day residential camp exploring the practical tools of meditation and Vedantic inquiry. Participants stay at the Ashram, follow the daily routine of a dedicated seeker, and attend guided sessions on stillness, self-inquiry, and scriptural study.",
    "schedule": [
      {
        "time": "5:30 AM",
        "activity": "Morning meditation & chanting"
      },
      {
        "time": "8:00 AM",
        "activity": "Breakfast (sattwic prasadam)"
      },
      {
        "time": "9:00 AM",
        "activity": "Vedanta discourse session"
      },
      {
        "time": "11:00 AM",
        "activity": "Scripture study group"
      },
      {
        "time": "5:30 PM",
        "activity": "Evening discourse"
      },
      {
        "time": "7:30 PM",
        "activity": "Arati & quiet reflection"
      }
    ],
    "registration": "closed",
    "fee": "Contribution-based (accommodation & meals included)",
    "isPast": true
  },
  {
    "id": "online-gita-course-sep-2026",
    "title": "Bhagavad Gita Online Lesson Course — New Batch",
    "type": "Course",
    "entityType": "course-announcement",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Online (Email-based course)",
    "city": "Worldwide",
    "startDate": "2026-09-15",
    "endDate": "2027-03-15",
    "description": "A new batch of the Bhagavad Gita Online Lesson Course begins. The course covers all 18 chapters of the Bhagavad Gita in 40 structured lessons divided into 4 sessions. Each lesson includes textual study, commentary, and a questionnaire. Suitable for seekers at all levels — the first lesson is freely available to all.",
    "schedule": [],
    "registration": "open",
    "fee": "Voluntary donation (to indicate seriousness of study)",
    "isPast": false
  },
  {
    "id": "gyana-yagna-pune-2025",
    "title": "Bhagavad Gita Gyana Yagna",
    "type": "Gyana Yagna",
    "entityType": "event",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Chinmaya Mission Ashram",
    "city": "Pune",
    "startDate": "2025-12-01",
    "endDate": "2025-12-07",
    "description": "A seven-day intensive Gyana Yagna covering key chapters of the Bhagavad Gita. Public discourses were held every evening, drawing seekers from across Maharashtra.",
    "schedule": [],
    "registration": "closed",
    "isPast": true
  },
  {
    "id": "vedanta-camp-indore-jan-2026",
    "title": "Vivekachudamani Study Camp",
    "type": "Camp",
    "entityType": "camp",
    "teacher": "Swamini Samatananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2026-01-18",
    "endDate": "2026-01-22",
    "description": "A residential study camp on Adi Shankaracharya's Vivekachudamani, exploring the viveka (discrimination between real and unreal) through textual study, discussion, and quiet reflection.",
    "schedule": [],
    "registration": "closed",
    "isPast": true
  },
  {
    "id": "hist-000101-gita-janmashtami-camp-2026",
    "canonicalId": "canonical-000101",
    "title": "Gita (Janmashtami) Camp 2026",
    "type": "Camp",
    "entityType": "camp",
    "teacher": "Swamini Amitananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2026-08-30",
    "endDate": "2026-09-04",
    "description": "Vedanta Camp 2026 @ Vedanta Ashram, Indore A six days residential Janmastami (Gita) Camp is being organized at the Vedanta Ashram , Sudama Nagar, Indore. The Camp will be of five days from 30th Aug to 4th Sep 2026, and the conclusion will be with the celebration of Shri Krishna Janmastami on the 4th Sep . VEDANTA CAMP 30th Aug to 4th Sep 2026 On 4th Sep Camp Conclusion & Shri Krishna Janmastami Celebrations. Registration form Camp Acharyas The pravachans will be conducted by Poojya Guruji Swami Atmanandaji. The Meditation, Sanskrit and Chanting sessions will be by Poojya Swamini Amitanandaji & Poojya Swamini Samatanandaji, while the Puja sessions will be guided by Poojya Swamini Poornanandaji . Registration : 1. Please fill up the online Registration Form b y following the link or check out the form below. 2. All the classes are free, but the campers have to take care of the various stay & food expenses etc. The fee for all these logistics, per person, has been fixed at Rs 6500/- for nonattached bathroom rooms & Rs 9000/- for attached bathroom rooms six days stay. You can contact to given contact no. or email. Contact No. 7000361938 9329487329 Email id. vashram.in@gmail.com Subject : Pravachans on Gita Chapter – 8 (Akshar Brahma Yoga) Chanting on Bhaj Govindam All the sessions will be in Hindi. Who can apply : Any healthy, sincere devotee who can live in the simple & austere atmosphere of an Ashram, without any complaints & problems, and wish to study Vedanta at the feet of traditional teachers can apply. The campers will have to stay inside the venue for all these six days. They will be given rooms with twin sharing. There are few rooms with attached bath/Lat, while others have common bath/lat facilities. No outing during the camp is allowed, and if at all there is some emergency they will take permission of the Acharyas to go out. No outside food is permitted or encouraged. The timings of food & tea is fixed, and the menu is simple & sattwic. Filtered water is available 24×7. Campers should be ready to serve in whatever way necessary to help keep the place clean & quiet. All campers will have to attend all the classes and should be punctual to be in the class few minutes before. Campers will just have to bring their minimum necessary clothes and toiletries. Bedding will be provided by the Ashram. Venue : Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009 (MP) Camp Routine : Routine : 6.00 – Tea / Coffee 6.30 AM – Meditation 7.30 – Pooja / Abhishek 8.00 – Tea – Breakfast 8.45 – Pravachan on the ‘Gita Chapter – 8’ (by P. Guruji) 11.00 – Lunch 3.00 PM – Tea / Coffee 3.30 – Sanskrit 4.15 – Chanting 6.00 – Sankirtan 6.45 – Temple Aarti 7.30 – Dinner 8.30 – Bhajan / Que & Ans / Cultural events 10.00 – Lights off Travel Plans : The Campers will have to reach the venue latest by 29th Aug evening and can leave by 4th Sep as per their conveniences. Any change will have to be notified earlier. Map URL",
    "registration": "closed",
    "fee": "₹6,500 (standard) / ₹9,000 (attached bath) for 6 days residential stay & meals",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-janmashtami-camp-2026/",
    "slug": "gita-janmashtami-camp-2026",
    "sourcePostId": 11546,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2026/04/02.jpg",
    "localImagePath": "/images/vmission/events/legacy/02.jpg",
    "imageUrl": "/images/vmission/events/legacy/02.jpg",
    "schedule": [
      {
        "time": "06:00",
        "activity": "Morning Tea / Herbal Infusion"
      },
      {
        "time": "06:30",
        "activity": "Guided Meditation & Japa"
      },
      {
        "time": "07:30",
        "activity": "Pooja & Abhishek"
      },
      {
        "time": "08:00",
        "activity": "Breakfast & Tea"
      },
      {
        "time": "08:45",
        "activity": "Pravachan: Gita Chapter 8 (Poojya Guruji)"
      },
      {
        "time": "11:00",
        "activity": "Sattwic Ashram Lunch"
      },
      {
        "time": "15:00",
        "activity": "Afternoon Tea"
      },
      {
        "time": "15:30",
        "activity": "Sanskrit Language Session"
      },
      {
        "time": "16:15",
        "activity": "Scriptural Chanting: Bhaja Govindam"
      },
      {
        "time": "18:00",
        "activity": "Sankirtan"
      },
      {
        "time": "18:45",
        "activity": "Shiv Mandir Sandhya Aarti"
      },
      {
        "time": "19:30",
        "activity": "Sattwic Dinner"
      },
      {
        "time": "20:30",
        "activity": "Bhajan, Satsang Q&A & Cultural Gathering"
      },
      {
        "time": "22:00",
        "activity": "Lights Off / Rest"
      }
    ]
  },
  {
    "id": "hist-000102-vedanta-sravan-satra",
    "canonicalId": "canonical-000102",
    "title": "VEDANTA SRAVAN SATRA",
    "type": "Course",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2024-05-29",
    "endDate": "2024-05-29",
    "description": "Vedanta Shravana Satr by P. Guruji Swami Atmanandaji Saraswati @ Vedanta Ashram आश्रम में 'शंकरदूत प्रशिक्षण कार्यक्रम' शंकरदूत प्रशिक्षण वेदान्त आश्रम, इंदौर में दिनांक २६ मई २०२४ को 'अद्वैत क्लब', इंदौर के 'शङ्करदूत' नामक सदस्यों के लिए एक दिवसीय '...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/10410-2/"
  },
  {
    "id": "hist-000103-bal-samskar-shivir",
    "canonicalId": "canonical-000103",
    "title": "Bal Samskar Shivir",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2024-05-20",
    "endDate": "2024-05-20",
    "description": "Bal Samskar Shivir by Poojya Guruji Swami Atmanandaji (Published in Vedanta Sandesh Jan 2023) बाल संस्कार शिविर समापन कार्यक्रम अतिथिगण का स्वागत वेदान्त आश्रम, इंदौर में पिछले एक सप्ताह से चल रहे 'बाल संस्कार शिविर' का अत्यंत सुंदर और भव्य समापन दिनांक १९ मई को सायंकाल एक रंगारंग कार्यक्रम से हो गया। यह कार्यक्रम अत्यंत सन्तोषजनक रहा। कार्यक्रम पूज्य गुरूजी स्वामी आत्मानन्द जी की अध्यक्षता में संपन्न हुआ। बच्चों के अभिभावक भी अच्छी तादात में उपस्थित रहे। मुख्य अतिथि शहर के प्रसिद्ध दंतचिकित्सक डॉ सुभाष गर्ग जी थे। कार्यक्रम का सञ्चालन पू स्वामिनी अमितानन्द जी एवं पू स्वामिनी समतानन्द जी ने किया। पू गुरूजी का स्वागत पूर्ण कुम्भ से हुआ, एवं अतिथिगण का स्वागत पुष्पों से हुआ। सभी दर्शकों को टीका लगाया गया। प्रतियोगिता कार्यक्रम कार्यक्रम एक प्रतियोगिता के रूप में था। बच्चों को चार टीमों में विभाजित किया गया था। इनके नाम थे - वशिष्ठ / विस्वामित्र / वाल्मीकि / एवं, वेदव्यास। संचालकों ने बताया की प्रतियोगिता में ६ राउंड होंगे। इनमें - वैदिक मंत्र पाठ राउंड, श्लोक पाठ राउंड, भजन राउंड, प्रश्नोत्तर राउंड, डम्ब-शिराज़ राउंड, मोनो-एक्टिंग राउंड एवं खेल राउंड थे। बच्चों ने सभी राउंड में बहुत अच्छा प्रदर्शन किया। एक सप्ताह में उन्होंने अनेकों मन्त्र, श्लोक एवं भजन सीख के अपने माता-पिता को भी आश्चर्यचकित कर दिया। निश्चित रूप से अच्छे गुरु से किसी भी ज्ञान को आसानी से सीखा जा सकता है। प्रशस्ति पत्र एवं पुरस्कार बाद में सभी बच्चों को अतिथिगणों से 'प्रशश्ति पत्र एवं कुछ पुस्तकें' दिए गए। और बाद में सबने स्वल्पाहार ग्रहण कर प्रस्थान किया। अभिभावकों ने संचालकों से निवेदन किया की ऐसे कार्यक्रम सतत आयोजित करते रहे, जिससे बच्चों को ऐसे सुन्दर संस्कार सतत प्राप्त होते रहें। ॐ तत्सत् . Photo Albums Day - 1 Day - 2 Day - 3 Day - 4 Day - 5 Day - 6 Day - 7 / Shivir Samapan",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/bal-samskar-shivir/",
    "slug": "bal-samskar-shivir",
    "sourcePostId": 10429,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2024/05/bv-inaug-1.jpg",
    "localImagePath": "/images/vmission/events/legacy/bv-inaug-1.jpg",
    "imageUrl": "/images/vmission/events/legacy/bv-inaug-1.jpg"
  },
  {
    "id": "hist-000104-gita-camp-va",
    "canonicalId": "canonical-000104",
    "title": "GITA CAMP @ VA",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2023-11-27",
    "endDate": "2023-11-27",
    "description": "Vedanta Camp 2022 @ Vedanta Ashram, Indore A six days residential Vedanta Camp on ‘Drig-Drishya Viveka is being organized at the Vedanta Ashram , Sudama Nagar, Indore, before Guru Poornima this year. – from 8th to 13th July 2022. The Camp will be on the first five days. Camp inauguration will be on 8th July by early morning. The conclusion will be with the celebration of Guru Poornima on the 13th July . Campers should arrive by 7th July evening, and can plan to leave on 13th or 14th July. VEDANTA CAMP 8th To 13th July 2022 Registration form",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-camp-va/",
    "slug": "gita-camp-va",
    "sourcePostId": 10192
  },
  {
    "id": "hist-000105-gita-classes-va",
    "canonicalId": "canonical-000105",
    "title": "Gita Classes @ VA",
    "type": "Course",
    "entityType": "ongoing-class",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2023-05-03",
    "endDate": "2023-05-03",
    "description": "Gita Classes @ VA @ Vedanta Ashram, Indore वेदान्त आश्रम, इंदौर में पूज्य गुरुजी स्वामी आत्मानन्दजी द्वारा ‘श्रीमद्भगवद्गीता’ की शाङ्कर भाष्य के साथ कक्षाएं मङ्गलवार से शनिवार तक प्रति दिन प्रात: 8.30 बजे से चल रही है। इस समय गीता के दूसरे अध्याय पर चिन्तन हो रहा है। वेदान्त आश्रम, इंदौर में पूज्य स्वामिनी अमितानंदाजी द्वारा ‘श्रीमद्भगवद्गीता’ की साप्ताहिक कक्षाएं प्रति शनिवार सायं 5. 00 बजे से चल रही है। जिसमें प्रत्येक कक्षा में गीता के अध्याय के सार पर चिंतन किया जाता है।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-classes-va/",
    "slug": "gita-classes-va",
    "sourcePostId": 9998,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2023/05/Geeta-class-2023_1024x512.png",
    "localImagePath": "/images/vmission/events/legacy/Geeta-class-2023_1024x512.png",
    "imageUrl": "/images/vmission/events/legacy/Geeta-class-2023_1024x512.png"
  },
  {
    "id": "hist-000108-antifragility-sanyas",
    "canonicalId": "canonical-000108",
    "title": "Antifragility & Sanyas",
    "type": "Course",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2023-03-06",
    "endDate": "2023-03-06",
    "description": "Antifragility &amp; Sanyas by Poojya Guruji Swami Atmanandaji (Published in Vedanta Sandesh Jan 2023) Antifragility &amp; Sanyas The Antifragility Concept Antifragility is a concept introduced by Nassim Nicholas Taleb in his book, “Antifragile: Thing...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/antifragility-sanyas/"
  },
  {
    "id": "hist-000109-vedanta-camp-2022",
    "canonicalId": "canonical-000109",
    "title": "Vedanta Camp 2022",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2022-07-07",
    "endDate": "2022-07-12",
    "description": "Vedanta Camp 2022 @ Vedanta Ashram, Indore A six days residential Vedanta Camp on ‘Drig-Drishya Viveka is being organized at the Vedanta Ashram , Sudama Nagar, Indore, before Guru Poornima this year. – from 8th to 13th July 2022. The Camp will be on the first five days. Camp inauguration will be on 8th July by early morning. The conclusion will be with the celebration of Guru Poornima on the 13th July . Campers should arrive by 7th July evening, and can plan to leave on 13th or 14th July. VEDANTA CAMP 8th To 13th July 2022 Registration form",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/8508-2/",
    "slug": "8508-2",
    "sourcePostId": 8508,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2022/05/GuruPurnima-2022a.jpg",
    "localImagePath": "/images/vmission/events/legacy/GuruPurnima-2022a.jpg",
    "imageUrl": "/images/vmission/events/legacy/GuruPurnima-2022a.jpg"
  },
  {
    "id": "hist-000110-ashram-parivar-yojna",
    "canonicalId": "canonical-000110",
    "title": "ASHRAM_PARIVAR YOJNA",
    "type": "Satsang",
    "teacher": "Swamini Amitananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2021-01-15",
    "endDate": "2021-01-15",
    "description": "ASHRAM PARIVAR YOJNA स्वामी आत्मानन्दजी सरस्वती वेदान्त आश्रम परिवार वेदान्त आश्रम के 25 वर्ष वेदान्त आश्रम, इन्दौर की स्थापना की रजत जयंती पर आप सभी भक्तों एवं शिष्यों को शुभाशीष देते हैं कि उनके ही सहयोग से देश-विदेश के अनेकों जिज्ञासु लोग अद्वैत व...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/ashram-parivar-yojna/"
  },
  {
    "id": "hist-000111-sampoorna-gita-gyana-mahayagna",
    "canonicalId": "canonical-000111",
    "title": "SAMPOORNA GITA GYANA MAHAYAGNA",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-12-28",
    "endDate": "2020-12-28",
    "description": "DEC 2020 गीता महायज्ञ (Online) स्वामी आत्मानन्दजी सरस्वती GITA VIDEO PRAVACHAN PLAY LIST GITA PDF (Slokas with Meaning) ~ 21 दिनों के इस सम्पूर्ण भगवद-गीता के महायज्ञ का शुभारम्भ २५ दिसम्बर को गीता जयंती के दिन से हुआ। प्रतिदिन सायं काल ७ बजे यूट्यूब...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/sampoorna-gita-gyana-mahayagna/"
  },
  {
    "id": "hist-000112-sampoorna-kathopanishad-gyana-yagna",
    "canonicalId": "canonical-000112",
    "title": "SAMPOORNA KATHOPANISHAD GYANA YAGNA",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-09-12",
    "endDate": "2020-09-12",
    "description": "SEPT 2020 सम्पूर्ण कठोपनिषद ज्ञान यज्ञ (Online) स्वामी आत्मानन्दजी सरस्वती KATHOPANISHAD PLAY LIST KATHOPANISHAD CHANTING ~ ४६ दिनों के इस आगामी ज्ञान यज्ञ का शुभारम्भ १ सितम्बर से हुआ। प्रतिदिन सायं काल ७ बजे यूट्यूब पर इसका प्रवचन प्रकाशित किया जा ...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/kathopanishad-gyana-yagna/"
  },
  {
    "id": "hist-000113-shiva-mahimna-stotram",
    "canonicalId": "canonical-000113",
    "title": "Shiva-Mahimna Stotram",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-08-20",
    "endDate": "2020-08-20",
    "description": "SHIVA_MAHIMNA STOTRAM (Online Satsang) : JULy 2020 SHIV MAHIMNA STOTRAM SWAMI ATMTNANDAJI SARASWATI शिव महिम्नः स्तोत्र यज्ञ गुरु पूर्णिमा के अगले दिन से सावन का पवित्र महीना प्रारम्भ हुआ। पूज्य गुरूजी ने ६ जुलाई, सावन के प्रथम दिन से आरम्भ कर के जन्...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/shiva-mahimna-stotram/"
  },
  {
    "id": "hist-000114-hanuman-chalisa",
    "canonicalId": "canonical-000114",
    "title": "Hanuman Chalisa",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-05-08",
    "endDate": "2020-05-08",
    "description": "HANUMAN CHALISA (Online Satsang) : VA Channel Videos Hanuman Chalisa MAY 2020 Corona के प्रकोप से जहां चारों ओर Lockdown के चलते सत्संग प्रेमी इसे भगवान की कृपा देख रहे हैं और उसका पूरा लाभ उठा रहे हैं. ऐसे में पूज्य गुरुजी की कृपा से आधुनिक संसाधन क...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/hanumaan-chalisa/"
  },
  {
    "id": "hist-000115-bhaja-govindam",
    "canonicalId": "canonical-000115",
    "title": "Bhaja Govindam",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-04-03",
    "endDate": "2020-04-03",
    "description": "Bhaja Govindam (Online Satsang) : VA Channel Videos Vedanta Mission Talks on Bhaja Govindam by Pujya Guruji Swami Atmanandaji Saraswati, Vedanta Ashram, Indore. We have started this series of pravachans during the Corona Lockdown in the country (Mar ...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/bg/"
  },
  {
    "id": "hist-000116-janmastami-vedanta-camp-2020",
    "canonicalId": "canonical-000116",
    "title": "Janmastami Vedanta Camp 2020",
    "type": "Camp",
    "teacher": "Swamini Amitananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-08-06",
    "endDate": "2020-08-11",
    "description": "Vedanta Camp 2020 @ Vedanta Ashram, Indore A six days residential Janmastami (Vedanta) Camp is being organized at the Vedanta Ashram , Sudama Nagar, Indore. The Camp will be of five days from 6th to 12th Aug 2020, and the conclusion will be with the celebration of Shri Krishna Janmastami on the 12th Aug . VEDANTA CAMP 6th to 12th Aug 2020 On 12th Aug Camp Conclusion & Shri Krishna Janmastami Celebrations. Registration form Camp Acharyas The pravachans will be conducted by Poojya Guruji Swami Atmanandaji and Poojya Swamini Amitanandaji. The Meditation and Chanting sessions will be by Poojya Swamini Samatanandaji, while the Puja sessions will be guided by Poojya Swamini Poornanandaji . Registration : 1. Please fill up the online Registration Form b y following the link or check out the form below. 2. All the classes are free, but the campers have to take care of the various stay & food expenses etc. The fee for all these logistics, per person, has been fixed at Rs 5000/- for the six days stay. You can deposit this amount by going to our Donate Page and choosing any convenient mode of payment. Note: Pl inform us by email about the mode & other details of the donation at vmission@gmail.com Subject : Pravachans on Adwait Makarand / Gita Chapter – 14 (Guna Traya Vibhag Yoga) Chanting on Gita Chapter – 14 All the sessions will be in Hindi. Who can apply : Any healthy, sincere devotee who can live in the simple & austere atmosphere of an Ashram, without any complaints & problems, and wish to study Vedanta at the feet of traditional teachers can apply. The campers will have to stay inside the venue for all these six days. They will be given rooms with twin sharing. There are few rooms with attached bath/Lat, while others have common bath/lat facilities. No outing during the camp is allowed, and if at all there is some emergency they will take permission of the Acharyas to go out. No outside food is permitted or encouraged. The timings of food & tea is fixed, and the menu is simple & sattwic. Filtered water is available 24×7. Campers should be ready to serve in whatever way necessary to help keep the place clean & quiet. All campers will have to attend all the classes and should be punctual to be in the class few minutes before. Campers will just have to bring their minimum necessary clothes and toiletries. Bedding will be provided by the Ashram. Venue : Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009 (MP) Camp Routine : Routine : 6.00 AM – Meditation 6.45 – Pooja / Abhishek (by Sw. Poornanandaji) 7.00 – Tea 7.30 – Pravachan on the ‘Adwait Makarand’ (by P. Guruji) 9.30 – Pravachans on the ‘ Adwait Makarand ’ (by P. Guruji) 11.30 – Lunch 3.00 PM – Tea 3.30 – Chanting on ‘ Gita Chapter – 14 ‘ (by Sw. Samatanandaji) 5.00 – Pravachan on ‘ Gita Chapter – 14 (by Sw. Amitanandaji) 6.30 – Temple Aarti 7.30 – Dinner 8.30 – Bhajan / Que & Ans / Cultural events 10.00 – Lights off Travel Plans : The Campers will have to reach the venue latest by 5th Aug evening and can leave by 13th Aug as per their conveniences. Any change will have to be notified earlier. Map URL",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/janmastami-vedanta-camp-2020/",
    "slug": "janmastami-vedanta-camp-2020",
    "sourcePostId": 5104,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/03/camp-20-2.png",
    "localImagePath": "/images/vmission/events/legacy/camp-20-2.png",
    "imageUrl": "/images/vmission/events/legacy/camp-20-2.png"
  },
  {
    "id": "hist-000117-gita-gyana-yagna-lucknow",
    "canonicalId": "canonical-000117",
    "title": "Gita Gyana Yagna, Lucknow",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Lucknow",
    "city": "Lucknow",
    "startDate": "2020-03-02",
    "endDate": "2020-03-09",
    "description": "गीता ज्ञान यज्ञ, लखनऊ प्रवचन का विषय वेदान्त मिशन, लखनऊ द्वारा दि. २ से ९ मार्च तक पू. गुरूजी स्वामी आत्मानंदजी के गीता ज्ञान यज्ञ का आयोजन लखनऊ के लालबाग में स्थित हरि ॐ मंदिर में किया गया। इस यज्ञ में पूज्य गुरूजी ने सायं के सत्र में गीता के ११ वें अध्याय 'विश्वरूप दर्शन योग' पर तथा प्रात: के सत्र में मुण्डकोपनिषद के दूसरे मुण्डक के दूसरे खण्ड पर प्रवचन कियें । पूज्य गुरूजी ने प्रतिदिन प्रात: ६. ३० बजे से चिनहट में स्थित गीत-माधव फार्म में योगाभ्यासी युवा वर्ग के लिए अष्टांग योग साधना पर विशेष प्रवचन कियें। इस कार्यक्रम में युवावर्ग ने उत्साहपूर्वक भाग लिया। गीता अध्याय - 11 मुण्डकोपनिषद् - 3/1 अष्टाङ्ग योग समापन कार्यक्रम हरि ॐ मंदिर के द्वारा वेदांत मिशन द्वारा आयोजित प्रत्येक ज्ञान यज्ञ के अंतिम दिन विशेष भंडारे का आयोजन किया जाता है। इस यज्ञ के अंतिम दिन भी दि. ९ मार्च को प्रवचन के पश्चात् भंडारे का आयोजन किया गया। यज्ञ के सुबह के सत्र का समापन होली के दिन हुआ। होली के उपलक्ष में सभी भक्तों ने पूज्य गुरूजी के ऊपर पुष्पों की वर्षा करके पुष्प होली खेली तथा पूज्य गुरूजी से होली के आशीर्वाद प्राप्त कियें। \"निमित्तमात्रं भव\" पूज्य गुरूजी ने गीता के १० वें अध्याय के अन्त में जो बताया कि यह समस्त जगत हमारे एक ही अंश में स्थित है। इसे सूत्र की तरह लेकर ११वें अध्याय की भूमिका बनाई। भगवन को किसी एक रूप में सिमित नहीं देखना चाहिए किन्तु सम्पूर्ण जगत ईश्वर रूप ही है। भगवान ने अर्जुन को देशकाल को संकुचित करके यह दिखाया कि समस्त जगत उनमें ही समाया हुआ है। अपने ही अंदर जगत के उत्पत्ति, स्थिति तथा प्रलय तीनों को दिखा दिया। जो ईश्वर का ईश्वरत्व इस प्रकार से देख पाता है, वह जगत में सुंदरता देख पाता है। समस्त जगत को ईश्वरत्व से युक्त देखना ही विश्वरूप दर्शन है। भगवन के द्वारा अपने विकराल, सौम्य अदि विविध रूपों को दिखाने पर अर्जुन और भी शरणागति को प्राप्त हुआ। शरणागत अर्जुन को भगवन ने एक विशेष उपदेश दिया कि 'निमित्तमात्रं भव सव्यसाचिन'। \"हे अर्जुन! तुम हमारे निमित्त बनकर अपने धर्म का पालन करों।\" \"पश्य मे योगमैश्वरम्\"",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-lucknow-2/",
    "slug": "gita-gyana-yagna-lucknow-2",
    "sourcePostId": 5095,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/03/10_640x480.png",
    "localImagePath": "/images/vmission/events/legacy/10_640x480.png",
    "imageUrl": "/images/vmission/events/legacy/10_640x480.png"
  },
  {
    "id": "hist-000118-sundarkand-monthly-satsang",
    "canonicalId": "canonical-000118",
    "title": "Sundarkand Monthly Satsang",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-02-23",
    "endDate": "2020-02-23",
    "description": "23 Feb 2020 सुन्दरे सुन्दरी सीता, सुन्दरे सुन्दरी कथा। सुन्दरे सुन्दरी वार्ता, सुन्दरे किं न सुन्दरम् ।। सुन्दरकाण्ड मासिक सत्संग वेदांत आश्रम में दिनांक २३ फरवरी २०२० से पूज्य गुरूजी स्वामी आत्मानंदजी द्वारा सुंदरकांड के मासिक प्रवचनों का शुभारम्भ हुए। पहले प्रवचन में सुंदरकांड के नाम की महिमा और विषय की चर्चा हुई। उसके बाद पहले श्लोक का अर्थ का चिंतन हुआ। अंत में सबने आरती कर प्रसाद ग्रहण किया। सुन्दरे किं न सुन्दरम् पूज्य गुरूजी ने सुन्दरकाण्ड नाम की महिमा बताई। अन्य समस्त अध्यायों की तरह इस अध्याय का नाम न तो किसी अवस्था का सूचक है और ना ही किसी स्थान को द्योतित करता है। इस नाम महिमा को महर्षि वाल्मीकिजी से आरम्भ करे अन्य समस्त रामायण ग्रन्थ के रचयिताओं ने स्वीकार किया हैं। इसी अध्याय में हनुमानजी का सुन्दर चरित्र सामने आता है। हनुमानजी को अपने दिव्य सामर्थ्यों का ज्ञान इसी काण्ड के आरम्भ में महा ज्ञानी जाम्बवंतजी के द्वारा कराया जाता है। हनुमानजी की समुद्र के इस पार सुन्दर भूधर से तलाश की यात्रा आरम्भ होती है, जिसका पर्यवसान सुन्दरतम शांति स्वरूपिणी सीताजी के दर्शन में होता है। हनुमानजी की यह यात्रा एक अध्यात्म यात्रा के सामान है, इसमें उन्हें वे सभी विघ्न प्राप्त होते है, जो एक अध्यात्म यात्रा के दौरान संभावना होती है। इसलिए अध्यात्म साधक के लिए विदेश प्रेरणादायी सिद्ध होती है। इसके अलावा भक्त विभीषणजी की शरणागति का प्रसंग प्राप्त होता है, तथा प्रभु के विशेष गुण शरणागत वत्सलता का भी द्योतन होता है। इन अनेकों कारणों से ये कहना कोई अतिशयोक्ति नहीं होगी कि सुंदरे किं न सुन्दरं। प्रवचन का आरम्भ प्रवचन का आरम्भ में दास बगीची भजन मंडली के सुन्दर भजनों की प्रस्तुति, हनुमान चालीसा का पाठ तथा राम नाम संकीर्तन किया गया। उसके उपरांत पूज्य गुरूजी का प्रवचन तथा अंत में हनुमानजी की आरती और प्रसाद वितरण हुआ। यही क्रम प्रति माह के अंतिम रविवार के सत्संग में अनुसरण किया जाएगा। इसके साथ ही पूज्य गुरूजी ने आगे के मासिक सत्संग की तारीख २९ मार्च की घोषणा की। सुन्दरकाण्ड के पाठ की महिमा तो अत्यंत प्रचलित है, किन्तु उसके गहन अर्थ को जानने पर उसकी और भी महिमा समज में अति है। सुन्दरे सुन्दरी कथा Sundarkand pravachan Photo Album",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/sundarkand-monthly-satsang/",
    "slug": "sundarkand-monthly-satsang",
    "sourcePostId": 5037,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/02/10_640x427.png",
    "localImagePath": "/images/vmission/events/legacy/10_640x427.png",
    "imageUrl": "/images/vmission/events/legacy/10_640x427.png"
  },
  {
    "id": "hist-000119-vedanta-camp-indore",
    "canonicalId": "canonical-000119",
    "title": "Vedanta Camp, Indore",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-02-16",
    "endDate": "2020-02-21",
    "description": "२२ फरवरी २०२० वेदांत शिविर वेदांत आश्रम, इंदौर में दि. १६ से २१ फरवरी तक एक वेदांत शिविर का आयोजन किया गया। इस 'शिविर हेतु लख़नऊ, मुंबई तथा अन्य शहरों से शिविरार्थियों ने भाग लिया। सभी शिविरार्थियों का १५ फरवरी की शाम तक आगमन हुआ। शिविर कै विषय ईशावास्य उपनिषद्, गीता कै ७ वे अध्याय पर प्रवचन तथा शिव अपराध क्षमापन स्तोत्र का पाठ रहा। इसके आलावा प्रतिदिन प्रातः ध्यान तथा श्री गंगेश्वर महादेव का अभिषेक कराया जाता था। शिविर का शुभारम्भ १६ फरवरी के प्रातः ६ बजे से ध्यान की कक्षा से हुआ। दिन का आरम्भ स्वामिनी समतानंदजी द्वारा ध्यान की कक्षा से होता था। इसमें पू. स्वामिनीजी ने ईशावास्य उपनिषद् पर आधारित ध्यान करना सिखाया। ध्यान विषयक मार्गदर्शन प्राप्त कर सभी आत्मविश्वास और धन्यता से युक्त हुए। इसके आलावा पू. स्वामिनीजी ने शिवपाराध क्षमापन स्तोत्र की chanting करनी सिखाई। इस सत्र में सब शिविरार्थी बालवत होकर पाठ करता था। इससे संस्कृत श्लोकों का स्पष्टता से उच्चारण करना सिखाया गया। इस वजह से संस्कृत पढ़ने और समझने का भय समाप्त होता हुआ दिखा। उसके पश्चात् स्वामिनी पूर्णानन्दजी द्वारा श्री गंगेश्वर महादेव का अभिषेक कराया जाता था। पू. स्वामिनीजी ने पूजा का महत्व, विधि तथा उसके पीछे भावना का समावेश को सुंदररूप से बताया। तत्पश्चात पूज्य गुरूजी द्वारा ईशावास्य उपनिषद् पर दो कक्षाएँ होती थी। ईशावास्योपनिषद शुक्ल यजुर्वेदीय है। इस उपनिषद् में एक holistic approach दिखाई देता है। उपनिषद् का प्रारम्भ सब कुछ ईश्वर के द्वारा ही व्याप्त है - इस सुंदर वेदान्तिक तथ्य के प्रतिपादन से होता है। मुक्ति तो ज्ञान से ही होती है, किन्तु ज्ञान का प्रसाद तो तब ही प्राप्त हो सकता है जब मन की पात्रता हो। उसके लिए ज्ञान में प्रवेश के पूर्व कर्म उपासना का समुच्चय परम अवश्य है। अत: कर्म और उपासना के रहस्यों का प्रतिपादन किया गया है। और अंततः मृत्यु के समय की बहुत ही दिव्य हृदयस्पर्शी प्रार्थना और दृष्टि प्रदान की गई। इसे श्रवण करके प्रत्येक शिविरार्थी लाभान्वित हुआ। Ishavasya Upanishad Pravachans सायं के सत्र में पू. स्वामिनी अमितानंदजी के द्वारा गीता के सातवें अध्याय ज्ञान विज्ञान योग पर प्रवचन किये गए। ज्ञान अर्थात बौद्धिक समज तथा विज्ञान अर्थात इस समज को हृदयान्वित करते हुए इस ज्ञान को अपना बनाना। ज्ञान से विज्ञान की यात्रा में व्यवधान अपने बारे में, दृश्य जगत के बारे में मोह का होना है। अतः उसके रहस्य का ज्ञान तथा स्वरुप को समजने के लिए भगवान ने अपनी परा और अपरा प्रकृति का परिचय दिया कि इन्हीं प्रकृति के माध्यम से इस जड़ - चेतन जगत रचना करते हैं। हम ही उन सब को अनेकों मणियों में के सूत्र की तरह व्याप्त करते हैं। इस विज्ञानं की सिद्धि के लिए मोह के स्वरुप को बता कर उससे मुक्ति का तरीका भगवान ने बताया। सायं श्री गंगेश्वर महादेव की आरती के पश्चात् रात्रि भोजन होता था। दिन का समापन सुन्दर भजन प्रस्तुति, स्तोत्रपाठ तथा प्रश्नोत्तर के कार्यक्रम से होता था। प्रत्येक शिविरार्थी सभी कार्यक्रमों में बहुत उत्साह के साथ सम्मिलित होता था। २१ फरवरी को महाशिवरात्रि के दिन प्रातः समापन का कार्यक्रम रहा। इसमें प्रत्येक शिविरार्थी ने धन्यता के साथ अपने शिविर के अनुभवों को प्रस्तुत कियें। अंत में व्यास पीठ की पूजा के साथ गुरु दक्षिणा का कार्यक्रम संपन्न हुआ। महाशिवरात्रि पर्व महाशिवरात्रि का दिन स्वामिनी अमितानंदजी और स्वामिनी पूर्णानन्दजी के संन्यासदीक्षा का दिन होता है। अतः प्रथम पूजा तथा अभिषेक उनके द्वारा किया गया। शिविर समापन तथा गुरुदक्षिणा के कार्यक्रम के उपरांत अन्य पहरों की श्री गंगेश्वर महादेव की पूजा तथा रुद्राभिषेक शिविरार्थियों द्वारा सामूहिक रूप से की गई। गंगेश्वर महादेव की सुन्दर झाँकी सजाई गई। महादेवजी के दर्शन हेतु देर रात तक भक्तों का ताँता बना रहा। कई साधकों ने पूरी रात जगकर जप और ध्यान की साधना की। धन्यता और भक्तिसभर वातावरण में २२ फरवरी को शिविरार्थियों ने प्रस्थान किया।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/vedanta-camp-indore/",
    "slug": "vedanta-camp-indore",
    "sourcePostId": 4930,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/02/02-02_600x400_320x213.png",
    "localImagePath": "/images/vmission/events/legacy/02-02_600x400_320x213.png",
    "imageUrl": "/images/vmission/events/legacy/02-02_600x400_320x213.png"
  },
  {
    "id": "hist-000120-love-nature",
    "canonicalId": "canonical-000120",
    "title": "Love Nature",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-02-10",
    "endDate": "2020-02-10",
    "description": "10 Feb 2020 LOVE NATURE Avian Vibhooti's God - The Creator God is the creator of the world, and the best way to appreciate the nature, knowledge &amp; capacities of God is by looking at his creation. It is by looking at effect alone that one can get ...",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/love-nature/"
  },
  {
    "id": "hist-000121-maha-shivratri-vedanta-camp-feb-2020",
    "canonicalId": "canonical-000121",
    "title": "Maha Shivratri Vedanta Camp – Feb 2020",
    "type": "Camp",
    "teacher": "Swamini Amitananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-02-16",
    "endDate": "2020-02-21",
    "description": "Mahashivratri vedanta camp VEDANTA CAMP 16th to 21st Feb 2020 On 21st Feb Camp Conclusion & Mahashvratri Celebrations. Registration form A six days residential MAhashivratri (Vedanta) Camp is being organized @ the Vedanta Ashram, Sudama Nagar, Indore. The Camp will be of five days from 16th to 20th Feb 2020, & the conclusion will be with the celebration of Mahashivratri on the 21st Feb. VENUE Vedanta Ashram, E/2948, Sudama Nagar, Indore-452009 (MP) LOCATION ON GOOGLE MAP SUBJECT ISHAVASYOPANISHAD (Pravachans) GITA Ch – 7 Gyan Vigyan Yoga (Pravachans) MAHISHASURMARDINI STOTRAM (Chanting) ALL PRAVACHANS WILL BE IN HINDI PUJYA GURUJI SWAMI ATMANANDA SARASWATIJI CAMP ACHARYA : Pravachans on ISHAVASYA UPANISHAD will be conducted by PUJYA GURUJI (Swami Atmananda Saraswatiji) camp acharyas Swamini Amitananda Pravachans on GITA Ch – 7 (GYAN VIGYAN YOGA) Swamini Samatananda Dhyan & Chanting on MAHISHASURMARDINI STOTRAM Swamini Poornananda Guidence on ABHISHEK & POOJA WHO CAN APPLY A ny healthy, sincere devotee who can live in the simple & austere atmosphere of an Ashram, without any complaints & problems, and wish to study Vedanta at the feet of traditional teachers can apply. The campers will have to stay inside the venue for all these six days. They will be given rooms with twin sharing. There are few rooms with attached bath/Lat, while others have common bath/lat facilities. No outing during the camp is allowed, and if at all there is some emergency they will take permission of the Acharyas to go out. No outside food is permitted or encouraged. The timings of food & tea is fixed, and the menu is simple & sattwic. Filtered water is available 24×7. Campers should be ready to serve in whatever way necessary to help keep the place clean & quiet. All campers will have to attend all the classes and should be punctual to be in the class few minutes before. Campers will just have to bring their minimum necessary clothes and toiletries. Bedding will be provided by the Ashram. TRAVEL PLANS The Campers will have to reach the venue latest by 15th FEB evening and can leave by 22nd FEB as per their conveniences. Any change will have to be notified earlier. REGISTRATION 1. Please fill up the online Registration Form by following the link or check out the form below. 2. All the classes are free, but the campers have to take care of the various stay & food expenses etc. The fee for all these logistics, per person, has been fixed at Rs 5000/- for the six days stay. You can deposit this amount by going to our Donate Page and choosing any convenient mode of payment. Note: Pl inform us by email about the mode & other details of the donation at vmission@gmail.com CAMP ROUTINE 6.00 AM – Meditation 6.30 – Tea 6.35 – Pooja / Abhishek 7.00 – Pravachan (Upanishad) 8.30 – Breakfast 9.30 – Pravachan (Upanishad) 11.30 – Lunch 4.00 PM – Tea 4.30 – Chanting 5.00 – Pravachan (Gita) 6.30 – Temple Aarti 7.30 – Dinner 8.30 – Bhajan / Que & Ans 10.00 – Lights off",
    "registration": "closed",
    "fee": "₹5,000 for 6 days residential stay, food & logistics",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/maha-shivratri-vedanta-camp-feb-2020/",
    "slug": "maha-shivratri-vedanta-camp-feb-2020",
    "sourcePostId": 2983,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/ash-linga.jpg",
    "localImagePath": "/images/vmission/events/legacy/ash-linga.jpg",
    "imageUrl": "/images/vmission/events/legacy/ash-linga.jpg",
    "schedule": [
      {
        "time": "06:00",
        "activity": "Guided Meditation"
      },
      {
        "time": "06:45",
        "activity": "Shiva Abhishek & Pooja (Swamini Poornanandaji)"
      },
      {
        "time": "07:00",
        "activity": "Morning Tea"
      },
      {
        "time": "07:30",
        "activity": "Pravachan: Ishavasya Upanishad Session 1 (Poojya Guruji)"
      },
      {
        "time": "09:30",
        "activity": "Pravachan: Ishavasya Upanishad Session 2 (Poojya Guruji)"
      },
      {
        "time": "11:30",
        "activity": "Ashram Lunch"
      },
      {
        "time": "15:00",
        "activity": "Afternoon Tea"
      },
      {
        "time": "15:30",
        "activity": "Chanting: Mahishasuramardini Stotram (Swamini Samatanandaji)"
      },
      {
        "time": "17:00",
        "activity": "Pravachan: Gita Chapter 7 (Swamini Amitanandaji)"
      },
      {
        "time": "18:30",
        "activity": "Temple Sandhya Aarti"
      },
      {
        "time": "19:30",
        "activity": "Dinner"
      },
      {
        "time": "20:30",
        "activity": "Bhajan, Satsang Q&A & Cultural Gathering"
      },
      {
        "time": "22:00",
        "activity": "Rest & Lights Off"
      }
    ]
  },
  {
    "id": "hist-000122-sundarkand-path-indore",
    "canonicalId": "canonical-000122",
    "title": "Sundarkand Path, Indore",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2020-01-19",
    "endDate": "2020-01-19",
    "description": "19 Jan 2020 : After the completion of Monthly Hanuman Chalisa Satsangs, now in its place monthly Satsang on Sunderkand is being started - on the last Sunday of every month. Today on 19th Jan, the beginning was made with the Akhand Path of Sunderkand - by the Daas Bagichi Ramayan Mandal. The first Sunderkand Satsang is on 23rd Feb. ॐ तत्सत्",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/sundarkand-path-indore/",
    "slug": "sundarkand-path-indore",
    "sourcePostId": 4841,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/01/15_284x189.png",
    "localImagePath": "/images/vmission/events/legacy/15_284x189.png",
    "imageUrl": "/images/vmission/events/legacy/15_284x189.png"
  },
  {
    "id": "hist-000123-gita-gyan-yagna-lucknow",
    "canonicalId": "canonical-000123",
    "title": "Gita Gyan Yagna, Lucknow",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Lucknow",
    "city": "Lucknow",
    "startDate": "2020-01-20",
    "endDate": "2020-01-20",
    "description": "6th to 13th Jan वेदांत मिशन, लखनऊ के द्वारा 6 से 13 जनवर तक लखनऊ के 'हरि ॐ मंदिर' में पूज्य स्वामिनी समतानंदजी का गीता ज्ञान यज्ञ आयोजित हुआ। इस ज्ञान यज्ञ में पूज्य स्वामिनीजी ने सायंकालीन सत्र में गीताजी के 5वें अध्याय पर और प्रातःकालीन सत्र में दृग दृश्य विवेक पर प्रवचन किये। P. Guruji Swami Atmananda Saraswatiji 'कर्म संन्यास योग' नामक गीताजी के पाँचवे अध्याय में भगवान श्री कृष्ण इस रहस्य को उद्घाटित करते हैं कि यद्यपि संन्यस्त होकर मुक्त हो जाना मनुष्य का परम लक्ष्य है लेकिन कर्म योग को जीवन में पूरी समग्रता से धारण करने से ही संन्यास का मार्ग प्रशस्त होता है। 'दृग दृश्य विवेक' वेदान्त के इस सुंदर प्रकरण ग्रंथ में दृष्टा और दृश्य का विवेक कराके अपने ब्रह्म स्वरूप में जगने तक की पूरी यात्रा और प्रक्रिया बताते हैं। अत्यंत तीव्र शीत लहर के बावजूद अनेकों भक्तों ने अपने घर के cozy वातावरण से बाहर निकलकर इन दोनों विषयों का लाभ लिया। ज्ञान यज्ञ का समापन हरि ॐ मंदिर द्वारा आयोजित भंडारे से हुआ।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyan-yagna-lucknow/",
    "slug": "gita-gyan-yagna-lucknow",
    "sourcePostId": 4824,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/01/05_284x213.png",
    "localImagePath": "/images/vmission/events/legacy/05_284x213.png",
    "imageUrl": "/images/vmission/events/legacy/05_284x213.png"
  },
  {
    "id": "hist-000124-gita-gyana-yagna-vadodara",
    "canonicalId": "canonical-000124",
    "title": "Gita Gyana Yagna, Vadodara",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-12-18",
    "endDate": "2019-12-24",
    "description": "5th to 11th Jan वड़ोदरा के सुभानपुर विस्तार में स्थित आत्मा-ज्योति आश्रम में पू. स्वामिनी अमितानंदजी के गीता ज्ञान यज्ञ का आयोजन दि. ५ से ११ जनवरी तक किया गया। इस यज्ञ में पू. स्वामिनीजी ने सायं के सत्र में गीता के १० वें अध्याय विभूति योग पर तथा प्रात: के सत्र में कठोपनिषद के दूसरे अध्याय की तीसरी वल्ली पर प्रवचन किएं। पूर्व ६ सत्रों से चल रहे इस उपनिषद् का इसके साथ ही समापन हुआ। P. Guruji Swami Atmananda Saraswatiji यज्ञ का श्रीगणेश आत्म-ज्योति आश्रम के ट्रस्टी श्री नारायण भाई तथा सु श्री इंदिरा बेन शाह के द्वारा दीप प्रज्ज्वलन तथा व्यासपीठ की पूजा से हुआ। यज्ञ के एक दिन पूज्य स्वामिनीजी ने आत्म-ज्योति आश्रम द्वारा संचालित योगासन की कक्षा के ८० साधकों के लिए प्रवचन किया। इस सत्र में पूज्य स्वामिनीजी ने अष्टांग योग का परिचय प्रदान कर के उसके महत्वपूर्ण अंग 'ईश्वर प्रणिधान' सूत्र पर चर्चा की। गीता के १० वे अध्याय में भगवान ने अपनी सुन्दर विभूतियों का वर्णन करते हुए व्यक्त को देखकर अव्यक्त की awareness, जगत को देखते हुए जगदीश्वर की महिमा की awarness जगाने का सन्देश दिया। कठोपनिषद में यमराज ने नचिकेता को मृत्यु का रहस्य बताते हुए जन्म मृत्यु से परे स्थित परमात्मा को अपनी अंतरात्मा की तरह reveal किया। Gita Chapter - 10 Kathopanishad 2-3",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-vadodara/",
    "slug": "gita-gyana-yagna-vadodara",
    "sourcePostId": 4791,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/01/12_284x213.png",
    "localImagePath": "/images/vmission/events/legacy/12_284x213.png",
    "imageUrl": "/images/vmission/events/legacy/12_284x213.png"
  },
  {
    "id": "hist-000125-8th-anand-lahari-2019",
    "canonicalId": "canonical-000125",
    "title": "8th Anand-Lahari : 2019",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-12-22",
    "endDate": "2019-12-22",
    "description": "ANAND-LAHARI 29th Dec 2019 ANAND-LAHARI Anand-Lahari is a Musical Fest Program organized by Indian Cultural Foundation to raise funds for its charitable work of propagating the message of Vedanta. This was the eighth edition of Anand-Lahari. This year the program was organized on 29th Dec evening from 7.00 PM onwards at the Balgandharwa Rang Mandir at Bandra. It is a nice auditorium. The program began with the compering by Lata Subraidu. She welcomed everyone and then invited Manasi Kulkarni to chant invocation shlokas of Ganeshji. Later began the first show of the evening. It was a dance show called Bhater-Bhitar which was based on the teachings of Sant Kabir Dasji. This was presented by Samyukta Wagh and her group. Then the Managing Trustee of the ICF, Sh Avinash Datta briefly told the audience about the activities of ICF and then requested the Founder-Chairman of ICF Swami Atmanandaji to bless the audience and participants. Poojya Guruji in his bried address introduced the Trustees of ICF and called them on the stage one by one. He also talked about the ageless message of Vedanta and showed how it percolates the fabric of this country. In the second half was a musical program by Shruti Viswanath. This was also a lovely session.",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/anand-lahari/",
    "slug": "anand-lahari",
    "sourcePostId": 4739,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/01/IMG_8207_284x213.jpg",
    "localImagePath": "/images/vmission/events/legacy/IMG_8207_284x213.jpg",
    "imageUrl": "/images/vmission/events/legacy/IMG_8207_284x213.jpg"
  },
  {
    "id": "hist-000126-gita-gyana-yagna-mumbai",
    "canonicalId": "canonical-000126",
    "title": "Gita Gyana Yagna, Mumbai",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Mumbai",
    "city": "Mumbai",
    "startDate": "2020-01-02",
    "endDate": "2020-01-02",
    "description": "22nd to 28th Dec The winter GITA GYANA YAGNA of Poojya Guruji Sri Swami Atmanandaji at Mumbai was organized at Vivekananda Auditorium, inside the Ramakrishna Campus in Khar (W), Mumbai, from 22nd Dec to 28th Dec. The subject matter of the discourse series were Gita Chapter-2 and Mandukya Upanishad, Adwaita Prakarana (Chapter 3 of Karika). P. Guruji Swami Atmananda Saraswatiji The 2nd Chapter of Bhagwad Gita is called the Sankhya Yoga and has 72 shlokas. It starts with the despondent Arjuna who because of his indecisiveness and the consequent suffocating grief was completely broken and could not fight. The chapter ends with Arjuna regaining his composure and was asking question about who a perfect person is - the so called Sthita Pragnya. So the 2nd chapter reveals the complete journey from ignorance to knowledge. Bhagwan started after Arjuna specifically requested for knowledge. He said I am your shishya, please enlighten me. The Guru first told him that the truly wise never grief, and all grief is a product of our Moha - baseless conclusions. He starts by telling him that the real truth of me, you and everyone else is imperishable life principle, which transcends this body-mind complex. Those who know this never grieve. Even if we do not know that the self is avinashi yet we should never grieve because that which is born has to die and that which dies is born again. He also reveals another angle of baselessness of grief. The swadharma angle and the Art of Positive Karma - Karma Yoga. All this made Arjuna interested and the chapter ends with the description of the man of knowledge. It is an awesome chapter, and was dealt also in an awesome way. Adwaita Prakarana deals with revealing how non-duality alone is real and how to wake to that state. Gita Chapter - 2 Mandukya Karika -2",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-mumbai-2/",
    "slug": "gita-gyana-yagna-mumbai-2",
    "sourcePostId": 4713,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2020/01/IMG_7735_284x213.jpg",
    "localImagePath": "/images/vmission/events/legacy/IMG_7735_284x213.jpg",
    "imageUrl": "/images/vmission/events/legacy/IMG_7735_284x213.jpg"
  },
  {
    "id": "hist-000127-hanuman-chalisa-samapan-p-guruji-s-birthday",
    "canonicalId": "canonical-000127",
    "title": "Hanuman Chalisa Samapan & P. Guruji's Birthday",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-12-15",
    "endDate": "2019-12-15",
    "description": "१५ दिसंबर 2019 : ६ वर्ष से अनवरत रूप से चल रहे हनुमान चालीसा ज्ञान यज्ञ का अंतिम प्रवचन दि. १५ दिसंबर २०१९ को वेदांत आश्रम, इंदौर में सायंकाल ६.३० बजे से प्रारम्भ हुआ। इस अनुष्ठान में माह के अंतिम रविवार को हनुमान चालीसा की एक चौपाई पर विस्तृत चिंतन होता था. कुल मिलकर चालीसा पर ७३ प्रवचन हुए। ये समस्त प्रवचन वेबसाइट पर सभी के लिए उपलब्ध हैं। हर बार की तरह सर्व प्रथम दास बगीची रामायण मंडली द्वारा सुन्दर भजन प्रस्तुत करे गए, और फिर सबने हनुमान चालीसा का सामूहिक पाठ किया। तदुपरांत पूज्य गुरूजी श्री स्वामी आत्मानंद जी द्वारा प्रवचन ३९वीं से प्रारम्भ होकर अंतिम दोहे तक चला। अंतमें हनुमानजी की आरती और प्रसाद वितरण हुआ। पूज्य गुरूजी के जन्मदिन के उपलक्ष्य में स्वल्पाहार का आयोजन किया गया था। सब भक्तों ने धन्यता से प्रसाद ग्रहण किया। Audio Pravachans Photo Album ॐ तत्सत्",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/hanuman-chalisa-gyan-yagna-samapan/",
    "slug": "hanuman-chalisa-gyan-yagna-samapan",
    "sourcePostId": 4223,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/12/05_600x400.png",
    "localImagePath": "/images/vmission/events/legacy/05_600x400.png",
    "imageUrl": "/images/vmission/events/legacy/05_600x400.png"
  },
  {
    "id": "hist-000128-gita-gyan-yagna-mumbai-anand-lahari",
    "canonicalId": "canonical-000128",
    "title": "Gita Gyan Yagna, Mumbai & Anand-Lahari",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Mumbai",
    "city": "Mumbai",
    "startDate": "2019-12-16",
    "endDate": "2019-12-22",
    "description": "गीता ज्ञान यज्ञ पूज्य गुरूजी स्वामी आत्मानंदजी वेदांत मिशन, मुंबई द्वारा पूज्य गुरूजी स्वामी आत्मानंदजी के ७ दिवसीय गीता ज्ञान यज्ञ का आरम्भ २२ दिसम्बर को सायं 6.45 बजे से खार में स्थित रामकृष्ण मिशन के विवेकानंद ऑडिटोरियम में हो रहा है। इस यज्ञ में पूज्य गुरूजी सायं के सत्र में गीता के दूसरे अध्याय सांख्य योग पर तथा प्रात: के सत्र में माण्डूक्य उपनिषद् के दूसरे \"अद्वैत\" प्रकरण पर प्रवचन करेंगे। गीता का यह अध्याय सम्पूर्ण गीता के साररूप है। तथा माण्डूक्य उपनिषद् के इस प्रकरण में जगत के यथार्थ को बहुत सुन्दर और सटीक रूप से बताया गया है। इन दोनों प्रवचनों की श्रृंखला का अवश्य श्रवण लाभ लें। इसमें प्रवेश निःशुल्क है। P. Guruji Swami Atmananda Saraswatiji आनंदलहरी by : Indian Cultural Foundation इंडियन कल्चरल फाउंडेशन के द्वारा प्रति वर्ष की तरह इस वर्ष भी भारतीय संस्कृति और अध्यात्म ज्ञान के संगम रूप गीता ज्ञान यज्ञ के पश्चात् २९ दिसम्बर को \"आनंदलहरी\" सांस्कृतिक कार्यक्रम आयोजित किया गया है। इसका प्रयोजन भारतीय संस्कृति और कला से लोगों को अवगत कराना है, साथ ही इसके माध्यम से एकत्रित फण्ड से अध्यात्म ज्ञान का प्रचार करना है। आपकी उपस्थिति इस महान, उमदा कार्य में एक पवित्र आहुति सिद्ध होगा। समस्त कलाप्रेमियों को तथा जो भी इस उम्दा कार्य हेतु अपना योगदान देना चाहता है, उन सब का इस कार्यक्रम में स्वागत हैं। इस हेतु शीघ्रातिशीघ्र पास को प्राप्त करने हेतु मिशन के कार्यालय में संपर्क करें। 022 26464111 / 9820027141",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/anandlahari/",
    "slug": "anandlahari",
    "sourcePostId": 4094,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/12/ggymum-19-scaled.jpg",
    "localImagePath": "/images/vmission/events/legacy/ggymum-19-scaled.jpg",
    "imageUrl": "/images/vmission/events/legacy/ggymum-19-scaled.jpg"
  },
  {
    "id": "hist-000129-gita-jayanti-gita-bhawan",
    "canonicalId": "canonical-000129",
    "title": "Gita Jayanti @ Gita Bhawan",
    "type": "Celebration",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-12-08",
    "endDate": "2019-12-08",
    "description": "GITA JAYANTI @ GITA BHAWAN यज्ञ दान तप: कर्म पावनानि मनीषिणाम्।। इंदौर में स्थित गीता भवन में 62 वा गीता जयंती महोत्सव मनाया गया। इस समारोह में 7 नवंबर को पूज्य गुरुजी के प्रवचन का आयोजन हुआ। पूज्य गुरुजी ने प्रवचन में यज्ञ दान तप की महिमा बताते हुए कहा कि हर मनुष्य के हृदय में भगवान विरजामन है तथा हर मनुष्य एक बांसुरी की तरह है। किन्तु मन की मलिनता की वजह से भगवान का मधुर संगीत इस बांसुरी से निसृत नही हो पाता है। इसलिए मन को निर्मल करने के लिए साधना करनी पड़ती है | इसके लिए भगवान स्वयं गीता के १८ वे अध्याय में बताते हैं कि यज्ञ दान तप: कर्म पावनानि मनीषिणाम्।अर्थात् यज्ञ दान और तप – ये तीनों मनुष्य को पवित्र करते हैं। भगवान बताते हैं कि हर कार्य को यज्ञ बनाया जा सकता है। हर कार्य को यज्ञ बनाया जा सकता है, यहाँतक कि युध्द को भी यज्ञ बनाया जा सकता है। यज्ञभाव क्या होता है? जैसे हवन में अग्निरूपसे परमात्मा का आवाहन करके उनके प्रति वो अर्पित करते हैं, जो उन्हें प्रसन्न करता है। वैसे ही जहाँ हम भगवान की खुशी के लिए कार्य करते है, उन पर भरोसा रख कर वो कार्य करे, जो उन्हें प्रसन्न करें। हमारे हर कार्य स्वकेन्द्रित व अपनी कोई चिंता से नही किन्तु अन्य की खुशी के लिए हो तो वही यज्ञ बन जाता है। यज्ञभाव में पूर्ण रूपसे निष्काम होते है। मन में चिंता होना अपने अंदर अपेक्षा का सूचक है, यही मन की मलिनता है। तप स्वयं को भोगवृत्ति से अलग करते है। कोई न कोई व्रत लेना ही तपस्या होती है। यज्ञ दान और तप ही मन को निर्मल करता है, तब हृदय से मुरली का मधुर संगीत निकलता है। हम भी ऐसे ही एक बाँसुरी बन जाये, वही कल्याणकारी है। Click here for Photo Album",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-jayanti-gita-bhawan/",
    "slug": "gita-jayanti-gita-bhawan",
    "sourcePostId": 3860,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/12/07_600x400.png",
    "localImagePath": "/images/vmission/events/legacy/07_600x400.png",
    "imageUrl": "/images/vmission/events/legacy/07_600x400.png"
  },
  {
    "id": "hist-000130-gita-jayanti-futi-kothi",
    "canonicalId": "canonical-000130",
    "title": "Gita Jayanti - Futi Kothi",
    "type": "Celebration",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-12-08",
    "endDate": "2019-12-08",
    "description": "GITA JAYANTI @ AGRASEN DHAM 6th Nov 2019 ।। यतो धर्म: ततो जय:।। ६ दिसम्बर से इंदौर के पश्चिम क्षेत्र में स्थित अग्रसेन धाम (फूटी कोठी) में एक सप्ताह का २२ वां गीता जयंती समारोह का शुभारम्भ हुआ। कार्यक्रम की शुरुआत पूज्य गुरूजी स्वामी आत्मानन्द सरस्वतीजी ने, स्वामिनी अमितानंदजी तथा वहाँ के ट्रस्टीगणों ने दीप प्रज्ज्वलन से किया। उसके बाद पूज्य गुरजी का स्वागत तथा व्यास पीठ की पूजा की गई। पूज्य गुरूजी के प्रवचन से इस समारोह की प्रवचन श्रृंखला का आरम्भ हुआ। पूज्य गुरूजी ने बताया की महाभारत के युद्ध के पूर्व जहाँ अर्जुनके सामने जब दो विकल्प आएं कि एक और नारायणी सेना और दूसरी और स्वयं नारायण थे। अर्जुनने नि:शस्त्र होते हुए भी नारायण को ही चुना और उनके हाथ में अपने रथकी लगाम सौंप दी। यह अत्यंत महत्वपूर्ण निर्णय सिद्ध हुआ। अर्जुनरथ का यह चित्र हमारे ही जीवनका प्रतीक है। हमारा जीवन एक यात्रा है, जिसमें शरीर एक रथ है और हम उनके स्वामी। इस रथ के इन्द्रियाँ रूपी घोडें है तथा सारथि हमारी बुद्धि है। जिस रथ का सारथि विवेकी होता है, उसका रथ कभी भी नहीं भटकता है। यदि अपने हृदय में इस चित्र को बिठा ले, और अपने रथ की लगाम पूरी शरणागति के साथ भगवान के हाथों में सौंप दें, तो जीवन में अवश्य कल्याण होता है। इस चित्र को हृदय में बिठाने का तात्पर्य भगवान द्वारा दिए हुए विवेकसे युक्त होकर जीवन जीना। यही धर्म है, और जहां धर्म होता है वहां निश्चित रूपसे विजय होती है। अंत में पूज्य गुरुजीने इस समारोह के समस्त आयोजकों को तथा समस्त भक्तों को आगे के सफल कार्यक्रम के लिए शुभाशीष प्रदान कियें। Click here for Album",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-jayanti-futi-kothi/",
    "slug": "gita-jayanti-futi-kothi",
    "sourcePostId": 3797,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/12/22_600x451.png",
    "localImagePath": "/images/vmission/events/legacy/22_600x451.png",
    "imageUrl": "/images/vmission/events/legacy/22_600x451.png"
  },
  {
    "id": "hist-000131-visit-to-victoria-nature-park-bhavnagar",
    "canonicalId": "canonical-000131",
    "title": "Visit to Victoria Nature Park @ Bhavnagar",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-11-25",
    "endDate": "2019-11-25",
    "description": "VICTORIA NATURE PARK BHAVNAGAR ABOUT : Bhavnagar is a lovely costal town of Gujarat, and has a flourishing business of Diamond Polishing and Ship-Breaking. The people are devoted and nice. One of the awesome things about the city is that it has a 200 acres of dense forest in the center of the city. It has well-protected areas for wild animals and obviously there are lots of tree birds. People take pride in this awesome heritage and protect it fiercely from builder lobb y. This park is under the control of Forest Department, who open it for just some limited time for morning walkers. It is a creation of the erstwhile rulers of the Bhavnagar state. We wish such a forest patch, a green-lung, is present in all cities. We also saw various water birds in & around the city. Sharing few pics of this awesome – Victoria Nature Park. Thanks & Blessings to our host Sh Ketanbhai Dasadia who took us for a walk to this lovely Park on 25th Nov morning.",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/visit-to-victoria-nature-park-bhavnagar/",
    "slug": "visit-to-victoria-nature-park-bhavnagar",
    "sourcePostId": 3552,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/12/01_600x450.png",
    "localImagePath": "/images/vmission/events/legacy/01_600x450.png",
    "imageUrl": "/images/vmission/events/legacy/01_600x450.png"
  },
  {
    "id": "hist-000132-vibhooti-darshan-yatra",
    "canonicalId": "canonical-000132",
    "title": "Vibhooti Darshan Yatra",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-11-30",
    "endDate": "2019-11-30",
    "description": "Vibhooti Darshan Yatra यो देव: खगरूपेण द्रुतं उड्डयते दिवि। नमस्तस्मै नमस्तस्मै नमस्तस्मै नमो नम: ।। जो आकाश में तेज गति से पक्षी रूपसे उड़ान भरता है, उन परमात्मा को हमारा बारम्बार नमस्कार है। श्री सौम्यकाशीश स्तोत्र – स्वामी श्री तपोवन महाराज २३ और २४ नवंबर को पूज्य गुरूजी स्वामी श्री आत्मानंद सरस्वतीजी के साथ आश्रम के अन्य महात्मागण तथा गुजरात के कुछ भक्तगणने थोल सरोवर, नल सरोवर तथा भावनगर की यात्रा की। इस यात्रा के दौरान थोल सरोवर तथा भावनगर के मध्य में और आसपास विविध प्रकार के प्रादेशिक तथा सैलानी पक्षियों का दर्शन किया गया। इसके अंतर्गत PAINTED STORK, POCHARD, KNOB BILLED DUCK, RUDDY SHELDUCKS, FLAMINGOS, PELICANS, RED-NAPED IBIS, NORTHERN SHOVELER आदि विशेष आकर्षण के केन्द्र रहें। यात्रा के पीछे महत्वपूर्ण दृष्टि को समजते हुए इस यात्रा का नाम विभूति दर्शन यात्रा नाम दिया। यह नाम अत्यंत सार्थक है, ईश्वरभक्ति की महिमा तो सभी शास्त्र बताते हैं , किन्तु ईश्वर की महिमा उनकी सुन्दर सृष्टि रूपा कलाकृति से ही ज्ञात होती है। यह अद्भुत सृष्टि और उसमें भी सुन्दर कलरव करते हुए रंगबिरंगी पक्षी विशेष आकर्षण के केंद्र बनते हैं। गीता के १०वें अध्याय विभूति योग में भी भगवान ने अपने कलात्मक सृजन में विराजमान सुन्दर विभूति का प्रतिपादन किया। सम्पूर्ण सृष्टि हमारी ही विभूति हैं, किन्तु जो भी विषय तुम्हारा ध्यान अपनी और बलपूर्वक आकृष्ट करें, उसे तुम अपने भोग की दृष्टि से नहीं, किन्तु हमारी ही विभूति जानों। यदि अपनी समस्त चिंताएँ, राग-द्वेष थोड़ी देरके लिए किनारे करके देखें, तो यह सृष्टि ही मंदिर बन जाती है, प्रत्येक वस्तु परमात्मा की ही याद दिलाता है। इस दृष्टि से यदि इस जगत को देखा जाएं तो ईश्वर की महिमा और भक्ति से अछूते रहा ही नहीं जा सकता है। जीवन की व्यस्तता में मनुष्य उसे देखनेमें असमर्थ होता है। इसलिए उसके लिए समय निकाल कर अपने ही आस पास विराजमान पक्षी, पुष्प, समस्त प्रकृति को देखना चाहिए। इस यात्रा साथ में गए सभी भक्तों के लिए एक नई दृ ष्टि उत्पन्न करनेवाली और विस्मयकारी रही। यह कोई पिकनिक मात्र नहीं होते हुआ अध्यात्म साधना का एक महत्वपूर्ण पड़ाव रहा।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/birding-gujrat/",
    "slug": "birding-gujrat",
    "sourcePostId": 3356,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/aDSCN4985_800x600_240x180.png",
    "localImagePath": "/images/vmission/events/legacy/aDSCN4985_800x600_240x180.png",
    "imageUrl": "/images/vmission/events/legacy/aDSCN4985_800x600_240x180.png"
  },
  {
    "id": "hist-000133-satsang-bhavanagar",
    "canonicalId": "canonical-000133",
    "title": "Satsang @ Bhavanagar",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-11-24",
    "endDate": "2019-11-24",
    "description": "Satsang @ Bhavnagar 24 नवम्बर को पूज्य गुरूजी स्वामी श्री आत्मानंद सरस्वतीजी, आश्रम के महात्मा गण तथा अहमदाबाद के कुछ भक्तों के साथ भावनगर की यात्रा की। भावनगरके श्री केतन भाई दसाडिया ने इस यात्राका प्रबंध किया। उनके पिताजी श्री बाबूभाई की विशेष इच्छा रही थी कि परिवार के सभी सदस्य पूज्य गुरुजीके साथ जुड़कर उनसे प्रेरणा एवं आशीर्वाद प्राप्त करें। श्री केतनभाई के विशेष निवेदन पर पूज्य गुरुजीके भावनगर यात्राके लिए स्वीकृति देने पर पूरे परिवार में हर्षोल्लास का वातावरण देखने को मिला। २4 नवम्बर को उनके निवास “श्री रेसीडेन्सी” पर एक सत्संग का आयोजन किया गया। पूज्य गुरुजी ने बताया कि वास्तविक शिक्षा व ह होती है जिससे हमारे जीवन के संताप दूर हो सके और हम अत्यंत प्रेरित, उत्साही, प्रेममय जीवन जी सके। जीवन में उतर चढ़ाव आना तो अवश्यम्भावी है, उसे चुनौति की तरह लेते हुए उत्साह से जीना चाहिए। किन्तु मन में कुछ ऐसी ग ठा न होती है, जिससे जीवन में उलझते हुए हतोत्साहित हो जाते है। उसे निपटने के लिए भगवान गीता में बताते हैं की प्रत्येक व्यक्ति के जीवन में यज्ञ, दान और तप इन तीनों का समावेश होना चाहिए। यज्ञ एक कर्म करने की एक स्पिरिट होती है, जिसे किसी भी कार्य में समावेश किया जा सकता है। साँस लेनेसे लेकर युद्ध तक में समावेश किया जा सकता है। पूजा, जप, कर्म अदि सबको यज्ञभाव से करना चाहिए। जैसे पूजा या हवन को किसी देवता की ख़ुशी के लिए करते है। वैसे ही सभी कर्म अपने स्वार्थ को किनारे कर के भगवन की ख़ुशी के लिए करते है। यज्ञ कोई कर्म नहीं है, किन्तु यज्ञ उस साधना को बोलते है जिससे अपने स्वार्थ और स्वकेन्द्रित से कर्म करने से मुक्ति मिलती है। अपने बारे में निश्चिन्त होकर कर्म करने से अपने अंदर की उलजनों से मुक्त होते जाते है। स्वार्थ से मुक्ति और अपनेपन के विस्तार के लिए दान का भी अत्यंत महत्त्व होता है। दान से संकुचिता से बहार आते है। जीवन में हम अनेको आदतों के वशीभूत होकर जीते हैं , उससे पराधीन होते जाते है। तप उस साधना का नाम है जो हमें अपनी आदतों के सिकंजे से मुक्ति दिलाती है। इतना ही नहीं, तपस्या हमारी संकल्प शक्ति को दृढ़ करके अपने निर्धारित किए हुए लक्ष्य की और बढ़ने के लिए उत्साहित करता है। जीवन को उत्साही, प्रेममय, जीवंतता से युक्त करने के लिए यज्ञ, दान और तप इन तीनों का समावेश अनिवार्य हैं। इससे न केवल जीवन सुखी और सफल होता है, किन्तु मनुष्य जीवन के धर्म से लेकर मोक्ष तक के सभी पुरुषार्थ की सिद्धि हेतु सक्षम बनते जातें है। सत्संग के आरम्भ में श्री रूपाबेन ने दीप प्रज्वलन किया तथा श्री केयूर भाई, श्रीमति हर्षिता तथा उनकी माताजी श्रीमति हंसाबेन ने पूज्य गुरूजी को माल्यार्पण एवं आरती करके स्वागत किया। रूपाबेन तथा हंसाबेन में सुन्दर गुज रा ती भजन प्रस्तुत किया। केयूरभाई की सुपुत्री न्यासा ने सुन्दर कत्थक प्रस्तुत करते हुए कार्यक्रम के शुभारम्भ को और भी जिवंत कर दिया। तत्पश्चात पूज्य गुरूजी ने प्रवचन में “यज्ञ, दान और तप” का जीवन में महत्त्व बताया। पूरे परिवार ने तथा सत्संग में पधारे हुए भक्तों ने प्रेम व श्रद्धापूर्वक श्रवणपान किया तथा अन्त में प्रसाद वितरण किया गया। पूज्य गुरूजी के आशीर्वाद से समस्त परिवार धन्य हुआ।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/satsang-bhavanagar/",
    "slug": "satsang-bhavanagar",
    "sourcePostId": 3349,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/05-1.jpg",
    "localImagePath": "/images/vmission/events/legacy/05-1.jpg",
    "imageUrl": "/images/vmission/events/legacy/05-1.jpg"
  },
  {
    "id": "hist-000134-visit-to-statue-of-unity",
    "canonicalId": "canonical-000134",
    "title": "Visit to Statue of Unity",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-11-23",
    "endDate": "2019-11-23",
    "description": "Statue of Unity एकता का स्मारक : २३ नवंबर को पूज्य गुरूजी ने आश्रमके महात्मागण तथा गुजरात के कुछ भक्तों के साथ विश्व की सबसे ऊँची प्रतिमा स्टेचू ऑफ़ यूनिटी की मुलाकात की। १८२ मीटर ऊँची यह प्रतिमा नर्मदा जिलेमें सरदार सरोवर बांधके पास विद्यमान है। यह भारत के सपूत, लोह पुरुष के नाम से जाने जाते , भारत के प्रथम उप प्रधानमन्त्री तथा प्रथम गृहमन्त्री श्री सरदार वल्लभभाई पटेल को समर्पित स्मारक है। इस मूर्ति को बनाने के लिये लोहा पूरे भारत के गाँव में रहने वाले किसानों से खेती के काम में आने वाले पुराने और बेकार हो चुके औजारों का संग्रह करके जुटाया गया। सरदार वल्लभभाई पटेल की यह प्रतिमा देश को एकसूत्र में बांधने का सूचक है। भारत देश में पूर्व से पश्चिम तथा उत्तर से दक्षिण विविधता और भिन्नता प्रतीत होते हुए भी एक ऐसा सूत्र है, जो की पुरे देशको एक सूत्र में बंधे रहता है। यह देखकर विदेशी लोग भी आश्चर्य करते हैं। भारत देश सतही धरातल पर विविधता के बावजूद अखंडता का सन्देश देनेवाले वेदशास्त्रो का उद्गमस्थान रहा है। यही जीवनदर्शन भारत वर्ष के ऋषि-मुनियों की अपूर्वता है। यदि समाज में, देशभर में, तथा विश्वभर में शांति की स्थापना करनी हो तो इस एकता और अखंडता के ज्ञान की उपेक्षा नहीं की जा सकती है। यदि हम स्वयं एकता के सूत्र को देखेंगे तब ही विश्व भर में अखंडता और शांति की स्थापना के लिए निमित्त बन पाएंगे। प्रधान मंत्री श्री नरेन्द्रभाई मोदी भी इस सन्देश के प्रति श्रद्धा रखते हैं। देश को एकता के सूत्र में बांधने हेतु इस स्मारक को श्री मोदीजी के द्वारा एक सुंदर पहल और प्रयास की तरह देखा जाना चाहिए। यह स्मारक न केवल अपने लिए गर्व का विषय , किन्तु अखंडता और एकता के सन्देश का सूचक भी है। ऐसा सुन्दर कार्य निश्चित रूपसे सराहनीय है।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/visit-to-statue-of-unity/",
    "slug": "visit-to-statue-of-unity",
    "sourcePostId": 3253,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/13_800x600.png",
    "localImagePath": "/images/vmission/events/legacy/13_800x600.png",
    "imageUrl": "/images/vmission/events/legacy/13_800x600.png"
  },
  {
    "id": "hist-000135-gita-gyana-yagna-ahmedabad",
    "canonicalId": "canonical-000135",
    "title": "Gita Gyana Yagna, Ahmedabad",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Ahmedabad",
    "city": "Ahmedabad",
    "startDate": "2019-11-17",
    "endDate": "2019-11-23",
    "description": "गीता ज्ञान यज्ञ, अहमदाबाद - नवंबर २०१९ अहमदाबाद के मणिनगर विस्तार में स्थित रामकृष्ण सेवा केंद्र में पू. स्वामिनी अमितानंदजी के गीता ज्ञान यज्ञ का आयोजन किया गया। इस यज्ञ में पू. स्वामिनीजी ने सायं के सत्र में गीता के १५ वें अध्याय पुरुषोत्तम योग पर तथा प्रात: के सत्र में पंचदशी के नाटकदीप प्रकरण पर प्रवचन किएं। यज्ञ का श्रीगणेश रामकृष्ण सेवा समिति के ट्रस्टी श्री अशोकभाई शाह तथा योगाचार्य सु. श्री. हेतलबेन मोदी के द्वारा दीप प्रज्ज्वलन तथा व्यासपीठ की पूजा से हुआ। यज्ञ के एक दिन पूज्य स्वामिनीजी ने रामकृष्ण सेवा समिति द्वारा संचालित योगासन की कक्षा में योग और समग्र जीवन विषय पर चर्चा की। इसके अलावा गर्भवती महिलाओं के लिए भी बच्चें को अच्छे संस्कारों का सिंचन हेतु Pre Natal Education का महत्व बताया।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-ahmedabad-2/",
    "slug": "gita-gyana-yagna-ahmedabad-2",
    "sourcePostId": 3135,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/ggy-ab2.jpg",
    "localImagePath": "/images/vmission/events/legacy/ggy-ab2.jpg",
    "imageUrl": "/images/vmission/events/legacy/ggy-ab2.jpg"
  },
  {
    "id": "hist-000136-gita-gyana-yagna-ahmedabad",
    "canonicalId": "canonical-000136",
    "title": "Gita Gyana Yagna, Ahmedabad",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Ahmedabad",
    "city": "Ahmedabad",
    "startDate": "2019-11-28",
    "endDate": "2019-11-28",
    "description": "ગીતા જ્ઞાન યજ્ઞ, અમદાવાદ યજ્ઞસ્થાન : અમદાવાદ નાં મણિનગર વિસ્તાર માં સ્થિત રામકૃષ્ણ સેવા સમિતિ માં પૂજ્ય સ્વામીની અમિતાનંદજી નાં સાત દિવસીય ગીતા જ્ઞાન યજ્ઞ નું આયોજન તારીખ 16 થી 21 નવેમ્બર 2019 સુધી કરવા માં આવ્યું. આ યજ્ઞ ની પ્રવચન શૃંખલા માં પૂજ્ય સ્વામિનીજી એ સવાર નાં સત્ર માં વિદ્યારણ્ય મુનિ દ્વારા રચિત પંચદશી નાં નાટકદીપ પ્રકરણ ઉપર તથા સાંજ નાં સત્ર માં ભગવદ્દ ગીતા નાં અધ્યાય 15, પુરુષોત્તમ યોગ પર પ્રવચન કર્યું. વિષય વિવરણ : નાટકદીપ પ્રકરણમાં નાટકશાળાનાં મંચ પરનાં દીપકનાં દૃષ્ટાન્તથી સાક્ષીનું સ્વરૂપ સુંદર રીતે સમજાવ્યું છે. ગીતાનાં પંદરમાં અધ્યાય પુરુષોત્તમ યોગમાં ભગવાને સંસારને એક ઊંધા વૃક્ષ સાથે સરખામણી કરી ને સંપૂર્ણ સંસારની યાત્રા ને તથા એમાંથી મુક્તિ નાં ઉપાયરૂપે ક્ષર – અક્ષરનો વિવેક પ્રદાન કરીને, ક્ષર-અક્ષર પુરુષથી પરે પુરુષોત્તમને જગતનાં અધિષ્ઠાનરૂપે બતાવ્યું છે. પંદરમાં અધ્યાય ને સંપૂર્ણ શાસ્ત્ર ની સંજ્ઞા આપવા માં આવી છે. યજ્ઞનાં શ્રીગણેશ : યજ્ઞનાં શ્રીગણેશ રામકૃષ્ણ સેવા સમિતિનાં ટ્રસ્ટી શ્રી અશોકભાઈ શાહે અને યોગાચાર્યા સુ શ્રી હેતલબેન મોદી દ્વારા દીપ પ્રગટાવી ને તથા વ્યાસપીઠ ની પૂજા કરીને કરવા માં આવ્યું. હેતલબેન દ્વારા સંચાલિત યોગવર્ગનાં સદસ્યોં ને પૂ. સ્વામિનીજી એ યોગ અને સમગ્ર જીવન વિષય પર પોતાનું ઉદ્બોધન આપ્યું. તે સિવાય ગર્ભવતી મહિલાઓ ને પણ ગર્ભધારણ સમયે બાળક ને કેવીરીતે સંસ્કારિત કરવાં , તેનાં પર માર્ગદર્શન આપ્યું.",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-ahmedabad/",
    "slug": "gita-gyana-yagna-ahmedabad",
    "sourcePostId": 3094,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/ggy-ab1.jpg",
    "localImagePath": "/images/vmission/events/legacy/ggy-ab1.jpg",
    "imageUrl": "/images/vmission/events/legacy/ggy-ab1.jpg"
  },
  {
    "id": "hist-000137-camp-conclusion",
    "canonicalId": "canonical-000137",
    "title": "Camp Conclusion :",
    "type": "Camp",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-11-15",
    "endDate": "2019-11-15",
    "description": "CAMP @ VEDANTA ASHRAM 24th Aug was the day of Sri Krishna Janmashtami and also the last day of the VEDANTA CAMP at Vedanta Ashram, Indore. The day started as usual with the Meditation session and after Aarti and a cup of tea was the first session of the pravachan on Upadesha Saram by Poojya Guruji Swami Atmanandaji. A second session also followed after a short tea break. Lunch was Phalahari but sumptuous & filling. Fasting was a break from normal cereals and salts. After some rest and tea was the concluding Dakshina Session of the camp in which the campers get an opportunity to share their experiences of the camp. It was very satisfying to see that everyone had a very comfortable and enlightening stay at the Ashram. All of them were overwhelmed and gratified by the knowledge and warmth of hospitality and look forward to more such sessions. Photos Talks",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/camp-conclusion/",
    "slug": "camp-conclusion",
    "sourcePostId": 2926,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/hcs-9.jpg",
    "localImagePath": "/images/vmission/events/legacy/hcs-9.jpg",
    "imageUrl": "/images/vmission/events/legacy/hcs-9.jpg"
  },
  {
    "id": "hist-000138-hanumaan-chalisa-satsang",
    "canonicalId": "canonical-000138",
    "title": "हनुमान चालीसा सत्संग :",
    "type": "Satsang",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Ashram, Sudama Nagar",
    "city": "Indore",
    "startDate": "2019-10-20",
    "endDate": "2019-10-20",
    "description": "अक्टूबर २०१९ हनुमान चालीसा का इस माह का सत्संग दिनांक २०/१० को वेदांत आश्रम, इंदौर में सायंकाल ६.३० बजे से प्रारम्भ हुआ। इसमें सर्व प्रथम रामायण मंडली द्वारा सुन्दर भजन प्रस्तुत करे गए, और फिर सबने हनुमान चालीसा का सामूहिक पाठ किया। तदुपरांत पूज्य गुरूजी श्री स्वामी आत्मानंद जी द्वारा ३५ वीं और ३६ वी चौपाइयों पर प्रवचन हुए। अंत में सबने हनुमानजी की आरती करी और प्रसाद वितरण हुआ। Talk Photo Album",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/hanumaan-chalisa-satsang/",
    "slug": "hanumaan-chalisa-satsang",
    "sourcePostId": 2729,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/11/hcs_0718-14.jpg",
    "localImagePath": "/images/vmission/events/legacy/hcs_0718-14.jpg",
    "imageUrl": "/images/vmission/events/legacy/hcs_0718-14.jpg"
  },
  {
    "id": "hist-000139-gita-gyana-yagna-lucknow",
    "canonicalId": "canonical-000139",
    "title": "Gita Gyana Yagna, Lucknow :",
    "type": "Gyana Yagna",
    "teacher": "Swami Atmananda Saraswati",
    "location": "Vedanta Satsang Kendra, Lucknow",
    "city": "Lucknow",
    "startDate": "2019-10-18",
    "endDate": "2019-10-24",
    "description": "गीता ज्ञान यज्ञ, लखनऊ वेदान्त मिशन, लखनऊ द्वारा पू. स्वामिनी अमितानंदजी के गीता ज्ञान यज्ञ का आयोजन लखनऊ के लालबाग में स्थित हरि ॐ मंदिर में किया गया। इस यज्ञ में पू. स्वामिनीजी ने सायं के सत्र में गीता के १२ वें अध्याय पर तथा प्रात: के सत्र में केनोपनिषद ३ - ४ खण्ड पर प्रवचन किए। यज्ञ के अंतिम दिन हरि ॐ मंदिर द्वारा भण्डारे का आयोजन किया गया।",
    "registration": "closed",
    "fee": "No fee — open to all",
    "isPast": true,
    "isArchival": true,
    "sourceUrl": "https://www.vmission.org.in/gita-gyana-yagna-lucknow/",
    "slug": "gita-gyana-yagna-lucknow",
    "sourcePostId": 331,
    "featuredMediaUrl": "https://www.vmission.org.in/wp-content/uploads/2019/10/IMG_5598_1024x768.jpg",
    "localImagePath": "/images/vmission/events/legacy/IMG_5598_1024x768.jpg",
    "imageUrl": "/images/vmission/events/legacy/IMG_5598_1024x768.jpg"
  }
];

export function getEventById(id: string): VMEvent | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().replace(/^\/+|\/+$/g, '');
  return events.find((e) => {
    if (e.id.toLowerCase() === normalized || (e.canonicalId && e.canonicalId.toLowerCase() === normalized)) return true;
    if (e.slug && e.slug.toLowerCase() === normalized) return true;
    if (e.id.toLowerCase().endsWith('-' + normalized)) return true;
    if (e.sourceUrl && (e.sourceUrl.endsWith('/' + normalized + '/') || e.sourceUrl.endsWith('/' + normalized))) return true;
    return false;
  });
}

export function getUpcomingEvents(): VMEvent[] {
  return events.filter((e) => !e.isPast);
}
