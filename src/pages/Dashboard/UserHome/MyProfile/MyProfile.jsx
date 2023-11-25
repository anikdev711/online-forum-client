import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";


const MyProfile = () => {
    const axiosSecureUser = useAxiosSecure();
    const { user } = useAuth();
    const {
        data: userInfo = {}
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/users/${user?.email}`);
            console.log(res);
            return res.data;
        }
    })
    console.log(userInfo);
    return (
        <div>

            <div className="relative flex flex-col text-gray-700 bg-white shadow-md max-w-sm rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                    <img src={userInfo?.photoURL} alt="profile-picture" className=""/>
                </div>
                <div className="p-6 text-center">
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {userInfo?.name}
                    </h4>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                        {userInfo?.email}
                    </p>
                    <p className="block font-sans text-green-600 text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                       Badge: {userInfo?.badge}
                    </p>
                </div>
                
            </div>

        </div>
    );
};

export default MyProfile;