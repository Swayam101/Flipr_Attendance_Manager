import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminMainBody from '../components/AdminMainBody';

function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(true);
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
