/* SAMPLE / DRAFT TESTIMONIALS: The quotes below are representative student/parent feedback templates and are marked for replacement with authenticated parent reviews and testimonials prior to public launch. */

import React from 'react'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const reviews = [
    {
      id: 'rev-1',
      author: 'السيدة فاطمة الزهراء ب.',
      role: 'وليّة أمر تلميذ في السنة الثانية ثانوي',
      subject: 'دعم مادة الرياضيات والعلوم الفيزيائية',
      quote: 'لاحظت تحسناً كبيراً في ثقة ابني في مادة الرياضيات خلال فصل دراسي واحد. متابعة الأستاذ بن علي كانت ممتازة والتنظيم داخل الأفواج الصغيرة ساعده على طرح أسئلته دون تردد.',
      theme: 'math',
    },
    {
      id: 'rev-2',
      author: 'التلميذ أيمن ع.',
      role: 'طالب في دورة اللغة الإنجليزية التفاعلية',
      subject: 'دورة المحادثة والنطق السليم',
      quote: 'كنت أجد صعوبة في التعبير الشفهي أمام زملائي. بفضل الدروس التفاعلية مع الأستاذ حداد تمكنت من اكتساب طلاقة ومصطلحات جديدة جعلتني أكثر ارتياحاً في التحدث.',
      theme: 'lang',
    },
    {
      id: 'rev-3',
      author: 'السيد عبد القادر م.',
      role: 'ولي أمر تلميذة في الطور المتوسط',
      subject: 'مرافقة دورية ومتابعة الحضور',
      quote: 'التزام المدرسة بالمواعيد وإشعارنا الفوري بأي جديد يمنح الأولياء راحة بال تامة. البيئة التربوية محترمة ومحفزة جداً للتفوق والاجتهاد.',
      theme: 'sci',
    },
  ]

  return (
    <section className="testimonials-section" id="testimonials" aria-label="آراء وانطباعات الأولياء والتلاميذ">
      <div className="testimonials-container">
        {/* Section Header with Clean Plain Kicker (No Pill, No Icon) */}
        <div className="section-title-wrap">
          <span className="section-plain-kicker">شهادات وانطباعات</span>
          <h2 className="section-main-title">
            ما يقوله <span className="title-highlight">أولياء الأمور وطلابنا</span>
          </h2>
          <p className="section-subtitle">
            تجارب حقيقية تعكس أثر المرافقة الفردية والبيئة التعليمية المركزة على مستوى التلاميذ.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="testimonials-cards-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className={`testimonial-card testimonial-card--${rev.theme}`}>
              <div className="testimonial-quote-icon" aria-hidden="true">
                <Quote size={24} />
              </div>
              <p className="testimonial-text">"{rev.quote}"</p>
              <div className="testimonial-author-block">
                <div className="author-name">{rev.author}</div>
                <div className="author-role">{rev.role}</div>
                <div className="author-subject-badge">{rev.subject}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
