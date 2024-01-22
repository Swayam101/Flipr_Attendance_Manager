import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

  const saveUserData = (data) => localStorage.setItem("user", JSON.stringify(data));
  
  const getUserData=()=>JSON.parse(localStorage.getItem("user"))
  
  const removeUserData=()=>localStorage.removeItem("user")
  return (
    <AuthContext.Provider value={{ saveUserData,getUserData,removeUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


