'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Publication, PublicationType } from '@/data/publications';
import styles from '../events/eventsAdmin.module.css';

export default function AdminPublicationsPage() {
  const { publications, addPublication, updatePublication, deletePublication } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<PublicationType>('Vedanta Sandesh');
  const [month, setMonth] = useState('September');
  const [year, setYear] = useState(2026);
  const [language, setLanguage] = useState('English / Hindi');
  const [pageCount, setPageCount] = useState(36);
  const [isLatest, setIsLatest] = useState(true);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('Vedanta Sandesh — September 2026 Issue');
    setType('Vedanta Sandesh');
    setMonth('September');
    setYear(2026);
    setLanguage('English / Hindi');
    setPageCount(36);
    setIsLatest(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Publication) => {
    setEditingId(p.id);
    setTitle(p.title);
    setType(p.type);
    setMonth(p.month);
    setYear(p.year);
    setLanguage(p.language);
    setPageCount(p.pageCount || 36);
    setIsLatest(!!p.isLatest);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an issue title.', 'error');
      return;
    }

    if (editingId) {
      updatePublication(editingId, {
        title,
        type,
        month,
        year,
        language,
        pageCount,
        isLatest,
      });
      showToast(`Publication "${title}" updated!`, 'success');
    } else {
      addPublication({
        title,
        type,
        month,
        year,
        language,
        pageCount,
        isLatest,
        description: `Monthly issue of ${type} containing scriptural reflections and ashram updates.`,
        coverImage: type === 'Vedanta Sandesh' ? '/images/vmission/publications/vedanta-sandesh-jan21.jpg' : '/images/vmission/publications/vedanta-piyush-cover.svg',
        downloadUrl: '#',
        archiveUrl: '#',
      });
      showToast(`New issue "${title}" added to archive!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, pubTitle: string) => {
    if (confirm(`Remove issue "${pubTitle}" from publications archive?`)) {
      deletePublication(id);
      showToast(`Publication removed.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Publications &amp; E-Magazines Archive</h1>
          <p className={styles.subtitle}>
            Publish monthly issues of Vedanta Sandesh and Vedanta Piyush for global readers.
          </p>
        </div>
        <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
          + Upload New Monthly Issue
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Issue Title &amp; Publication</th>
                <th>Month &amp; Year</th>
                <th>Language</th>
                <th>Pages</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.title}</strong>
                    <span className={styles.categoryBadge}>{p.type}</span>
                  </td>
                  <td>
                    <strong>{p.month} {p.year}</strong>
                  </td>
                  <td>{p.language}</td>
                  <td>{p.pageCount} pp</td>
                  <td>
                    {p.isLatest ? (
                      <span className={styles.regBadge} style={{ background: '#D1FAE5', color: '#065F46' }}>
                        Latest Issue
                      </span>
                    ) : (
                      <span className={styles.regBadge} style={{ background: '#F1F5F9', color: '#64748B' }}>
                        Archived
                      </span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => handleOpenEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={() => handleDelete(p.id, p.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Issue' : 'Publish Monthly Issue'}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className="form-field">
                <label className="form-label">Issue Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Publication</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                  >
                    <option value="Vedanta Sandesh">Vedanta Sandesh</option>
                    <option value="Vedanta Piyush">Vedanta Piyush</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Language</label>
                  <input
                    type="text"
                    className="form-input"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Month</label>
                  <select
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-input"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Page Count</label>
                  <input
                    type="number"
                    className="form-input"
                    value={pageCount}
                    onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                  />
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', paddingTop: '28px' }}>
                  <input
                    type="checkbox"
                    id="is-latest"
                    checked={isLatest}
                    onChange={(e) => setIsLatest(e.target.checked)}
                  />
                  <label htmlFor="is-latest" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Mark as Current / Latest Issue</label>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.btnSave}>Save Publication</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
