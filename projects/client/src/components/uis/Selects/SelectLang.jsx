import React, { useState } from "react";
import i18next from "i18next";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import { FiGlobe } from "react-icons/fi";

const SelectLang = () => {
	const [selectedLang, setSelectedLang] = useState(
		localStorage.getItem("lang")
			? new Set([localStorage.getItem("lang")])
			: new Set(["en"])
	);

	const langs = [
		{
			value: "en",
			label: "English",
			country_code: "us",
		},
		{
			value: "id",
			label: "Indonesia",
			country_code: "id",
		},
	];

	const handleLangToggle = (e) => {
		const lang = Object.entries(e)[0][1];

		setSelectedLang(e);
		i18next.changeLanguage(lang);
		localStorage.setItem("lang", lang);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="flat" isIconOnly>
					<FiGlobe size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection example"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedLang}
				onSelectionChange={handleLangToggle}
			>
				{langs.map((lang) => {
					return (
						<DropdownItem key={lang.value} value={lang.value}>
							<span
								className={`fi fi-${lang.country_code} mr-2`}
							></span>
							{lang.label}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

export default SelectLang;
