"use client"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl lg:text-3xl font-bold hover:text-yellow-300 transition-colors">
            Little Lemon
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6 xl:space-x-8">
            <li>
              <Link href="/" className="hover:text-yellow-300 transition-colors text-sm xl:text-base font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-300 transition-colors text-sm xl:text-base font-medium">
                About
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-yellow-300 transition-colors text-sm xl:text-base font-medium">
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/reservations"
                className="hover:text-yellow-300 transition-colors text-sm xl:text-base font-medium"
              >
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-yellow-300 transition-colors text-sm xl:text-base font-medium">
                Login
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-green-600">
            <ul className="space-y-3 pt-4">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 rounded-md hover:bg-green-600 hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 rounded-md hover:bg-green-600 hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="block py-2 px-3 rounded-md hover:bg-green-600 hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="block py-2 px-3 rounded-md hover:bg-green-600 hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block py-2 px-3 rounded-md hover:bg-green-600 hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
