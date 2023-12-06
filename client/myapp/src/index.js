import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import App from "./App";
import Menu from "./Menu";
import LandingNav from "./scenes/Home/components/LandingNav"; // Import your NavBar component
import Landing from "./scenes/Home/Landing";
import AB from "./scenes/Home/Landing/a";
import Management from "./scenes/Management";
import Trends from "./scenes/Trends";


/**
 * Main component including a common NavBar and routing setup.
 * @component
 */
const AppWithNavBar = () => {
    /**
   * State for managing the current view.
   * @type {Array} - [currView, setCurrView]
   */
  const[currView, setCurrView] = useState("customer");

  return (
    <div>
      <LandingNav currView={currView} setCurrView={setCurrView}/> {/* Common NavBar component */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/App" element={<App currView={currView} setCurrView={setCurrView}/>} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Trends" element={<Trends />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/Translate" element={<AB />} />
      </Routes>
    </div>
  );
};


/**
 * Renders the AppWithNavBar component wrapped in a Router.
 */
ReactDOM.render(
  <Router>
    <AppWithNavBar />
  </Router>,
  document.getElementById("root")
);