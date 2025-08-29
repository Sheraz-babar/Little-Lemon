import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { signupSchema } from '../lib/authSchemas.js'
import useTitle from '../lib/useTitle.js'

export default function SignUp() {
  useTitle('Sign up')
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/'

  React.useEffect(() => {
    if (user) navigate(redirect, { replace: true })
  }, [user, navigate, redirect])

  const [form, setForm] = React.useState({ name: '', email: '', password: '', confirm: '' })
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
    const parsed = signupSchema.safeParse(form)
    if (!parsed.success) {
      const map = {}
      parsed.error.issues.forEach(i => { map[i.path[0]] = i.message })
      setErrors(map)
      setStatus('Please fix the errors below.')
      return
    }
    try {
      await signUp(parsed.data)
      navigate(redirect, { replace: true })
    } catch (err) {
      setStatus(err.message || 'Could not sign up.')
      setErrors(prev => ({ ...prev, email: err.message }))
    }
  }

  return (
    <section className="container stack">
      <h2>Create your account</h2>
      <p>Sign up to save your details and book faster next time.</p>

      {status && <div role="alert" className="alert">{status}</div>}

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Full name<span aria-hidden="true"> *</span></label>
          <input
            id="name" name="name" type="text" autoComplete="name" required
            value={form.name} onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && <p id="name-err" className="error" role="alert">{errors.name}</p>}
        </div>

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
              autoComplete="new-password" required
              value={form.password} onChange={onChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-err' : 'password-help'}
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
          <p id="password-help" className="help">At least 8 chars, with upper, lower and a number.</p>
          {errors.password && <p id="password-err" className="error" role="alert">{errors.password}</p>}
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirm password<span aria-hidden="true"> *</span></label>
          <input
            id="confirm" name="confirm" type={show ? 'text' : 'password'}
            autoComplete="new-password" required
            value={form.confirm} onChange={onChange}
            aria-invalid={Boolean(errors.confirm)}
            aria-describedby={errors.confirm ? 'confirm-err' : undefined}
          />
          {errors.confirm && <p id="confirm-err" className="error" role="alert">{errors.confirm}</p>}
        </div>

        <div className="actions">
          <button className="btn" type="submit">Create account</button>
        </div>
      </form>
    </section>
  )
}
