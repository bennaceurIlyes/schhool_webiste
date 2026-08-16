import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

export default function Navbar({
  brandName = 'المدرسة',
  ctaText = 'سجّل الآن',
  ctaLink = '/Classes',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'الرئيسية', path: '/', id: 'nav-home' },
    { label: 'الصفوف والدروس', path: '/Classes', id: 'nav-classes' },
    { label: 'من نحن', path: '/About', id: 'nav-about' },
    { label: 'اتصل بنا', path: '/Contact', id: 'nav-contact' },
    { label: 'لوحة التحكم (Dashboard)', path: '/dashboard', id: 'nav-dashboard' },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar" aria-label="شريط التنقل الرئيسي">
      <Link to="/" className="nav-logo" onClick={closeMobileMenu} aria-label={`${brandName} - الصفحة الرئيسية`}>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link
          to="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#EEF4FF',
            color: '#2563EB',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '700',
            border: '1px solid #BFDBFE',
            textDecoration: 'none',
          }}
          id="btn-test-dashboard"
          onClick={closeMobileMenu}
        >
          <span>📊 لوحة التحكم</span>
        </Link>

        <Link to={ctaLink} className="nav-cta" id="nav-get-started" onClick={closeMobileMenu}>
          {ctaText}
        </Link>
      </div>

      <button
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        aria-label="تبديل القائمة الرئيسية"
        aria-expanded={mobileMenuOpen}
        id="hamburger-btn"
        onClick={toggleMobileMenu}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
