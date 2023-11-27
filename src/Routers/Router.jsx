import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import SearchDetails from "../pages/Home/SearchDetails";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/Dashboard/UserHome/MyProfile/MyProfile";
import AddPost from "../pages/Dashboard/UserHome/AddPost/AddPost";
import MyPosts from "../pages/Dashboard/UserHome/MyPosts/MyPosts";
import MyPostComments from "../pages/Dashboard/UserHome/MyPosts/MyPostComments";
// import Dashboard from "../layout/Dashboard";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/membership",
                element: <Membership></Membership>
            },
            {
                path: "/search",
                element: <SearchDetails></SearchDetails>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [

            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "add-post",
                element: <AddPost></AddPost>
            },
            {
                path: "my-posts",
                element: <MyPosts></MyPosts>,
                
            },
            {
                path: "my-posts/comments/:id",
                element: <MyPostComments></MyPostComments>,
                loader: ({ params }) => fetch(`http://localhost:5000/posts/comments/${params.id}`)
            }


        ]
    }





]);
