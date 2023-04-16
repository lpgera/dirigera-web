import React, { createContext, ReactElement, useReducer } from 'react'

const LOCAL_STORAGE_KEY = 'dirigera-web-token'

type AuthState = {
  token: string | null
}

type AuthAction =
  | {
      type: 'login'
      token: string
    }
  | {
      type: 'logout'
    }

export type AuthContextType = {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

const initialState = {
  token: window.localStorage.getItem(LOCAL_STORAGE_KEY),
}

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
})

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: AuthState, action: AuthAction) => {
      switch (action.type) {
        case 'login':
          window.localStorage.setItem(LOCAL_STORAGE_KEY, action.token)
          return {
            ...state,
            token: action.token,
          }
        case 'logout':
          window.localStorage.removeItem(LOCAL_STORAGE_KEY)
          return {
            ...state,
            token: null,
          }
        default:
          throw new Error(`Invalid action ${action}`)
      }
    },
    initialState
  )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
