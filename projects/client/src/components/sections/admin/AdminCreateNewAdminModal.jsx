import React, { useCallback, useEffect, useState } from "react";

import { axiosInstance } from "../../../lib/axios";

import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Media from "react-media";
import * as yup from "yup";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
	Textarea,
	Checkbox,
	Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSetUserAddresses } from "../../../redux/features/users";
import { BiEdit } from "react-icons/bi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import SelectSortByAdmin from "../../uis/Selects/SelectSortByAdmin";
import { fetchAdmin } from "../../../redux/features/manageUser";
const AdminCreateNewAdminModal = ({ handleRefresh }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [warehouses, setWarehouses] = useState([]);
	const accessToken = localStorage.getItem("accessToken");
	const { offsetAdmin, searchAdmin, orderDirectionAdmin, orderFieldAdmin } =
		useSelector((state) => state.manageUsers);

	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const [selectedWarehouse, setSelectedWarehouse] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			warehouse_id: "",
		},
		onSubmit: async (values) => {
			handleSubmit(values);
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			email: yup.string().required(),
			password: yup.string().required(),
		}),
	});
	const handleSubmit = async (values) => {
		try {
			setIsLoading(true);

			const { username, email, password, warehouse_id, role } = values;

			if (!username || !email || !password || !role) {
				setIsLoading(false);

				return toast.error("please Insert Field!", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			}

			const createNewAdmin = await axiosInstance(accessToken).post(
				"/users/createAdmin",
				values
			);

			if (!createNewAdmin.data.isError) {
				toast.success("Add new admin success", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});

				handleRefresh(true);

				dispatch(
					fetchAdmin(
						`?${
							searchAdmin && `&search=${searchAdmin}`
						}&orderField=${orderFieldAdmin}&orderDirection=${orderDirectionAdmin}&offset=${offsetAdmin}`
					)
				);
				onOpenChange();
				formik.resetForm();
			}
		} catch (error) {
			if (error.response.data.isError) {
				// formik.resetForm();
				return toast.error(error.response.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			}
			console.log(error);
		} finally {
			setIsLoading(false);
			// onOpenChange();
		}
	};

	const fetchWarehouses = async () => {
		try {
			const { data } = await axiosInstance().get(`warehouses/all`);
			setWarehouses(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const renderWarehouseOption = () => {
		return warehouses?.map((item) => {
			return (
				<SelectItem key={item.id} value={item.warehouse_name}>
					{item.warehouse_name}
				</SelectItem>
			);
		});
	};

	const handleWarehouse = (item) => {
		// const splittedProvince = province?.split(",");
		setSelectedWarehouse(item);
		formik.setFieldValue("warehouse_id", item);
	};

	const role = [
		{
			id: 1,
			role_name: "admin",
		},
		{
			id: 2,
			role_name: "super",
		},
	];

	const renderRoleOption = () => {
		return role?.map((item) => {
			return (
				<SelectItem key={item.role_name} value={item.id}>
					{item.role_name}
				</SelectItem>
			);
		});
	};

	useEffect(() => {
		fetchWarehouses();
	}, [selectedWarehouse]);

	return (
		<>
			<Toaster />
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<>
						<div>
							<Tooltip content="Edit Admin">
								<Button
									color="primary"
									size="md"
									onPress={onOpen}
									fullWidth
								>
									<p className="font-medium text-black flex items-center gap-1">
										<span className="text-[20px]">+</span>
										<span>Add New Admin</span>
									</p>
								</Button>
							</Tooltip>
						</div>

						<Modal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							onClose={() => formik.resetForm()}
							placement={matches.medium ? "center" : "bottom"}
							scrollBehavior="inside"
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex justify-center">
											<h2 className="text-xl font-bold mb-2 pt-3">
												Edit Admin
											</h2>
										</ModalHeader>
										<ModalBody>
											<form className="flex flex-col justify-between gap-4 h-full">
												<div className="form-control">
													<Input
														type="text"
														name="username"
														label="Admin's Name"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="John Doe"
														value={
															formik.values
																.username
														}
														onChange={
															formik.handleChange
														}
														isRequired
													/>
												</div>
												<div className="form-control">
													<Input
														type="text"
														name="email"
														label="Email"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="johndoe@gmail.com"
														value={
															formik.values.email
														}
														onChange={
															formik.handleChange
														}
														isRequired
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
														placeholder="Password"
														labelPlacement="outside"
														variant="bordered"
														size="lg"
														radius="sm"
														label="Password"
														isRequired
														onChange={
															formik.handleChange
														}
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
												<div className="form-control">
													<Select
														name="role"
														label="Role"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={
															formik.handleChange
														}
														placeholder="Select a role"
														isRequired
													>
														{renderRoleOption()}
													</Select>
												</div>
												<div className="form-control">
													<Select
														name="warehouse"
														label="Warehouse"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) => {
															handleWarehouse(
																e.target.value
															);
														}}
														placeholder="Select a warehouse"
													>
														{renderWarehouseOption()}
													</Select>
												</div>
											</form>
										</ModalBody>
										<ModalFooter className="justify-center">
											<Button
												type="reset"
												onClick={(e) => {
													formik.resetForm();
												}}
												fullWidth
											>
												<span className="font-medium">
													Cancel
												</span>
											</Button>
											<Button
												color="primary"
												className="text-center mb-4"
												type="submit"
												onClick={(e) => {
													formik.handleSubmit(e);
												}}
												fullWidth
												isLoading={isLoading}
											>
												<span className="font-medium text-black">
													Add New Admin
												</span>
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</>
				)}
			</Media>
		</>
	);
};

export default AdminCreateNewAdminModal;
