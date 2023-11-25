import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Loader className="flex justify-center items-center h-screen"></Loader>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;