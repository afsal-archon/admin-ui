// ✅ Elegant & Classic MemberCard Design
import React from "react";
import "./MemberCard.css";

export default function MemberCard({ name, role, avatar, status }) {
  const userName = name || "Unknown Member";
  const userRole = role || "Support Agent";
  const userAvatar = avatar || "https://via.placeholder.com/60";

  const statusColor =
    status === "online"
      ? "status-online"
      : status === "busy"
      ? "status-busy"
      : "status-offline";

  const statusText = status || "offline";

  return (
    <div className="member-card">
      {/* Left: Avatar and Info */}
      <div className="member-info">
        <div className="avatar-wrapper">
          <img src={userAvatar} alt={userName} className="member-avatar" />
          <span className={`status-dot ${statusColor}`}></span>
        </div>
        <div className="member-text">
          <h4>{userName}</h4>
          <p>{userRole}</p>
        </div>
      </div>

      {/* Right: Status badge */}
      <div className="status-badge">
        <span className={`status-pill ${statusColor}`}>{statusText}</span>
      </div>
    </div>
  );
}
