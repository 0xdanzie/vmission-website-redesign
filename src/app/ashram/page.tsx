'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import TimelineItem from '@/components/TimelineItem';
import PlanVisitModal from '@/components/PlanVisitModal';
import AshramImage from '@/components/AshramImage';
import AshramGallery from '@/components/AshramGallery';
import styles from './page.module.css';

export default function AshramPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dailySchedule = [
    {
      timeOrYear: '05:30 AM',
      title: 'Morning Meditation & Chanting',
      description: 'Silent contemplation in the hall followed by Vedic chanting, Guru Stotram, and Shanti Mantras.',
    },
    {
      timeOrYear: '07:00 AM',
      title: 'Puja & Abhishek at Gangeshwar Mahadev Mandir',
      description: 'Daily Shiva puja, Rudrabhishek, and morning aarti at the consecrated campus temple.',
    },
    {
      timeOrYear: '08:00 AM',
      title: 'Sattwic Breakfast & Seva',
      description: 'Wholesome vegetarian breakfast in the communal dining hall, followed by simple ashram seva duties.',
    },
    {
      timeOrYear: '09:00 AM',
      title: 'Morning Vedanta Discourse',
      description: 'Traditional verse-by-verse exposition of the Upanishads or Bhagavad Gita by Poojya Guruji.',
    },
    {
      timeOrYear: '12:30 PM',
      title: 'Bhiksha / Communal Lunch & Quiet Rest',
      description: 'Mahatmas, resident brahmacharis, and guests take meals together in the spirit of family.',
    },
    {
      timeOrYear: '04:30 PM',
      title: 'Tea & Study Circle / Satsang',
      description: 'Informal Satsang, clarification of philosophical doubts, and scriptural self-inquiry.',
    },
    {
      timeOrYear: '06:30 PM',
      title: 'Evening Mandir Aarti & Kirtan',
      description: 'Devotional singing, stotram recitation, and evening lamp offerings at the temple.',
    },
    {
      timeOrYear: '08:00 PM',
      title: 'Dinner & Night Reflection (Mouna)',
      description: 'Light evening meal followed by silence (Mouna) and personal reflection before sleep.',
      isLast: true,
    },
  ];

  return (
    <>
      {/* 1. HERO */}
      <section className={styles.hero} aria-label="Ashram Hero">
        <div className={`container ${styles.heroContainer}`}>
          <div className="animate-fadeUp">
            <span className={styles.heroBadge}>Sudama Nagar · Indore · Central India</span>
            <h1 className={styles.heroTitle}>Vedanta Ashram, Indore</h1>
            <p className={styles.heroLead}>
              A serene modern Gurukula dedicated to scriptural inquiry, meditation, and simple sattwic living under the guidance of traditional Advaita Acharyas.
            </p>
            <div className={styles.heroBtns}>
              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                Plan Your Visit / Stay →
              </Button>
              <a href="#visitor-guide" className={styles.anchorBtn}>
                Visitor Q&amp;A Guide ↓
              </a>
              <a href="#ashram-gallery" className={styles.anchorBtn}>
                Photo Gallery ↓
              </a>
              <a href="#how-to-reach" className={styles.anchorBtn}>
                Directions &amp; Map ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISITOR ESSENTIAL QUESTIONS */}
      <section id="visitor-guide" className={`section ${styles.quickGuideSection}`} aria-label="Visitor Essentials">
        <div className="container">
          <SectionHeader
            tag="Visitor Essentials"
            title="Everything You Need to Know Before Visiting"
            subtitle="Clear answers for seekers planning their first visit or study retreat at the Ashram."
            align="center"
          />

          <div className="grid grid--4">
            <div className={`card ${styles.qaCard}`}>
              <span className={styles.qaIcon}>🚪</span>
              <h4 className={styles.qaTitle}>Can I Visit?</h4>
              <p className={styles.qaAnswer}>
                <strong>Yes.</strong> Seekers are warmly welcome for daily temple darshan, satsangs, or residential study retreats with prior registration.
              </p>
            </div>

            <div className={`card ${styles.qaCard}`}>
              <span className={styles.qaIcon}>🏛️</span>
              <h4 className={styles.qaTitle}>What is it Like?</h4>
              <p className={styles.qaAnswer}>
                A peaceful Gurukula with a Shiva temple, lush gardens, lecture halls, and quiet study areas designed for introspection.
              </p>
            </div>

            <div className={`card ${styles.qaCard}`}>
              <span className={styles.qaIcon}>🛏️</span>
              <h4 className={styles.qaTitle}>Where Will I Stay?</h4>
              <p className={styles.qaAnswer}>
                Clean guest rooms equipped with beds, bedding, 24-hr water, and attached western toilets. Capacity: ~24 guests.
              </p>
            </div>

            <div className={`card ${styles.qaCard}`}>
              <span className={styles.qaIcon}>📜</span>
              <h4 className={styles.qaTitle}>What to Know?</h4>
              <p className={styles.qaAnswer}>
                Strictly vegetarian, smoke/alcohol-free, modest white Indian attire, and active participation in daily classes and aartis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE ASHRAM & HISTORY */}
      <section className="section section--muted" aria-label="About the Ashram">
        <div className="container">
          <div className={styles.twoCol}>
            <div>
              <SectionHeader
                tag="History & Genesis"
                title="A Sanctuary for the Contemplation of Truth"
              />
              <p className="text-lead">
                Established in 1992 by Poojya Swami Atmananda Saraswati, Vedanta Ashram is located in Sudama Nagar, Indore. It was conceived not as a tourist hotel or ceremonial center, but as an authentic Gurukula.
              </p>
              <p className="text-body" style={{ marginTop: 'var(--space-3)' }}>
                Here, students of Vedanta temporarily withdraw from the noise of worldly occupations to devote their attention to <em>Shravana</em> (listening to scriptural teaching), <em>Manana</em> (reflecting upon its meaning), and <em>Nididhyasana</em> (living in silent contemplation).
              </p>
            </div>

            <div className={styles.visualCol}>
              <AshramImage
                type="ashram-exterior"
                alt="Entrance and Exterior of Vedanta Ashram Indore"
                aspectRatio="16/9"
                badge="Indore Gurukula Campus"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAMPUS FACILITIES WITH AUTHENTIC VISUAL FRAMES */}
      <section className="section" aria-label="Facilities">
        <div className="container">
          <SectionHeader
            tag="Campus & Living"
            title="Sattwic Facilities for Inmates &amp; Guests"
            subtitle="Thoughtfully designed amenities to support deep study, rest, and meditation."
            align="center"
          />

          <div className="grid grid--3">
            {/* Gangeshwar Temple */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="gangeshwar-mandir"
                alt="Sri Gangeshwar Mahadev Mandir at Vedanta Ashram"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Gangeshwar Mahadev Temple</h3>
                <p className={styles.facilityDesc}>
                  A consecrated Shiva temple on campus where daily Vedic pujas, Rudra abhishekam, and evening aartis create a peaceful devotional atmosphere.
                </p>
              </div>
            </div>

            {/* Scriptural Library */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="library"
                alt="Vedanta Scriptural Library Indore"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Scriptural Library</h3>
                <p className={styles.facilityDesc}>
                  A rich collection of classical Vedanta literature, Adi Shankara Bhashyas, Sanskrit reference books, and audio discourse archives.
                </p>
              </div>
            </div>

            {/* Guest Quarters */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="rooms"
                alt="Guest Rooms and Inmate Accommodations"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Guest Accommodations</h3>
                <p className={styles.facilityDesc}>
                  Single and shared rooms equipped with beds, ceiling fans, 24-hour running water, and attached western toilets. Capacity: ~24 seekers.
                </p>
              </div>
            </div>

            {/* Dining Hall */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="dining-hall"
                alt="Annapurna Dining Hall at Vedanta Ashram"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Communal Dining Hall</h3>
                <p className={styles.facilityDesc}>
                  Freshly prepared, pure vegetarian (sattwic) meals served twice daily. Resident Mahatmas and seekers eat together in the spirit of family.
                </p>
              </div>
            </div>

            {/* Meditation Hall */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="meditation-hall"
                alt="Meditation and Discourse Hall"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Discourse &amp; Meditation Hall</h3>
                <p className={styles.facilityDesc}>
                  A spacious, airy hall equipped for daily discourses, chanting sessions, guided meditation, and interactive question-and-answer circles.
                </p>
              </div>
            </div>

            {/* Garden & Courtyard */}
            <div className={`card ${styles.facilityCardWithVisual}`}>
              <AshramImage
                type="garden"
                alt="Ashram Garden and Companion Animal Sanctuary"
                aspectRatio="16/9"
              />
              <div className={styles.fText}>
                <h3 className={styles.facilityTitle}>Courtyard &amp; Companion Pets</h3>
                <p className={styles.facilityDesc}>
                  The Ashram maintains a green garden courtyard and lives in affectionate harmony with friendly companion animals cared for by Guruji.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 AUTHENTIC ASHRAM PHOTO GALLERY & LIGHTBOX */}
      <section id="ashram-gallery" className="section section--muted" aria-label="Ashram Photo Gallery">
        <div className="container">
          <SectionHeader
            tag="Visual Tour"
            title="Photographs of Vedanta Ashram, Indore"
            subtitle="Authentic views of our sanctuary, sacred temple sanctum, lecture hall, and campus grounds."
            align="center"
          />
          <AshramGallery />
        </div>
      </section>

      {/* 5. DAILY LIFE & SCHEDULE */}
      <section className="section" aria-label="Daily Routine">
        <div className="container container--md">
          <SectionHeader
            tag="Gurukula Rhythm"
            title="Daily Routine &amp; Schedule"
            subtitle="A structured daily cadence balancing prayer, scriptural study, nourishing meals, and silent reflection."
            align="center"
          />

          <div className={styles.timelineWrapper}>
            {dailySchedule.map((item, idx) => (
              <TimelineItem
                key={idx}
                timeOrYear={item.timeOrYear}
                title={item.title}
                description={item.description}
                isLast={item.isLast}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUIDELINES FOR RESIDENTS & VISITORS */}
      <section className="section section--muted" aria-label="Guidelines">
        <div className="container">
          <SectionHeader
            tag="Code of Conduct"
            title="Ashram Discipline &amp; Expectations"
            subtitle="Please review these essential guidelines before planning your visit."
          />

          <div className="grid grid--2">
            <div className={styles.guidelineCard}>
              <h4 className={styles.guideTitle}>✓ What is Expected</h4>
              <ul className={styles.guideList}>
                <li>Punctual attendance at daily classes, meditation sessions, and Mandir aartis.</li>
                <li>Modest, simple traditional Indian attire (plain white attire preferred).</li>
                <li>Maintaining silence (Mouna) during designated study and night hours.</li>
                <li>Participation in light communal duties (cleaning dining dishes, keeping quarters tidy).</li>
                <li>Respect and affection for companion pets residing peacefully on campus.</li>
              </ul>
            </div>

            <div className={styles.guidelineCard}>
              <h4 className={styles.guideTitle}>✕ What is Strictly Prohibited</h4>
              <ul className={styles.guideList}>
                <li>Smoking, alcohol, drugs, or non-vegetarian food anywhere on campus.</li>
                <li>Eating in private quarters (all meals are served together in the dining hall).</li>
                <li>Loud music, commercial work, or disruptive electronic use in common areas.</li>
                <li>Unannounced overnight stays without prior registration and confirmation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW TO REACH & DIRECTIONS */}
      <section id="how-to-reach" className="section" aria-label="Directions & Contact">
        <div className="container">
          <SectionHeader
            tag="Travel Guide"
            title="Visit / How to Reach the Ashram"
            subtitle="Conveniently located in Indore, Madhya Pradesh, well connected by air, rail, and road."
          />

          <div className={styles.travelGrid}>
            <div className={styles.travelCol}>
              <div className={styles.travelItem}>
                <span className={styles.travelIcon}>✈️</span>
                <div>
                  <h4 className={styles.travelMode}>By Air (Indore Airport - IDR)</h4>
                  <p className={styles.travelDesc}>
                    Devi Ahilyabai Holkar Airport connects directly to Mumbai, Delhi, Bengaluru, and major hubs. The Ashram is ~<strong>25–30 minutes</strong> by taxi or auto-rickshaw (~8 km).
                  </p>
                </div>
              </div>

              <div className={styles.travelItem}>
                <span className={styles.travelIcon}>🚆</span>
                <div>
                  <h4 className={styles.travelMode}>By Train (Indore Junction - INDB)</h4>
                  <p className={styles.travelDesc}>
                    Indore Junction is connected nationwide. Take a prepaid auto-rickshaw to Sudama Nagar (inside Sankaracharya Gate). Travel time: ~<strong>20–25 minutes</strong> (~6 km).
                  </p>
                </div>
              </div>

              <div className={styles.travelItem}>
                <span className={styles.travelIcon}>🚗</span>
                <div>
                  <h4 className={styles.travelMode}>By Road &amp; Landmark</h4>
                  <p className={styles.travelDesc}>
                    Located inside <strong>Sankaracharya Gate</strong>, between Futi-Kothi and Hawa Bangla in Sector-E, Sudama Nagar, Indore.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.addressCard}>
              <h4 className={styles.addressTitle}>Postal Address &amp; Helplines</h4>
              <p className={styles.addressText}>
                <strong>Vedanta Ashram</strong><br />
                2948, Sector-E, Sudama Nagar<br />
                Inside Sankaracharya Gate<br />
                Indore – 452009, Madhya Pradesh, India
              </p>
              <div className={styles.addressActions}>
                <p><strong>Ashram Helpline:</strong> +91 7000361938</p>
                <p><strong>Guruji Contact:</strong> +91 98269 59480</p>
                <p><strong>Email:</strong> vmission@gmail.com</p>
              </div>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button variant="primary" fullWidth onClick={() => setIsModalOpen(true)}>
                  Plan Your Visit Now →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Visit Modal */}
      <PlanVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
