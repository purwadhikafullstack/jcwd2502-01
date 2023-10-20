import React from "react";
import NexocompLogo from "../../assets/logo/NexocompLogo";
import LoopLogo from "../../assets/images/loop-logo.svg";
import { Button, Input } from "@nextui-org/react";

const ResetPasswordPage = () => {
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
											<Input
												type="password"
												name="password"
												id="password"
												variant="bordered"
												size="lg"
												label="New Password"
											/>
										</div>
										<div className="form-group">
											<Input
												type="password"
												name="password"
												id="password"
												variant="bordered"
												size="lg"
												label="Confirm New Password"
											/>
										</div>
										<div className="form-group">
											<Button
												className="bg-primary-500 text-black font-bold hover"
												fullWidth
												size="lg"
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
