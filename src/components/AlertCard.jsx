import React from "react";

export default function AlertCard({ type, message, severity, timestamp }) {
  const severityStyles = {
    critical: { bg: "#fdecea", border: "#f44336", icon: "🚨", color: "#b71c1c" },
    warning: { bg: "#fff8e1", border: "#ff9800", icon: "⚠️", color: "#e65100" },
    info: { bg: "#e3f2fd", border: "#2196f3", icon: "ℹ️", color: "#0d47a1" },
  };

  const style = severityStyles[severity] || severityStyles.info;

  return (
    <div
      style={{
        backgroundColor: style.bg,
        borderLeft: `6px solid ${style.border}`,
        borderRadius: 12,
        padding: "18px 22px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>{style.icon}</span>
        <h4 style={{ margin: 0, fontSize: 17, color: style.color }}>{type}</h4>
      </div>
      <p style={{ margin: 0, fontSize: 14.5, color: "#333", lineHeight: 1.5 }}>{message}</p>
      <small style={{ color: "#555", fontSize: 12 }}>{timestamp}</small>
    </div>
  );
}
