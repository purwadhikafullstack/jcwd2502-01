import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
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

const AdminCreateNewProductPage = () => {
	const { activeMenu, setActiveMenu } = useStateContext();

	const [previewImage0, setPreviewImage0] = useState(null);
	const [previewImage1, setPreviewImage1] = useState(null);
	const [previewImage2, setPreviewImage2] = useState(null);

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
				<form className="flex flex-col gap-8">
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
							/>
						</div>
						<div className="form-control">
							<Select
								size="lg"
								name="category_id"
								label="Product Category"
								labelPlacement="outside"
								placeholder="Select a category"
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
								<h3 className="font-bold">Product Images</h3>
								<p className="text-sm">
									Image format: .jpg, .jpeg, .png
									<br /> Minimum size: 300 x 300 pixels (For
									best quality, use a minimum size of 700 x
									700 pixels).
								</p>
							</div>
							<div className="product-images-inputs w-full ml-12">
								<div className="images-inputs flex gap-4">
									<input
										id="productImgInput"
										accept="image/jpeg, image/jpg, image/x-png, image/png"
										multiple
										type="file"
										// onChange={getFileImage0}
										className="hidden"
									/>
									<div className="img-0 w-32 h-32 rounded-xl border-primary-600 border-2 border-dashed flex justify-center items-center">
										{previewImage0 ? (
											<div className="image-selected-0 w-full h-full rounded-xl">
												<img
													src={previewImage0}
													alt=""
													id="image-0"
													className="w-full h-full aspect-square bg-secondary-500 rounded-xl"
												/>
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
													Main Image
												</p>
											</div>
										)}
									</div>
									<div className="img-1 w-32 h-32 rounded-xl border-primary-600 border-2 border-dashed flex justify-center items-center">
										{previewImage1 ? (
											<div className="image-selected-1 w-full h-full rounded-xl">
												<img
													src={previewImage1}
													alt=""
													id="image-1"
													className="w-full h-full aspect-square bg-secondary-500 rounded-xl"
												/>
											</div>
										) : (
											<div
												className="empty-image-1 w-full h-full cursor-pointer flex flex-col items-center justify-center"
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
													Image 2
												</p>
											</div>
										)}
									</div>
									<div className="img-2 w-32 h-32 rounded-xl border-primary-600 border-2 border-dashed flex justify-center items-center">
										{previewImage2 ? (
											<div className="image-selected-2 w-full h-full rounded-xl">
												<img
													src={previewImage2}
													alt=""
													id="image-2"
													className="w-full h-full aspect-square bg-secondary-500 rounded-xl"
												/>
											</div>
										) : (
											<div
												className="empty-image-2 w-full h-full cursor-pointer flex flex-col items-center justify-center"
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
													Image 3
												</p>
											</div>
										)}
									</div>
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
							/>
						</div>
						<div className="form-control">
							<Input
								type="number"
								name="product_price"
								size="lg"
								placeholder="1.990.000"
								label="Product Price"
								labelPlacement="outside"
								startContent={<span>Rp</span>}
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
								/>
							</div>
						</section>
					</section>
				</form>
			</div>
		</main>
	);
};

export default AdminCreateNewProductPage;
