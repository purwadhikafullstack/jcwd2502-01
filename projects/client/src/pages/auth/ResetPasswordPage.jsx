import React, { useEffect, useState } from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetPassword } from "../../redux/features/users";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordPage = () => {
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConPassword, setShowConPassword] = useState(false);
	const { isLogin } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useParams();

	const formik = useFormik({
		initialValues: {
			newpassword: "",
			confirmpassword: "",
		},
		onSubmit: (values) => {
			handleResetPassword(
				token,
				values.newpassword,
				values.confirmpassword
			);
		},
		validationSchema: yup.object().shape({
			newpassword: yup.string().required(),
			confirmpassword: yup.string().required(),
		}),
	});

	const handleResetPassword = (token, newpassword, confirmpassword) => {
		dispatch(resetPassword(token, newpassword, confirmpassword));
	};

	useEffect(() => {
		if (isLogin) return navigate("/login");
	}, [isLogin]);

	return (
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
										{formik.touched.newpassword &&
										formik.errors.newpassword ? (
											<div className="text-red-600">
												{formik.errors.newpassword}
											</div>
										) : null}
										<Input
											type={
												showNewPassword
													? "text"
													: "password"
											}
											name="newpassword"
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
										{formik.touched.confirmpassword &&
										formik.errors.confirmpassword ? (
											<div className="text-red-600">
												{formik.errors.confirmpassword}
											</div>
										) : null}
										<Input
											type={
												showConPassword
													? "text"
													: "password"
											}
											name="confirmpassword"
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
	);
};

export default ResetPasswordPage;
