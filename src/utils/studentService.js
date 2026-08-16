/**
 * ============================================================
 * Student Enrollment, Approval & Monthly Payment Management Service
 * Supports physical school verification, session tracking (0/4 -> 4/4),
 * automated payment required triggers, and immutable payment transactions.
 * ============================================================
 */

const STORAGE_KEY_STUDENTS = 'ecole_students_data_v2'
const STORAGE_KEY_NOTIFICATIONS = 'ecole_notifications_data_v2'
const STORAGE_KEY_ANNOUNCEMENTS = 'ecole_announcements_data_v2'

// Initial Seed Data for Announcements
const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ANN-101',
    title: 'Rappel des Échéances de Paiement Mensuel (Cycle Octobre)',
    content: 'Chers parents et élèves, nous vous rappelons que le règlement des mensualités doit s\'effectuer dès la 4ème séance complétée pour garantir la continuité des cours et l\'accès aux supports pédagogiques.',
    category: 'Paiements', // 'Important' | 'Paiements' | 'Pédagogique' | 'Événements'
    targetAudience: 'Tous les parents & élèves',
    date: '2026-09-16',
    author: 'Direction des Études',
    isPinned: true,
    views: 142,
  },
  {
    id: 'ANN-102',
    title: 'Nouveaux Emplois du Temps - Préparation BAC & Lycée',
    content: 'Les plannings actualisés pour les filières Mathématiques, Sciences et Langues sont disponibles au secrétariat et sur l\'espace élève. Les séances du samedi débutent à 08h30 précises.',
    category: 'Pédagogique',
    targetAudience: 'Classes de 2S et Terminale',
    date: '2026-09-14',
    author: 'Prof. Sarah Benali',
    isPinned: false,
    views: 98,
  },
  {
    id: 'ANN-103',
    title: 'Atelier Spécial : Initiation au Développement Web & IA',
    content: 'Un atelier gratuit de 3 heures sera organisé ce vendredi matin au Lab Informatique pour tous les élèves inscrits en formation technologique.',
    category: 'Événements',
    targetAudience: 'Tous les apprenants',
    date: '2026-09-12',
    author: 'Prof. Marcus Chen',
    isPinned: false,
    views: 76,
  },
]

// Initial Seed Data reflecting realistic Algerian school context
const DEFAULT_STUDENTS = [
  {
    id: 'STU-1001',
    fullName: 'Ahmed Benali',
    parentName: 'Mohamed Benali',
    phone: '0555 12 34 56',
    email: 'ahmed.benali@gmail.com',
    address: '14 Rue Didouche Mourad, Alger',
    dob: '2008-05-14',
    courseId: 'CLS-ENG-01',
    courseName: 'Langue Anglaise (Intensif)',
    teacherId: 'T-102',
    teacherName: 'Prof. David Moreau',
    monthlyPrice: 2500,
    sessionsPerMonth: 4,
    sessionsCompleted: 4, // Completed 4th session -> Payment Required!
    currentCycle: 'Septembre 2026',
    paymentStatus: 'Payment Required', // 'Paid' | 'Payment Required' | 'Overdue' | 'Pending Approval'
    status: 'Active', // 'Active' | 'Pending Approval' | 'Approved - Payment Pending' | 'Suspended' | 'Cancelled'
    enrollmentDate: '2026-08-01',
    nextPaymentDate: "Aujourd'hui",
    paymentHistory: [
      {
        id: 'PAY-801',
        amount: 2500,
        paymentDate: '2026-08-01',
        paymentMethod: 'Espèces (Cash)',
        cycle: 'Août 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
      {
        id: 'PAY-802',
        amount: 2500,
        paymentDate: '2026-09-01',
        paymentMethod: 'Espèces (Cash)',
        cycle: 'Septembre 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-03', topic: 'Grammar & Conversation', status: 'Présent' },
      { sessionNumber: 2, date: '2026-09-10', topic: 'Reading Comprehension', status: 'Présent' },
      { sessionNumber: 3, date: '2026-09-17', topic: 'Listening & TOEFL Prep', status: 'Présent' },
      { sessionNumber: 4, date: '2026-09-24', topic: 'Final Speaking Workshop', status: 'Présent' },
    ],
  },
  {
    id: 'STU-1002',
    fullName: 'Mohamed Ali Zerrouki',
    parentName: 'Karim Zerrouki',
    phone: '0661 22 33 44',
    email: 'mohamed.ali@gmail.com',
    address: '08 Boulevard Zighoud Youcef, Alger',
    dob: '2007-11-20',
    courseId: 'CLS-MATH-01',
    courseName: 'Mathématiques Approfondies (2S & BAC)',
    teacherId: 'T-101',
    teacherName: 'Prof. Sarah Benali',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
    sessionsCompleted: 2, // 2/4 sessions attended -> Paid
    currentCycle: 'Septembre 2026',
    paymentStatus: 'Paid',
    status: 'Active',
    enrollmentDate: '2026-08-10',
    nextPaymentDate: '28 Septembre 2026',
    paymentHistory: [
      {
        id: 'PAY-803',
        amount: 3000,
        paymentDate: '2026-09-05',
        paymentMethod: 'Espèces (Cash)',
        cycle: 'Septembre 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-06', topic: 'Fonctions et Limites', status: 'Présent' },
      { sessionNumber: 2, date: '2026-09-13', topic: 'Dérivation et Tangentes', status: 'Présent' },
    ],
  },
  {
    id: 'STU-1003',
    fullName: 'Yasmine Mansouri',
    parentName: 'Fatima Mansouri',
    phone: '0669028265', // Example test number provided by user
    email: 'yasmine.m@yahoo.fr',
    address: '22 Rue des Frères Bouadou, Bir Mourad Raïs',
    dob: '2009-03-15',
    courseId: 'CLS-FRN-01',
    courseName: 'Langue Française & Communication',
    teacherId: 'T-102',
    teacherName: 'Prof. David Moreau',
    monthlyPrice: 2200,
    sessionsPerMonth: 4,
    sessionsCompleted: 4, // 4/4 completed -> Payment Required!
    currentCycle: 'Septembre 2026',
    paymentStatus: 'Payment Required',
    status: 'Active',
    enrollmentDate: '2026-08-15',
    nextPaymentDate: "Aujourd'hui",
    paymentHistory: [
      {
        id: 'PAY-804',
        amount: 2200,
        paymentDate: '2026-09-02',
        paymentMethod: 'BaridiMob / CCP',
        cycle: 'Septembre 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-04', topic: 'Expression écrite', status: 'Présent' },
      { sessionNumber: 2, date: '2026-09-11', topic: 'Syntaxe et Grammaire', status: 'Présent' },
      { sessionNumber: 3, date: '2026-09-18', topic: 'Vocabulaire académique', status: 'Présent' },
      { sessionNumber: 4, date: '2026-09-25', topic: 'Débat et Expression orale', status: 'Présent' },
    ],
  },
  {
    id: 'STU-1004',
    fullName: 'Rayane Haddad',
    parentName: 'Brahim Haddad',
    phone: '0550 44 55 66',
    email: 'rayane.haddad@hotmail.com',
    address: '05 Cité El Hayat, Kouba',
    dob: '2008-08-28',
    courseId: 'CLS-SCI-01',
    courseName: 'Sciences Expérimentales & Physique',
    teacherId: 'T-103',
    teacherName: 'Prof. Amira Al-Mansour',
    monthlyPrice: 2800,
    sessionsPerMonth: 4,
    sessionsCompleted: 4,
    currentCycle: 'Août 2026',
    paymentStatus: 'Overdue', // Payment overdue
    status: 'Payment Overdue',
    enrollmentDate: '2026-07-20',
    nextPaymentDate: '15 Septembre 2026 (En retard)',
    paymentHistory: [
      {
        id: 'PAY-805',
        amount: 2800,
        paymentDate: '2026-08-05',
        paymentMethod: 'Espèces (Cash)',
        cycle: 'Août 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-08-08', topic: 'Lois de Newton', status: 'Présent' },
      { sessionNumber: 2, date: '2026-08-15', topic: 'Circuits RC/RL', status: 'Présent' },
      { sessionNumber: 3, date: '2026-08-22', topic: 'Cinétique Chimique', status: 'Présent' },
      { sessionNumber: 4, date: '2026-08-29', topic: 'Dosages Acido-Basiques', status: 'Présent' },
    ],
  },
  {
    id: 'STU-1005',
    fullName: 'Sarah Belkacem',
    parentName: 'Samir Belkacem',
    phone: '0663 77 88 99',
    email: 'sarah.b@gmail.com',
    address: '11 Rue Tripoli, Hussein Dey',
    dob: '2008-01-10',
    courseId: 'CLS-INF-01',
    courseName: 'Informatique & Développement Web',
    teacherId: 'T-104',
    teacherName: 'Prof. Marcus Chen',
    monthlyPrice: 3500,
    sessionsPerMonth: 8, // Configurable: 8 sessions/month
    sessionsCompleted: 3, // 3/8 sessions
    currentCycle: 'Septembre 2026',
    paymentStatus: 'Paid',
    status: 'Active',
    enrollmentDate: '2026-08-25',
    nextPaymentDate: '05 Octobre 2026',
    paymentHistory: [
      {
        id: 'PAY-806',
        amount: 3500,
        paymentDate: '2026-09-01',
        paymentMethod: 'Virement Bancaire',
        cycle: 'Septembre 2026',
        recordedBy: 'Admin',
        status: 'Validé',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-02', topic: 'HTML5 & Sémantique', status: 'Présent' },
      { sessionNumber: 2, date: '2026-09-09', topic: 'CSS3 & Flexbox Layouts', status: 'Présent' },
      { sessionNumber: 3, date: '2026-09-16', topic: 'JavaScript DOM & Events', status: 'Présent' },
    ],
  },
  // Pending Enrollments (Registered online from website -> Pending Physical Verification & 1st Payment)
  {
    id: 'STU-1006',
    fullName: 'Karim Boukhalfa',
    parentName: 'Nacer Boukhalfa',
    phone: '0555 99 00 11',
    email: 'karim.boukhalfa@gmail.com',
    address: 'Cité 1000 Logements, Bab Ezzouar',
    dob: '2009-06-12',
    courseId: 'CLS-MATH-01',
    courseName: 'Mathématiques Approfondies (2S & BAC)',
    teacherId: 'T-101',
    teacherName: 'Prof. Sarah Benali',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
    sessionsCompleted: 0,
    currentCycle: 'Octobre 2026',
    paymentStatus: 'Pending Approval',
    status: 'Pending Approval',
    enrollmentDate: '2026-09-15',
    nextPaymentDate: 'À la confirmation physique',
    paymentHistory: [],
    sessionHistory: [],
  },
  {
    id: 'STU-1007',
    fullName: 'Ines Chaouche',
    parentName: 'Meriem Chaouche',
    phone: '0772 11 22 33',
    email: 'ines.chaouche@gmail.com',
    address: '03 Rue Larbi Ben M\'hidi, Alger',
    dob: '2008-12-04',
    courseId: 'CLS-ENG-01',
    courseName: 'Langue Anglaise (Intensif)',
    teacherId: 'T-102',
    teacherName: 'Prof. David Moreau',
    monthlyPrice: 2500,
    sessionsPerMonth: 4,
    sessionsCompleted: 0,
    currentCycle: 'Octobre 2026',
    paymentStatus: 'Pending Approval',
    status: 'Pending Approval',
    enrollmentDate: '2026-09-16',
    nextPaymentDate: 'À la confirmation physique',
    paymentHistory: [],
    sessionHistory: [],
  },
]

// Listeners for multi-component reactivity
const listeners = new Set()

function notifyListeners(students) {
  listeners.forEach((listener) => {
    try {
      listener(students)
    } catch (err) {
      console.error('Error notifying student listener:', err)
    }
  })
}

export const studentService = {
  /**
   * Subscribe to live state updates
   */
  subscribe(callback) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },

  /**
   * Get all students from storage
   */
  getStudents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STUDENTS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed reading students from storage:', e)
    }
    // Initialize storage with defaults
    this.saveStudents(DEFAULT_STUDENTS)
    return DEFAULT_STUDENTS
  },

  /**
   * Save students to storage & notify subscribers
   */
  saveStudents(students) {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students))
      notifyListeners(students)
    } catch (e) {
      console.error('Failed saving students to storage:', e)
    }
  },

  /**
   * Add Online Enrollment request from public website or admin
   */
  addOnlineEnrollment(data) {
    const students = this.getStudents()
    const randomId = `STU-${Math.floor(1000 + Math.random() * 9000)}`
    
    const newEnrollment = {
      id: randomId,
      fullName: data.studentName || data.fullName,
      parentName: data.parentName || 'Tuteur Légal',
      phone: data.phone || '',
      email: data.email || '',
      address: data.address || 'Alger, Algérie',
      dob: data.dob || '2008-01-01',
      courseId: data.courseId || 'CLS-GEN',
      courseName: data.courseName || data.className || 'Cours Spécialisé',
      teacherId: data.teacherId || 'T-101',
      teacherName: data.teacherName || 'Prof. Sarah Benali',
      monthlyPrice: Number(data.monthlyPrice) || Number(data.price) || 2500,
      sessionsPerMonth: Number(data.sessionsPerMonth) || 4,
      sessionsCompleted: 0,
      currentCycle: data.currentCycle || 'Octobre 2026',
      paymentStatus: 'Pending Approval',
      status: 'Pending Approval', // Starts as Pending Physical Verification
      enrollmentDate: new Date().toISOString().split('T')[0],
      nextPaymentDate: 'À la confirmation physique',
      paymentHistory: [],
      sessionHistory: [],
    }

    const updated = [newEnrollment, ...students]
    this.saveStudents(updated)
    return newEnrollment
  },

  /**
   * Physical School Approval: Confirms registration, records 1st payment, activates student
   */
  approveEnrollment(studentId, {
    paymentAmount,
    paymentMethod = 'Espèces (Cash)',
    sessionsPerMonth = 4,
    cycle = 'Octobre 2026',
    recordedBy = 'Admin',
    notes = '',
  }) {
    const students = this.getStudents()
    const student = students.find((s) => s.id === studentId)
    if (!student) return null

    const paymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: Number(paymentAmount) || student.monthlyPrice,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      cycle,
      recordedBy,
      status: 'Validé',
      notes,
    }

    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          status: 'Active',
          paymentStatus: 'Paid',
          sessionsPerMonth: Number(sessionsPerMonth) || s.sessionsPerMonth || 4,
          sessionsCompleted: 0,
          currentCycle: cycle,
          nextPaymentDate: 'Dans 1 mois (après 4 séances)',
          paymentHistory: [paymentRecord, ...(s.paymentHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, paymentRecord }
  },

  /**
   * Record Monthly Payment for next cycle:
   * Resets sessions completed to 0/N, advances cycle, marks Paid, keeps Active
   */
  recordMonthlyPayment(studentId, {
    amount,
    paymentMethod = 'Espèces (Cash)',
    cycle = 'Nouveau Mois',
    recordedBy = 'Admin',
    notes = '',
  }) {
    const students = this.getStudents()
    const student = students.find((s) => s.id === studentId)
    if (!student) return null

    const paymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: Number(amount) || student.monthlyPrice,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      cycle,
      recordedBy,
      status: 'Validé',
      notes,
    }

    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          paymentStatus: 'Paid',
          status: 'Active',
          sessionsCompleted: 0, // Reset to 0/4 for new cycle!
          currentCycle: cycle,
          nextPaymentDate: 'À la fin du cycle',
          paymentHistory: [paymentRecord, ...(s.paymentHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, paymentRecord }
  },

  /**
   * Automatic Session Engine:
   * Automatically advances sessions based on elapsed schedule or course cadence.
   * When sessions reach sessionsPerMonth (e.g. 4/4), automatically sets Payment Required!
   */
  autoAdvanceClassSessions(courseName, topic = 'Séance de cours programmée') {
    const students = this.getStudents()
    let advancedCount = 0

    const updated = students.map((student) => {
      if (
        student.status === 'Active' &&
        student.paymentStatus === 'Paid' &&
        (!courseName || student.courseName === courseName || courseName === 'all')
      ) {
        if (student.sessionsCompleted < student.sessionsPerMonth) {
          const newCompleted = student.sessionsCompleted + 1
          const isCycleComplete = newCompleted >= student.sessionsPerMonth
          advancedCount++

          const newSessionRecord = {
            sessionNumber: newCompleted,
            date: new Date().toISOString().split('T')[0],
            topic: `${topic} #${newCompleted}`,
            status: 'Présent (Automatique)',
          }

          return {
            ...student,
            sessionsCompleted: newCompleted,
            paymentStatus: isCycleComplete ? 'Payment Required' : 'Paid',
            nextPaymentDate: isCycleComplete ? "Aujourd'hui (Séances terminées)" : student.nextPaymentDate,
            sessionHistory: [newSessionRecord, ...(student.sessionHistory || [])],
          }
        }
      }
      return student
    })

    if (advancedCount > 0) {
      this.saveStudents(updated)
    }
    return advancedCount
  },

  /**
   * Attendance / Session Tracking: Increments student session by +1
   * When sessionsCompleted reaches sessionsPerMonth (e.g. 4/4),
   * automatically triggers paymentStatus = "Payment Required"!
   */
  incrementStudentSession(studentId, topic = 'Séance de cours standard') {
    const students = this.getStudents()
    const student = students.find((s) => s.id === studentId)
    if (!student) return null

    const newCompleted = Math.min(student.sessionsCompleted + 1, student.sessionsPerMonth)
    const isCycleComplete = newCompleted >= student.sessionsPerMonth

    const newSessionRecord = {
      sessionNumber: newCompleted,
      date: new Date().toISOString().split('T')[0],
      topic,
      status: 'Présent',
    }

    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          sessionsCompleted: newCompleted,
          paymentStatus: isCycleComplete ? 'Payment Required' : s.paymentStatus,
          nextPaymentDate: isCycleComplete ? "Aujourd'hui (Cycle terminé)" : s.nextPaymentDate,
          sessionHistory: [newSessionRecord, ...(s.sessionHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, newCompleted, isCycleComplete }
  },

  /**
   * Update student status (Active, Suspended, Payment Overdue, Cancelled)
   */
  updateStudentStatus(studentId, newStatus) {
    const students = this.getStudents()
    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          status: newStatus,
          paymentStatus: newStatus === 'Payment Overdue' ? 'Overdue' : s.paymentStatus,
        }
      }
      return s
    })
    this.saveStudents(updated)
  },

  /**
   * Delete student
   */
  deleteStudent(studentId) {
    const students = this.getStudents()
    const updated = students.filter((s) => s.id !== studentId)
    this.saveStudents(updated)
  },

  /**
   * Reset data to defaults (for testing/demo)
   */
  resetToDefaults() {
    this.saveStudents(DEFAULT_STUDENTS)
    this.saveAnnouncements(DEFAULT_ANNOUNCEMENTS)
    return { students: DEFAULT_STUDENTS, announcements: DEFAULT_ANNOUNCEMENTS }
  },

  /**
   * ==========================================
   * ANNOUNCEMENTS MANAGEMENT METHODS
   * ==========================================
   */
  getAnnouncements() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed reading announcements from storage:', e)
    }
    this.saveAnnouncements(DEFAULT_ANNOUNCEMENTS)
    return DEFAULT_ANNOUNCEMENTS
  },

  saveAnnouncements(announcements) {
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcements))
      notifyListeners(this.getStudents())
    } catch (e) {
      console.error('Failed saving announcements:', e)
    }
  },

  addAnnouncement({
    title,
    content,
    category = 'Général',
    targetAudience = 'Tous les élèves',
    isPinned = false,
    author = 'Direction de l\'école',
  }) {
    const announcements = this.getAnnouncements()
    const newAnn = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      content: content.trim(),
      category,
      targetAudience,
      date: new Date().toISOString().split('T')[0],
      author,
      isPinned: Boolean(isPinned),
      views: 1,
    }
    const updated = [newAnn, ...announcements]
    this.saveAnnouncements(updated)
    return newAnn
  },

  togglePinAnnouncement(id) {
    const announcements = this.getAnnouncements()
    const updated = announcements.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    this.saveAnnouncements(updated)
    return updated
  },

  /**
   * ==========================================
   * WHATSAPP AUTOMATION METHODS
   * ==========================================
   */
  formatWhatsAppNumber(phone) {
    if (!phone) return ''
    let cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
    if (cleaned.startsWith('+213')) {
      cleaned = cleaned.substring(1)
    } else if (cleaned.startsWith('00213')) {
      cleaned = cleaned.substring(2)
    } else if (
      cleaned.startsWith('0') &&
      (cleaned.startsWith('05') || cleaned.startsWith('06') || cleaned.startsWith('07'))
    ) {
      cleaned = '213' + cleaned.substring(1)
    } else if (!cleaned.startsWith('213')) {
      cleaned = '213' + cleaned
    }
    return cleaned
  },

  generateWhatsAppReminderText({
    studentName,
    parentName,
    courseName,
    teacherName,
    monthlyPrice,
    sessionsCompleted = 4,
    sessionsPerMonth = 4,
    adminPhone = '0667158842',
  }) {
    return `Salam / Bonjour ${parentName ? 'Mr/Mme ' + parentName : 'cher parent'},

L'école *Nawafid Éducation* vous informe que l'élève *${studentName}* a complété la totalité des *${sessionsCompleted}/${sessionsPerMonth} séances* de son cycle mensuel pour le cours de *${courseName}* (${teacherName}).

📌 *Montant à régler :* ${monthlyPrice} DA
📅 *Cycle :* Nouveau mois à renouveler
⚠️ *Statut :* Paiement requis pour confirmer la place au prochain cours.

Vous pouvez régler en espèces au secrétariat de l'école ou par BaridiMob.

📞 *Contact Administration :* ${adminPhone}
📍 *Nawafid Éducation*`
  },

  openWhatsAppPaymentReminder(student, adminPhone = '0667158842') {
    if (!student) return null
    const formattedPhone = this.formatWhatsAppNumber(student.phone)
    const text = this.generateWhatsAppReminderText({
      studentName: student.fullName,
      parentName: student.parentName,
      courseName: student.courseName,
      teacherName: student.teacherName,
      monthlyPrice: student.monthlyPrice,
      sessionsCompleted: student.sessionsCompleted || 4,
      sessionsPerMonth: student.sessionsPerMonth || 4,
      adminPhone,
    })

    // Frontend demo & simulation mode (no external window.open popup)
    return { formattedPhone, text, simulated: true }
  },
}

