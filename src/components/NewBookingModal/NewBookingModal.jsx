import * as React from "react";
import "./NewBookingModal.css";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const vacationRentals = [
  {
    id: "1",
    name: "Cozy Cottage by the Lake",
    location: "Lake Tahoe, California",
    type: "Cottage",
    imageUrl:
      "https://via.placeholder.com/500x300/87CEEB/FFFFFF?text=Cozy+Cottage",
  },
  {
    id: "2",
    name: "Luxurious Beachfront Villa",
    location: "Maui, Hawaii",
    type: "Villa",
    imageUrl:
      "https://via.placeholder.com/500x300/F08080/FFFFFF?text=Beachfront+Villa",
  },
  {
    id: "3",
    name: "Mountain Chalet Retreat",
    location: "Aspen, Colorado",
    type: "Chalet",
    imageUrl:
      "https://via.placeholder.com/500x300/7FFF00/FFFFFF?text=Mountain+Chalet",
  },
  {
    id: "4",
    name: "Urban Loft in the Heart of the City",
    location: "New York City, New York",
    type: "Loft",
    imageUrl:
      "https://via.placeholder.com/500x300/FFA500/FFFFFF?text=Urban+Loft",
  },
  {
    id: "5",
    name: "Seaside Bungalow Escape",
    location: "Cabo San Lucas, Mexico",
    type: "Bungalow",
    imageUrl:
      "https://via.placeholder.com/500x300/FFD700/FFFFFF?text=Seaside+Bungalow",
  },
  {
    id: "6",
    name: "Rustic Log Cabin in the Woods",
    location: "Yellowstone National Park, Wyoming",
    type: "Cabin",
    imageUrl:
      "https://via.placeholder.com/500x300/CD853F/FFFFFF?text=Rustic+Cabin",
  },
  {
    id: "7",
    name: "Tropical Treehouse Getaway",
    location: "Ubud, Bali",
    type: "Treehouse",
    imageUrl:
      "https://via.placeholder.com/500x300/32CD32/FFFFFF?text=Tropical+Treehouse",
  },
  {
    id: "8",
    name: "Ski-in/Ski-out Condo",
    location: "Whistler, British Columbia",
    type: "Condo",
    imageUrl:
      "https://via.placeholder.com/500x300/4682B4/FFFFFF?text=Ski-in%2FSki-out+Condo",
  },
  {
    id: "9",
    name: "Historic Mansion in the Countryside",
    location: "Cotswolds, England",
    type: "Mansion",
    imageUrl:
      "https://via.placeholder.com/500x300/9370DB/FFFFFF?text=Historic+Mansion",
  },
  {
    id: "10",
    name: "Desert Oasis Retreat",
    location: "Sedona, Arizona",
    type: "House",
    imageUrl:
      "https://via.placeholder.com/500x300/F4A460/FFFFFF?text=Desert+Oasis+Retreat",
  },
];

const SEARCH_STATE = {
  CLEAR: "CLEAR",
  DONE: "DONE",
  LOADING: "LOADING",
  NO_DATA: "NO_DATA",
};

function overlapConditions(
  attemptedCheckIn,
  attemptedCheckout,
  currentBookingCheckIn,
  currentBookingCheckOut
) {
  let caseOne =
    attemptedCheckIn.diff(dayjs(currentBookingCheckIn, "DD/MM/YYYY"), "days") < 0 
    && attemptedCheckout.diff(dayjs(currentBookingCheckIn, "DD/MM/YYYY"),"days") > 0
    && attemptedCheckout.diff(dayjs(currentBookingCheckOut, "DD/MM/YYYY"),"days") < 0;

  let caseTwo =
    attemptedCheckIn.diff(dayjs(currentBookingCheckOut, "DD/MM/YYYY"), "days") <
      0 &&
    attemptedCheckout.diff(
      dayjs(currentBookingCheckOut, "DD/MM/YYYY"),
      "days"
    ) >= 0;

  let caseThree =
    attemptedCheckIn.diff(dayjs(currentBookingCheckIn, "DD/MM/YYYY"), "days") >=
      0 &&
    attemptedCheckout.diff(
      dayjs(currentBookingCheckOut, "DD/MM/YYYY"),
      "days"
    ) <= 0;

  let caseFour =
    attemptedCheckIn.diff(dayjs(currentBookingCheckIn, "DD/MM/YYYY"), "days") <=
      0 &&
    attemptedCheckout.diff(
      dayjs(currentBookingCheckOut, "DD/MM/YYYY"),
      "days"
    ) >= 0;

  return caseOne || caseTwo || caseThree || caseFour;
}

function propertyHasDateOverlap(
  propertyId,
  bookings,
  attemptedCheckIn,
  attemptedCheckout
) {
  let currentPropBookings = bookings.filter(
    (booking) => propertyId == booking.propertyId
  );

  let overlap = false;

  currentPropBookings.forEach((currentProp) => {
    if (
      overlapConditions(
        attemptedCheckIn,
        attemptedCheckout,
        currentProp.checkIn,
        currentProp.checkOut
      ) === true
    ) {
      overlap = true;
    }
  });

  if (overlap) {
    return true;
  } else {
    return false;
  }
}

export default function NewBookingModal({ open, onClose }) {
  const { items, addItem } = useLocalStorageArray("myBookings");
  const [activeStep, setActiveStep] = React.useState(0);
  const [searchState, setSearchState] = React.useState(SEARCH_STATE.CLEAR);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [dateRange, setDateRange] = React.useState([]);
  const [availableProperties, setAvailableProperties] = React.useState([]);

  const propertyWithoutDateOverlap = (
    bookings,
    properties,
    checkIn,
    checkOut
  ) => {
    let filteredProperties = properties.filter(
      (property) =>
        propertyHasDateOverlap(property.id, bookings, checkIn, checkOut) ===
        false
    );
    return filteredProperties;
  };

  const onSearch = (dateRange) => {
    let results = propertyWithoutDateOverlap(
      items,
      vacationRentals,
      dateRange[0],
      dateRange[1]
    );
    setSearchState(SEARCH_STATE.DONE);
    setAvailableProperties(results);
  };

  const clearfields = () => {
    setSearchState(SEARCH_STATE.CLEAR);
    setActiveStep(0);
    setSelectedProperty(null);
    setDateRange([]);
  };

  const handleClose = () => {
    clearfields();
    onClose();
  };

  const handleCreateBooking = () => {
    addItem({
      ...selectedProperty,
      propertyId: selectedProperty.id,
      checkIn: dateRange[0].format("DD/MM/YYYY"),
      checkOut: dateRange[1].format("DD/MM/YYYY"),
    });
    handleClose();
  };

  const onPropertySelect = (property) => {
    setSelectedProperty(property);
    setActiveStep(1);
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
              New booking
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
          <Stepper
            activeStep={activeStep}
            sx={{
              padding: "8px",
              maxWidth: "500px",
              margin: "8px auto",
            }}
          >
            <Step>
              <StepLabel>Search for available properties</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete booking</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  wrap: "flex-wrap",
                  gap: "16px",
                  margin: "16px",
                }}
              >
                <DateRangePicker
                  onDateRangeSelection={(range) => setDateRange(range)}
                />
                <Button
                  variant="contained"
                  onClick={() => onSearch(dateRange)}
                  style={{ maxWidth: "200px", height: "40px" }}
                  disabled={
                    dateRange.length > 0 && dateRange[0] && dateRange[1]
                      ? false
                      : true
                  }
                >
                  Search
                </Button>
              </div>

              {searchState === SEARCH_STATE.DONE && (
                <div className="vacation-rental-grid">
                  {availableProperties.map((rental) => (
                    <div
                      key={rental.id}
                      className="rental-card"
                      onClick={() => onPropertySelect(rental)}
                    >
                      <img
                        src={rental.imageUrl}
                        alt={rental.name}
                        className="rental-image"
                      />
                      <div className="rental-details">
                        <h3 className="rental-name">{rental.name}</h3>
                        <p className="rental-location">{rental.location}</p>
                        <p className="rental-type">{rental.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeStep === 1 && (
            <div
              style={{
                maxWidth: "500px",
                margin: "auto",
                paddingTop: "20px",
              }}
            >
              <div key={selectedProperty.id}>
                <img
                  src={selectedProperty.imageUrl}
                  alt={selectedProperty.name}
                  className="rental-image"
                />
                <div className="rental-details">
                  <h3 className="rental-name">{selectedProperty.name}</h3>
                  <p className="rental-location">
                    {" "}
                    <em>Location: </em>
                    {selectedProperty.location}
                  </p>
                  <p className="rental-type">
                    {" "}
                    <em>Rental type: </em>
                    {selectedProperty.type}
                  </p>
                  <p>
                    <em style={{ fontWeight: "bold" }}>Check in:</em>{" "}
                    {dateRange[0].format("DD MMM YYYY")}
                    {" - "}
                    <em style={{ fontWeight: "bold" }}>Check out:</em>{" "}
                    {dateRange[1].format("DD MMM YYYY")}
                  </p>
                </div>
              </div>

              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={handleCreateBooking}
              >
                Book this property
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
}
