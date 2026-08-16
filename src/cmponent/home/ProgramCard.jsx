import React from 'react'
import { Link } from 'react-router'
import { Check, ArrowUpLeft, Award } from 'lucide-react'

function RenderProgramIcon({ type }) {
  switch (type) {
    case 'academic':
      return (
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
      )
    case 'language':
      return (
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
      )
    case 'training':
    default:
      return (
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
      )
  }
}

function RenderActionContent({ actionType, actionValue }) {
  if (actionType === 'number') {
    return <span className="action-number">{actionValue || '3'}</span>
  }
  if (actionType === 'award') {
    return <Award size={18} />
  }
  return <ArrowUpLeft size={18} />
}

export default function ProgramCard({ program }) {
  if (!program) return null

  const {
    id,
    type,
    title,
    badge,
    badgeClass,
    cardClass,
    actionClass,
    actionType,
    actionValue,
    link = '/Classes',
    ariaLabel = `استكشف ${title}`,
    description,
    bulletClass,
    features = [],
  } = program

  return (
    <div className={`growth-card ${cardClass || ''}`} data-animate id={id}>
      <div className="card-top-icon-wrap" aria-hidden="true">
        <RenderProgramIcon type={type} />
      </div>

      <div className="card-inner">
        <div className="card-head">
          <h3 className="card-title">{title}</h3>
          {badge && <span className={`card-badge ${badgeClass || ''}`}>{badge}</span>}
        </div>
        <p className="card-desc">{description}</p>
        <ul className="card-features">
          {features.map((feature, index) => (
            <li key={index}>
              <span className={`bullet-check ${bulletClass || ''}`}>
                <Check size={13} strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to={link} className={`card-action-btn ${actionClass || ''}`} aria-label={ariaLabel}>
        <RenderActionContent actionType={actionType} actionValue={actionValue} />
      </Link>
    </div>
  )
}
