import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Importing translation files

import translationEN from "./assets/locales/en/translation.json";
import translationID from "./assets/locales/id/translation.json";

//Creating object with the variables of imported translation files
const resources = {
	en: {
		translation: translationEN,
	},
	id: {
		translation: translationID,
	},
};

//i18N Initialization

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		resources,
		lng: localStorage.getItem("lang") || "en", //default language
		keySeparator: false,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
			caches: ["cookie"],
		},
		backend: {
			loadPath: "./assets/locales/{{lng}}/translation.json",
		},
	});

export default i18n;
