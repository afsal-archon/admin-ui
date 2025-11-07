export default function NotificationList({ notifications }) {
  return (
    <div className="notif-card">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n.name}>
            <img src={n.avatar} alt={n.name} />
            <div>
              <p>{n.name}</p>
              <small>{n.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
