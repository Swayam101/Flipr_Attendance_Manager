import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Student_approval from '../components/Student_approval'
import useAuthStore from '../contexts/AuthStore'


function StudenDashboard() {
  const isAdmin=useAuthStore((state)=>state.isAdmin)
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
      <Topbar userRole={userRole}/>
      <Sidebar userRole={userRole}/>
      <Student_approval/>
    </>
  )
}

export default StudenDashboard