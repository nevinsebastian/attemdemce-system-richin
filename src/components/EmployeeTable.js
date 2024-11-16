import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Importing styles for the calendar
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to control calendar visibility

  // Dummy employee data
  const employees = [
    { id: 1, first_name: 'John', last_name: 'Doe', role: 'Admin' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', role: 'Employee' },
    { id: 3, first_name: 'Sara', last_name: 'Wilson', role: 'Employee' },
    { id: 4, first_name: 'Michael', last_name: 'Brown', role: 'Manager' },
    { id: 5, first_name: 'Emily', last_name: 'Davis', role: 'Employee' },
  ];

  // Filter employees by name or id
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.id.toString().includes(searchLower)
    );
  });

  // Handle single checkbox change
  const handleCheckboxChange = (id) => {
    const updatedSelectedEmployees = [...selectedEmployees];
    if (updatedSelectedEmployees.includes(id)) {
      setSelectedEmployees(updatedSelectedEmployees.filter((employeeId) => employeeId !== id));
    } else {
      updatedSelectedEmployees.push(id);
      setSelectedEmployees(updatedSelectedEmployees);
    }
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((employee) => employee.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle Date Picker selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting a date
  };

  // Handle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="employee-table-container">
      <div className="table-header">
        <div className="date-button-container">
          <button onClick={toggleCalendar} className="date-button">
            {selectedDate.toLocaleDateString()} {/* Show selected date */}
          </button>
          {isCalendarOpen && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="select-all-checkbox"
              />
            </th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </td>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
