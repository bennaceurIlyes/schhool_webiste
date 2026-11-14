import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from './common/Navbar'
import HeroSection from './home/HeroSection'
import SubjectMarquee from './home/SubjectMarquee'
import GrowthSection from './home/GrowthSection'
import SchoolFeatures from './home/SchoolFeatures'
import ClassesSection from './home/ClassesSection'
import TeachersSection from './home/TeachersSection'
import WhyChooseUs from './home/WhyChooseUs'
import TestimonialsSection from './home/TestimonialsSection'
import SchoolFaq from './home/SchoolFaq'
import BranchLocator from './home/BranchLocator'
import Footer from './common/Footer'
import ClassAdsBanner from './common/ClassAdsBanner'
import ClassEnrollModal from './classes/ClassEnrollModal'

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
  const [activeModalClass, setActiveModalClass] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Scroll-triggered reveal animations via native IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-ready')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const allAnimated = document.querySelectorAll(
      '.growth-section [data-animate], .growth-card, .growth-header, .growth-stats-bar, .growth-center-child, .classes-section [data-animate], .class-card, .classes-header, .classes-action-wrap, .feature-card, .testimonial-card, .faq-item-card, .branch-info-card'
    )
    allAnimated.forEach((el, index) => {
      el.style.animationDelay = `${(index % 4) * 0.08}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleOpenEnrollModal = (classItem) => {
    setActiveModalClass(classItem)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setActiveModalClass(null)
  }

  return (
    <div className="page-wrapper">
      {/* ===== 1. Reusable Top Navigation Bar ===== */}
      <Navbar />

      {/* ===== 2. Hero Section w/ Headline, CTAs & Real Trust Indicator ===== */}
      <HeroSection data={heroData} />

      {/* ===== 3. Subject Marquee (Math, Languages, Tech, Sciences) ===== */}
      <SubjectMarquee />

      {/* ===== 4. Live Announcements & Cohorts Banner ===== */}
      <div style={{ marginTop: '24px' }}>
        <ClassAdsBanner onEnrollClick={handleOpenEnrollModal} title="📢 إعلانات الأفواج المفتوحة للتسجيل الفوري" />
      </div>

      {/* ===== 5. 3 Core Subject Streams & Center Visual & Stats Bar ===== */}
      <GrowthSection
        headerData={growthHeaderData}
        programs={programsData}
        visualData={growthVisualData}
        stats={statsData}
      />

      {/* ===== 6. 4 School Value Props (Small Inline Numbers, No Vertical Connectors) ===== */}
      <SchoolFeatures />

      {/* ===== 7. Classes Catalog Section ===== */}
      <ClassesSection
        headerData={classesHeaderData}
        classes={classesData}
      />

      {/* ===== 8. Academic Faculty Marquee ===== */}
      <TeachersSection teachers={teachersData} />

      {/* ===== 9. Factual Comparison Panel (Why Families Choose Us) ===== */}
      <WhyChooseUs />

      {/* ===== 10. Parent & Student Testimonials (Sample Drafts) ===== */}
      <TestimonialsSection />

      {/* ===== 11. School FAQs Accordion (Tap Targets >= 44px) ===== */}
      <SchoolFaq />

      {/* ===== 12. Branch Locator & Real Interactive Map ===== */}
      <BranchLocator />

      {/* ===== 13. Pre-Footer Final CTA + Comprehensive Site Footer ===== */}
      <Footer />

      {/* ===== 14. Registration Modal ===== */}
      <ClassEnrollModal
        classItem={activeModalClass}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Home