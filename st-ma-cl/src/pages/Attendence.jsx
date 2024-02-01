import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StudentAttendence from '../components/StudentAttendence.jsx'
import useAuthStore from '../contexts/AuthStore';

function Attendence() {
  const isAdmin= useAuthStore((store)=>store.isAdmin);
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
    <Topbar userRole={userRole}/>
    <Sidebar userRole={userRole}/>
    <StudentAttendence/>
  </>
  )
}

export default Attendence