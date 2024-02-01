import React, {useState } from "react";
import avtar from "../images/avtar2.jpg";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import useAuthStore from "../contexts/AuthStore";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";

function calculateAge(dateOfBirth) {
  let dob = new Date(dateOfBirth);
  let currentDate = new Date();
  let age = currentDate.getFullYear() - dob.getFullYear();
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
}

const formatDate = (date) => {
  const newDate = new Date(date);
  console.log(date);  
  const formattedDate = newDate.toISOString().split("T")[0];
  return formattedDate;
};

function Student_Profile() {
  const userData = useAuthStore((state) => state.userData);
  const [userDataState,setUserDataState]=useState({...userData})
  const setUserData = useAuthStore((state) => state.setUserData);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDataState({
      ...userDataState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig({
        url: "/student/update-profile",
        method: "POST",
        data: userDataState,
        withCredentials: true,
      });
      toast.success("Profile Updated Successfully!");
      response.data.updatedUser.isLoggedIn = true;
      console.log(response.data.updatedUser);
      setUserData(response.data.updatedUser);
      setEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div className="profile_container">
      <div className="profile-left card">
        <div className="student-profile-sec">
          <img src={avtar} alt="user profile" />
        </div>
        <span className="pencil-icon" onClick={handleEdit}   onKeyDown={handleKeyDown} tabIndex={0}>
          <FaEdit />
        </span>
        <h4 className="username-st-pro">{userData.name}</h4>
        <p>{userData.email}</p>
      </div>

      <div className="profile-right card">
        <div className="general-info-heading">
          <h4>Personal Information</h4>
          <button onClick={handleEdit} onKeyDown={handleKeyDown} tabIndex={0}>
            <FiEdit />
            Edit
          </button>
        </div>
        <div className="personal-info">
          <form onSubmit={handleSubmit}>
            <div className="info-field">
              <h5>Full Name:</h5>
              <input
                type="text"
                name="name"
                value={userDataState.name}
                style={{ cursor: "not-allowed" }}
                disabled={true}
              />
              <h5>Roll-No:</h5>
              <input
                type="text"
                name="roll"
                value={userDataState.roll}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
            </div>

            <div className="info-field">
              <h5>Phone:</h5>
              <input
                type="text"
                name="phone"
                value={userDataState.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <h5>DOB:</h5>
              <input
                type="date"
                name="DOB"
                value={formatDate(userDataState.DOB)}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Age:</h5>
              <input
                type="text"
                name="age"
                value={calculateAge(userDataState.DOB)}
                onChange={handleInputChange}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
              <h5>Country:</h5>
              <input
                type="text"
                name="country"
                value={userDataState.country}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Address:</h5>
              <input
                type="text"
                name="address"
                value={userDataState.address}
                onChange={handleInputChange}
                disabled={!editMode}
                style={{ width: "80%" }}
              />
            </div>
            <div className="pro-info-sub">
              {editMode && <button type="submit">Save</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Student_Profile;
