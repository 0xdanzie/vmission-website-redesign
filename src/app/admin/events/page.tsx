'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/context/ToastContext';
import { VMEvent } from '@/data/events';
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
import styles from './eventsAdmin.module.css';

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent, refreshEvents, isLoadingEvents } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

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
  const [isPublished, setIsPublished] = useState(true);

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || e.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setStartDate('2026-10-15');
    setEndDate('2026-10-18');
    setTeacher('Swami Atmananda Saraswati');
    setLocation('Vedanta Ashram, Sudama Nagar');
    setCity('Indore');
    setType('Camp');
    setDescription('');
    setRegistration('open');
    setFee('Voluntary Contribution (Bhiksha)');
    setIsPublished(false); // Default to draft for new entries
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
    setIsPublished(evt.is_published !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide an event title.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, {
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
          is_published: isPublished,
        });
        showToast(`Event "${title}" updated successfully!`, 'success');
      } else {
        await addEvent({
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
          is_published: isPublished,
        });
        showToast(
          isPublished
            ? `New event "${title}" published live!`
            : `New event "${title}" saved as draft.`,
          'success'
        );
      }
      setIsModalOpen(false);
    } catch {
      showToast('Error saving event record.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (evt: VMEvent) => {
    const nextState = !evt.is_published;
    await updateEvent(evt.id, { is_published: nextState });
    showToast(
      nextState
        ? `Event "${evt.title}" is now published live!`
        : `Event "${evt.title}" reverted to draft.`,
      'success'
    );
  };

  const handleDelete = async (id: string, eventTitle: string) => {
    if (confirm(`Are you sure you want to remove event "${eventTitle}"? This will remove it from the schedule.`)) {
      await deleteEvent(id);
      showToast(`Event "${eventTitle}" deleted.`, 'info');
    }
  };

  const handleTogglePast = async (evt: VMEvent) => {
    await updateEvent(evt.id, { isPast: !evt.isPast });
    showToast(`Event marked as ${evt.isPast ? 'Upcoming' : 'Past'}.`, 'info');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Events &amp; Study Camps Management</h1>
          <p className={styles.subtitle}>
            Publish and manage Gyana Yagnas, residential spiritual camps, and temple festival observances.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnEdit}
            onClick={() => refreshEvents()}
            title="Reload from database"
          >
            <RefreshIcon size={13} />
            <span>{isLoadingEvents ? 'Synchronizing…' : 'Refresh DB'}</span>
          </button>
          <button type="button" className={styles.btnAdd} onClick={handleOpenAdd}>
            <PlusIcon size={14} />
            <span>Schedule New Event</span>
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
            placeholder="Search events by title, teacher, or city…"
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
          <label htmlFor="event-type-filter" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vm-text-muted, #665D55)' }}>
            Category:
          </label>
          <select
            id="event-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid var(--vm-sand-border, #DFD7C7)',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--vm-text, #221D1A)',
              background: '#FFFFFF',
            }}
          >
            <option value="all">All Categories ({events.length})</option>
            <option value="Camp">Residential Camp</option>
            <option value="Gyana Yagna">Gyana Yagna</option>
            <option value="Celebration">Temple Celebration</option>
            <option value="Satsang">Satsang</option>
            <option value="Course">Course</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Event Title &amp; Category</th>
                <th>Dates</th>
                <th>Teacher</th>
                <th>Venue / City</th>
                <th>Registration</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px' }}>
                    <div className={styles.emptyCard}>
                      <p className={styles.emptyTitle}>No matching events found</p>
                      <p className={styles.emptyDesc}>
                        {searchTerm || selectedType !== 'all'
                          ? 'Try adjusting your search query or category filter.'
                          : 'No events currently scheduled. Click "+ Schedule New Event" to create one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr key={evt.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(evt)}
                        className={styles.statusToggle}
                        style={{
                          background: evt.is_published ? 'var(--vm-forest-light, #EAF2EC)' : 'var(--vm-warning-bg, #FEF8ED)',
                          color: evt.is_published ? 'var(--vm-forest, #2D4F38)' : 'var(--vm-warning, #C07D1E)',
                          border: `1px solid ${evt.is_published ? 'rgba(45, 79, 56, 0.25)' : 'rgba(192, 125, 30, 0.28)'}`,
                        }}
                        title="Click to toggle Draft / Published"
                      >
                        {evt.is_published ? <CheckIcon size={12} /> : <ClockIcon size={12} />}
                        <span>{evt.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--vm-text, #221D1A)' }}>{evt.title}</strong>
                      <span className={styles.categoryBadge}>{evt.type}</span>
                    </td>
                    <td>
                      <span className={styles.dateText}>{evt.startDate}</span>
                      {evt.endDate && <span className={styles.tdSub}>to {evt.endDate}</span>}
                    </td>
                    <td>{evt.teacher}</td>
                    <td>
                      <span>{evt.city}</span>
                      <span className={styles.tdSub}>{evt.location}</span>
                    </td>
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
                        title="Click to toggle upcoming or archived past status"
                      >
                        {evt.isPast ? 'Archived Past' : 'Live Upcoming'}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => handleOpenEdit(evt)}
                          title={`Edit ${evt.title}`}
                        >
                          <EditIcon size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(evt.id, evt.title)}
                          title={`Delete ${evt.title}`}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Event Record' : 'Schedule New Event'}</h3>
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
                    placeholder="e.g. 2026-10-15"
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
                    placeholder="e.g. 2026-10-18"
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
                  <label className="form-label" htmlFor="evt-teacher">Teacher / Speaker</label>
                  <input
                    id="evt-teacher"
                    type="text"
                    className="form-input"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-loc">Venue / Address</label>
                  <input
                    id="evt-loc"
                    type="text"
                    className="form-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-city">City</label>
                  <input
                    id="evt-city"
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid--2">
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-reg">Registration Status</label>
                  <select
                    id="evt-reg"
                    className="form-select"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value as any)}
                  >
                    <option value="open">Open (Accepting Registrations)</option>
                    <option value="limited">Limited Seats Remaining</option>
                    <option value="closed">Closed / Full</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="evt-fee">Contribution / Fee</label>
                  <input
                    id="evt-fee"
                    type="text"
                    className="form-input"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="evt-desc">Event Description</label>
                <textarea
                  id="evt-desc"
                  className="form-textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline topics covered, study schedule, boarding notes..."
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
                  id="event-publish-checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--vm-bhagwa, #E06328)', cursor: 'pointer' }}
                />
                <label htmlFor="event-publish-checkbox" style={{ cursor: 'pointer', fontSize: '0.84375rem' }}>
                  <strong style={{ color: 'var(--vm-text, #221D1A)' }}>Publish live to public website</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--vm-text-muted, #665D55)' }}>
                    {isPublished
                      ? 'This event will be visible immediately on /events and the homepage schedule.'
                      : 'Draft mode: Only authenticated staff can preview this event.'}
                  </p>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSaving}>
                  {isSaving ? 'Saving to Database…' : editingId ? 'Update Event' : isPublished ? 'Publish Live' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
