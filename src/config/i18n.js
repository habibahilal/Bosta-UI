import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import global_en from "../translations/en/global.json";
import global_ar from "../translations/ar/global.json";

i18n
  .use(LanguageDetector) // Detects user language (optional)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: global_en,
      },
      ar: {
        translation: global_ar,
      },
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
