import studentImg from '../../assets/image.png'
import childImg from '../../assets/child.png'
import teacherAmira from '../../assets/teacher-amira.jpg'
import teacherSarah from '../../assets/teacher-sarah.jpg'
import teacherDavid from '../../assets/teacher-david.jpg'
import teacherElena from '../../assets/teacher-elena.jpg'
import teacherMarcus from '../../assets/teacher-marcus.jpg'

// Class images
import classMathImg from '../../assets/class-math.jpg'
import classEnglishImg from '../../assets/class-english.jpg'
import classArabicImg from '../../assets/class-arabic.jpg'
import classPhysicsImg from '../../assets/class-physics.jpg'
import classComputerImg from '../../assets/class-computer.jpg'

export const heroData = {
  eyebrow: 'Trusted by families & professionals',
  title: 'Empowering Every Learner\nto Reach Their ',
  titleAccent: 'Full Potential',
  description: 'Quality education, academic support, language learning, and practical training for learners of every age — children, students, and adults.',
  primaryCta: {
    label: 'Explore Our Programs',
    link: '/Classes',
  },
  secondaryCta: {
    label: 'Contact Us',
    link: '/Contact',
  },
  studentImage: studentImg,
  studentImageAlt: 'A student at Académie Al-Khwarizmi',
  badges: [
    { id: 'b1', icon: '🎓', text: 'Academic Support', position: 'top' },
    { id: 'b2', icon: '📜', text: 'Certified Training', position: 'bottom' },
  ],
}

export const growthHeaderData = {
  eyebrowIcon: '🎓',
  eyebrowText: 'All School Levels',
  titlePrefix: 'Everything ',
  titleHighlight: 'Your Child',
  titleSuffix: ' Needs to Grow',
  subtitle: 'From school lessons to practical skills, we provide a complete learning journey that builds knowledge, confidence and real opportunities.',
}

export const programsData = [
  {
    id: 'program-academic',
    type: 'academic',
    title: 'Academic Support',
    badge: 'ALL LEVELS',
    badgeClass: 'badge-gold',
    cardClass: 'growth-card--academic',
    actionClass: 'action-gold',
    actionType: 'arrow',
    link: '/Classes',
    ariaLabel: 'Explore Academic Support',
    description: 'Students who struggle in class go from failing grades to passing — in the same term. We work on the exact subjects your child needs, not a generic programme.',
    bulletClass: 'bullet-gold',
    features: [
      'Targeted subject help',
      'Better grades in one term',
      'Build lasting confidence',
    ],
  },
  {
    id: 'program-language',
    type: 'language',
    title: 'Language Courses',
    badge: '3 LANGUAGES',
    badgeClass: 'badge-purple',
    cardClass: 'growth-card--language',
    actionClass: 'action-purple',
    actionType: 'number',
    actionValue: '3',
    link: '/Classes',
    ariaLabel: 'Explore Language Courses',
    description: 'Arabic, French, or English — spoken confidently after one semester. Structured for children, teens, and adult beginners.',
    bulletClass: 'bullet-purple',
    features: [
      'Kids, Teens & Adults',
      'Interactive conversation',
      'Real communication & fluency',
    ],
  },
  {
    id: 'program-training',
    type: 'training',
    title: 'Practical Training',
    badge: 'CERTIFICATE',
    badgeClass: 'badge-teal',
    cardClass: 'growth-card--training',
    actionClass: 'action-teal',
    actionType: 'award',
    link: '/Classes',
    ariaLabel: 'Explore Practical Training',
    description: 'Computer skills, sewing, and applied trades. Each course ends with a recognised certificate you can present to an employer.',
    bulletClass: 'bullet-teal',
    features: [
      'Hands-on practical projects',
      'Job-ready applied skills',
      'Professional certificate included',
    ],
  },
]

export const growthVisualData = {
  childImage: childImg,
  childImageAlt: 'Student studying with books and laptop at Académie Al-Khwarizmi',
}

export const statsData = [
  {
    id: 'stat-students',
    number: '1,200+',
    label: 'Students Supported',
    iconType: 'graduation',
    iconClass: 'stat-icon--blue',
  },
  {
    id: 'stat-satisfaction',
    number: '98%',
    label: 'Satisfaction & Passing',
    iconType: 'star',
    iconClass: 'stat-icon--gold',
  },
  {
    id: 'stat-teachers',
    number: '50+',
    label: 'Expert Teachers',
    iconType: 'users',
    iconClass: 'stat-icon--navy',
  },
  {
    id: 'stat-quality',
    number: 'Certified',
    label: 'Quality Programs',
    iconType: 'check-circle',
    iconClass: 'stat-icon--teal',
  },
]

export const classesHeaderData = {
  badgeIcon: 'graduation',
  title: 'Our Classes',
  subtitle: 'Discover our high-quality classes taught by experienced teachers',
  ctaText: 'See more classes',
  ctaLink: '/Classes',
}

export const classesData = [
  {
    id: 'class-math',
    title: 'Mathématiques',
    level: '2ème Année Secondaire (2S)',
    description: 'Cours complet pour le niveau lycée',
    teacher: 'Prof. Beanli',
    hours: '36 heures',
    category: 'Mathématiques',
    categoryTheme: 'blue',
    iconType: 'math',
    image: classMathImg,
    ribbonColor: '#3B82F6',
  },
  {
    id: 'class-english',
    title: 'Anglais',
    level: '2ème Année Secondaire (2S)',
    description: 'Cours complet pour le niveau lycée',
    teacher: 'Prof. Mr. Haddad',
    hours: '30 heures',
    category: 'Langue',
    categoryTheme: 'green',
    iconType: 'english',
    image: classEnglishImg,
    ribbonColor: '#10B981',
  },
  {
    id: 'class-arabic',
    title: 'Arabe',
    level: '2ème Année Secondaire (2S)',
    description: 'Cours complet pour le niveau lycée',
    teacher: 'Prof. Mme. Belkacem',
    hours: '32 heures',
    category: 'Langue',
    categoryTheme: 'rose',
    iconType: 'arabic',
    image: classArabicImg,
    ribbonColor: '#F43F5E',
  },
  {
    id: 'class-physics',
    title: 'Physique',
    level: '2ème Année Secondaire (2S)',
    description: 'Cours complet pour le niveau lycée',
    teacher: 'Prof. Mr. Kara',
    hours: '34 heures',
    category: 'Sciences',
    categoryTheme: 'purple',
    iconType: 'physics',
    image: classPhysicsImg,
    ribbonColor: '#8B5CF6',
  },
  {
    id: 'class-computer',
    title: 'Informatique',
    level: '2ème Année Secondaire (2S)',
    description: 'Cours complet pour le niveau lycée',
    teacher: 'Prof. Mr. Ouadah',
    hours: '40 heures',
    category: 'Technologie',
    categoryTheme: 'amber',
    iconType: 'computer',
    image: classComputerImg,
    ribbonColor: '#F59E0B',
  },
]

export const teachersData = [
  { id: 't1', name: 'Sarah Benali', image: teacherSarah },
  { id: 't2', name: 'David Moreau', image: teacherDavid },
  { id: 't3', name: 'Elena Rostova', image: teacherElena },
  { id: 't4', name: 'Marcus Chen', image: teacherMarcus },
  { id: 't5', name: 'Amira Al-Mansour', image: teacherAmira },
]
