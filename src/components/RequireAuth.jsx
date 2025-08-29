import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function RequireAuth() {
  const { user } = useAuth()
  const loc = useLocation()

  if (!user) {
    const q = new URLSearchParams({ redirect: loc.pathname + loc.search }).toString()
    return <Navigate to={`/login?${q}`} replace />
  }
  return <Outlet />
}
