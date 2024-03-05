import React from "react";
import "./App.css";

import Navbar from "./components/layouts/Navbar";
import Body from "./components/layouts/Body";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
