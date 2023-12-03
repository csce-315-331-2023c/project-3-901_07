import React, { useState } from "react";
import MaterialUIPicker from "../MaterialUIPIcker";
import BarChart from "../BarChart";
import "./styles.css"; 

function SalesReport() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: 'rgba(166, 36, 42, 0)', 
            }
        ]
    });

    const categories = {
        'Milk Tea': 'rgba(234, 172, 139, 1)',
        'Fresh Milk': 'rgba(53, 80, 112, 1)',
        'Ice Blend': 'rgba(109, 89, 122, 1)',
        'Mojito': 'rgba(116, 198, 157, 1)',
        'Creama': 'rgba(162, 210, 255)',
        'Fruit Tea': 'rgba(229, 107, 111, 1)',
    };

   
    const Legend = ({ categories }) => (
        <div className="chart-legend">
            {Object.keys(categories).map(category => (
                <div key={category} className="legend-item">
                    <span className="legend-color" style={{ 
                        backgroundColor: categories[category], 
                        width: '20px', 
                        height: '20px', 
                        display: 'inline-block', 
                        marginRight: '10px',
                        borderRadius: '4px'
                    }}></span>
                    <span className="legend-label">{category}</span>
                </div>
            ))}
        </div>
    );

    function generateReport() {
        const startDateFormatted = startDate.toISOString().split('T')[0];
        const endDateFormatted = endDate.toISOString().split('T')[0];

        console.log(startDateFormatted);
        console.log(endDateFormatted);

        const url = `${process.env.REACT_APP_WEB_SERVER_ADDRESS}/sales_report?start_date=${startDateFormatted}&end_date=${endDateFormatted}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.name);
                const counts = data.map(item => parseInt(item.order_count));
                const dataCategories = data.map(item => item.type);
    
                const backgroundColors = dataCategories.map(category => categories[category] || 'rgba(0, 0, 0, 1)');
                console.log(backgroundColors);
                setChartData({
                    labels: labels,
                    datasets: [
                        
                        {
                            label: '', 
                            data: counts,
                            backgroundColor: backgroundColors, 
                        }
                    ]
                });
            })
            .catch(error => {
                // Handle any errors
                console.error('Failed to retrieve sales report:', error);
            });
    }

   

    return (
        <div className="sales-report">
            <div className="controls-row">
                <div className="date-pickers">
                    <MaterialUIPicker
                        picker_label={"Start date"}
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        className = "date-picker"
                    /><MaterialUIPicker
                        picker_label={"End date"}
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                        className = "date-picker"
                /></div>
                
                <button onClick={generateReport} className="signin-button generate-report-button">Generate Report</button>
            </div>
            <div className="sales-chart">
                <Legend categories={categories} /> {}
                <BarChart chartData={chartData} />
            </div>
        </div>
    );
}

export default SalesReport;
