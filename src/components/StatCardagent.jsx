export default function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="icon">{icon}</div>
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}
