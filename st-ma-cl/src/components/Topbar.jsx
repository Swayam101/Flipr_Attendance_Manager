import { useEffect, useState } from "react";
import "../style.css";

import { FaRegBell, FaTimes } from "react-icons/fa";

import avtar from "../images/avtar2.jpg";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";
import useAuthStore from "../contexts/AuthStore";
import useSocketStore from "../contexts/SocketStore";
import { MdMenu } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";


function Topbar({ userRole }) {
  const logOutUser = useAuthStore((state) => state.logOutUser);
  const user = useAuthStore((state) => state.userData);
  Modal.setAppElement("#root");

  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for managing sidebar open/close

  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    axiosConfig({
      url: "/student/approved",
      method: "GET",
    }).then((response) => {
      setPendingStudents(response.data.students);
    });

    socket.on('approve-student',(data)=>{
      setPendingStudents(data.students)
     
    })
    
    
    return ()=>{
      socket.off('approve-student')
    }
    // socket.emit("join-room",user._id)

  }, []);

  const userData = useAuthStore((store) => store.userData);
  const isApproved = userData.approved;

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
        {userRole === "student" && (
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
          <div className="topbar__icon" onClick={handleBellIconClick}>
            <FaRegBell />
            {pendingStudents.length > 0 && (
              <div className="notification-count">
                {pendingStudents.length == 0 ? "0" : pendingStudents.length}
              </div>
            )}
          </div>
        )}
        <div className="topbar__userProfile">
          <img src={avtar} alt="user profile" onClick={handleProfileClick} />
          {showOptions && (
            <div className="profileOptions card">
              <div className="topLayer"></div>
              <div className="big-profile">
                <img
                  src={avtar}
                  alt="user profile"
                  onClick={handleProfileClick}
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
                      logOutUser();
                      await axiosConfig({
                        url: "/auth/logout",
                        method: "POST",
                        withCredentials: true,
                      });
                     
                    } catch (error) {
                      // toast.error(error.response.data.message);
                      logOutUser();
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

export default Topbar;
