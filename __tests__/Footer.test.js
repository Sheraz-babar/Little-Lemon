import { render, screen } from "@testing-library/react"
import Footer from "../components/Footer.jsx"

describe("Footer", () => {
  test("renders footer with restaurant information", () => {
    render(<Footer />)

    expect(screen.getByText("Little Lemon")).toBeInTheDocument()
    expect(screen.getByText(/family owned Mediterranean restaurant/i)).toBeInTheDocument()
  })

  test("displays contact information", () => {
    render(<Footer />)

    expect(screen.getByText("Contact Info")).toBeInTheDocument()
    expect(screen.getByText("123 Mediterranean Ave")).toBeInTheDocument()
    expect(screen.getByText("Chicago, IL 60601")).toBeInTheDocument()
    expect(screen.getByText("Phone: (312) 555-0123")).toBeInTheDocument()
    expect(screen.getByText("Email: info@littlelemon.com")).toBeInTheDocument()
  })

  test("displays operating hours", () => {
    render(<Footer />)

    expect(screen.getByText("Hours")).toBeInTheDocument()
    expect(screen.getByText(/Monday - Thursday: 11am - 10pm/i)).toBeInTheDocument()
    expect(screen.getByText(/Friday - Saturday: 11am - 11pm/i)).toBeInTheDocument()
    expect(screen.getByText(/Sunday: 12pm - 9pm/i)).toBeInTheDocument()
  })

  test("displays copyright information", () => {
    render(<Footer />)

    expect(screen.getByText(/© 2024 Little Lemon Restaurant. All rights reserved./i)).toBeInTheDocument()
  })

  test("uses semantic HTML elements", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toBeInTheDocument()

    const address = screen.getByRole("group", { name: /contact info/i })
    expect(address).toBeInTheDocument()
  })
})
