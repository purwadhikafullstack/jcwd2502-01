import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { onRegisterAsync } from "../../redux/features/users";
import { useDispatch, useSelector } from "react-redux";

const SignupPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { isLogin } = useSelector((state) => state.user);
	const [click, setClick] = useState(true);
	const [state, setState] = useState({
		username: "",
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

	const handleRegister = (username, email, password) => {
		if (!click) return;
		dispatch(onRegisterAsync(username, email, password));

		setClick(false);
		setTimeout(() => setClick(true), 2000);
	};

	useEffect(() => {
		if (isLogin) {
			navigate("/");
		}
	}, [isLogin]);

	return (
		<>
			<main className="signup-page w-full h-[100vh] dark:bg-background">
				<div className="signup-page-container grid md:grid-cols-2 grid-cols-1">
					<div className="signup-section h-[100vh] px-8 flex items-center">
						<div className="signup-section-container w-[360px] m-auto">
							<div className="signup-section-heading flex flex-col items-start mb-6">
								<div className="signup-heading-logo mb-10">
									<Link to={"/"}>
										<NexocompLogo
											width={200}
											fill={"fill-primary-500"}
										/>
									</Link>
								</div>
								<div className="signup-heading-title">
									<h1 className="text-text font-bold text-5xl">
										Create an account
									</h1>
								</div>
							</div>
							<div className="signup-form">
								<div className="form-container">
									<div className="flex flex-col gap-4">
										<div className="form-group">
											<Input
												type="text"
												name="username"
												id="name"
												variant="bordered"
												size="lg"
												label="Fullname"
												value={state.username}
												onChange={handleChange}
											/>
										</div>
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
												variant="bordered"
												size="lg"
												label="Password"
												value={state.password}
												onChange={handleChange}
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
													handleRegister(
														state.username,
														state.email,
														state.password
													)
												}
											>
												Create Account
											</Button>
										</div>
									</div>
								</div>
							</div>
							<div className="login-account text-left my-6">
								<span className="font-medium">
									Already have an account?{" "}
									<Link to={"/login"}>
										<span className="text-blue-500">
											Log in
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

export default SignupPage;
