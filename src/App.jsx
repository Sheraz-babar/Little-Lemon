import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Nav />
      <main id="main" role="main" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
