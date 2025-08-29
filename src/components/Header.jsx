import logoUrl from '../assets/logo.png'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <img
          src={logoUrl}
          alt="Little Lemon"
          className="logo"
          width="160"
          height="40"
        />
        <div className="brand">
          <h1 className="sr-only">Little Lemon Restaurant</h1>
          <p aria-hidden="true">Mediterranean • Chicago</p>
        </div>
      </div>
    </header>
  )
}