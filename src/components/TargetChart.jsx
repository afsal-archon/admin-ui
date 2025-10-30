import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ReportOverview.css";

export default function ReportOverview() {
  // Demo analytics data
  const reportData = [
    { day: "Mon", tickets: 120 },
    { day: "Tue", tickets: 150 },
    { day: "Wed", tickets: 180 },
    { day: "Thu", tickets: 140 },
    { day: "Fri", tickets: 200 },
    { day: "Sat", tickets: 175 },
    { day: "Sun", tickets: 220 },
  ];

  return (
    <div className="report-card glass-card">
      <div className="card-header">
        <p>Reports Overview</p>
        <span>Weekly</span>
      </div>

      <div className="report-content">
        {/* Left section - KPIs */}
        <div className="report-summary">
          <div className="kpi-item">
            <h4>524</h4>
            <p>Total Tickets</p>
          </div>
          <div className="kpi-item">
            <h4>412</h4>
            <p>Resolved</p>
          </div>
          <div className="kpi-item">
            <h4>112</h4>
            <p>Pending</p>
          </div>
        </div>

        {/* Right section - Graph */}
        <div className="report-graph">
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={reportData}>
              <XAxis dataKey="day" stroke="#9ca3af" tickLine={false} />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Line
                type="monotone"
                dataKey="tickets"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, fill: "#f97316", strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
