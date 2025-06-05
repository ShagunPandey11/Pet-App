// App.js
import React, { useState } from 'react';
import CalendarStrip from './Components/Calendarstrip';
import './App.css';
import ReminderList from './Components/ReminderList';
import ReminderForm from  './Components/AddReminderButton';

const dummyReminders = [
  {
    id: 1,
    title: 'Feed Bruno',
    pet: 'Bruno',
    category: 'Feeding',
    note: 'Wet food, 1 bowl',
    startdate: new Date('2025-06-05T08:00:00'), //today
    endDate: null,
    time: '08:00',
    frequency: 'Daily',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Vet Appointment',
    pet: 'Simba',
    category: 'Health',
    note: 'Checkup and vaccinations',
    startdate: new Date('2025-06-04T14:00:00'), //yesterday
    endDate: null,
    time: '14:00',
    frequency: 'Once',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Evening Walk',
    pet: 'Bruno',
    category: 'Exercise',
    note: '30 minutes in the park',
    startdate: new Date('2025-06-07T19:00:00'), //tommoorow
    endDate: null,
    time: '19:00',
    frequency: 'Daily',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Grooming Appointment',
    pet: 'Luna',
    category: 'Grooming',
    note: 'Bath and haircut',
    startdate: new Date('2025-06-02T11:00:00'), // Past date, 2june
    endDate: null,
    time: '11:00',
    frequency: 'Monthly',
    status: 'pending'
  },
  {
    id: 5,
    title: 'Flea Medication',
    pet: 'Simba',
    category: 'Health',
    note: 'Monthly dose',
    startdate: new Date('2025-06-10T09:00:00'), // Future- 10 june
    endDate: null,
    time: '09:00',
    frequency: 'Monthly',
    status: 'pending'
  }
  
];



function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const [reminders, setReminders] = useState(dummyReminders); // All reminders
  const [showForm, setShowForm] = useState(false); // Toggle form view
  const [editingReminder, setEditingReminder] = useState(null); // 

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
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={(date) => setSelectedDate(date)}
      />

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
        <ReminderList
          reminders={reminders}
          selectedDate={selectedDate}
          onEdit={(reminder) => {
            setEditingReminder(reminder);
            setShowForm(true);
          }}
          onDelete={deleteReminder}
          onComplete={markAsCompleted}
        />
      )}

      <div className="bottom-container">
        <button className="add-button" onClick={() => {
          setEditingReminder(null); // Make sure we're not editing
          setShowForm(true);
        }}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
