import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [forumAdmin, forumAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || forumAdminLoading){
        return <div className="flex justify-center items-center h-screen"><progress className="progress w-56"></progress></div>
    }
    if(user && forumAdmin){
        return children;
    }
    return <Navigate to="/login" state={{from:location}} replace ></Navigate>
};

export default AdminRoute;