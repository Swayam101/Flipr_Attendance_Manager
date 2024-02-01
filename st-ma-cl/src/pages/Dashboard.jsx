import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminMainBody from '../components/AdminMainBody';
import useAuthStore from '../contexts/AuthStore';

function Dashboard() {
  
  const isAdmin=useAuthStore((state)=>state.isAdmin)
  const userRole = isAdmin ? 'admin' : 'student';
  
  
  return (
    <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      <AdminMainBody userRole={userRole} />
    </>
  );
}

export default Dashboard;
