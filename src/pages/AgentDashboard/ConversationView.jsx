// // // // // // // import React, { useState } from "react";
// // // // // // // import { FaUserPlus, FaSignOutAlt, FaCheck, FaExchangeAlt, FaTags } from "react-icons/fa";
// // // // // // // import "../../styles/conversation.css";


// // // // // // // export default function ConversationActions({ conversationId, token }) {
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   const BASE_URL = "http://localhost:8000/api/agent/conversations";

// // // // // // //   const handleAction = async (action, body = null) => {
// // // // // // //     setLoading(true);
// // // // // // //     setMessage("");

// // // // // // //     let method = "POST";
// // // // // // //     let endpoint = `${BASE_URL}/${conversationId}/${action}`;
// // // // // // //     if (action === "tags") method = "PUT";

// // // // // // //     try {
// // // // // // //       const res = await fetch(endpoint, {
// // // // // // //         method,
// // // // // // //         headers: {
// // // // // // //           Authorization: `Bearer ${token}`,
// // // // // // //           "Content-Type": "application/json",
// // // // // // //         },
// // // // // // //         body: body ? JSON.stringify(body) : null,
// // // // // // //       });

// // // // // // //       const data = await res.json();

// // // // // // //       if (res.ok) {
// // // // // // //         setMessage(`✅ ${data.message || "Action successful"}`);
// // // // // // //       } else {
// // // // // // //         setMessage(`❌ ${data.detail || "Failed to perform action"}`);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       setMessage("⚠️ Network error — please check your backend.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="conversation-actions">
// // // // // // //       <h3>Conversation Actions</h3>

// // // // // // //       <div className="action-buttons">
// // // // // // //         <button onClick={() => handleAction("join")} disabled={loading}>
// // // // // // //           <FaUserPlus /> Join
// // // // // // //         </button>

// // // // // // //         <button onClick={() => handleAction("leave")} disabled={loading}>
// // // // // // //           <FaSignOutAlt /> Leave
// // // // // // //         </button>

// // // // // // //         <button
// // // // // // //           onClick={() =>
// // // // // // //             handleAction("close", {
// // // // // // //               resolution: "issue_resolved",
// // // // // // //               notes: "Customer was satisfied with the solution",
// // // // // // //               satisfaction_rating: 5,
// // // // // // //             })
// // // // // // //           }
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           <FaCheck /> Close
// // // // // // //         </button>

// // // // // // //         <button
// // // // // // //           onClick={() =>
// // // // // // //             handleAction("transfer", {
// // // // // // //               target_agent_id: "agent_jane_doe",
// // // // // // //               reason: "Technical expertise required",
// // // // // // //             })
// // // // // // //           }
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           <FaExchangeAlt /> Transfer
// // // // // // //         </button>

// // // // // // //         <button
// // // // // // //           onClick={() =>
// // // // // // //             handleAction("tags", {
// // // // // // //               tags: ["urgent", "refund"],
// // // // // // //               priority: "high",
// // // // // // //             })
// // // // // // //           }
// // // // // // //           disabled={loading}
// // // // // // //         >
// // // // // // //           <FaTags /> Update Tags
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {message && <p className="action-message">{message}</p>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }



// // // // // // //
// // // // // // //
// // // // // // //
// // // // // // //
// // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // import "./AgentConsole.css";
// // // // // // //
// // // // // // // /* -------------------------- Chat List Component -------------------------- */
// // // // // // // const ChatList = ({ chats, activeChat, setActiveChat, pausedChats }) => {
// // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // //
// // // // // // //   const filteredChats = chats.filter((chat) =>
// // // // // // //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // //   );
// // // // // // //
// // // // // // //   return (
// // // // // // //     <div className="chat-list">
// // // // // // //       <div className="chat-list-header">
// // // // // // //         <h2>Inbox</h2>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Search by chat ID..."
// // // // // // //           value={searchTerm}
// // // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //           className="search-input"
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //
// // // // // // //       <div className="chats-section">
// // // // // // //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// // // // // // //         {filteredChats.length === 0 ? (
// // // // // // //           <div className="empty-state">No conversations yet</div>
// // // // // // //         ) : (
// // // // // // //           filteredChats.map((chat) => {
// // // // // // //             const isPaused = pausedChats.has(chat.id);
// // // // // // //             const isActive = activeChat?.id === chat.id;
// // // // // // //             return (
// // // // // // //               <div
// // // // // // //                 key={chat.id}
// // // // // // //                 className={`chat-item ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
// // // // // // //                 onClick={() => setActiveChat(chat)}
// // // // // // //               >
// // // // // // //                 <div className="chat-info">
// // // // // // //                   <div className="chat-header-row">
// // // // // // //                     <span className="chat-name">{chat.id}</span>
// // // // // // //                     <span className="chat-time">{chat.channel}</span>
// // // // // // //                   </div>
// // // // // // //
// // // // // // //                   {chat.sentiment && (
// // // // // // //                     <span
// // // // // // //                       className={`sentiment-tag ${
// // // // // // //                         chat.sentiment === "negative"
// // // // // // //                           ? "sentiment-negative"
// // // // // // //                           : chat.sentiment === "positive"
// // // // // // //                           ? "sentiment-positive"
// // // // // // //                           : "sentiment-neutral"
// // // // // // //                       }`}
// // // // // // //                     >
// // // // // // //                       {chat.sentiment}
// // // // // // //                     </span>
// // // // // // //                   )}
// // // // // // //
// // // // // // //                   <span className="chat-status">{chat.status}</span>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             );
// // // // // // //           })
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };
// // // // // // //
// // // // // // // /* -------------------------- Chat Window Component -------------------------- */
// // // // // // // const ChatWindow = ({
// // // // // // //   chat,
// // // // // // //   socket,
// // // // // // //   isTyping,
// // // // // // //   onCloseChat,
// // // // // // //   isPaused,
// // // // // // //   onTogglePause,
// // // // // // //   messages,
// // // // // // //   onSendMessage,
// // // // // // //   isLoadingMessages,
// // // // // // // }) => {
// // // // // // //   const [message, setMessage] = useState("");
// // // // // // //   const messagesEndRef = useRef(null);
// // // // // // //
// // // // // // //   useEffect(() => {
// // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // //   }, [messages, isTyping]);
// // // // // // //
// // // // // // //   const handleSend = () => {
// // // // // // //     if (!message.trim() || !socket || isPaused) return;
// // // // // // //     onSendMessage(message);
// // // // // // //     setMessage("");
// // // // // // //   };
// // // // // // //
// // // // // // //   const handleKeyPress = (e) => {
// // // // // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // // // // //       e.preventDefault();
// // // // // // //       handleSend();
// // // // // // //     }
// // // // // // //   };
// // // // // // //
// // // // // // //   if (!chat)
// // // // // // //     return (
// // // // // // //       <div className="chat-window empty">
// // // // // // //         <p>Select a chat to start messaging</p>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //
// // // // // // //   return (
// // // // // // //     <div className="chat-window">
// // // // // // //       <div className="chat-window-header">
// // // // // // //         <div className="chat-user-info">
// // // // // // //           <div>
// // // // // // //             <h3>{chat.id}</h3>
// // // // // // //             <span className={`status-badge ${isPaused ? "paused" : "online"}`}>
// // // // // // //               {isPaused ? "Paused" : "Online"}
// // // // // // //             </span>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="chat-actions">
// // // // // // //           <button
// // // // // // //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// // // // // // //             onClick={() => onTogglePause(chat.id)}
// // // // // // //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// // // // // // //           >
// // // // // // //             {isPaused ? "🔓" : "🔒"}
// // // // // // //           </button>
// // // // // // //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// // // // // // //             Close
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //
// // // // // // //       <div className="messages-container">
// // // // // // //         {isLoadingMessages ? (
// // // // // // //           <div className="empty-state">Loading messages...</div>
// // // // // // //         ) : messages.length === 0 ? (
// // // // // // //           <div className="empty-state">No messages yet. Start the conversation!</div>
// // // // // // //         ) : (
// // // // // // //           messages.map((msg, i) => (
// // // // // // //             <div key={i} className={`message ${msg.sender || "user"}`}>
// // // // // // //               <div className={`message-bubble ${msg.sender === "agent" ? "orange-bubble" : ""}`}>
// // // // // // //                 {msg.text}
// // // // // // //               </div>
// // // // // // //               <div className="message-time">
// // // // // // //                 {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           ))
// // // // // // //         )}
// // // // // // //         {isTyping && !isPaused && (
// // // // // // //           <div className="message customer">
// // // // // // //             <div className="message-bubble typing-indicator">
// // // // // // //               <span></span>
// // // // // // //               <span></span>
// // // // // // //               <span></span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //         <div ref={messagesEndRef} />
// // // // // // //       </div>
// // // // // // //
// // // // // // //       {isPaused && (
// // // // // // //         <div className="pause-banner">
// // // // // // //           <span className="pause-icon-small">🔒</span>
// // // // // // //           <span>Chat is locked. Click unlock icon to resume messaging.</span>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //
// // // // // // //       <div className={`message-input-container ${isPaused ? "disabled" : ""}`}>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder={isPaused ? "Chat is paused..." : "Type your message..."}
// // // // // // //           value={message}
// // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // //           onKeyPress={handleKeyPress}
// // // // // // //           className="message-input"
// // // // // // //           disabled={isPaused}
// // // // // // //         />
// // // // // // //         <button onClick={handleSend} className="send-btn" disabled={isPaused}>
// // // // // // //           Send
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };
// // // // // // //
// // // // // // // /* -------------------------- Customer Info Component -------------------------- */
// // // // // // // const CustomerInfo = ({ chat }) => {
// // // // // // //   if (!chat) return null;
// // // // // // //
// // // // // // //   return (
// // // // // // //     <div className="customer-info">
// // // // // // //       <h2>Chat Details</h2>
// // // // // // //       <p className="customer-channel">{chat.channel}</p>
// // // // // // //
// // // // // // //       <div className="info-section">
// // // // // // //         <div className="info-item">
// // // // // // //           <span className="info-label">Chat ID</span>
// // // // // // //           <span className="info-value">{chat.id}</span>
// // // // // // //         </div>
// // // // // // //         <div className="info-item">
// // // // // // //           <span className="info-label">Conversation ID</span>
// // // // // // //           <span className="info-value">{chat.conversation_id}</span>
// // // // // // //         </div>
// // // // // // //         <div className="info-item">
// // // // // // //           <span className="info-label">Status</span>
// // // // // // //           <span className="info-value">{chat.status}</span>
// // // // // // //         </div>
// // // // // // //         <div className="info-item">
// // // // // // //           <span className="info-label">Sentiment</span>
// // // // // // //           <span className="info-value">{chat.sentiment}</span>
// // // // // // //         </div>
// // // // // // //         <div className="info-item">
// // // // // // //           <span className="info-label">Channel</span>
// // // // // // //           <span className="info-value">{chat.channel}</span>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //
// // // // // // //       <div className="notes-section">
// // // // // // //         <h3>Notes</h3>
// // // // // // //         <textarea
// // // // // // //           className="notes-textarea"
// // // // // // //           placeholder="Add notes about this conversation..."
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //
// // // // // // //       <div className="activity-section">
// // // // // // //         <h3>Recent Activity</h3>
// // // // // // //         <div className="activity-item">
// // // // // // //           <strong>Chat started</strong>
// // // // // // //           <div className="activity-time">Just now</div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };
// // // // // // //
// // // // // // // /* -------------------------- Main Agent Console -------------------------- */
// // // // // // // const AgentConsole = () => {
// // // // // // //   const [activeChat, setActiveChat] = useState(null);
// // // // // // //   const [consoleSocket, setConsoleSocket] = useState(null);
// // // // // // //   const [conversationSocket, setConversationSocket] = useState(null);
// // // // // // //   const [chats, setChats] = useState([]);
// // // // // // //   const [messages, setMessages] = useState({});
// // // // // // //   const [pausedChats, setPausedChats] = useState(new Set());
// // // // // // //   const [connectionStatus, setConnectionStatus] = useState("disconnected");
// // // // // // //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
// // // // // // //
// // // // // // //   useEffect(() => {
// // // // // // //     const tenantId = localStorage.getItem("tenant_id");
// // // // // // //     const agentId = localStorage.getItem("username");
// // // // // // //     const token = localStorage.getItem("auth_token");
// // // // // // //
// // // // // // //     if (!tenantId || !agentId || !token) {
// // // // // // //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// // // // // // //       setConnectionStatus("error");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //
// // // // // // //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// // // // // // //       token
// // // // // // //     )}`;
// // // // // // //     console.log("🔌 Connecting to Agent Console:", wsUrl);
// // // // // // //     const ws = new WebSocket(wsUrl);
// // // // // // //     setConsoleSocket(ws);
// // // // // // //     setConnectionStatus("connecting");
// // // // // // //
// // // // // // //     ws.onopen = () => {
// // // // // // //       console.log("✅ Connected to Agent Console");
// // // // // // //       setConnectionStatus("connected");
// // // // // // //     };
// // // // // // //
// // // // // // //     ws.onmessage = (event) => {
// // // // // // //       const data = JSON.parse(event.data);
// // // // // // //       console.log("📩 Console event:", data);
// // // // // // //
// // // // // // //       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
// // // // // // //         const formattedChats = data.conversations.map((c) => ({
// // // // // // //           id: c.id,
// // // // // // //           conversation_id: c.id,
// // // // // // //           channel: c.channel || "unknown",
// // // // // // //           status: c.status || "active",
// // // // // // //           sentiment: c.sentiment || "neutral",
// // // // // // //         }));
// // // // // // //         setChats(formattedChats);
// // // // // // //       } else if (data.type === "new_conversation") {
// // // // // // //         setChats((prev) => [
// // // // // // //           {
// // // // // // //             id: data.conversation.id,
// // // // // // //             conversation_id: data.conversation.id,
// // // // // // //             channel: data.conversation.channel || "unknown",
// // // // // // //             status: "active",
// // // // // // //             sentiment: data.conversation.sentiment || "neutral",
// // // // // // //           },
// // // // // // //           ...prev,
// // // // // // //         ]);
// // // // // // //       } else if (data.type === "conversation_closed") {
// // // // // // //         handleConversationClosed(data.conversation_id);
// // // // // // //       }
// // // // // // //     };
// // // // // // //
// // // // // // //     ws.onclose = () => {
// // // // // // //       console.log("❌ Console socket closed");
// // // // // // //       setConnectionStatus("disconnected");
// // // // // // //     };
// // // // // // //
// // // // // // //     ws.onerror = (err) => {
// // // // // // //       console.error("⚠️ Console socket error:", err);
// // // // // // //       setConnectionStatus("error");
// // // // // // //     };
// // // // // // //
// // // // // // //     return () => ws.close();
// // // // // // //   }, []);
// // // // // // //
// // // // // // //   /* ---------------- Conversation Socket ---------------- */
// // // // // // //   useEffect(() => {
// // // // // // //     if (!activeChat) {
// // // // // // //       if (conversationSocket) conversationSocket.close();
// // // // // // //       return;
// // // // // // //     }
// // // // // // //
// // // // // // //     const token = localStorage.getItem("auth_token");
// // // // // // //     const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // // // // // //       token
// // // // // // //     )}`;
// // // // // // //     const convWs = new WebSocket(convWsUrl);
// // // // // // //     setConversationSocket(convWs);
// // // // // // //     setIsLoadingMessages(true);
// // // // // // //
// // // // // // //     convWs.onopen = () => convWs.send(JSON.stringify({ action: "join_conversation" }));
// // // // // // //     convWs.onmessage = (event) => {
// // // // // // //       const data = JSON.parse(event.data);
// // // // // // //       if (data.type === "history") {
// // // // // // //         setMessages((prev) => ({ ...prev, [activeChat.conversation_id]: data.messages }));
// // // // // // //         setIsLoadingMessages(false);
// // // // // // //       } else if (data.type === "message") handleConversationMessage(data);
// // // // // // //     };
// // // // // // //     convWs.onclose = () => setIsLoadingMessages(false);
// // // // // // //     convWs.onerror = () => setIsLoadingMessages(false);
// // // // // // //
// // // // // // //     return () => convWs.close();
// // // // // // //   }, [activeChat]);
// // // // // // //
// // // // // // //   const handleConversationMessage = (data) => {
// // // // // // //     const convId = data.conversation_id || activeChat?.conversation_id;
// // // // // // //     if (!convId) return;
// // // // // // //
// // // // // // //     setMessages((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [convId]: [...(prev[convId] || []), data],
// // // // // // //     }));
// // // // // // //   };
// // // // // // //
// // // // // // //   const handleConversationClosed = (id) => {
// // // // // // //     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
// // // // // // //     if (activeChat?.conversation_id === id) setActiveChat(null);
// // // // // // //   };
// // // // // // //
// // // // // // //   const handleSendMessage = (text) => {
// // // // // // //     if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) return;
// // // // // // //     const msg = { type: "message", text };
// // // // // // //     conversationSocket.send(JSON.stringify(msg));
// // // // // // //   };
// // // // // // //
// // // // // // //   const handleTogglePause = (chatId) => {
// // // // // // //     setPausedChats((prev) => {
// // // // // // //       const s = new Set(prev);
// // // // // // //       s.has(chatId) ? s.delete(chatId) : s.add(chatId);
// // // // // // //       return s;
// // // // // // //     });
// // // // // // //   };
// // // // // // //
// // // // // // //   const handleCloseChat = (chatId) => {
// // // // // // //     conversationSocket?.send(JSON.stringify({ type: "close_conversation" }));
// // // // // // //     handleConversationClosed(chatId);
// // // // // // //   };
// // // // // // //
// // // // // // //   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
// // // // // // //   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];
// // // // // // //
// // // // // // //   return (
// // // // // // //     <div className="app">
// // // // // // //       <ChatList
// // // // // // //         chats={chats}
// // // // // // //         activeChat={activeChat}
// // // // // // //         setActiveChat={setActiveChat}
// // // // // // //         pausedChats={pausedChats}
// // // // // // //       />
// // // // // // //
// // // // // // //       <ChatWindow
// // // // // // //         chat={activeChat}
// // // // // // //         socket={conversationSocket}
// // // // // // //         isTyping={false}
// // // // // // //         onCloseChat={handleCloseChat}
// // // // // // //         isPaused={isPaused}
// // // // // // //         onTogglePause={handleTogglePause}
// // // // // // //         messages={activeChatMessages}
// // // // // // //         onSendMessage={handleSendMessage}
// // // // // // //         isLoadingMessages={isLoadingMessages}
// // // // // // //       />
// // // // // // //
// // // // // // //       <CustomerInfo chat={activeChat} />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };
// // // // // // //
// // // // // // // export default AgentConsole;
// // // // // // //
// // // // // // //
// // // // // // //
// // // // // // //

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import "../../styles/conversation.css";

// // // // // // /* -------------------------- Chat List Component -------------------------- */
// // // // // // const ChatList = ({ chats, activeChat, setActiveChat, pausedChats }) => {
// // // // // //   const [searchTerm, setSearchTerm] = useState("");

// // // // // //   const filteredChats = chats.filter((chat) =>
// // // // // //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="chat-list">
// // // // // //       <div className="chat-list-header">
// // // // // //         <h2>Inbox</h2>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Search by chat ID..."
// // // // // //           value={searchTerm}
// // // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //           className="search-input"
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="chats-section">
// // // // // //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// // // // // //         {filteredChats.length === 0 ? (
// // // // // //           <div className="empty-state">No conversations yet</div>
// // // // // //         ) : (
// // // // // //           filteredChats.map((chat) => {
// // // // // //             const isPaused = pausedChats.has(chat.id);
// // // // // //             const isActive = activeChat?.id === chat.id;
// // // // // //             return (
// // // // // //               <div
// // // // // //                 key={chat.id}
// // // // // //                 className={`chat-item ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
// // // // // //                 onClick={() => setActiveChat(chat)}
// // // // // //               >
// // // // // //                 <div className="chat-info">
// // // // // //                   <div className="chat-header-row">
// // // // // //                     <span className="chat-name">{chat.id}</span>
// // // // // //                     <span className="chat-time">{chat.channel}</span>
// // // // // //                   </div>

// // // // // //                   {chat.sentiment && (
// // // // // //                     <span
// // // // // //                       className={`sentiment-tag ${
// // // // // //                         chat.sentiment === "negative"
// // // // // //                           ? "sentiment-negative"
// // // // // //                           : chat.sentiment === "positive"
// // // // // //                           ? "sentiment-positive"
// // // // // //                           : "sentiment-neutral"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       {chat.sentiment}
// // // // // //                     </span>
// // // // // //                   )}

// // // // // //                   <span className="chat-status">{chat.status}</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             );
// // // // // //           })
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // /* -------------------------- Chat Window Component -------------------------- */
// // // // // // const ChatWindow = ({
// // // // // //   chat,
// // // // // //   isTyping,
// // // // // //   onCloseChat,
// // // // // //   isPaused,
// // // // // //   onTogglePause,
// // // // // //   messages,
// // // // // //   onSendMessage,
// // // // // //   isLoadingMessages,
// // // // // //   conversationSocketStatus,
// // // // // // }) => {
// // // // // //   const [message, setMessage] = useState("");
// // // // // //   const messagesEndRef = useRef(null);

// // // // // //   useEffect(() => {
// // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // //   }, [messages, isTyping]);

// // // // // //   const handleSend = () => {
// // // // // //     if (!message.trim() || isPaused || conversationSocketStatus !== 'connected') return;
// // // // // //     onSendMessage(message);
// // // // // //     setMessage("");
// // // // // //   };

// // // // // //   const handleKeyPress = (e) => {
// // // // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // // // //       e.preventDefault();
// // // // // //       handleSend();
// // // // // //     }
// // // // // //   };

// // // // // //   if (!chat)
// // // // // //     return (
// // // // // //       <div className="chat-window empty">
// // // // // //         <p>Select a chat to start messaging</p>
// // // // // //       </div>
// // // // // //     );

// // // // // //   return (
// // // // // //     <div className="chat-window">
// // // // // //       <div className="chat-window-header">
// // // // // //         <div className="chat-user-info">
// // // // // //           <div>
// // // // // //             <h3>{chat.id}</h3>
// // // // // //             <span className={`status-badge ${isPaused ? "paused" : conversationSocketStatus === 'connected' ? "online" : "connecting"}`}>
// // // // // //               {isPaused ? "Paused" : conversationSocketStatus === 'connected' ? "Online" : "Connecting..."}
// // // // // //             </span>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="chat-actions">
// // // // // //           <button
// // // // // //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// // // // // //             onClick={() => onTogglePause(chat.id)}
// // // // // //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// // // // // //           >
// // // // // //             {isPaused ? "🔓" : "🔒"}
// // // // // //           </button>
// // // // // //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// // // // // //             Close
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="messages-container">
// // // // // //         {isLoadingMessages ? (
// // // // // //           <div className="empty-state">Loading messages...</div>
// // // // // //         ) : messages.length === 0 ? (
// // // // // //           <div className="empty-state">No messages yet. Start the conversation!</div>
// // // // // //         ) : (
// // // // // //           messages.map((msg, i) => (
// // // // // //             <div key={i} className={`message ${msg.sender || "user"}`}>
// // // // // //               <div className={`message-bubble ${msg.sender === "agent" ? "orange-bubble" : ""}`}>
// // // // // //                 {msg.text}
// // // // // //               </div>
// // // // // //               <div className="message-time">
// // // // // //                 {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))
// // // // // //         )}
// // // // // //         {isTyping && !isPaused && (
// // // // // //           <div className="message customer">
// // // // // //             <div className="message-bubble typing-indicator">
// // // // // //               <span></span>
// // // // // //               <span></span>
// // // // // //               <span></span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //         <div ref={messagesEndRef} />
// // // // // //       </div>

// // // // // //       {isPaused && (
// // // // // //         <div className="pause-banner">
// // // // // //           <span className="pause-icon-small">🔒</span>
// // // // // //           <span>Chat is locked. Click unlock icon to resume messaging.</span>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className={`message-input-container ${isPaused || conversationSocketStatus !== 'connected' ? "disabled" : ""}`}>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder={isPaused ? "Chat is paused..." : conversationSocketStatus !== 'connected' ? "Connecting..." : "Type your message..."}
// // // // // //           value={message}
// // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // //           onKeyPress={handleKeyPress}
// // // // // //           className="message-input"
// // // // // //           disabled={isPaused || conversationSocketStatus !== 'connected'}
// // // // // //         />
// // // // // //         <button
// // // // // //           onClick={handleSend}
// // // // // //           className="send-btn"
// // // // // //           disabled={isPaused || conversationSocketStatus !== 'connected'}
// // // // // //         >
// // // // // //           Send
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // /* -------------------------- Customer Info Component -------------------------- */
// // // // // // const CustomerInfo = ({ chat }) => {
// // // // // //   if (!chat) return null;

// // // // // //   return (
// // // // // //     <div className="customer-info">
// // // // // //       <h2>Chat Details</h2>
// // // // // //       <p className="customer-channel">{chat.channel}</p>

// // // // // //       <div className="info-section">
// // // // // //         <div className="info-item">
// // // // // //           <span className="info-label">Chat ID</span>
// // // // // //           <span className="info-value">{chat.id}</span>
// // // // // //         </div>
// // // // // //         <div className="info-item">
// // // // // //           <span className="info-label">Conversation ID</span>
// // // // // //           <span className="info-value">{chat.conversation_id}</span>
// // // // // //         </div>
// // // // // //         <div className="info-item">
// // // // // //           <span className="info-label">Status</span>
// // // // // //           <span className="info-value">{chat.status}</span>
// // // // // //         </div>
// // // // // //         <div className="info-item">
// // // // // //           <span className="info-label">Sentiment</span>
// // // // // //           <span className="info-value">{chat.sentiment}</span>
// // // // // //         </div>
// // // // // //         <div className="info-item">
// // // // // //           <span className="info-label">Channel</span>
// // // // // //           <span className="info-value">{chat.channel}</span>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="notes-section">
// // // // // //         <h3>Notes</h3>
// // // // // //         <textarea
// // // // // //           className="notes-textarea"
// // // // // //           placeholder="Add notes about this conversation..."
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="activity-section">
// // // // // //         <h3>Recent Activity</h3>
// // // // // //         <div className="activity-item">
// // // // // //           <strong>Chat started</strong>
// // // // // //           <div className="activity-time">Just now</div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // /* -------------------------- Main Agent Console -------------------------- */
// // // // // // const AgentConsole = () => {
// // // // // //   const [activeChat, setActiveChat] = useState(null);
// // // // // //   const [consoleSocket, setConsoleSocket] = useState(null);
// // // // // //   const [conversationSocket, setConversationSocket] = useState(null);
// // // // // //   const [conversationSocketStatus, setConversationSocketStatus] = useState('disconnected');
// // // // // //   const [chats, setChats] = useState([]);
// // // // // //   const [messages, setMessages] = useState({});
// // // // // //   const [pausedChats, setPausedChats] = useState(new Set());
// // // // // //   const [connectionStatus, setConnectionStatus] = useState("disconnected");
// // // // // //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

// // // // // //   // Console WebSocket - listens for new conversations
// // // // // //   useEffect(() => {
// // // // // //     const tenantId = localStorage.getItem("tenant_id");
// // // // // //     const agentId = localStorage.getItem("username");
// // // // // //     const token = localStorage.getItem("agent_token");
// // // // // //     console.log("🏢 Tenant ID:", tenantId || "❌ Not found");
// // // // // //     console.log("👤 Agent Username:", agentId || "❌ Not found");
// // // // // //     console.log("🔑 Auth Token:", token ? token.slice(0, 20) + "..." : "❌ Not found");

// // // // // //     if (!tenantId || !agentId || !token) {
// // // // // //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// // // // // //       setConnectionStatus("error");
// // // // // //       return;
// // // // // //     }

// // // // // //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// // // // // //       token
// // // // // //     )}`;
// // // // // //     console.log("🔌 Connecting to Agent Console:", wsUrl);
// // // // // //     const ws = new WebSocket(wsUrl);
// // // // // //     setConsoleSocket(ws);
// // // // // //     setConnectionStatus("connecting");

// // // // // //     ws.onopen = () => {
// // // // // //       console.log("✅ Connected to Agent Console");
// // // // // //       setConnectionStatus("connected");
// // // // // //     };

// // // // // //     ws.onmessage = (event) => {
// // // // // //       const data = JSON.parse(event.data);
// // // // // //       console.log("📩 Console event:", data);

// // // // // //       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
// // // // // //         const formattedChats = data.conversations.map((c) => ({
// // // // // //           id: c.id,
// // // // // //           conversation_id: c.id,
// // // // // //           channel: c.channel || "unknown",
// // // // // //           status: c.status || "active",
// // // // // //           sentiment: c.sentiment || "neutral",
// // // // // //         }));
// // // // // //         setChats(formattedChats);
// // // // // //       } else if (data.type === "new_conversation") {
// // // // // //         setChats((prev) => [
// // // // // //           {
// // // // // //             id: data.conversation.id,
// // // // // //             conversation_id: data.conversation.id,
// // // // // //             channel: data.conversation.channel || "unknown",
// // // // // //             status: "active",
// // // // // //             sentiment: data.conversation.sentiment || "neutral",
// // // // // //           },
// // // // // //           ...prev,
// // // // // //         ]);
// // // // // //       } else if (data.type === "conversation_closed") {
// // // // // //         handleConversationClosed(data.conversation_id);
// // // // // //       }
// // // // // //     };

// // // // // //     ws.onclose = () => {
// // // // // //       console.log("❌ Console socket closed");
// // // // // //       setConnectionStatus("disconnected");
// // // // // //     };

// // // // // //     ws.onerror = (err) => {
// // // // // //       console.error("⚠️ Console socket error:", err);
// // // // // //       setConnectionStatus("error");
// // // // // //     };

// // // // // //     return () => ws.close();
// // // // // //   }, []);

// // // // // //   /* ---------------- Conversation Socket - FIXED VERSION ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     // Close previous conversation socket if exists
// // // // // //     if (conversationSocket) {
// // // // // //       console.log("🔌 Closing previous conversation socket");
// // // // // //       conversationSocket.close();
// // // // // //       setConversationSocket(null);
// // // // // //     }

// // // // // //     // If no active chat selected, don't connect
// // // // // //     if (!activeChat) {
// // // // // //       setConversationSocketStatus('disconnected');
// // // // // //       return;
// // // // // //     }

// // // // // //     const token = localStorage.getItem("agent_token");
// // // // // //     const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // // // // //       token
// // // // // //     )}`;

// // // // // //     console.log(`🔌 Connecting to conversation: ${activeChat.conversation_id}`);
// // // // // //     console.log(`🔗 URL: ${convWsUrl}`);

// // // // // //     const convWs = new WebSocket(convWsUrl);
// // // // // //     setConversationSocket(convWs);
// // // // // //     setConversationSocketStatus('connecting');
// // // // // //     setIsLoadingMessages(true);

// // // // // //     convWs.onopen = () => {
// // // // // //       console.log(`✅ Connected to conversation: ${activeChat.conversation_id}`);
// // // // // //       setConversationSocketStatus('connected');

// // // // // //       // CRITICAL: Send join_conversation to get message history
// // // // // //       const joinMessage = {
// // // // // //         action: "join_conversation",
// // // // // //         conversation_id: activeChat.conversation_id
// // // // // //       };
// // // // // //       console.log("📤 Sending join_conversation:", joinMessage);
// // // // // //       convWs.send(JSON.stringify(joinMessage));
// // // // // //     };

// // // // // //     convWs.onmessage = (event) => {
// // // // // //       const data = JSON.parse(event.data);
// // // // // //       console.log("📨 Conversation message:", data);

// // // // // //       if (data.type === "history") {
// // // // // //         // Message history received
// // // // // //         console.log(`📜 Received ${data.messages?.length || 0} historical messages`);
// // // // // //         setMessages((prev) => ({
// // // // // //           ...prev,
// // // // // //           [activeChat.conversation_id]: data.messages || []
// // // // // //         }));
// // // // // //         setIsLoadingMessages(false);
// // // // // //       } else if (data.type === "message") {
// // // // // //         // New real-time message
// // // // // //         console.log("💬 New message received:", data);
// // // // // //         handleConversationMessage(data);
// // // // // //       } else if (data.type === "error") {
// // // // // //         console.error("❌ Conversation error:", data.message);
// // // // // //         setIsLoadingMessages(false);
// // // // // //       }
// // // // // //     };

// // // // // //     convWs.onclose = (event) => {
// // // // // //       console.log(`❌ Conversation socket closed: ${activeChat.conversation_id}`, event);
// // // // // //       setConversationSocketStatus('disconnected');
// // // // // //       setIsLoadingMessages(false);
// // // // // //     };

// // // // // //     convWs.onerror = (error) => {
// // // // // //       console.error(`⚠️ Conversation socket error: ${activeChat.conversation_id}`, error);
// // // // // //       setConversationSocketStatus('error');
// // // // // //       setIsLoadingMessages(false);
// // // // // //     };

// // // // // //     // Cleanup function
// // // // // //     return () => {
// // // // // //       console.log(`🧹 Cleaning up conversation socket: ${activeChat.conversation_id}`);
// // // // // //       convWs.close();
// // // // // //     };
// // // // // //   }, [activeChat]); // Re-run when activeChat changes

// // // // // //   const handleConversationMessage = (data) => {
// // // // // //     const convId = data.conversation_id || activeChat?.conversation_id;
// // // // // //     if (!convId) {
// // // // // //       console.warn("⚠️ Message received without conversation_id");
// // // // // //       return;
// // // // // //     }

// // // // // //     setMessages((prev) => ({
// // // // // //       ...prev,
// // // // // //       [convId]: [...(prev[convId] || []), data],
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleConversationClosed = (id) => {
// // // // // //     console.log(`🚪 Closing conversation: ${id}`);
// // // // // //     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
// // // // // //     if (activeChat?.conversation_id === id) {
// // // // // //       setActiveChat(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSendMessage = (text) => {
// // // // // //     if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) {
// // // // // //       console.error("❌ Cannot send message: WebSocket not connected");
// // // // // //       return;
// // // // // //     }

// // // // // //     const msg = {
// // // // // //       type: "message",
// // // // // //       text,
// // // // // //       conversation_id: activeChat.conversation_id
// // // // // //     };

// // // // // //     console.log("📤 Sending message:", msg);
// // // // // //     conversationSocket.send(JSON.stringify(msg));

// // // // // //     // Optimistically add message to UI
// // // // // //     handleConversationMessage({
// // // // // //       conversation_id: activeChat.conversation_id,
// // // // // //       sender: "agent",
// // // // // //       text: text,
// // // // // //       timestamp: new Date().toISOString()
// // // // // //     });
// // // // // //   };

// // // // // //   const handleTogglePause = (chatId) => {
// // // // // //     setPausedChats((prev) => {
// // // // // //       const s = new Set(prev);
// // // // // //       s.has(chatId) ? s.delete(chatId) : s.add(chatId);
// // // // // //       return s;
// // // // // //     });
// // // // // //   };

// // // // // //   const handleCloseChat = (chatId) => {
// // // // // //     if (conversationSocket && conversationSocket.readyState === WebSocket.OPEN) {
// // // // // //       conversationSocket.send(JSON.stringify({
// // // // // //         type: "close_conversation",
// // // // // //         conversation_id: activeChat.conversation_id
// // // // // //       }));
// // // // // //     }
// // // // // //     handleConversationClosed(chatId);
// // // // // //   };

// // // // // //   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
// // // // // //   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];

// // // // // //   return (
// // // // // //     <div className="app">
// // // // // //       <ChatList
// // // // // //         chats={chats}
// // // // // //         activeChat={activeChat}
// // // // // //         setActiveChat={setActiveChat}
// // // // // //         pausedChats={pausedChats}
// // // // // //       />

// // // // // //       <ChatWindow
// // // // // //         chat={activeChat}
// // // // // //         isTyping={false}
// // // // // //         onCloseChat={handleCloseChat}
// // // // // //         isPaused={isPaused}
// // // // // //         onTogglePause={handleTogglePause}
// // // // // //         messages={activeChatMessages}
// // // // // //         onSendMessage={handleSendMessage}
// // // // // //         isLoadingMessages={isLoadingMessages}
// // // // // //         conversationSocketStatus={conversationSocketStatus}
// // // // // //       />

// // // // // //       <CustomerInfo chat={activeChat} />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AgentConsole;





// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import "../../styles/conversation.css";

// // // // // /* -------------------------- Chat List Component -------------------------- */
// // // // // const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
// // // // //   const [searchTerm, setSearchTerm] = useState("");

// // // // //   const filteredChats = chats.filter((chat) =>
// // // // //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   return (
// // // // //     <div className="chat-list">
// // // // //       <div className="chat-list-header">
// // // // //         <h2>Inbox</h2>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search by chat ID..."
// // // // //           value={searchTerm}
// // // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // // //           className="search-input"
// // // // //         />
// // // // //       </div>

// // // // //       <div className="chats-section">
// // // // //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// // // // //         {filteredChats.length === 0 ? (
// // // // //           <div className="empty-state">No conversations yet</div>
// // // // //         ) : (
// // // // //           filteredChats.map((chat) => {
// // // // //             const isPaused = pausedChats.has(chat.id);
// // // // //             const isActive = activeChat?.id === chat.id;
// // // // //             return (
// // // // //               <div
// // // // //                 key={chat.id}
// // // // //                 className={`chat-item ${isActive ? "active" : ""} ${
// // // // //                   isPaused ? "paused" : ""
// // // // //                 }`}
// // // // //                 onClick={() => handleChatClick(chat)}
// // // // //               >
// // // // //                 <div className="chat-info">
// // // // //                   <div className="chat-header-row">
// // // // //                     <span className="chat-name">{chat.id}</span>
// // // // //                     <span className="chat-time">{chat.channel}</span>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             );
// // // // //           })
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* -------------------------- Chat Window Component -------------------------- */
// // // // // const ChatWindow = ({
// // // // //   chat,
// // // // //   isTyping,
// // // // //   onCloseChat,
// // // // //   isPaused,
// // // // //   onTogglePause,
// // // // //   messages,
// // // // //   onSendMessage,
// // // // //   isLoadingMessages,
// // // // //   conversationSocketStatus,
// // // // // }) => {
// // // // //   const [message, setMessage] = useState("");
// // // // //   const messagesEndRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [messages, isTyping]);

// // // // //   const handleSend = () => {
// // // // //     if (!message.trim() || isPaused || conversationSocketStatus !== "connected") return;
// // // // //     onSendMessage(message);
// // // // //     setMessage("");
// // // // //   };

// // // // //   const handleKeyPress = (e) => {
// // // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // // //       e.preventDefault();
// // // // //       handleSend();
// // // // //     }
// // // // //   };

// // // // //   if (!chat)
// // // // //     return (
// // // // //       <div className="chat-window empty">
// // // // //         <p>Select a chat to start messaging</p>
// // // // //       </div>
// // // // //     );

// // // // //   return (
// // // // //     <div className="chat-window">
// // // // //       <div className="chat-window-header">
// // // // //         <div className="chat-user-info">
// // // // //           <div>
// // // // //             <h3>{chat.id}</h3>
// // // // //             <span
// // // // //               className={`status-badge ${
// // // // //                 isPaused
// // // // //                   ? "paused"
// // // // //                   : conversationSocketStatus === "connected"
// // // // //                   ? "online"
// // // // //                   : "connecting"
// // // // //               }`}
// // // // //             >
// // // // //               {isPaused
// // // // //                 ? "Paused"
// // // // //                 : conversationSocketStatus === "connected"
// // // // //                 ? "Online"
// // // // //                 : "Connecting..."}
// // // // //             </span>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="chat-actions">
// // // // //           <button
// // // // //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// // // // //             onClick={() => onTogglePause(chat.id)}
// // // // //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// // // // //           >
// // // // //             {isPaused ? "🔓" : "🔒"}
// // // // //           </button>
// // // // //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// // // // //             Close
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="messages-container">
// // // // //         {isLoadingMessages ? (
// // // // //           <div className="empty-state">Loading messages...</div>
// // // // //         ) : messages.length === 0 ? (
// // // // //           <div className="empty-state">No messages yet. Start the conversation!</div>
// // // // //         ) : (
// // // // //           messages.map((msg) => (
// // // // //             <div key={msg.id} className={`message ${msg.sender || "user"}`}>
// // // // //               <div className={`message-bubble ${msg.sender === "agent" ? "orange-bubble" : ""}`}>
// // // // //                 {msg.text}
// // // // //               </div>
// // // // //               <div className="message-time">
// // // // //                 {new Date(msg.timestamp).toLocaleTimeString()}
// // // // //               </div>
// // // // //             </div>
// // // // //           ))
// // // // //         )}
// // // // //         {isTyping && !isPaused && (
// // // // //           <div className="message customer">
// // // // //             <div className="message-bubble typing-indicator">
// // // // //               <span></span>
// // // // //               <span></span>
// // // // //               <span></span>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //         <div ref={messagesEndRef} />
// // // // //       </div>

// // // // //       {isPaused && (
// // // // //         <div className="pause-banner">
// // // // //           <span className="pause-icon-small">🔒</span>
// // // // //           <span>Chat is locked. Click unlock icon to resume messaging.</span>
// // // // //         </div>
// // // // //       )}

// // // // //       <div
// // // // //         className={`message-input-container ${
// // // // //           isPaused || conversationSocketStatus !== "connected" ? "disabled" : ""
// // // // //         }`}
// // // // //       >
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder={
// // // // //             isPaused
// // // // //               ? "Chat is paused..."
// // // // //               : conversationSocketStatus !== "connected"
// // // // //               ? "Connecting..."
// // // // //               : "Type your message..."
// // // // //           }
// // // // //           value={message}
// // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // //           onKeyPress={handleKeyPress}
// // // // //           className="message-input"
// // // // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // // // //         />
// // // // //         <button
// // // // //           onClick={handleSend}
// // // // //           className="send-btn"
// // // // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // // // //         >
// // // // //           Send
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* -------------------------- Customer Info Component -------------------------- */
// // // // // const CustomerInfo = ({ chat }) => {
// // // // //   if (!chat) return null;

// // // // //   return (
// // // // //     <div className="customer-info">
// // // // //       <h2>Chat Details</h2>
// // // // //       <p className="customer-channel">{chat.channel}</p>

// // // // //       <div className="info-section">
// // // // //         <div className="info-item">
// // // // //           <span className="info-label">Chat ID</span>
// // // // //           <span className="info-value">{chat.id}</span>
// // // // //         </div>
// // // // //         <div className="info-item">
// // // // //           <span className="info-label">Conversation ID</span>
// // // // //           <span className="info-value">{chat.conversation_id}</span>
// // // // //         </div>
// // // // //         <div className="info-item">
// // // // //           <span className="info-label">Status</span>
// // // // //           <span className="info-value">{chat.status}</span>
// // // // //         </div>
// // // // //         <div className="info-item">
// // // // //           <span className="info-label">Sentiment</span>
// // // // //           <span className="info-value">{chat.sentiment}</span>
// // // // //         </div>
// // // // //         <div className="info-item">
// // // // //           <span className="info-label">Channel</span>
// // // // //           <span className="info-value">{chat.channel}</span>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* -------------------------- Main Agent Console -------------------------- */
// // // // // const AgentConsole = () => {
// // // // //   const [activeChat, setActiveChat] = useState(null);
// // // // //   const [consoleSocket, setConsoleSocket] = useState(null);
// // // // //   const [conversationSocket, setConversationSocket] = useState(null);
// // // // //   const [conversationSocketStatus, setConversationSocketStatus] = useState("disconnected");
// // // // //   const [chats, setChats] = useState([]);
// // // // //   const [messages, setMessages] = useState({});
// // // // //   const [pausedChats, setPausedChats] = useState(new Set());
// // // // //   const [connectionStatus, setConnectionStatus] = useState("disconnected");
// // // // //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

// // // // //   /* ---------------- Console WebSocket ---------------- */
// // // // //   useEffect(() => {
// // // // //     const tenantId = localStorage.getItem("tenant_id");
// // // // //     const agentId = localStorage.getItem("agent_username");
// // // // //     const token = localStorage.getItem("agent_token");
// // // // //     console.log("🔐 Agent Token:", token?.slice(0, 30) + "...");

// // // // //     if (!tenantId || !agentId || !token) {
// // // // //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// // // // //       setConnectionStatus("error");
// // // // //       return;
// // // // //     }

// // // // //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// // // // //       token
// // // // //     )}`;
// // // // //     console.log("🔌 Connecting to Agent Console:", wsUrl);

// // // // //     const ws = new WebSocket(wsUrl);
// // // // //     setConsoleSocket(ws);
// // // // //     setConnectionStatus("connecting");

// // // // //     ws.onopen = () => {
// // // // //       console.log("✅ Connected to Agent Console");
// // // // //       setConnectionStatus("connected");
// // // // //     };

// // // // //     ws.onmessage = (event) => {
// // // // //       const data = JSON.parse(event.data);
// // // // //       console.log("📩 Console event:", data);

// // // // //       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
// // // // //         setChats(
// // // // //           data.conversations.map((c) => ({
// // // // //             id: c.id,
// // // // //             conversation_id: c.id,
// // // // //             channel: c.channel || "unknown",
// // // // //             status: c.status || "active",
// // // // //             sentiment: c.sentiment || "neutral",
// // // // //           }))
// // // // //         );
// // // // //       } else if (data.type === "new_conversation") {
// // // // //         setChats((prev) => [
// // // // //           {
// // // // //             id: data.conversation.id,
// // // // //             conversation_id: data.conversation.id,
// // // // //             channel: data.conversation.channel || "unknown",
// // // // //             status: "active",
// // // // //             sentiment: data.conversation.sentiment || "neutral",
// // // // //           },
// // // // //           ...prev,
// // // // //         ]);
// // // // //       } else if (data.type === "conversation_closed") {
// // // // //         handleConversationClosed(data.conversation_id);
// // // // //       }
// // // // //     };

// // // // //     ws.onclose = () => {
// // // // //       console.log("❌ Console socket closed");
// // // // //       setConnectionStatus("disconnected");
// // // // //     };

// // // // //     ws.onerror = (err) => {
// // // // //       console.error("⚠️ Console socket error:", err);
// // // // //       setConnectionStatus("error");
// // // // //     };

// // // // //     return () => ws.close();
// // // // //   }, []);

// // // // //   /* ---------------- Conversation WebSocket ---------------- */
// // // // //   useEffect(() => {
// // // // //     if (conversationSocket) {
// // // // //       console.log("🔄 Closing previous conversation socket");
// // // // //       conversationSocket.close();
// // // // //       setConversationSocket(null);
// // // // //     }

// // // // //     if (!activeChat) {
// // // // //       setConversationSocketStatus("disconnected");
// // // // //       return;
// // // // //     }

// // // // //     const token = localStorage.getItem("agent_token");
// // // // //     const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // // // //       token
// // // // //     )}`;

// // // // //     console.log("🔌 Connecting to Conversation WS:", convWsUrl);
// // // // //     console.log("🎯 Target Conversation ID:", activeChat.conversation_id);

// // // // //     const convWs = new WebSocket(convWsUrl);
// // // // //     setConversationSocket(convWs);
// // // // //     setConversationSocketStatus("connecting");

// // // // //     convWs.onopen = () => {
// // // // //       console.log("✅ WebSocket CONNECTED to conversation:", activeChat.conversation_id);
// // // // //       setConversationSocketStatus("connected");

// // // // //       const joinMessage = { type: "join", conversation_id: activeChat.conversation_id };
// // // // //       console.log("📤 Sending JOIN message:", joinMessage);
// // // // //       convWs.send(JSON.stringify(joinMessage));
// // // // //     };

// // // // //     convWs.onmessage = (event) => {
// // // // //       const data = JSON.parse(event.data);
// // // // //       console.log("📨 Received WebSocket message:", data);

// // // // //       if (data.type === "joined") {
// // // // //         console.log("🎉 Joined conversation:", data.conversation_id);
// // // // //       } else if (data.type === "message") {
// // // // //         handleConversationMessage(data);
// // // // //       } else if (data.type === "agent_joined") {
// // // // //         console.log("👤 Agent joined:", data.agent_name);
// // // // //       } else if (data.type === "conversation_resolved") {
// // // // //         console.log("✅ Conversation resolved");
// // // // //       } else if (data.type === "error") {
// // // // //         console.error("❌ WebSocket error:", data.error, data.message);
// // // // //       }
// // // // //     };

// // // // //     convWs.onclose = () => {
// // // // //       console.log("❌ Conversation socket CLOSED");
// // // // //       setConversationSocketStatus("disconnected");
// // // // //     };

// // // // //     convWs.onerror = (err) => {
// // // // //       console.error("⚠️ Conversation socket ERROR:", err);
// // // // //       setConversationSocketStatus("error");
// // // // //     };

// // // // //     return () => {
// // // // //       console.log("🧹 Cleanup: Closing conversation socket");
// // // // //       convWs.close();
// // // // //     };
// // // // //   }, [activeChat]);

// // // // //   /* ---------------- Helpers ---------------- */
// // // // //   const handleConversationMessage = (data) => {
// // // // //     const convId = data.conversation_id || activeChat?.conversation_id;
// // // // //     if (!convId) {
// // // // //       console.warn("⚠️ Received message without conversation_id");
// // // // //       return;
// // // // //     }

// // // // //     const newMessage = {
// // // // //       id: data.id || `msg_${Date.now()}`,
// // // // //       sender: data.sender,
// // // // //       text: data.text,
// // // // //       timestamp: data.timestamp || new Date().toISOString(),
// // // // //     };

// // // // //     console.log("➕ Adding message:", newMessage);
// // // // //     setMessages((prev) => ({
// // // // //       ...prev,
// // // // //       [convId]: [...(prev[convId] || []), newMessage],
// // // // //     }));
// // // // //   };

// // // // //   const handleConversationClosed = (id) => {
// // // // //     console.log("🚪 Closing conversation:", id);
// // // // //     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
// // // // //     if (activeChat?.conversation_id === id) setActiveChat(null);
// // // // //   };

// // // // //   const handleSendMessage = (text) => {
// // // // //     if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) {
// // // // //       console.warn("⚠️ Cannot send message - WebSocket not connected");
// // // // //       return;
// // // // //     }

// // // // //     const msg = {
// // // // //       type: "message",
// // // // //       text,
// // // // //       conversation_id: activeChat.conversation_id,
// // // // //     };

// // // // //     console.log("📤 Sending message:", msg);
// // // // //     conversationSocket.send(JSON.stringify(msg));

// // // // //     // Optimistic UI update
// // // // //     handleConversationMessage({
// // // // //       conversation_id: activeChat.conversation_id,
// // // // //       id: `msg_${Date.now()}`,
// // // // //       sender: "agent",
// // // // //       text,
// // // // //       timestamp: new Date().toISOString(),
// // // // //     });
// // // // //   };

// // // // //   const handleTogglePause = (chatId) => {
// // // // //     setPausedChats((prev) => {
// // // // //       const s = new Set(prev);
// // // // //       s.has(chatId) ? s.delete(chatId) : s.add(chatId);
// // // // //       return s;
// // // // //     });
// // // // //   };

// // // // //   const handleCloseChat = (chatId) => {
// // // // //     if (conversationSocket && conversationSocket.readyState === WebSocket.OPEN) {
// // // // //       conversationSocket.send(
// // // // //         JSON.stringify({
// // // // //           type: "close_conversation",
// // // // //           conversation_id: activeChat.conversation_id,
// // // // //         })
// // // // //       );
// // // // //     }
// // // // //     handleConversationClosed(chatId);
// // // // //   };

// // // // //   /* ---------------- Fetch Messages ---------------- */
// // // // //   const handleChatClick = async (chat) => {
// // // // //     console.log("🖱️ Chat clicked:", chat.conversation_id);

// // // // //     try {
// // // // //       const token = localStorage.getItem("agent_token");
// // // // //       if (!token) {
// // // // //         console.warn("⚠️ No agent_token found");
// // // // //         setActiveChat(chat);
// // // // //         return;
// // // // //       }

// // // // //       const possibleUrls = [
// // // // //         `http://localhost:8000/api/agent/conversations/${chat.conversation_id}/messages?limit=100`,
// // // // //         `http://localhost:8000/api/conversations/${chat.conversation_id}/messages?limit=100`,
// // // // //         `http://localhost:8000/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
// // // // //       ];

// // // // //       console.log("📡 Attempting to fetch messages for:", chat.conversation_id);
// // // // //       console.log("🔑 Token:", token.slice(0, 20) + "...");

// // // // //       setIsLoadingMessages(true);
// // // // //       let res = null;
// // // // //       let successUrl = null;

// // // // //       for (const url of possibleUrls) {
// // // // //         console.log("🔍 Trying URL:", url);
// // // // //         try {
// // // // //           res = await fetch(url, {
// // // // //             method: "GET",
// // // // //             headers: { Authorization: `Bearer ${token}` },
// // // // //           });

// // // // //           if (res.ok) {
// // // // //             successUrl = url;
// // // // //             console.log("✅ Success with:", url);
// // // // //             break;
// // // // //           } else {
// // // // //             console.log(`❌ Failed (${res.status}):`, url);
// // // // //           }
// // // // //         } catch (err) {
// // // // //           console.log("❌ Network error on URL:", url, err);
// // // // //         }
// // // // //       }

// // // // //       if (!res || !res.ok) {
// // // // //         console.error(`❌ All endpoints failed. Last status: ${res?.status}`);
// // // // //         setMessages((prev) => ({ ...prev, [chat.conversation_id]: [] }));
// // // // //         return;
// // // // //       }

// // // // //       const data = await res.json();
// // // // //       console.log(`✅ Received ${data.length} messages for`, chat.conversation_id);
// // // // //       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
// // // // //     } catch (err) {
// // // // //       console.error("⚠️ Error fetching messages:", err);
// // // // //     } finally {
// // // // //       setIsLoadingMessages(false);
// // // // //       setActiveChat(chat);
// // // // //       console.log("✅ Active chat set:", chat.conversation_id);
// // // // //     }
// // // // //   };

// // // // //   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
// // // // //   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];

// // // // //   return (
// // // // //     <div className="app">
// // // // //       <ChatList
// // // // //         chats={chats}
// // // // //         activeChat={activeChat}
// // // // //         pausedChats={pausedChats}
// // // // //         handleChatClick={handleChatClick}
// // // // //       />

// // // // //       <ChatWindow
// // // // //         chat={activeChat}
// // // // //         isTyping={false}
// // // // //         onCloseChat={handleCloseChat}
// // // // //         isPaused={isPaused}
// // // // //         onTogglePause={handleTogglePause}
// // // // //         messages={activeChatMessages}
// // // // //         onSendMessage={handleSendMessage}
// // // // //         isLoadingMessages={isLoadingMessages}
// // // // //         conversationSocketStatus={conversationSocketStatus}
// // // // //       />

// // // // //       <CustomerInfo chat={activeChat} />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AgentConsole;



// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import "../../styles/conversation.css";

// // // // /* -------------------------- Chat List Component -------------------------- */
// // // // const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
// // // //   const [searchTerm, setSearchTerm] = useState("");

// // // //   const filteredChats = chats.filter((chat) =>
// // // //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   return (
// // // //     <div className="chat-list">
// // // //       <div className="chat-list-header">
// // // //         <h2>Inbox</h2>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search by chat ID..."
// // // //           value={searchTerm}
// // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // //           className="search-input"
// // // //         />
// // // //       </div>

// // // //       <div className="chats-section">
// // // //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// // // //         {filteredChats.length === 0 ? (
// // // //           <div className="empty-state">No conversations yet</div>
// // // //         ) : (
// // // //           filteredChats.map((chat) => {
// // // //             const isPaused = pausedChats.has(chat.id);
// // // //             const isActive = activeChat?.id === chat.id;
// // // //             return (
// // // //               <div
// // // //                 key={chat.id}
// // // //                 className={`chat-item ${isActive ? "active" : ""} ${
// // // //                   isPaused ? "paused" : ""
// // // //                 }`}
// // // //                 onClick={() => handleChatClick(chat)}
// // // //               >
// // // //                 <div className="chat-info">
// // // //                   <div className="chat-header-row">
// // // //                     <span className="chat-name">{chat.id}</span>
// // // //                     <span className="chat-time">{chat.channel}</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* -------------------------- Chat Window Component -------------------------- */
// // // // const ChatWindow = ({
// // // //   chat,
// // // //   isTyping,
// // // //   onCloseChat,
// // // //   isPaused,
// // // //   onTogglePause,
// // // //   messages,
// // // //   onSendMessage,
// // // //   isLoadingMessages,
// // // //   conversationSocketStatus,
// // // // }) => {
// // // //   const [message, setMessage] = useState("");
// // // //   const messagesEndRef = useRef(null);

// // // //   useEffect(() => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //   }, [messages, isTyping]);

// // // //   const handleSend = () => {
// // // //     if (!message.trim() || isPaused || conversationSocketStatus !== "connected") return;
// // // //     onSendMessage(message);
// // // //     setMessage("");
// // // //   };

// // // //   const handleKeyPress = (e) => {
// // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // //       e.preventDefault();
// // // //       handleSend();
// // // //     }
// // // //   };

// // // //   if (!chat)
// // // //     return (
// // // //       <div className="chat-window empty">
// // // //         <p>Select a chat to start messaging</p>
// // // //       </div>
// // // //     );

// // // //   return (
// // // //     <div className="chat-window">
// // // //       <div className="chat-window-header">
// // // //         <div className="chat-user-info">
// // // //           <div>
// // // //             <h3>{chat.id}</h3>
// // // //             <span
// // // //               className={`status-badge ${
// // // //                 isPaused
// // // //                   ? "paused"
// // // //                   : conversationSocketStatus === "connected"
// // // //                   ? "online"
// // // //                   : "connecting"
// // // //               }`}
// // // //             >
// // // //               {isPaused
// // // //                 ? "Paused"
// // // //                 : conversationSocketStatus === "connected"
// // // //                 ? "Online"
// // // //                 : "Connecting..."}
// // // //             </span>
// // // //           </div>
// // // //         </div>
// // // //         <div className="chat-actions">
// // // //           <button
// // // //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// // // //             onClick={() => onTogglePause(chat.id)}
// // // //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// // // //           >
// // // //             {isPaused ? "🔓" : "🔒"}
// // // //           </button>
// // // //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// // // //             Close
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="messages-container">
// // // //         {isLoadingMessages ? (
// // // //           <div className="empty-state">Loading messages...</div>
// // // //         ) : messages.length === 0 ? (
// // // //           <div className="empty-state">No messages yet. Start the conversation!</div>
// // // //         ) : (
// // // //           messages.map((msg) => {
// // // //             const isAgent = msg.sender === "agent" || msg.sender === "ai";
// // // //             const isUser = msg.sender === "user" || msg.sender === "customer";
// // // //             return (
// // // //               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
// // // //                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
// // // //                   {msg.text}
// // // //                 </div>
// // // //                 <div className="message-time">
// // // //                   {new Date(msg.timestamp).toLocaleTimeString()}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })
// // // //         )}
// // // //         {isTyping && !isPaused && (
// // // //           <div className="message user">
// // // //             <div className="message-bubble user-bubble typing-indicator">
// // // //               <span></span>
// // // //               <span></span>
// // // //               <span></span>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //         <div ref={messagesEndRef} />
// // // //       </div>

// // // //       {isPaused && (
// // // //         <div className="pause-banner">
// // // //           <span className="pause-icon-small">🔒</span>
// // // //           <span>Chat is locked. Click unlock icon to resume messaging.</span>
// // // //         </div>
// // // //       )}

// // // //       <div
// // // //         className={`message-input-container ${
// // // //           isPaused || conversationSocketStatus !== "connected" ? "disabled" : ""
// // // //         }`}
// // // //       >
// // // //         <input
// // // //           type="text"
// // // //           placeholder={
// // // //             isPaused
// // // //               ? "Chat is paused..."
// // // //               : conversationSocketStatus !== "connected"
// // // //               ? "Connecting..."
// // // //               : "Type your message..."
// // // //           }
// // // //           value={message}
// // // //           onChange={(e) => setMessage(e.target.value)}
// // // //           onKeyPress={handleKeyPress}
// // // //           className="message-input"
// // // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // // //         />
// // // //         <button
// // // //           onClick={handleSend}
// // // //           className="send-btn"
// // // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // // //         >
// // // //           Send
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* -------------------------- Customer Info Component -------------------------- */
// // // // const CustomerInfo = ({ chat }) => {
// // // //   if (!chat) return null;

// // // //   return (
// // // //     <div className="customer-info">
// // // //       <h2>Chat Details</h2>
// // // //       <p className="customer-channel">{chat.channel}</p>

// // // //       <div className="info-section">
// // // //         <div className="info-item">
// // // //           <span className="info-label">Chat ID</span>
// // // //           <span className="info-value">{chat.id}</span>
// // // //         </div>
// // // //         <div className="info-item">
// // // //           <span className="info-label">Conversation ID</span>
// // // //           <span className="info-value">{chat.conversation_id}</span>
// // // //         </div>
// // // //         <div className="info-item">
// // // //           <span className="info-label">Status</span>
// // // //           <span className="info-value">{chat.status}</span>
// // // //         </div>
// // // //         <div className="info-item">
// // // //           <span className="info-label">Sentiment</span>
// // // //           <span className="info-value">{chat.sentiment}</span>
// // // //         </div>
// // // //         <div className="info-item">
// // // //           <span className="info-label">Channel</span>
// // // //           <span className="info-value">{chat.channel}</span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // /* -------------------------- Main Agent Console -------------------------- */
// // // // const AgentConsole = () => {
// // // //   const [activeChat, setActiveChat] = useState(null);
// // // //   const [consoleSocket, setConsoleSocket] = useState(null);
// // // //   const [conversationSocket, setConversationSocket] = useState(null);
// // // //   const [conversationSocketStatus, setConversationSocketStatus] = useState("disconnected");
// // // //   const [chats, setChats] = useState([]);
// // // //   const [messages, setMessages] = useState({});
// // // //   const [pausedChats, setPausedChats] = useState(new Set());
// // // //   const [connectionStatus, setConnectionStatus] = useState("disconnected");
// // // //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

// // // //   /* ---------------- Console WebSocket ---------------- */
// // // //   useEffect(() => {
// // // //     const tenantId = localStorage.getItem("tenant_id");
// // // //     const agentId = localStorage.getItem("agent_username");
// // // //     const token = localStorage.getItem("agent_token");
// // // //     console.log("🔐 Agent Token:", token?.slice(0, 30) + "...");

// // // //     if (!tenantId || !agentId || !token) {
// // // //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// // // //       setConnectionStatus("error");
// // // //       return;
// // // //     }

// // // //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// // // //       token
// // // //     )}`;
// // // //     console.log("🔌 Connecting to Agent Console:", wsUrl);

// // // //     const ws = new WebSocket(wsUrl);
// // // //     setConsoleSocket(ws);
// // // //     setConnectionStatus("connecting");

// // // //     ws.onopen = () => {
// // // //       console.log("✅ Connected to Agent Console");
// // // //       setConnectionStatus("connected");
// // // //     };

// // // //     ws.onmessage = (event) => {
// // // //       const data = JSON.parse(event.data);
// // // //       console.log("📩 Console event:", data);

// // // //       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
// // // //         setChats(
// // // //           data.conversations.map((c) => ({
// // // //             id: c.id,
// // // //             conversation_id: c.id,
// // // //             channel: c.channel || "unknown",
// // // //             status: c.status || "active",
// // // //             sentiment: c.sentiment || "neutral",
// // // //           }))
// // // //         );
// // // //       } else if (data.type === "new_conversation") {
// // // //         setChats((prev) => [
// // // //           {
// // // //             id: data.conversation.id,
// // // //             conversation_id: data.conversation.id,
// // // //             channel: data.conversation.channel || "unknown",
// // // //             status: "active",
// // // //             sentiment: data.conversation.sentiment || "neutral",
// // // //           },
// // // //           ...prev,
// // // //         ]);
// // // //       } else if (data.type === "conversation_closed") {
// // // //         handleConversationClosed(data.conversation_id);
// // // //       }
// // // //     };

// // // //     ws.onclose = () => {
// // // //       console.log("❌ Console socket closed");
// // // //       setConnectionStatus("disconnected");
// // // //     };

// // // //     ws.onerror = (err) => {
// // // //       console.error("⚠️ Console socket error:", err);
// // // //       setConnectionStatus("error");
// // // //     };

// // // //     return () => ws.close();
// // // //   }, []);

// // // //   /* ---------------- Conversation WebSocket ---------------- */
// // // //   useEffect(() => {
// // // //     if (conversationSocket) {
// // // //       console.log("🔄 Closing previous conversation socket");
// // // //       conversationSocket.close();
// // // //       setConversationSocket(null);
// // // //     }

// // // //     if (!activeChat) {
// // // //       setConversationSocketStatus("disconnected");
// // // //       return;
// // // //     }

// // // //     const token = localStorage.getItem("agent_token");
// // // //     const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // // //       token
// // // //     )}`;

// // // //     console.log("🔌 Connecting to Conversation WS:", convWsUrl);
// // // //     console.log("🎯 Target Conversation ID:", activeChat.conversation_id);

// // // //     const convWs = new WebSocket(convWsUrl);
// // // //     setConversationSocket(convWs);
// // // //     setConversationSocketStatus("connecting");

// // // //     convWs.onopen = () => {
// // // //       console.log("✅ WebSocket CONNECTED to conversation:", activeChat.conversation_id);
// // // //       setConversationSocketStatus("connected");

// // // //       const joinMessage = { type: "join", conversation_id: activeChat.conversation_id };
// // // //       console.log("📤 Sending JOIN message:", joinMessage);
// // // //       convWs.send(JSON.stringify(joinMessage));
// // // //     };

// // // //     convWs.onmessage = (event) => {
// // // //       const data = JSON.parse(event.data);
// // // //       console.log("📨 Received WebSocket message:", data);

// // // //       if (data.type === "joined") {
// // // //         console.log("🎉 Joined conversation:", data.conversation_id);
// // // //       } else if (data.type === "message") {
// // // //         handleConversationMessage(data);
// // // //       } else if (data.type === "agent_joined") {
// // // //         console.log("👤 Agent joined:", data.agent_name);
// // // //       } else if (data.type === "conversation_resolved") {
// // // //         console.log("✅ Conversation resolved");
// // // //       } else if (data.type === "error") {
// // // //         console.error("❌ WebSocket error:", data.error, data.message);
// // // //       }
// // // //     };

// // // //     convWs.onclose = () => {
// // // //       console.log("❌ Conversation socket CLOSED");
// // // //       setConversationSocketStatus("disconnected");
// // // //     };

// // // //     convWs.onerror = (err) => {
// // // //       console.error("⚠️ Conversation socket ERROR:", err);
// // // //       setConversationSocketStatus("error");
// // // //     };

// // // //     return () => {
// // // //       console.log("🧹 Cleanup: Closing conversation socket");
// // // //       convWs.close();
// // // //     };
// // // //   }, [activeChat]);

// // // //   /* ---------------- Helpers ---------------- */
// // // //   const handleConversationMessage = (data) => {
// // // //     const convId = data.conversation_id || activeChat?.conversation_id;
// // // //     if (!convId) {
// // // //       console.warn("⚠️ Received message without conversation_id");
// // // //       return;
// // // //     }

// // // //     const newMessage = {
// // // //       id: data.id || `msg_${Date.now()}`,
// // // //       sender: data.sender,
// // // //       text: data.text,
// // // //       timestamp: data.timestamp || new Date().toISOString(),
// // // //     };

// // // //     console.log("➕ Adding message:", newMessage);
// // // //     setMessages((prev) => ({
// // // //       ...prev,
// // // //       [convId]: [...(prev[convId] || []), newMessage],
// // // //     }));
// // // //   };

// // // //   const handleConversationClosed = (id) => {
// // // //     console.log("🚪 Closing conversation:", id);
// // // //     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
// // // //     if (activeChat?.conversation_id === id) setActiveChat(null);
// // // //   };

// // // //   const handleSendMessage = (text) => {
// // // //     if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) {
// // // //       console.warn("⚠️ Cannot send message - WebSocket not connected");
// // // //       return;
// // // //     }

// // // //     const msg = {
// // // //       type: "message",
// // // //       text,
// // // //       conversation_id: activeChat.conversation_id,
// // // //     };

// // // //     console.log("📤 Sending message:", msg);
// // // //     conversationSocket.send(JSON.stringify(msg));

// // // //     // Optimistic UI update
// // // //     handleConversationMessage({
// // // //       conversation_id: activeChat.conversation_id,
// // // //       id: `msg_${Date.now()}`,
// // // //       sender: "agent",
// // // //       text,
// // // //       timestamp: new Date().toISOString(),
// // // //     });
// // // //   };

// // // //   const handleTogglePause = (chatId) => {
// // // //     setPausedChats((prev) => {
// // // //       const s = new Set(prev);
// // // //       s.has(chatId) ? s.delete(chatId) : s.add(chatId);
// // // //       return s;
// // // //     });
// // // //   };

// // // //   const handleCloseChat = (chatId) => {
// // // //     if (conversationSocket && conversationSocket.readyState === WebSocket.OPEN) {
// // // //       conversationSocket.send(
// // // //         JSON.stringify({
// // // //           type: "close_conversation",
// // // //           conversation_id: activeChat.conversation_id,
// // // //         })
// // // //       );
// // // //     }
// // // //     handleConversationClosed(chatId);
// // // //   };

// // // //   /* ---------------- Fetch Messages ---------------- */
// // // //   const handleChatClick = async (chat) => {
// // // //     console.log("🖱️ Chat clicked:", chat.conversation_id);

// // // //     try {
// // // //       const token = localStorage.getItem("agent_token");
// // // //       if (!token) {
// // // //         console.warn("⚠️ No agent_token found");
// // // //         setActiveChat(chat);
// // // //         return;
// // // //       }

// // // //       const possibleUrls = [
// // // //         `http://localhost:8000/api/agent/conversations/${chat.conversation_id}/messages?limit=100`,
// // // //         `http://localhost:8000/api/conversations/${chat.conversation_id}/messages?limit=100`,
// // // //         `http://localhost:8000/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
// // // //       ];

// // // //       console.log("📡 Attempting to fetch messages for:", chat.conversation_id);
// // // //       console.log("🔑 Token:", token.slice(0, 20) + "...");

// // // //       setIsLoadingMessages(true);
// // // //       let res = null;
// // // //       let successUrl = null;

// // // //       for (const url of possibleUrls) {
// // // //         console.log("🔍 Trying URL:", url);
// // // //         try {
// // // //           res = await fetch(url, {
// // // //             method: "GET",
// // // //             headers: { Authorization: `Bearer ${token}` },
// // // //           });

// // // //           if (res.ok) {
// // // //             successUrl = url;
// // // //             console.log("✅ Success with:", url);
// // // //             break;
// // // //           } else {
// // // //             console.log(`❌ Failed (${res.status}):`, url);
// // // //           }
// // // //         } catch (err) {
// // // //           console.log("❌ Network error on URL:", url, err);
// // // //         }
// // // //       }

// // // //       if (!res || !res.ok) {
// // // //         console.error(`❌ All endpoints failed. Last status: ${res?.status}`);
// // // //         setMessages((prev) => ({ ...prev, [chat.conversation_id]: [] }));
// // // //         return;
// // // //       }

// // // //       const data = await res.json();
// // // //       console.log(`✅ Received ${data.length} messages for`, chat.conversation_id);
// // // //       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
// // // //     } catch (err) {
// // // //       console.error("⚠️ Error fetching messages:", err);
// // // //     } finally {
// // // //       setIsLoadingMessages(false);
// // // //       setActiveChat(chat);
// // // //       console.log("✅ Active chat set:", chat.conversation_id);
// // // //     }
// // // //   };

// // // //   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
// // // //   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];

// // // //   return (
// // // //     <div className="app">
// // // //       <ChatList
// // // //         chats={chats}
// // // //         activeChat={activeChat}
// // // //         pausedChats={pausedChats}
// // // //         handleChatClick={handleChatClick}
// // // //       />

// // // //       <ChatWindow
// // // //         chat={activeChat}
// // // //         isTyping={false}
// // // //         onCloseChat={handleCloseChat}
// // // //         isPaused={isPaused}
// // // //         onTogglePause={handleTogglePause}
// // // //         messages={activeChatMessages}
// // // //         onSendMessage={handleSendMessage}
// // // //         isLoadingMessages={isLoadingMessages}
// // // //         conversationSocketStatus={conversationSocketStatus}
// // // //       />

// // // //       <CustomerInfo chat={activeChat} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AgentConsole;


// // // import React, { useState, useEffect, useRef } from "react";
// // // import "../../styles/conversation.css";

// // // /* -------------------------- Chat List Component -------------------------- */
// // // const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   const filteredChats = chats.filter((chat) =>
// // //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="chat-list">
// // //       <div className="chat-list-header">
// // //         <h2>Inbox</h2>
// // //         <input
// // //           type="text"
// // //           placeholder="Search by chat ID..."
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //           className="search-input"
// // //         />
// // //       </div>

// // //       <div className="chats-section">
// // //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// // //         {filteredChats.length === 0 ? (
// // //           <div className="empty-state">No conversations yet</div>
// // //         ) : (
// // //           filteredChats.map((chat) => {
// // //             const isPaused = pausedChats.has(chat.id);
// // //             const isActive = activeChat?.id === chat.id;
// // //             return (
// // //               <div
// // //                 key={chat.id}
// // //                 className={`chat-item ${isActive ? "active" : ""} ${
// // //                   isPaused ? "paused" : ""
// // //                 }`}
// // //                 onClick={() => handleChatClick(chat)}
// // //               >
// // //                 <div className="chat-info">
// // //                   <div className="chat-header-row">
// // //                     <span className="chat-name">{chat.id}</span>
// // //                     <span className="chat-time">{chat.channel}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* -------------------------- Chat Window Component -------------------------- */
// // // const ChatWindow = ({
// // //   chat,
// // //   isTyping,
// // //   onCloseChat,
// // //   isPaused,
// // //   onTogglePause,
// // //   messages,
// // //   onSendMessage,
// // //   isLoadingMessages,
// // //   conversationSocketStatus,
// // // }) => {
// // //   const [message, setMessage] = useState("");
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, isTyping]);

// // //   const handleSend = () => {
// // //     if (!message.trim() || isPaused || conversationSocketStatus !== "connected") return;
// // //     onSendMessage(message);
// // //     setMessage("");
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       handleSend();
// // //     }
// // //   };

// // //   if (!chat)
// // //     return (
// // //       <div className="chat-window empty">
// // //         <p>Select a chat to start messaging</p>
// // //       </div>
// // //     );

// // //   return (
// // //     <div className="chat-window">
// // //       <div className="chat-window-header">
// // //         <div className="chat-user-info">
// // //           <div>
// // //             <h3>{chat.id}</h3>
// // //             <span
// // //               className={`status-badge ${
// // //                 isPaused
// // //                   ? "paused"
// // //                   : conversationSocketStatus === "connected"
// // //                   ? "online"
// // //                   : "connecting"
// // //               }`}
// // //             >
// // //               {isPaused
// // //                 ? "Paused"
// // //                 : conversationSocketStatus === "connected"
// // //                 ? "Online"
// // //                 : "Connecting..."}
// // //             </span>
// // //           </div>
// // //         </div>
// // //         <div className="chat-actions">
// // //           <button
// // //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// // //             onClick={() => onTogglePause(chat.id)}
// // //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// // //           >
// // //             {isPaused ? "🔓" : "🔒"}
// // //           </button>
// // //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// // //             Close
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div className="messages-container">
// // //         {isLoadingMessages ? (
// // //           <div className="empty-state">Loading messages...</div>
// // //         ) : messages.length === 0 ? (
// // //           <div className="empty-state">No messages yet. Start the conversation!</div>
// // //         ) : (
// // //           messages.map((msg) => {
// // //             const isAgent = msg.sender === "agent" || msg.sender === "ai";
// // //             return (
// // //               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
// // //                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
// // //                   {msg.text}
// // //                 </div>
// // //                 <div className="message-time">
// // //                   {new Date(msg.timestamp).toLocaleTimeString()}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         )}
// // //         {isTyping && !isPaused && (
// // //           <div className="message user">
// // //             <div className="message-bubble user-bubble typing-indicator">
// // //               <span></span>
// // //               <span></span>
// // //               <span></span>
// // //             </div>
// // //           </div>
// // //         )}
// // //         <div ref={messagesEndRef} />
// // //       </div>

// // //       {isPaused && (
// // //         <div className="pause-banner">
// // //           <span className="pause-icon-small">🔒</span>
// // //           <span>Chat is locked. Click unlock icon to resume messaging.</span>
// // //         </div>
// // //       )}

// // //       <div
// // //         className={`message-input-container ${
// // //           isPaused || conversationSocketStatus !== "connected" ? "disabled" : ""
// // //         }`}
// // //       >
// // //         <input
// // //           type="text"
// // //           placeholder={
// // //             isPaused
// // //               ? "Chat is paused..."
// // //               : conversationSocketStatus !== "connected"
// // //               ? "Connecting..."
// // //               : "Type your message..."
// // //           }
// // //           value={message}
// // //           onChange={(e) => setMessage(e.target.value)}
// // //           onKeyPress={handleKeyPress}
// // //           className="message-input"
// // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // //         />
// // //         <button
// // //           onClick={handleSend}
// // //           className="send-btn"
// // //           disabled={isPaused || conversationSocketStatus !== "connected"}
// // //         >
// // //           Send
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* -------------------------- Customer Info Component -------------------------- */
// // // const CustomerInfo = ({ chat }) => {
// // //   if (!chat) return null;

// // //   return (
// // //     <div className="customer-info">
// // //       <h2>Chat Details</h2>
// // //       <p className="customer-channel">{chat.channel}</p>

// // //       <div className="info-section">
// // //         <div className="info-item">
// // //           <span className="info-label">Chat ID</span>
// // //           <span className="info-value">{chat.id}</span>
// // //         </div>
// // //         <div className="info-item">
// // //           <span className="info-label">Conversation ID</span>
// // //           <span className="info-value">{chat.conversation_id}</span>
// // //         </div>
// // //         <div className="info-item">
// // //           <span className="info-label">Status</span>
// // //           <span className="info-value">{chat.status}</span>
// // //         </div>
// // //         <div className="info-item">
// // //           <span className="info-label">Sentiment</span>
// // //           <span className="info-value">{chat.sentiment}</span>
// // //         </div>
// // //         <div className="info-item">
// // //           <span className="info-label">Channel</span>
// // //           <span className="info-value">{chat.channel}</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* -------------------------- Main Agent Console -------------------------- */
// // // const AgentConsole = () => {
// // //   const [activeChat, setActiveChat] = useState(null);
// // //   const [consoleSocket, setConsoleSocket] = useState(null);
// // //   const [conversationSocket, setConversationSocket] = useState(null);
// // //   const [conversationSocketStatus, setConversationSocketStatus] = useState("disconnected");
// // //   const [chats, setChats] = useState([]);
// // //   const [messages, setMessages] = useState({});
// // //   const [pausedChats, setPausedChats] = useState(new Set());
// // //   const [connectionStatus, setConnectionStatus] = useState("disconnected");
// // //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

// // //   /* ---------------- Console WebSocket ---------------- */
// // //   useEffect(() => {
// // //     const tenantId = localStorage.getItem("tenant_id");
// // //     const agentId = localStorage.getItem("agent_username");
// // //     const token = localStorage.getItem("agent_token");

// // //     if (!tenantId || !agentId || !token) {
// // //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// // //       setConnectionStatus("error");
// // //       return;
// // //     }

// // //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// // //       token
// // //     )}`;
// // //     console.log("🔌 Connecting to Agent Console:", wsUrl);

// // //     const ws = new WebSocket(wsUrl);
// // //     setConsoleSocket(ws);
// // //     setConnectionStatus("connecting");

// // //     ws.onopen = () => setConnectionStatus("connected");

// // //     ws.onmessage = (event) => {
// // //       const data = JSON.parse(event.data);
// // //       console.log("📩 Console event:", data);

// // //       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
// // //         setChats(
// // //           data.conversations.map((c) => ({
// // //             id: c.id,
// // //             conversation_id: c.id,
// // //             channel: c.channel || "unknown",
// // //             status: c.status || "active",
// // //             sentiment: c.sentiment || "neutral",
// // //           }))
// // //         );
// // //       } else if (data.type === "new_conversation") {
// // //         setChats((prev) => [
// // //           {
// // //             id: data.conversation.id,
// // //             conversation_id: data.conversation.id,
// // //             channel: data.conversation.channel || "unknown",
// // //             status: "active",
// // //             sentiment: data.conversation.sentiment || "neutral",
// // //           },
// // //           ...prev,
// // //         ]);
// // //       } else if (data.type === "conversation_closed") {
// // //         handleConversationClosed(data.conversation_id);
// // //       }
// // //     };

// // //     ws.onclose = () => setConnectionStatus("disconnected");
// // //     ws.onerror = (err) => console.error("⚠️ Console socket error:", err);

// // //     return () => ws.close();
// // //   }, []);

// // //   /* ---------------- Conversation WebSocket ---------------- */
// // //   // useEffect(() => {
// // //   //   if (conversationSocket) conversationSocket.close();

// // //   //   if (!activeChat) {
// // //   //     setConversationSocketStatus("disconnected");
// // //   //     return;
// // //   //   }

// // //   //   const token = localStorage.getItem("agent_token");
// // //   //   const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // //   //     token
// // //   //   )}`;

// // //   //   console.log("🔌 Connecting to Conversation WS:", convWsUrl);

// // //   //   const convWs = new WebSocket(convWsUrl);
// // //   //   setConversationSocket(convWs);
// // //   //   setConversationSocketStatus("connecting");

// // //   //   convWs.onopen = () => {
// // //   //     console.log("✅ CONNECTED to conversation:", activeChat.conversation_id);
// // //   //     setConversationSocketStatus("connected");

// // //   //     // Send JOIN message
// // //   //     convWs.send(
// // //   //       JSON.stringify({
// // //   //         type: "join",
// // //   //         conversation_id: activeChat.conversation_id,
// // //   //       })
// // //   //     );
// // //   //   };

// // //   //   convWs.onmessage = (event) => {
// // //   //     const data = JSON.parse(event.data);
// // //   //     console.log("📨 WS message:", data);

// // //   //     if (data.type === "joined") console.log("🎉 Joined conversation");
// // //   //     else if (data.type === "message") handleConversationMessage(data);
// // //   //     else if (data.type === "conversation_resolved")
// // //   //       console.log("✅ Conversation resolved");
// // //   //     else if (data.type === "error") console.error("❌ Error:", data.message);
// // //   //   };

// // //   //   convWs.onclose = () => setConversationSocketStatus("disconnected");
// // //   //   convWs.onerror = (err) => console.error("⚠️ Conversation socket error:", err);

// // //   //   return () => convWs.close();
// // //   // }, [activeChat]);

// // //   /* ---------------- Conversation WebSocket ---------------- */
// // // useEffect(() => {
// // //   if (conversationSocket) conversationSocket.close();

// // //   if (!activeChat) {
// // //     setConversationSocketStatus("disconnected");
// // //     return;
// // //   }

// // //   const token = localStorage.getItem("agent_token");
// // //   const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
// // //     token
// // //   )}`;

// // //   console.log("🔌 Connecting to Conversation WS:", convWsUrl);

// // //   const convWs = new WebSocket(convWsUrl);
// // //   setConversationSocket(convWs);
// // //   setConversationSocketStatus("connecting");

// // //   convWs.onopen = () => {
// // //     console.log("✅ CONNECTED to conversation:", activeChat.conversation_id);
// // //     setConversationSocketStatus("connected");

// // //     // Send JOIN message
// // //     convWs.send(
// // //       JSON.stringify({
// // //         type: "join",
// // //         conversation_id: activeChat.conversation_id,
// // //       })
// // //     );
// // //   };

// // //   convWs.onmessage = (event) => {
// // //     const data = JSON.parse(event.data);
// // //     console.log("📨 WS message:", data);

// // //     if (data.type === "joined") console.log("🎉 Joined conversation");
// // //     else if (data.type === "message") handleConversationMessage(data);
// // //     else if (data.type === "conversation_resolved")
// // //       console.log("✅ Conversation resolved");
// // //     else if (data.type === "error") console.error("❌ Error:", data.message);
// // //   };

// // //   convWs.onclose = () => setConversationSocketStatus("disconnected");
// // //   convWs.onerror = (err) => console.error("⚠️ Conversation socket error:", err);

// // //   return () => convWs.close();
// // // }, [activeChat]);


// // //   /* ---------------- Helpers ---------------- */
// // //   const handleConversationMessage = (data) => {
// // //     const convId = data.conversation_id || activeChat?.conversation_id;
// // //     if (!convId) return;

// // //     const newMessage = {
// // //       id: data.id || `msg_${Date.now()}`,
// // //       sender: data.sender,
// // //       text: data.text,
// // //       timestamp: data.timestamp || new Date().toISOString(),
// // //     };

// // //     setMessages((prev) => ({
// // //       ...prev,
// // //       [convId]: [...(prev[convId] || []), newMessage],
// // //     }));
// // //   };

// // //   const handleConversationClosed = (id) => {
// // //     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
// // //     if (activeChat?.conversation_id === id) setActiveChat(null);
// // //   };

// // //   /* ---------------- Send Message ---------------- */
// // //   const handleSendMessage = (text) => {
// // //   if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// // //     console.warn("⚠️ Cannot send message - Console socket not connected");
// // //     return;
// // //   }

// // //   const msg = {
// // //     conversation_id: activeChat.conversation_id,
// // //     text,
// // //   };

// // //   console.log("📤 Sending chat message:", msg);
// // //   consoleSocket.send(JSON.stringify(msg));

// // //   handleConversationMessage({
// // //     conversation_id: activeChat.conversation_id,
// // //     id: `msg_${Date.now()}`,
// // //     sender: "agent",
// // //     text,
// // //     timestamp: new Date().toISOString(),
// // //   });
// // // };


// // //   /* ---------------- Close Conversation ---------------- */
// // //   const handleCloseChat = (chatId) => {
// // //   if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// // //     console.warn("⚠️ Cannot close - Console socket not connected");
// // //     return;
// // //   }

// // //   consoleSocket.send(
// // //     JSON.stringify({
// // //       type: "close_conversation",
// // //       conversation_id: chatId,
// // //     })
// // //   );
// // //   console.log("📤 Sent CLOSE_CONVERSATION:", chatId);
// // //   handleConversationClosed(chatId);
// // // };


// // //   /* ---------------- Fetch Messages (History) ---------------- */
// // //   const handleChatClick = async (chat) => {
// // //     console.log("🖱️ Chat clicked:", chat.conversation_id);

// // //     try {
// // //       const token = localStorage.getItem("agent_token");
// // //       if (!token) {
// // //         console.warn("⚠️ No token found");
// // //         setActiveChat(chat);
// // //         return;
// // //       }

// // //       const possibleUrls = [
// // //         `http://localhost:8000/api/agent/conversations/${chat.conversation_id}/messages?limit=100`,
// // //         `http://localhost:8000/api/conversations/${chat.conversation_id}/messages?limit=100`,
// // //         `http://localhost:8000/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
// // //       ];

// // //       setIsLoadingMessages(true);
// // //       let res = null;

// // //       for (const url of possibleUrls) {
// // //         console.log("🔍 Trying URL:", url);
// // //         try {
// // //           res = await fetch(url, {
// // //             headers: { Authorization: `Bearer ${token}` },
// // //           });
// // //           if (res.ok) break;
// // //         } catch (err) {
// // //           console.log("❌ Network error:", err);
// // //         }
// // //       }

// // //       if (!res || !res.ok) {
// // //         console.error("❌ All endpoints failed");
// // //         setMessages((prev) => ({ ...prev, [chat.conversation_id]: [] }));
// // //         return;
// // //       }

// // //       const data = await res.json();
// // //       console.log(`✅ Loaded ${data.length} messages`);
// // //       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
// // //     } catch (err) {
// // //       console.error("⚠️ Fetch messages error:", err);
// // //     } finally {
// // //       setIsLoadingMessages(false);
// // //       setActiveChat(chat);
// // //     }
// // //   };

// // //   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
// // //   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];

// // //   return (
// // //     <div className="app">
// // //       <ChatList
// // //         chats={chats}
// // //         activeChat={activeChat}
// // //         pausedChats={pausedChats}
// // //         handleChatClick={handleChatClick}
// // //       />

// // //       <ChatWindow
// // //         chat={activeChat}
// // //         isTyping={false}
// // //         onCloseChat={handleCloseChat}
// // //         isPaused={isPaused}
// // //         onTogglePause={(id) =>
// // //           setPausedChats((prev) => {
// // //             const s = new Set(prev);
// // //             s.has(id) ? s.delete(id) : s.add(id);
// // //             return s;
// // //           })
// // //         }
// // //         messages={activeChatMessages}
// // //         onSendMessage={handleSendMessage}
// // //         isLoadingMessages={isLoadingMessages}
// // //         conversationSocketStatus={conversationSocketStatus}
// // //       />

// // //       <CustomerInfo chat={activeChat} />
// // //     </div>
// // //   );
// // // };

// // // export default AgentConsole;









// // import React, { useState, useEffect, useRef } from "react";
// // import "../../styles/conversation.css";

// // /* -------------------------- Chat List -------------------------- */
// // const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const filteredChats = chats.filter((chat) =>
// //     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="chat-list">
// //       <div className="chat-list-header">
// //         <h2>Inbox</h2>
// //         <input
// //           type="text"
// //           placeholder="Search by chat ID..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="search-input"
// //         />
// //       </div>

// //       <div className="chats-section">
// //         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
// //         {filteredChats.length === 0 ? (
// //           <div className="empty-state">No conversations yet</div>
// //         ) : (
// //           filteredChats.map((chat) => {
// //             const isPaused = pausedChats.has(chat.id);
// //             const isActive = activeChat?.id === chat.id;
// //             return (
// //               <div
// //                 key={chat.id}
// //                 className={`chat-item ${isActive ? "active" : ""} ${
// //                   isPaused ? "paused" : ""
// //                 }`}
// //                 onClick={() => handleChatClick(chat)}
// //               >
// //                 <div className="chat-info">
// //                   <div className="chat-header-row">
// //                     <span className="chat-name">{chat.id}</span>
// //                     <span className="chat-time">{chat.channel}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------- Chat Window -------------------------- */
// // const ChatWindow = ({
// //   chat,
// //   isTyping,
// //   onCloseChat,
// //   isPaused,
// //   onTogglePause,
// //   messages,
// //   onSendMessage,
// //   isLoadingMessages,
// //   consoleSocketStatus,
// // }) => {
// //   const [message, setMessage] = useState("");
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, isTyping]);

// //   const handleSend = () => {
// //     if (!message.trim() || isPaused || consoleSocketStatus !== "connected") return;
// //     onSendMessage(message);
// //     setMessage("");
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSend();
// //     }
// //   };

// //   if (!chat)
// //     return (
// //       <div className="chat-window empty">
// //         <p>Select a chat to start messaging</p>
// //       </div>
// //     );

// //   return (
// //     <div className="chat-window">
// //       <div className="chat-window-header">
// //         <div className="chat-user-info">
// //           <div>
// //             <h3>{chat.id}</h3>
// //             <span
// //               className={`status-badge ${
// //                 isPaused
// //                   ? "paused"
// //                   : consoleSocketStatus === "connected"
// //                   ? "online"
// //                   : "connecting"
// //               }`}
// //             >
// //               {isPaused
// //                 ? "Paused"
// //                 : consoleSocketStatus === "connected"
// //                 ? "Online"
// //                 : "Connecting..."}
// //             </span>
// //           </div>
// //         </div>
// //         <div className="chat-actions">
// //           <button
// //             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
// //             onClick={() => onTogglePause(chat.id)}
// //             title={isPaused ? "Unlock Chat" : "Lock Chat"}
// //           >
// //             {isPaused ? "🔓" : "🔒"}
// //           </button>
// //           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
// //             Close
// //           </button>
// //         </div>
// //       </div>

// //       <div className="messages-container">
// //         {isLoadingMessages ? (
// //           <div className="empty-state">Loading messages...</div>
// //         ) : messages.length === 0 ? (
// //           <div className="empty-state">No messages yet.</div>
// //         ) : (
// //           messages.map((msg) => {
// //             const isAgent = msg.sender === "agent";
// //             return (
// //               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
// //                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
// //                   {msg.text}
// //                 </div>
// //                 <div className="message-time">
// //                   {new Date(msg.timestamp).toLocaleTimeString()}
// //                 </div>
// //               </div>
// //             );
// //           })
// //         )}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       <div
// //         className={`message-input-container ${
// //           isPaused || consoleSocketStatus !== "connected" ? "disabled" : ""
// //         }`}
// //       >
// //         <input
// //           type="text"
// //           placeholder={
// //             isPaused
// //               ? "Chat is paused..."
// //               : consoleSocketStatus !== "connected"
// //               ? "Connecting..."
// //               : "Type your message..."
// //           }
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           className="message-input"
// //           disabled={isPaused || consoleSocketStatus !== "connected"}
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="send-btn"
// //           disabled={isPaused || consoleSocketStatus !== "connected"}
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------- Customer Info -------------------------- */
// // const CustomerInfo = ({ chat }) => {
// //   if (!chat) return null;

// //   return (
// //     <div className="customer-info">
// //       <h2>Chat Details</h2>
// //       <div className="info-section">
// //         <div className="info-item"><span>Chat ID:</span> {chat.id}</div>
// //         <div className="info-item"><span>Conversation ID:</span> {chat.conversation_id}</div>
// //         <div className="info-item"><span>Status:</span> {chat.status}</div>
// //         <div className="info-item"><span>Channel:</span> {chat.channel}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------- Agent Console -------------------------- */
// // const AgentConsole = () => {
// //   const [consoleSocket, setConsoleSocket] = useState(null);
// //   const [consoleSocketStatus, setConsoleSocketStatus] = useState("disconnected");
// //   const [chats, setChats] = useState([]);
// //   const [messages, setMessages] = useState({});
// //   const [activeChat, setActiveChat] = useState(null);
// //   const [pausedChats, setPausedChats] = useState(new Set());
// //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

// //   /* ---------- Console WebSocket ---------- */
// //   useEffect(() => {
// //     if (window.__consoleSocketInitialized) return; // ✅ prevent double open
// //     window.__consoleSocketInitialized = true;
// //     const tenantId = localStorage.getItem("tenant_id");
// //     const agentId = localStorage.getItem("agent_username");
// //     const token = localStorage.getItem("agent_token");

// //     if (!tenantId || !agentId || !token) {
// //       console.warn("❌ Missing tenant_id or agent_id — please login again");
// //       return;
// //     }

// //     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(token)}`;
// //     console.log("🔌 Connecting to Agent Console:", wsUrl);

// //     const ws = new WebSocket(wsUrl);
// //     setConsoleSocket(ws);
// //     setConsoleSocketStatus("connecting");

// //     ws.onopen = () => {
// //       console.log("✅ Connected to Agent Console");
// //       setConsoleSocketStatus("connected");
// //     };

// //     ws.onmessage = (event) => {
// //       const data = JSON.parse(event.data);
// //       console.log("📩 Console event:", data);

// //       if (data.type === "snapshot") setChats(data.conversations || []);
// //       else if (data.type === "new_conversation") setChats((prev) => [data.conversation, ...prev]);
// //       else if (data.type === "message") handleMessage(data);
// //       else if (data.type === "conversation_closed") handleConversationClosed(data.conversation_id);
// //     };

// //     ws.onclose = () => {
// //       console.warn("❌ Console socket disconnected");
// //       setConsoleSocketStatus("disconnected");
// //     };

// //     ws.onerror = (err) => console.error("⚠️ Console socket error:", err);

// //     return () => ws.close();
// //   }, []);

// //   /* ---------- Helpers ---------- */
// //   const handleMessage = (data) => {
// //     const convId = data.conversation_id || activeChat?.conversation_id;
// //     if (!convId) return;

// //     const newMsg = {
// //       id: data.id || `msg_${Date.now()}`,
// //       sender: data.sender,
// //       text: data.text,
// //       timestamp: data.timestamp || new Date().toISOString(),
// //     };
// //     setMessages((prev) => ({
// //       ...prev,
// //       [convId]: [...(prev[convId] || []), newMsg],
// //     }));
// //   };

// //   const handleConversationClosed = (id) => {
// //     setChats((prev) => prev.filter((c) => c.conversation_id !== id));
// //     if (activeChat?.conversation_id === id) setActiveChat(null);
// //   };

// //   /* ---------- JOIN (via console WS) ---------- */
// //   const handleChatClick = async (chat) => {
// //     console.log("🖱️ Chat clicked:", chat.conversation_id);
// //     setActiveChat(chat);

// //     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
// //       consoleSocket.send(
// //         JSON.stringify({ type: "join", conversation_id: chat.conversation_id })
// //       );
// //       console.log("📤 JOIN sent via console socket:", chat.conversation_id);
// //     } else {
// //       console.warn("⚠️ Console socket not ready");
// //     }

// //     // Load previous messages
// //     try {
// //       setIsLoadingMessages(true);
// //       const token = localStorage.getItem("agent_token");
// //       const res = await fetch(
// //         `http://localhost:8000/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       const data = await res.json();
// //       console.log(`✅ Loaded ${data.length} messages`);
// //       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
// //     } catch (err) {
// //       console.error("⚠️ Fetch messages error:", err);
// //     } finally {
// //       setIsLoadingMessages(false);
// //     }
// //   };

// //   /* ---------- SEND ---------- */
// //   const handleSendMessage = (text) => {
// //     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// //       console.warn("⚠️ Cannot send - Console socket not connected");
// //       return;
// //     }

// //     const msg = { conversation_id: activeChat.conversation_id, text };
// //     consoleSocket.send(JSON.stringify(msg));
// //     handleMessage({
// //       conversation_id: activeChat.conversation_id,
// //       sender: "agent",
// //       text,
// //       timestamp: new Date().toISOString(),
// //     });
// //   };

// //   /* ---------- CLOSE ---------- */
// //   const handleCloseChat = (chatId) => {
// //     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// //       console.warn("⚠️ Cannot close - Console socket not connected");
// //       return;
// //     }

// //     consoleSocket.send(
// //       JSON.stringify({ type: "close_conversation", conversation_id: chatId })
// //     );
// //     console.log("📤 Sent CLOSE_CONVERSATION:", chatId);
// //     handleConversationClosed(chatId);
// //   };

// //   const activeChatMessages = activeChat
// //     ? messages[activeChat.conversation_id] || []
// //     : [];

// //   return (
// //     <div className="app">
// //       <ChatList
// //         chats={chats}
// //         activeChat={activeChat}
// //         pausedChats={pausedChats}
// //         handleChatClick={handleChatClick}
// //       />
// //       <ChatWindow
// //         chat={activeChat}
// //         isTyping={false}
// //         onCloseChat={handleCloseChat}
// //         isPaused={pausedChats.has(activeChat?.id)}
// //         onTogglePause={(id) =>
// //           setPausedChats((prev) => {
// //             const s = new Set(prev);
// //             s.has(id) ? s.delete(id) : s.add(id);
// //             return s;
// //           })
// //         }
// //         messages={activeChatMessages}
// //         onSendMessage={handleSendMessage}
// //         isLoadingMessages={isLoadingMessages}
// //         consoleSocketStatus={consoleSocketStatus}
// //       />
// //       <CustomerInfo chat={activeChat} />
// //     </div>
// //   );
// // };

// // export default AgentConsole;


// new 

// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/conversation.css";

// /* -------------------------- Chat List -------------------------- */
// const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredChats = chats.filter((chat) =>
//     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="chat-list">
//       <div className="chat-list-header">
//         <h2>Inbox</h2>
//         <input
//           type="text"
//           placeholder="Search by chat ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       <div className="chats-section">
//         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
//         {filteredChats.length === 0 ? (
//           <div className="empty-state">No conversations yet</div>
//         ) : (
//           filteredChats.map((chat) => {
//             const isPaused = pausedChats.has(chat.id);
//             const isActive = activeChat?.id === chat.id;
//             return (
//               <div
//                 key={chat.id}
//                 className={`chat-item ${isActive ? "active" : ""} ${
//                   isPaused ? "paused" : ""
//                 }`}
//                 onClick={() => handleChatClick(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span className="chat-name">{chat.id}</span>
//                     <span className="chat-time">{chat.channel}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Chat Window -------------------------- */
// const ChatWindow = ({
//   chat,
//   isTyping,
//   onCloseChat,
//   isPaused,
//   onTogglePause,
//   messages,
//   onSendMessage,
//   isLoadingMessages,
//   consoleSocketStatus,
// }) => {
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const handleSend = () => {
//     if (!message.trim() || isPaused || consoleSocketStatus !== "connected") return;
//     onSendMessage(message);
//     setMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!chat)
//     return (
//       <div className="chat-window empty">
//         <p>Select a chat to start messaging</p>
//       </div>
//     );

//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span
//               className={`status-badge ${
//                 isPaused
//                   ? "paused"
//                   : consoleSocketStatus === "connected"
//                   ? "online"
//                   : "connecting"
//               }`}
//             >
//               {isPaused
//                 ? "Paused"
//                 : consoleSocketStatus === "connected"
//                 ? "Online"
//                 : "Connecting..."}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
//             onClick={() => onTogglePause(chat.id)}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
//             Close
//           </button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {isLoadingMessages ? (
//           <div className="empty-state">Loading messages...</div>
//         ) : messages.length === 0 ? (
//           <div className="empty-state">No messages yet.</div>
//         ) : (
//           messages.map((msg) => {
//             const isAgent = msg.sender === "agent";
//             return (
//               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
//                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
//                   {msg.text}
//                 </div>
//                 <div className="message-time">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className={`message-input-container ${
//           isPaused || consoleSocketStatus !== "connected" ? "disabled" : ""
//         }`}
//       >
//         <input
//           type="text"
//           placeholder={
//             isPaused
//               ? "Chat is paused..."
//               : consoleSocketStatus !== "connected"
//               ? "Connecting..."
//               : "Type your message..."
//           }
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         />
//         <button
//           onClick={handleSend}
//           className="send-btn"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Customer Info -------------------------- */
// const CustomerInfo = ({ chat }) => {
//   if (!chat) return null;
//   return (
//     <div className="customer-info">
//       <h2>Chat Details</h2>
//       <div className="info-section">
//         <div className="info-item"><span>Chat ID:</span> {chat.id}</div>
//         <div className="info-item"><span>Conversation ID:</span> {chat.conversation_id}</div>
//         <div className="info-item"><span>Status:</span> {chat.status}</div>
//         <div className="info-item"><span>Channel:</span> {chat.channel}</div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [consoleSocketStatus, setConsoleSocketStatus] = useState("disconnected");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [activeChat, setActiveChat] = useState(null);
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

//   /* ===================================================
//      🚀 NEW: Fetch Agent Inbox (my_active)
//      =================================================== */
//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const token = localStorage.getItem("agent_token");
//         if (!token) return;

//         const res = await fetch(
//           "https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();
//         console.log("📥 Inbox conversations:", data);

//         if (Array.isArray(data.conversations)) {
//           const formatted = data.conversations.map((c) => ({
//             id: String(c.id),               // show only ID
//             conversation_id: c.id,
//             channel: c.channel || "inbox",
//             status: c.status || "active",
//           }));

//           setChats((prev) => {
//             const merged = new Map();

//             [...prev, ...formatted].forEach((c) => {
//               merged.set(c.id, c);
//             });

//             return Array.from(merged.values());
//           });
//         }
//       } catch (err) {
//         console.error("⚠️ Inbox fetch error:", err);
//       }
//     };

//     fetchInbox();
//   }, []);

//   /* ---------- Console WebSocket ---------- */
//   useEffect(() => {
//     if (window.__consoleSocketInitialized) return;
//     window.__consoleSocketInitialized = true;

//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("agent_id");
//     const token = localStorage.getItem("agent_token");

//     if (!tenantId || !agentId || !token) {
//       console.warn("❌ Missing tenant_id or agent_id — please login again");
//       return;
//     }

//     const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(token)}`;
//     const ws = new WebSocket(wsUrl);

//     setConsoleSocket(ws);
//     setConsoleSocketStatus("connecting");

//     ws.onopen = () => {
//       console.log("✅ Connected to Agent Console");
//       setConsoleSocketStatus("connected");
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "snapshot") {
//         const normalized = data.conversations.map((c) => ({
//           id: c.id || c.chat_id || "unknown",
//           conversation_id: c.conversation_id || c.id,
//           channel: c.channel || "unknown",
//           status: c.status || "active",
//         }));

//         setChats((prev) => {
//           const map = new Map();

//           [...prev, ...normalized].forEach((x) => {
//             map.set(x.id, x);
//           });

//           return Array.from(map.values());
//         });
//       }

//       else if (data.type === "new_conversation") {
//         const conv = data.conversation;
//         const newConv = {
//           id: conv.id,
//           conversation_id: conv.conversation_id || conv.id,
//           channel: conv.channel || "unknown",
//           status: conv.status || "active",
//         };

//         setChats((prev) => [newConv, ...prev]);
//       }

//       else if (data.type === "message") {
//         handleMessage(data);
//       }

//       else if (data.type === "conversation_closed") {
//         handleConversationClosed(data.conversation_id);
//       }
//     };

//     ws.onclose = () => setConsoleSocketStatus("disconnected");
//     ws.onerror = (err) => console.error("⚠️ Console socket error:", err);

//     const heartbeat = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//       }
//     }, 30000);

//     return () => {
//       clearInterval(heartbeat);
//       if (ws.readyState === WebSocket.OPEN) ws.close();
//     };
//   }, []);

//   /* ---------- Helpers ---------- */
//   const handleMessage = (data) => {
//     const convId = data.conversation_id || activeChat?.conversation_id;
//     if (!convId) return;

//     const newMsg = {
//       id: data.id || `msg_${Date.now()}`,
//       sender: data.sender,
//       text: data.text,
//       timestamp: data.timestamp || new Date().toISOString(),
//     };

//     setMessages((prev) => ({
//       ...prev,
//       [convId]: [...(prev[convId] || []), newMsg],
//     }));
//   };

//   const handleConversationClosed = (id) => {
//     setChats((prev) => prev.filter((c) => c.conversation_id !== id));
//     if (activeChat?.conversation_id === id) setActiveChat(null);
//   };

//   /* ---------- JOIN ---------- */
//   const handleChatClick = async (chat) => {
//     setActiveChat(chat);

//     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
//       consoleSocket.send(JSON.stringify({ type: "join", conversation_id: chat.conversation_id }));
//     }

//     try {
//       setIsLoadingMessages(true);
//       const token = localStorage.getItem("agent_token");
//       const res = await fetch(
//         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();

//       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
//     } catch (err) {
//       console.error("⚠️ Fetch messages error:", err);
//     } finally {
//       setIsLoadingMessages(false);
//     }
//   };

//   /* ---------- SEND ---------- */
//   const handleSendMessage = (text) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;

//     const msg = { conversation_id: activeChat.conversation_id, text };
//     consoleSocket.send(JSON.stringify(msg));

//     handleMessage({
//       conversation_id: activeChat.conversation_id,
//       sender: "agent",
//       text,
//       timestamp: new Date().toISOString(),
//     });
//   };

//   /* ---------- CLOSE ---------- */
//   const handleCloseChat = (chatId) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;

//     consoleSocket.send(
//       JSON.stringify({ type: "close_conversation", conversation_id: chatId })
//     );

//     handleConversationClosed(chatId);
//   };

//   const activeChatMessages = activeChat
//     ? messages[activeChat.conversation_id] || []
//     : [];

//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         pausedChats={pausedChats}
//         handleChatClick={handleChatClick}
//       />
//       <ChatWindow
//         chat={activeChat}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={pausedChats.has(activeChat?.id)}
//         onTogglePause={(id) =>
//           setPausedChats((prev) => {
//             const s = new Set(prev);
//             s.has(id) ? s.delete(id) : s.add(id);
//             return s;
//           })
//         }
//         messages={activeChatMessages}
//         onSendMessage={handleSendMessage}
//         isLoadingMessages={isLoadingMessages}
//         consoleSocketStatus={consoleSocketStatus}
//       />
//       <CustomerInfo chat={activeChat} />
//     </div>
//   );
// };

// export default AgentConsole;



import React, { useEffect, useRef, useState } from "react";
import "../../styles/conversation.css";

/* -------------------------- ChatList -------------------------- */
const ChatList = ({ chats, activeChat, pausedChats, onChatClick, searchPlaceholder = "Search by chat ID..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = chats.filter((c) =>
    String(c.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Inbox</h2>
        <input
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="chats-section">
        <h3 className="section-title">CHATS ({filtered.length})</h3>

        {filtered.length === 0 ? (
          <div className="empty-state">No conversations yet</div>
        ) : (
          filtered.map((chat) => {
            const isPaused = pausedChats.has(chat.id);
            const isActive = activeChat?.id === chat.id;
            return (
              <div
                key={chat.id}
                className={`chat-item ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
                onClick={() => onChatClick(chat)}
              >
                <div className="chat-info">
                  <div className="chat-header-row">
                    <span className="chat-name">{chat.id}</span>
                    <span className="chat-time">{chat.channel}</span>
                  </div>
                  <div className="chat-meta-row">
                    {chat.status && (
                      <span className={`chat-status ${chat.status === "closed" ? "closed" : ""}`}>
                        {chat.status}
                      </span>
                    )}
                    {chat.unread_count > 0 && <span className="unread-badge">{chat.unread_count}</span>}
                    {isPaused && <span className="paused-badge">Paused</span>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/* -------------------------- ChatWindow -------------------------- */
const ChatWindow = ({
  chat,
  messages,
  isLoadingMessages,
  onSend,
  isPaused,
  onTogglePause,
  onClose,
  socketStatus,
  isClosed,
}) => {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    // clear input when switching chats
    setText("");
  }, [chat?.conversation_id]);

  useEffect(() => {
    // scroll to bottom when messages change
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoadingMessages]);

  const handleSend = () => {
    if (!text.trim() || isPaused || isClosed || socketStatus !== "connected") return;
    onSend(text.trim());
    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chat) {
    return (
      <div className="chat-window empty">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-user-info">
          <div>
            <h3>{chat.id}</h3>
            <span className={`status-badge ${isClosed ? "closed" : socketStatus === "connected" ? "online" : "connecting"}`}>
              {isClosed ? "Closed Chat" : socketStatus === "connected" ? "Online" : "Connecting..."}
            </span>
          </div>
        </div>

        <div className="chat-actions">
          <button
            className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
            onClick={() => onTogglePause(chat.id)}
            title={isPaused ? "Unpause chat" : "Pause chat"}
          >
            {isPaused ? "🔓" : "🔒"}
          </button>

          <button className="action-btn close-btn" onClick={() => onClose(chat.conversation_id)}>
            Close
          </button>
        </div>
      </div>

      <div className="messages-container">
        {isLoadingMessages ? (
          <div className="empty-state">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="empty-state">No messages yet.</div>
        ) : (
          messages.map((m) => {
            const isAgent = m.sender === "agent" || m.sender === "system_agent";
            return (
              <div key={m.id || `${m.timestamp}_${m.sender}_${Math.random()}`} className={`message ${isAgent ? "agent" : "user"}`}>
                <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
                  {m.text || m.message || m.body || "—"}
                </div>
                <div className="message-time">{new Date(m.timestamp || m.created_at || Date.now()).toLocaleTimeString()}</div>
              </div>
            );
          })
        )}

        <div ref={endRef} />
      </div>

      {isClosed && (
        <div className="closed-warning" style={{
          background: "#ffecec",
          color: "#cc0000",
          padding: 10,
          borderRadius: 6,
          margin: "8px 12px",
          fontWeight: 600,
          textAlign: "center"
        }}>
          This chat is CLOSED — sending messages is disabled.
        </div>
      )}

      <div className={`message-input-container ${isPaused || socketStatus !== "connected" || isClosed ? "disabled" : ""}`}>
        <input
          className="message-input"
          placeholder={isClosed ? "Chat is closed" : socketStatus !== "connected" ? "Connecting..." : "Type your message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKey}
          disabled={isPaused || socketStatus !== "connected" || isClosed}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isPaused || socketStatus !== "connected" || isClosed}
          style={{
            cursor: isPaused || socketStatus !== "connected" || isClosed ? "not-allowed" : "pointer",
            opacity: isPaused || socketStatus !== "connected" || isClosed ? 0.7 : 1
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

/* -------------------------- CustomerInfo -------------------------- */
const CustomerInfo = ({ chat }) => {
  if (!chat) return null;
  return (
    <div className="customer-info">
      <h2>Chat Details</h2>
      <div className="info-section">
        <div className="info-item"><span>Chat ID:</span> {chat.id}</div>
        <div className="info-item"><span>Conversation ID:</span> {chat.conversation_id}</div>
        <div className="info-item"><span>Status:</span> {chat.status}</div>
        <div className="info-item"><span>Channel:</span> {chat.channel}</div>
      </div>
    </div>
  );
};

/* -------------------------- AgentConsole (main) -------------------------- */
const AgentConsole = () => {
  // auth
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("agent_token"));
  const [agentEmail, setAgentEmail] = useState(() => localStorage.getItem("agent_email"));

  // socket + status
  const wsRef = useRef(null);
  const [socketStatus, setSocketStatus] = useState("disconnected"); // connecting, connected, disconnected

  // app state
  const [chats, setChats] = useState([]); // array of {id, conversation_id, channel, status, ...}
  const [messagesMap, setMessagesMap] = useState({}); // { conversation_id: [messages] }
  const [activeChat, setActiveChat] = useState(null);
  const [pausedChats, setPausedChats] = useState(new Set());
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // computed
  const activeChatMessages = activeChat ? (messagesMap[activeChat.conversation_id] || []) : [];

  /* ------------------ Listen to localStorage changes (cross-tab login/logout) ------------------ */
  useEffect(() => {
    const onStorage = (ev) => {
      if (ev.key === "agent_token") setAuthToken(localStorage.getItem("agent_token"));
      if (ev.key === "agent_email") setAgentEmail(localStorage.getItem("agent_email"));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ------------------ Fetch Inbox whenever token changes ------------------ */
  useEffect(() => {
    const fetchInbox = async () => {
      if (!authToken) {
        // clear chats when logged out
        setChats([]);
        setMessagesMap({});
        setActiveChat(null);
        return;
      }

      try {
        const url = `https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.warn("Inbox fetch returned non-200:", res.status);
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data.conversations)) return;

        const formatted = data.conversations.map((c) => ({
          id: String(c.id),
          conversation_id: c.conversation_id || c.id,
          channel: c.channel || c.channel_type || "inbox",
          status: c.status || c.chat_status || "active",
          unread_count: c.unread_count || 0,
          last_message: c.last_message || null,
        }));

        // merge: keep existing chats and add/overwrite by id
        setChats((prev) => {
          const map = new Map();
          // keep previous order but ensure new items added
          prev.forEach((p) => map.set(p.id, p));
          formatted.forEach((f) => map.set(f.id, f));
          return Array.from(map.values());
        });
      } catch (err) {
        console.error("Inbox fetch error:", err);
      }
    };

    fetchInbox();
  }, [authToken]);

  /* ------------------ WebSocket connect / reconnect when auth changes ------------------ */
  useEffect(() => {
    // cleanup existing socket
    if (wsRef.current) {
      try { wsRef.current.close(); } catch (e) {}
      wsRef.current = null;
    }

    if (!authToken || !agentEmail) {
      setSocketStatus("disconnected");
      return;
    }

    let ws;
    try {
      const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${encodeURIComponent(localStorage.getItem("tenant_id") || "")}&agent_id=${encodeURIComponent(agentEmail)}&token=${encodeURIComponent(authToken)}`;
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      setSocketStatus("connecting");
      console.info("🔌 Connecting to Agent Console:", wsUrl);
    } catch (err) {
      console.error("WebSocket construction error:", err);
      setSocketStatus("disconnected");
      return;
    }

    const heartbeatInterval = 30000;
    let heartbeatTimer = null;

    ws.onopen = () => {
      console.log("✅ Connected to Agent Console");
      setSocketStatus("connected");

      // send a friendly join or auth confirm if required by server
      // ws.send(JSON.stringify({ type: "auth", token: authToken }));

      // heartbeat
      heartbeatTimer = setInterval(() => {
        try {
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        } catch (e) { /* ignore */ }
      }, heartbeatInterval);
    };

    ws.onmessage = (ev) => {
      let data;
      try {
        data = JSON.parse(ev.data);
      } catch (e) {
        console.warn("Invalid JSON from WS:", ev.data);
        return;
      }
      // console.log("📩 Console event:", data);

      // handle snapshot (list of conversations)
      if (data.type === "snapshot" && Array.isArray(data.conversations)) {
        const normalized = data.conversations.map((c) => ({
          id: String(c.id || c.chat_id || c.conversationId || c.conversation_id || "unknown"),
          conversation_id: c.conversation_id || c.id || c.chat_id || c.conversationId,
          channel: c.channel || c.channel_type || "unknown",
          status: c.status || c.chat_status || "active",
          unread_count: c.unread_count || 0,
        }));

        setChats((prev) => {
          const map = new Map();
          prev.forEach((p) => map.set(p.id, p));
          normalized.forEach((n) => map.set(n.id, n));
          return Array.from(map.values());
        });
        return;
      }

      // new_conversation
      if (data.type === "new_conversation" && data.conversation) {
        const conv = data.conversation;
        const newConv = {
          id: String(conv.id || conv.chat_id),
          conversation_id: conv.conversation_id || conv.id || conv.chat_id,
          channel: conv.channel || "unknown",
          status: conv.status || "active",
          unread_count: conv.unread_count || 0,
        };
        setChats((prev) => [newConv, ...prev]);
        return;
      }

      // message event
      if (data.type === "message" || data.type === "message_created") {
        const convId = data.conversation_id || data.conversationId || data.chat_id || data.chatId;
        if (!convId) return;

        const newMsg = {
          id: data.id || `msg_${Date.now()}`,
          sender: data.sender || data.from || (data.is_agent ? "agent" : "user"),
          text: data.text || data.message || data.body,
          timestamp: data.timestamp || data.created_at || new Date().toISOString(),
        };

        setMessagesMap((prev) => {
          const arr = [...(prev[convId] || []), newMsg];
          return { ...prev, [convId]: arr };
        });

        // ensure conversation present in chat list
        setChats((prev) => {
          const map = new Map();
          prev.forEach((p) => map.set(p.id, p));
          const idStr = String(convId);
          if (!map.has(idStr)) {
            map.set(idStr, { id: idStr, conversation_id: convId, channel: "unknown", status: "active" });
          }
          return Array.from(map.values());
        });
        return;
      }

      // conversation_closed
      if (data.type === "conversation_closed" && (data.conversation_id || data.conversationId)) {
        const closedId = String(data.conversation_id || data.conversationId);
        setChats((prev) => prev.map(c => c.conversation_id === closedId || c.id === closedId ? { ...c, status: "closed" } : c));
        if (activeChat?.conversation_id === closedId) {
          // keep showing but disabled -- activeChat will still be present
        }
        return;
      }

      // updates: conversation_update / status / unread etc.
      if (data.type === "conversation_update" && data.conversation) {
        const conv = data.conversation;
        const idStr = String(conv.conversation_id || conv.id);
        setChats((prev) => prev.map(c => c.id === idStr ? { ...c, ...conv } : c));
        return;
      }

      // fallback: unknown event
      // console.warn("Unrecognized WS event:", data);
    };

    ws.onclose = (ev) => {
      console.warn("❌ Console socket disconnected", ev);
      setSocketStatus("disconnected");
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      wsRef.current = null;
      // Note: if token stays same effect won't re-run automatically; user action or storage change will reconnect.
      // If you want automatic reconnect attempts, implement backoff here.
    };

    ws.onerror = (err) => {
      console.error("⚠️ Console socket error:", err);
    };

    return () => {
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      try { if (ws && ws.readyState === WebSocket.OPEN) ws.close(); } catch (e) {}
      wsRef.current = null;
    };
  }, [authToken, agentEmail]); // re-run when these change (login/logout)

  /* ------------------ Helpers: messages, join, send, close ------------------ */
  const handleMessageLocal = (payload) => {
    const convId = payload.conversation_id || payload.conversationId;
    if (!convId) return;
    const newMsg = {
      id: payload.id || `msg_${Date.now()}`,
      sender: payload.sender || "agent",
      text: payload.text || payload.message,
      timestamp: payload.timestamp || new Date().toISOString(),
    };
    setMessagesMap((prev) => {
      const arr = [...(prev[convId] || []), newMsg];
      return { ...prev, [convId]: arr };
    });
  };

  const handleConversationClosed = (conversation_id) => {
    const idStr = String(conversation_id);
    setChats((prev) => prev.map(c => c.conversation_id === idStr || c.id === idStr ? { ...c, status: "closed" } : c));
    if (activeChat?.conversation_id === idStr) {
      // keep selected, but UI will show closed and disable input
    }
  };

  const handleChatClick = async (chat) => {
    setActiveChat(chat);

    // If chat status exists, reflect closed immediately
    // (ChatWindow will use activeChat.status to detect closed)
    // Send join via WS if present
    try {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "join", conversation_id: chat.conversation_id }));
      }
    } catch (e) { /* ignore */ }

    // Load messages for this conversation via API (fallback)
    if (!authToken) return;
    setIsLoadingMessages(true);
    try {
      const token = authToken;
      const convId = chat.conversation_id || chat.id;
      const res = await fetch(`https://api.texef.com/api/messages?conversation_id=${encodeURIComponent(convId)}&limit=200`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        // API may return array or { messages: [...] }
        const msgs = Array.isArray(data) ? data : (data.messages || data);
        setMessagesMap((prev) => ({ ...prev, [convId]: msgs }));
      } else {
        console.warn("Failed to fetch messages:", res.status);
      }
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = (text) => {
    if (!activeChat) return;
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("Socket not connected: cannot send");
      return;
    }
    if (activeChat.status === "closed") {
      console.warn("Chat is closed. Not sending message.");
      return;
    }

    const payload = {
      conversation_id: activeChat.conversation_id || activeChat.id,
      text,
      // other fields if API expects them: type: 'message', sender: 'agent', etc.
    };

    try {
      wsRef.current.send(JSON.stringify(payload));
      // Optimistically add local message
      handleMessageLocal({ ...payload, sender: "agent", id: `local_${Date.now()}`, timestamp: new Date().toISOString() });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const handleCloseConversation = (conversation_id) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "close_conversation", conversation_id }));
    // locally mark closed
    handleConversationClosed(conversation_id);
  };

  const togglePauseChat = (chatId) => {
    setPausedChats((prev) => {
      const s = new Set(prev);
      if (s.has(chatId)) s.delete(chatId);
      else s.add(chatId);
      return s;
    });
  };

  /* ------------------ Logout helper (optional) ------------------ */
  const logout = () => {
    // clear storage and update local state
    localStorage.removeItem("agent_token");
    localStorage.removeItem("agent_email");
    localStorage.removeItem("tenant_id");
    setAuthToken(null);
    setAgentEmail(null);

    // close socket
    try { if (wsRef.current) wsRef.current.close(); } catch (e) {}
    wsRef.current = null;
    setSocketStatus("disconnected");

    // clear UI
    setChats([]);
    setMessagesMap({});
    setActiveChat(null);
  };

  /* ------------------ Detect if active chat is closed ------------------ */
  const activeIsClosed = !!(activeChat && (String(activeChat.status).toLowerCase() === "closed" || String(activeChat.status).toLowerCase() === "resolved"));

  /* ------------------ Render ------------------ */
  return (
    <div className="app">
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ fontSize: 13, color: "#555" }}>Socket: {socketStatus}</div>
        <div style={{ fontSize: 13, color: "#555" }}>Agent: {agentEmail || "—"}</div>
        <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <ChatList
          chats={chats}
          activeChat={activeChat}
          pausedChats={pausedChats}
          onChatClick={handleChatClick}
        />

        <ChatWindow
          chat={activeChat}
          messages={activeChatMessages}
          isLoadingMessages={isLoadingMessages}
          onSend={handleSendMessage}
          isPaused={pausedChats.has(activeChat?.id)}
          onTogglePause={(id) => togglePauseChat(id)}
          onClose={(convId) => handleCloseConversation(convId)}
          socketStatus={socketStatus}
          isClosed={activeIsClosed}
        />

        <CustomerInfo chat={activeChat} />
      </div>
    </div>
  );
};

export default AgentConsole;





// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/conversation.css";

// /* -------------------------- Chat List -------------------------- */
// const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredChats = chats.filter((chat) =>
//     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="chat-list">
//       <div className="chat-list-header">
//         <h2>Inbox</h2>
//         <input
//           type="text"
//           placeholder="Search by chat ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       <div className="chats-section">
//         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
//         {filteredChats.length === 0 ? (
//           <div className="empty-state">No conversations yet</div>
//         ) : (
//           filteredChats.map((chat) => {
//             const isPaused = pausedChats.has(chat.id);
//             const isActive = activeChat?.id === chat.id;
//             return (
//               <div
//                 key={chat.id}
//                 className={`chat-item ${isActive ? "active" : ""} ${
//                   isPaused ? "paused" : ""
//                 }`}
//                 onClick={() => handleChatClick(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span className="chat-name">{chat.id}</span>
//                     <span className="chat-time">{chat.channel}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Chat Window -------------------------- */
// const ChatWindow = ({
//   chat,
//   isTyping,
//   onCloseChat,
//   isPaused,
//   onTogglePause,
//   messages,
//   onSendMessage,
//   isLoadingMessages,
//   consoleSocketStatus,
// }) => {
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const handleSend = () => {
//     if (!message.trim() || isPaused || consoleSocketStatus !== "connected") return;
//     onSendMessage(message);
//     setMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!chat)
//     return (
//       <div className="chat-window empty">
//         <p>Select a chat to start messaging</p>
//       </div>
//     );

//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span
//               className={`status-badge ${
//                 isPaused
//                   ? "paused"
//                   : consoleSocketStatus === "connected"
//                   ? "online"
//                   : "connecting"
//               }`}
//             >
//               {isPaused
//                 ? "Paused"
//                 : consoleSocketStatus === "connected"
//                 ? "Online"
//                 : "Connecting..."}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
//             onClick={() => onTogglePause(chat.id)}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
//             Close
//           </button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {isLoadingMessages ? (
//           <div className="empty-state">Loading messages...</div>
//         ) : messages.length === 0 ? (
//           <div className="empty-state">No messages yet.</div>
//         ) : (
//           messages.map((msg) => {
//             const isAgent = msg.sender === "agent";
//             return (
//               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
//                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
//                   {msg.text}
//                 </div>
//                 <div className="message-time">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className={`message-input-container ${
//           isPaused || consoleSocketStatus !== "connected" ? "disabled" : ""
//         }`}
//       >
//         <input
//           type="text"
//           placeholder={
//             isPaused
//               ? "Chat is paused..."
//               : consoleSocketStatus !== "connected"
//               ? "Connecting..."
//               : "Type your message..."
//           }
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         />
//         <button
//           onClick={handleSend}
//           className="send-btn"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Customer Info -------------------------- */
// const CustomerInfo = ({ chat }) => {
//   if (!chat) return null;
//   return (
//     <div className="customer-info">
//       <h2>Chat Details</h2>
//       <div className="info-section">
//         <div className="info-item"><span>Chat ID:</span> {chat.id}</div>
//         <div className="info-item"><span>Conversation ID:</span> {chat.conversation_id}</div>
//         <div className="info-item"><span>Status:</span> {chat.status}</div>
//         <div className="info-item"><span>Channel:</span> {chat.channel}</div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [consoleSocketStatus, setConsoleSocketStatus] = useState("disconnected");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [activeChat, setActiveChat] = useState(null);
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

//   /* ---------- Console WebSocket ---------- */
//   useEffect(() => {
//     if (window.__consoleSocketInitialized) return; // prevent double connect
//     window.__consoleSocketInitialized = true;

//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("agent_id");
//     const token = localStorage.getItem("agent_token");
//     // const socketUrl = localStorage.getItem("socket_url");
//   //     console.log("📝 tenantId:", tenantId);
//   // console.log("📝 agentId:", agentId);
//   // console.log("📝 token exists?", !!token);
//   // console.log("📝 socketUrl:", socketUrl);
//     if (!tenantId || !agentId || !token) {
//       console.warn("❌ Missing tenant_id or agent_id — please login again");
//       return;
//     }

//     const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(token)}`;
//     // const wsUrl = `${socketUrl}&token=${encodeURIComponent(token)}`;
//     console.log("🔌 Connecting to Agent Console:", wsUrl);

//     const ws = new WebSocket(wsUrl);
//     setConsoleSocket(ws);
//     setConsoleSocketStatus("connecting");

//     ws.onopen = () => {
//       console.log("✅ Connected to Agent Console");
//       setConsoleSocketStatus("connected");
//     };

//     // ws.onmessage = (event) => {
//     //   const data = JSON.parse(event.data);
//     //   console.log("📩 Console event:", data);
//     //   if (data.type === "snapshot") setChats(data.conversations || []);
//     //   else if (data.type === "new_conversation") setChats((prev) => [data.conversation, ...prev]);
//     //   else if (data.type === "message") handleMessage(data);
//     //   else if (data.type === "conversation_closed") handleConversationClosed(data.conversation_id);
//     // };

//     ws.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   console.log("📩 Console event:", data);

//   // ✅ Snapshot handling — normalize data so conversation_id always exists
//   // if (data.type === "snapshot" && Array.isArray(data.conversations)) {
//   //   const formatted = data.conversations.map((c) => ({
//   //     id: c.id,
//   //     conversation_id: c.conversation_id || c.id, // ✅ fallback
//   //     channel: c.channel || "unknown",
//   //     status: c.status || "active",
//   //     sentiment: c.sentiment || "neutral",
//   //   }));
//   //   setChats(formatted);
//   // }
//       if (data.type === "snapshot") {
//   console.log("🔥 SNAPSHOT:", data.conversations);

//   const normalized = data.conversations.map((c) => ({
//     id: c.id || c.chat_id || c.conversationId || "unknown",
//     conversation_id: c.conversation_id || c.id || c.chat_id || c.conversationId,
//     channel: c.channel || c.channel_type || "unknown",
//     status: c.status || c.chat_status || "active",
//     sentiment: c.sentiment || "neutral",
//   }));

//   console.log("📌 Normalized:", normalized);

//   setChats(normalized);
// }


//   // ✅ New conversation — same fallback logic
//   else if (data.type === "new_conversation" && data.conversation) {
//     const conv = data.conversation;
//     const newConv = {
//       id: conv.id,
//       conversation_id: conv.conversation_id || conv.id, // ✅ fallback
//       channel: conv.channel || "unknown",
//       status: conv.status || "active",
//       sentiment: conv.sentiment || "neutral",
//     };
//     setChats((prev) => [newConv, ...prev]);
//   }

//   // ✅ Message update
//   else if (data.type === "message") {
//     handleMessage(data);
//   }

//   // ✅ Conversation closed
//   else if (data.type === "conversation_closed") {
//     handleConversationClosed(data.conversation_id);
//   }

//   // Optional: handle unknown events safely
//   else {
//     console.warn("⚠️ Unrecognized WS event:", data);
//   }
// };


//     ws.onclose = () => {
//       console.warn("❌ Console socket disconnected");
//       setConsoleSocketStatus("disconnected");
//     };

//     ws.onerror = (err) => console.error("⚠️ Console socket error:", err);

//     // ✅ Heartbeat ping every 30s
//     const heartbeat = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//         console.log("💓 Sent heartbeat ping");
//       }
//     }, 30000);

//     return () => {
//       clearInterval(heartbeat);
//       if (ws.readyState === WebSocket.OPEN) ws.close();
//     };
//   }, []);

//   /* ---------- Helpers ---------- */
//   const handleMessage = (data) => {
//     const convId = data.conversation_id || activeChat?.conversation_id;
//     if (!convId) return;
//     const newMsg = {
//       id: data.id || `msg_${Date.now()}`,
//       sender: data.sender,
//       text: data.text,
//       timestamp: data.timestamp || new Date().toISOString(),
//     };
//     setMessages((prev) => ({
//       ...prev,
//       [convId]: [...(prev[convId] || []), newMsg],
//     }));
//   };

//   const handleConversationClosed = (id) => {
//     setChats((prev) => prev.filter((c) => c.conversation_id !== id));
//     if (activeChat?.conversation_id === id) setActiveChat(null);
//   };

//   /* ---------- JOIN ---------- */
//   const handleChatClick = async (chat) => {
//     console.log("🖱️ Chat clicked:", chat.conversation_id);
//     setActiveChat(chat);
//     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
//       consoleSocket.send(JSON.stringify({ type: "join", conversation_id: chat.conversation_id }));
//       console.log("📤 JOIN sent via console socket:", chat.conversation_id);
//     }

//     try {
//       setIsLoadingMessages(true);
//       const token = localStorage.getItem("agent_token");
//       const res = await fetch(
//         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       console.log(`✅ Loaded ${data.length} messages`);
//       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
//     } catch (err) {
//       console.error("⚠️ Fetch messages error:", err);
//     } finally {
//       setIsLoadingMessages(false);
//     }
//   };

//   /* ---------- SEND ---------- */
//   const handleSendMessage = (text) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;
//     const msg = { conversation_id: activeChat.conversation_id, text };
//     consoleSocket.send(JSON.stringify(msg));
//     handleMessage({
//       conversation_id: activeChat.conversation_id,
//       sender: "agent",
//       text,
//       timestamp: new Date().toISOString(),
//     });
//   };

//   /* ---------- CLOSE ---------- */
//   const handleCloseChat = (chatId) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;
//     consoleSocket.send(JSON.stringify({ type: "close_conversation", conversation_id: chatId }));
//     console.log("📤 Sent CLOSE_CONVERSATION:", chatId);
//     handleConversationClosed(chatId);
//   };

//   const activeChatMessages = activeChat
//     ? messages[activeChat.conversation_id] || []
//     : [];

//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         pausedChats={pausedChats}
//         handleChatClick={handleChatClick}
//       />
//       <ChatWindow
//         chat={activeChat}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={pausedChats.has(activeChat?.id)}
//         onTogglePause={(id) =>
//           setPausedChats((prev) => {
//             const s = new Set(prev);
//             s.has(id) ? s.delete(id) : s.add(id);
//             return s;
//           })
//         }
//         messages={activeChatMessages}
//         onSendMessage={handleSendMessage}
//         isLoadingMessages={isLoadingMessages}
//         consoleSocketStatus={consoleSocketStatus}
//       />
//       <CustomerInfo chat={activeChat} />
//     </div>
//   );
// };

// export default AgentConsole;









// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/conversation.css";

// /* -------------------------- Chat List -------------------------- */
// const ChatList = ({ chats, activeChat, pausedChats, handleChatClick }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredChats = chats.filter((chat) =>
//     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="chat-list">
//       <div className="chat-list-header">
//         <h2>Inbox</h2>
//         <input
//           type="text"
//           placeholder="Search by chat ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       <div className="chats-section">
//         <h3 className="section-title">CHATS ({filteredChats.length})</h3>
//         {filteredChats.length === 0 ? (
//           <div className="empty-state">No conversations yet</div>
//         ) : (
//           filteredChats.map((chat) => {
//             const isPaused = pausedChats.has(chat.id);
//             const isActive = activeChat?.id === chat.id;
//             return (
//               <div
//                 key={chat.id}
//                 className={`chat-item ${isActive ? "active" : ""} ${
//                   isPaused ? "paused" : ""
//                 }`}
//                 onClick={() => handleChatClick(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span className="chat-name">{chat.id}</span>
//                     <span className="chat-time">{chat.channel}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Chat Window -------------------------- */
// const ChatWindow = ({
//   chat,
//   isTyping,
//   onCloseChat,
//   isPaused,
//   onTogglePause,
//   messages,
//   onSendMessage,
//   isLoadingMessages,
//   consoleSocketStatus,
// }) => {
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const handleSend = () => {
//     if (!message.trim() || isPaused || consoleSocketStatus !== "connected") return;
//     onSendMessage(message);
//     setMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!chat)
//     return (
//       <div className="chat-window empty">
//         <p>Select a chat to start messaging</p>
//       </div>
//     );

//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span
//               className={`status-badge ${
//                 isPaused
//                   ? "paused"
//                   : consoleSocketStatus === "connected"
//                   ? "online"
//                   : "connecting"
//               }`}
//             >
//               {isPaused
//                 ? "Paused"
//                 : consoleSocketStatus === "connected"
//                 ? "Online"
//                 : "Connecting..."}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
//             onClick={() => onTogglePause(chat.id)}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
//             Close
//           </button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {isLoadingMessages ? (
//           <div className="empty-state">Loading messages...</div>
//         ) : messages.length === 0 ? (
//           <div className="empty-state">No messages yet.</div>
//         ) : (
//           messages.map((msg) => {
//             const isAgent = msg.sender === "agent";
//             return (
//               <div key={msg.id} className={`message ${isAgent ? "agent" : "user"}`}>
//                 <div className={`message-bubble ${isAgent ? "agent-bubble" : "user-bubble"}`}>
//                   {msg.text}
//                 </div>
//                 <div className="message-time">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className={`message-input-container ${
//           isPaused || consoleSocketStatus !== "connected" ? "disabled" : ""
//         }`}
//       >
//         <input
//           type="text"
//           placeholder={
//             isPaused
//               ? "Chat is paused..."
//               : consoleSocketStatus !== "connected"
//               ? "Connecting..."
//               : "Type your message..."
//           }
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         />
//         <button
//           onClick={handleSend}
//           className="send-btn"
//           disabled={isPaused || consoleSocketStatus !== "connected"}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Customer Info -------------------------- */
// const CustomerInfo = ({ chat }) => {
//   if (!chat) return null;
//   return (
//     <div className="customer-info">
//       <h2>Chat Details</h2>
//       <div className="info-section">
//         <div className="info-item"><span>Chat ID:</span> {chat.id}</div>
//         <div className="info-item"><span>Conversation ID:</span> {chat.conversation_id}</div>
//         <div className="info-item"><span>Status:</span> {chat.status}</div>
//         <div className="info-item"><span>Channel:</span> {chat.channel}</div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [consoleSocketStatus, setConsoleSocketStatus] = useState("disconnected");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [activeChat, setActiveChat] = useState(null);
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);

//   /* ---------- Console WebSocket ---------- */
//   useEffect(() => {
//     if (window.__consoleSocketInitialized) return; // prevent double connect
//     window.__consoleSocketInitialized = true;

//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("agent_username");
//     const token = localStorage.getItem("agent_token");
//     const socketUrl = localStorage.getItem("socket_url");

//     console.log("📝 tenantId:", tenantId);
//     console.log("📝 agentId:", agentId);
//     console.log("📝 token exists?", !!token);
//     console.log("📝 socketUrl:", socketUrl);

//     if (!tenantId || !agentId || !token || !socketUrl) {
//       console.warn("❌ Missing tenant_id, agent_id, token, or socket_url — please login again");
//       return;
//     }

//     const ws = new WebSocket(`${socketUrl}&token=${encodeURIComponent(token)}`);
//     setConsoleSocket(ws);
//     setConsoleSocketStatus("connecting");

//     ws.onopen = () => {
//       console.log("✅ Connected to Agent Console");
//       setConsoleSocketStatus("connected");
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("📩 Console event:", data);

//       if (data.type === "snapshot") {
//         const normalized = data.conversations.map((c) => ({
//           id: c.id || c.chat_id || c.conversationId || "unknown",
//           conversation_id: c.conversation_id || c.id || c.chat_id || c.conversationId,
//           channel: c.channel || c.channel_type || "unknown",
//           status: c.status || c.chat_status || "active",
//           sentiment: c.sentiment || "neutral",
//         }));
//         console.log("📌 Normalized:", normalized);
//         setChats(normalized);
//       } else if (data.type === "new_conversation" && data.conversation) {
//         const conv = data.conversation;
//         const newConv = {
//           id: conv.id,
//           conversation_id: conv.conversation_id || conv.id,
//           channel: conv.channel || "unknown",
//           status: conv.status || "active",
//           sentiment: conv.sentiment || "neutral",
//         };
//         setChats((prev) => [newConv, ...prev]);
//       } else if (data.type === "message") {
//         handleMessage(data);
//       } else if (data.type === "conversation_closed") {
//         handleConversationClosed(data.conversation_id);
//       } else {
//         console.warn("⚠️ Unrecognized WS event:", data);
//       }
//     };

//     ws.onclose = () => {
//       console.warn("❌ Console socket disconnected");
//       setConsoleSocketStatus("disconnected");
//     };

//     ws.onerror = (err) => console.error("⚠️ Console socket error:", err);

//     const heartbeat = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//         console.log("💓 Sent heartbeat ping");
//       }
//     }, 30000);

//     return () => {
//       clearInterval(heartbeat);
//       if (ws.readyState === WebSocket.OPEN) ws.close();
//     };
//   }, []);

//   /* ---------- Helpers ---------- */
//   const handleMessage = (data) => {
//     const convId = data.conversation_id || activeChat?.conversation_id;
//     if (!convId) return;
//     const newMsg = {
//       id: data.id || `msg_${Date.now()}`,
//       sender: data.sender,
//       text: data.text,
//       timestamp: data.timestamp || new Date().toISOString(),
//     };
//     setMessages((prev) => ({
//       ...prev,
//       [convId]: [...(prev[convId] || []), newMsg],
//     }));
//   };

//   const handleConversationClosed = (id) => {
//     setChats((prev) => prev.filter((c) => c.conversation_id !== id));
//     if (activeChat?.conversation_id === id) setActiveChat(null);
//   };

//   const handleChatClick = async (chat) => {
//     console.log("🖱️ Chat clicked:", chat.conversation_id);
//     setActiveChat(chat);
//     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
//       consoleSocket.send(JSON.stringify({ type: "join", conversation_id: chat.conversation_id }));
//       console.log("📤 JOIN sent via console socket:", chat.conversation_id);
//     }

//     try {
//       setIsLoadingMessages(true);
//       const token = localStorage.getItem("agent_token");
//       const res = await fetch(
//         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       console.log(`✅ Loaded ${data.length} messages`);
//       setMessages((prev) => ({ ...prev, [chat.conversation_id]: data }));
//     } catch (err) {
//       console.error("⚠️ Fetch messages error:", err);
//     } finally {
//       setIsLoadingMessages(false);
//     }
//   };

//   const handleSendMessage = (text) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;
//     const msg = { conversation_id: activeChat.conversation_id, text };
//     consoleSocket.send(JSON.stringify(msg));
//     handleMessage({
//       conversation_id: activeChat.conversation_id,
//       sender: "agent",
//       text,
//       timestamp: new Date().toISOString(),
//     });
//   };

//   const handleCloseChat = (chatId) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) return;
//     consoleSocket.send(JSON.stringify({ type: "close_conversation", conversation_id: chatId }));
//     console.log("📤 Sent CLOSE_CONVERSATION:", chatId);
//     handleConversationClosed(chatId);
//   };

//   const activeChatMessages = activeChat
//     ? messages[activeChat.conversation_id] || []
//     : [];

//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         pausedChats={pausedChats}
//         handleChatClick={handleChatClick}
//       />
//       <ChatWindow
//         chat={activeChat}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={pausedChats.has(activeChat?.id)}
//         onTogglePause={(id) =>
//           setPausedChats((prev) => {
//             const s = new Set(prev);
//             s.has(id) ? s.delete(id) : s.add(id);
//             return s;
//           })
//         }
//         messages={activeChatMessages}
//         onSendMessage={handleSendMessage}
//         isLoadingMessages={isLoadingMessages}
//         consoleSocketStatus={consoleSocketStatus}
//       />
//       <CustomerInfo chat={activeChat} />
//     </div>
//   );
// };

// export default AgentConsole;
