import { render, screen } from "@testing-library/react"
import HomePage from "../app/page.jsx"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the components
jest.mock("../components/Header.jsx", () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>
  }
})

jest.mock("../components/Footer.jsx", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>
  }
})

describe("HomePage", () => {
  test("renders homepage with header and footer", () => {
    render(<HomePage />)

    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  test("displays hero section with restaurant information", () => {
    render(<HomePage />)

    expect(screen.getByRole("heading", { name: "Little Lemon" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Chicago" })).toBeInTheDocument()
    expect(screen.getByText(/family owned Mediterranean restaurant/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /reserve a table/i })).toBeInTheDocument()
  })

  test("displays specialties section with menu items", () => {
    render(<HomePage />)

    expect(screen.getByRole("heading", { name: "Our Specialties" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Greek Salad" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Bruschetta" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Lemon Dessert" })).toBeInTheDocument()
  })

  test("displays menu item prices", () => {
    render(<HomePage />)

    expect(screen.getByText("$12.99")).toBeInTheDocument()
    expect(screen.getByText("$8.99")).toBeInTheDocument()
    expect(screen.getByText("$6.99")).toBeInTheDocument()
  })

  test("displays menu item images with proper alt text", () => {
    render(<HomePage />)

    expect(screen.getByAltText("Greek Salad")).toBeInTheDocument()
    expect(screen.getByAltText("Bruschetta")).toBeInTheDocument()
    expect(screen.getByAltText("Lemon Dessert")).toBeInTheDocument()
  })

  test("uses semantic HTML structure", () => {
    render(<HomePage />)

    expect(screen.getByRole("main")).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(3) // Three menu items
  })
})
