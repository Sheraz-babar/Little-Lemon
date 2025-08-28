import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Header from "../components/Header.jsx"
import jest from "jest"

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

describe("Header", () => {
  test("renders header with logo and navigation links", () => {
    render(<Header />)

    expect(screen.getByText("Little Lemon")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Menu")).toBeInTheDocument()
    expect(screen.getByText("Reservations")).toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })

  test("shows mobile menu button on mobile view", () => {
    render(<Header />)

    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toBeInTheDocument()
  })

  test("toggles mobile menu when button is clicked", async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByLabelText(/toggle menu/i)

    // Mobile menu should not be visible initially
    expect(screen.queryByText("Home")).toBeInTheDocument() // Desktop nav is always there

    // Click to open mobile menu
    await user.click(menuButton)

    // Mobile menu items should be visible (there will be duplicates - desktop and mobile)
    const homeLinks = screen.getAllByText("Home")
    expect(homeLinks.length).toBeGreaterThan(1) // Both desktop and mobile versions
  })

  test("navigation links have correct href attributes", () => {
    render(<Header />)

    expect(screen.getByRole("link", { name: "Little Lemon" })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about")
    expect(screen.getByRole("link", { name: "Menu" })).toHaveAttribute("href", "/menu")
    expect(screen.getByRole("link", { name: "Reservations" })).toHaveAttribute("href", "/reservations")
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login")
  })

  test("applies hover styles to navigation links", () => {
    render(<Header />)

    const homeLink = screen.getByRole("link", { name: "Home" })
    expect(homeLink).toHaveClass("hover:text-yellow-300")
  })
})
