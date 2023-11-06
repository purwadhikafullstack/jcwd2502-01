import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Button,
	Input,
} from "@nextui-org/react";
import { IoTrashOutline, IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { useStateContext } from "../../../contexts/ContextProvider";
import { axiosInstance } from "../../../lib/axios";
import AdminEditBrandModal from "../../../components/layouts/admin/AdminEditBrandModal";
import AdminCreateNewBrandModal from "../../../components/layouts/admin/AdminCreateNewBrandModal";

const AdminBrandsPage = () => {
	const { openEditBrandModal, setOpenEditBrandModal } = useStateContext();
	const [selectedBrandId, setSelectedBrandId] = useState(null);
	const [selectedBrandName, setSelectedBrandName] = useState(null);
	// const [brands, setBrands] = useState([]);

	const onOpenEditBrandModal = (brand_id, brand_name) => {
		setOpenEditBrandModal(!openEditBrandModal);
		setSelectedBrandId(brand_id);
		setSelectedBrandName(brand_name);
	};

	// const fetchBrands = async () => {
	// 	try {
	// 		// const accessToken = localStorage.getItem("accessToken");
	// 		const { data } = await axiosInstance().get(`brands/all`);

	// 		setBrands(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const onDelete = async (brandId) => {
		try {
			// const accessToken = localStorage.getItem("accessToken");

			//confirm

			await axiosInstance().delete(`brands/${brandId}`);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	fetchBrands();
	// }, []);

	useEffect(() => {
		if (openEditBrandModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [openEditBrandModal]);

	const brands = [
		{ brand_name: "Razer", id: 1 },
		{ brand_name: "Logitech", id: 2 },
		{ brand_name: "Fantech", id: 3 },
	];

	const columns = [
		{ name: "BRAND NAME", uid: "brand_name" },
		{ name: "TOTAL PRODUCTS", uid: "total_products" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((brand, columnKey) => {
		switch (columnKey) {
			case "brand_name":
				return <p>{brand.brand_name}</p>;
			case "total_products":
				// return <p>{brand.products[0]?.total_products || "-"}</p>;
				return <p>-</p>;
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Edit warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
								onPress={() => {
									onOpenEditBrandModal(
										brand.id,
										brand.brand_name
									);
								}}
							>
								<BiEdit size={24} />
							</Button>
						</Tooltip>
						<Tooltip color="danger" content="Remove warehouse">
							<Button
								isIconOnly
								variant="light"
								className="text-lg text-danger cursor-pointer active:opacity-50"
								onClick={() => {
									onDelete(brand.id);
								}}
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
		<>
			<AdminPageMainContainer>
				<div className="admin-page-header flex justify-between gap-4 mb-6">
					<h1 className="font-bold text-title-lg">Brands</h1>
					<AdminCreateNewBrandModal />
				</div>
				<Table aria-label="Example table with custom cells">
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								key={column.uid}
								align={
									column.uid === "actions" ? "end" : "start"
								}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={brands}>
						{(item) => (
							<TableRow key={item.id}>
								{(columnKey) => (
									<TableCell>
										{renderCell(item, columnKey)}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>{" "}
			</AdminPageMainContainer>

			{openEditBrandModal ? (
				<AdminEditBrandModal
					handleOpenEditBrandModal={onOpenEditBrandModal}
					brandId={selectedBrandId}
					brandType={selectedBrandName}
				/>
			) : null}
		</>
	);
};

export default AdminBrandsPage;
