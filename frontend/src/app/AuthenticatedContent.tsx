import React from "react";
import { useIsAuthenticated } from "@/features/auth";
import { Login } from "@/features/auth";

export interface AuthenticatedContentProps {
  children: React.ReactNode;
}

export function AuthenticatedContent({ children }: AuthenticatedContentProps) {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <div className="root-layout-content">
        {isAuthenticated ? children : <Login />}
      </div>
    </>
  );
}
