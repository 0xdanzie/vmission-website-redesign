'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { createClient } from '@/lib/supabase/client';
import { LockIcon, ArrowRightIcon, ArrowLeftIcon } from '@/components/admin/AdminIcons';
import styles from './login.module.css';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirectTo') || '/admin/';
  const isSelf = rawRedirect.split('?')[0].replace(/\/+$/, '') === '/admin/login';
  const isValidInternal = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//');
  const redirectTo = !isSelf && isValidInternal ? rawRedirect : '/admin/';
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('office@vmission.org.in');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (urlError === 'unauthorized') {
      setErrorMsg('Access Restricted: Your account does not have staff or administrator privileges.');
    }
  }, [urlError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setErrorMsg(signInError.message);
        setIsSubmitting(false);
        return;
      }

      if (!data.user) {
        setErrorMsg('Authentication failed. No user record returned.');
        setIsSubmitting(false);
        return;
      }

      // Check role authorization in public.admin_profiles
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('role, full_name')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
        await supabase.auth.signOut();
        setErrorMsg('Access Restricted: This account is authenticated but not registered as an authorized staff member (admin or editor).');
        setIsSubmitting(false);
        return;
      }

      // Successful staff login
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected connection error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginCard}>
      {/* Brand Emblem & Wordmark Lockup */}
      <div className={styles.brandHeader}>
        <div className={styles.logoWrap}>
          <BrandLogo variant="emblem" size="md" />
        </div>
        <h1 className={styles.brandTitle}>Vedanta Mission</h1>
        <p className={styles.consoleTag}>Staff Access &amp; Operations Console</p>
      </div>

      {/* Security Context Notice */}
      <div className={styles.securityNotice}>
        <div className={styles.noticeIcon}>
          <LockIcon size={16} />
        </div>
        <div className={styles.noticeText}>
          <strong>Authorized Staff Authentication</strong>
          <p>
            Connected to PostgreSQL Authentication. Access permissions are strictly verified against staff roles.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className={styles.errorAlert} role="alert">
          <strong>Authentication Notice:</strong> {errorMsg}
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="staff-email" className={styles.label}>
            Staff Email / Official ID *
          </label>
          <input
            id="staff-email"
            type="email"
            required
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="office@vmission.org.in"
            autoComplete="username"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="staff-password" className={styles.label}>
            Password *
          </label>
          <input
            id="staff-password"
            type="password"
            required
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter staff password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Authenticating…' : 'Enter Staff Console'}</span>
          <ArrowRightIcon size={14} />
        </button>
      </form>

      {/* Footer info & Return link */}
      <div className={styles.cardFooter}>
        <Link href="/" className={styles.returnLink}>
          <ArrowLeftIcon size={13} />
          <span>Return to Vedanta Mission Public Site</span>
        </Link>
        <p className={styles.copyright}>
          Vedanta Ashram &amp; Vedanta Parmarthic Sewa Trust, Indore
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className={styles.loginContainer}>
      <head>
        <title>Staff Login — Vedanta Mission Console</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>

      <Suspense fallback={<div style={{ color: 'var(--vm-text)', textAlign: 'center' }}>Loading staff console…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
