
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error/error.png'

const ErrorPage = () => {
    return (
        <div className='max-w-sm mx-auto'>
            <div className='flex flex-col gap-5 justify-center items-center h-screen my-5'>
                <h1 className='text-3xl font-bold'>Sorry</h1>
                <h3 className='text-xl font-semibold'>This page is not found</h3>
                <div>
                    <img src={errorImage} alt="error" />
                </div>
                <Link to="/">
                    <button className='btn btn-secondary text-white font-bold'>Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;