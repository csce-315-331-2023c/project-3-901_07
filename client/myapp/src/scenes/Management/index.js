import React, { useState } from "react";
import "./styles.css"; // Import the separate CSS for this page
import Drinks from "./components/Drinks/index.js";
import ToppingsAndIngredients from "./components/ToppingsAndIngredients/index.js";
const Trends = () => {
  const [currReport, setReport] = useState("Drinks");
  const handleSetContentPanel = (category) => {
    setReport(category);
  };

  return (
    <div>
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
    </div>
  );
};

function LeftPanel({ currReport, setContentPanel }) {
  const categories = ["Drinks","Ingredients"];

  return (
    <div className="leftpanel">
      <div className="leftpanel-category-component">
        <ul>
          <div className="leftpanel-category header">Manage Items</div>
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

function ContentPanel({ currReport }) {
  // Render content based on the current report
  // For now, we'll just show the current report name as a placeholder
  return (
    <div className="content-panel management-content-panel">
      {currReport ? <h1>{currReport}</h1> : <h1>Select a category</h1>}
      {currReport === "Drinks" && <Drinks />}
      {currReport === "Ingredients" && <ToppingsAndIngredients />}
    </div>
  );
}

export default Trends;
