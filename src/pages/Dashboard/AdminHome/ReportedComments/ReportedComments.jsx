import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ReportedComments = () => {
    const axiosSecureUser = useAxiosSecure();
    const {
        data: reports = []
    } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await axiosSecureUser.get('/reports');
            return res.data;
        }
    })
    console.log(reports);
    return (
        <div>
            <h3 className="text-center font-bold text-3xl mb-5">Report Action</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>post description</th>
                            <th>commenter email</th>
                            <th>commenter comment</th>
                            <th>report reason</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reports.map((report, index) => (
                                <tr key={report._id}>
                                    <td>{index + 1}</td>
                                    <td>{report.name}</td>
                                    <td>{report.email}</td>
                                    <td>{report.postDescription}</td>
                                    <td>{report.commenterEmail}</td>
                                    <td>{report.commenterComment}</td>
                                    <td>{report.reportReason}</td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ReportedComments;