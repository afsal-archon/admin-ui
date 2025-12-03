// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./ReportOverview.css";

// export default function ReportOverview() {
//   // Demo analytics data
//   const reportData = [
//     { day: "Mon", tickets: 120 },
//     { day: "Tue", tickets: 150 },
//     { day: "Wed", tickets: 180 },
//     { day: "Thu", tickets: 140 },
//     { day: "Fri", tickets: 200 },
//     { day: "Sat", tickets: 175 },
//     { day: "Sun", tickets: 220 },
//   ];

//   return (
//     <div className="report-card glass-card">
//       <div className="card-header">
//         <p>Reports Overview</p>
//         <span>Weekly</span>
//       </div>

//       <div className="report-content">
//         {/* Left section - KPIs */}
//         <div className="report-summary">
//           <div className="kpi-item">
//             <h4>524</h4>
//             <p>Total Tickets</p>
//           </div>
//           <div className="kpi-item">
//             <h4>412</h4>
//             <p>Resolved</p>
//           </div>
//           <div className="kpi-item">
//             <h4>112</h4>
//             <p>Pending</p>
//           </div>
//         </div>

//         {/* Right section - Graph */}
//         <div className="report-graph">
//           <ResponsiveContainer width="100%" height={150}>
//             <LineChart data={reportData}>
//               <XAxis dataKey="day" stroke="#9ca3af" tickLine={false} />
//               <YAxis hide={true} />
//               <Tooltip
//                 contentStyle={{
//                   background: "rgba(255,255,255,0.85)",
//                   borderRadius: "8px",
//                   border: "1px solid #e5e7eb",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="tickets"
//                 stroke="#f97316"
//                 strokeWidth={3}
//                 dot={{ r: 4, fill: "#f97316", strokeWidth: 1 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./ReportOverview.css";

// export default function ReportOverview() {
//   // 🎛 State for filter type
//   const [filter, setFilter] = useState("weekly");

//   // 🧠 Dummy data for all filters
//   const dailyData = [
//     { time: "9AM", tickets: 10 },
//     { time: "11AM", tickets: 14 },
//     { time: "1PM", tickets: 18 },
//     { time: "3PM", tickets: 22 },
//     { time: "5PM", tickets: 17 },
//     { time: "7PM", tickets: 25 },
//   ];

//   const weeklyData = [
//     { day: "Mon", tickets: 120 },
//     { day: "Tue", tickets: 150 },
//     { day: "Wed", tickets: 180 },
//     { day: "Thu", tickets: 140 },
//     { day: "Fri", tickets: 200 },
//     { day: "Sat", tickets: 175 },
//     { day: "Sun", tickets: 220 },
//   ];

//   const monthlyData = [
//     { week: "W1", tickets: 540 },
//     { week: "W2", tickets: 630 },
//     { week: "W3", tickets: 720 },
//     { week: "W4", tickets: 680 },
//   ];

//   // 🎯 Choose correct data and label key
//   let chartData = [];
//   let dataKey = "";

//   if (filter === "daily") {
//     chartData = dailyData;
//     dataKey = "time";
//   } else if (filter === "weekly") {
//     chartData = weeklyData;
//     dataKey = "day";
//   } else {
//     chartData = monthlyData;
//     dataKey = "week";
//   }

//   return (
//     <div className="report-card glass-card">
//       {/* Header with filter buttons */}
//       <div className="card-header">
//         <p className="title">📊 Reports Overview</p>

//         <div className="filter-buttons">
//           {["daily", "weekly", "monthly"].map((type) => (
//             <button
//               key={type}
//               className={`filter-btn ${filter === type ? "active" : ""}`}
//               onClick={() => setFilter(type)}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Body content */}
//       <div className="report-content">
//         {/* Left Section - KPI cards */}
//         <div className="report-summary">
//           <div className="kpi-item total">
//             <h4>524</h4>
//             <p>Total Tickets</p>
//           </div>
//           <div className="kpi-item resolved">
//             <h4>412</h4>
//             <p>Resolved</p>
//           </div>
//           <div className="kpi-item pending">
//             <h4>112</h4>
//             <p>Pending</p>
//           </div>
//         </div>

//         {/* Right Section - Graph */}
//         <div className="report-graph">
//           <ResponsiveContainer width="100%" height={180}>
//             <LineChart data={chartData}>
//               <XAxis
//                 dataKey={dataKey}
//                 stroke="#a1a1aa"
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <YAxis hide={true} />
//               <Tooltip
//                 contentStyle={{
//                   background: "rgba(255,255,255,0.85)",
//                   borderRadius: "8px",
//                   border: "1px solid #e5e7eb",
//                   color: "#0f172a",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="tickets"
//                 stroke="#f97316"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "#f97316", strokeWidth: 2 }}
//                 activeDot={{ r: 7, stroke: "#f97316", fill: "#fff" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./ReportOverview.css";

// export default function ReportOverview() {
//   const [filter, setFilter] = useState("weekly");

//   // Sample data sets
//   const dailyData = [
//     { time: "9AM", tickets: 10 },
//     { time: "11AM", tickets: 14 },
//     { time: "1PM", tickets: 18 },
//     { time: "3PM", tickets: 22 },
//     { time: "5PM", tickets: 17 },
//     { time: "7PM", tickets: 25 },
//   ];

//   const weeklyData = [
//     { day: "Mon", tickets: 120 },
//     { day: "Tue", tickets: 150 },
//     { day: "Wed", tickets: 180 },
//     { day: "Thu", tickets: 140 },
//     { day: "Fri", tickets: 200 },
//     { day: "Sat", tickets: 175 },
//     { day: "Sun", tickets: 220 },
//   ];

//   const monthlyData = [
//     { week: "W1", tickets: 540 },
//     { week: "W2", tickets: 630 },
//     { week: "W3", tickets: 720 },
//     { week: "W4", tickets: 680 },
//   ];

//   // Select dataset based on filter
//   let chartData = [];
//   let dataKey = "";
//   let chartHeight = 0;

//   if (filter === "daily") {
//     chartData = dailyData;
//     dataKey = "time";
//     chartHeight = 130;
//   } else if (filter === "weekly") {
//     chartData = weeklyData;
//     dataKey = "day";
//     chartHeight = 180;
//   } else {
//     chartData = monthlyData;
//     dataKey = "week";
//     chartHeight = 220;
//   }

//   return (
//     <div className="report-card glass-card">
//       {/* Header with dropdown */}
//       <div className="card-header">
//         <p className="title"></p>

//         <div className="dropdown-filter">
//           <select
//             className="filter-dropdown"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>
//         </div>
//       </div>

//       <div className="report-content">
//         {/* KPI Section */}
//         <div className="report-summary">
//           <div className="kpi-item total">
//             <h4>524</h4>
//             <p>Total Tickets</p>
//           </div>
//           <div className="kpi-item resolved">
//             <h4>412</h4>
//             <p>Resolved</p>
//           </div>
//           <div className="kpi-item pending">
//             <h4>112</h4>
//             <p>Pending</p>
//           </div>
//         </div>

//         {/* Graph Section */}
//         <div className="report-graph">
//           <ResponsiveContainer width="100%" height={chartHeight}>
//             <LineChart data={chartData}>
//               <XAxis
//                 dataKey={dataKey}
//                 stroke="#a1a1aa"
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <YAxis hide />
//               <Tooltip
//                 contentStyle={{
//                   background: "rgba(255,255,255,0.85)",
//                   borderRadius: "8px",
//                   border: "1px solid #e5e7eb",
//                   color: "#0f172a",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="tickets"
//                 stroke="#f97316"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "#f97316", strokeWidth: 2 }}
//                 activeDot={{ r: 7, stroke: "#f97316", fill: "#fff" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import "./TargetChart.css";

// export default function TargetChart() {
//   const [filter, setFilter] = useState("daily");

//   // Data changes based on filter
//   const dataSets = {
//     daily: [
//       { name: "Total Conversations", value: 678, color: "#f97316" },
//       { name: "Active", value: 210, color: "#22c55e" },
//       { name: "Waiting", value: 90, color: "#3b82f6" },
//       { name: "Escalated", value: 45, color: "#ef4444" },
//     ],
//     weekly: [
//       { name: "Total Conversations", value: 1500, color: "#f97316" },
//       { name: "Active", value: 850, color: "#22c55e" },
//       { name: "Waiting", value: 230, color: "#3b82f6" },
//       { name: "Escalated", value: 120, color: "#ef4444" },
//     ],
//     monthly: [
//       { name: "Total Conversations", value: 5800, color: "#f97316" },
//       { name: "Active", value: 3200, color: "#22c55e" },
//       { name: "Waiting", value: 700, color: "#3b82f6" },
//       { name: "Escalated", value: 450, color: "#ef4444" },
//     ],
//   };

//   const data = dataSets[filter];
//   const total = data[0].value;

//   return (
//     <div className="target-chart-card glass-card">
//       <div className="chart-header">
//         <h3>Conversations Overview</h3>
//         <div className="filter-group">
//           {["daily", "weekly", "monthly"].map((item) => (
//             <button
//               key={item}
//               className={`filter-btn ${filter === item ? "active" : ""}`}
//               onClick={() => setFilter(item)}
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="target-chart-wrapper">
//         {/* Donut Chart */}
//         <div className="chart-container">
//           <ResponsiveContainer width={260} height={260}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={85}
//                 outerRadius={110}
//                 startAngle={90}
//                 endAngle={450}
//                 stroke="none"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={index} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>

//           <div className="center-label">
//             <h3>{total}</h3>
//             <p></p>
//           </div>
//         </div>

//         {/* Legends */}
//         <div className="target-legend">
//           {data.map((entry, index) => (
//             <div key={index} className="legend-item">
//               <div
//                 className="legend-dot"
//                 style={{ background: entry.color }}
//               ></div>
//               <span>{entry.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./TargetChart.css";

export default function TargetChart() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "https://api.texef.com/api";
  const TOKEN = localStorage.getItem("auth_token");

  // Fetch dashboard data
  const fetchOverview = async (period = "all") => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${BASE_URL}/tenants/dashboard/overview?period=${period}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // Transform API response into chart format
      const chartData = [
        {
          name: "Total Conversations",
          value: result.total_conversations || 0,
          color: "#f97316",
        },
        {
          name: "Active",
          value: result.active_conversations || 0,
          color: "#22c55e",
        },
        {
          name: "Waiting",
          value: result.waiting_conversations || 0,
          color: "#3b82f6",
        },
        {
          name: "Escalated",
          value: result.escalated_conversations || 0,
          color: "#ef4444",
        },
      ];

      setData(chartData);
      setTotal(result.total_conversations || 0);
    } catch (err) {
      console.error("❌ Dashboard Fetch Error:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or filter changes
  useEffect(() => {
    fetchOverview(filter);
  }, [filter]);

  // ---------- UI ----------
  if (loading) {
    return <div className="target-chart-card glass-card">Loading...</div>;
  }

  if (error) {
    return (
      <div className="target-chart-card glass-card error-text">{error}</div>
    );
  }

  return (
    <div className="target-chart-card glass-card">
      {/* ---------- HEADER ---------- */}
      <div className="chart-header">
        <h3>Conversations Overview</h3>
        <div className="filter-group">
          {["today", "week", "month", "all"].map((item) => (
            <button
              key={item}
              className={`filter-btn ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item === "all"
                ? "All-time"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- CHART + LEGEND ---------- */}
      <div className="target-chart-wrapper">
        <div className="chart-container">
          <ResponsiveContainer width={260} height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={110}
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* ---------- Center Value ---------- */}
          <div className="center-label">
            <h3>{total}</h3>
            <p>Total Conversations</p>
          </div>
        </div>

        {/* ---------- LEGEND ---------- */}
        <div className="target-legend">
          {data.map((entry, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-dot"
                style={{ background: entry.color }}
              ></div>
              <span>
                {entry.name}: <strong>{entry.value}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
