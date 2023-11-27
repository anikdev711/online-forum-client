import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";

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
                                            <button className="btn btn-neutral text-white font-bold">Make Admin</button>
                                        </td>
                                        <td>{user.badge}</td>
                                        <td>
                                            <button>
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