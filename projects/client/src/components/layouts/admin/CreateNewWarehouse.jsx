import React, { useEffect, useState } from "react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";

import Media from "react-media";
import { axiosInstance } from "../../../lib/axios";

const CreateNewWarehouse = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [name, setName] = useState("");
	const [province, setProvince] = useState(0);
	const [city, setCity] = useState(0);
	const [address, setAddress] = useState("");
	const [data, setData] = useState({});

	const onCreate = async (data) => {
		try {
			const { name, province, city, address } = data;
			if (!name || !province || !city || !address) {
				alert("Please fill out all the form");
				return;
			}
			// const accessToken = localStorage.getItem("accessToken");
			await axiosInstance().post(`warehouses`, data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (name && province && city && address) {
			setData({ name, province, city, address });
		}
	}, [name, province, city, address]);
	return (
		<>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<>
						<Button color="secondary" size="md" onPress={onOpen}>
							<p className="font-medium text-white flex items-center gap-1">
								<span className="text-[24px]">+</span>
								<span>Add New Warehouse</span>
							</p>
						</Button>
						<Modal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							placement={matches.medium ? "center" : "bottom"}
							scrollBehavior="inside"
							size={matches.medium ? "2xl" : "full"}
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex justify-center">
											<h2 className="text-xl font-bold mb-2">
												Add New Warehouse
											</h2>
										</ModalHeader>
										<ModalBody>
											<form className="flex flex-col justify-between gap-4 h-full">
												<div className="form-control">
													<Input
														type="text"
														name="warehouse_name"
														label="Warehouse's Name"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="Warehouse One"
														defaultValue={
															"Warehouse 1"
														}
														isRequired
													/>
												</div>
												<div className="form-control">
													<Select
														name="province"
														label="Province"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															console.log(
																e.target.value
															)
														}
														placeholder="Select a province"
														isRequired
													>
														<SelectItem
															key={[
																`province.id`,
																`province.province`,
															]}
														>
															{`province.province`}
														</SelectItem>
														<SelectItem
															key={[1, "Bali"]}
														>
															Bali
														</SelectItem>
														<SelectItem
															key={[
																2,
																"Bangka Belitung",
															]}
														>
															Bangka Belitung
														</SelectItem>
														<SelectItem
															key={[3, "Banten"]}
														>
															Banten
														</SelectItem>
													</Select>
												</div>
												<div className="form-control">
													<Select
														name="city"
														label="City"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															console.log(
																e.target.value
															)
														}
														placeholder="Select a City"
														isRequired
													>
														<SelectItem
															key={[
																`city.id`,
																`city.type`,
																`city.city_name`,
															]}
														>
															{`city.type`}{" "}
															{`city.city_name`}
														</SelectItem>
														<SelectItem
															key={[
																455,
																`Kabupaten`,
																`Tangerang`,
															]}
														>
															{`Kabupaten`}{" "}
															{`Tangerang`}
														</SelectItem>
														<SelectItem
															key={[
																456,
																`Kota`,
																`Tangerang`,
															]}
														>
															{`Kota`}{" "}
															{`Tangerang`}
														</SelectItem>
													</Select>
												</div>
												<div className="form-control">
													<Input
														type="number"
														placeholder="16210"
														name="postal_code"
														label="Postal Code"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														isRequired
													/>
												</div>
												<div className="form-control">
													<Textarea
														placeholder="Jl. Street Address"
														name="full_address"
														label="Full Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														isRequired
													/>
												</div>
											</form>
										</ModalBody>
										<ModalFooter className="justify-center">
											<Button
												color="primary"
												className="text-center mb-4"
												onPress={onClose}
												fullWidth
												onClick={() => onCreate(data)}
											>
												<span className="font-bold text-black">
													Save new warehouse
												</span>
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</>
				)}
			</Media>
		</>
	);
};

export default CreateNewWarehouse;
