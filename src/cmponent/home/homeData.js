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
  eyebrow: 'موضع ثقة العائلات والمهنيين',
  title: 'تمكين كل متعلّم\nلتحقيق ',
  titleAccent: 'أقصى إمكاناته',
  description: 'تعليم عالي الجودة، دروس دعم وتقوية مدرسية، دورات لغات حية، وتكوين مهني تطبيقي لجميع الفئات والأعمار — أطفال، متمدرسون، وكبار.',
  primaryCta: {
    label: 'استكشف برامجنا',
    link: '/Classes',
  },
  secondaryCta: {
    label: 'اتصل بنا',
    link: '/Contact',
  },
  studentImage: studentImg,
  studentImageAlt: 'طالب في المدرسة',
  badges: [
    { id: 'b1', icon: '🎓', text: 'دعم مدرسي مخصص', position: 'top' },
    { id: 'b2', icon: '📜', text: 'تكوين وشهادات معتمدة', position: 'bottom' },
  ],
}

export const growthHeaderData = {
  eyebrowIcon: '🎓',
  eyebrowText: 'جميع الأطوار والمستويات التعليمية',
  titlePrefix: 'كل ما يحتاجه ',
  titleHighlight: 'ابنك أو ابنتك',
  titleSuffix: ' للتميز والارتقاء',
  subtitle: 'من الدروس المدرسية إلى المهارات التطبيقية، نقدم مساراً تعليمياً متكاملاً يبني المعرفة، يعزز الثقة، ويفتح آفاق النجاح الحقيقي.',
}

export const programsData = [
  {
    id: 'program-academic',
    type: 'academic',
    title: 'الدعم والمرافقة المدرسية',
    badge: 'جميع المستويات',
    badgeClass: 'badge-gold',
    cardClass: 'growth-card--academic',
    actionClass: 'action-gold',
    actionType: 'arrow',
    link: '/Classes',
    ariaLabel: 'استكشف الدعم المدرسي',
    description: 'نساعد التلاميذ على تجاوز التعثر الدراسي والارتقاء إلى الامتياز والتفوق — خلال نفس الفصل الدراسي. نركز بدقة على المواد ونقاط الضعف الفردية.',
    bulletClass: 'bullet-gold',
    features: [
      'مرافقة فردية وتحديد دقيق لنقاط الضعف',
      'تحسن ملموس في العلامات خلال فصل واحد',
      'بناء ثقة راسخة ومنهجية تعلم مستدامة',
    ],
  },
  {
    id: 'program-language',
    type: 'language',
    title: 'دورات اللغات الحية',
    badge: '3 لغات',
    badgeClass: 'badge-purple',
    cardClass: 'growth-card--language',
    actionClass: 'action-purple',
    actionType: 'number',
    actionValue: '3',
    link: '/Classes',
    ariaLabel: 'استكشف دورات اللغات',
    description: 'الإنجليزية، الفرنسية، أو العربية — التحدث بطلاقة وثقة بعد فصل واحد. برامج تفاعلية ومحفزة للأطفال، اليافعين، والمبتدئين من الكبار.',
    bulletClass: 'bullet-purple',
    features: [
      'برامج للأطفال، المراهقين والكبار',
      'محادثات تفاعلية واكتساب النطق السليم',
      'تواصل حقيقي واكتساب الطلاقة بسرعة',
    ],
  },
  {
    id: 'program-training',
    type: 'training',
    title: 'التكوين المهني والتطبيقي',
    badge: 'شهادة معتمدة',
    badgeClass: 'badge-teal',
    cardClass: 'growth-card--training',
    actionClass: 'action-teal',
    actionType: 'award',
    link: '/Classes',
    ariaLabel: 'استكشف التكوين المهني',
    description: 'مهارات الإعلام الآلي، البرمجة، الخياطة والتصميم، والحرف التطبيقية. تتوّج كل دورة بشهادة تأهيلية معترف بها لسوق العمل.',
    bulletClass: 'bullet-teal',
    features: [
      'مشاريع وتطبيقات عملية 100%',
      'مهارات حقيقية موجهة لسوق العمل',
      'شهادة تكوينية معتمدة وموثقة',
    ],
  },
]

export const growthVisualData = {
  childImage: childImg,
  childImageAlt: 'طالب يدرس باجتهاد وتركيز في المدرسة',
}

export const statsData = [
  {
    id: 'stat-students',
    number: '+1,200',
    label: 'تلميذ وطالب مرافَق',
    iconType: 'graduation',
    iconClass: 'stat-icon--blue',
  },
  {
    id: 'stat-satisfaction',
    number: '98%',
    label: 'نسبة النجاح والرضا',
    iconType: 'star',
    iconClass: 'stat-icon--gold',
  },
  {
    id: 'stat-teachers',
    number: '+50',
    label: 'أستاذ ومؤطر كفء',
    iconType: 'users',
    iconClass: 'stat-icon--navy',
  },
  {
    id: 'stat-quality',
    number: 'معتمد',
    label: 'برامج تعليمية موثوقة',
    iconType: 'check-circle',
    iconClass: 'stat-icon--teal',
  },
]

export const classesHeaderData = {
  badgeIcon: 'graduation',
  title: 'فصولنا ودوراتنا التدريبية',
  subtitle: 'اكتشف برامجنا التعليمية عالية المستوى بإشراف نخبة من أفضل الأساتذة ذوي الخبرة',
  ctaText: 'عرض جميع الفصول',
  ctaLink: '/Classes',
}

export const classesData = [
  {
    id: 'class-math',
    title: 'الرياضيات',
    level: 'السنة الثانية ثانوي (2 ثانوي)',
    description: 'برنامج شامل للطور الثانوي مع حل تمارين مكثفة، منهجية التحليل الرياضي والتحضير للامتحانات.',
    teacher: 'الأستاذ بن علي',
    hours: '36 ساعة',
    price: '4,500 دج / شهر',
    schedule: 'السبت والثلاثاء : 14:00 - 16:00',
    room: 'القاعة ب2 - جناح العلوم',
    spotsLeft: 6,
    category: 'الرياضيات',
    categoryTheme: 'blue',
    iconType: 'math',
    image: classMathImg,
    ribbonColor: '#3B82F6',
  },
  {
    id: 'class-english',
    title: 'اللغة الإنجليزية',
    level: 'السنة الثانية ثانوي (2 ثانوي)',
    description: 'دورة شاملة تركز على التعبير الشفهي والمحادثة، القواعد النحوية، والإنشاء والتحليل الأدبي.',
    teacher: 'الأستاذ حداد',
    hours: '30 ساعة',
    price: '4,000 دج / شهر',
    schedule: 'الأحد والأربعاء : 16:00 - 18:00',
    room: 'القاعة ل1 - جناح اللغات',
    spotsLeft: 4,
    category: 'اللغات',
    categoryTheme: 'green',
    iconType: 'english',
    image: classEnglishImg,
    ribbonColor: '#10B981',
  },
  {
    id: 'class-arabic',
    title: 'اللغة العربية وآدابها',
    level: 'السنة الثانية ثانوي (2 ثانوي)',
    description: 'برنامج متكامل للطور الثانوي: دراسة النصوص الأدبية، القواعد النحوية والصرفية ومنهجية التحرير.',
    teacher: 'الأستاذة بلقاسم',
    hours: '32 ساعة',
    price: '3,800 دج / شهر',
    schedule: 'الإثنين والخميس : 15:00 - 17:00',
    room: 'القاعة أ3 - جناح الآداب',
    spotsLeft: 8,
    category: 'اللغات',
    categoryTheme: 'rose',
    iconType: 'arabic',
    image: classArabicImg,
    ribbonColor: '#F43F5E',
  },
  {
    id: 'class-physics',
    title: 'العلوم الفيزيائية',
    level: 'السنة الثانية ثانوي (2 ثانوي)',
    description: 'دروس مفصلة للطور الثانوي تشمل التجارب المخبرية وحل مسائل وتمارين تطبيقية نموذجية.',
    teacher: 'الأستاذ قارة',
    hours: '34 ساعة',
    price: '4,500 دج / شهر',
    schedule: 'السبت : 09:00 - 12:00',
    room: 'المخبر رقم 01 - جناح التجارب',
    spotsLeft: 5,
    category: 'العلوم',
    categoryTheme: 'purple',
    iconType: 'physics',
    image: classPhysicsImg,
    ribbonColor: '#8B5CF6',
  },
  {
    id: 'class-computer',
    title: 'الإعلام الآلي والبرمجة',
    level: 'السنة الثانية ثانوي (2 ثانوي)',
    description: 'دورة تطبيقية للطور الثانوي: الخوارزميات، البرمجة وتطوير مواقع الويب وتطبيقات المكتب الحديثة.',
    teacher: 'الأستاذ واضح',
    hours: '40 ساعة',
    price: '5,000 دج / شهر',
    schedule: 'الجمعة : 09:00 - 12:00',
    room: 'قاعة الإعلام الآلي 1',
    spotsLeft: 3,
    category: 'التكنولوجيا',
    categoryTheme: 'amber',
    iconType: 'computer',
    image: classComputerImg,
    ribbonColor: '#F59E0B',
  },
]

export const schoolInfo = {
  name: 'المدرسة',
  address: '12 شارع الحرية، الجزائر الوسطى، الجزائر',
  phone: '+213 (0) 555 12 34 56',
  email: 'contact@academie-alkhwarizmi.dz',
  hours: 'من الأحد إلى الخميس : 08:30 - 17:30 | السبت : 09:00 - 14:00',
}

export const teachersData = [
  { id: 't1', name: 'سارة بن علي', image: teacherSarah },
  { id: 't2', name: 'داود مورو', image: teacherDavid },
  { id: 't3', name: 'إيلينا روستوفا', image: teacherElena },
  { id: 't4', name: 'ماركوس تشن', image: teacherMarcus },
  { id: 't5', name: 'أميرة المنصور', image: teacherAmira },
]
