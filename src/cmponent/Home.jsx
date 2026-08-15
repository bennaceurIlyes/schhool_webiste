import React, { useEffect } from 'react'
import './Home.css'
import Navbar from './common/Navbar'
import HeroSection from './home/HeroSection'
import GrowthSection from './home/GrowthSection'
import ClassesSection from './home/ClassesSection'
import TeachersSection from './home/TeachersSection'

function Home({
  heroData,
  growthHeaderData,
  programsData,
  growthVisualData,
  statsData,
  classesHeaderData,
  classesData,
  teachersData,
}) {
  useEffect(() => {
    // Scroll-triggered animations for elements across sections
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

    const allAnimated = document.querySelectorAll(
      '.growth-section [data-animate], .growth-card, .growth-header, .growth-stats-bar, .growth-center-child, .classes-section [data-animate], .class-card, .classes-header, .classes-action-wrap'
    )
    allAnimated.forEach((el, index) => {
      el.style.animationDelay = `${(index % 4) * 0.1}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-wrapper">
      {/* ===== 1. Reusable Top Navigation Bar ===== */}
      <Navbar />

      {/* ===== 2. Hero Section ===== */}
      <HeroSection data={heroData} />

      {/* ===== 3. Everything Your Child Needs to Grow (Programs & Stats) ===== */}
      <GrowthSection
        headerData={growthHeaderData}
        programs={programsData}
        visualData={growthVisualData}
        stats={statsData}
      />

      {/* ===== 4. Our Teachers Marquee Section ===== */}
      <TeachersSection teachers={teachersData} />

      {/* ===== 5. Our Classes Section (Matching Reference Design) ===== */}
      <ClassesSection
        headerData={classesHeaderData}
        classes={classesData}
      />
    </div>
  )
}

export default Home