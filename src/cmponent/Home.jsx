import React, { useEffect, useRef } from 'react'
import './Home.css'
import { Link } from 'react-router'
import { GraduationCap, Languages, Award, Check, ArrowUpRight, Sparkles, BookOpen, Users, Star, CheckCircle2 } from 'lucide-react'
import studentImg from '../assets/image.png'
import childImg from '../assets/child.png'
import teacherAmira from '../assets/teacher-amira.jpg'
import teacherSarah from '../assets/teacher-sarah.jpg'
import teacherDavid from '../assets/teacher-david.jpg'
import teacherElena from '../assets/teacher-elena.jpg'
import teacherMarcus from '../assets/teacher-marcus.jpg'

const teachers = [
  { id: 't1', name: 'Sarah Benali', image: teacherSarah },
  { id: 't2', name: 'David Moreau', image: teacherDavid },
  { id: 't3', name: 'Elena Rostova', image: teacherElena },
  { id: 't4', name: 'Marcus Chen', image: teacherMarcus },
  { id: 't5', name: 'Amira Al-Mansour', image: teacherAmira },
]

function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    // Hero animations immediate
    const heroEl = heroRef.current
    if (heroEl) {
      const heroItems = heroEl.querySelectorAll('[data-animate]')
      heroItems.forEach((item, i) => {
        item.style.animationDelay = `${i * 0.12}s`
        item.classList.add('anim-ready')
      })
    }

    // Scroll-triggered animations for other sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-ready')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const allAnimated = document.querySelectorAll('.growth-section [data-animate], .growth-card, .growth-header, .growth-stats-bar, .growth-center-child')
    allAnimated.forEach((el, index) => {
      el.style.animationDelay = `${(index % 4) * 0.12}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-wrapper">

      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="nav-logo">
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
          <span className="nav-logo-text">Académie Al-Khwarizmi</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link active" id="nav-home">Home</Link>
          <Link to="/Classes" className="nav-link" id="nav-classes">Classes</Link>
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

      {/* ===== Everything Your Child Needs to Grow (Figma Redesign) ===== */}
      <section className="growth-section" id="programs">
        <div className="growth-container">

          {/* Section Header */}
          <div className="growth-header" data-animate>
            <div className="growth-eyebrow">
              <span className="growth-eyebrow-icon">🎓</span>
              <span>All School Levels</span>
            </div>
            <h2 className="growth-title">
              Everything <span className="title-highlight">Your Child</span> Needs to Grow
              <span className="growth-sparkle-doodle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D9A441" />
                </svg>
              </span>
            </h2>
            <p className="growth-subtitle">
              From school lessons to practical skills, we provide a complete learning journey that builds knowledge, confidence and real opportunities.
            </p>
          </div>

          {/* Main Interactive Stage */}
          <div className="growth-stage">

            {/* Doodles & Connector Lines */}
            <div className="growth-doodle doodle-lightbulb" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 6C17.37 6 12 11.37 12 18C12 22.38 14.34 26.22 17.82 28.32V32C17.82 32.55 18.27 33 18.82 33H29.18C29.73 33 30.18 32.55 30.18 32V28.32C33.66 26.22 36 22.38 36 18C36 11.37 30.63 6 24 6Z" stroke="#D9A441" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M20 37H28M22 41H26" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 2V0M10 10L8 8M38 10L40 8M6 24H4M44 24H42" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="growth-doodle doodle-plane" aria-hidden="true">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <path d="M6 26L46 6L32 46L24 30L6 26Z" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" fill="rgba(219, 234, 254, 0.3)" />
                <path d="M46 6L24 30" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 36C18 42 28 44 38 40" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Connecting Curving Dashed Lines (SVG) */}
            <svg className="growth-connectors-svg" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 190 C 500 240, 500 280, 500 320" stroke="#D9A441" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
              <path d="M280 340 C 350 350, 420 370, 470 410" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
              <path d="M720 340 C 650 350, 580 370, 530 410" stroke="#10B981" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
            </svg>

            {/* 1. TOP CARD — Academic Support */}
            <div className="growth-card growth-card--academic" data-animate id="program-academic">
              <div className="card-top-icon-wrap" aria-hidden="true">
                <div className="icon-3d icon-3d--mortarboard">
                  <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="48" rx="20" ry="6" fill="#1E293B" fillOpacity="0.12" />
                    <path d="M32 14L60 26L32 38L4 26L32 14Z" fill="#1E3A8A" />
                    <path d="M32 14L60 26L32 33L4 26L32 14Z" fill="#2563EB" />
                    <path d="M14 31.5V45C14 45 22 51 32 51C42 51 50 45 50 45V31.5L32 39L14 31.5Z" fill="#1D4ED8" />
                    <path d="M14 31.5V42C14 42 22 48 32 48C42 48 50 42 50 42V31.5L32 38L14 31.5Z" fill="#3B82F6" />
                    {/* Golden Tassel */}
                    <circle cx="32" cy="26" r="2.5" fill="#F59E0B" />
                    <path d="M32 26C38 27 52 30 54 39" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    <rect x="52" y="39" width="4" height="9" rx="1.5" fill="#D97706" />
                  </svg>
                </div>
              </div>

              <div className="card-inner">
                <div className="card-head">
                  <h3 className="card-title">Academic Support</h3>
                  <span className="card-badge badge-gold">ALL LEVELS</span>
                </div>
                <p className="card-desc">
                  Students who struggle in class go from failing grades to passing — in the same term. We work on the exact subjects your child needs, not a generic programme.
                </p>
                <ul className="card-features">
                  <li>
                    <span className="bullet-check bullet-gold"><Check size={13} strokeWidth={3} /></span>
                    <span>Targeted subject help</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-gold"><Check size={13} strokeWidth={3} /></span>
                    <span>Better grades in one term</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-gold"><Check size={13} strokeWidth={3} /></span>
                    <span>Build lasting confidence</span>
                  </li>
                </ul>
              </div>

              <Link to="/Classes" className="card-action-btn action-gold" aria-label="Explore Academic Support">
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* 2. LEFT CARD — Language Courses */}
            <div className="growth-card growth-card--language" data-animate id="program-language">
              <div className="card-top-icon-wrap" aria-hidden="true">
                <div className="icon-3d icon-3d--languages">
                  <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="52" rx="22" ry="5" fill="#1E293B" fillOpacity="0.12" />
                    {/* Big Bubble */}
                    <rect x="6" y="10" width="36" height="30" rx="10" fill="#7C3AED" />
                    <rect x="6" y="10" width="36" height="27" rx="10" fill="#8B5CF6" />
                    <path d="M14 40L10 47L22 40H14Z" fill="#7C3AED" />
                    <text x="24" y="28" fill="white" fontSize="18" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">A</text>
                    {/* Small Bubble with Flag/Globe */}
                    <circle cx="44" cy="34" r="16" fill="#6D28D9" />
                    <circle cx="44" cy="32" r="15" fill="#A78BFA" />
                    {/* Mini Flag Motif */}
                    <rect x="36" y="25" width="5" height="14" rx="1" fill="#3B82F6" />
                    <rect x="41" y="25" width="6" height="14" fill="#FFFFFF" />
                    <rect x="47" y="25" width="5" height="14" rx="1" fill="#EF4444" />
                  </svg>
                </div>
              </div>

              <div className="card-inner">
                <div className="card-head">
                  <h3 className="card-title">Language Courses</h3>
                  <span className="card-badge badge-purple">3 LANGUAGES</span>
                </div>
                <p className="card-desc">
                  Arabic, French, or English — spoken confidently after one semester. Structured for children, teens, and adult beginners.
                </p>
                <ul className="card-features">
                  <li>
                    <span className="bullet-check bullet-purple"><Check size={13} strokeWidth={3} /></span>
                    <span>Kids, Teens &amp; Adults</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-purple"><Check size={13} strokeWidth={3} /></span>
                    <span>Interactive conversation</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-purple"><Check size={13} strokeWidth={3} /></span>
                    <span>Real communication &amp; fluency</span>
                  </li>
                </ul>
              </div>

              <Link to="/Classes" className="card-action-btn action-purple" aria-label="Explore Language Courses">
                <span className="action-number">3</span>
              </Link>
            </div>

            {/* 3. RIGHT CARD — Practical Training */}
            <div className="growth-card growth-card--training" data-animate id="program-training">
              <div className="card-top-icon-wrap" aria-hidden="true">
                <div className="icon-3d icon-3d--laptop">
                  <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="52" rx="22" ry="5" fill="#1E293B" fillOpacity="0.12" />
                    {/* Screen */}
                    <rect x="12" y="12" width="40" height="28" rx="4" fill="#065F46" />
                    <rect x="14" y="14" width="36" height="22" rx="2" fill="#047857" />
                    <rect x="17" y="17" width="30" height="16" rx="1" fill="#10B981" />
                    {/* Code lines */}
                    <rect x="20" y="20" width="12" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
                    <rect x="20" y="24" width="18" height="2" rx="1" fill="#D1FAE5" />
                    <rect x="20" y="28" width="15" height="2" rx="1" fill="#D1FAE5" />
                    {/* Base */}
                    <path d="M6 40H58L54 46H10L6 40Z" fill="#059669" />
                    <rect x="26" y="41" width="12" height="2" rx="1" fill="#34D399" />
                    {/* Certificate Badge */}
                    <circle cx="48" cy="18" r="8" fill="#F59E0B" />
                    <path d="M46 18L48 20L51 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="card-inner">
                <div className="card-head">
                  <h3 className="card-title">Practical Training</h3>
                  <span className="card-badge badge-teal">CERTIFICATE</span>
                </div>
                <p className="card-desc">
                  Computer skills, sewing, and applied trades. Each course ends with a recognised certificate you can present to an employer.
                </p>
                <ul className="card-features">
                  <li>
                    <span className="bullet-check bullet-teal"><Check size={13} strokeWidth={3} /></span>
                    <span>Hands-on practical projects</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-teal"><Check size={13} strokeWidth={3} /></span>
                    <span>Job-ready applied skills</span>
                  </li>
                  <li>
                    <span className="bullet-check bullet-teal"><Check size={13} strokeWidth={3} /></span>
                    <span>Professional certificate included</span>
                  </li>
                </ul>
              </div>

              <Link to="/Classes" className="card-action-btn action-teal" aria-label="Explore Practical Training">
                <Award size={18} />
              </Link>
            </div>

            {/* CENTER VISUAL: Studious Child */}
            <div className="growth-center-child" data-animate>
              <div className="child-backdrop-glow" aria-hidden="true" />
              <img
                src={childImg}
                alt="Student studying with books and laptop at Académie Al-Khwarizmi"
                className="growth-child-image"
                loading="eager"
                decoding="async"
              />
            </div>

          </div>

          {/* Bottom Statistics Trust Strip */}
          <div className="growth-stats-bar" data-animate>
            <div className="stat-pill-item">
              <div className="stat-icon-wrap stat-icon--blue">
                <GraduationCap size={22} strokeWidth={2.2} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-number">1,200+</div>
                <div className="stat-label">Students Supported</div>
              </div>
            </div>

            <div className="stat-divider" aria-hidden="true" />

            <div className="stat-pill-item">
              <div className="stat-icon-wrap stat-icon--gold">
                <Star size={20} strokeWidth={2.2} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction &amp; Passing</div>
              </div>
            </div>

            <div className="stat-divider" aria-hidden="true" />

            <div className="stat-pill-item">
              <div className="stat-icon-wrap stat-icon--navy">
                <Users size={20} strokeWidth={2.2} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-number">50+</div>
                <div className="stat-label">Expert Teachers</div>
              </div>
            </div>

            <div className="stat-divider" aria-hidden="true" />

            <div className="stat-pill-item">
              <div className="stat-icon-wrap stat-icon--teal">
                <CheckCircle2 size={20} strokeWidth={2.2} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-number">Certified</div>
                <div className="stat-label">Quality Programs</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== Our Teachers Section ===== */}
      <section className="teachers" id="teachers">
        <div className="teachers-container">
          <h2 className="teachers-heading">Our Teachers</h2>
        </div>

        <div className="teachers-viewport">
          <div className="teachers-track">
            {/* First set of cards */}
            {teachers.map((teacher, index) => (
              <div className="teacher-card" key={`teacher-1-${index}`}>
                <div className="teacher-img-wrap">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="teacher-img"
                    loading="lazy"
                  />
                </div>
                <div className="teacher-info">
                  <span className="teacher-name">{teacher.name}</span>
                </div>
              </div>
            ))}
            {/* Duplicate set for infinite seamless loop */}
            {teachers.map((teacher, index) => (
              <div className="teacher-card" key={`teacher-2-${index}`} aria-hidden="true">
                <div className="teacher-img-wrap">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="teacher-img"
                    loading="lazy"
                  />
                </div>
                <div className="teacher-info">
                  <span className="teacher-name">{teacher.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home