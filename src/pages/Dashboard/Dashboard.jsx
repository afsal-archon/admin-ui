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



import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { initDashboardSocket } from "./DashboardSocket";
import TargetChart from "../../components/TargetChart";
import TicketTable from "../../components/TicketTable";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    open: 52,
    new: 36,
    in_process: 41,
    closed: 45,
  });
  const [tickets, setTickets] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = initDashboardSocket((data) => {
      setStats(data.stats || {});
      setTickets(data.latest_tickets || []);
    });
    socketRef.current = socket;
    return () => socket.close();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">
        <h2 className="page-title">Overview</h2>

        {/* ---------- Top Statistic Cards ---------- */}
        <div className="stat-grid">
          <div className="stat-card">
            <p className="stat-title">Open Tickets</p>
            <h3 className="stat-value">{stats.open}</h3>
            <span className="stat-change">↑ 15% Up from last hour</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">New Tickets</p>
            <h3 className="stat-value">{stats.new}</h3>
            <span className="stat-change">↑ 15% Up from last hour</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">In Process Tickets</p>
            <h3 className="stat-value">{stats.in_process}</h3>
            <span className="stat-change">↑ 15% Up from last hour</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Closed Tickets</p>
            <h3 className="stat-value">{stats.closed}</h3>
            <span className="stat-change">↑ 15% Up from last hour</span>
          </div>
        </div>

        {/* ---------- Target Stats ---------- */}
        <section className="target-section">
          <div className="target-card">
            <div className="card-header">
              {/* <p>Target Stats</p>
              <span>Weekly</span> */}
            </div>
            <div className="chart-section">
              <TargetChart data={stats} />
            </div>
          </div>
        </section>

        {/* ---------- Latest Tickets ---------- */}
        <section className="table-section">
          <h3>Latest Tickets</h3>
          <TicketTable tickets={tickets} />
        </section>
      </main>
    </div>
  );
}
