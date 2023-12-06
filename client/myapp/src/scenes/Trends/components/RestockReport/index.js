import React, { useState, useEffect } from "react";
// import MaterialUIPicker from "../MaterialUIPicker";
import BarChart from "../BarChart";
import "./styles.css"; 


/**
 * RestockReport component displays a report of inventory items that may need restocking.
 * @returns {JSX.Element} RestockReport component JSX.
 */
function RestockReport() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Inventory left',
            data: [],
            backgroundColor: 'rgba(166, 36, 42, 1)', // Adjust this color as needed
        }]
    });

    useEffect(() => {
        generateReport();
    }, []); // The empty array ensures the effect only runs once after initial render

    function generateReport() {
        const url = `${process.env.REACT_APP_WEB_SERVER_ADDRESS}/restock_report_ingredients`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.name);
                const counts = data.map(item => parseInt(item.availability));
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Inventory left',
                        data: counts,
                        backgroundColor: 'rgba(166, 36, 42, 1)', // Adjust this color as needed
                    }]
                });
            })
            .catch(error => {
                console.error('Failed to retrieve restock report:', error);
            });
    }

    return (
        <div className="restock-report">
            <p className="report-caption">Here are inventory items that may need to be restocked soon.</p>
            <div className="chart-legend"></div>
            <div className="sales-chart">
                <BarChart chartData={chartData} yaxis={"Inventory Remaining"}/>
            </div>
        </div>
    );
}

export default RestockReport;
