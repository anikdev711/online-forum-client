import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'https://online-forum-server-ten.vercel.app'
})

const useAxiosSecure = () => {
    const { signOutFromForum } = useAuth();
    const navigate = useNavigate();

    // request interceptor
    axiosSecure.interceptors.request.use(function (config) {

        const token = localStorage.getItem('user-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await signOutFromForum();
            navigate('/login')
        }
        return Promise.reject(error);
    });




    return axiosSecure;
};

export default useAxiosSecure;