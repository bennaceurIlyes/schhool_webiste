/**
 * ============================================================
 * خدمة إدارة الطلاب، التسجيلات، والمدفوعات وإعلانات الفصول
 * تتيح للإدارة إنشاء إعلانات للأفواج والدروس لتظهر في الموقع
 * (الرئيسية وصفحة الفصول) للتسجيل المباشر للطلاب.
 * ============================================================
 */

const STORAGE_KEY_STUDENTS = 'ecole_students_data_v5'
const STORAGE_KEY_NOTIFICATIONS = 'ecole_notifications_data_v5'
const STORAGE_KEY_ANNOUNCEMENTS = 'ecole_class_ads_data_v5'

// إعلانات الأفواج والفصول الدراسية الافتراضية
const DEFAULT_CLASS_ADS = [
  {
    id: 'CAD-101',
    title: 'فوج الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
    content: 'افتتاح فوج جديد لمادة الرياضيات مع الأستاذ أحمد بن علي. حل تمارين نموذجية، منهجية التعامل مع أسئلة البكالوريا، ومتابعة فردية دقيقة.',
    category: 'الرياضيات',
    targetAudience: 'السنة الثانية ثانوي ومترشحو البكالوريا',
    courseName: 'الرياضيات المتقدمة',
    teacherName: 'الأستاذ أحمد بن علي',
    schedule: 'السبت والثلاثاء : 14:00 - 16:00',
    groupName: 'فوج نهاية الأسبوع (المجموعة أ)',
    room: 'القاعة ب2 - جناح العلوم',
    price: '4,500 دج / شهر',
    spotsLeft: 6,
    isPinned: true,
    date: '2026-09-16',
    author: 'إدارة المدرسة',
    views: 280,
  },
  {
    id: 'CAD-102',
    title: 'فوج المحادثة والإنجليزية المكثفة',
    content: 'دورة تفاعلية في اللغة الإنجليزية تركز على الطلاقة الشفهية، القواعد الأساسية، والتحضير للامتحانات والشهادات الدولية مع الأستاذ داود.',
    category: 'اللغات',
    targetAudience: 'المستوى الثانوي واليافعين',
    courseName: 'اللغة الإنجليزية (مكثف)',
    teacherName: 'الأستاذ داود مورو',
    schedule: 'الأحد والأربعاء : 16:00 - 18:00',
    groupName: 'فوج الفترة المسائية',
    room: 'القاعة ل1 - جناح اللغات',
    price: '4,000 دج / شهر',
    spotsLeft: 4,
    isPinned: true,
    date: '2026-09-14',
    author: 'إدارة المدرسة',
    views: 195,
  },
  {
    id: 'CAD-103',
    title: 'فوج العلوم الفيزيائية والتجارب المخبرية',
    content: 'دروس دعم معمقة في الفيزياء والكيمياء مع الأستاذة أميرة المنصور تشمل حل المسائل المعقدة وتجارب تطبيقية داخل المخبر.',
    category: 'العلوم',
    targetAudience: 'شعب العلوم التجريبية والرياضيات',
    courseName: 'العلوم الفيزيائية',
    teacherName: 'الأستاذة أميرة المنصور',
    schedule: 'السبت : 09:00 - 12:00',
    groupName: 'فوج صباح السبت',
    room: 'المخبر رقم 01',
    price: '4,500 دج / شهر',
    spotsLeft: 5,
    isPinned: true,
    date: '2026-09-12',
    author: 'إدارة المدرسة',
    views: 160,
  },
  {
    id: 'CAD-104',
    title: 'فوج البرمجة وتطوير الويب الحديث',
    content: 'ورشة تطبيقية عملية 100% لتعلم تصميم المواقع، لغات HTML/CSS/JS وبناء أول موقع إلكتروني احترافي تحت إشراف الأستاذ ماركوس.',
    category: 'التكنولوجيا',
    targetAudience: 'الطور الثانوي والمهتمون بالتكنولوجيا',
    courseName: 'الإعلام الآلي وتطوير الويب',
    teacherName: 'الأستاذ ماركوس تشن',
    schedule: 'الجمعة : 09:00 - 12:00',
    groupName: 'فوج يوم الجمعة',
    room: 'مخبر الإعلام الآلي 1',
    price: '5,000 دج / شهر',
    spotsLeft: 3,
    isPinned: false,
    date: '2026-09-10',
    author: 'إدارة المدرسة',
    views: 140,
  },
]

// بيانات الطلاب الافتراضية
const DEFAULT_STUDENTS = [
  {
    id: 'STU-1001',
    fullName: 'أحمد بن علي',
    parentName: 'محمد بن علي',
    phone: '0555 12 34 56',
    email: 'ahmed.benali@gmail.com',
    address: '14 شارع ديدوش مراد، الجزائر الوسطى',
    dob: '2008-05-14',
    courseId: 'CLS-ENG-01',
    courseName: 'اللغة الإنجليزية (مكثف)',
    teacherId: 'T-102',
    teacherName: 'أ. داود مورو',
    monthlyPrice: 2500,
    sessionsPerMonth: 4,
    sessionsCompleted: 4,
    currentCycle: 'سبتمبر 2026',
    paymentStatus: 'Payment Required',
    status: 'Active',
    enrollmentDate: '2026-08-01',
    nextPaymentDate: 'اليوم (الحصص مكتملة)',
    paymentHistory: [
      {
        id: 'PAY-801',
        amount: 2500,
        paymentDate: '2026-08-01',
        paymentMethod: 'نقداً (في الإدارة)',
        cycle: 'أوت 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
      {
        id: 'PAY-802',
        amount: 2500,
        paymentDate: '2026-09-01',
        paymentMethod: 'نقداً (في الإدارة)',
        cycle: 'سبتمبر 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-03', topic: 'قواعد ومحادثة تفاعلية', status: 'حاضر' },
      { sessionNumber: 2, date: '2026-09-10', topic: 'فهم وتحليل النصوص', status: 'حاضر' },
      { sessionNumber: 3, date: '2026-09-17', topic: 'الاستماع والتحضير للامتحانات', status: 'حاضر' },
      { sessionNumber: 4, date: '2026-09-24', topic: 'ورشة التعبير الشفهي الختامية', status: 'حاضر' },
    ],
  },
  {
    id: 'STU-1002',
    fullName: 'محمد علي زروقي',
    parentName: 'كريم زروقي',
    phone: '0661 22 33 44',
    email: 'mohamed.ali@gmail.com',
    address: '08 نهج زيغود يوسف، الجزائر',
    dob: '2007-11-20',
    courseId: 'CLS-MATH-01',
    courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
    teacherId: 'T-101',
    teacherName: 'أ. أحمد بن علي',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
    sessionsCompleted: 2,
    currentCycle: 'سبتمبر 2026',
    paymentStatus: 'Paid',
    status: 'Active',
    enrollmentDate: '2026-08-10',
    nextPaymentDate: '28 سبتمبر 2026',
    paymentHistory: [
      {
        id: 'PAY-803',
        amount: 3000,
        paymentDate: '2026-09-05',
        paymentMethod: 'نقداً (في الإدارة)',
        cycle: 'سبتمبر 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-06', topic: 'الدوال والنهايات وتطبيقاتها', status: 'حاضر' },
      { sessionNumber: 2, date: '2026-09-13', topic: 'الاشتقاق والمماسات', status: 'حاضر' },
    ],
  },
  {
    id: 'STU-1003',
    fullName: 'ياسمين منصوري',
    parentName: 'فاطمة منصوري',
    phone: '0669028265',
    email: 'yasmine.m@yahoo.fr',
    address: '22 شارع الإخوة بوعدو، بئر مراد رايس',
    dob: '2009-03-15',
    courseId: 'CLS-FRN-01',
    courseName: 'اللغة الفرنسية والتواصل',
    teacherId: 'T-102',
    teacherName: 'أ. داود مورو',
    monthlyPrice: 2200,
    sessionsPerMonth: 4,
    sessionsCompleted: 4,
    currentCycle: 'سبتمبر 2026',
    paymentStatus: 'Payment Required',
    status: 'Active',
    enrollmentDate: '2026-08-15',
    nextPaymentDate: 'اليوم (الحصص مكتملة)',
    paymentHistory: [
      {
        id: 'PAY-804',
        amount: 2200,
        paymentDate: '2026-09-02',
        paymentMethod: 'بريدي موب / CCP',
        cycle: 'سبتمبر 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-04', topic: 'التعبير والتحرير الكتابي', status: 'حاضر' },
      { sessionNumber: 2, date: '2026-09-11', topic: 'قواعد اللغة والتركيب النحوي', status: 'حاضر' },
      { sessionNumber: 3, date: '2026-09-18', topic: 'المصطلحات الأكاديمية والإنشاء', status: 'حاضر' },
      { sessionNumber: 4, date: '2026-09-25', topic: 'المناقشة والتعبير الشفهي المباشر', status: 'حاضر' },
    ],
  },
  {
    id: 'STU-1004',
    fullName: 'ريان حداد',
    parentName: 'إبراهيم حداد',
    phone: '0550 44 55 66',
    email: 'rayane.haddad@hotmail.com',
    address: '05 حي الحياة، القبة',
    dob: '2008-08-28',
    courseId: 'CLS-SCI-01',
    courseName: 'العلوم التجريبية والفيزياء',
    teacherId: 'T-103',
    teacherName: 'أ. أميرة المنصور',
    monthlyPrice: 2800,
    sessionsPerMonth: 4,
    sessionsCompleted: 4,
    currentCycle: 'أوت 2026',
    paymentStatus: 'Overdue',
    status: 'Payment Overdue',
    enrollmentDate: '2026-07-20',
    nextPaymentDate: '15 سبتمبر 2026 (متأخر)',
    paymentHistory: [
      {
        id: 'PAY-805',
        amount: 2800,
        paymentDate: '2026-08-05',
        paymentMethod: 'نقداً (في الإدارة)',
        cycle: 'أوت 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-08-08', topic: 'قوانين نيوتن وحركة الأجسام', status: 'حاضر' },
      { sessionNumber: 2, date: '2026-08-15', topic: 'الدارات الكهربائية RC و RL', status: 'حاضر' },
      { sessionNumber: 3, date: '2026-08-22', topic: 'الحركية الكيميائية وسرعة التفاعل', status: 'حاضر' },
      { sessionNumber: 4, date: '2026-08-29', topic: 'المعايرة اللونية حمض - أساس', status: 'حاضر' },
    ],
  },
  {
    id: 'STU-1005',
    fullName: 'سارة بلقاسم',
    parentName: 'سمير بلقاسم',
    phone: '0663 77 88 99',
    email: 'sarah.b@gmail.com',
    address: '11 شارع طرابلس، حسين داي',
    dob: '2008-01-10',
    courseId: 'CLS-INF-01',
    courseName: 'الإعلام الآلي وتطوير الويب',
    teacherId: 'T-104',
    teacherName: 'أ. ماركوس تشن',
    monthlyPrice: 3500,
    sessionsPerMonth: 8,
    sessionsCompleted: 3,
    currentCycle: 'سبتمبر 2026',
    paymentStatus: 'Paid',
    status: 'Active',
    enrollmentDate: '2026-08-25',
    nextPaymentDate: '05 أكتوبر 2026',
    paymentHistory: [
      {
        id: 'PAY-806',
        amount: 3500,
        paymentDate: '2026-09-01',
        paymentMethod: 'تحويل بنكي',
        cycle: 'سبتمبر 2026',
        recordedBy: 'المدير',
        status: 'مؤكد',
      },
    ],
    sessionHistory: [
      { sessionNumber: 1, date: '2026-09-02', topic: 'أساسيات HTML5 والبنية الدلالية', status: 'حاضر' },
      { sessionNumber: 2, date: '2026-09-09', topic: 'تنسيق الصفحات CSS3 و Flexbox', status: 'حاضر' },
      { sessionNumber: 3, date: '2026-09-16', topic: 'برمجة التفاعل بلغة JavaScript', status: 'حاضر' },
    ],
  },
  {
    id: 'STU-1006',
    fullName: 'كريم بوخالفة',
    parentName: 'ناصر بوخالفة',
    phone: '0555 99 00 11',
    email: 'karim.boukhalfa@gmail.com',
    address: 'حي 1000 مسكن، باب الزوار',
    dob: '2009-06-12',
    courseId: 'CLS-MATH-01',
    courseName: 'الرياضيات المتقدمة (2 ثانوي وبكالوريا)',
    teacherId: 'T-101',
    teacherName: 'أ. أحمد بن علي',
    monthlyPrice: 3000,
    sessionsPerMonth: 4,
    sessionsCompleted: 0,
    currentCycle: 'أكتوبر 2026',
    paymentStatus: 'Pending Approval',
    status: 'Pending Approval',
    enrollmentDate: '2026-09-15',
    nextPaymentDate: 'عند التأكيد الفعلي بالمدرسة',
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
   * الاشتراك في التحديثات اللحظية
   */
  subscribe(callback) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },

  /**
   * جلب جميع الطلاب من التخزين المحلي
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
    this.saveStudents(DEFAULT_STUDENTS)
    return DEFAULT_STUDENTS
  },

  /**
   * حفظ قائمة الطلاب وإخطار المكونات
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
   * إضافة تسجيل جديد عبر الموقع أو لوحة الإدارة
   */
  addOnlineEnrollment(data) {
    const students = this.getStudents()
    const randomId = `STU-${Math.floor(1000 + Math.random() * 9000)}`
    
    const newEnrollment = {
      id: randomId,
      fullName: data.studentName || data.fullName,
      parentName: data.parentName || 'الولي / الوصي',
      phone: data.phone || '',
      email: data.email || '',
      address: data.address || 'الجزائر، الجزائر',
      dob: data.dob || '2008-01-01',
      courseId: data.courseId || 'CLS-GEN',
      courseName: data.courseName || data.className || 'دورة متخصصة',
      teacherId: data.teacherId || 'T-101',
      teacherName: data.teacherName || 'أ. أحمد بن علي',
      monthlyPrice: Number(data.monthlyPrice) || Number(data.price) || 3000,
      sessionsPerMonth: Number(data.sessionsPerMonth) || 4,
      sessionsCompleted: 0,
      currentCycle: data.currentCycle || 'أكتوبر 2026',
      paymentStatus: 'Pending Approval',
      status: 'Pending Approval',
      enrollmentDate: new Date().toISOString().split('T')[0],
      nextPaymentDate: 'عند التأكيد الفعلي بالمدرسة',
      paymentHistory: [],
      sessionHistory: [],
    }

    const updated = [newEnrollment, ...students]
    this.saveStudents(updated)
    return newEnrollment
  },

  /**
   * التأكيد الفعلي في مقر المدرسة وتسجيل أول دفعة
   */
  approveEnrollment(studentId, {
    paymentAmount,
    paymentMethod = 'نقداً (في الإدارة)',
    sessionsPerMonth = 4,
    cycle = 'أكتوبر 2026',
    recordedBy = 'المدير',
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
      status: 'مؤكد',
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
          nextPaymentDate: 'خلال شهر (بعد 4 حصص)',
          paymentHistory: [paymentRecord, ...(s.paymentHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, paymentRecord }
  },

  /**
   * تسجيل الدفعة الشهرية للدورة الجديدة
   */
  recordMonthlyPayment(studentId, {
    amount,
    paymentMethod = 'نقداً (في الإدارة)',
    cycle = 'شهر جديد',
    recordedBy = 'المدير',
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
      status: 'مؤكد',
      notes,
    }

    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          paymentStatus: 'Paid',
          status: 'Active',
          sessionsCompleted: 0,
          currentCycle: cycle,
          nextPaymentDate: 'عند نهاية الدورة',
          paymentHistory: [paymentRecord, ...(s.paymentHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, paymentRecord }
  },

  /**
   * تسجيل حضور حصة تلقائياً لكامل الفوج
   */
  autoAdvanceClassSessions(courseName, topic = 'حصة دراسية مجدولة') {
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
            topic: `${topic} رقم ${newCompleted}`,
            status: 'حاضر (تلقائي)',
          }

          return {
            ...student,
            sessionsCompleted: newCompleted,
            paymentStatus: isCycleComplete ? 'Payment Required' : 'Paid',
            nextPaymentDate: isCycleComplete ? 'اليوم (اكتملت الحصص)' : student.nextPaymentDate,
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
   * زيادة حصة حضور واحدة لطالب محدد
   */
  incrementStudentSession(studentId, topic = 'حصة دراسية نظامية') {
    const students = this.getStudents()
    const student = students.find((s) => s.id === studentId)
    if (!student) return null

    const newCompleted = Math.min(student.sessionsCompleted + 1, student.sessionsPerMonth)
    const isCycleComplete = newCompleted >= student.sessionsPerMonth

    const newSessionRecord = {
      sessionNumber: newCompleted,
      date: new Date().toISOString().split('T')[0],
      topic,
      status: 'حاضر',
    }

    const updated = students.map((s) => {
      if (s.id === studentId) {
        return {
          ...s,
          sessionsCompleted: newCompleted,
          paymentStatus: isCycleComplete ? 'Payment Required' : s.paymentStatus,
          nextPaymentDate: isCycleComplete ? 'اليوم (اكتملت الدورة)' : s.nextPaymentDate,
          sessionHistory: [newSessionRecord, ...(s.sessionHistory || [])],
        }
      }
      return s
    })

    this.saveStudents(updated)
    return { studentId, newCompleted, isCycleComplete }
  },

  /**
   * تحديث حالة الطالب
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
   * حذف ملف طالب
   */
  deleteStudent(studentId) {
    const students = this.getStudents()
    const updated = students.filter((s) => s.id !== studentId)
    this.saveStudents(updated)
  },

  /**
   * إعادة ضبط البيانات الافتراضية
   */
  resetToDefaults() {
    this.saveStudents(DEFAULT_STUDENTS)
    this.saveAnnouncements(DEFAULT_CLASS_ADS)
    return { students: DEFAULT_STUDENTS, announcements: DEFAULT_CLASS_ADS }
  },

  /**
   * جلب إعلانات الفصول
   */
  getAnnouncements() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed reading class ads from storage:', e)
    }
    this.saveAnnouncements(DEFAULT_CLASS_ADS)
    return DEFAULT_CLASS_ADS
  },

  saveAnnouncements(announcements) {
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcements))
      notifyListeners(this.getStudents())
    } catch (e) {
      console.error('Failed saving class ads:', e)
    }
  },

  /**
   * إنشاء إعلان فصل / فوج جديد
   */
  addAnnouncement({
    title,
    content,
    category = 'الرياضيات',
    targetAudience = 'جميع المستويات',
    courseName = 'الرياضيات المتقدمة',
    teacherName = 'الأستاذ أحمد بن علي',
    schedule = 'السبت والثلاثاء : 14:00 - 16:00',
    groupName = 'فوج نهاية الأسبوع',
    room = 'القاعة الرئيسية',
    price = '4,500 دج / شهر',
    spotsLeft = 8,
    isPinned = true,
    author = 'إدارة المدرسة',
  }) {
    const announcements = this.getAnnouncements()
    const newClassAd = {
      id: `CAD-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim() || `فوج ${courseName} مع ${teacherName}`,
      content: content.trim(),
      category,
      targetAudience,
      courseName,
      teacherName,
      schedule,
      groupName,
      room,
      price,
      spotsLeft: spotsLeft ? Number(spotsLeft) : 8,
      isPinned: Boolean(isPinned),
      date: new Date().toISOString().split('T')[0],
      author,
      views: 1,
    }
    const updated = [newClassAd, ...announcements]
    this.saveAnnouncements(updated)
    return newClassAd
  },

  togglePinAnnouncement(id) {
    const announcements = this.getAnnouncements()
    const updated = announcements.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    this.saveAnnouncements(updated)
    return updated
  },

  deleteAnnouncement(id) {
    const announcements = this.getAnnouncements()
    const updated = announcements.filter((a) => a.id !== id)
    this.saveAnnouncements(updated)
    return updated
  },

  /**
   * تنسيق رقم الواتساب الجزائري
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
    return `السلام عليكم ورحمة الله وبركاته ${parentName ? 'السيد/ة ' + parentName : 'ولي أمر التلميذ المحترم'}،

تتشرف إدارة *المدرسة* بإعلامكم أن التلميذ(ة) *${studentName}* قد أتم(ت) بنجاح كامل الحصص الشهرية (*${sessionsCompleted}/${sessionsPerMonth} حصص*) لمادة *${courseName}* تحت إشراف ${teacherName}.

📌 *المبلغ المستحق للتجديد :* ${monthlyPrice} دج
📅 *الدورة :* شهر جديد
⚠️ *ملاحظة :* يرجى تسديد الاشتراك لتثبيت المقعد والحضور في الحصة القادمة.

يمكنكم الدفع نقداً على مستوى أمانة المدرسة أو عبر تطبيق بريدي موب BaridiMob.

📞 *هاتف الإدارة والاستفسار :* ${adminPhone}
📍 *المدرسة - فضاء التميز التعليمي*`
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

    return { formattedPhone, text, simulated: true }
  },
}
