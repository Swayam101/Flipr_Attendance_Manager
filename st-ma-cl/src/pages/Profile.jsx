import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StudentProfile from '../components/StudentProfile'
import './Profile.css';
import useAuthStore from '../contexts/AuthStore';

function Profile() {
  const isAdmin= useAuthStore((state)=>state.isAdmin);
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
    <Topbar userRole={userRole}/>
    <Sidebar userRole={userRole} />
    <StudentProfile/>
  </>
  )
}

export default Profile