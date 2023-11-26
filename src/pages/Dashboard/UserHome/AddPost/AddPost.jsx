import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { SlDislike, SlLike } from "react-icons/sl";
// import AddPostCard from "./AddPostCard";
// import Select from 'react-select'
// import Select from "react-select/dist/declarations/src/Select";
// import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
// const options = [
//     { value: 'web', label: 'web' },
//     { value: 'app', label: 'app' },
//     { value: 'cyber security', label: 'cyber security' },
//     { value: 'blockchain', label: 'blockchain' },
//     { value: 'iot', label: 'iot' },
//     { value: 'ai', label: 'ai' }
// ]





const AddPost = () => {
    // const [upVoteCount, setUpVoteCount] = useState(0);
    // const [downVoteCount, setDownVoteCount] = useState(0);
    // const [authorName, setAuthorName] = useState('');
    const [userPostsCount, setUserPostsCount] = useState(0);
    const [allPosts, setAllPosts] = useState([]);
    const axiosSecureUser = useAxiosSecure();
    // const [tag, setTag] = useState('');
    // const [tags, setTags] = useState([
    //     'web',
    //     'app',
    //     'cyber security',
    //     'blockchain',
    //     'iot',
    //     'ai'
    // ])
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    useEffect(() => {
        axiosSecureUser.get(`/posts/count/${user?.email}`)
            .then(res => {
                console.log(res);
                setUserPostsCount(res.data.userPostsCount);
            })
    }, [axiosSecureUser, user?.email])

    // console.log(userPostsCount);

    // const {
    //     data: userPostsCount = 0,
    //     refetch
    // } = useQuery({
    //     queryKey: ['postCount'],
    //     queryFn: async () => {
    //         const res = axiosSecureUser.get(`/posts/count/${user?.email}`)
    //         return res.data;

    //     }

    // })

    useEffect(() => {
        axiosSecureUser.get('/posts')
            .then(res => {
                console.log(res);
                setAllPosts(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecureUser])


    const handleAddPostOfUser = async (data) => {
        console.log(data);
        const userImageFile = {
            image: data.image[0]
        }

        const response = await axiosSecureUser.post(image_hosting_api, userImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (response.data.success) {
            const postData = {
                authorImage: response.data.data.display_url,
                authorName: data.authorName,
                authorEmail: data.authorEmail,
                postTitle: data.postTitle,
                postDescription: data.postDescription,
                tag: data.tag

            }
            const postDataRes = await axiosSecureUser.post('/posts', postData);
            console.log(postDataRes);
            if (postDataRes.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Posted successfully",
                    showclassName: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideclassName: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
            }
        }

    }

    const handleUpVoteOfUser = (userPostId) => {
        axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'upVote' })
            .then(res => {
                console.log(res);
                // setUpVoteCount(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDownVoteOfUser = (userPostId) => {
        axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'downVote' })
            .then(res => {
                console.log(res);
                // setDownVoteCount(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    };





    return (
        <div>
            {
                userPostsCount < 5 ? (



                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form
                            onSubmit={handleSubmit(handleAddPostOfUser)}
                            className="space-y-6" action="#">
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Add Post</h5>
                            {/* author image */}
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Image</label>
                                <input
                                    type="file"
                                    {...register('image', { required: true })}
                                    name="image"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                                />
                            </div>
                            {/* author name */}
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
                                <input
                                    type="text"
                                    {...register('authorName', { required: true })}
                                    name="authorName"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Author Name..."
                                />
                            </div>
                            {/* author email */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Email</label>
                                <input
                                    type="email"
                                    {...register('authorEmail', { required: true })}
                                    name="authorEmail"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Author Email ..."
                                />
                            </div>
                            {/* post title */}
                            <div>
                                <label htmlFor="post title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                                <input
                                    type="text"
                                    {...register('postTitle', { required: true })}
                                    name="postTitle"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Post Title ..."
                                />
                            </div>
                            {/* post description */}
                            <div>
                                <label htmlFor="post description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Description</label>
                                <input
                                    type="text"
                                    {...register('postDescription', { required: true })}
                                    name="postDescription"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Post Description..."
                                />
                            </div>
                            {/* tag */}
                            <div>
                                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>

                                <select
                                    {...register('tag', { required: true })}
                                    name="tag"
                                    id=""
                                    className="select select-bordered w-full"
                                    defaultValue="default">
                                    <option value="web">web</option>
                                    <option value="app">app</option>
                                    <option value="iot">iot</option>
                                    <option value="ai">ai</option>
                                    <option value="cyber security">cyber security</option>
                                    <option value="blockchain">blockchain</option>
                                </select>

                            </div>



                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>

                        </form>

                    </div>


                ) : (
                    <div>
                        <p>You have reached maximum post limit</p>
                        <button
                            onClick={() => window.location.href = "/membership"}
                            className="btn btn-neutral text-white font-bold ">Become Member</button>
                    </div>
                )
            }
            <div>
                {
                    allPosts.map(post => (
                        <div key={post._id}>
                            <p>{post.postTitle}</p>
                            <p>{post.postDescription}</p>
                            <p>{post.authorName}</p>
                            <p>{post.tag}</p>
                            <p>{post.upVote}</p>
                            <p>{post.downVote}</p>
                            <button
                                onClick={() => handleUpVoteOfUser(post._id)}>
                                <SlLike />
                            </button>
                            <button
                                onClick={() => handleDownVoteOfUser(post._id)}>
                                <SlDislike />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AddPost;