/* DRAFT DOCUMENT: This document is a structured template and MUST be reviewed by a qualified local legal professional before publication to ensure compliance with applicable educational, consumer protection, and data privacy regulations in your jurisdiction. */

import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import { schoolInfo } from '../home/homeData'
import './Legal.css'

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <header className="legal-header">
        <div className="legal-header-inner">
          <span className="legal-kicker">الوثائق القانونية الرسمية</span>
          <h1 className="legal-title">شروط وأحكام الخدمة</h1>
          <div className="legal-meta">
            <span>تاريخ آخر تحديث: 24 سبتمبر 2026</span>
            <span>•</span>
            <span>المؤسسة: {schoolInfo.name}</span>
          </div>
        </div>
      </header>

      <main className="legal-body-container">
        <div className="legal-back-nav">
          <Link to="/" className="legal-back-link">
            <ArrowRight size={16} />
            <span>العودة إلى الصفحة الرئيسية</span>
          </Link>
        </div>

        <div className="legal-content-card">
          <div className="legal-notice-banner">
            <strong>إشعار تنظيمي:</strong> تنظم هذه الوثيقة العلاقة التعاقدية بين إدارة المدرسة والتلاميذ وأولياء أمورهم المسجلين في البرامج الدراسية أو عبر البوابة الرقمية. يُرجى قراءة هذه البنود بعناية.
          </div>

          <section className="legal-section">
            <h2 className="legal-section-title">1. قبول الشروط والأحكام</h2>
            <p className="legal-paragraph">
              يمثل تسجيل التلميذ في أي من البرامج التعليمية أو الدورات التدريبية المقدمة من طرف المدرسة، سواء تم التسجيل حضورياً بمقر الإدارة أو إلكترونياً عبر هذا الموقع، قبولاً تاماً وغير مشروط لهذه الشروط والأحكام. إذا كنت ولي أمر تلميذ قاصر، فإن إتمامك لإجراءات التسجيل يعد بمثابة موافقة قانونية نيابة عن التلميذ.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">2. وصف الخدمات والبرامج التعليمية</h2>
            <p className="legal-paragraph">
              تقدم المدرسة خدمات تعليمية وتربوية تشمل دروس الدعم والتقوية المدرسية في مختلف الأطوار، دورات اللغات الحية التفاعلية، الورشات التدريبية في مجالات التكنولوجيا والإعلام الآلي، بالإضافة إلى مساحة رقمية مخصصة لأولياء الأمور لمتابعة جداول الحصص والاشتراكات.
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">تلتزم المدرسة بتوفير قاعات مهيأة وأساتذة أكفاء لتأطير الحصص المعلن عنها.</li>
              <li className="legal-list-item">تحتفظ الإدارة بحق تعديل توقيت الحصص عند الضرورة القصوى مع إخطار الأولياء مسبقاً.</li>
              <li className="legal-list-item">الحصص التي تصادف عطلاً رسمية أو اضطرابات قاهرة يتم برمجتها كحصص تعويضية بالتنسيق مع الأستاذ.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">3. مسؤوليات التلميذ وولي الأمر</h2>
            <p className="legal-paragraph">
              يعد الانضباط والاحترام المتبادل ركيزة أساسية في البيئة التربوية للمدرسة. يلتزم التلميذ وولي أمره بما يلي:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">الحضور في الوقت المحدد للحصة والالتزام بالنظام الداخلي لقاعات التدريس.</li>
              <li className="legal-list-item">المحافظة على تجهيزات وممتلكات المؤسسة التربوية والتقنية.</li>
              <li className="legal-list-item">تقديم معلومات صحيحة ودقيقة عند التسجيل، بما في ذلك أرقام الهاتف النشطة للتواصل السريع.</li>
              <li className="legal-list-item">إخطار الإدارة كتابياً أو هاتفياً في حال وجود ظرف صحي خاص يستدعي عناية محددة.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">4. الرسوم وسياسة التسديد والإلغاء</h2>
            <p className="legal-paragraph">
              يتم تحديد رسوم التسجيل والاشتراكات الشهرية لكل فوج دراسي وفق الجداول المعلنة في صفحة الفصول وعند مكتب الاستقبال:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">
                <strong>التسديد الدوري:</strong> تسدد الاشتراكات الشهرية في بداية كل دورة دراسية، وخلال الأسبوع الأول من كل شهر ميلادي لضمان تثبيت المقعد.
              </li>
              <li className="legal-list-item">
                <strong>الغياب الفردي:</strong> غياب التلميذ عن الحصة لأسباب شخصية لا يعفي من تسديد الاشتراك، ولا يلزم الإدارة بإعادة تقديم الحصة منفرداً.
              </li>
              <li className="legal-list-item">
                <strong>طلب الإلغاء والانسحاب:</strong> يمكن لولي الأمر تقديم طلب انسحاب رسمي قبل بدء الشهر الدراسي الجديد. في حال بدء الدورة، تخضع استعادة أي جزء من الرسوم لمراجعة الإدارة وفق الأسباب المقدمة.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">5. الملكية الفكرية</h2>
            <p className="legal-paragraph">
              جميع المذكرات التعليمية، التمارين النموذجية، المواد الرقمية، والشعارات المعروضة في الموقع أو الموزعة على التلاميذ هي ملكية حصرية للمدرسة ولأساتذتها المؤطرين. لا يجوز نسخها أو إعادة نشرها تجارياً بدون إذن كتابي مسبق.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">6. حدود المسؤولية</h2>
            <p className="legal-paragraph">
              تبذل إدارة المدرسة وأساتذتها قصارى جهدهم لتوفير تأطير نوعي وبيئة محفزة تساعد على التحصيل العلمي الممتاز. ومع ذلك، يرتبط النجاح النهائي والنتائج الدراسية بالاجتهاد الشخصي للتلميذ ومتابعته المستمرة في المنزل.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">7. القانون الواجب التطبيق والاختصاص القضائي</h2>
            <p className="legal-paragraph">
              تخضع هذه الشروط وتفسر وفقاً للقوانين والتشريعات السارية في الجمهورية الجزائرية الديمقراطية الشعبية. وفي حال حدوث أي نزاع، يسعى الطرفان لحله ودياً بالتشاور مع إدارة المؤسسة، وفي حال تعذر ذلك، تختص المحاكم المختصة محلياً بالفصل فيه.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">8. بيانات التواصل والاستفسارات</h2>
            <p className="legal-paragraph">
              لأي استفسارات قانونية أو توضيحات بخصوص شروط التسجيل والاشتراكات، يمكنكم التواصل مع مكتب الإدارة عبر القنوات التالية:
            </p>
            <div className="legal-contact-box">
              <div className="legal-contact-item">
                <MapPin size={16} />
                <span><strong>العنوان:</strong> {schoolInfo.address}</span>
              </div>
              <div className="legal-contact-item">
                <Phone size={16} />
                <span><strong>الهاتف:</strong> {schoolInfo.phone}</span>
              </div>
              <div className="legal-contact-item">
                <Mail size={16} />
                <span><strong>البريد الإلكتروني:</strong> {schoolInfo.email}</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
