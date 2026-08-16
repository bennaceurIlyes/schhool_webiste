import React, { useState, useEffect, useCallback } from 'react'
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
  AlertCircle,
} from 'lucide-react'
import { schoolInfo } from '../home/homeData'
import {
  sanitizeInput,
  isValidName,
  isValidPhone,
  isValidEmail,
} from '../../utils/security'

const ALLOWED_GROUPS = ['weekend', 'weekday', 'morning']

export default function ClassEnrollModal({ classItem, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    groupPreference: 'weekend',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [registrationCode, setRegistrationCode] = useState('')

  const handleResetAndClose = useCallback(() => {
    setIsSubmitted(false)
    setIsSubmitting(false)
    setErrors({})
    setSubmittedData(null)
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      groupPreference: 'weekend',
      notes: '',
    })
    onClose()
  }, [onClose])

  // Handle ESC key and prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleResetAndClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, handleResetAndClose])

  if (!isOpen || !classItem) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    // Limit live typing length for security
    const maxLengths = {
      studentName: 60,
      parentName: 60,
      phone: 20,
      email: 100,
      groupPreference: 20,
      notes: 500,
    }

    const maxLen = maxLengths[name] || 100
    const sliced = value.slice(0, maxLen)

    setFormData((prev) => ({ ...prev, [name]: sliced }))

    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // 1. Validate Student Name
    const cleanStudent = formData.studentName.trim()
    if (!cleanStudent) {
      newErrors.studentName = 'يرجى إدخال اسم ولقب التلميذ'
    } else if (!isValidName(cleanStudent)) {
      newErrors.studentName = 'يرجى إدخال اسم صحيح يحتوي على حروف فقط (بين 2 و 60 حرفاً)'
    }

    // 2. Validate Parent Name
    const cleanParent = formData.parentName.trim()
    if (!cleanParent) {
      newErrors.parentName = 'يرجى إدخال اسم الولي أو الوصي'
    } else if (!isValidName(cleanParent)) {
      newErrors.parentName = 'يرجى إدخال اسم ولي صحيح يحتوي على حروف فقط'
    }

    // 3. Validate Phone Number
    const cleanPhone = formData.phone.trim()
    if (!cleanPhone) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف'
    } else if (!isValidPhone(cleanPhone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح (مثال: 0555123456 أو 0655123456)'
    }

    // 4. Validate Email (Optional)
    const cleanEmail = formData.email.trim()
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      newErrors.email = 'يرجى إدخال عنوان بريد إلكتروني صالح (مثال: name@domain.com)'
    }

    // 5. Validate Group Enum
    if (!ALLOWED_GROUPS.includes(formData.groupPreference)) {
      newErrors.groupPreference = 'يرجى اختيار فترة زمنية صالحة'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm() || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    // Sanitize all inputs securely before processing
    const cleanSubmission = {
      studentName: sanitizeInput(formData.studentName, 60),
      parentName: sanitizeInput(formData.parentName, 60),
      phone: sanitizeInput(formData.phone, 20),
      email: sanitizeInput(formData.email, 100),
      groupPreference: ALLOWED_GROUPS.includes(formData.groupPreference)
        ? formData.groupPreference
        : 'weekend',
      notes: sanitizeInput(formData.notes, 500),
    }

    // Simulate backend submission safely
    setTimeout(() => {
      const randomCode = `AK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setRegistrationCode(randomCode)
      setSubmittedData(cleanSubmission)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={handleResetAndClose}
          aria-label="إغلاق النافذة"
          type="button"
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
                  <span>التسجيل في الفصل الدراسي</span>
                </div>
                <h3 className="preview-title" id="modal-title">{classItem.title}</h3>
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
                املأ هذه الاستمارة لـ <strong>حجز مقعدك مبدئياً</strong>. لتأكيد التسجيل بصفة رسمية، يرجى التوجه إلى إدارة المدرسة لإتمام عملية الدفع.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="enroll-form" noValidate>
              <div className="form-grid">
                
                {/* Student Name */}
                <div className={`form-group ${errors.studentName ? 'has-error' : ''}`}>
                  <label htmlFor="studentName">
                    الاسم واللقب للتلميذ <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={17} className="input-icon" />
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      placeholder="مثال: ياسين بن علي"
                      required
                      maxLength={60}
                      autoComplete="name"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      aria-invalid={errors.studentName ? 'true' : 'false'}
                      aria-describedby={errors.studentName ? 'error-studentName' : undefined}
                    />
                  </div>
                  {errors.studentName && (
                    <span className="field-error-msg" id="error-studentName">
                      <AlertCircle size={13} />
                      <span>{errors.studentName}</span>
                    </span>
                  )}
                </div>

                {/* Parent Name */}
                <div className={`form-group ${errors.parentName ? 'has-error' : ''}`}>
                  <label htmlFor="parentName">
                    اسم الولي / الوصي القانوني <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={17} className="input-icon" />
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      placeholder="مثال: محمد بن علي"
                      required
                      maxLength={60}
                      value={formData.parentName}
                      onChange={handleInputChange}
                      aria-invalid={errors.parentName ? 'true' : 'false'}
                      aria-describedby={errors.parentName ? 'error-parentName' : undefined}
                    />
                  </div>
                  {errors.parentName && (
                    <span className="field-error-msg" id="error-parentName">
                      <AlertCircle size={13} />
                      <span>{errors.parentName}</span>
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone">
                    رقم الهاتف (واتساب) <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={17} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="مثال: 0555 12 34 56"
                      required
                      maxLength={20}
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                    />
                  </div>
                  {errors.phone && (
                    <span className="field-error-msg" id="error-phone">
                      <AlertCircle size={13} />
                      <span>{errors.phone}</span>
                    </span>
                  )}
                </div>

                {/* Email (Optional) */}
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <div className="input-with-icon">
                    <Mail size={17} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="مثال: parent@example.com"
                      maxLength={100}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <span className="field-error-msg" id="error-email">
                      <AlertCircle size={13} />
                      <span>{errors.email}</span>
                    </span>
                  )}
                </div>

                {/* Group Preference */}
                <div className="form-group full-width">
                  <label htmlFor="groupPreference">
                    الفترة الزمنية المفضلة
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={17} className="input-icon" />
                    <select
                      id="groupPreference"
                      name="groupPreference"
                      value={formData.groupPreference}
                      onChange={handleInputChange}
                    >
                      <option value="weekend">مجموعة نهاية الأسبوع (الجمعة / السبت)</option>
                      <option value="weekday">مجموعة أيام الأسبوع (مساءً 16:00 - 18:00)</option>
                      <option value="morning">مجموعة الفترة الصباحية (09:00 - 12:00)</option>
                    </select>
                  </div>
                </div>

                {/* Notes (Optional) */}
                <div className="form-group full-width">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label htmlFor="notes">
                      ملاحظات أو احتياجات خاصة (اختياري)
                    </label>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                      {formData.notes.length}/500
                    </span>
                  </div>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    maxLength={500}
                    placeholder="مثال: يحتاج التلميذ لمتابعة خاصة في الجبر وحل المسائل..."
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
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn-submit-enroll"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>جاري التحقق وتسجيل الطلب...</span>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      <span>تأكيد التسجيل المبدئي</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ===== STEP 2: Submission Success & Mandatory School Payment Alert ===== */
          <div className="modal-success-content printable-receipt-section">
            <div className="success-icon-wrap no-print">
              <CheckCircle2 size={44} className="success-check-icon" />
            </div>

            <h3 className="success-title">تم تسجيل طلبك المبدئي بنجاح!</h3>
            <p className="success-subtitle no-print">
              تم استلام معلوماتك وحفظ طلب التسجيل في نظام الأكاديمية بنجاح.
            </p>

            {/* CRITICAL ALERT BOX: MUST PAY AT SCHOOL TO CONFIRM */}
            <div className="mandatory-payment-alert">
              <div className="alert-badge">
                <AlertTriangle size={20} className="alert-icon" />
                <span>تأكيد إجباري في مقر الأكاديمية</span>
              </div>
              <p className="alert-main-text">
                ⚠️ <strong>تنبيه هام :</strong> حجز مقعدك في دورة <strong>{classItem.title}</strong> مؤقت لمدة <strong>48 ساعة</strong> فقط.
              </p>
              <p className="alert-action-text">
                لـ <strong>تأكيد التسجيل النهائي وتثبيت المقعد</strong>، يرجى التوجه شخصياً إلى إدارة الأكاديمية لدفع رسوم التسجيل قبل انتهاء المهلة.
              </p>
            </div>

            {/* Registration Receipt Summary */}
            <div className="receipt-summary-box">
              <div className="receipt-row">
                <span className="receipt-label">رقم التسجيل / الملف :</span>
                <span className="receipt-value receipt-code">{registrationCode}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">اسم التلميذ :</span>
                <span className="receipt-value">{submittedData?.studentName || formData.studentName}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">اسم الولي :</span>
                <span className="receipt-value">{submittedData?.parentName || formData.parentName}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">المادة والمستوى :</span>
                <span className="receipt-value">{classItem.title} ({classItem.level})</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">الأستاذ المؤطر :</span>
                <span className="receipt-value">{classItem.teacher}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">الفترة المختارة :</span>
                <span className="receipt-value">
                  {formData.groupPreference === 'weekend'
                    ? 'مجموعة نهاية الأسبوع (الجمعة / السبت)'
                    : formData.groupPreference === 'weekday'
                    ? 'مجموعة أيام الأسبوع (16:00 - 18:00)'
                    : 'مجموعة الفترة الصباحية (09:00 - 12:00)'}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">الرسوم المستحقة :</span>
                <span className="receipt-value receipt-price">{classItem.price || '4,500 دج / شهر'}</span>
              </div>
            </div>

            {/* School Office Location & Hours */}
            <div className="school-visit-info">
              <div className="school-info-item">
                <MapPin size={16} className="school-info-icon" />
                <div>
                  <strong>عنوان المدرسة :</strong>
                  <p>{schoolInfo.address}</p>
                </div>
              </div>
              <div className="school-info-item">
                <Clock size={16} className="school-info-icon" />
                <div>
                  <strong>أوقات عمل الإدارة :</strong>
                  <p>{schoolInfo.hours}</p>
                </div>
              </div>
              <div className="school-info-item">
                <Phone size={16} className="school-info-icon" />
                <div>
                  <strong>هاتف الاستفسار والمساعدة :</strong>
                  <p>{schoolInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Actions: Print Receipt & Close */}
            <div className="success-modal-actions no-print">
              <button
                type="button"
                className="btn-print-receipt"
                onClick={handlePrint}
              >
                <Printer size={16} />
                <span>طباعة وصل التسجيل</span>
              </button>
              <button
                type="button"
                className="btn-finish"
                onClick={handleResetAndClose}
              >
                فهمت ذلك وإغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
