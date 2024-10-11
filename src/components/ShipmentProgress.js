import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { TranslationContext } from "../context/TranslationContext";
import { ShipmentTrackingContext } from "../context/ShipmentTrackingContext";
import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Typography from "@mui/joy/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CheckIcon from "@mui/icons-material/Check"; // Import Check icon
import Alert from "@mui/material/Alert";
import FormattedDate from "./formatDate";
import LocalizedDate from "./LocalizedDate";

const ShipmentStatus = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    text-align: center;
    height: fit-content;
  }

  h3 {
    margin: 0 !important;
  }

  span {
    color: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;

const ShipmentProgressLine = styled.div`
  padding: 20px 0px;
`;

const getColorByStatus = (status) => {
  switch (status) {
    case "DELIVERED":
      return "#36b700";
    case "DELIVERED_TO_SENDER":
      return "#f9b904";
    case "CANCELLED":
      return "#de000a";
    default:
      return "#f9b904";
  }
};

const ShipmentProgress = () => {
  const { t } = useContext(TranslationContext);
  const { trackingData } = useContext(ShipmentTrackingContext);

  if (!trackingData) {
    return (
      <Alert sx={{ margin: "20px", padding: "20px" }} severity="error">
        No such order ID.
      </Alert>
    );
  }

  const currentStatusColor = getColorByStatus(
    trackingData?.CurrentStatus.state
  );

  // Define steps and their corresponding states
  const steps = [
    { label: t("ticketCreated"), state: "TICKET_CREATED", icon: InventoryIcon },
    {
      label: t("packageReceived"),
      state: "PACKAGE_RECEIVED",
      icon: HandshakeIcon,
    },
    {
      label: t("OUT_FOR_DELIVERY"),
      state: "OUT_FOR_DELIVERY",
      icon: LocalShippingIcon,
    },
    { label: t("DELIVERED"), state: "DELIVERED", icon: CardMembershipIcon },
  ];

  const isRTL = t("currentLanguage") === "ar"; // Check if the current language is Arabic

  return (
    <Box
      sx={{
        padding: "30px",
        width: "90%",
        margin: "auto",
        direction: isRTL ? "rtl" : "ltr", // Set direction based on language
      }}
    >
      <Box
        sx={{
          border: "solid 1px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Stack>
          <ShipmentStatus>
            <div>
              <span>{`${t("orderId")} ${trackingData?.TrackingNumber}`} </span>
              <h3 style={{ color: currentStatusColor }}>{`${t(
                trackingData?.CurrentStatus.state
              )}`}</h3>
            </div>
            <div>
              <span>{t("latestUpdate")}</span>
              <h3>
                <FormattedDate
                  isoDate={`${trackingData?.CurrentStatus.timestamp}`}
                />
              </h3>
            </div>
            <div>
              <span>{t("provider")}</span>
              <h3>{`${t(trackingData?.provider)}`}</h3>
            </div>
            <div>
              <span>{t("estimatedDelivery")}</span>
              <h3>
                <LocalizedDate isoDate={`${trackingData?.PromisedDate}`} />
              </h3>
            </div>
          </ShipmentStatus>
          <ShipmentProgressLine>
            <Stepper
              size="lg"
              sx={{
                width: "100%",
                "--StepIndicator-size": "3rem",
                "--Step-connectorInset": "0px",
                [`& .${stepIndicatorClasses.root}`]: {
                  borderWidth: 4,
                  borderColor: currentStatusColor,
                },
                [`& .${stepClasses.root}::after`]: {
                  height: 4,
                  bgcolor: currentStatusColor,
                },
                [`& .${stepClasses.completed}`]: {
                  [`& .${stepIndicatorClasses.root}`]: {
                    borderColor: currentStatusColor,
                    color: currentStatusColor,
                  },
                  "&::after": {
                    bgcolor: currentStatusColor,
                  },
                },
                flexDirection: isRTL ? "row-reverse" : "row", // Adjust flex direction based on language
              }}
            >
              {steps.map((step) => {
                const isCompleted = trackingData.TransitEvents.some(
                  (event) => event.state === step.state
                );
                const isActive =
                  trackingData.CurrentStatus.state === step.state;

                const StepIcon =
                  isActive || !isCompleted
                    ? trackingData.CurrentStatus.state === "DELIVERED"
                      ? CheckIcon
                      : step.icon
                    : CheckIcon;

                return (
                  <Step
                    key={step.state}
                    completed={isCompleted}
                    active={isActive}
                    disabled={!isCompleted}
                    orientation="vertical"
                    indicator={
                      <StepIndicator
                        variant={isCompleted ? "solid" : "outlined"}
                        sx={
                          isCompleted
                            ? { backgroundColor: currentStatusColor }
                            : {}
                        }
                      >
                        <StepIcon
                          sx={
                            isCompleted
                              ? { color: "#fff" }
                              : { color: currentStatusColor }
                          }
                        />
                      </StepIndicator>
                    }
                  >
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontSize: "0.9rem",
                        letterSpacing: "0.5px",
                        fontWeight: "bold",
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Step>
                );
              })}
            </Stepper>
          </ShipmentProgressLine>
        </Stack>
      </Box>
    </Box>
  );
};

export default ShipmentProgress;
