import React, { useContext, useState, useEffect } from "react";
import { TranslationContext } from "../context/TranslationContext";
import { ShipmentTrackingContext } from "../context/ShipmentTrackingContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const ShipmentDetails = () => {
  const { t, currentLanguage } = useContext(TranslationContext);
  const { trackingData } = useContext(ShipmentTrackingContext);

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

  const currentStatusColor = getColorByStatus(
    trackingData?.CurrentStatus.state
  );

  const direction = currentLanguage === "ar" ? "rtl" : "ltr";

  const rows =
    trackingData?.TransitEvents?.map((event) => {
      const date = new Date(event.timestamp).toLocaleDateString(
        currentLanguage === "ar" ? "ar-EG" : "en-US"
      );
      const time = new Date(event.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        hub: t(event.hub) || "N/A",
        date: date,
        time: time,
        details: t(event.state),
        reason: t(event.reason) || null,
      };
    }) || [];

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(0);
  }, [currentLanguage]);

  return (
    <div style={{ direction }}>
      <h4
        style={{
          margin: "0px",
          marginBottom: "10px",
        }}
      >
        {t("shipmentDetails")}
      </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {[
                  { id: "hub", label: t("hub"), minWidth: 170 },
                  { id: "date", label: t("date"), minWidth: 170 },
                  { id: "time", label: t("time"), minWidth: 170 },
                  { id: "details", label: t("details"), minWidth: 170 },
                ].map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#fafafa",
                      color: "rgba(0,0,0,0.4)",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{row.hub}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">
                      {row.details}
                      {row.reason && (
                        <div
                          style={{
                            fontSize: "0.85em",
                            color: currentStatusColor,
                            fontWeight: "bold",
                          }}
                        >
                          {row.reason}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </div>
  );
};

export default ShipmentDetails;
