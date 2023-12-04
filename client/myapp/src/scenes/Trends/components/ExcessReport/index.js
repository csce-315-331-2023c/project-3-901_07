import React, { useState, useEffect } from "react";
import MaterialUIPicker from "../MaterialUIPIcker";
import BarChart from "../BarChart";
import "./styles.css"; 

function ExcessReport({}){

    const [startDate, setStartDate] = useState(new Date());
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: 'rgba(166, 36, 42, 1)', 
            }
        ]
    });


    function generateReport() {
        const startDateFormatted = startDate.toISOString().split('T')[0];

        console.log(startDateFormatted);

        const url = `${process.env.REACT_APP_WEB_SERVER_ADDRESS}/excess_report?start_date=${startDateFormatted}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                const labels = data.map(item => item.ingredientname);
                const counts = data.map(item => parseInt(item.timesused));
    
                setChartData({
                    labels: labels,
                    datasets: [
                        
                        {
                            label: '', 
                            data: counts,
                            backgroundColor: "rgba(166, 36, 42, 1)", 
                        }
                    ]
                });
            })
            .catch(error => {
                console.error('Failed to retrieve excess report:', error);
            });
    }
   

    return (
        <div className="excess-report">
            <p className="report-caption">
                Enter a date to display the list of inventory items 
                that only sold less than 10% of their inventory between the timestamp and the current 
                time, assuming no restocks have happened during the window.
            </p>
            <div className="controls-row excess-controls-row">
                <div className="date-pickers">
                    <MaterialUIPicker
                        picker_label={"Start date"}
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        className="date-picker"
                    />
                </div>

                <button onClick={generateReport} className="signin-button generate-report-button">Generate Report</button>
            </div>
            <div className="sales-chart">
                <div className="chart-legend"></div>
                <BarChart chartData={chartData} yaxis={"Number Used"}/>
            </div>
        </div>
    );
}

export default ExcessReport;