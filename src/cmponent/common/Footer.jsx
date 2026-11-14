import React from 'react'
import { Link } from 'react-router'
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
} from 'lucide-react'
import { schoolInfo } from '../home/homeData'
import schoolBackpackImg from '../../assets/education/school-backpack-01.jpg'

export default function Footer({ hideCta = false }) {
  return (
    <footer className="site-footer">
      {/* ===== 1. Pre-Footer Final CTA Banner ===== */}
      {!hideCta && (
        <div className="footer-cta-container">
          <div className="footer-cta-card">
            <div className="footer-cta-content">
              <span className="footer-cta-kicker">الموسم الدراسي 2026 / 2027</span>
              <h2 className="footer-cta-title">
                ابدأ خطوة التميز الدراسي لابنك الآن
              </h2>
              <p className="footer-cta-desc">
                مقاعد محدودة في كل فوج لضمان المرافقة الفردية والتركيز العالي مع نخبة من خيرة الأساتذة.
              </p>
              <div className="footer-cta-actions">
                <Link to="/Classes" className="btn-footer-primary">
                  <span>تصفح الفصول والتسجيل</span>
                  <ArrowLeft size={16} />
                </Link>
                <Link to="/Contact" className="btn-footer-secondary">
                  <span>التواصل والاستفسار</span>
                </Link>
              </div>
            </div>

            <div className="footer-cta-visual-wrap" aria-hidden="true">
              <img
                src={schoolBackpackImg}
                alt="حقيبة مدرسية أنيقة ومراجع تعليمية"
                className="footer-cta-visual-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== 2. Main Footer Grid ===== */}
      <div className="footer-main-wrap">
        <div className="footer-columns-grid">
          {/* Column 1: School Identity */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-logo">
                <BookOpen size={24} color="#D9A441" />
              </div>
              <div className="footer-brand-title">المدرسة</div>
            </div>
            <p className="footer-brand-mission">
              مؤسسة تعليمية وتربوية متخصصة في الدعم المدرسي المركز، تكوين اللغات وتطوير المهارات التقنية الحديثة لجميع الأطوار.
            </p>
            <div className="footer-trust-tag">
              <ShieldCheck size={16} color="#D9A441" />
              <span>مرافقة بيداغوجية معتمدة منذ أكثر من 12 سنة</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-heading">روابط سريعة</h3>
            <ul className="footer-links-list">
              <li><Link to="/">الصفحة الرئيسية</Link></li>
              <li><Link to="/Classes">فصول ودورات الموسم</Link></li>
              <li><Link to="/About">عن المدرسة ورؤيتنا</Link></li>
              <li><Link to="/Contact">تواصل معنا واستفسر</Link></li>
              <li><Link to="/dashboard">بوابة الإدارة والمتابعة</Link></li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div className="footer-col">
            <h3 className="footer-col-heading">البرامج والتخصصات</h3>
            <ul className="footer-links-list">
              <li><Link to="/Classes?category=الرياضيات">دروس تقوية الرياضيات</Link></li>
              <li><Link to="/Classes?category=اللغات">دورات اللغات الحية</Link></li>
              <li><Link to="/Classes?category=العلوم">العلوم الفيزيائية والتجريبية</Link></li>
              <li><Link to="/Classes?category=التكنولوجيا">الإعلام الآلي والبرمجة</Link></li>
              <li><Link to="/Classes">تحضير الامتحانات الرسمية</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-col">
            <h3 className="footer-col-heading">معلومات الاتصال</h3>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="footer-contact-icon" />
                <span>{schoolInfo.address}</span>
              </li>
              <li>
                <Phone size={16} className="footer-contact-icon" />
                <span dir="ltr">{schoolInfo.phone}</span>
              </li>
              <li>
                <Mail size={16} className="footer-contact-icon" />
                <span>{schoolInfo.email}</span>
              </li>
              <li>
                <Clock size={16} className="footer-contact-icon" />
                <span>{schoolInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== 3. Sub-Footer Bar (Legal + Copyright) ===== */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            جميع الحقوق محفوظة © 2026 {schoolInfo.name} للتعليم والدعم المدرسي.
          </div>
          <div className="footer-legal-links">
            <Link to="/terms">شروط وأحكام الخدمة</Link>
            <span className="footer-legal-dot">•</span>
            <Link to="/privacy">سياسة الخصوصية وحماية البيانات</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
