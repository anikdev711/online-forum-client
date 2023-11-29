import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";



const UserPayment = () => {
    const axiosSecureUser = useAxiosSecure();
    // const [paidUsers, setPaidUsers] = useState([]);
    const [paidUserEmail, setPaidUserEmail] = useState('');
    // const [membership, setMembership] = useState({});
    const { user } = useAuth();
    console.log(user);

    // useEffect(() => {
    //     axiosSecureUser.get('/payments')
    //         .then(res => {

    //             const filteredEmail = res.data.find(element => element.email === user?.email)
    //             setPaidUserEmail(filteredEmail.email)
    //             setPaidUsers(res.data);
    //         })
    // }, [axiosSecureUser, user?.email])
    // console.log(paidUsers);
    // console.log(paidUserEmail);

    const {
        data: member = {},
        refetch
    } = useQuery({
        queryKey: ['premiumMember'],
        queryFn: async () => {
            const res = await axiosSecureUser.get('/payments');
            const filteredEmail = res.data.find(element => element.email === user?.email);
            setPaidUserEmail(filteredEmail.email)
            // setPaidUsers(res.data);
            return filteredEmail;
        }
    })

    console.log(member);
    console.log(paidUserEmail);

    const handleUpdateBadge = (email) => {
        axiosSecureUser.patch(`/users/${email}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Now you are premium user",
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
            <h3 className="text-2xl text-center font-bold">Confirm Gold Badge For Premium User</h3>
            <div className="mt-5 mb-5 text-center">
                {
                    paidUserEmail ? <button
                    onClick={() => handleUpdateBadge(paidUserEmail)}
                    className="btn btn-neutral text-white font-bold">Confirm</button> : 'Please pay first'
                }
                
            </div>
        </div>
    );
};

export default UserPayment;