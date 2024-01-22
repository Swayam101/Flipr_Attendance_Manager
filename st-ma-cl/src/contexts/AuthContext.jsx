import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [userData,setUserData]=useState({})

  useEffect(()=>{
    const currentData=JSON.parse(sessionStorage.getItem("user"))
    if(!currentData){ 
      setIsLoggedIn(false)
      setIsAdmin(false)
      setUserData({})
    }
    else{
      setUserData(currentData)
      setIsAdmin(true)
      setIsLoggedIn(true)
    }
  },[])

  const getUserData=()=>{
   if(!sessionStorage.getItem("user")) return {} 
   return JSON.parse(sessionStorage.getItem("user"))
  }

  
  

  const saveUserData = (data) => {
    setIsLoggedIn(true)
    if(data.isAdmin) setIsAdmin(true)
    return sessionStorage.setItem("user", JSON.stringify(data));
  }
  
 
  
  const removeUserData=()=>sessionStorage.removeItem("user")
  return (
    <AuthContext.Provider value={{ saveUserData,getUserData,removeUserData,isLoggedIn,setIsLoggedIn,isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


