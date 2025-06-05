// ReminderForm.jsx
import React, { useState, useEffect } from 'react';

const ReminderForm = ({ onSave, onCancel, existingReminder }) => {
  //  If editing, prefill fields
  const [title, setTitle] = useState('');
  const [pet, setPet] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [error, setError] = useState('');

  // useEffect to prefill form for editing
  useEffect(() => {
    if (existingReminder) {
      setTitle(existingReminder.title);
      setPet(existingReminder.pet);
      setCategory(existingReminder.category);
      setNote(existingReminder.note);
      setStartDate(existingReminder.startdate);
      setEndDate(existingReminder.endDate || '');
      setTime(existingReminder.time);
      setFrequency(existingReminder.frequency);
    }
  }, [existingReminder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !pet || !category || !startDate || !time) {
      setError('Please fill all required fields.');
      return;
    }

    const confirmSubmit = window.confirm(
    existingReminder
      ? 'Are you sure you want to update this reminder?'
      : 'Are you sure you want to save this reminder?'
  );

  if (!confirmSubmit) return;

    const newReminder = {
      id: existingReminder?.id || Date.now(), // Keep same ID if editing
      title,
      pet,
      category,
      note,
      startdate : startDate,
      endDate: endDate || null,
      time,
      frequency,
      status: existingReminder?.status || 'pending', // Preserve status
    };

    onSave(newReminder);
  };

  const handleCancel = () => {
  const confirmCancel = window.confirm(
    'Are you sure you want to go back? Any unsaved changes will be lost.'
  );

  if (confirmCancel) {
    onCancel();
  }
};


  return (
    <div>
      <h2>{existingReminder ? 'Edit Reminder' : 'Add Reminder'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Fields (same as before) */}
        <label>Pet *</label>
        <select value={pet} onChange={(e) => setPet(e.target.value)}>
          <option value="">Select Pet</option>
          <option value="Brownie">Brownie</option>
          <option value="Simba">Simba</option>
        </select>

        <label>Category *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Feeding">Feeding</option>
        </select>

        <label>Title *</label>
        <input
          type="text"
          placeholder="E.g. Morning Walk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Notes</label>
        <textarea
          placeholder="Any additional info?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <label>Start Date *</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label>Time *</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Frequency</label>
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="Daily">Every Day</option>
          <option value="Every 3 Days">Every 3 Days</option>
          <option value="Weekly">Weekly</option>
        </select>

        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">{existingReminder ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;
