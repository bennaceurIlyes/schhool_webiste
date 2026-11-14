import React from 'react'
import { Check, Minus } from 'lucide-react'

export default function WhyChooseUs() {
  const comparisonRows = [
    {
      criteria: 'كثافة الفوج الدراسي',
      school: 'أفواج صغيرة ومحدودة (بين 8 إلى 12 تلميذاً كحد أقصى)',
      traditional: 'قاعات مكتظة تتجاوز في الغالب 25 إلى 35 تلميذاً',
    },
    {
      criteria: 'متابعة الحضور والغياب',
      school: 'تسجيل إلكتروني فوري وتنبيه ولي الأمر عند أي غياب',
      traditional: 'تسجيل ورقي تقليدي دون إشعار سريع للأسرة',
    },
    {
      criteria: 'المرافقة الفردية ومعالجة التعثر',
      school: 'تشخيص دقيق لنقاط الضعف وخطة دعم تعالج الثغرات',
      traditional: 'شرح جماعي عام دون تركيز على الصعوبات الفردية',
    },
    {
      criteria: 'مؤهلات الأساتذة والمؤطرين',
      school: 'أساتذة رسميون ذوو خبرة ميدانية طويلة ونتائج موثقة',
      traditional: 'تفاوت كبير في كفاءات المؤطرين وخبرتهم',
    },
    {
      criteria: 'التواصل والتقارير الدورية',
      school: 'تقارير دورية حول تحصيل التلميذ ومساحة خاصة للأولياء',
      traditional: 'تواصل محدود يقتصر على نهاية الموسم الدراسي',
    },
  ]

  return (
    <section className="why-us-section" id="why-choose-us" aria-label="لماذا يختار الأولياء مدرستنا">
      <div className="why-us-container">
        {/* Section Header with Clean Plain Kicker (No Pill, No Icon) */}
        <div className="section-title-wrap">
          <span className="section-plain-kicker">الفارق التعليمي</span>
          <h2 className="section-main-title">
            لماذا تضع العائلات <span className="title-highlight">ثقتها في مدرستنا؟</span>
          </h2>
          <p className="section-subtitle">
            مقارنة واقعية وموضوعية توضح التزامنا بالجودة التربوية والنتائج الملموسة.
          </p>
        </div>

        {/* Responsive Table Wrapped in its own overflow-x container */}
        <div className="comparison-table-scroll-wrap" tabIndex="0" role="region" aria-label="جدول مقارنة المعايير التعليمية">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="th-criteria">المعيار التعليمي</th>
                <th className="th-school">
                  <span className="badge-school-head">في مدرستنا</span>
                </th>
                <th className="th-traditional">الدروس التقليدية العامة</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr key={index}>
                  <td className="td-criteria">{row.criteria}</td>
                  <td className="td-school">
                    <div className="td-cell-content">
                      <span className="icon-indicator icon-check">
                        <Check size={16} />
                      </span>
                      <span>{row.school}</span>
                    </div>
                  </td>
                  <td className="td-traditional">
                    <div className="td-cell-content">
                      <span className="icon-indicator icon-neutral">
                        <Minus size={16} />
                      </span>
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
