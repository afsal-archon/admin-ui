export default function TaskList({ tasks }) {
  return (
    <div className="task-card">
      <h3>Upcoming Tasks</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.title}>
            <div className="task-info">
              <span className="task-icon">📅</span>
              <div>
                <p>{t.title}</p>
                <small>{t.due}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
