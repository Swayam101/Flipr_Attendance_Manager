import React, { useContext, useState } from "react";
import avtar from "../images/avtar2.jpg";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import useAuthStore from "../contexts/AuthStore";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";

function Student_Profile() {
  const userData = useAuthStore((state) => state.userData);
  const setUserData = useAuthStore((state) => state.setUserData);

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

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: userData.name,
    dateOfBirth: userData.DOB,
    address: userData.address,
    phone: userData.phone,
    email: userData.email,
    roll_no: userData.roll,
    country: userData.country,
    age: calculateAge(new Date(userData.DOB)),
  });

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosConfig({
      url: "/student/update-profile",
      method: "POST",
      data: formData,
      withCredentials: true,
    });
    toast.success("Profile Updated Successfully!");
    setUserData(response.data.updatedUser);
    setEditMode(false);
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
        <h4 className="username-st-pro">{formData.name}</h4>
        <p>{formData.email}</p>
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
                name="lastName"
                value={formData.name}
                style={{ cursor: "not-allowed" }}
                disabled={true}
              />
              <h5>Roll-No:</h5>
              <input
                type="text"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleInputChange}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
            </div>

            <div className="info-field">
              <h5>Phone:</h5>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <h5>DOB:</h5>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Age:</h5>
              <input
                type="text"
                name="age"
                value={calculateAge(new Date(userData.DOB))}
                onChange={handleInputChange}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              />
              <h5>Country:</h5>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div className="info-field">
              <h5>Address:</h5>
              <input
                type="text"
                name="address"
                value={formData.address}
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
