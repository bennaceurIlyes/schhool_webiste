import React, { useState } from 'react'
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
} from 'lucide-react'

// Initial Teachers Data
const INITIAL_TEACHERS = [
  {
    id: 'T-101',
    name: 'Prof. Sarah Benali',
    subject: 'Mathématiques',
    subjectTheme: 'blue',
    phone: '0550 12 34 56',
    email: 'sarah.benali@ecole.dz',
    classesCount: 4,
    status: 'Actif',
    initials: 'SB',
    avatarColor: 'avatar-blue',
  },
  {
    id: 'T-102',
    name: 'Prof. David Moreau',
    subject: 'Langues (Anglais)',
    subjectTheme: 'green',
    phone: '0661 44 55 66',
    email: 'david.moreau@ecole.dz',
    classesCount: 3,
    status: 'Actif',
    initials: 'DM',
    avatarColor: 'avatar-green',
  },
  {
    id: 'T-103',
    name: 'Prof. Amira Al-Mansour',
    subject: 'Sciences & Physique',
    subjectTheme: 'purple',
    phone: '0770 88 99 11',
    email: 'amira.almansour@ecole.dz',
    classesCount: 5,
    status: 'Actif',
    initials: 'AM',
    avatarColor: 'avatar-purple',
  },
  {
    id: 'T-104',
    name: 'Prof. Marcus Chen',
    subject: 'Informatique & Web',
    subjectTheme: 'amber',
    phone: '0555 77 88 99',
    email: 'marcus.chen@ecole.dz',
    classesCount: 2,
    status: 'Actif',
    initials: 'MC',
    avatarColor: 'avatar-amber',
  },
]

// Initial Classes & Proposed Lessons Data with Approval Status
const INITIAL_PROPOSED_CLASSES = [
  {
    id: 'CLS-201',
    title: 'Mathématiques Avancées - Préparation BAC',
    teacher: 'Prof. Sarah Benali',
    subject: 'Mathématiques',
    level: '3ème Année Secondaire (BAC)',
    schedule: 'Samedi & Mardi : 14h00 - 16h30',
    room: 'Salle B2 - Sciences',
    price: '5,500 DZD / mois',
    maxStudents: 25,
    status: 'En attente',
    dateProposed: '15 Août 2026',
    theme: 'blue',
  },
  {
    id: 'CLS-202',
    title: 'Atelier de Programmation Python & IA',
    teacher: 'Prof. Marcus Chen',
    subject: 'Informatique',
    level: 'Lycée & Débutants',
    schedule: 'Vendredi : 09h00 - 12h00',
    room: 'Lab Info 1',
    price: '6,000 DZD / mois',
    maxStudents: 18,
    status: 'En attente',
    dateProposed: '16 Août 2026',
    theme: 'amber',
  },
  {
    id: 'CLS-203',
    title: 'Physique Pratique - Manipulations & Chimie',
    teacher: 'Prof. Amira Al-Mansour',
    subject: 'Sciences',
    level: '2ème Année Secondaire (2S)',
    schedule: 'Mercredi : 15h00 - 18h00',
    room: 'Laboratoire Lab-01',
    price: '4,800 DZD / mois',
    maxStudents: 20,
    status: 'Approuvé',
    dateProposed: '12 Août 2026',
    theme: 'purple',
  },
  {
    id: 'CLS-204',
    title: 'Anglais Intensif - Expression Orale & TOEFL',
    teacher: 'Prof. David Moreau',
    subject: 'Langues',
    level: 'Tous Niveaux',
    schedule: 'Dimanche : 16h00 - 19h00',
    room: 'Salle L1 - Langues',
    price: '4,500 DZD / mois',
    maxStudents: 22,
    status: 'Approuvé',
    dateProposed: '10 Août 2026',
    theme: 'green',
  },
]

// Initial Students
const INITIAL_STUDENTS = [
  {
    id: 'AK-2026-1042',
    name: 'Yacine Benali',
    level: '2S Mathématiques',
    classTheme: 'blue',
    phone: '0555 12 34 56',
    parent: 'Mohamed Benali',
    status: 'Validé',
    date: '12 Août 2026',
    initials: 'YB',
    avatarColor: 'avatar-blue',
  },
  {
    id: 'AK-2026-1088',
    name: 'Amina Mansouri',
    level: '2S Sciences',
    classTheme: 'purple',
    phone: '0661 98 76 54',
    parent: 'Fatima Mansouri',
    status: 'Validé',
    date: '14 Août 2026',
    initials: 'AM',
    avatarColor: 'avatar-green',
  },
  {
    id: 'AK-2026-1120',
    name: 'Rayane Haddad',
    level: 'Langues (Anglais)',
    classTheme: 'green',
    phone: '0770 45 67 89',
    parent: 'Karim Haddad',
    status: 'En attente',
    date: '15 Août 2026',
    initials: 'RH',
    avatarColor: 'avatar-amber',
  },
  {
    id: 'AK-2026-1156',
    name: 'Sarah Belkacem',
    level: '2S Mathématiques',
    classTheme: 'blue',
    phone: '0550 33 22 11',
    parent: 'Samir Belkacem',
    status: 'Validé',
    date: '15 Août 2026',
    initials: 'SB',
    avatarColor: 'avatar-rose',
  },
  {
    id: 'AK-2026-1204',
    name: 'Mehdi Ouadah',
    level: 'Informatique',
    classTheme: 'amber',
    phone: '0663 88 99 00',
    parent: 'Noureddine Ouadah',
    status: 'Validé',
    date: '16 Août 2026',
    initials: 'MO',
    avatarColor: 'avatar-purple',
  },
  {
    id: 'AK-2026-1232',
    name: 'Ines Kara',
    level: '2S Sciences',
    classTheme: 'purple',
    phone: '0772 11 22 33',
    parent: 'Meriem Kara',
    status: 'En attente',
    date: '16 Août 2026',
    initials: 'IK',
    avatarColor: 'avatar-blue',
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedPeriod, setSelectedPeriod] = useState('Cette semaine')
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Teachers State
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS)
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: 'Mathématiques',
    phone: '',
    email: '',
  })
  const [teacherSuccess, setTeacherSuccess] = useState(false)

  // Classes & Approval State
  const [proposedClasses, setProposedClasses] = useState(INITIAL_PROPOSED_CLASSES)
  const [classApprovalFilter, setClassApprovalFilter] = useState('all')
  const [isAddClassOpen, setIsAddClassOpen] = useState(false)
  const [newClass, setNewClass] = useState({
    title: '',
    teacher: 'Prof. Sarah Benali',
    subject: 'Mathématiques',
    level: '2ème Année Secondaire (2S)',
    schedule: 'Samedi : 14h00 - 17h00',
    room: 'Salle B2 - Sciences',
    price: '4,500 DZD / mois',
    maxStudents: '25',
  })
  const [classSuccess, setClassSuccess] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Students State
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedClassFilter, setSelectedClassFilter] = useState('all')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all')
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    level: '2S Mathématiques',
    phone: '',
    parent: '',
  })
  const [studentAddedSuccess, setStudentAddedSuccess] = useState(false)

  // Trigger temporary toast
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage('') , 3000)
  }

  // Count pending approvals
  const pendingApprovalsCount = proposedClasses.filter((c) => c.status === 'En attente').length

  // Handle Approve Class to Teacher
  const handleApproveClass = (classId) => {
    setProposedClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, status: 'Approuvé' } : c))
    )
    const approvedItem = proposedClasses.find((c) => c.id === classId)
    showToast(`✓ Le cours "${approvedItem?.title}" a été approuvé et assigné avec succès à ${approvedItem?.teacher} !`)
  }

  // Handle Reject Class
  const handleRejectClass = (classId) => {
    setProposedClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, status: 'Rejeté' } : c))
    )
    showToast(`Le cours a été rejeté.`)
  }

  // Handle Add Teacher
  const handleAddTeacherSubmit = (e) => {
    e.preventDefault()
    if (!newTeacher.name.trim()) return

    const randomId = `T-${Math.floor(100 + Math.random() * 900)}`
    const initials = newTeacher.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'PR'

    const created = {
      id: randomId,
      name: newTeacher.name.startsWith('Prof.') ? newTeacher.name : `Prof. ${newTeacher.name}`,
      subject: newTeacher.subject,
      subjectTheme: newTeacher.subject.includes('Math') ? 'blue' : newTeacher.subject.includes('Lang') ? 'green' : 'purple',
      phone: newTeacher.phone || '0555 00 11 22',
      email: newTeacher.email || 'prof@ecole.dz',
      classesCount: 1,
      status: 'Actif',
      initials,
      avatarColor: 'avatar-blue',
    }

    setTeachers([created, ...teachers])
    setTeacherSuccess(true)
    setTimeout(() => {
      setTeacherSuccess(false)
      setIsAddTeacherOpen(false)
      setNewTeacher({ name: '', subject: 'Mathématiques', phone: '', email: '' })
      showToast(`L'enseignant "${created.name}" a été ajouté avec succès !`)
    }, 600)
  }

  // Handle Add Class / Propose Lesson
  const handleAddClassSubmit = (e) => {
    e.preventDefault()
    if (!newClass.title.trim()) return

    const randomId = `CLS-${Math.floor(200 + Math.random() * 800)}`
    const createdClass = {
      id: randomId,
      title: newClass.title,
      teacher: newClass.teacher,
      subject: newClass.subject,
      level: newClass.level,
      schedule: newClass.schedule,
      room: newClass.room,
      price: newClass.price,
      maxStudents: Number(newClass.maxStudents) || 20,
      status: 'En attente', // Needs admin / teacher approval!
      dateProposed: "Aujourd'hui",
      theme: newClass.subject.includes('Math') ? 'blue' : newClass.subject.includes('Info') ? 'amber' : 'green',
    }

    setProposedClasses([createdClass, ...proposedClasses])
    setClassSuccess(true)
    setTimeout(() => {
      setClassSuccess(false)
      setIsAddClassOpen(false)
      setNewClass({
        title: '',
        teacher: teachers[0]?.name || 'Prof. Sarah Benali',
        subject: 'Mathématiques',
        level: '2ème Année Secondaire (2S)',
        schedule: 'Samedi : 14h00 - 17h00',
        room: 'Salle B2 - Sciences',
        price: '4,500 DZD / mois',
        maxStudents: '25',
      })
      showToast(`Le cours a été soumis et est en attente d'approbation !`)
    }, 600)
  }

  // Handle Add Student
  const handleAddStudentSubmit = (e) => {
    e.preventDefault()
    if (!newStudent.name.trim()) return

    const randomId = `AK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const initials = newStudent.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ET'

    const created = {
      id: randomId,
      name: newStudent.name.trim(),
      level: newStudent.level,
      classTheme: 'blue',
      phone: newStudent.phone.trim() || '0555 00 00 00',
      parent: newStudent.parent.trim() || 'Parent Tuteur',
      status: 'Validé',
      date: "Aujourd'hui",
      initials,
      avatarColor: 'avatar-blue',
    }

    setStudents([created, ...students])
    setStudentAddedSuccess(true)
    setTimeout(() => {
      setStudentAddedSuccess(false)
      setIsAddStudentOpen(false)
      setNewStudent({ name: '', level: '2S Mathématiques', phone: '', parent: '' })
      showToast(`L'étudiant "${created.name}" a été inscrit avec succès !`)
    }, 600)
  }

  // Chart datasets
  const chartDatasets = {
    'Cette semaine': [
      { day: 'Lun', value: 120, max: 200 },
      { day: 'Mar', value: 170, max: 200 },
      { day: 'Mer', value: 200, max: 200 },
      { day: 'Jeu', value: 150, max: 200 },
    ],
    'Ce mois': [
      { day: 'Sem 1', value: 140, max: 200 },
      { day: 'Sem 2', value: 165, max: 200 },
      { day: 'Sem 3', value: 195, max: 200 },
      { day: 'Sem 4', value: 180, max: 200 },
    ],
    'Cette année': [
      { day: 'T1', value: 130, max: 200 },
      { day: 'T2', value: 180, max: 200 },
      { day: 'T3', value: 200, max: 200 },
      { day: 'T4', value: 160, max: 200 },
    ],
  }

  const currentData = chartDatasets[selectedPeriod] || chartDatasets['Cette semaine']

  // Filtered classes by approval status
  const filteredProposedClasses = proposedClasses.filter((c) => {
    if (classApprovalFilter === 'all') return true
    return c.status === classApprovalFilter
  })

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.phone.includes(studentSearch)
    const matchesClass = selectedClassFilter === 'all' || s.level.includes(selectedClassFilter)
    const matchesStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  return (
    <div className="dashboard-page-canvas">
      {/* Real-time Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: '#111827',
          color: '#FFFFFF',
          padding: '14px 22px',
          borderRadius: '14px',
          boxShadow: '0 10px 28px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10000,
          fontSize: '13.5px',
          fontWeight: '600',
          animation: 'fadeIn 0.25s ease-out',
        }}>
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
            <div className="sidebar-brand" onClick={() => setActiveTab('home')}>
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
                <Home size={20} className="nav-item-icon" />
                <span>Home</span>
                {activeTab === 'home' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'statistique' ? 'active' : ''}`}
                onClick={() => setActiveTab('statistique')}
                type="button"
                id="tab-btn-statistique"
              >
                <BarChart2 size={20} className="nav-item-icon" />
                <span>Statistique</span>
                {activeTab === 'statistique' && <span className="nav-active-dot" />}
              </button>

              <button
                className={`sidebar-nav-item ${activeTab === 'student' ? 'active' : ''}`}
                onClick={() => setActiveTab('student')}
                type="button"
                id="tab-btn-student"
              >
                <GraduationCap size={20} className="nav-item-icon" />
                <span>Student</span>
                {activeTab === 'student' && <span className="nav-active-dot" />}
              </button>

              {/* NEW: Teacher Tab */}
              <button
                className={`sidebar-nav-item ${activeTab === 'teacher' ? 'active' : ''}`}
                onClick={() => setActiveTab('teacher')}
                type="button"
                id="tab-btn-teacher"
              >
                <Users size={20} className="nav-item-icon" />
                <span>Teacher</span>
                {activeTab === 'teacher' && <span className="nav-active-dot" />}
              </button>

              {/* NEW: Classes & Approval Tab */}
              <button
                className={`sidebar-nav-item ${activeTab === 'classes' ? 'active' : ''}`}
                onClick={() => setActiveTab('classes')}
                type="button"
                id="tab-btn-classes"
              >
                <ClipboardCheck size={20} className="nav-item-icon" />
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>Classes &amp; Cours</span>
                  {pendingApprovalsCount > 0 && (
                    <span style={{
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 7px',
                      borderRadius: '999px',
                    }}>
                      {pendingApprovalsCount}
                    </span>
                  )}
                </span>
                {activeTab === 'classes' && <span className="nav-active-dot" />}
              </button>
            </nav>
          </div>

          {/* Bottom Profile Card */}
          <div className="sidebar-profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <User size={20} />
              </div>
              <div className="profile-info">
                <span className="profile-name">Admin</span>
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
              {activeTab === 'home' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Bienvenue, Admin <span role="img" aria-label="wave">👋</span>
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Voici un aperçu général de votre plateforme.
                  </p>
                </>
              )}

              {activeTab === 'statistique' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Statistiques &amp; Rapports 📈
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Analyse des inscriptions, de la présence et des performances académiques.
                  </p>
                </>
              )}

              {activeTab === 'student' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Gestion des Étudiants 🎓
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Liste complète des élèves inscrits, coordonnées et suivi des dossiers.
                  </p>
                </>
              )}

              {activeTab === 'teacher' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Corps Enseignant &amp; Professeurs 👨‍🏫
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Gestion des enseignants, assignation des matières et suivi des cours.
                  </p>
                </>
              )}

              {activeTab === 'classes' && (
                <>
                  <h1 className="dashboard-welcome-heading">
                    Gestion des Cours &amp; Approbations ✅
                  </h1>
                  <p className="dashboard-welcome-subtext">
                    Proposer de nouveaux cours, ajouter des leçons et valider les demandes des enseignants.
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
                  {pendingApprovalsCount > 0 && <span className="notification-badge-dot" />}
                </button>

                {notificationsOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '52px',
                    right: '0',
                    width: '300px',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    border: '1px solid #F3F4F6',
                    padding: '16px',
                    zIndex: 100,
                  }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Notifications &amp; Alertes</h4>
                    {pendingApprovalsCount > 0 && (
                      <div style={{ background: '#FFFBEB', padding: '8px 10px', borderRadius: '8px', fontSize: '12px', color: '#92400E', marginBottom: '8px', fontWeight: '600' }}>
                        ⚠️ {pendingApprovalsCount} cours en attente d'approbation
                      </div>
                    )}
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>• 3 nouveaux étudiants inscrits aujourd'hui</p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>• Emploi du temps mis à jour avec succès</p>
                  </div>
                )}
              </div>

              <button
                className="topbar-circle-btn"
                aria-label="Menu"
                type="button"
              >
                <Menu size={20} />
              </button>
            </div>
          </header>

          {/* ========================================================
              PAGE 1: HOME TAB
              ======================================================== */}
          {activeTab === 'home' && (
            <div className="tab-view-container">
              {/* Section 1: Aperçu général */}
              <section className="dashboard-card-panel">
                <div className="panel-header-row">
                  <div className="panel-title-wrap">
                    <div className="panel-icon-badge">
                      <TrendingUp size={20} />
                    </div>
                    <h2 className="panel-title-text">Aperçu général</h2>
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

                    {periodMenuOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '42px',
                        right: 0,
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        zIndex: 20,
                        minWidth: '140px',
                        overflow: 'hidden',
                      }}>
                        {['Cette semaine', 'Ce mois', 'Cette année'].map((p) => (
                          <button
                            key={p}
                            style={{
                              width: '100%',
                              padding: '8px 14px',
                              textAlign: 'left',
                              background: selectedPeriod === p ? '#F3F4F6' : 'transparent',
                              border: 'none',
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#374151',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setSelectedPeriod(p)
                              setPeriodMenuOpen(false)
                            }}
                            type="button"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Grid: Chart on Left, Metric on Right */}
                <div className="overview-grid-layout">
                  {/* Left Bar Chart */}
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
                      {currentData.map((item, idx) => {
                        const heightPercent = (item.value / item.max) * 100
                        return (
                          <div className="bar-column" key={idx}>
                            <div className="bar-tooltip">{item.value} étudiants</div>
                            <div
                              className="bar-pill"
                              style={{ height: `${heightPercent}%` }}
                            />
                            <span className="axis-x-label">{item.day}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Right Metric Card: Total étudiants */}
                  <div className="metric-summary-card">
                    <div className="metric-card-top">
                      <span className="metric-label-title">Total étudiants</span>
                      <div className="metric-icon-badge">
                        <Users size={20} />
                      </div>
                    </div>

                    <div className="metric-big-number">642</div>

                    <div className="metric-trend-row">
                      <span className="trend-badge-green">
                        <span>↑ 12%</span>
                      </span>
                      <span>par rapport à la semaine dernière</span>
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
                  {/* Row 1: Gérer les étudiants */}
                  <div
                    className="quick-action-row"
                    onClick={() => setActiveTab('student')}
                  >
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-blue">
                        <Users size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Gérer les étudiants</span>
                        <span className="action-subtitle">Voir et gérer la liste des étudiants</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>

                  {/* Row 2: Demandes & Approbations */}
                  <div
                    className="quick-action-row"
                    onClick={() => setActiveTab('classes')}
                  >
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-purple">
                        <ClipboardCheck size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Approuver les cours &amp; classes</span>
                        <span className="action-subtitle">
                          {pendingApprovalsCount > 0 ? `${pendingApprovalsCount} cours en attente d'approbation` : 'Toutes les demandes sont validées'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>

                  {/* Row 3: Voir les statistiques */}
                  <div
                    className="quick-action-row"
                    onClick={() => setActiveTab('statistique')}
                  >
                    <div className="action-row-left">
                      <div className="action-icon-circle circle-green">
                        <BarChart2 size={22} />
                      </div>
                      <div className="action-text-group">
                        <span className="action-main-title">Voir les statistiques</span>
                        <span className="action-subtitle">Consulter les rapports et statistiques</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="action-arrow-icon" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================
              PAGE 2: STATISTIQUE TAB
              ======================================================== */}
          {activeTab === 'statistique' && (
            <div className="tab-view-container">
              {/* 4 Top KPI Cards */}
              <div className="stats-kpi-grid">
                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Taux de Réussite</span>
                    <div className="kpi-icon-pill" style={{ background: '#ECFDF5', color: '#10B981' }}>
                      <Award size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">98.4%</span>
                    <span className="kpi-sub-trend" style={{ color: '#10B981' }}>
                      ↑ 3.2% vs trimestre passé
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Présence Moyenne</span>
                    <div className="kpi-icon-pill" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">94.8%</span>
                    <span className="kpi-sub-trend" style={{ color: '#2563EB' }}>
                      ↑ 1.5% assiduité élevée
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Enseignants &amp; Cours</span>
                    <div className="kpi-icon-pill" style={{ background: '#FAF5FF', color: '#9333EA' }}>
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">{teachers.length} Profs</span>
                    <span className="kpi-sub-trend" style={{ color: '#6B7280' }}>
                      {proposedClasses.filter(c => c.status === 'Approuvé').length} cours actifs
                    </span>
                  </div>
                </div>

                <div className="stats-kpi-card">
                  <div className="kpi-card-header">
                    <span className="kpi-title">Revenu Mensuel</span>
                    <div className="kpi-icon-pill" style={{ background: '#FEF3C7', color: '#D97706' }}>
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="kpi-value-row">
                    <span className="kpi-main-number">2.84M DZD</span>
                    <span className="kpi-sub-trend" style={{ color: '#10B981' }}>
                      ↑ 8.4% ce mois-ci
                    </span>
                  </div>
                </div>
              </div>

              {/* 2-Column Section */}
              <div className="analytics-two-col-grid">
                <section className="dashboard-card-panel">
                  <div className="panel-header-row">
                    <div className="panel-title-wrap">
                      <div className="panel-icon-badge badge-green">
                        <BarChart2 size={20} />
                      </div>
                      <h2 className="panel-title-text">Performance par Matière</h2>
                    </div>
                  </div>

                  <div className="subject-progress-list">
                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Mathématiques (2S &amp; BAC)</span>
                        <span className="subject-rate">94%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-blue" style={{ width: '94%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Physique &amp; Chimie</span>
                        <span className="subject-rate">90%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-purple" style={{ width: '90%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Langue Anglaise</span>
                        <span className="subject-rate">96%</span>
                      </div>
                      <div className="subject-track">
                        <div className="subject-fill fill-green" style={{ width: '96%' }} />
                      </div>
                    </div>

                    <div className="subject-progress-item">
                      <div className="subject-item-header">
                        <span>Informatique &amp; IA</span>
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
                      <h2 className="panel-title-text">Répartition par Filière</h2>
                    </div>
                  </div>

                  <div className="level-distribution-grid">
                    <div className="level-dist-card">
                      <span className="level-dist-title">Mathématiques</span>
                      <span className="level-dist-count">248</span>
                      <span className="level-dist-meta">élèves inscrits</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">Sciences Expérimentales</span>
                      <span className="level-dist-count">164</span>
                      <span className="level-dist-meta">élèves inscrits</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">Langues Vivantes</span>
                      <span className="level-dist-count">142</span>
                      <span className="level-dist-meta">apprenants</span>
                    </div>

                    <div className="level-dist-card">
                      <span className="level-dist-title">Informatique &amp; Web</span>
                      <span className="level-dist-count">88</span>
                      <span className="level-dist-meta">stagiaires</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================
              PAGE 3: STUDENT TAB
              ======================================================== */}
          {activeTab === 'student' && (
            <div className="tab-view-container">
              {/* Toolbar & Filters */}
              <div className="students-toolbar">
                <div className="student-search-box">
                  <Search size={16} className="student-search-icon" />
                  <input
                    type="text"
                    className="student-search-input"
                    placeholder="Rechercher par nom, ID ou téléphone..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    className="student-filter-select"
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                  >
                    <option value="all">Toutes les classes</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Langues">Langues</option>
                    <option value="Informatique">Informatique</option>
                  </select>

                  <select
                    className="student-filter-select"
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="Validé">Validé</option>
                    <option value="En attente">En attente</option>
                  </select>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddStudentOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>Ajouter un étudiant</span>
                  </button>
                </div>
              </div>

              {/* Students Data Table */}
              <div className="students-table-card">
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Élève</th>
                        <th>Niveau / Classe</th>
                        <th>Contact Parent</th>
                        <th>Statut</th>
                        <th>Date d'inscription</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <tr key={student.id}>
                            <td>
                              <div className="student-avatar-cell">
                                <div className={`student-initial-avatar ${student.avatarColor}`}>
                                  {student.initials}
                                </div>
                                <div>
                                  <div className="student-name-text">{student.name}</div>
                                  <div className="student-id-code">{student.id}</div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="badge-class-pill" style={{
                                background: student.classTheme === 'blue' ? '#EFF6FF' : student.classTheme === 'purple' ? '#FAF5FF' : student.classTheme === 'amber' ? '#FFFBEB' : '#F0FDF4',
                                color: student.classTheme === 'blue' ? '#2563EB' : student.classTheme === 'purple' ? '#7C3AED' : student.classTheme === 'amber' ? '#D97706' : '#16A34A',
                              }}>
                                {student.level}
                              </span>
                            </td>

                            <td>
                              <div style={{ fontWeight: '600', color: '#374151' }}>{student.phone}</div>
                              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Tuteur : {student.parent}</div>
                            </td>

                            <td>
                              <span className={`badge-status-pill ${student.status === 'Validé' ? 'status-validated' : 'status-pending'}`}>
                                {student.status === 'Validé' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                <span>{student.status}</span>
                              </span>
                            </td>

                            <td style={{ color: '#6B7280', fontSize: '13px' }}>
                              {student.date}
                            </td>

                            <td>
                              <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                                <button
                                  className="action-btn-sm"
                                  title="Voir détails"
                                  onClick={() => alert(`Détails de l'élève : ${student.name} (${student.id})\nClasse : ${student.level}\nTéléphone : ${student.phone}`)}
                                  type="button"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  className="action-btn-sm btn-delete"
                                  title="Supprimer"
                                  onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                                  type="button"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
                            <GraduationCap size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                            <p style={{ fontWeight: '600' }}>Aucun étudiant trouvé</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer-bar">
                  <span>Affichage de {filteredStudents.length} sur {students.length} étudiants enregistrés</span>
                  <div className="pagination-controls">
                    <button className="page-btn active" type="button">1</button>
                    <button className="page-btn" type="button">2</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PAGE 4: TEACHER TAB (Enseignants)
              ======================================================== */}
          {activeTab === 'teacher' && (
            <div className="tab-view-container">
              {/* Header Stats & Add Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '14px', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{teachers.length}</div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Enseignants Actifs</div>
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '14px', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{proposedClasses.filter(c => c.status === 'Approuvé').length}</div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Cours Assignés</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddClassOpen(true)}
                    style={{ background: '#059669' }}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>+ Proposer une Classe / Leçon</span>
                  </button>

                  <button
                    className="btn-add-student-primary"
                    onClick={() => setIsAddTeacherOpen(true)}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>Ajouter un Enseignant</span>
                  </button>
                </div>
              </div>

              {/* Teachers Table Card */}
              <div className="students-table-card">
                <div className="students-table-wrap">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Enseignant</th>
                        <th>Matière / Spécialité</th>
                        <th>Contact</th>
                        <th>Classes Assignées</th>
                        <th>Statut</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td>
                            <div className="student-avatar-cell">
                              <div className={`student-initial-avatar ${teacher.avatarColor}`}>
                                {teacher.initials}
                              </div>
                              <div>
                                <div className="student-name-text">{teacher.name}</div>
                                <div className="student-id-code">{teacher.id}</div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="badge-class-pill" style={{
                              background: teacher.subjectTheme === 'blue' ? '#EFF6FF' : teacher.subjectTheme === 'green' ? '#F0FDF4' : teacher.subjectTheme === 'purple' ? '#FAF5FF' : '#FFFBEB',
                              color: teacher.subjectTheme === 'blue' ? '#2563EB' : teacher.subjectTheme === 'green' ? '#16A34A' : teacher.subjectTheme === 'purple' ? '#7C3AED' : '#D97706',
                            }}>
                              {teacher.subject}
                            </span>
                          </td>

                          <td>
                            <div style={{ fontWeight: '600', color: '#374151' }}>{teacher.phone}</div>
                            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{teacher.email}</div>
                          </td>

                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#2563EB' }}>
                              <BookOpen size={14} />
                              <span>{teacher.classesCount} Classes actives</span>
                            </div>
                          </td>

                          <td>
                            <span className="badge-status-pill status-validated">
                              <CheckCircle2 size={12} />
                              <span>{teacher.status}</span>
                            </span>
                          </td>

                          <td>
                            <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                              <button
                                className="action-btn-sm"
                                title="Ajouter une classe pour ce professeur"
                                onClick={() => {
                                  setNewClass({ ...newClass, teacher: teacher.name, subject: teacher.subject })
                                  setIsAddClassOpen(true)
                                }}
                                type="button"
                              >
                                <Plus size={14} />
                              </button>
                              <button
                                className="action-btn-sm"
                                title="Voir planning"
                                onClick={() => alert(`Planning de ${teacher.name} : ${teacher.classesCount} classes actives ce semestre.`)}
                                type="button"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                className="action-btn-sm btn-delete"
                                title="Supprimer"
                                onClick={() => setTeachers(teachers.filter(t => t.id !== teacher.id))}
                                type="button"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PAGE 5: CLASSES & APPROVAL TAB
              ======================================================== */}
          {activeTab === 'classes' && (
            <div className="tab-view-container">
              {/* Approval Banner if pending */}
              {pendingApprovalsCount > 0 && (
                <div className="approval-banner-alert">
                  <div className="approval-banner-left">
                    <AlertCircle size={20} color="#D97706" />
                    <div>
                      <strong style={{ color: '#92400E', fontSize: '14px' }}>
                        Demandes de cours en attente d'approbation
                      </strong>
                      <p style={{ color: '#B45309', fontSize: '12.5px', marginTop: '2px' }}>
                        Certains cours proposés par les enseignants nécessitent votre validation pour être publiés.
                      </p>
                    </div>
                  </div>
                  <span className="approval-badge-count">{pendingApprovalsCount} en attente</span>
                </div>
              )}

              {/* Sub-tabs & Action Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div className="sub-tabs-bar" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                  <button
                    className={`sub-tab-btn ${classApprovalFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setClassApprovalFilter('all')}
                    type="button"
                  >
                    Tous les cours ({proposedClasses.length})
                  </button>
                  <button
                    className={`sub-tab-btn ${classApprovalFilter === 'En attente' ? 'active' : ''}`}
                    onClick={() => setClassApprovalFilter('En attente')}
                    type="button"
                  >
                    En attente ({pendingApprovalsCount})
                  </button>
                  <button
                    className={`sub-tab-btn ${classApprovalFilter === 'Approuvé' ? 'active' : ''}`}
                    onClick={() => setClassApprovalFilter('Approuvé')}
                    type="button"
                  >
                    Approuvés ({proposedClasses.filter(c => c.status === 'Approuvé').length})
                  </button>
                </div>

                <button
                  className="btn-add-student-primary"
                  onClick={() => setIsAddClassOpen(true)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>+ Proposer / Ajouter un Cours</span>
                </button>
              </div>

              {/* Classes & Proposals Grid */}
              <div className="approval-cards-grid">
                {filteredProposedClasses.map((item) => (
                  <div className="approval-card-item" key={item.id}>
                    <div>
                      <div className="approval-card-top">
                        <span className={`badge-status-pill ${
                          item.status === 'Approuvé'
                            ? 'badge-status-approved'
                            : item.status === 'En attente'
                            ? 'badge-status-pending'
                            : 'badge-status-rejected'
                        }`}>
                          {item.status === 'Approuvé' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          <span>{item.status}</span>
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: '600' }}>{item.id}</span>
                      </div>

                      <h3 className="approval-card-title">{item.title}</h3>
                      <div className="approval-card-teacher">
                        <User size={14} color="#2563EB" />
                        <span>{item.teacher}</span>
                      </div>

                      <div className="approval-specs-list">
                        <div className="approval-spec-row">
                          <BookOpen size={13} color="#9CA3AF" />
                          <span><strong>Niveau :</strong> {item.level}</span>
                        </div>
                        <div className="approval-spec-row">
                          <Calendar size={13} color="#9CA3AF" />
                          <span><strong>Horaires :</strong> {item.schedule}</span>
                        </div>
                        <div className="approval-spec-row">
                          <MapPin size={13} color="#9CA3AF" />
                          <span><strong>Salle :</strong> {item.room}</span>
                        </div>
                        <div className="approval-spec-row">
                          <DollarSign size={13} color="#9CA3AF" />
                          <span><strong>Tarif :</strong> {item.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar based on approval status */}
                    <div className="approval-actions-bar">
                      {item.status === 'En attente' ? (
                        <>
                          <button
                            className="btn-approve-action"
                            onClick={() => handleApproveClass(item.id)}
                            type="button"
                          >
                            <Check size={16} />
                            <span>Approuver au Prof</span>
                          </button>
                          <button
                            className="btn-reject-action"
                            onClick={() => handleRejectClass(item.id)}
                            type="button"
                          >
                            <X size={16} />
                            <span>Rejeter</span>
                          </button>
                        </>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={{ fontSize: '12px', color: item.status === 'Approuvé' ? '#059669' : '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {item.status === 'Approuvé' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                            <span>{item.status === 'Approuvé' ? 'Assigné & Publié' : 'Demande Rejetée'}</span>
                          </span>
                          <button
                            className="action-btn-sm"
                            title="Modifier statut"
                            onClick={() => {
                              if (item.status === 'Approuvé') {
                                handleRejectClass(item.id)
                              } else {
                                handleApproveClass(item.id)
                              }
                            }}
                            type="button"
                          >
                            <Edit size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================
          MODAL 1: PROPOSER / AJOUTER UN COURS (CLASS & LESSON)
          ======================================================== */}
      {isAddClassOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddClassOpen(false)}>
          <div className="dashboard-modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="action-icon-circle circle-blue" style={{ width: '38px', height: '38px' }}>
                  <BookOpen size={20} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                  Ajouter un Nouveau Cours / Leçon
                </h3>
              </div>
              <button
                onClick={() => setIsAddClassOpen(false)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            {!classSuccess ? (
              <form onSubmit={handleAddClassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Titre du Cours / Leçon *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Ex: Mathématiques Approfondies - Spécial BAC"
                    value={newClass.title}
                    onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Enseignant Assigné *
                    </label>
                    <select
                      value={newClass.teacher}
                      onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                    >
                      {teachers.map((t) => (
                        <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Matière / Domaine
                    </label>
                    <select
                      value={newClass.subject}
                      onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                    >
                      <option value="Mathématiques">Mathématiques</option>
                      <option value="Sciences">Sciences &amp; Physique</option>
                      <option value="Langues">Langues (Anglais / Français)</option>
                      <option value="Informatique">Informatique &amp; Programmation</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Niveau Scolaire
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      placeholder="Ex: 2ème Année Secondaire (2S)"
                      value={newClass.level}
                      onChange={(e) => setNewClass({ ...newClass, level: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Horaires &amp; Jours
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Samedi & Mardi : 14h-16h"
                      value={newClass.schedule}
                      onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Salle de Cours
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Salle B2 - Sciences"
                      value={newClass.room}
                      onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Tarif Mensuel
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 4,500 DZD / mois"
                      value={newClass.price}
                      onChange={(e) => setNewClass({ ...newClass, price: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsAddClassOpen(false)}
                    style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '10px 22px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Soumettre pour Approbation
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
                  Cours enregistré avec succès !
                </h4>
                <p style={{ fontSize: '13.5px', color: '#6B7280' }}>
                  Le cours est prêt à être approuvé et assigné au professeur.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: AJOUTER UN ENSEIGNANT
          ======================================================== */}
      {isAddTeacherOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddTeacherOpen(false)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="action-icon-circle circle-green" style={{ width: '38px', height: '38px' }}>
                  <Users size={20} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>Ajouter un Enseignant</h3>
              </div>
              <button
                onClick={() => setIsAddTeacherOpen(false)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            {!teacherSuccess ? (
              <form onSubmit={handleAddTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Nom et Prénom du Professeur *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    placeholder="Ex: Prof. Karim Haddad"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Matière Principale
                  </label>
                  <select
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Sciences & Physique">Sciences &amp; Physique</option>
                    <option value="Langues (Anglais)">Langues (Anglais)</option>
                    <option value="Langues (Français)">Langues (Français)</option>
                    <option value="Informatique & Web">Informatique &amp; Web</option>
                  </select>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      maxLength={20}
                      placeholder="Ex: 0555 11 22 33"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                      Adresse E-mail
                    </label>
                    <input
                      type="email"
                      maxLength={100}
                      placeholder="Ex: prof@ecole.dz"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsAddTeacherOpen(false)}
                    style={{ padding: '10px 18px', borderRadius: '12px', background: '#F3F4F6', border: 'none', fontWeight: '600', color: '#4B5563', cursor: 'pointer' }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '10px 22px', borderRadius: '12px', background: '#10B981', color: '#FFFFFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Enregistrer l'Enseignant
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
                  Enseignant ajouté avec succès !
                </h4>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: AJOUTER UN ÉTUDIANT
          ======================================================== */}
      {isAddStudentOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsAddStudentOpen(false)}>
          <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="action-icon-circle circle-purple" style={{ width: '38px', height: '38px' }}>
                  <GraduationCap size={20} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>Ajouter un étudiant</h3>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                type="button"
              >
                <X size={16} color="#6B7280" />
              </button>
            </div>

            {!studentAddedSuccess ? (
              <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Nom et Prénom de l'élève *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    placeholder="Ex: Yacine Benali"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Classe / Filière
                  </label>
                  <select
                    value={newStudent.level}
                    onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="2S Mathématiques">2ème Année Secondaire - Mathématiques</option>
                    <option value="2S Sciences">2ème Année Secondaire - Sciences</option>
                    <option value="Langues (Anglais)">Cours de Langues (Anglais)</option>
                    <option value="Langues (Français)">Cours de Langues (Français)</option>
                    <option value="Informatique">Formation Informatique &amp; Web</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Nom du Tuteur / Parent
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    placeholder="Ex: Mohamed Benali"
                    value={newStudent.parent}
                    onChange={(e) => setNewStudent({ ...newStudent, parent: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    placeholder="Ex: 0555 12 34 56"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px', outline: 'none' }}
                  />
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
                    style={{ padding: '10px 22px', borderRadius: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Enregistrer l'étudiant
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
                  Étudiant ajouté avec succès !
                </h4>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}