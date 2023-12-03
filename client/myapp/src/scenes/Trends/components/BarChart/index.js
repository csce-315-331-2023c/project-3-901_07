import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData }) => {
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
            }}
        />
    );
};

export default BarChart;
