import React, { useCallback, useEffect, useState } from "react";

import { useFormik } from "formik";

import { IoClose } from "react-icons/io5";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";

const EditWarehouseModal = ({
	handleOpenEditWarehouseModal,
	warehouseId,
	open,
}) => {
	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState([]);
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState([]);
	const [warehouse, setWarehouse] = useState(null);

	// useEffect(() => {
	// 	if (warehouse) {
	// 		formik.setValues({
	// 			warehouse_name: warehouse.warehouse_name || "",
	// 			warehouse_location: warehouse.warehouse_location || "",
	// 			warehouse_address: warehouse.warehouse_address || "",
	// 			province_id: warehouse.province_id || null,
	// 			city_id: warehouse.city_id || null,
	// 		});
	// 	}
	// }, [warehouse]);

	// const formik = useFormik({
	// 	initialValues: {
	// 		warehouse_name: ""
	// 		warehouse_location: ""
	// 		warehouse_address: ""
	// 		province_id: null
	// 		city_id: null
	// const formik = useFormik({
	// 	},
	// 	onSubmit: async (values) => {
	// 		onEditWarehouse(values);
	// 	},
	// });

	// const handleFormInput = (event) => {
	// 	const { target } = event;
	// 	formik.setFieldValue(target.name, target.value);
	// };

	const getProvinces = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(`provinces`);

			setProvinces(data.data);
			console.log(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [axiosInstance]);

	const renderProvincesOption = () => {
		return provinces?.map((province) => {
			return (
				<SelectItem key={[province.id, province.province]}>
					{province.province}
				</SelectItem>
			);
		});
	};

	const handleProvince = (province) => {
		const splittedProvince = province?.split(",");
		setSelectedProvince(splittedProvince);
		// 	formik.setFieldValue(province_id, splittedProvince[0]);
	};

	const getCities = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(
				`cities/${selectedProvince ? selectedProvince[0] : ""}`
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
				<SelectItem key={[city.id, city.type, city.city_name]}>
					{city.type} {city.city_name}
				</SelectItem>
			);
		});
	};

	const handleCity = (city) => {
		const splittedCity = city?.split(",");
		setSelectedProvince(splittedCity);
		// 	formik.setFieldValue(city_id, splittedCity[0]);
	};

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [open]);

	// const fetchWarehouses = async () => { //* Fetch warehouse where selected warehouse id bang
	// 	try {
	// 		// const accessToken = localStorage.getItem("accessToken");
	// 		const { data } = await axiosInstance().get(`warehouses/...`);

	// 		setWarehouse(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchWarehouse();
	// }, []);

	useEffect(() => {
		console.log(warehouseId);
	}, [warehouseId]);

	return (
		<>
			<div
				className={`edit-product z-[9999] ${open ? "block" : "hidden"}`}
			>
				<div
					className={`z-[999] absolute top-0 right-0 bottom-0 left-0 h-full`}
				>
					<section className="admin-edit-warehouse-product w-[820px] h-full m-auto flex justify-center items-center">
						<div className="admin-create-product-container w-full bg-background p-8 rounded-xl">
							<div className="modal-header mb-8 flex justify-center relative">
								<div className="heading-title">
									<h1 className="font-bold text-xl">
										Update Warehouse
									</h1>
								</div>
								<div className="close-button absolute top-0 right-0">
									<Button
										onClick={handleOpenEditWarehouseModal}
										isIconOnly
										variant="light"
										radius="full"
										size="sm"
									>
										<IoClose
											size={20}
											className="fill-neutral-500"
										/>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<form className="flex flex-col justify-between gap-4 h-full">
									<div className="form-control">
										<Input
											type="text"
											name="warehouse_name"
											label="Warehouse's Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											defaultValue={"Warehouse 1"}
											isRequired
											// value={formik.values.warehouse_name}
											// onChange={handleFormInput}
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
												handleProvince(e.target.value)
											}
											placeholder="Select a province"
											isRequired
											// defaultValue={formik.values.province_id}
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
												handleCity(e.target.value)
											}
											placeholder="Select a City"
											isRequired
											// defaultValue={formik.values.warehouse_name}
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
											// value={formik.values.warehouse_address}
											// onChange={handleFormInput}
										/>
									</div>
								</form>
							</div>
							<div className="modal-footer pt-4">
								<Button
									color="primary"
									className="text-center"
									fullWidth
								>
									<span className="font-bold text-black">
										Save changes
									</span>
								</Button>
							</div>
						</div>
					</section>
				</div>
				<div
					className={`z-[99] absolute top-0 right-0 left-0 bottom-0 bg-neutral-700 bg-opacity-70 flex justify-center items-center`}
				></div>
			</div>
		</>
	);
};

export default EditWarehouseModal;
