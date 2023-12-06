// src/scenes/Trends.js

import React, { useState } from "react";
import "./styles.css"; // Import the separate CSS for this page
import ExcessReport from "./components/ExcessReport";
import RestockReport from "./components/RestockReport";
import SalesReport from "./components/SalesReport";
import WhatSalesTogether from "./components/WhatSalesTogether";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Trends component to display different reports based on user selection.
 * @returns {JSX.Element} The Trends component JSX
 */
const Trends = () => {
  const [currReport, setReport] = useState("Sales Report");
  const handleSetContentPanel = (category) => {
    setReport(category);
  };

  return (
    <div className="trends-container">
      <div className="trends-main-content">
        <LeftPanel
          currReport={currReport}
          setContentPanel={handleSetContentPanel}
        />
        <span className="trends-panel-divider"></span>
        <ContentPanel currReport={currReport} />
      </div>
    </div>
  );
};

/**
 * LeftPanel component to render the category selection panel.
 * @param {Object} props - Component props
 * @param {string} props.currReport - The current selected report
 * @param {Function} props.setContentPanel - Function to set the content panel
 * @returns {JSX.Element} The LeftPanel component JSX
 */
function LeftPanel({ currReport, setContentPanel }) {
  const categories = [
    "Sales Report",
    "Excess Report",
    "Restock Report",
    "What Sales Together",
  ];

  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Trends</div>
          {categories.map((category) => (
            <li key={category}>
              <div
                className={
                  currReport === category
                    ? "leftpanel-category item active"
                    : "leftpanel-category item"
                }
                onClick={() => setContentPanel(category)}
              >
                {category}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * ContentPanel component to render the selected report content.
 * @param {Object} props - Component props
 * @param {string} props.currReport - The current selected report
 * @returns {JSX.Element} The ContentPanel component JSX
 */
function ContentPanel({ currReport }) {
  // Render content based on the current report
  // For now, we'll just show the current report name as a placeholder
  return (
    <div className="content-panel">
      {currReport ? <h2>{currReport}</h2> : <h2>Select a report</h2>}
      {currReport === "Sales Report" && <SalesReport />}
      {currReport === "Excess Report" && <ExcessReport />}
      {currReport === "Restock Report" && <RestockReport />}
      {currReport === "What Sales Together" && <WhatSalesTogether />}
    </div>
  );
}

export default Trends;
