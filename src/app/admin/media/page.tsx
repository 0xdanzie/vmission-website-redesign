'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CANONICAL_AUDIO_ARCHIVE } from '@/data/audioArchive';
import { CANONICAL_VIDEO_ARCHIVE } from '@/data/videoArchive';
import {
  TeachingsIcon,
  MediaIcon,
  SearchIcon,
  ShieldIcon,
  CheckIcon,
} from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminMediaPage() {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'images'>('audio');
  const [searchTerm, setSearchTerm] = useState('');

  const audioList = CANONICAL_AUDIO_ARCHIVE.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const videoList = CANONICAL_VIDEO_ARCHIVE.filter((v) =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const photographyAssets = [
    { title: 'Poojya Guruji (Riverside Portrait)', path: '/images/vmission/acharyas/guruji-portrait-riverside.jpg', category: 'Acharya Lineage' },
    { title: 'Swamini Amitanandaji', path: '/images/vmission/acharyas/swamini-amitananda.jpg', category: 'Acharya Lineage' },
    { title: 'Swamini Samatanandaji', path: '/images/vmission/acharyas/swamini-samatananda.jpg', category: 'Acharya Lineage' },
    { title: 'Swamini Poornanandaji', path: '/images/vmission/acharyas/swamini-poornananda.jpg', category: 'Acharya Lineage' },
    { title: 'Vedanta Sandesh Cover Artwork', path: '/images/vmission/publications/vedanta-sandesh-cover.svg', category: 'Publications' },
    { title: 'Vedanta Piyush Cover Artwork', path: '/images/vmission/publications/vedanta-piyush-cover.svg', category: 'Publications' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Archival Media Repository</h1>
          <p className={styles.subtitle}>
            Authoritative registry of audio recordings, video lectures, and historical photo archives preserved for future generations.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            fontSize: '0.75rem',
            background: 'var(--vm-forest-light, #EAF2EC)',
            color: 'var(--vm-forest, #2D4F38)',
            border: '1px solid rgba(45, 79, 56, 0.25)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <ShieldIcon size={13} />
            Archival Master Files Protected
          </span>
        </div>
      </div>

      {/* Media Type Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--vm-sand-border, #DFD7C7)',
        paddingBottom: '8px',
        flexWrap: 'wrap',
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('audio')}
          style={{
            padding: '9px 18px',
            borderRadius: '6px',
            border: activeTab === 'audio' ? 'none' : '1px solid var(--vm-sand-border, #DFD7C7)',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'audio' ? 'var(--vm-bhagwa, #E06328)' : '#FFFFFF',
            color: activeTab === 'audio' ? '#FFFFFF' : 'var(--vm-text-muted, #665D55)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all var(--vm-ease-fast, 150ms ease)',
          }}
        >
          <TeachingsIcon size={15} />
          <span>Audio Discourses ({CANONICAL_AUDIO_ARCHIVE.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('video')}
          style={{
            padding: '9px 18px',
            borderRadius: '6px',
            border: activeTab === 'video' ? 'none' : '1px solid var(--vm-sand-border, #DFD7C7)',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'video' ? 'var(--vm-bhagwa, #E06328)' : '#FFFFFF',
            color: activeTab === 'video' ? '#FFFFFF' : 'var(--vm-text-muted, #665D55)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all var(--vm-ease-fast, 150ms ease)',
          }}
        >
          <MediaIcon size={15} />
          <span>Video Lectures ({CANONICAL_VIDEO_ARCHIVE.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('images')}
          style={{
            padding: '9px 18px',
            borderRadius: '6px',
            border: activeTab === 'images' ? 'none' : '1px solid var(--vm-sand-border, #DFD7C7)',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'images' ? 'var(--vm-bhagwa, #E06328)' : '#FFFFFF',
            color: activeTab === 'images' ? '#FFFFFF' : 'var(--vm-text-muted, #665D55)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all var(--vm-ease-fast, 150ms ease)',
          }}
        >
          <span>Ashram Photography &amp; Art</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        background: '#FFFFFF',
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
        maxWidth: '440px',
      }}>
        <span style={{ color: 'var(--vm-text-faint, #8E847A)' }}>
          <SearchIcon size={15} />
        </span>
        <input
          type="search"
          placeholder="Filter archival records by title, teacher, or category…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            border: 'none',
            fontSize: '0.8125rem',
            color: 'var(--vm-text, #221D1A)',
            outline: 'none',
          }}
        />
      </div>

      {/* Tab: Audio */}
      {activeTab === 'audio' && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Canonical ID &amp; Title</th>
                  <th>Category</th>
                  <th>Teacher</th>
                  <th>Host Platform</th>
                  <th>Language</th>
                  <th>Archival Verification</th>
                </tr>
              </thead>
              <tbody>
                {audioList.slice(0, 25).map((a) => (
                  <tr key={a.canonicalId}>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{a.title}</strong>
                      <span className={styles.tdSub}>{a.canonicalId} · {a.contentType}</span>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{a.categoryName}</span>
                    </td>
                    <td>{a.teacher}</td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                        {a.hostType}
                      </span>
                    </td>
                    <td>{a.language}</td>
                    <td>
                      <span className={styles.regBadge} style={{
                        background: 'var(--vm-forest-light, #EAF2EC)',
                        color: 'var(--vm-forest, #2D4F38)',
                        border: '1px solid rgba(45, 79, 56, 0.25)',
                      }}>
                        <CheckIcon size={11} />
                        <span>{a.verificationStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            padding: '12px 18px',
            background: 'var(--vm-ivory, #FDFBF7)',
            borderTop: '1px solid var(--vm-sand-border, #DFD7C7)',
            fontSize: '0.75rem',
            color: 'var(--vm-text-muted, #665D55)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>Showing top 25 of {audioList.length} canonical audio records.</span>
            <span>Master source: <code>src/data/audioArchive.ts</code></span>
          </div>
        </div>
      )}

      {/* Tab: Video */}
      {activeTab === 'video' && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Canonical ID &amp; Title</th>
                  <th>Category</th>
                  <th>Teacher</th>
                  <th>YouTube Playlist / Video ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {videoList.slice(0, 25).map((v) => (
                  <tr key={v.canonicalId}>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{v.title}</strong>
                      <span className={styles.tdSub}>{v.canonicalId} · {v.contentType}</span>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{v.categoryName}</span>
                    </td>
                    <td>{v.teacher}</td>
                    <td>
                      <code style={{
                        fontSize: '0.71875rem',
                        background: 'var(--vm-sand, #FAF6EE)',
                        border: '1px solid var(--vm-sand-border, #DFD7C7)',
                        padding: '3px 7px',
                        borderRadius: '4px',
                        color: 'var(--vm-text, #221D1A)',
                      }}>
                        {v.youtubePlaylistId || v.youtubeVideoId || '—'}
                      </code>
                    </td>
                    <td>
                      <span
                        className={styles.regBadge}
                        style={{
                          background: v.verificationStatus === 'VERIFIED' ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: v.verificationStatus === 'VERIFIED' ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${v.verificationStatus === 'VERIFIED' ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                      >
                        {v.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            padding: '12px 18px',
            background: 'var(--vm-ivory, #FDFBF7)',
            borderTop: '1px solid var(--vm-sand-border, #DFD7C7)',
            fontSize: '0.75rem',
            color: 'var(--vm-text-muted, #665D55)',
          }}>
            Showing top 25 of {videoList.length} canonical video lecture series.
          </div>
        </div>
      )}

      {/* Tab: Images */}
      {activeTab === 'images' && (
        <div style={{
          background: '#FFFFFF',
          padding: '24px',
          borderRadius: '10px',
          border: '1px solid var(--vm-sand-border, #DFD7C7)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--vm-text, #221D1A)',
            marginBottom: '6px',
          }}>
            Archival &amp; Editorial Image Masters
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--vm-text-muted, #665D55)', lineHeight: 1.5, marginBottom: '20px' }}>
            Images are served from the canonical <code>/public/images/vmission/</code> directory.
            All Acharya portraits, ashram photography, and publication covers are preserved to safeguard historical documentation.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {photographyAssets.map((img) => (
              <div
                key={img.path}
                style={{
                  border: '1px solid var(--vm-sand-border, #DFD7C7)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'var(--vm-ivory, #FDFBF7)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  height: '140px',
                  background: 'var(--vm-sand, #FAF6EE)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={img.path}
                    alt={img.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className={styles.categoryBadge} style={{ fontSize: '0.625rem' }}>{img.category}</span>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--vm-text, #221D1A)', margin: '4px 0 2px' }}>
                      {img.title}
                    </p>
                  </div>
                  <code style={{ fontSize: '0.65625rem', color: 'var(--vm-text-faint, #8E847A)', wordBreak: 'break-all', marginTop: '6px' }}>
                    {img.path}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--vm-ivory, #FDFBF7)',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
        borderLeft: '3px solid var(--vm-forest, #2D4F38)',
        borderRadius: '8px',
        fontSize: '0.8125rem',
        color: 'var(--vm-text-muted, #665D55)',
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <div style={{ color: 'var(--vm-forest, #2D4F38)', marginTop: '2px' }}>
          <ShieldIcon size={16} />
        </div>
        <div>
          <strong style={{ color: 'var(--vm-text, #221D1A)', display: 'block', marginBottom: '2px' }}>
            Archival Preservation Protocol:
          </strong>
          This interface serves as an index and verification console. Master recordings and historical photography are held in permanent storage to protect the ashram legacy.
        </div>
      </div>
    </div>
  );
}
