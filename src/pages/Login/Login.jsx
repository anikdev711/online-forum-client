import { Helmet } from "react-helmet-async";
import loginImage from "../../assets/login/login.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import LoginButton from "../../components/Button/LoginButton/LoginButton";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const { loginToForum, googleSignInToForum } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublicUser = useAxiosPublic();
    const from = location.state?.from?.pathname || '/';
    const {
        handleSubmit,
        control
    } = useForm();

    const handleLoginToForum = (data) => {
        console.log(data);

        loginToForum(data.email, data.password)
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                Swal.fire({
                    title: "Login successful",
                    showClass: {
                        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
                    },
                    hideClass: {
                        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleGoogleSignIn = (event) => {
        event.preventDefault();
        googleSignInToForum()
            .then(result => {
                const googleSignedInUserToForum = result.user;
                console.log(googleSignedInUserToForum);

                const name = googleSignedInUserToForum.displayName;
                const email = googleSignedInUserToForum.email;
                const photoURL = googleSignedInUserToForum.photoURL;
                const badge = 'bronze';

                const googleUserInformation = {
                    name,
                    email,
                    photoURL,
                    badge
                }

                console.log(googleUserInformation);

                axiosPublicUser.post('/users', googleUserInformation)
                    .then(res => {
                        console.log(res);
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Byte Talks | Login</title>
            </Helmet>
            <div>


                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <img src={loginImage} alt="login" />
                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form
                                onSubmit={handleSubmit(handleLoginToForum)}
                                className="card-body">
                                <div>
                                    <h3 className="text-center text-xl font-extrabold">Login</h3>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => <input
                                            {...field}
                                            type="email"
                                            placeholder="Email address..."
                                            className="input input-bordered"
                                            required
                                        />}

                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => <input
                                            {...field}
                                            type="password"
                                            placeholder="Password..."
                                            className="input input-bordered"
                                            required
                                        />}

                                    />
                                </div>

                                <div className="form-control mt-6">
                                    <input
                                        className="btn btn-neutral text-white font-bold"
                                        type="submit"
                                        value="Login" />
                                </div>
                            </form>
                            <p className="text-center pb-4">New user? Please <Link className="text-blue-600 font-bold" to="/register">Register</Link> </p>
                            <h3 className="text-center mb-5 font-bold">---OR---</h3>

                            <div onClick={handleGoogleSignIn} className="text-center mb-10">
                                <LoginButton></LoginButton>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <h3 className="text-center mb-5 font-bold">---OR---</h3>

                <div className="text-center mb-10">
                    <LoginButton></LoginButton>
                </div> */}



            </div>
        </div>
    );
};

export default Login;