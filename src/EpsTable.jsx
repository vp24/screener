import React from "react";
import "./App.css";

const EpsTable = ({ epsTrend }) => {
  // Group elements into chunks of size n
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const labels = [
    "EPS Trend",
    "Current Estimate",
    "7 Days Ago",
    "30 Days Ago",
    "60 Days Ago",
    "90 Days Ago",
  ];

  // Check if epsTrend prop is defined and is an array
  if (!Array.isArray(epsTrend)) {
    return null; // or return an error message/component
  }

  return (
    <div className="center">
      <h2>EPS Trend:</h2>
      <table className="eps-table">
        <tbody>
          {chunkArray(epsTrend, 4).map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{labels[rowIndex]}</td>
              {row.map((eps, colIndex) => (
                <td key={colIndex}>{eps}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpsTable;
