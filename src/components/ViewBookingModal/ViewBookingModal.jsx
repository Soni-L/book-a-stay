import * as React from "react";
import "./ViewBookingModal.css";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";
import useUrlQueryParams from "../../hooks/useUrlQueryParams";
// import DateRangePicker from "../DateRangePicker/DateRangePicker";
// import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ViewBookingModal({ open, onClose }) {
  const { items, deleteItem } = useLocalStorageArray("myBookings");
  const { clearQueryParam } = useUrlQueryParams();
  const [bookingInView, setBookingInView] = React.useState({});

  React.useEffect(() => {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    setBookingInView(items.find((item) => item.id === params.bookingId));
  }, [open]);

  const handleClose = () => {
    clearQueryParam("bookingId");
    onClose();
  };

  const handleDelete = (bookingId) => {
    deleteItem(bookingId);
    clearQueryParam("bookingId");
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Booking details
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
          {bookingInView && (
            <div
              style={{
                maxWidth: "500px",
                margin: "auto",
                padding: '8px',
              }}
            >
              <img
                src={bookingInView.imageUrl}
                alt={bookingInView.name}
                className="rental-image"
              />
              <div className="rental-details">
                <h3 className="rental-name">{bookingInView.name}</h3>
                <p className="rental-location">
                  <em>Location: </em>
                  {bookingInView.location}
                </p>
                <p className="rental-type">
                  <em>Rental type: </em>
                  {bookingInView.type}
                </p>
                <p>
                  <em style={{ fontWeight: "bold" }}>Check in:</em>{" "}
                  {bookingInView.checkIn}
                  {" - "}
                  <em style={{ fontWeight: "bold" }}>Check out:</em>{" "}
                  {bookingInView.checkOut}
                </p>
              </div>

              <Button
                variant="contained"
                color="error"
                style={{ width: "100%" }}
                onClick={() => handleDelete(bookingInView.id)}
              >
                Delete this booking
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
}
