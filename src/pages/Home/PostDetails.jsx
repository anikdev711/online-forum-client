import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import { SlDislike, SlLike } from "react-icons/sl";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";


const PostDetails = () => {
    // const [allPosts, setAllPosts] = useState([]);
    const [specificPost, setSpecificPost] = useState({});
    const axiosSecureUser = useAxiosSecure();
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        axiosSecureUser.get('/posts')
            .then(res => {
                // console.log(res);
                const filteredPost = res.data.find(item => item._id === id);
                // console.log(filteredPost);
                setSpecificPost(filteredPost);

            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecureUser, id])
    // console.log(specificPost);


    const handleUpVoteOfUser = (userPostId) => {
        axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'upVote' })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDownVoteOfUser = (userPostId) => {
        axiosSecureUser.post('/posts/vote', { userPostId, userVoteType: 'downVote' })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    };

    // const postDate = (date) => {
    //     const postDateAndTime = {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric',
    //     }
    //     return new Date(date).toLocaleDateString(undefined, postDateAndTime)
    // }





    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-5 mt-10">Post details</h1>
            <div>

                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                        <img src={specificPost.authorImage} alt="profile-picture" />
                    </div>
                    <div className="p-6 text-center">
                        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {specificPost.authorName}
                        </h4>
                        <p className="text-lg font-semibold">{specificPost.postTitle}</p>
                        <p className="text-justify mt-4 mb-4">{specificPost.postDescription}</p>
                        
                        <div className="badge badge-secondary">{specificPost.tag}</div>
                        <div className="badge badge-outline">{specificPost.postTime}</div>
                        <CommentForm post={specificPost}></CommentForm>

                        <div className="flex gap-10 justify-center items-center mt-8 mb-8">
                            <button
                                onClick={() => handleUpVoteOfUser(id)}>
                                <SlLike />
                            </button>
                            <button
                                onClick={() => handleDownVoteOfUser(id)}>
                                <SlDislike />
                            </button>
                        </div>

                    </div>
                    <div className="flex justify-center p-6 pt-2 gap-7">
                        <FacebookShareButton url={window.location.href}>
                            <FaFacebook />
                        </FacebookShareButton>
                        <LinkedinShareButton url={window.location.href}>
                            <FaLinkedin />
                        </LinkedinShareButton>
                        <TwitterShareButton url={window.location.href}>
                            <FaTwitterSquare />
                        </TwitterShareButton>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default PostDetails;