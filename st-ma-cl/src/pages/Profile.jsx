import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Student_Profile from '../components/Student_Profile'
import './Profile.css';

function Profile() {
  return (
    <>
    <Topbar />
    <Sidebar />
    <Student_Profile/>
  </>
  )
}

export default Profile