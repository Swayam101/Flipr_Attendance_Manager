import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore.js";

const ProtectedRoute=({component})=>{
    const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)
    if(!isLoggedIn) return <Navigate to={"/login"} replace></Navigate>
    return component
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired
};

export default ProtectedRoute;
