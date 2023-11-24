import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import SearchDetails from "../pages/Home/SearchDetails";


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
            }
        ]
    },
]);
