import React from "react";
import { useTranslation } from "react-i18next";

const formatDate = (isoDate, language) => {
  const date = new Date(isoDate);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-GB",
    options
  );
};

const LocalizedDate = ({ isoDate }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return <div>{formatDate(isoDate, language)}</div>;
};

export default LocalizedDate;
