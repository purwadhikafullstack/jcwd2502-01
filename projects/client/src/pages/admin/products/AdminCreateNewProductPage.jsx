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
import {
	onClear,
	setOrderDirection,
	setOrderField,
	setSearch,
} from "../../../redux/features/products";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MySpinner from "../../../components/uis/Spinners/Spinner";

const AdminCreateNewProductPage = () => {
	const { activeMenu, setActiveMenu } = useStateContext();

	const [isLoading, setIsLoading] = useState(false);

	const [productImages, setProductImages] = useState([]);
	const [imagesToSend, setImagesToSend] = useState([]);

	const navigate = useNavigate();

	const getFileImages = (event) => {
		const selectedImages = event.target.files;
		const selectedImagesArray = Array.from(selectedImages);

		const maxSize = 3 * 1024 * 1024; // 3MB limit
		const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

		const isValidSize = selectedImagesArray.every(
			(image) => image.size <= maxSize
		);
		const isValidType = selectedImagesArray.every((image) =>
			validImageTypes.includes(image.type)
		);

		if (!isValidSize && !isValidType) {
			toast.error(
				"Maximum file size allowed is 3MB and only JPEG, JPG, or PNG files are allowed"
			);
			return false;
		} else if (!isValidSize) {
			toast.error("Maximum file size allowed is 3MB");
			return false;
		} else if (!isValidType) {
			toast.error("Please select valid image files (JPEG, JPG, or PNG)");
			return false;
		}

		if (selectedImagesArray.length > 3) {
			toast.error("Maximum of three images can be uploaded");
			return false;
		} else {
			const imagesArray = selectedImagesArray.map((image) => {
				return URL.createObjectURL(image);
			});
			setImagesToSend(selectedImages);
			setProductImages(imagesArray);
		}
	};

	const handleRemovePreview = () => {
		setProductImages([]);
		setImagesToSend([]);
	};

	//! FORMIK
	const formik = useFormik({
		initialValues: {
			product_name: "",
			product_desc: "",
			product_price: 0,
			category_id: null,
			brand_id: null,
			height: "",
			width: "",
			thickness: "",
			weight: 0,
			wireless: 0,
			wired: "",
			battery_life: "",
			sensor: "",
			resolution: "",
			warranty: "",
		},
		onSubmit: async (values) => {
			onCreateProduct(values);
		},
	});

	const onCreateProduct = async (values) => {
		try {
			setIsLoading(true);

			const {
				product_name,
				product_desc,
				product_price,
				category_id,
				brand_id,
				height,
				width,
				thickness,
				weight,
				wireless,
				wired,
				battery_life,
				sensor,
				resolution,
				warranty,
			} = values;

			// if (!product_name || !product_desc || !product_price) {
			// 	toast.error("Please fill in all form fields");
			// 	return; // Stop further execution
			// }

			const newProductData = {
				product_name,
				product_desc,
				product_price,
				category_id,
				brand_id,
				weight,
			};
			const newSpecData = {
				height,
				width,
				thickness,
				weight: `${weight} g`,
				wireless: wireless && 1,
				wired,
				battery_life,
				sensor,
				resolution,
				warranty,
			};

			const newProductDataJSON = JSON.stringify(newProductData);
			const newSpecDataJSON = JSON.stringify(newSpecData);

			const fd = new FormData();
			fd.append("dataProduct", newProductDataJSON);
			fd.append("dataSpec", newSpecDataJSON);

			if (imagesToSend) {
				for (const image of imagesToSend) {
					fd.append("images", image);
				}
			}

			const accessToken = localStorage.getItem("accessToken");

			const createProduct = await axiosInstance(accessToken).post(
				"products",
				fd
			);

			if (createProduct.data.isError) {
				toast.error(createProduct.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}

			toast.success(createProduct.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			setTimeout(() => {
				dispatch(setOrderField("updatedAt"));
				dispatch(setOrderDirection("desc"));

				navigate(
					"/admin/products?orderField=updatedAt&orderDirection=desc"
				);
			}, 1500);

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
		}
	};

	const handleFormInput = (event) => {
		const { target } = event;
		formik.setFieldValue(target.name, target.value);
	};

	//! ==========================================================

	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	const dispatch = useDispatch();

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
		fetchCategoriesAsync();
		fetchBrandsAsync();

		// window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	useEffect(() => {
		setActiveMenu(false);
	}, [activeMenu, categories, brands]);

	return (
		<main className="max-w-[980px] mx-auto min-h-screen pb-12">
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">Create New Product</h1>
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
								labelPlacement="outside"
								onChange={handleFormInput}
								isRequired
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
								isRequired
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
								isRequired
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
									<b>Image format: .jpg, .jpeg, .png</b>
									<br />
									<b>Max size: 3 mb.</b>
									<br />
									<span className="text-neutral-400 font-medium">
										Minimum dimension: 300 x 300 pixels (For
										best quality, use a minimum size of 700
										x 700 pixels).
									</span>
								</p>
							</div>
							<div className="product-images-inputs w-full ml-12">
								<div className="images-inputs flex gap-4">
									{productImages.length ? (
										<div className="flex flex-col">
											<div className="flex gap-2">
												{productImages?.map((image) => {
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
											<input
												id="productImgInput1"
												accept="image/jpeg, image/jpg, image/x-png, image/png"
												multiple
												type="file"
												onChange={getFileImages}
												className="hidden"
											/>
											<div className="flex mt-4 gap-4">
												<div
													className=""
													onClick={() =>
														document
															.querySelector(
																"#productImgInput1"
															)
															.click()
													}
												>
													<p className="text-primary-600 font-medium hover:cursor-pointer hover:underline">
														Change Images
													</p>
												</div>
												<div
													className=""
													onClick={() =>
														handleRemovePreview()
													}
												>
													<p className="text-red-600 font-medium hover:cursor-pointer hover:underline">
														Remove Images
													</p>
												</div>
											</div>
										</div>
									) : (
										<div className="img-0 w-[132px] h-[132px] rounded-xl border-primary-600 border-2 border-dashed flex justify-center items-center">
											<input
												id="productImgInput"
												accept="image/jpeg, image/jpg, image/x-png, image/png"
												multiple
												type="file"
												onChange={getFileImages}
												className="hidden"
											/>
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
										</div>
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
								isRequired
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
									isRequired
								/>
							</div>
						</section>
						<section className="physical-specifications flex flex-col gap-4">
							<h3 className="font-bold">Specifications</h3>
							<div className="form-control">
								<Checkbox
									name="wireless"
									onChange={(e) =>
										formik.setFieldValue(
											"wireless",
											e.target.checked
										)
									}
								>{`Wireless (check it if this product is wireless.)`}</Checkbox>
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
					<section className="flex items-center gap-4">
						<Button
							fullWidth
							size="lg"
							type="button"
							onClick={() => navigate(-1)}
							className="bg-red-600"
						>
							<p className="text-white font-medium">Cancel</p>
						</Button>
						<Button
							fullWidth
							color="primary"
							size="lg"
							type="submit"
							isLoading={isLoading}
							spinner={<MySpinner />}
						>
							<p className="text-black font-medium">
								Add New Product
							</p>
						</Button>
					</section>
				</form>
			</div>
		</main>
	);
};

export default AdminCreateNewProductPage;
