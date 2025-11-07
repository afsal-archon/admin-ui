import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function ChartCard({ title, data }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="clients" fill="#00BFA6" radius={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
