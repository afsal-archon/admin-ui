import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [active, setActive] = useState("Overview");
  const navigate = useNavigate();

  // Menu configuration with routes
  // Menu configuration with routes
const menuItems = [
  { name: "Overview", icon: "📊", path: "/dashboard" },
  { name: "Inbox", icon: "📥", path: "/support" }, // ✅ Correct route path
  { name: "Configuration", icon: "👥", path: "/prompt" },
  { name: "Agent", icon: "📄", path: "/Agent" },
];

 // Handle menu clicks
  const handleClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  // Handle account redirect
  const handleAccountClick = () => {
    setActive("Account");
    navigate("/account");
  };

  // Handle logout (you can later add logic to clear auth)
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <aside className="sidebar-glass">
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">HelpDesk</h2>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item)}
            className={`menu-item ${active === item.name ? "active" : ""}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className={`footer-item ${active === "Account" ? "active" : ""}`}
          onClick={handleAccountClick}
        >
          👤 Account
        </button>
        <button className="footer-item logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
