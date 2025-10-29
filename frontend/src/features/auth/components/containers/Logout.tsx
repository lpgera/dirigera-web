import React from "react";
import { useLogout, useIsAuthenticated } from "../../hooks/useAuth";
import { LogoutButton } from "../ui/LogoutButton";

export function Logout() {
  const { logout } = useLogout();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return null;
  }

  return <LogoutButton onLogout={logout} />;
}
