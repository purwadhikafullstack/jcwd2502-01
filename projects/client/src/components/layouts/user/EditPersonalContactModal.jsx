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
import MySpinner from "../../uis/Spinners/Spinner";

export default function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const { phone } = useSelector((state) => state.user);
	const accessToken = localStorage.getItem("accessToken");
	const dispatch = useDispatch();
	// console.log(username);
	// console.log(gender);
	// console.log(birth_date);
	const [selectedGender, setSelectedGender] = useState(null);
	const arrGender = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
	];

	const formik = useFormik({
		initialValues: {
			phone: "",
		},
		onSubmit: async (values) => {
			const updateData = await axiosInstance(accessToken).patch(
				"/users/personalData",
				values
			);
			console.log(updateData);
			dispatch(OnCheckIsLogin());
		},
		validationSchema: yup.object().shape({
			phone: yup.string().required(),
		}),
	});

	useEffect(() => {
		formik.setValues({
			phone: phone || "",
		});
		// gender ? setSelectedGender(gender):
	}, [phone]);

	return (
		<>
			<Tooltip content={"Edit Personal Contact"}>
				<Button onPress={onOpen} isIconOnly variant="flat">
					<BiEdit size={22} />
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Personal Contact
							</ModalHeader>
							<ModalBody className="pb-6">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col justify-between gap-4 h-full"
								>
									<div className="form-control">
										<Input
											type="number"
											name="phone"
											label="Phone Number"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="81234567891"
											startContent={"+62"}
											defaultValue={"Warehouse 1"}
											isRequired
											value={formik.values.phone}
											onChange={formik.handleChange}
										/>
									</div>

									<div className="modal-footer pt-4">
										<Button
											isLoading={isLoading}
											spinner={<MySpinner />}
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
