// ReminderCard.js
import React, {useState} from 'react';

function ReminderCard({ reminder, onEdit, onDelete, onComplete, showCompleteButton }) {
    // const reminderTime = reminder.time;
    const [showActions, setShowActions] = useState(false);

  return (
    <div className="reminder-card" onClick={()=>setShowActions(prev =>!prev)}>
      <div>
        <h4>{reminder.title}</h4>
        <p>{reminder.pet}</p>
        <p>{reminder.time}</p>
        <p>{reminder.frequency}</p>

      </div>
     { showActions && (<div className="reminder-actions">
        <p>{reminder.note}</p>
        {onEdit && <button onClick={() => onEdit(reminder)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(reminder.id)}>Delete</button>}
        {showCompleteButton && (
          <button onClick={() => onComplete(reminder.id)}>Mark as Done</button>
        )}
      </div>
     )}
    </div>
  );
}

export default ReminderCard;
