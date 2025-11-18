import React, { useEffect, useState } from "react";
import "./AccountPage.css";

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    tenantId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "https://api.texef.com/api";
  const TOKEN = localStorage.getItem("auth_token");
  const TENANT_ID = localStorage.getItem("tenant_id");

  useEffect(() => {
    const fetchTenantData = async () => {
      if (!TENANT_ID || !TOKEN) {
        setError("⚠️ Tenant or auth token missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/tenants/${TENANT_ID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();

        setUser({
          name: data.tenant_name || "N/A",
          email: data.tenant_email || "N/A",
          tenantId: data.tenant_id || TENANT_ID,
        });
      } catch (err) {
        console.error("❌ Error fetching tenant data:", err);
        setError("Failed to load tenant info. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  if (loading)
    return (
      <div className="account-layout">
        <p className="loading-text">Loading account details...</p>
      </div>
    );

  if (error)
    return (
      <div className="account-layout">
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="account-layout">
      <div className="account-container glass-panel">
        <h1 className="account-title">Account Information</h1>
        <p className="account-subtitle"></p>

        <div className="account-field">
          <label>Name</label>
          <input type="text" value={user.name} readOnly />
        </div>

        <div className="account-field">
          <label>Email</label>
          <input type="text" value={user.email} readOnly />
        </div>

        <div className="account-field">
          <label>Tenant ID</label>
          <input type="text" value={user.tenantId} readOnly />
        </div>
      </div>
    </div>
  );
}
