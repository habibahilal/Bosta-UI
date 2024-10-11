import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { ShipmentTrackingContext } from "../context/ShipmentTrackingContext";
import { TranslationContext } from "../context/TranslationContext";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Formdiv = styled.div`
  padding: 20px;
`;

const ShipmentTrackingInput = ({ onClosePopover }) => {
  const { t } = useContext(TranslationContext);
  const { updateTrackingData } = useContext(ShipmentTrackingContext); // Use the tracking context
  const [orderId, setOrderId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://tracking.bosta.co/shipments/track/${orderId}`
      );
      updateTrackingData(response.data);
      onClosePopover();
    } catch (error) {
      updateTrackingData(null);
      onClosePopover();
      console.error("Error fetching tracking data:", error);
    }
  };

  return (
    <Formdiv>
      <form onSubmit={handleSubmit} id="demo">
        <FormControl>
          <FormLabel>{t("trackShipment")}</FormLabel>
          <Input
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            placeholder={t("orderId")}
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            endDecorator={
              <Button
                variant="solid"
                type="submit"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: "#de000a",
                  "&:hover": {
                    backgroundColor: "#c50009",
                  },
                }}
              >
                <SearchIcon />
              </Button>
            }
          />
        </FormControl>
      </form>
    </Formdiv>
  );
};

export default ShipmentTrackingInput;
