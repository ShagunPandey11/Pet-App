//ReminderFilter.js
import React from 'react';
import './ReminderFilter.css'

const ReminderFilter = ({ filters, setFilters }) => {
  const handleTimeFilterChange = (e) => {
    setFilters(prev => ({ ...prev, timeFilter: e.target.value }));
  };

  const handlePetFilterChange = (e) => {
    setFilters(prev => ({ ...prev, petFilter: e.target.value }));
  };

  const handleCategoryFilterChange = (e) => {
    setFilters(prev => ({ ...prev, categoryFilter: e.target.value }));
  };

  return (
    <div className="reminder-filter">
      <label>
        Time:
        <select value={filters.timeFilter} onChange={handleTimeFilterChange}>
          <option value="all">All</option>
          <option value="morning">Morning (Before 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="evening">Evening (After 5 PM)</option>
        </select>
      </label>

      <label>
        Pet:
        <select value={filters.petFilter} onChange={handlePetFilterChange}>
          <option value="all">All Pets</option>
          <option value="Simba">Simba</option>
          <option value="Brownie">Brownie</option>
        </select>
      </label>

      <label>
        Category:
        <select value={filters.categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="all">All Categories</option>
          <option value="Health">Health</option>
          <option value="Feeding">Feeding</option>
        </select>
      </label>
    </div>
  );
};

export default ReminderFilter;
