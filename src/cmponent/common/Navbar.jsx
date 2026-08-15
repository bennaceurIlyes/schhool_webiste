import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

export default function Navbar({
  brandName = 'Académie Al-Khwarizmi',
  ctaText = 'Get Started',
  ctaLink = '/Classes',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', path: '/', id: 'nav-home' },
    { label: 'Classes', path: '/Classes', id: 'nav-classes' },
    { label: 'About Us', path: '/About', id: 'nav-about' },
    { label: 'Contact', path: '/Contact', id: 'nav-contact' },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMobileMenu} aria-label={`${brandName} Home`}>
        <div className="nav-logo-icon">
          <svg width="36" height="36" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <circle cx="17" cy="17" r="17" fill="var(--color-accent-secondary)" />
            <circle cx="17" cy="17" r="17" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.85" />
            <path d="M9 21 L17 11 L25 21" stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M12 21 L12 25" stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M22 21 L22 25" stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M14.5 18 L19.5 18" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="nav-logo-text">{brandName}</span>
      </Link>

      <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive ? 'active' : ''}`}
              id={link.id}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      <Link to={ctaLink} className="nav-cta" id="nav-get-started" onClick={closeMobileMenu}>
        {ctaText}
      </Link>

      <button
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        id="hamburger-btn"
        onClick={toggleMobileMenu}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
