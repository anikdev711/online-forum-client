// import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const CommentForm = ({ post }) => {
    // const [userComment, setUserComment] = useState('');
    // const [userFeedback, setUserFeedback] = useState('');
    const axiosSecureUser = useAxiosSecure();
    const { user } = useAuth();
    const handleComments = (event) => {
        event.preventDefault();
        const form = event.target;
        const userComment = form.userComment.value;
        const commenterEmail = user?.email;
        const userCommentInfo = {

            commenterEmail,
            userComment

        }
        console.log(userCommentInfo);

        axiosSecureUser.post(`/posts/comments/${post._id}`, userCommentInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Commented successfully",
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


            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form
                    onSubmit={handleComments}
                    className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Add Comment</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your comment</label>
                        <textarea
                            name="userComment"
                            id=""
                            cols="10"
                            rows="10"
                            className="w-full bordered"
                            placeholder="Add your comment"
                            required>

                        </textarea>
                    </div>

                    {/* <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your feedback</label>
                        <input
                            type="text"
                            name="userFeedback"
                            id=""
                            placeholder="Give your feedback"
                            className="w-full bordered"
                            required />
                    </div> */}

                    <button

                        className="btn btn-neutral w-full text-white font-bold">
                        Comment
                    </button>

                </form>
            </div>

        </div>
    );
};

export default CommentForm;