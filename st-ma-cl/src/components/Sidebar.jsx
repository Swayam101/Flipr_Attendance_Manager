import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import adminlogo from '../images/adminlogo1.png';
import useAuthStore from '../contexts/AuthStore';
import PropTypes from 'prop-types';


function Sidebar({ userRole }) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };


  
  const isApproved = useAuthStore((store) => store.isApproved);

  return (
    <div className="sidebar-wrapper">
      <div className="admin_logo">
        <img src={adminlogo} alt="" />
        <h5 className='dashboard-heading'>Attendance Manager</h5>
      </div>

      {isApproved && (
        <ul className="sidebar-menu">
          {userRole === 'admin' && (
            <>
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
            </>
          )}
          {userRole === 'student' && (
            <>
              <li className={activeItem === 'Dashboard' ? 'active' : ''}>
                <Link to="/" onClick={() => handleItemClick('Dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li className={activeItem === 'MarkAttendance' ? 'active' : ''}>
                <Link to="/mark_attendance" onClick={() => handleItemClick('MarkAttendance')}>
                  Mark Attendance
                </Link>
              </li>
            </>
          )}
        </ul>

      )}

    </div>
  );
}

Sidebar.propTypes = {
  userRole: PropTypes.oneOf(['admin', 'student']).isRequired
};

export default Sidebar;