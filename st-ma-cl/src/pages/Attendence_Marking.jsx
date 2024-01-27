import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Mark_attendence from '../components/Mark_attendence';
import useAuthStore from '../contexts/AuthStore';



function Attendence_Marking() {

    const isAdmin = useAuthStore((state)=>state.isAdmin)

    const userRole = isAdmin ? 'admin' : 'student';
  
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
     
      <Mark_attendence  />
    </>
    )
}

export default Attendence_Marking