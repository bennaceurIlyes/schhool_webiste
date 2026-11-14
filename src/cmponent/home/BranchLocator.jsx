import React from 'react'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import { schoolInfo } from './homeData'

export default function BranchLocator() {
  return (
    <section className="branch-locator-section" id="location" aria-label="مقر وفروع المدرسة">
      <div className="branch-locator-container">
        {/* Section Header with Clean Plain Kicker (No Pill, No Icon) */}
        <div className="section-title-wrap">
          <span className="section-plain-kicker">مقر المؤسسة</span>
          <h2 className="section-main-title">
            زوروا مقرنا <span className="title-highlight">للتعرف على بيئتنا التعليمية</span>
          </h2>
          <p className="section-subtitle">
            نرحب بأولياء الأمور والطلاب للإجابة على استفساراتكم والاطلاع على قاعات التدريس وتجهيزات المدرسة.
          </p>
        </div>

        <div className="branch-layout-grid">
          {/* Details Card */}
          <div className="branch-info-card">
            <div className="branch-card-header">
              <div className="branch-pin-icon" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="branch-title">المقر الرئيسي: الجزائر الوسطى</h3>
                <div className="branch-status-open">مفتوح لاستقبال الأولياء والتسجيلات</div>
              </div>
            </div>

            <div className="branch-details-list">
              <div className="branch-detail-row">
                <div className="detail-icon" aria-hidden="true"><MapPin size={18} /></div>
                <div className="detail-content">
                  <div className="detail-label">العنوان الكامل</div>
                  <div className="detail-value">{schoolInfo.address}</div>
                </div>
              </div>

              <div className="branch-detail-row">
                <div className="detail-icon" aria-hidden="true"><Clock size={18} /></div>
                <div className="detail-content">
                  <div className="detail-label">أوقات العمل واستقبال الاستفسارات</div>
                  <div className="detail-value">{schoolInfo.hours}</div>
                </div>
              </div>

              <div className="branch-detail-row">
                <div className="detail-icon" aria-hidden="true"><Phone size={18} /></div>
                <div className="detail-content">
                  <div className="detail-label">الهاتف المباشر للإدارة</div>
                  <div className="detail-value" dir="ltr">{schoolInfo.phone}</div>
                </div>
              </div>

              <div className="branch-detail-row">
                <div className="detail-icon" aria-hidden="true"><Mail size={18} /></div>
                <div className="detail-content">
                  <div className="detail-label">البريد الإلكتروني للاتصال</div>
                  <div className="detail-value">{schoolInfo.email}</div>
                </div>
              </div>
            </div>

            <div className="branch-card-action">
              <a
                href="https://maps.google.com/?q=Algiers+Algeria"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-branch-directions"
              >
                <Navigation size={16} />
                <span>فتح الموقع في خرائط Google</span>
              </a>
            </div>
          </div>

          {/* Fully Responsive Map Container - No fixed pixel width */}
          <div className="branch-map-container" role="region" aria-label="خريطة موقع المدرسة التفاعلية">
            <iframe
              title="موقع المدرسة على الخريطة"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102283.47957644917!2d3.0033!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb25a1e2f89b1%3A0x2a1a8c08!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="branch-map-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
