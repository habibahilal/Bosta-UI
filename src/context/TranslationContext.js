import React, { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr"; // Adjust text direction for RTL
    setCurrentLanguage(lng);
  };

  return (
    <TranslationContext.Provider value={{ t, currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
