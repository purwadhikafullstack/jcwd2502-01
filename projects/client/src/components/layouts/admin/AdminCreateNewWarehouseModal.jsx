import React, { useCallback, useEffect, useState } from "react";

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
} from "@nextui-org/react";

import Media from "react-media";
import { axiosInstance } from "../../../lib/axios";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminCreateNewWarehouseModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState();
	const [name, setName] = useState("");
	const [province, setProvince] = useState(0);
	const [city, setCity] = useState(0);
	const [address, setAddress] = useState("");
	const [data, setData] = useState({});

	const onCreate = async (data) => {
		try {
			setIsLoading(true);
			const { name, province, city, address } = data;
			if (!name || !province || !city || !address) {
				toast.error("Please fill out all the form", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return;
			}

			const dataToSend = {
				warehouse_name: name,
				warehouse_address: address,
				province_id: province,
				city_id: city,
			};

			const accessToken = localStorage.getItem("accessToken");
			await axiosInstance(accessToken).post(`warehouses`, dataToSend);
			window.location.reload(false);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
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
				<SelectItem
					onClick={() => handleProvince(province.id)}
					key={province.id}
					value={province.province}
				>
					{province.province}
				</SelectItem>
			);
		});
	};

	const handleProvince = (province) => {
		// const splittedProvince = province?.split(",");
		setSelectedProvince(province);
		setProvince(province);
		// formik.setFieldValue("province_id", province);
	};

	const getCities = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(
				`cities/${province ? province : ""}`
			);

			setCities(data.data);
			console.log(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [axiosInstance, selectedProvince]);

	const renderCitiesOption = () => {
		return cities?.map((city) => {
			return (
				<SelectItem
					onClick={() => setCity(city.id)}
					key={city.id}
					value={city.id}
				>
					{`${city.type} ${city.city_name}`}
				</SelectItem>
			);
		});
	};

	// const handleCity = (city) => {
	// 	const splittedCity = city?.split(",");
	// 	setSelectedCity(city);
	// 	console.log("CITY>>>", city);
	// 	formik.setFieldValue("city_id", city);
	// };

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);

	useEffect(() => {
		if (name && province && city && address) {
			setData({ name, province, city, address });
		}
	}, [name, province, city, address]);

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<Button color="primary" size="md" onPress={onOpen}>
						<p className="font-medium text-black flex items-center gap-1">
							<span className="text-[20px]">+</span>
							<span>Add New Warehouse</span>
						</p>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						placement={matches.medium ? "center" : "bottom"}
						scrollBehavior="inside"
						size={matches.medium ? "2xl" : "full"}
						onClose={() => {
							setSelectedProvince(null);
							setSelectedCity(null);
							setName("");
							setAddress("");
							setProvince(null);
							setCity(null);
						}}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex justify-center">
										<h2 className="text-xl font-bold mb-2">
											Add New Warehouse
										</h2>
									</ModalHeader>
									<ModalBody>
										<form className="flex flex-col gap-4 h-full">
											<div className="form-control">
												<Input
													type="text"
													name="warehouse_name"
													label="Warehouse's Name"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													placeholder="Warehouse Name"
													isRequired
													onChange={(e) =>
														setName(e.target.value)
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
													placeholder={
														"Select a city"
													}
													isRequired
													isDisabled={
														!selectedProvince
													}
												>
													{renderCitiesOption()}
												</Select>
												{!selectedProvince && (
													<p className="mt-2 opacity-50">
														* Please select a
														province first
													</p>
												)}
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
													onChange={(e) =>
														setAddress(
															e.target.value
														)
													}
												/>
											</div>
										</form>
									</ModalBody>
									<ModalFooter className="justify-center">
										<Button
											color="primary"
											className="text-center mb-4"
											isLoading={isLoading}
											spinner={<MySpinner />}
											fullWidth
											onPress={() => onCreate(data)}
										>
											<span className="font-bold text-black">
												Save new warehouse
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
	);
};

export default AdminCreateNewWarehouseModal;
