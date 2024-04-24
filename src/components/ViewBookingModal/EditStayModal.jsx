import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";
import useUrlQueryParams from "../../hooks/useUrlQueryParams";
import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const { items, updateItem } = useLocalStorageArray("myBookings");
  const [bookingInView, setBookingInView] = React.useState({});
  const [initialDates, setInitialDates] = React.useState([]);
  const [unavailableDates, setUnavailableDates] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }

    let currentBooking = items.find((item) => item.id === params.bookingId);
    setBookingInView(currentBooking);
    setStartDate(currentBooking.checkIn);
    setEndDate(currentBooking.checkOut);
    setInitialDates([currentBooking.checkIn, currentBooking.checkOut]);

    //find all unavailable dates

    function datesBetween(startDate, endDate, excludeFirstAndLast = false) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = dayjs(currentDate).add(1, "day");
      }
      if (excludeFirstAndLast) {
        if (dateArray.length >= 2) {
          // Remove the first element
          dateArray.shift();
          // Remove the last element
          dateArray.pop();
        } else {
          // If the array has less than two elements, return an empty array
          return [];
        }
      }
      return dateArray;
    }
    let allOtherBookingsOnCurrentProperty = items.filter(
      (booking) =>
        booking.propertyId === currentBooking.propertyId &&
        booking.id !== currentBooking.id
    );

    let unavailableDates = [];
    allOtherBookingsOnCurrentProperty.forEach((booking) => {
      unavailableDates = [
        ...unavailableDates,
        ...datesBetween(dayjs(booking.checkIn), dayjs(booking.checkOut), true),
      ];
    });
    setUnavailableDates(unavailableDates);
  }, [items, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    updateItem(bookingInView);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Dates
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chose new dates
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers style={{ height: "200px" }}>
          <DateRangePicker
            initialDates={[startDate, endDate]}
            unavailableDates={unavailableDates}
            onDateRangeSelection={(range) => {
              setStartDate(range[0]);
              setEndDate(range[1]);
              setBookingInView({
                ...bookingInView,
                checkIn: range[0],
                checkOut: range[1],
              });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
