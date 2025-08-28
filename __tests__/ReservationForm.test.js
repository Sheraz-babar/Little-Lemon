import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ReservationForm from "../components/ReservationForm.jsx"
import jest from "jest" // Import jest to declare the variable

// Mock console methods
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {})
  jest.spyOn(window, "alert").mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe("ReservationForm", () => {
  test("renders reservation form with all required fields", () => {
    render(<ReservationForm />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /make reservation/i })).toBeInTheDocument()
  })

  test("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const submitButton = screen.getByRole("button", { name: /make reservation/i })
    await user.click(submitButton)

    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/date is required/i)).toBeInTheDocument()
    expect(screen.getByText(/time is required/i)).toBeInTheDocument()
  })

  test("shows validation error for invalid email", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const emailInput = screen.getByLabelText(/email address/i)
    const submitButton = screen.getByRole("button", { name: /make reservation/i })

    await user.type(emailInput, "invalid-email")
    await user.click(submitButton)

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
  })

  test("shows validation error for past date", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const dateInput = screen.getByLabelText(/date/i)
    const submitButton = screen.getByRole("button", { name: /make reservation/i })

    // Set a past date
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const pastDate = yesterday.toISOString().split("T")[0]

    await user.type(dateInput, pastDate)
    await user.click(submitButton)

    expect(screen.getByText(/please select a future date/i)).toBeInTheDocument()
  })

  test("submits form with valid data", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const dateInput = screen.getByLabelText(/date/i)
    const timeSelect = screen.getByLabelText(/time/i)
    const submitButton = screen.getByRole("button", { name: /make reservation/i })

    // Set a future date
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const futureDate = tomorrow.toISOString().split("T")[0]

    await user.type(nameInput, "John Doe")
    await user.type(emailInput, "john@example.com")
    await user.type(phoneInput, "555-123-4567")
    await user.type(dateInput, futureDate)
    await user.selectOptions(timeSelect, "19:00")
    await user.click(submitButton)

    expect(screen.getByText(/submitting.../i)).toBeInTheDocument()

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Reservation submitted successfully! We'll contact you to confirm.")
    })
  })

  test("updates guest count selection", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const guestSelect = screen.getByLabelText(/number of guests/i)

    await user.selectOptions(guestSelect, "4")
    expect(guestSelect.value).toBe("4")
  })

  test("handles special requests input", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const specialRequestsInput = screen.getByLabelText(/special requests/i)

    await user.type(specialRequestsInput, "Vegetarian options please")
    expect(specialRequestsInput.value).toBe("Vegetarian options please")
  })
})
