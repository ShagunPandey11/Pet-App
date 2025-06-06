import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendarstrip.css';

const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
};

const CalendarStrip = ({ selectedDate, onDateSelect }) => {
  const weekDates = getCurrentWeekDates();
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  return (
    // <div className="calendar-strip-container">
    //   <div className="calendar-strip">
    //     {weekDates.map((date) => {
    //       const isToday = new Date().toDateString() === date.toDateString();
    //       const isSelected = selectedDate.toDateString() === date.toDateString();

    //       return (
    //         <div
    //           key={date.toDateString()}
    //           className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
    //           onClick={() => onDateSelect(date)}
    //         >
    //           <div className="day-name">
    //             {date.toLocaleDateString('en-US', { weekday: 'short' })}
    //           </div>
    //           <div className="date-circle">
    //             {date.getDate()}
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {/* Toggle button BELOW strip */}
    //   <div className="calendar-toggle">
    //     <button onClick={() => setShowFullCalendar(prev => !prev)}>
    //       {showFullCalendar ? 'Hide Calendar ⬆️' : 'Show Full Calendar ⬇️'}
    //     </button>
    //   </div>

    //   {showFullCalendar && (
    //     <div className="full-calendar-wrapper">
    //       <DatePicker
    //         selected={selectedDate}
    //         onChange={date => onDateSelect(date)}
    //         inline
    //       />
    //     </div>
    //   )}
    // </div>
  <div className='calendar-strip-container'>
    <div className="calendar-strip-wrapper">
  {!showFullCalendar ? (
    <div className="calendar-strip">
      {weekDates.map((date) => {
        const isToday = new Date().toDateString() === date.toDateString();
        const isSelected = selectedDate.toDateString() === date.toDateString();

        return (
          <div
            key={date.toDateString()}
            className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => onDateSelect(date)}
          >
            <div className="day-name">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="date-circle">
              {date.getDate()}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="full-calendar-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={date => onDateSelect(date)}
        inline
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  )}
</div>

<div className="calendar-toggle">
  <button onClick={() => setShowFullCalendar(prev => !prev)}>
    {showFullCalendar ? 'Hide Calendar ⬆️' : 'Show Full Calendar ⬇️'}
  </button>
</div>
    </div>   
  );
};

export default CalendarStrip;

