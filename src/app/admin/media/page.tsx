'use client';

import React, { useState } from 'react';
import { CANONICAL_AUDIO_ARCHIVE } from '@/data/audioArchive';
import { CANONICAL_VIDEO_ARCHIVE } from '@/data/videoArchive';
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Media &amp; Archival Repository Browser</h1>
          <p className={styles.subtitle}>
            Editorial index of authoritative audio recordings, video lectures, and archival media assets.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', background: '#FEF3C7', color: '#92400E', border: '1px solid #F59E0B', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
            Editorial Index Only · Archival Files Protected
          </span>
        </div>
      </div>

      {/* Media Type Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('audio')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'audio' ? '#D95D39' : '#EDF2F7',
            color: activeTab === 'audio' ? '#FFFFFF' : '#4A5568',
          }}
        >
          🎙️ Audio Archive ({CANONICAL_AUDIO_ARCHIVE.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'video' ? '#D95D39' : '#EDF2F7',
            color: activeTab === 'video' ? '#FFFFFF' : '#4A5568',
          }}
        >
          📹 Video Lectures &amp; Playlists ({CANONICAL_VIDEO_ARCHIVE.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.84375rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'images' ? '#D95D39' : '#EDF2F7',
            color: activeTab === 'images' ? '#FFFFFF' : '#4A5568',
          }}
        >
          🖼️ Ashram Photography &amp; Icons
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: '400px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Filter by title, teacher, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ fontSize: '0.8125rem' }}
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {audioList.slice(0, 20).map((a) => (
                  <tr key={a.canonicalId}>
                    <td>
                      <strong>{a.title}</strong>
                      <span className={styles.tdSub}>{a.canonicalId} · {a.contentType}</span>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{a.categoryName}</span>
                    </td>
                    <td>{a.teacher}</td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#4A5568' }}>{a.hostType}</span>
                    </td>
                    <td>{a.language}</td>
                    <td>
                      <span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>
                        {a.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 16px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#718096' }}>
            Showing top 20 of {audioList.length} filtered audio records. Authoritative sources preserved in <code>audioArchive.ts</code>.
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
                  <th>YouTube Playlist / ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {videoList.slice(0, 20).map((v) => (
                  <tr key={v.canonicalId}>
                    <td>
                      <strong>{v.title}</strong>
                      <span className={styles.tdSub}>{v.canonicalId} · {v.contentType}</span>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{v.categoryName}</span>
                    </td>
                    <td>{v.teacher}</td>
                    <td>
                      <code style={{ fontSize: '0.6875rem', background: '#EDF2F7', padding: '2px 4px', borderRadius: '3px' }}>
                        {v.youtubePlaylistId || v.youtubeVideoId || '—'}
                      </code>
                    </td>
                    <td>
                      <span
                        className={styles.regBadge}
                        style={{
                          background: v.verificationStatus === 'VERIFIED' ? '#D1FAE5' : '#FEE2E2',
                          color: v.verificationStatus === 'VERIFIED' ? '#065F46' : '#991B1B',
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
          <div style={{ padding: '10px 16px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#718096' }}>
            Showing top 20 of {videoList.length} filtered video lecture series.
          </div>
        </div>
      )}

      {/* Tab: Images */}
      {activeTab === 'images' && (
        <div style={{ background: '#FFFFFF', padding: 'var(--space-6)', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A202C', marginBottom: '8px' }}>
            Archival &amp; Editorial Image Assets
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
            Images are securely served from the canonical <code>/public/images/vmission/</code> directory.
            All Acharya portraits, temple views, and publications covers are locked to prevent accidental deletion of historical records.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Guruji Portrait (Riverside)', path: '/images/vmission/acharyas/guruji-portrait-riverside.jpg' },
              { title: 'Swamini Amitanandaji', path: '/images/vmission/acharyas/swamini-amitananda.jpg' },
              { title: 'Swamini Samatanandaji', path: '/images/vmission/acharyas/swamini-samatananda.jpg' },
              { title: 'Swamini Poornanandaji', path: '/images/vmission/acharyas/swamini-poornananda.jpg' },
              { title: 'Vedanta Sandesh Cover', path: '/images/vmission/publications/vedanta-sandesh-cover.svg' },
              { title: 'Vedanta Piyush Cover', path: '/images/vmission/publications/vedanta-piyush-cover.svg' },
            ].map((img) => (
              <div key={img.path} style={{ border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden', background: '#F8FAFC' }}>
                <div style={{ height: '110px', background: '#EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#718096' }}>
                  <span>{img.title}</span>
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1A202C' }}>{img.title}</p>
                  <code style={{ fontSize: '0.625rem', color: '#A0AEC0', wordBreak: 'break-all' }}>{img.path}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div style={{
        padding: 'var(--space-4) var(--space-5)',
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '8px',
        fontSize: '0.8125rem',
        color: '#1E40AF',
        lineHeight: 1.5,
      }}>
        🛡️ <strong>Archival Preservation Protocol:</strong> This interface is an editorial index. Deletion and modification operations do not delete original historical audio, video, or image files stored on cloud storage or the static asset repository.
      </div>
    </div>
  );
}
