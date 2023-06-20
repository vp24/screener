// import React, { useState } from "react";
// import axios from "axios";
// import "./index.css";
// import "./App.css";
// import "chart.js/auto";
// import EpsTable from "./EpsTable";
// import GrowthEstimates from "./GrowthEstimates";
// import { Bar, Line } from "react-chartjs-2";

// const removePhrases = (text) => {
//   const phrasesToRemove = [
//     "Sales 2023",
//     "Net income 2023",
//     "Net cash position 2023",
//     "P/E ratio 2023",
//     "Yield 2023",
//     "Sales 2024",
//     "Net income 2024",
//     "Net cash position 2024",
//     "P/E ratio 2024",
//     "P/E ratio 2024",
//     "Capitalization",
//     "EV / Sales 2023",
//     "EV / Sales 2024",
//     "Nbr of Employees",
//     "Yield 2024",
//     "Free Float",
//   ];

//   const regex = new RegExp(phrasesToRemove.join("|"), "g");
//   const cleanedText = text.replace(regex, "").trim();

//   return cleanedText;
// };

// const removeTrailingText = (text) => {
//   const match = text.match(/^(.*?[BM])/i);
//   return match ? match[1] : text;
// };

// const App = () => {
//   // State variables
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [copiedData, setCopiedData] = useState([]);
//   const [chartData, setChartData] = useState({});
//   const [lineChartData, setLineChartData] = useState({});
//   const [lineChartDataEPS, setLineChartDataEPS] = useState({});
//   const [yahooResult, setYahooResult] = useState(null);
//   //const [stockCode, setStockCode] = useState('');

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);

//       // Make API request
//       const response = await axios.post("http://localhost:3001/search", {
//         query,
//       });
//       //"https://screener-api.onrender.com/search"

//       setResult(response.data.result);
//       setYahooResult(response.data.yahooResult);
//       //setStockCode(result.firstLink.split('-').pop().replace('/', ''));

//       // Modify and set copied data
//       const modifiedCopiedData = [
//         response.data.result.secondLinkData[0]
//           .slice(1)
//           .map((cellData) => cellData.replace(/\s/g, "")),
//         response.data.result.secondLinkData[14]
//           .slice(1)
//           .map((cellData) => cellData.replace(/\s/g, "")),
//         response.data.result.secondLinkData[21]
//           .slice(1)
//           .map((cellData) =>
//             parseFloat(cellData.replace(/\s/g, "").replace(/,/g, "."))
//           ),
//         response.data.result.secondLinkData[19]
//           .slice(1)
//           .map((cellData) => cellData.replace(/\s/g, "")),
//       ];

      

//       setCopiedData(modifiedCopiedData);

//       // Prepare chart data
//       const [years, sales, eps, netIncome] = modifiedCopiedData;

//       const netMargin = netIncome.map(
//         (income, index) => (income / sales[index]) * 100
//       );

//       const barChartData = {
//         labels: years,
//         datasets: [
//           {
//             label: "Sales",
//             data: sales,
//             backgroundColor: "aqua",
//             borderColor: "black",
//             borderWidth: 1,
//             order: 1,
//           },
//           {
//             label: "Net Income",
//             data: netIncome,
//             backgroundColor: "orange",
//             borderColor: "black",
//             borderWidth: 1,
//             order: 1,
//           },
//         ],
//       };

//       const lineChartData = {
//         labels: years,
//         datasets: [
//           {
//             label: "Net Margin",
//             data: netMargin,
//             borderColor: "green",
//             borderWidth: 2,
//             fill: false,
//             order: 0,
//           },
//         ],
//       };

//       const lineChartDataEPS = {
//         labels: years,
//         datasets: [
//           {
//             label: "EPS",
//             data: eps,
//             borderColor: "green",
//             borderWidth: 2,
//             fill: false,
//             order: 0,
//           },
//         ],
//       };

//       const barChartOptions = {
//         maintainAspectRatio: false,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       };

//       setChartData({ data: barChartData, options: barChartOptions });
//       setLineChartData({ data: lineChartData, options: {} });
//       setLineChartDataEPS({ data: lineChartDataEPS, options: {} });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="title">
//         <h1 className="center">Stock Screener</h1>
//       </div>
//       <section className="search">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter a query"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Loading..." : "Search"}
//           </button>
//         </form>
//       </section>
//       {result && (
//         <div>
//           <div className="center">
//             <h2>Link to site:</h2>
//             <p>{result.firstLink}</p>
//           </div>

//           <section className="estimated-financial-data">
//             <h3>Estimated financial data</h3>
//             <h2>{result.secondLinkData[12][0]}</h2>
//             <p>{result.firstLinkData}</p>
//             <table className="connected-table">
//               <tbody>
//                 <tr>
//                   <td></td>

//                   <td>
//                     <table className="table12labels">
//                       <thead>
//                         <tr>
//                           <th>Index</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>Sales</td>
//                         </tr>
//                         <tr>
//                           <td>Net Income</td>
//                         </tr>
//                         <tr>
//                           <td>Net cash position</td>
//                         </tr>
//                         <tr>
//                           <td>P/E Ratio</td>
//                         </tr>
//                         <tr>
//                           <td>Yield</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                   <td>
//                     <table className="table1">
//                       <thead>
//                         <tr>
//                           <th
//                             colSpan="5"
//                             style={{
//                               border: "1px solid black",
//                               padding: "5px",
//                               textAlign: "center",
//                             }}>
//                             2023
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {result.firstLinkData.slice(0, 5).map((data, index) => {
//                           const cleanedData = removePhrases(data);
//                           const modifiedData = removeTrailingText(cleanedData);
//                           return (
//                             <tr key={index}>
//                               <td
//                                 style={{
//                                   border: "1px solid black",
//                                   padding: "5px",
//                                 }}>
//                                 {modifiedData}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </td>

//                   <td>
//                     <table className="table2">
//                       <thead>
//                         <tr>
//                           <th
//                             colSpan="5"
//                             style={{
//                               border: "1px solid black",
//                               padding: "5px",
//                               textAlign: "center",
//                             }}>
//                             2024
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {result.firstLinkData
//                           .slice(5, 10)
//                           .map((data, index) => {
//                             const cleanedData = removePhrases(data);
//                             const modifiedData =
//                               removeTrailingText(cleanedData);
//                             return (
//                               <tr key={index}>
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "5px",
//                                   }}>
//                                   {modifiedData}
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                       </tbody>
//                     </table>
//                   </td>
//                   <td></td>
//                   <td>
//                     {" "}
//                     <table className="table3labels">
//                       <thead>
//                         <tr>
//                           <th>Index</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>Capitalization</td>
//                         </tr>
//                         <tr>
//                           <td>EV / Sales 2023</td>
//                         </tr>
//                         <tr>
//                           <td>EV / Sales 2024</td>
//                         </tr>
//                         <tr>
//                           <td>Nbr of Employees</td>
//                         </tr>
//                         <tr>
//                           <td>Free-Float</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                   <td>
//                     <table className="table3">
//                       <thead>
//                         <tr>
//                           <th
//                             colSpan="5"
//                             style={{
//                               border: "1px solid black",
//                               padding: "5px",
//                               textAlign: "center",
//                             }}>
//                             Other
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {result.firstLinkData
//                           .slice(10, 15)
//                           .map((data, index) => {
//                             const cleanedData = removePhrases(data);
//                             const modifiedData =
//                               removeTrailingText(cleanedData);
//                             return (
//                               <tr key={index}>
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "5px",
//                                   }}>
//                                   {modifiedData}
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </section>

//           <section className="financials">
//             <h3 className="center">Financials:</h3>
//             <table>
//               <tbody>
//                 {result.secondLinkData.map((rowData, index) => (
//                   <tr key={index}>
//                     {rowData.map((cellData, cellIndex) => (
//                       <td
//                         key={cellIndex}
//                         style={{
//                           border: "1px solid black",
//                           borderCollapse: "collapse",
//                           textAlign: "center",
//                           padding: "5px",
//                         }}>
//                         {cellData.trim()}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </div>
//       )}

//       {copiedData.length > 0 && (
//         <section className="income-statement-evolution">
//           <h2>Income Statement Evolution</h2>
//         </section>
//       )}

//       {chartData.data && chartData.options && lineChartData.data && (
//         <div className="chart-container">
//           <div className="chart">
//             <Bar data={chartData.data} options={chartData.options} />
//           </div>
//           <div className="chart">
//             <Line data={lineChartData.data} options={lineChartData.options} />
//           </div>
//           {/* <div className="chart">
//             <Line
//               data={lineChartDataEPS.data}
//               options={lineChartDataEPS.options}
//             />
//           </div> */}
//         </div>
//       )}
//       {query && result && (
//         <div>
//           <EpsTable epsTrend={yahooResult.epsTrend} />
//           <GrowthEstimates growthEstimates={yahooResult.growthEstimates} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
