'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { Teaching, TeachingFormat, TeachingLanguage } from '@/data/teachings';
import styles from '../events/eventsAdmin.module.css';

export default function AdminTeachingsPage() {
  const { teachings, addTeaching, updateTeaching, deleteTeaching } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [scripture, setScripture] = useState('Bhagavad Gita');
  const [teacher, setTeacher] = useState('Poojya Swami Atmananda Saraswati');
  const [format, setFormat] = useState<TeachingFormat>('Audio');
  const [topic, setTopic] = useState('Bhagavad Gita');
  const [language, setLanguage] = useState<TeachingLanguage>('Hindi');
  const [duration, setDuration] = useState('48 mins');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState('/audio/demo-discourse.mp3');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setScripture('Bhagavad Gita');
    setTeacher('Poojya Swami Atmananda Saraswati');
    setFormat('Audio');
    setTopic('Bhagavad Gita');
    setLanguage('Hindi');
    setDuration('45 mins');
    setDescription('');
    setSrc('/audio/demo-discourse.mp3');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teaching) => {
    setEditingId(t.id);
    setTitle(t.title);
    setScripture(t.scripture);
    setTeacher(t.teacher);
    setFormat(t.format);
    setTopic(t.topic);
    setLanguage(t.language);
    setDuration(t.duration || '');
    setDescription(t.description);
    setSrc(t.src || '/audio/demo-discourse.mp3');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a discourse title.', 'error');
      return;
    }

    if (editingId) {
      updateTeaching(editingId, {
        title,
        scripture,
        teacher,
        format,
        topic,
        language,
        duration,
        description,
        src,
      });
      showToast(`Teaching "${title}" updated!`, 'success');
    } else {
      addTeaching({
        title,
        scripture,
        teacher,
        format,
        topic,
        language,
        duration,
        description,
        src,
      });
      showToast(`New teaching "${title}" published live!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, teachingTitle: string) => {
    if (confirm(`Remove "${teachingTitle}" from public library?`)) {
      deleteTeaching(id);
      showToast(`Discourse removed.`, 'info');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Teachings &amp; Audio-Video Library</h1>
          <p className={styles.subtitle}>
            Manage and publish discourses, scriptural commentaries, and PDF study guides.
          </p>
        </div>
        <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
          + Upload / Publish Discourse
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Discourse Title</th>
                <th>Topic / Scripture</th>
                <th>Teacher</th>
                <th>Format</th>
                <th>Language</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachings.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.title}</strong>
                    <span className={styles.tdSub}>{t.description.slice(0, 60)}...</span>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{t.topic}</span>
                  </td>
                  <td>{t.teacher}</td>
                  <td>
                    <span className={styles.regBadge} style={{ background: '#E0F2FE', color: '#0369A1' }}>
                      {t.format}
                    </span>
                  </td>
                  <td>{t.language}</td>
                  <td>{t.duration || '—'}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => handleOpenEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={() => handleDelete(t.id, t.title)}
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
              <h3>{editingId ? 'Edit Discourse' : 'Publish New Discourse'}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className="form-field">
                <label className="form-label">Discourse Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Taittiriya Upanishad — Bhrigu Valli Discourse 1"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label">Topic</label>
                  <select
                    className="form-select"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option value="Bhagavad Gita">Bhagavad Gita</option>
                    <option value="Upanishads">Upanishads</option>
                    <option value="Prakarana Granth">Prakarana Granth</option>
                    <option value="Devotion & Stotram">Devotion &amp; Stotram</option>
                    <option value="Meditation">Meditation</option>
                  </select>
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
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.btnSave}>Publish to Live Library →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
