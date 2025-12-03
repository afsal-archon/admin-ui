import React from "react";
import "./SupportPage.css";

export default function SupportPage() {
  return (
    <div className="support-layout">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="support-sidebar">
        <h2 className="brand">H</h2>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search chat"
            className="search-input"
          />
        </div>

        <div className="menu-section">
          <h4>Inbox</h4>
          <ul>
            <li className="active">All</li>
            <li>Assigned to me</li>
            <li>Unassigned</li>
          </ul>
        </div>

        <div className="menu-section">
          <h4>Status</h4>
          <ul>
            <li>All</li>
            <li>New</li>
            <li>Open</li>
            <li>Paused</li>
            <li>Closed</li>
          </ul>
        </div>

        <div className="menu-section">
          <h4>Channel</h4>
          <ul>
            <li>All</li>
            <li>Whatsapp</li>
            <li>Instagram</li>
            <li>Web</li>
          </ul>
        </div>

        <div className="menu-section">
          <h4>Agents</h4>
          <div className="agent-item">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Olivia"
            />
            <p>Olivia Rhye</p>
            <span className="online-dot"></span>
          </div>
        </div>
      </aside>

      {/* ---------- CENTER CHAT PANEL ---------- */}
      <main className="chat-main">
        <div className="chat-header">
          <div>
            <h3>Olivia Rhye</h3>
            <p>Online</p>
          </div>

          <div className="header-buttons">
            <button className="pause">Pause</button>
            <button className="close">Close</button>
          </div>
        </div>

        <div className="chat-body">
          <div className="message agent">
            Thank you. Please enter the amount and date of the transaction.
          </div>

          <div className="message user">
            Thank you. It seems there might be a delay in processing.
          </div>

          <div className="message user">Retry checking the balance</div>

          <div className="message agent">
            Hi, this is Alex from Support. I see you’re having an issue with
            your top-up.
          </div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button className="send-btn">Send</button>
        </div>
      </main>

      {/* ---------- RIGHT INFO PANEL ---------- */}
      <aside className="info-panel">
        <h4>Cora Goyette</h4>
        <p className="channel">WhatsApp B2B</p>

        <div className="info-block">
          <p>
            <strong>Channel:</strong> WhatsApp
          </p>
          <p>
            <strong>Phone:</strong> +62 8797 629 2012
          </p>
          <p>
            <strong>Address:</strong> 5467 Richmond View, KY, USA
          </p>
        </div>

        <div className="notes-section">
          <h5>Notes</h5>
          <textarea placeholder="Write a note..." />
        </div>

        <div className="activity-section">
          <h5>Activity</h5>
          <p>
            <strong>Justin Hicks</strong> sent update by email at 4PM
          </p>
          <p>
            <strong>Sarah Lin</strong> updated status to Open
          </p>
        </div>
      </aside>
    </div>
  );
}
