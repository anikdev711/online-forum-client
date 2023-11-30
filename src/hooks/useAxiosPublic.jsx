import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://online-forum-server-ten.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;