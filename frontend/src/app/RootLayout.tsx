import React from "react";
import { Outlet } from "react-router-dom";
import { useIsAuthenticated } from "@/features/auth";
import { Login } from "@/features/auth";
import { Logout } from "@/features/auth";
import { AppLayout, LayoutHeader } from "./Layout";
import "./RootLayout.css";

export function RootLayout() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <AppLayout>
      <LayoutHeader />
      <div className="root-layout-logout">
        <Logout />
      </div>
      <div className="root-layout-content">
        {isAuthenticated ? <Outlet /> : <Login />}
      </div>
    </AppLayout>
  );
}
