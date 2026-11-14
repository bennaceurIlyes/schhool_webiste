/* DRAFT DOCUMENT: This document is a structured template and MUST be reviewed by a qualified local legal professional before publication to ensure compliance with applicable educational, consumer protection, and data privacy regulations in your jurisdiction. */

import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Shield, Lock, FileText, Mail, Phone, MapPin } from 'lucide-react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import { schoolInfo } from '../home/homeData'
import './Legal.css'

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <header className="legal-header">
        <div className="legal-header-inner">
          <span className="legal-kicker">الوثائق القانونية الرسمية</span>
          <h1 className="legal-title">سياسة الخصوصية وحماية البيانات</h1>
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
            <strong>التزام الخصوصية:</strong> تولي إدارة المدرسة أهمية قصوى لسرية وخصوصية البيانات الشخصية للتلاميذ وأوليائهم. توضح هذه السياسة بوضوح نوعية المعلومات التي نجمعها، غايات استخدامها، وحقوقكم في التحكم بها.
          </div>

          <section className="legal-section">
            <h2 className="legal-section-title">1. البيانات التي نقوم بجمعها</h2>
            <p className="legal-paragraph">
              عند استخدامكم لموقعنا أو التسجيل في أحد فصولنا الدراسية، قد نقوم بجمع البيانات الشخصية التالية:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">
                <strong>بيانات التلميذ:</strong> الاسم الكامل، تاريخ الميلاد، المستوى الدراسي، الشعبة، وتاريخ الالتحاق بالفوج.
              </li>
              <li className="legal-list-item">
                <strong>بيانات ولي الأمر أو المتكفل:</strong> الاسم الكامل، رقم الهاتف النشط، وعنوان البريد الإلكتروني (إن توفر) للتواصل ومتابعة الحضور.
              </li>
              <li className="legal-list-item">
                <strong>بيانات الحضور والتسجيل:</strong> سجل الحصص المحضورة، اسم الفوج، وتواريخ تجديد الاشتراك الشهري.
              </li>
              <li className="legal-list-item">
                <strong>البيانات التقنية البسيطة:</strong> عنوان البروتوكول (IP) ونوع المتصفح المستخدم بشكل مجهول المصدر بهدف تحسين أداء وتصفح الموقع.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">2. أغراض معالجة واستخدام البيانات</h2>
            <p className="legal-paragraph">
              نستخدم البيانات المجموعة حصرياً للأغراض التعليمية والتنظيمية التالية:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">إدارة وتأكيد تسجيل التلاميذ وتوزيعهم على الأفواج والقاعات المناسبة.</li>
              <li className="legal-list-item">إرسال التنبيهات الضرورية المتعلقة بمواعيد الحصص، الامتحانات، أو الحصص التعويضية.</li>
              <li className="legal-list-item">تمكين ولي الأمر من متابعة الحصص وسجل المدفوعات والاشتراكات.</li>
              <li className="legal-list-item">الاستجابة لطلبات واستفسارات الأولياء والزوار المرسلة عبر نماذج التواصل.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">3. خصوصية بيانات القاصرين وموافقة الولي</h2>
            <p className="legal-paragraph">
              نظراً لأن فئات واسعة من التلاميذ هم قُصّر دون سن 18 عاماً، فإننا لا نجمع أية بيانات لتلميذ قاصر دون موافقة صريحة من ولي أمره أو الوصي القانوني عليه. يُعد استكمال استمارة التسجيل أو تأكيدها حضورياً بمثابة موافقة ولي الأمر على معالجة بيانات التلميذ لأغراض تربوية وتعليمية بحتة.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">4. مشاركة البيانات مع أطراف ثالثة</h2>
            <p className="legal-paragraph">
              تلتزم المدرسة بعدم بيع، تأجير، أو مشاركة البيانات الشخصية للتلاميذ وأوليائهم مع أي جهة تجارية خارجية. تقتصر مشاركة البيانات على:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">الأساتذة المؤطرين للفوج المعني بالقدر اللازم لإدارة الحضور والتقييم البيداغوجي.</li>
              <li className="legal-list-item">الجهات الرسمية والتربوية المختصة في حال وجود إلزام قانوني تنظيمي يفرضه القانون.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">5. مدة الاحتفاظ بالبيانات وأمانها</h2>
            <p className="legal-paragraph">
              نحتفظ ببيانات التسجيل طوال فترة دراسة التلميذ في المدرسة وحتى انتهاء الموسم الدراسي، بالإضافة إلى فترة أرشيفية معقولة تسمح بتسليم شهادات الحضور أو كشوفات المتابعة عند طلبها. نطبق تدابير تقنية وإدارية محكمة لمنع الوصول غير المصرح به أو التعديل أو تسريب تلك البيانات.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">6. حقوق ولي الأمر والتلميذ</h2>
            <p className="legal-paragraph">
              يحق لولي الأمر في أي وقت:
            </p>
            <ul className="legal-list">
              <li className="legal-list-item">الاطلاع على البيانات المسجلة لديه والتأكد من صحتها.</li>
              <li className="legal-list-item">طلب تصحيح أو تحديث أي معلومات خاطئة مثل أرقام الاتصال أو المستوى الدراسي.</li>
              <li className="legal-list-item">طلب حذف البيانات الشخصية عند انتهاء العلاقة الدراسية مع المؤسسة ما لم ينص القانون على خلاف ذلك.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">7. التواصل ومسؤول حماية البيانات</h2>
            <p className="legal-paragraph">
              لأي استفسار بخصوص سياسة الخصوصية أو لممارسة حقوقكم في تعديل أو حذف البيانات، يمكنكم الاتصال مباشرة بإدارة المدرسة:
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
