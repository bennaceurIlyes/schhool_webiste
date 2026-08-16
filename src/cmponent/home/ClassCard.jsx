import React from 'react'
import { Link } from 'react-router'
import { User, Clock, BookOpen, FlaskConical, Monitor, ArrowLeft } from 'lucide-react'

function RenderSubjectIcon({ iconType, categoryTheme }) {
  switch (iconType) {
    case 'math':
      return (
        <div className={`subject-icon-box theme-box--${categoryTheme}`}>
          <span className="math-symbol">√x</span>
        </div>
      )
    case 'english':
      return (
        <div className={`subject-icon-box theme-box--${categoryTheme}`}>
          <div className="abc-symbol">
            <span>A</span>
            <span>B C</span>
          </div>
        </div>
      )
    case 'arabic':
      return (
        <div className={`subject-icon-box theme-box--${categoryTheme}`}>
          <BookOpen size={20} strokeWidth={2.2} />
        </div>
      )
    case 'physics':
      return (
        <div className={`subject-icon-box theme-box--${categoryTheme}`}>
          <FlaskConical size={20} strokeWidth={2.2} />
        </div>
      )
    case 'computer':
    default:
      return (
        <div className={`subject-icon-box theme-box--${categoryTheme}`}>
          <Monitor size={20} strokeWidth={2.2} />
        </div>
      )
  }
}

export default function ClassCard({ classItem }) {
  if (!classItem) return null

  const {
    id,
    title,
    level,
    description,
    teacher,
    hours,
    category,
    categoryTheme = 'blue',
    iconType,
    image,
    ribbonColor = '#3B82F6',
  } = classItem

  return (
    <Link
      to={`/Classes?class=${id}`}
      className="class-card"
      data-animate
      id={id}
      aria-label={`التسجيل في دورة ${title} - ${level}`}
    >
      {/* Card Image with Bookmark Ribbon */}
      <div className="class-card-image-wrap">
        <img
          src={image}
          alt={`${title} - ${level}`}
          className="class-card-img"
          loading="lazy"
        />
        <div
          className="class-bookmark-ribbon"
          style={{ backgroundColor: ribbonColor }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="class-card-body">
        {/* Subject Header */}
        <div className="class-card-header">
          <RenderSubjectIcon iconType={iconType} categoryTheme={categoryTheme} />
          <div className="class-card-titles">
            <h3 className="class-subject-title">{title}</h3>
            <span className={`class-level-badge theme-text--${categoryTheme}`}>
              {level}
            </span>
            <p className="class-short-desc">{description}</p>
          </div>
        </div>

        {/* Metadata: Teacher & Hours */}
        <div className="class-card-meta">
          <div className="meta-item">
            <User size={15} className="meta-icon" />
            <span className="meta-text">{teacher}</span>
          </div>
          <span className="meta-divider" aria-hidden="true">|</span>
          <div className="meta-item">
            <Clock size={15} className="meta-icon" />
            <span className="meta-text">{hours}</span>
          </div>
        </div>

        {/* Category Pill Tag & S'inscrire Action */}
        <div className="class-card-footer">
          <span className={`class-category-tag theme-tag--${categoryTheme}`}>
            <span>{category}</span>
            <span className="card-enroll-hint">
              <span>سجّل الآن</span>
              <ArrowLeft size={12} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
