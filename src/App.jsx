// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* 🔐 Authentication */
// import LoginPage from "./pages/LoginPage";

// /* 🧭 Main Dashboard & Modules */
// import Dashboard from "./pages/Dashboard/Dashboard";
// import SupportPage from "./pages/Support/SupportPage";
// import PromptPage from "./pages/Prompt/PromptPage";
// import AccountPage from "./pages/Account/AccountPage";

// /* 👥 Agent Management */
// import AgentCreate from "./pages/Agent/AgentCreate";

// /* 🆕 Agent Dashboard (New UI) */
// import DashboardAgent from "./pages/AgentDashboard/DashboardAgent";

// /* 📨 Inbox, Clients, Tasks (optional new modules) */
// import Inbox from "./pages/AgentDashboard/Inbox";
// import Clients from "./pages/Clients";
// import Tasks from "./pages/Tasks";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔐 Authentication Routes */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* 🧭 Main Admin Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* 💬 Support & Inbox */}
//         <Route path="/dashboard/support" element={<SupportPage />} />
//         <Route path="/inbox" element={<Inbox />} />

//         {/* 👥 Agent Management */}
//         <Route path="/pages/agent" element={<AgentCreate />} />

//         {/* ⚙️ Configuration & Settings */}
//         <Route path="/pages/prompt" element={<PromptPage />} />
//         <Route path="/pages/account" element={<AccountPage />} />

//         {/* 🆕 Agent Dashboard (Fixed) */}
//         <Route path="/agent-dashboard" element={<DashboardAgent />} />

//         {/* 👤 Other Pages */}
//         <Route path="/clients" element={<Clients />} />
//         <Route path="/tasks" element={<Tasks />} />

//         {/* 🚫 Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* 🔐 Authentication */
// import LoginPage from "./pages/LoginPage";

// /* 🧭 Main Dashboard & Modules */
// import Dashboard from "./pages/Dashboard/Dashboard";
// import SupportPage from "./pages/Support/SupportPage";
// import PromptPage from "./pages/Prompt/PromptPage";
// import AccountPage from "./pages/Account/AccountPage";

// /* 👥 Agent Management */
// import AgentCreate from "./pages/Agent/AgentCreate";

// /* 🆕 Agent Dashboard (New UI) */
// import DashboardAgent from "./pages/AgentDashboard/DashboardAgent";

// /* 📨 Inbox, Clients, Tasks */
// import Inbox from "./pages/AgentDashboard/Inbox";
// import Clients from "./pages/Clients";
// import Tasks from "./pages/Tasks";

// /* 💬 Conversation Management */
// import ConversationView from "./pages/AgentDashboard/ConversationView";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔐 Authentication Routes */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* 🧭 Main Admin Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* 💬 Support & Inbox */}
//         <Route path="/dashboard/support" element={<SupportPage />} />
//         <Route path="/inbox" element={<Inbox />} />

//         {/* 👥 Agent Management */}
//         <Route path="/pages/agent" element={<AgentCreate />} />

//         {/* ⚙️ Configuration & Settings */}
//         <Route path="/pages/prompt" element={<PromptPage />} />
//         <Route path="/pages/account" element={<AccountPage />} />

//         {/* 🆕 Agent Dashboard */}
//         <Route path="/agent-dashboard" element={<DashboardAgent />} />

//         {/* 💬 Conversation Management */}
//         <Route path="/conversation/:conversationId" element={<ConversationView />} />

//         {/* 👤 Other Pages */}
//         <Route path="/clients" element={<Clients />} />
//         <Route path="/tasks" element={<Tasks />} />

//         {/* 🚫 Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* 🔐 Authentication */
// import LoginPage from "./pages/LoginPage";

// /* 🧭 Main Admin Dashboard & Modules */
// import Dashboard from "./pages/Dashboard/Dashboard";
// import SupportPage from "./pages/Support/SupportPage";
// import PromptPage from "./pages/Prompt/PromptPage";

// /* ⚙️ Account & Profile Page (Agent/Tenant) */
// import AccountAgent from "./pages/Account/AccountPage";

// /* 👥 Agent Management */
// // import AccountAgent from "./pages/Agent/AccountAgent";

// /* 🆕 Agent Dashboard (Modern UI) */
// import DashboardAgent from "./pages/AgentDashboard/DashboardAgent";

// /* 📨 Inbox, Clients, Tasks */
// import Inbox from "./pages/AgentDashboard/Inbox";
// import Clients from "./pages/Clients";
// import Tasks from "./pages/Tasks";

// /* 💬 Conversation Management */
// import ConversationView from "./pages/AgentDashboard/ConversationView";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔐 Authentication */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* 🧭 Tenant Dashboard (Admin Side) */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/support" element={<SupportPage />} />
//         <Route path="/prompt" element={<PromptPage />} />

//         {/* 👥 Agent Management */}
//         <Route path="/agent" element={<AgentCreate />} />

//         {/* 🧭 Agent Dashboard Routes */}
//         <Route path="/agent-dashboard" element={<DashboardAgent />} />
//         <Route path="/inbox" element={<Inbox />} />
//         <Route path="/conversation/:conversationId" element={<ConversationView />} />
//         <Route path="/clients" element={<Clients />} />
//         <Route path="/tasks" element={<Tasks />} />

//         {/* 👤 Account / Profile */}
//         <Route path="/account-agent" element={<AccountAgent />} />

//         {/* 🚫 Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






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
