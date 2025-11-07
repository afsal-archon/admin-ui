// import React, { useState } from "react";
// import { FaUserPlus, FaSignOutAlt, FaCheck, FaExchangeAlt, FaTags } from "react-icons/fa";
// import "../../styles/conversation.css";


// export default function ConversationActions({ conversationId, token }) {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const BASE_URL = "http://localhost:8000/api/agent/conversations";

//   const handleAction = async (action, body = null) => {
//     setLoading(true);
//     setMessage("");

//     let method = "POST";
//     let endpoint = `${BASE_URL}/${conversationId}/${action}`;
//     if (action === "tags") method = "PUT";

//     try {
//       const res = await fetch(endpoint, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: body ? JSON.stringify(body) : null,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(`✅ ${data.message || "Action successful"}`);
//       } else {
//         setMessage(`❌ ${data.detail || "Failed to perform action"}`);
//       }
//     } catch (err) {
//       setMessage("⚠️ Network error — please check your backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="conversation-actions">
//       <h3>Conversation Actions</h3>

//       <div className="action-buttons">
//         <button onClick={() => handleAction("join")} disabled={loading}>
//           <FaUserPlus /> Join
//         </button>

//         <button onClick={() => handleAction("leave")} disabled={loading}>
//           <FaSignOutAlt /> Leave
//         </button>

//         <button
//           onClick={() =>
//             handleAction("close", {
//               resolution: "issue_resolved",
//               notes: "Customer was satisfied with the solution",
//               satisfaction_rating: 5,
//             })
//           }
//           disabled={loading}
//         >
//           <FaCheck /> Close
//         </button>

//         <button
//           onClick={() =>
//             handleAction("transfer", {
//               target_agent_id: "agent_jane_doe",
//               reason: "Technical expertise required",
//             })
//           }
//           disabled={loading}
//         >
//           <FaExchangeAlt /> Transfer
//         </button>

//         <button
//           onClick={() =>
//             handleAction("tags", {
//               tags: ["urgent", "refund"],
//               priority: "high",
//             })
//           }
//           disabled={loading}
//         >
//           <FaTags /> Update Tags
//         </button>
//       </div>

//       {message && <p className="action-message">{message}</p>}
//     </div>
//   );
// }



//
//
//
//
// import React, { useState, useEffect, useRef } from "react";
// import "./AgentConsole.css";
//
// /* -------------------------- Chat List Component -------------------------- */
// const ChatList = ({ chats, activeChat, setActiveChat, pausedChats }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//
//   const filteredChats = chats.filter((chat) =>
//     chat.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//
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
//
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
//                 className={`chat-item ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
//                 onClick={() => setActiveChat(chat)}
//               >
//                 <div className="chat-info">
//                   <div className="chat-header-row">
//                     <span className="chat-name">{chat.id}</span>
//                     <span className="chat-time">{chat.channel}</span>
//                   </div>
//
//                   {chat.sentiment && (
//                     <span
//                       className={`sentiment-tag ${
//                         chat.sentiment === "negative"
//                           ? "sentiment-negative"
//                           : chat.sentiment === "positive"
//                           ? "sentiment-positive"
//                           : "sentiment-neutral"
//                       }`}
//                     >
//                       {chat.sentiment}
//                     </span>
//                   )}
//
//                   <span className="chat-status">{chat.status}</span>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };
//
// /* -------------------------- Chat Window Component -------------------------- */
// const ChatWindow = ({
//   chat,
//   socket,
//   isTyping,
//   onCloseChat,
//   isPaused,
//   onTogglePause,
//   messages,
//   onSendMessage,
//   isLoadingMessages,
// }) => {
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);
//
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);
//
//   const handleSend = () => {
//     if (!message.trim() || !socket || isPaused) return;
//     onSendMessage(message);
//     setMessage("");
//   };
//
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };
//
//   if (!chat)
//     return (
//       <div className="chat-window empty">
//         <p>Select a chat to start messaging</p>
//       </div>
//     );
//
//   return (
//     <div className="chat-window">
//       <div className="chat-window-header">
//         <div className="chat-user-info">
//           <div>
//             <h3>{chat.id}</h3>
//             <span className={`status-badge ${isPaused ? "paused" : "online"}`}>
//               {isPaused ? "Paused" : "Online"}
//             </span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button
//             className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
//             onClick={() => onTogglePause(chat.id)}
//             title={isPaused ? "Unlock Chat" : "Lock Chat"}
//           >
//             {isPaused ? "🔓" : "🔒"}
//           </button>
//           <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
//             Close
//           </button>
//         </div>
//       </div>
//
//       <div className="messages-container">
//         {isLoadingMessages ? (
//           <div className="empty-state">Loading messages...</div>
//         ) : messages.length === 0 ? (
//           <div className="empty-state">No messages yet. Start the conversation!</div>
//         ) : (
//           messages.map((msg, i) => (
//             <div key={i} className={`message ${msg.sender || "user"}`}>
//               <div className={`message-bubble ${msg.sender === "agent" ? "orange-bubble" : ""}`}>
//                 {msg.text}
//               </div>
//               <div className="message-time">
//                 {new Date(msg.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           ))
//         )}
//         {isTyping && !isPaused && (
//           <div className="message customer">
//             <div className="message-bubble typing-indicator">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//
//       {isPaused && (
//         <div className="pause-banner">
//           <span className="pause-icon-small">🔒</span>
//           <span>Chat is locked. Click unlock icon to resume messaging.</span>
//         </div>
//       )}
//
//       <div className={`message-input-container ${isPaused ? "disabled" : ""}`}>
//         <input
//           type="text"
//           placeholder={isPaused ? "Chat is paused..." : "Type your message..."}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="message-input"
//           disabled={isPaused}
//         />
//         <button onClick={handleSend} className="send-btn" disabled={isPaused}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
//
// /* -------------------------- Customer Info Component -------------------------- */
// const CustomerInfo = ({ chat }) => {
//   if (!chat) return null;
//
//   return (
//     <div className="customer-info">
//       <h2>Chat Details</h2>
//       <p className="customer-channel">{chat.channel}</p>
//
//       <div className="info-section">
//         <div className="info-item">
//           <span className="info-label">Chat ID</span>
//           <span className="info-value">{chat.id}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Conversation ID</span>
//           <span className="info-value">{chat.conversation_id}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Status</span>
//           <span className="info-value">{chat.status}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Sentiment</span>
//           <span className="info-value">{chat.sentiment}</span>
//         </div>
//         <div className="info-item">
//           <span className="info-label">Channel</span>
//           <span className="info-value">{chat.channel}</span>
//         </div>
//       </div>
//
//       <div className="notes-section">
//         <h3>Notes</h3>
//         <textarea
//           className="notes-textarea"
//           placeholder="Add notes about this conversation..."
//         />
//       </div>
//
//       <div className="activity-section">
//         <h3>Recent Activity</h3>
//         <div className="activity-item">
//           <strong>Chat started</strong>
//           <div className="activity-time">Just now</div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// /* -------------------------- Main Agent Console -------------------------- */
// const AgentConsole = () => {
//   const [activeChat, setActiveChat] = useState(null);
//   const [consoleSocket, setConsoleSocket] = useState(null);
//   const [conversationSocket, setConversationSocket] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [pausedChats, setPausedChats] = useState(new Set());
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
//
//   useEffect(() => {
//     const tenantId = localStorage.getItem("tenant_id");
//     const agentId = localStorage.getItem("username");
//     const token = localStorage.getItem("auth_token");
//
//     if (!tenantId || !agentId || !token) {
//       console.warn("❌ Missing tenant_id or agent_id — please login again");
//       setConnectionStatus("error");
//       return;
//     }
//
//     const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
//       token
//     )}`;
//     console.log("🔌 Connecting to Agent Console:", wsUrl);
//     const ws = new WebSocket(wsUrl);
//     setConsoleSocket(ws);
//     setConnectionStatus("connecting");
//
//     ws.onopen = () => {
//       console.log("✅ Connected to Agent Console");
//       setConnectionStatus("connected");
//     };
//
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("📩 Console event:", data);
//
//       if (data.type === "snapshot" && Array.isArray(data.conversations)) {
//         const formattedChats = data.conversations.map((c) => ({
//           id: c.id,
//           conversation_id: c.id,
//           channel: c.channel || "unknown",
//           status: c.status || "active",
//           sentiment: c.sentiment || "neutral",
//         }));
//         setChats(formattedChats);
//       } else if (data.type === "new_conversation") {
//         setChats((prev) => [
//           {
//             id: data.conversation.id,
//             conversation_id: data.conversation.id,
//             channel: data.conversation.channel || "unknown",
//             status: "active",
//             sentiment: data.conversation.sentiment || "neutral",
//           },
//           ...prev,
//         ]);
//       } else if (data.type === "conversation_closed") {
//         handleConversationClosed(data.conversation_id);
//       }
//     };
//
//     ws.onclose = () => {
//       console.log("❌ Console socket closed");
//       setConnectionStatus("disconnected");
//     };
//
//     ws.onerror = (err) => {
//       console.error("⚠️ Console socket error:", err);
//       setConnectionStatus("error");
//     };
//
//     return () => ws.close();
//   }, []);
//
//   /* ---------------- Conversation Socket ---------------- */
//   useEffect(() => {
//     if (!activeChat) {
//       if (conversationSocket) conversationSocket.close();
//       return;
//     }
//
//     const token = localStorage.getItem("auth_token");
//     const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
//       token
//     )}`;
//     const convWs = new WebSocket(convWsUrl);
//     setConversationSocket(convWs);
//     setIsLoadingMessages(true);
//
//     convWs.onopen = () => convWs.send(JSON.stringify({ action: "join_conversation" }));
//     convWs.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === "history") {
//         setMessages((prev) => ({ ...prev, [activeChat.conversation_id]: data.messages }));
//         setIsLoadingMessages(false);
//       } else if (data.type === "message") handleConversationMessage(data);
//     };
//     convWs.onclose = () => setIsLoadingMessages(false);
//     convWs.onerror = () => setIsLoadingMessages(false);
//
//     return () => convWs.close();
//   }, [activeChat]);
//
//   const handleConversationMessage = (data) => {
//     const convId = data.conversation_id || activeChat?.conversation_id;
//     if (!convId) return;
//
//     setMessages((prev) => ({
//       ...prev,
//       [convId]: [...(prev[convId] || []), data],
//     }));
//   };
//
//   const handleConversationClosed = (id) => {
//     setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
//     if (activeChat?.conversation_id === id) setActiveChat(null);
//   };
//
//   const handleSendMessage = (text) => {
//     if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) return;
//     const msg = { type: "message", text };
//     conversationSocket.send(JSON.stringify(msg));
//   };
//
//   const handleTogglePause = (chatId) => {
//     setPausedChats((prev) => {
//       const s = new Set(prev);
//       s.has(chatId) ? s.delete(chatId) : s.add(chatId);
//       return s;
//     });
//   };
//
//   const handleCloseChat = (chatId) => {
//     conversationSocket?.send(JSON.stringify({ type: "close_conversation" }));
//     handleConversationClosed(chatId);
//   };
//
//   const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
//   const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];
//
//   return (
//     <div className="app">
//       <ChatList
//         chats={chats}
//         activeChat={activeChat}
//         setActiveChat={setActiveChat}
//         pausedChats={pausedChats}
//       />
//
//       <ChatWindow
//         chat={activeChat}
//         socket={conversationSocket}
//         isTyping={false}
//         onCloseChat={handleCloseChat}
//         isPaused={isPaused}
//         onTogglePause={handleTogglePause}
//         messages={activeChatMessages}
//         onSendMessage={handleSendMessage}
//         isLoadingMessages={isLoadingMessages}
//       />
//
//       <CustomerInfo chat={activeChat} />
//     </div>
//   );
// };
//
// export default AgentConsole;
//
//
//
//

import React, { useState, useEffect, useRef } from "react";
import "../../styles/conversation.css";

/* -------------------------- Chat List Component -------------------------- */
const ChatList = ({ chats, activeChat, setActiveChat, pausedChats }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Inbox</h2>
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
            return (
              <div
                key={chat.id}
                className={`chat-item ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="chat-info">
                  <div className="chat-header-row">
                    <span className="chat-name">{chat.id}</span>
                    <span className="chat-time">{chat.channel}</span>
                  </div>

                  {chat.sentiment && (
                    <span
                      className={`sentiment-tag ${
                        chat.sentiment === "negative"
                          ? "sentiment-negative"
                          : chat.sentiment === "positive"
                          ? "sentiment-positive"
                          : "sentiment-neutral"
                      }`}
                    >
                      {chat.sentiment}
                    </span>
                  )}

                  <span className="chat-status">{chat.status}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

/* -------------------------- Chat Window Component -------------------------- */
const ChatWindow = ({
  chat,
  isTyping,
  onCloseChat,
  isPaused,
  onTogglePause,
  messages,
  onSendMessage,
  isLoadingMessages,
  conversationSocketStatus,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim() || isPaused || conversationSocketStatus !== 'connected') return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-user-info">
          <div>
            <h3>{chat.id}</h3>
            <span className={`status-badge ${isPaused ? "paused" : conversationSocketStatus === 'connected' ? "online" : "connecting"}`}>
              {isPaused ? "Paused" : conversationSocketStatus === 'connected' ? "Online" : "Connecting..."}
            </span>
          </div>
        </div>
        <div className="chat-actions">
          <button
            className={`action-btn icon-btn ${isPaused ? "unlock-btn" : "lock-btn"}`}
            onClick={() => onTogglePause(chat.id)}
            title={isPaused ? "Unlock Chat" : "Lock Chat"}
          >
            {isPaused ? "🔓" : "🔒"}
          </button>
          <button className="action-btn close-btn" onClick={() => onCloseChat(chat.id)}>
            Close
          </button>
        </div>
      </div>

      <div className="messages-container">
        {isLoadingMessages ? (
          <div className="empty-state">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="empty-state">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender || "user"}`}>
              <div className={`message-bubble ${msg.sender === "agent" ? "orange-bubble" : ""}`}>
                {msg.text}
              </div>
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isTyping && !isPaused && (
          <div className="message customer">
            <div className="message-bubble typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isPaused && (
        <div className="pause-banner">
          <span className="pause-icon-small">🔒</span>
          <span>Chat is locked. Click unlock icon to resume messaging.</span>
        </div>
      )}

      <div className={`message-input-container ${isPaused || conversationSocketStatus !== 'connected' ? "disabled" : ""}`}>
        <input
          type="text"
          placeholder={isPaused ? "Chat is paused..." : conversationSocketStatus !== 'connected' ? "Connecting..." : "Type your message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="message-input"
          disabled={isPaused || conversationSocketStatus !== 'connected'}
        />
        <button
          onClick={handleSend}
          className="send-btn"
          disabled={isPaused || conversationSocketStatus !== 'connected'}
        >
          Send
        </button>
      </div>
    </div>
  );
};

/* -------------------------- Customer Info Component -------------------------- */
const CustomerInfo = ({ chat }) => {
  if (!chat) return null;

  return (
    <div className="customer-info">
      <h2>Chat Details</h2>
      <p className="customer-channel">{chat.channel}</p>

      <div className="info-section">
        <div className="info-item">
          <span className="info-label">Chat ID</span>
          <span className="info-value">{chat.id}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Conversation ID</span>
          <span className="info-value">{chat.conversation_id}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Status</span>
          <span className="info-value">{chat.status}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Sentiment</span>
          <span className="info-value">{chat.sentiment}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Channel</span>
          <span className="info-value">{chat.channel}</span>
        </div>
      </div>

      <div className="notes-section">
        <h3>Notes</h3>
        <textarea
          className="notes-textarea"
          placeholder="Add notes about this conversation..."
        />
      </div>

      <div className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-item">
          <strong>Chat started</strong>
          <div className="activity-time">Just now</div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------- Main Agent Console -------------------------- */
const AgentConsole = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [consoleSocket, setConsoleSocket] = useState(null);
  const [conversationSocket, setConversationSocket] = useState(null);
  const [conversationSocketStatus, setConversationSocketStatus] = useState('disconnected');
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [pausedChats, setPausedChats] = useState(new Set());
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Console WebSocket - listens for new conversations
  useEffect(() => {
    const tenantId = localStorage.getItem("tenant_id");
    const agentId = localStorage.getItem("username");
    const token = localStorage.getItem("auth_token");

    if (!tenantId || !agentId || !token) {
      console.warn("❌ Missing tenant_id or agent_id — please login again");
      setConnectionStatus("error");
      return;
    }

    const wsUrl = `ws://localhost:8000/ws/console?tenant_id=${tenantId}&agent_id=${agentId}&token=${encodeURIComponent(
      token
    )}`;
    console.log("🔌 Connecting to Agent Console:", wsUrl);
    const ws = new WebSocket(wsUrl);
    setConsoleSocket(ws);
    setConnectionStatus("connecting");

    ws.onopen = () => {
      console.log("✅ Connected to Agent Console");
      setConnectionStatus("connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Console event:", data);

      if (data.type === "snapshot" && Array.isArray(data.conversations)) {
        const formattedChats = data.conversations.map((c) => ({
          id: c.id,
          conversation_id: c.id,
          channel: c.channel || "unknown",
          status: c.status || "active",
          sentiment: c.sentiment || "neutral",
        }));
        setChats(formattedChats);
      } else if (data.type === "new_conversation") {
        setChats((prev) => [
          {
            id: data.conversation.id,
            conversation_id: data.conversation.id,
            channel: data.conversation.channel || "unknown",
            status: "active",
            sentiment: data.conversation.sentiment || "neutral",
          },
          ...prev,
        ]);
      } else if (data.type === "conversation_closed") {
        handleConversationClosed(data.conversation_id);
      }
    };

    ws.onclose = () => {
      console.log("❌ Console socket closed");
      setConnectionStatus("disconnected");
    };

    ws.onerror = (err) => {
      console.error("⚠️ Console socket error:", err);
      setConnectionStatus("error");
    };

    return () => ws.close();
  }, []);

  /* ---------------- Conversation Socket - FIXED VERSION ---------------- */
  useEffect(() => {
    // Close previous conversation socket if exists
    if (conversationSocket) {
      console.log("🔌 Closing previous conversation socket");
      conversationSocket.close();
      setConversationSocket(null);
    }

    // If no active chat selected, don't connect
    if (!activeChat) {
      setConversationSocketStatus('disconnected');
      return;
    }

    const token = localStorage.getItem("auth_token");
    const convWsUrl = `ws://localhost:8000/ws/conversations/${activeChat.conversation_id}?token=${encodeURIComponent(
      token
    )}`;

    console.log(`🔌 Connecting to conversation: ${activeChat.conversation_id}`);
    console.log(`🔗 URL: ${convWsUrl}`);

    const convWs = new WebSocket(convWsUrl);
    setConversationSocket(convWs);
    setConversationSocketStatus('connecting');
    setIsLoadingMessages(true);

    convWs.onopen = () => {
      console.log(`✅ Connected to conversation: ${activeChat.conversation_id}`);
      setConversationSocketStatus('connected');

      // CRITICAL: Send join_conversation to get message history
      const joinMessage = {
        action: "join_conversation",
        conversation_id: activeChat.conversation_id
      };
      console.log("📤 Sending join_conversation:", joinMessage);
      convWs.send(JSON.stringify(joinMessage));
    };

    convWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Conversation message:", data);

      if (data.type === "history") {
        // Message history received
        console.log(`📜 Received ${data.messages?.length || 0} historical messages`);
        setMessages((prev) => ({
          ...prev,
          [activeChat.conversation_id]: data.messages || []
        }));
        setIsLoadingMessages(false);
      } else if (data.type === "message") {
        // New real-time message
        console.log("💬 New message received:", data);
        handleConversationMessage(data);
      } else if (data.type === "error") {
        console.error("❌ Conversation error:", data.message);
        setIsLoadingMessages(false);
      }
    };

    convWs.onclose = (event) => {
      console.log(`❌ Conversation socket closed: ${activeChat.conversation_id}`, event);
      setConversationSocketStatus('disconnected');
      setIsLoadingMessages(false);
    };

    convWs.onerror = (error) => {
      console.error(`⚠️ Conversation socket error: ${activeChat.conversation_id}`, error);
      setConversationSocketStatus('error');
      setIsLoadingMessages(false);
    };

    // Cleanup function
    return () => {
      console.log(`🧹 Cleaning up conversation socket: ${activeChat.conversation_id}`);
      convWs.close();
    };
  }, [activeChat]); // Re-run when activeChat changes

  const handleConversationMessage = (data) => {
    const convId = data.conversation_id || activeChat?.conversation_id;
    if (!convId) {
      console.warn("⚠️ Message received without conversation_id");
      return;
    }

    setMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), data],
    }));
  };

  const handleConversationClosed = (id) => {
    console.log(`🚪 Closing conversation: ${id}`);
    setChats((prev) => prev.filter((chat) => chat.conversation_id !== id));
    if (activeChat?.conversation_id === id) {
      setActiveChat(null);
    }
  };

  const handleSendMessage = (text) => {
    if (!conversationSocket || conversationSocket.readyState !== WebSocket.OPEN) {
      console.error("❌ Cannot send message: WebSocket not connected");
      return;
    }

    const msg = {
      type: "message",
      text,
      conversation_id: activeChat.conversation_id
    };

    console.log("📤 Sending message:", msg);
    conversationSocket.send(JSON.stringify(msg));

    // Optimistically add message to UI
    handleConversationMessage({
      conversation_id: activeChat.conversation_id,
      sender: "agent",
      text: text,
      timestamp: new Date().toISOString()
    });
  };

  const handleTogglePause = (chatId) => {
    setPausedChats((prev) => {
      const s = new Set(prev);
      s.has(chatId) ? s.delete(chatId) : s.add(chatId);
      return s;
    });
  };

  const handleCloseChat = (chatId) => {
    if (conversationSocket && conversationSocket.readyState === WebSocket.OPEN) {
      conversationSocket.send(JSON.stringify({
        type: "close_conversation",
        conversation_id: activeChat.conversation_id
      }));
    }
    handleConversationClosed(chatId);
  };

  const isPaused = activeChat ? pausedChats.has(activeChat.id) : false;
  const activeChatMessages = activeChat ? messages[activeChat.conversation_id] || [] : [];

  return (
    <div className="app">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        pausedChats={pausedChats}
      />

      <ChatWindow
        chat={activeChat}
        isTyping={false}
        onCloseChat={handleCloseChat}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        messages={activeChatMessages}
        onSendMessage={handleSendMessage}
        isLoadingMessages={isLoadingMessages}
        conversationSocketStatus={conversationSocketStatus}
      />

      <CustomerInfo chat={activeChat} />
    </div>
  );
};

export default AgentConsole;