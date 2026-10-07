'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('office@vmission.org.in');
  const [role, setRole] = useState<'Administrator' | 'Editor' | 'Media Manager' | 'Seva / Office Staff'>('Administrator');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In this local development prototype, client state demonstrates institutional access.
    // Real production environments require server-side session authentication.
    setTimeout(() => {
      router.push('/admin');
    }, 400);
  };

  return (
    <div className={styles.loginContainer}>
      <head>
        <title>Staff Login — Vedanta Mission Console</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>

      <div className={styles.loginCard}>
        {/* Brand Emblem Lockup */}
        <div className={styles.brandHeader}>
          <div className={styles.logoWrap}>
            <BrandLogo variant="emblem" size="md" />
          </div>
          <h1 className={styles.brandTitle}>Vedanta Mission</h1>
          <p className={styles.consoleTag}>Staff Access &amp; Operations Console</p>
        </div>

        {/* Prototype Architecture Notice */}
        <div className={styles.prototypeNotice}>
          <div className={styles.noticeIcon}>ℹ️</div>
          <div className={styles.noticeText}>
            <strong>Prototype Staff Console</strong>
            <p>
              This is a local development console demonstrating institutional editorial workflows. 
              Production deployments require server-side authentication (OAuth / JWT / session tokens).
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="staff-email" className={styles.label}>
              Staff Email / Official ID
            </label>
            <input
              id="staff-email"
              type="email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@vmission.org.in"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="staff-role" className={styles.label}>
              Simulated Role (Prototype Profile)
            </label>
            <select
              id="staff-role"
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="Administrator">Administrator (Full Access)</option>
              <option value="Editor">Editor (Publications &amp; Teachings)</option>
              <option value="Media Manager">Media Manager (Audio / Video / Images)</option>
              <option value="Seva / Office Staff">Seva / Office Staff (Enquiries &amp; 80-G)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="staff-token" className={styles.label}>
              Security Token / Access Code
            </label>
            <input
              id="staff-token"
              type="password"
              className={styles.input}
              defaultValue="••••••••••••"
              disabled
              title="Authentication handled via server-side session in production"
            />
            <span className={styles.hint}>
              Production deployments authenticate against the Ashram directory server.
            </span>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entering Staff Console...' : 'Enter Staff Console →'}
          </button>
        </form>

        {/* Footer info & Return link */}
        <div className={styles.cardFooter}>
          <Link href="/" className={styles.returnLink}>
            ← Return to Vedanta Mission Public Site
          </Link>
          <p className={styles.copyright}>
            Vedanta Ashram &amp; Vedanta Parmarthic Sewa Trust, Indore
          </p>
        </div>
      </div>
    </div>
  );
}
