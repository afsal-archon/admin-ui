import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isAgentLogin, setIsAgentLogin] = useState(false); // toggle between tenant/agent
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/api"; // backend root

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    console.log("🟢 Login started:", form, "Type:", isAgentLogin ? "Agent" : "Tenant");

    try {
      // ✅ Choose endpoint based on login type
      const loginEndpoint = isAgentLogin
        ? `${BASE_URL}/auth/agent/login`
        : `${BASE_URL}/auth/tenant/login`;

      // ✅ Prepare request body
      const body = isAgentLogin
        ? { username: form.username, password: form.password } // Agent API expects agent_email
        : { username: form.username, password: form.password }; // Tenant API expects username

      const res = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("📩 Login API response:", res.status, res.statusText);
      const data = await res.json();
      console.log("📦 Login API data:", data);

      // ✅ Success
      if (res.ok && data.access_token) {
        console.log("✅ Login successful!");

        // Save login data to localStorage
        localStorage.setItem("auth_token", data.access_token);
        localStorage.setItem("username", form.username);
        localStorage.setItem("user_type", data.user_type || (isAgentLogin ? "agent" : "tenant"));
        localStorage.setItem("tenant_id", data.tenant_id || "");
        localStorage.setItem("expires_in", data.expires_in || 0);

        setMessage("✅ Login successful!");

        // ✅ Role-based redirection
        console.log("➡️ Redirecting to respective dashboard...");
        setTimeout(() => {
          if (isAgentLogin || data.user_type === "agent") {
            navigate("/agent-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        console.error("❌ Login failed:", data.detail || data.error || "Invalid credentials");
        setMessage(`❌ ${data.detail || data.error || "Invalid credentials"}`);
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
        <h2 className="auth-title">
          {isAgentLogin ? "Agent Login " : "Tenant Login "}
        </h2>
        <p className="auth-subtitle">
          {isAgentLogin
            ? "Login to your Agent Console"
            : "Login to your HelpDesk Dashboard"}
        </p>

        {/* Username or Agent Email */}
        <input
          type="text"
          name="username"
          placeholder={isAgentLogin ? "Agent Email" : "Username"}
          value={form.username}
          onChange={handleChange}
          className="auth-input"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        {/* Login Button */}
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Feedback message */}
        {message && <p className="response-msg">{message}</p>}

        {/* Switch between Tenant/Agent */}
        <p className="auth-footer">
          {isAgentLogin ? (
            <>
              Not an agent?{" "}
              <span
                style={{ color: "#f97316", cursor: "pointer" }}
                onClick={() => setIsAgentLogin(false)}
              >
                Switch to Tenant Login
              </span>
            </>
          ) : (
            <>
              Are you an agent?{" "}
              <span
                style={{ color: "#f97316", cursor: "pointer" }}
                onClick={() => setIsAgentLogin(true)}
              >
                Switch to Agent Login
              </span>
            </>
          )}
        </p>

        {/* Redirect to Signup */}
        <p className="auth-footer">
          Don’t have an account?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
