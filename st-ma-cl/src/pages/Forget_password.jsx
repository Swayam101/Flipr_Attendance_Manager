import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axiosConfig";
import {useNavigate} from 'react-router-dom'

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

const OtpChecker = ({email}) => {

  const otpRef = useRef();
  const passwordRef = useRef();
  const navigate=useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
    const password = passwordRef.current.value;
    console.log(otp,password);
    try {
        const response=await axiosConfig({
            url:"/auth/check-hash",
            method:"POST",
            data:{
                userOtp:otp,
                newPassword:password,
                email
            }
        })
        toast.success(response.data.message);
       navigate("/login")
    } catch (error) {
        toast.error(error.response.data.message);
        navigate("/forgot_password")
    }
  };

  return (
    <>
      <input ref={otpRef} type="text" placeholder="Enter OTP" className="forget-input" />
      <input
        type="password"
        ref={passwordRef}
        placeholder="Enter New Password"
        className="forget-input"
      />

      <button onClick={handleResetPassword} className="continue-btn">Reset Password</button>
    </>
  );
};

export default ForgetPassword;
