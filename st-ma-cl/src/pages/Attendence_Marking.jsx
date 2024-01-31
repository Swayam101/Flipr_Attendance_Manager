import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuthStore from '../contexts/AuthStore';
import Qr_Scanner from '../components/Qr_Scanner';

function Attendence_Marking() {

    const isAdmin = useAuthStore((state)=>state.isAdmin)
    const userRole = isAdmin ? 'admin' : 'student';
  
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      <Qr_Scanner/>
    </>
    )
}

export default Attendence_Marking