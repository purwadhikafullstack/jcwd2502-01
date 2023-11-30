import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Tooltip,
	Button,
	Input,
	Pagination,
} from "@nextui-org/react";
import { RiUserSettingsLine } from "react-icons/ri";
import {
	fetchAdmin,
	onClearAdmin,
	onSearchAdmin,
	onSortAdmin,
	setCountAdmin,
	setPaginationAdmin,
	setSearchAdmin,
	setTotalPageAdmin,
} from "../../../redux/features/manageUser";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { IoTrashOutline, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import SelectSortByAdmin from "../../uis/Selects/SelectSortByAdmin";
import EditAdminManageUser from "../../layouts/user/EditAdminManageUser";
import CreateNewAdminModal from "../../layouts/user/CreateNewAdminModal";
import { axiosInstance } from "../../../lib/axios";
import toast, { Toaster } from "react-hot-toast";

const AdminRoleAdminListTable = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem("accessToken");
	const [touchModal, setTouchModal] = useState(false);
	const {
		countAdmin,
		totalPageAdmin,
		pageAdmin,
		admin,
		offsetAdmin,
		searchAdmin,
		orderDirectionAdmin,
		orderFieldAdmin,
	} = useSelector((state) => state.manageUsers);

	const formik = useFormik({
		initialValues: {
			searchQueryAdmin: "",
		},
		onSubmit: (values) => {
			dispatch(onSearchAdmin(values.searchQueryAdmin));
			navigate(`/admin/users`);
		},
	});

	useEffect(() => {
		// if (oneTime) {
		navigate(
			`/admin/users?${
				searchAdmin && `&search=${searchAdmin}`
			}&orderField=${orderFieldAdmin}&orderDirection=${orderDirectionAdmin}&offset=${offsetAdmin}`
		);

		dispatch(
			fetchAdmin(
				`?${
					searchAdmin && `&search=${searchAdmin}`
				}&orderField=${orderFieldAdmin}&orderDirection=${orderDirectionAdmin}&offset=${offsetAdmin}`
			)
		);
	}, [
		orderFieldAdmin,
		orderDirectionAdmin,
		searchAdmin,
		pageAdmin,
		touchModal,
	]);

	useEffect(() => {
		formik.setFieldValue("searchQueryAdmin", searchAdmin);
	}, [searchAdmin]);

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		formik.handleSubmit();
		window.scrollTo({ top: 0 });
	};

	const clear = async () => {
		await dispatch(onClearAdmin());
		navigate(`/admin/users`);
		// window.location.reload(false);
	};

	const handleDelete = async (id) => {
		try {
			console.log(id);
			const deleteAdmin = await axiosInstance(accessToken).delete(
				`/users/deleteAdminData/${id}`
			);
			if (!deleteAdmin.data.isError)
				toast.success(deleteAdmin.data.message);
			console.log(`/users/deleteAdminData/${id}`);
			console.log(deleteAdmin);
			dispatch(
				fetchAdmin(
					`?${
						searchAdmin && `&search=${searchAdmin}`
					}&orderField=${orderFieldAdmin}&orderDirection=${orderDirectionAdmin}&offset=${offsetAdmin}`
				)
			);
		} catch (error) {
			console.error();
		}
	};

	const handleRequestChangePassword = async (id) => {
		try {
			console.log(id);
			const sendRequest = await axiosInstance(accessToken).get(
				`users/reqChangePassByAdmin/${id}`
			);
			console.log(sendRequest);
			if (!sendRequest.data.isError)
				toast.success(sendRequest.data.message);
		} catch (error) {
			console.error(error);
		}
	};

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedSearch = queryParams.get("search");
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
		if (selectedSearch) {
			dispatch(onSearchAdmin(selectedSearch));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortAdmin(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPaginationAdmin(selectedPage, Number(selectedOffset)));
		}
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClearAdmin());
			dispatch(setSearchAdmin(""));
			// dispatch(setProductsForStocks([]));
			dispatch(setTotalPageAdmin(1));
			// dispatch(setWarehouse(null));
			dispatch(setCountAdmin(0));
		};
	}, []);

	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "EMAIL", uid: "email" },
		{ name: "ROLE", uid: "role" },
		{ name: "STATUS", uid: "status" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = React.useCallback((users, columnKey) => {
		// const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<User
						avatarProps={{
							radius: "full",
							src: users.profile_image,
						}}
						name={users.username}
					>
						{users.username}
					</User>
				);
			case "email":
				return <p className="font-medium">{users.email}</p>;
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{users.role}
						</p>
					</div>
				);
			case "status":
				return (
					<Chip className="capitalize" size="sm" variant="flat">
						{users.status}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<EditAdminManageUser
							data={users}
							handleRefresh={setTouchModal}
						/>
						<Tooltip color="success" content="Reset Password">
							<Button
								isIconOnly
								variant="flat"
								className="text-lg cursor-pointer active:opacity-50"
								onClick={() =>
									handleRequestChangePassword(users.id)
								}
							>
								<RiUserSettingsLine
									className="text-green-600"
									size={24}
								/>
							</Button>
						</Tooltip>
						<Tooltip color="danger" content="Remove Admin">
							<Button
								isIconOnly
								variant="flat"
								className="text-lg text-danger cursor-pointer active:opacity-50"
								onClick={() => handleDelete(users.id)}
							>
								<IoTrashOutline size={24} />
							</Button>
						</Tooltip>
					</div>
				);
			default:
		}
	}, []);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					size="md"
					showControls
					total={totalPageAdmin ? totalPageAdmin : 1}
					page={pageAdmin ? pageAdmin : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					onChange={(e) => {
						dispatch(setPaginationAdmin(e, (e - 1) * 12));
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
			</div>
		);
	}, [totalPageAdmin, pageAdmin]);

	return (
		<>
			<Toaster />
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<form className="w-[30%]" onSubmit={handleSubmitSearch}>
						<Input
							type="text"
							placeholder="Search for product by name"
							isClearable
							onClear={() => dispatch(setSearchAdmin(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQueryAdmin",
									e.target.value
								)
							}
							value={formik.values.searchQueryAdmin}
						/>
					</form>
					<div className="flex gap-3">
						<CreateNewAdminModal handleRefresh={setTouchModal} />
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700 w-full"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<div className="sort-by flex items-center">
							<SelectSortByAdmin placeholder="Sort" />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{admin?.length
							? ` ${1 + offsetAdmin}-${
									offsetAdmin + admin?.length
							  } `
							: ` 0 `}
						out of {countAdmin} transaction.
					</span>
				</div>
			</div>
			<Table
				aria-label="Example table with custom cells"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				topContentPlacement="outside"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={
								column.uid === "actions" ? "center" : "start"
							}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"data not found"} items={admin}>
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
			</Table>
		</>
	);
};

export default AdminRoleAdminListTable;
