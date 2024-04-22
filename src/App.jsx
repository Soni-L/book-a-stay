import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav className="navbar-main">
        <h3 style={{ color: "white", fontFamily: "Helvetica" }}>Book a stay</h3>
      </nav>
      <div style={{ height: "calc(100vh - 60px)" }}></div>
    </>
  );
}

export default App;
