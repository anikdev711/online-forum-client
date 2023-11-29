// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";


const PaymentHistory = () => {
    // const { user } = useAuth();
    const axiosSecureUser = useAxiosSecure();
    const [paidUsers, setPaidUsers] = useState([]);

    useEffect(() => {
        axiosSecureUser.get('/payments')
            .then(res => {
                console.log(res.data);
                setPaidUsers(res.data);
            })
    }, [axiosSecureUser])

    // console.log(paidUsers);

    // const {
    //     data: premiumUser = {},
    //     refetch
    // } = useQuery({
    //     queryKey: ['goldUser'],
    //     queryFn: async () => {
    //         const res = await axiosSecureUser.get('/users');
    //         console.log(res.data);
    //         const filteredUser = res.data.find(element => element?.email === paidUsers.find(member=>member));
    //         console.log(filteredUser);
    //         return res.data;
    //     }
    // });



    return (
        <div>
            <h3 className="text-2xl text-center font-bold">Payment History</h3>
            <div>
                {/* to do */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                {/* <th>Make Gold</th> */}
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                paidUsers.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.transactionId}</td>
                                        {/* <td>
                                            <button className="btn btn-neutral text-white font-bold">
                                                {item.badge}
                                            </button>
                                        </td> */}
                                        <td>
                                            {item.date}
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

export default PaymentHistory;