// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";
// // import "../../styles/dashboardagent.css";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [isAgentLogin, setIsAgentLogin] = useState(false);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const BASE_URL = "http://127.0.0.1:8000/api";

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     console.log("🟢 Login started:", form, "Type:", isAgentLogin ? "Agent" : "Tenant");

//     try {
//       const loginEndpoint = isAgentLogin
//         ? `${BASE_URL}/auth/agent/login`
//         : `${BASE_URL}/auth/tenant/login`;

//       const body = {
//         username: form.username,
//         password: form.password,
//       };

//       const res = await fetch(loginEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       console.log("📩 Login API response:", res.status, res.statusText);
//       const data = await res.json();
//       console.log("📦 Login API data:", data);

//       if (res.ok && data.access_token) {
//         console.log("✅ Login successful!");

//         // // Save credentials
//         // localStorage.setItem("auth_token", data.access_token);
//         // localStorage.setItem("username", form.username);
//         // localStorage.setItem("user_type", data.user_type || (isAgentLogin ? "agent" : "tenant"));
//         // localStorage.setItem("tenant_id", data.tenant_id || "");
//         // localStorage.setItem("expires_in", data.expires_in || 0);
//          if (isAgentLogin) {
//           localStorage.setItem("agent_token", data.access_token);
//           localStorage.setItem("agent_username", form.username);
//           localStorage.setItem("tenant_id", data.tenant_id || "");
//           localStorage.setItem("user_type", "agent");
//           console.log("💾 Agent token stored:", data.access_token);
//         } else {
//           localStorage.setItem("tenant_token", data.access_token);
//           localStorage.setItem("tenant_username", form.username);
//           localStorage.setItem("tenant_id", data.tenant_id || "");
//           localStorage.setItem("user_type", "tenant");
//           console.log("💾 Tenant token stored:", data.access_token);
//         }

//         setMessage("✅ Login successful!");

//         // ✅ Updated redirection logic
//         console.log("➡️ Redirecting to respective dashboard...");
//         setTimeout(() => {
//           if (isAgentLogin || data.user_type === "agent") {
//             // 🔥 redirect agent to Agent Dashboard
//             navigate("/agent-dashboard");
//           } else {
//             // default tenant dashboard
//             navigate("/dashboard");
//           }
//         }, 1000);
//       } else {
//         console.error("❌ Login failed:", data.detail || data.error || "Invalid credentials");
//         setMessage(`❌ ${data.detail || data.error || "Invalid credentials"}`);
//       }
//     } catch (err) {
//       console.error("🔥 Network Error:", err);
//       setMessage(`⚠️ Network Error: ${err.message}`);
//     } finally {
//       console.log("🔚 Login process finished.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <form onSubmit={handleSubmit} className="auth-card">
//         <h2 className="auth-title">
//           {isAgentLogin ? "Agent Login" : "Tenant Login"}
//         </h2>
//         <p className="auth-subtitle">
//           {isAgentLogin
//             ? "Login to your Agent Dashboard"
//             : "Login to your HelpDesk Dashboard"}
//         </p>

//         <input
//           type="text"
//           name="username"
//           placeholder={isAgentLogin ? "Agent Email" : "Username"}
//           value={form.username}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />

//         <button type="submit" className="auth-btn" disabled={loading}>
//           {loading ? "Signing in..." : "Sign In"}
//         </button>

//         {message && <p className="response-msg">{message}</p>}

//         {/* Switch Login Mode */}
//         <p className="auth-footer">
//           {isAgentLogin ? (
//             <>
//               Not an agent?{" "}
//               <span
//                 style={{ color: "#f97316", cursor: "pointer" }}
//                 onClick={() => setIsAgentLogin(false)}
//               >
//                 Switch to Tenant Login
//               </span>
//             </>
//           ) : (
//             <>
//               Are you an agent?{" "}
//               <span
//                 style={{ color: "#f97316", cursor: "pointer" }}
//                 onClick={() => setIsAgentLogin(true)}
//               >
//                 Switch to Agent Login
//               </span>
//             </>
//           )}
//         </p>

//         {/* Redirect to Signup */}
//         <p className="auth-footer">
//           Don’t have an account?{" "}
//           <span
//             style={{ color: "#f97316", cursor: "pointer" }}
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";
// // import "../../styles/dashboardagent.css";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [isAgentLogin, setIsAgentLogin] = useState(false);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const BASE_URL = "http://127.0.0.1:8000/api";

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     console.log("🟢 Login started:", form, "Type:", isAgentLogin ? "Agent" : "Tenant");

//     try {
//       const loginEndpoint = isAgentLogin
//         ? `${BASE_URL}/auth/agent/login`
//         : `${BASE_URL}/auth/tenant/login`;

//       const body = {
//         username: form.username,
//         password: form.password,
//       };

//       const res = await fetch(loginEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       console.log("📩 Login API response:", res.status, res.statusText);
//       const data = await res.json();
//       console.log("📦 Login API data:", data);

//       if (res.ok && data.access_token) {
//         console.log("✅ Login successful!");

//         // // Save credentials
//         // localStorage.setItem("auth_token", data.access_token);
//         // localStorage.setItem("username", form.username);
//         // localStorage.setItem("user_type", data.user_type || (isAgentLogin ? "agent" : "tenant"));
//         // localStorage.setItem("tenant_id", data.tenant_id || "");
//         // localStorage.setItem("expires_in", data.expires_in || 0);
//          if (isAgentLogin) {
//           localStorage.setItem("agent_token", data.access_token);
//           localStorage.setItem("agent_username", form.username);
//           localStorage.setItem("tenant_id", data.tenant_id || "");
//           localStorage.setItem("user_type", "agent");
//           console.log("💾 Agent token stored:", data.access_token);
//         } else {
//           localStorage.setItem("tenant_token", data.access_token);
//           localStorage.setItem("tenant_username", form.username);
//           localStorage.setItem("tenant_id", data.tenant_id || "");
//           localStorage.setItem("user_type", "tenant");
//           console.log("💾 Tenant token stored:", data.access_token);
//         }

//         setMessage("✅ Login successful!");

//         // ✅ Updated redirection logic
//         console.log("➡️ Redirecting to respective dashboard...");
//         setTimeout(() => {
//           if (isAgentLogin || data.user_type === "agent") {
//             // 🔥 redirect agent to Agent Dashboard
//             navigate("/agent-dashboard");
//           } else {
//             // default tenant dashboard
//             navigate("/dashboard");
//           }
//         }, 1000);
//       } else {
//         console.error("❌ Login failed:", data.detail || data.error || "Invalid credentials");
//         setMessage(`❌ ${data.detail || data.error || "Invalid credentials"}`);
//       }
//     } catch (err) {
//       console.error("🔥 Network Error:", err);
//       setMessage(`⚠️ Network Error: ${err.message}`);
//     } finally {
//       console.log("🔚 Login process finished.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <form onSubmit={handleSubmit} className="auth-card">
//         <h2 className="auth-title">
//           {isAgentLogin ? "Agent Login" : "Tenant Login"}
//         </h2>
//         <p className="auth-subtitle">
//           {isAgentLogin
//             ? "Login to your Agent Dashboard"
//             : "Login to your HelpDesk Dashboard"}
//         </p>

//         <input
//           type="text"
//           name="username"
//           placeholder={isAgentLogin ? "Agent Email" : "Username"}
//           value={form.username}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />

//         <button type="submit" className="auth-btn" disabled={loading}>
//           {loading ? "Signing in..." : "Sign In"}
//         </button>

//         {message && <p className="response-msg">{message}</p>}

//         {/* Switch Login Mode */}
//         <p className="auth-footer">
//           {isAgentLogin ? (
//             <>
//               Not an agent?{" "}
//               <span
//                 style={{ color: "#f97316", cursor: "pointer" }}
//                 onClick={() => setIsAgentLogin(false)}
//               >
//                 Switch to Tenant Login
//               </span>
//             </>
//           ) : (
//             <>
//               Are you an agent?{" "}
//               <span
//                 style={{ color: "#f97316", cursor: "pointer" }}
//                 onClick={() => setIsAgentLogin(true)}
//               >
//                 Switch to Agent Login
//               </span>
//             </>
//           )}
//         </p>

//         {/* Redirect to Signup */}
//         <p className="auth-footer">
//           Don’t have an account?{" "}
//           <span
//             style={{ color: "#f97316", cursor: "pointer" }}
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isAgentLogin, setIsAgentLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const BASE_URL = "https://api.texef.com/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    console.log(
      "🟢 Login started:",
      form,
      "Type:",
      isAgentLogin ? "Agent" : "Tenant"
    );

    try {
      const loginEndpoint = isAgentLogin
        ? `${BASE_URL}/auth/agent/login`
        : `${BASE_URL}/auth/tenant/login`;

      const res = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("📦 Login API data:", data);

      if (res.ok && data.access_token) {
        console.log("✅ Login successful!");

        if (isAgentLogin) {
          localStorage.setItem("agent_token", data.access_token);
          localStorage.setItem("agent_username", form.username);
          localStorage.setItem("tenant_id", data.tenant_id || "");
          localStorage.setItem("user_type", "agent");
          localStorage.setItem("agent_id",data.agent_id);
          console.log("💾 Agent token stored:", data.access_token);
        } else {
          localStorage.setItem("auth_token", data.access_token);
          localStorage.setItem("tenant_username", form.username);
          localStorage.setItem("tenant_id", data.tenant_id || "");
          localStorage.setItem("user_type", "tenant");
          console.log("💾 Tenant token stored:", data.access_token);
        }

        setMessage("✅ Login successful!");

        // Redirect after 1 second
        setTimeout(() => {
          if (isAgentLogin) {
            navigate("/agent-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        console.error("❌ Login failed:", data.detail || data.error);
        setMessage(`❌ ${data.detail || data.error || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error("🔥 Network Error:", err);
      setMessage(`⚠️ Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">
          {isAgentLogin ? "Agent Login" : "Tenant Login"}
        </h2>
        <p className="auth-subtitle">
          {isAgentLogin
            ? "Login to your Agent Dashboard"
            : "Login to your HelpDesk Dashboard"}
        </p>

        {/* Username Input */}
        <input
          type="text"
          name="username"
          placeholder={isAgentLogin ? "Agent Email" : "Tenant Username"}
          value={form.username}
          onChange={handleChange}
          className="auth-input"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Feedback Message */}
        {message && <p className="response-msg">{message}</p>}

        {/* Toggle between Tenant / Agent */}
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
