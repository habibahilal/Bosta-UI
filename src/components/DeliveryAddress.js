import React, { useContext } from "react";
import { TranslationContext } from "../context/TranslationContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled.div`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const DeliveryAddress = () => {
  const { t } = useContext(TranslationContext);

  return (
    <div>
      <h4
        style={{
          margin: "0px",
          marginBottom: "10px",
        }}
      >
        {t("Delivery_Address")}
      </h4>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Stack>
      </Box>
    </div>
  );
};

export default DeliveryAddress;
