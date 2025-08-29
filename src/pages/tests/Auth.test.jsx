import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../../App.jsx'
import Home from '../Home.jsx'
import SignUp from '../SignUp.jsx'
import Login from '../Login.jsx'
import Booking from '../Booking.jsx'
import Confirmation from '../Confirmation.jsx'
import { AuthProvider } from '../../contexts/AuthContext.jsx'

function renderApp(initial = '/signup') {
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

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('SignUp', () => {
  test('shows validation errors then succeeds', async () => {
    renderApp('/signup')
    const user = userEvent.setup()

    // Submit empty
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument()

    // Fill invalid password
    await user.type(screen.getByLabelText(/full name/i), 'A')
    await user.type(screen.getByLabelText(/^email/i), 'person@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'abc') // too weak
    await user.type(screen.getByLabelText(/confirm password/i), 'abc')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByText(/at least 8/i)).toBeInTheDocument()

    // Fix and succeed
    await user.clear(screen.getByLabelText(/full name/i))
    await user.type(screen.getByLabelText(/full name/i), 'Alex Lemon')
    await user.clear(screen.getByLabelText(/^password/i))
    await user.type(screen.getByLabelText(/^password/i), 'GoodPass123')
    await user.clear(screen.getByLabelText(/confirm password/i))
    await user.type(screen.getByLabelText(/confirm password/i), 'GoodPass123')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    // Redirect to home (Nav shows greeting)
    expect(await screen.findByText(/little lemon/i)).toBeInTheDocument()
    expect(screen.getByText(/alex lemon/i)).toBeInTheDocument()
  })
})

describe('Login', () => {
  test('invalid login shows error; valid login redirects', async () => {
    const user = userEvent.setup()

    // First, create a user via sign up route
    renderApp('/signup')
    await user.type(screen.getByLabelText(/full name/i), 'Jordan')
    await user.type(screen.getByLabelText(/^email/i), 'jordan@ex.com')
    await user.type(screen.getByLabelText(/^password/i), 'Strong123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Strong123')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    // Now navigate to login
    renderApp('/login')

    // Wrong password
    await user.type(screen.getByLabelText(/^email/i), 'jordan@ex.com')
    await user.type(screen.getByLabelText(/^password/i), 'WrongPass1')
    await user.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()

    // Correct credentials
    await user.clear(screen.getByLabelText(/^password/i))
    await user.type(screen.getByLabelText(/^password/i), 'Strong123')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(await screen.findByText(/little lemon/i)).toBeInTheDocument()
    expect(screen.getByText(/jordan/i)).toBeInTheDocument()
  })
})
