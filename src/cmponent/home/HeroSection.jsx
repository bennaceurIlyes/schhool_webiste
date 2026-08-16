import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { heroData as defaultHeroData } from './homeData'

export default function HeroSection({ data = defaultHeroData }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const heroEl = heroRef.current
    if (heroEl) {
      const heroItems = heroEl.querySelectorAll('[data-animate]')
      heroItems.forEach((item, i) => {
        item.style.animationDelay = `${i * 0.12}s`
        item.classList.add('anim-ready')
      })
    }
  }, [])

  const {
    eyebrow = defaultHeroData.eyebrow,
    title = defaultHeroData.title,
    titleAccent = defaultHeroData.titleAccent,
    description = defaultHeroData.description,
    primaryCta = defaultHeroData.primaryCta,
    secondaryCta = defaultHeroData.secondaryCta,
    studentImage = defaultHeroData.studentImage,
    studentImageAlt = defaultHeroData.studentImageAlt,
    badges = defaultHeroData.badges,
  } = data || {}

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-content">
        <div className="hero-eyebrow" data-animate>
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </div>

        <h1 className="hero-title" data-animate>
          {title.includes('\n') ? (
            title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            title
          )}{' '}
          <span className="title-accent">{titleAccent}</span>
        </h1>

        <p className="hero-desc" data-animate>
          {description}
        </p>

        <div className="hero-actions" data-animate>
          {primaryCta && (
            <Link to={primaryCta.link} className="btn-primary" id="hero-cta-programs">
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.link} className="btn-secondary" id="hero-cta-contact">
              {secondaryCta.label}
            </Link>
          )}
          <Link
            to="/dashboard"
            className="btn-secondary"
            style={{ borderColor: '#93C5FD', color: '#2563EB', background: '#EFF6FF' }}
            id="hero-cta-dashboard"
          >
            📊 لوحة التحكم
          </Link>
        </div>
      </div>

      <div className="hero-visual" data-animate>
        <div className="hero-blob" aria-hidden="true" />
        <img
          src={studentImage}
          alt={studentImageAlt}
          className="hero-student-img"
          loading="eager"
          decoding="async"
          id="hero-student-image"
        />
        {badges && badges.map((badge) => (
          <div
            key={badge.id || badge.text}
            className={`hero-badge hero-badge-${badge.position}`}
            aria-hidden="true"
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-text">{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
