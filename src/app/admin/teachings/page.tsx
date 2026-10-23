'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Teaching, TeachingFormat, TeachingLanguage, CANONICAL_CATEGORIES, CanonicalCategorySlug } from '@/data/teachings';
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

export default function AdminTeachingsPage() {
  const { teachings, addTeaching, updateTeaching, deleteTeaching, refreshTeachings, isLoadingTeachings } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [scripture, setScripture] = useState('Bhagavad Gita');
  const [teacher, setTeacher] = useState('Poojya Swami Atmananda Saraswati');
  const [format, setFormat] = useState<TeachingFormat>('Audio');
  const [topic, setTopic] = useState('Bhagavad Gita');
  const [category, setCategory] = useState<CanonicalCategorySlug>('bhagavad-gita');
  const [language, setLanguage] = useState<TeachingLanguage>('Hindi');
  const [duration, setDuration] = useState('48 mins');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState('/audio/demo-discourse.mp3');
  const [audioUrl, setAudioUrl] = useState('');
  const [youtubePlaylistId, setYoutubePlaylistId] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const filteredTeachings = teachings.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.scripture.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedFilterCategory === 'all' || t.category === selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setScripture('Bhagavad Gita');
    setTeacher('Swami Atmananda Saraswati');
    setFormat('Audio');
    setTopic('Bhagavad Gita');
    setCategory('bhagavad-gita');
    setLanguage('Hindi');
    setDuration('45 mins');
    setDescription('');
    setSrc('/audio/demo-discourse.mp3');
    setAudioUrl('');
    setYoutubePlaylistId('');
    setYoutubeVideoId('');
    setIsPublished(false); // Default new teachings to draft
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teaching) => {
    setEditingId(t.id);
    setTitle(t.title);
    setSlug(t.slug || t.id);
    setScripture(t.scripture);
    setTeacher(t.teacher);
    setFormat(t.format);
    setTopic(t.topic);
    setCategory((t.category as CanonicalCategorySlug) || 'prakarana-granth');
    setLanguage(t.language);
    setDuration(t.duration || '');
    setDescription(t.description);
    setSrc(t.src || '/audio/demo-discourse.mp3');
    setAudioUrl(t.audioUrl || '');
    setYoutubePlaylistId(t.youtubePlaylistId || '');
    setYoutubeVideoId(t.youtubeVideoId || '');
    setIsPublished(t.is_published ?? true);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (t: Teaching) => {
    const nextState = !t.is_published;
    try {
      await updateTeaching(t.id, { is_published: nextState });
      showToast(
        nextState
          ? `Discourse "${t.title}" is now published live!`
          : `Discourse "${t.title}" reverted to draft.`,
        'success'
      );
    } catch {
      showToast('Failed to update publication status.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a discourse title.', 'error');
      return;
    }

    const resolvedSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
        .slice(0, 60);

    const categoryObj = CANONICAL_CATEGORIES.find((c) => c.id === category);

    setIsSaving(true);
    try {
      if (editingId) {
        await updateTeaching(editingId, {
          title,
          slug: resolvedSlug,
          scripture,
          teacher,
          format,
          topic,
          category,
          categoryName: categoryObj ? categoryObj.name : topic,
          language,
          duration,
          description,
          src,
          audioUrl,
          youtubePlaylistId,
          youtubeVideoId,
          is_published: isPublished,
        });
        showToast(`Discourse "${title}" updated successfully!`, 'success');
      } else {
        await addTeaching({
          title,
          slug: resolvedSlug,
          scripture,
          teacher,
          format,
          topic,
          category,
          categoryName: categoryObj ? categoryObj.name : topic,
          language,
          duration,
          description,
          src,
          audioUrl,
          youtubePlaylistId,
          youtubeVideoId,
          is_published: isPublished,
        });
        showToast(
          isPublished
            ? `New discourse "${title}" published live!`
            : `New discourse "${title}" saved as draft.`,
          'success'
        );
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, teachingTitle: string) => {
    if (confirm(`Are you sure you want to delete discourse "${teachingTitle}" from the library? This operation cannot be undone.`)) {
      try {
        await deleteTeaching(id);
        showToast(`Discourse removed successfully.`, 'info');
      } catch {
        showToast('Failed to delete teaching.', 'error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Teachings &amp; Jnana Ganga Library</h1>
          <p className={styles.subtitle}>
            Live editorial control for scriptural discourses, Upanishadic series, audio recordings, and video lectures.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshTeachings()}
            title="Reload from PostgreSQL database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingTeachings ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
            <PlusIcon size={14} />
            <span>Create New Discourse</span>
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
            placeholder="Search discourses by title, scripture, or teacher…"
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
          <label htmlFor="category-filter" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vm-text-muted, #665D55)' }}>
            Category:
          </label>
          <select
            id="category-filter"
            value={selectedFilterCategory}
            onChange={(e) => setSelectedFilterCategory(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              background: '#FFFFFF',
            }}
          >
            <option value="all">All Canonical Categories ({teachings.length})</option>
            {CANONICAL_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teachings Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Discourse Title</th>
                <th>Category</th>
                <th>Teacher</th>
                <th>Format</th>
                <th>Language</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingTeachings && teachings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--vm-text-muted)' }}>
                    Synchronizing discourses from database…
                  </td>
                </tr>
              ) : filteredTeachings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching discourses found</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm || selectedFilterCategory !== 'all'
                          ? 'Try adjusting your search criteria or category filter.'
                          : 'No discourses currently exist. Click "+ Create New Discourse" above to add the first one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTeachings.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong style={{ display: 'block', color: 'var(--vm-text, #221D1A)' }}>{t.title}</strong>
                      <span className={styles.tdSub}>
                        {t.scripture} · {t.slug ? `/${t.slug}` : t.id}
                      </span>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{t.categoryName || t.topic}</span>
                    </td>
                    <td>{t.teacher}</td>
                    <td>
                      <span className={styles.regBadge} style={{
                        background: 'var(--vm-bhagwa-subtle, rgba(224, 99, 40, 0.08))',
                        color: 'var(--vm-gerua, #C84E17)',
                        border: '1px solid rgba(224, 99, 40, 0.2)',
                      }}>
                        {t.format}
                      </span>
                    </td>
                    <td>{t.language}</td>
                    <td>{t.duration || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.statusToggle}
                        style={{
                          background: t.is_published ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: t.is_published ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${t.is_published ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                        onClick={() => handleTogglePublish(t)}
                        title="Click to toggle publish live or revert to draft"
                      >
                        {t.is_published ? <CheckIcon size={12} /> : <ClockIcon size={12} />}
                        <span>{t.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => handleOpenEdit(t)}
                          title={`Edit ${t.title}`}
                        >
                          <EditIcon size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(t.id, t.title)}
                          title={`Delete ${t.title}`}
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

      {/* Edit / Create Discourse Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Discourse' : 'Create New Discourse'}</h3>
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
                <label className="form-label">Discourse Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingId && !slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50));
                    }
                  }}
                  placeholder="e.g. Taittiriya Upanishad — Bhrigu Valli Discourse 1"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">URL Slug *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. taittiriya-upanishad-bhrigu-valli"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Canonical Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => {
                      const newCat = e.target.value as CanonicalCategorySlug;
                      setCategory(newCat);
                      const found = CANONICAL_CATEGORIES.find((c) => c.id === newCat);
                      if (found) setTopic(found.name);
                    }}
                  >
                    {CANONICAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Scripture / Text</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Format</label>
                  <select
                    className="form-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                  >
                    <option value="Audio">Audio Stream</option>
                    <option value="Video">Video Lecture</option>
                    <option value="PDF">PDF E-Book</option>
                  </select>
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Teacher / Speaker</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Sanskrit / Hindi">Sanskrit / Hindi</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Duration / Track Length</label>
                <input
                  type="text"
                  className="form-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 52 mins"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description / Summary</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief synopsis of the discourse topic and core themes..."
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Audio URL (MP3 / Stream)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://archive.org/.../track.mp3"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">YouTube Video / Playlist ID</label>
                  <input
                    type="text"
                    className="form-input"
                    value={youtubeVideoId || youtubePlaylistId}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.startsWith('PL')) {
                        setYoutubePlaylistId(val);
                        setYoutubeVideoId('');
                      } else {
                        setYoutubeVideoId(val);
                      }
                    }}
                    placeholder="e.g. DefzkQ0BAr0 or PL..."
                  />
                </div>
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
                  id="teaching-publish-checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--vm-bhagwa, #E06328)', cursor: 'pointer' }}
                />
                <label htmlFor="teaching-publish-checkbox" style={{ cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Publish live to public website</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                    {isPublished
                      ? 'This teaching is visible live on /teachings and /teachings/[slug].'
                      : 'Draft mode: Only authenticated staff can preview this discourse.'}
                  </p>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Saving to Database…' : editingId ? 'Update Discourse' : isPublished ? 'Publish Live' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
