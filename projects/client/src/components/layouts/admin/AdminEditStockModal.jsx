import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { BiEdit } from "react-icons/bi";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockAsync } from "../../../redux/features/products";
const AdminEditStockModal = ({ id }) => {
	const [dataStock, setDataStock] = useState([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const warehouse = useSelector((state) => state.products.warehouse);
	const orderField = useSelector((state) => state.products.orderField);
	const orderDirection = useSelector(
		(state) => state.products.orderDirection
	);
	const search = useSelector((state) => state.products.search);
	const offset = useSelector((state) => state.products.offset);
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const fetchStock = async () => {
		try {
			const { data } = await axiosInstance().get(`stocks/${id}`);
			setDataStock(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const formik = useFormik({
		initialValues: {
			stocks: 0,
			product_name: "",
			warehouse_name: "",
		},
		onSubmit: async (values) => {
			onSubmitEdit(values);
		},
	});

	const onSubmitEdit = async (values) => {
		try {
			setIsLoading(true);
			const { stocks } = values;

			if (!stocks) {
				alert("Please fill in all form fields");
				return; // Stop further execution
			}

			// const accessToken = localStorage.getItem("accessToken");

			const updateStocks = await axiosInstance().patch(`stocks/${id}`, {
				stocks,
			});

			dispatch(
				fetchStockAsync(
					`?warehouse=${warehouse}&search=${search}&brand=${brand.join(
						","
					)}&category=${category.join(
						","
					)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);

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

	useEffect(() => {
		fetchStock();
	}, []);

	useEffect(() => {
		if (dataStock) {
			formik.setValues({
				stocks: dataStock?.stocks,
				product_name: dataStock?.product?.product_name,
				warehouse_name: dataStock?.warehouse?.warehouse_name,
			});
		}
	}, [dataStock]);

	return (
		<>
			<Tooltip content="Edit stock">
				<Button
					variant="light"
					onPress={onOpen}
					className="text-default-400 cursor-pointer active:opacity-50"
					startContent={<BiEdit size={24} />}
				>
					Edit
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
									Edit Stocks
								</h2>
							</ModalHeader>
							<ModalBody className="pb-6">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col gap-4 h-full"
								>
									<div className="form-control">
										<Input
											isReadOnly
											type="text"
											name="warehouse_name"
											label="Warehouse's Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											value={formik.values.warehouse_name}
											disabled
										/>
									</div>
									<div className="form-control">
										<Input
											isReadOnly
											type="text"
											name="product_name"
											label="Product's Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											value={formik.values.product_name}
											disabled
										/>
									</div>
									<div className="form-control">
										<Input
											type="number"
											name="stocks"
											id="stocks_number"
											label="Stocks"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="The product's quantity"
											value={formik.values.stocks}
											onChange={handleFormInput}
											isRequired
										/>
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
												Save changes
											</span>
										</Button>
									</div>
								</form>
							</ModalBody>
							{/* <ModalFooter className="justify-center">
								<Button
									color="primary"
									className="text-center mb-4"
									// isLoading={isLoading}
									fullWidth
									// onPress={() => onSubmit(brandName)}
								>
									<span className="font-bold text-black">
										Save changes
									</span>
								</Button>
							</ModalFooter> */}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminEditStockModal;
