import { useMutation } from "@apollo/client/react";
import {
  useAuthStore,
  useIsAuthenticated as useIsAuthenticatedStore,
} from "../stores/authStore";
import { LOGIN_MUTATION } from "../api/mutations";
import type {
  LoginMutation,
  LoginMutationVariables,
} from "@/components/Login.types.gen";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  const [loginMutation, { loading, error }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const login = async (password: string) => {
    const { data } = await loginMutation({
      variables: { password },
    });

    const token = data?.login;
    if (token) {
      setToken(token);
      return token;
    }
    return null;
  };

  return { login, loading, error };
}

export function useLogout() {
  const clearToken = useAuthStore((state) => state.clearToken);
  return { logout: clearToken };
}

export { useIsAuthenticatedStore as useIsAuthenticated };
