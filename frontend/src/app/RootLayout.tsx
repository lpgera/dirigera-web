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
      <div className="root-layout-logout">
        <Logout />
      </div>
      <div className="root-layout-content">
        {isAuthenticated ? (
          <>
            {/* <LayoutHeader /> */}
            <Outlet />
          </>
        ) : (
          <Login />
        )}
      </div>
    </AppLayout>
  );
}

export default RootLayout;