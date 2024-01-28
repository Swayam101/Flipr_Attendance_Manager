import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore.js";


const ProtectedRoute=({component})=>{
    const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)
    const userData=useAuthStore((state)=>state.userData)
      
    if(!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>
    if(!userData.approved) return <Navigate to={"/student_approval"} replace></Navigate>
    return component
}

export default ProtectedRoute