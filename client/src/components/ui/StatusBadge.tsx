import React from "react";

interface StatusBadgeProps {
  status: "Pending" | "In Progress" | "Completed";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let color;
  switch (status) {
    case "Pending":
      color = "yellow";
      break;
    case "In Progress":
      color = "blue";
      break;
    case "Completed":
      color = "green";
      break;
    default:
      throw new Error(`Invalid status: ${status}`);
  }

  return <span className={`badge badge-${color}`}>{status}</span>;
};

export default StatusBadge;
