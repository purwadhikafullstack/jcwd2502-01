import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySelection = ({ subtitle, image, categoryId }) => {
	const navigate = useNavigate();

	const onCategory = (category) => {
		navigate(`/explore?category=${category}`);
	};
	return (
		<>
			<button
				className="group category-selection flex flex-col items-center justify-center"
				onClick={() => onCategory(categoryId)}
			>
				<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-primary-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
					{image}
				</div>
				<p className="font-medium">{subtitle}</p>
			</button>
		</>
	);
};

export default CategorySelection;
