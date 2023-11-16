import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { Button, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { months } from "../../../data/constant";
import AdminSalesReportListTable from "../../../components/sections/admin/AdminSalesReportListTable";

const AdminSalesReportPage = () => {
	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<h1 className="font-bold w-full text-title-lg mr-4">
							Sales Report
						</h1>
						<Select
							items={months}
							size="sm"
							variant="bordered"
							className="min-w-[240px]"
							radius="lg"
							placeholder="Select month"
						>
							{(month) => (
								<SelectItem
									key={month.value}
									value={month.value}
									// onClick={() => dispatch(setmonth(month.value))} <<< network calling di sini
								>
									{month.label}
								</SelectItem>
							)}
						</Select>
					</div>
				</div>
			</div>
			<div className="pb-12">
				<AdminSalesReportListTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminSalesReportPage;
