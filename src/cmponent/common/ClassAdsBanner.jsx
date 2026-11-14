import React, { useState, useEffect } from 'react'
import {
  Megaphone,
  User,
  Clock,
  Calendar,
  DollarSign,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Tag,
} from 'lucide-react'
import { studentService } from '../../utils/studentService'

const getCategoryStyle = (category) => {
  switch (category) {
    case 'الرياضيات':
      return {
        bg: 'var(--subject-math-bg, #F3E4D0)',
        color: 'var(--subject-math-text, #9C5B22)',
        border: 'var(--subject-math-border, #E8C9A0)',
      }
    case 'اللغات':
      return {
        bg: 'var(--subject-lang-bg, #EDE3F0)',
        color: 'var(--subject-lang-text, #6B3F79)',
        border: 'var(--subject-lang-border, #DCC7E0)',
      }
    case 'التكنولوجيا':
      return {
        bg: 'var(--subject-tech-bg, #DCEAE3)',
        color: 'var(--subject-tech-text, #2F6E58)',
        border: 'var(--subject-tech-border, #B9D9CB)',
      }
    case 'العلوم':
      return {
        bg: 'var(--subject-sci-bg, #DDE3EE)',
        color: 'var(--subject-sci-text, #2A4470)',
        border: 'var(--subject-sci-border, #C3CFE0)',
      }
    default:
      return {
        bg: 'var(--color-pill-bg, #F5E9D0)',
        color: 'var(--color-pill-text, #172033)',
        border: 'var(--border-pill, rgba(217, 164, 65, 0.3))',
      }
  }
}

export default function ClassAdsBanner({ onEnrollClick, title = '📢 إعلانات الأفواج المفتوحة للتسجيل المباشر' }) {
  const [announcements, setAnnouncements] = useState(() => studentService.getAnnouncements())
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const unsub = studentService.subscribe(() => {
      setAnnouncements([...studentService.getAnnouncements()])
    })
    return () => unsub()
  }, [])

  const displayAds = announcements

  if (!displayAds || displayAds.length === 0) return null

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayAds.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayAds.length) % displayAds.length)
  }

  return (
    <section className="class-ads-wrapper" style={{ margin: '0 auto', maxWidth: '1180px', padding: '0 24px 32px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #172033 0%, #1e2c45 60%, #141c2c 100%)',
          borderRadius: '24px',
          padding: '26px 30px',
          color: '#FFFFFF',
          boxShadow: '0 20px 48px rgba(23, 32, 51, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(217, 164, 65, 0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(217, 164, 65, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '15%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(217, 164, 65, 0.10) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(217, 164, 65, 0.16)',
                border: '1px solid rgba(217, 164, 65, 0.32)',
                color: 'var(--color-primary, #D9A441)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Megaphone size={19} />
            </div>
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '0.4px',
                  color: 'var(--color-primary, #D9A441)',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                إعلانات رسمية وتحديثات حية
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>{title}</h3>
            </div>
          </div>

          {displayAds.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-accent-secondary, #F0DCA8)', fontWeight: '700' }}>
                الإعلان {currentIndex + 1} من {displayAds.length}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={handlePrev}
                  style={{
                    background: 'rgba(217, 164, 65, 0.12)',
                    border: '1px solid rgba(217, 164, 65, 0.28)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F7EFE3',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(217, 164, 65, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(217, 164, 65, 0.12)')}
                  aria-label="السابق"
                  type="button"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    background: 'rgba(217, 164, 65, 0.12)',
                    border: '1px solid rgba(217, 164, 65, 0.28)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F7EFE3',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(217, 164, 65, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(217, 164, 65, 0.12)')}
                  aria-label="التالي"
                  type="button"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Active Ad Card Box */}
        {(() => {
          const ad = displayAds[currentIndex]
          if (!ad) return null

          const catStyle = getCategoryStyle(ad.category)

          return (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                borderRadius: '18px',
                padding: '22px 24px',
                border: '1px solid rgba(217, 164, 65, 0.22)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Ad Title & Category Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: catStyle.bg,
                      color: catStyle.color,
                      border: `1px solid ${catStyle.border}`,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '800',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tag size={13} />
                    <span>{ad.category || 'أفواج ودروس جديدة'}</span>
                  </span>

                  {ad.spotsLeft && (
                    <span
                      style={{
                        background: 'rgba(178, 59, 46, 0.18)',
                        color: '#FCA5A5',
                        border: '1px solid rgba(178, 59, 46, 0.35)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '11.5px',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Flame size={13} />
                      <span>متبقي {ad.spotsLeft} مقاعد فقط</span>
                    </span>
                  )}
                </div>

                <span style={{ fontSize: '12.5px', color: 'rgba(247, 239, 227, 0.75)' }}>{ad.date}</span>
              </div>

              <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0, lineHeight: '1.45', color: '#FFFFFF' }}>
                {ad.title}
              </h4>

              <p style={{ fontSize: '14px', color: 'rgba(247, 239, 227, 0.88)', lineHeight: '1.65', margin: 0 }}>
                {ad.content}
              </p>

              {/* Class Info Pills Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '12px',
                  background: 'rgba(23, 32, 51, 0.55)',
                  border: '1px solid rgba(217, 164, 65, 0.18)',
                  padding: '14px 16px',
                  borderRadius: '14px',
                }}
              >
                {ad.teacherName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#F7EFE3' }}>
                    <User size={15} color="var(--color-primary, #D9A441)" />
                    <span>الأستاذ: <strong style={{ color: '#FFFFFF' }}>{ad.teacherName}</strong></span>
                  </div>
                )}
                {ad.schedule && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#F7EFE3' }}>
                    <Clock size={15} color="var(--color-primary, #D9A441)" />
                    <span>التوقيت: <strong style={{ color: '#FFFFFF' }}>{ad.schedule}</strong></span>
                  </div>
                )}
                {ad.groupName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#F7EFE3' }}>
                    <Calendar size={15} color="var(--color-primary, #D9A441)" />
                    <span>الفوج: <strong style={{ color: '#FFFFFF' }}>{ad.groupName}</strong></span>
                  </div>
                )}
                {ad.price && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#F7EFE3' }}>
                    <DollarSign size={15} color="var(--color-primary, #D9A441)" />
                    <span>الرسوم: <strong style={{ color: 'var(--color-accent-secondary, #F0DCA8)', fontWeight: '800' }}>{ad.price}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Button: Enroll to this class directly */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '4px',
                }}
              >
                <span style={{ fontSize: '12.5px', color: 'rgba(247, 239, 227, 0.7)' }}>
                  ✍️ نشر بواسطة: {ad.author || 'إدارة المدرسة'}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (onEnrollClick) {
                      onEnrollClick({
                        id: ad.courseId || `ad-class-${ad.id}`,
                        title: ad.courseName || ad.title,
                        teacher: ad.teacherName || 'أستاذ المادة',
                        level: ad.targetAudience || 'جميع المستويات',
                        schedule: ad.schedule || 'حسب الفوج المختار',
                        price: ad.price || '4,500 دج / شهر',
                        category: ad.category || 'الرياضيات',
                        description: ad.content,
                      })
                    }
                  }}
                  style={{
                    background: 'var(--color-primary, #D9A441)',
                    color: 'var(--color-navy, #172033)',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '11px 24px',
                    fontWeight: '800',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 16px rgba(217, 164, 65, 0.35)',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary-hover, #c49033)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary, #D9A441)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>سجّل في هذا الفوج الآن</span>
                  <ArrowLeft size={15} />
                </button>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
