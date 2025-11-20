// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Lock, Key, MessageSquare } from "lucide-react";
// import "./PromptPage.css";

// export default function PromptPage() {
//   const [apiKey, setApiKey] = useState("");
//   const [showKey, setShowKey] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateKey = (key) => key.startsWith("sk-");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!apiKey || !prompt) {
//       alert("Please enter your OpenAI key and a prompt first!");
//       return;
//     }

//     if (!validateKey(apiKey)) {
//       alert("❌ Invalid OpenAI key format. It should start with 'sk-'.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: "test" }],
//         }),
//       });

//       if (!res.ok) throw new Error("Invalid API key");

//       const data = await res.json();
//       if (data.choices) {
//         localStorage.setItem("openai_key", apiKey);
//         setSuccess(true);
//         setTimeout(() => navigate("/dashboard"), 2000);
//       }
//     } catch (err) {
//       alert("❌ Invalid or expired API key!");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="prompt-layout">
//       {success && (
//         <div className="success-banner">
//           ✅ Success! Redirecting to dashboard...
//         </div>
//       )}
//       <div className="prompt-container">
//         <h1 className="prompt-title">
//           OpenAI Prompt Configuration
//         </h1>
//         <p className="prompt-subtitle">
//           {/* Securely validate your API key and test your prompt. */}
//         </p>

//         <form onSubmit={handleSubmit} className="prompt-form">
//           <label className="input-label">
//             <Key size={18} className="label-icon" /> OpenAI API Key
//           </label>
//           <div className="input-wrapper">
//             <input
//               type={showKey ? "text" : "password"}
//               placeholder="Enter your API key"
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//               className="input-field"
//             />
//           </div>

//           <label className="input-label">
//             <MessageSquare size={18} className="label-icon" /> Your Prompt
//           </label>
//           <textarea
//             rows="4"
//             placeholder="Type your prompt here..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="textarea-field"
//           ></textarea>

//           <button type="submit" className="submit-btn" disabled={loading}>
//              {loading ? "Validating..." : "Submit Prompt"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Key, MessageSquare } from "lucide-react";
import "./PromptPage.css";

export default function PromptPage() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");          // 👈 no default prompt
  const [modelName, setModelName] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateKey = (key) => key.startsWith("sk-");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey || !prompt) {
      alert("Please enter your OpenAI key and a base prompt first!");
      return;
    }

    if (!validateKey(apiKey)) {
      alert("❌ Invalid OpenAI key format. It should start with 'sk-'.");
      return;
    }

    const tenantAdminToken = localStorage.getItem("tenant_admin_token");
    if (!tenantAdminToken) {
      alert("❌ Missing tenant admin token. Please login again.");
      return;
    }

    setLoading(true);
    try {
      // Try CREATE first
      let res = await fetch("/api/ai-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tenantAdminToken}`,
        },
        body: JSON.stringify({
          openai_api_key: apiKey,
          base_prompt: prompt,
          model_name: modelName,
          temperature: Number(temperature),
          max_tokens: Number(maxTokens),
        }),
      });

      // If POST fails, fallback to UPDATE
      if (!res.ok) {
        console.warn("POST /api/ai-config failed, trying PUT instead…", res.status);
        res = await fetch("/api/ai-config", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tenantAdminToken}`,
          },
          body: JSON.stringify({
            openai_api_key: apiKey,
            base_prompt: prompt,
            model_name: modelName,
            temperature: Number(temperature),
            max_tokens: Number(maxTokens),
          }),
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        console.error("AI config error:", res.status, errText);
        alert("❌ Failed to save AI configuration. Please check your key and try again.");
        return;
      }

      const data = await res.json();
      console.log("✅ AI config saved:", data);

      localStorage.setItem("ai_config_enabled", "true");

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("❌ Error saving AI config:", err);
      alert("❌ Unexpected error while saving AI configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-layout">
      {success && (
        <div className="success-banner">
          ✅ AI configuration saved! Redirecting to dashboard...
        </div>
      )}

      <div className="prompt-container">
        <h1 className="prompt-title">AI Configuration</h1>
        <p className="prompt-subtitle">
          Store your OpenAI settings and base system prompt for this tenant.
        </p>

        <form onSubmit={handleSubmit} className="prompt-form">
          {/* API Key */}
          <label className="input-label">
            <Key size={18} className="label-icon" /> OpenAI API Key
          </label>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter your OpenAI API key (sk-...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Base Prompt */}
          <label className="input-label">
            <MessageSquare size={18} className="label-icon" /> Base System Prompt
          </label>
          <textarea
            rows={6}
            placeholder="Type your base system prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="textarea-field"
          />

          {/* Model + Advanced settings */}
          <div className="advanced-row">
            <div className="advanced-col">
              <label className="input-label">Model</label>
              <select
                className="input-field"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              >
                <option value="gpt-4o-mini">gpt-4o-mini</option>
                <option value="gpt-4">gpt-4</option>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              </select>
            </div>

            <div className="advanced-col">
              <label className="input-label">Temperature (0–1)</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="advanced-col">
              <label className="input-label">Max Tokens</label>
              <input
                type="number"
                min="50"
                max="2000"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving AI config..." : "Save AI Configuration"}
          </button>
        </form>
      </div>
    </div>
  );
}

