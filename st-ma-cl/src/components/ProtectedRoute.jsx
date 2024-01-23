import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";
import useAuthStore from "../contexts/AuthStore.js";


const ProtectedRoute=({component})=>{
    const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)  
    if(!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>
    return component
}

export default ProtectedRoute