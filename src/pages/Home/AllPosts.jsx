import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


// const tags = [
//     'web',
//     'app',
//     'ai',
//     'iot',
//     'blockchain',
//     'cyber security'
// ]

const AllPosts = () => {
    const axiosPublicUser = useAxiosPublic();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    // const [postTime, setPostTime] = useState(0);
    // const [postTime, setPostTime] = useState('');
    const [page, setPage] = useState(1);
    const limit = 5;
    // const sortOrder = 'desc';
    // const postDate = 'postTime';

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

    // console.log(tags);




    const {
        data: forumPosts,
        isLoading,
        isError,
        error

    } = useQuery({
        queryKey: ['publicPosts', tag, page],
        queryFn: async () => {
            const res = await axiosPublicUser.get(`/posts/first?tag=${tag}&page=${page}&limit=${limit}`);
            return res.data;
        }
    });
    console.log(forumPosts);

    const totalPostPages = Math.ceil(forumPosts?.total / limit);
    console.log(totalPostPages);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (page < totalPostPages) {
            setPage(page + 1);
        }
    }

    if (isError) {
        return <p>Something error: {error}</p>
    }






    return (
        <div>


            <h1 className="font-bold text-3xl text-center mb-5 mt-10">Posts</h1>
            <div className="flex gap-5 justify-center items-center mt-10 mb-10">
                <div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-center">Choose tags</span>
                        </div>
                        <select
                            onChange={(e) => setTag(e.target.value)}
                            name=""
                            id=""
                            className="select select-bordered">
                            <option disabled selected>Pick one</option>

                            {
                                tags.map(item => (
                                    <option key={item._id} value={item.tagName}>
                                        {item.tagName}
                                    </option>
                                ))
                            }


                        </select>
                    </label>
                </div>

                {/* <div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Choose lates posts</span>
                        </div>
                        <select
                            onChange={(e) => setPostTime(e.target.value)}
                            name=""
                            id=""
                            className="select select-bordered">
                            <option disabled selected>Pick one</option>

                            <option value="asc">Old posts</option>
                            <option value="desc">Latest posts</option>


                        </select>
                    </label>
                </div> */}
            </div>

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

            {/* pagination */}
            <div>
                {
                    isLoading ? <p>Loading...</p> : (
                        <div className="flex  justify-center items-center mt-10 mb-10">
                            <div className="join">
                                <button
                                    onClick={handlePreviousPage}
                                    className="join-item btn">«</button>
                                {
                                    [...Array(totalPostPages).fill(0)].map((item, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setPage(pageNumber)}
                                                className={`${pageNumber === page ? 'join-item btn btn-secondary' : 'join-item btn btn-ghost'}`}>
                                                {pageNumber}
                                            </button>
                                        )
                                    })
                                }
                                <button
                                    onClick={handleNextPage}
                                    className="join-item btn">»</button>
                            </div>
                        </div>
                    )
                }
            </div>



        </div>
    );
};

export default AllPosts;