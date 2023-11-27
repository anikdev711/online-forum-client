import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaRegCommentDots } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import { useEffect, useState } from "react";

const MyPosts = () => {

    const { user } = useAuth();
    const axiosSecureUser = useAxiosSecure();
    // const [deletePost, setDeletePost] = useState({});

    const {
        data: allPosts = [],
        refetch
    } = useQuery({
        queryKey: ['myPost'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/posts/${user?.email}`);
            console.log(res);
            return res.data;
        }
    })

    console.log(allPosts);


    // const handleUpVoteOfUser = (userPostId) => {
    //     axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'upVote' })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };

    // const handleDownVoteOfUser = (userPostId) => {
    //     axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'downVote' })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };



    const handlePostDelete = (id) => {
        axiosSecureUser.delete(`/posts/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Post deleted successfully",
                        showClass: {
                            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                        },
                        hideClass: {
                            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>upVote</th>
                            <th>downVote</th>
                            <th>Comment</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            allPosts.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td>{post.postTitle}</td>
                                    <td>{post.upVote}</td>
                                    <td>{post.downVote}</td>
                                    <Link to={`/dashboard/my-posts/comments/${post._id}`}>
                                        <td><FaRegCommentDots /></td>
                                    </Link>
                                    <td>
                                        <button onClick={() => handlePostDelete(post._id)}>
                                            <RiDeleteBinLine />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyPosts;