import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const ExploreProductsHeader = () => {
	return (
		<>
			<div class="header-position sticky top-[54px] md:top-[70px] z-10 bg-background w-full">
				<header class="wall-header flex items-center min-h-[52px] my-container">
					<div class="wall-header__content flex items-center p-0 w-full justify-between">
						<h1
							class="wall-header__title css-69xvwy m-0 pt-6 pb-4 px-0"
							id=""
						>
							<span class="title_prefix absolute top-[-6px]">
								Search results for
								<br />
							</span>
							<span className="font-medium text-title-lg">
								{`<VALUE>:STR`}
							</span>
						</h1>
						<nav class="wall-header__nav mt-2 hidden md:block">
							<div className="sort-by flex items-center">
								<div className="w-full mr-2 font-medium">
									Sort by:
								</div>
								<Select
									labelPlacement={"outside-left"}
									size="md"
									variant="bordered"
									className="min-w-[178px]"
									placeholder="Options"
								>
									<SelectItem key={"az"} value={"az"}>
										A-Z
									</SelectItem>
									<SelectItem key={"za"} value={"za"}>
										Z-A
									</SelectItem>
									<SelectItem key={"high"} value={"high"}>
										Highest price
									</SelectItem>
									<SelectItem key={"low"} value={"low"}>
										Lowest price
									</SelectItem>
								</Select>
							</div>
						</nav>
					</div>
				</header>
			</div>
		</>
	);
};

export default ExploreProductsHeader;
