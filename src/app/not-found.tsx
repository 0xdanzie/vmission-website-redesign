import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export const metadata = {
  title: 'Page Not Found — 404 | Vedanta Mission',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--nav-height) + var(--space-8)) var(--space-4) var(--space-8)',
        backgroundColor: 'var(--vm-ivory)',
        color: 'var(--vm-text)',
      }}
    >
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <span
          style={{
            fontFamily: 'var(--font-sanskrit)',
            fontSize: '3rem',
            color: 'var(--vm-brass)',
            display: 'block',
            marginBottom: 'var(--space-2)',
          }}
        >
          ॐ
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--vm-ochre)',
            display: 'block',
            marginBottom: 'var(--space-2)',
          }}
        >
          Error 404 — Page Not Found
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 600,
            color: 'var(--vm-walnut)',
            marginBottom: 'var(--space-4)',
          }}
        >
          The Path You Seek Is Not Located Here
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-base)',
            color: 'var(--vm-text-muted)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-6)',
          }}
        >
          The page or scriptural resource you are looking for may have moved or been consolidated as part of the new information architecture.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/" variant="primary">
            Return to Homepage →
          </Button>
          <Button href="/about" variant="secondary">
            About Vedanta Mission
          </Button>
        </div>
      </div>
    </div>
  );
}
