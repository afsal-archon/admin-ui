import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import SupportPage from "./pages/Support/SupportPage";
import PromptPage from "./pages/Prompt/PromptPage";
import Accountpage from "./pages/Account/AccountPage";
import AgentCreate from "./pages/Agents/AgentCreate";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/Account" element={<Accountpage />} />
        <Route path="/Agent" element={<AgentCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
