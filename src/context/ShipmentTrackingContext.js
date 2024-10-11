import React, { createContext, useState } from "react";

export const ShipmentTrackingContext = createContext();

export const ShipmentTrackingProvider = ({ children }) => {
  const [trackingData, setTrackingData] = useState(null);

  const updateTrackingData = (data) => {
    setTrackingData(data);
  };

  return (
    <ShipmentTrackingContext.Provider
      value={{ trackingData, updateTrackingData }}
    >
      {children}
    </ShipmentTrackingContext.Provider>
  );
};
