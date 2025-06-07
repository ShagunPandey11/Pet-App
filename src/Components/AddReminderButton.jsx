// ReminderForm.jsx
import React, { useState, useEffect } from 'react';
import './AddReminder.css';

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
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showEndDate, setShowEndDate] = useState(false);

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
      id: existingReminder?.id || Date.now().toString(), // Keep same ID if editing
      title,
      pet,
      category,
      note,
      startdate: startDate,
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
    <div className='reminder-form-container'>
      <form onSubmit={handleSubmit}>
        {/* {Header Section} */}
        <div className='form-header'>
          <button className='back-button' type="button" onClick={handleCancel}>Cancel</button>
          <h2 className='form-title'>{existingReminder ? 'Edit Reminder' : 'Add Reminder'}</h2>
          <button className='save-button' type="submit">{existingReminder ? 'Update' : 'Save'}</button>
        </div>
        {error && <p  className='Error' style={{ color: 'red' }}>{error}</p>}
        {/* Dropdown Section */}
        <div className='dropdown-section'>
          <div className='dropdown-group'>
            <label className='dropdown-label'>Select Pet *</label>
            <select value={pet} onChange={(e) => setPet(e.target.value)}>
              <option value="">Select Pet</option>
              <option value="Brownie">Brownie</option>
              <option value="Simba">Simba</option>
            </select>
          </div>
          <div className='dropdown-group'>
            <label className='dropdown-label'>Select Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Health">Health</option>
              <option value="Feeding">Feeding</option>
            </select>
          </div>
        </div>

        {/* Reminder Info Card */}
        {<div className="card reminder-info-card">
          <div className="card-header black-bg">Reminder Information</div>
          <div className="card-body">
            <label className="input-label">Set a Reminder For</label>
            <input
              type="text"
              placeholder="E.g. Morning Walk"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="card-footer">
          <div className='note-header'>
          <span className="add-note-label">
            Add Note (Optional)
          </span>
          <button  className="add-note-button" type='button' onClick={() => setShowNoteInput(!showNoteInput)}> Add Note</button>
          </div>
          {showNoteInput && (<div className="note-input"><textarea
            placeholder="Any additional info?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          /></div>)}

          </div>
        </div> }

        {/* Reminder Setting Card */}
        <div className="card collapsible-card">
          <div className="card-header">
            <span className="card-heading">Reminder Settings</span>
            <span className="collapse-icon" onClick={() => setShowSettings(!showSettings)}>{showSettings ? '⬆' : '⬇'}</span>
          </div>
          {showSettings && (
            <div className="card-body">
              {/* Section 1: Start Date */}
              <div className="form-section">
                <label className='input-label'>Start Date *</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <div className="optional-add" onClick={() => setShowEndDate(!showEndDate)}>+ Add End Date</div>
                {showEndDate && (
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    /></div>
                )}
              </div>
              {/* Section 2: Reminder Time */}
              <div className="form-section">
                <label className='input-label'>Time *</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {/* Section 3: Frequency */}
              <div className="form-section">
                <label className="input-label">Frequency</label>
                <small className="subtext">How often should this reminder repeat?</small>
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value="Daily">Every Day</option>
                  <option value="Every 3 Days">Every 3 Days</option>
                  <option value="Weekly">Weekly</option>
                </select>

              </div>
            </div>)}
          </div>
      </form>
    </div>
  );
};

export default ReminderForm;
