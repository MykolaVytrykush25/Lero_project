import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//styles
import dropdownStyles from "../DropdownList/DropdownList.module.scss";

//components
import DropdownList from "../DropdownList";

//data
import { useData } from "@/data";

const LanguageSelector: React.FC = () => {
	const { langs } = useData();
	const { i18n } = useTranslation();

	const [language, setLanguage] = useState<string>(i18n.language || "en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage && langs.includes(savedLanguage)) {
			setLanguage(savedLanguage);
			i18n.changeLanguage(savedLanguage);
		}
	}, [i18n]);

	const handleChangeLanguage = (lng?: string) => {
		if (lng && langs.includes(lng)) {
			setLanguage(lng);
			i18n.changeLanguage(lng);
			localStorage.setItem("language", lng);
		}
	};

	return (
		<DropdownList value={language.toUpperCase()}>
			{(closeDropdown) =>
				langs.map((i, idx) => (
					<li
						className={i === language ? dropdownStyles.active : ""}
						key={idx}
						onClick={() => {
							handleChangeLanguage(i);
							closeDropdown();
						}}
					>
						{i.toUpperCase()}
					</li>
				))
			}
		</DropdownList>
	);
};

export default LanguageSelector;
