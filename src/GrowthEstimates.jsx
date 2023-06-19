import React from "react";
import "./App.css";

const GrowthEstimates = ({ growthEstimates }) => {
  // Check if growthEstimates prop is defined and is an array
  if (!Array.isArray(growthEstimates)) {
    return null; // or return an error message/component
  }

  const labels = [
    "Growth Estimates",
    "Current Qtr",
    "Next Qtr",
    "Current Year",
    "Next Year",
    "Next 5 Years",
    "Past 5 Years",
  ];

  // Ensure growthEstimates has at least 6 elements
  if (growthEstimates.length < 6) {
    return null; // or return an error message/component
  }

  return (
    <div className="center">
      <h2>Growth Estimates:</h2>
      <table className="growth-table">
        <tbody>
          <tr>
            <td>{labels[0]}</td>
          </tr>
          {labels.slice(1).map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td>{label}</td>
              <td>{growthEstimates[rowIndex]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrowthEstimates;
