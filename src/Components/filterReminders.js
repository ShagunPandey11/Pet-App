// filterReminders.js
export function filterReminders(reminders, filters, selectedDate, viewAll) {
  // Helper function to check if two dates are same day
  console.log('First time loading at top of file')
  console.log({reminders,filters,selectedDate})
  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
   const now = new Date();

  // Helper function to check if reminder is completed
  function isCompleted(reminder) {
    return reminder.status !== 'pending';
  }

  const specificDateReminders = reminders.filter(r => {  
    console.log(r.title)
    const reminderDate = new Date(r.startdate);
    console.log(reminderDate);
    const completed = isCompleted(r);
    console.log(completed);
    return isSameDay(reminderDate, selectedDate) && !completed;
    });
    console.log('SpecificDateReminders')
    console.log(specificDateReminders )

   const pendingReminders = reminders.filter(r => {
    const reminderDate = new Date(r.startdate);
    const completed = isCompleted(r);
    return (
      (reminderDate < now || isSameDay(reminderDate, now)) && !completed
    );
  });
    console.log('PendinG Reminders')
    console.log( pendingReminders)

  const completedReminders = reminders.filter(r => r.status =='completed');
  
  function PetandCategoryFilter(rem){
     return rem.filter(r =>{
      const petMatches = filters.petFilter === 'all' || r.pet ===filters.petFilter;
      const categoryMatches = filters.categoryFilter === 'all' || r.category === filters.categoryFilter;
      return petMatches && categoryMatches;
    })
  } 

  function TimeOfDayFilter(rem){
      return rem.filter(r=>{
         if(viewAll){
          console.log('View All from inside of timeOfday');
          console.log(viewAll);
        return true;
         };
      const [hour] = r.time.split(':').map(Number)
      console.log(hour);
      if (filters.timeFilter === 'morning') return hour < 12;
      if (filters.timeFilter === 'afternoon') return hour >= 12 && hour < 17;
      if (filters.timeFilter=== 'evening') return hour >= 17;
      return true;
      }
      )
  }  
    console.log('reminders that are going')
    const pending= PetandCategoryFilter(pendingReminders);
    console.log(pending);

    console.log('all all that are going')
    const allReminders= TimeOfDayFilter(PetandCategoryFilter(specificDateReminders))
    console.log(allReminders);
    console.log('done');


  return {
    pending: PetandCategoryFilter(pendingReminders),
    completed: PetandCategoryFilter(completedReminders),
    allReminders : TimeOfDayFilter(PetandCategoryFilter(specificDateReminders))
  };
}
