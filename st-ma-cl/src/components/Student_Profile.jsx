import React, { useState } from 'react';
import avtar from '../images/avtar2.jpg';
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


function Student_Profile() {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Hatim',
        lastName: 'Dahi',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        address: 'Devi sing garden road, 451551 ',
        phone: '1010101010',
        email: 'hatim@gmail.com',
        roll_no:'2023001'
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to save the form data
        setEditMode(false);
    };

    return (
        <div className="profile_container">
            <div className="profile-left card">
                <div className='student-profile-sec'>
                    <img src={avtar} alt="user profile" />
                </div>
                <span className='pencil-icon' onClick={handleEdit}><FaEdit /></span>
                <h4 className='username-st-pro'>{formData.firstName +" "+formData.lastName}</h4>
                <p>{formData.email}</p>
            </div>

            <div className="profile-right card">
                <div className="general-info-heading">
                    <h4>Personal Information</h4>
                    <button onClick={handleEdit}><FiEdit />Edit</button>
                </div>
                <div className="personal-info">
                    <form onSubmit={handleSubmit}>
                        <div className="info-field">
                            <h5>
                                First Name:
                            </h5>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                            <h5>
                                Last Name:
                            </h5>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className="info-field">
                            <h5>
                                Date of Birth:
                            </h5>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                            <h5>
                                Gender:
                            </h5>
                            <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className="info-field">
                            <h5>
                                Phone:
                            </h5>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                disabled={!editMode}
                            />
                            <h5>
                                Roll-No:
                            </h5>
                            <input
                                type="text"
                                name="roll_no"
                                value={formData.roll_no}
                                onChange={handleInputChange}
                                disabled={true}
                                style={{cursor: 'not-allowed'}}
                            />
                        </div>
                        
                        <div className="info-field">
                            <h5>
                                Address:
                            </h5>
                            <input
                                className='address-input'
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={!editMode}
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
