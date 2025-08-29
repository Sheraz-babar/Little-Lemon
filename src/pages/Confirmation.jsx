import { Link, useLocation } from 'react-router-dom'
import useTitle from '../lib/useTitle.js'

function useLastBooking() {
  const loc = useLocation()
  const fromNav = loc.state?.booking
  if (fromNav) return fromNav
  try {
    const raw = sessionStorage.getItem('lastBooking')
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

export default function Confirmation() {
  useTitle('Booking confirmed')
  const booking = useLastBooking()

  if (!booking) {
    return (
      <section className="container stack">
        <h2>Booking not found</h2>
        <p>Looks like we don’t have your booking details yet.</p>
        <p><Link className="btn" to="/booking">Make a booking</Link></p>
      </section>
    )
  }

  return (
    <section className="container stack">
      <h2 role="status" aria-live="polite">Booking confirmed</h2>
      <p>Thanks! Your table is set. A confirmation has been saved for your session.</p>
      <div className="summary">
        <dl>
          <div>
            <dt>Date</dt><dd>{booking.date}</dd>
          </div>
          <div>
            <dt>Time</dt><dd>{booking.time}</dd>
          </div>
          <div>
            <dt>Diners</dt><dd>{booking.diners}</dd>
          </div>
          {booking.request ? (
            <div>
              <dt>Personal request</dt><dd>{booking.request}</dd>
            </div>
          ) : null}
        </dl>
      </div>
      <p>
        <Link to="/booking" className="btn" aria-label="Make another booking">Book another table</Link>
      </p>
    </section>
  )
}
