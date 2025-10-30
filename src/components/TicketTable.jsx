import React, { useEffect, useState } from "react";
import "./TicketTable.css";

export default function TicketTable() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const TOKEN = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/agents?skip=0&limit=50&status_filter=A`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(`API Error ${res.status}`);
        const data = await res.json();

        // ✅ Use data.agents from your API response
        setAgents(Array.isArray(data) ? data : data.agents || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // 🌀 Loading
  if (loading) {
    return (
      <div className="latest-tickets glass-card">
        <p className="loading-text">Loading agents...</p>
      </div>
    );
  }

  // ⚠️ Error
  if (error) {
    return (
      <div className="latest-tickets glass-card">
        <p className="error-text">⚠️ Failed to load: {error}</p>
      </div>
    );
  }

  // 🚫 No data
  if (!agents || agents.length === 0) {
    return (
      <div className="latest-tickets glass-card">
        <p className="error-text">No active agents found.</p>
      </div>
    );
  }

  // ✅ Table
  return (
    <div className="latest-tickets glass-card">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Agent ID</th>
            <th>Tenant ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.agent_id}>
              <td>{agent.agent_id}</td>
              <td>{agent.tenant_id}</td>
              <td>{agent.agent_name}</td>
              <td>{agent.agent_email || "—"}</td>
              <td>
                <span
                  className={`status-badge ${
                    agent.status === "A" ? "status-active" : "status-inactive"
                  }`}
                >
                  {agent.status === "A" ? "Active" : "Inactive"}
                </span>
              </td>
              <td>{agent.last_login ? agent.last_login : "Never"}</td>
              <td>{new Date(agent.created_on).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
