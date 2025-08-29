import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/Home.jsx'
import SignUp from '../pages/SignUp.jsx'
import Login from '../pages/Login.jsx'
import Booking from '../pages/Booking.jsx'
import Confirmation from '../pages/Confirmation.jsx'
import { AuthProvider } from '../contexts/AuthContext.jsx'

function renderRoutes(initial = '/') {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="booking" element={<Booking />} />
            <Route path="confirmation" element={<Confirmation />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

beforeEach(() => { localStorage.clear(); sessionStorage.clear() })

describe('Nav and titles', () => {
  test('logged out shows Sign up / Log in; title updates', async () => {
    renderRoutes('/')
    expect(document.title).toMatch(/home • little lemon/i)
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument()
  })

  test('after sign up, nav shows greeting and logout', async () => {
    const user = userEvent.setup()
    renderRoutes('/signup')
    await user.type(screen.getByLabelText(/full name/i), 'Taylor')
    await user.type(screen.getByLabelText(/^email/i), 'taylor@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Strong123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Strong123')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByText(/taylor/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
  })
})
