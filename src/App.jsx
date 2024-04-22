import { useState } from "react";
import "./App.css";
import useLocalStorageArray from "./hooks/useLocalStorageArray";
import PseudoSearchBar from "./components/PseudoSearchBar";

function App() {
  const { addItem, getItems, getItemById, deleteItem, updateItem } =
    useLocalStorageArray("myBookings");

  return (
    <>
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
        <PseudoSearchBar />
      </div>
    </>
  );
}

export default App;
