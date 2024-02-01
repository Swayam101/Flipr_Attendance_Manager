import { useEffect, useState } from "react";
import "../style.css";
import { FaRegBell, FaTimes } from "react-icons/fa";
import avtar from "../images/avtar2.jpg";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";
import useAuthStore from "../contexts/AuthStore";
import useSocketStore from "../contexts/SocketStore";
import { MdDashboard, MdOutlineQrCodeScanner } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import PropTypes from 'prop-types';

function Topbar({ userRole }) {
  const logOutUser = useAuthStore((state) => state.logOutUser);
  const user = useAuthStore((state) => state.userData);
  Modal.setAppElement("#root");
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const socket = useSocketStore((state) => state.socket);
  const isApproved = useAuthStore((store) => store.isApproved);

  useEffect(() => {
    fetchData();
    subscribeToSocket();
    return unsubscribeFromSocket;
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosConfig.get("/student/approved");
      setPendingStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const subscribeToSocket = () => {
    socket.on('approve-student', handleSocketApproval);
  };

  const unsubscribeFromSocket = () => {
    socket.off('approve-student', handleSocketApproval);
  };

  const handleSocketApproval = (data) => {
    setPendingStudents(data.students);
  };

  const handleProfileClick = () => {
    setShowNotifications(false);
    setShowOptions(!showOptions);
  };

  const handleBellIconClick = () => {
    setShowOptions(false);
    setShowNotifications(!showNotifications);
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

  const handleKeyDown = (event) => {
    // Handle keyboard events here
    if (event.key === 'Enter') {
      // Example: Execute the same action as the click handler
      handleProfileClick();
    }
  };

  return (
    <div className="topbar">
      <div className="topbar_left">
        {userRole === "admin" && (
          <>
            <div className="s-topbar-icon">
              <Link to="/"><MdDashboard style={{ color: 'white' }} /></Link>
            </div>
            <div className="s-topbar-icon">
              <Link to="/students"><PiStudentBold style={{ color: 'white' }} />
              </Link>
            </div>
            <div className="s-topbar-icon">
              <Link to="/attendance"><SlCalender a style={{ color: 'white' }} />
              </Link>
            </div>
          </>
        )}
        {userRole === "student" && isApproved && (
          <>
            <div className="s-topbar-icon">
              <Link to="/"><MdDashboard style={{ color: 'white' }} /></Link>
            </div>
            <div className="s-topbar-icon">
              <Link to="/mark_attendance"><MdOutlineQrCodeScanner style={{ color: 'white' }} />
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="topbar__right">
        {userRole === "admin" && (
          <div 
            className="topbar__icon" 
            onClick={handleBellIconClick}
            onKeyDown={handleKeyDown} // Add keydown event listener
            tabIndex={0} // Ensure element is focusable
          >
            <FaRegBell />
            {pendingStudents.length > 0 && (
              <div className="notification-count">
                {pendingStudents.length == 0 ? "0" : pendingStudents.length}
              </div>
            )}
          </div>
        )}
        <div className="topbar__userProfile">
          <img 
            src={avtar} 
            alt="user profile" 
            onClick={handleProfileClick} 
            onKeyDown={handleKeyDown} // Add keydown event listener
            tabIndex={0} // Ensure element is focusable
          />
          {showOptions && (
            <div className="profileOptions card">
              <div className="topLayer"></div>
              <div className="big-profile">
                <img
                  src={avtar}
                  alt="user profile"
                  onClick={handleProfileClick}
                  onKeyDown={handleKeyDown} // Add keydown event listener
                  tabIndex={0} // Ensure element is focusable
                />
              </div>
              <div className="username-title">
                <h5>{user.name}</h5>
                <p>{user.email}</p>
              </div>
              <div className="list-options">
                <Link to={`/profile`}>
                  <button
                    className="profileOptionButton"
                    style={{ marginRight: "10px" }}
                  >
                    View Profile
                  </button>
                </Link>
                <button
                  onClick={async (e) => {
                    try {
                      e.preventDefault()
                      logOutUser();
                      navigate('/')
                      console.log("Button Clicked!");
                      const response = await axiosConfig({
                        url: "/auth/logout",
                        method: "POST",
                      });
                      console.log(response);


                    } catch (error) {
                      console.log(`Log Out error: ${error}`);
                    }
                  }}
                  className="profileOptionButton"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          {showNotifications && (
            <div className="profileOptions notification-popup card">
              <h5 style={{ margin: "15px 0" }}>Notifications</h5>
              {pendingStudents.map((student) => (
                <div
                  key={student._id}
                  className="pending-students"
                  onClick={() => handleStudentClick(student)}
                  onKeyDown={handleKeyDown} // Add keydown event listener
                  tabIndex={0} // Ensure element is focusable
                >
                  <p>{student.name} is pending approval</p>
                </div>
              ))}
              {pendingStudents.length === 0 && <p>No notification to show</p>}
            </div>
          )}

          {selectedStudent && (
            <Modal
              isOpen={showModal}
              onRequestClose={handleCloseModal}
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-70%, -50%)",
                  backgroundColor: "rgb(0,32,85,0.9)",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  border: "none",
                  width: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  marginLeft: "70px",
                },
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(3px)",
                },
              }}
            >
              <span
                className="close-button"
                onClick={handleCloseModal}
                onKeyDown={handleKeyDown} // Add keydown event listener
                tabIndex={0} // Ensure element is focusable
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "5px",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </span>
              <h6 style={{ marginTop: "5px" }}>
                {" "}
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {selectedStudent.name}
                </span>{" "}
                has requested approval to join Class. Do you want to approve
                their admission?
              </h6>
              <div>
                <button
                  onClick={async (e) => {
                    try {
                      await axiosConfig({
                        url: `/student/approve/${selectedStudent._id}`,
                        method: "POST",
                        withCredentials: true,
                        data: {},
                      });
                      const newPendingStudents = pendingStudents.filter(
                        (obj) => obj._id !== selectedStudent._id
                      );
                      setPendingStudents(newPendingStudents);
                      setShowModal(false);

                      toast.success("Student Approved Successfully!", {});
                    } catch (error) {
                      console.log("Approval error!");
                    }
                  }}
                  className="profileOptionButton"
                  style={{ marginTop: "15px", marginBottom: "5px" }}
                  onKeyDown={handleKeyDown} // Add keydown event listener
                  tabIndex={0} // Ensure element is focusable
                >
                  Approve
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

Topbar.propTypes = {
  userRole: PropTypes.oneOf(['admin', 'student']).isRequired
};

export default Topbar;
