import React ,{useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Student_Profile from '../components/Student_Profile'
import './Profile.css';

function Profile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
    <Topbar userRole={userRole}/>
    <Sidebar userRole={userRole} />
    <Student_Profile/>
  </>
  )
}

export default Profile