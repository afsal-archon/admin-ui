import React from "react";
import "./AccountPage.css";

export default function AccountPage() {
  // Example static user info — later you can replace with real user data (e.g. from API or context)
  const user = {
    name: "Afsal Basheer",
    email: "afsal.basheer@example.com",
    tenantId: "TENANT-984512",
  };

  return (
    <div className="account-layout">
      <div className="account-container glass-panel">
        <h1 className="account-title">👤 Account Information</h1>
        <p className="account-subtitle">Your profile details (read-only)</p>

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
