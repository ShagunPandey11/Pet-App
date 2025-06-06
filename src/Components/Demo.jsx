import React, { useState, useEffect } from 'react';
import ReminderCard from './ReminderCard';
import ReminderFilter from './ReminderFilter';
// Import the filtering utility
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

  // OLD filtering code — MOVED TO filterReminders.js and ReminderFilter UI
  /*
  const now = new Date();

  const filteredReminders = reminders.filter(reminder => {
    // Date filtering
    const reminderDate = new Date(reminder.startdate);
    if (!viewAll && !isSameDay(reminderDate, selectedDate)) {
      return false;
    }

    // Time filter
    if (!viewAll) {
      const hour = Number(reminder.time.split(':')[0]);
      if (filters.timeFilter === 'morning' && hour >= 12) return false;
      if (filters.timeFilter === 'afternoon' && (hour < 12 || hour >= 17)) return false;
      if (filters.timeFilter === 'evening' && hour < 17) return false;
    }

    // Pet filter
    if (filters.petFilter !== 'all' && reminder.pet !== filters.petFilter) {
      return false;
    }

    // Category filter
    if (filters.categoryFilter !== 'all' && reminder.category !== filters.categoryFilter) {
      return false;
    }

    return true;
  });

  const pendingReminders = filteredReminders.filter(r => r.status === 'pending');
  const completedReminders = filteredReminders.filter(r => r.status !== 'pending');

  // Helper function to compare dates
  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
  */

  // New filtering, delegated to utility function
  const { pending: pendingReminders, completed: completedReminders } = filterReminders(reminders, filters, selectedDate, viewAll);

  return (
    <div className="reminder-list">
      <ReminderFilter filters={filters} setFilters={setFilters} />

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
          onEdit={onEdit}
          onDelete={onDelete}
          showCompleteButton={false}
        />
      ))}
    </div>
  );
};

export default ReminderList;
