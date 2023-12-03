import React, { useCallback, useEffect, useState } from "react";

import { useFormik } from "formik";

import {
	Button,
	Input,
	Select,
	SelectItem,
	Textarea,
	Tooltip,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehousesAsync } from "../../../redux/features/products";

const AdminEditWarehouseModal = ({ warehouseId }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [isLoading, setIsLoading] = useState(false);

	const [provinces, setProvinces] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const [cities, setCities] = useState([]);
	const [warehouse, setWarehouse] = useState(null);

	const { offset, orderField, orderDirection } = useSelector(
		(state) => state.products
	);

	const dispatch = useDispatch();

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
			const { warehouse_name, warehouse_address, province_id, city_id } =
				values;

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

			setIsLoading(false);

			dispatch(
				fetchWarehousesAsync(
					`?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);

			onOpenChange();

			return;
		} catch (error) {
			toast.error("Network error", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
			setIsLoading(false);
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
		<>
			<Tooltip content="Edit warehouse">
				<Button
					isIconOnly
					variant="light"
					onPress={onOpen}
					className="text-lg text-default-400 cursor-pointer active:opacity-50"
				>
					<BiEdit size={24} />
				</Button>
			</Tooltip>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Edit warehouse
							</ModalHeader>
							<ModalBody>
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
											value={
												formik.values.warehouse_address
											}
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
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminEditWarehouseModal;
