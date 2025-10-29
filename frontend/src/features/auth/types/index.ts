export interface AuthState {
  token: string | null;
}

export interface AuthActions {
  setToken: (token: string) => void;
  clearToken: () => void;
}

export type AuthStore = AuthState & AuthActions;
