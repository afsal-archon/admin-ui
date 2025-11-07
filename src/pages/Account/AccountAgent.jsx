import React, { useEffect, useState } from "react";
import SidebarAgent from "../../components/SidebarAgent";
import "../../styles/account.css";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("agent_token");

  const BASE_URL = "http://localhost:8000/api/auth/me";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(BASE_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log("✅ Agent Profile:", data);
        setProfile(data);
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        setError("Unable to load profile. Please check your token or re-login.");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  return (
    <div className="dashboard-layout">
      <SidebarAgent />

      <main className="main-content">
        <h2 className="page-title">My Account</h2>

        {/* Error or Loading States */}
        {error && <p className="error-text">{error}</p>}
        {!profile && !error && <p className="info-text">Loading profile...</p>}

        {/* Profile Card */}
        {profile && (
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.agent_name}`}
                alt="Agent Avatar"
                className="profile-avatar"
              />
              <div>
                <h3>{profile.agent_name}</h3>
                <span>{profile.username}</span>
              </div>
            </div>

            <div className="profile-details">
              <p>
                <strong>Tenant ID:</strong> {profile.tenant_id}
              </p>
              <p>
                <strong>Agent ID:</strong> {profile.agent_id}
              </p>
              <p>
                <strong>User Type:</strong> {profile.user_type}
              </p>
            </div>

            <div className="profile-actions">
              {/* <button className="edit-btn">Edit Profile</button> */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
