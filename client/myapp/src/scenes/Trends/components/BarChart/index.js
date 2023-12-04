import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData, yaxis}) => {
    return (
        <Bar
            data={chartData}
            options={{
                title: {
                    display: false,
                    text: 'Bar Chart Example',
                    fontSize: 40
                },
                legend: {
                    display: false, 
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yaxis,
                            fontSize: 100 // Increase the font size here
                        },
                        ticks: {
                            fontSize: 12 // Increase the font size of the y-axis ticks here
                        }
                    },
                    x: {
                        ticks: {
                            fontSize: 12 // Increase the font size of the x-axis ticks here
                        }
                    }
                },
            }}
        />
    );
};

export default BarChart;
