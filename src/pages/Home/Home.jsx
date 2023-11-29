import Announcements from "../../components/Announcements/Announcements";
import AllPosts from "./AllPosts";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllPosts></AllPosts>
            <Announcements></Announcements>
        </div>
    );
};

export default Home;