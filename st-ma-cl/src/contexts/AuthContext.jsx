import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const saveUserData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };
  return (
    <AuthContext.Provider value={{ saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


