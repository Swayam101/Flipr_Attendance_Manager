import React, { useContext } from 'react'
import unauth from '../images/unauth.webp'
import { Link } from 'react-router-dom'


const Unauthorised = () => {
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{ height: "60vh", width: "60vw", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={unauth} alt="" />
      </div>
        <Link to={"/"}><button style={{position:'absolute', top:'680px', left:'47%'}}>GO Back</button></Link>
    </div>
  )
}

export default Unauthorised
