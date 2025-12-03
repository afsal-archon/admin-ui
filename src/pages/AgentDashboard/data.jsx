import {
  FaUsers,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

// ✅ Agent Dashboard Statistics Data
export const stats = [
  {
    id: 1,
    icon: <FaUsers color="#0ea5e9" size={26} />,
    title: "New Clients",
    value: 18,
    subtitle: "in the last week",
    trend: "+12%",
    trendColor: "#10b981", // green
  },
  {
    id: 2,
    icon: <FaCheckCircle color="#facc15" size={26} />,
    title: "Open Tasks",
    value: 24,
    subtitle: "assigned to you",
    trend: "+8%",
    trendColor: "#10b981",
  },
  {
    id: 3,
    icon: <FaExclamationCircle color="#ef4444" size={26} />,
    title: "Unread Messages",
    value: 5,
    subtitle: "require response",
    trend: "-3%",
    trendColor: "#ef4444", // red for negative trend
  },
];
