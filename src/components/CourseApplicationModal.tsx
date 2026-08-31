'use client';

import React, { useState, useEffect } from 'react';
import type { Course } from '@/data/courses';
import { useToast } from '@/context/ToastContext';
import styles from './CourseApplicationModal.module.css';

interface Props {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseApplicationModal({ course, isOpen, onClose }: Props) {
  const { showToast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [background, setBackground] = useState('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please provide your name and email.', 'error');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      showToast('Application & responses submitted successfully! (Simulated)', 'success');
    }, 700);
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Enrollment Application for ${course.title}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.courseTag}>{course.format} Correspondence Course</span>
            <h3 className={styles.title}>Apply for {course.title}</h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close application modal"
          >
            ✕
          </button>
        </div>

        {/* 3-Step Visual Progress Bar */}
        <div className={styles.progress}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.activeStep : ''}`}>
            <span className={styles.stepCircle}>{step > 1 ? '✓' : '1'}</span>
            <span className={styles.stepLabel}>1. Contact Details</span>
          </div>
          <div className={`${styles.progressLine} ${step >= 2 ? styles.activeLine : ''}`} />
          <div className={`${styles.progressStep} ${step >= 2 ? styles.activeStep : ''}`}>
            <span className={styles.stepCircle}>{step > 2 ? '✓' : '2'}</span>
            <span className={styles.stepLabel}>2. Lesson 1 Reflection</span>
          </div>
          <div className={`${styles.progressLine} ${step === 3 ? styles.activeLine : ''}`} />
          <div className={`${styles.progressStep} ${step === 3 ? styles.activeStep : ''}`}>
            <span className={styles.stepCircle}>3</span>
            <span className={styles.stepLabel}>3. Confirmation</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {step === 1 && (
            <form onSubmit={handleNextStep} className={styles.form}>
              <div className={styles.guidanceBox}>
                <p>
                  <strong>How this course works:</strong> After submitting your contact details and your answers to the Lesson 1 questions, the Acharya will personally review your responses and email you the study materials for Lesson 2.
                </p>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="app-name">Your Full Name *</label>
                <input
                  id="app-name"
                  type="text"
                  required
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Sharma"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="app-email">Email Address *</label>
                  <input
                    id="app-email"
                    type="email"
                    required
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anand@example.com"
                  />
                  <span className="form-hint">Study materials will be sent here.</span>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="app-phone">Phone / WhatsApp</label>
                  <input
                    id="app-phone"
                    type="tel"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="app-city">City, State / Country</label>
                <input
                  id="app-city"
                  type="text"
                  className="form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Indore, India"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="app-bg">Prior Vedanta or Sanskrit Study (if any)</label>
                <textarea
                  id="app-bg"
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Mention any books, courses, or background..."
                />
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={styles.btnSecondary} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  Proceed to Lesson 1 Questions (Step 2) →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className={styles.form}>
              <div className={styles.guidanceBox}>
                <p>
                  <strong>Lesson 1 Questionnaire:</strong> Please write your reflections in your own words based on your study of Lesson 1. There are no &ldquo;trick&rdquo; questions; sincerity and clarity are what matters.
                </p>
              </div>

              {course.questionnaire?.map((q, idx) => (
                <div key={idx} className="form-field">
                  <label className={styles.questionLabel} htmlFor={`q-${idx}`}>
                    <span className={styles.qIndex}>Q{idx + 1}.</span> {q}
                  </label>
                  <textarea
                    id={`q-${idx}`}
                    className="form-textarea"
                    rows={3}
                    value={answers[idx] || ''}
                    onChange={(e) =>
                      setAnswers({ ...answers, [idx]: e.target.value })
                    }
                    placeholder="Write your reflection here..."
                    required
                  />
                </div>
              ))}

              <div className={styles.btnRow}>
                <button type="button" className={styles.btnSecondary} onClick={() => setStep(1)}>
                  ← Back to Details
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Answers...' : 'Submit Questionnaire & Enroll →'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className={styles.successBlock}>
              <div className={styles.successIcon}>✓</div>
              <h4 className={styles.successTitle}>Application &amp; Answers Submitted!</h4>
              <p className={styles.successMsg}>
                Hari Om, <strong>{name}</strong>! Your answers to the Lesson 1 Questionnaire for <strong>{course.title}</strong> have been received by Vedanta Ashram.
              </p>

              <div className={styles.nextSteps}>
                <h5>What Happens Next?</h5>
                <ol>
                  <li>The Acharya will personally review your answers to verify understanding.</li>
                  <li>You will receive personal guidance and the link to <strong>Lesson 2</strong> at <strong>{email}</strong> within 2–3 business days.</li>
                  <li>No mandatory fee is charged. If you wish to offer a voluntary contribution toward course administration, you may do so on our <strong>Donate / Seva</strong> page.</li>
                </ol>
              </div>

              <button type="button" className={styles.btnPrimary} onClick={onClose}>
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
