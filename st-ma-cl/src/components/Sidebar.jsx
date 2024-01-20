import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../style.css';
import adminlogo from '../images/adminlogo1.png';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="admin_logo">
        <img src={adminlogo} alt="" />
        <h5 className='dashboard-heading'>Attendance Manager</h5>
      </div>
      <ul className="sidebar-menu">
        <li className={activeItem === 'Dashboard' ? 'active' : ''}>
          <Link to="/" onClick={() => handleItemClick('Dashboard')}>
            Dashboard
          </Link>
        </li>
        <li className={activeItem === 'Students' ? 'active' : ''}>
          <Link to="/students" onClick={() => handleItemClick('Students')}>
            Students
          </Link>
        </li>
        <li className={activeItem === 'Attendance' ? 'active' : ''}>
          <Link to="/attendance" onClick={() => handleItemClick('Attendance')}>
            Attendance
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
