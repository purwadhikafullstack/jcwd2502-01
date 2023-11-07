import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
	Button,
	Checkbox,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch } from "react-redux";
import { onClear, setSearch } from "../../../redux/features/products";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useFormik } from "formik";

const AdminEditProductPage = () => {
	const { activeMenu, setActiveMenu } = useStateContext();

	const [oldImages, setOldImages] = useState([]);

	const [productData, setProductData] = useState();

	const [previewImages, setPreviewImages] = useState([]);

	const getFileImages = (event) => {
		const selectedImages = event.target.files;
		const selectedImagesArray = Array.from(selectedImages);

		if (selectedImagesArray.length > 3) {
			alert("Maximum of three images can be uploaded");
			return false;
		} else {
			const imagesArray = selectedImagesArray.map((image) => {
				return URL.createObjectURL(image);
			});
			setPreviewImages(imagesArray);
		}
	};

	const handleRevert = () => {
		if (productData?.product_images.length) {
			setOldImages(productData?.product_images);
		}

		setPreviewImages([]);
	};

	//! FORMIK
	useEffect(() => {
		// Initialize the form's initial values based on the fetched data
		if (productData) {
			formik.setValues({
				product_name: productData.product_name,
				product_desc: productData.product_desc,
				product_price: productData.product_price,
				category_id: productData.category.id,
				brand_id: productData.brand.id,
				weight: productData.weight,
			});
		}
	}, [productData]);

	const formik = useFormik({
		initialValues: {
			product_name: "",
			product_desc: "",
			product_price: 0,
			category_id: null,
			brand_id: null,
			weight: 0,
		},
		onSubmit: async (values) => {
			// onCreateProduct(values);
		},
	});

	// const onCreateProduct = async (values) => {
	// 	try {
	// 		const {
	// 			product_name,
	// 			product_desc,
	// 			product_price,
	// 			category_id,
	// 			brand_id,
	// 			weight,
	// 		} = values;

	// 		// if (!product_name || !product_desc || !product_price) {
	// 		// 	toast.error("Please fill in all form fields");
	// 		// 	return; // Stop further execution
	// 		// }

	// 		const newProductData = {
	// 			product_name,
	// 			product_desc,
	// 			product_price,
	// 			category_id,
	// 			brand_id,
	// 			weight,
	// 		};

	// 		const newProductDataJSON = JSON.stringify(newProductData);

	// 		const fd = new FormData();
	// 		fd.append("data", newProductDataJSON);

	// 		if (!previewImages) {
	// 			fd.append("image", null);
	// 		} else {
	// 			fd.append("image", productImage);
	// 		}

	// 		const accessToken = localStorage.getItem("accessToken");

	// 		const createProduct = await Instance(accessToken).post(
	// 			"products",
	// 			fd
	// 		);

	// 		if (createProduct.status === 201) {
	// 			toast.success("Product created successfully");

	// 			setTimeout(() => {
	// 				window.location.reload(false);
	// 			}, 1500);
	// 		} else {
	// 			toast.error("Error creating product");
	// 		}

	// 		return createProduct;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleFormInput = (event) => {
		const { target } = event;
		formik.setFieldValue(target.name, target.value);
	};

	//! ==========================================================

	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	const dispatch = useDispatch();

	const fetchProductAsync = async () => {
		try {
			const { data } = await axiosInstance().get(
				`products/G102%20LIGHTSYNC`
			);
			setProductData(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCategoriesAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`categories/all`);
			setCategories(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBrandsAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`brands/all`);
			setBrands(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProductAsync();
		fetchCategoriesAsync();
		fetchBrandsAsync();

		// window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	useEffect(() => {
		console.log(productData);
		if (productData?.product_images.length) {
			setOldImages(productData?.product_images);
		}
	}, [productData]);

	useEffect(() => {
		setActiveMenu(false);
	}, [activeMenu, categories, brands]);

	return (
		<main className="max-w-[980px] mx-auto min-h-screen pb-12">
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">Edit Product</h1>
			</div>
			<div className="form-container">
				<form
					className="flex flex-col gap-8"
					onSubmit={formik.handleSubmit}
				>
					<section className="product-information shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] bg-background p-8 rounded-xl flex flex-col gap-6">
						<h2 className="font-bold text-lg">
							Product Information
						</h2>
						<div className="form-control">
							<Input
								type="text"
								name="product_name"
								size="lg"
								placeholder="Ex: Logitech Gaming Mouse HERO"
								label="Product Name"
								value={productData?.product_name}
								labelPlacement="outside"
								onChange={handleFormInput}
							/>
						</div>
						<div className="form-control">
							<Select
								size="lg"
								name="category_id"
								label="Product Category"
								labelPlacement="outside"
								placeholder="Select a category"
								onChange={handleFormInput}
							>
								{categories.map((category) => (
									<SelectItem
										key={category.id}
										value={category.id}
									>
										{category.category_type}
									</SelectItem>
								))}
							</Select>
						</div>
						<div className="form-control">
							<Select
								size="lg"
								name="brand_id"
								label="Product Brand"
								labelPlacement="outside"
								placeholder="Select a brand"
								onChange={handleFormInput}
							>
								{brands.map((brand) => (
									<SelectItem key={brand.id} value={brand.id}>
										{brand.brand_name}
									</SelectItem>
								))}
							</Select>
						</div>
					</section>
					<section className="product-information shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] bg-background p-8 rounded-xl flex flex-col gap-6">
						<h2 className="font-bold text-lg">Product Detail</h2>
						<div className="form-control-images flex">
							<div className="product-image-info min-w-[180px]">
								<h3 className="font-bold">
									Product Images (Max 3 Images)
								</h3>
								<p className="text-sm">
									Image format: .jpg, .jpeg, .png
									<br /> Minimum size: 300 x 300 pixels (For
									best quality, use a minimum size of 700 x
									700 pixels).
								</p>
							</div>
							<div className="product-images-inputs w-full ml-12">
								<div className="images-inputs flex gap-4">
									{previewImages.length ? (
										<div className="flex flex-col">
											<input
												id="productImgInput1"
												accept="image/jpeg, image/jpg, image/x-png, image/png"
												multiple
												type="file"
												onChange={getFileImages}
												className="hidden"
											/>
											<div className="flex gap-4">
												{previewImages?.map((image) => {
													return (
														<div className="img-0 w-[150px] h-[150px] rounded-xl flex justify-center items-center">
															<div className="image-selected-0 w-full h-full rounded-xl">
																<img
																	src={image}
																	alt=""
																	id="image-0"
																	className="w-full h-full aspect-square object-contain bg-secondary-500 rounded-xl"
																/>
															</div>
														</div>
													);
												})}
											</div>
											<div className="flex gap-6">
												<div
													className="mt-4"
													onClick={() =>
														document
															.querySelector(
																"#productImgInput1"
															)
															.click()
													}
												>
													<p className="text-primary-600 font-medium">
														Change Images
													</p>
												</div>
												<div
													className="mt-4"
													onClick={() =>
														setPreviewImages([])
													}
												>
													<p className="text-red-600 font-medium">
														Remove Images
													</p>
												</div>
												<div
													className="mt-4"
													onClick={handleRevert}
												>
													<p className="text-yellow-600 font-medium">
														Revert Images
													</p>
												</div>
											</div>
										</div>
									) : (
										<>
											<input
												id="productImgInput"
												accept="image/jpeg, image/jpg, image/x-png, image/png"
												multiple
												type="file"
												onChange={getFileImages}
												className="hidden"
											/>
											{oldImages.length ? (
												<div className="flex flex-col">
													<div className="flex gap-4">
														{productData?.product_images?.map(
															(image) => {
																return (
																	<div className="img-0 w-[150px] h-[150px] rounded-xl flex justify-center items-center">
																		<div className="image-selected-0 w-full h-full rounded-xl">
																			<img
																				src={`${
																					process
																						.env
																						.REACT_APP_IMAGE_API
																				}${image?.image.substring(
																					7
																				)}`}
																				alt=""
																				id="image-0"
																				className="w-full h-full aspect-square bg-secondary-500 object-contain rounded-xl"
																			/>
																		</div>
																	</div>
																);
															}
														)}
													</div>
													<div className="flex gap-6">
														<div
															className="mt-4"
															onClick={() =>
																document
																	.querySelector(
																		"#productImgInput"
																	)
																	.click()
															}
														>
															<p className="text-primary-600 font-medium">
																Change Images
															</p>
														</div>
														<div
															className="mt-4"
															onClick={() =>
																setOldImages([])
															}
														>
															<p className="text-red-600 font-medium">
																Remove Images
															</p>
														</div>
													</div>
												</div>
											) : (
												<div
													className="empty-image-0 w-full h-full cursor-pointer flex flex-col items-center justify-center"
													onClick={() =>
														document
															.querySelector(
																"#productImgInput"
															)
															.click()
													}
												>
													<MdOutlineAddPhotoAlternate
														size={40}
														className="fill-primary-600"
													/>
													<p className="text-primary-600 font-medium">
														Select Images
													</p>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
						<div className="form-control">
							<Textarea
								size="lg"
								name="product_desc"
								label="Product Description"
								labelPlacement="outside"
								placeholder="Enter your product description"
								onChange={handleFormInput}
							/>
						</div>
						<div className="form-control">
							<Input
								type="number"
								name="product_price"
								size="lg"
								placeholder="Ex: 1990000"
								min={1}
								label="Product Price (in Rp)"
								labelPlacement="outside"
								onChange={handleFormInput}
							/>
						</div>
					</section>
					<section className="product-information shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] bg-background p-8 rounded-xl flex flex-col gap-6">
						<h2 className="font-bold text-lg">
							Product Specifications
						</h2>
						<section className="physical-specifications flex flex-col gap-4">
							<h3 className="font-bold">
								Physical Specifications
							</h3>
							<div className="form-control">
								<Input
									type="text"
									name="height"
									size="lg"
									placeholder="Ex: 120 mm"
									label="Height (mm/cm)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="width"
									size="lg"
									placeholder="Ex: 64 mm"
									label="Width (mm/cm)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="thickness"
									size="lg"
									placeholder="Ex: 40 mm"
									label="Thickness (mm/cm)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="number"
									name="weight"
									size="lg"
									placeholder="Ex: 1200"
									label="Weight (in gram)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
						</section>
						<section className="physical-specifications flex flex-col gap-4">
							<h3 className="font-bold">Specifications</h3>
							<div className="form-control">
								<Checkbox name="wireless">{`Wireless (check it if this product is wireless.)`}</Checkbox>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="wired"
									size="lg"
									placeholder="Ex: 1.5 m"
									label="Cable length (cm/m)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="battery_life"
									size="lg"
									placeholder="Ex: 250 hours or rechargeable"
									label="Battery life (hour/rechargeable)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="sensor"
									size="lg"
									placeholder="Ex: HERO 2"
									label="Sensor"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="resolution"
									size="lg"
									placeholder="Ex: 100 - 32.000 dpi (mouse) or 100 - 32.000 dpi (monitor)"
									label="Resolution"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
							<div className="form-control">
								<Input
									type="text"
									name="warranty"
									size="lg"
									placeholder="Ex: 1"
									label="Warranty (year)"
									labelPlacement="outside"
									onChange={handleFormInput}
								/>
							</div>
						</section>
					</section>
					<section>
						<Button
							fullWidth
							color="primary"
							size="lg"
							type="submit"
						>
							<p className="text-black font-medium">
								Save Changes
							</p>
						</Button>
					</section>
				</form>
			</div>
		</main>
	);
};

export default AdminEditProductPage;
