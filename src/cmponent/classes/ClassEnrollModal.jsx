import React, { useState } from 'react'
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
  Info,
  DollarSign,
  GraduationCap,
} from 'lucide-react'
import { schoolInfo } from '../home/homeData'

export default function ClassEnrollModal({ classItem, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    groupPreference: 'weekend',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [registrationCode, setRegistrationCode] = useState('')

  if (!isOpen || !classItem) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate backend submission
    setTimeout(() => {
      const randomCode = `AK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setRegistrationCode(randomCode)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleResetAndClose = () => {
    setIsSubmitted(false)
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      groupPreference: 'weekend',
      notes: '',
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleResetAndClose} role="dialog" aria-modal="true">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={handleResetAndClose}
          aria-label="Fermer la fenêtre"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          /* ===== STEP 1: Registration Form ===== */
          <div className="modal-content">
            {/* Header / Summary of selected class */}
            <div className="modal-class-preview">
              <div className="preview-img-wrap">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="preview-img"
                />
                <span
                  className="preview-ribbon"
                  style={{ backgroundColor: classItem.ribbonColor || '#3B82F6' }}
                >
                  {classItem.category}
                </span>
              </div>

              <div className="preview-details">
                <div className="preview-eyebrow">
                  <GraduationCap size={15} />
                  <span>Inscription au cours</span>
                </div>
                <h3 className="preview-title">{classItem.title}</h3>
                <span className="preview-level">{classItem.level}</span>
                
                <div className="preview-badges">
                  <span className="info-chip">
                    <User size={13} />
                    {classItem.teacher}
                  </span>
                  <span className="info-chip">
                    <Clock size={13} />
                    {classItem.hours}
                  </span>
                  {classItem.price && (
                    <span className="info-chip chip-price">
                      <DollarSign size={13} />
                      {classItem.price}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Explanatory banner */}
            <div className="modal-info-banner">
              <Info size={18} className="info-icon" />
              <p>
                Remplissez ce formulaire pour <strong>réserver votre place</strong>. Pour valider définitivement l'inscription, vous devez vous présenter à l'école pour effectuer le paiement.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="enroll-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="studentName">
                    Nom et Prénom de l'élève <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={17} className="input-icon" />
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      placeholder="Ex: Yacine Benali"
                      required
                      value={formData.studentName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">
                    Nom du parent / Tuteur <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={17} className="input-icon" />
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      placeholder="Ex: Mohamed Benali"
                      required
                      value={formData.parentName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Numéro de Téléphone (WhatsApp) <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={17} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Ex: 0555 12 34 56"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Adresse E-mail
                  </label>
                  <div className="input-with-icon">
                    <Mail size={17} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ex: parent@exemple.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="groupPreference">
                    Créneau horaire souhaité
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={17} className="input-icon" />
                    <select
                      id="groupPreference"
                      name="groupPreference"
                      value={formData.groupPreference}
                      onChange={handleInputChange}
                    >
                      <option value="weekend">Groupe Week-end (Vendredi / Samedi)</option>
                      <option value="weekday">Groupe Semaine (Après-midi 16h-18h)</option>
                      <option value="morning">Groupe Matin (09h-12h)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">
                    Remarques ou besoins particuliers (optionnel)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    placeholder="Ex: Besoin d'un renforcement particulier en algèbre..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleResetAndClose}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-submit-enroll"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Enregistrement en cours...</span>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      <span>Confirmer la Pré-inscription</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ===== STEP 2: Submission Success & Mandatory School Payment Alert ===== */
          <div className="modal-success-content">
            <div className="success-icon-wrap">
              <CheckCircle2 size={44} className="success-check-icon" />
            </div>

            <h3 className="success-title">Pré-inscription Enregistrée !</h3>
            <p className="success-subtitle">
              Votre demande a bien été prise en compte par notre système.
            </p>

            {/* CRITICAL ALERT BOX: MUST PAY AT SCHOOL TO CONFIRM */}
            <div className="mandatory-payment-alert">
              <div className="alert-badge">
                <AlertTriangle size={20} className="alert-icon" />
                <span>Confirmation Obligatoire à l'École</span>
              </div>
              <p className="alert-main-text">
                ⚠️ <strong>Attention :</strong> Votre place pour <strong>{classItem.title}</strong> est réservée temporairement pour une durée de <strong>48 heures</strong>.
              </p>
              <p className="alert-action-text">
                Pour <strong>confirmer définitivement votre inscription</strong>, vous devez impérativement vous présenter à l'administration de l'Académie pour effectuer le paiement des frais de scolarité.
              </p>
            </div>

            {/* Registration Receipt Summary */}
            <div className="receipt-summary-box">
              <div className="receipt-row">
                <span className="receipt-label">Numéro de Dossier :</span>
                <span className="receipt-value receipt-code">{registrationCode}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Élève :</span>
                <span className="receipt-value">{formData.studentName}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Classe :</span>
                <span className="receipt-value">{classItem.title} ({classItem.level})</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Enseignant :</span>
                <span className="receipt-value">{classItem.teacher}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Tarif :</span>
                <span className="receipt-value receipt-price">{classItem.price || '4,500 DZD / mois'}</span>
              </div>
            </div>

            {/* School Office Location & Hours */}
            <div className="school-visit-info">
              <div className="school-info-item">
                <MapPin size={16} className="school-info-icon" />
                <div>
                  <strong>Adresse de l'école :</strong>
                  <p>{schoolInfo.address}</p>
                </div>
              </div>
              <div className="school-info-item">
                <Clock size={16} className="school-info-icon" />
                <div>
                  <strong>Horaires de l'administration :</strong>
                  <p>{schoolInfo.hours}</p>
                </div>
              </div>
              <div className="school-info-item">
                <Phone size={16} className="school-info-icon" />
                <div>
                  <strong>Assistance téléphonique :</strong>
                  <p>{schoolInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Actions: Print Receipt & Close */}
            <div className="success-modal-actions">
              <button
                type="button"
                className="btn-print-receipt"
                onClick={handlePrint}
              >
                <Printer size={16} />
                <span>Imprimer la fiche</span>
              </button>
              <button
                type="button"
                className="btn-finish"
                onClick={handleResetAndClose}
              >
                J'ai compris &amp; Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
