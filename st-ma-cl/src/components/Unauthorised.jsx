import React, { useContext } from 'react'
import unauth from '../images/unauth.webp'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Unauthorised = () => {
    const {isAdmin}=useContext(AuthContext)
  return (
    <div style={{height:"100vh",width:"100vw",display:'flex',justifyContent:'center',alignItems:'center'}}>
      <img src={unauth} alt="" />
      <Link to={isAdmin?"/":"student_approval"}><button>GO Back</button></Link>
    </div>
  )
}

export default Unauthorised
