import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import SupportPage from "./pages/Support/SupportPage";
import LoginPage from "./pages/LoginPage";
import PromptPage from "./pages/Prompt/PromptPage"; // 👈 Import your new Prompt page
import AccountPage from "./pages/Account/AccountPage";
import AgentCreate from "./pages/Agent/AgentCreate";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Login Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Overview */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Support Page (Inbox redirect target) */}
        <Route path="/dashboard/support" element={<SupportPage />} />

        {/* ⚙️ New Configuration → Prompt Page */}
        <Route path="/pages/prompt" element={<PromptPage />} />

        <Route path="/pages/account" element={<AccountPage />} />
        
        <Route path="/pages/agent"element={AgentCreate}/>
      </Routes>
    </Router>
  );
}

export default App;
