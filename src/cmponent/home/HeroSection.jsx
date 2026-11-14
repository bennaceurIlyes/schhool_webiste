import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react'
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
  } = data || {}

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-content">
        {/* Plain letter-spaced kicker text - NO background shape, NO border-radius pill, NO icon */}
        <div className="hero-plain-kicker" data-animate>
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

        {/* Primary CTA + Secondary CTA */}
        <div className="hero-actions" data-animate>
          {primaryCta && (
            <Link to={primaryCta.link} className="btn-primary" id="hero-cta-programs">
              <span>تصفح البرامج</span>
              <ArrowLeft size={16} />
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.link} className="btn-secondary" id="hero-cta-contact">
              <Phone size={16} />
              <span>اتصل بنا</span>
            </Link>
          )}
        </div>

        {/* ONE real trust indicator (accreditation / years running / student count): no fake avatars */}
        <div className="hero-real-trust" data-animate>
          <ShieldCheck size={18} className="trust-icon" />
          <span>مؤسسة تعليمية معتمدة • أكثر من 12 عاماً في المرافقة المدرسية وتفوق الطلاب</span>
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
          width="480"
          height="540"
          id="hero-student-image"
        />
        {/* Real factual tags (not generic ratings) */}
        <div className="hero-badge hero-badge-top" aria-hidden="true">
          <span className="badge-text">فصول محدودة لا تتجاوز 12 تلميذاً</span>
        </div>
        <div className="hero-badge hero-badge-bottom" aria-hidden="true">
          <span className="badge-text">نسبة نجاح 98% في الامتحانات الرسمية</span>
        </div>
      </div>
    </section>
  )
}
