import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/api"; // ✅ backend API root

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    console.log("🟢 Login started with data:", form);

    try {
      // ✅ 1. Send login request
      const res = await fetch(`${BASE_URL}/auth/tenant/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log("📩 Login API response:", res.status, res.statusText);

      const data = await res.json();
      console.log("📦 Login API data:", data);

      // ✅ 2. Check for token
      if (res.ok && data.access_token) {
        console.log("✅ Login successful, saving token...");

        localStorage.setItem("auth_token", data.access_token);
        localStorage.setItem("username", form.username);

        // ✅ 3. Fetch tenant info
        console.log("📡 Fetching tenant info...");
        const tenantRes = await fetch(`${BASE_URL}/tenant/info`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });

        console.log("📩 Tenant Info Response:", tenantRes.status, tenantRes.statusText);
        const tenantData = await tenantRes.json();
        console.log("🏢 Tenant Data:", tenantData);

        if (tenantRes.ok) {
          localStorage.setItem("tenant_id", tenantData.tenant_id);
          localStorage.setItem("tenant_name", tenantData.tenant_name);
          console.log("💾 Tenant info saved:", {
            tenant_id: tenantData.tenant_id,
            tenant_name: tenantData.tenant_name,
          });
        } else {
          console.warn("⚠️ Tenant info fetch failed:", tenantData);
        }

        setMessage("✅ Login successful!");
        console.log("➡️ Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        console.error("❌ Login failed:", data.detail || "Invalid credentials");
        setMessage(`❌ ${data.detail || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error("🔥 Network Error:", err);
      setMessage(`⚠️ Network Error: ${err.message}`);
    } finally {
      console.log("🔚 Login process finished.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your HelpDesk Dashboard</p>

        {/* ✅ Username field */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {message && <p className="response-msg">{message}</p>}

        <p className="auth-footer">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
