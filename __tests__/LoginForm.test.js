import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginForm from "../components/LoginForm.jsx"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock console methods to avoid noise in tests
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {})
  jest.spyOn(window, "alert").mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe("LoginForm", () => {
  test("renders login form with all required fields", () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
  })

  test("shows validation errors for empty fields", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const submitButton = screen.getByRole("button", { name: /sign in/i })
    await user.click(submitButton)

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  test("shows validation error for invalid email format", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    await user.type(emailInput, "invalid-email")
    await user.click(submitButton)

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
  })

  test("shows validation error for weak password", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    await user.type(passwordInput, "123")
    await user.click(submitButton)

    expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument()
  })

  test("shows validation error for password without required characters", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    await user.type(passwordInput, "password")
    await user.click(submitButton)

    expect(
      screen.getByText(/password must contain at least one uppercase letter, one lowercase letter, and one number/i),
    ).toBeInTheDocument()
  })

  test("clears validation errors when user starts typing", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    // Trigger validation error
    await user.click(submitButton)
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()

    // Start typing to clear error
    await user.type(emailInput, "test@example.com")
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
  })

  test("submits form with valid data", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    await user.type(emailInput, "test@example.com")
    await user.type(passwordInput, "Password123")
    await user.click(submitButton)

    expect(screen.getByText(/signing in.../i)).toBeInTheDocument()

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login successful! (This is a demo)")
    })
  })

  test("disables submit button during submission", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    await user.type(emailInput, "test@example.com")
    await user.type(passwordInput, "Password123")
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
  })
})
