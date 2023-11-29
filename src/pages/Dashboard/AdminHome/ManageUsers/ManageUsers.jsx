import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
// import { useState } from "react";

const ManageUsers = () => {
    const axiosSecureUser = useAxiosSecure();
    // const [page, setPage] = useState(1);
    // const limit = 10;
    const {
        data: forumUsers = [],
        refetch,
        // isLoading,
        // isError,
        // error
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecureUser.get('/users');
            return res.data;
        }
    })
    console.log(forumUsers);

    //make admin
    const handleMakeAdminOfForum = (id) => {
        axiosSecureUser.put(`/users/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Make admin successfully",
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

    //delete user from the forum when another user reports against his/her comment
    const handleDeleteUserFromForum = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecureUser.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });

    }


    // const totalPostPages = Math.ceil(forumUsers?.total / limit);
    // console.log(totalPostPages);

    // const handlePreviousPage = () => {
    //     if (page > 1) {
    //         setPage(page - 1);
    //     }
    // }

    // const handleNextPage = () => {
    //     if (page < totalPostPages) {
    //         setPage(page + 1);
    //     }
    // }

    // if (isError) {
    //     return <p>Something error: {error}</p>
    // }








    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-5">Manage Users</h1>

            <div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                <th>Subscription Status</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                forumUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user?.role ? user?.role :

                                                    <button
                                                        onClick={() => handleMakeAdminOfForum(user._id)}
                                                        className="btn btn-neutral text-white font-bold">Make Admin</button>
                                            }
                                        </td>
                                        <td>{user.badge}</td>
                                        <td>
                                            <button onClick={() => handleDeleteUserFromForum(user._id)}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>


            </div>


            {/* <div>
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
            </div> */}





        </div>
    );
};

export default ManageUsers;