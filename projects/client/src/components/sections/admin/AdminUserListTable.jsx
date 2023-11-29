import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Tooltip,
	Button,
	Chip,
	Image,
} from "@nextui-org/react";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const rows = [
	{
		key: "1",
		name: "Tony Reichert",
		email: "Toby@gmail.com",
		role: "CEO",
		status: "Active",
	},
	{
		key: "2",
		name: "Zoey Lang",
		role: "Technical Lead",
		status: "Paused",
	},
	{
		key: "3",
		name: "Jane Fisher",
		role: "Senior Developer",
		status: "Active",
	},
	{
		key: "4",
		name: "William Howard",
		role: "Community Manager",
		status: "Vacation",
	},
];

const columns = [
	{
		key: "name",
		label: "NAME",
	},
	{
		key: "email",
		label: "EMAIL",
	},
	{
		key: "role",
		label: "ROLE",
	},
	{
		key: "status",
		label: "STATUS",
	},
	{
		key: "action",
		label: "ACTION",
	},
];

export default function App() {
	const renderCell = React.useCallback((product, columnKey) => {
		const productPrice = product?.product_price.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
		const encodedProductName = encodeURIComponent(product?.product_name);

		switch (columnKey) {
			case "product_info":
				return (
					<div className="flex items-center gap-4 w-[240px] md:w-full">
						<div className="product-image aspect-square w-12 h-12 md:w-20 md:h-20 rounded-lg object-contain">
							<Image
								src={`${
									process.env.REACT_APP_IMAGE_API
								}${product?.product_images[0]?.image.substring(
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
						<Link to={`/admin/edit-product/${encodedProductName}`}>
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
						<Tooltip color="danger" content="Remove product">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-danger cursor-pointer active:opacity-50"
								// onClick={() => {
								// 	onDelete(product?.id);
								// }}
							>
								<IoTrashOutline size={24} />
							</Button>
						</Tooltip>
					</div>
				);
			default:
		}
	}, []);
	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.key}>{column.label}</TableColumn>
				)}
			</TableHeader>
			<TableBody items={rows}>
				{(item) => (
					<TableRow key={item.key}>
						{(columnKey) => (
							<TableCell>
								{getKeyValue(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
