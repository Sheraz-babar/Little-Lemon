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
import RequireAuth from '../components/RequireAuth.jsx'

function renderApp(initial = '/booking') {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="booking" element={<Booking />} />
              <Route path="confirmation" element={<Confirmation />} />
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

beforeEach(() => { localStorage.clear(); sessionStorage.clear() })

describe('Protected booking flow', () => {
  test('redirects to login when not signed in', async () => {
    renderApp('/booking')
    expect(await screen.findByRole('heading', { name: /log in/i })).toBeInTheDocument()
  })

  test('after login, returns to booking', async () => {
    // First create a user via sign up
    renderApp('/signup')
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/full name/i), 'Pat')
    await user.type(screen.getByLabelText(/^email/i), 'pat@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Strong123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Strong123')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    // Now go to /booking while signed in
    renderApp('/booking')
    expect(await screen.findByRole('heading', { name: /book a table/i })).toBeInTheDocument()
  })
})
