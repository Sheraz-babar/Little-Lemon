import React from 'react'

const USERS_KEY = 'll:users'
const CURRENT_KEY = 'll:currentUser'

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [] } catch { return [] }
}
function writeUsers(list) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)) } catch {}
}
function readCurrent() {
  try { return JSON.parse(localStorage.getItem(CURRENT_KEY)) } catch { return null }
}
function writeCurrent(user) {
  try {
    if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user))
    else localStorage.removeItem(CURRENT_KEY)
  } catch {}
}

const AuthCtx = React.createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => readCurrent())

  const signUp = async ({ name, email, password }) => {
    const users = readUsers()
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) throw new Error('Email is already registered.')
    const newUser = { id: crypto.randomUUID?.() ?? String(Date.now()), name, email, password }
    writeUsers([...users, newUser])
    writeCurrent({ id: newUser.id, name, email }) 
    setUser({ id: newUser.id, name, email })
  }

  const logIn = async ({ email, password }) => {
    const users = readUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found || found.password !== password) throw new Error('Invalid email or password.')
    writeCurrent({ id: found.id, name: found.name, email: found.email })
    setUser({ id: found.id, name: found.name, email: found.email })
  }

  const logOut = () => {
    writeCurrent(null)
    setUser(null)
  }

  const value = React.useMemo(() => ({ user, signUp, logIn, logOut }), [user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
