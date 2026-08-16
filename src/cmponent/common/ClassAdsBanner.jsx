import React, { useState, useEffect } from 'react'
import {
  Megaphone,
  Sparkles,
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
          background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)',
          borderRadius: '24px',
          padding: '24px 28px',
          color: '#FFFFFF',
          boxShadow: '0 16px 36px rgba(37, 99, 235, 0.22)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Ambient Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '20%',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
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
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Megaphone size={18} />
            </div>
            <div>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#93C5FD',
                  display: 'block',
                }}
              >
                إعلانات رسمية وتحديثات حية
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{title}</h3>
            </div>
          </div>

          {displayAds.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#BFDBFE', fontWeight: '700' }}>
                {currentIndex + 1} / {displayAds.length}
              </span>
              <button
                onClick={handlePrev}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
                aria-label="السابق"
                type="button"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
                aria-label="التالي"
                type="button"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Current Active Ad Card Box */}
        {(() => {
          const ad = displayAds[currentIndex]
          if (!ad) return null

          return (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '18px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {/* Ad Title & Category Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: '#F59E0B',
                      color: '#78350F',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11.5px',
                      fontWeight: '800',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Flame size={13} />
                    <span>{ad.category || 'أفواج ودروس جديدة'}</span>
                  </span>

                  {ad.spotsLeft && (
                    <span
                      style={{
                        background: '#EF4444',
                        color: '#FFFFFF',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11.5px',
                        fontWeight: '800',
                      }}
                    >
                      🔥 متبقي {ad.spotsLeft} مقاعد فقط
                    </span>
                  )}
                </div>

                <span style={{ fontSize: '12px', color: '#BFDBFE' }}>{ad.date}</span>
              </div>

              <h4 style={{ fontSize: '17px', fontWeight: '800', margin: '4px 0 0', lineHeight: '1.4' }}>
                {ad.title}
              </h4>

              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', margin: 0 }}>
                {ad.content}
              </p>

              {/* Class Info Pills Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                  background: 'rgba(0, 0, 0, 0.15)',
                  padding: '12px 14px',
                  borderRadius: '12px',
                }}
              >
                {ad.teacherName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <User size={14} color="#93C5FD" />
                    <span>الأستاذ: <strong>{ad.teacherName}</strong></span>
                  </div>
                )}
                {ad.schedule && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <Clock size={14} color="#93C5FD" />
                    <span>التوقيت: <strong>{ad.schedule}</strong></span>
                  </div>
                )}
                {ad.groupName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <Calendar size={14} color="#93C5FD" />
                    <span>الفوج: <strong>{ad.groupName}</strong></span>
                  </div>
                )}
                {ad.price && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <DollarSign size={14} color="#FDE047" />
                    <span style={{ color: '#FDE047' }}>الرسوم: <strong>{ad.price}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Button: Enroll to this class directly */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>
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
                    background: '#F59E0B',
                    color: '#1E293B',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '10px 22px',
                    fontWeight: '800',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Sparkles size={16} />
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
