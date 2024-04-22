import { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageArray from "./hooks/useLocalStorageArray";
import PseudoSearchBar from "./components/PseudoSearchBar";
import NewBookingModal from "./components/NewBookingModal/NewBookingModal";

let theme = createTheme({
  palette: {
    primary: {
      main: "#005477",
    },
  },
});

function App() {
  const { addItem, getItems, getItemById, deleteItem, updateItem } =
    useLocalStorageArray("myBookings");
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <nav className="navbar-main">
          <h2 style={{ color: "#005477" }}>Book a stay</h2>
        </nav>
        <div
          className="body--main"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PseudoSearchBar onClick={() => setNewBookingModalOpen(true)} />
        </div>
        <NewBookingModal
          open={newBookingModalOpen}
          onClose={() => setNewBookingModalOpen(false)}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
