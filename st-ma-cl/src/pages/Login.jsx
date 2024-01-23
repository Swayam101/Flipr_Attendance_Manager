import React, { useRef, useState,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./login.css";
import useAuthStore from "../contexts/AuthStore.js";

const Login = () => {

  const [isChecked, setIsChecked] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const saveUserData=useAuthStore((state)=>state.setUserData)


  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };
    try {
      const response = await axios({
        url: "http://localhost:3000/auth/login",
        method: "POST",
        data: userCredentials,
        withCredentials:true,
      });
      toast.success(response.data.message);
      response.data.user.isLoggedIn=true
      saveUserData(response.data.user)
      if(response.data.user.isAdmin) return navigate("/")
      if(!response.data.user.approved) return navigate("/student_approval")
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios({
        url: "http://localhost:3000/auth",
        method: "POST",
        data: userData,
      });
      toast.success(response.data.message);
      navigate("/student_approval")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="chk"
        aria-hidden="true"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <div className="signup">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            ref={nameRef}
            type="text"
            name="txt"
            placeholder="Enter User name"
          />
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Enter Email"
          />
          <input
            type="password"
            name="pswd"
            placeholder="Enter Password"
            ref={passwordRef}
          />
          <button className="login-button" onClick={handleSignUp}>
            Sign up
          </button>
        </form>
      </div>

      <div className="login">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={loginEmailRef}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            ref={loginPasswordRef}
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
          <a href="/forgot-password" className="forget-p">
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
