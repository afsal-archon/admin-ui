// import React from "react";
// import "../styles/inbox.css";

// export default function ConversationItem({ data }) {
//   const {
//     id,
//     status,
//     sentiment,
//     unread_count,
//     message_count,
//     last_message,
//     last_message_time,
//     assigned_agent,
//   } = data;

//   return (
//     <div className={`conversation-item ${unread_count > 0 ? "unread" : ""}`}>
//       <div className="conversation-header">
//         <span className={`status-badge ${status}`}>{status}</span>
//         {assigned_agent.is_online && (
//           <span className="online-indicator">● Online</span>
//         )}
//       </div>

//       <div className="conversation-body">
//         <p className="last-message">{last_message}</p>
//         <div className="conversation-meta">
//           <span className="agent-name">👤 {assigned_agent.name}</span>
//           <span className="time">{last_message_time}</span>
//         </div>
//       </div>

//       <div className="conversation-footer">
//         <span className="msg-count">💬 {message_count}</span>
//         {unread_count > 0 && (
//           <span className="unread-badge">{unread_count}</span>
//         )}
//       </div>
//     </div>
//   );
// }








import React from "react";
import "../styles/inbox.css"; // or adjust path if needed

export default function ConversationItem({ data }) {
  // ------------------------------
  // Safe field extraction
  // ------------------------------
  const id = data.id || data.conversation_id || "Unknown ID";
  const status = data.status || "unknown";
  const channel = data.channel || "web";

  // last_message: normalized in Inbox, but still keep safe
  let lastMessage = data.last_message;
  if (lastMessage && typeof lastMessage === "object") {
    // fallback – stringify object to avoid React error #31
    lastMessage =
      typeof lastMessage.text === "string"
        ? lastMessage.text
        : JSON.stringify(lastMessage);
  }
  if (!lastMessage) {
    lastMessage = "No messages yet";
  }

  // Agent info can be null
  const agent = data.assigned_agent || data.agent || null;
  const agentName = agent?.name || agent?.full_name || "Unassigned";
  const isOnline = agent?.is_online ?? false;

  // Unread count if backend sends it
  const unreadCount = data.unread_count || data.unread || 0;

  // Last updated time
  const updatedTs =
    data.updated_at || data.last_activity_at || data.last_message_at;
  let updatedLabel = "";
  if (updatedTs) {
    try {
      updatedLabel = new Date(updatedTs).toLocaleString();
    } catch {
      updatedLabel = updatedTs;
    }
  }

  // Status badge text
  const statusLabel =
    status === "resolved"
      ? "Closed"
      : status === "active"
      ? "Active"
      : status === "pending"
      ? "Pending"
      : status;

  return (
    <div className="conversation-item">
      {/* Left main section */}
      <div className="conversation-main">
        <div className="conversation-header-row">
          <div className="conversation-id-wrap">
            <span className="conversation-id">#{id}</span>
            <span className="conversation-channel">{channel}</span>
          </div>

          <span className={`conversation-status-pill status-${status}`}>
            {statusLabel}
          </span>
        </div>

        <div className="conversation-preview-row">
          <span className="conversation-last-message">{lastMessage}</span>
        </div>

        {updatedLabel && (
          <div className="conversation-meta-row">
            <span className="conversation-updated">Last update: {updatedLabel}</span>
          </div>
        )}
      </div>

      {/* Right meta section */}
      <div className="conversation-side">
        <div className="conversation-agent-info">
          <span
            className={`agent-status-dot ${
              isOnline ? "online" : "offline"
            }`}
            title={isOnline ? "Agent online" : "Agent offline / unassigned"}
          />
          <span className="agent-name">{agentName}</span>
        </div>

        {unreadCount > 0 && (
          <div className="conversation-unread-badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}

