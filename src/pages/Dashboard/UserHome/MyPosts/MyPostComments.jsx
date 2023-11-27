import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlineReport, MdOutlineReportOff } from "react-icons/md";
// import CommentModal from "../../../../components/CommentModal/CommentModal";
// import { useState } from "react";


const MyPostComments = () => {
    const { id } = useParams();
    // console.log(id);
    const { user } = useAuth();
    const axiosSecureUser = useAxiosSecure();
    // const [myPost, setMyPost] = useState({});
    const [myFeedback, setMyFeedback] = useState(false);
    const {
        data: myPost = {},
        isLoading
    } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/posts/${user?.email}`)
            // console.log(res.data);
            const filteredPost = res.data.find(item => item._id === id)
            // console.log(filteredPost);
            // setMyPost(filteredPost);

            return filteredPost;
        }
    });

    // console.log(myPost);
    // console.log(myPost);

    const handleFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;
        console.log(feedback);
        setMyFeedback(true);
    }

    console.log(myFeedback);

    return (
        <div>
            {
                isLoading ? <p>Loading...</p> : (



                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Commenter email</th>
                                    <th>Comment text</th>
                                    <th>Full Comment</th>
                                    <th>Feedback</th>
                                    <th>Report</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    myPost?.comments?.map((comment, index) => (
                                        <tr key={comment?.id}>
                                            <td>{index + 1}</td>
                                            <td>{comment.commenterEmail}</td>
                                            <td>
                                                {
                                                    comment.userComment.length > 20 ? comment.userComment.slice(0, 20) : comment.userComment
                                                }
                                            </td>
                                            <td>
                                                {
                                                    comment.userComment.length > 20 ?
                                                        (
                                                            <div>

                                                                <button className="btn btn-link" onClick={() => document.getElementById('my_modal_5').showModal()}>Read more...</button>
                                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                    <div className="modal-box">
                                                                        <h3 className="font-bold text-lg">Full Comment</h3>
                                                                        <p className="py-4">
                                                                            {comment.userComment}
                                                                        </p>
                                                                        <div className="modal-action">
                                                                            <form method="dialog">

                                                                                <button className="btn">Close</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </dialog>
                                                            </div>
                                                        )

                                                        : ''
                                                }
                                            </td>


                                            <td>
                                                <form onSubmit={handleFeedback}>
                                                    <select
                                                    defaultValue="Feedback"
                                                        name="feedback"
                                                        id=""
                                                        className="select border-black">
                                                        
                                                        <option value="excellent">excellent</option>
                                                        <option value="good">good</option>
                                                        <option value="bad">bad</option>
                                                    </select>
                                                    <button className="btn btn-neutral text-white font-bold">Give feedback</button>
                                                </form>
                                            </td>
                                            <td>
                                                {
                                                    myFeedback === true ? <button>
                                                        <MdOutlineReport />
                                                    </button> : <button>
                                                        <MdOutlineReportOff />
                                                    </button>
                                                }
                                            </td>


                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                )
            }

        </div >
    );
};

export default MyPostComments;