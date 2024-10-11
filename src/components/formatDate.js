import React from "react";
import { useTranslation } from "react-i18next";

const formatDate = (isoDate, t) => {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const translatedWeekday = t(`weekdays.${weekday}`);

  return `${day}/${month}/${year} at ${hours}:${minutes} ${translatedWeekday}`;
};

const FormattedDate = ({ isoDate }) => {
  const { t } = useTranslation();

  return <div>{formatDate(isoDate, t)}</div>;
};

export default FormattedDate;
