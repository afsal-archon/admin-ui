import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInbox,
  FaCog,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/dashboardagent.css";

export default function SidebarAgent() {
  const navigate = useNavigate();

  // ✅ Universal Logout Function
  const handleLogout = () => {
    // Clear all tokens and session data
    localStorage.removeItem("agent_token");
    localStorage.removeItem("tenant_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("username");
    localStorage.removeItem("tenant_id");
    localStorage.removeItem("agent_username");
    localStorage.removeItem("expires_in");

    // Optional: clear all localStorage (if you want a full reset)
    // localStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });

    // Optionally reload the page (ensures clean state)
    window.location.reload();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="brand">HelpDesk</h2>
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => navigate("/agent-dashboard")}>
          <FaHome className="menu-icon" /> Overview
        </li>

        <li onClick={() => navigate("/inbox")}>
          <FaInbox className="menu-icon" /> Inbox
        </li>

        <li onClick={() => navigate("/conversation/cnv_a853816fefa4")}>
          <FaCog className="menu-icon" /> Chats
        </li>

        <li onClick={() => navigate("/account-agent")}>
          <FaUserTie className="menu-icon" /> Agent
        </li>

        <li className="logout-item" onClick={handleLogout}>
          <FaSignOutAlt className="menu-icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}
