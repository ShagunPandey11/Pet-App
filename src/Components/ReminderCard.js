// ReminderCard.js
import React, {useState} from 'react';
import './ReminderCard.css'

function ReminderCard({ reminder, onEdit, onDelete, onComplete, showCompleteButton }) {
    // const reminderTime = reminder.time;
    const [showActions, setShowActions] = useState(false);

  return (
    <div className="reminder-card" onClick={()=>setShowActions(prev =>!prev)}>
      <div className="reminder-content">
        <div className='reminder-title-row'>
        <h4 className={reminder.status === 'completed' && !showActions ? 'completed-title' : ''}>{reminder.title}</h4>
        {reminder.status === 'completed' && !showActions && (
        <span className="tick-mark">✅</span>
           )}
        </div>

        {reminder.status === 'pending' && (
          <p className="reminder-meta">
             <span>{reminder.pet}</span>
             <span>{reminder.time}</span>
             <span>{reminder.frequency}</span>
        </p> )}
      </div>
      
     { showActions && (<div className="reminder-actions">
        <p>{reminder.note}</p>
        {onEdit && <button className="action-btn" onClick={() => onEdit(reminder)}>Edit</button>}
        {onDelete && <button className="action-btn" onClick={() => onDelete(reminder.id)}>Delete</button>}
        {showCompleteButton && (
          <button className="action-btn complete" onClick={() => onComplete(reminder.id)}>Mark as Done</button>
        )}
      </div>
     )}
    </div>
  );
}

export default ReminderCard;
