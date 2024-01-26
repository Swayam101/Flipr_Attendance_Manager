import { Navigate } from "react-router-dom";

import useAuthStore from "../contexts/AuthStore";


const AdminRoute = ({ component, ...rest }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  if (!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>;
  if (isAdmin) return component;
  return <Navigate to={"/student_approval"} replace></Navigate>;
};

export default AdminRoute;
