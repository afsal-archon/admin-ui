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



// const BASE_URL = "https://api.texef.com/api";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Key, MessageSquare } from "lucide-react";
// import "./PromptPage.css";

// export default function PromptPage() {
//   const [apiKey, setApiKey] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateKey = (key) => key.startsWith("sk-");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!apiKey) {
//       alert("Please enter your OpenAI key first!");
//       return;
//     }

//     if (!validateKey(apiKey)) {
//       alert("❌ Invalid OpenAI key format. It should start with 'sk-'.");
//       return;
//     }

//     // using auth_token as you set
//     const tenantAdminToken = localStorage.getItem("auth_token");
//     if (!tenantAdminToken) {
//       alert("❌ Missing tenant admin token. Please login again.");
//       return;
//     }

//     // Fixed defaults
//     const payload = {
//       openai_api_key: apiKey,
//       model_name: "gpt-4",
//       temperature: 0.9,
//       max_tokens: 1000,
//     };

//     // Only send base_prompt if user typed something
//     if (prompt.trim()) {
//       payload.base_prompt = prompt.trim();
//     }

//     setLoading(true);
//     try {
//       // CREATE
//       let res = await fetch(`${BASE_URL}/ai-config`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tenantAdminToken}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       // If POST fails, try UPDATE
//       if (!res.ok) {
//         console.warn(
//           "POST /ai-config failed, trying PUT instead…",
//           res.status
//         );
//         res = await fetch(`${BASE_URL}/ai-config`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tenantAdminToken}`,
//           },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!res.ok) {
//         const errText = await res.text();
//         console.error("AI config error:", res.status, errText);
//         alert("❌ Failed to save AI configuration. Please try again.");
//         return;
//       }

//       const data = await res.json();
//       console.log("✅ AI config saved:", data);

//       localStorage.setItem("ai_config_enabled", "true");

//       setSuccess(true);
//       setTimeout(() => navigate("/dashboard"), 2000);
//     } catch (err) {
//       console.error("❌ Error saving AI config:", err);
//       alert("❌ Unexpected error while saving AI configuration.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="prompt-layout">
//       {success && (
//         <div className="success-banner">
//           ✅ AI configuration saved! Redirecting to dashboard...
//         </div>
//       )}

//       <div className="prompt-container">
//         <h1 className="prompt-title">AI Configuration</h1>

//         <form onSubmit={handleSubmit} className="prompt-form">
//           {/* OpenAI API Key */}
//           <label className="input-label">
//             <Key size={18} className="label-icon" /> OpenAI API Key
//           </label>
//           <div className="input-wrapper">
//             <input
//               type="password"
//               placeholder="Enter your OpenAI API key (sk-...)"
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//               className="input-field"
//             />
//           </div>

//           {/* Base System Prompt */}
//           <label className="input-label">
//             <MessageSquare size={18} className="label-icon" /> Base System Prompt
//           </label>
//           <textarea
//             rows={6}
//             placeholder="Type your base system prompt here (optional)..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="textarea-field"
//           />

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Saving AI config..." : "Save AI Configuration"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


const BASE_URL = "https://api.texef.com/api";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PromptPage.css";

export default function PromptPage() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [botName, setBotName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateKey = (key) => key.startsWith("sk-");

  /* ---------------- Validate Avatar ----------------- */
  const validateAvatar = async (file) => {
    if (!file) return { ok: true };

    if (file.size > 20 * 1024) {
      return { ok: false, error: "Image must be under 20 KB." };
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 32 || img.height !== 32) {
          resolve({
            ok: false,
            error: "Image must be exactly 32×32 pixels.",
          });
        } else {
          resolve({ ok: true });
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  /* ---------------- Submit --------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey) {
      alert("Please enter your OpenAI key!");
      return;
    }

    if (!validateKey(apiKey)) {
      alert("❌ Invalid API key (must start with sk-)");
      return;
    }

    if (!botName.trim()) {
      alert("❌ Bot name is required.");
      return;
    }

    const avatarCheck = await validateAvatar(avatarFile);
    if (!avatarCheck.ok) {
      alert("❌ " + avatarCheck.error);
      return;
    }

    let avatarBase64 = null;
    if (avatarFile) {
      const reader = new FileReader();
      const result = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(avatarFile);
      });
      avatarBase64 = result;
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("Missing admin token. Please login again.");
      return;
    }

    const payload = {
      openai_api_key: apiKey,
      model_name: "gpt-4",
      temperature: 0.9,
      max_tokens: 1000,
      bot_name: botName.trim(),
      avatar_image: avatarBase64,
    };

    if (prompt.trim()) {
      payload.base_prompt = prompt.trim();
    }

    setLoading(true);

    try {
      let res = await fetch(`${BASE_URL}/ai-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        res = await fetch(`${BASE_URL}/ai-config`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        alert("❌ Failed to save configuration.");
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-layout">
      {success && (
        <div className="success-banner">
          ✅ AI configuration saved! Redirecting...
        </div>
      )}

      <div className="prompt-container">
        <h1 className="prompt-title">AI Configuration</h1>

        <form onSubmit={handleSubmit} className="prompt-form">
          {/* OpenAI API Key */}
          <label className="input-label">OpenAI API Key</label>
          <input
            type="password"
            placeholder="Enter OpenAI API key (sk-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input-field"
          />

          {/* Bot Name */}
          <label className="input-label">Bot Name</label>
          <input
            type="text"
            placeholder="Enter your bot name"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="input-field"
          />

          {/* Avatar Upload */}
          <label className="input-label">Bot Avatar (32×32, under 20 KB)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="input-field"
          />

          {/* Base Prompt */}
          <label className="input-label">Base System Prompt (Optional)</label>
          <textarea
            rows={6}
            placeholder="Enter your base system prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="textarea-field"
          ></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Configuration"}
          </button>
        </form>
      </div>
    </div>
  );
}
