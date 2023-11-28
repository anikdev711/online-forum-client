import { Link } from "react-router-dom";

const Membership = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen">
                <h3 className="text-2xl font-bold">Please Get Membership</h3>
                <Link to="/dashboard/payment">
                    <button className="btn btn-neutral text-white font-bold mt-10 mb-10">Pay</button>
                </Link>

            </div>
        </div>
    );
};

export default Membership;