// import React, { useEffect, useState, useRef } from "react";
// import Sidebar from "../../components/Sidebar";
// import { initDashboardSocket } from "./DashboardSocket";
// import TargetChart from "../../components/TargetChart";
// import TicketTable from "../../components/TicketTable";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     open: 52,
//     new: 36,
//     in_process: 41,
//     closed: 45,
//   });
//   const [tickets, setTickets] = useState([]);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const socket = initDashboardSocket((data) => {
//       setStats(data.stats || {});
//       setTickets(data.latest_tickets || []);
//     });
//     socketRef.current = socket;
//     return () => socket.close();
//   }, []);

//   return (
//     <div className="dashboard-layout">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="dashboard-main">
//         <h2 className="page-title">Overview</h2>

//         {/* ---------- Top Statistic Cards ---------- */}
//         <div className="stat-grid">
//           <div className="stat-card glass-card">
//             <p className="stat-title">Open Tickets</p>
//             <h3 className="stat-value">{stats.open}</h3>
//             <span className="stat-change">↑ 15% Up from last hour</span>
//           </div>

//           <div className="stat-card glass-card">
//             <p className="stat-title">New Tickets</p>
//             <h3 className="stat-value">{stats.new}</h3>
//             <span className="stat-change">↑ 15% Up from last hour</span>
//           </div>

//           <div className="stat-card glass-card">
//             <p className="stat-title">In Process Tickets</p>
//             <h3 className="stat-value">{stats.in_process}</h3>
//             <span className="stat-change">↑ 15% Up from last hour</span>
//           </div>

//           <div className="stat-card glass-card">
//             <p className="stat-title">Closed Tickets</p>
//             <h3 className="stat-value">{stats.closed}</h3>
//             <span className="stat-change">↑ 15% Up from last hour</span>
//           </div>
//         </div>

//         {/* ---------- Target Stats Section ---------- */}
//         <section className="target-section">
//           <div className="target-card glass-card">
//             <div className="card-header">
//               <p>Target Stats</p>
//               <span>Weekly</span>
//             </div>
//             <div className="chart-section">
//               <TargetChart data={stats} />
//             </div>
//           </div>
//         </section>

//         {/* ---------- Latest Tickets Section ---------- */}
//         <section className="table-section glass-card">
//           <h3>Latest Tickets</h3>
//           <TicketTable tickets={tickets} />
//         </section>
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TargetChart from "../../components/TargetChart";
import TicketTable from "../../components/TicketTable";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const TOKEN = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tenants/dashboard/overview`, {
          headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Dashboard fetch failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">⚠️ {error}</p>;
  if (!stats) return <p>No data found</p>;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* ---------- Main Content ---------- */}
      <main className="dashboard-main">
        <h2 className="page-title">Overview</h2>

        {/* ---------- Top Statistic Cards ---------- */}
        <div className="stat-grid">
          <div className="stat-card">
            <p className="stat-title">Total Conversations</p>
            <h3 className="stat-value">{stats.total_conversations}</h3>
            <span className="stat-change">↑ 15% Up from last hour</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Active</p>
            <h3 className="stat-value">{stats.active_conversations}</h3>
            <span className="stat-change">↑ 10% This week</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Waiting</p>
            <h3 className="stat-value">{stats.waiting_conversations}</h3>
            <span className="stat-change">↓ 5% vs yesterday</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Escalated</p>
            <h3 className="stat-value">{stats.escalated_conversations}</h3>
            <span className="stat-change">↑ 12% from last hour</span>
          </div>
        </div>

        {/* ---------- Target Chart Section ---------- */}
        <section className="target-section">
          <div className="target-card">
            <div className="card-header">
              {/* <p>Target Stats</p>
              <span>Weekly</span> */}
            </div>
            <div className="chart-section">
              {/* Pass only the numbers needed for chart */}
              <TargetChart
                data={{
                  total: stats.total_conversations,
                  active: stats.active_conversations,
                  waiting: stats.waiting_conversations,
                  escalated: stats.escalated_conversations,
                }}
              />
            </div>
          </div>
        </section>

        {/* ---------- Agents Table ---------- */}
        <section className="table-section">
          <h3>Agents</h3>
          {/* Reuse TicketTable for agent list */}
          <TicketTable />
        </section>
      </main>
    </div>
  );
}
