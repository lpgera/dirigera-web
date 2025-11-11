import React from "react";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { AuthenticatedContent } from "./AuthenticatedContent";
import "./RootLayout.css";
import { LayoutHeader } from "./LayoutHeader";

export function RootLayout() {
  return (
    <AppLayout>
      <AuthenticatedContent>
        <LayoutHeader />
        <Outlet />
      </AuthenticatedContent>
    </AppLayout>
  );
}

export default RootLayout;