import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuthStore from '../contexts/AuthStore';
import QrScannr from '../components/QrScannr';

function AttendenceMarking() {

    const isAdmin = useAuthStore((state)=>state.isAdmin)
    const userRole = isAdmin ? 'admin' : 'student';
  
    return (
        <>
      <Topbar userRole={userRole} />
      <Sidebar userRole={userRole} />
      <QrScannr/>
    </>
    )
}

export default AttendenceMarking