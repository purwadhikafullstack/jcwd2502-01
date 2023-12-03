import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { FaCodePullRequest } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminCreateRequestStockModal = ({ productName }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [dataProduct, setDataProduct] = useState([]);
	const [dataWarehouse, setDataWarehouse] = useState([]);
	const [dataStock, setDataStock] = useState(null);
	const [warehouseIdFrom, setWarehouseIdFrom] = useState(0);

	const warehouse = useSelector((state) => state.products.warehouse);
	const [warehouseIDTo, setWarehouseIDTo] = useState(null);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			quantity: 0,
			product_id: "",
			warehouse_id_from: "",
			warehouse_id_to: "",
			status: "pending",
		},
		onSubmit: async (values) => {
			onSubmitCreateRequest(values);
		},
	});

	const fetchDataProduct = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`products/${productName}`
		);
		formik.setFieldValue("product_id", data?.data?.id);
		setDataProduct(data.data);
	};
	const fetchDataWarehouse = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const { data } = await axiosInstance(accessToken).get(
			`warehouses/others/${warehouse}`
		);
		formik.setFieldValue("warehouse_id_from", warehouse);
		setDataWarehouse(data.data);
	};
	useEffect(() => {
		fetchDataProduct();
		fetchDataWarehouse();
	}, [warehouse]);

	const onSubmitCreateRequest = async (values) => {
		try {
			setIsLoading(true);
			const {
				quantity,
				product_id,
				warehouse_id_from,
				warehouse_id_to,
				status,
			} = values;

			if (!warehouse_id_to) {
				setIsLoading(false);
				toast.error("Please choose a warehouse", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return; // Stop further execution
			}
			if (quantity <= 0) {
				setIsLoading(false);
				toast.error("Quantity can not be 0 or less than 0", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return; // Stop further execution
			}
			if (quantity > dataStock.stocks) {
				setIsLoading(false);
				toast.error(
					"Quantity requested is more than what is available",
					{
						style: {
							backgroundColor: "var(--background)",
							color: "var(--text)",
						},
					}
				);
				return; // Stop further execution
			}
			// // const accessToken = localStorage.getItem("accessToken");
			const dataToSend = {
				quantity,
				status,
				product_id,
				warehouse_id_from,
				warehouse_id_to,
			};

			const accessToken = localStorage.getItem("accessToken");
			const addMutation = await axiosInstance(accessToken).post(
				`stocks/mutation`,
				dataToSend
			);

			if (addMutation.data.isError) {
				setIsLoading(false);
				toast.error(addMutation.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return;
			}

			toast.success(addMutation.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			onOpenChange();
			setIsLoading(false);
		} catch (error) {
			toast.error("Network error", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
			setIsLoading(false);
			console.log(error);
		}
	};

	const handleFormInput = async (event) => {
		const { target } = event;
		const accessToken = localStorage.getItem("accessToken");
		if (target.name === "warehouse_id_to") {
			const { data } = await axiosInstance(accessToken).get(
				`stocks/specific/?productId=${dataProduct.id}&warehouseId=${target.value}`
			);
			setDataStock(data.data);
			formik.setFieldValue(target.name, target.value);
		} else {
			formik.setFieldValue(target.name, Number(target.value));
		}
	};

	const renderWarehousesOption = () => {
		return dataWarehouse?.map((warehouse) => {
			return (
				<SelectItem key={warehouse.id} value={warehouse.id}>
					{` ${warehouse.warehouse_name}`}
				</SelectItem>
			);
		});
	};

	return (
		<>
			<Button
				variant="light"
				onPress={onOpen}
				className="text-default-400 cursor-pointer active:opacity-50"
				startContent={<FaCodePullRequest size={20} />}
			>
				Request
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				scrollBehavior="inside"
				size="2xl"
				onClose={() => setDataStock(null)}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex justify-center">
								<h2 className="text-xl font-bold mb-2">
									Create Request Stock
								</h2>
							</ModalHeader>
							<ModalBody className="pb-6">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col gap-4 h-full"
								>
									<div className="form-control">
										<Card>
											<CardBody>
												<div className="flex gap-4">
													<div className="w-20">
														<Image
															// src={`${
															// 	process.env
															// 		.REACT_APP_IMAGE_API
															// }${product?.product_images[0]?.image.substring(
															// 	7
															// )}`}
															src={`${
																process.env
																	.REACT_APP_IMAGE_API
															}${dataProduct?.product_images[0]?.image.substring(
																7
															)}`}
															alt="logitech"
															className="w-full h-full aspect-square object-contain bg-white"
														/>
													</div>
													<div>
														<h4 className="font-bold">{`${dataProduct?.product_name}`}</h4>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
									<div className="form-control">
										<Select
											name="warehouse_id_to"
											label="Request to warehouse..."
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											onChange={handleFormInput}
											placeholder="Select a warehouse"
											isRequired
											selectedKeys={
												warehouseIDTo
													? [String(warehouseIDTo)]
													: null
											}
										>
											{renderWarehousesOption()}
										</Select>
									</div>
									{dataStock && (
										<div>
											{dataStock.stocks} stocks available{" "}
										</div>
									)}
									<div className="form-control">
										<Input
											type="number"
											name="quantity"
											id="quantity_number"
											label="Quantity"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Quantity to request"
											onChange={handleFormInput}
											isRequired
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
												Create Request
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

export default AdminCreateRequestStockModal;
