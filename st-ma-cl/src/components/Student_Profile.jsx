import React, { useContext, useState } from "react";
import avtar from "../images/avtar2.jpg";
import { FaEdit, FaMailBulk } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import useAuthStore from "../contexts/AuthStore";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";

function calculateAge(dateOfBirth) {
  var dob = new Date(dateOfBirth);
  var currentDate = new Date();
  var age = currentDate.getFullYear() - dob.getFullYear();
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
  const formattedDate = newDate.toISOString().split("T")[0];
  return formattedDate;
};

function Student_Profile() {
  const userData = useAuthStore((state) => state.userData);
  const setUserData = useAuthStore((state) => state.setUserData);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig({
        url: "/student/update-profile",
        method: "POST",
        data: userData,
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

  return (
    <div className="profile_container">
      <div className="profile-left card">
        <div className="student-profile-sec">
          <img src={avtar} alt="user profile" />
        </div>
        <span className="pencil-icon" onClick={handleEdit}>
          <FaEdit />
        </span>
        <h4 className="username-st-pro">{userData.name}</h4>
        <p>{userData.email}</p>
      </div>

      <div className="profile-right card">
        <div className="general-info-heading">
          <h4>Personal Information</h4>
          <button onClick={handleEdit}>
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
                value={userData.name}
                style={{ cursor: "not-allowed" }}
                disabled={true}
              />
              <h5>Roll-No:</h5>
              <input
                type="text"
                name="roll"
                value={userData.roll}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
            </div>

            <div className="info-field">
              <h5>Phone:</h5>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <h5>DOB:</h5>
              <input
                type="date"
                name="DOB"
                value={formatDate(userData.DOB)}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Age:</h5>
              <input
                type="text"
                name="age"
                value={calculateAge(userData.DOB)}
                onChange={handleInputChange}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
              <h5>Country:</h5>
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Address:</h5>
              <input
                type="text"
                name="address"
                value={userData.address}
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
