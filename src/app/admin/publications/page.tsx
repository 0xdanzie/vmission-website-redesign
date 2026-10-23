'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Publication, PublicationType, PublicationLanguage } from '@/data/publications';
import {
  PlusIcon,
  RefreshIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
} from '@/components/admin/AdminIcons';
import styles from '../events/eventsAdmin.module.css';

export default function AdminPublicationsPage() {
  const { publications, addPublication, updatePublication, deletePublication, refreshPublications, isLoadingPublications } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const [title, setTitle] = useState('');
  const [type, setType] = useState<PublicationType>('Vedanta Sandesh');
  const [month, setMonth] = useState('September');
  const [year, setYear] = useState(2026);
  const [language, setLanguage] = useState<PublicationLanguage>('English / Hindi');
  const [pageCount, setPageCount] = useState(36);
  const [isLatest, setIsLatest] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState('#');
  const [coverImage, setCoverImage] = useState('/images/vmission/publications/vedanta-sandesh-cover.svg');
  const [isPublished, setIsPublished] = useState(true);

  const filteredPublications = publications.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.month && p.month.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.year && p.year.toString().includes(searchTerm));
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('Vedanta Sandesh — September 2026 Issue');
    setType('Vedanta Sandesh');
    setMonth('September');
    setYear(2026);
    setLanguage('English / Hindi');
    setPageCount(36);
    setIsLatest(true);
    setDownloadUrl('#');
    setCoverImage('/images/vmission/publications/vedanta-sandesh-cover.svg');
    setIsPublished(false); // Default new issues to draft
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Publication) => {
    setEditingId(p.id);
    setTitle(p.title);
    setType(p.type);
    setMonth(p.month || 'January');
    setYear(p.year || 2026);
    setLanguage(p.language);
    setPageCount(p.pageCount || 36);
    setIsLatest(!!p.isLatest);
    setDownloadUrl(p.downloadUrl || '#');
    setCoverImage(p.coverImage || '');
    setIsPublished(p.is_published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an issue title.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await updatePublication(editingId, {
          title,
          type,
          month,
          year,
          language,
          pageCount,
          isLatest,
          downloadUrl,
          coverImage,
          is_published: isPublished,
        });
        showToast(`Publication "${title}" updated successfully!`, 'success');
      } else {
        await addPublication({
          title,
          type,
          month,
          year,
          language,
          pageCount,
          isLatest,
          description: `Monthly issue of ${type} containing scriptural reflections and ashram updates.`,
          coverImage: coverImage || (type === 'Vedanta Sandesh' ? '/images/vmission/publications/vedanta-sandesh-cover.svg' : '/images/vmission/publications/vedanta-piyush-cover.svg'),
          downloadUrl,
          archiveUrl: '#',
          is_published: isPublished,
        });
        showToast(
          isPublished
            ? `New issue "${title}" published live!`
            : `New issue "${title}" saved as draft.`,
          'success'
        );
      }
      setIsModalOpen(false);
    } catch {
      showToast('Error saving publication record.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (p: Publication) => {
    const nextState = !p.is_published;
    await updatePublication(p.id, { is_published: nextState });
    showToast(
      nextState
        ? `Publication "${p.title}" is now published live!`
        : `Publication "${p.title}" reverted to draft.`,
      'success'
    );
  };

  const handleDelete = async (id: string, pubTitle: string) => {
    if (confirm(`Are you sure you want to remove issue "${pubTitle}" from the digital publications archive?`)) {
      await deletePublication(id);
      showToast(`Publication removed successfully.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Publications &amp; E-Journals Archive</h1>
          <p className={styles.subtitle}>
            Publish and catalog monthly digital editions of Vedanta Sandesh, Vedanta Piyush, and archival scriptural e-books.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshPublications()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingPublications ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
            <PlusIcon size={14} />
            <span>Publish New Issue</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
      }}>
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '240px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ position: 'absolute', left: '12px', color: 'var(--vm-text-faint, #8E847A)' }}>
            <SearchIcon size={15} />
          </span>
          <input
            type="search"
            placeholder="Search issues by title, month, or year…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="pub-type-filter" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vm-text-muted, #665D55)' }}>
            Publication:
          </label>
          <select
            id="pub-type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              background: '#FFFFFF',
            }}
          >
            <option value="all">All Periodicals ({publications.length})</option>
            <option value="Vedanta Sandesh">Vedanta Sandesh</option>
            <option value="Vedanta Piyush">Vedanta Piyush</option>
            <option value="Book">Special E-Books</option>
          </select>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Issue Title &amp; Journal</th>
                <th>Period</th>
                <th>Language</th>
                <th>Length</th>
                <th>Archival Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching publication issues found</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm || filterType !== 'all'
                          ? 'Try adjusting your search query or periodical filter.'
                          : 'No publication issues registered yet. Click "+ Publish New Issue" to create one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPublications.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(p)}
                        className={styles.statusToggle}
                        style={{
                          background: p.is_published ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: p.is_published ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${p.is_published ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                        title="Click to toggle Draft / Published"
                      >
                        {p.is_published ? <CheckIcon size={12} /> : <ClockIcon size={12} />}
                        <span>{p.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{p.title}</strong>
                      <span className={styles.categoryBadge}>{p.type}</span>
                    </td>
                    <td>
                      <span className={styles.dateText}>{p.month} {p.year}</span>
                    </td>
                    <td>{p.language}</td>
                    <td>{p.pageCount ? `${p.pageCount} pp` : '—'}</td>
                    <td>
                      {p.isLatest ? (
                        <span className={styles.regBadge} style={{
                          background: 'var(--vm-forest-light, #EAF2EC)',
                          color: 'var(--vm-forest, #2D4F38)',
                          border: '1px solid rgba(45, 79, 56, 0.25)',
                        }}>
                          Current Issue
                        </span>
                      ) : (
                        <span className={styles.regBadge} style={{
                          background: 'var(--vm-sand, #FAF6EE)',
                          color: 'var(--vm-text-muted, #665D55)',
                          border: '1px solid var(--vm-sand-border, #DFD7C7)',
                        }}>
                          Archive
                        </span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => handleOpenEdit(p)}
                          title={`Edit ${p.title}`}
                        >
                          <EditIcon size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(p.id, p.title)}
                          title={`Delete ${p.title}`}
                        >
                          <TrashIcon size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Publication Issue' : 'Publish Monthly Issue'}</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <CloseIcon size={16} />
              </button>
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
                  placeholder="e.g. Vedanta Sandesh — October 2026 Issue"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Publication Journal</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                  >
                    <option value="Vedanta Sandesh">Vedanta Sandesh (English / Hindi)</option>
                    <option value="Vedanta Piyush">Vedanta Piyush (Hindi / Gujarati)</option>
                    <option value="Special Edition">Special Edition</option>
                    <option value="Book">Monograph / E-Book</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                  >
                    <option value="English / Hindi">English / Hindi</option>
                    <option value="Hindi / Gujarati">Hindi / Gujarati</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Sanskrit">Sanskrit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Issue Month</label>
                  <select
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Issue Year</label>
                  <input
                    type="number"
                    className="form-input"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value, 10) || 2026)}
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
                    onChange={(e) => setPageCount(parseInt(e.target.value, 10) || 36)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">PDF Download URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://.../issue.pdf"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Cover Artwork Path</label>
                <input
                  type="text"
                  className="form-input"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/images/vmission/publications/vedanta-sandesh-cover.svg"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <input
                    type="checkbox"
                    checked={isLatest}
                    onChange={(e) => setIsLatest(e.target.checked)}
                    style={{ accentColor: 'var(--vm-bhagwa, #E06328)' }}
                  />
                  <span>Mark as Current / Featured Issue</span>
                </label>
              </div>

              {/* Publication Status Toggle */}
              <div style={{
                background: isPublished ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                border: `1px solid ${isPublished ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '4px',
              }}>
                <input
                  type="checkbox"
                  id="pub-publish-checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--vm-bhagwa, #E06328)', cursor: 'pointer' }}
                />
                <label htmlFor="pub-publish-checkbox" style={{ cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Publish live to public website</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                    {isPublished
                      ? 'This issue will be immediately downloadable on /publications.'
                      : 'Draft mode: Only authenticated staff can preview this issue.'}
                  </p>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Saving to Database…' : editingId ? 'Update Issue' : isPublished ? 'Publish Live' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
