import React from 'react'
import { Link } from 'react-router'
import { GraduationCap, LayoutGrid, ArrowRight } from 'lucide-react'
import ClassCard from './ClassCard'
import {
  classesHeaderData as defaultHeaderData,
  classesData as defaultClassesData,
} from './homeData'

export default function ClassesSection({
  headerData = defaultHeaderData,
  classes = defaultClassesData,
}) {
  const {
    title = defaultHeaderData.title,
    subtitle = defaultHeaderData.subtitle,
    ctaText = defaultHeaderData.ctaText,
    ctaLink = defaultHeaderData.ctaLink,
  } = headerData || {}

  return (
    <section className="classes-section" id="our-classes">
      <div className="classes-container">

        {/* Section Header */}
        <div className="classes-header" data-animate>
          <div className="classes-top-badge" aria-hidden="true">
            <GraduationCap size={20} className="classes-badge-icon" />
          </div>

          <h2 className="classes-title">
            <span className="sparkle-ornament ornament-left">✦</span>
            {title}
            <span className="sparkle-ornament ornament-right">✦</span>
          </h2>

          <p className="classes-subtitle">{subtitle}</p>

          {/* Decorative Divider */}
          <div className="classes-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
        </div>

        {/* Classes Cards Grid */}
        <div className="classes-grid">
          {classes.map((item) => (
            <ClassCard key={item.id} classItem={item} />
          ))}
        </div>

        {/* See More Classes CTA Button */}
        {ctaText && (
          <div className="classes-action-wrap" data-animate>
            <Link to={ctaLink} className="btn-see-more-classes" id="btn-more-classes">
              <LayoutGrid size={18} className="cta-grid-icon" />
              <span>{ctaText}</span>
              <ArrowRight size={18} className="cta-arrow-icon" />
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
