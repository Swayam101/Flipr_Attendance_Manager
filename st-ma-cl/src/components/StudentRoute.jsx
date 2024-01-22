import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import useAuthStore from "../contexts/AuthStore.js";


const StudentRoute=({component})=>{
    const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)
    const isAdmin=useAuthStore((state)=>state.isAdmin)   
    if(!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>
    if(!isAdmin) return component
    toast.error("You don't have access to this route")
    return <Navigate to={"/"} replace></Navigate>
}

export default StudentRoute