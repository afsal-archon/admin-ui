// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import "./SupportPage.css";

// export default function SupportPage() {
//   // Active states
//   const [activeInboxTab, setActiveInboxTab] = useState("All");
//   const [activeStatusTab, setActiveStatusTab] = useState("All");

//   const inboxTabs = ["All", "Assigned to me", "Unassigned"];
//   const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

//   return (
//     <div className="support-glass-layout">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Glass Container */}
//       <div className="support-glass-container">
//         {/* ---------- LEFT PANEL (Inbox) ---------- */}
//         <aside className="glass-panel inbox-panel">
//           {/* Header */}
//           <div className="inbox-header">
//             <h2>Inbox</h2>
//             <input type="text" placeholder="Search chat..." />
//           </div>

//           {/* Scrollable Sections */}
//           <div className="inbox-scroll">
//             {/* Inbox Section */}
//             <div className="section">
//               <h4>Inbox</h4>
//               <ul>
//                 {inboxTabs.map((tab) => (
//                   <li
//                     key={tab}
//                     className={`${
//                       activeInboxTab === tab ? "active animate-highlight" : ""
//                     }`}
//                     onClick={() => setActiveInboxTab(tab)}
//                   >
//                     {tab}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Status Section */}
//             <div className="section">
//               <h4>Status</h4>
//               <ul>
//                 {statusTabs.map((tab) => (
//                   <li
//                     key={tab}
//                     className={`${
//                       activeStatusTab === tab ? "active animate-highlight" : ""
//                     }`}
//                     onClick={() => setActiveStatusTab(tab)}
//                   >
//                     {tab}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Agents Section */}
//             <div className="section agents">
//               <h4>Agents</h4>

//               <div className="agent-item">
//                 <img
//                   src="https://randomuser.me/api/portraits/women/45.jpg"
//                   alt="Olivia"
//                 />
//                 <div>
//                   <p className="agent-name">Olivia Rhye</p>
//                   <p className="agent-status">Online</p>
//                 </div>
//               </div>

//               <div className="agent-item">
//                 <img
//                   src="https://randomuser.me/api/portraits/men/32.jpg"
//                   alt="Alex"
//                 />
//                 <div>
//                   <p className="agent-name">Alex Johnson</p>
//                   <p className="agent-status">Online</p>
//                 </div>
//               </div>

//               <div className="agent-item">
//                 <img
//                   src="https://randomuser.me/api/portraits/women/25.jpg"
//                   alt="Maria"
//                 />
//                 <div>
//                   <p className="agent-name">Maria Lopez</p>
//                   <p className="agent-status" style={{ color: "#9ca3af" }}>
//                     Offline
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* ---------- MIDDLE PANEL (Chat) ---------- */}
//         <main className="glass-panel chat-panel">
//           <div className="chat-header">
//             <div>
//               <h3>Olivia Rhye</h3>
//               <p>Online</p>
//             </div>
//             <div className="header-buttons">
//               <button className="pause">Pause</button>
//               <button className="close">Close</button>
//             </div>
//           </div>

//           <div className="chat-body">
//             <div className="message from-user">
//               Thank you. Please enter the amount and date of the transaction.
//             </div>
//             <div className="message from-agent">
//               It seems there might be a delay in processing the transaction.
//             </div>
//             <div className="message from-user">Retry checking the balance.</div>
//             <div className="message from-agent">
//               Hi, this is Alex from Customer Support. I see you’re having an
//               issue with your top-up.
//             </div>
//           </div>

//           <div className="chat-input">
//             <input type="text" placeholder="Type your message..." />
//             <button className="send-btn">Send</button>
//           </div>
//         </main>

//         {/* ---------- RIGHT PANEL (Info) ---------- */}
//         <aside className="glass-panel info-panel">
//           <h4>Cora Goyette</h4>
//           <p className="channel">Web Chat</p>

//           <div className="info-block">
//             <p>
//               <strong>Channel:</strong> Web
//             </p>
//             <p>
//               <strong>Phone:</strong> +62 8797 629 2012
//             </p>
//             <p>
//               <strong>Address:</strong> 5467 Richmond View, Kentucky, USA
//             </p>
//           </div>

//           <div className="notes-section">
//             <h5>Notes</h5>
//             <textarea placeholder="Write a note..." />
//           </div>

//           <div className="activity-section">
//             <h5>Activity</h5>
//             <p>
//               <strong>Justin Hicks</strong> — sent an update by email at 4 PM
//             </p>
//             <p>
//               <strong>Sarah Lin</strong> — updated the status to Open
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./SupportPage.css";

export default function SupportPage() {
  // Active states
  const [activeInboxTab, setActiveInboxTab] = useState("All");
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [activeChat, setActiveChat] = useState("Mr. Darin O’Keefe");

  const inboxTabs = ["All", "Assigned to me", "Unassigned"];
  const statusTabs = ["All", "New", "Open", "Paused", "Closed"];

  const chatList = [
    {
      name: "Ms. Rosemary Koss",
      message: "Hi, I want to ask something...",
      time: "13:34",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Mr. Darin O’Keefe",
      message: "Retry checking the balance...",
      time: "13:34",
      img: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      name: "Irene Dicki",
      message: "Can you check my refund status?",
      time: "13:30",
      img: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ];

  const agents = [
    {
      name: "Olivia Rhye",
      status: "Online",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Alex Johnson",
      status: "Online",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Maria Lopez",
      status: "Offline",
      img: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    // {
    //   name: "Robert Miles",
    //   status: "Online",
    //   img: "https://randomuser.me/api/portraits/men/12.jpg",
    // },
  ];

  return (
    <div className="support-glass-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Glass Container */}
      <div className="support-glass-container">
        {/* ---------- LEFT PANEL (Inbox) ---------- */}
        <aside className="glass-panel inbox-panel">
          <div className="inbox-header">
            <h2>Inbox</h2>
            <input type="text" placeholder="Search chat..." />
          </div>

          <div className="inbox-scroll">
            {/* Inbox Section */}
            <div className="section">
              <h4>Inbox</h4>
              <ul>
                {inboxTabs.map((tab) => (
                  <li
                    key={tab}
                    className={`${
                      activeInboxTab === tab ? "active animate-highlight" : ""
                    }`}
                    onClick={() => setActiveInboxTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Section */}
            <div className="section">
              <h4>Status</h4>
              <ul>
                {statusTabs.map((tab) => (
                  <li
                    key={tab}
                    className={`${
                      activeStatusTab === tab ? "active animate-highlight" : ""
                    }`}
                    onClick={() => setActiveStatusTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Conversation List Section */}
            <div className="section conversation-list">
              <h4>Chats</h4>
              {chatList.map((chat) => (
                <div
                  key={chat.name}
                  className={`chat-item ${
                    activeChat === chat.name ? "active-chat" : ""
                  }`}
                  onClick={() => setActiveChat(chat.name)}
                >
                  <img src={chat.img} alt={chat.name} />
                  <div className="chat-info">
                    <div className="chat-header-row">
                      <p className="chat-name">{chat.name}</p>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                    <p className="chat-snippet">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Scrollable Agents Section */}
            <div className="section agents">
              <h4>Agents</h4>
              <div className="agent-scroll">
                {agents.map((agent) => (
                  <div key={agent.name} className="agent-item">
                    <img src={agent.img} alt={agent.name} />
                    <div>
                      <p className="agent-name">{agent.name}</p>
                      <p
                        className="agent-status"
                        style={{
                          color:
                            agent.status === "Offline"
                              ? "#9ca3af"
                              : "#22c55e",
                        }}
                      >
                        {agent.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ---------- MIDDLE PANEL (Chat) ---------- */}
        <main className="glass-panel chat-panel">
          <div className="chat-header">
            <div>
              <h3>{activeChat}</h3>
              <p>Online</p>
            </div>
            <div className="header-buttons">
              <button className="pause">Pause</button>
              <button className="close">Close</button>
            </div>
          </div>

          <div className="chat-body">
            <div className="message from-user">
              Thank you. Please enter the amount and date of the transaction.
            </div>
            <div className="message from-agent">
              It seems there might be a delay in processing the transaction.
            </div>
            <div className="message from-user">Retry checking the balance.</div>
            <div className="message from-agent">
              Hi, this is Alex from Customer Support. I see you’re having an
              issue with your top-up.
            </div>
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type your message..." />
            <button className="send-btn">Send</button>
          </div>
        </main>

        {/* ---------- RIGHT PANEL (Info) ---------- */}
        <aside className="glass-panel info-panel">
          <h4>Cora Goyette</h4>
          <p className="channel">Web Chat</p>

          <div className="info-block">
            <p>
              <strong>Channel:</strong> Web
            </p>
            <p>
              <strong>Phone:</strong> +62 8797 629 2012
            </p>
            <p>
              <strong>Address:</strong> 5467 Richmond View, Kentucky, USA
            </p>
          </div>

          <div className="notes-section">
            <h5>Notes</h5>
            <textarea placeholder="Write a note..." />
          </div>

          <div className="activity-section">
            <h5>Activity</h5>
            <p>
              <strong>Justin Hicks</strong> — sent an update by email at 4 PM
            </p>
            <p>
              <strong>Sarah Lin</strong> — updated the status to Open
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
