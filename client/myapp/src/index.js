import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import LandingNav from "./scenes/Home/components/LandingNav"; // Import your NavBar component
import App from "./App";
import Menu from "./Menu";
import Weather from "./scenes/components/weather";
import Landing from "./scenes/Home/Landing";
import Management from "./scenes/Management";
import AB from "./scenes/Home/Landing/a";
import Trends from "./scenes/Trends";

const AppWithNavBar = () => {
  const[currView, setCurrView] = useState("customer");

  return (
    <div>
      <LandingNav currView={currView} setCurrView={setCurrView}/> {/* Common NavBar component */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/App" element={<App currView={currView} setCurrView={setCurrView}/>} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Trends" element={<Trends />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/Test" element={<AB />} />
      </Routes>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <AppWithNavBar />
  </Router>,
  document.getElementById("root")
);