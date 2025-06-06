import React, { useState, useEffect } from 'react';
import ReminderCard from './ReminderCard';
import ReminderFilter from './ReminderFilter';
import { filterReminders } from './filterReminders';

const ReminderList = ({ reminders, selectedDate, viewAll, onEdit, onDelete, onComplete }) => {
  const [filters, setFilters] = useState({
    timeFilter: 'all',
    petFilter: 'all',
    categoryFilter: 'all',
  });

  useEffect(() => {
    setFilters({
      timeFilter: 'all',
      petFilter: 'all',
      categoryFilter: 'all',
    });
  }, [selectedDate]);

  const { pending: pendingReminders, completed: completedReminders , allReminders: All } = filterReminders(reminders, filters, selectedDate, viewAll);
  console.log('Pendinf from list' + {pendingReminders})
  console.log('com from list' + completedReminders)
  console.log('all from list' + All)
  return (
    <div className="reminder-list">
      <ReminderFilter filters={filters} setFilters={setFilters} />
      <h3>{filters.timeFilter}</h3>
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

      <h3>Pending Reminders</h3>
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

      <h3>Completed Reminders</h3>
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
  );
};

export default ReminderList;

