import React, { useState } from "react";
import { Link } from "react-router-dom";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignupPage = () => {
	const [showPassword, setShowPassword] = useState(false);

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
												name="name"
												id="name"
												variant="bordered"
												size="lg"
												label="Fullname"
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
