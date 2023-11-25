import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import registerImage from "../../assets/register/register.png"
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const { registrationToForum, profileUpdate } = useAuth();
    const axiosPublicUser = useAxiosPublic();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const handleRegister = (data) => {
        console.log(data);
        // console.log(data.email, data.password);

        registrationToForum(data.email, data.password)
            .then((result) => {
                const registeredUser = result.user;
                console.log(registeredUser);

                //update registered user's profile name and image
                profileUpdate(data.name, data.photoURL)
                    .then(() => {
                        console.log('profile updated successfully');
                        const registeredUserInformation = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            badge: data.badge

                        }
                        console.log(registeredUserInformation);

                        //user added into database
                        axiosPublicUser.post('/users', registeredUserInformation)
                            .then(res => {
                                console.log(res);
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: "Registration successful",
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
                                    navigate('/')
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    return (
        <div>

            <Helmet>
                <title>Byte Talks | Register</title>
            </Helmet>

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img src={registerImage} alt="registration" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                            onSubmit={handleSubmit(handleRegister)}
                            className="card-body">
                            <div>
                                <h3 className="text-center text-xl font-extrabold">Registration</h3>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    name="name"
                                    placeholder="Your name..."
                                    className="input input-bordered" />
                                {errors.name && <span className="text-red-500 font-bold">This field is necessary</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    name="photoURL"
                                    placeholder="Your photo URL..."
                                    className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500 font-bold">This field is necessary</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email*</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="Your email address..."
                                    className="input input-bordered" />
                                {errors.email && <span className="text-red-500 font-bold">This field is necessary</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*\d)(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/
                                    })}
                                    name="password"
                                    placeholder="Enter password..."
                                    className="input input-bordered" />
                                {errors.password?.type === "required" && (<p className="text-red-500 font-bold" role="alert">Password needed</p>)}
                                {errors.password?.type === "minLength" && (<p className="text-red-500 font-bold" role="alert">Password needed minimum 6 characters</p>)}
                                {errors.password?.type === "maxLength" && (<p className="text-red-500 font-bold" role="alert">Password must not exceeded 20 characters</p>)}
                                {errors.password?.type === "pattern" && (<p className="text-red-500 font-bold" role="alert">Password must have at least one number, one letter and one special character</p>)}

                            </div>
                            <div className="flex justify-between gap-5">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">User Badge*:</span>
                                </label>
                                <select {...register("badge", { required: true })}>
                                    <option value="bronze">bronze</option>
                                    <option value="gold" disabled>gold</option>
                                </select>
                                {errors.badge && <span className="text-red-500 font-bold">This field is necessary</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn btn-neutral text-white font-bold"
                                    type="submit"
                                    value="Register" />
                            </div>

                        </form>
                        <p className="text-center pb-4">Have account? Please <Link className="text-blue-600 font-bold" to="/login">Login</Link> </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;