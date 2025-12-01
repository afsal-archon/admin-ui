import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-semibold text-gray-800">{value ?? 0}</p>
    </div>
  );
}
