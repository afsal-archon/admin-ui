// // import React, { useState } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import "./SupportPage.css";

// // export default function SupportPage() {
// //   // Active states
// //   const [activeInboxTab, setActiveInboxTab] = useState("All");
// //   const [activeStatusTab, setActiveStatusTab] = useState("All");

// //   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
// //   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

// //   return (
// //     <div className="support-glass-layout">
// //       {/* Sidebar */}
// //       <Sidebar />

// //       {/* Glass Container */}
// //       <div className="support-glass-container">
// //         {/* ---------- LEFT PANEL (Inbox) ---------- */}
// //         <aside className="glass-panel inbox-panel">
// //           {/* Header */}
// //           <div className="inbox-header">
// //             <h2>Inbox</h2>
// //             <input type="text" placeholder="Search chat..." />
// //           </div>

// //           {/* Scrollable Sections */}
// //           <div className="inbox-scroll">
// //             {/* Inbox Section */}
// //             <div className="section">
// //               <h4>Inbox</h4>
// //               <ul>
// //                 {inboxTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={`${
// //                       activeInboxTab === tab ? "active animate-highlight" : ""
// //                     }`}
// //                     onClick={() => setActiveInboxTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Status Section */}
// //             <div className="section">
// //               <h4>Status</h4>
// //               <ul>
// //                 {statusTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={`${
// //                       activeStatusTab === tab ? "active animate-highlight" : ""
// //                     }`}
// //                     onClick={() => setActiveStatusTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Agents Section */}
// //             <div className="section agents">
// //               <h4>Agents</h4>

// //               <div className="agent-item">
// //                 <img
// //                   src="https://randomuser.me/api/portraits/women/45.jpg"
// //                   alt="Olivia"
// //                 />
// //                 <div>
// //                   <p className="agent-name">Olivia Rhye</p>
// //                   <p className="agent-status">Online</p>
// //                 </div>
// //               </div>

// //               <div className="agent-item">
// //                 <img
// //                   src="https://randomuser.me/api/portraits/men/32.jpg"
// //                   alt="Alex"
// //                 />
// //                 <div>
// //                   <p className="agent-name">Alex Johnson</p>
// //                   <p className="agent-status">Online</p>
// //                 </div>
// //               </div>

// //               <div className="agent-item">
// //                 <img
// //                   src="https://randomuser.me/api/portraits/women/25.jpg"
// //                   alt="Maria"
// //                 />
// //                 <div>
// //                   <p className="agent-name">Maria Lopez</p>
// //                   <p className="agent-status" style={{ color: "#9ca3af" }}>
// //                     Offline
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
// //         <main className="glass-panel chat-panel">
// //           <div className="chat-header">
// //             <div>
// //               <h3>Olivia Rhye</h3>
// //               <p>Online</p>
// //             </div>
// //             <div className="header-buttons">
// //               <button className="pause">Pause</button>
// //               <button className="close">Close</button>
// //             </div>
// //           </div>

// //           <div className="chat-body">
// //             <div className="message from-user">
// //               Thank you. Please enter the amount and date of the transaction.
// //             </div>
// //             <div className="message from-agent">
// //               It seems there might be a delay in processing the transaction.
// //             </div>
// //             <div className="message from-user">Retry checking the balance.</div>
// //             <div className="message from-agent">
// //               Hi, this is Alex from Customer Support. I see you’re having an
// //               issue with your top-up.
// //             </div>
// //           </div>

// //           <div className="chat-input">
// //             <input type="text" placeholder="Type your message..." />
// //             <button className="send-btn">Send</button>
// //           </div>
// //         </main>

// //         {/* ---------- RIGHT PANEL (Info) ---------- */}
// //         <aside className="glass-panel info-panel">
// //           <h4>Cora Goyette</h4>
// //           <p className="channel">Web Chat</p>

// //           <div className="info-block">
// //             <p>
// //               <strong>Channel:</strong> Web
// //             </p>
// //             <p>
// //               <strong>Phone:</strong> +62 8797 629 2012
// //             </p>
// //             <p>
// //               <strong>Address:</strong> 5467 Richmond View, Kentucky, USA
// //             </p>
// //           </div>

// //           <div className="notes-section">
// //             <h5>Notes</h5>
// //             <textarea placeholder="Write a note..." />
// //           </div>

// //           <div className="activity-section">
// //             <h5>Activity</h5>
// //             <p>
// //               <strong>Justin Hicks</strong> — sent an update by email at 4 PM
// //             </p>
// //             <p>
// //               <strong>Sarah Lin</strong> — updated the status to Open
// //             </p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import "./SupportPage.css";

// // export default function SupportPage() {
// //   // Active states
// //   const [activeInboxTab, setActiveInboxTab] = useState("All");
// //   const [activeStatusTab, setActiveStatusTab] = useState("All");
// //   const [activeChat, setActiveChat] = useState("Mr. Darin O’Keefe");

// //   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
// //   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

// //   const chatList = [
// //     {
// //       name: "Ms. Rosemary Koss",
// //       message: "Hi, I want to ask something...",
// //       time: "13:34",
// //       img: "https://randomuser.me/api/portraits/women/32.jpg",
// //     },
// //     {
// //       name: "Mr. Darin O’Keefe",
// //       message: "Retry checking the balance...",
// //       time: "13:34",
// //       img: "https://randomuser.me/api/portraits/men/41.jpg",
// //     },
// //     {
// //       name: "Irene Dicki",
// //       message: "Can you check my refund status?",
// //       time: "13:30",
// //       img: "https://randomuser.me/api/portraits/women/25.jpg",
// //     },
// //   ];

// //   const agents = [
// //     {
// //       name: "Olivia Rhye",
// //       status: "Online",
// //       img: "https://randomuser.me/api/portraits/women/45.jpg",
// //     },
// //     {
// //       name: "Alex Johnson",
// //       status: "Online",
// //       img: "https://randomuser.me/api/portraits/men/32.jpg",
// //     },
// //     {
// //       name: "Maria Lopez",
// //       status: "Offline",
// //       img: "https://randomuser.me/api/portraits/women/25.jpg",
// //     },
// //     // {
// //     //   name: "Robert Miles",
// //     //   status: "Online",
// //     //   img: "https://randomuser.me/api/portraits/men/12.jpg",
// //     // },
// //   ];

// //   return (
// //     <div className="support-glass-layout">
// //       {/* Sidebar */}
// //       <Sidebar />

// //       {/* Glass Container */}
// //       <div className="support-glass-container">
// //         {/* ---------- LEFT PANEL (Inbox) ---------- */}
// //         <aside className="glass-panel inbox-panel">
// //           <div className="inbox-header">
// //             <h2>Inbox</h2>
// //             <input type="text" placeholder="Search chat..." />
// //           </div>

// //           <div className="inbox-scroll">
// //             {/* Inbox Section */}
// //             <div className="section">
// //               <h4>Inbox</h4>
// //               <ul>
// //                 {inboxTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={`${
// //                       activeInboxTab === tab ? "active animate-highlight" : ""
// //                     }`}
// //                     onClick={() => setActiveInboxTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Status Section */}
// //             <div className="section">
// //               <h4>Status</h4>
// //               <ul>
// //                 {statusTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={`${
// //                       activeStatusTab === tab ? "active animate-highlight" : ""
// //                     }`}
// //                     onClick={() => setActiveStatusTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* ✅ Conversation List Section */}
// //             <div className="section conversation-list">
// //               <h4>Chats</h4>
// //               {chatList.map((chat) => (
// //                 <div
// //                   key={chat.name}
// //                   className={`chat-item ${
// //                     activeChat === chat.name ? "active-chat" : ""
// //                   }`}
// //                   onClick={() => setActiveChat(chat.name)}
// //                 >
// //                   <img src={chat.img} alt={chat.name} />
// //                   <div className="chat-info">
// //                     <div className="chat-header-row">
// //                       <p className="chat-name">{chat.name}</p>
// //                       <span className="chat-time">{chat.time}</span>
// //                     </div>
// //                     <p className="chat-snippet">{chat.message}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* ✅ Scrollable Agents Section */}
// //             <div className="section agents">
// //               <h4>Agents</h4>
// //               <div className="agent-scroll">
// //                 {agents.map((agent) => (
// //                   <div key={agent.name} className="agent-item">
// //                     <img src={agent.img} alt={agent.name} />
// //                     <div>
// //                       <p className="agent-name">{agent.name}</p>
// //                       <p
// //                         className="agent-status"
// //                         style={{
// //                           color:
// //                             agent.status === "Offline"
// //                               ? "#9ca3af"
// //                               : "#22c55e",
// //                         }}
// //                       >
// //                         {agent.status}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
// //         <main className="glass-panel chat-panel">
// //           <div className="chat-header">
// //             <div>
// //               <h3>{activeChat}</h3>
// //               <p>Online</p>
// //             </div>
// //             <div className="header-buttons">
// //               <button className="pause">Pause</button>
// //               <button className="close">Close</button>
// //             </div>
// //           </div>

// //           <div className="chat-body">
// //             <div className="message from-user">
// //               Thank you. Please enter the amount and date of the transaction.
// //             </div>
// //             <div className="message from-agent">
// //               It seems there might be a delay in processing the transaction.
// //             </div>
// //             <div className="message from-user">Retry checking the balance.</div>
// //             <div className="message from-agent">
// //               Hi, this is Alex from Customer Support. I see you’re having an
// //               issue with your top-up.
// //             </div>
// //           </div>

// //           <div className="chat-input">
// //             <input type="text" placeholder="Type your message..." />
// //             <button className="send-btn">Send</button>
// //           </div>
// //         </main>

// //         {/* ---------- RIGHT PANEL (Info) ---------- */}
// //         <aside className="glass-panel info-panel">
// //           <h4>Cora Goyette</h4>
// //           <p className="channel">Web Chat</p>

// //           <div className="info-block">
// //             <p>
// //               <strong>Channel:</strong> Web
// //             </p>
// //             <p>
// //               <strong>Phone:</strong> +62 8797 629 2012
// //             </p>
// //             <p>
// //               <strong>Address:</strong> 5467 Richmond View, Kentucky, USA
// //             </p>
// //           </div>

// //           <div className="notes-section">
// //             <h5>Notes</h5>
// //             <textarea placeholder="Write a note..." />
// //           </div>

// //           <div className="activity-section">
// //             <h5>Activity</h5>
// //             <p>
// //               <strong>Justin Hicks</strong> — sent an update by email at 4 PM
// //             </p>
// //             <p>
// //               <strong>Sarah Lin</strong> — updated the status to Open
// //             </p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }


// // import React, { useEffect, useState } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import "./SupportPage.css";

// // export default function SupportPage() {
// //   const [activeInboxTab, setActiveInboxTab] = useState("All");
// //   const [activeStatusTab, setActiveStatusTab] = useState("All");
// //   const [activeChat, setActiveChat] = useState("Mr. Darin O’Keefe");
// //   const [agents, setAgents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
// //   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

// //   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// //   const TOKEN = localStorage.getItem("auth_token");

// //   // ✅ Fetch Agents from API
// //   useEffect(() => {
// //     const fetchAgents = async () => {
// //       try {
// //         const res = await fetch(`${BASE_URL}/agents`, {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${TOKEN}`,
// //             "Content-Type": "application/json",
// //           },
// //         });

// //         if (!res.ok) throw new Error(`API Error ${res.status}`);
// //         const data = await res.json();

// //         // handle both [{...}] and {agents:[...]} formats
// //         const list = Array.isArray(data) ? data : data.agents || [];
// //         setAgents(list);
// //       } catch (err) {
// //         console.error("⚠️ Fetch agents failed:", err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAgents();
// //   }, []);

// //   // demo chat list stays static
// //   const chatList = [
// //     {
// //       name: "Ms. Rosemary Koss",
// //       message: "Hi, I want to ask something...",
// //       time: "13:34",
// //       img: "https://randomuser.me/api/portraits/women/32.jpg",
// //     },
// //     {
// //       name: "Mr. Darin O’Keefe",
// //       message: "Retry checking the balance...",
// //       time: "13:34",
// //       img: "https://randomuser.me/api/portraits/men/41.jpg",
// //     },
// //     {
// //       name: "Irene Dicki",
// //       message: "Can you check my refund status?",
// //       time: "13:30",
// //       img: "https://randomuser.me/api/portraits/women/25.jpg",
// //     },
// //   ];

// //   return (
// //     <div className="support-glass-layout">
// //       <Sidebar />

// //       <div className="support-glass-container">
// //         {/* ---------- LEFT PANEL ---------- */}
// //         <aside className="glass-panel inbox-panel">
// //           <div className="inbox-header">
// //             <h2>Inbox</h2>
// //             <input type="text" placeholder="Search chat..." />
// //           </div>

// //           <div className="inbox-scroll">
// //             {/* Inbox */}
// //             <div className="section">
// //               <h4>Inbox</h4>
// //               <ul>
// //                 {inboxTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeInboxTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveInboxTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Status */}
// //             <div className="section">
// //               <h4>Status</h4>
// //               <ul>
// //                 {statusTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeStatusTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveStatusTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Chats */}
// //             <div className="section conversation-list">
// //               <h4>Chats</h4>
// //               {chatList.map((chat) => (
// //                 <div
// //                   key={chat.name}
// //                   className={`chat-item ${activeChat === chat.name ? "active-chat" : ""}`}
// //                   onClick={() => setActiveChat(chat.name)}
// //                 >
// //                   <img src={chat.img} alt={chat.name} />
// //                   <div className="chat-info">
// //                     <div className="chat-header-row">
// //                       <p className="chat-name">{chat.name}</p>
// //                       <span className="chat-time">{chat.time}</span>
// //                     </div>
// //                     <p className="chat-snippet">{chat.message}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Agents */}
// //             <div className="section agents">
// //               <h4>Agents</h4>
// //               <div className="agent-scroll">
// //                 {loading ? (
// //                   <p className="loading-text">Loading agents...</p>
// //                 ) : error ? (
// //                   <p className="error-text">⚠️ {error}</p>
// //                 ) : agents.length === 0 ? (
// //                   <p className="error-text">No agents found.</p>
// //                 ) : (
// //                   agents.map((agent) => (
// //                     <div key={agent.agent_id} className="agent-item">
// //                       <img
// //                         src={
// //                           agent.is_online
// //                             ? "https://cdn-icons-png.flaticon.com/512/1946/1946429.png" // default avatar
// //                             : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
// //                         }
// //                         alt={agent.agent_name}
// //                         style={{
// //                           backgroundColor: "#fff",
// //                           borderRadius: "50%",
// //                           width: "32px",
// //                           height: "32px",
// //                         }}
// //                       />
// //                       <div>
// //                         <p className="agent-name">{agent.agent_name}</p>
// //                         <p
// //                           className="agent-status"
// //                           style={{
// //                             color:
// //                               agent.is_online || agent.status === "A"
// //                                 ? "#22c55e"
// //                                 : "#9ca3af",
// //                           }}
// //                         >
// //                           {agent.is_online || agent.status === "A"
// //                             ? "Active"
// //                             : "Inactive"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ---------- MIDDLE PANEL ---------- */}
// //         <main className="glass-panel chat-panel">
// //           <div className="chat-header">
// //             <div>
// //               <h3>{activeChat}</h3>
// //               <p>Online</p>
// //             </div>
// //             <div className="header-buttons">
// //               <button className="pause">Pause</button>
// //               <button className="close">Close</button>
// //             </div>
// //           </div>

// //           <div className="chat-body">
// //             <div className="message from-user">
// //               Thank you. Please enter the amount and date of the transaction.
// //             </div>
// //             <div className="message from-agent">
// //               It seems there might be a delay in processing the transaction.
// //             </div>
// //             <div className="message from-user">Retry checking the balance.</div>
// //             <div className="message from-agent">
// //               Hi, this is Alex from Customer Support. I see you’re having an issue with your top-up.
// //             </div>
// //           </div>

// //           <div className="chat-input">
// //             <input type="text" placeholder="Type your message..." />
// //             <button className="send-btn">Send</button>
// //           </div>
// //         </main>

// //         {/* ---------- RIGHT PANEL ---------- */}
// //         <aside className="glass-panel info-panel">
// //           <h4>Cora Goyette</h4>
// //           <p className="channel">Web Chat</p>

// //           <div className="info-block">
// //             <p><strong>Channel:</strong> Web</p>
// //             <p><strong>Phone:</strong> +62 8797 629 2012</p>
// //             <p><strong>Address:</strong> 5467 Richmond View, Kentucky, USA</p>
// //           </div>

// //           <div className="notes-section">
// //             <h5>Notes</h5>
// //             <textarea placeholder="Write a note..." />
// //           </div>

// //           <div className="activity-section">
// //             <h5>Activity</h5>
// //             <p><strong>Justin Hicks</strong> — sent an update by email at 4 PM</p>
// //             <p><strong>Sarah Lin</strong> — updated the status to Open</p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useEffect, useState } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import "./SupportPage.css";

// // export default function SupportPage() {
// //   const [activeInboxTab, setActiveInboxTab] = useState("All");
// //   const [activeStatusTab, setActiveStatusTab] = useState("All");
// //   const [activeChat, setActiveChat] = useState(null);
// //   const [chatList, setChatList] = useState([]);
// //   const [agents, setAgents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// //   const TOKEN = localStorage.getItem("auth_token");

// //   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
// //   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

// //   /* ---------------- Fetch Agents ---------------- */
// //   useEffect(() => {
// //     const fetchAgents = async () => {
// //       try {
// //         const res = await fetch(`${BASE_URL}/agents`, {
// //           headers: {
// //             Authorization: `Bearer ${TOKEN}`,
// //             "Content-Type": "application/json",
// //           },
// //         });
// //         if (!res.ok) throw new Error(`Agent API Error ${res.status}`);
// //         const data = await res.json();
// //         const list = Array.isArray(data) ? data : data.agents || [];
// //         setAgents(list);
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //     };
// //     fetchAgents();
// //   }, []);

// //   /* ---------------- Fetch Conversations ---------------- */
// //   const fetchChats = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/tenants/conversations/inbox`, {
// //         headers: {
// //           Authorization: `Bearer ${TOKEN}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       if (!res.ok) throw new Error(`Chat API Error ${res.status}`);
// //       const data = await res.json();
// //       setChatList(data.conversations || []);
// //     } catch (err) {
// //       console.error("⚠️ Chat fetch failed:", err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();
// //     const interval = setInterval(fetchChats, 30000); // auto-refresh every 30s
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="support-glass-layout">
// //       <Sidebar />

// //       <div className="support-glass-container">
// //         {/* ---------- LEFT PANEL ---------- */}
// //         <aside className="glass-panel inbox-panel">
// //           <div className="inbox-header">
// //             <h2>Inbox</h2>
// //             <input type="text" placeholder="Search chat..." />
// //           </div>

// //           <div className="inbox-scroll">
// //             {/* Inbox Tabs */}
// //             <div className="section">
// //               <h4>Inbox</h4>
// //               <ul>
// //                 {inboxTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeInboxTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveInboxTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Status Tabs */}
// //             <div className="section">
// //               <h4>Status</h4>
// //               <ul>
// //                 {statusTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeStatusTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveStatusTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* ✅ Conversation List */}
// //             <div className="section conversation-list">
// //               <h4>Chats</h4>
// //               {loading ? (
// //                 <p className="loading-text">Loading conversations...</p>
// //               ) : error ? (
// //                 <p className="error-text">⚠️ {error}</p>
// //               ) : chatList.length === 0 ? (
// //                 <p className="error-text">No conversations found.</p>
// //               ) : (
// //                 chatList.map((chat) => (
// //                   <div
// //                     key={chat.id}
// //                     className={`chat-item ${activeChat === chat.id ? "active-chat" : ""}`}
// //                     onClick={() => setActiveChat(chat.id)}
// //                   >
// //                     {/* Default white placeholder image */}
// //                     <img
// //                       src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
// //                       alt="user"
// //                       style={{
// //                         backgroundColor: "#fff",
// //                         borderRadius: "50%",
// //                         width: "38px",
// //                         height: "38px",
// //                       }}
// //                     />
// //                     <div className="chat-info">
// //                       <div className="chat-header-row">
// //                         {/* Show Conversation ID instead of name */}
// //                         <p className="chat-name">Conversation #{chat.id}</p>
// //                         {/* Convert created_at into local time */}
// //                         <span className="chat-time">
// //                           {new Date(chat.created_at).toLocaleTimeString()}
// //                         </span>
// //                       </div>
// //                       {/* Show last message text */}
// //                       <p className="chat-snippet">
// //                         {chat.last_message?.text || "No messages yet"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>

// //             {/* ✅ Agents Section */}
// //             <div className="section agents">
// //               <h4>Agents</h4>
// //               <div className="agent-scroll">
// //                 {loading ? (
// //                   <p className="loading-text">Loading agents...</p>
// //                 ) : error ? (
// //                   <p className="error-text">⚠️ {error}</p>
// //                 ) : agents.length === 0 ? (
// //                   <p className="error-text">No agents found.</p>
// //                 ) : (
// //                   agents.map((agent) => (
// //                     <div key={agent.agent_id} className="agent-item">
// //                       <img
// //                         src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
// //                         alt={agent.agent_name}
// //                         style={{
// //                           backgroundColor: "#fff",
// //                           borderRadius: "50%",
// //                           width: "32px",
// //                           height: "32px",
// //                         }}
// //                       />
// //                       <div>
// //                         <p className="agent-name">{agent.agent_name}</p>
// //                         <p
// //                           className="agent-status"
// //                           style={{
// //                             color:
// //                               agent.is_online || agent.status === "A"
// //                                 ? "#22c55e"
// //                                 : "#9ca3af",
// //                           }}
// //                         >
// //                           {agent.is_online || agent.status === "A"
// //                             ? "Active"
// //                             : "Inactive"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
// //         <main className="glass-panel chat-panel">
// //           <div className="chat-header">
// //             <div>
// //               <h3>
// //                 {activeChat
// //                   ? `Conversation #${activeChat}`
// //                   : "Select a conversation"}
// //               </h3>
// //               <p>Online</p>
// //             </div>
// //             <div className="header-buttons">
// //               <button className="pause">Pause</button>
// //               <button className="close">Close</button>
// //             </div>
// //           </div>

// //           <div className="chat-body">
// //             <div className="message from-user">
// //               Thank you. Please enter the amount and date of the transaction.
// //             </div>
// //             <div className="message from-agent">
// //               It seems there might be a delay in processing the transaction.
// //             </div>
// //             <div className="message from-user">Retry checking the balance.</div>
// //             <div className="message from-agent">
// //               Hi, this is Alex from Customer Support. I see you’re having an
// //               issue with your top-up.
// //             </div>
// //           </div>

// //           <div className="chat-input">
// //             <input type="text" placeholder="Type your message..." />
// //             <button className="send-btn">Send</button>
// //           </div>
// //         </main>

// //         {/* ---------- RIGHT PANEL (Info) ---------- */}
// //         <aside className="glass-panel info-panel">
// //           <h4>Cora Goyette</h4>
// //           <p className="channel">Web Chat</p>

// //           <div className="info-block">
// //             <p><strong>Channel:</strong> Web</p>
// //             <p><strong>Phone:</strong> +62 8797 629 2012</p>
// //             <p><strong>Address:</strong> 5467 Richmond View, Kentucky, USA</p>
// //           </div>

// //           <div className="notes-section">
// //             <h5>Notes</h5>
// //             <textarea placeholder="Write a note..." />
// //           </div>

// //           <div className="activity-section">
// //             <h5>Activity</h5>
// //             <p><strong>Justin Hicks</strong> — sent an update by email at 4 PM</p>
// //             <p><strong>Sarah Lin</strong> — updated the status to Open</p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useEffect, useState } from "react";
// // import Sidebar from "../../components/Sidebar";
// // import "./SupportPage.css";

// // export default function SupportPage() {
// //   const [activeInboxTab, setActiveInboxTab] = useState("All");
// //   const [activeStatusTab, setActiveStatusTab] = useState("All");
// //   const [activeChat, setActiveChat] = useState(null);
// //   const [chatList, setChatList] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [agents, setAgents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// //   const TOKEN = localStorage.getItem("auth_token");

// //   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
// //   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

// //   /* ---------------- Fetch Agents ---------------- */
// //   useEffect(() => {
// //     const fetchAgents = async () => {
// //       try {
// //         const res = await fetch(`${BASE_URL}/agents`, {
// //           headers: {
// //             Authorization: `Bearer ${TOKEN}`,
// //             "Content-Type": "application/json",
// //           },
// //         });
// //         if (!res.ok) throw new Error(`Agent API Error ${res.status}`);
// //         const data = await res.json();
// //         const list = Array.isArray(data) ? data : data.agents || [];
// //         setAgents(list);
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //     };
// //     fetchAgents();
// //   }, []);

// //   /* ---------------- Fetch Conversations ---------------- */
// //   const fetchChats = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/tenants/conversations/inbox`, {
// //         headers: {
// //           Authorization: `Bearer ${TOKEN}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       if (!res.ok) throw new Error(`Chat API Error ${res.status}`);
// //       const data = await res.json();
// //       setChatList(data.conversations || []);
// //     } catch (err) {
// //       console.error("⚠️ Chat fetch failed:", err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();
// //     const interval = setInterval(fetchChats, 30000); // auto-refresh every 30s
// //     return () => clearInterval(interval);
// //   }, []);

// //   /* ---------------- Fetch Messages When Chat Selected ---------------- */
// //   const fetchMessages = async (conversationId) => {
// //     try {
// //       setMessages([]); // clear old messages
// //       const res = await fetch(
// //         `${BASE_URL}/messages?conversation_id=${conversationId}&limit=100`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${TOKEN}`, // if widget_token differs, adjust here
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       if (!res.ok) throw new Error(`Message API Error ${res.status}`);
// //       const data = await res.json();
// //       setMessages(data);
// //     } catch (err) {
// //       console.error("⚠️ Message fetch failed:", err);
// //       setError(err.message);
// //     }
// //   };

// //   /* ---------------- Handle Chat Click ---------------- */
// //   const handleChatClick = (chatId) => {
// //     setActiveChat(chatId);
// //     fetchMessages(chatId);
// //   };

// //   return (
// //     <div className="support-glass-layout">
// //       <Sidebar />

// //       <div className="support-glass-container">
// //         {/* ---------- LEFT PANEL ---------- */}
// //         <aside className="glass-panel inbox-panel">
// //           <div className="inbox-header">
// //             <h2>Inbox</h2>
// //             <input type="text" placeholder="Search chat..." />
// //           </div>

// //           <div className="inbox-scroll">
// //             {/* Inbox Tabs */}
// //             <div className="section">
// //               <h4>Inbox</h4>
// //               <ul>
// //                 {inboxTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeInboxTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveInboxTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Status Tabs */}
// //             <div className="section">
// //               <h4>Status</h4>
// //               <ul>
// //                 {statusTabs.map((tab) => (
// //                   <li
// //                     key={tab}
// //                     className={activeStatusTab === tab ? "active animate-highlight" : ""}
// //                     onClick={() => setActiveStatusTab(tab)}
// //                   >
// //                     {tab}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* ✅ Conversation List */}
// //             <div className="section conversation-list">
// //               <h4>Chats</h4>
// //               {loading ? (
// //                 <p className="loading-text">Loading conversations...</p>
// //               ) : error ? (
// //                 <p className="error-text">⚠️ {error}</p>
// //               ) : chatList.length === 0 ? (
// //                 <p className="error-text">No conversations found.</p>
// //               ) : (
// //                 chatList.map((chat) => (
// //                   <div
// //                     key={chat.id}
// //                     className={`chat-item ${activeChat === chat.id ? "active-chat" : ""}`}
// //                     onClick={() => handleChatClick(chat.id)}
// //                   >
// //                     {/* Default avatar */}
// //                     <img
// //                       src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
// //                       alt="user"
// //                       style={{
// //                         backgroundColor: "#fff",
// //                         borderRadius: "50%",
// //                         width: "38px",
// //                         height: "38px",
// //                       }}
// //                     />
// //                     <div className="chat-info">
// //                       <div className="chat-header-row">
// //                         <p className="chat-name">Conversation #{chat.id}</p>
// //                         <span className="chat-time">
// //                           {new Date(chat.created_at).toLocaleTimeString()}
// //                         </span>
// //                       </div>
// //                       <p className="chat-snippet">
// //                         {chat.last_message?.text || "No messages yet"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>

// //             {/* ✅ Agents Section */}
// //             <div className="section agents">
// //               <h4>Agents</h4>
// //               <div className="agent-scroll">
// //                 {agents.length === 0 ? (
// //                   <p className="error-text">No agents found.</p>
// //                 ) : (
// //                   agents.map((agent) => (
// //                     <div key={agent.agent_id} className="agent-item">
// //                       <img
// //                         src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
// //                         alt={agent.agent_name}
// //                         style={{
// //                           backgroundColor: "#fff",
// //                           borderRadius: "50%",
// //                           width: "32px",
// //                           height: "32px",
// //                         }}
// //                       />
// //                       <div>
// //                         <p className="agent-name">{agent.agent_name}</p>
// //                         <p
// //                           className="agent-status"
// //                           style={{
// //                             color:
// //                               agent.is_online || agent.status === "A"
// //                                 ? "#22c55e"
// //                                 : "#9ca3af",
// //                           }}
// //                         >
// //                           {agent.is_online || agent.status === "A"
// //                             ? "Active"
// //                             : "Inactive"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
// //         <main className="glass-panel chat-panel">
// //           <div className="chat-header">
// //             <div>
// //               <h3>
// //                 {activeChat
// //                   ? `Conversation #${activeChat}`
// //                   : "Select a conversation"}
// //               </h3>
// //             </div>
// //           </div>

// //           {/* Chat Messages */}
// //           <div className="chat-body">
// //             {activeChat && messages.length > 0 ? (
// //               messages.map((msg) => (
// //                 <div
// //                   key={msg.id}
// //                   className={`message ${
// //                     msg.sender === "user" ? "from-user" : "from-agent"
// //                   }`}
// //                 >
// //                   {msg.text}
// //                 </div>
// //               ))
// //             ) : activeChat && messages.length === 0 ? (
// //               <p className="loading-text">No messages yet.</p>
// //             ) : (
// //               <p className="loading-text">Select a chat to view messages.</p>
// //             )}
// //           </div>

// //           {/* Input area */}
// //           <div className="chat-input">
// //             <input type="text" placeholder="Type your message..." />
// //             <button className="send-btn">Send</button>
// //           </div>
// //         </main>

// //         {/* ---------- RIGHT PANEL (Info) ---------- */}
// //         <aside className="glass-panel info-panel">
// //           <h4>Conversation Info</h4>
// //           <p className="channel">Web Chat</p>
// //           <div className="info-block">
// //             <p><strong>ID:</strong> {activeChat || "-"}</p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import "./SupportPage.css";

// export default function SupportPage() {
//   const [filterType, setFilterType] = useState("all");
//   const [activeChat, setActiveChat] = useState(null);
//   const [chatList, setChatList] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
//   const TOKEN = localStorage.getItem("auth_token");

//   const fetchChats = async (type = "all") => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${BASE_URL}/tenants/conversations/inbox`, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) throw new Error(`Chat API Error ${res.status}`);
//       const data = await res.json();
//       let conversations = data.conversations || [];

//       if (type === "active") conversations = conversations.filter((c) => c.status === "attending");
//       else if (type === "closed") conversations = conversations.filter((c) => c.status === "closed");
//       else if (type === "ai") conversations = conversations.filter((c) => c.is_escalated);

//       setChatList(conversations);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAgents = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/agents`, {
//         headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
//       });
//       if (!res.ok) throw new Error(`Agent API Error ${res.status}`);
//       const data = await res.json();
//       const list = Array.isArray(data) ? data : data.agents || [];
//       setAgents(list);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchChats(filterType);
//     fetchAgents();
//   }, [filterType]);

//   const fetchMessages = async (conversationId) => {
//     try {
//       setMessages([]);
//       const res = await fetch(
//         `${BASE_URL}/messages?conversation_id=${conversationId}&limit=100`,
//         {
//           headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
//         }
//       );
//       if (!res.ok) throw new Error(`Message API Error ${res.status}`);
//       const data = await res.json();
//       setMessages(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleChatClick = (chatId) => {
//     setActiveChat(chatId);
//     fetchMessages(chatId);
//   };

//   return (
//     <div className="support-glass-layout">
//       <Sidebar />

//       <div className="support-glass-container">
//         {/* ---------- LEFT PANEL ---------- */}
//         <aside className="glass-panel inbox-panel">
//           <div className="inbox-header">
//             <h2>Inbox</h2>
//           </div>

//           {/* ✅ Filter Buttons (Vertical layout) */}
//           <div className="filter-buttons-vertical">
//             {["ai", "all", "active", "closed"].map((type) => (
//               <button
//                 key={type}
//                 className={`filter-btn-vertical ${
//                   filterType === type ? "active-filter" : ""
//                 }`}
//                 onClick={() => setFilterType(type)}
//               >
//                 {type === "ai"
//                   ? "AI Conversations"
//                   : type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* ✅ Conversation List */}
//           <div className="conversation-scroll">
//             <h4 className="section-title">Conversations</h4>
//             {loading ? (
//               <p className="loading-text">Loading conversations...</p>
//             ) : error ? (
//               <p className="error-text">⚠️ {error}</p>
//             ) : chatList.length === 0 ? (
//               <p className="error-text">No conversations found.</p>
//             ) : (
//               chatList.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className={`chat-item ${
//                     activeChat === chat.id ? "active-chat" : ""
//                   }`}
//                   onClick={() => handleChatClick(chat.id)}
//                 >
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
//                     alt="user"
//                     className="chat-avatar"
//                   />
//                   <div className="chat-info">
//                     <div className="chat-header-row">
//                       <p className="chat-name">Conversation #{chat.id}</p>
//                       <span className="chat-time">
//                         {new Date(chat.created_at).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <p className="chat-snippet">
//                       {chat.last_message?.text || "No messages yet"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* ✅ Agents Section (Resizable & scrollable) */}
//           <div className="agent-section">
//             <h4 className="section-title">Agents</h4>
//             <div className="agent-scroll">
//               {agents.length === 0 ? (
//                 <p className="loading-text">No agents found.</p>
//               ) : (
//                 agents.map((agent) => (
//                   <div key={agent.agent_id} className="agent-card">
//                     <div className="agent-avatar-wrapper">
//                       <img
//                         src={
//                           agent.is_online || agent.status === "A"
//                             ? "https://randomuser.me/api/portraits/men/31.jpg"
//                             : "https://randomuser.me/api/portraits/women/25.jpg"
//                         }
//                         alt={agent.agent_name}
//                         className="agent-avatar"
//                       />
//                       <span
//                         className={`status-dot ${
//                           agent.is_online || agent.status === "A"
//                             ? "online"
//                             : "offline"
//                         }`}
//                       ></span>
//                     </div>
//                     <div className="agent-info">
//                       <p className="agent-name">{agent.agent_name}</p>
//                       <p
//                         className={`agent-status ${
//                           agent.is_online || agent.status === "A"
//                             ? "active"
//                             : "inactive"
//                         }`}
//                       >
//                         {agent.is_online || agent.status === "A"
//                           ? "Online"
//                           : "Offline"}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </aside>

//         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
//         <main className="glass-panel chat-panel">
//           <div className="chat-header">
//             <h3>
//               {activeChat
//                 ? `Conversation #${activeChat}`
//                 : "Select a conversation"}
//             </h3>
//           </div>

//           <div className="chat-body">
//             {activeChat && messages.length > 0 ? (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${
//                     msg.sender === "user" ? "from-user" : "from-agent"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))
//             ) : activeChat && messages.length === 0 ? (
//               <p className="loading-text">No messages yet.</p>
//             ) : (
//               <p className="loading-text">Select a chat to view messages.</p>
//             )}
//           </div>

//           <div className="chat-input">
//             <input type="text" placeholder="Type your message..." />
//             <button className="send-btn">Send</button>
//           </div>
//         </main>

//         {/* ---------- RIGHT PANEL ---------- */}
//         <aside className="glass-panel info-panel">
//           <h4>Conversation Info</h4>
//           <p className="channel">Web Chat</p>
//           <div className="info-block">
//             <p>
//               <strong>ID:</strong> {activeChat || "-"}
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


// latest

// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import "./SupportPage.css";

// export default function SupportPage() {
//   const [filterType, setFilterType] = useState("all");
//   const [activeChat, setActiveChat] = useState(null);
//   const [chatList, setChatList] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
//   const TOKEN = localStorage.getItem("auth_token");

//   /* ---------------- Fetch Conversations ---------------- */
//   const fetchChats = async (type = "all") => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${BASE_URL}/tenants/conversations/inbox`, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) throw new Error(`Chat API Error ${res.status}`);
//       const data = await res.json();

//       let conversations = data.conversations || [];

//       if (type === "active") {
//         conversations = conversations.filter((c) => c.status === "attending");
//       } else if (type === "closed") {
//         conversations = conversations.filter((c) => c.status === "closed");
//       } else if (type === "ai") {
//         conversations = conversations.filter((c) => c.is_escalated);
//       }

//       setChatList(conversations);
//     } catch (err) {
//       console.error("⚠️ Chat fetch failed:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- Fetch Messages ---------------- */
//   const fetchMessages = async (conversationId) => {
//     try {
//       setMessages([]);
//       const res = await fetch(
//         `${BASE_URL}/messages?conversation_id=${conversationId}&limit=100`,
//         {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.ok) throw new Error(`Message API Error ${res.status}`);
//       const data = await res.json();
//       setMessages(data);
//     } catch (err) {
//       console.error("⚠️ Message fetch failed:", err);
//       setError(err.message);
//     }
//   };

//   const handleChatClick = (chatId) => {
//     setActiveChat(chatId);
//     fetchMessages(chatId);
//   };

//   useEffect(() => {
//     fetchChats(filterType);
//   }, [filterType]);

//   return (
//     <div className="support-glass-layout">
//       <Sidebar />

//       <div className="support-glass-container">
//         {/* ---------- LEFT PANEL ---------- */}
//         <aside className="glass-panel inbox-panel">
//           <div className="inbox-header">
//             <h2>Inbox</h2>
//           </div>

//           {/* ✅ Filter Buttons */}
//           <div className="filter-buttons-vertical">
//             {["ai", "all", "active", "closed"].map((type) => (
//               <button
//                 key={type}
//                 className={`filter-btn-vertical ${
//                   filterType === type ? "active-filter" : ""
//                 }`}
//                 onClick={() => setFilterType(type)}
//               >
//                 {type === "ai"
//                   ? "AI Conversations"
//                   : type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* ✅ Conversation List */}
//           <div className="conversation-scroll">
//             <h4 className="section-title">Conversations</h4>
//             {loading ? (
//               <p className="loading-text">Loading conversations...</p>
//             ) : error ? (
//               <p className="error-text">⚠️ {error}</p>
//             ) : chatList.length === 0 ? (
//               <p className="error-text">No conversations found.</p>
//             ) : (
//               chatList.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className={`chat-item ${
//                     activeChat === chat.id ? "active-chat" : ""
//                   }`}
//                   onClick={() => handleChatClick(chat.id)}
//                 >
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
//                     alt="user"
//                     className="chat-avatar"
//                   />
//                   <div className="chat-info">
//                     <div className="chat-header-row">
//                       <p className="chat-name">Conversation #{chat.id}</p>
//                       <span className="chat-time">
//                         {new Date(chat.created_at).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <p className="chat-snippet">
//                       {chat.last_message?.text || "No messages yet"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </aside>

//         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
//         <main className="glass-panel chat-panel">
//           <div className="chat-header">
//             <h3>
//               {activeChat
//                 ? `Conversation #${activeChat}`
//                 : "Select a conversation"}
//             </h3>
//           </div>

//           {/* Chat Messages */}
//           <div className="chat-body">
//             {activeChat && messages.length > 0 ? (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${
//                     msg.sender === "user" ? "from-user" : "from-agent"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))
//             ) : activeChat && messages.length === 0 ? (
//               <p className="loading-text">No messages yet.</p>
//             ) : (
//               <p className="loading-text">Select a chat to view messages.</p>
//             )}
//           </div>
//         </main>

//         {/* ---------- RIGHT PANEL ---------- */}
//         <aside className="glass-panel info-panel">
//           <h4>Conversation Info</h4>
//           <p className="channel">Web Chat</p>
//           <div className="info-block">
//             <p>
//               <strong>ID:</strong> {activeChat || "-"}
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./SupportPage.css";

export default function SupportPage() {
  const [filterType, setFilterType] = useState("all");
  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null); // ✅ agent info for right panel
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const TOKEN = localStorage.getItem("auth_token");

  /* ---------------- Fetch Conversations ---------------- */
  const fetchChats = async (type = "all") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/tenants/conversations/inbox`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Chat API Error ${res.status}`);
      const data = await res.json();
      let conversations = data.conversations || [];

      if (type === "active") {
        conversations = conversations.filter((c) => c.status === "attending");
      } else if (type === "closed") {
        conversations = conversations.filter((c) => c.status === "closed");
      } else if (type === "ai") {
        conversations = conversations.filter((c) => c.is_escalated);
      }

      setChatList(conversations);
    } catch (err) {
      console.error("⚠️ Chat fetch failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Fetch Messages ---------------- */
  const fetchMessages = async (conversationId) => {
    try {
      setMessages([]);
      const res = await fetch(
        `${BASE_URL}/messages?conversation_id=${conversationId}&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`Message API Error ${res.status}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("⚠️ Message fetch failed:", err);
      setError(err.message);
    }
  };

  /* ---------------- Handle Chat Click ---------------- */
  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
    fetchMessages(chatId);

    // ✅ Find selected chat and store agent details
    const selectedChat = chatList.find((c) => c.id === chatId);
    if (selectedChat?.assigned_agent) {
      setActiveAgent(selectedChat.assigned_agent);
    } else {
      setActiveAgent(null);
    }
  };

  useEffect(() => {
    fetchChats(filterType);
  }, [filterType]);

  return (
    <div className="support-glass-layout">
      <Sidebar />

      <div className="support-glass-container">
        {/* ---------- LEFT PANEL ---------- */}
        <aside className="glass-panel inbox-panel">
          <div className="inbox-header">
            <h2>Inbox</h2>
          </div>

          {/* ✅ Filter Buttons */}
          <div className="filter-buttons-vertical">
            {["ai", "all", "active", "closed"].map((type) => (
              <button
                key={type}
                className={`filter-btn-vertical ${
                  filterType === type ? "active-filter" : ""
                }`}
                onClick={() => setFilterType(type)}
              >
                {type === "ai"
                  ? "AI Conversations"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* ✅ Conversation List */}
          <div className="conversation-scroll">
            <h4 className="section-title">Conversations</h4>
            {loading ? (
              <p className="loading-text">Loading conversations...</p>
            ) : error ? (
              <p className="error-text">⚠️ {error}</p>
            ) : chatList.length === 0 ? (
              <p className="error-text">No conversations found.</p>
            ) : (
              chatList.map((chat) => (
                <div
                  key={chat.id}
                  className={`chat-item ${
                    activeChat === chat.id ? "active-chat" : ""
                  }`}
                  onClick={() => handleChatClick(chat.id)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                    alt="user"
                    className="chat-avatar"
                  />
                  <div className="chat-info">
                    <div className="chat-header-row">
                      <p className="chat-name">Conversation #{chat.id}</p>
                      <span className="chat-time">
                        {new Date(chat.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="chat-snippet">
                      {chat.last_message?.text || "No messages yet"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ---------- MIDDLE PANEL (Chat) ---------- */}
        <main className="glass-panel chat-panel">
          <div className="chat-header">
            <h3>
              {activeChat
                ? `Conversation #${activeChat}`
                : "Select a conversation"}
            </h3>
          </div>

          {/* Chat Messages */}
          <div className="chat-body">
            {activeChat && messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "user" ? "from-user" : "from-agent"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            ) : activeChat && messages.length === 0 ? (
              <p className="loading-text">No messages yet.</p>
            ) : (
              <p className="loading-text">Select a chat to view messages.</p>
            )}
          </div>
        </main>

        {/* ---------- RIGHT PANEL ---------- */}
        <aside className="glass-panel info-panel">
          <h4>Agent Info</h4>
          <p className="channel">Web Chat</p>

          <div className="info-block">
            <p>
              <strong>ID:</strong> {activeChat || "-"}
            </p>

            {activeAgent ? (
              <>
                <p>
                  <strong>Agent ID:</strong> {activeAgent.id}
                </p>
                <p>
                  <strong>Name:</strong> {activeAgent.name}
                </p>
                <p>
                  <strong>Email:</strong> {activeAgent.email}
                </p>
              </>
            ) : (
              <p className="error-text">No assigned agent.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
