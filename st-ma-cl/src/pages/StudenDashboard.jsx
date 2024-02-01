import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StudentApproval from '../components/StudentApproval'
import useAuthStore from '../contexts/AuthStore'


function StudenDashboard() {
  const isAdmin=useAuthStore((state)=>state.isAdmin)
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
      <Topbar userRole={userRole}/>
      <Sidebar userRole={userRole}/>
      <StudentApproval/>
    </>
  )
}

export default StudenDashboard