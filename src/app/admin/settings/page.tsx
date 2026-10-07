'use client';

import React from 'react';
import styles from '../events/eventsAdmin.module.css';

export default function AdminSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Settings &amp; Institutional Configuration</h1>
          <p className={styles.subtitle}>
            Configuration parameters, production deployment architecture, and staff access roles.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Environment & Architecture Information */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A202C', marginBottom: '8px' }}>
            System Environment &amp; Hosting Architecture
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '6px', border: '1px solid #EDF2F7' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Mode</span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#D97706', marginTop: '2px' }}>
                Local Development Prototype
              </p>
              <span style={{ fontSize: '0.75rem', color: '#718096' }}>Client-side state simulation</span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '6px', border: '1px solid #EDF2F7' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Authentication Strategy</span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#2D3748', marginTop: '2px' }}>
                Server-Side Authentication Required
              </p>
              <span style={{ fontSize: '0.75rem', color: '#718096' }}>No hardcoded credentials or client secrets</span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '6px', border: '1px solid #EDF2F7' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Search Indexing</span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#15803D', marginTop: '2px' }}>
                Excluded (noindex / nofollow)
              </p>
              <span style={{ fontSize: '0.75rem', color: '#718096' }}>Robots.txt: Disallow /admin/*</span>
            </div>
          </div>
        </div>

        {/* Future Role-Based Access Configuration */}
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A202C', marginBottom: '8px' }}>
            Staff Access Roles (Production Specification)
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
            In production deployments, user sessions are validated against the Ashram LDAP/OAuth provider with the following role matrix:
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Permission Scope</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Administrator</strong></td>
                  <td>Full console access, system settings, staff management, audit log access</td>
                  <td><span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>Configured</span></td>
                </tr>
                <tr>
                  <td><strong>Editor</strong></td>
                  <td>Editorial workflows for Publications, Teachings, Events, and Courses</td>
                  <td><span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>Configured</span></td>
                </tr>
                <tr>
                  <td><strong>Media Manager</strong></td>
                  <td>Upload and organize Audio discourses, Video lectures, and photo archives</td>
                  <td><span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>Configured</span></td>
                </tr>
                <tr>
                  <td><strong>Seva / Office Staff</strong></td>
                  <td>Visitor inquiry responses and 80-G donation receipt reconciliation</td>
                  <td><span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>Configured</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Declaration */}
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #F59E0B',
          borderRadius: '8px',
          padding: 'var(--space-5)',
          color: '#92400E',
          fontSize: '0.8125rem',
          lineHeight: 1.5,
        }}>
          ⚠️ <strong>Security Notice:</strong> The public website does not expose an unsecured admin system. Client-side authentication is intentionally non-existent; zero credentials or API keys are placed in source code or <code>NEXT_PUBLIC_*</code> environment variables. Real server-side authentication must guard this area in production.
        </div>
      </div>
    </div>
  );
}
