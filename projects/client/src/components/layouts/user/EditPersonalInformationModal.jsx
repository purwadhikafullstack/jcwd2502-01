import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
	Tooltip,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosInstance } from "../../../lib/axios";
import { OnCheckIsLogin } from "../../../redux/features/users";

export default function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const { username, gender, birth_date } = useSelector((state) => state.user);
	const accessToken = localStorage.getItem("accessToken");
	const dispatch = useDispatch();

	const [selectedGender, setSelectedGender] = useState(null);
	const arrGender = [
		{ value: "Male", label: "Male" },
		{ value: "Female", label: "Female" },
	];

	const handleGenderChange = (selecGen) => {
		setSelectedGender(selecGen);
		formik.setFieldValue("gender", selecGen);
		console.log(selecGen);
	};

	const formik = useFormik({
		initialValues: {
			username: username,
			birth_date: birth_date,
			gender: gender,
		},
		onSubmit: async (values) => {
			// onSubmitEdit(values);
			const updateData = await axiosInstance(accessToken).patch(
				"/users/personalData",
				values
			);
			console.log(updateData);
			dispatch(OnCheckIsLogin());
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			birth_date: yup.string().required(),
			// gender: yup.string().required(),
		}),
	});

	const resetFrom = () => {
		formik.setValues({
			username: username || "",
			birth_date: birth_date || "",
			gender: selectedGender || "",
		});
	};

	useEffect(() => {
		setSelectedGender(gender);
		formik.setValues({
			username: username || "",
			birth_date: birth_date || "",
			gender: selectedGender || "",
		});
		console.log(typeof gender);
		console.log(selectedGender);
		// gender ? setSelectedGender(gender):
	}, [username, birth_date, gender]);

	return (
		<>
			<Tooltip content={"Edit Personal Information"}>
				<Button onPress={onOpen} isIconOnly variant="flat">
					<BiEdit size={22} />
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={() => {
					onOpenChange();
					resetFrom();
				}}
				placement="center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Personal Information
							</ModalHeader>
							<ModalBody className="pb-6">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col justify-between gap-4 h-full"
								>
									<div className="form-control">
										<Input
											type="text"
											name="username"
											label="Username"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="jhon Doe"
											defaultValue={"Warehouse 1"}
											isRequired
											value={formik.values.username}
											onChange={formik.handleChange}
										/>
									</div>
									<div className="form-control">
										<Input
											type="date"
											name="birth_date"
											label="Birthdate"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="a"
											defaultValue={"Warehouse 1"}
											isRequired
											value={formik.values.birth_date}
											onChange={formik.handleChange}
										/>
									</div>
									<div className="form-control">
										<Select
											name="gender"
											label="Gender"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											onChange={(e) =>
												handleGenderChange(
													e.target.value
												)
											}
											placeholder="Select a gender"
											isRequired
											selectedKeys={
												selectedGender
													? [selectedGender]
													: ""
											}
										>
											{arrGender.map((value, index) => (
												<SelectItem
													key={value.value}
													value={value.label}
												>
													{value.label}
												</SelectItem>
											))}
										</Select>
									</div>
									<div className="modal-footer pt-4">
										<Button
											isLoading={isLoading}
											color="primary"
											className="text-center"
											fullWidth
											type="submit"
											// onClick={formik.handleSubmit}
											onPress={onClose}
										>
											<span className="font-bold text-black">
												Save changes
											</span>
										</Button>
									</div>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
