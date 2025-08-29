import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Booking from '../Booking.jsx'
import Confirmation from '../Confirmation.jsx'
import { formatLocalDate } from '../../lib/bookingSchema.js'

function renderWithRoutes(initial = '/booking') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Booking form', () => {
  test('shows validation for past date and invalid diners', async () => {
    renderWithRoutes()
    const user = userEvent.setup()

    // Set date to yesterday
    const dateInput = screen.getByLabelText(/date/i)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    await user.clear(dateInput)
    await user.type(dateInput, formatLocalDate(yesterday))

    // Set diners to 0 (invalid)
    const dinersInput = screen.getByLabelText(/number of diners/i)
    await user.clear(dinersInput)
    await user.type(dinersInput, '0')

    // Submit
    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    // Errors should appear
    expect(await screen.findByText(/date cannot be in the past/i)).toBeInTheDocument()
    expect(await screen.findByText(/at least 1 diner/i)).toBeInTheDocument()
  })

  test('successful submission goes to Confirmation and shows details', async () => {
    renderWithRoutes()
    const user = userEvent.setup()

    const dateInput = screen.getByLabelText(/date/i)
    const timeSelect = screen.getByLabelText(/time/i)
    const dinersInput = screen.getByLabelText(/number of diners/i)
    const requestTextarea = screen.getByLabelText(/personal request/i)

    // Use a future date to avoid min constraints
    const future = new Date()
    future.setDate(future.getDate() + 7)
    await user.clear(dateInput)
    await user.type(dateInput, formatLocalDate(future))

    // Choose a time (whatever first option is fine)
    // Select already has a default, but changing assures it's set
    await user.selectOptions(timeSelect, timeSelect.querySelectorAll('option')[1].value)

    await user.clear(dinersInput)
    await user.type(dinersInput, '4')
    await user.type(requestTextarea, 'Window seat please')

    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    // On confirmation page
    expect(await screen.findByRole('heading', { name: /booking confirmed/i })).toBeInTheDocument()
    expect(screen.getByText(/diners/i).nextSibling.textContent).toMatch(/4/)
    expect(screen.getByText(/personal request/i).nextSibling.textContent).toMatch(/window seat/i)
  })
})
