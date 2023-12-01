import React, { useEffect } from "react";
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
	getKeyValue,
	Button,
	Input,
	Pagination,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchUser,
	onClearUser,
	onSearchUser,
	onSortUser,
	setCountUser,
	setPaginationUser,
	setSearchUser,
	setTotalPageUser,
} from "../../../redux/features/manageUser";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import SelectSortByUser from "../../uis/Selects/SelectSortByUser";
import DefaultAvatar from "../../../assets/avatars/default_avatar.png";

const AdminRoleUserListTable = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useSelector((state) => state.manageUsers.user);
	const {
		countUser,
		totalPageUser,
		pageUser,
		offsetUser,
		searchUser,
		orderDirectionUser,
		orderFieldUser,
	} = useSelector((state) => state.manageUsers);

	const formik = useFormik({
		initialValues: {
			searchQueryUser: "",
		},
		onSubmit: (values) => {
			dispatch(onSearchUser(values.searchQueryUser));
			navigate(`/admin/users`);
		},
	});

	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedSearch = queryParams.get("search");
		const selectedOrderField = queryParams.get("orderField");
		const selectedOrderDirection = queryParams.get("orderDirection");
		const selectedOffset = queryParams.get("offset");
		if (selectedSearch) {
			dispatch(onSearchUser(selectedSearch));
		}
		if (selectedOrderDirection && selectedOrderField) {
			dispatch(onSortUser(selectedOrderField, selectedOrderDirection));
		}
		if (selectedOffset) {
			const selectedPage = Number(selectedOffset) / 12 + 1;
			dispatch(setPaginationUser(selectedPage, Number(selectedOffset)));
		}
	};

	useEffect(() => {
		takeFromQuery();

		window.scrollTo({ top: 0 });

		return () => {
			dispatch(onClearUser());
			dispatch(setSearchUser(""));
			dispatch(setTotalPageUser(1));
			dispatch(setCountUser(0));
		};
	}, []);

	useEffect(() => {
		// if (oneTime) {
		navigate(
			`/admin/users?${
				searchUser && `&search=${searchUser}`
			}&orderField=${orderFieldUser}&orderDirection=${orderDirectionUser}&offset=${offsetUser}`
		);
		console.log(location.pathname);
		dispatch(
			fetchUser(
				`?
				${searchUser && `&search=${searchUser}`}
				&orderField=${orderFieldUser}&orderDirection=${orderDirectionUser}&offset=${offsetUser}`
			)
		);
	}, [orderFieldUser, orderDirectionUser, searchUser, pageUser]);

	useEffect(() => {
		// dispatch(fetchUser());
		console.log("ini user list >>>", user);
	}, []);

	const columns = [
		{ name: "NAME", uid: "name" },
		{ name: "EMAIL", uid: "email" },
		{ name: "STATUS", uid: "status" },
		// { name: "ACTIONS", uid: "actions" },
	];

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		formik.handleSubmit();
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		formik.setFieldValue("searchQueryUser", searchUser);
	}, [searchUser]);

	const clear = async () => {
		await dispatch(onClearUser());
		navigate(`/admin/users`);
	};

	console.log(user);
	const renderCell = React.useCallback((users, columnKey) => {
		const profilePicture = `${
			process.env.REACT_APP_IMAGE_API
		}${users?.profile_picture?.substring(7)}`;

		switch (columnKey) {
			case "name":
				return (
					<User
						avatarProps={{
							radius: "full",
							src: users?.profile_picture
								? profilePicture
								: DefaultAvatar,
						}}
						name={users?.username}
					>
						{users?.username}
					</User>
				);
			case "email":
				return <p className="font-medium">{users?.email}</p>;
			case "status":
				return (
					<Chip className="capitalize" size="sm" variant="flat">
						{users?.status}
					</Chip>
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
					total={totalPageUser ? totalPageUser : 1}
					page={pageUser ? pageUser : 0}
					color="secondary"
					variant="flat"
					className="z-0"
					onChange={(e) => {
						dispatch(setPaginationUser(e, (e - 1) * 12));
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
			</div>
		);
	}, [totalPageUser, pageUser]);

	// useEffect(() => {
	// 	dispatch(fetchUser());
	// }, []);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-center">
					<form className="w-[30%]" onSubmit={handleSubmitSearch}>
						<Input
							type="text"
							placeholder="Search for product by name"
							isClearable
							onClear={() => dispatch(setSearchUser(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQueryUser",
									e.target.value
								)
							}
							value={formik.values.searchQueryUser}
						/>
					</form>
					<div className="flex gap-3">
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700 w-full"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
						<div className="sort-by flex items-center">
							<SelectSortByUser placeholder="Sort" />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Showing
						{user?.length
							? ` ${1 + offsetUser}-${offsetUser + user?.length} `
							: ` 0 `}
						out of {countUser} transaction.
					</span>
				</div>
			</div>
			{user && user.length > 0 ? (
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
									column.uid === "actions"
										? "center"
										: "start"
								}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody emptyContent={"data not found"} items={user}>
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
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default AdminRoleUserListTable;
