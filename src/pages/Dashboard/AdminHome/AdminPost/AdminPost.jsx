import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AdminPost = () => {

    const [userPostsCount, setUserPostsCount] = useState(0);
    // const [goldBadgeUser, setGoldBadgeUser] = useState({});
    const axiosSecureUser = useAxiosSecure();
    const axiosPublicUser = useAxiosPublic();
    const [tags, setTags] = useState([]);

    // const [allPosts, setAllPosts] = useState([]); //comment this

    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        axiosSecureUser.get('/tags')
            .then(res => {
                // console.log(res.data);
                setTags(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosSecureUser])


    useEffect(() => {
        axiosSecureUser.get(`/posts/count/${user?.email}`)
            .then(res => {
                console.log(res);
                setUserPostsCount(res.data.userPostsCount);
            })
    }, [axiosSecureUser, user?.email])

    console.log(userPostsCount);

    const {
        data: forumMember = {},
        refetch
    } = useQuery({
        queryKey: ['forumUser'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/users/${user?.email}`)
            console.log(res.data);
            return res.data;
        }
    });

    console.log(forumMember.badge);
    // console.log(userPostsCount);


    const handleAddPostOfUser = async (data) => {
        console.log(data);
        const userImageFile = {
            image: data.image[0]
        }

        const response = await axiosPublicUser.post(image_hosting_api, userImageFile, {
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
                refetch();
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




    return (
        <div>


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
                            {/* <option value="web">web</option>
                            <option value="app">app</option>
                            <option value="iot">iot</option>
                            <option value="ai">ai</option>
                            <option value="cyber security">cyber security</option>
                            <option value="blockchain">blockchain</option> */}
                            <option disabled selected>Pick one</option>

                            {
                                tags.map(item => (
                                    <option key={item._id} value={item.tagName}>
                                        {item.tagName}
                                    </option>
                                ))
                            }
                        </select>

                    </div>



                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>

                </form>

            </div>



        </div>
    );
};

export default AdminPost;