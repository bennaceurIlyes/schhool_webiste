import React, { useEffect, useRef } from 'react'
import './Home.css'
import { Link } from 'react-router'
import studentImg from '../assets/image.png'

function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-animate]')
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * 0.13}s`
      item.classList.add('anim-ready')
    })
    const cards = document.querySelectorAll('.service-card[data-animate]')
    cards.forEach((card, i) => {
      card.style.animationDelay = `${0.55 + i * 0.12}s`
      card.classList.add('anim-ready')
    })
  }, [])

  return (
    <div className="page-wrapper">

      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <circle cx="17" cy="17" r="17" fill="#8BC4F0" fillOpacity="0.25" />
              <circle cx="17" cy="17" r="17" stroke="#8BC4F0" strokeWidth="1.5" />
              <path d="M9 21 L17 11 L25 21" stroke="#172033" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M12 21 L12 25" stroke="#172033" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M22 21 L22 25" stroke="#172033" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M14.5 18 L19.5 18" stroke="#172033" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="nav-logo-text">Académie Al-Khwarizmi</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link active" id="nav-home">Home</Link>
          <Link to="/Classes" className="nav-link" id="nav-programs">Programs</Link>
          <Link to="/About" className="nav-link" id="nav-about">About Us</Link>
          <Link to="/Contact" className="nav-link" id="nav-contact">Contact</Link>
        </div>

        <Link to="/Classes" className="nav-cta" id="nav-get-started">Get Started</Link>

        <button className="hamburger" aria-label="Open navigation menu" id="hamburger-btn">
          <span /><span /><span />
        </button>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero" ref={heroRef} id="hero">
        <div className="hero-content">
          <div className="hero-eyebrow" data-animate>
            <span className="eyebrow-dot" aria-hidden="true" />
            Trusted by families &amp; professionals
          </div>

          <h1 className="hero-title" data-animate>
            Empowering Every Learner<br />
            to Reach Their{' '}
            <span className="title-accent">Full Potential</span>
          </h1>

          <p className="hero-desc" data-animate>
            Quality education, academic support, language learning, and practical training
            for learners of every age — children, students, and adults.
          </p>

          <div className="hero-actions" data-animate>
            <Link to="/Classes" className="btn-primary" id="hero-cta-programs">
              Explore Our Programs
            </Link>
            <Link to="/Contact" className="btn-secondary" id="hero-cta-contact">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="hero-visual" data-animate>
          <div className="hero-blob" aria-hidden="true" />
          <img
            src={studentImg}
            alt="A student at Académie Al-Khwarizmi"
            className="hero-student-img"
            loading="eager"
            decoding="async"
            id="hero-student-image"
          />
          <div className="hero-badge hero-badge-top" aria-hidden="true">
            <span className="badge-icon">🎓</span>
            <span className="badge-text">Academic Support</span>
          </div>
          <div className="hero-badge hero-badge-bottom" aria-hidden="true">
            <span className="badge-icon">📜</span>
            <span className="badge-text">Certified Training</span>
          </div>
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section className="services" id="services">
        <div className="services-inner">

          {/* Featured card — larger visual weight */}
          <div className="service-card service-card--featured" data-animate id="service-academic">
            <span className="service-num">01</span>
            <h3 className="service-title">Academic Support</h3>
            <p className="service-desc">
              Students who struggle in class go from failing grades to passing — in the same term.
              We work on the exact subjects your child needs, not a generic programme.
            </p>
            <div className="service-tag">All school levels</div>
          </div>

          {/* Two stacked cards on the right */}
          <div className="service-stack">
            <div className="service-card service-card--stacked" data-animate id="service-language">
              <span className="service-num">02</span>
              <h3 className="service-title">Language Courses</h3>
              <p className="service-desc">
                Arabic, French, or English — spoken confidently after one semester.
                Structured for children, teens, and adult beginners.
              </p>
              <div className="service-tag">3 languages</div>
            </div>

            <div className="service-card service-card--stacked service-card--accent" data-animate id="service-training">
              <span className="service-num">03</span>
              <h3 className="service-title">Practical Training</h3>
              <p className="service-desc">
                Computer skills, sewing, and applied trades. Each course ends with a
                recognised certificate you can present to an employer.
              </p>
              <div className="service-tag">Certificate included</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home