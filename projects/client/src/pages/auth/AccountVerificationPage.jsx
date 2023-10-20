import React, { useState } from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AccountVerificationPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<main className="account-verification-page w-full h-[100vh]">
				<div className="login-page-container grid md:grid-cols-2 grid-cols-1">
					<div className="login-section h-[100vh] px-8 flex items-center">
						<div className="login-section-container w-[360px] m-auto pb-20">
							<div className="login-section-heading flex flex-col items-start mb-6">
								<div className="login-heading-logo mb-10">
									<NexocompLogo
										width={200}
										fill={"fill-primary-500"}
									/>
								</div>
								<div className="login-heading-title">
									<h1 className="text-text font-bold text-5xl w-1/2">
										Verify Your Account
									</h1>
								</div>
							</div>
							<div className="login-form">
								<div className="form-container">
									<div className="flex flex-col gap-4">
										<div className="form-group">
											<Input
												isReadOnly
												type="email"
												name="email"
												id="email"
												variant="bordered"
												defaultValue={`<GANTI INI>`}
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
												Verify
											</Button>
										</div>
									</div>
								</div>
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

export default AccountVerificationPage;
