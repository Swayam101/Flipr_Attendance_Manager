import React ,{useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Student_attendence from '../components/Student_attendence'

function Attendence() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userRole = isAdmin ? 'admin' : 'student';
  return (
    <>
    <Topbar userRole={userRole}/>
    <Sidebar userRole={userRole}/>
    <Student_attendence/>
  </>
  )
}

export default Attendence