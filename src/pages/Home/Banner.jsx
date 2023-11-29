
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner/banner.jpg"
import { FaSearch } from "react-icons/fa";
// import { useState } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// const tags = [
//     'web',
//     'app',
//     'ai',
//     'iot',
//     'blockchain',
//     'cyber security'
// ]

const Banner = () => {

    // const axiosPublicUser = useAxiosPublic();
    // const [tag, setTag] = useState('');

    // const {
    //     data: forumPosts,

    // } = useQuery({
    //     queryKey: ['publicPosts', tag],
    //     queryFn: async () => {
    //         const res = await axiosPublicUser.get(`/posts/first?tag=${tag}`);
    //         return res.data;
    //     }
    // });
    // console.log(forumPosts);



    return (
        <div>
            <div className="hero bg-[#ffc107]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="w-1/2 flex justify-center lg:justify-end">
                        <img src={bannerImage} />
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-5xl text-center font-bold">Welcome to our forum</h1>
                        <p className="py-6 text-center">In Byte Talks forum, you can post your opinions or questions about web, app development, IoT, cyber security and blockchain. The community will help you.You can also find useful posts of others in this community.</p>
                        <Link to="/search">
                            <button className="btn btn-neutral text-white font-extrabold w-full">Search In Forum <FaSearch /> </button>
                        </Link>

                        {/* search */}

                        {/* <div>

                            <form>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                                        <button 
                                        onChange={(e)=>setTag(e.target.value)}
                                        type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form> */}

                        {/* </div> */}

                        <div className="flex flex-col md:flex-row  gap-2 mt-5 font-semibold justify-center items-center">
                            <p>Search Suggestions:</p>
                            <div className="badge badge-outline">web</div>
                            <div className="badge badge-outline">app</div>
                            <div className="badge badge-outline">iot</div>
                            <div className="badge badge-outline">ai</div>
                            <div className="badge badge-outline">cyber security</div>
                            <div className="badge badge-outline">blockchain</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;