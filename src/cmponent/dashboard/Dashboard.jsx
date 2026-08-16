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
  Sparkles,
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
  const ADMIN_PHONE = '0667158842' // User's admin phone number
  const [activeTab, setActiveTab] = useState('student')
  const [selectedPeriod, setSelectedPeriod] = useState('Cette semaine')
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Students Live State
  const [students, setStudents] = useState(() => studentService.getStudents())
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('all')
  const [selectedClassFilter, setSelectedClassFilter] = useState('all')

  // Announcements Live State
  const [announcements, setAnnouncements] = useState(() => studentService.getAnnouncements())
  const [announcementSearch, setAnnouncementSearch] = useState('')
  const [selectedAnnCategory, setSelectedAnnCategory] = useState('all')
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [viewingAnnouncement, setViewingAnnouncement] = useState(null)
  const [newAnnForm, setNewAnnForm] = useState({
    title: '',
    content: '',
    category: 'Important',
    targetAudience: 'Tous les élèves & parents',
    isPinned: true,
  })

  // WhatsApp Reminder Modal State
  const [whatsappModalStudent, setWhatsappModalStudent] = useState(null)
  const [whatsappCustomMessage, setWhatsappCustomMessage] = useState('')

  // Selected Student for View Profile Modal
  const [viewingStudent, setViewingStudent] = useState(null)

  // Selected Student for Physical Approval Modal
  const [approvingStudent, setApprovingStudent] = useState(null)
  const [approvalForm, setApprovalForm] = useState({
    paymentAmount: 2500,
    paymentMethod: 'Espèces (Cash)',
    sessionsPerMonth: 4,
    cycle: 'Septembre 2026',
    notes: '',
  })

  // Selected Student for Next Month Payment Modal
  const [payingStudent, setPayingStudent] = useState(null)
  const [paymentForm, setPaymentForm] = useState({
    amount: 2500,
    paymentMethod: 'Espèces (Cash)',
    cycle: 'Octobre 2026',
    notes: '',
  })

  // New Student Modal
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [newStudentForm, setNewStudentForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    courseName: 'Mathématiques Approfondies (2S & BAC)',
    teacherName: 'Prof. Sarah Benali',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
  })

  // Subscribe to live state updates
  useEffect(() => {
    const unsubscribe = studentService.subscribe((updated) => {
      setStudents([...updated])
      setAnnouncements([...studentService.getAnnouncements()])
    })
    return () => unsubscribe()
  }, [])

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3800)
  }

  // Derived KPI Counts
  const totalStudentsCount = students.length
  const activeStudentsCount = students.filter((s) => s.status === 'Active').length
  const pendingEnrollmentsCount = students.filter((s) => s.status === 'Pending Approval').length
  const paymentsDueCount = students.filter((s) => s.paymentStatus === 'Payment Required').length
  const overduePaymentsCount = students.filter((s) => s.paymentStatus === 'Overdue' || s.status === 'Payment Overdue').length

  // Students whose payment is required (Completed 4/4 sessions)
  const studentsWithPaymentDue = students.filter((s) => s.paymentStatus === 'Payment Required')

  // Filtered Students List
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

  // Filtered Announcements List
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(announcementSearch.toLowerCase()) ||
      ann.content.toLowerCase().includes(announcementSearch.toLowerCase()) ||
      ann.targetAudience.toLowerCase().includes(announcementSearch.toLowerCase())

    const matchesCat =
      selectedAnnCategory === 'all' || ann.category === selectedAnnCategory

    return matchesSearch && matchesCat
  })

  // Top Pinned Announcement for Home ticker
  const topPinnedAnnouncement = announcements.find((a) => a.isPinned) || announcements[0]

  // Submit New Announcement
  const handleAddAnnouncementSubmit = (e) => {
    e.preventDefault()
    if (!newAnnForm.title.trim() || !newAnnForm.content.trim()) return

    studentService.addAnnouncement({
      title: newAnnForm.title,
      content: newAnnForm.content,
      category: newAnnForm.category,
      targetAudience: newAnnForm.targetAudience,
      isPinned: newAnnForm.isPinned,
    })

    showToast(`📢 Annonce "${newAnnForm.title}" publiée avec succès !`)
    setIsAddAnnouncementOpen(false)
    setNewAnnForm({
      title: '',
      content: '',
      category: 'Important',
      targetAudience: 'Tous les élèves & parents',
      isPinned: true,
    })
    setAnnouncements([...studentService.getAnnouncements()])
  }

  // Toggle Pin Announcement
  const handleTogglePin = (id) => {
    studentService.togglePinAnnouncement(id)
    setAnnouncements([...studentService.getAnnouncements()])
    showToast(`Statut d'épinglage mis à jour.`)
  }

  // Delete Announcement
  const handleDeleteAnnouncement = (id) => {
    if (confirm('Voulez-vous supprimer cette annonce ?')) {
      studentService.deleteAnnouncement(id)
      setAnnouncements([...studentService.getAnnouncements()])
      showToast(`Annonce supprimée.`)
    }
  }

  // Open WhatsApp Reminder Modal
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

  // Direct 1-Click WhatsApp Simulation
  const handleDirectWhatsAppSend = (student) => {
    showToast(`✓ Rappel WhatsApp envoyé (Mode simulation) pour ${student.fullName} (${student.phone})`)
  }

  // Send WhatsApp from Modal (Frontend Mode)
  const handleSendWhatsAppFromModal = () => {
    if (!whatsappModalStudent) return
    showToast(`✓ Rappel WhatsApp envoyé avec succès (Mode simulation) pour ${whatsappModalStudent.fullName} (${whatsappModalStudent.phone}) !`)
    setWhatsappModalStudent(null)
  }

  // Open Physical Approval Modal
  const handleOpenApproveModal = (student) => {
    setApprovingStudent(student)
    setApprovalForm({
      paymentAmount: student.monthlyPrice || 2500,
      paymentMethod: 'Espèces (Cash)',
      sessionsPerMonth: student.sessionsPerMonth || 4,
      cycle: 'Septembre 2026',
      notes: 'Inscription confirmée sur place à l’école',
    })
  }

  // Submit Physical Approval
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

    showToast(`✓ Inscription approuvée avec succès ! ${approvingStudent.fullName} est maintenant Actif.`)
    setApprovingStudent(null)
  }

  // Open Record Payment Modal
  const handleOpenPaymentModal = (student) => {
    setPayingStudent(student)
    setPaymentForm({
      amount: student.monthlyPrice || 2500,
      paymentMethod: 'Espèces (Cash)',
      cycle: student.currentCycle.includes('Septembre') ? 'Octobre 2026' : 'Nouveau Mois',
      notes: 'Paiement mensuel enregistré par l’administrateur',
    })
  }

  // Submit Next Month Payment
  const handleSubmitPayment = (e) => {
    e.preventDefault()
    if (!payingStudent) return

    studentService.recordMonthlyPayment(payingStudent.id, {
      amount: paymentForm.amount,
      paymentMethod: paymentForm.paymentMethod,
      cycle: paymentForm.cycle,
      notes: paymentForm.notes,
    })

    showToast(`✓ Paiement de ${paymentForm.amount} DA enregistré pour ${payingStudent.fullName}. Nouveau cycle démarré (0/${payingStudent.sessionsPerMonth} séances) !`)
    setPayingStudent(null)
    if (viewingStudent && viewingStudent.id === payingStudent.id) {
      const refreshed = studentService.getStudents().find((s) => s.id === payingStudent.id)
      setViewingStudent(refreshed)
    }
  }

  // Add Student Manually
  const handleAddStudentSubmit = (e) => {
    e.preventDefault()
    if (!newStudentForm.studentName.trim()) return

    studentService.addOnlineEnrollment({
      studentName: newStudentForm.studentName,
      parentName: newStudentForm.parentName || 'Tuteur',
      phone: newStudentForm.phone,
      email: newStudentForm.email,
      address: newStudentForm.address,
      courseName: newStudentForm.courseName,
      teacherName: newStudentForm.teacherName,
      monthlyPrice: Number(newStudentForm.monthlyPrice),
      sessionsPerMonth: Number(newStudentForm.sessionsPerMonth),
    })

    showToast(`Nouvelle demande d'inscription créée pour ${newStudentForm.studentName} (En attente d'approbation).`)
    setIsAddStudentOpen(false)
    setNewStudentForm({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      address: '',
      courseName: 'Mathématiques Approfondies (2S & BAC)',
      teacherName: 'Prof. Sarah Benali',
      monthlyPrice: 3000,
      sessionsPerMonth: 4,
    })
  }

  // Financial calculations
  const totalRevenueCollected = students.reduce((acc, s) => {
    const studentTotal = (s.paymentHistory || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
    return acc + studentTotal
  }, 0)

  const expectedMonthlyRevenue = students
    .filter((s) => s.status === 'Active')
    .reduce((sum, s) => sum + (Number(s.monthlyPrice) || 0), 0)

  return (
    <div className="dashboard-page-canvas">
      {/* Real-time Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
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
            LEFT SIDEBAR
            ======================================================== */}
        <aside className="dashboard-sidebar">
          <div>
            {/* Brand Logo */}
            <div className="sidebar-brand" onClick={() => setActiveTab('student')}>
              <div className="brand-logo-icon">
                <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                  <path d="M22 6C20.5 9 17 11 13 11C13 15 16 18 20 18C22 15 22 10 22 6Z" fill="#10B981" />
                  <path d="M22 6C23.5 9 27 11 31 11C31 15 28 18 24 18C22 15 22 10 22 6Z" fill="#34D399" />
                  <circle cx="22" cy="14" r="3" fill="#2563EB" />
                  <path d="M8 22C13 20 18 21 22 24C26 21 31 20 36 22C34 27 29 29 22 29C15 29 10 27 8 22Z" fill="#2563EB" />
                  <path d="M6 31C12 29 18 30 22 33C26 30 32 29 38 31C36 34 30 36 22 36C14 36 8 34 6 31Z" fill="#3B82F6" />
                  <rect x="20.5" y="24" width="3" height="12" rx="1.5" fill="#1D4ED8" />
                </svg>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">Nawafid</span>
                <span className="brand-subtext">ÉDUCATION</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav">
              <button
                className={`sidebar-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
                type="button"
                id="tab-btn-home"
              >
                <Home size={19} className="nav-item-icon" />
                <span>Home</span>
                {activeTab === 'home' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => setActiveTab('student')}
                type="button"
                id="tab-btn-student"
              >
                <GraduationCap size={19} className="nav-item-icon" />
                <span>Student</span>
                {paymentsDueCount > 0 && (
                  <span className="sidebar-badge-count badge-amber-bg">
                    {paymentsDueCount} dues
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
                <span>Annonces</span>
                <span className="sidebar-badge-count" style={{ background: '#EFF6FF', color: '#2563EB' }}>
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
                <span>Statistique</span>
                {activeTab === 'statistique' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'teacher' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher')}
                type="button"
                id="tab-btn-teacher"
              >
                <Users size={19} className="nav-item-icon" />
                <span>Teacher</span>
                {activeTab === 'teacher' && <span className="nav-active-dot" />}
              </button>
            </nav>
          </div>

          {/* Bottom Profile Card */}
          <div className="sidebar-profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <User size={19} />
              </div>
              <div className="profile-info">
                <span className="profile-name">Admin ({ADMIN_PHONE})</span>
                <span className="profile-role">Administrateur</span>
              </div>
            </div>
            <ChevronDown size={18} className="profile-chevron" />
          </div>
        </aside>

        {/* ========================================================
            MAIN CONTENT AREA
            ======================================================== */}
        <main className="dashboard-main-content">
          {/* Topbar Header */}
          <header className="dashboard-topbar">
            <div>
              {activeTab === 'student' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Gestion des Élèves &amp; Paiements Mensuels 🎓
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Suivi du cycle de 4 séances, rappels WhatsApp automatiques et validation physique des inscriptions.
                  </p>
                </>
              )}

              {activeTab === 'announcements' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Tableau d'Affichage &amp; Annonces Scolaires 📢
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Publiez des avis importants, des rappels de paiement et des événements pour toute l'école.
                  </p>
                </>
              )}

              {activeTab === 'home' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Bienvenue, Admin ({ADMIN_PHONE}) <span role="img" aria-label="wave">👋</span>
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Voici un aperçu général de votre plateforme.
                  </p>
                </>
              )}

              {activeTab === 'statistique' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Statistiques Financières &amp; Pédagogiques 📈
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Revenus collectés, assiduité aux cours et suivi des cycles mensuels.
                  </p>
                </>
              )}

              {activeTab === 'teacher' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Corps Enseignant &amp; Professeurs 👨‍🏫
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Gestion des enseignants, cours dispensés et suivi des présences.
                  </p>
                </>
              )}
            </div>

            <div className="topbar-actions">
              <div style={{ position: 'relative' }}>
                <button
                  className="topbar-circle-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
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
                      right: '0',
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
                      Alertes &amp; Annonces Récentes
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
                        ⚠️ {paymentsDueCount} élève(s) ont terminé leur 4ème séance et doivent payer le mois prochain.
                      </div>
                    )}
                    {topPinnedAnnouncement && (
                      <div
                        style={{
                          background: '#EFF6FF',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#1D4ED8',
                          marginBottom: '8px',
                          fontWeight: '600',
                          border: '1px solid #BFDBFE',
                        }}
                      >
                        📢 <strong>{topPinnedAnnouncement.title}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button className="topbar-circle-btn" aria-label="Menu" type="button">
                <Menu size={20} />
              </button>
            </div>
          </header>

          {/* ========================================================
              PAGE: ANNOUNCEMENTS
              ======================================================== */}
          {activeTab === 'announcements' && (
            <div className="tab-view-container">
              {/* Summary Cards */}
              <div className="summary-kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('all')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">Total Annonces</span>
                    <div className="kpi-icon-square" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                      <Megaphone size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display">{announcements.length}</div>
                  <span className="kpi-sub-badge">Toutes les publications</span>
                </div>

                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('Important')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#DC2626' }}>Urgentes &amp; Épinglées</span>
                    <div className="kpi-icon-square" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                      <Pin size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#DC2626' }}>
                    {announcements.filter((a) => a.isPinned).length}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#DC2626' }}>En tête d'affiche</span>
                </div>

                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('Paiements')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#D97706' }}>Avis de Paiement</span>
                    <div className="kpi-icon-square" style={{ background: '#FEF3C7', color: '#D97706' }}>
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#D97706' }}>
                    {announcements.filter((a) => a.category === 'Paiements').length}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#D97706' }}>Rappels de mensualités</span>
                </div>

                <div className="summary-kpi-card" onClick={() => setSelectedAnnCategory('Événements')}>
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#059669' }}>Événements &amp; Ateliers</span>
                    <div className="kpi-icon-square" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <Sparkles size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#059669' }}>
                    {announcements.filter((a) => a.category === 'Événements').length}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#059669' }}>Activités &amp; Formations</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="students-toolbar">
                <div className="student-search-box">
                  <Search size={16} className="student-search-icon" />
                  <input
                    type="text"
                    className="student-search-input"
                    placeholder="Rechercher une annonce par mot-clé ou titre..."
                    value={announcementSearch}
                    onChange={(e) => setAnnouncementSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '6px', background: '#FFFFFF', padding: '4px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    {['all', 'Paiements', 'Pédagogique', 'Événements'].map((cat) => (
                      <button
                        key={cat}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: selectedAnnCategory === cat ? '#2563EB' : 'transparent',
                          color: selectedAnnCategory === cat ? '#FFFFFF' : '#4B5563',
                        }}
                        onClick={() => setSelectedAnnCategory(cat)}
                        type="button"
                      >
                        {cat === 'all' ? 'Toutes' : cat}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddAnnouncementOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>+ Créer une Annonce</span>
                  </button>
                </div>
              </div>

              {/* Announcements Grid */}
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
                            <span
                              className={`ann-category-badge ${
                                ann.category === 'Paiements'
                                  ? 'cat-badge-payments'
                                  : ann.category === 'Pédagogique'
                                  ? 'cat-badge-pedagogique'
                                  : ann.category === 'Événements'
                                  ? 'cat-badge-events'
                                  : 'cat-badge-general'
                              }`}
                            >
                              <Tag size={11} />
                              <span>{ann.category}</span>
                            </span>

                            {ann.isPinned && (
                              <span className="ann-pinned-tag">
                                <Pin size={11} />
                                <span>Épinglé</span>
                              </span>
                            )}
                          </div>

                          <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: '600' }}>
                            {ann.date}
                          </span>
                        </div>

                        <h3 className="ann-card-title">{ann.title}</h3>
                        <p className="ann-card-content-preview">{ann.content}</p>

                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
                          🎯 Destinataires : <span style={{ color: '#1E293B' }}>{ann.targetAudience}</span>
                        </div>
                      </div>

                      <div className="ann-card-footer">
                        <div className="ann-author-info">
                          <User size={13} color="#2563EB" />
                          <span>{ann.author}</span>
                        </div>

                        <div className="ann-actions-btns">
                          <button
                            className="btn-action-icon-sm"
                            title={ann.isPinned ? 'Désépingler' : 'Épingler en haut'}
                            onClick={() => handleTogglePin(ann.id)}
                            style={{ color: ann.isPinned ? '#D97706' : '#6B7280' }}
                            type="button"
                          >
                            <Pin size={14} />
                          </button>
                          <button
                            className="btn-action-icon-sm"
                            title="Lire l'annonce complète"
                            onClick={() => setViewingAnnouncement(ann)}
                            type="button"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn-action-icon-sm btn-delete"
                            title="Supprimer"
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
                    <p style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>Aucune annonce trouvée</p>
                    <p style={{ fontSize: '13px' }}>Cliquez sur "+ Créer une Annonce" pour publier un nouvel avis aux élèves et parents.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              PAGE: STUDENT MANAGEMENT
              ======================================================== */}
          {activeTab === 'student' && (
            <div className="tab-view-container">
              {/* Top Clickable Summary KPI Cards */}
              <div className="summary-kpi-grid">
                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('all')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">Total Élèves</span>
                    <div className="kpi-icon-square" style={{ background: '#F3F4F6', color: '#4B5563' }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display">{totalStudentsCount}</div>
                  <span className="kpi-sub-badge">Tous les inscrits</span>
                </div>

                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'active' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('active')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">Élèves Actifs</span>
                    <div className="kpi-icon-square" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#059669' }}>
                    {activeStudentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#059669' }}>
                    🟢 En cours d'études
                  </span>
                </div>

                <div
                  className={`summary-kpi-card ${selectedFilterCategory === 'pending' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('pending')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text">En Attente</span>
                    <div className="kpi-icon-square" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#2563EB' }}>
                    {pendingEnrollmentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#2563EB' }}>
                    🔵 Validation physique
                  </span>
                </div>

                <div
                  className={`summary-kpi-card card-warning ${selectedFilterCategory === 'due' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('due')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#B45309' }}>
                      Paiements Requis
                    </span>
                    <div className="kpi-icon-square" style={{ background: '#FEF3C7', color: '#D97706' }}>
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#D97706' }}>
                    {paymentsDueCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#D97706', fontWeight: '700' }}>
                    🟠 4/4 séances faites
                  </span>
                </div>

                <div
                  className={`summary-kpi-card card-danger ${selectedFilterCategory === 'overdue' ? 'active-filter' : ''}`}
                  onClick={() => setSelectedFilterCategory('overdue')}
                >
                  <div className="kpi-top-row">
                    <span className="kpi-label-text" style={{ color: '#DC2626' }}>
                      En Retard
                    </span>
                    <div className="kpi-icon-square" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                      <AlertTriangle size={16} />
                    </div>
                  </div>
                  <div className="kpi-number-display" style={{ color: '#DC2626' }}>
                    {overduePaymentsCount}
                  </div>
                  <span className="kpi-sub-badge" style={{ color: '#DC2626' }}>
                    🔴 Échéance dépassée
                  </span>
                </div>
              </div>

              {/* PAYMENTS DUE HIGHLIGHTS WITH 1-CLICK WHATSAPP INTEGRATION */}
              {studentsWithPaymentDue.length > 0 && (
                <section className="payments-due-banner-section">
                  <div className="payments-due-header">
                    <div className="payments-due-title-wrap">
                      <div className="payments-due-icon-badge">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h2 className="payments-due-heading">
                          Paiements Requis (4/4 Séances terminées) 📲
                        </h2>
                        <p className="payments-due-subtext">
                          Ces élèves ont complété leur mois. Envoyez-leur un rappel automatique par <strong>WhatsApp</strong> depuis le <strong>{ADMIN_PHONE}</strong>.
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
                      {studentsWithPaymentDue.length} à renouveler
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
                                📞 Tél: <strong>{student.phone}</strong>
                              </div>
                            </div>
                            <span className="due-amount-pill">{student.monthlyPrice} DA</span>
                          </div>

                          <div className="due-message-callout" style={{ marginTop: '10px' }}>
                            <strong>Cycle terminé ({student.sessionsCompleted}/{student.sessionsPerMonth} séances).</strong>
                            <br />
                            Paiement de {student.monthlyPrice} DA requis pour le prochain mois ({student.currentCycle}).
                          </div>
                        </div>

                        <div className="due-actions-btn-group">
                          <button
                            className="btn-record-payment-primary"
                            onClick={() => handleOpenPaymentModal(student)}
                            type="button"
                          >
                            <CreditCard size={15} />
                            <span>Payer</span>
                          </button>

                          {/* WhatsApp Reminder Button with Admin Phone 0667158842 */}
                          <button
                            className="btn-whatsapp-reminder"
                            onClick={() => handleOpenWhatsAppModal(student)}
                            title={`Envoyer rappel WhatsApp au ${student.phone}`}
                            type="button"
                          >
                            <MessageSquare size={15} />
                            <span>Rappel WhatsApp</span>
                          </button>

                          <button
                            className="btn-action-icon-sm"
                            title="Voir Profil"
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

              {/* Toolbar */}
              <div className="students-toolbar">
                <div className="student-search-box">
                  <Search size={16} className="student-search-icon" />
                  <input
                    type="text"
                    className="student-search-input"
                    placeholder="Rechercher par élève, parent, tél (ex: 0669028265)..."
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
                        background: selectedFilterCategory === 'all' ? '#2563EB' : 'transparent',
                        color: selectedFilterCategory === 'all' ? '#FFFFFF' : '#4B5563',
                      }}
                      onClick={() => setSelectedFilterCategory('all')}
                      type="button"
                    >
                      Tous ({totalStudentsCount})
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
                      Actifs ({activeStudentsCount})
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
                      Paiements Requis ({paymentsDueCount})
                    </button>
                  </div>

                  <select
                    className="student-filter-select"
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                  >
                    <option value="all">Toutes les matières</option>
                    <option value="Math">Mathématiques</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Français">Français</option>
                    <option value="Sciences">Sciences / Physique</option>
                    <option value="Informatique">Informatique</option>
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
                    title="Valide automatiquement la présence d'une séance pour tous les élèves de la classe"
                    onClick={() => {
                      const count = studentService.autoAdvanceClassSessions(selectedClassFilter === 'all' ? null : selectedClassFilter)
                      if (count > 0) {
                        showToast(`⚡ Séance enregistrée automatiquement pour ${count} élève(s) !`)
                      } else {
                        showToast(`Tous les élèves sélectionnés ont déjà complété leurs séances ou nécessitent un paiement.`)
                      }
                    }}
                    type="button"
                  >
                    <Sparkles size={14} />
                    <span>Valider séance du jour</span>
                  </button>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddStudentOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>+ Inscrire un Élève</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="students-table-card">
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Élève (Student)</th>
                        <th>Cours &amp; Professeur</th>
                        <th>Séances (Mois en cours)</th>
                        <th>Paiement (Status)</th>
                        <th>Prochaine Échéance</th>
                        <th>Statut Compte</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
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
                                          ? '#DBEAFE'
                                          : student.status === 'Pending Approval'
                                          ? '#E0E7FF'
                                          : '#FEE2E2',
                                      color:
                                        student.status === 'Active'
                                          ? '#1D4ED8'
                                          : student.status === 'Pending Approval'
                                          ? '#4338CA'
                                          : '#DC2626',
                                    }}
                                  >
                                    {student.fullName
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')
                                      .slice(0, 2)
                                      .toUpperCase()}
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
                                  {student.teacherName} • {student.monthlyPrice} DA / mois
                                </div>
                              </td>

                              <td>
                                <div className="session-counter-cell">
                                  <div className="session-number-pill">
                                    <span style={{ color: isComplete ? '#D97706' : '#1E293B', fontWeight: '800' }}>
                                      {student.sessionsCompleted} / {student.sessionsPerMonth} séances
                                    </span>
                                    <span style={{ fontSize: '11px', color: isComplete ? '#D97706' : '#94A3B8', fontWeight: isComplete ? '800' : '500' }}>
                                      {percent}%
                                    </span>
                                  </div>
                                  <div className="session-progress-track">
                                    <div
                                      className={`session-progress-fill ${
                                        isComplete ? 'fill-progress-complete' : 'fill-progress-active'
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
                                    <span>🟢 Payé (Paid)</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Payment Required' && (
                                  <span className="badge-status-pill status-due">
                                    <AlertCircle size={12} />
                                    <span>🟠 Paiement Requis</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Overdue' && (
                                  <span className="badge-status-pill status-overdue">
                                    <AlertTriangle size={12} />
                                    <span>🔴 En Retard</span>
                                  </span>
                                )}
                                {student.paymentStatus === 'Pending Approval' && (
                                  <span className="badge-status-pill status-pending">
                                    <Clock size={12} />
                                    <span>🔵 Non Payé (En attente)</span>
                                  </span>
                                )}
                              </td>

                              <td>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: isComplete ? '#DC2626' : '#334155' }}>
                                  {student.nextPaymentDate}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                                  Cycle : {student.currentCycle}
                                </div>
                              </td>

                              <td>
                                <span
                                  className="badge-status-pill"
                                  style={{
                                    background:
                                      student.status === 'Active'
                                        ? '#ECFDF5'
                                        : student.status === 'Pending Approval'
                                        ? '#EFF6FF'
                                        : student.status === 'Payment Overdue'
                                        ? '#FEF2F2'
                                        : '#F3F4F6',
                                    color:
                                      student.status === 'Active'
                                        ? '#059669'
                                        : student.status === 'Pending Approval'
                                        ? '#2563EB'
                                        : student.status === 'Payment Overdue'
                                        ? '#DC2626'
                                        : '#4B5563',
                                  }}
                                >
                                  {student.status === 'Active' ? 'Actif' : student.status}
                                </span>
                              </td>

                              <td>
                                <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                                  {/* If Payment Required, add WhatsApp button */}
                                  {student.paymentStatus === 'Payment Required' && (
                                    <button
                                      className="btn-whatsapp-outline"
                                      onClick={() => handleOpenWhatsAppModal(student)}
                                      title={`Envoyer rappel WhatsApp au ${student.phone}`}
                                      type="button"
                                    >
                                      <MessageSquare size={13} />
                                      <span>WhatsApp</span>
                                    </button>
                                  )}

                                  {student.status === 'Pending Approval' ? (
                                    <button
                                      className="btn-action-outline btn-action-approve"
                                      onClick={() => handleOpenApproveModal(student)}
                                      type="button"
                                    >
                                      <Check size={14} />
                                      <span>Approuver &amp; 1er Paiement</span>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn-action-outline btn-action-pay"
                                      onClick={() => handleOpenPaymentModal(student)}
                                      type="button"
                                    >
                                      <CreditCard size={13} />
                                      <span>Payer</span>
                                    </button>
                                  )}

                                  <button
                                    className="btn-action-outline"
                                    onClick={() => setViewingStudent(student)}
                                    type="button"
                                  >
                                    <Eye size={13} />
                                    <span>Profil</span>
                                  </button>

                                  <button
                                    className="btn-action-icon-sm btn-delete"
                                    title="Supprimer"
                                    onClick={() => {
                                      if (confirm(`Voulez-vous supprimer le dossier de ${student.fullName} ?`)) {
                                        studentService.deleteStudent(student.id)
                                        showToast(`Dossier supprimé.`)
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
                            <p style={{ fontWeight: '700', fontSize: '15px' }}>Aucun élève correspondant</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer-bar">
                  <span>
                    Affichage de <strong>{filteredStudents.length}</strong> sur <strong>{students.length}</strong> élèves
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
              PAGE: HOME TAB
              ======================================================== */}
          {activeTab === 'home' && (
            <div className="tab-view-container">
              {/* Home Announcement Ticker Banner */}
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
                    style={{ background: '#1E40AF', padding: '8px 16px', fontSize: '12.5px', whiteSpace: 'nowrap' }}
                    onClick={() => setActiveTab('announcements')}
                    type="button"
                  >
                    <span>Voir toutes les annonces ({announcements.length})</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Section 1: Aperçu général */}
              <section className="dashboard-card-panel">
                <div className="panel-header-row">
                  <div className="panel-title-wrap">
                    <div className="panel-icon-badge">
                      <TrendingUp size={20} />
                    </div>
                    <h2 className="panel-title-text">Aperçu général &amp; Fréquentation</h2>
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
                        { day: 'Lun', value: 120 },
                        { day: 'Mar', value: 170 },
                        { day: 'Mer', value: 200 },
                        { day: 'Jeu', value: 150 },
                      ].map((item, idx) => (
                        <div className="bar-column" key={idx}>
                          <div className="bar-tooltip">{item.value} présences</div>
                          <div className="bar-pill" style={{ height: `${(item.value / 200) * 100}%` }} />
                          <span className="axis-x-label">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="metric-summary-card">
                    <div className="metric-card-top">
                      <span className="metric-label-title">Total Étudiants Actifs</span>
                      <div className="metric-icon-badge">
                        <Users size={20} />
                      </div>
                    </div>

                    <div className="metric-big-number">{activeStudentsCount}</div>

                    <div className="metric-trend-row">
                      <span className="trend-badge-green">
                        <span>↑ 12%</span>
                      </span>
                      <span>par rapport au mois précédent</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Actions rapides */}
              <section className="dashboard-card-panel">
                <div className="panel-header-row" style={{ marginBottom: '20px' }}>
                  <div className="panel-title-wrap">
                    <div className="panel-icon-badge badge-zap">
                      <Zap size={20} />
                    </div>
                    <h2 className="panel-title-text">Actions rapides</h2>
                  </div>
                </div>

                <div className="quick-actions-list">
                  <div className="quick-action-row" onClick={() => setActiveTab('student')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-blue">
                        <Users size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Gérer les étudiants &amp; Paiements</span>
                        <span className="action-subtitle">
                          {paymentsDueCount > 0
                            ? `${paymentsDueCount} élève(s) doivent renouveler leur mensualité`
                            : 'Suivi des inscriptions et des séances'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>

                  <div className="quick-action-row" onClick={() => setActiveTab('announcements')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-purple">
                        <Megaphone size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Publier une Annonce</span>
                        <span className="action-subtitle">Créer un avis scolaire ou un rappel</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>

                  <div className="quick-action-row" onClick={() => setActiveTab('statistique')}>
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-green">
                        <BarChart2 size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Voir les rapports financiers &amp; revenus</span>
                        <span className="action-subtitle">Consulter les transactions et bilans</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================
              PAGE: STATISTIQUE TAB
              ======================================================== */}
          {activeTab === 'statistique' && (
            <div className="tab-view-container">
              <div className="stats-kpi-grid">
                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Revenu Collecté (Total)</span>
                    <div className="kpi-icon-pill" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">{totalRevenueCollected.toLocaleString()} DA</span>
                    <span className="kpi-sub-trend" style={{ color: '#10B981' }}>
                      ↑ Encaissé en caisse &amp; banques
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Revenu Mensuel Estimé</span>
                    <div className="kpi-icon-pill" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">{expectedMonthlyRevenue.toLocaleString()} DA</span>
                    <span className="kpi-sub-trend" style={{ color: '#2563EB' }}>
                      Pour les élèves actifs
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Paiements Requis (4/4)</span>
                    <div className="kpi-icon-pill" style={{ background: '#FEF3C7', color: '#D97706' }}>
                      <AlertCircle size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number" style={{ color: '#D97706' }}>{paymentsDueCount}</span>
                    <span className="kpi-sub-trend" style={{ color: '#D97706' }}>
                      Séances du mois terminées
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Inscriptions en Attente</span>
                    <div className="kpi-icon-pill" style={{ background: '#FAF5FF', color: '#9333EA' }}>
                      <Clock size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number" style={{ color: '#9333EA' }}>{pendingEnrollmentsCount}</span>
                    <span className="kpi-sub-trend" style={{ color: '#9333EA' }}>
                      À valider à l'école
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
                      <h2 className="panel-title-text">Répartition par Matière &amp; Assiduité</h2>
                    </div>
                  </div>

                  <div className="subject-progress-list">
                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Mathématiques Approfondies (2S &amp; BAC)</span>
                        <span className="subject-rate">94%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-blue" style={{ width: '94%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Sciences Expérimentales &amp; Physique</span>
                        <span className="subject-rate">90%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-purple" style={{ width: '90%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Langue Anglaise (Intensif)</span>
                        <span className="subject-rate">96%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-green" style={{ width: '96%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Informatique &amp; Développement Web</span>
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
                      <h2 className="panel-title-text">Répartition des Effectifs</h2>
                    </div>
                  </div>

                  <div className="level-distribution-grid">
                    <div className="level-dist-card">
                      <span className="level-dist-title">Élèves Actifs (Payés)</span>
                      <span className="level-dist-count" style={{ color: '#059669' }}>{activeStudentsCount}</span>
                      <span className="level-dist-meta">élèves en règle</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">Paiements Requis (4/4)</span>
                      <span className="level-dist-count" style={{ color: '#D97706' }}>{paymentsDueCount}</span>
                      <span className="level-dist-meta">à renouveler</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">En Attente de Validation</span>
                      <span className="level-dist-count" style={{ color: '#2563EB' }}>{pendingEnrollmentsCount}</span>
                      <span className="level-dist-meta">à confirmer à l'école</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">Paiements en Retard</span>
                      <span className="level-dist-count" style={{ color: '#DC2626' }}>{overduePaymentsCount}</span>
                      <span className="level-dist-meta">dossiers en relance</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================
              PAGE: TEACHER TAB
              ======================================================== */}
          {activeTab === 'teacher' && (
            <div className="tab-view-container">
              <div className="students-table-card">
                <div style={{ padding: '20px', borderBottom: '1px solid #F3F4F6' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Corps Enseignant &amp; Professeurs</h3>
                </div>
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Enseignant</th>
                        <th>Matière</th>
                        <th>Contact</th>
                        <th>Élèves Assignés</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Prof. Sarah Benali', subject: 'Mathématiques (2S & BAC)', phone: '0550 12 34 56', count: 42 },
                        { name: 'Prof. David Moreau', subject: 'Langue Anglaise & Française', phone: '0661 44 55 66', count: 38 },
                        { name: 'Prof. Amira Al-Mansour', subject: 'Sciences & Physique', phone: '0770 88 99 11', count: 29 },
                        { name: 'Prof. Marcus Chen', subject: 'Informatique & Web', phone: '0555 77 88 99', count: 19 },
                      ].map((t, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="student-avatar-cell">
                              <div className="student-initial-avatar avatar-blue">{t.name.slice(6, 8)}</div>
                              <span className="student-name-text">{t.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge-class-pill" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                              {t.subject}
                            </span>
                          </td>
                          <td>{t.phone}</td>
                          <td>
                            <strong>{t.count} élèves</strong>
                          </td>
                          <td>
                            <span className="badge-status-pill status-paid">🟢 Actif</span>
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
          MODAL: WHATSAPP AUTOMATED PAYMENT REMINDER
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
                    Envoyer Rappel WhatsApp
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280' }}>
                    Notification de fin de mois &amp; renouvellement de paiement.
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
                    Destinataire (Élève / Parent)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#14532D', marginTop: '2px' }}>
                    {whatsappModalStudent.fullName}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#166534', marginTop: '1px' }}>
                    📞 Numéro : {whatsappModalStudent.phone} (WhatsApp : +{studentService.formatWhatsAppNumber(whatsappModalStudent.phone)})
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#6B7280' }}>
                    Expéditeur (École)
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#111827' }}>
                    {ADMIN_PHONE}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#374151' }}>
                  Texte du Message WhatsApp (Personnalisable) :
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
                  Annuler
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
                  <span>Confirmer le Rappel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE ANNOUNCEMENT
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
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>Publier une Annonce</h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280' }}>Diffusion d'un avis ou d'un rappel scolaire.</p>
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
                  Titre de l'Annonce *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rappel de paiement mensuel ou Emploi du temps"
                  value={newAnnForm.title}
                  onChange={(e) => setNewAnnForm({ ...newAnnForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Catégorie
                  </label>
                  <select
                    value={newAnnForm.category}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Important">⚠️ Important / Urgent</option>
                    <option value="Paiements">💳 Avis de Paiement</option>
                    <option value="Pédagogique">📚 Pédagogique &amp; Examens</option>
                    <option value="Événements">🏆 Événements &amp; Ateliers</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Destinataires / Cible
                  </label>
                  <select
                    value={newAnnForm.targetAudience}
                    onChange={(e) => setNewAnnForm({ ...newAnnForm, targetAudience: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Tous les élèves & parents">Tous les élèves &amp; parents</option>
                    <option value="Classes de Lycée (2S & BAC)">Classes de Lycée (2S &amp; BAC)</option>
                    <option value="Classes de Langues">Classes de Langues</option>
                    <option value="Formations Informatique">Formations Informatique</option>
                    <option value="Corps Enseignant">Corps Enseignant</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  Contenu du Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Rédigez le texte détaillé de l'annonce..."
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
                  📌 Épingler cette annonce en tête d'affiche sur l'accueil
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddAnnouncementOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={15} />
                  <span>Publier l'Annonce</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VIEW ANNOUNCEMENT DETAILS
          ======================================================== */}
      {viewingAnnouncement && (
        <div className="dashboard-modal-backdrop" onClick={() => setViewingAnnouncement(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`ann-category-badge ${viewingAnnouncement.category === 'Paiements' ? 'cat-badge-payments' : 'cat-badge-pedagogique'}`}>
                  {viewingAnnouncement.category}
                </span>
                {viewingAnnouncement.isPinned && <span className="ann-pinned-tag">📌 Épinglé</span>}
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
              <span>📅 Publié le : {viewingAnnouncement.date}</span>
              <span>✍️ Par : {viewingAnnouncement.author}</span>
              <span>🎯 Destinataires : {viewingAnnouncement.targetAudience}</span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '18px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '14px', lineHeight: '1.7', color: '#1E293B', whiteSpace: 'pre-line' }}>
              {viewingAnnouncement.content}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setViewingAnnouncement(null)}
                style={{ padding: '10px 22px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PHYSICAL ENROLLMENT APPROVAL
          ======================================================== */}
      {approvingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setApprovingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  Confirmer l'inscription &amp; Premier Paiement
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  Validation physique de l'élève se présentant à l'école.
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
                  <div className="profile-info-label">Élève &amp; Tuteur</div>
                  <div className="profile-info-val">{approvingStudent.fullName}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    Tuteur: {approvingStudent.parentName} • {approvingStudent.phone}
                  </div>
                </div>

                <div className="profile-info-box">
                  <div className="profile-info-label">Cours &amp; Enseignant</div>
                  <div className="profile-info-val">{approvingStudent.courseName}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    {approvingStudent.teacherName}
                  </div>
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Montant du 1er Paiement (DA) *
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
                    Moyen de Paiement *
                  </label>
                  <select
                    value={approvalForm.paymentMethod}
                    onChange={(e) => setApprovalForm({ ...approvalForm, paymentMethod: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Espèces (Cash)">Espèces (Cash au bureau)</option>
                    <option value="BaridiMob / CCP">BaridiMob / CCP</option>
                    <option value="Virement Bancaire">Virement Bancaire</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Séances par Mois
                  </label>
                  <select
                    value={approvalForm.sessionsPerMonth}
                    onChange={(e) => setApprovalForm({ ...approvalForm, sessionsPerMonth: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value={4}>4 séances / mois (Standard)</option>
                    <option value={8}>8 séances / mois (Intensif)</option>
                    <option value={12}>12 séances / mois (Quotidien)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Cycle Mensuel Initial
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
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: '12px', background: '#10B981', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={16} />
                  <span>Confirmer &amp; Activer l'Élève</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: RECORD PAYMENT
          ======================================================== */}
      {payingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setPayingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  Enregistrer le Paiement Mensuel
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  Renouvellement du cycle de séances pour l'élève.
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
                <div className="profile-info-label">Élève &amp; Cours</div>
                <div className="profile-info-val">{payingStudent.fullName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '2px' }}>
                  {payingStudent.courseName} • Prof: {payingStudent.teacherName} • 📞 Tél: {payingStudent.phone}
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Montant Encaissé (DA) *
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
                    Moyen de Paiement *
                  </label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Espèces (Cash)">Espèces (Cash au bureau)</option>
                    <option value="BaridiMob / CCP">BaridiMob / CCP</option>
                    <option value="Virement Bancaire">Virement Bancaire</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                  Mois / Cycle Concerné
                </label>
                <input
                  type="text"
                  value={paymentForm.cycle}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cycle: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '12px', fontSize: '12.5px', color: '#065F46' }}>
                ✓ Dès la confirmation, le compteur de séances sera réinitialisé à <strong>0/{payingStudent.sessionsPerMonth}</strong> pour le nouveau cycle et le statut passera à <strong>Payé</strong>.
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setPayingStudent(null)}
                  style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CreditCard size={16} />
                  <span>Enregistrer le Paiement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: STUDENT PROFILE
          ======================================================== */}
      {viewingStudent && (
        <div className="dashboard-modal-backdrop" onClick={() => setViewingStudent(null)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="student-initial-avatar avatar-blue" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                  {viewingStudent.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827' }}>
                    {viewingStudent.fullName}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
                      ID: {viewingStudent.id}
                    </span>
                    <span className={`badge-status-pill ${viewingStudent.paymentStatus === 'Paid' ? 'status-paid' : 'status-due'}`}>
                      {viewingStudent.paymentStatus === 'Paid' ? '🟢 Payé' : '🟠 Paiement Requis'}
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
                <div className="profile-info-label">Tuteur &amp; Contact</div>
                <div className="profile-info-val">{viewingStudent.parentName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '3px' }}>
                  📞 {viewingStudent.phone}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  📍 {viewingStudent.address}
                </div>
              </div>

              <div className="profile-info-box">
                <div className="profile-info-label">Cours &amp; Enseignant</div>
                <div className="profile-info-val">{viewingStudent.courseName}</div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '3px' }}>
                  👨‍🏫 {viewingStudent.teacherName}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  Tarif: <strong>{viewingStudent.monthlyPrice} DA / mois</strong> ({viewingStudent.sessionsPerMonth} séances)
                </div>
              </div>
            </div>

            <div className="profile-current-cycle-card">
              <div>
                <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: '700', textTransform: 'uppercase' }}>
                  Cycle en cours : {viewingStudent.currentCycle}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1E3A8A', marginTop: '4px' }}>
                  {viewingStudent.sessionsCompleted} sur {viewingStudent.sessionsPerMonth} séances complétées
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                  {viewingStudent.sessionsCompleted >= viewingStudent.sessionsPerMonth
                    ? '⚠️ Toutes les séances du mois sont terminées. Renouvellement requis.'
                    : `Il reste ${viewingStudent.sessionsPerMonth - viewingStudent.sessionsCompleted} séance(s) avant le prochain paiement.`}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="btn-whatsapp-reminder"
                  onClick={() => handleOpenWhatsAppModal(viewingStudent)}
                  type="button"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp</span>
                </button>
                <button
                  className="btn-record-payment-primary"
                  onClick={() => handleOpenPaymentModal(viewingStudent)}
                  style={{ alignSelf: 'center', padding: '10px 18px' }}
                  type="button"
                >
                  <CreditCard size={16} />
                  <span>Enregistrer Paiement</span>
                </button>
              </div>
            </div>

            {/* Payment History */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                Historique des Paiements ({viewingStudent.paymentHistory?.length || 0})
              </h4>
              {viewingStudent.paymentHistory && viewingStudent.paymentHistory.length > 0 ? (
                <table className="payment-history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Cycle / Mois</th>
                      <th>Moyen</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingStudent.paymentHistory.map((p, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: '600' }}>{p.paymentDate}</td>
                        <td style={{ fontWeight: '800', color: '#059669' }}>{p.amount} DA</td>
                        <td>{p.cycle}</td>
                        <td>{p.paymentMethod}</td>
                        <td>
                          <span className="badge-status-pill status-paid">Validé</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '10px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                  Aucun paiement enregistré pour le moment.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD NEW STUDENT
          ======================================================== */}
      {isAddStudentOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddStudentOpen(false)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  Inscrire un Nouvel Élève
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                  Création d'un nouveau dossier d'inscription.
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
                  Nom et Prénom de l'élève *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Yacine Benali"
                  value={newStudentForm.studentName}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, studentName: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Nom du Tuteur / Parent
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Mohamed Benali"
                    value={newStudentForm.parentName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, parentName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Numéro de Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 0669028265"
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Cours / Matière
                  </label>
                  <select
                    value={newStudentForm.courseName}
                    onChange={(e) => {
                      const course = e.target.value
                      let teacher = 'Prof. Sarah Benali'
                      let price = 3000
                      if (course.includes('Anglais') || course.includes('Français')) {
                        teacher = 'Prof. David Moreau'
                        price = 2200
                      } else if (course.includes('Sciences')) {
                        teacher = 'Prof. Amira Al-Mansour'
                        price = 2800
                      } else if (course.includes('Informatique')) {
                        teacher = 'Prof. Marcus Chen'
                        price = 3500
                      }
                      setNewStudentForm({ ...newStudentForm, courseName: course, teacherName: teacher, monthlyPrice: price })
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Mathématiques Approfondies (2S & BAC)">Mathématiques Approfondies (2S &amp; BAC)</option>
                    <option value="Langue Anglaise (Intensif)">Langue Anglaise (Intensif)</option>
                    <option value="Langue Française & Communication">Langue Française &amp; Communication</option>
                    <option value="Sciences Expérimentales & Physique">Sciences Expérimentales &amp; Physique</option>
                    <option value="Informatique & Développement Web">Informatique &amp; Développement Web</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Tarif Mensuel (DA)
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
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                >
                  Créer l'Inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}