import { Navigate } from "react-router-dom";

import React, { useContext } from "react";
import useAuthStore from "../contexts/AuthStore";
import { toast } from "react-toastify";

const AdminRoute = ({ component, ...rest }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  if (!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>;
  if (isAdmin) return component;
  return <Navigate to={"/student_approval"} replace></Navigate>;
};

export default AdminRoute;