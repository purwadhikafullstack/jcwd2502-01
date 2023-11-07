
import React, { useCallback, useEffect, useState } from "react";

import { axiosInstance } from "../../../lib/axios";

import { useFormik } from "formik";

import Media from "react-media";

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
} from "@nextui-org/react";
import axios from "axios";

const CreateNewAddressModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [cities, setCities] = useState([]);
	const [citiesName, setCitiesName] = useState("");
	const [selectedCity, setSelectedCity] = useState();

	// const formik = useFormik({
	// 	initialValues: {
	// 		recipient_name: "",
	// 		address_name: "",
	// 		address: "",
	// 		province_id: null,
	// 		city_id: null,
	// 	},
	// 	onSubmit: async (values) => {
	// 		onCreateNewAddress(values);
	// 	},
	// });
	const handleSubmit = async () => {
		// const getCoordinate = await axios.get(
		// 	`${process.env.OPENCAGE_URL}/q=${cities},indonesia&key=${process.env.OPENCAGE_KEY}`
		// );

		// console.log(getCoordinate);
		console.log(citiesName);
	};
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
		// formik.setFieldValue("province_id", province);
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
				<SelectItem key={city.id} value={city}>
					{`${city.type} ${city.city_name}`}
				</SelectItem>
			);
		});
	};

	const handleCity = (city) => {
		// const splittedCity = city?.split(",");
		// console.log(city);
		setSelectedCity(city.id);
		setCitiesName(city.city_name);
		// formik.setFieldValue("city_id", city);
	};

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);

	return (
		<>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<>
						<Button
							color="secondary"
							size={matches.medium ? "lg" : "md"}
							onPress={onOpen}
							fullWidth
						>
							<p className="font-medium text-white flex items-center gap-1">
								<span className="text-[24px]">+</span>
								<span>Add New Address</span>
							</p>
						</Button>
						<Modal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							placement={matches.medium ? "center" : "bottom"}
							scrollBehavior="inside"
							size={matches.medium ? "2xl" : "full"}
							backdrop={matches.medium ? "blur" : ""}
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex justify-center">
											<h2 className="text-xl font-bold mb-2">
												Add New Address
											</h2>
										</ModalHeader>
										<ModalBody>
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
														placeholder="John Doe"
														defaultValue={
															"Albert Santoso Tandjung"
														}
														isRequired
													/>
												</div>
												<div className="form-control">
													<Input
														type="text"
														name="address_label"
														label="Address Label"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="Home"
														isRequired
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
														onChange={(e) => {
															handleProvince(
																e.target.value
															);
															console.log(
																e.target.value
															);
														}}
														placeholder="Select a province"
														isRequired
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
														onChange={(e) => {
															// handleCity(e.target.value)
															console.log(
																e.target.value
															);
														}}
														placeholder="Select a city"
														isRequired
													>
														{renderCitiesOption()}
													</Select>
												</div>
												<div className="form-control">
													<Textarea
														placeholder="Jl. Street Address"
														name="full_address"
														label="Full Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														isRequired
													/>
												</div>
												<div className="form-control">
													<Checkbox>
														<span className="font-medium">
															Set this as the main
															address
														</span>
													</Checkbox>
												</div>
											</form>
										</ModalBody>
										<ModalFooter className="justify-center">
											<Button
												color="primary"
												className="text-center mb-4"
												onPress={() => handleSubmit()}
												fullWidth
											>
												<span className="font-bold text-black">
													Save new address
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

export default CreateNewAddressModal;
