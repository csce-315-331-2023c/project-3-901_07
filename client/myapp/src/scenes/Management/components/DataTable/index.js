import React from 'react';

function DataTable({ dataList }) {
    // Assuming dataList is an array of objects like:
    // [{ name: "Alice", age: 30, job: "Engineer" }, ...]

    return (
        <table>
            <thead>
                <tr>
                    {/* Create table headers dynamically */}
                    {dataList.length > 0 && Object.keys(dataList[0]).map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Create table rows */}
                {dataList.map((item, index) => (
                    <tr key={index}>
                        {/* Create cells for each row */}
                        {Object.values(item).map((value, cellIndex) => (
                            <td key={cellIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
