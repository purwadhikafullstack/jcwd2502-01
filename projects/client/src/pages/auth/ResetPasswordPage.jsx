import React, { useState } from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const ResetPasswordPage = () => {
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConPassword, setShowConPassword] = useState(false);
	const { token } = useParams();

	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		onSubmit: (values) => {
			console.log(values.newPassword);
			console.log(values.confirmPassword);
		},
		validationSchema: yup.object().shape({
			newPassword: yup.string().required(),
			confirmPassword: yup.string().required(),
		}),
	});
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
										Reset Password
									</h1>
								</div>
							</div>
							<div className="login-form">
								<div className="form-container">
									<div className="flex flex-col gap-4">
										<div className="form-group">
											{formik.touched.newPassword &&
											formik.errors.newPassword ? (
												<div className="text-red-600">
													{formik.errors.newPassword}
												</div>
											) : null}
											<Input
												type={
													showNewPassword
														? "text"
														: "password"
												}
												name="newPassword"
												id="password"
												variant="bordered"
												size="lg"
												label="New Password"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												endContent={
													<button
														className="focus:outline-none"
														type="button"
														onClick={() =>
															setShowNewPassword(
																!showNewPassword
															)
														}
													>
														{showNewPassword ? (
															<IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
														) : (
															<IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
														)}
													</button>
												}
											/>
										</div>
										<div className="form-group">
											{formik.touched.confirmPassword &&
											formik.errors.confirmPassword ? (
												<div className="text-red-600">
													{
														formik.errors
															.confirmPassword
													}
												</div>
											) : null}
											<Input
												type={
													showConPassword
														? "text"
														: "password"
												}
												name="confirmPassword"
												id="password"
												variant="bordered"
												size="lg"
												label="Confirm New Password"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												endContent={
													<button
														className="focus:outline-none"
														type="button"
														onClick={() =>
															setShowConPassword(
																!showConPassword
															)
														}
													>
														{showConPassword ? (
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
												Reset Password
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

export default ResetPasswordPage;
