import { useQuery } from "@tanstack/react-query";
// import announceImage from "../../assets/announcement/announce.png"
import announcing from "../../assets/announcement/announcing.jpg"
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const Announcements = () => {
    // const axiosPublicUser = useAxiosPublic();
    const { user } = useAuth();
    const axiosSecureUser = useAxiosSecure();
    const {
        data: announcements
    } = useQuery({
        queryKey: ['all-announcement'],
        queryFn: async () => {
            const res = await axiosSecureUser.get('/announcements');
            // console.log(res.data);
            return res.data;
        }
    })

    // console.log(announcements);

    return (
        <div>
            {
                user ? <div>
                    <h1 className="font-bold text-3xl text-center mb-10 mt-10">Announcements</h1>
                    <div className="max-w-xl mx-auto">


                        <div className="hero">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src={announcing} className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    {
                                        announcements?.map(item => (
                                            <div key={item._id}>
                                                <h1 className="text-2xl font-bold text-red-600">{item?.postTitle}</h1>
                                                <p className="py-6">{item?.postDescription}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : ''
            }
        </div>
    );
};

export default Announcements;



