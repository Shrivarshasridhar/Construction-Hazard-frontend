import { FaCheckCircle, FaExclamationTriangle, FaFireAlt, FaInfoCircle } from "react-icons/fa";

export default function SensorCard({ name, value, status }) {
  
  const statusMap = {
    normal: {
      color: "#43a047",
      bg: "rgba(67,160,71,0.08)",
      icon: <FaCheckCircle size={28} color="#43a047" style={{ marginRight: 12 }} />,
      border: "2px solid #43a047"
    },
    warning: {
      color: "#fbc02d",
      bg: "rgba(251,192,45,0.08)",
      icon: <FaExclamationTriangle size={28} color="#fbc02d" style={{ marginRight: 12 }} />,
      border: "2px solid #fbc02d"
    },
    critical: {
      color: "#e53935",
      bg: "rgba(229,57,53,0.08)",
      icon: <FaFireAlt size={28} color="#e53935" style={{ marginRight: 12 }} />,
      border: "2px solid #e53935"
    },
    info: {
      color: "#1976d2",
      bg: "rgba(25,118,210,0.08)",
      icon: <FaInfoCircle size={28} color="#1976d2" style={{ marginRight: 12 }} />,
      border: "2px solid #1976d2"
    }
  };

  const stat = statusMap[status] || statusMap.info;

  return (
    <div
      style={{
        maxWidth: 260,
        margin: "0 auto 1.5rem auto",
        background: stat.bg,
        borderRadius: 14,
        border: stat.border,
        boxShadow: "0 4px 16px rgba(60,60,120,0.09)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.2rem 1.4rem",
        transition: "all 0.5s ease", 
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        {stat.icon}
        <span style={{ fontWeight: 700, color: stat.color, fontSize: "1.1rem" }}>{name}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#222",
          marginBottom: 4,
          transition: "color 0.3s ease", 
        }}>
          {value}
        </div>
        <div style={{
          color: stat.color,
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: 1,
          transition: "color 0.3s ease"
        }}>
          {status.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
