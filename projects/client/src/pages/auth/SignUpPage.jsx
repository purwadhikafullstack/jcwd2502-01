import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { onRegisterAsync } from "../../redux/features/users";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

const SignupPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { role } = useSelector((state) => state.user);
	const [click, setClick] = useState(true);
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			handleRegister(values.username, values.email, values.password);
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			email: yup.string().required().email(),
			password: yup.string().required(),
		}),
	});

	const handleRegister = (username, email, password) => {
		if (!click) return;
		dispatch(onRegisterAsync(username, email, password));

		setClick(false);
		setTimeout(() => setClick(true), 2000);
	};

	useEffect(() => {
		if (role === "user") {
			navigate("/");
		} else if (role === "admin") {
			navigate("/admin");
		}
	}, [role]);

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
											{formik.touched.username &&
											formik.errors.username ? (
												<div className="text-red-600">
													{formik.errors.username}
												</div>
											) : null}
											<Input
												type="text"
												name="username"
												id="name"
												variant="bordered"
												size="lg"
												label="Fullname"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div className="form-group">
											{formik.touched.email &&
											formik.errors.email ? (
												<div className="text-red-600">
													{formik.errors.email}
												</div>
											) : null}
											<Input
												type="email"
												name="email"
												id="email"
												variant="bordered"
												size="lg"
												label="Email Address"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</div>
										<div className="form-group">
											{formik.touched.password &&
											formik.errors.password ? (
												<div className="text-red-600">
													{formik.errors.password}
												</div>
											) : null}
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
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
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
												onClick={formik.handleSubmit}
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
