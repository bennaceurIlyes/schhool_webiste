import React from 'react'
import { Calculator, Globe, Laptop, Atom } from 'lucide-react'

export default function SubjectMarquee() {
  const subjects = [
    { title: 'دروس دعم وتقوية مادة الرياضيات', icon: <Calculator size={18} />, theme: 'math' },
    { title: 'دورات اللغة الإنجليزية والمحادثة', icon: <Globe size={18} />, theme: 'lang' },
    { title: 'الإعلام الآلي والبرمجة وتطوير الويب', icon: <Laptop size={18} />, theme: 'tech' },
    { title: 'العلوم الفيزيائية والتجريبية', icon: <Atom size={18} />, theme: 'sci' },
    { title: 'اللغة العربية وآدابها ومنهجية التحرير', icon: <Globe size={18} />, theme: 'lang' },
    { title: 'تحضير شهادات البكالوريا والتعليم المتوسط (BEM)', icon: <Calculator size={18} />, theme: 'math' },
    { title: 'دورات اللغات الحية للأطفال واليافعين', icon: <Globe size={18} />, theme: 'lang' },
    { title: 'التكوين المهني والتطبيقي المعتمد', icon: <Laptop size={18} />, theme: 'tech' },
  ]

  return (
    <div className="subject-marquee-wrap" aria-label="شريط المواد والتخصصات الأكاديمية">
      <div className="subject-marquee-track">
        {[...subjects, ...subjects].map((item, idx) => (
          <div key={idx} className={`marquee-item marquee-item--${item.theme}`}>
            <span className="marquee-icon">{item.icon}</span>
            <span className="marquee-text">{item.title}</span>
            <span className="marquee-separator" aria-hidden="true">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
