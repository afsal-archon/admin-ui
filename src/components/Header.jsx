import React, { useEffect, useState } from "react";

export default function Header() {
  const [agentStatus, setAgentStatus] = useState("offline");

  // ✅ Example: fetch real-time agent status from backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/agent/status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("agent_token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch agent status");
        const data = await res.json();
        setAgentStatus(data.status || "offline");
      } catch {
        setAgentStatus("offline");
      }
    };
    fetchStatus();
  }, []);

  return (
    <header className="header">
      <div>
        <h1>Welcome Back!</h1>
        {/* <p>Here’s what’s happening with your support today</p> */}
      </div>

      {/* ✅ White Circle Placeholder + Status Dot */}
      <div className="profile">
        <div className="profile-img-wrapper">
          <div className="profile-circle"></div>
          <span className={`status-dot ${agentStatus}`}></span>
        </div>
      </div>
    </header>
  );
}
