import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    tenant_name: "",
    admin_username: "",
    admin_email: "",
    admin_password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "https://api.texef.com/api"; // ✅ backend base path

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/tenants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Tenant created successfully!");
        // optional: save tenant info or redirect
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(`❌ ${data.detail || "Error creating tenant"}`);
      }
    } catch (err) {
      setMessage(`⚠️ Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-card">
        <h2 className="signup-title">Create a New Tenant</h2>
        <p className="signup-subtitle">
          {/* Create your first HelpDesk admin account. */}
        </p>

        <input
          type="text"
          name="tenant_name"
          placeholder="Tenant Name"
          value={form.tenant_name}
          onChange={handleChange}
          className="signup-input"
          required
        />

        <input
          type="text"
          name="admin_username"
          placeholder="Admin Username"
          value={form.admin_username}
          onChange={handleChange}
          className="signup-input"
          required
        />

        <input
          type="email"
          name="admin_email"
          placeholder="Admin Email"
          value={form.admin_email}
          onChange={handleChange}
          className="signup-input"
          required
        />

        <input
          type="password"
          name="admin_password"
          placeholder="Admin Password"
          value={form.admin_password}
          onChange={handleChange}
          className="signup-input"
          required
        />

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Creating Tenant..." : "Create Tenant"}
        </button>

        {message && <p className="response-msg">{message}</p>}

        <p className="signup-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
