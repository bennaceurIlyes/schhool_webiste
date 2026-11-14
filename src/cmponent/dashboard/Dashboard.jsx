import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import {
  Home,
  BarChart2,
  GraduationCap,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Bell,
  Menu,
  User,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Search,
  BookOpen,
  Award,
  Clock,
  Trash2,
  Eye,
  Edit,
  ArrowUpRight,
  Filter,
  DollarSign,
  ClipboardCheck,
  Check,
  AlertCircle,
  MapPin,
  Layers,
  CreditCard,
  Send,
  RotateCcw,
  FileText,
  AlertTriangle,
  Megaphone,
  Pin,
  Tag,
  Phone,
  MessageSquare,
} from 'lucide-react'
import { studentService } from '../../utils/studentService'

export default function Dashboard() {
  const ADMIN_PHONE = '0667158842' // رقم إدارة المدرسة
  const [activeTab, setActiveTab] = useState('student')
  const [selectedPeriod, setSelectedPeriod] = useState('هذا الأسبوع')
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // حالة الطلاب اللحظية
  const [students, setStudents] = useState(() => studentService.getStudents())
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('all')
  const [selectedClassFilter, setSelectedClassFilter] = useState('all')

  // حالة الإعلانات اللحظية
  const [announcements, setAnnouncements] = useState(() => studentService.getAnnouncements())
  const [announcementSearch, setAnnouncementSearch] = useState('')
  const [selectedAnnCategory, setSelectedAnnCategory] = useState('all')
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [viewingAnnouncement, setViewingAnnouncement] = useState(null)
  const [newAnnForm, setNewAnnForm] = useState({
    title: '',
    content: '',
    category: 'أفواج ودروس جديدة',
    targetAudience: 'أقسام 2 ثانوي وبكالوريا',
    courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
    teacherName: 'الأستاذ أحمد بن علي',
    groupName: 'فوج نهاية الأسبوع',
    schedule: 'السبت والثلاثاء : 14:00 - 16:00',
    price: '4,500 دج / شهر',
    spotsLeft: 8,
    isClassAd: true,
    isPinned: true,
  })

  // نافذة تذكير واتساب
  const [whatsappModalStudent, setWhatsappModalStudent] = useState(null)
  const [whatsappCustomMessage, setWhatsappCustomMessage] = useState('')

  // نافذة عرض ملف الطالب
  const [viewingStudent, setViewingStudent] = useState(null)

  // نافذة التأكيد الفعلي والتسجيل الأولي بالمدرسة
  const [approvingStudent, setApprovingStudent] = useState(null)
  const [approvalForm, setApprovalForm] = useState({
    paymentAmount: 2500,
    paymentMethod: 'نقداً (في الإدارة)',
    sessionsPerMonth: 4,
    cycle: 'سبتمبر 2026',
    notes: 'تم تأكيد التسجيل حضورياً في مقر المدرسة',
  })

  // نافذة دفع اشتراك الشهر القادم
  const [payingStudent, setPayingStudent] = useState(null)
  const [paymentForm, setPaymentForm] = useState({
    amount: 2500,
    paymentMethod: 'نقداً (في الإدارة)',
    cycle: 'أكتوبر 2026',
    notes: 'تم تسديد الاشتراك الشهري لدى أمانة المدرسة',
  })

  // نافذة إضافة طالب جديد يدوياً
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [newStudentForm, setNewStudentForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
    teacherName: 'أ. سارة بن علي',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
  })

  // الاشتراك في التحديثات الحية
  useEffect(() => {
    const unsubscribe = studentService.subscribe((updated) => {
      setStudents([...updated])
      setAnnouncements([...studentService.getAnnouncements()])
    })
    return () => unsubscribe()
  }, [])

  // إظهار التنبيه اللحظي
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3800)
  }

  // الحسابات الإحصائية
  const totalStudentsCount = students.length
  const activeStudentsCount = students.filter((s) => s.status === 'Active').length
  const pendingEnrollmentsCount = students.filter((s) => s.status === 'Pending Approval').length
  const paymentsDueCount = students.filter((s) => s.paymentStatus === 'Payment Required').length
  const overduePaymentsCount = students.filter((s) => s.paymentStatus === 'Overdue' || s.status === 'Payment Overdue').length

  // الطلاب الذين أتموا 4/4 حصص وبحاجة لتجديد الاشتراك
  const studentsWithPaymentDue = students.filter((s) => s.paymentStatus === 'Payment Required')

  // فلترة قائمة الطلاب
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.phone.includes(studentSearch) ||
      s.parentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.courseName.toLowerCase().includes(studentSearch.toLowerCase())

    let matchesCategory = true
    if (selectedFilterCategory === 'active') {
      matchesCategory = s.status === 'Active'
    } else if (selectedFilterCategory === 'pending') {
      matchesCategory = s.status === 'Pending Approval'
    } else if (selectedFilterCategory === 'due') {
      matchesCategory = s.paymentStatus === 'Payment Required'
    } else if (selectedFilterCategory === 'overdue') {
      matchesCategory = s.paymentStatus === 'Overdue' || s.status === 'Payment Overdue'
    } else if (selectedFilterCategory === 'suspended') {
      matchesCategory = s.status === 'Suspended'
    }

    const matchesClass =
      selectedClassFilter === 'all' || s.courseName.includes(selectedClassFilter)

    return matchesSearch && matchesCategory && matchesClass
  })

  // فلترة قائمة الإعلانات
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(announcementSearch.toLowerCase()) ||
      ann.content.toLowerCase().includes(announcementSearch.toLowerCase()) ||
      ann.targetAudience.toLowerCase().includes(announcementSearch.toLowerCase())

    const matchesCat =
      selectedAnnCategory === 'all' || ann.category === selectedAnnCategory

    return matchesSearch && matchesCat
  })

  // الإعلان المثبت الرئيسي في الشريط العلوي
  const topPinnedAnnouncement = announcements.find((a) => a.isPinned) || announcements[0]

  // نشر إعلان جديد
  const handleAddAnnouncementSubmit = (e) => {
    e.preventDefault()
    if (!newAnnForm.title.trim() || !newAnnForm.content.trim()) return

    studentService.addAnnouncement({
      title: newAnnForm.title,
      content: newAnnForm.content,
      category: newAnnForm.category,
      targetAudience: newAnnForm.targetAudience,
      courseName: newAnnForm.courseName,
      teacherName: newAnnForm.teacherName,
      groupName: newAnnForm.groupName,
      schedule: newAnnForm.schedule,
      price: newAnnForm.price,
      spotsLeft: newAnnForm.spotsLeft,
      isClassAd: newAnnForm.isClassAd,
      isPinned: newAnnForm.isPinned,
    })

    showToast(`📢 تم نشر الإعلان "${newAnnForm.title}" بنجاح في الموقع واللوحة !`)
    setIsAddAnnouncementOpen(false)
    setNewAnnForm({
      title: '',
      content: '',
      category: 'أفواج ودروس جديدة',
      targetAudience: 'جميع الأولياء والطلاب',
      courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
      teacherName: 'الأستاذ أحمد بن علي',
      groupName: 'فوج نهاية الأسبوع',
      schedule: 'السبت والثلاثاء : 14:00 - 16:00',
      price: '4,500 دج / شهر',
      spotsLeft: 8,
      isClassAd: true,
      isPinned: true,
    })
    setAnnouncements([...studentService.getAnnouncements()])
  }

  // تبديل تثبيت الإعلان
  const handleTogglePin = (id) => {
    studentService.togglePinAnnouncement(id)
    setAnnouncements([...studentService.getAnnouncements()])
    showToast(`تم تحديث حالة التثبيت.`)
  }

  // حذف إعلان
  const handleDeleteAnnouncement = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      studentService.deleteAnnouncement(id)
      setAnnouncements([...studentService.getAnnouncements()])
      showToast(`تم حذف الإعلان بنجاح.`)
    }
  }

  // فتح نافذة تذكير واتساب
  const handleOpenWhatsAppModal = (student) => {
    setWhatsappModalStudent(student)
    setWhatsappCustomMessage(
      studentService.generateWhatsAppReminderText({
        studentName: student.fullName,
        parentName: student.parentName,
        courseName: student.courseName,
        teacherName: student.teacherName,
        monthlyPrice: student.monthlyPrice,
        sessionsCompleted: student.sessionsCompleted || 4,
        sessionsPerMonth: student.sessionsPerMonth || 4,
        adminPhone: ADMIN_PHONE,
      })
    )
  }

  // محاكاة إرسال تذكير الواتساب
  const handleSendWhatsAppFromModal = () => {
    if (!whatsappModalStudent) return
    showToast(`✓ تم إرسال تذكير WhatsApp بنجاح للطالب ${whatsappModalStudent.fullName} (${whatsappModalStudent.phone}) !`)
    setWhatsappModalStudent(null)
  }

  // فتح نافذة تأكيد التسجيل الفعلي
  const handleOpenApproveModal = (student) => {
    setApprovingStudent(student)
    setApprovalForm({
      paymentAmount: student.monthlyPrice || 2500,
      paymentMethod: 'نقداً (في الإدارة)',
      sessionsPerMonth: student.sessionsPerMonth || 4,
      cycle: 'سبتمبر 2026',
      notes: 'تم تأكيد التسجيل حضورياً في مقر المدرسة',
    })
  }

  // تأكيد التسجيل الفعلي ودفع أول قسط
  const handleSubmitApproval = (e) => {
    e.preventDefault()
    if (!approvingStudent) return

    studentService.approveEnrollment(approvingStudent.id, {
      paymentAmount: approvalForm.paymentAmount,
      paymentMethod: approvalForm.paymentMethod,
      sessionsPerMonth: approvalForm.sessionsPerMonth,
      cycle: approvalForm.cycle,
      notes: approvalForm.notes,
    })

    showToast(`✓ تم تأكيد التسجيل بنجاح ! ${approvingStudent.fullName} أصبح الآن في حالة نشط.`)
    setApprovingStudent(null)
  }

  // فتح نافذة تسجيل الدفعة الشهرية
  const handleOpenPaymentModal = (student) => {
    setPayingStudent(student)
    setPaymentForm({
      amount: student.monthlyPrice || 2500,
      paymentMethod: 'نقداً (في الإدارة)',
      cycle: student.currentCycle.includes('سبتمبر') ? 'أكتوبر 2026' : 'شهر جديد',
      notes: 'تم تسديد الاشتراك الشهري لدى أمانة المدرسة',
    })
  }

  // تسجيل دفعة الشهر الجديد
  const handleSubmitPayment = (e) => {
    e.preventDefault()
    if (!payingStudent) return

    studentService.recordMonthlyPayment(payingStudent.id, {
      amount: paymentForm.amount,
      paymentMethod: paymentForm.paymentMethod,
      cycle: paymentForm.cycle,
      notes: paymentForm.notes,
    })

    showToast(`✓ تم تسجيل دفع ${paymentForm.amount} دج للطالب ${payingStudent.fullName}. بدأت دورة جديدة (0/${payingStudent.sessionsPerMonth} حصص) !`)
    setPayingStudent(null)
    if (viewingStudent && viewingStudent.id === payingStudent.id) {
      const refreshed = studentService.getStudents().find((s) => s.id === payingStudent.id)
      setViewingStudent(refreshed)
    }
  }

  // إضافة طالب جديد
  const handleAddStudentSubmit = (e) => {
    e.preventDefault()
    if (!newStudentForm.studentName.trim()) return

    studentService.addOnlineEnrollment({
      studentName: newStudentForm.studentName,
      parentName: newStudentForm.parentName || 'الولي / الوصي',
      phone: newStudentForm.phone,
      email: newStudentForm.email,
      address: newStudentForm.address,
      courseName: newStudentForm.courseName,
      teacherName: newStudentForm.teacherName,
      monthlyPrice: Number(newStudentForm.monthlyPrice),
      sessionsPerMonth: Number(newStudentForm.sessionsPerMonth),
    })

    showToast(`تم إنشاء طلب تسجيل جديد للطالب ${newStudentForm.studentName} (قيد التأكيد الفعلي).`)
    setIsAddStudentOpen(false)
    setNewStudentForm({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      address: '',
      courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
      teacherName: 'أ. سارة بن علي',
      monthlyPrice: 3000,
      sessionsPerMonth: 4,
    })
  }

  // الحسابات المالية
  const totalRevenueCollected = students.reduce((acc, s) => {
    const studentTotal = (s.paymentHistory || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
    return acc + studentTotal
  }, 0)

  const expectedMonthlyRevenue = students
    .filter((s) => s.status === 'Active')
    .reduce((sum, s) => sum + (Number(s.monthlyPrice) || 0), 0)

  return (
    <div className="dashboard-page-canvas">
      {/* التنبيه اللحظي المنبثق */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            left: '24px',
            background: '#111827',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '14px',
            boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10000,
            fontSize: '13.5px',
            fontWeight: '600',
            animation: 'fadeIn 0.25s ease-out',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="dashboard-app-container">
        {/* ========================================================
            القائمة الجانبية (SIDEBAR)
            ======================================================== */}
        <aside className="dashboard-sidebar">
          <div>
            {/* الشعار والهوية */}
            <div className="sidebar-brand" onClick={() => setActiveTab('student')}>
              <div className="brand-logo-icon">
                <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                  <path d="M22 6C20.5 9 17 11 13 11C13 15 16 18 20 18C22 15 22 10 22 6Z" fill="#3F8F71" />
                  <path d="M22 6C23.5 9 27 11 31 11C31 15 28 18 24 18C22 15 22 10 22 6Z" fill="#28624E" />
                  <circle cx="22" cy="14" r="3" fill="#D9A441" />
                  <path d="M8 22C13 20 18 21 22 24C26 21 31 20 36 22C34 27 29 29 22 29C15 29 10 27 8 22Z" fill="#172033" />
                  <path d="M6 31C12 29 18 30 22 33C26 30 32 29 38 31C36 34 30 36 22 36C14 36 8 34 6 31Z" fill="#2C4870" />
                  <rect x="20.5" y="24" width="3" height="12" rx="1.5" fill="#172033" />
                </svg>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">School</span>
                <span className="brand-subtext">منصة التعليم والإدارة</span>
              </div>
            </div>

            {/* روابط التنقل */}
            <nav className="sidebar-nav">
              <button
                className={`sidebar-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
                type="button"
                id="tab-btn-home"
              >
                <Home size={19} className="nav-item-icon" />
                <span>الرئيسية</span>
                {activeTab === 'home' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => setActiveTab('student')}
                type="button"
                id="tab-btn-student"
              >
                <GraduationCap size={19} className="nav-item-icon" />
                <span>الطلاب</span>
                {paymentsDueCount > 0 && (
                  <span className="sidebar-badge-count badge-amber-bg">
                    {paymentsDueCount} مستحق
                  </span>
                )}
                {activeTab === 'student' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
                onClick={() => setActiveTab('announcements')}
                type="button"
                id="tab-btn-announcements"
              >
                <Megaphone size={19} className="nav-item-icon" />
                <span>إعلانات الفصول</span>
                <span className="sidebar-badge-count" style={{ background: '#E4EAF3', color: '#2C4870' }}>
                  {announcements.length}
                </span>
                {activeTab === 'announcements' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'statistique' ? 'active' : ''}`}
                onClick={() => setActiveTab('statistique')}
                type="button"
                id="tab-btn-statistique"
              >
                <BarChart2 size={19} className="nav-item-icon" />
                <span>الإحصائيات</span>
                {activeTab === 'statistique' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'teacher' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher')}
                type="button"
                id="tab-btn-teacher"
              >
                <Users size={19} className="nav-item-icon" />
                <span>هيئة التدريس</span>
                {activeTab === 'teacher' && <span className="nav-active-dot" />}
              </button>
            </nav>
          </div>

          {/* بطاقة المدير السفلية */}
          <div className="sidebar-profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <User size={19} />
              </div>
              <div className="profile-info">
                <span className="profile-name">المدير ({ADMIN_PHONE})</span>
                <span className="profile-role">مسؤول المنصة</span>
              </div>
            </div>
            <ChevronDown size={18} className="profile-chevron" />
          </div>
        </aside>

        {/* ========================================================
            منطقة المحتوى الرئيسي (MAIN CONTENT)
            ======================================================== */}
        <main className="dashboard-main-content">
          {/* الشريط العلوي للترحيب */}
          <header className="dashboard-topbar">
            <div>
              {activeTab === 'student' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    إدارة الطلاب والمدفوعات الشهرية 🎓
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    متابعة دورة الـ 4 حصص، تذكيرات WhatsApp التلقائية وتأكيد الاشتراكات في مقر المدرسة.
                  </p>
                </>
              )}

              {activeTab === 'announcements' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    إدارة إعلانات الفصول والأفواج الجديدة 📢
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    إنشاء ونشر إعلانات الأفواج والدروس لتظهر مباشرة للطلاب في الصفحة الرئيسية وصفحة الفصول للتسجيل الفوري.
                  </p>
                </>
              )}

              {activeTab === 'home' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    مرحباً بك، المدير ({ADMIN_PHONE}) <span role="img" aria-label="wave">👋</span>
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    إليك نظرة شاملة على أداء المؤسسة، مؤشرات الحضور، وسير الاشتراكات.
                  </p>
                </>
              )}

              {activeTab === 'statistique' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    الإحصائيات والتقارير المالية 📈
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    متابعة المداخيل المحصلة، نسب الحضور الأكاديمي، وتوزيع الطلاب على المواد.
                  </p>
                </>
              )}

              {activeTab === 'teacher' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    هيئة التدريس والأساتذة 👨‍🏫
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    إدارة الأساتذة، المواد المسندة إليهم، وتتبع أعداد الطلاب في كل فوج.
                  </p>
                </>
              )}
            </div>

            <div className="topbar-actions">
              <div style={{ position: 'relative' }}>
                <button
                  className="topbar-circle-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="التنبيهات"
                  type="button"
                >
                  <Bell size={20} />
                  {(pendingEnrollmentsCount > 0 || paymentsDueCount > 0) && (
                    <span className="notification-badge-dot" />
                  )}
                </button>

                {notificationsOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50px',
                      left: '0',
                      width: '320px',
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                      border: '1px solid #F3F4F6',
                      padding: '16px',
                      zIndex: 100,
                    }}
                  >
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '10px' }}>
                      أحدث التنبيهات والإعلانات
                    </h4>
                    {paymentsDueCount > 0 && (
                      <div
                        style={{
                          background: '#FFFBEB',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#92400E',
                          marginBottom: '8px',
                          fontWeight: '600',
                          border: '1px solid #FDE68A',
                        }}
                      >
                        ⚠️ يوجد {paymentsDueCount} طالب(ين) أتموا حصتهم الرابعة ويجب عليهم تجديد الاشتراك.
                      </div>
                    )}
                    {topPinnedAnnouncement && (
                      <div
                        style={{
                          background: '#E4EAF3',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: 'var(--color-navy, #172033)',
                          marginBottom: '8px',
                          fontWeight: '600',
                          border: '1px solid #C3CFE0',
                        }}
                      >
                        📢 <strong>{topPinnedAnnouncement.title}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button className="topbar-circle-btn" aria-label="القائمة" type="button">
                <Menu size={20} />
              </button>
            </div>
          </header>

          {/* ========================================================
              تبويب: إعلانات الفصول والأفواج (CLASS ADS)
              ======================================================== */}
          {activeTab === 'announcements' && (
            <div className="tab-view-container">
              {/* بطاقات المؤشرات */}
              <div className="summary-kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('all')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">إجمالي إعلانات الفصول</span>
                    <div className="kpi-icon-square" style={{ background: '#E4EAF3', color: '#2C4870' }}>
                      <Megaphone size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display">{announcements.length}</div>
                  <span className="kpi-sub-badge">جميع الأفواج المنشورة</span>
                </div>

                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('all')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#059669' }}>أفواج مثبتة في الموقع</span>
                    <div className="kpi-icon-square" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <Pin size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#059669' }}>
                    {announcements.filter((a) => a.isPinned).length}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#059669' }}>تظهر في الرئيسية والفصول</span>
                </div>

                <div className="summary-kpi-card">
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#8D4C17' }}>المقاعد المتاحة</span>
                    <div className="kpi-icon-square" style={{ background: '#F3E4D0', color: '#8D4C17' }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#8D4C17' }}>
                    {announcements.reduce((acc, a) => acc + (Number(a.spotsLeft) || 0), 0)} مقعد
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#C9752F' }}>جاهزة لاستقبال الطلاب</span>
                </div>

                <div className="summary-kpi-card">
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#6B3F79' }}>التسجيل الفوري</span>
                    <div className="kpi-icon-square" style={{ background: '#EDE3F0', color: '#6B3F79' }}>
                      <Zap size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#6B3F79' }}>نشط 🟢</div>
                  <span className="kpi-sub-badge" style={{ color: '#6B3F79' }}>متاح في الموقع للزوار</span>
                </div>
              </div>

              {/* شريط الأدوات والفلترة حسب المادة */}
              <div className="students-toolbar">
                <div className="student-search-box">
                  <Search size={16} className="student-search-icon" />
                  <input
                    type="text"
                    className="student-search-input"
                    placeholder="ابحث عن إعلان مادة، اسم الأستاذ، أو الفوج..."
                    value={announcementSearch}
                    onChange={(e) => setAnnouncementSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '6px', background: '#FFFFFF', padding: '4px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    {['all', 'الرياضيات', 'اللغات', 'العلوم', 'التكنولوجيا'].map((cat) => (
                      <button
                        key={cat}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: selectedAnnCategory === cat ? 'var(--admin-primary, #2C4870)' : 'transparent',
                          color: selectedAnnCategory === cat ? '#FFFFFF' : '#4B5563',
                        }}
                        onClick={() => setSelectedAnnCategory(cat)}
                        type="button"
                      >
                        {cat === 'all' ? 'جميع المواد' : cat}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddAnnouncementOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>+ إنشاء إعلان فوج جديد</span>
                  </button>
                </div>
              </div>

              {/* شبكة بطاقات إعلانات الفصول */}
              <div className="announcements-grid">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((ann) => (
                    <div
                      key={ann.id}
                      className={`announcement-card-box ${ann.isPinned ? 'pinned-card' : ''}`}
                    >
                      <div>
                        <div className="ann-card-top-row">
                          <div className="ann-badge-group">
                            <span className="ann-category-badge cat-badge-pedagogique">
                              <Tag size={11} />
                              <span>{ann.category || 'فصل دراسي'}</span>
                            </span>

                            {ann.isPinned && (
                              <span className="ann-pinned-tag">
                                <Pin size={11} />
                                <span>ظاهر في الموقع</span>
                              </span>
                            )}
                          </div>

                          <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: '600' }}>
                            {ann.date}
                          </span>
                        </div>

                        <h3 className="ann-card-title">{ann.title}</h3>
                        <p className="ann-card-content-preview">{ann.content}</p>

                        <div
                          style={{
                            marginTop: '12px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                            fontSize: '12px',
                            background: '#F8FAFC',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-navy, #172033)', fontWeight: '700' }}>
                            <User size={14} />
                            <span>{ann.teacherName || 'أستاذ المادة'}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontWeight: '700' }}>
                            <CreditCard size={14} />
                            <span>{ann.price || '4,500 دج / شهر'}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '600', gridColumn: 'span 2' }}>
                            <Clock size={14} />
                            <span>{ann.schedule || 'توقيت الحصص الأسبوعية'}</span>
                          </div>

                          {ann.spotsLeft && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontWeight: '800', gridColumn: 'span 2' }}>
                              <span>🔥 المقاعد المتبقية: <strong>{ann.spotsLeft} مقاعد</strong></span>
                            </div>
                          )}
                        </div>

                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
                          🎯 المستوى المستهدف : <span style={{ color: '#1E293B' }}>{ann.targetAudience}</span>
                        </div>
                      </div>

                      <div className="ann-card-footer">
                        <div className="ann-author-info">
                          <User size={13} color="var(--admin-primary, #2C4870)" />
                          <span>{ann.author}</span>
                        </div>

                        <div className="ann-actions-btns">
                          <button
                            className="btn-action-icon-sm"
                            title={ann.isPinned ? 'إلغاء التثبيت' : 'تثبيت في الأعلى'}
                            onClick={() => handleTogglePin(ann.id)}
                            style={{ color: ann.isPinned ? '#D97706' : '#6B7280' }}
                            type="button"
                          >
                            <Pin size={14} />
                          </button>
                          <button
                            className="btn-action-icon-sm"
                            title="قراءة الإعلان كاملاً"
                            onClick={() => setViewingAnnouncement(ann)}
                            type="button"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn-action-icon-sm btn-delete"
                            title="حذف الإعلان"
                            onClick={() => handleDeleteAnnouncement(ann.id)}
                            type="button"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', padding: '50px 20px', borderRadius: '20px', textAlign: 'center', color: '#9CA3AF', border: '1px solid #F3F4F6' }}>
                    <Megaphone size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                    <p style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>لم يتم العثور على أي إعلانات</p>
                    <p style={{ fontSize: '13px' }}>انقر على "+ إنشاء إعلان جديد" لنشر تنبيه للطلاب وأولياء الأمور.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              تبويب: إدارة الطلاب (STUDENT MANAGEMENT)
              ======================================================== */}
          {activeTab === 'student' && (
            <div className="tab-view-container">
              {/* بطاقات المؤشرات العلوية */}
              <div className="summary-kpi-grid">
                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('all')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">إجمالي الطلاب</span>
                    <div className="kpi-icon-square" style={{ background: '#F3F4F6', color: '#4B5563' }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display">{totalStudentsCount}</div>
                  <span className="kpi-sub-badge">جميع المسجلين</span>
                </div>

                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'active' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('active')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">الطلاب النشطين</span>
                    <div className="kpi-icon-square" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#059669' }}>
                    {activeStudentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#059669' }}>
                    🟢 قيد الدراسة
                  </span>
                </div>

                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'pending' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('pending')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">قيد الانتظار</span>
                    <div className="kpi-icon-square" style={{ background: '#E4EAF3', color: '#2C4870' }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#2C4870' }}>
                    {pendingEnrollmentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#2C4870' }}>
                    🔵 قيد التأكيد الفعلي
                  </span>
                </div>

                <div
                  className={`summary-kpi-card card-warning ${selectedFilterCategory === 'due' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('due')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#B45309' }}>
                      المدفوعات المطلوبة
                    </span>
                    <div className="kpi-icon-square" style={{ background: '#FEF3C7', color: '#D97706' }}>
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#D97706' }}>
                    {paymentsDueCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#D97706', fontWeight: '700' }}>
                    🟠 4/4 حصص مكتملة
                  </span>
                </div>

                <div
                  className={`summary-kpi-card card-danger ${selectedFilterCategory === 'overdue' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('overdue')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#DC2626' }}>
                      متأخر
                    </span>
                    <div className="kpi-icon-square" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                      <AlertTriangle size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#DC2626' }}>
                    {overduePaymentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#DC2626' }}>
                    🔴 تجاوز الموعد النهائي
                  </span>
                </div>
              </div>

              {/* قسم المدفوعات المستحقة وتذكيرات الواتساب الفورية */}
              {studentsWithPaymentDue.length > 0 && (
                <section className="payments-due-banner-section">
                  <div className="payments-due-header">
                    <div className="payments-due-title-wrap">
                      <div className="payments-due-icon-badge">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h2 className="payments-due-heading">
                          المدفوعات المستحقة (4/4 حصص مكتملة) 📲
                        </h2>
                        <p className="payments-due-subtext">
                          أتم هؤلاء الطلاب كامل حصص الشهر. يمكنك إرسال تذكير تلقائي عبر <strong>WhatsApp</strong> من الرقم <strong>{ADMIN_PHONE}</strong>.
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        background: '#F59E0B',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {studentsWithPaymentDue.length} بحاجة للتجديد
                    </span>
                  </div>

                  <div className="payments-due-cards-row">
                    {studentsWithPaymentDue.map((student) => (
                      <div className="payment-due-item-card" key={student.id}>
                        <div>
                          <div className="due-item-top">
                            <div>
                              <span className="due-student-name">{student.fullName}</span>
                              <div className="due-course-tag">
                                {student.courseName} • {student.teacherName}
                              </div>
                              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                📞 الهاتف: <strong>{student.phone}</strong>
                              </div>
                            </div>
                            <span className="due-amount-pill">{student.monthlyPrice} دج</span>
                          </div>

                          <div className="due-message-callout" style={{ marginTop: '10px' }}>
                            <strong>اكتملت الدورة ({student.sessionsCompleted}/{student.sessionsPerMonth} حصص).</strong>
                            <br />
                            مبلغ {student.monthlyPrice} دج مطلوب لتجديد الاشتراك ({student.currentCycle}).
                          </div>
                        </div>

                        <div className="due-actions-btn-group">
                          <button
                            className="btn-record-payment-primary"
                            onClick={() => handleOpenPaymentModal(student)}
                            type="button"
                          >
                            <CreditCard size={15} />
                            <span>تسجيل دفع</span>
                          </button>

                          <button
                            className="btn-whatsapp-reminder"
                            onClick={() => handleOpenWhatsAppModal(student)}
                            title={`إرسال تذكير واتساب إلى ${student.phone}`}
                            type="button"
                          >
                            <MessageSquare size={15} />
                            <span>تذكير WhatsApp</span>
                          </button>

                          <button
                            className="btn-action-icon-sm"
                            title="عرض الملف"
                            onClick={() => setViewingStudent(student)}
                            type="button"
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* شريط الأدوات والبحث */}
              <div className="students-toolbar">
                <div className="student-search-box">
                  <Search size={16} className="student-search-icon" />
                  <input
                    type="text"
                    className="student-search-input"
                    placeholder="ابحث بالاسم، الولي، أو رقم الهاتف (مثال: 0555123456)..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '6px', background: '#FFFFFF', padding: '4px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    <button
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        background: selectedFilterCategory === 'all' ? 'var(--admin-primary, #2C4870)' : 'transparent',
                        color: selectedFilterCategory === 'all' ? '#FFFFFF' : '#4B5563',
                      }}
                      onClick={() => setSelectedFilterCategory('all')}
                      type="button"
                    >
                      الكل ({totalStudentsCount})
                    </button>
                    <button
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        background: selectedFilterCategory === 'active' ? '#10B981' : 'transparent',
                        color: selectedFilterCategory === 'active' ? '#FFFFFF' : '#4B5563',
                      }}
                      onClick={() => setSelectedFilterCategory('active')}
                      type="button"
                    >
                      النشطين ({activeStudentsCount})
                    </button>
                    <button
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        background: selectedFilterCategory === 'due' ? '#F59E0B' : 'transparent',
                        color: selectedFilterCategory === 'due' ? '#FFFFFF' : '#4B5563',
                      }}
                      onClick={() => setSelectedFilterCategory('due')}
                      type="button"
                    >
                      المدفوعات المطلوبة ({paymentsDueCount})
                    </button>
                  </div>

                  <select
                    className="student-filter-select"
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                  >
                    <option value="all">جميع المواد</option>
                    <option value="الرياضيات">الرياضيات</option>
                    <option value="الإنجليزية">اللغة الإنجليزية</option>
                    <option value="الفرنسية">اللغة الفرنسية</option>
                    <option value="العلوم">العلوم والفيزياء</option>
                    <option value="الإعلام">الإعلام الآلي</option>
                  </select>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 14px',
                      background: '#F0FDF4',
                      color: '#16A34A',
                      border: '1.5px solid #BBF7D0',
                      borderRadius: '12px',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                    title="تسجيل حضور حصة تلقائياً لجميع طلاب الفوج المحدد"
                    onClick={() => {
                      const count = studentService.autoAdvanceClassSessions(selectedClassFilter === 'all' ? null : selectedClassFilter)
                      if (count > 0) {
                        showToast(`⚡ تم تسجيل حضور الحصة تلقائياً لـ ${count} طالب(ين) !`)
                      } else {
                        showToast(`جميع الطلاب المحددين أتموا حصصهم أو بحاجة لتسديد الاشتراك.`)
                      }
                    }}
                    type="button"
                  >
                    <ClipboardCheck size={14} />
                    <span>تسجيل حضور حصة اليوم</span>
                  </button>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddStudentOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>+ تسجيل طالب جديد</span>
                  </button>
                </div>
              </div>

              {/* جدول الطلاب */}
              <div className="students-table-card">
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>الطالب</th>
                        <th>المادة والأستاذ</th>
                        <th>الحصص (الدورة الحالية)</th>
                        <th>حالة الدفع</th>
                        <th>الموعد القادم</th>
                        <th>حالة الحساب</th>
                        <th style={{ textAlign: 'left' }}>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => {
                          const isComplete = student.sessionsCompleted >= student.sessionsPerMonth
                          const percent = Math.min(
                            100,
                            Math.round((student.sessionsCompleted / student.sessionsPerMonth) * 100)
                          )

                          return (
                            <tr key={student.id}>
                              <td>
                                <div className="student-avatar-cell">
                                  <div
                                    className="student-initial-avatar avatar-blue"
                                    style={{
                                      background:
                                        student.status === 'Active'
                                          ? '#DDE3EE'
                                          : student.status === 'Pending Approval'
                                            ? '#E4EAF3'
                                            : '#F5DEDA',
                                      color:
                                        student.status === 'Active'
                                          ? '#172033'
                                          : student.status === 'Pending Approval'
                                            ? '#2C4870'
                                            : '#B23B2E',
                                    }}
                                  >
                                    {student.fullName
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')
                                      .slice(0, 2)}
                                  </div>
                                  <div>
                                    <div className="student-name-text">{student.fullName}</div>
                                    <div className="student-id-code">
                                      {student.id} • 📞 {student.phone}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div style={{ fontWeight: '700', color: '#1E293B' }}>
                                  {student.courseName}
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748B' }}>
                                  {student.teacherName} • {student.monthlyPrice} دج / شهر
                                </div>
                              </td>

                              <td>
                                <div className="session-counter-cell">
                                  <div className="session-number-pill">
                                    <span style={{ color: isComplete ? '#D97706' : '#1E293B', fontWeight: '800' }}>
                                      {student.sessionsCompleted} / {student.sessionsPerMonth} حصص
                                    </span>
                                    <span style={{ fontSize: '11px', color: isComplete ? '#D97706' : '#94A3B8', fontWeight: isComplete ? '800' : '500' }}>
                                      {percent}%
                                    </span>
                                  </div>
                                  <div className="session-progress-track">
                                    <div
                                      className={`session-progress-fill ${isComplete ? 'fill-progress-complete' : 'fill-progress-active'
                                        }`}
                                      style={{ width: `${percent}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td>
                                {student.paymentStatus === 'Paid' && (
                                  <span className="badge-status-pill status-paid">
                                    <CheckCircle2 size={12} />
                                    <span>🟢 مسدد</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Payment Required' && (
                                  <span className="badge-status-pill status-due">
                                    <AlertCircle size={12} />
                                    <span>🟠 دفع مطلوب</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Overdue' && (
                                  <span className="badge-status-pill status-overdue">
                                    <AlertTriangle size={12} />
                                    <span>🔴 متأخر</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Pending Approval' && (
                                  <span className="badge-status-pill status-pending">
                                    <Clock size={12} />
                                    <span>🔵 قيد الانتظار</span>
                                  </span>
                                )}
                              </td>

                              <td>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: isComplete ? '#B23B2E' : '#334155' }}>
                                  {student.nextPaymentDate}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                                  الدورة : {student.currentCycle}
                                </div>
                              </td>

                              <td>
                                <span
                                  className="badge-status-pill"
                                  style={{
                                    background:
                                      student.status === 'Active'
                                        ? '#DCEAE3'
                                        : student.status === 'Pending Approval'
                                          ? '#E4EAF3'
                                          : student.status === 'Payment Overdue'
                                            ? '#F5DEDA'
                                            : '#F1EDE5',
                                    color:
                                      student.status === 'Active'
                                        ? '#28624E'
                                        : student.status === 'Pending Approval'
                                          ? '#2C4870'
                                          : student.status === 'Payment Overdue'
                                            ? '#B23B2E'
                                            : '#5A6270',
                                  }}
                                >
                                  {student.status === 'Active'
                                    ? 'نشط'
                                    : student.status === 'Pending Approval'
                                      ? 'قيد الانتظار'
                                      : student.status === 'Payment Overdue'
                                        ? 'اشتراك متأخر'
                                        : student.status}
                                </span>
                              </td>

                              <td>
                                <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                                  {student.paymentStatus === 'Payment Required' && (
                                    <button
                                      className="btn-whatsapp-outline"
                                      onClick={() => handleOpenWhatsAppModal(student)}
                                      title={`إرسال تذكير واتساب إلى ${student.phone}`}
                                      type="button"
                                    >
                                      <MessageSquare size={13} />
                                      <span>واتساب</span>
                                    </button>
                                  )}

                                  {student.status === 'Pending Approval' ? (
                                    <button
                                      className="btn-action-outline btn-action-approve"
                                      onClick={() => handleOpenApproveModal(student)}
                                      type="button"
                                    >
                                      <Check size={14} />
                                      <span>تأكيد ودفع أول</span>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn-action-outline btn-action-pay"
                                      onClick={() => handleOpenPaymentModal(student)}
                                      type="button"
                                    >
                                      <CreditCard size={13} />
                                      <span>دفع</span>
                                    </button>
                                  )}

                                  <button
                                    className="btn-action-outline"
                                    onClick={() => setViewingStudent(student)}
                                    type="button"
                                  >
                                    <Eye size={13} />
                                    <span>الملف</span>
                                  </button>

                                  <button
                                    className="btn-action-icon-sm btn-delete"
                                    title="حذف"
                                    onClick={() => {
                                      if (confirm(`هل أنت متأكد من حذف ملف الطالب ${student.fullName}؟`)) {
                                        studentService.deleteStudent(student.id)
                                        showToast(`تم حذف الملف.`)
                                      }
                                    }}
                                    type="button"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
                            <GraduationCap size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                            <p style={{ fontWeight: '700', fontSize: '15px' }}>لم يتم العثور على أي طالب مطابق</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer-bar">
                  <span>
                    عرض <strong>{filteredStudents.length}</strong> من أصل <strong>{students.length}</strong> طالب
                  </span>
                  <div className="pagination-controls">
                    <button className="page-btn active" type="button">1</button>
                    <button className="page-btn" type="button">2</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              تبويب: الرئيسية (HOME TAB)
              ======================================================== */}
          {activeTab === 'home' && (
            <div className="tab-view-container">
              {/* شريط الإعلان المثبت */}
              {topPinnedAnnouncement && (
                <div className="announcements-home-banner">
                  <div className="ann-home-left">
                    <div className="ann-home-icon-circle">
                      <Megaphone size={22} />
                    </div>
                    <div>
                      <div className="ann-home-title">{topPinnedAnnouncement.title}</div>
                      <div className="ann-home-text">{topPinnedAnnouncement.content.slice(0, 120)}...</div>
                    </div>
                  </div>
                  <button
                    className="btn-add-student-primary"
                    style={{ background: 'var(--admin-primary, #2C4870)', padding: '8px 16px', fontSize: '12.5px', whiteSpace: 'nowrap' }}
                    onClick={() => setActiveTab('announcements')}
                    type="button"
                  >
                    <span>عرض جميع إعلانات الفصول ({announcements.length})</span>
                    <ChevronLeft size={16} />
                  </button>
                </div>
              )}

              {/* قسم 1: نظرة عامة والحضور */}
              <section className="dashboard-card-panel">
                <div className="panel-header-row">
                  <div className="panel-title-wrap">
                    <div className="panel-icon-badge">
                      <TrendingUp size={20} />
                    </div>
                    <h2 className="panel-title-text">نظرة عامة والحضور الأسبوعي</h2>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <button
                      className="period-dropdown-btn"
                      onClick={() => setPeriodMenuOpen(!periodMenuOpen)}
                      type="button"
                    >
                      <span>{selectedPeriod}</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                <div className="overview-grid-layout">
                  <div className="chart-container-wrap">
                    <div className="chart-grid-axis">
                      {[200, 150, 100, 50, 0].map((num) => (
                        <div className="chart-grid-line" key={num}>
                          <span className="axis-y-label">{num}</span>
                          <span className="dashed-line" />
                        </div>
                      ))}
                    </div>

                    <div className="chart-bars-stage">
                      {[
                        { day: 'الأحد', value: 120 },
                        { day: 'الإثنين', value: 170 },
                        { day: 'الثلاثاء', value: 200 },
                        { day: 'الأربعاء', value: 150 },
                      ].map((item, idx) => (
                        <div className="bar-column" key={idx}>
                          <div className="bar-tooltip">{item.value} حضور</div>
                          <div className="bar-pill" style={{ height: `${(item.value / 200) * 100}%` }} />
                          <span className="axis-x-label">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="metric-summary-card">
                    <div className="metric-card-top">
                      <span className="metric-label-title">إجمالي الطلاب النشطين</span>
                      <div className="metric-icon-badge">
                        <Users size={20} />
                      </div>
                    </div>

                    <div className="metric-big-number">{activeStudentsCount}</div>

                    <div className="metric-trend-row">
                      <span className="trend-badge-green">
                        <span>↑ 12%</span>
                      </span>
                      <span>مقارنة بالشهر السابق</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* قسم 2: الإجراءات السريعة */}
              <section className="dashboard-card-panel">
                <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                  <div className="panel-title-wrap">
                    <div className="panel-icon-badge badge-zap">
                      <Zap size={20} />
                    </div>
                    <h2 className="panel-title-text">إجراءات سريعة</h2>
                  </div>
                </div>

                <div className="quick-actions-list">
                  <div className="quick-action-row" onClick={() => setActiveTab('student')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-blue">
                        <Users size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">إدارة الطلاب والمدفوعات</span>
                        <span className="action-subtitle">
                          {paymentsDueCount > 0
                            ? `${paymentsDueCount} طالب(ين) يجب عليهم تجديد اشتراكهم`
                            : 'متابعة التسجيلات والحصص'}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="action-arrow-icon" />
                  </div>

                  <div className="quick-action-row" onClick={() => setActiveTab('announcements')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-purple">
                        <Megaphone size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">نشر إعلان جديد</span>
                        <span className="action-subtitle">إنشاء إشعار مدرسي أو تذكير</span>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="action-arrow-icon" />
                  </div>

                  <div className="quick-action-row" onClick={() => setActiveTab('statistique')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-green">
                        <BarChart2 size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">عرض التقارير المالية والإيرادات</span>
                        <span className="action-subtitle">الاطلاع على المعاملات والميزانيات</span>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="action-arrow-icon" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================
              تبويب: الإحصائيات (STATISTICS TAB)
              ======================================================== */}
          {activeTab === 'statistique' && (
            <div className="tab-view-container">
              <div className="stats-kpi-grid">
                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">إجمالي المداخيل المحصلة</span>
                    <div className="kpi-icon-pill" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">{totalRevenueCollected.toLocaleString()} دج</span>
                    <span className="kpi-sub-trend" style={{ color: '#28624E' }}>
                      ↑ في الصندوق والحسابات البنكية
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">المداخيل الشهرية المتوقعة</span>
                    <div className="kpi-icon-pill" style={{ background: '#E4EAF3', color: '#2C4870' }}>
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">{expectedMonthlyRevenue.toLocaleString()} دج</span>
                    <span className="kpi-sub-trend" style={{ color: '#2C4870' }}>
                      للطلاب في حالة نشط
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">مدفوعات مستحقة (4/4)</span>
                    <div className="kpi-icon-pill" style={{ background: '#F3E4D0', color: '#8D4C17' }}>
                      <AlertCircle size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number" style={{ color: '#D97706' }}>{paymentsDueCount}</span>
                    <span className="kpi-sub-trend" style={{ color: '#D97706' }}>
                      أتموا حصص الشهر بالكامل
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">طلبات تسجيل قيد الانتظار</span>
                    <div className="kpi-icon-pill" style={{ background: '#FAF5FF', color: '#9333EA' }}>
                      <Clock size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number" style={{ color: '#9333EA' }}>{pendingEnrollmentsCount}</span>
                    <span className="kpi-sub-trend" style={{ color: '#9333EA' }}>
                      بانتظار التأكيد الفعلي بالمدرسة
                    </span>
                  </div>
                </div>
              </div>

              <div className="analytics-two-col-grid">
                <section className="dashboard-card-panel">
                  <div className="panel-header-row">
                    <div className="panel-title-wrap">
                      <div className="panel-icon-badge badge-green">
                        <BarChart2 size={20} />
                      </div>
                      <h2 className="panel-title-text">توزيع الحضور والالتزام حسب المادة</h2>
                    </div>
                  </div>

                  <div className="subject-progress-list">
                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>الرياضيات المتقدمة (2 ثانوي وبكالوريا)</span>
                        <span className="subject-rate">94%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-blue" style={{ width: '94%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>العلوم التجريبية والفيزياء</span>
                        <span className="subject-rate">90%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-purple" style={{ width: '90%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>اللغة الإنجليزية (مكثف)</span>
                        <span className="subject-rate">96%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-green" style={{ width: '96%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>الإعلام الآلي وتطوير الويب</span>
                        <span className="subject-rate">98%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-amber" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="dashboard-card-panel">
                  <div className="panel-header-row">
                    <div className="panel-title-wrap">
                      <div className="panel-icon-badge badge-purple">
                        <GraduationCap size={20} />
                      </div>
                      <h2 className="panel-title-text">إحصائيات وتوزيع الطلاب</h2>
                    </div>
                  </div>

                  <div className="level-distribution-grid">
                    <div className="level-dist-card">
                      <span className="level-dist-title">الطلاب النشطين (مسدد)</span>
                      <span className="level-dist-count" style={{ color: '#059669' }}>{activeStudentsCount}</span>
                      <span className="level-dist-meta">طالب في وضعية نظامية</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">مدفوعات مستحقة (4/4)</span>
                      <span className="level-dist-count" style={{ color: '#8D4C17' }}>{paymentsDueCount}</span>
                      <span className="level-dist-meta">بحاجة لتجديد الاشتراك</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">قيد التأكيد الفعلي</span>
                      <span className="level-dist-count" style={{ color: '#2C4870' }}>{pendingEnrollmentsCount}</span>
                      <span className="level-dist-meta">بانتظار التأكيد بالمدرسة</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">مدفوعات متأخرة</span>
                      <span className="level-dist-count" style={{ color: '#B23B2E' }}>{overduePaymentsCount}</span>
                      <span className="level-dist-meta">ملفات قيد المتابعة</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================
              تبويب: هيئة التدريس (TEACHER TAB)
              ======================================================== */}
          {activeTab === 'teacher' && (
            <div className="tab-view-container">
              <div className="students-table-card">
                <div style={{ padding: '20px', borderBottom: '1px solid #F3F4F6' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: '800' }}>هيئة التدريس والأساتذة</h3>
                </div>
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>الأستاذ</th>
                        <th>المادة والتخصص</th>
                        <th>رقم الهاتف</th>
                        <th>الطلاب المسندين</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'أ. سارة بن علي', subject: 'الرياضيات (2 ثانوي وبكالوريا)', phone: '0550 12 34 56', count: 42 },
                        { name: 'أ. داود مورو', subject: 'اللغة الإنجليزية والفرنسية', phone: '0661 44 55 66', count: 38 },
                        { name: 'أ. أميرة المنصور', subject: 'العلوم والفيزياء', phone: '0770 88 99 11', count: 29 },
                        { name: 'أ. ماركوس تشن', subject: 'الإعلام الآلي والبرمجة', phone: '0555 77 88 99', count: 19 },
                      ].map((t, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="student-avatar-cell">
                              <div className="student-initial-avatar avatar-blue">{t.name.slice(3, 5)}</div>
                              <span className="student-name-text">{t.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge-class-pill" style={{ background: '#E4EAF3', color: '#2C4870' }}>
                              {t.subject}
                            </span>
                          </td>
                          <td>{t.phone}</td>
                          <td>
                            <strong>{t.count} طالب</strong>
                          </td>
                          <td>
                            <span className="badge-status-pill status-paid">🟢 نشط</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          نافذة: تذكير واتساب التلقائي بالدفع
          ======================================================== */}
      {whatsappModalStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setWhatsappModalStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                    إرسال تذكير عبر WhatsApp
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280' }}>
                    إشعار بانتهاء الحصص الشهرية وتجديد الاشتراك.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWhatsappModalStudent(null)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', padding: '14px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#15803D', textTransform: 'uppercase' }}>
                    المستلم (الطالب / الولي)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#14532D', marginTop: '2px' }}>
                    {whatsappModalStudent.fullName}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#166534', marginTop: '1px' }}>
                    📞 الهاتف: {whatsappModalStudent.phone}
                  </div>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#6B7280' }}>
                    المرسل (إدارة المدرسة)
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#111827' }}>
                    {ADMIN_PHONE}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#374151' }}>
                  نص رسالة WhatsApp (قابل للتعديل) :
                </label>
                <textarea
                  rows={8}
                  value={whatsappCustomMessage}
                  onChange={(e) => setWhatsappCustomMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    background: '#F8FAFC',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setWhatsappModalStudent(null)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppFromModal}
                  style={{
                    padding: '11px 22px',
                    borderRadius: '12px',
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                    fontSize: '13.5px',
                  }}
                >
                  <CheckCircle2 size={17} />
                  <span>تأكيد إرسال التذكير</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: إنشاء إعلان جديد
          ======================================================== */}
      {isAddAnnouncementOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddAnnouncementOpen(false)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="action-icon-circle circle-blue" style={{ width: '38px', height: '38px' }}>
                  <Megaphone size={19} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>نشر إعلان فوج / فصل دراسي جديد</h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280' }}>يظهر مباشرة في الصفحة الرئيسية وصفحة الفصول لتسجيل الطلاب الفوري.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddAnnouncementOpen(false)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleAddAnnouncementSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  عنوان الفوج أو الإعلان *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فوج الرياضيات المتقدمة مع الأستاذ أحمد (2 ثانوي وبكالوريا)"
                  value={newAnnForm.title}
                  onChange={(e) => setNewAnnForm({ ...newAnnForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    المادة / التخصص
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الرياضيات المتقدمة"
                    value={newAnnForm.courseName}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, courseName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    الأستاذ المشرف
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الأستاذ أحمد بن علي"
                    value={newAnnForm.teacherName}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, teacherName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    اسم الفوج والتوقيت
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: فوج نهاية الأسبوع (السبت والثلاثاء 14:00 - 16:00)"
                    value={newAnnForm.schedule}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, schedule: e.target.value, groupName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    رسوم الاشتراك الشهري
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 4,500 دج / شهر"
                    value={newAnnForm.price}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    المادة / المجال
                  </label>
                  <select
                    value={newAnnForm.category}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="الرياضيات">📐 الرياضيات</option>
                    <option value="اللغات">🌍 اللغات الأجنبية (إنجليزية / فرنسية)</option>
                    <option value="العلوم">🔬 العلوم التجريبية والفيزياء</option>
                    <option value="التكنولوجيا">💻 التكنولوجيا والبرمجة</option>
                    <option value="التعليم العام">📚 مواد أخرى</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    المقاعد المتاحة
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    placeholder="مثال: 8"
                    value={newAnnForm.spotsLeft || ''}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, spotsLeft: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  نص وتفاصيل الإعلان *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="اكتب تفاصيل البرنامج، أهداف الفوج، وشروط التسجيل..."
                  value={newAnnForm.content}
                  onChange={(e) => setNewAnnForm({ ...newAnnForm, content: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="pin-checkbox"
                  checked={newAnnForm.isPinned}
                  onChange={(e) => setNewAnnForm({ ...newAnnForm, isPinned: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="pin-checkbox" style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', cursor: 'pointer' }}>
                  📌 تثبيت هذا الإعلان في شريط الإعلانات في الصفحة الرئيسية وصفحة الفصول
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddAnnouncementOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '12px', background: 'var(--admin-primary, #2C4870)', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={15} />
                  <span>نشر الإعلان في الموقع</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: تفاصيل الإعلان
          ======================================================== */}
      {viewingAnnouncement && (
        <div className="dashboard-modal-backdrop" onClick={() => setViewingAnnouncement(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`ann-category-badge ${viewingAnnouncement.category === 'مدفوعات' ? 'cat-badge-payments' : 'cat-badge-pedagogique'}`}>
                  {viewingAnnouncement.category}
                </span>
                {viewingAnnouncement.isPinned && <span className="ann-pinned-tag">📌 مثبت</span>}
              </div>
              <button
                onClick={() => setViewingAnnouncement(null)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '14px 0 10px' }}>
              {viewingAnnouncement.title}
            </h2>

            <div style={{ display: 'flex', gap: '14px', fontSize: '12.5px', color: '#64748B', marginBottom: '18px' }}>
              <span>📅 النشر : {viewingAnnouncement.date}</span>
              <span>✍️ الكاتب : {viewingAnnouncement.author}</span>
              <span>🎯 الفئة : {viewingAnnouncement.targetAudience}</span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '18px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '14px', lineHeight: '1.7', color: '#1E293B', whiteSpace: 'pre-line' }}>
              {viewingAnnouncement.content}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setViewingAnnouncement(null)}
                style={{ padding: '10px 22px', borderRadius: '12px', background: 'var(--admin-primary, #2C4870)', color: '#FFFFFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: تأكيد التسجيل الفعلي بالمدرسة
          ======================================================== */}
      {approvingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setApprovingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  تأكيد التسجيل والدفعة الأولى
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  التأكيد الفعلي للطالب الحاضر في مقر المدرسة.
                </p>
              </div>
              <button
                onClick={() => setApprovingStudent(null)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleSubmitApproval} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="profile-modal-grid">
                <div className="profile-info-box">
                  <div className="profile-info-label">الطالب والولي</div>
                  <div className="profile-info-val">{approvingStudent.fullName}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    الولي: {approvingStudent.parentName} • {approvingStudent.phone}
                  </div>
                </div>

                <div className="profile-info-box">
                  <div className="profile-info-label">المادة والأستاذ</div>
                  <div className="profile-info-val">{approvingStudent.courseName}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    {approvingStudent.teacherName}
                  </div>
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    مبلغ الدفعة الأولى (دج) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={approvalForm.paymentAmount}
                    onChange={(e) => setApprovalForm({ ...approvalForm, paymentAmount: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', fontWeight: '700', color: '#1E293B', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    طريقة الدفع *
                  </label>
                  <select
                    value={approvalForm.paymentMethod}
                    onChange={(e) => setApprovalForm({ ...approvalForm, paymentMethod: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="نقداً (في الإدارة)">نقداً (في الإدارة)</option>
                    <option value="بريدي موب / CCP">بريدي موب / CCP</option>
                    <option value="تحويل بنكي">تحويل بنكي</option>
                    <option value="شيك">شيك</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    عدد الحصص الشهرية
                  </label>
                  <select
                    value={approvalForm.sessionsPerMonth}
                    onChange={(e) => setApprovalForm({ ...approvalForm, sessionsPerMonth: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value={4}>4 حصص / شهر (نظامي)</option>
                    <option value={8}>8 حصص / شهر (مكثف)</option>
                    <option value={12}>12 حصة / شهر (يومي)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    دورة الاشتراك الأولية
                  </label>
                  <input
                    type="text"
                    value={approvalForm.cycle}
                    onChange={(e) => setApprovalForm({ ...approvalForm, cycle: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setApprovingStudent(null)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: '12px', background: '#10B981', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={16} />
                  <span>تأكيد وتفعيل الطالب</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: تسجيل الدفعة الشهرية
          ======================================================== */}
      {payingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setPayingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  تسجيل الدفعة الشهرية
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  تجديد دورة الحصص الشهرية للطالب.
                </p>
              </div>
              <button
                onClick={() => setPayingStudent(null)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="profile-info-box">
                <div className="profile-info-label">الطالب والمادة</div>
                <div className="profile-info-val">{payingStudent.fullName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '2px' }}>
                  {payingStudent.courseName} • الأستاذ: {payingStudent.teacherName} • 📞 الهاتف: {payingStudent.phone}
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    المبلغ المسدد (دج) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', fontWeight: '700', color: '#1E293B', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    طريقة الدفع *
                  </label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="نقداً (في الإدارة)">نقداً (في الإدارة)</option>
                    <option value="بريدي موب / CCP">بريدي موب / CCP</option>
                    <option value="تحويل بنكي">تحويل بنكي</option>
                    <option value="شيك">شيك</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  الشهر / الدورة المعنية
                </label>
                <input
                  type="text"
                  value={paymentForm.cycle}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cycle: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '12px', fontSize: '12.5px', color: '#065F46' }}>
                ✓ فور التأكيد، سيتم إعادة ضبط عداد الحصص إلى <strong>0/{payingStudent.sessionsPerMonth}</strong> للدورة الجديدة وتتحول الحالة إلى <strong>مسدد</strong>.
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setPayingStudent(null)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: '12px', background: 'var(--admin-primary, #2C4870)', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CreditCard size={16} />
                  <span>تسجيل الدفعة الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: الملف الشخصي للطالب
          ======================================================== */}
      {viewingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setViewingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="student-initial-avatar avatar-blue" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                  {viewingStudent.fullName.slice(0, 2)}
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827' }}>
                    {viewingStudent.fullName}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
                      الرمز: {viewingStudent.id}
                    </span>
                    <span className={`badge-status-pill ${viewingStudent.paymentStatus === 'Paid' ? 'status-paid' : 'status-due'}`}>
                      {viewingStudent.paymentStatus === 'Paid' ? '🟢 مسدد' : '🟠 دفع مطلوب'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewingStudent(null)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <div className="profile-modal-grid">
              <div className="profile-info-box">
                <div className="profile-info-label">الولي ومعلومات الاتصال</div>
                <div className="profile-info-val">{viewingStudent.parentName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '3px' }}>
                  📞 {viewingStudent.phone}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  📍 {viewingStudent.address}
                </div>
              </div>

              <div className="profile-info-box">
                <div className="profile-info-label">المادة والأستاذ</div>
                <div className="profile-info-val">{viewingStudent.courseName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '3px' }}>
                  👨‍🏫 {viewingStudent.teacherName}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  الاشتراك: <strong>{viewingStudent.monthlyPrice} دج / شهر</strong> ({viewingStudent.sessionsPerMonth} حصص)
                </div>
              </div>
            </div>

            <div className="profile-current-cycle-card">
              <div>
                <div style={{ fontSize: '12px', color: 'var(--admin-primary, #2C4870)', fontWeight: '700', textTransform: 'uppercase' }}>
                  الدورة الحالية : {viewingStudent.currentCycle}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-navy, #172033)', marginTop: '4px' }}>
                  {viewingStudent.sessionsCompleted} من أصل {viewingStudent.sessionsPerMonth} حصص مكتملة
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                  {viewingStudent.sessionsCompleted >= viewingStudent.sessionsPerMonth
                    ? '⚠️ اكتملت جميع حصص الشهر. يرجى تسديد الاشتراك لتثبيت المقعد.'
                    : `تبقى ${viewingStudent.sessionsPerMonth - viewingStudent.sessionsCompleted} حصة قبل حلول موعد الدفع القادم.`}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="btn-whatsapp-reminder"
                  onClick={() => handleOpenWhatsAppModal(viewingStudent)}
                  type="button"
                >
                  <MessageSquare size={15} />
                  <span>تذكير WhatsApp</span>
                </button>
                <button
                  className="btn-record-payment-primary"
                  onClick={() => handleOpenPaymentModal(viewingStudent)}
                  style={{ alignSelf: 'center', padding: '10px 18px' }}
                  type="button"
                >
                  <CreditCard size={16} />
                  <span>تسجيل دفع</span>
                </button>
              </div>
            </div>

            {/* سجل المدفوعات */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                سجل المدفوعات السابقة ({viewingStudent.paymentHistory?.length || 0})
              </h4>
              {viewingStudent.paymentHistory && viewingStudent.paymentHistory.length > 0 ? (
                <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table className="payment-history-table">
                    <thead>
                      <tr>
                        <th>التاريخ</th>
                        <th>المبلغ</th>
                        <th>الدورة / الشهر</th>
                        <th>طريقة الدفع</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingStudent.paymentHistory.map((p, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: '600' }}>{p.paymentDate}</td>
                          <td style={{ fontWeight: '800', color: '#28624E' }}>{p.amount} دج</td>
                          <td>{p.cycle}</td>
                          <td>{p.paymentMethod}</td>
                          <td>
                            <span className="badge-status-pill status-paid">مؤكد</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '10px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                  لا توجد مدفوعات مسجلة حتى الآن.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          نافذة: تسجيل طالب جديد يدوياً
          ======================================================== */}
      {isAddStudentOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddStudentOpen(false)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  تسجيل طالب جديد
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  فتح ملف دراسي جديد في قاعدة بيانات المدرسة.
                </p>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  اسم ولقب التلميذ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ياسين بن علي"
                  value={newStudentForm.studentName}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, studentName: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    اسم الولي / الوصي
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: محمد بن علي"
                    value={newStudentForm.parentName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, parentName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    رقم الهاتف (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 0555123456"
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    المادة / الدورة
                  </label>
                  <select
                    value={newStudentForm.courseName}
                    onChange={(e) => {
                      const course = e.target.value
                      let teacher = 'أ. سارة بن علي'
                      let price = 3000
                      if (course.includes('الإنجليزية') || course.includes('الفرنسية')) {
                        teacher = 'أ. داود مورو'
                        price = 2200
                      } else if (course.includes('العلوم')) {
                        teacher = 'أ. أميرة المنصور'
                        price = 2800
                      } else if (course.includes('الإعلام')) {
                        teacher = 'أ. ماركوس تشن'
                        price = 3500
                      }
                      setNewStudentForm({ ...newStudentForm, courseName: course, teacherName: teacher, monthlyPrice: price })
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="الرياضيات المتقدمة (2 ثانوي وبكالوريا)">الرياضيات المتقدمة (2 ثانوي وبكالوريا)</option>
                    <option value="اللغة الإنجليزية (مكثف)">اللغة الإنجليزية (مكثف)</option>
                    <option value="اللغة الفرنسية والتواصل">اللغة الفرنسية والتواصل</option>
                    <option value="العلوم التجريبية والفيزياء">العلوم التجريبية والفيزياء</option>
                    <option value="الإعلام الآلي وتطوير الويب">الإعلام الآلي وتطوير الويب</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    الاشتراك الشهري (دج)
                  </label>
                  <input
                    type="number"
                    value={newStudentForm.monthlyPrice}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, monthlyPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '12px', background: 'var(--admin-primary, #2C4870)', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                >
                  حفظ وتسجيل الطالب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}