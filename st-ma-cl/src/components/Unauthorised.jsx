import React, { useContext } from 'react'
import unauth from '../images/unauth.webp'
import { Link } from 'react-router-dom'
import useAuthStore from '../contexts/AuthStore.js'


const Unauthorised = () => {
  const isAdmin=useAuthStore((state)=>state.isAdmin)
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{ height: "60vh", width: "60vw", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={unauth} alt="" />
      </div>
        <Link to={isAdmin ? "/" : "student_approval"}><button style={{position:'absolute', top:'680px', left:'47%'}}>GO Back</button></Link>
    </div>
  )
}

export default Unauthorised
