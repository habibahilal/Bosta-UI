import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TranslationContext } from "../context/TranslationContext";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";

const Formdiv = styled.div`
  padding: 20px;
`;

const ShipmentTrackingInput = () => {
  const { t } = useContext(TranslationContext);

  const [data, setData] = React.useState({
    email: "",
    status: "initial",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: "loading" }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: "", status: "sent" });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: "failure" }));
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
            value={data.email}
            onChange={(event) =>
              setData({ email: event.target.value, status: "initial" })
            }
            error={data.status === "failure"}
            endDecorator={
              <Button
                variant="solid"
                loading={data.status === "loading"}
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
          {data.status === "failure" && (
            <FormHelperText
              sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
            >
              Oops! something went wrong, please try again later.
            </FormHelperText>
          )}
          {data.status === "sent" && (
            <FormHelperText
              sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
            >
              You are all set!
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Formdiv>
  );
};

export default ShipmentTrackingInput;
