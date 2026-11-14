import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SchoolFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'كيف تتم إجراءات التسجيل في الفصول ودورات الدعم؟',
      a: 'يمكنكم البدء بتسجيل أولي عبر الموقع باختيار الفوج والمادة وتعبئة بيانات التلميذ، ثم زيارة مكتب الاستقبال بالمدرسة لاستكمال الملف وتأكيد الحجز النهائي وتسلم بطاقة التلميذ.',
    },
    {
      q: 'ما هي مواعيد الحصص الأسبوعية وكيف تنظم الأفواج؟',
      a: 'توزع الحصص على مدار أيام الأسبوع في فترات ما بعد الدوام المدرسي، إضافة إلى عطلة نهاية الأسبوع (الجمعة والسبت). يتم نشر جدول التوقيت والقاعات لكل مادة في بطاقة الفصل بالموقع.',
    },
    {
      q: 'كيف تحتسب رسوم الاشتراك وما هي طرق التسديد المتاحة؟',
      a: 'تحتسب الرسوم شهرياً حسب المادة وعدد الساعات، وتتراوح بين 3,800 دج و5,000 دج شهرياً. يتم تسديد الاشتراك حضورياً بمكتب المحاسبة نقداً في الأسبوع الأول من كل دورة شهرية.',
    },
    {
      q: 'ما هو الإجراء المتبع في حال غياب التلميذ أو مصادفة عطلة رسمية؟',
      a: 'الحصص التي تلغى بسبب عطلة رسمية أو ظرف طارئ خاص بالأستاذ يتم تعويضها بالكامل في موعد يحدد مسبقاً بالتنسيق مع الأولياء. أما غياب التلميذ الفردي فيمكنه التنسيق مع الأستاذ لاستدراك التمارين والمذكرات الموزعة.',
    },
    {
      q: 'ما هي المناهج المعتمدة والكتب المقررة في التدريس؟',
      a: 'نتبع المناهج الرسمية لوزارة التربية الوطنية مع تعزيزها بمذكرات تطبيقية، تمارين إضافية، وسلاسل نموذجية معدة بعناية من طرف أساتذتنا لتمكين التلميذ من التحكم في المادة والتحضير للامتحانات.',
    },
    {
      q: 'كيف تعمل لوحة التحكم وكيف يستفيد منها ولي الأمر؟',
      a: 'توفر لوحة التحكم الرقمية متابعة شاملة لحالة اشتراك التلميذ، مواعيد التجديد القادمة، سجل الحضور، والإعلانات المفتوحة للأفواج الجديدة، مما يضمن تواصلاً شفافاً مع الإدارة.',
    },
  ]

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <section className="school-faq-section" id="faq" aria-label="الأسئلة المتكررة حول المدرسة">
      <div className="school-faq-container">
        {/* Section Header with Clean Plain Kicker (No Pill, No Icon) */}
        <div className="section-title-wrap">
          <span className="section-plain-kicker">إجابات وتوضيحات</span>
          <h2 className="section-main-title">
            الأسئلة الشائعة <span className="title-highlight">حول الدراسة والتسجيل</span>
          </h2>
          <p className="section-subtitle">
            كل ما يهم الأولياء والطلاب معرفته بخصوص التنظيم البيداغوجي، الرسوم، ومواعيد الحصص.
          </p>
        </div>

        {/* FAQ Accordion List - Tap targets >= 44px */}
        <div className="faq-accordion-list" role="region" aria-label="قائمة الأسئلة الشائعة">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const questionId = `faq-q-${index}`
            const panelId = `faq-p-${index}`

            return (
              <div
                key={index}
                className={`faq-item-card ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="faq-trigger-btn"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className={`faq-chevron-wrap ${isOpen ? 'faq-chevron--rotated' : ''}`} aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={questionId}
                  className="faq-answer-panel"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
