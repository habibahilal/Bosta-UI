/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TranslationContext } from "../context/TranslationContext";
import Popover from "@mui/material/Popover";
import ShipmentTrackingInput from "./ShipmentTrackingInput";

const Banner = styled.div`
  background-color: #ffffff;
  color: #000;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  h2 {
    font-weight: 700;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 20%;
  height: 90px;
  background-image: url(${(props) => props.logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MiddleSection = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
`;

const LastSection = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
`;

const SwitchLanguageButoon = styled.button`
  background-color: transparent;
  color: #f40205;
  border: none;
  padding: 10px;
  font-weight: 700;
  font-size: large;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  padding: 0 !important;
`;

const Header = () => {
  const { t, changeLanguage, currentLanguage } = useContext(TranslationContext);
  const logoUrl = t("logo");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Banner>
        <Logo logoUrl={logoUrl} />
        <MiddleSection>
          <Button>
            <h2>{t("home")}</h2>
          </Button>
          <Button>
            <h2>{t("pricing")}</h2>
          </Button>
          <Button>
            <h2>{t("contactSales")}</h2>{" "}
          </Button>
        </MiddleSection>
        <LastSection>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <h2>{t("trackShipment")}</h2>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <ShipmentTrackingInput />
          </Popover>
          <Button>
            <h2>{t("login")}</h2>
          </Button>
          <SwitchLanguageButoon
            onClick={() =>
              changeLanguage(currentLanguage === "en" ? "ar" : "en")
            }
          >
            {currentLanguage === "en" ? "AR" : "ENG"}
          </SwitchLanguageButoon>
        </LastSection>
      </Banner>
    </>
  );
};

export default Header;