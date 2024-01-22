import React, { useState } from 'react';
import '../style.css';
import { FaRegBell,FaTimes  } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import avtar from '../images/avtar2.jpg';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axiosConfig from '../utils/axiosConfig';


Modal.setAppElement('#root'); 

function Topbar({ userRole }) {
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
    setShowOptions(false);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
    setShowNotifications(false);
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
      {userRole === 'admin' && (
        <div className="topbar__icon" onClick={handleBellIconClick}>
          <FaRegBell />
          {pendingStudents.length > 0 && (
            <div className="notification-count">{pendingStudents.length}</div>
          )}
        </div>
      )}
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
               } catch (error) {
                console.log(error);
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
            <Modal
              isOpen={showModal}
              onRequestClose={handleCloseModal}
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor:' rgba(78, 89, 92)',
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                  border:'none',
                  width:'350px',
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  textAlign:'center',
                  marginLeft:'70px'
                },
                overlay: {
                  background: 'rgba(98, 96, 96, 0.5)',
                },
              }}
            >
               <span className="close-button" onClick={handleCloseModal} style={{position:'absolute', top:'4px', right:'5px', cursor:'pointer'}}>
                <FaTimes />
              </span>
              <h6 style={{marginTop:'5px'}}> <span style={{fontWeight:'bold', fontSize:'18px'}}>{selectedStudent.name}</span> has requested approval to join Class. Do you want to approve their admission?</h6>
              <div>
                <button onClick="" className="profileOptionButton" style={{marginTop:'15px',marginBottom:'5px'}}>Approve</button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
