import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../utils/axiosConfig";
import {toast} from 'react-toastify'

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
          navigate("/forget_password")
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


  export default OtpChecker