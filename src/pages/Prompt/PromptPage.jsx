import React, { useState } from "react";
import "./PromptPage.css";

export default function PromptPage() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey || !prompt) {
      alert("Please enter your OpenAI key and a prompt first!");
      return;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || "No response found");
    } catch (err) {
      console.error(err);
      setResponse("Error fetching response. Check your API key or network.");
    }
  };

  return (
    <div className="prompt-layout">
      <div className="prompt-container glass-panel">
        <h1 className="title"> OpenAI Prompt </h1>
        <p className="subtitle">
          Test your OpenAI prompts instantly in a sleek glassmorphic interface.
        </p>

        <form onSubmit={handleSubmit} className="prompt-form">
          <label>🔑 OpenAI API Key</label>
          <input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />

          <label>💬 Your Prompt</label>
          <textarea
            rows="5"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <button type="submit" className="submit-btn">
            🚀 Submit Prompt
          </button>
        </form>

        {response && (
          <div className="response-box">
            <h3>🧠 AI Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
