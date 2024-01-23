import React from 'react'
import { Link } from 'react-router-dom'

function Student_approval() {
  
  return (
    <div className="card approval-box">
        <h4>Approval Pending</h4>
        <p>Your application is under review, once the adim approved it, you will be able to access the dashboard</p>
        <Link to={`/profile`} ><button className="profileOptionButton">Update Profile</button></Link>
    </div>
  )
}

export default Student_approval