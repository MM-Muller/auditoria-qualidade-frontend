import React from "react";
import "./StatCard.css";

export const StatCard = ({
  title,
  value,
  color = "#fff",
  isLoading = false,
}) => {
  const cardStyle = {
    backgroundColor: color,
    border: color !== "#fff" ? `2px solid ${color}` : "1px solid #ddd",
    color: "#333",
  };

  if (color.startsWith("#f") && color !== "#fff") {
    cardStyle.color = "#555";
  }

  if (title.includes("Atrasadas")) {
    cardStyle.backgroundColor = "#dc3545";
    cardStyle.borderColor = "#dc3545";
    cardStyle.color = "#fff";
  }

  return (
    <div className="stat-card" style={cardStyle}>
      <div className="stat-value">{isLoading ? "..." : value}</div>
      <div className="stat-title">{title}</div>
    </div>
  );
};
