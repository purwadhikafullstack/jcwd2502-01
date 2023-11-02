import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Pagination,
	Tooltip,
	Image,
	Chip,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import SelectSortBy from "../../uis/Selects/SelectSortBy";
import {
	onClear,
	setPagination,
	setSearch,
} from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import SelectProductBrands from "../../uis/Selects/SelectProductBrands";
import SelectProductCategories from "../../uis/Selects/SelectProductCategories";
import { Link } from "react-router-dom";

const AdminProductListTable = ({ products }) => {
	const [categoriesList, setCategoriesList] = useState([]);
	const [brandsList, setBrandsList] = useState([]);

	const dispatch = useDispatch();

	const count = useSelector((state) => state.products.count);
	const search = useSelector((state) => state.products.search);

	const totalPage = Math.ceil(count / 12);

	const fetchCategoriesAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`categories/all`);
			setCategoriesList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBrandsAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`brands/all`);
			setBrandsList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategoriesAsync();
		fetchBrandsAsync();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClear());
			dispatch(setSearch(""));
		};
	}, []);

	const columns = [
		{ name: "PRODUCT INFO", uid: "product_info" },
		{ name: "DESCRIPTION", uid: "description" },
		{ name: "CATEGORY", uid: "category" },
		{ name: "BRAND", uid: "brand" },
		{ name: "PRICE", uid: "price" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((product, columnKey) => {
		const productPrice = product?.product_price.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		switch (columnKey) {
			case "product_info":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<div className="product-image aspect-square w-12 h-12 md:w-20 md:h-20 rounded-lg object-contain">
							<Image
								src={`${
									process.env.REACT_APP_IMAGE_API
								}${product?.product_images[0].image.substring(
									7
								)}`}
								alt=""
								className="product-image aspect-square w-full h-full object-contain bg-white"
							/>
						</div>
						<p className="font-medium text-base line-clamp-1">
							{product?.product_name}
						</p>
					</div>
				);
			case "description":
				return (
					<p className="text-base line-clamp-1">
						{product?.product_desc}
					</p>
				);
			case "category":
				return <Chip>{product?.category?.category_type}</Chip>;
			case "brand":
				return <Chip>{product?.brand?.brand_name}</Chip>;
			case "price":
				return (
					<div className="flex items-center gap-4 w-full">
						<p className="font-bold text-base w-full">
							{productPrice}
						</p>
					</div>
				);
			case "actions":
				return (
					<div className="relative flex justify-start items-center gap-2">
						<Link to={`/admin/edit-product`}>
							<Tooltip content="Edit product">
								<Button
									variant="light"
									className="text-default-400 cursor-pointer active:opacity-50"
									startContent={<BiEdit size={24} />}
								>
									Edit
								</Button>
							</Tooltip>
						</Link>
					</div>
				);
			default:
		}
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						variant="bordered"
						className="w-full sm:max-w-[44%]"
						placeholder="Search by product name"
						startContent={<IoSearch />}
					/>
					<div className="flex gap-3">
						<div className="select-brands">
							<SelectProductBrands brands={brandsList} />
						</div>
						<div className="select-categories">
							<SelectProductCategories
								categories={categoriesList}
							/>
						</div>
						<div className="sort-by flex items-center">
							<div className="w-full mr-2 font-medium">
								Sort by:
							</div>
							<SelectSortBy admin={true} />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Total {products?.length} products
					</span>
				</div>
			</div>
		);
	}, [products?.length]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					size="md"
					showControls
					total={totalPage ? totalPage : 1}
					// page={page ? page : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					// onChange={(e) => {
					// 	dispatch(setPagination(e, (e - 1) * 12));
					// 	window.scrollTo({ top: 0, behavior: "smooth" });
					// }}
				/>
			</div>
		);
	}, []);

	useEffect(() => {
		console.log(">>>>>", products);
	}, [products]);

	return (
		<Table
			aria-label="Example table with custom cells, pagination and sorting"
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			fullWidth
			topContent={topContent}
			topContentPlacement="outside"
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						className={
							column.uid === "product_info" && "w-full md:w-[40%]"
						}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No products found"} items={products}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default AdminProductListTable;
