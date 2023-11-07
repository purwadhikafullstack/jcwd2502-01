import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [openEditWarehouseModal, setOpenEditWarehouseModal] = useState(false);
	const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
	const [openEditBrandModal, setOpenEditBrandModal] = useState(false);
	const [screenSize, setScreenSize] = useState(undefined);

	return (
		<StateContext.Provider
			value={{
				activeMenu,
				setActiveMenu,
				screenSize,
				setScreenSize,
				openEditWarehouseModal,
				setOpenEditWarehouseModal,
				openEditCategoryModal,
				setOpenEditCategoryModal,
				openEditBrandModal,
				setOpenEditBrandModal,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
