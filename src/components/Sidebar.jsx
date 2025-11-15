// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiBarChart2,
//   FiInbox,
//   FiSettings,
//   FiUsers,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";
// import "./Sidebar.css";

// export default function Sidebar() {
//   const [active, setActive] = useState("Overview");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
//   const TOKEN = localStorage.getItem("auth_token");

//   const menuItems = [
//     { name: "Overview", icon: <FiBarChart2 />, path: "/dashboard" },
//     { name: "Inbox", icon: <FiInbox />, path: "/support" },
//     { name: "Configuration", icon: <FiSettings />, path: "/prompt" },
//     { name: "Agent", icon: <FiUsers />, path: "/agent" },
//   ];

//   const handleClick = (item) => {
//     setActive(item.name);
//     navigate(item.path);
//   };

//   const handleAccountClick = () => {
//     setActive("Account");
//     navigate("/account");
//   };

//   const handleLogout = async () => {
//     if (!window.confirm("Are you sure you want to logout?")) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.message || "Logged out successfully!");
//         localStorage.clear();
//         navigate("/");
//       } else {
//         alert(`⚠️ Logout failed: ${data.detail || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Logout Error:", err);
//       alert("❌ Network Error during logout!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <aside className="sidebar-glass">
//       {/* Header */}
//       <div className="sidebar-header">
//         <h2 className="sidebar-logo">HelpDesk</h2>
//       </div>

//       {/* Menu */}
//       <nav className="sidebar-menu">
//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => handleClick(item)}
//             className={`menu-item ${active === item.name ? "active" : ""}`}
//           >
//             <span className="menu-icon">{item.icon}</span>
//             <span className="menu-text">{item.name}</span>
//           </button>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         <button
//           className={`footer-item ${active === "Account" ? "active" : ""}`}
//           onClick={handleAccountClick}
//         >
//           <FiUser className="menu-icon" /> Account
//         </button>
//         <button
//           className={`footer-item logout ${loading ? "disabled" : ""}`}
//           onClick={handleLogout}
//           disabled={loading}
//         >
//           <FiLogOut className="menu-icon" /> {loading ? "Log out..." : "Logout"}
//         </button>
//       </div>
//     </aside>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FiBarChart2,
//   FiInbox,
//   FiSettings,
//   FiUsers,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";
// import "./Sidebaruser.css";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
//   const TOKEN = localStorage.getItem("auth_token");

//   const menuItems = [
//     { name: "Overview", icon: <FiBarChart2 />, path: "/dashboard" },
//     { name: "Inbox", icon: <FiInbox />, path: "/support" },
//     { name: "Configuration", icon: <FiSettings />, path: "/prompt" },
//     { name: "Agent", icon: <FiUsers />, path: "/agent" },
//   ];

//   // Detect active item from current URL path
//   const getActiveItem = () => {
//     const found = menuItems.find((item) =>
//       location.pathname.startsWith(item.path)
//     );
//     if (found) return found.name;
//     if (location.pathname.startsWith("/account")) return "Account";
//     return "";
//   };

//   const active = getActiveItem();

//   const handleClick = (item) => {
//     // No need to manually setActive anymore
//     navigate(item.path);
//   };

//   const handleAccountClick = () => {
//     navigate("/account");
//   };

//   const handleLogout = async () => {
//     if (!window.confirm("Are you sure you want to logout?")) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.message || "Logged out successfully!");
//         localStorage.clear();
//         navigate("/");
//       } else {
//         alert(`⚠️ Logout failed: ${data.detail || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Logout Error:", err);
//       alert("❌ Network Error during logout!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <aside className="sidebar-glass">
//       {/* Header */}
//       <div className="sidebar-header">
//         <h2 className="sidebar-logo">HelpDesk</h2>
//       </div>

//       {/* Menu */}
//       <nav className="sidebar-menu">
//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => handleClick(item)}
//             className={`menu-item ${active === item.name ? "active" : ""}`}
//           >
//             <span className="menu-icon">{item.icon}</span>
//             <span className="menu-text">{item.name}</span>
//           </button>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         <button
//           className={`footer-item ${active === "Account" ? "active" : ""}`}
//           onClick={handleAccountClick}
//         >
//           <FiUser className="menu-icon" /> Account
//         </button>
//         <button
//           className={`footer-item logout ${loading ? "disabled" : ""}`}
//           onClick={handleLogout}
//           disabled={loading}
//         >
//           <FiLogOut className="menu-icon" /> {loading ? "Log out..." : "Logout"}
//         </button>
//       </div>
//     </aside>
//   );
// }


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBarChart2,
  FiInbox,
  FiSettings,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebaruser.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const TOKEN = localStorage.getItem("auth_token");

  const menuItems = [
    { name: "Overview", icon: <FiBarChart2 />, path: "/dashboard" },
    { name: "Inbox", icon: <FiInbox />, path: "/support" },
    { name: "Configuration", icon: <FiSettings />, path: "/prompt" },
    { name: "Agent", icon: <FiUsers />, path: "/agent" },
  ];

  // Detect active item from current URL path
  const getActiveItem = () => {
    const found = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (found) return found.name;
    if (location.pathname.startsWith("/account")) return "Account";
    return "";
  };

  const active = getActiveItem();

  const handleClick = (item) => {
    navigate(item.path);
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Logged out successfully!");
        localStorage.clear();
        navigate("/");
      } else {
        alert(`⚠️ Logout failed: ${data.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Logout Error:", err);
      alert("❌ Network Error during logout!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="sidebar-container">
      {/* TOP: logo + main menu */}
      <div className="sidebar-top">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">HelpDesk</h2>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`menu-item ${
                active === item.name ? "active" : ""
              }`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* BOTTOM: Account + Logout */}
      <div className="sidebar-footer">
        <button
          className={`footer-item ${
            active === "Account" ? "active" : ""
          }`}
          onClick={handleAccountClick}
        >
          <FiUser className="menu-icon" /> Account
        </button>

        <button
          className={`footer-item logout ${
            loading ? "disabled" : ""
          }`}
          onClick={handleLogout}
          disabled={loading}
        >
          <FiLogOut className="menu-icon" />{" "}
          {loading ? "Log out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
