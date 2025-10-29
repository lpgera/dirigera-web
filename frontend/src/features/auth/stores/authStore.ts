import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { AuthStore } from "../types";

const getInitialToken = (): string | null => {
  return window.localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    token: getInitialToken(),
    setToken: (token: string) => {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
      set((state) => {
        state.token = token;
      });
    },
    clearToken: () => {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      set((state) => {
        state.token = null;
      });
    },
  }))
);

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.token !== null);
