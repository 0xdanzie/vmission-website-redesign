'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Course } from '@/data/courses';
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

export default function AdminCoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse, refreshCourses, isLoadingCourses } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [format, setFormat] = useState<'Online' | 'Residential' | 'Camp' | 'Study Group'>('Online');
  const [duration, setDuration] = useState('40 Lessons (Self-paced)');
  const [teacher, setTeacher] = useState('Poojya Swami Atmananda Saraswati');
  const [eligibility, setEligibility] = useState('Open to all sincere seekers');
  const [fee, setFee] = useState('Free / Voluntary Contribution');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('Introductory Treatise on Advaita Vedanta');
    setFormat('Online');
    setDuration('40 Lessons (Self-paced)');
    setTeacher('Swami Atmananda Saraswati');
    setEligibility('Open to all sincere seekers');
    setFee('Free / Voluntary Contribution');
    setDescription('');
    setIsPublished(false); // Default to draft for new entries
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingId(c.id);
    setTitle(c.title);
    setSubtitle(c.subtitle);
    setFormat(c.format);
    setDuration(c.duration);
    setTeacher(c.teacher);
    setEligibility(c.eligibility);
    setFee(c.fee);
    setDescription(c.description);
    setIsPublished(c.is_published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a course title.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await updateCourse(editingId, {
          title,
          subtitle,
          format,
          duration,
          teacher,
          eligibility,
          fee,
          description,
          is_published: isPublished,
        });
        showToast(`Course "${title}" updated successfully!`, 'success');
      } else {
        await addCourse({
          title,
          subtitle,
          format,
          duration,
          teacher,
          eligibility,
          fee,
          description,
          structure: '40 Lessons with questionnaire evaluations',
          whatYouLearn: [
            'Foundational scriptural terminology and definitions',
            'Methods of discrimination (Atma-Anatma Viveka)',
            'Daily reflection and self-inquiry guidance',
          ],
          is_published: isPublished,
        });
        showToast(
          isPublished
            ? `New course "${title}" published live!`
            : `New course "${title}" saved as draft.`,
          'success'
        );
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save course record.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (c: Course) => {
    const nextState = !c.is_published;
    await updateCourse(c.id, { is_published: nextState });
    showToast(
      nextState
        ? `Course "${c.title}" is now published live!`
        : `Course "${c.title}" reverted to draft.`,
      'success'
    );
  };

  const handleDelete = async (id: string, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete course "${courseTitle}"? This will remove the curriculum from seeker view.`)) {
      await deleteCourse(id);
      showToast(`Course "${courseTitle}" deleted.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gurukula Courses &amp; Curriculum</h1>
          <p className={styles.subtitle}>
            Manage online correspondence lessons, residential Gita study modules, and scriptural foundations.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshCourses()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingCourses ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
            <PlusIcon size={14} />
            <span>Add New Course</span>
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
          placeholder="Search courses by title, subtitle, or teacher…"
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
                <th>Course Name &amp; Description</th>
                <th>Format</th>
                <th>Teacher</th>
                <th>Duration</th>
                <th>Fee Structure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No courses found</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm
                          ? 'No courses matched your search term.'
                          : 'No courses registered yet. Click "+ Add New Course" to create the first curriculum module.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCourses.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(c)}
                        className={styles.statusToggle}
                        style={{
                          background: c.is_published ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: c.is_published ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${c.is_published ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                        title="Click to toggle Draft / Published"
                      >
                        {c.is_published ? <CheckIcon size={12} /> : <ClockIcon size={12} />}
                        <span>{c.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{c.title}</strong>
                      <span className={styles.tdSub}>{c.subtitle}</span>
                    </td>
                    <td>
                      <span className={styles.regBadge} style={{
                        background: 'var(--vm-bhagwa-subtle, rgba(224, 99, 40, 0.08))',
                        color: 'var(--vm-gerua, #C84E17)',
                        border: '1px solid rgba(224, 99, 40, 0.2)',
                      }}>
                        {c.format}
                      </span>
                    </td>
                    <td>{c.teacher}</td>
                    <td>{c.duration}</td>
                    <td>
                      <span style={{ fontSize: '0.78125rem', color: 'var(--vm-text-muted, #665D55)' }}>
                        {c.fee}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => handleOpenEdit(c)}
                          title={`Edit ${c.title}`}
                        >
                          <EditIcon size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(c.id, c.title)}
                          title={`Delete ${c.title}`}
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
              <h3>{editingId ? 'Edit Course Curriculum' : 'Create Course Curriculum'}</h3>
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
                <label className="form-label">Course Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mandukya Upanishad & Karika"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Subtitle / Focus Area</label>
                <input
                  type="text"
                  className="form-input"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Inquiry into the Three States of Consciousness"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Format</label>
                  <select
                    className="form-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                  >
                    <option value="Online">Online / Self-Paced</option>
                    <option value="Residential">Residential Gurukula</option>
                    <option value="Camp">Study Camp</option>
                    <option value="Study Group">Local Study Group</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 40 Lessons (Self-paced)"
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Teacher / Acharya</label>
                  <input
                    type="text"
                    className="form-input"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Fee / Contribution</label>
                  <input
                    type="text"
                    className="form-input"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Description &amp; Syllabus Overview</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize course goals, preparatory texts, and study methodology..."
                />
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
                  id="course-publish-checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--vm-bhagwa, #E06328)', cursor: 'pointer' }}
                />
                <label htmlFor="course-publish-checkbox" style={{ cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Publish live to public website</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                    {isPublished
                      ? 'Course details and enrollment registration will be live on /learn.'
                      : 'Draft mode: Only authenticated staff can preview this course curriculum.'}
                  </p>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Saving to Database…' : editingId ? 'Update Course' : isPublished ? 'Publish Live' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
