
// // import React, { useState, useEffect, useRef } from "react";
// // import "../../styles/conversation.css";

// // /* -------------------------- Chat List -------------------------- */
// // const ChatList = ({
// //   chats,
// //   activeChat,
// //   pausedChats,
// //   closedChats,
// //   handleChatClick,
// //   messages,
// //   unreadCounts,
// // }) => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   // 🔢 total unread across all conversations (for Inbox header)
// //   const totalUnread = Object.values(unreadCounts || {}).reduce(
// //     (sum, n) => sum + (n || 0),
// //     0
// //   );

// //   // Get last activity timestamp for a chat (last message or created_at)
// //   const getLastActivity = (chat) => {
// //     const convMsgs = messages[chat.conversation_id] || [];
// //     if (convMsgs.length > 0) {
// //       const last = convMsgs[convMsgs.length - 1];
// //       const ts =
// //         last.timestamp || last.created_at || new Date().toISOString();
// //       return new Date(ts).getTime();
// //     }
// //     if (chat.created_at) {
// //       return new Date(chat.created_at).getTime();
// //     }
// //     return 0;
// //   };

// //   // Filter + sort like WhatsApp (latest activity on top)
// //   const filteredChats = [...chats]
// //     .filter((chat) =>
// //       chat.id.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //     .sort((a, b) => getLastActivity(b) - getLastActivity(a));

// //   return (
// //     <div className="chat-list">
// //       <div className="chat-list-header">
// //         <h2>
// //           Inbox
// //           {totalUnread > 0 && (
// //             <span className="inbox-unread-count"> ({totalUnread})</span>
// //           )}
// //         </h2>
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
// //             const isClosed =
// //               chat.status === "resolved" ||
// //               closedChats.has(chat.conversation_id);

// //             const convMsgs = messages[chat.conversation_id] || [];
// //             const lastMsg = convMsgs[convMsgs.length - 1];
// //             const lastText = lastMsg?.text || "";
// //             const lastTime = lastMsg?.timestamp
// //               ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
// //                   hour: "2-digit",
// //                   minute: "2-digit",
// //                 })
// //               : "";

// //             const unread = unreadCounts?.[chat.conversation_id] || 0;
// //             const hasUnread = unread > 0;

// //             return (
// //               <div
// //                 key={chat.id}
// //                 className={`chat-item 
// //                   ${isActive ? "active" : ""} 
// //                   ${isPaused ? "paused" : ""} 
// //                   ${isClosed ? "closed" : ""}`}
// //                 onClick={() => handleChatClick(chat)}
// //               >
// //                 <div className="chat-info">
// //                   <div className="chat-header-row">
// //                     <span
// //                       className={
// //                         "chat-name" +
// //                         (hasUnread ? " chat-name-unread" : "")
// //                       }
// //                     >
// //                       {chat.id}
// //                     </span>
// //                     <span className="chat-time">
// //                       {isClosed ? "Closed" : lastTime || chat.channel}
// //                     </span>
// //                   </div>
// //                   {lastText && (
// //                     <div
// //                       className={
// //                         "chat-preview" +
// //                         (hasUnread ? " chat-preview-unread" : "")
// //                       }
// //                     >
// //                       {lastText.length > 40
// //                         ? lastText.slice(0, 40) + "…"
// //                         : lastText}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {hasUnread && (
// //                   <div className="chat-unread-badge">
// //                     {unread > 99 ? "99+" : unread}
// //                   </div>
// //                 )}
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
// //   isClosed,
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

// //   const disabled =
// //     isPaused || isClosed || consoleSocketStatus !== "connected";

// //   const handleSend = () => {
// //     if (!message.trim() || disabled) return;
// //     console.log("✉️ [AgentConsole] Sending message:", message);
// //     onSendMessage(message);
// //     setMessage("");
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey && !disabled) {
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

// //   const statusClass = isClosed
// //     ? "closed"
// //     : isPaused
// //     ? "paused"
// //     : consoleSocketStatus === "connected"
// //     ? "online"
// //     : "connecting";

// //   const statusText = isClosed
// //     ? "Closed"
// //     : isPaused
// //     ? "Paused"
// //     : consoleSocketStatus === "connected"
// //     ? "Online"
// //     : "Connecting...";

// //   const inputPlaceholder = isClosed
// //     ? "Conversation is closed..."
// //     : isPaused
// //     ? "Chat is paused..."
// //     : consoleSocketStatus !== "connected"
// //     ? "Connecting..."
// //     : "Type your message...";

// //   return (
// //     <div className="chat-window">
// //       <div className="chat-window-header">
// //         <div className="chat-user-info">
// //           <div>
// //             <h3>{chat.id}</h3>
// //             <span className={`status-badge ${statusClass}`}>
// //               {statusText}
// //             </span>
// //           </div>
// //         </div>
// //         <div className="chat-actions">
// //           <button
// //             className={`action-btn icon-btn ${
// //               isPaused ? "unlock-btn" : "lock-btn"
// //             }`}
// //             onClick={() => {
// //               console.log(
// //                 "🔒 [AgentConsole] Toggle pause for chat:",
// //                 chat.id,
// //                 "paused?",
// //                 isPaused
// //               );
// //               onTogglePause(chat.id);
// //             }}
// //             disabled={isClosed}
// //           >
// //             {isPaused ? "🔓" : "🔒"}
// //           </button>
// //           <button
// //             className="action-btn close-btn"
// //             onClick={() => {
// //               console.log(
// //                 "🛑 [AgentConsole] Close conversation:",
// //                 chat.conversation_id
// //               );
// //               onCloseChat(chat.conversation_id);
// //             }}
// //             disabled={isClosed}
// //           >
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
// //             const fromAgent = msg.sender === "agent";
// //             const fromBot = msg.sender === "bot" || msg.sender === "ai";
// //             const fromUser = !fromAgent && !fromBot;

// //             let messageClass = "";
// //             let bubbleClass = "";

// //             if (fromAgent) {
// //               messageClass = "agent";
// //               bubbleClass = "agent-bubble";
// //             } else if (fromBot) {
// //               messageClass = "bot";
// //               bubbleClass = "bot-bubble";
// //             } else if (fromUser) {
// //               messageClass = "user";
// //               bubbleClass = "user-bubble";
// //             }

// //             return (
// //               <div key={msg.id} className={`message ${messageClass}`}>
// //                 <div className={`message-bubble ${bubbleClass}`}>
// //                   {msg.text}
// //                 </div>
// //                 <div className="message-time">
// //                   {msg.timestamp
// //                     ? new Date(msg.timestamp).toLocaleTimeString()
// //                     : ""}
// //                 </div>
// //               </div>
// //             );
// //           })
// //         )}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       <div
// //         className={`message-input-container ${
// //           disabled ? "disabled" : ""
// //         }`}
// //       >
// //         <input
// //           type="text"
// //           placeholder={inputPlaceholder}
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           className="message-input"
// //           disabled={disabled}
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="send-btn"
// //           disabled={disabled}
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
// //         <div className="info-item">
// //           <span>Chat ID:</span> {chat.id}
// //         </div>
// //         <div className="info-item">
// //           <span>Conversation ID:</span> {chat.conversation_id}
// //         </div>
// //         <div className="info-item">
// //           <span>Status:</span> {chat.status}
// //         </div>
// //         <div className="info-item">
// //           <span>Channel:</span> {chat.channel}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* -------------------------- Agent Console -------------------------- */
// // const AgentConsole = () => {
// //   const [consoleSocket, setConsoleSocket] = useState(null);
// //   const [consoleSocketStatus, setConsoleSocketStatus] =
// //     useState("disconnected");
// //   const [chats, setChats] = useState([]);
// //   const [messages, setMessages] = useState({});
// //   const [activeChat, setActiveChat] = useState(null);
// //   const [pausedChats, setPausedChats] = useState(new Set());
// //   const [closedChats, setClosedChats] = useState(new Set());
// //   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
// //   const [unreadCounts, setUnreadCounts] = useState({});

// //   // Keep latest active conversation id in a ref (for unread updates inside WS handler)
// //   // Keep latest active conversation id in a ref (for unread updates inside WS handler)
// // const activeConvIdRef = useRef(null);
// // useEffect(() => {
// //   activeConvIdRef.current = activeChat?.conversation_id || null;
// // }, [activeChat]);


// //   /* ===================================================
// //      Fetch Agent Inbox (my_active)
// //      =================================================== */
// //   useEffect(() => {
// //     const fetchInbox = async () => {
// //       try {
// //         const token = localStorage.getItem("agent_token");
// //         if (!token) {
// //           console.warn(
// //             "⚠️ [AgentConsole] No agent_token found in localStorage"
// //           );
// //           return;
// //         }

// //         console.log(
// //           "📥 [AgentConsole] Fetching inbox conversations (my_active)..."
// //         );
// //         const res = await fetch(
// //           "https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200",
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         const data = await res.json();
// //         console.log(
// //           "📥 [AgentConsole] Inbox conversations response:",
// //           data
// //         );

// //         if (Array.isArray(data.conversations)) {
// //           const formatted = data.conversations.map((c) => ({
// //             id: String(c.id),
// //             conversation_id: c.id,
// //             channel: c.channel || "inbox",
// //             status: c.status || "active",
// //             created_at:
// //               c.created_at || c.updated_at || new Date().toISOString(),
// //           }));

// //           setChats((prev) => {
// //             const merged = new Map();
// //             [...prev, ...formatted].forEach((c) => {
// //               merged.set(c.id, c);
// //             });
// //             const out = Array.from(merged.values());
// //             console.log(
// //               "📥 [AgentConsole] Merged chat list:",
// //               out
// //             );
// //             return out;
// //           });
// //         } else {
// //           console.warn(
// //             "⚠️ [AgentConsole] Inbox format unexpected:",
// //             data
// //           );
// //         }
// //       } catch (err) {
// //         console.error("⚠️ [AgentConsole] Inbox fetch error:", err);
// //       }
// //     };

// //     fetchInbox();
// //   }, []);

// //   /* ---------- Console WebSocket ---------- */
// //   useEffect(() => {
// //     const tenantId = localStorage.getItem("tenant_id");
// //     const agentId = localStorage.getItem("agent_id");
// //     const token = localStorage.getItem("agent_token");

// //     if (!tenantId || !agentId || !token) {
// //       console.warn(
// //         "❌ [AgentConsole] Missing tenant_id, agent_id or agent_token — please login again",
// //         { tenantId, agentId, hasToken: !!token }
// //       );
// //       return;
// //     }

// //     const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
// //       token
// //     )}`;
// //     console.log(
// //       "🔌 [AgentConsole] Connecting Console WS:",
// //       wsUrl
// //     );

// //     const ws = new WebSocket(wsUrl);

// //     setConsoleSocket(ws);
// //     setConsoleSocketStatus("connecting");

// //     ws.onopen = () => {
// //       console.log("✅ [AgentConsole] Connected to Agent Console WS");
// //       setConsoleSocketStatus("connected");
// //     };

// //     ws.onmessage = (event) => {
// //       try {
// //         const data = JSON.parse(event.data);
// //         console.log("📨 [AgentConsole] WS message:", data);

// //         if (data.type === "snapshot") {
// //           const normalized = (data.conversations || []).map((c) => ({
// //             id: c.id || c.chat_id || "unknown",
// //             conversation_id: c.conversation_id || c.id,
// //             channel: c.channel || "unknown",
// //             status: c.status || "active",
// //             created_at:
// //               c.created_at ||
// //               c.updated_at ||
// //               new Date().toISOString(),
// //           }));

// //           console.log(
// //             "📸 [AgentConsole] Snapshot conversations:",
// //             normalized
// //           );

// //           setChats((prev) => {
// //             const map = new Map();
// //             [...prev, ...normalized].forEach((x) => map.set(x.id, x));
// //             const out = Array.from(map.values());
// //             console.log(
// //               "📸 [AgentConsole] Chats after snapshot merge:",
// //               out
// //             );
// //             return out;
// //           });
// //         } else if (data.type === "new_conversation") {
// //           const conv = data.conversation;
// //           const newConv = {
// //             id: conv.id,
// //             conversation_id: conv.conversation_id || conv.id,
// //             channel: conv.channel || "unknown",
// //             status: conv.status || "active",
// //             created_at:
// //               conv.created_at ||
// //               conv.updated_at ||
// //               new Date().toISOString(),
// //           };

// //           console.log(
// //             "🆕 [AgentConsole] New conversation:",
// //             newConv
// //           );
// //           setChats((prev) => [newConv, ...prev]);
// //         } else if (data.type === "message") {
// //           console.log(
// //             "💬 [AgentConsole] Incoming WS message event:",
// //             data
// //           );
// //           handleMessage(data);
// //         } else if (data.type === "conversation_closed") {
// //           console.log(
// //             "🛑 [AgentConsole] Conversation closed event:",
// //             data.conversation_id
// //           );
// //           handleConversationClosed(data.conversation_id);
// //         } else if (data.type === "pong" || data.type === "ping") {
// //           // heartbeat; optional log
// //         } else {
// //           console.log(
// //             "ℹ️ [AgentConsole] Unhandled WS event type:",
// //             data.type,
// //             data
// //           );
// //         }
// //       } catch (e) {
// //         console.warn(
// //           "⚠️ [AgentConsole] Failed to parse WS message:",
// //           event.data,
// //           e
// //         );
// //       }
// //     };

// //     ws.onclose = (evt) => {
// //       console.log(
// //         "⚠️ [AgentConsole] Console socket closed:",
// //         evt.code,
// //         evt.reason
// //       );
// //       setConsoleSocketStatus("disconnected");
// //     };

// //     ws.onerror = (err) =>
// //       console.error(
// //         "⚠️ [AgentConsole] Console socket error:",
// //         err
// //       );

// //     const heartbeat = setInterval(() => {
// //       if (ws.readyState === WebSocket.OPEN) {
// //         ws.send(JSON.stringify({ type: "ping" }));
// //       }
// //     }, 30000);

// //     return () => {
// //       clearInterval(heartbeat);
// //       ws.close();
// //     };
// //   }, []);

// //   /* ---------- Helpers ---------- */
// //   // const handleMessage = (data) => {
// //   //   const convId = data.conversation_id || activeChat?.conversation_id;
// //   //   if (!convId) {
// //   //     console.warn(
// //   //       "⚠️ [AgentConsole] handleMessage without convId:",
// //   //       data
// //   //     );
// //   //     return;
// //   //   }

// //   //   const msgId =
// //   //     data.id || data.message_id || data.msg_id || null;

// //   //   const ts =
// //   //     data.timestamp ||
// //   //     data.created_at ||
// //   //     data.sent_at ||
// //   //     new Date().toISOString();

// //   //   const sender = data.sender;
// //   //   const text = (data.text || "").trim();
// //   //   if (!text) {
// //   //     console.log(
// //   //       "⚠️ [AgentConsole] handleMessage blank text, skipping:",
// //   //       data
// //   //     );
// //   //     return;
// //   //   }

// //   //   // ✅ Ensure conversation exists in chat list (WhatsApp-style auto create)
// //   //   setChats((prev) => {
// //   //     const already = prev.some(
// //   //       (c) => String(c.conversation_id) === String(convId)
// //   //     );
// //   //     if (already) return prev;

// //   //     const newConv = {
// //   //       id: String(convId),
// //   //       conversation_id: convId,
// //   //       channel: data.channel || "unknown",
// //   //       status: "active",
// //   //       created_at: ts,
// //   //     };

// //   //     console.log(
// //   //       "🆕 [AgentConsole] Auto-creating chat from WS message:",
// //   //       newConv
// //   //     );

// //   //     return [newConv, ...prev];
// //   //   });

// //   //   const newMsg = {
// //   //     id: msgId || `msg_${ts}_${sender}_${text}`,
// //   //     sender,
// //   //     text,
// //   //     timestamp: ts,
// //   //   };

// //   //   console.log("💬 [AgentConsole] Normalized WS message:", {
// //   //     convId,
// //   //     newMsg,
// //   //   });

// //   //   setMessages((prev) => {
// //   //     const current = prev[convId] || [];

// //   //     if (msgId && current.some((m) => m.id === msgId)) {
// //   //       console.log(
// //   //         "🧹 [AgentConsole] skip WS duplicate by id:",
// //   //         msgId
// //   //       );
// //   //       return prev;
// //   //     }

// //   //     const key = `${sender}|${text}|${ts}`;
// //   //     if (
// //   //       current.some(
// //   //         (m) => `${m.sender}|${m.text}|${m.timestamp}` === key
// //   //       )
// //   //     ) {
// //   //       console.log(
// //   //         "🧹 [AgentConsole] skip WS duplicate by composite key:",
// //   //         key
// //   //       );
// //   //       return prev;
// //   //     }

// //   //     const updated = {
// //   //       ...prev,
// //   //       [convId]: [...current, newMsg],
// //   //     };

// //   //     console.log(
// //   //       "💾 [AgentConsole] Messages updated for convId:",
// //   //       convId,
// //   //       updated[convId]
// //   //     );
// //   //     return updated;
// //   //   });

// //   //   // 🔔 Update unread count if this is not the currently open chat
// //   //   setUnreadCounts((prev) => {
// //   //     if (activeConvIdRef.current === convId) {
// //   //       return { ...prev, [convId]: 0 };
// //   //     }
// //   //     const current = prev[convId] || 0;
// //   //     return { ...prev, [convId]: current + 1 };
// //   //   });
// //   // };

// //   /* ---------- Helpers ---------- */
// //   const handleMessage = (data) => {
// //     const convId = data.conversation_id || activeChat?.conversation_id;
// //     if (!convId) {
// //       console.warn(
// //         "⚠️ [AgentConsole] handleMessage without convId:",
// //         data
// //       );
// //       return;
// //     }

// //     const msgId =
// //       data.id || data.message_id || data.msg_id || null;

// //     const ts =
// //       data.timestamp ||
// //       data.created_at ||
// //       data.sent_at ||
// //       new Date().toISOString();

// //     // ✅ Normalize sender field (handle "user", "customer", "agent", "ai", "bot")
// //     let sender = data.sender || data.role || "user";
    
// //     const text = (data.text || data.message || "").trim();
// //     if (!text) {
// //       console.log(
// //         "⚠️ [AgentConsole] handleMessage blank text, skipping:",
// //         data
// //       );
// //       return;
// //     }

// //     // ✅ Ensure conversation exists in chat list (WhatsApp-style auto create)
// //     setChats((prev) => {
// //       const already = prev.some(
// //         (c) => String(c.conversation_id) === String(convId)
// //       );
// //       if (already) return prev;

// //       const newConv = {
// //         id: String(convId),
// //         conversation_id: convId,
// //         channel: data.channel || "unknown",
// //         status: "active",
// //         created_at: ts,
// //       };

// //       console.log(
// //         "🆕 [AgentConsole] Auto-creating chat from WS message:",
// //         newConv
// //       );

// //       return [newConv, ...prev];
// //     });

// //     const newMsg = {
// //       id: msgId || `msg_${ts}_${sender}_${text}`,
// //       sender,
// //       text,
// //       timestamp: ts,
// //     };

// //     console.log("💬 [AgentConsole] Normalized WS message:", {
// //       convId,
// //       newMsg,
// //     });

// //     setMessages((prev) => {
// //       const current = prev[convId] || [];

// //       // ✅ Deduplication: check by ID first
// //       if (msgId && current.some((m) => m.id === msgId)) {
// //         console.log(
// //           "🧹 [AgentConsole] skip WS duplicate by id:",
// //           msgId
// //         );
// //         return prev;
// //       }

// //       // ✅ Deduplication: check by composite key (sender + text + timestamp)
// //       const key = `${sender}|${text}|${ts}`;
// //       if (
// //         current.some(
// //           (m) => `${m.sender}|${m.text}|${m.timestamp}` === key
// //         )
// //       ) {
// //         console.log(
// //           "🧹 [AgentConsole] skip WS duplicate by composite key:",
// //           key
// //         );
// //         return prev;
// //       }

// //       const updated = {
// //         ...prev,
// //         [convId]: [...current, newMsg],
// //       };

// //       console.log(
// //         "💾 [AgentConsole] Messages updated for convId:",
// //         convId,
// //         updated[convId]
// //       );
// //       return updated;
// //     });

// //     // 🔔 Update unread count if this is not the currently open chat
// //     setUnreadCounts((prev) => {
// //       if (activeConvIdRef.current === convId) {
// //         return { ...prev, [convId]: 0 };
// //       }
// //       const current = prev[convId] || 0;
// //       return { ...prev, [convId]: current + 1 };
// //     });
// //   };

// //   const handleConversationClosed = (conversationId) => {
// //     console.log(
// //       "🛑 [AgentConsole] handleConversationClosed:",
// //       conversationId
// //     );

// //     setChats((prev) =>
// //       prev.map((c) =>
// //         c.conversation_id === conversationId
// //           ? { ...c, status: "resolved" }
// //           : c
// //       )
// //     );

// //     setClosedChats((prev) => {
// //       const s = new Set(prev);
// //       s.add(conversationId);
// //       return s;
// //     });

// //     setActiveChat((prev) =>
// //       prev && prev.conversation_id === conversationId
// //         ? { ...prev, status: "resolved" }
// //         : prev
// //     );
// //   };

// //   /* ---------- JOIN + load history ---------- */
// //   const handleChatClick = async (chat) => {
// //     console.log("👆 [AgentConsole] Chat clicked:", chat);
// //     setActiveChat(chat);

// //     // 🧹 Clear unread for this conversation
// //     setUnreadCounts((prev) => ({
// //       ...prev,
// //       [chat.conversation_id]: 0,
// //     }));

// //     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
// //       console.log(
// //         "📨 [AgentConsole] Sending join for conv:",
// //         chat.conversation_id
// //       );
// //       consoleSocket.send(
// //         JSON.stringify({
// //           type: "join",
// //           conversation_id: chat.conversation_id,
// //         })
// //       );
// //     } else {
// //       console.warn(
// //         "⚠️ [AgentConsole] Cannot send join, consoleSocket not open",
// //         consoleSocket?.readyState
// //       );
// //     }

// //     try {
// //       setIsLoadingMessages(true);
// //       const token = localStorage.getItem("agent_token");
// //       if (!token) {
// //         console.warn(
// //           "⚠️ [AgentConsole] No agent_token for history fetch"
// //         );
// //         return;
// //       }

// //       console.log(
// //         "📥 [AgentConsole] Fetching history for conv:",
// //         chat.conversation_id
// //       );

// //       const res = await fetch(
// //         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       const data = await res.json();
// //       console.log("📥 [AgentConsole] History API data:", data);

// //       const seen = new Set();

// //       const normalized = Array.isArray(data)
// //         ? data
// //             .map((m) => {
// //               const id =
// //                 m.id ||
// //                 m.message_id ||
// //                 m.msg_id ||
// //                 `msg_${m.created_at || m.timestamp || m.text}`;

// //               const sender = m.sender || m.role || "user";
// //               const text = (m.text || m.message || m.reply || "").trim();
// //               const ts =
// //                 m.timestamp ||
// //                 m.created_at ||
// //                 m.sent_at ||
// //                 new Date().toISOString();

// //               if (!text) return null;

// //               const key = `${id}|${sender}|${text}|${ts}`;
// //               if (seen.has(key)) {
// //                 console.log(
// //                   "🧹 [AgentConsole] Skip history duplicate row:",
// //                   key
// //                 );
// //                 return null;
// //               }
// //               seen.add(key);

// //               return {
// //                 id,
// //                 sender,
// //                 text,
// //                 timestamp: ts,
// //               };
// //             })
// //             .filter(Boolean)
// //         : [];

// //       console.log(
// //         "💾 [AgentConsole] Normalized history messages for conv:",
// //         chat.conversation_id,
// //         normalized
// //       );

// //       setMessages((prev) => ({
// //         ...prev,
// //         [chat.conversation_id]: normalized,
// //       }));

// //       // Also clear unread again after loading history
// //       setUnreadCounts((prev) => ({
// //         ...prev,
// //         [chat.conversation_id]: 0,
// //       }));
// //     } catch (err) {
// //       console.error(
// //         "⚠️ [AgentConsole] Fetch messages error:",
// //         err
// //       );
// //     } finally {
// //       setIsLoadingMessages(false);
// //     }
// //   };

// //   /* ---------- SEND ---------- */
// //   const handleSendMessage = (text) => {
// //     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// //       console.warn(
// //         "⚠️ [AgentConsole] Cannot send message, consoleSocket not open"
// //       );
// //       return;
// //     }
// //     if (!activeChat) {
// //       console.warn(
// //         "⚠️ [AgentConsole] No activeChat selected for send"
// //       );
// //       return;
// //     }

// //     const msg = { conversation_id: activeChat.conversation_id, text };
// //     console.log(
// //       "✉️ [AgentConsole] WS send agent message:",
// //       msg
// //     );
// //     consoleSocket.send(JSON.stringify(msg));
// //     // backend echo → handleMessage will add
// //   };

// //   /* ---------- CLOSE (WebSocket only) ---------- */
// //   const handleCloseChat = (conversationId) => {
// //     if (!conversationId) return;

// //     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
// //       console.warn(
// //         "⚠️ [AgentConsole] Console socket not open, cannot send close_conversation; closing locally",
// //         consoleSocket?.readyState
// //       );
// //       handleConversationClosed(conversationId);
// //       return;
// //     }

// //     console.log(
// //       "🛑 [AgentConsole] Sending close_conversation over WS for conv:",
// //       conversationId
// //     );

// //     consoleSocket.send(
// //       JSON.stringify({
// //         type: "close_conversation",
// //         conversation_id: conversationId,
// //       })
// //     );

// //     // Optimistic UI update
// //     handleConversationClosed(conversationId);
// //   };

// //   const activeChatMessages = activeChat
// //     ? messages[activeChat.conversation_id] || []
// //     : [];

// //   const isActiveChatClosed =
// //     activeChat &&
// //     (activeChat.status === "resolved" ||
// //       closedChats.has(activeChat.conversation_id));

// //   return (
// //     <div className="app">
// //       <ChatList
// //         chats={chats}
// //         activeChat={activeChat}
// //         pausedChats={pausedChats}
// //         closedChats={closedChats}
// //         handleChatClick={handleChatClick}
// //         messages={messages}
// //         unreadCounts={unreadCounts}
// //       />
// //       <ChatWindow
// //         chat={activeChat}
// //         isTyping={false}
// //         onCloseChat={handleCloseChat}
// //         isPaused={activeChat ? pausedChats.has(activeChat.id) : false}
// //         isClosed={!!isActiveChatClosed}
// //         onTogglePause={(id) =>
// //           setPausedChats((prev) => {
// //             const s = new Set(prev);
// //             if (s.has(id)) s.delete(id);
// //             else s.add(id);
// //             console.log(
// //               "🔒 [AgentConsole] Paused chats set:",
// //               s
// //             );
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





// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/conversation.css";

// /* -------------------------- Chat List -------------------------- */
// const ChatList = ({
//   chats,
//   activeChat,
//   pausedChats,
//   closedChats,
//   handleChatClick,
//   messages,
//   unreadCounts,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // total unread across all conversations (for Inbox header)
//   const totalUnread = Object.values(unreadCounts || {}).reduce(
//     (sum, n) => sum + (n || 0),
//     0
//   );

//   // Get last activity timestamp for a chat (last message or created_at)
//   const getLastActivity = (chat) => {
//     const convMsgs = messages[chat.conversation_id] || [];
//     if (convMsgs.length > 0) {
//       const last = convMsgs[convMsgs.length - 1];
//       const ts =
//         last.timestamp || last.created_at || new Date().toISOString();
//       return new Date(ts).getTime();
//     }
//     if (chat.created_at) {
//       return new Date(chat.created_at).getTime();
//     }
//     return 0;
//   };

//   // Filter + sort like WhatsApp (latest activity on top)
//   const filteredChats = [...chats]
//     .filter((chat) =>
//       chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => getLastActivity(b) - getLastActivity(a));

//   return (
//     <div className="chat-list">
//       <div className="chat-list-header">
//         <h2>
//           Inbox
//           {totalUnread > 0 && (
//             <span className="inbox-unread-count"> ({totalUnread})</span>
//           )}
//         </h2>
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
//             const isClosed =
//               chat.status === "resolved" ||
//               closedChats.has(chat.conversation_id);

//             const convMsgs = messages[chat.conversation_id] || [];
//             const lastMsg = convMsgs[convMsgs.length - 1];
//             const lastText = lastMsg?.text || "";
//             const lastTime = lastMsg?.timestamp
//               ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "";

//             const unread = unreadCounts?.[chat.conversation_id] || 0;
//             const hasUnread = unread > 0;

//             return (
//               <div
//                 key={chat.id}
//                 className={`chat-item 
//                   ${isActive ? "active" : ""} 
//                   ${isPaused ? "paused" : ""} 
//                   ${isClosed ? "closed" : ""}`}
//                 onClick={() => handleChatClick(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span
//                       className={
//                         "chat-name" +
//                         (hasUnread ? " chat-name-unread" : "")
//                       }
//                     >
//                       {chat.id}
//                     </span>
//                     <span className="chat-time">
//                       {isClosed ? "Closed" : lastTime || chat.channel}
//                     </span>
//                   </div>
//                   {lastText && (
//                     <div
//                       className={
//                         "chat-preview" +
//                         (hasUnread ? " chat-preview-unread" : "")
//                       }
//                     >
//                       {lastText.length > 40
//                         ? lastText.slice(0, 40) + "…"
//                         : lastText}
//                     </div>
//                   )}
//                 </div>

//                 {hasUnread && (
//                   <div className="chat-unread-badge">
//                     {unread > 99 ? "99+" : unread}
//                   </div>
//                 )}
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
//   isClosed,
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

//   const disabled =
//     isPaused || isClosed || consoleSocketStatus !== "connected";

//   const handleSend = () => {
//     if (!message.trim() || disabled) return;
//     console.log("✉️ [AgentConsole] Sending message:", message);
//     onSendMessage(message);
//     setMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey && !disabled) {
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

//   const statusClass = isClosed
//     ? "closed"
//     : isPaused
//     ? "paused"
//     : consoleSocketStatus === "connected"
//     ? "online"
//     : "connecting";

//   const statusText = isClosed
//     ? "Closed"
//     : isPaused
//     ? "Paused"
//     : consoleSocketStatus === "connected"
//     ? "Online"
//     : "Connecting...";

//   const inputPlaceholder = isClosed
//     ? "Conversation is closed..."
//     : isPaused
//     ? "Chat is paused..."
//     : consoleSocketStatus !== "connected"
//     ? "Connecting..."
//     : "Type your message...";

//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span className={`status-badge ${statusClass}`}>
//               {statusText}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${
//               isPaused ? "unlock-btn" : "lock-btn"
//             }`}
//             onClick={() => {
//               console.log(
//                 "🔒 [AgentConsole] Toggle pause for chat:",
//                 chat.id,
//                 "paused?",
//                 isPaused
//               );
//               onTogglePause(chat.id);
//             }}
//             disabled={isClosed}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button
//             className="action-btn close-btn"
//             onClick={() => {
//               console.log(
//                 "🛑 [AgentConsole] Close conversation:",
//                 chat.conversation_id
//               );
//               onCloseChat(chat.conversation_id);
//             }}
//             disabled={isClosed}
//           >
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
//             const sender = (msg.sender || "").toLowerCase();
//             const fromAgent = sender === "agent";
//             const fromBot = sender === "bot" || sender === "ai";
//             const fromUser = !fromAgent && !fromBot;

//             let messageClass = "";
//             let bubbleClass = "";

//             if (fromAgent) {
//               messageClass = "agent";
//               bubbleClass = "agent-bubble";
//             } else if (fromBot) {
//               messageClass = "bot";
//               bubbleClass = "bot-bubble";
//             } else if (fromUser) {
//               messageClass = "user";
//               bubbleClass = "user-bubble";
//             }

//             return (
//               <div key={msg.id} className={`message ${messageClass}`}>
//                 <div className={`message-bubble ${bubbleClass}`}>
//                   {msg.text}
//                 </div>
//                 <div className="message-time">
//                   {msg.timestamp
//                     ? new Date(msg.timestamp).toLocaleTimeString()
//                     : ""}
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className={`message-input-container ${
//           disabled ? "disabled" : ""
//         }`}
//       >
//         <input
//           type="text"
//           placeholder={inputPlaceholder}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={disabled}
//         />
//         <button
//           onClick={handleSend}
//           className="send-btn"
//           disabled={disabled}
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
//         <div className="info-item">
//           <span>Chat ID:</span> {chat.id}
//         </div>
//         <div className="info-item">
//           <span>Conversation ID:</span> {chat.conversation_id}
//         </div>
//         <div className="info-item">
//           <span>Status:</span> {chat.status}
//         </div>
//         <div className="info-item">
//           <span>Channel:</span> {chat.channel}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [consoleSocketStatus, setConsoleSocketStatus] =
//     useState("disconnected");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [activeChat, setActiveChat] = useState(null);
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [closedChats, setClosedChats] = useState(new Set());
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
//   const [unreadCounts, setUnreadCounts] = useState({});

//   // latest active conversation id for unread logic
//   const activeConvIdRef = useRef(null);
//   useEffect(() => {
//     activeConvIdRef.current = activeChat?.conversation_id || null;
//   }, [activeChat]);

//   /* ===================================================
//      Fetch Agent Inbox (my_active)
//      =================================================== */
//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const token = localStorage.getItem("agent_token");
//         if (!token) {
//           console.warn(
//             "⚠️ [AgentConsole] No agent_token found in localStorage"
//           );
//           return;
//         }

//         console.log(
//           "📥 [AgentConsole] Fetching inbox conversations (my_active)..."
//         );
//         const res = await fetch(
//           "https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();

//         if (Array.isArray(data.conversations)) {
//           const formatted = data.conversations.map((c) => ({
//             id: String(c.id),
//             conversation_id: c.id,
//             channel: c.channel || "inbox",
//             status: c.status || "active",
//             created_at:
//               c.created_at || c.updated_at || new Date().toISOString(),
//           }));

//           setChats((prev) => {
//             const merged = new Map();
//             [...prev, ...formatted].forEach((c) => {
//               merged.set(c.id, c);
//             });
//             return Array.from(merged.values());
//           });
//         } else {
//           console.warn(
//             "⚠️ [AgentConsole] Inbox format unexpected:",
//             data
//           );
//         }
//       } catch (err) {
//         console.error("⚠️ [AgentConsole] Inbox fetch error:", err);
//       }
//     };

//     fetchInbox();
//   }, []);

//   /* ---------- Console WebSocket ---------- */
//   useEffect(() => {
//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("agent_id");
//     const token = localStorage.getItem("agent_token");

//     if (!tenantId || !agentId || !token) {
//       console.warn(
//         "❌ [AgentConsole] Missing tenant_id, agent_id or agent_token — please login again",
//         { tenantId, agentId, hasToken: !!token }
//       );
//       return;
//     }

//     const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
//       token
//     )}`;
//     console.log("🔌 [AgentConsole] Connecting Console WS:", wsUrl);

//     const ws = new WebSocket(wsUrl);

//     setConsoleSocket(ws);
//     setConsoleSocketStatus("connecting");

//     ws.onopen = () => {
//       console.log("✅ [AgentConsole] Connected to Agent Console WS");
//       setConsoleSocketStatus("connected");
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         if (data.type === "snapshot") {
//           const normalized = (data.conversations || []).map((c) => ({
//             id: c.id || c.chat_id || "unknown",
//             conversation_id: c.conversation_id || c.id,
//             channel: c.channel || "unknown",
//             status: c.status || "active",
//             created_at:
//               c.created_at ||
//               c.updated_at ||
//               new Date().toISOString(),
//           }));

//           setChats((prev) => {
//             const map = new Map();
//             [...prev, ...normalized].forEach((x) => map.set(x.id, x));
//             return Array.from(map.values());
//           });
//         } else if (data.type === "new_conversation") {
//           const conv = data.conversation;
//           const newConv = {
//             id: conv.id,
//             conversation_id: conv.conversation_id || conv.id,
//             channel: conv.channel || "unknown",
//             status: conv.status || "active",
//             created_at:
//               conv.created_at ||
//               conv.updated_at ||
//               new Date().toISOString(),
//           };

//           setChats((prev) => [newConv, ...prev]);
//         } else if (data.type === "message") {
//           handleMessage(data);
//         } else if (data.type === "conversation_closed") {
//           handleConversationClosed(data.conversation_id);
//         } else if (data.type === "pong" || data.type === "ping") {
//           // heartbeat message
//         } else {
//           console.log(
//             "ℹ️ [AgentConsole] Unhandled WS event type:",
//             data.type,
//             data
//           );
//         }
//       } catch (e) {
//         console.warn(
//           "⚠️ [AgentConsole] Failed to parse WS message:",
//           event.data,
//           e
//         );
//       }
//     };

//     ws.onclose = (evt) => {
//       console.log(
//         "⚠️ [AgentConsole] Console socket closed:",
//         evt.code,
//         evt.reason
//       );
//       setConsoleSocketStatus("disconnected");
//     };

//     ws.onerror = (err) =>
//       console.error("⚠️ [AgentConsole] Console socket error:", err);

//     const heartbeat = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//       }
//     }, 30000);

//     return () => {
//       clearInterval(heartbeat);
//       ws.close();
//     };
//   }, []);

//   /* ---------- Helpers ---------- */
//   const handleMessage = (data) => {
//     const convId = data.conversation_id || activeChat?.conversation_id;
//     if (!convId) {
//       console.warn(
//         "⚠️ [AgentConsole] handleMessage without convId:",
//         data
//       );
//       return;
//     }

//     const msgId =
//       data.id || data.message_id || data.msg_id || null;

//     const ts =
//       data.timestamp ||
//       data.created_at ||
//       data.sent_at ||
//       new Date().toISOString();

//     // Normalize sender field
//     const sender = (data.sender || data.role || "user").toLowerCase();

//     const text = (data.text || data.message || "").trim();
//     if (!text) {
//       console.log(
//         "⚠️ [AgentConsole] handleMessage blank text, skipping:",
//         data
//       );
//       return;
//     }

//     // Ensure conversation exists in chat list (auto create)
//     setChats((prev) => {
//       const already = prev.some(
//         (c) => String(c.conversation_id) === String(convId)
//       );
//       if (already) return prev;

//       const newConv = {
//         id: String(convId),
//         conversation_id: convId,
//         channel: data.channel || "unknown",
//         status: "active",
//         created_at: ts,
//       };

//       return [newConv, ...prev];
//     });

//     const newMsg = {
//       id: msgId || `msg_${ts}_${sender}_${text}`,
//       sender,
//       text,
//       timestamp: ts,
//     };

//     setMessages((prev) => {
//       const current = prev[convId] || [];

//       // Deduplicate by id
//       if (msgId && current.some((m) => m.id === msgId)) {
//         return prev;
//       }

//       // Deduplicate by composite key
//       const key = `${sender}|${text}|${ts}`;
//       if (
//         current.some(
//           (m) => `${m.sender}|${m.text}|${m.timestamp}` === key
//         )
//       ) {
//         return prev;
//       }

//       return {
//         ...prev,
//         [convId]: [...current, newMsg],
//       };
//     });

//     // Update unread count if not the currently open chat
//     setUnreadCounts((prev) => {
//       if (activeConvIdRef.current === convId) {
//         return { ...prev, [convId]: 0 };
//       }
//       const current = prev[convId] || 0;
//       return { ...prev, [convId]: current + 1 };
//     });
//   };

//   const handleConversationClosed = (conversationId) => {
//     setChats((prev) =>
//       prev.map((c) =>
//         c.conversation_id === conversationId
//           ? { ...c, status: "resolved" }
//           : c
//       )
//     );

//     setClosedChats((prev) => {
//       const s = new Set(prev);
//       s.add(conversationId);
//       return s;
//     });

//     setActiveChat((prev) =>
//       prev && prev.conversation_id === conversationId
//         ? { ...prev, status: "resolved" }
//         : prev
//     );
//   };

//   /* ---------- JOIN + load history ---------- */
//   const handleChatClick = async (chat) => {
//     console.log("👆 [AgentConsole] Chat clicked:", chat);
//     setActiveChat(chat);

//     // Clear unread for this conversation
//     setUnreadCounts((prev) => ({
//       ...prev,
//       [chat.conversation_id]: 0,
//     }));

//     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
//       consoleSocket.send(
//         JSON.stringify({
//           type: "join",
//           conversation_id: chat.conversation_id,
//         })
//       );
//     } else {
//       console.warn(
//         "⚠️ [AgentConsole] Cannot send join, consoleSocket not open",
//         consoleSocket?.readyState
//       );
//     }

//     try {
//       setIsLoadingMessages(true);
//       const token = localStorage.getItem("agent_token");
//       if (!token) {
//         console.warn(
//           "⚠️ [AgentConsole] No agent_token for history fetch"
//         );
//         return;
//       }

//       const res = await fetch(
//         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();

//       const seen = new Set();

//       const normalized = Array.isArray(data)
//         ? data
//             .map((m) => {
//               const id =
//                 m.id ||
//                 m.message_id ||
//                 m.msg_id ||
//                 `msg_${m.created_at || m.timestamp || m.text}`;

//               const sender = (m.sender || m.role || "user").toLowerCase();
//               const text = (m.text || m.message || m.reply || "").trim();
//               const ts =
//                 m.timestamp ||
//                 m.created_at ||
//                 m.sent_at ||
//                 new Date().toISOString();

//               if (!text) return null;

//               const key = `${id}|${sender}|${text}|${ts}`;
//               if (seen.has(key)) {
//                 return null;
//               }
//               seen.add(key);

//               return {
//                 id,
//                 sender,
//                 text,
//                 timestamp: ts,
//               };
//             })
//             .filter(Boolean)
//         : [];

//       setMessages((prev) => ({
//         ...prev,
//         [chat.conversation_id]: normalized,
//       }));

//       setUnreadCounts((prev) => ({
//         ...prev,
//         [chat.conversation_id]: 0,
//       }));
//     } catch (err) {
//       console.error(
//         "⚠️ [AgentConsole] Fetch messages error:",
//         err
//       );
//     } finally {
//       setIsLoadingMessages(false);
//     }
//   };

//   /* ---------- SEND ---------- */
//   const handleSendMessage = (text) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
//       console.warn(
//         "⚠️ [AgentConsole] Cannot send message, consoleSocket not open"
//       );
//       return;
//     }
//     if (!activeChat) {
//       console.warn(
//         "⚠️ [AgentConsole] No activeChat selected for send"
//       );
//       return;
//     }

//     const msg = { conversation_id: activeChat.conversation_id, text };
//     console.log("✉️ [AgentConsole] WS send agent message:", msg);
//     consoleSocket.send(JSON.stringify(msg));
//     // backend echo → handleMessage will add
//   };

//   /* ---------- CLOSE (WebSocket only) ---------- */
//   const handleCloseChat = (conversationId) => {
//     if (!conversationId) return;

//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
//       console.warn(
//         "⚠️ [AgentConsole] Console socket not open, cannot send close_conversation; closing locally",
//         consoleSocket?.readyState
//       );
//       handleConversationClosed(conversationId);
//       return;
//     }

//     consoleSocket.send(
//       JSON.stringify({
//         type: "close_conversation",
//         conversation_id: conversationId,
//       })
//     );

//     // Optimistic UI update
//     handleConversationClosed(conversationId);
//   };

//   const activeChatMessages = activeChat
//     ? messages[activeChat.conversation_id] || []
//     : [];

//   const isActiveChatClosed =
//     activeChat &&
//     (activeChat.status === "resolved" ||
//       closedChats.has(activeChat.conversation_id));

//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         pausedChats={pausedChats}
//         closedChats={closedChats}
//         handleChatClick={handleChatClick}
//         messages={messages}
//         unreadCounts={unreadCounts}
//       />
//       <ChatWindow
//         chat={activeChat}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={activeChat ? pausedChats.has(activeChat.id) : false}
//         isClosed={!!isActiveChatClosed}
//         onTogglePause={(id) =>
//           setPausedChats((prev) => {
//             const s = new Set(prev);
//             if (s.has(id)) s.delete(id);
//             else s.add(id);
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


// working code not live update 

// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/conversation.css";

// /* -------------------------- Chat List -------------------------- */
// const ChatList = ({
//   chats,
//   activeChat,
//   pausedChats,
//   closedChats,
//   handleChatClick,
//   messages,
//   unreadCounts,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // total unread across all conversations (for Inbox header)
//   const totalUnread = Object.values(unreadCounts || {}).reduce(
//     (sum, n) => sum + (n || 0),
//     0
//   );

//   // Get last activity timestamp for a chat (last message or created_at)
//   const getLastActivity = (chat) => {
//     const convMsgs = messages[chat.conversation_id] || [];
//     if (convMsgs.length > 0) {
//       const last = convMsgs[convMsgs.length - 1];
//       const ts =
//         last.timestamp || last.created_at || new Date().toISOString();
//       return new Date(ts).getTime();
//     }
//     if (chat.created_at) {
//       return new Date(chat.created_at).getTime();
//     }
//     return 0;
//   };

//   // Filter + sort like WhatsApp (latest activity on top)
//   const filteredChats = [...chats]
//     .filter((chat) =>
//       chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => getLastActivity(b) - getLastActivity(a));

//   return (
//     <div className="chat-list">
//       <div className="chat-list-header">
//         <h2>
//           Inbox
//           {totalUnread > 0 && (
//             <span className="inbox-unread-count"> ({totalUnread})</span>
//           )}
//         </h2>
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
//             const isClosed =
//               chat.status === "resolved" ||
//               closedChats.has(chat.conversation_id);

//             const convMsgs = messages[chat.conversation_id] || [];
//             const lastMsg = convMsgs[convMsgs.length - 1];
//             const lastText = lastMsg?.text || "";
//             const lastTime = lastMsg?.timestamp
//               ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "";

//             const unread = unreadCounts?.[chat.conversation_id] || 0;
//             const hasUnread = unread > 0;

//             return (
//               <div
//                 key={chat.id}
//                 className={`chat-item 
//                   ${isActive ? "active" : ""} 
//                   ${isPaused ? "paused" : ""} 
//                   ${isClosed ? "closed" : ""}`}
//                 onClick={() => handleChatClick(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span
//                       className={
//                         "chat-name" +
//                         (hasUnread ? " chat-name-unread" : "")
//                       }
//                     >
//                       {chat.id}
//                     </span>
//                     <span className="chat-time">
//                       {isClosed ? "Closed" : lastTime || chat.channel}
//                     </span>
//                   </div>
//                   {lastText && (
//                     <div
//                       className={
//                         "chat-preview" +
//                         (hasUnread ? " chat-preview-unread" : "")
//                       }
//                     >
//                       {lastText.length > 40
//                         ? lastText.slice(0, 40) + "…"
//                         : lastText}
//                     </div>
//                   )}
//                 </div>

//                 {hasUnread && (
//                   <div className="chat-unread-badge">
//                     {unread > 99 ? "99+" : unread}
//                   </div>
//                 )}
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
//   isClosed,
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

//   const disabled =
//     isPaused || isClosed || consoleSocketStatus !== "connected";

//   const handleSend = () => {
//     if (!message.trim() || disabled) return;
//     console.log("✉️ [AgentConsole] Sending message:", message);
//     onSendMessage(message);
//     setMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey && !disabled) {
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

//   const statusClass = isClosed
//     ? "closed"
//     : isPaused
//     ? "paused"
//     : consoleSocketStatus === "connected"
//     ? "online"
//     : "connecting";

//   const statusText = isClosed
//     ? "Closed"
//     : isPaused
//     ? "Paused"
//     : consoleSocketStatus === "connected"
//     ? "Online"
//     : "Connecting...";

//   const inputPlaceholder = isClosed
//     ? "Conversation is closed..."
//     : isPaused
//     ? "Chat is paused..."
//     : consoleSocketStatus !== "connected"
//     ? "Connecting..."
//     : "Type your message...";

//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span className={`status-badge ${statusClass}`}>
//               {statusText}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${
//               isPaused ? "unlock-btn" : "lock-btn"
//             }`}
//             onClick={() => {
//               console.log(
//                 "🔒 [AgentConsole] Toggle pause for chat:",
//                 chat.id,
//                 "paused?",
//                 isPaused
//               );
//               onTogglePause(chat.id);
//             }}
//             disabled={isClosed}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button
//             className="action-btn close-btn"
//             onClick={() => {
//               console.log(
//                 "🛑 [AgentConsole] Close conversation:",
//                 chat.conversation_id
//               );
//               onCloseChat(chat.conversation_id);
//             }}
//             disabled={isClosed}
//           >
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
//             const sender = (msg.sender || "").toLowerCase();
//             const fromAgent = sender === "agent";
//             const fromBot = sender === "bot" || sender === "ai";
//             const fromUser = !fromAgent && !fromBot;

//             let messageClass = "";
//             let bubbleClass = "";

//             if (fromAgent) {
//               messageClass = "agent";
//               bubbleClass = "agent-bubble";
//             } else if (fromBot) {
//               messageClass = "bot";
//               bubbleClass = "bot-bubble";
//             } else if (fromUser) {
//               messageClass = "user";
//               bubbleClass = "user-bubble";
//             }

//             return (
//               <div key={msg.id} className={`message ${messageClass}`}>
//                 <div className={`message-bubble ${bubbleClass}`}>
//                   {msg.text}
//                 </div>
//                 <div className="message-time">
//                   {msg.timestamp
//                     ? new Date(msg.timestamp).toLocaleTimeString()
//                     : ""}
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className={`message-input-container ${
//           disabled ? "disabled" : ""
//         }`}
//       >
//         <input
//           type="text"
//           placeholder={inputPlaceholder}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={disabled}
//         />
//         <button
//           onClick={handleSend}
//           className="send-btn"
//           disabled={disabled}
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
//         <div className="info-item">
//           <span>Chat ID:</span> {chat.id}
//         </div>
//         <div className="info-item">
//           <span>Conversation ID:</span> {chat.conversation_id}
//         </div>
//         <div className="info-item">
//           <span>Status:</span> {chat.status}
//         </div>
//         <div className="info-item">
//           <span>Channel:</span> {chat.channel}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* -------------------------- Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [consoleSocketStatus, setConsoleSocketStatus] =
//     useState("disconnected");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [activeChat, setActiveChat] = useState(null);
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [closedChats, setClosedChats] = useState(new Set());
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
//   const [unreadCounts, setUnreadCounts] = useState({});

//   // latest active conversation id for unread logic
//   const activeConvIdRef = useRef(null);
//   useEffect(() => {
//     activeConvIdRef.current = activeChat?.conversation_id || null;
//   }, [activeChat]);

//   /* ===================================================
//      Fetch Agent Inbox (my_active)
//      =================================================== */
//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const token = localStorage.getItem("agent_token");
//         if (!token) {
//           console.warn(
//             "⚠️ [AgentConsole] No agent_token found in localStorage"
//           );
//           return;
//         }

//         console.log(
//           "📥 [AgentConsole] Fetching inbox conversations (my_active)..."
//         );
//         const res = await fetch(
//           "https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();

//         if (Array.isArray(data.conversations)) {
//           const formatted = data.conversations.map((c) => ({
//             id: String(c.id),
//             conversation_id: c.id,
//             channel: c.channel || "inbox",
//             status: c.status || "active",
//             created_at:
//               c.created_at || c.updated_at || new Date().toISOString(),
//           }));

//           setChats((prev) => {
//             const merged = new Map();
//             [...prev, ...formatted].forEach((c) => {
//               merged.set(c.id, c);
//             });
//             return Array.from(merged.values());
//           });
//         } else {
//           console.warn(
//             "⚠️ [AgentConsole] Inbox format unexpected:",
//             data
//           );
//         }
//       } catch (err) {
//         console.error("⚠️ [AgentConsole] Inbox fetch error:", err);
//       }
//     };

//     fetchInbox();
//   }, []);

//   /* ---------- Console WebSocket ---------- */
//   useEffect(() => {
//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("agent_id");
//     const token = localStorage.getItem("agent_token");

//     if (!tenantId || !agentId || !token) {
//       console.warn(
//         "❌ [AgentConsole] Missing tenant_id, agent_id or agent_token — please login again",
//         { tenantId, agentId, hasToken: !!token }
//       );
//       return;
//     }

//     const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
//       token
//     )}`;
//     console.log("🔌 [AgentConsole] Connecting Console WS:", wsUrl);

//     const ws = new WebSocket(wsUrl);

//     setConsoleSocket(ws);
//     setConsoleSocketStatus("connecting");

//     ws.onopen = () => {
//       console.log("✅ [AgentConsole] Connected to Agent Console WS");
//       setConsoleSocketStatus("connected");
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         if (data.type === "snapshot") {
//           const normalized = (data.conversations || []).map((c) => ({
//             id: c.id || c.chat_id || "unknown",
//             conversation_id: c.conversation_id || c.id,
//             channel: c.channel || "unknown",
//             status: c.status || "active",
//             created_at:
//               c.created_at ||
//               c.updated_at ||
//               new Date().toISOString(),
//           }));

//           setChats((prev) => {
//             const map = new Map();
//             [...prev, ...normalized].forEach((x) => map.set(x.id, x));
//             return Array.from(map.values());
//           });
//         } else if (data.type === "new_conversation") {
//           const conv = data.conversation;
//           const newConv = {
//             id: conv.id,
//             conversation_id: conv.conversation_id || conv.id,
//             channel: conv.channel || "unknown",
//             status: conv.status || "active",
//             created_at:
//               conv.created_at ||
//               conv.updated_at ||
//               new Date().toISOString(),
//           };

//           setChats((prev) => [newConv, ...prev]);
//         } else if (data.type === "message") {
//           handleMessage(data);
//         } else if (data.type === "conversation_closed") {
//           handleConversationClosed(data.conversation_id);
//         } else if (data.type === "pong" || data.type === "ping") {
//           // heartbeat message
//         } else {
//           console.log(
//             "ℹ️ [AgentConsole] Unhandled WS event type:",
//             data.type,
//             data
//           );
//         }
//       } catch (e) {
//         console.warn(
//           "⚠️ [AgentConsole] Failed to parse WS message:",
//           event.data,
//           e
//         );
//       }
//     };

//     ws.onclose = (evt) => {
//       console.log(
//         "⚠️ [AgentConsole] Console socket closed:",
//         evt.code,
//         evt.reason
//       );
//       setConsoleSocketStatus("disconnected");
//     };

//     ws.onerror = (err) =>
//       console.error("⚠️ [AgentConsole] Console socket error:", err);

//     const heartbeat = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//       }
//     }, 30000);

//     return () => {
//       clearInterval(heartbeat);
//       ws.close();
//     };
//   }, []);

//   /* ---------- Helpers ---------- */
//   const handleMessage = (data) => {
//     // ✅ Only process messages that belong to a specific conversation
//     if (!data.conversation_id) {
//       console.warn(
//         "⚠️ [AgentConsole] Ignoring WS message without conversation_id:",
//         data
//       );
//       return;
//     }

//     const convId = data.conversation_id;

//     const msgId =
//       data.id || data.message_id || data.msg_id || null;

//     const ts =
//       data.timestamp ||
//       data.created_at ||
//       data.sent_at ||
//       new Date().toISOString();

//     // Normalize sender field
//     const sender = (data.sender || data.role || "user").toLowerCase();

//     const text = (data.text || data.message || "").trim();
//     if (!text) {
//       console.log(
//         "⚠️ [AgentConsole] handleMessage blank text, skipping:",
//         data
//       );
//       return;
//     }

//     // Ensure conversation exists in chat list (auto create)
//     setChats((prev) => {
//       const already = prev.some(
//         (c) => String(c.conversation_id) === String(convId)
//       );
//       if (already) return prev;

//       const newConv = {
//         id: String(convId),
//         conversation_id: convId,
//         channel: data.channel || "unknown",
//         status: "active",
//         created_at: ts,
//       };

//       return [newConv, ...prev];
//     });

//     const newMsg = {
//       id: msgId || `msg_${ts}_${sender}_${text}`,
//       sender,
//       text,
//       timestamp: ts,
//     };

//     setMessages((prev) => {
//       const current = prev[convId] || [];

//       // Deduplicate by id
//       if (msgId && current.some((m) => m.id === msgId)) {
//         return prev;
//       }

//       // Deduplicate by composite key
//       const key = `${sender}|${text}|${ts}`;
//       if (
//         current.some(
//           (m) => `${m.sender}|${m.text}|${m.timestamp}` === key
//         )
//       ) {
//         return prev;
//       }

//       return {
//         ...prev,
//         [convId]: [...current, newMsg],
//       };
//     });

//     // Update unread count if not the currently open chat
//     setUnreadCounts((prev) => {
//       if (activeConvIdRef.current === convId) {
//         return { ...prev, [convId]: 0 };
//       }
//       const current = prev[convId] || 0;
//       return { ...prev, [convId]: current + 1 };
//     });
//   };

//   const handleConversationClosed = (conversationId) => {
//     setChats((prev) =>
//       prev.map((c) =>
//         c.conversation_id === conversationId
//           ? { ...c, status: "resolved" }
//           : c
//       )
//     );

//     setClosedChats((prev) => {
//       const s = new Set(prev);
//       s.add(conversationId);
//       return s;
//     });

//     setActiveChat((prev) =>
//       prev && prev.conversation_id === conversationId
//         ? { ...prev, status: "resolved" }
//         : prev
//     );
//   };

//   /* ---------- JOIN + load history ---------- */
//   const handleChatClick = async (chat) => {
//     console.log("👆 [AgentConsole] Chat clicked:", chat);
//     setActiveChat(chat);

//     // Clear unread for this conversation
//     setUnreadCounts((prev) => ({
//       ...prev,
//       [chat.conversation_id]: 0,
//     }));

//     if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
//       consoleSocket.send(
//         JSON.stringify({
//           type: "join",
//           conversation_id: chat.conversation_id,
//         })
//       );
//     } else {
//       console.warn(
//         "⚠️ [AgentConsole] Cannot send join, consoleSocket not open",
//         consoleSocket?.readyState
//       );
//     }

//     try {
//       setIsLoadingMessages(true);
//       const token = localStorage.getItem("agent_token");
//       if (!token) {
//         console.warn(
//           "⚠️ [AgentConsole] No agent_token for history fetch"
//         );
//         return;
//       }

//       const res = await fetch(
//         `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();

//       const seen = new Set();

//       const normalized = Array.isArray(data)
//         ? data
//             .map((m) => {
//               const id =
//                 m.id ||
//                 m.message_id ||
//                 m.msg_id ||
//                 `msg_${m.created_at || m.timestamp || m.text}`;

//               const sender = (m.sender || m.role || "user").toLowerCase();
//               const text = (m.text || m.message || m.reply || "").trim();
//               const ts =
//                 m.timestamp ||
//                 m.created_at ||
//                 m.sent_at ||
//                 new Date().toISOString();

//               if (!text) return null;

//               const key = `${id}|${sender}|${text}|${ts}`;
//               if (seen.has(key)) {
//                 return null;
//               }
//               seen.add(key);

//               return {
//                 id,
//                 sender,
//                 text,
//                 timestamp: ts,
//               };
//             })
//             .filter(Boolean)
//         : [];

//       setMessages((prev) => ({
//         ...prev,
//         [chat.conversation_id]: normalized,
//       }));

//       setUnreadCounts((prev) => ({
//         ...prev,
//         [chat.conversation_id]: 0,
//       }));
//     } catch (err) {
//       console.error(
//         "⚠️ [AgentConsole] Fetch messages error:",
//         err
//       );
//     } finally {
//       setIsLoadingMessages(false);
//     }
//   };

//   /* ---------- SEND ---------- */
//   const handleSendMessage = (text) => {
//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
//       console.warn(
//         "⚠️ [AgentConsole] Cannot send message, consoleSocket not open"
//       );
//       return;
//     }
//     if (!activeChat) {
//       console.warn(
//         "⚠️ [AgentConsole] No activeChat selected for send"
//       );
//       return;
//     }

//     const msg = { conversation_id: activeChat.conversation_id, text };
//     console.log("✉️ [AgentConsole] WS send agent message:", msg);
//     consoleSocket.send(JSON.stringify(msg));
//     // backend echo → handleMessage will add
//   };

//   /* ---------- CLOSE (WebSocket only) ---------- */
//   const handleCloseChat = (conversationId) => {
//     if (!conversationId) return;

//     if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
//       console.warn(
//         "⚠️ [AgentConsole] Console socket not open, cannot send close_conversation; closing locally",
//         consoleSocket?.readyState
//       );
//       handleConversationClosed(conversationId);
//       return;
//     }

//     consoleSocket.send(
//       JSON.stringify({
//         type: "close_conversation",
//         conversation_id: conversationId,
//       })
//     );

//     // Optimistic UI update
//     handleConversationClosed(conversationId);
//   };

//   const activeChatMessages = activeChat
//     ? messages[activeChat.conversation_id] || []
//     : [];

//   const isActiveChatClosed =
//     activeChat &&
//     (activeChat.status === "resolved" ||
//       closedChats.has(activeChat.conversation_id));

//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         pausedChats={pausedChats}
//         closedChats={closedChats}
//         handleChatClick={handleChatClick}
//         messages={messages}
//         unreadCounts={unreadCounts}
//       />
//       <ChatWindow
//         chat={activeChat}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={activeChat ? pausedChats.has(activeChat.id) : false}
//         isClosed={!!isActiveChatClosed}
//         onTogglePause={(id) =>
//           setPausedChats((prev) => {
//             const s = new Set(prev);
//             if (s.has(id)) s.delete(id);
//             else s.add(id);
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






// live update also 
import React, { useState, useEffect, useRef } from "react";
import "../../styles/conversation.css";

/* -------------------------- Chat List -------------------------- */
const ChatList = ({
  chats,
  activeChat,
  pausedChats,
  closedChats,
  handleChatClick,
  messages,
  unreadCounts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // total unread across all conversations (for Inbox header)
  const totalUnread = Object.values(unreadCounts || {}).reduce(
    (sum, n) => sum + (n || 0),
    0
  );

  // Get last activity timestamp for a chat (last message or created_at)
  const getLastActivity = (chat) => {
    const convMsgs = messages[chat.conversation_id] || [];
    if (convMsgs.length > 0) {
      const last = convMsgs[convMsgs.length - 1];
      const ts =
        last.timestamp || last.created_at || new Date().toISOString();
      return new Date(ts).getTime();
    }
    if (chat.created_at) {
      return new Date(chat.created_at).getTime();
    }
    return 0;
  };

  // Filter + sort like WhatsApp (latest activity on top)
  const filteredChats = [...chats]
    .filter((chat) =>
      chat.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => getLastActivity(b) - getLastActivity(a));

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>
          Inbox
          {totalUnread > 0 && (
            <span className="inbox-unread-count"> ({totalUnread})</span>
          )}
        </h2>
        <input
          type="text"
          placeholder="Search by chat ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="chats-section">
        <h3 className="section-title">CHATS ({filteredChats.length})</h3>
        {filteredChats.length === 0 ? (
          <div className="empty-state">No conversations yet</div>
        ) : (
          filteredChats.map((chat) => {
            const isPaused = pausedChats.has(chat.id);
            const isActive = activeChat?.id === chat.id;
            const isClosed =
              chat.status === "resolved" ||
              closedChats.has(chat.conversation_id);

            const convMsgs = messages[chat.conversation_id] || [];
            const lastMsg = convMsgs[convMsgs.length - 1];
            const lastText = lastMsg?.text || "";
            const lastTime = lastMsg?.timestamp
              ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            const unread = unreadCounts?.[chat.conversation_id] || 0;
            const hasUnread = unread > 0;

            return (
              <div
                key={chat.id}
                className={`chat-item 
                  ${isActive ? "active" : ""} 
                  ${isPaused ? "paused" : ""} 
                  ${isClosed ? "closed" : ""}`}
                onClick={() => handleChatClick(chat)}
              >
                <div className="chat-info">
                  <div className="chat-header-row">
                    <span
                      className={
                        "chat-name" +
                        (hasUnread ? " chat-name-unread" : "")
                      }
                    >
                      {chat.id}
                    </span>
                    <span className="chat-time">
                      {isClosed ? "Closed" : lastTime || chat.channel}
                    </span>
                  </div>
                  {lastText && (
                    <div
                      className={
                        "chat-preview" +
                        (hasUnread ? " chat-preview-unread" : "")
                      }
                    >
                      {lastText.length > 40
                        ? lastText.slice(0, 40) + "…"
                        : lastText}
                    </div>
                  )}
                </div>

                {hasUnread && (
                  <div className="chat-unread-badge">
                    {unread > 99 ? "99+" : unread}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/* -------------------------- Chat Window -------------------------- */
const ChatWindow = ({
  chat,
  isTyping,
  onCloseChat,
  isPaused,
  isClosed,
  onTogglePause,
  messages,
  onSendMessage,
  isLoadingMessages,
  consoleSocketStatus,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const disabled =
    isPaused || isClosed || consoleSocketStatus !== "connected";

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    console.log("✉️ [AgentConsole] Sending message:", message);
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chat)
    return (
      <div className="chat-window empty">
        <p>Select a chat to start messaging</p>
      </div>
    );

  const statusClass = isClosed
    ? "closed"
    : isPaused
    ? "paused"
    : consoleSocketStatus === "connected"
    ? "online"
    : "connecting";

  const statusText = isClosed
    ? "Closed"
    : isPaused
    ? "Paused"
    : consoleSocketStatus === "connected"
    ? "Online"
    : "Connecting...";

  const inputPlaceholder = isClosed
    ? "Conversation is closed..."
    : isPaused
    ? "Chat is paused..."
    : consoleSocketStatus !== "connected"
    ? "Connecting..."
    : "Type your message...";

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-user-info">
          <div>
            <h3>{chat.id}</h3>
            <span className={`status-badge ${statusClass}`}>
              {statusText}
            </span>
          </div>
        </div>
        <div className="chat-actions">
          <button
            className={`action-btn icon-btn ${
              isPaused ? "unlock-btn" : "lock-btn"
            }`}
            onClick={() => {
              console.log(
                "🔒 [AgentConsole] Toggle pause for chat:",
                chat.id,
                "paused?",
                isPaused
              );
              onTogglePause(chat.id);
            }}
            disabled={isClosed}
          >
            {isPaused ? "🔓" : "🔒"}
          </button>
          <button
            className="action-btn close-btn"
            onClick={() => {
              console.log(
                "🛑 [AgentConsole] Close conversation:",
                chat.conversation_id
              );
              onCloseChat(chat.conversation_id);
            }}
            disabled={isClosed}
          >
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
          messages.map((msg) => {
            const sender = (msg.sender || "").toLowerCase();
            const fromAgent = sender === "agent";
            const fromBot = sender === "bot" || sender === "ai";
            const fromUser = !fromAgent && !fromBot;

            let messageClass = "";
            let bubbleClass = "";

            if (fromAgent) {
              messageClass = "agent";
              bubbleClass = "agent-bubble";
            } else if (fromBot) {
              messageClass = "bot";
              bubbleClass = "bot-bubble";
            } else if (fromUser) {
              messageClass = "user";
              bubbleClass = "user-bubble";
            }

            return (
              <div key={msg.id} className={`message ${messageClass}`}>
                <div className={`message-bubble ${bubbleClass}`}>
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString()
                    : ""}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={`message-input-container ${
          disabled ? "disabled" : ""
        }`}
      >
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="message-input"
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          className="send-btn"
          disabled={disabled}
        >
          Send
        </button>
      </div>
    </div>
  );
};

/* -------------------------- Customer Info -------------------------- */
const CustomerInfo = ({ chat }) => {
  if (!chat) return null;
  return (
    <div className="customer-info">
      <h2>Chat Details</h2>
      <div className="info-section">
        <div className="info-item">
          <span>Chat ID:</span> {chat.id}
        </div>
        <div className="info-item">
          <span>Conversation ID:</span> {chat.conversation_id}
        </div>
        <div className="info-item">
          <span>Status:</span> {chat.status}
        </div>
        <div className="info-item">
          <span>Channel:</span> {chat.channel}
        </div>
      </div>
    </div>
  );
};

/* -------------------------- Agent Console -------------------------- */
const AgentConsole = () => {
  const [consoleSocket, setConsoleSocket] = useState(null);
  const [consoleSocketStatus, setConsoleSocketStatus] =
    useState("disconnected");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [pausedChats, setPausedChats] = useState(new Set());
  const [closedChats, setClosedChats] = useState(new Set());
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});

  // latest active conversation id for unread logic
  const activeConvIdRef = useRef(null);
  useEffect(() => {
    activeConvIdRef.current = activeChat?.conversation_id || null;
  }, [activeChat]);

  /* ===================================================
     Fetch Agent Inbox (my_active)
     =================================================== */
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const token = localStorage.getItem("agent_token");
        if (!token) {
          console.warn(
            "⚠️ [AgentConsole] No agent_token found in localStorage"
          );
          return;
        }

        console.log(
          "📥 [AgentConsole] Fetching inbox conversations (my_active)..."
        );
        const res = await fetch(
          "https://api.texef.com/api/agents/conversations/inbox?type=my_active&period=all&limit=200",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (Array.isArray(data.conversations)) {
          const formatted = data.conversations.map((c) => ({
            id: String(c.id),
            conversation_id: c.id,
            channel: c.channel || "inbox",
            status: c.status || "active",
            created_at:
              c.created_at || c.updated_at || new Date().toISOString(),
          }));

          setChats((prev) => {
            const merged = new Map();
            [...prev, ...formatted].forEach((c) => {
              merged.set(c.id, c);
            });
            return Array.from(merged.values());
          });
        } else {
          console.warn(
            "⚠️ [AgentConsole] Inbox format unexpected:",
            data
          );
        }
      } catch (err) {
        console.error("⚠️ [AgentConsole] Inbox fetch error:", err);
      }
    };

    fetchInbox();
  }, []);

 useEffect(() => {
  let timeout;

  // 30 second loop (more reliable than setInterval)
  const refreshLoop = () => {
    timeout = setTimeout(() => {
      console.log("Auto refresh inbox");
      fetchInbox();
      refreshLoop();
    }, 30000);
  };

  refreshLoop();

  // Tab focus refresh
  const handleVisibility = () => {
    if (!document.hidden) {
      console.log("Tab active refresh");
      fetchInbox();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    clearTimeout(timeout);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, []);


  /* ---------- Console WebSocket ---------- */
  useEffect(() => {
    const tenantId = localStorage.getItem("tenant_id");
    const agentId = localStorage.getItem("agent_id");
    const token = localStorage.getItem("agent_token");

    if (!tenantId || !agentId || !token) {
      console.warn(
        "❌ [AgentConsole] Missing tenant_id, agent_id or agent_token — please login again",
        { tenantId, agentId, hasToken: !!token }
      );
      return;
    }

    const wsUrl = `wss://api.texef.com/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
      token
    )}`;
    console.log("🔌 [AgentConsole] Connecting Console WS:", wsUrl);

    const ws = new WebSocket(wsUrl);

    setConsoleSocket(ws);
    setConsoleSocketStatus("connecting");

    ws.onopen = () => {
      console.log("✅ [AgentConsole] Connected to Agent Console WS");
      setConsoleSocketStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "snapshot") {
          const normalized = (data.conversations || []).map((c) => ({
            id: c.id || c.chat_id || "unknown",
            conversation_id: c.conversation_id || c.id,
            channel: c.channel || "unknown",
            status: c.status || "active",
            created_at:
              c.created_at ||
              c.updated_at ||
              new Date().toISOString(),
          }));

          setChats((prev) => {
            const map = new Map();
            [...prev, ...normalized].forEach((x) => map.set(x.id, x));
            return Array.from(map.values());
          });
        } else if (data.type === "new_conversation") {
          const conv = data.conversation;
          const newConv = {
            id: conv.id,
            conversation_id: conv.conversation_id || conv.id,
            channel: conv.channel || "unknown",
            status: conv.status || "active",
            created_at:
              conv.created_at ||
              conv.updated_at ||
              new Date().toISOString(),
          };

          setChats((prev) => [newConv, ...prev]);
        } else if (data.type === "message") {
          handleMessage(data);
        } else if (data.type === "conversation_closed") {
          handleConversationClosed(data.conversation_id);
        } else if (data.type === "pong" || data.type === "ping") {
          // heartbeat message
        } else {
          console.log(
            "ℹ️ [AgentConsole] Unhandled WS event type:",
            data.type,
            data
          );
        }
      } catch (e) {
        console.warn(
          "⚠️ [AgentConsole] Failed to parse WS message:",
          event.data,
          e
        );
      }
    };

    ws.onclose = (evt) => {
      console.log(
        "⚠️ [AgentConsole] Console socket closed:",
        evt.code,
        evt.reason
      );
      setConsoleSocketStatus("disconnected");
    };

    ws.onerror = (err) =>
      console.error("⚠️ [AgentConsole] Console socket error:", err);

    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      ws.close();
    };
  }, []);

  /* ---------- Helpers ---------- */
  const handleMessage = (data) => {
    // ✅ Only process messages that belong to a specific conversation
    if (!data.conversation_id) {
      console.warn(
        "⚠️ [AgentConsole] Ignoring WS message without conversation_id:",
        data
      );
      return;
    }

    const convId = data.conversation_id;

    const msgId =
      data.id || data.message_id || data.msg_id || null;

    const ts =
      data.timestamp ||
      data.created_at ||
      data.sent_at ||
      new Date().toISOString();

    // Normalize sender field
    const sender = (data.sender || data.role || "user").toLowerCase();

    const text = (data.text || data.message || "").trim();
    if (!text) {
      console.log(
        "⚠️ [AgentConsole] handleMessage blank text, skipping:",
        data
      );
      return;
    }

    // Ensure conversation exists in chat list (auto create)
    setChats((prev) => {
      const already = prev.some(
        (c) => String(c.conversation_id) === String(convId)
      );
      if (already) return prev;

      const newConv = {
        id: String(convId),
        conversation_id: convId,
        channel: data.channel || "unknown",
        status: "active",
        created_at: ts,
      };

      return [newConv, ...prev];
    });

    const newMsg = {
      id: msgId || `msg_${ts}_${sender}_${text}`,
      sender,
      text,
      timestamp: ts,
    };

    setMessages((prev) => {
      const current = prev[convId] || [];

      // Deduplicate by id
      if (msgId && current.some((m) => m.id === msgId)) {
        return prev;
      }

      // Deduplicate by composite key
      const key = `${sender}|${text}|${ts}`;
      if (
        current.some(
          (m) => `${m.sender}|${m.text}|${m.timestamp}` === key
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        [convId]: [...current, newMsg],
      };
    });

    // Update unread count if not the currently open chat
    setUnreadCounts((prev) => {
      if (activeConvIdRef.current === convId) {
        return { ...prev, [convId]: 0 };
      }
      const current = prev[convId] || 0;
      return { ...prev, [convId]: current + 1 };
    });
  };

  const handleConversationClosed = (conversationId) => {
    setChats((prev) =>
      prev.map((c) =>
        c.conversation_id === conversationId
          ? { ...c, status: "resolved" }
          : c
      )
    );

    setClosedChats((prev) => {
      const s = new Set(prev);
      s.add(conversationId);
      return s;
    });

    setActiveChat((prev) =>
      prev && prev.conversation_id === conversationId
        ? { ...prev, status: "resolved" }
        : prev
    );
  };

  /* ---------- JOIN + load history ---------- */
  const handleChatClick = async (chat) => {
    console.log("👆 [AgentConsole] Chat clicked:", chat);
    setActiveChat(chat);

    // Clear unread for this conversation
    setUnreadCounts((prev) => ({
      ...prev,
      [chat.conversation_id]: 0,
    }));

    if (consoleSocket && consoleSocket.readyState === WebSocket.OPEN) {
      consoleSocket.send(
        JSON.stringify({
          type: "join",
          conversation_id: chat.conversation_id,
        })
      );
    } else {
      console.warn(
        "⚠️ [AgentConsole] Cannot send join, consoleSocket not open",
        consoleSocket?.readyState
      );
    }

    try {
      setIsLoadingMessages(true);
      const token = localStorage.getItem("agent_token");
      if (!token) {
        console.warn(
          "⚠️ [AgentConsole] No agent_token for history fetch"
        );
        return;
      }

      const res = await fetch(
        `https://api.texef.com/api/messages?conversation_id=${chat.conversation_id}&limit=100`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      const seen = new Set();

      const normalized = Array.isArray(data)
        ? data
            .map((m) => {
              const id =
                m.id ||
                m.message_id ||
                m.msg_id ||
                `msg_${m.created_at || m.timestamp || m.text}`;

              const sender = (m.sender || m.role || "user").toLowerCase();
              const text = (m.text || m.message || m.reply || "").trim();
              const ts =
                m.timestamp ||
                m.created_at ||
                m.sent_at ||
                new Date().toISOString();

              if (!text) return null;

              const key = `${id}|${sender}|${text}|${ts}`;
              if (seen.has(key)) {
                return null;
              }
              seen.add(key);

              return {
                id,
                sender,
                text,
                timestamp: ts,
              };
            })
            .filter(Boolean)
        : [];

      setMessages((prev) => ({
        ...prev,
        [chat.conversation_id]: normalized,
      }));

      setUnreadCounts((prev) => ({
        ...prev,
        [chat.conversation_id]: 0,
      }));
    } catch (err) {
      console.error(
        "⚠️ [AgentConsole] Fetch messages error:",
        err
      );
    } finally {
      setIsLoadingMessages(false);
    }
  };

  /* ---------- SEND (optimistic) ---------- */
  const handleSendMessage = (text) => {
    if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
      console.warn(
        "⚠️ [AgentConsole] Cannot send message, consoleSocket not open"
      );
      return;
    }
    if (!activeChat) {
      console.warn(
        "⚠️ [AgentConsole] No activeChat selected for send"
      );
      return;
    }

    const convId = activeChat.conversation_id;
    const ts = new Date().toISOString();

    // 1) Optimistic local message so agent sees it immediately
    const localMsg = {
      id: `local_${ts}`,
      sender: "agent",
      text,
      timestamp: ts,
    };

    setMessages((prev) => {
      const current = prev[convId] || [];
      return {
        ...prev,
        [convId]: [...current, localMsg],
      };
    });

    // Unread count need not change for agent's own send
    setUnreadCounts((prev) => ({
      ...prev,
      [convId]: prev[convId] || 0,
    }));

    // 2) Send to backend via WS → widget + other consoles will get echo
    const msg = { conversation_id: convId, text };
    console.log("✉️ [AgentConsole] WS send agent message:", msg);
    consoleSocket.send(JSON.stringify(msg));
    // backend echo → handleMessage will add real message; dedupe avoids duplicates
  };

  /* ---------- CLOSE (WebSocket only) ---------- */
  const handleCloseChat = (conversationId) => {
    if (!conversationId) return;

    if (!consoleSocket || consoleSocket.readyState !== WebSocket.OPEN) {
      console.warn(
        "⚠️ [AgentConsole] Console socket not open, cannot send close_conversation; closing locally",
        consoleSocket?.readyState
      );
      handleConversationClosed(conversationId);
      return;
    }

    consoleSocket.send(
      JSON.stringify({
        type: "close_conversation",
        conversation_id: conversationId,
      })
    );

    // Optimistic UI update
    handleConversationClosed(conversationId);
  };

  const activeChatMessages = activeChat
    ? messages[activeChat.conversation_id] || []
    : [];

  const isActiveChatClosed =
    activeChat &&
    (activeChat.status === "resolved" ||
      closedChats.has(activeChat.conversation_id));

  return (
    <div className="app">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        pausedChats={pausedChats}
        closedChats={closedChats}
        handleChatClick={handleChatClick}
        messages={messages}
        unreadCounts={unreadCounts}
      />
      <ChatWindow
        chat={activeChat}
        isTyping={false}
        onCloseChat={handleCloseChat}
        isPaused={activeChat ? pausedChats.has(activeChat.id) : false}
        isClosed={!!isActiveChatClosed}
        onTogglePause={(id) =>
          setPausedChats((prev) => {
            const s = new Set(prev);
            if (s.has(id)) s.delete(id);
            else s.add(id);
            return s;
          })
        }
        messages={activeChatMessages}
        onSendMessage={handleSendMessage}
        isLoadingMessages={isLoadingMessages}
        consoleSocketStatus={consoleSocketStatus}
      />
      <CustomerInfo chat={activeChat} />
    </div>
  );
};

export default AgentConsole;
