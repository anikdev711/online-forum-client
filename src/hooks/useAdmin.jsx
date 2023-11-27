import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecureUser = useAxiosSecure();
    const {
        data: forumAdmin, 
        isPending: forumAdminLoading
    } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/users/admin/${user?.email}`);
            console.log(res);
            return res.data;
        }
    })

    return [forumAdmin, forumAdminLoading]
};

export default useAdmin;