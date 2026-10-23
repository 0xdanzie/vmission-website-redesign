'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Acharya } from '@/data/acharyas';
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

export default function AdminAcharyasPage() {
  const { acharyas, addAcharya, updateAcharya, deleteAcharya, refreshAcharyas, isLoadingAcharyas } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [honorific, setHonorific] = useState('');
  const [role, setRole] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [fullBio, setFullBio] = useState('');
  const [lineage, setLineage] = useState('');
  const [image, setImage] = useState('/images/vmission/acharyas/guruji-portrait-riverside.jpg');
  const [teachingsInput, setTeachingsInput] = useState('');
  const [isFounder, setIsFounder] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const filteredAcharyas = acharyas.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.honorific && a.honorific.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingSlug(null);
    setName('');
    setSlug('');
    setHonorific('Poojya');
    setRole('Resident Acharya');
    setShortBio('');
    setFullBio('');
    setLineage('Adi Shankaracharya Tradition · Dashanami Saraswati Order');
    setImage('/images/vmission/acharyas/guruji-portrait-riverside.jpg');
    setTeachingsInput('Bhagavad Gita, Upanishads');
    setIsFounder(false);
    setIsPublished(false); // New entries default to draft
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: Acharya) => {
    setEditingSlug(a.slug);
    setName(a.name);
    setSlug(a.slug);
    setHonorific(a.honorific || '');
    setRole(a.role);
    setShortBio(a.shortBio);
    setFullBio(a.fullBio);
    setLineage(a.lineage);
    setImage(a.image);
    setTeachingsInput(a.teachings.join(', '));
    setIsFounder(!!a.isFounder);
    setIsPublished(a.is_published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide an Acharya name.', 'error');
      return;
    }

    setIsSaving(true);
    const teachingsList = teachingsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingSlug) {
        await updateAcharya(editingSlug, {
          name,
          honorific,
          role,
          shortBio,
          fullBio,
          lineage,
          image,
          teachings: teachingsList,
          isFounder,
          is_published: isPublished,
        });
        showToast(`Acharya profile "${name}" updated successfully!`, 'success');
      } else {
        const rawSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
        await addAcharya({
          slug: rawSlug,
          name,
          honorific,
          role,
          shortBio,
          fullBio,
          lineage,
          image,
          teachings: teachingsList,
          relatedAudio: [],
          programs: [],
          isFounder,
          milestones: [],
          verificationState: 'SUMMARY-VERIFIED',
          is_published: isPublished,
        });
        showToast(
          isPublished
            ? `New Acharya profile "${name}" published live!`
            : `New Acharya profile "${name}" saved as draft.`,
          'success'
        );
      }
      setIsModalOpen(false);
    } catch {
      showToast('Error saving Acharya profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (a: Acharya) => {
    const nextState = !a.is_published;
    await updateAcharya(a.slug, { is_published: nextState });
    showToast(
      nextState
        ? `Acharya profile "${a.name}" is now published live!`
        : `Acharya profile "${a.name}" reverted to draft.`,
      'success'
    );
  };

  const handleDelete = async (slugToDelete: string, acharyaName: string) => {
    if (confirm(`Are you sure you want to remove the profile for "${acharyaName}"? This action will remove the biography from the public lineage directory.`)) {
      await deleteAcharya(slugToDelete);
      showToast(`Acharya profile "${acharyaName}" removed.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Acharyas &amp; Monastic Lineage Directory</h1>
          <p className={styles.subtitle}>
            Manage authoritative biographical profiles, spiritual lineage records, and teaching specializations.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshAcharyas()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingAcharyas ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
            <PlusIcon size={14} />
            <span>Add Acharya Profile</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        background: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid var(--vm-sand-border, #DFD7C7)',
        maxWidth: '480px',
      }}>
        <span style={{ color: 'var(--vm-text-faint, #8E847A)' }}>
          <SearchIcon size={15} />
        </span>
        <input
          type="search"
          placeholder="Search Acharyas by name, honorific, or role…"
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

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Acharya Name &amp; Portrait</th>
                <th>Role &amp; Title</th>
                <th>Monastic Lineage</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAcharyas.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching Acharyas found</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm
                          ? 'No profiles matched your search term.'
                          : 'No Acharya profiles registered. Click "+ Add Acharya Profile" to create one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAcharyas.map((a) => (
                  <tr key={a.slug}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(a)}
                        className={styles.statusToggle}
                        style={{
                          background: a.is_published ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: a.is_published ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${a.is_published ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                        title="Click to toggle Draft / Published"
                      >
                        {a.is_published ? <CheckIcon size={12} /> : <ClockIcon size={12} />}
                        <span>{a.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          background: 'var(--vm-sand, #FAF6EE)',
                          border: '1px solid var(--vm-sand-border, #DFD7C7)',
                          position: 'relative',
                          flexShrink: 0,
                        }}>
                          {a.image ? (
                            <Image
                              src={a.image}
                              alt={a.name}
                              width={36}
                              height={36}
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--vm-bhagwa)' }}>
                              {a.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{a.name}</strong>
                          <span className={styles.tdSub}>
                            {a.honorific} {a.isFounder ? '· Founder' : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>{a.role}</span>
                    </td>
                    <td style={{ maxWidth: '280px', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)', lineHeight: 1.4 }}>
                      {a.lineage}
                    </td>
                    <td>
                      <span
                        className={styles.regBadge}
                        style={{
                          background: a.verificationState === 'SOURCE-VERIFIED' ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: a.verificationState === 'SOURCE-VERIFIED' ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${a.verificationState === 'SOURCE-VERIFIED' ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                      >
                        {a.verificationState}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => handleOpenEdit(a)}
                          title={`Edit ${a.name}`}
                        >
                          <EditIcon size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(a.slug, a.name)}
                          title={`Delete ${a.name}`}
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

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className={styles.modalHeader}>
              <h3>{editingSlug ? 'Edit Acharya Profile' : 'Add New Acharya Profile'}</h3>
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
                <label className="form-label">Full Monastic Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Swami Atmananda Saraswati"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Honorific Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={honorific}
                    onChange={(e) => setHonorific(e.target.value)}
                    placeholder="e.g. Poojya Guruji"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">URL Slug *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingSlug}
                    className="form-input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. swami-atmananda-saraswati"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Role &amp; Responsibilities *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Founder & Head Acharya — Vedanta Mission"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Monastic Lineage *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={lineage}
                  onChange={(e) => setLineage(e.target.value)}
                  placeholder="e.g. Adi Shankaracharya Tradition · Dashanami Saraswati Order"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Portrait Image Path *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/vmission/acharyas/guruji-portrait-riverside.jpg"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Core Teachings &amp; Specialization (comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={teachingsInput}
                  onChange={(e) => setTeachingsInput(e.target.value)}
                  placeholder="Bhagavad Gita, Principal Upanishads, Atma-bodha"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Short Biography (Summary) *</label>
                <textarea
                  required
                  className="form-textarea"
                  rows={2}
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  placeholder="Brief synopsis for directory cards..."
                />
              </div>

              <div className="form-field">
                <label className="form-label">Comprehensive Biography *</label>
                <textarea
                  required
                  className="form-textarea"
                  rows={4}
                  value={fullBio}
                  onChange={(e) => setFullBio(e.target.value)}
                  placeholder="Full biographical profile and milestones..."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <input
                    type="checkbox"
                    checked={isFounder}
                    onChange={(e) => setIsFounder(e.target.checked)}
                    style={{ accentColor: 'var(--vm-bhagwa, #E06328)' }}
                  />
                  <span style={{ color: 'var(--vm-text, #221D1A)' }}>Mark as Founder of Vedanta Mission</span>
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
                  id="acharya-publish-checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--vm-bhagwa, #E06328)', cursor: 'pointer' }}
                />
                <label htmlFor="acharya-publish-checkbox" style={{ cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Publish live to public website</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                    {isPublished
                      ? 'Acharya profile will be publicly accessible on /acharyas and /acharyas/[slug].'
                      : 'Draft mode: Only authenticated staff can preview this profile.'}
                  </p>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Saving to Database…' : editingSlug ? 'Update Profile' : isPublished ? 'Publish Live' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
