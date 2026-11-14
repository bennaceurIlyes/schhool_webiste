import React from 'react'
import ProgramCard from './ProgramCard'
import StatsBar from './StatsBar'
import {
  growthHeaderData as defaultHeaderData,
  programsData as defaultProgramsData,
  growthVisualData as defaultVisualData,
  statsData as defaultStatsData,
} from './homeData'

export default function GrowthSection({
  headerData = defaultHeaderData,
  programs = defaultProgramsData,
  visualData = defaultVisualData,
  stats = defaultStatsData,
}) {
  const {
    eyebrowIcon = defaultHeaderData.eyebrowIcon,
    eyebrowText = defaultHeaderData.eyebrowText,
    titlePrefix = defaultHeaderData.titlePrefix,
    titleHighlight = defaultHeaderData.titleHighlight,
    titleSuffix = defaultHeaderData.titleSuffix,
    subtitle = defaultHeaderData.subtitle,
  } = headerData || {}

  const {
    childImage = defaultVisualData.childImage,
    childImageAlt = defaultVisualData.childImageAlt,
  } = visualData || {}

  return (
    <section className="growth-section" id="programs">
      <div className="growth-container">

        {/* Section Header */}
        <div className="growth-header" data-animate>
          <div className="section-plain-kicker">{eyebrowText}</div>
          <h2 className="growth-title">
            {titlePrefix}
            <span className="title-highlight">{titleHighlight}</span>
            {titleSuffix}
            <span className="growth-sparkle-doodle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D9A441" />
              </svg>
            </span>
          </h2>
          <p className="growth-subtitle">{subtitle}</p>
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
              <path d="M6 26L46 6L32 46L24 30L6 26Z" stroke="#3E5F94" strokeWidth="2" strokeLinejoin="round" fill="rgba(221, 227, 238, 0.4)" />
              <path d="M46 6L24 30" stroke="#3E5F94" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 36C18 42 28 44 38 40" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Connecting Curving Dashed Lines (SVG) */}
          <svg className="growth-connectors-svg" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M500 190 C 500 240, 500 280, 500 320" stroke="#D9A441" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
            <path d="M280 340 C 350 350, 420 370, 470 410" stroke="#8C5A9E" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
            <path d="M720 340 C 650 350, 580 370, 530 410" stroke="#3F8F71" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
          </svg>

          {/* Program Cards */}
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}

          {/* CENTER VISUAL: Studious Child */}
          <div className="growth-center-child" data-animate>
            <div className="child-backdrop-glow" aria-hidden="true" />
            <img
              src={childImage}
              alt={childImageAlt}
              className="growth-child-image"
              loading="eager"
              decoding="async"
            />
          </div>

        </div>

        {/* Bottom Statistics Trust Strip */}
        <StatsBar stats={stats} />

      </div>
    </section>
  )
}
