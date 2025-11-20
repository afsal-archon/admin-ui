// import React, { useState, useEffect } from "react";
// import SidebarAgent from "../../components/SidebarAgent";
// import Header from "../../components/Header";
// import ConversationItem from "../../components/ConversationItem";
// import "../../styles/inbox.css";
// import { FaFilter, FaSync } from "react-icons/fa";

// export default function Inbox() {
//   const [filters, setFilters] = useState({
//     type: "active", // active | waiting | history
//   });

//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Make sure this matches your backend port (FastAPI/Express)
//   const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/agent/conversations";

//   const token = localStorage.getItem("agent_token");

//   // 🔹 Fetch Conversations from API
//   const fetchConversations = async () => {
//     setLoading(true);
//     setError("");

//     // ✅ select correct endpoint
//     let endpoint = `${BASE_URL}/active`;
//     if (filters.type === "waiting") endpoint = `${BASE_URL}/waiting`;
//     if (filters.type === "history") endpoint = `${BASE_URL}/history`;

//     try {
//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       // Handle 404 or backend errors gracefully
//       if (!res.ok) {
//         if (res.status === 404) {
//           setConversations([]);
//           setError("No such endpoint found (404). Check backend URL.");
//           return;
//         }
//         throw new Error(`HTTP ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("✅ Conversations:", data);

//       if (Array.isArray(data)) {
//         setConversations(data);
//       } else if (data?.conversations) {
//         setConversations(data.conversations);
//       } else {
//         setConversations([]);
//       }
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Failed to load conversations. Check server connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Fetch on mount & when filter changes
//   useEffect(() => {
//     fetchConversations();
//   }, [filters.type]);

//   return (
//     <div className="dashboard-layout">
//       <SidebarAgent />

//       <main className="main-content">
//         <Header />

//         {/* 🔹 Page Header */}
//         <div className="inbox-header">
//           <div>
//             <h2></h2>
//             <p></p>
//           </div>

//           <div className="filter-controls">
//             <FaFilter />
//             <select
//               value={filters.type}
//               onChange={(e) =>
//                 setFilters({ ...filters, type: e.target.value })
//               }
//             >
//               <option value="active">Active</option>
//               <option value="waiting">Waiting</option>
//               <option value="history">History</option>
//             </select>

//             <button
//               className="refresh-btn"
//               onClick={fetchConversations}
//               disabled={loading}
//             >
//               <FaSync />
//             </button>
//           </div>
//         </div>

//         {/* 🔹 Loading / Error / Empty States */}
//         {loading && <p className="info-text">Loading conversations...</p>}
//         {error && <p className="error-text">{error}</p>}
//         {!loading && !error && conversations.length === 0 && (
//           <p className="info-text">No conversations found.</p>
//         )}

//         {/* 🔹 Conversation List */}
//         <div className="conversation-list">
//           {conversations.map((conv) => (
//             <ConversationItem key={conv.id} data={conv} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import SidebarAgent from "../../components/SidebarAgent";
// import Header from "../../components/Header";
// import ConversationItem from "../../components/ConversationItem";
// import "../../styles/inbox.css";
// import { FaFilter, FaSync } from "react-icons/fa";

// export default function Inbox() {
//   const [filters, setFilters] = useState({
//     type: "my_active", // my_active | my_closed | all
//     period: "today",   // today | week | custom
//     start_date: "",
//     end_date: "",
//   });

//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const BASE_URL =
//     import.meta.env.VITE_API_URL ||
//     "https://api.texef.com/api/agents/conversations/inbox";

//   const token = localStorage.getItem("agent_token");

//   // ✅ Build query string dynamically
//   const buildQueryParams = () => {
//     const params = new URLSearchParams();
//     if (filters.type) params.append("type", filters.type);
//     if (filters.period && filters.period !== "custom")
//       params.append("period", filters.period);
//     if (filters.period === "custom" && filters.start_date && filters.end_date) {
//       params.append("start_date", filters.start_date);
//       params.append("end_date", filters.end_date);
//     }
//     return params.toString();
//   };

//   // ✅ Fetch Conversations
//   const fetchConversations = async () => {
//     setLoading(true);
//     setError("");

//     const queryString = buildQueryParams();
//     const endpoint = `${BASE_URL}?${queryString}`;

//     try {
//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         if (res.status === 404) {
//           setConversations([]);
//           setError("No such endpoint found (404). Check backend URL.");
//           return;
//         }
//         throw new Error(`HTTP ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("✅ Conversations:", data);

//       if (Array.isArray(data)) {
//         setConversations(data);
//       } else if (data?.conversations) {
//         setConversations(data.conversations);
//       } else {
//         setConversations([]);
//       }
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Failed to load conversations. Check server connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, [filters]);

//   return (
//     <div className="dashboard-layout">
//       <SidebarAgent />

//       <main className="main-content">
//         <Header />

//         {/* 🔹 Page Header */}
//         <div className="inbox-header">
//           <div>
//             {/* <h2>Inbox</h2>
//             <p>Manage your ongoing and closed conversations</p> */}
//           </div>

//           <div className="filter-controls">
//             <FaFilter />

//             {/* Conversation Type */}
//             <select
//               value={filters.type}
//               onChange={(e) =>
//                 setFilters({ ...filters, type: e.target.value })
//               }
//             >
//               <option value="my_active">My Active</option>
//               <option value="my_closed">My Closed</option>
//               <option value="all">All Team</option>
//             </select>

//             {/* Period Filter */}
//             <select
//               value={filters.period}
//               onChange={(e) =>
//                 setFilters({ ...filters, period: e.target.value })
//               }
//             >
//               <option value="today">Today</option>
//               <option value="week">Last Week</option>
//               <option value="custom">Custom Range</option>
//             </select>

//             {/* Date Range (only when custom selected) */}
//             {filters.period === "custom" && (
//               <>
//                 <input
//                   type="date"
//                   value={filters.start_date}
//                   onChange={(e) =>
//                     setFilters({ ...filters, start_date: e.target.value })
//                   }
//                 />
//                 <input
//                   type="date"
//                   value={filters.end_date}
//                   onChange={(e) =>
//                     setFilters({ ...filters, end_date: e.target.value })
//                   }
//                 />
//               </>
//             )}

//             <button
//               className="refresh-btn"
//               onClick={fetchConversations}
//               disabled={loading}
//               title="Refresh"
//             >
//               <FaSync />
//             </button>
//           </div>
//         </div>

//         {/* 🔹 States */}
//         {loading && <p className="info-text">Loading conversations...</p>}
//         {error && <p className="error-text">{error}</p>}
//         {!loading && !error && conversations.length === 0 && (
//           <p className="info-text">No conversations found.</p>
//         )}

//         {/* 🔹 Conversation List */}
//         <div className="conversation-list">
//           {conversations.map((conv) => (
//             <ConversationItem key={conv.id} data={conv} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import SidebarAgent from "../../components/SidebarAgent";
// import Header from "../../components/Header";
// import ConversationItem from "../../components/ConversationItem";
// import "../../styles/inbox.css";
// import { FaFilter, FaSync } from "react-icons/fa";

// export default function Inbox() {
//   const [filters, setFilters] = useState({
//     type: "my_active", // my_active | my_closed | all
//     period: "today",   // today | week | custom
//     start_date: "",
//     end_date: "",
//   });

//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const BASE_URL =
//     import.meta.env.VITE_API_URL ||
//       "https://api.texef.com/api/agents/conversations/inbox";

//   const token = localStorage.getItem("agent_token");

//   // 👉 Helper: normalize a single conversation object
//   const normalizeConversation = (conv) => {
//     // Handle last_message if it exists
//     let lastMessage = conv.last_message;

//     if (lastMessage && typeof lastMessage === "object") {
//       // if it's an object like { text, sender, created_at }
//       if (typeof lastMessage.text === "string") {
//         lastMessage = lastMessage.text;
//       } else {
//         // fallback: stringify so React can render
//         lastMessage = JSON.stringify(lastMessage);
//       }
//     }

//     return {
//       ...conv,
//       last_message: lastMessage ?? "",

//       // you can also normalize other fields here if needed
//     };
//   };

//   // ✅ Build query string dynamically
//   const buildQueryParams = () => {
//     const params = new URLSearchParams();
//     if (filters.type) params.append("type", filters.type);
//     if (filters.period && filters.period !== "custom")
//       params.append("period", filters.period);
//     if (filters.period === "custom" && filters.start_date && filters.end_date) {
//       params.append("start_date", filters.start_date);
//       params.append("end_date", filters.end_date);
//     }
//     return params.toString();
//   };

//   // ✅ Fetch Conversations
//   const fetchConversations = async () => {
//     setLoading(true);
//     setError("");

//     const queryString = buildQueryParams();
//     const endpoint = `${BASE_URL}?${queryString}`;

//     try {
//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         if (res.status === 404) {
//           setConversations([]);
//           setError("No such endpoint found (404). Check backend URL.");
//           return;
//         }
//         throw new Error(`HTTP ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("✅ Raw conversations:", data);

//       let convs = [];

//       if (Array.isArray(data)) {
//         convs = data;
//       } else if (data?.conversations) {
//         convs = data.conversations;
//       } else {
//         convs = [];
//       }

//       // 🔧 Normalize each conversation so that React never gets raw objects as children
//       const normalized = convs.map((c) => normalizeConversation(c));

//       console.log("✨ Normalized conversations:", normalized);
//       setConversations(normalized);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Failed to load conversations. Check server connection.");
//       setConversations([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, [filters]);

//   return (
//     <div className="dashboard-layout">
//       <SidebarAgent />

//       <main className="main-content">
//         <Header />

//         {/* 🔹 Page Header */}
//         <div className="inbox-header">
//           <div>{/* optional title */}</div>

//           <div className="filter-controls">
//             <FaFilter />

//             {/* Conversation Type */}
//             <select
//               value={filters.type}
//               onChange={(e) =>
//                 setFilters({ ...filters, type: e.target.value })
//               }
//             >
//               <option value="my_active">My Active</option>
//               <option value="my_closed">My Closed</option>
//               <option value="all">All Team</option>
//             </select>

//             {/* Period Filter */}
//             <select
//               value={filters.period}
//               onChange={(e) =>
//                 setFilters({ ...filters, period: e.target.value })
//               }
//             >
//               <option value="today">Today</option>
//               <option value="week">Last Week</option>
//               <option value="custom">Custom Range</option>
//             </select>

//             {/* Date Range (only when custom selected) */}
//             {filters.period === "custom" && (
//               <>
//                 <input
//                   type="date"
//                   value={filters.start_date}
//                   onChange={(e) =>
//                     setFilters({ ...filters, start_date: e.target.value })
//                   }
//                 />
//                 <input
//                   type="date"
//                   value={filters.end_date}
//                   onChange={(e) =>
//                     setFilters({ ...filters, end_date: e.target.value })
//                   }
//                 />
//               </>
//             )}

//             <button
//               className="refresh-btn"
//               onClick={fetchConversations}
//               disabled={loading}
//               title="Refresh"
//             >
//               <FaSync />
//             </button>
//           </div>
//         </div>

//         {/* 🔹 States */}
//         {loading && <p className="info-text">Loading conversations...</p>}
//         {error && <p className="error-text">{error}</p>}
//         {!loading && !error && conversations.length === 0 && (
//           <p className="info-text">No conversations found.</p>
//         )}

//         {/* 🔹 Conversation List */}
//         <div className="conversation-list">
//           {conversations.map((conv) => (
//             <ConversationItem key={conv.id || conv.conversation_id} data={conv} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import SidebarAgent from "../../components/SidebarAgent";
import Header from "../../components/Header";
import ConversationItem from "../../components/ConversationItem";
import "../../styles/inbox.css";
import { FaFilter, FaSync } from "react-icons/fa";

export default function Inbox() {
  const [filters, setFilters] = useState({
    type: "my_active", // my_active | my_closed | all
    period: "all",     // all | today | week | custom
    start_date: "",
    end_date: "",
  });

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000/api/agents/conversations/inbox";

  const token = localStorage.getItem("agent_token");

  // 👉 Helper: normalize a single conversation object
  const normalizeConversation = (conv) => {
    // Handle last_message if it exists
    let lastMessage = conv.last_message;

    if (lastMessage && typeof lastMessage === "object") {
      // if it's an object like { text, sender, created_at }
      if (typeof lastMessage.text === "string") {
        lastMessage = lastMessage.text;
      } else {
        // fallback: stringify so React can render
        lastMessage = JSON.stringify(lastMessage);
      }
    }

    return {
      ...conv,
      last_message: lastMessage ?? "",
    };
  };

  // ✅ Build query string dynamically
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    // conversation type - my_active | my_closed | all
    if (filters.type) {
      params.append("type", filters.type);
    }

    // period: all | today | week | custom
    if (filters.period && filters.period !== "custom") {
      params.append("period", filters.period);
    }

    if (
      filters.period === "custom" &&
      filters.start_date &&
      filters.end_date
    ) {
      params.append("period", "custom");
      params.append("start_date", filters.start_date);
      params.append("end_date", filters.end_date);
    }

    return params.toString();
  };

  // ✅ Fetch Conversations
  const fetchConversations = async () => {
    if (!token) {
      setError("Missing agent token. Please login again.");
      setConversations([]);
      return;
    }

    setLoading(true);
    setError("");

    const queryString = buildQueryParams();
    const endpoint = `${BASE_URL}?${queryString}`;
    console.log("📡 Fetching inbox:", endpoint);

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          setConversations([]);
          setError("No such endpoint found (404). Check backend URL.");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Raw conversations:", data);

      let convs = [];

      if (Array.isArray(data)) {
        convs = data;
      } else if (data?.conversations) {
        convs = data.conversations;
      } else {
        convs = [];
      }

      // 🔧 Normalize each conversation so that React never gets raw objects as children
      const normalized = convs.map((c) => normalizeConversation(c));

      console.log("✨ Normalized conversations:", normalized);
      setConversations(normalized);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Failed to load conversations. Check server connection.");
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type, filters.period, filters.start_date, filters.end_date]);

  return (
    <div className="dashboard-layout">
      <SidebarAgent />

      <main className="main-content">
        <Header />

        {/* 🔹 Page Header */}
        <div className="inbox-header">
          <div>{/* optional title */}</div>

          <div className="filter-controls">
            <FaFilter />

            {/* Conversation Type */}
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="my_active">My Active</option>
              <option value="my_closed">My Closed</option>
              <option value="all">All Team</option>
            </select>

            {/* Period Filter */}
            <select
              value={filters.period}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, period: e.target.value }))
              }
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="custom">Custom Range</option>
            </select>

            {/* Date Range (only when custom selected) */}
            {filters.period === "custom" && (
              <>
                <input
                  type="date"
                  value={filters.start_date}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      start_date: e.target.value,
                    }))
                  }
                />
                <input
                  type="date"
                  value={filters.end_date}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      end_date: e.target.value,
                    }))
                  }
                />
              </>
            )}

            <button
              className="refresh-btn"
              onClick={fetchConversations}
              disabled={loading}
              title="Refresh"
            >
              <FaSync />
            </button>
          </div>
        </div>

        {/* 🔹 States */}
        {loading && <p className="info-text">Loading conversations...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && conversations.length === 0 && (
          <p className="info-text">No conversations found.</p>
        )}

        {/* 🔹 Conversation List */}
        <div className="conversation-list">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id || conv.conversation_id}
              data={conv}
            />
          ))}
        </div>
      </main>
    </div>
  );
}


