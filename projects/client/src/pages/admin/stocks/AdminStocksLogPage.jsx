import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import AdminStockLogTable from "../../../components/sections/admin/AdminStockLogTable";
import SelectWarehouses from "../../../components/uis/Selects/SelectWarehouses";
import MyMonthPickerHistory from "../../../components/uis/MyMonthPicker/myMonthPickerHistory";

const AdminStocksLogPage = () => {
	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex items-center">
					<h1 className="font-bold text-title-lg min-w-[160px] mr-4">
						Stock changes
					</h1>
					<div className="mr-4">
						<SelectWarehouses />
					</div>
					<div className="">
						<MyMonthPickerHistory className="min-w-[240px]" />
					</div>
				</div>
			</div>
			<div className="pb-12">
				<AdminStockLogTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminStocksLogPage;
