import React, { useState } from 'react'
import Navbar from './common/Navbar'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  User,
  AlertCircle,
} from 'lucide-react'
import { schoolInfo } from './home/homeData'
import {
  sanitizeInput,
  isValidName,
  isValidPhone,
  isValidEmail,
} from '../utils/security'

const ALLOWED_SUBJECTS = ['support', 'languages', 'training', 'other']

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'support',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const limits = {
      name: 60,
      phone: 20,
      email: 100,
      subject: 20,
      message: 1000,
    }
    const maxLen = limits[name] || 100
    setFormData((prev) => ({ ...prev, [name]: value.slice(0, maxLen) }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs = {}

    const cleanName = formData.name.trim()
    if (!cleanName) {
      errs.name = 'يرجى إدخال الاسم واللقب'
    } else if (!isValidName(cleanName)) {
      errs.name = 'يرجى إدخال اسم صحيح يحتوي على حروف فقط'
    }

    const cleanPhone = formData.phone.trim()
    if (!cleanPhone) {
      errs.phone = 'يرجى إدخال رقم الهاتف'
    } else if (!isValidPhone(cleanPhone)) {
      errs.phone = 'يرجى إدخال رقم هاتف صحيح (مثال: 0555123456)'
    }

    const cleanEmail = formData.email.trim()
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      errs.email = 'يرجى إدخال عنوان بريد إلكتروني صالح'
    }

    if (!ALLOWED_SUBJECTS.includes(formData.subject)) {
      errs.subject = 'يرجى اختيار موضوع صحيح'
    }

    const cleanMessage = formData.message.trim()
    if (!cleanMessage) {
      errs.message = 'يرجى كتابة نص الرسالة أو الاستفسار'
    } else if (cleanMessage.length < 5) {
      errs.message = 'يرجى كتابة رسالة واضحة تحتوي على 5 أحرف على الأقل'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate() || loading) return

    setLoading(true)

    // Sanitize before submitting
    const cleanData = {
      name: sanitizeInput(formData.name, 60),
      phone: sanitizeInput(formData.phone, 20),
      email: sanitizeInput(formData.email, 100),
      subject: ALLOWED_SUBJECTS.includes(formData.subject) ? formData.subject : 'support',
      message: sanitizeInput(formData.message, 1000),
    }

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero Header */}
      <section className="classes-page-hero">
        <div className="hero-shape-blob blob-1" aria-hidden="true" />
        <div className="hero-shape-blob blob-2" aria-hidden="true" />

        <div className="classes-page-container">
          <div className="classes-hero-badge">
            <Sparkles size={16} />
            <span>تواصل معنا</span>
          </div>

          <h1 className="classes-page-title">
            نحن هنا للإجابة على <span className="title-highlight">جميع استفساراتكم</span>
          </h1>

          <p className="classes-page-desc">
            تواصل مع فريق إدارة المدرسة للاستفسار عن البرامج، تحديد المستوى، أو زيارة مقرنا للتعرف على بيئتنا التعليمية.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
        }}>
          {/* Left Column: Contact Cards & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: '#FFFFFF',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
                معلومات الاتصال المباشر
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '24px', lineHeight: '1.7' }}>
                يسعدنا استقبالكم شخصياً في مقر المدرسة أو الرد على اتصالاتكم ورسائلكم طيلة أيام العمل.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>العنوان والمقر :</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{schoolInfo.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>رقم الهاتف والواتساب :</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px', direction: 'ltr', textAlign: 'right' }}>{schoolInfo.phone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(217, 164, 65, 0.1)',
                    color: '#D9A441',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>البريد الإلكتروني :</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{schoolInfo.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#8B5CF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>أوقات العمل واستقبال الأولياء :</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{schoolInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* School In-Person Notice */}
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '24px',
              borderRadius: '18px',
              color: '#92400E',
            }}>
              <strong style={{ display: 'block', fontSize: '15px', marginBottom: '8px' }}>
                💡 زيارة مقر المدرسة
              </strong>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                يمكنكم الحضور مباشرة إلى مقر المدرسة خلال أوقات العمل الرسمية لإجراء اختبارات تحديد المستوى واستكمال تسجيل أبنائكم في مختلف الأطوار.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div style={{
            background: '#FFFFFF',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
          }}>
            {!submitted ? (
              <>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  أرسل لنا استفسارك
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '28px' }}>
                  املأ النموذج وسيقوم مستشارنا التربوي بالتواصل معكم في أقرب وقت.
                </p>

                <form onSubmit={handleSubmit} className="enroll-form" noValidate>
                  <div className="form-grid">
                    
                    {/* Name */}
                    <div className={`form-group full-width ${errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="contact-name">الاسم واللقب <span className="req">*</span></label>
                      <div className="input-with-icon">
                        <User size={17} className="input-icon" />
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          maxLength={60}
                          autoComplete="name"
                          placeholder="مثال: كريم بن يوسف"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.name && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                      <label htmlFor="contact-phone">رقم الهاتف <span className="req">*</span></label>
                      <div className="input-with-icon">
                        <Phone size={17} className="input-icon" />
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          required
                          maxLength={20}
                          autoComplete="tel"
                          placeholder="مثال: 0555 12 34 56"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.phone && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} />
                          <span>{errors.phone}</span>
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                      <label htmlFor="contact-email">البريد الإلكتروني (اختياري)</label>
                      <div className="input-with-icon">
                        <Mail size={17} className="input-icon" />
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          maxLength={100}
                          autoComplete="email"
                          placeholder="مثال: contact@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.email && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="form-group full-width">
                      <label htmlFor="contact-subject">الموضوع أو التخصص المطلوب</label>
                      <div className="input-with-icon">
                        <MessageSquare size={17} className="input-icon" />
                        <select
                          id="contact-subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="support">دروس الدعم والتقوية المدرسية</option>
                          <option value="languages">دورات اللغات الحية (الإنجليزية / الفرنسية / العربية)</option>
                          <option value="training">التكوين المهني والتطبيقي (الإعلام الآلي والحرف)</option>
                          <option value="other">استفسار عام أو شراكة</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className={`form-group full-width ${errors.message ? 'has-error' : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label htmlFor="contact-message">نص الرسالة أو الاستفسار <span className="req">*</span></label>
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{formData.message.length}/1000</span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows="4"
                        maxLength={1000}
                        placeholder="اكتب استفسارك هنا..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} />
                          <span>{errors.message}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit-enroll"
                    style={{ width: '100%', marginTop: '20px' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>جاري إرسال الرسالة...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>إرسال الاستفسار الآن</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10B981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  شكراً لتواصلك معنا!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                  تم استلام رسالتك بنجاح. سيقوم فريق المدرسة بالتواصل معك هاتفياً أو عبر البريد الإلكتروني في أقرب وقت.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', email: '', subject: 'support', message: '' })
                  }}
                  className="btn-see-more-classes"
                  style={{ margin: '0 auto', display: 'inline-flex' }}
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}