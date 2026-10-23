'use client';

import React from 'react';
import { ShieldIcon, LockIcon, CheckIcon } from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminSettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Settings &amp; Governance Architecture</h1>
          <p className={styles.subtitle}>
            Configuration parameters, hosting infrastructure, database security, and staff access roles.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6, 24px)' }}>
        {/* Environment & Architecture Information */}
        <div style={{
          background: '#FFFFFF',
          padding: '24px',
          borderRadius: '10px',
          border: '1px solid var(--vm-sand-border, #DFD7C7)',
          boxShadow: '0 1px 3px rgba(34, 29, 26, 0.04)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--vm-text, #221D1A)',
            marginBottom: '6px',
          }}>
            System Infrastructure &amp; Deployment Configuration
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--vm-text-muted, #665D55)', marginBottom: '16px' }}>
            Current deployment specifications and security boundaries enforced by the institutional CMS.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{
              background: 'var(--vm-ivory, #FDFBF7)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vm-text-faint, #8E847A)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Database Engine
              </span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--vm-forest, #2D4F38)', marginTop: '4px', marginBottom: '2px' }}>
                PostgreSQL · Row Level Security
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                Granular caller policies on tables and RPC functions
              </span>
            </div>

            <div style={{
              background: 'var(--vm-ivory, #FDFBF7)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vm-text-faint, #8E847A)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Authentication Strategy
              </span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--vm-text, #221D1A)', marginTop: '4px', marginBottom: '2px' }}>
                Server-Side Authentication
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                Zero secrets in client code; verified via admin_profiles
              </span>
            </div>

            <div style={{
              background: 'var(--vm-ivory, #FDFBF7)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vm-text-faint, #8E847A)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Search Engine Indexing
              </span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--vm-forest, #2D4F38)', marginTop: '4px', marginBottom: '2px' }}>
                Strictly Excluded
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                noindex, nofollow, and robots.txt disallow /admin/*
              </span>
            </div>
          </div>
        </div>

        {/* Role-Based Access Configuration */}
        <div style={{
          background: '#FFFFFF',
          padding: '24px',
          borderRadius: '10px',
          border: '1px solid var(--vm-sand-border, #DFD7C7)',
          boxShadow: '0 1px 3px rgba(34, 29, 26, 0.04)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--vm-text, #221D1A)',
            marginBottom: '6px',
          }}>
            Staff Access Role Matrix
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--vm-text-muted, #665D55)', lineHeight: 1.5, marginBottom: '16px' }}>
            Privileges are granted according to the principle of least privilege. Editors handle content creation and payment verification, while Administrators govern financial receipts, deletions, and site settings.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Permission Scope &amp; Responsibilities</th>
                  <th>Policy Enforcement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Administrator</strong>
                  </td>
                  <td>Full console access, 80-G tax receipt issuance, donation record deletion, staff role assignment, system audit inspection</td>
                  <td>
                    <span className={styles.regBadge} style={{
                      background: 'var(--vm-forest-light, #EAF2EC)',
                      color: 'var(--vm-forest, #2D4F38)',
                      border: '1px solid rgba(45, 79, 56, 0.25)',
                    }}>
                      <CheckIcon size={11} />
                      <span>Active</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Editor</strong>
                  </td>
                  <td>Discourse creation, retreat scheduling, course updates, publication archive publishing, offering payment verification</td>
                  <td>
                    <span className={styles.regBadge} style={{
                      background: 'var(--vm-forest-light, #EAF2EC)',
                      color: 'var(--vm-forest, #2D4F38)',
                      border: '1px solid rgba(45, 79, 56, 0.25)',
                    }}>
                      <CheckIcon size={11} />
                      <span>Active</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Media Archivist</strong>
                  </td>
                  <td>Cataloging and organizing audio recordings, video lectures, and archival photographs</td>
                  <td>
                    <span className={styles.regBadge} style={{
                      background: 'var(--vm-forest-light, #EAF2EC)',
                      color: 'var(--vm-forest, #2D4F38)',
                      border: '1px solid rgba(45, 79, 56, 0.25)',
                    }}>
                      <CheckIcon size={11} />
                      <span>Configured</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Seva Coordinator</strong>
                  </td>
                  <td>Visitor stay inquiry correspondence and ashram seva communications</td>
                  <td>
                    <span className={styles.regBadge} style={{
                      background: 'var(--vm-forest-light, #EAF2EC)',
                      color: 'var(--vm-forest, #2D4F38)',
                      border: '1px solid rgba(45, 79, 56, 0.25)',
                    }}>
                      <CheckIcon size={11} />
                      <span>Configured</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Declaration */}
        <div style={{
          padding: '18px 22px',
          background: 'var(--vm-ivory, #FDFBF7)',
          border: '1px solid var(--vm-sand-border, #DFD7C7)',
          borderLeft: '3px solid var(--vm-bhagwa, #E06328)',
          borderRadius: '8px',
          fontSize: '0.8125rem',
          color: 'var(--vm-text-muted, #665D55)',
          lineHeight: 1.55,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
        }}>
          <div style={{ color: 'var(--vm-bhagwa, #E06328)', marginTop: '2px' }}>
            <LockIcon size={18} />
          </div>
          <div>
            <strong style={{ color: 'var(--vm-text, #221D1A)', display: 'block', marginBottom: '3px' }}>
              Security Architecture Declaration:
            </strong>
            The public website does not expose an unsecured admin endpoint. All administrative interfaces require verified authenticated sessions, and database mutations are strictly validated against row-level authorization rules in <code>admin_profiles</code>. No service-role keys or sensitive credentials are ever exposed to the client.
          </div>
        </div>
      </div>
    </div>
  );
}
