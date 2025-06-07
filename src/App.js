// App.js
import React, { useState } from 'react';
import CalendarStrip from './Components/Calendarstrip';
import './App.css';
import ReminderList from './Components/ReminderList';
import ReminderForm from  './Components/AddReminderButton';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const [reminders, setReminders] = useState(dummyReminders); // All reminders
  const [showForm, setShowForm] = useState(false); // Toggle form view
  const [editingReminder, setEditingReminder] = useState(null); // 
  const [viewAll, setViewAll] = useState(false);

  const addReminder = (newReminder) => {
    console.log(newReminder);
    // setReminders(prev => [...prev, newReminder]);
    setReminders(prev => {
  const updated = [...prev, newReminder];
  console.log("Updated reminders:", updated);
  return updated;
});

  };

  // Update existing reminder
  const updateReminder = (updatedReminder) => {
    setReminders(prev =>
      prev.map(r => (r.id === updatedReminder.id ? updatedReminder : r))
    );
    // setEditingReminder(null);
  };

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const markAsCompleted = (id) => {
    // console.log(id);
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, status:'completed' } : r
    ));
  };

  return (
    <div className="app-container">
      {showForm ? "" : (<div className='reminder-header'>
          <h2 className='reminder-heading'>Daily Reminders</h2>
          <button className='filter-all-btn'  onClick={()=>{setViewAll(true) }}> View All</button>
      </div>)}
     {showForm ? "" : (<CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={(date) => {setSelectedDate(date); setViewAll(false)}}
      />)}

      {showForm ? (
        <ReminderForm
          onSave={(data) => {
            editingReminder ? updateReminder(data) : addReminder(data);
            setShowForm(false);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingReminder(null); // Reset edit state if cancelled
          }}
          existingReminder={editingReminder} // Pass existing data for edit
        />
      ) : (
        <div className='reminder-section'>
        <ReminderList
          reminders={reminders}
          selectedDate={selectedDate}
          viewAll={viewAll}
          onEdit={(reminder) => {
            setEditingReminder(reminder);
            setShowForm(true);
          }}
          onDelete={deleteReminder}
          onComplete={markAsCompleted}
        />
        {/* <div className="bottom-container"> */}
        <button className="add-button" onClick={() => {
          setEditingReminder(null); // Make sure we're not editing
          setShowForm(true);
        }}>
          +
        </button>
      {/* </div> */}
      </div>
      )}
    </div>
  );
}

export default App;
