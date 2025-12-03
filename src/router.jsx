import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* 🔐 Authentication Pages */
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

/* 🧭 Dashboard & Modules */
import Dashboard from "./pages/Dashboard/Dashboard";
import SupportPage from "./pages/Support/SupportPage";
import PromptPage from "./pages/Prompt/PromptPage";
import AccountPage from "./pages/Account/AccountPage";
import AgentCreate from "./pages/Agents/AgentCreate";

/* 👥 Agent Management */
import AccountAgent from "./pages/Account/AccountAgent"; // ✅ this is your Agent page now

/* 🆕 Modern Agent Dashboard */
import DashboardAgent from "./pages/AgentDashboard/DashboardAgent";
import Inbox from "./pages/AgentDashboard/Inbox";

/* 💬 Conversation Management */
import ConversationView from "./pages/AgentDashboard/ConversationView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Authentication */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🧭 Tenant Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/agent" element={<AgentCreate />} />
        

        {/* 🧭 Agent Dashboard */}
        <Route path="/agent-dashboard" element={<DashboardAgent />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/conversation/:conversationId" element={<ConversationView />} />
        <Route path="/account-agent" element={<AccountAgent />} /> {/* ✅ Agent Management Page */}

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
