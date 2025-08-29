import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Nav() {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logOut()
    navigate('/', { replace: true })
  }

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="container nav-grid">
        <ul className="nav-left">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/booking">Book a table</NavLink></li>
        </ul>

        <ul className="nav-right">
          {!user ? (
            <>
              <li><NavLink to="/signup">Sign up</NavLink></li>
              <li><NavLink to="/login">Log in</NavLink></li>
            </>
          ) : (
            <>
              <li>
                <span className="chip" aria-label={`Signed in as ${user.name}`}>
                  👋 {user.name}
                </span>
              </li>
              <li>
                <button className="linklike" onClick={handleLogout} aria-label="Log out">
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
