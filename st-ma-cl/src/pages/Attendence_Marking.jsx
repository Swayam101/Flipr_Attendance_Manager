import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Mark_attendence from '../components/Mark_attendence';
import useAuthStore from '../contexts/AuthStore';
import QrCode from '../pages/QrCode.jsx'


function Attendence_Marking() {

    const isAdmin = useAuthStore((state)=>state.isAdmin)

    const userRole = isAdmin ? 'admin' : 'student';
    const attendanceDataFromBackend ="studenthashstringfrombackend";
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      <QrCode/>
      {/* <Mark_attendence attendanceData={attendanceDataFromBackend} /> */}
    </>
    )
}

export default Attendence_Marking