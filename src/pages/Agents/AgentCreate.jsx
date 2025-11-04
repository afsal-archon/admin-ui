// import React, { useState } from "react";
// import "./AgentCreate.css";

// export default function AgentCreate() {
//   const [formData, setFormData] = useState({
//     agent_id: "",
//     agent_name: "",
//     agent_email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
//   const TOKEN = localStorage.getItem("auth_token");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch(`${BASE_URL}/agents`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Agent created successfully!");
//         setFormData({ agent_id: "", agent_name: "", agent_email: "", password: "" });
//       } else {
//         setMessage(`❌ Error: ${data.detail || "Failed to create agent"}`);
//       }
//     } catch (err) {
//       setMessage(`⚠️ Network Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="agent-glass-container">
//       <div className="agent-card">
//         <h2 className="agent-title">Create New Agent</h2>
//         <form className="agent-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Agent ID</label>
//             <input
//               type="text"
//               name="agent_id"
//               placeholder="e.g., agent001"
//               value={formData.agent_id}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="agent_name"
//               placeholder="e.g., Alice Johnson"
//               value={formData.agent_name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="agent_email"
//               placeholder="e.g., alice@example.com"
//               value={formData.agent_email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="********"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Creating..." : "Create Agent"}
//           </button>
//         </form>

//         {message && <p className="response-message">{message}</p>}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./AgentCreate.css";

export default function AgentCreate() {
  const [formData, setFormData] = useState({
    agent_name: "",
    agent_email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const TOKEN = localStorage.getItem("auth_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/agents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_name: formData.agent_name,
          agent_email: formData.agent_email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Agent created successfully!");
        setFormData({ agent_name: "", agent_email: "", password: "" });
      } else {
        setMessage(`❌ Error: ${data.detail || "Failed to create agent"}`);
      }
    } catch (err) {
      console.error("Error creating agent:", err);
      setMessage(`⚠️ Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-glass-container">
      <div className="agent-card">
        <h2 className="agent-title">Create New Agent</h2>

        <form className="agent-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="agent_name"
              placeholder="e.g., Alice Smith"
              value={formData.agent_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="agent_email"
              placeholder="e.g., alice@example.com"
              value={formData.agent_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Agent"}
          </button>
        </form>

        {message && <p className="response-message">{message}</p>}
      </div>
    </div>
  );
}