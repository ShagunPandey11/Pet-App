// App.js
import React, { useState, useEffect } from 'react';
import CalendarStrip from './Components/Calendarstrip';
import './App.css';
import ReminderList from './Components/ReminderList';
import ReminderForm from  './Components/AddReminderButton';
import api from "./api";
import axios from 'axios';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const [reminders, setReminders] = useState([]); // All reminders
  const [showForm, setShowForm] = useState(false); // Toggle form view
  const [editingReminder, setEditingReminder] = useState(null); // 
  const [viewAll, setViewAll] = useState(false);

  useEffect(()=>{
    api.get('/reminders')
    .then(response => {
      setReminders(response.data);
    })
    .catch(error =>{
      console.log('Error fetching Reminders');
    })
  },[]);

  const addReminder = async (newReminder) => {
    // console.log(newReminder);
    // setReminders(prev => [...prev, newReminder]);
    try{
      const response = await axios.post('http://localhost:3001/reminders', newReminder)
    setReminders(prev => {
  const updated = [...prev, response.data];
  // console.log("Updated reminders:", updated);
  return updated;
});}
catch(error){
    console.log('failed to add reminders')
}
 };

  // Update existing reminder
  const updateReminder = async (updatedReminder) => {
  //  console.log("top reminder with ID:" , updateReminder.id);
   try{
    console.log("updating reminder with ID:" , updatedReminder.id);
    console.log("full object", updatedReminder)
    const response= await axios.patch(`http://localhost:3001/reminders/${updatedReminder.id}`, updatedReminder)
    console.log('sucess1')
     setReminders(prev =>
      prev.map(r => (r.id === updatedReminder.id ? response.data : r))
    );
    console.log('sucess')
    setEditingReminder(null);
   }
   catch(error){
    console.log('failed to update reminders', error)
   }
  };

  // Delete reminder
  const deleteReminder = async(id) => {
    try{
      await axios.delete(`http://localhost:3001/reminders/${id}`);
      setReminders(prev=> prev.filter(r=>r.id !== id));
    }
    catch(error){
      console.log('failed to delete a reminder', error)
    }
  };

  const markAsCompleted =async (id) => {
    // console.log(id);
   try{
    const response= await axios.patch(`http://localhost:3001/reminders/${id}`,{status:'completed'});
     setReminders(prev => prev.map(r =>
      r.id === response.data.id ? response.data : r
    ));
   }
   catch(error){
    console.log('failed to mark it as completed',error);
   }
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
            console.log('updatereminder called from on save', data)
            // console.log(editingReminder)
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
