
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner/banner.jpg"
import { FaSearch } from "react-icons/fa";


const Banner = () => {
    return (
        <div>
            <div className="hero bg-[#ffc107]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="w-1/2 flex justify-center lg:justify-end">
                        <img src={bannerImage} />
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-5xl text-center font-bold">Welcome to our forum</h1>
                        <p className="py-6 text-center">In Byte Talks forum, you can post your opinions or questions about web, app development, IoT, cyber security and blockchain. The community will help you.You can also find useful posts of others in this community.</p>
                        <Link to="/search">
                            <button className="btn btn-neutral text-white font-extrabold w-full">Search In Forum <FaSearch /> </button>
                        </Link>
                        <div className="flex flex-col md:flex-row  gap-2 mt-5 font-semibold justify-center items-center">
                            <p>Search Suggestions:</p>
                            <div className="badge badge-outline">web</div>
                            <div className="badge badge-outline">app</div>
                            <div className="badge badge-outline">iot</div>
                            <div className="badge badge-outline">ai</div>
                            <div className="badge badge-outline">cyber security</div>
                            <div className="badge badge-outline">blockchain</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;