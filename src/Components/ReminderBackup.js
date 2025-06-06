// ReminderList.jsx
import React, {useState, useEffect} from 'react';
import './Reminderlist.css';
import ReminderCard from './ReminderCard';
import './ReminderCard.css'
import { FaFilter } from 'react-icons/fa'; // [NEW] icon for filter dropdown
import { FaSun, FaCloudSun, FaMoon } from 'react-icons/fa'; // [NEW] icons for morning, afternoon, evening

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const ReminderList = ({ reminders, selectedDate,viewAll, onEdit, onDelete, onComplete}) => {
  const [filter, setFilter] = useState('all');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
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
  
  useEffect(()=>{
    setFilter('all')
  },[selectedDate]);

  const filterByTime = (reminderList) => {
    return reminderList.filter(r => {
      if(viewAll){
        return true;
         };
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
      {/* <h3>{title}</h3> */}
      <h3>
              {title === 'morning' && <FaSun className="icon" />} 
              {title === 'afternoon' && <FaCloudSun className="icon" />} 
              {title === 'evening' && <FaMoon className="icon" />} 
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h3>
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
        {/* <button className='all-button' onClick={()=>setFilter('all')}>View all</button> */}
      {/* <div className="filter-buttons">
        {/* <button onClick={() => setFilter('all')}>All</button> }
        <button onClick={() => setFilter('morning')}>Morning</button>
        <button onClick={() => setFilter('afternoon')}>Afternoon</button>
        <button onClick={() => setFilter('evening')}>Evening</button>
      </div> */}
        <div className="filter-dropdown">
              <FaFilter className="filter-icon" onClick={() => setShowFilterOptions(!showFilterOptions)} />
              {showFilterOptions && (
                <div className="filter-options">
                <button onClick={() => { setFilter('morning'); setShowFilterOptions(false); }}></button>
                  <button onClick={() => {setFilter('afternoon');setShowFilterOptions(false)}}><FaCloudSun /> Afternoon</button>
                  <button onClick={() => {setFilter('evening');setShowFilterOptions(false)}}><FaMoon /> Evening</button>
                </div>
              )}
       </div>

      {renderSection(filter, todayReminders, true)}
        <h3>Pending Reminders</h3>
        { pendingReminders.map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onEdit={onEdit}
          onDelete={onDelete} 
          onComplete={onComplete}
          showCompleteButton={!reminder.completed}
        />
      ))}
       <h3>Completed Reminders</h3>
        {completedReminders.map(reminder => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onEdit={ onEdit}
          onDelete={onDelete} 
          onComplete={ null}
          showCompleteButton={reminder.completed}
        />
      ))}
      
      {/* {renderSection('Pending Reminders', pendingReminders, true)}
      {renderSection('Completed Reminders', completedReminders, false)} */}
    </div>
  );
};
export default ReminderList;
