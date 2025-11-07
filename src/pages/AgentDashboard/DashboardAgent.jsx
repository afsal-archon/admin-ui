// // import React, { useState, useEffect } from "react";
// // import "../../styles/dashboardagent.css";
// // import SidebarAgent from "../../components/SidebarAgent";
// // import { stats } from "./data";
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   Title,
// // } from "chart.js";
// // import { Doughnut } from "react-chartjs-2";

// // ChartJS.register(ArcElement, Tooltip, Legend, Title);

// // const centerTextPlugin = (value) => ({
// //   id: "centerText",
// //   beforeDraw: (chart) => {
// //     const {
// //       ctx,
// //       chartArea: { width, height },
// //     } = chart;
// //     ctx.save();
// //     ctx.font = "bold 38px Inter, sans-serif";
// //     ctx.fillStyle = "#111827";
// //     ctx.textAlign = "center";
// //     ctx.textBaseline = "middle";
// //     ctx.fillText(value, width / 2, height / 2 + chart.chartArea.top / 2);
// //   },
// // });

// // export default function DashboardAgent() {
// //   const [activeTab, setActiveTab] = useState("Daily");
// //   const [agentStatus, setAgentStatus] = useState(null);

// //   // 🟢 Fetch Agent Status
// //   useEffect(() => {
// //     const fetchStatus = async () => {
// //       try {
// //         const res = await fetch("/api/agent/status", {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("agent_token")}`,
// //           },
// //         });
// //         if (!res.ok) throw new Error("Failed to fetch agent status");
// //         const data = await res.json();
// //         setAgentStatus(data.status); // e.g. "online" | "offline" | "away"
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchStatus();
// //   }, []);

// //   const chartValues = {
// //     Daily: [678, 300, 120, 80],
// //     Weekly: [4200, 1900, 800, 450],
// //     Monthly: [16000, 7200, 2800, 1800],
// //   };

// //   const chartData = {
// //     labels: ["Total Conversations", "Active", "Waiting", "Escalated"],
// //     datasets: [
// //       {
// //         data: chartValues[activeTab],
// //         backgroundColor: ["#f97316", "#10b981", "#3b82f6", "#ef4444"],
// //         borderWidth: 0,
// //         cutout: "75%",
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     plugins: {
// //       legend: { display: false },
// //       tooltip: {
// //         backgroundColor: "#0f172a",
// //         titleColor: "#fff",
// //         bodyColor: "#e5e7eb",
// //         cornerRadius: 6,
// //       },
// //     },
// //     animation: { duration: 900 },
// //     responsive: true,
// //     maintainAspectRatio: false,
// //   };

// //   const totalValue = chartValues[activeTab][0];

// //   return (
// //     <div className="agent-dashboard">
// //       <SidebarAgent />
// //       <main className="main-content">
// //         <header className="header">
// //           <div>
// //             <h1>Welcome Back, James!</h1>
// //             <p>Here’s what’s happening with your support today</p>
// //           </div>

// //           {/* 🟢 Profile Section with Status Indicator */}
// //           <div className="profile">
// //             <div className="profile-img-wrapper">
// //               <img src="https://i.pravatar.cc/100?img=7" alt="Profile" />
// //               {agentStatus === "online" && (
// //                 <span className="notif-dot online"></span>
// //               )}
// //               {agentStatus === "away" && (
// //                 <span className="notif-dot away"></span>
// //               )}
// //               {agentStatus === "offline" && (
// //                 <span className="notif-dot offline"></span>
// //               )}
// //             </div>
// //           </div>
// //         </header>

// //         <div className="stats-row">
// //           {stats.map((item, i) => (
// //             <div className="stat-card" key={i}>
// //               <div className="stat-icon">{item.icon}</div>
// //               <h2>{item.value}</h2>
// //               <p>{item.title}</p>
// //               <small>{item.subtitle}</small>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="chart-card">
// //           <div className="chart-header">
// //             <h3>Conversations Overview</h3>
// //             <div className="chart-tabs">
// //               {["Daily", "Weekly", "Monthly"].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   className={activeTab === tab ? "active" : ""}
// //                   onClick={() => setActiveTab(tab)}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="chart-overview">
// //             <div className="doughnut-container">
// //               <Doughnut
// //                 data={chartData}
// //                 options={chartOptions}
// //                 plugins={[centerTextPlugin(totalValue)]}
// //               />
// //             </div>

// //             <div className="chart-legend">
// //               <div className="legend-item">
// //                 <span className="dot" style={{ background: "#f97316" }}></span>
// //                 <p>Total Conversations</p>
// //               </div>
// //               <div className="legend-item">
// //                 <span className="dot" style={{ background: "#10b981" }}></span>
// //                 <p>Active</p>
// //               </div>
// //               <div className="legend-item">
// //                 <span className="dot" style={{ background: "#3b82f6" }}></span>
// //                 <p>Waiting</p>
// //               </div>
// //               <div className="legend-item">
// //                 <span className="dot" style={{ background: "#ef4444" }}></span>
// //                 <p>Escalated</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }



// import React, { useState, useEffect } from "react";
// import "../../styles/dashboardagent.css";
// import SidebarAgent from "../../components/SidebarAgent";
// import { stats } from "./data";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const centerTextPlugin = (value) => ({
//   id: "centerText",
//   beforeDraw: (chart) => {
//     const {
//       ctx,
//       chartArea: { width, height },
//     } = chart;
//     ctx.save();
//     ctx.font = "bold 38px Inter, sans-serif";
//     ctx.fillStyle = "#111827";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(value, width / 2, height / 2 + chart.chartArea.top / 2);
//   },
// });

// export default function DashboardAgent() {
//   const [activeTab, setActiveTab] = useState("Daily");
//   const [agent, setAgent] = useState({ name: "", status: "offline" });

//   // 🟢 Fetch Agent Details
//   useEffect(() => {
//     const fetchAgent = async () => {
//       try {
//         const res = await fetch("/api/agent/status", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("agent_token")}`,
//           },
//         });
//         if (!res.ok) throw new Error("Failed to fetch agent info");
//         const data = await res.json();
//         setAgent({
//           name: data.name || "Agent",
//           status: data.status || "offline",
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchAgent();
//   }, []);

//   const chartValues = {
//     Daily: [678, 300, 120, 80],
//     Weekly: [4200, 1900, 800, 450],
//     Monthly: [16000, 7200, 2800, 1800],
//   };

//   const chartData = {
//     labels: ["New Clients", "Open Tasks", "Unread Messages",],
//     datasets: [
//       {
//         data: chartValues[activeTab],
//         backgroundColor: ["#f97316", "#10b981", "#3b82f6", ],
//         borderWidth: 0,
//         cutout: "75%",
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: "#0f172a",
//         titleColor: "#fff",
//         bodyColor: "#e5e7eb",
//         cornerRadius: 6,
//       },
//     },
//     animation: { duration: 900 },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   const totalValue = chartValues[activeTab][0];

//   return (
//     <div className="agent-dashboard">
//       <SidebarAgent />
//       <main className="main-content">
//         <header className="header">
//           <div>
//             <h1>Welcome Back, {agent.name}!</h1>
//             <p>Here’s what’s happening with your support today</p>
//           </div>

//           {/* 🟢 Profile Section */}
//           <div className="profile">
//             <div className="profile-img-wrapper">
//               <div className={`profile-circle ${agent.status}`}></div>
//               {agent.status === "online" && (
//                 <span className="status-dot online"></span>
//               )}
//               {agent.status === "away" && (
//                 <span className="status-dot away"></span>
//               )}
//               {agent.status === "offline" && (
//                 <span className="status-dot offline"></span>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="stats-row">
//           {stats.map((item, i) => (
//             <div className="stat-card" key={i}>
//               <div className="stat-icon">{item.icon}</div>
//               <h2>{item.value}</h2>
//               <p>{item.title}</p>
//               <small>{item.subtitle}</small>
//             </div>
//           ))}
//         </div>

//         <div className="chart-card">
//           <div className="chart-header">
//             <h3>Conversations Overview</h3>
//             <div className="chart-tabs">
//               {["Daily", "Weekly", "Monthly"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={activeTab === tab ? "active" : ""}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="chart-overview">
//             <div className="doughnut-container">
//               <Doughnut
//                 data={chartData}
//                 options={chartOptions}
//                 plugins={[centerTextPlugin(totalValue)]}
//               />
//             </div>

//             <div className="chart-legend">
//               <div className="legend-item">
//                 <span className="dot" style={{ background: "#f97316" }}></span>
//                 <p>New Clients</p>
//               </div>
//               <div className="legend-item">
//                 <span className="dot" style={{ background: "#10b981" }}></span>
//                 <p>Open Task</p>
//               </div>
//               <div className="legend-item">
//                 <span className="dot" style={{ background: "#3b82f6" }}></span>
//                 <p>Unread Messages</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import "../../styles/dashboardagent.css";
import SidebarAgent from "../../components/SidebarAgent";
import { stats } from "./data";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const centerTextPlugin = (value) => ({
  id: "centerText",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    ctx.save();
    ctx.font = "bold 38px Inter, sans-serif";
    ctx.fillStyle = "#111827";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(value, width / 2, height / 2 + chart.chartArea.top / 2);
  },
});

export default function DashboardAgent() {
  const [activeTab, setActiveTab] = useState("Daily");
  const [agent, setAgent] = useState({ name: "", status: "offline" });
  const [notifCount, setNotifCount] = useState(0);

  // 🟢 Fetch Agent Details
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch("/api/agent/status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("agent_token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch agent info");
        const data = await res.json();
        setAgent({
          name: data.name || "Agent",
          status: data.status || "offline",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgent();
  }, []);

  // 🔔 Fetch Notification Count
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/agent/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("agent_token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        setNotifCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        console.error("Notification fetch error:", err);
        setNotifCount(0);
      }
    };

    fetchNotifications();

    // optional: refresh every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const chartValues = {
    Daily: [678, 300, 120],
    Weekly: [4200, 1900, 800],
    Monthly: [16000, 7200, 2800],
  };

  const chartData = {
    labels: ["New Clients", "Open Tasks", "Unread Messages"],
    datasets: [
      {
        data: chartValues[activeTab],
        backgroundColor: ["#f97316", "#10b981", "#3b82f6"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        cornerRadius: 6,
      },
    },
    animation: { duration: 900 },
    responsive: true,
    maintainAspectRatio: false,
  };

  const totalValue = chartValues[activeTab][0];

  return (
    <div className="agent-dashboard">
      <SidebarAgent />
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Welcome Back, {agent.name}!</h1>
            <p>Here’s what’s happening with your support today</p>
          </div>

          {/* 🟢 Profile Section + Notification Count */}
          <div className="profile">
            <div className="profile-img-wrapper">
              <div className={`profile-circle ${agent.status}`}></div>

              {/* Status Dot */}
              <span className={`status-dot ${agent.status}`}></span>

              {/* 🔔 Notification Count */}
              {notifCount > 0 && (
                <span className="notif-badge">{notifCount}</span>
              )}
            </div>
          </div>
        </header>

        <div className="stats-row">
          {stats.map((item, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon">{item.icon}</div>
              <h2>{item.value}</h2>
              <p>{item.title}</p>
              <small>{item.subtitle}</small>
            </div>
          ))}
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Conversations Overview</h3>
            <div className="chart-tabs">
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-overview">
            <div className="doughnut-container">
              <Doughnut
                data={chartData}
                options={chartOptions}
                plugins={[centerTextPlugin(totalValue)]}
              />
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="dot" style={{ background: "#f97316" }}></span>
                <p>New Clients</p>
              </div>
              <div className="legend-item">
                <span className="dot" style={{ background: "#10b981" }}></span>
                <p>Open Tasks</p>
              </div>
              <div className="legend-item">
                <span className="dot" style={{ background: "#3b82f6" }}></span>
                <p>Unread Messages</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
