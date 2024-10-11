import React, { useContext } from "react";
import { TranslationContext } from "../context/TranslationContext";
import { ShipmentTrackingContext } from "../context/ShipmentTrackingContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const Item = styled.div`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.bgWhite ? "#fff" : "#f9f9f9")};
  border-radius: 5px;

  p {
    width: 40%;
  }
`;

const CustomerServiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  padding: 30px;
  padding-top: 10px;
  margin: auto;
  width: 90%;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  h3 {
    margin: 0;
  }

  button {
    background-color: #f40205;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 70%;
    margin-top: 5px;
  }
`;

const DeliveryAddress = () => {
  const { t } = useContext(TranslationContext);
  const { trackingData } = useContext(ShipmentTrackingContext);

  if (!trackingData) {
    return null;
  }

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
          <Item>
            <p>{t("Address")}</p>
          </Item>
          <Item bgWhite>
            <CustomerServiceGrid>
              <div>
                <img
                  src="https://miro.medium.com/v2/resize:fit:1400/1*u6sHZc6oUiNkK-KEm_4CNg.png"
                  alt="Customer Problems"
                />
              </div>
              <div>
                <h3>{t("Is_there_a_problem_with_your_shipment")}</h3>
                <button>{t("Report_Problem")}</button>
              </div>
            </CustomerServiceGrid>
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default DeliveryAddress;
