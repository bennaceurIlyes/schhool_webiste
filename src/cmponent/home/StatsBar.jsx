import React from 'react'
import { GraduationCap, Star, Users, CheckCircle2 } from 'lucide-react'
import { statsData as defaultStatsData } from './homeData'

function RenderStatIcon({ iconType }) {
  switch (iconType) {
    case 'graduation':
      return <GraduationCap size={22} strokeWidth={2.2} />
    case 'star':
      return <Star size={20} strokeWidth={2.2} />
    case 'users':
      return <Users size={20} strokeWidth={2.2} />
    case 'check-circle':
    default:
      return <CheckCircle2 size={20} strokeWidth={2.2} />
  }
}

export default function StatsBar({ stats = defaultStatsData }) {
  return (
    <div className="growth-stats-bar" data-animate>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.id || index}>
          <div className="stat-pill-item">
            <div className={`stat-icon-wrap ${stat.iconClass || ''}`}>
              <RenderStatIcon iconType={stat.iconType} />
            </div>
            <div className="stat-text-wrap">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
          {index < stats.length - 1 && <div className="stat-divider" aria-hidden="true" />}
        </React.Fragment>
      ))}
    </div>
  )
}
