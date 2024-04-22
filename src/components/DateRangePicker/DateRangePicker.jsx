import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button } from "@mui/material";

export default function DateRangePicker() {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());
  return (
    <div style={{ maxWidth: "400px" }}>
      <Button
        variant="contained"
        style={{ height: "40px", textTransform: "none", width: "100%" }}
      >
        Check in - Check out
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            boxShadow: "2px 2px 2px",
            marginTop: "4px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
