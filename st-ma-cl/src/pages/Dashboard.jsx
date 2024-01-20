import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import AdminMainBody from '../components/AdminMainBody'

function Dashboard() {
  return (
    <>
      <Topbar />
      <Sidebar />
      <AdminMainBody/>
    </>
  )
}

export default Dashboard