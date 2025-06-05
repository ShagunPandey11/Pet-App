// ReminderList.jsx
import React, {useState} from 'react';
import './Reminderlist.css';
import ReminderCard from './ReminderCard';

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const ReminderList = ({ reminders, selectedDate, onEdit, onDelete, onComplete }) => {
  const [filter, setFilter] = useState('all');
  const now = new Date();

  const todayReminders = reminders.filter(r => {  //have to chnage name of todayReminders to specific date reminders
    const reminderDate = new Date(r.startdate);
    const completed = r.status==='pending'? false : true;
    return isSameDay(reminderDate, selectedDate) && !completed;
  });

  const pendingReminders = reminders.filter(r => {
    const reminderDate = new Date(r.startdate);
    const completed = r.status==='pending'? false : true;
    return (
      (reminderDate < now || isSameDay(reminderDate, now)) && !completed
    );
  });

  const completedReminders = reminders.filter(r => r.status =='completed');

  const filterByTime = (reminderList) => {
    return reminderList.filter(r => {
      const [hour] = r.time.split(':').map(Number)
      console.log(hour);
      if (filter === 'morning') return hour < 12;
      if (filter === 'afternoon') return hour >= 12 && hour < 17;
      if (filter === 'evening') return hour >= 17;
      return true;
    });
  };

  const renderSection = (title, reminderList, allowEdit = false) => (
    <div>
      <h3>{title}</h3>
      {filterByTime(reminderList).map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onEdit={allowEdit ? onEdit : null}
          onDelete={onDelete} 
          onComplete={allowEdit ? onComplete : null}
          showCompleteButton={allowEdit && !reminder.completed}
        />
      ))}
    </div>
  );

  return (
    <div className="reminder-list">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('morning')}>Morning</button>
        <button onClick={() => setFilter('afternoon')}>Afternoon</button>
        <button onClick={() => setFilter('evening')}>Evening</button>
      </div>

      {renderSection("Today's Reminders", todayReminders, true)}
      {renderSection('Pending Reminders', pendingReminders, true)}
      {renderSection('Completed Reminders', completedReminders, false)}
    </div>
  );
};
export default ReminderList;
