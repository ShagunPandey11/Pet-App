//ReminderList.jsx
import React, { useState, useEffect } from 'react';
import ReminderCard from './ReminderCard';
import ReminderFilter from './ReminderFilter';
import { filterReminders } from './filterReminders';
import './Reminderlist.css';

const ReminderList = ({ reminders, selectedDate, viewAll, onEdit, onDelete, onComplete }) => {
  const [filters, setFilters] = useState({
    timeFilter: 'all',
    petFilter: 'all',
    categoryFilter: 'all',
  });
  const [showFilters, setShowFilters] =useState(false);

  useEffect(() => {
    setFilters({
      timeFilter: 'all',
      petFilter: 'all',
      categoryFilter: 'all',
    });
    setShowFilters(false);
  }, [selectedDate, viewAll]);
  // console.log('view all from reminderlist')
  // console.log(viewAll)
  const { pending: pendingReminders, completed: completedReminders , allReminders: All } = filterReminders(reminders, filters, selectedDate, viewAll);
  // console.log('ALL reminers from reminderlist')
  // console.log(All)
  // console.log('Pending reminers from reminderlist')
  // console.log(pendingReminders)
  // console.log('completed reminers from reminderlist')
  // console.log(completedReminders)

  return (
    <div className="reminder-list">
      <div className="reminder-filter-bar">
        <h3 className="section-heading">{filters.timeFilter}</h3>
        <div className="filter-icon" onClick={() => setShowFilters(prev => !prev)}>🔍</div>
      </div>
      {showFilters &&  <ReminderFilter filters={filters} setFilters={setFilters} />}
      <div className='reminder-scroll-section'>
      {All.length === 0 && <p>No reminder schedule for this date</p>}
      {All.map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          showCompleteButton={true}
        />))}
        </div>

      <div className="reminder-group">
      <h3 className='reminder-heading'>Pending Reminders</h3>
      <div className='reminder-scroll-section'>
      {pendingReminders.length === 0 && <p>No pending reminders found.</p>}
      {pendingReminders.map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          showCompleteButton={true}
        />
      ))}
      </div>
      </div>
      <div className="reminder-group">
      <h3 className='reminder-heading'>Completed Reminders</h3>
      <div className='reminder-scroll-section'>
      {completedReminders.length === 0 && <p>No completed reminders found.</p>}
      {completedReminders.map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onDelete={onDelete}
          showCompleteButton={false}
        />
      ))}
      </div>
    </div>
    </div>
  );
};

export default ReminderList;

