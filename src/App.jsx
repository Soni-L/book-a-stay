import { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageArray from "./hooks/useLocalStorageArray";
import PseudoSearchBar from "./components/PseudoSearchBar";
import NewBookingModal from "./components/NewBookingModal/NewBookingModal";
import { Chip, Paper, Typography } from "@mui/material";

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
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <nav className="navbar-main">
          <h2 style={{ color: "#005477" }}>Book a stay</h2>
        </nav>
        {items.length === 0 ? (
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
        ) : (
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
                borderRadius: "8px",
                maxWidth: "var(--tablet-breakpoint)",
              }}
            >
              <Chip
                label="My bookings"
                variant="outlined"
                color="primary"
                sx={{ margin: "8px 0", backgroundColor: 'white' }}
              />
              {items.map((booking) => (
                <Paper
                  key={booking.id}
                  elevation={3}
                  sx={{
                    margin: "8px 0",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                  }}
                >
                  {booking.name}
                </Paper>
              ))}
            </Paper>
          </div>
        )}
        <NewBookingModal
          open={newBookingModalOpen}
          onClose={() => setNewBookingModalOpen(false)}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
