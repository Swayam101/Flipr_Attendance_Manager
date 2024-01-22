import React, { useContext, useState } from 'react';
import '../style.css';
import { FaRegBell } from "react-icons/fa";
import avtar from '../images/avtar2.jpg';
import { Link } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import useAuthStore from '../contexts/AuthStore';

function Topbar() {

  const logOutUser=useAuthStore((state)=>state.logOutUser)

  const [showOptions, setShowOptions] = useState(false);
 
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingStudents, setPendingStudents] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Charlie Brown' },
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProfileClick = () => {
    if (showNotifications) setShowNotifications(false);
    setShowOptions(!showOptions);
  };

  const handleBellIconClick = () => {
    if (showOptions) setShowOptions(false);
    setShowNotifications(!showNotifications);
    setNotificationCount(0);
    setShowOptions(false);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };


  const username = "hatim";
  return (
    <div className="topbar">
      <div></div>
      <div className="topbar__right">
        <div className="topbar__icon" onClick={handleBellIconClick}>
          <FaRegBell />
          {pendingStudents.length > 0 && (
            <div className="notification-count">{pendingStudents.length}</div>
          )}
        </div>

        <div className="topbar__userProfile">
          <img
            src={avtar}
            alt="user profile"
            onClick={handleProfileClick}
          />
          {showOptions && (
            <div className="profileOptions card">
              <div className="topLayer"></div>
              <div className='big-profile'>
                <img
                  src={avtar}
                  alt="user profile"
                  onClick={handleProfileClick}
                />
              </div>
              <div className="username-title">
                <h5>Hatim-Dahi</h5>
                <p>Hatimdahi@gmail.com</p>
              </div>
              <div className="list-options">

              <Link to={`/profile/${username}`} ><button className="profileOptionButton">View Profile</button></Link>
              <button onClick={async (e)=>{
               try {
                const response=await axiosConfig({
                  url:"/auth/logout",
                  method:"POST",
                  withCredentials:true
                })
                console.log(response);
                toast.success("Logged Out Succesfully!")
                logOutUser()
               } catch (error) {
                toast.error("Internal Server Error")
               }
              }} className="profileOptionButton">Log Out</button>

              </div>
            </div>
          )}

          {showNotifications && (
            <div className="profileOptions notification-popup card">
              <h5 style={{ margin: '15px 0' }}>Notifications</h5>
              {pendingStudents.map((student) => (
                <div key={student.id} className="pending-students" onClick={() => handleStudentClick(student)}>
                  <p>{student.name} is pending approval</p>
                </div>
              ))}
              {pendingStudents.length === 0 && <p>No pending students</p>}
            </div>
          )}

          {selectedStudent && (
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>{selectedStudent.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Details: {selectedStudent.id}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick="">
                  Approve
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
