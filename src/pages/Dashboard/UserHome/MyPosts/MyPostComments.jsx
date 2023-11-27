import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlineReport, MdOutlineReportOff } from "react-icons/md";
import Swal from "sweetalert2";
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

    // console.log(myFeedback);

    const handleReport = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const postDescription = form.postDescription.value;
        const commenterEmail = form.commenterEmail.value;
        const commenterComment = form.commenterComment.value;
        const reportReason = form.reportReason.value;

        const reportInformation = {
            name,
            email,
            postDescription,
            commenterEmail,
            commenterComment,
            reportReason
        }
        console.log(reportInformation);

        axiosSecureUser.post('/reports', reportInformation)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Thank you for your report. After proper investigation we will take action.",
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
                                                    myFeedback === true ?
                                                        // <button>
                                                        //     <MdOutlineReport />
                                                        // </button> 
                                                        <div>
                                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                            <button className="btn" onClick={() => document.getElementById('my_modal_6').showModal()}><MdOutlineReport /></button>
                                                            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                                                                <div className="modal-box">
                                                                    <h3 className="font-bold text-lg">Report Form</h3>
                                                                    <p className="py-4">Tell us why you want to report</p>
                                                                    <div className="modal-action">


                                                                        <div className="hero">
                                                                            <div className="hero-content flex-col lg:flex-row-reverse">

                                                                                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                                                                    <form
                                                                                        onSubmit={handleReport}
                                                                                        className="card-body">
                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Your Name</span>
                                                                                            </label>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="name"
                                                                                                placeholder="Your name..."
                                                                                                className="input input-bordered"
                                                                                                required />
                                                                                        </div>
                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Your Email</span>
                                                                                            </label>
                                                                                            <input
                                                                                                type="email"
                                                                                                name="email"
                                                                                                placeholder="Your email..."
                                                                                                className="input input-bordered"
                                                                                                required />
                                                                                        </div>
                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Your post details</span>
                                                                                            </label>
                                                                                            <textarea
                                                                                                name="postDescription"
                                                                                                id=""
                                                                                                cols="10"
                                                                                                rows="10"
                                                                                                className="border-black outline"
                                                                                                required>

                                                                                            </textarea>
                                                                                        </div>
                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Commenter Email</span>
                                                                                            </label>
                                                                                            <input
                                                                                                type="email"
                                                                                                name="commenterEmail"
                                                                                                placeholder="Commenter's email..."
                                                                                                className="input input-bordered"
                                                                                                required />
                                                                                        </div>

                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Commenter comment</span>
                                                                                            </label>
                                                                                            <textarea
                                                                                                name="commenterComment"
                                                                                                id=""
                                                                                                cols="10"
                                                                                                rows="10"
                                                                                                className="border-black outline"
                                                                                                required>

                                                                                            </textarea>
                                                                                        </div>
                                                                                        <div className="form-control">
                                                                                            <label className="label">
                                                                                                <span className="label-text">Report reason</span>
                                                                                            </label>
                                                                                            <textarea
                                                                                                name="reportReason"
                                                                                                id=""
                                                                                                cols="10"
                                                                                                rows="10"
                                                                                                className="border-black outline"
                                                                                                required>

                                                                                            </textarea>
                                                                                        </div>

                                                                                        <div className="form-control mt-6">
                                                                                            <button className="btn btn-neutral text-white font-bold">Report</button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <form method="dialog">

                                                                            {/* <form method="dialog"> */}
                                                                            {/* if there is a button in form, it will close the modal */}
                                                                            <button className="btn">Close</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </dialog>
                                                        </div>
                                                        : <button>
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