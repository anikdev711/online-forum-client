import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdEmail } from "react-icons/md";





const DashboardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Sidebar</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to="/dashboard/my-profile"> <FaUser /> My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-post"> <SlEnvolopeLetter /> Add Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-posts"> <MdEmail /> My Posts</NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            
                            <NavLink to="/"> <FaHome /> Back Home</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;