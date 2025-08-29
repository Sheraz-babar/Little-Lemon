export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>Little Lemon</strong>
          <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
        </div>
        <address>
          123 Greenway, Chicago, IL<br />
          <a href="tel:+13125550123">(312) 555-0123</a>
        </address>
        <nav aria-label="Footer">
          <ul>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Catering</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
