import React from "react";
import { useLogin } from "../../hooks/useAuth";
import { LoginForm } from "../ui/LoginForm";

export function Login() {
  const { login, loading, error } = useLogin();

  return <LoginForm onSubmit={login} loading={loading} error={error ?? null} />;
}
