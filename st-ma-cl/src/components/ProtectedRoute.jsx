
import { Navigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore.js";


const ProtectedRoute=({component})=>{
    const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)
    const isApproved=useAuthStore((state)=>state.isApproved)
    if(!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>
    // if(!isApproved) return <Navigate to={"/student_approval"} replace></Navigate>  
    
   
    
    return component
}

export default ProtectedRoute