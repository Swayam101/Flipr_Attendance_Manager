import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Mark_attendence from '../components/Mark_attendence';


function Attendence_Marking() {
  const isAdmin= useAuthStore((store)=>store.isAdmin);
    const userRole = isAdmin ? 'admin' : 'student';
    const attendanceDataFromBackend = "studenthashstringfrombackend";
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      <Mark_attendence attendanceData={attendanceDataFromBackend} />
    </>
    )
}

export default Attendence_Marking