import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminPageMainContainer = ({ children, pageName }) => {
	const { activeMenu } = useStateContext();

	return (
		<main
			className={`${pageName} min-h-screen ${
				activeMenu ? "my-admin-container-active" : "my-admin-container"
			} duration-300`}
		>
			{children}
		</main>
	);
};

export default AdminPageMainContainer;
