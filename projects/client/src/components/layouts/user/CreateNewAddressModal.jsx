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
} from "@nextui-org/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSetUserAddresses } from "../../../redux/features/users";
const CreateNewAddressModal = () => {
	const accessToken = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { username } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const location = useLocation();

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [cities, setCities] = useState([]);
	const [citiesName, setCitiesName] = useState("");
	const [selectedCity, setSelectedCity] = useState();

	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			recipient_name: "",
			address_name: "",
			address: "",
			province_id: "",
			city_id: "",
		},
		onSubmit: async (values) => {
			handleSubmit(values);
		},
		validationSchema: yup.object().shape({
			address_name: yup.string().required(),
			recipient_name: yup.string().required(),
			address: yup.string().required(),
		}),
	});
	const handleSubmit = async (values) => {
		try {
			setIsLoading(true);

			setTimeout(async () => {
				const createNewAddress = await axiosInstance(accessToken).post(
					"/user-addresses/newAddress",
					values
				);

				dispatch(onSetUserAddresses(accessToken));
			}, 1200);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
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
		setSelectedProvince(province);
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
				<SelectItem key={city.id} value={city}>
					{`${city.type} ${city.city_name}`}
				</SelectItem>
			);
		});
	};

	const handleCity = (city) => {
		setSelectedCity(city.id);
		setCitiesName(city.city_name);
		formik.setFieldValue("city_id", city);
	};

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);

	useEffect(() => {
		formik.setFieldValue("recipient_name", username);
	}, [username]);

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
							backdrop="opaque"
							classNames={
								location.pathname === "/cart/checkout" && {
									backdrop: "bg-black bg-opacity-70",
								}
							}
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
														value={
															formik.values
																.recipient_name
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
														name="address_name"
														label="Address Label"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="Home"
														value={
															formik.values
																.address_name
														}
														onChange={
															formik.handleChange
														}
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
															handleCity(
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
														name="address"
														label="Full Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														value={
															formik.values
																.address
														}
														onChange={
															formik.handleChange
														}
														isRequired
													/>
												</div>
											</form>
										</ModalBody>
										<ModalFooter className="justify-center">
											<Button
												color="primary"
												className="text-center mb-4"
												type="submit"
												onClick={(e) => {
													formik.handleSubmit(e);
													setTimeout(() => {
														onClose();
													}, 1200);
												}}
												fullWidth
												isLoading={isLoading}
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
