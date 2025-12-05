import React, { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  loading: true,
  error: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, error: null }
    case 'LOGOUT':
      return { ...state, user: null, token: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'LOAD_FROM_STORAGE':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false }
    case 'INIT_COMPLETE':
      return { ...state, loading: false }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: { token, user: JSON.parse(user) } })
    } else {
      dispatch({ type: 'INIT_COMPLETE' })
    }
  }, [])

  const login = (user, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
