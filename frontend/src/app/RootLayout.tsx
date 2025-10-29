import React from "react";
import { Outlet } from "react-router-dom";
import { useIsAuthenticated } from "@/features/auth";
import { Login } from "@/features/auth";
import { Logout } from "@/features/auth";
import { AppLayout, LayoutHeader } from "./Layout";

export function RootLayout() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <AppLayout>
      <LayoutHeader />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 101,
        }}
      >
        <Logout />
      </div>
      <div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
        {isAuthenticated ? <Outlet /> : <Login />}
      </div>
    </AppLayout>
  );
}
