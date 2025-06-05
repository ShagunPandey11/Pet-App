// ReminderCard.js
import React from 'react';

function ReminderCard({ reminder, onEdit, onDelete, onComplete, showCompleteButton }) {
    const reminderTime = reminder.time;

  return (
    <div className="reminder-card">
      <div>
        <h4>{reminder.title}</h4>
        <p>{reminderTime}</p>
      </div>
      <div className="reminder-actions">
        {onEdit && <button onClick={() => onEdit(reminder)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(reminder.id)}>Delete</button>}
        {showCompleteButton && (
          <button onClick={() => onComplete(reminder.id)}>Mark as Done</button>
        )}
      </div>
    </div>
  );
}

export default ReminderCard;
