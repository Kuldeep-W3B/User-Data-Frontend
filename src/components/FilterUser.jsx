import React from 'react';

const FilterComponent = ({ filters, handleFilterChange, clearFilters }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mb-4">
      <h2 className="text-xl font-bold mb-4">Filter Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <select
          name="domain"
          value={filters.domain}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Domains</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>
        </select>
        
        {/* Gender Filter */}
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Agender">Agender</option>
          <option value="Bigender">Bigender</option>
          {/* Add more genders as needed */}
        </select>
        
        {/* Availability Filter */}
        <select
          name="available"
          value={filters.available}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Availabilities</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Clear Filters
      </button>
      
      
    </div>
  );
};

export default FilterComponent;
