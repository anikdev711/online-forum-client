import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';


const AdminProfile = () => {
    const axiosSecureUser = useAxiosSecure();
    const [userPostsCount, setUserPostsCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    // const [totalComments, setTotalComments] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axiosSecureUser.get(`/posts/count/${user?.email}`)
            .then(res => {
                console.log(res);
                setUserPostsCount(res.data.userPostsCount);
            })
    }, [axiosSecureUser, user?.email])

    // console.log(userPostsCount);

    useEffect(() => {
        axiosSecureUser.get('/users')
            .then(res => {
                console.log(res.data);
                setTotalUsers(res?.data?.length)

            })
    }, [axiosSecureUser])



    // useEffect(() => {
    //     axiosSecureUser.get('/posts')
    //         .then(res => {
    //             console.log(res.data);
    //             res.data.map(comment => setTotalComments(comment?.comments))
    //             console.log(totalComments);




    //         })
    // }, [axiosSecureUser])

    console.log(userPostsCount);
    console.log(totalUsers);



    const {
        data: adminInfo = {}
    } = useQuery({
        queryKey: ['adminUser'],
        queryFn: async () => {
            const res = await axiosSecureUser.get(`/users/${user?.email}`);
            console.log(res);
            return res.data;
        }
    })

    


    //pie chart
    const data = [
        { name: 'Posts Number', value: userPostsCount },
        { name: 'Users Number', value: totalUsers }

    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }








    return (
        <div>



            <div className="relative flex flex-col text-gray-700 bg-white shadow-md max-w-sm rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                    <img src={adminInfo?.photoURL} alt="profile-picture" className="" />
                </div>
                <div className="p-6 text-center">
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {adminInfo?.name}
                    </h4>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                        {adminInfo?.email}
                    </p>
                    <p>Total posts: {userPostsCount}</p>
                    <p>Total users: {totalUsers}</p>


                </div>

            </div>


            <div>
                
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                
            </div>




        </div>
    );
};

export default AdminProfile;