import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ roles }) => {
	const { role } = useSelector((state) => state.user);

	if (!roles.includes(role)) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoutes;
