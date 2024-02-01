import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axiosConfig";
import OtpChecker from "../components/OtpChecker";
// import {useNavigate} from 'react-router-dom'

const ForgetPassword = () => {
  const [mailStatus, setMailStatus] = useState(false);
  const emailRef = useRef();


  const handleContinue = async () => {
    const userEmail = emailRef.current.value;
    try {
      const response=await axiosConfig({url:"/auth/send-update-mail",method:"POST",data:{
          reciever:userEmail
      }})
      setMailStatus(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="main forget_Password_wrapper">
      <div className="forget-password-container">
        <h3 className="mt-2">Forget Password</h3>
        {mailStatus ? <></> : <p>Enter your email address</p>}

        {mailStatus ? (
          <OtpChecker email={emailRef.current.value} />
        ) : (
          <div className="forget-password-form">
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="forget-input"
            />
            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



export default ForgetPassword;
