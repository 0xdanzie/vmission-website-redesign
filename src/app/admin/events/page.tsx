'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { VMEvent } from '@/data/events';
import styles from './eventsAdmin.module.css';

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teacher, setTeacher] = useState('Poojya Swami Atmananda Saraswati');
  const [location, setLocation] = useState('Vedanta Ashram, Sudama Nagar');
  const [city, setCity] = useState('Indore');
  const [type, setType] = useState<VMEvent['type']>('Camp');
  const [description, setDescription] = useState('');
  const [registration, setRegistration] = useState<VMEvent['registration']>('open');
  const [fee, setFee] = useState('Voluntary Contribution (Bhiksha)');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setStartDate('2026-10-15');
    setEndDate('2026-10-18');
    setTeacher('Poojya Swami Atmananda Saraswati');
    setLocation('Vedanta Ashram, Sudama Nagar');
    setCity('Indore');
    setType('Camp');
    setDescription('');
    setRegistration('open');
    setFee('Voluntary Contribution (Bhiksha)');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: VMEvent) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setStartDate(evt.startDate);
    setEndDate(evt.endDate || '');
    setTeacher(evt.teacher);
    setLocation(evt.location);
    setCity(evt.city);
    setType(evt.type);
    setDescription(evt.description);
    setRegistration(evt.registration);
    setFee(evt.fee || 'Voluntary Contribution (Bhiksha)');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide an event title.', 'error');
      return;
    }

    if (editingId) {
      updateEvent(editingId, {
        title,
        startDate,
        endDate,
        teacher,
        location,
        city,
        type,
        description,
        registration,
        fee,
      });
      showToast(`Event "${title}" updated successfully!`, 'success');
    } else {
      addEvent({
        title,
        startDate,
        endDate,
        teacher,
        location,
        city,
        type,
        description,
        registration,
        fee,
        isPast: false,
      });
      showToast(`New event "${title}" published live!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, eventTitle: string) => {
    if (confirm(`Are you sure you want to remove "${eventTitle}"?`)) {
      deleteEvent(id);
      showToast(`Event "${eventTitle}" deleted.`, 'info');
    }
  };

  const handleTogglePast = (evt: VMEvent) => {
    updateEvent(evt.id, { isPast: !evt.isPast });
    showToast(`Event marked as ${evt.isPast ? 'Upcoming' : 'Past'}.`, 'info');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Events &amp; Camps Management</h1>
          <p className={styles.subtitle}>
            Publish and manage Gyana Yagnas, residential camps, and festival programs live on the public site.
          </p>
        </div>
        <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
          + Create New Event
        </button>
      </div>

      {/* Events Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Event Title &amp; Category</th>
                <th>Dates</th>
                <th>Teacher</th>
                <th>Location</th>
                <th>Registration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt) => (
                <tr key={evt.id}>
                  <td>
                    <strong>{evt.title}</strong>
                    <span className={styles.categoryBadge}>{evt.type}</span>
                  </td>
                  <td>
                    <span className={styles.dateText}>{evt.startDate}</span>
                    {evt.endDate && <span className={styles.tdSub}>to {evt.endDate}</span>}
                  </td>
                  <td>{evt.teacher}</td>
                  <td>{evt.city}</td>
                  <td>
                    <span className={`${styles.regBadge} ${styles['reg_' + evt.registration]}`}>
                      {evt.registration}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`${styles.statusToggle} ${evt.isPast ? styles.isPast : styles.isUpcoming}`}
                      onClick={() => handleTogglePast(evt)}
                      title="Click to toggle upcoming/past"
                    >
                      {evt.isPast ? 'Archived / Past' : 'Live / Upcoming'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        type="button"
                        className={styles.btnEdit}
                        onClick={() => handleOpenEdit(evt)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={() => handleDelete(evt.id, evt.title)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Event' : 'Publish New Event'}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className="form-field">
                <label className="form-label" htmlFor="evt-title">Event Title *</label>
                <input
                  id="evt-title"
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Navaratri Devi Mahatmyam Discourse & Camp"
                />
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-start">Start Date *</label>
                  <input
                    id="evt-start"
                    type="text"
                    required
                    className="form-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="e.g. Oct 15, 2026"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-end">End Date</label>
                  <input
                    id="evt-end"
                    type="text"
                    className="form-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="e.g. Oct 18, 2026"
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-type">Category</label>
                  <select
                    id="evt-type"
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                  >
                    <option value="Gyana Yagna">Gyana Yagna</option>
                    <option value="Camp">Residential Camp</option>
                    <option value="Celebration">Temple Celebration</option>
                    <option value="Satsang">Satsang</option>
                    <option value="Course">Course</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-reg">Registration Status</label>
                  <select
                    id="evt-reg"
                    className="form-select"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value as any)}
                  >
                    <option value="open">Open for Registration</option>
                    <option value="limited">Limited Seats</option>
                    <option value="closed">Closed / Full</option>
                  </select>
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-teacher">Teacher / Speaker</label>
                  <input
                    id="evt-teacher"
                    type="text"
                    className="form-input"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-city">City / Region</label>
                  <input
                    id="evt-city"
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="evt-loc">Venue / Location</label>
                <input
                  id="evt-loc"
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="evt-desc">Event Description</label>
                <textarea
                  id="evt-desc"
                  className="form-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details on schedule, daily discourses, and accommodation..."
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave}>
                  {editingId ? 'Save Changes' : 'Publish Live to Website →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
