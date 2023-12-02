import React, { useCallback, useEffect, useState } from "react";

import { useFormik } from "formik";

import { IoClose } from "react-icons/io5";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminEditWarehouseModal = ({
	handleOpenEditWarehouseModal,
	warehouseId,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [cities, setCities] = useState([]);
	const [warehouse, setWarehouse] = useState(null);

	useEffect(() => {
		if (warehouse) {
			formik.setValues({
				warehouse_name: warehouse.warehouse_name || "",
				warehouse_location: warehouse.warehouse_location || "",
				warehouse_address: warehouse.warehouse_address || "",
				province_id: warehouse.province.id || null,
				city_id: warehouse.city.id || null,
			});
			setSelectedProvince(warehouse.province.id);
			setSelectedCity(warehouse.city.id);
		}
	}, [warehouse]);

	const formik = useFormik({
		initialValues: {
			warehouse_name: "",
			warehouse_location: "",
			warehouse_address: "",
			province_id: null,
			city_id: null,
		},
		onSubmit: async (values) => {
			onSubmitEdit(values);
		},
	});

	const onSubmitEdit = async (values) => {
		try {
			setIsLoading(true);
			const {
				warehouse_name,
				// warehouse_location,
				warehouse_address,
				province_id,
				city_id,
			} = values;

			if (
				!warehouse_name ||
				// !warehouse_location ||
				!warehouse_address ||
				!province_id ||
				!city_id
			) {
				toast.error("Please fill in all form fields", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return; // Stop further execution
			}

			const newWarehouseData = {
				warehouse_name,
				// warehouse_location,
				warehouse_address,
				province_id,
				city_id,
			};

			const accessToken = localStorage.getItem("accessToken");

			const updateWarehouse = await axiosInstance(accessToken).patch(
				`warehouses/${warehouseId}`,
				newWarehouseData
			);

			toast.success(updateWarehouse.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			setTimeout(() => {
				window.location.reload(false);
			}, 1200);
			setIsLoading(false);
			return;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFormInput = (event) => {
		const { target } = event;
		formik.setFieldValue(target.name, target.value);
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
					onClick={() => {
						handleProvince(province.id);
					}}
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
				<SelectItem
					onClick={() => {
						handleCity(city.id);
					}}
					key={city.id}
					value={city.id}
				>
					{`${city.type} ${city.city_name}`}
				</SelectItem>
			);
		});
	};

	const handleCity = (city) => {
		// const splittedCity = city?.split(",");
		setSelectedCity(city);
		formik.setFieldValue("city_id", city);
	};

	useEffect(() => {
		getProvinces();
		if (selectedProvince) {
			getCities();
		}
	}, [getProvinces, getCities, selectedProvince]);

	const fetchWarehouse = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance(accessToken).get(
				`warehouses/${warehouseId}`
			);

			setWarehouse(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWarehouse();
	}, [warehouseId]);

	return (
		<div className={`edit-product z-[999999] block`}>
			<div
				className={`z-[99999] absolute top-0 right-0 bottom-0 left-0 h-full`}
			>
				<section className="admin-edit-warehouse-product w-[820px] h-full m-auto flex justify-center items-center">
					<div className="admin-create-product-container w-full bg-background p-8 rounded-xl">
						<div className="modal-header mb-8 flex justify-center relative w-full">
							<div className="heading-title">
								<h1 className="font-bold text-xl">
									Update Warehouse
								</h1>
							</div>
							<div className="close-button absolute top-0 right-0">
								<Button
									onClick={() => {
										handleOpenEditWarehouseModal();
									}}
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
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col justify-between gap-4 h-full"
							>
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
										value={formik.values.warehouse_name}
										onChange={handleFormInput}
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
										selectedKeys={[
											String(selectedProvince),
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
										placeholder="Select a City"
										isRequired
										selectedKeys={
											selectedCity
												? [String(selectedCity)]
												: []
										}
									>
										{renderCitiesOption()}
									</Select>
								</div>
								<div className="form-control">
									<Textarea
										placeholder="Jl. Street Address"
										name="warehouse_address"
										label="Warehouse Address"
										labelPlacement="outside"
										variant="bordered"
										radius="sm"
										size="lg"
										isRequired
										value={formik.values.warehouse_address}
										onChange={handleFormInput}
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
									>
										<span className="font-bold text-black">
											Save changes
										</span>
									</Button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
			<div
				className={`z-[9999] absolute top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center`}
			></div>
		</div>
	);
};

export default AdminEditWarehouseModal;
