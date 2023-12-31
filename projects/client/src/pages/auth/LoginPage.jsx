import { useEffect, useState } from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OnCheckIsLogin, onLoginAsync } from "../../redux/features/users";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from "yup";
import MySpinner from "../../components/uis/Spinners/Spinner";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { role, isLoading } = useSelector((state) => state.user);

	const [click, setClick] = useState(true);

	const handleLogin = async (email, password) => {
		if (!click) return;
		const role = await dispatch(onLoginAsync(email, password));

		setClick(false);

		setTimeout(() => {
			setClick(true);
			if (role === "admin" || role === "super") {
				navigate("/admin");
			} else if (role === "user") {
				navigate("/");
			}
		}, 2000);
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			handleLogin(values.email, values.password);
		},
		validationSchema: yup.object().shape({
			email: yup.string().required().email(),
			password: yup.string().required().min(6),
		}),
	});

	useEffect(() => {
		dispatch(OnCheckIsLogin());
	}, []);

	useEffect(() => {
		if (role === "user") {
			navigate("/");
		} else if (role === "admin" || role === "super") {
			navigate("/admin");
		}
	}, [role]);

	return (
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
								<form
									className="flex flex-col gap-4"
									onSubmit={formik.handleSubmit}
								>
									<div className="form-group">
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
										{formik.touched.email &&
										formik.errors.email ? (
											<div className="text-red-600 first-letter:capitalize">
												{formik.errors.email}
											</div>
										) : null}
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
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
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
										{formik.touched.password &&
										formik.errors.password ? (
											<div className="text-red-600 first-letter:capitalize">
												{formik.errors.password}
											</div>
										) : null}
									</div>
									<div className="form-group">
										<Button
											className="bg-primary-500 text-black font-bold hover"
											fullWidth
											size="lg"
											type="submit"
											isLoading={isLoading}
											spinner={<MySpinner />}
										>
											Login
										</Button>
									</div>
								</form>
							</div>
						</div>
						<div className="create-account text-left mt-6">
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
	);
};

export default LoginPage;
