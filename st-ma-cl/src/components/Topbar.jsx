import React, { useState } from 'react';
import '../style.css';
import { FaRegBell } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import avtar from '../images/avtar2.jpg';
import { Link } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';

function Topbar() {
  const [showOptions, setShowOptions] = useState(false);

  const handleProfileClick = () => {
    setShowOptions(!showOptions);
  };
  const username="hatim";
  return (
    <div className="topbar">
      <div></div>
      <div className="topbar__right">
        <div className="topbar__icon" onClick="">
          <FaRegBell />
        </div>
        <div className="topbar__userProfile">
          <img
            src={avtar}
            alt="user profile"
            onClick={handleProfileClick}
          />
          {showOptions && (
            <div className="profileOptions card">
              <div className="topLayer"></div>
              <div className='big-profile'>
                <img
                  src={avtar}
                  alt="user profile"
                  onClick={handleProfileClick}
                />
              </div>
              <div className="username-title">
                <h5>Hatim-Dahi</h5>
                <p>Hatimdahi@gmail.com</p>
              </div>
              <div className="list-options">
              <Link to={`/profile/${username}`} ><button className="profileOptionButton">View Profile</button></Link>
              <button onClick={async (e)=>{
               try {
                const response=await axiosConfig({
                  url:"/auth/logout",
                  method:"POST",
                  withCredentials:true
                })
                console.log(response);
               } catch (error) {
                console.log(error);
               }
              }} className="profileOptionButton">Log Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
