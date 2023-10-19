import React, { useState } from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { onLoginAsync } from "../../redux/features/users";
import { Button, Input } from "@nextui-org/react";
import { onLoginSync } from "../../redux/features/users";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	// const [inputEmail, setInputEmail] = useState("");
	// const [inputPassword, setInputPassword] = useState("");
	const [state, setState] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		console.log(e.target.value);
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
		});
	};

	const handleLogin = (email, password) => {
		dispatch(onLoginAsync(email, password));
	};

	return (
		<>
			<main className="login-page w-full h-[100vh]">
				<div className="login-page-container grid md:grid-cols-2 grid-cols-1">
					<div className="login-section h-[100vh] px-8 flex items-center">
						<div className="login-section-container w-[360px] m-auto">
							<div className="login-section-heading flex flex-col items-start mb-6">
								<div className="login-heading-logo mb-10">
									<Link to={"/"}>
										<NexocompLogo
											width={200}
											fill={"fill-primary-500"}
										/>
									</Link>
								</div>
								<div className="login-heading-title">
									<h1 className="text-text font-bold text-5xl w-1/2">
										Welcome back!
									</h1>
								</div>
							</div>
							<div className="login-form">
								<div className="form-container">
									<div className="flex flex-col gap-4">
										<div className="form-group">
											<Input
												type="email"
												name="email"
												id="email"
												variant="bordered"
												size="lg"
												label="Email Address"
												value={state.email}
												onChange={handleChange}
											/>
										</div>
										<div className="form-group">
											<Input
												type={
													showPassword
														? "text"
														: "password"
												}
												name="password"
												id="password"
												value={state.password}
												onChange={handleChange}
												variant="bordered"
												size="lg"
												label="Password"
												endContent={
													<button
														className="focus:outline-none"
														type="button"
														onClick={() =>
															setShowPassword(
																!showPassword
															)
														}
													>
														{showPassword ? (
															<IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
														) : (
															<IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
														)}
													</button>
												}
											/>
										</div>
										<div className="form-group">
											<Button
												className="bg-primary-500 text-black font-bold hover"
												fullWidth
												size="lg"
												onClick={() =>
													handleLogin(
														state.email,
														state.password
													)
												}
											>
												Login
											</Button>
										</div>
									</div>
								</div>
							</div>
							<div className="split-form my-6 flex justify-center items-center">
								<div class="flex-grow border-t border-gray-400"></div>
								<span className="pill border border-gray-400 px-4 py-[2px] rounded-full text-label-lg text-neutral-800 dark:text-neutral-400">
									or continue with
								</span>
								<div class="flex-grow border-t border-gray-400"></div>
							</div>
							<div className="login-google mb-8">
								<a
									href="/"
									type="submit"
									className={`rounded-lg py-3 px-4 w-full border-2 border-gray-300 hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 flex justify-center items-center gap-4 bg-background duration-150`}
								>
									<FcGoogle size={24} />
									<span className="font-medium text-sm text-text">
										Sign in with Google
									</span>
								</a>
							</div>
							<div className="create-account text-left">
								<span className="font-medium">
									Don't have an account?{" "}
									<Link to={"/signup"}>
										<span className="text-blue-500">
											Sign up
										</span>
									</Link>{" "}
								</span>
							</div>
						</div>
					</div>
					<div className="section-image md:block hidden">
						<img
							src={LoopLogo}
							alt=""
							srcset=""
							className="w-full h-screen object-cover"
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default LoginPage;
