'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import styles from './ToastStack.module.css';

export default function ToastStack() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.stack} role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]} animate-fadeUp`}>
          <span className={styles.icon} aria-hidden="true">
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className={styles.message}>{t.message}</span>
          <button className={styles.dismiss} onClick={() => dismissToast(t.id)} aria-label="Dismiss notification">×</button>
        </div>
      ))}
    </div>
  );
}
