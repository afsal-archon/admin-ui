import React from "react";
import "../styles/inbox.css";

export default function ConversationItem({ data }) {
  const {
    id,
    status,
    sentiment,
    unread_count,
    message_count,
    last_message,
    last_message_time,
    assigned_agent,
  } = data;

  return (
    <div className={`conversation-item ${unread_count > 0 ? "unread" : ""}`}>
      <div className="conversation-header">
        <span className={`status-badge ${status}`}>{status}</span>
        {assigned_agent.is_online && (
          <span className="online-indicator">● Online</span>
        )}
      </div>

      <div className="conversation-body">
        <p className="last-message">{last_message}</p>
        <div className="conversation-meta">
          <span className="agent-name">👤 {assigned_agent.name}</span>
          <span className="time">{last_message_time}</span>
        </div>
      </div>

      <div className="conversation-footer">
        <span className="msg-count">💬 {message_count}</span>
        {unread_count > 0 && (
          <span className="unread-badge">{unread_count}</span>
        )}
      </div>
    </div>
  );
}
