import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import registerImage from "../../assets/register/register.png"
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Register = () => {
    const { registrationToForum, profileUpdate } = useAuth();
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
                            email: data.email
                        }
                        console.log(registeredUserInformation);
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
                                    {...register("password", { required: true })}
                                    name="password"
                                    placeholder="Enter password..."
                                    className="input input-bordered" />
                                {errors.password && <span className="text-red-500 font-bold">This field is necessary</span>}

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
                        <p className="text-center pb-4">New user? Please <Link className="text-blue-600 font-bold" to="/login">Login</Link> </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;