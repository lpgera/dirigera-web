import React from "react";
import "./AppLayout.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-layout-content">{children}</div>
    </div>
  );
}
