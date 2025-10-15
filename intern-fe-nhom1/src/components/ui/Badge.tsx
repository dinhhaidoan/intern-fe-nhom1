import React from "react";

type BadgeTone = "green" | "gray" | "yellow" | "red";

export const Badge: React.FC<{ tone: BadgeTone; children: React.ReactNode }> = ({ tone, children }) => {
  const map: Record<BadgeTone, string> = {
    green: "badge badge-green",
    gray: "badge badge-gray",
    yellow: "badge badge-yellow",
    red: "badge badge-red",
  };
  return <span className={map[tone]}>{children}</span>;
};
