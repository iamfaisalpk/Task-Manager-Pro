import { useSelector } from 'react-redux'

export const useAuth = () => {
  try {
    const { user, token, loading, error } = useSelector((state) => state.auth)
    const isAuthenticated = !!token
    return { user, token, loading, error, isAuthenticated }
  } catch (err) {
    console.error('useAuth error:', err)
    return { user: null, token: null, loading: false, error: null, isAuthenticated: false }
  }
}
