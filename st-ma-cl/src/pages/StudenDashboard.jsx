import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Student_approval from '../components/Student_approval'


function StudenDashboard() {
  return (
    <>
      <Topbar />
      <Sidebar />
      <Student_approval/>
    </>
  )
}

export default StudenDashboard