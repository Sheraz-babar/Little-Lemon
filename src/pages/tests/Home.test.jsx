import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home.jsx'

function renderWithRouter(ui) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

test('renders Home hero content and “Book a table” CTA', () => {
  renderWithRouter(<Home />)
  expect(screen.getByRole('heading', { name: /little lemon/i })).toBeInTheDocument()
  const cta = screen.getByRole('link', { name: /book a table/i })
  expect(cta).toBeInTheDocument()
  expect(cta).toHaveAttribute('href', '/booking')
})
