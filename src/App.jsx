import { useEffect, useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageArray from "./hooks/useLocalStorageArray";
import PseudoSearchBar from "./components/PseudoSearchBar";
import NewBookingModal from "./components/NewBookingModal/NewBookingModal";
import { Chip, Paper } from "@mui/material";
import useUrlQueryParams from "./hooks/useUrlQueryParams";
import ViewBookingModal from "./components/ViewBookingModal/ViewBookingModal";
import dayjs from "dayjs";

let theme = createTheme({
  palette: {
    primary: {
      main: "#005477",
    },
  },
});

function App() {
  const { items, getItemById, deleteItem, updateItem } =
    useLocalStorageArray("myBookings");
  const { queryParams, setQueryParam } = useUrlQueryParams();
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [viewBookingModalOpen, setViewBookingModalOpen] = useState(false);

  useEffect(() => {
    if (queryParams.bookingId) setViewBookingModalOpen(true);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <nav className="navbar-main">
          <h2 style={{ color: "#005477" }}>Book a stay</h2>
        </nav>
        {items.length === 0 && (
          <div
            className="body-main"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              paddingTop: "15vh",
            }}
          >
            <PseudoSearchBar onClick={() => setNewBookingModalOpen(true)} />
          </div>
        )}

        {items.length > 0 && (
          <div
            className="body-main"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <PseudoSearchBar onClick={() => setNewBookingModalOpen(true)} />
            <Paper
              elevation={0}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "8px",
                backdropFilter: "blur(10px)",
                backgroundColor: "transparent",
                borderRadius: "16px",
                maxWidth: "var(--tablet-breakpoint)",
              }}
            >
              <Chip
                label="My bookings"
                variant="outlined"
                color="primary"
                sx={{ margin: "8px 0", backgroundColor: "white" }}
              />
              {items.map((booking) => (
                <Paper
                  key={booking.id}
                  onClick={() => {
                    setQueryParam("bookingId", booking.id);
                    setViewBookingModalOpen(true);
                  }}
                  style={{
                    margin: "8px 0",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {booking.name}
                  </p>
                  <p style={{ margin: 0 }}>
                    {dayjs(booking.checkIn).format("DD MMM YYYY")}
                    {" - "}
                    {dayjs(booking.checkOut).format("DD MMM YYYY")}
                  </p>
                </Paper>
              ))}
            </Paper>
          </div>
        )}
        <NewBookingModal
          open={newBookingModalOpen}
          onClose={() => setNewBookingModalOpen(false)}
        />
        <ViewBookingModal
          open={viewBookingModalOpen}
          onClose={() => setViewBookingModalOpen(false)}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
