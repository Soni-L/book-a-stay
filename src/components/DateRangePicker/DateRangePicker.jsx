import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    highlightedDays.length > 0
      ? highlightedDays.filter(
          (currentDate) => currentDate.diff(day, "day") === 0
        ).length > 0
      : false;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={isSelected}
      day={day}
    />
  );
}

export default function DateRangePicker({ onDateRangeSelection }) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  useEffect(() => {
    function datesBetween(startDate, endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = dayjs(currentDate).add(1, "day");
      }
      return dateArray;
    }

    if (startDate && endDate) {
      setHighlightedDays(datesBetween(startDate, endDate));
      onDateRangeSelection([startDate, endDate]);
    }
  }, [startDate, endDate]);

  const handleDateRangeSelection = (date) => {
    if (!startDate && !endDate) {
      setStartDate(date);
    } else if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate.diff(date) >= 0) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <Button
        variant="contained"
        style={{ height: "40px", textTransform: "none", width: "100%" }}
      >
        {startDate ? startDate.format("DD MMM YYYY") : `Check in`} -{" "}
        {endDate ? endDate.format("DD MMM YYYY") : "Check out"}
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast={true}
          sx={{
            boxShadow: "2px 2px 2px",
            marginTop: "4px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
          onChange={(newValue) => handleDateRangeSelection(newValue)}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
