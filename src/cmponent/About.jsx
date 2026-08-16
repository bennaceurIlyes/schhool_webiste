import React from 'react'
import { Link } from 'react-router'
import Navbar from './common/Navbar'
import {
  GraduationCap,
  Award,
  Users,
  Target,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'
import studentImg from '../assets/image.png'
import { schoolInfo, statsData } from './home/homeData'

export default function About() {
  const values = [
    {
      icon: <GraduationCap size={28} className="theme-text--blue" />,
      title: 'الجودة والتميز الأكاديمي',
      desc: 'نلتزم بأعلى معايير التعليم والمرافقة المنهجية التي تضمن تحسين مستوى التلميذ وتفوقه الدراسي.',
    },
    {
      icon: <Users size={28} className="theme-text--green" />,
      title: 'نخبة الأساتذة والمؤطرين',
      desc: 'فريق تربوي ذو كفاءة مشهودة وشغف حقيقي بنقل المعرفة وتحفيز الطلاب على تحقيق أقصى إمكاناتهم.',
    },
    {
      icon: <Target size={28} className="theme-text--rose" />,
      title: 'متابعة فردية دقيقة',
      desc: 'تشخيص احتياجات كل تلميذ والتركيز على نقاط الضعف لتحويلها إلى نقاط قوة وتميز.',
    },
    {
      icon: <Award size={28} className="theme-text--amber" />,
      title: 'شهادات وتكوين تطبيقي',
      desc: 'برامج لغات وتكوين مهني وعملي يمنح المتعلم مهارات حقيقية وشهادات معتمدة تعزز مستقبله.',
    },
  ]

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
            <span>عن المدرسة</span>
          </div>

          <h1 className="classes-page-title">
            نصنع التميز ونبني <span className="title-highlight">مستقبل أجيالنا</span>
          </h1>

          <p className="classes-page-desc">
            مؤسسة تعليمية وتدريبية رائدة متخصصة في الدعم المدرسي لجميع الأطوار، تعليم اللغات الحية، والتكوين المهني التطبيقي بأحدث الطرق البيداغوجية.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section style={{ padding: '60px 24px', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          background: '#FFFFFF',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-primary)',
              fontWeight: '700',
              fontSize: '14px',
              marginBottom: '12px',
            }}>
              <BookOpen size={18} />
              <span>رسالتنا وأهدافنا</span>
            </div>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
              نهج متكامل يجمع بين المعرفة النظرية والتطبيق العملي
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
              تأسست المدرسة لتكون البيئة المثالية لكل طالب يبحث عن التميز والارتقاء بدرجاته، ولكل شخص يسعى لاكتساب لغات جديدة أو مهارات تطبيقية تؤهله لسوق العمل.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>أفواج دراسية نموذجية ذات أعداد محدودة لضمان المتابعة الفردية.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>قاعات مجهزة بأحدث الوسائل التعليمية والمخابر التطبيقية.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>متابعة دورية مستمرة مع أولياء الأمور لتقييم تقدم التلميذ.</span>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src={studentImg}
              alt="طالب بالمدرسة"
              style={{
                width: '100%',
                maxHeight: '420px',
                objectFit: 'contain',
                borderRadius: '20px',
              }}
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px' }}>
            قيمنا ومبادئنا التعليمية
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            الركائز التي نعتمد عليها لتحقيق أعلى درجات الرضا والنجاح لطلابنا
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                padding: '30px 24px',
                borderRadius: '18px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'var(--bg-page)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
                {v.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div style={{
          marginTop: '60px',
          background: 'var(--color-navy)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}>
          <h3 style={{ fontSize: '26px', fontWeight: '800' }}>
            هل ترغب في تسجيل ابنك أو الانضمام إلى إحدى دوراتنا؟
          </h3>
          <p style={{ maxWidth: '600px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: '1.6' }}>
            استكشف قائمة الفصول المتاحة الآن أو تواصل مع فريق الاستقبال للاستفسار وتحديد المستوى مجاناً.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              to="/Classes"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-navy)',
                padding: '12px 28px',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>تصفح الفصول والدروس</span>
              <ArrowLeft size={16} />
            </Link>
            <Link
              to="/Contact"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              اتصل بنا الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}