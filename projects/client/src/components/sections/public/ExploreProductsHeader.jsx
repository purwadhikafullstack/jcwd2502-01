import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onClear } from "../../../redux/features/products";
import { useNavigate } from "react-router-dom";
import SelectSortBy from "../../uis/Selects/SelectSortBy";

const ExploreProductsHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const search = useSelector((state) => state.products.search);

	const clear = async () => {
		await dispatch(onClear());
		navigate(`/explore${search && `?search=${search}`}`);
		window.location.reload(false);
	};

	return (
		<div
			className={`header-position ${
				search ? "sticky top-[54px] md:top-[70px]" : "fixed"
			}  z-20 bg-background w-full`}
		>
			<header className="wall-header flex items-center min-h-[52px] my-container">
				<div className="wall-header__content flex items-center p-0 w-full justify-between">
					<h1
						className={`wall-header__title css-69xvwy m-0 ${
							search ? "pt-6" : "pt-4"
						}  pb-4 px-0`}
					>
						{search && (
							<>
								<span className="title_prefix absolute top-[-6px]">
									Search results for
									<br />
								</span>
							</>
						)}
						<span className="font-bold text-title-lg">
							{search || "Explore"}
						</span>
					</h1>
					<nav className="wall-header__nav mt-2 hidden md:flex md:gap-4 md:py-4">
						<div className="sort-by flex items-center">
							<div className="w-full mr-2 font-medium">
								Sort by:
							</div>
							<SelectSortBy />
						</div>
						<Button
							variant="bordered"
							className="border-neutral-200 dark:border-neutral-700"
							onClick={() => clear()}
						>{`Clear Filter(s)`}</Button>
					</nav>
				</div>
			</header>
		</div>
	);
};

export default ExploreProductsHeader;
