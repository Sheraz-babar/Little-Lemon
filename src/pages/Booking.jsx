import React from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingSchema, formatLocalDate } from '../lib/bookingSchema.js'
import useTitle from '../lib/useTitle.js'

function generateTimes(start = '17:00', end = '22:00', stepMin = 30) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const startMinutes = sh * 60 + sm
  const endMinutes = eh * 60 + em
  const out = []
  for (let m = startMinutes; m <= endMinutes; m += stepMin) {
    const h = String(Math.floor(m / 60)).padStart(2, '0')
    const mm = String(m % 60).padStart(2, '0')
    out.push(`${h}:${mm}`)
  }
  return out
}

export default function Booking() {
  useTitle('Book a table')
  const navigate = useNavigate()
  const todayStr = formatLocalDate()

  const timeOptions = React.useMemo(() => generateTimes('17:00', '22:00', 30), [])
  const [form, setForm] = React.useState({
    date: todayStr,
    time: timeOptions[0] ?? '',
    diners: 2,
    request: '',
  })
  const [errors, setErrors] = React.useState({})
  const [errorSummary, setErrorSummary] = React.useState('')

  // Refs for focus management
  const dateRef = React.useRef(null)
  const timeRef = React.useRef(null)
  const dinersRef = React.useRef(null)
  const requestRef = React.useRef(null)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'diners' ? value.replace(/[^\d]/g, '') : value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function focusFirstError(errs) {
    const order = ['date', 'time', 'diners', 'request']
    for (const key of order) {
      if (errs[key]) {
        const map = { date: dateRef, time: timeRef, diners: dinersRef, request: requestRef }
        map[key]?.current?.focus()
        break
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const parsed = bookingSchema.safeParse({
      date: form.date,
      time: form.time,
      diners: form.diners,
      request: form.request,
    })

    if (!parsed.success) {
      const errs = {}
      parsed.error.issues.forEach(i => {
        const k = i.path[0]
        errs[k] = i.message
      })
      setErrors(errs)
      setErrorSummary('Please correct the highlighted fields.')
      focusFirstError(errs)
      return
    }

    const booking = parsed.data
    try { sessionStorage.setItem('lastBooking', JSON.stringify(booking)) } catch {}

    navigate('/confirmation', { state: { booking } })
  }

  return (
    <section className="container stack">
      <h2>Book a table</h2>
      <p>Choose your date, time, number of diners, and add an optional request. Max 12 diners per table.</p>

      {errorSummary ? (
        <div role="alert" aria-live="polite" className="alert">
          {errorSummary}
        </div>
      ) : null}

      <form className="form" onSubmit={handleSubmit} noValidate>
        {/* Date */}
        <div className="field">
          <label htmlFor="date">Date<span aria-hidden="true"> *</span></label>
          <input
            ref={dateRef}
            type="date"
            id="date"
            name="date"
            required
            min={todayStr}
            value={form.date}
            onChange={onChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className="error" role="alert">{errors.date}</p>
          )}
        </div>

        {/* Time */}
        <div className="field">
          <label htmlFor="time">Time<span aria-hidden="true"> *</span></label>
          <select
            ref={timeRef}
            id="time"
            name="time"
            required
            value={form.time}
            onChange={onChange}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'time-error' : undefined}
          >
            <option value="">Select a time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.time && (
            <p id="time-error" className="error" role="alert">{errors.time}</p>
          )}
        </div>

        {/* Diners */}
        <div className="field">
          <label htmlFor="diners">Number of diners<span aria-hidden="true"> *</span></label>
          <input
            ref={dinersRef}
            type="number"
            id="diners"
            name="diners"
            inputMode="numeric"
            min="1"
            max="12"
            required
            value={form.diners}
            onChange={onChange}
            aria-invalid={Boolean(errors.diners)}
            aria-describedby={errors.diners ? 'diners-error' : undefined}
          />
          {errors.diners && (
            <p id="diners-error" className="error" role="alert">{errors.diners}</p>
          )}
        </div>

        {/* Request */}
        <div className="field">
          <label htmlFor="request">Personal request <span className="muted">(optional)</span></label>
          <textarea
            ref={requestRef}
            id="request"
            name="request"
            rows="4"
            maxLength={280}
            value={form.request}
            onChange={onChange}
            aria-invalid={Boolean(errors.request)}
            aria-describedby={errors.request ? 'request-error' : undefined}
            placeholder="E.g., Window seat, high chair, birthday surprise…"
          />
          <div className="help">
            {form.request.length}/280
          </div>
          {errors.request && (
            <p id="request-error" className="error" role="alert">{errors.request}</p>
          )}
        </div>

        <div className="actions">
          <button type="submit" className="btn">Confirm booking</button>
        </div>
      </form>
    </section>
  )
}
