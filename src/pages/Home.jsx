import { Link } from 'react-router-dom'
import useTitle from '../lib/useTitle.js'

export default function Home() {
  useTitle('Home')
  return (
    <article className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <h2 id="hero-title">Little Lemon</h2>
            <p className="subtitle">Mediterranean flavors, seasonal ingredients.</p>
            <p>
              Enjoy cozy dining in the heart of Chicago with dishes inspired by the
              shores of the Mediterranean—fresh, bright, and made with care.
            </p>
            <p>
              <Link className="btn" to="/booking" aria-label="Go to booking form">
                Book a table
              </Link>
            </p>
          </div>
          <figure className="hero-figure">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop"
              alt="A table at Little Lemon set with Mediterranean dishes"
              width="600"
              height="400"
              loading="eager"
            />
            <figcaption className="sr-only">Table setting with Mediterranean dishes</figcaption>
          </figure>
        </div>
      </section>

      <section className="highlights" aria-labelledby="highlights-title">
        <div className="container">
          <h3 id="highlights-title">Today’s highlights</h3>
          <ul className="cards" role="list">
            <li className="card">
              <h4>Grilled Sea Bass</h4>
              <p>Herb marinade, lemon, capers.</p>
            </li>
            <li className="card">
              <h4>Roasted Eggplant Mezze</h4>
              <p>Smoky, creamy, served with warm pita.</p>
            </li>
            <li className="card">
              <h4>Preserved Lemon Tart</h4>
              <p>Tangy curd, shortcrust, cream.</p>
            </li>
          </ul>
        </div>
      </section>
    </article>
  )
}
