import React, { createContext, useReducer } from 'react'

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
  token: window.localStorage.getItem('token'),
}

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: AuthState, action: AuthAction) => {
      switch (action.type) {
        case 'login':
          window.localStorage.setItem('token', action.token)
          return {
            ...state,
            token: action.token,
          }
        case 'logout':
          window.localStorage.removeItem('token')
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
