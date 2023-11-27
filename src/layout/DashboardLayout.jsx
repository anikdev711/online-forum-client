import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdEmail } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { MdCircleNotifications } from "react-icons/md";



const DashboardLayout = () => {
    const [forumAdmin] = useAdmin();
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

                        {

                            forumAdmin ? <>

                                <li>
                                    <NavLink to="/dashboard/admin-profile"> <FaUser /> Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users"> <PiUsersThree /> Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reported-comments"> <MdOutlineCommentsDisabled /> Reported Comments</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/make-announcement"> <MdCircleNotifications /> Make Announcement</NavLink>
                                </li>
                                <div className="divider"></div>
                                <li>

                                    <NavLink to="/"> <FaHome /> Back Home</NavLink>
                                </li>

                            </>

                                : <>
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
                                </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;