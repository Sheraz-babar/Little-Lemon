import React from 'react'
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { loginSchema } from '../lib/authSchemas.js'
import useTitle from '../lib/useTitle.js'

export default function Login() {
  useTitle('Log in')
  const { user, logIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || location.state?.from || '/'

  React.useEffect(() => {
    if (user) navigate(redirect, { replace: true })
  }, [user, navigate, redirect])

  const [form, setForm] = React.useState({ email: '', password: '' })
  const [errors, setErrors] = React.useState({})
  const [status, setStatus] = React.useState('')
  const [show, setShow] = React.useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('')
    const parsed = loginSchema.safeParse(form)
    if (!parsed.success) {
      const map = {}
      parsed.error.issues.forEach(i => { map[i.path[0]] = i.message })
      setErrors(map)
      setStatus('Please fix the errors below.')
      return
    }
    try {
      await logIn(parsed.data)
      navigate(redirect, { replace: true })
    } catch (err) {
      setStatus(err.message || 'Could not log in.')
      setErrors(prev => ({ ...prev, email: ' ', password: err.message })) // attach to password field
    }
  }

  return (
    <section className="container stack">
      <h2>Log in</h2>
      <p>Welcome back to Little Lemon.</p>

      {status && <div role="alert" className="alert">{status}</div>}

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email<span aria-hidden="true"> *</span></label>
          <input
            id="email" name="email" type="email" autoComplete="email" required
            value={form.email} onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && <p id="email-err" className="error" role="alert">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password<span aria-hidden="true"> *</span></label>
          <div className="password-wrap">
            <input
              id="password" name="password" type={show ? 'text' : 'password'}
              autoComplete="current-password" required
              value={form.password} onChange={onChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-err' : undefined}
            />
            <button
              type="button"
              className="toggle"
              aria-pressed={show}
              aria-label={show ? 'Hide password' : 'Show password'}
              onClick={() => setShow(s => !s)}
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p id="password-err" className="error" role="alert">{errors.password}</p>}
        </div>

        <div className="actions">
          <button className="btn" type="submit">Log in</button>
        </div>

        <p className="help">
          Don’t have an account? <Link to={`/signup?redirect=${encodeURIComponent(redirect)}`}>Sign up</Link>
        </p>
      </form>
    </section>
  )
}
