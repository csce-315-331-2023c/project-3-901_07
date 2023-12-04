// src/scenes/Trends.js

import React, {useState} from 'react';
import './styles.css'; // Import the separate CSS for this page
import ExcessReport from './components/ExcessReport'
import RestockReport from './components/RestockReport'
import SalesReport from './components/SalesReport'
import WhatSalesTogether from './components/WhatSalesTogether'
import shareTeaLogo from "../../assets/images/sharetealogo.png";
import LandingNav from "../Home/components/LandingNav/index.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Trends = () => {
  
  const [currReport, setReport] = useState(null);
  const [currView, setCurrView] = useState("customer");
  const handleSetContentPanel = (category) => {
    setReport(category); 
  };

  return (
    <div className="trends-container">
      <LandingNav currView={currView} setCurrView={setCurrView} />
      <div className = "trends-main-content">
            <LeftPanel currReport={currReport} setContentPanel={handleSetContentPanel} />
            <span className="trends-panel-divider"></span>
            <ContentPanel currReport={currReport} />
      </div>
    </div>
  );
};

function setContentPanel({category}){
    
}

function LeftPanel({ currReport, setContentPanel }) {
    const categories = ["Sales Report", "Excess Report", "Restock Report", "What Sales Together"];
  
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
