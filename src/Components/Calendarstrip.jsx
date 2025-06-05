import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Full calendar component
import 'react-datepicker/dist/react-datepicker.css';
import './Calendarstrip.css' // Custom styles

// This function returns an array of 7 dates (Monday to Sunday) for the current week
const getCurrentWeekDates = () => {
  const today = new Date(); // Get today's date
  const dayOfWeek = today.getDay(); // Get which day today is (0 = Sunday, 1 = Monday, etc.)
  
  // Calculate how far back to go to get Monday.
  // If it's Sunday (0), we go back 6 days, else go back (dayOfWeek - 1) days
  const mondayOffset = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek;

  const monday = new Date(today); // Copy today's date
  monday.setDate(today.getDate() + mondayOffset); // Move date to this week's Monday

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); // Start from Monday
    d.setDate(monday.getDate() + i); // Add i days to get full week
    weekDates.push(d);
  }

  return weekDates;
};

const CalendarStrip = ({ selectedDate, onDateSelect }) => {
  const weekDates = getCurrentWeekDates(); // Get all 7 days of the week
  const [showFullCalendar, setShowFullCalendar] = useState(false); // Control visibility of full calendar

  return (
    <div className="calendar-strip-container">
      
      {/* Horizontal 7-day calendar strip */}
      <div className="calendar-strip">
        {weekDates.map((date) => {
          const isToday = new Date().toDateString() === date.toDateString(); // Check if date is today
          const isSelected = selectedDate.toDateString() === date.toDateString(); // Check if date is selected

          return (
            <div
              key={date.toDateString()} // Unique key for React
              className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => onDateSelect(date)} // Change selected date
            >
              <div className="day">
                {date.toLocaleDateString('en-US', { weekday: 'short' })} {/* e.g., Mon, Tue */}
              </div>
              <div className="date">
                {date.getDate()} {/* Just the number (e.g., 3, 10, 22) */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrow-like toggle to show/hide full calendar */}
      <div className="calendar-toggle">
        <button onClick={() => setShowFullCalendar(prev => !prev)}>
          {showFullCalendar ? 'Hide Calendar ⬆️' : 'Show Full Calendar ⬇️'}
        </button>
      </div>

      {/* Conditionally show the full calendar */}
      {showFullCalendar && (
        <div className="full-calendar">
          <DatePicker
            selected={selectedDate}           // The currently selected date
            onChange={date => onDateSelect(date)} // When user clicks a new date
            inline                             // Show as a full embedded calendar (not popup)
          />
        </div>
      )}
    </div>
  );
};

export default CalendarStrip;
