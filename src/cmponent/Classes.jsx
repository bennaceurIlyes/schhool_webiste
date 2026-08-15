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
  ArrowRight,
  GraduationCap,
} from 'lucide-react'

export default function Classes({ classesList = defaultClassesList }) {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalClass, setActiveModalClass] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Auto-open modal if URL has ?class=class-id
  useEffect(() => {
    const classIdFromUrl = searchParams.get('class')
    if (classIdFromUrl) {
      const found = classesList.find((c) => c.id === classIdFromUrl)
      if (found) {
        setActiveModalClass(found)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, classesList])

  const categories = [
    { id: 'all', label: 'Toutes les matières' },
    { id: 'Mathématiques', label: 'Mathématiques' },
    { id: 'Langue', label: 'Langues' },
    { id: 'Sciences', label: 'Sciences' },
    { id: 'Technologie', label: 'Technologie' },
  ]

  const filteredClasses = classesList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
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
            <span>Année Scolaire 2026 / 2027</span>
          </div>

          <h1 className="classes-page-title">
            Explorez Nos Classes &amp;{' '}
            <span className="title-highlight">Inscrivez-vous</span>
          </h1>

          <p className="classes-page-desc">
            Des cours de soutien ciblés, des formations linguistiques vivantes et des ateliers technologiques dispensés par des enseignants de premier plan.
          </p>

          {/* Search & Filter Toolbar */}
          <div className="classes-toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une matière, un enseignant, un niveau..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Rechercher des classes"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer la recherche"
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
                  onClick={() => setSelectedCategory(cat.id)}
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
              {filteredClasses.length} {filteredClasses.length > 1 ? 'Classes disponibles' : 'Classe disponible'}
            </h2>
            <div className="payment-notice-pill">
              <Sparkles size={14} />
              <span>Pré-inscription en ligne + validation à l'école</span>
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
                        {item.spotsLeft} places restantes
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
                        <span className="price-label">Tarif</span>
                        <span className="price-amount">{item.price || '4,500 DZD / mois'}</span>
                      </div>

                      <button
                        className="btn-enroll-action"
                        onClick={() => handleOpenEnrollModal(item)}
                        id={`btn-enroll-${item.id}`}
                      >
                        <span>S'inscrire</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <BookOpen size={48} className="empty-icon" />
              <h3>Aucune classe trouvée</h3>
              <p>Essayez de modifier vos filtres ou votre recherche.</p>
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
              >
                Réinitialiser les filtres
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