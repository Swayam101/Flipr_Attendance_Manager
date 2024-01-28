import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Mark_attendence from '../components/Mark_attendence';
import useAuthStore from '../contexts/AuthStore';
import Qr_Scanner from '../components/Qr_Scanner';



function Attendence_Marking() {

    const isAdmin = useAuthStore((state)=>state.isAdmin)

    const userRole = isAdmin ? 'admin' : 'student';
  
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      {/* <Mark_attendence  /> */}
      <Qr_Scanner/>
    </>
    )
}

export default Attendence_Marking