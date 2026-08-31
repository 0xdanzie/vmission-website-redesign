'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Course } from '@/data/courses';
import styles from '../events/eventsAdmin.module.css';

export default function AdminCoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [format, setFormat] = useState<'Online' | 'Residential' | 'Camp' | 'Study Group'>('Online');
  const [duration, setDuration] = useState('40 Lessons (Self-paced)');
  const [teacher, setTeacher] = useState('Poojya Swami Atmananda Saraswati');
  const [eligibility, setEligibility] = useState('Open to all sincere seekers');
  const [fee, setFee] = useState('Free / Voluntary Contribution');
  const [description, setDescription] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('Introductory Treatise on Advaita Vedanta');
    setFormat('Online');
    setDuration('40 Lessons (Self-paced)');
    setTeacher('Poojya Swami Atmananda Saraswati');
    setEligibility('Open to all sincere seekers');
    setFee('Free / Voluntary Contribution');
    setDescription('');
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
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a course title.', 'error');
      return;
    }

    if (editingId) {
      updateCourse(editingId, {
        title,
        subtitle,
        format,
        duration,
        teacher,
        eligibility,
        fee,
        description,
      });
      showToast(`Course "${title}" updated!`, 'success');
    } else {
      addCourse({
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
      });
      showToast(`New course "${title}" added!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, courseTitle: string) => {
    if (confirm(`Delete course "${courseTitle}"?`)) {
      deleteCourse(id);
      showToast(`Course "${courseTitle}" deleted.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Courses &amp; Study Programs</h1>
          <p className={styles.subtitle}>
            Manage online correspondence courses, residential Gita modules, and local study circles.
          </p>
        </div>
        <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
          + Add New Course
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Format</th>
                <th>Teacher</th>
                <th>Duration</th>
                <th>Fee Structure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.title}</strong>
                    <span className={styles.tdSub}>{c.subtitle}</span>
                  </td>
                  <td>
                    <span className={styles.regBadge} style={{ background: '#FAF0EB', color: '#9E381C' }}>
                      {c.format}
                    </span>
                  </td>
                  <td>{c.teacher}</td>
                  <td>{c.duration}</td>
                  <td>{c.fee}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => handleOpenEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={() => handleDelete(c.id, c.title)}
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
              <h3>{editingId ? 'Edit Course' : 'Create Course Program'}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>
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
                <label className="form-label">Subtitle</label>
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
                    <option value="Online">Online</option>
                    <option value="Residential">Residential</option>
                    <option value="Camp">Camp</option>
                    <option value="Study Group">Study Group</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.btnSave}>Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
