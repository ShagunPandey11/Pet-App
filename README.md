## Reminder App
A React-based reminder application that lets users add, view, edit and filter reminders by day of time, pet, and category. Designed with a clean UI, mobile responsiveness, and intuitive filtering logic.
---

[click here to see it live](https://pet-app-kappa.vercel.app/)
---


## Features
- Add, edit, and delete reminders.
- View reminders grouped by status: Pending and Completed.
- Filter reminders by pet name, time of day (morning, afternoon, evening), and category.
- Horizontal calendar strip with option to toggle a full calendar.
- Used fake API for backend purpose.
- Responsive design optimized for desktop and mobile devices.


## Technologies Used
- React (Functional Components & Hooks)
- React Datepicker
- CSS (Flexbox, Media Queries)
- JavaScript (ES6+)

---
```
pet_app/
│
├── public/                 # Static files and index.html
├── src/
│   ├── components/         
│   ├── FilterReminder.jsx/           #contains the logic for filtering the reminder           
│   ├── AddReminderButton.js/     # Form for adding and editing the reminder         
│   ├── CalendarStrip.js/              # contain the logic for calendar  
│   ├── ReminderCard.js/             #contain the logic of a single reminder being shown           
│   ├── ReminderFilter.js/           #contain logic for dropdown filters 
│   └── ReminderList.js/             # contain logic of showing the reminders available                 
├── package.json                       # Project metadata and dependencies
├──  App.js/                          #Main component hosting the other logical component and fake API   
├── api.js/                           #connection with json server   
└── README.md 
```
---

## Using Fake API for Data Management
This project uses a simulated backend (fake API) to handle reminder data operations like fetching, adding, updating, and deleting reminders.All data changes are handled through these mock API calls, keeping state management and UI synchronized with simulated server responses.
---

## Filter Logic Overview
- Pending reminders show tasks for today and future dates.
- Completed reminders show tasks from any date.
- Time-of-day filters (morning, afternoon, evening) apply only when a specific date is selected and do not restrict pending/completed lists to avoid hiding important tasks.
- Category and pet filters apply globally across all reminders.
- This approach ensures users see all relevant reminders clearly without unintentionally filtering out important items.
---

## Responsive Design
### The app adapts smoothly across devices:
- Calendar strip fits screen width on mobile without horizontal scrolling.
- Buttons and inputs resize for easy tapping.
- Layout adjusts for small screens with vertical stacking where needed.
---

