import React, { useState } from "react";
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
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { FaCodePullRequest } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { axiosInstance } from "../../../lib/axios";

const AdminCreateRequestStockModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const [warehouseIDTo, setWarehouseIDTo] = useState(null);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			quantity: 0,
			product_id: `{product.id}`,
			warehoues_id_to: "",
		},
		onSubmit: async (values) => {
			onSubmitCreateRequest(values);
		},
	});

	const onSubmitCreateRequest = async (values) => {
		try {
			setIsLoading(true);
			// const { stocks } = values;

			// if (!stocks) {
			// 	alert("Please fill in all form fields");
			// 	return; // Stop further execution
			// }

			// // const accessToken = localStorage.getItem("accessToken");

			// const updateStocks = await axiosInstance().patch(`stocks/${id}`, {
			// 	stocks,
			// });

			// dispatch(
			// 	fetchStockAsync(
			// 		`?warehouse=${warehouse}&search=${search}&brand=${brand.join(
			// 			","
			// 		)}&category=${category.join(
			// 			","
			// 		)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			// 	)
			// );

			// window.location.reload(false);
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

	const handleWarehouseIDTo = (warehouseIDTo) => {
		setWarehouseIDTo(warehouseIDTo);
		formik.setFieldValue("warehouse_id_to", warehouseIDTo);
	};

	// const renderWarehousesOption = () => {
	// 	return warehouses?.map((warehouse) => {
	// 		return (
	// 			<SelectItem key={warehouse.id} value={warehouse.id}>
	// 				{`${warehouse.type} ${warehouse.warehouse_name}`}
	// 			</SelectItem>
	// 		);
	// 	});
	// };

	return (
		<>
			<Tooltip content="Create request">
				<Button
					variant="light"
					onPress={onOpen}
					className="text-default-400 cursor-pointer active:opacity-50"
					startContent={<FaCodePullRequest size={20} />}
				>
					Request
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				scrollBehavior="inside"
				size="2xl"
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
															src={`${process.env.REACT_APP_IMAGE_API}1.png`}
															alt="logitech"
															className="w-full h-full aspect-square object-contain bg-white"
														/>
													</div>
													<div>
														<h4 className="font-bold">{`PRODUCT NAME`}</h4>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
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
									<div className="form-control">
										<Select
											name="warehouse_id_to"
											label="Request to warehouse..."
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											onChange={(e) =>
												handleWarehouseIDTo(
													e.target.value
												)
											}
											placeholder="Select a City"
											isRequired
											selectedKeys={
												setWarehouseIDTo
													? [String(warehouseIDTo)]
													: ""
											}
										>
											{/* {renderWarehousesOption()} */}
										</Select>
									</div>
									<div className="modal-footer pt-4">
										<Button
											isLoading={isLoading}
											color="primary"
											className="text-center"
											fullWidth
											type="submit"
											onPress={onClose}
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
