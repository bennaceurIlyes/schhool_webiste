import React from 'react'
import { BookOpen, GraduationCap, ClipboardCheck, Sparkles, CheckCircle2 } from 'lucide-react'
import studyDeskImg from '../../assets/education/study-desk-composition-01.jpg'

export default function SchoolFeatures() {
  const supportingFeatures = [
    {
      num: '02',
      title: 'معلمون مؤهلون وأصحاب خبرة مشهودة',
      subtitle: 'نخبة بيداغوجية تجمع بين الكفاءة والشغف التعليمي',
      description: 'فريق تربوي يمتلك سنوات من الخبرة الميدانية في تدريس الأطوار الرسمية، قادر على تبسيط أدق المفاهيم وتحفيز الطالب على التفوق.',
      icon: <GraduationCap size={22} />,
      accent: 'teal',
      badgeText: 'كفاءة أكاديمية',
    },
    {
      num: '03',
      title: 'متابعة أداء مستمرة لأولياء الأمور',
      subtitle: 'شفافية كاملة وتقارير دورية للحضور والتحصيل',
      description: 'منظومة تواصل منضبطة تتيح لولي الأمر الاطلاع على انتظام الحضور وتقييمات الأساتذة ليكون شريكاً حقيقياً في مسار نجاح ابنه.',
      icon: <ClipboardCheck size={22} />,
      accent: 'slate',
      badgeText: 'تقارير فورية',
    },
    {
      num: '04',
      title: 'دعم ومرافقة مخصصة لكل تلميذ',
      subtitle: 'أفواج مصغرة وتشخيص دقيق لنقاط القوة والتحسين',
      description: 'نبتعد تماماً عن التلقين الجماعي المزدحم؛ نحرص على تشكيل أفواج نموذجية تمنح كل تلميذ الوقت الكافي للاستيعاب وطرح الأسئلة.',
      icon: <Sparkles size={22} />,
      accent: 'terracotta',
      badgeText: 'رعاية فردية',
    },
  ]

  return (
    <section className="school-features-section" id="features" aria-label="ركائز التعليم في المدرسة">
      <div className="school-features-container">
        {/* Section Header: Plain kicker without pill badge, gold line anchor */}
        <div className="section-title-wrap">
          <span className="section-plain-kicker">منهجيتنا التربوية</span>
          <h2 className="section-main-title">
            أربعة ركائز نبني بها <span className="title-highlight">تفوق أبنائنا</span>
          </h2>
          <div className="section-title-gold-line" aria-hidden="true" />
          <p className="section-subtitle">
            نوفر بيئة تعليمية محفزة تجمع بين الصرامة الأكاديمية والاهتمام الفردي بكل تلميذ.
          </p>
        </div>

        {/* Asymmetric Editorial Grid (Warning 4 Compliant: Large Editorial Numbers, No Rounded Number Pills) */}
        <div className="features-editorial-grid">
          {/* Card 01: Hero Feature Card anchoring the section */}
          <div className="feature-card-hero">
            <div className="feature-hero-content">
              <div className="feature-hero-top">
                <span className="editorial-number editorial-number--hero">01</span>
                <div className="feature-hero-icon-wrap" aria-hidden="true">
                  <BookOpen size={24} />
                </div>
              </div>

              <div className="feature-hero-body">
                <span className="feature-hero-category">الركيزة المركزية</span>
                <h3 className="feature-hero-title">برامج شاملة لكل مستوى دراسي</h3>
                <p className="feature-hero-subtitle">تغطية دقيقة للمناهج من الابتدائي إلى الثانوي</p>
                <p className="feature-hero-desc">
                  نقدم مقررات متكاملة تركز على تمكين التلميذ من استيعاب المفاهيم الأساسية وتطبيقها عملياً عبر حل تمارين نموذجية وبنك أسئلة شامل يحاكي الامتحانات الرسمية.
                </p>

                {/* Key educational bullet highlights */}
                <ul className="feature-hero-bullets" aria-label="مزايا البرامج الدراسية">
                  <li>
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                    <span>مواكبة دقيقة للمنهاج الوزاري المعتمد</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                    <span>سلاسل تمارين مصنفة حسب مستويات الصعوبة</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                    <span>جلسات مراجعة مركزة قبل الفترات التقويمية</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Corner Composition: Studio photography of academic copybook, books, pen, ruler */}
            <div className="feature-hero-corner-scene">
              <div className="feature-corner-frame">
                <img
                  src={studyDeskImg}
                  alt="أدوات دراسية مدرسية متقنة تشمل كراس مفتوح ومراجع وأقلام"
                  className="feature-corner-img"
                  loading="lazy"
                />
                <div className="feature-corner-caption">
                  <span className="caption-dot" />
                  <span>بيئة دراسية محفزة للتفوق والتركيز</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards 02, 03, 04: Supporting Editorial Cards with Varied Proportions */}
          <div className="features-supporting-column">
            {supportingFeatures.map((feat) => (
              <div
                key={feat.num}
                className={`feature-card-supporting feature-card-supporting--${feat.accent}`}
              >
                <div className="supporting-card-aside">
                  <span className="editorial-number">{feat.num}</span>
                  <div className={`supporting-icon-box supporting-icon-box--${feat.accent}`}>
                    {feat.icon}
                  </div>
                </div>

                <div className="supporting-card-main">
                  <div className="supporting-meta-row">
                    <span className={`supporting-tag supporting-tag--${feat.accent}`}>{feat.badgeText}</span>
                  </div>
                  <h3 className="supporting-card-title">{feat.title}</h3>
                  <div className="supporting-card-subtitle">{feat.subtitle}</div>
                  <p className="supporting-card-desc">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
