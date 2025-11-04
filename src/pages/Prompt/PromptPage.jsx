import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Key, MessageSquare } from "lucide-react";
import "./PromptPage.css";

export default function PromptPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateKey = (key) => key.startsWith("sk-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey || !prompt) {
      alert("Please enter your OpenAI key and a prompt first!");
      return;
    }

    if (!validateKey(apiKey)) {
      alert("❌ Invalid OpenAI key format. It should start with 'sk-'.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "test" }],
        }),
      });

      if (!res.ok) throw new Error("Invalid API key");

      const data = await res.json();
      if (data.choices) {
        localStorage.setItem("openai_key", apiKey);
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      alert("❌ Invalid or expired API key!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-layout">
      {success && (
        <div className="success-banner">
          ✅ Success! Redirecting to dashboard...
        </div>
      )}
      <div className="prompt-container">
        <h1 className="prompt-title">
          OpenAI Prompt Configuration
        </h1>
        <p className="prompt-subtitle">
          {/* Securely validate your API key and test your prompt. */}
        </p>

        <form onSubmit={handleSubmit} className="prompt-form">
          <label className="input-label">
            <Key size={18} className="label-icon" /> OpenAI API Key
          </label>
          <div className="input-wrapper">
            <input
              type={showKey ? "text" : "password"}
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-field"
            />
          </div>

          <label className="input-label">
            <MessageSquare size={18} className="label-icon" /> Your Prompt
          </label>
          <textarea
            rows="4"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="textarea-field"
          ></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
             {loading ? "Validating..." : "Submit Prompt"}
          </button>
        </form>
      </div>
    </div>
  );
}
