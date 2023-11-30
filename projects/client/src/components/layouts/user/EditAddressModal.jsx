import React, { useCallback, useEffect, useState } from "react";
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
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { axiosInstance } from "../../../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { onSetUserAddresses } from "../../../redux/features/users";
import Media from "react-media";
import MySpinner from "../../uis/Spinners/Spinner";

export default function App({ data }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [cities, setCities] = useState([]);
	// console.log(data);

	useEffect(() => {
		if (data) {
			formik.setValues({
				address_name: data.address_name || "",
				recipient_name: data.recipient_name || "",
				address: data.address || "",
				province_id: data.province_id || null,
				city_id: data.city_id || null,
			});
			setSelectedProvince(data.province.id);
			setSelectedCity(data.city.id);
			// console.log(data.province.id);
			// console.log(data.city.id);
		}
	}, [data]);

	const formik = useFormik({
		initialValues: {
			address_name: "",
			recipient_name: "",
			address: "",
			province_id: null,
			city_id: null,
			id: null,
		},
		onSubmit: async (values) => {
			onSubmitEdit(values);
		},
		validationSchema: yup.object().shape({
			address_name: yup.string().required(),
			recipient_name: yup.string().required(),
			address: yup.string().required(),
		}),
	});

	const onSubmitEdit = async (values) => {
		try {
			let {
				address_name,
				address,
				recipient_name,
				province_id,
				city_id,
			} = values;

			if (!province_id && data.province.id) {
				province_id = data.province.id;
			}
			if (!city_id && data.city.id) {
				city_id = data.city.id;
			}

			if (
				!address_name ||
				!address ||
				!recipient_name ||
				!province_id ||
				!city_id
			) {
				return toast.error("Please fill in all form fields");
				// Stop further execution
			}

			const newWarehouseData = {
				address_name,
				address,
				recipient_name,
				province_id,
				city_id,
				id: data.id,
			};

			const accessToken = localStorage.getItem("accessToken");

			const updateAddress = await axiosInstance(accessToken).patch(
				`/user-addresses/updateAddress`,
				newWarehouseData
			);
			console.log(updateAddress);
			// window.location.reload(false);
			setIsLoading(false);
			dispatch(onSetUserAddresses(accessToken));
			return;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// const handleFormInput = (event) => {
	// 	const { target } = event;
	// 	formik.setFieldValue(target.name, target.value);
	// };

	const getProvinces = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(`provinces`);

			setProvinces(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [axiosInstance]);

	const renderProvincesOption = () => {
		return provinces?.map((province) => {
			return (
				<SelectItem key={province.id} value={province.province}>
					{province.province}
				</SelectItem>
			);
		});
	};

	const handleProvince = (province) => {
		// const splittedProvince = province?.split(",");
		setSelectedProvince(province);
		setSelectedCity(null);
		formik.setFieldValue("province_id", province);
	};

	const getCities = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(
				`cities/${selectedProvince ? selectedProvince : ""}`
			);

			setCities(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [axiosInstance, selectedProvince]);

	const renderCitiesOption = () => {
		return cities?.map((city) => {
			return (
				<SelectItem key={city.id} value={city.id}>
					{`${city.type} ${city.city_name}`}
				</SelectItem>
			);
		});
	};

	const handleCity = (city) => {
		// const splittedCity = city?.split(",");
		console.log(city);
		setSelectedCity(city);
		formik.setFieldValue("city_id", city);
	};

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);
	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<div
						onClick={onOpen}
						className="pr-4 border-r-1 border-neutral-400 border-opacity-20"
					>
						<span className="font-medium text-label-lg text-primary-600 hover:cursor-pointer hover:underline">
							Edit
						</span>
					</div>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						size="full"
						scrollBehavior="inside"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Change Address
									</ModalHeader>
									<ModalBody>
										<div className="modal-body">
											<form className="flex flex-col justify-between gap-4 h-full">
												<div className="form-control">
													<Input
														type="text"
														name="recipient_name"
														label="Recipient's Name"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="Warehouse One"
														defaultValue={
															"Warehouse 1"
														}
														isRequired
														value={
															formik.values
																.recipient_name
														}
														onChange={
															formik.handleChange
														}
													/>
												</div>
												<div className="form-control">
													<Input
														type="text"
														name="address_name"
														label="Label Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="Warehouse One"
														defaultValue={
															"Warehouse 1"
														}
														isRequired
														value={
															formik.values
																.address_name
														}
														onChange={
															formik.handleChange
														}
													/>
												</div>
												<div className="form-control">
													<Select
														name="province_id"
														label="Province"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															handleProvince(
																e.target.value
															)
														}
														placeholder="Select a province"
														isRequired
														selectedKeys={[
															String(
																selectedProvince
															),
														]}
													>
														{renderProvincesOption()}
													</Select>
												</div>
												<div className="form-control">
													<Select
														name="city_id"
														label="City"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															handleCity(
																e.target.value
															)
														}
														placeholder="Select a City"
														isRequired
														selectedKeys={
															selectedCity
																? [
																		String(
																			selectedCity
																		),
																  ]
																: ""
														}
													>
														{renderCitiesOption()}
													</Select>
												</div>
												<div className="form-control">
													<Textarea
														placeholder="Jl. Street Address"
														name="address"
														label="Full Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														isRequired
														value={
															formik.values
																.address
														}
														onChange={
															formik.handleChange
														}
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
														onClick={
															formik.handleSubmit
														}
														onPress={onClose}
													>
														<span className="font-bold text-black">
															Save changes
														</span>
													</Button>
												</div>
											</form>
										</div>
									</ModalBody>
								</>
							)}
						</ModalContent>
					</Modal>
				</>
			)}
		</Media>
	);
}
