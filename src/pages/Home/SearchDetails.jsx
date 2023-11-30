
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// import { FaSearch } from "react-icons/fa";
// const tags = [
//     'web',
//     'app',
//     'ai',
//     'iot',
//     'blockchain',
//     'cyber security'
// ]



const SearchDetails = () => {

    const axiosPublicUser = useAxiosPublic();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');


    useEffect(() => {
        axiosPublicUser.get('/tags')
            .then(res => {
                // console.log(res.data);
                setTags(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosPublicUser])




    const {
        data: forumPosts,

    } = useQuery({
        queryKey: ['publicPosts', tag],
        queryFn: async () => {
            const res = await axiosPublicUser.get(`/posts/first?tag=${tag}`);
            return res.data;
        }
    });
    console.log(forumPosts);


    const handleFiltering = (e) => {
        e.preventDefault();
        const form = e.target;
        const tagSearch = form.tagSearch.value;
        const filterTag = tags.find(item => item.tagName === tagSearch);
        setTag(filterTag.tagName)
        console.log(filterTag.tagName);
    }


console.log(tag);


    return (
        <div>
            {/* search */}

            <div>

                <form onSubmit={handleFiltering}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            name="tagSearch"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."



                            required />
                        <button

                            type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </form>

            </div>

            {/* posts */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto gap-5">

                {

                    forumPosts?.result.map(post => (
                        <div key={post._id}>
                            <Link to={`/dashboard/post/${post._id}`}>
                                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[300px]">

                                    <div className="flex flex-col items-center pb-10">
                                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={post.authorImage} alt="" />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{post.postTitle.slice(0, 15)}...</h5>

                                        <div className="badge badge-secondary text-center">{post.tag}</div>
                                        <div>
                                            <div className="badge badge-outline text-center">{post.postTime}</div>
                                        </div>
                                        <div>
                                            Total vote: {post.upVote - post.downVote}
                                        </div>
                                        <div>
                                            Total comments: {post?.comments?.length ? post?.comments?.length : 0}
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))


                }
            </div>





        </div>
    );
};

export default SearchDetails;