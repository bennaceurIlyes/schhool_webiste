import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import Navbar from './common/Navbar'
import ClassEnrollModal from './classes/ClassEnrollModal'
import { classesData as defaultClassesList } from './home/homeData'
import './Classes.css'
import {
  Search,
  BookOpen,
  User,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react'
import { normalizeArabic } from '../utils/security'

const CATEGORY_WHITELIST = ['all', 'الرياضيات', 'اللغات', 'العلوم', 'التكنولوجيا']

export default function Classes({ classesList = defaultClassesList }) {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalClass, setActiveModalClass] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Auto-open modal if URL has ?class=class-id securely
  useEffect(() => {
    const classIdFromUrl = searchParams.get('class')
    if (classIdFromUrl && typeof classIdFromUrl === 'string') {
      const sanitizedId = classIdFromUrl.slice(0, 50).trim()
      const found = classesList.find((c) => c.id === sanitizedId)
      if (found) {
        setActiveModalClass(found)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, classesList])

  const categories = [
    { id: 'all', label: 'جميع المواد' },
    { id: 'الرياضيات', label: 'الرياضيات' },
    { id: 'اللغات', label: 'اللغات' },
    { id: 'العلوم', label: 'العلوم' },
    { id: 'التكنولوجيا', label: 'التكنولوجيا' },
  ]

  const handleSearchChange = (e) => {
    // Limit search query length to 60 characters to avoid client-side freezing
    const cleanVal = e.target.value.slice(0, 60)
    setSearchQuery(cleanVal)
  }

  const handleCategorySelect = (catId) => {
    if (CATEGORY_WHITELIST.includes(catId)) {
      setSelectedCategory(catId)
    }
  }

  // Normalized intelligent Arabic search
  const normalizedQuery = normalizeArabic(searchQuery)

  const filteredClasses = classesList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory

    if (!matchesCategory) return false
    if (!normalizedQuery) return true

    const normalizedTitle = normalizeArabic(item.title)
    const normalizedTeacher = normalizeArabic(item.teacher)
    const normalizedLevel = normalizeArabic(item.level)
    const normalizedCat = normalizeArabic(item.category)
    const normalizedDesc = normalizeArabic(item.description)

    return (
      normalizedTitle.includes(normalizedQuery) ||
      normalizedTeacher.includes(normalizedQuery) ||
      normalizedLevel.includes(normalizedQuery) ||
      normalizedCat.includes(normalizedQuery) ||
      normalizedDesc.includes(normalizedQuery)
    )
  })

  const handleOpenEnrollModal = (classItem) => {
    setActiveModalClass(classItem)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setActiveModalClass(null)
  }

  return (
    <div className="classes-page-wrapper">
      <Navbar />

      {/* ===== Hero Header ===== */}
      <section className="classes-page-hero">
        <div className="hero-shape-blob blob-1" aria-hidden="true" />
        <div className="hero-shape-blob blob-2" aria-hidden="true" />

        <div className="classes-page-container">
          <div className="classes-hero-badge">
            <GraduationCap size={16} />
            <span>السنة الدراسية 2026 / 2027</span>
          </div>

          <h1 className="classes-page-title">
            استكشف فصولنا و<span className="title-highlight">سجّل الآن</span>
          </h1>

          <p className="classes-page-desc">
            دروس دعم وتقوية مدرسية مركزة، دورات لغات تفاعلية وورشات تكنولوجية تطبيقية بإشراف نخبة من أفضل الأساتذة ذوي الخبرة.
          </p>

          {/* Search & Filter Toolbar */}
          <div className="classes-toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="ابحث عن مادة، أستاذ، أو مستوى دراسي..."
                value={searchQuery}
                maxLength={60}
                onChange={handleSearchChange}
                aria-label="البحث في الفصول والدروس"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="مسح نص البحث"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="category-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  type="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Classes Catalog Grid ===== */}
      <section className="classes-catalog-section">
        <div className="classes-page-container">

          <div className="catalog-header-bar">
            <h2 className="catalog-count-title">
              {filteredClasses.length} {filteredClasses.length > 1 ? 'فصول متاحة' : 'فصل متاح'}
            </h2>
            <div className="payment-notice-pill">
              <Sparkles size={14} />
              <span>تسجيل أولي عبر الموقع + تأكيد الحجز في إدارة المدرسة</span>
            </div>
          </div>

          {filteredClasses.length > 0 ? (
            <div className="catalog-grid">
              {filteredClasses.map((item) => (
                <div className="catalog-card" key={item.id}>
                  {/* Card Image */}
                  <div className="catalog-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="catalog-card-img"
                      loading="lazy"
                    />
                    <div
                      className="catalog-bookmark-ribbon"
                      style={{ backgroundColor: item.ribbonColor || '#3B82F6' }}
                    >
                      <span className="ribbon-text">{item.category}</span>
                    </div>

                    {item.spotsLeft && (
                      <div className="spots-badge">
                        <span className="spots-dot" />
                        {item.spotsLeft} مقاعد متبقية
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="catalog-card-body">
                    <div className="catalog-card-header">
                      <h3 className="catalog-subject-title">{item.title}</h3>
                      <span className={`catalog-level-badge theme-text--${item.categoryTheme || 'blue'}`}>
                        {item.level}
                      </span>
                      <p className="catalog-desc">{item.description}</p>
                    </div>

                    {/* Meta Specifications */}
                    <div className="catalog-specs-grid">
                      <div className="spec-item">
                        <User size={15} className="spec-icon" />
                        <span>{item.teacher}</span>
                      </div>
                      <div className="spec-item">
                        <Clock size={15} className="spec-icon" />
                        <span>{item.hours}</span>
                      </div>
                      {item.schedule && (
                        <div className="spec-item spec-full">
                          <Calendar size={15} className="spec-icon" />
                          <span>{item.schedule}</span>
                        </div>
                      )}
                      {item.room && (
                        <div className="spec-item spec-full">
                          <MapPin size={15} className="spec-icon" />
                          <span>{item.room}</span>
                        </div>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="catalog-card-footer">
                      <div className="price-block">
                        <span className="price-label">الرسوم</span>
                        <span className="price-amount">{item.price || '4,500 دج / شهر'}</span>
                      </div>

                      <button
                        className="btn-enroll-action"
                        onClick={() => handleOpenEnrollModal(item)}
                        id={`btn-enroll-${item.id}`}
                        type="button"
                      >
                        <span>سجّل الآن</span>
                        <ArrowLeft size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <BookOpen size={48} className="empty-icon" />
              <h3>لم يتم العثور على أي فصل</h3>
              <p>يرجى تجربة كلمات بحث أخرى أو تغيير تصنيف الفلترة.</p>
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                type="button"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ===== Registration & Payment Confirmation Modal ===== */}
      <ClassEnrollModal
        classItem={activeModalClass}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}