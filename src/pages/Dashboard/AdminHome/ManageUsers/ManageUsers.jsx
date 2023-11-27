import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecureUser = useAxiosSecure();
    const {
        data: forumUsers = [],
        refetch,
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
                                forumUsers?.map((user, index) => (
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





        </div>
    );
};

export default ManageUsers;