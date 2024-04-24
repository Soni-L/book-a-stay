import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Button, Menu } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function HighlightedDays(props) {
  const {
    highlightedDays = [],
    unavailableDates = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;
  const isSelected =
    highlightedDays.length > 0
      ? highlightedDays.filter(
          (currentDate) => currentDate.diff(day, "day") === 0
        ).length > 0
      : false;

  const isUnavailable =
    unavailableDates.length > 0
      ? unavailableDates.filter(
          (currentDate) => dayjs(currentDate).diff(day, "day") === 0
        ).length > 0
      : false;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={isSelected}
      day={day}
      disabled={isUnavailable || dayjs(day).isBefore(dayjs(), "day")}
    />
  );
}

export default function DateRangePicker({
  initialDates = [],
  unavailableDates = [],
  onDateRangeSelection,
  expanded = false,
}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  useEffect(() => {
    if (initialDates.length === 2) {
      setStartDate(dayjs(initialDates[0]));
      setEndDate(dayjs(initialDates[1]));
    }
  }, []);

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
      setHighlightedDays([]);
    } else if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
      setHighlightedDays([]);
    } else if (startDate.diff(date) >= 0) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ width: expanded ? "100%" : "300px" }}>
      {expanded && (
        <>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            style={{
              height: "40px",
              textTransform: "none",
              width: "100%",
              borderRadius: "8px",
            }}
            onClick={handleClick}
          >
            {startDate ? startDate.format("DD MMM YYYY") : `Check in`} -{" "}
            {endDate ? endDate.format("DD MMM YYYY") : "Check out"}
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              disablePast={true}
              onChange={(newValue) => handleDateRangeSelection(newValue)}
              slots={{
                day: HighlightedDays,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                  unavailableDates,
                },
              }}
            />
          </LocalizationProvider>
        </>
      )}

      {!expanded && (
        <>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            style={{
              height: "40px",
              textTransform: "none",
              width: "100%",
              borderRadius: "8px",
            }}
            onClick={handleClick}
          >
            {startDate ? startDate.format("DD MMM YYYY") : `Check in`} -{" "}
            {endDate ? endDate.format("DD MMM YYYY") : "Check out"}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disablePast={true}
                onChange={(newValue) => handleDateRangeSelection(newValue)}
                slots={{
                  day: HighlightedDays,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                    unavailableDates,
                  },
                }}
              />
            </LocalizationProvider>
          </Menu>
        </>
      )}
    </div>
  );
}
