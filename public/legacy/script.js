// ============================================
// MEDFLOW - Premium Tibbiy Navbat Tizimi
// Tuzatilgan va optimallashtirilgan versiya
// ============================================

// ============================================
// 1. MA'LUMOTLAR (Data Store)
// ============================================
const AppData = {
  currentUser: null,
  isLoggedIn: false,
  currentPage: 'home',
  theme: 'dark',
  searchQuery: '',
  queueInterval: null,
  currentQueuePosition: 0,
  selectedDoctor: null,
  notificationsEnabled: true,
  soundEnabled: true,
  compareDoctorIds: [],

  specialties: [
    { id: 'cardiology', name: 'Kardiologiya', icon: 'heart-pulse', description: 'Yurak-qon tomir tizimi kasalliklari', doctors: 24, color: 'from-rose-500 to-pink-600' },
    { id: 'neurology', name: 'Nevrologiya', icon: 'brain', description: 'Asab tizimi va miya kasalliklari', doctors: 18, color: 'from-violet-500 to-purple-600' },
    { id: 'pediatrics', name: 'Pediatriya', icon: 'baby', description: "Bolalar sog'ligi va kasalliklari", doctors: 32, color: 'from-sky-500 to-blue-600' },
    { id: 'dermatology', name: 'Dermatologiya', icon: 'scan-face', description: 'Teri kasalliklari', doctors: 15, color: 'from-amber-500 to-orange-600' },
    { id: 'orthopedics', name: 'Ortopediya', icon: 'bone', description: "Suyak va bo'g'im kasalliklari", doctors: 20, color: 'from-emerald-500 to-teal-600' },
    { id: 'gynecology', name: 'Ginekologiya', icon: 'heart-handshake', description: "Ayollar sog'ligi", doctors: 16, color: 'from-fuchsia-500 to-pink-600' },
    { id: 'dentistry', name: 'Stomatologiya', icon: 'smile', description: "Tish va og'iz bo'shligi", doctors: 22, color: 'from-cyan-500 to-blue-600' },
    { id: 'ophthalmology', name: 'Oftalmologiya', icon: 'eye', description: "Ko'z kasalliklari", doctors: 14, color: 'from-indigo-500 to-blue-600' }
  ],

  doctors: [
    {
      id: 1, name: 'Dr. Azizov Bahodir', specialty: 'Kardiologiya', specialtyId: 'cardiology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 156, experience: 18, education: 'Toshkent Tibbiyot Akademiyasi',
      clinic: 'MedLife Klinikasi', location: { city: 'Toshkent', district: 'Chilonzor', village: '' },
      hours: '09:00 - 18:00', price: 180000, phone: '+998 90 123 45 67', email: 'b.azizov@medflow.uz',
      about: "18 yillik tajribaga ega professional kardiolog. Yurak-qon tomir tizimi kasalliklari bo'yicha mutaxassis.",
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 3, waitTime: 25 }, online: true
    },
    {
      id: 2, name: 'Dr. Karimova Nodira', specialty: 'Nevrologiya', specialtyId: 'neurology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 128, experience: 15, education: 'SamDU Tibbiyot Fakulteti',
      clinic: 'NeuroMed Markazi', location: { city: 'Samarqand', district: 'Registon', village: '' },
      hours: '08:00 - 17:00', price: 150000, phone: '+998 91 234 56 78', email: 'n.karimova@medflow.uz',
      about: "Nevrologiya sohasida 15 yillik tajriba. Miya insultlari, epilepsiya va bosh og'rig'i davolash bo'yicha mutaxassis.",
      schedule: [
        { day: 'Dushanba', time: '08:00 - 12:00' }, { day: 'Seshanba', time: '13:00 - 17:00' },
        { day: 'Chorshanba', time: '08:00 - 12:00' }, { day: 'Payshanba', time: '13:00 - 17:00' },
        { day: 'Juma', time: '08:00 - 15:00' }
      ],
      queue: { current: 5, waitTime: 40 }, online: true
    },
    {
      id: 3, name: 'Dr. Toshmatov Dilshod', specialty: 'Pediatriya', specialtyId: 'pediatrics',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
      rating: 5.0, reviews: 203, experience: 12, education: 'Buxoro Tibbiyot Instituti',
      clinic: "Bolalar Shifoxonasi", location: { city: 'Buxoro', district: 'Markaziy', village: '' },
      hours: '09:00 - 18:00', price: 120000, phone: '+998 93 345 67 89', email: 'd.toshmatov@medflow.uz',
      about: "Bolalar sog'ligi bo'yicha 12 yillik tajriba.",
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '09:00 - 13:00' },
        { day: 'Chorshanba', time: '14:00 - 18:00' }, { day: 'Payshanba', time: '09:00 - 13:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 8, waitTime: 55 }, online: false
    },
    {
      id: 4, name: 'Dr. Rahimova Zulfiya', specialty: 'Dermatologiya', specialtyId: 'dermatology',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
      rating: 4.7, reviews: 98, experience: 10, education: 'Andijon Tibbiyot Instituti',
      clinic: 'DermaKlinik', location: { city: 'Andijon', district: 'Yangi hayot', village: '' },
      hours: '10:00 - 19:00', price: 140000, phone: '+998 94 456 78 90', email: 'z.rahimova@medflow.uz',
      about: "Teri kasalliklari, allergiya va kosmetologiya bo'yicha 10 yillik tajriba.",
      schedule: [
        { day: 'Dushanba', time: '10:00 - 14:00' }, { day: 'Seshanba', time: '15:00 - 19:00' },
        { day: 'Chorshanba', time: '10:00 - 14:00' }, { day: 'Payshanba', time: '15:00 - 19:00' },
        { day: 'Juma', time: '10:00 - 17:00' }
      ],
      queue: { current: 2, waitTime: 15 }, online: true
    },
    {
      id: 5, name: 'Dr. Ismoilov Jasur', specialty: 'Ortopediya', specialtyId: 'orthopedics',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 175, experience: 20, education: 'Toshkent Tibbiyot Akademiyasi',
      clinic: 'Ortopedik Markaz', location: { city: 'Toshkent', district: 'Yunusobod', village: '' },
      hours: '08:30 - 17:30', price: 200000, phone: '+998 95 567 89 01', email: 'j.ismoilov@medflow.uz',
      about: "20 yillik tajribaga ega ortoped-travmatolog.",
      schedule: [
        { day: 'Dushanba', time: '08:30 - 12:30' }, { day: 'Seshanba', time: '13:30 - 17:30' },
        { day: 'Chorshanba', time: '08:30 - 12:30' }, { day: 'Payshanba', time: '13:30 - 17:30' },
        { day: 'Juma', time: '08:30 - 16:30' }
      ],
      queue: { current: 4, waitTime: 35 }, online: true
    },
    {
      id: 6, name: 'Dr. Saidova Madina', specialty: 'Ginekologiya', specialtyId: 'gynecology',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 142, experience: 14, education: 'Namangan Tibbiyot Instituti',
      clinic: "Ayollar Sog'ligi Markazi", location: { city: 'Namangan', district: 'Davlatobod', village: '' },
      hours: '09:00 - 18:00', price: 160000, phone: '+998 97 678 90 12', email: 'm.saidova@medflow.uz',
      about: "Ayollar sog'ligi bo'yicha 14 yillik tajriba.",
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 6, waitTime: 45 }, online: true
    },
    {
      id: 7, name: 'Dr. Nuriddinov Shavkat', specialty: 'Stomatologiya', specialtyId: 'dentistry',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 189, experience: 16, education: 'Toshkent Stomatologiya Instituti',
      clinic: 'Dental Pro', location: { city: 'Toshkent', district: "Mirzo-Ulug'bek", village: '' },
      hours: '09:00 - 20:00', price: 130000, phone: '+998 90 999 88 77', email: 'sh.nuriddinov@medflow.uz',
      about: "Implantatsiya, ortodontiya va estetik stomatologiya bo'yicha 16 yillik tajriba.",
      schedule: [
        { day: 'Dushanba', time: '09:00 - 14:00' }, { day: 'Seshanba', time: '15:00 - 20:00' },
        { day: 'Chorshanba', time: '09:00 - 14:00' }, { day: 'Payshanba', time: '15:00 - 20:00' },
        { day: 'Juma', time: '09:00 - 18:00' }, { day: 'Shanba', time: '10:00 - 15:00' }
      ],
      queue: { current: 1, waitTime: 10 }, online: true
    },
    {
      id: 8, name: 'Dr. Xolmatova Gulnoza', specialty: 'Oftalmologiya', specialtyId: 'ophthalmology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 134, experience: 13, education: 'SamDU Tibbiyot Fakulteti',
      clinic: "Ko'z Markazi", location: { city: 'Samarqand', district: 'Urgut', village: 'Chorvador' },
      hours: '08:00 - 17:00', price: 110000, phone: '+998 91 111 22 33', email: 'g.xolmatova@medflow.uz',
      about: "Ko'z kasalliklari, lazer koreksiyasi va katarakta operatsiyalari bo'yicha mutaxassis.",
      schedule: [
        { day: 'Dushanba', time: '08:00 - 12:00' }, { day: 'Seshanba', time: '13:00 - 17:00' },
        { day: 'Chorshanba', time: '08:00 - 12:00' }, { day: 'Payshanba', time: '13:00 - 17:00' },
        { day: 'Juma', time: '08:00 - 15:00' }
      ],
      queue: { current: 7, waitTime: 50 }, online: false
    },
    {
      id: 9, name: 'Dr. Abdullayeva Malika', specialty: 'Kardiologiya', specialtyId: 'cardiology',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 87, experience: 11, education: 'Toshkent Tibbiyot Akademiyasi',
      clinic: 'MedLife Klinikasi', location: { city: 'Toshkent', district: 'Chilonzor', village: '' },
      hours: '08:30 - 17:30', price: 160000, phone: '+998 90 200 11 22', email: 'm.abdullayeva@medflow.uz',
      about: 'Yurak faoliyatini tekshirish va profilaktik kardiologiya bo‘yicha mutaxassis.',
      schedule: [
        { day: 'Dushanba', time: '08:30 - 12:30' }, { day: 'Seshanba', time: '13:30 - 17:30' },
        { day: 'Chorshanba', time: '08:30 - 12:30' }, { day: 'Payshanba', time: '13:30 - 17:30' },
        { day: 'Juma', time: '08:30 - 15:30' }
      ],
      queue: { current: 2, waitTime: 20 }, online: true
    },
    {
      id: 10, name: 'Dr. Ergashev Akmal', specialty: 'Nevrologiya', specialtyId: 'neurology',
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop&crop=face',
      rating: 4.7, reviews: 76, experience: 9, education: 'Buxoro Tibbiyot Instituti',
      clinic: 'NeuroMed Markazi', location: { city: 'Samarqand', district: 'Registon', village: '' },
      hours: '09:00 - 18:00', price: 135000, phone: '+998 91 200 22 33', email: 'a.ergashev@medflow.uz',
      about: 'Bosh og‘rig‘i, uyqu buzilishlari va asab tizimi kasalliklari bo‘yicha qabul qiladi.',
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 3, waitTime: 25 }, online: true
    },
    {
      id: 11, name: 'Dr. Yusupova Sevara', specialty: 'Pediatriya', specialtyId: 'pediatrics',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 112, experience: 10, education: 'Buxoro Tibbiyot Instituti',
      clinic: 'Bolalar Shifoxonasi', location: { city: 'Buxoro', district: 'Markaziy', village: '' },
      hours: '08:00 - 17:00', price: 100000, phone: '+998 93 200 33 44', email: 's.yusupova@medflow.uz',
      about: 'Bolalar salomatligi, emlash va muntazam profilaktik ko‘riklar bo‘yicha pediatr.',
      schedule: [
        { day: 'Dushanba', time: '08:00 - 12:00' }, { day: 'Seshanba', time: '13:00 - 17:00' },
        { day: 'Chorshanba', time: '08:00 - 12:00' }, { day: 'Payshanba', time: '13:00 - 17:00' },
        { day: 'Juma', time: '08:00 - 15:00' }
      ],
      queue: { current: 4, waitTime: 30 }, online: true
    },
    {
      id: 12, name: 'Dr. Qodirova Mohira', specialty: 'Dermatologiya', specialtyId: 'dermatology',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 91, experience: 8, education: 'Andijon Tibbiyot Instituti',
      clinic: 'DermaKlinik', location: { city: 'Andijon', district: 'Yangi hayot', village: '' },
      hours: '09:00 - 18:00', price: 125000, phone: '+998 94 200 44 55', email: 'm.qodirova@medflow.uz',
      about: 'Teri kasalliklari va allergik holatlarni aniqlash hamda davolash bo‘yicha dermatolog.',
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 1, waitTime: 15 }, online: false
    },
    {
      id: 13, name: 'Dr. Usmonova Nilufar', specialty: 'Ortopediya', specialtyId: 'orthopedics',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 104, experience: 12, education: 'Toshkent Tibbiyot Akademiyasi',
      clinic: 'Ortopedik Markaz', location: { city: 'Toshkent', district: 'Yunusobod', village: '' },
      hours: '09:00 - 18:00', price: 175000, phone: '+998 95 200 55 66', email: 'n.usmonova@medflow.uz',
      about: 'Bo‘g‘im va tayanch-harakat tizimi muammolari bo‘yicha ortoped-travmatolog.',
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 5, waitTime: 40 }, online: true
    },
    {
      id: 14, name: 'Dr. Tursunova Shahnoza', specialty: 'Ginekologiya', specialtyId: 'gynecology',
      image: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?w=400&h=400&fit=crop&crop=face',
      rating: 4.8, reviews: 95, experience: 10, education: 'Namangan Tibbiyot Instituti',
      clinic: "Ayollar Sog'ligi Markazi", location: { city: 'Namangan', district: 'Davlatobod', village: '' },
      hours: '08:30 - 17:30', price: 145000, phone: '+998 97 200 66 77', email: 'sh.tursunova@medflow.uz',
      about: 'Ayollar salomatligi, profilaktik ko‘rik va maslahatlar bo‘yicha ginekolog.',
      schedule: [
        { day: 'Dushanba', time: '08:30 - 12:30' }, { day: 'Seshanba', time: '13:30 - 17:30' },
        { day: 'Chorshanba', time: '08:30 - 12:30' }, { day: 'Payshanba', time: '13:30 - 17:30' },
        { day: 'Juma', time: '08:30 - 15:30' }
      ],
      queue: { current: 3, waitTime: 25 }, online: true
    },
    {
      id: 15, name: 'Dr. Yo‘ldoshev Farrux', specialty: 'Stomatologiya', specialtyId: 'dentistry',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      rating: 4.7, reviews: 83, experience: 9, education: 'Toshkent Stomatologiya Instituti',
      clinic: 'Dental Pro', location: { city: 'Toshkent', district: "Mirzo-Ulug'bek", village: '' },
      hours: '09:00 - 19:00', price: 115000, phone: '+998 90 200 77 88', email: 'f.yoldoshev@medflow.uz',
      about: 'Terapevtik stomatologiya va og‘iz bo‘shlig‘i profilaktikasi bo‘yicha mutaxassis.',
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 19:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 19:00' },
        { day: 'Juma', time: '09:00 - 16:00' }, { day: 'Shanba', time: '10:00 - 14:00' }
      ],
      queue: { current: 2, waitTime: 20 }, online: true
    },
    {
      id: 16, name: 'Dr. Abdusattorova Dilnoza', specialty: 'Oftalmologiya', specialtyId: 'ophthalmology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      rating: 4.9, reviews: 108, experience: 11, education: 'SamDU Tibbiyot Fakulteti',
      clinic: "Ko'z Markazi", location: { city: 'Samarqand', district: 'Urgut', village: 'Chorvador' },
      hours: '09:00 - 18:00', price: 95000, phone: '+998 91 200 88 99', email: 'd.abdusattorova@medflow.uz',
      about: 'Ko‘z salomatligi va ko‘rish qobiliyatini tekshirish bo‘yicha oftalmolog.',
      schedule: [
        { day: 'Dushanba', time: '09:00 - 13:00' }, { day: 'Seshanba', time: '14:00 - 18:00' },
        { day: 'Chorshanba', time: '09:00 - 13:00' }, { day: 'Payshanba', time: '14:00 - 18:00' },
        { day: 'Juma', time: '09:00 - 16:00' }
      ],
      queue: { current: 2, waitTime: 20 }, online: true
    }
  ],

  cities: [
    { id: 'toshkent', name: 'Toshkent', districts: ['Chilonzor', 'Yunusobod', "Mirzo-Ulug'bek", 'Shayxontohur', 'Yakkasaroy'] },
    { id: 'samarqand', name: 'Samarqand', districts: ['Registon', 'Urgut', "Kattaqo'rg'on", "Pastdarg'om"] },
    { id: 'buxoro', name: 'Buxoro', districts: ['Markaziy', "Qorako'l", "G'ijduvon", 'Romitan'] },
    { id: 'andijon', name: 'Andijon', districts: ['Yangi hayot', 'Shahrixon', 'Asaka', 'Baliqchi'] },
    { id: 'namangan', name: 'Namangan', districts: ['Davlatobod', 'Chust', 'Kosonsoy', 'Uychi'] }
  ]
};

// ============================================
// 2. FOYDALANUVCHI MA'LUMOTLARI
// ============================================
let currentUserData = {
  firstName: 'Foydalanuvchi', lastName: '', phone: '+998 90 123 45 67', email: '',
  birthDate: '', gender: '', address: '', bio: '', visits: 12, doctorsCount: 5, reviewsCount: 3,
  appointments: [
    { id: 1, doctor: 'Dr. Azizov Bahodir', specialty: 'Kardiologiya', date: '2026-04-30', time: '10:00', status: 'upcoming', clinic: 'MedLife Klinikasi' },
    { id: 2, doctor: 'Dr. Karimova Nodira', specialty: 'Nevrologiya', date: '2026-04-25', time: '14:30', status: 'completed', clinic: 'NeuroMed Markazi' },
    { id: 3, doctor: 'Dr. Toshmatov Dilshod', specialty: 'Pediatriya', date: '2026-04-20', time: '09:00', status: 'cancelled', clinic: "Bolalar Shifoxonasi" }
  ],
  history: [
    { id: 1, doctor: 'Dr. Azizov Bahodir', date: '2026-04-25', diagnosis: 'Yurak ritmi buzilishi', treatment: 'Dori-darmon tayinlandi', notes: 'EKG tekshiruvi' },
    { id: 2, doctor: 'Dr. Rahimova Zulfiya', date: '2026-03-15', diagnosis: 'Teri allergiyasi', treatment: 'Krem va tabletalar', notes: 'Allergen testi' }
  ],
  reviews: [
    { id: 1, doctor: 'Dr. Azizov Bahodir', rating: 5, date: '2026-04-25', text: 'Juda yaxshi shifokor, batafsil tushuntirdi.', helpful: 12 },
    { id: 2, doctor: 'Dr. Karimova Nodira', rating: 4, date: '2026-04-20', text: 'Professional, lekin navbat kutildi.', helpful: 8 }
  ]
};

try {
  const savedUserData = localStorage.getItem('medflow-user-data');
  if (savedUserData) currentUserData = { ...currentUserData, ...JSON.parse(savedUserData) };
} catch (error) {
  console.error('MedFlow profil ma’lumotlarini yuklab bo‘lmadi:', error);
}

const AUTH_ACCOUNTS_KEY = 'medflow-accounts';
const AUTH_LOCAL_SESSION_KEY = 'medflow-auth-session';
const AUTH_SESSION_KEY = 'medflow-auth-temporary-session';
const AUTH_HASH_ITERATIONS = 120000;

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

function accountProfileKey(username) {
  return `medflow-user-data-${normalizeUsername(username)}`;
}

function getStoredAccounts() {
  const stored = localStorage.getItem(AUTH_ACCOUNTS_KEY);
  if (!stored) return [];
  const accounts = JSON.parse(stored);
  if (!Array.isArray(accounts)) throw new Error('Akkauntlar ro‘yxati noto‘g‘ri formatda.');
  return accounts;
}

function bytesToHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, saltHex) {
  if (!window.crypto?.subtle) throw new Error('Xavfsiz login uchun brauzeringiz Web Crypto’ni qo‘llashi kerak.');
  const salt = saltHex
    ? Uint8Array.from(saltHex.match(/.{2}/g) || [], byte => parseInt(byte, 16))
    : window.crypto.getRandomValues(new Uint8Array(16));
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: AUTH_HASH_ITERATIONS, hash: 'SHA-256' },
    key,
    256
  );
  return { salt: bytesToHex(salt), hash: bytesToHex(new Uint8Array(bits)) };
}

function makeAccountProfile({ firstName, lastName, phoneDisplay, email }) {
  return {
    firstName,
    lastName,
    phone: phoneDisplay || '',
    email,
    birthDate: '',
    gender: '',
    address: '',
    bio: '',
    visits: 0,
    doctorsCount: 0,
    reviewsCount: 0,
    appointments: [],
    history: [],
    reviews: []
  };
}

function loadAccountProfile(account) {
  const storedProfile = localStorage.getItem(accountProfileKey(account.username));
  currentUserData = storedProfile
    ? { ...makeAccountProfile(account), ...JSON.parse(storedProfile) }
    : makeAccountProfile(account);
  currentUserData.firstName = account.firstName;
  currentUserData.lastName = account.lastName;
  currentUserData.phone = account.phoneDisplay;
  currentUserData.email = account.email || '';
}

function saveCurrentUserData() {
  const username = AppData.currentUser?.accountUsername;
  if (!username) return;
  localStorage.setItem(accountProfileKey(username), JSON.stringify(currentUserData));
}

let isEditingProfile = false;
let currentLanguage = localStorage.getItem('medflow-language') || 'uz';
let workplaceCounter = 0;
let selectedPaymentMethod = 'card';
let currentPaymentAmount = 0;
let appliedPromo = null;

const UI_TRANSLATIONS = {
  ru: {
    'nav.home': 'Главная', 'nav.specialties': 'Специальности', 'nav.clinics': 'Клиники',
    'nav.doctors': 'Врачи', 'nav.favorites': 'Избранное', 'nav.contact': 'Контакты',
    'bottom.home': 'Главная', 'bottom.specialties': 'Направления',
    'bottom.doctors': 'Врачи', 'bottom.favorites': 'Избранное',
    'specialties.title': 'Направления медицины',
    'specialties.description': 'Выберите направление и найдите подходящего специалиста.',
    'clinics.title': 'Выберите клинику',
    'clinics.description': 'Смотрите врачей и цены на приём по клиникам.',
    'features.title': 'Почему MedFlow?',
    'features.booking': 'Удобная запись',
    'features.bookingText': 'Найдите врача и запланируйте визит на удобное время.',
    'features.nearby': 'Клиники рядом',
    'features.nearbyText': 'Быстро находите специалистов по городу и клинике.',
    'features.history': 'Медицинская история',
    'features.historyText': 'Управляйте визитами, записями и данными профиля.',
    'features.favorites': 'Избранные врачи',
    'features.favoritesText': 'Сохраняйте понравившихся специалистов.',
    'doctors.title': 'Каталог врачей',
    'doctors.disclaimer': 'Врачи, рейтинги и расписание приёма представлены как демо-данные.',
    'doctors.today': 'Есть приём сегодня',
    'doctors.sort': 'Сортировка', 'doctors.rating': 'Сначала высокий рейтинг',
    'doctors.price': 'Сначала дешевле', 'doctors.experience': 'Сначала опытные',
    'doctors.allCities': 'Все города', 'doctors.allSpecialties': 'Все специальности',
    'doctors.allClinics': 'Все клиники', 'doctors.anyPrice': 'Любая цена',
    'doctors.upTo150': 'До 150 000 сум', 'doctors.upTo200': 'До 200 000 сум',
    'doctors.ratingPlaceholder': 'Рейтинг', 'doctors.fiveStars': '5 звёзд',
    'doctors.fourStars': '4+ звезды', 'doctors.threeStars': '3+ звезды',
    'doctors.search': 'Поиск врача или специальности...',
    'doctors.filterTitle': 'Все врачи',
    'favorites.title': 'Избранные врачи',
    'clinicDashboard.subtitle': 'Управление клиникой · Демо',
    'clinicDashboard.title': 'Кабинет клиники',
    'clinicDashboard.description': 'Тестовый режим: изменения сохраняются только в этом браузере и не отправляются в реальную систему клиники.',
    'clinicDashboard.clinic': 'Клиника',
    'clinicDashboard.doctors': 'Врачи',
    'clinicDashboard.today': 'Приём сегодня',
    'clinicDashboard.appointments': 'Демо-записи',
    'clinicDashboard.todayStatus': 'Статус приёма на сегодня',
    'clinicDashboard.toggle': 'Приём сегодня',
    'clinicDashboard.saved': 'Демо-расписание сохранено в этом браузере'
  }
};

function translate(key, uzbekText) {
  return currentLanguage === 'ru' ? (UI_TRANSLATIONS.ru[key] || uzbekText) : uzbekText;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const original = element.dataset.uzText || element.textContent;
    if (!element.dataset.uzText) element.dataset.uzText = original;
    element.textContent = translate(key, element.dataset.uzText);
  });
  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.textContent = currentLanguage.toUpperCase();
    toggle.setAttribute('aria-label', currentLanguage === 'uz' ? 'Switch to Russian' : 'O‘zbek tiliga o‘tish');
  }
  const search = document.getElementById('search-input');
  if (search) search.placeholder = currentLanguage === 'ru' ? UI_TRANSLATIONS.ru['doctors.search'] : 'Shifokor yoki mutaxassislik qidirish...';
  const city = document.getElementById('city-filter');
  if (city && city.options.length) city.options[0].textContent = currentLanguage === 'ru' ? UI_TRANSLATIONS.ru['doctors.allCities'] : 'Barcha shahlar';
  const allSpecialties = document.querySelector('#specialty-filter option[value=""]');
  if (allSpecialties) allSpecialties.textContent = currentLanguage === 'ru' ? UI_TRANSLATIONS.ru['doctors.allSpecialties'] : 'Barcha mutaxassisliklar';
  const clinicFilter = document.getElementById('clinic-filter');
  if (clinicFilter && clinicFilter.options.length) clinicFilter.options[0].textContent = currentLanguage === 'ru' ? UI_TRANSLATIONS.ru['doctors.allClinics'] : 'Barcha klinikalar';
  const priceFilter = document.getElementById('price-filter');
  if (priceFilter && priceFilter.options.length) {
    const labels = currentLanguage === 'ru'
      ? [UI_TRANSLATIONS.ru['doctors.anyPrice'], UI_TRANSLATIONS.ru['doctors.upTo150'], UI_TRANSLATIONS.ru['doctors.upTo200']]
      : ['Istalgan narx', '150 000 so‘mgacha', '200 000 so‘mgacha'];
    Array.from(priceFilter.options).forEach((option, index) => { option.textContent = labels[index] || option.textContent; });
  }
  const ratingFilter = document.getElementById('rating-filter');
  if (ratingFilter && ratingFilter.options.length) {
    const labels = currentLanguage === 'ru'
      ? [UI_TRANSLATIONS.ru['doctors.ratingPlaceholder'], UI_TRANSLATIONS.ru['doctors.fiveStars'], UI_TRANSLATIONS.ru['doctors.fourStars'], UI_TRANSLATIONS.ru['doctors.threeStars']]
      : ['Reyting', '5 yulduz', '4+ yulduz', '3+ yulduz'];
    Array.from(ratingFilter.options).forEach((option, index) => { option.textContent = labels[index] || option.textContent; });
  }
  const specialtyFilter = document.getElementById('specialty-filter');
  if (specialtyFilter) {
    const names = currentLanguage === 'ru'
      ? { cardiology: 'Кардиология', neurology: 'Неврология', pediatrics: 'Педиатрия', dermatology: 'Дерматология', orthopedics: 'Ортопедия', gynecology: 'Гинекология', dentistry: 'Стоматология', ophthalmology: 'Офтальмология' }
      : Object.fromEntries(AppData.specialties.map(specialty => [specialty.id, specialty.name]));
    Array.from(specialtyFilter.options).forEach(option => {
      if (option.value) option.textContent = names[option.value] || option.textContent;
    });
  }
  const bottomLabels = {
    home: translate('bottom.home', 'Bosh sahifa'),
    specialties: translate('bottom.specialties', "Yo'nalishlar"),
    doctors: translate('bottom.doctors', 'Shifokorlar'),
    favorites: translate('bottom.favorites', 'Sevimlilar'),
    contact: translate('bottom.contact', 'Aloqa')
  };
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    const label = item.querySelector('span');
    if (label && bottomLabels[item.dataset.page]) label.textContent = bottomLabels[item.dataset.page];
  });
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'uz' ? 'ru' : 'uz';
  localStorage.setItem('medflow-language', currentLanguage);
  applyLanguage();
  renderSpecialties();
  renderDoctors();
  renderDashboardOverview();
  renderClinics();
  renderClinicDashboard();
  filterDoctors();
}

// ============================================
// 3. YORDAMCHI FUNKSIYALAR
// ============================================
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIconWrapper = toast?.querySelector('.toast-icon-wrapper');
  const toastIcon = toast?.querySelector('.toast-icon-wrapper i');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;

  if (toastIconWrapper) {
    if (type === 'error') {
      toastIconWrapper.style.background = 'var(--rose-500)';
      if (toastIcon) { toastIcon.setAttribute('data-lucide', 'x-circle'); }
    } else if (type === 'warning') {
      toastIconWrapper.style.background = 'var(--amber-500)';
      if (toastIcon) { toastIcon.setAttribute('data-lucide', 'alert-triangle'); }
    } else {
      toastIconWrapper.style.background = 'var(--emerald-500)';
      if (toastIcon) { toastIcon.setAttribute('data-lucide', 'check-circle-2'); }
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  toast.classList.remove('hidden');
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 3000);
}

function createStars(rating) {
  return Array(5).fill(0).map((_, i) =>
    `<i data-lucide="star" ${i < Math.floor(rating) ? 'fill="currentColor"' : ''}></i>`
  ).join('');
}

function getSpecialtyLabel(specialtyId, fallback) {
  if (currentLanguage !== 'ru') return fallback;
  const names = { cardiology: 'Кардиология', neurology: 'Неврология', pediatrics: 'Педиатрия', dermatology: 'Дерматология', orthopedics: 'Ортопедия', gynecology: 'Гинекология', dentistry: 'Стоматология', ophthalmology: 'Офтальмология' };
  return names[specialtyId] || fallback;
}

function createDoctorCard(doctor, index = 0) {
  const stars = createStars(doctor.rating);
  const onlineStatus = doctor.online
    ? `<span class="doctor-status online"><span></span>${currentLanguage === 'ru' ? 'Онлайн' : 'Onlayn'}</span>`
    : `<span class="doctor-status offline"><span></span>${currentLanguage === 'ru' ? 'Не в сети' : 'Offlayn'}</span>`;

  return `
    <div class="doctor-card" data-aos="fade-up" data-aos-delay="${index * 100}" onclick="openDoctorModal(${doctor.id})">
      <div class="doctor-card-header">
        <div class="doctor-card-avatar">
          <img src="${doctor.image}" alt="${doctor.name}" loading="lazy">
        </div>
        ${onlineStatus}
        <button type="button" class="favorite-btn" data-doctor-id="${doctor.id}" aria-label="Sevimlilarga qo‘shish" onclick="event.stopPropagation(); toggleFavorite(${doctor.id})">
          <i data-lucide="heart"></i>
        </button>
      </div>
      <div class="doctor-card-body">
        <h3 class="doctor-card-name">${doctor.name}</h3>
        <p class="doctor-card-specialty">${getSpecialtyLabel(doctor.specialtyId, doctor.specialty)}</p>
        <div class="doctor-card-info">
          <div class="doctor-card-info-item">
            <i data-lucide="briefcase"></i>
            <span>${doctor.experience} ${currentLanguage === 'ru' ? 'лет опыта' : 'yil tajriba'}</span>
          </div>
          <div class="doctor-card-info-item">
            <i data-lucide="building-2"></i>
            <span>${doctor.clinic}</span>
          </div>
          <div class="doctor-card-info-item">
            <i data-lucide="map-pin"></i>
            <span>${doctor.location.city}, ${doctor.location.district}</span>
          </div>
        </div>
        <div class="doctor-card-rating">
          <div class="stars">${stars}</div>
          <span class="rating-number">${doctor.rating}</span>
          <span class="rating-count">(${doctor.reviews})</span>
        </div>
        <div class="doctor-card-footer">
          <div class="doctor-card-price">${doctor.price.toLocaleString('uz-UZ')} <span>so'm</span></div>
          <button type="button" class="doctor-compare-toggle" aria-pressed="${AppData.compareDoctorIds.includes(doctor.id)}" onclick="event.stopPropagation(); toggleDoctorCompare(${doctor.id})">
            <i data-lucide="${AppData.compareDoctorIds.includes(doctor.id) ? 'check' : 'columns-2'}"></i><span>${AppData.compareDoctorIds.includes(doctor.id) ? (currentLanguage === 'ru' ? 'Выбран' : 'Tanlandi') : (currentLanguage === 'ru' ? 'Сравнить' : 'Solishtirish')}</span>
          </button>
          <button class="btn-book-sm" onclick="event.stopPropagation(); openDoctorModal(${doctor.id})">
            <i data-lucide="calendar-plus"></i>
            <span>${currentLanguage === 'ru' ? 'Запись' : 'Yozilish'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// 4. OVOZ, CONFETTI, COUNTER
// ============================================
function playBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880; osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function playAlertSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t); osc.stop(t + 0.35);
    });
  } catch (e) {}
}

function playSuccessSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 1.5);
    });
  } catch (e) {}
}

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f59e0b', '#10b981', '#f43f5e', '#06b6d4'];
  const shapes = ['circle', 'square', 'triangle'];
  const particles = [];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 25, vy: (Math.random() - 0.5) * 25 - 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 4, shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360, rotationSpeed: (Math.random() - 0.5) * 15,
      opacity: 1, gravity: 0.25, drag: 0.99
    });
  }

  let frameCount = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;
    let active = 0;

    particles.forEach(p => {
      if (p.opacity <= 0) return;
      active++;
      p.x += p.vx; p.y += p.vy;
      p.vy += p.gravity; p.vx *= p.drag; p.vy *= p.drag;
      p.rotation += p.rotationSpeed; p.opacity -= 0.006;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
      } else if (p.shape === 'square') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    });

    if (active > 0 && frameCount < 300) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
  setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 5000);
}

function showVoiceNotification(text) {
  const voiceNotification = document.getElementById('voice-notification');
  const voiceText = document.getElementById('voice-text');
  if (!voiceNotification || !voiceText) return;

  voiceText.textContent = text || "Navbatingiz keldi!";
  voiceNotification.classList.remove('hidden');
  voiceNotification.classList.add('active');

  if ('speechSynthesis' in window && AppData.soundEnabled) {
    const utterance = new SpeechSynthesisUtterance(text || "Navbatingiz keldi! Iltimos, qabulxonaga o'ting.");
    utterance.lang = 'uz-UZ'; utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }

  setTimeout(() => {
    voiceNotification.classList.remove('active');
    setTimeout(() => voiceNotification.classList.add('hidden'), 400);
  }, 4000);
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    if (isNaN(target)) return;
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(easeOut * target).toLocaleString('uz-UZ') + suffix;
      if (progress < 1) requestAnimationFrame(updateCounter);
      else counter.textContent = target.toLocaleString('uz-UZ') + suffix;
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(updateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(counter);
  });
}

// ============================================
// 5. AUTH (Kirish/Ro'yxatdan o'tish)
// ============================================
function showAuthenticatedApp(account) {
  loadAccountProfile(account);
  const authSection = document.getElementById('auth-section');
  const app = document.getElementById('app');

  if (authSection) {
    authSection.style.display = 'none';
    authSection.classList.add('hidden');
  }
  if (app) {
    app.classList.remove('hidden');
    app.classList.add('animate-fadeIn');
  }
  const bottomNav = document.getElementById('mobile-bottom-nav');
  if (bottomNav) bottomNav.classList.remove('hidden');
  const doctorOnboardButton = document.querySelector('.doctor-onboard-btn');
  if (doctorOnboardButton) doctorOnboardButton.classList.remove('hidden');
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) scrollProgress.classList.remove('hidden');

  AppData.isLoggedIn = true;
  AppData.currentUser = {
    name: `${currentUserData.firstName} ${currentUserData.lastName}`.trim(),
    phone: currentUserData.phone,
    initial: currentUserData.firstName.charAt(0) || 'F',
    accountUsername: account.username
  };

  updateUserUI();
}

function showAuthSection() {
  const authSection = document.getElementById('auth-section');
  const app = document.getElementById('app');
  if (app) app.classList.add('hidden');
  const bottomNav = document.getElementById('mobile-bottom-nav');
  if (bottomNav) bottomNav.classList.add('hidden');
  const doctorOnboardButton = document.querySelector('.doctor-onboard-btn');
  if (doctorOnboardButton) doctorOnboardButton.classList.add('hidden');
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) scrollProgress.classList.add('hidden');
  if (authSection) {
    authSection.style.display = '';
    authSection.classList.remove('hidden');
  }
}

function showAuthMessage(formId, message) {
  const messageElement = document.getElementById(`${formId}-message`);
  if (messageElement) messageElement.textContent = message;
}

function saveAuthSession(username, remember) {
  localStorage.removeItem(AUTH_LOCAL_SESSION_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  const storage = remember ? localStorage : sessionStorage;
  const key = remember ? AUTH_LOCAL_SESSION_KEY : AUTH_SESSION_KEY;
  storage.setItem(key, username);
}

function findAccount(identifier) {
  const normalized = normalizeUsername(identifier);
  return getStoredAccounts().find(account =>
    account.username === normalized || (account.email && account.email.toLowerCase() === normalized)
  );
}

async function loginWithCredentials(loginInput, password, remember) {
  const account = findAccount(loginInput);
  if (!account) throw new Error('Akkaunt nomi/email yoki parol noto‘g‘ri.');

  const passwordData = await hashPassword(password, account.salt);
  if (passwordData.hash !== account.passwordHash) throw new Error('Akkaunt nomi/email yoki parol noto‘g‘ri.');

  saveAuthSession(account.username, remember);
  showAuthenticatedApp(account);
}

async function registerAccount({ firstName, lastName, usernameInput, phoneInput, email, password }) {
  const username = normalizeUsername(usernameInput);
  const phone = normalizePhone(phoneInput);
  if (!firstName.trim() || !lastName.trim()) throw new Error('Ism va familiyani kiriting.');
  if (!/^[a-z0-9._-]{3,24}$/.test(username)) throw new Error('Akkaunt nomi 3–24 belgi bo‘lsin (lotin harfi, raqam, nuqta, _ yoki -).');
  if (phoneInput.trim() && (phone.length < 9 || phone.length > 15)) throw new Error('Telefon raqamni to‘g‘ri kiriting.');
  if (password.length < 8) throw new Error('Parol kamida 8 ta belgidan iborat bo‘lsin.');

  const accounts = getStoredAccounts();
  if (accounts.some(account => account.username === username)) {
    throw new Error('Bu akkaunt nomi band. Boshqasini tanlang.');
  }
  if (email && accounts.some(account => account.email && account.email.toLowerCase() === email.trim().toLowerCase())) {
    throw new Error('Bu email bilan akkaunt mavjud. Kirish bo‘limidan tizimga kiring.');
  }

  const passwordData = await hashPassword(password);
  const account = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    username,
    usernameDisplay: usernameInput.trim(),
    phoneDisplay: phoneInput.trim(),
    email: email.trim(),
    salt: passwordData.salt,
    passwordHash: passwordData.hash
  };
  const profile = makeAccountProfile(account);

  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  localStorage.setItem(accountProfileKey(username), JSON.stringify(profile));
  saveAuthSession(username, true);
  showAuthenticatedApp(account);
}

function restoreAuthSession() {
  const username = localStorage.getItem(AUTH_LOCAL_SESSION_KEY) || sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!username) {
    showAuthSection();
    return;
  }

  let account;
  try {
    account = getStoredAccounts().find(storedAccount => storedAccount.username === normalizeUsername(username));
  } catch (error) {
    console.error('MedFlow akkauntlarini o‘qib bo‘lmadi:', error);
    localStorage.removeItem(AUTH_LOCAL_SESSION_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    showAuthSection();
    showAuthMessage('login', 'Akkaunt ma’lumotlarini o‘qib bo‘lmadi. Brauzer xotirasini tekshiring.');
    return;
  }
  if (!account) {
    localStorage.removeItem(AUTH_LOCAL_SESSION_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    showAuthSection();
    return;
  }
  showAuthenticatedApp(account);
}

function updateUserUI() {
  AppData.currentUser = {
    name: `${currentUserData.firstName} ${currentUserData.lastName}`.trim(),
    phone: currentUserData.phone,
    initial: currentUserData.firstName.charAt(0) || 'F',
    accountUsername: AppData.currentUser?.accountUsername || normalizeUsername(currentUserData.firstName)
  };
  const userInitial = document.getElementById('user-initial');
  const userName = document.getElementById('user-name');
  const dropdownInitial = document.getElementById('dropdown-initial');
  const dropdownName = document.getElementById('dropdown-name');
  const dropdownPhone = document.getElementById('dropdown-phone');

  if (userInitial) userInitial.textContent = AppData.currentUser.initial;
  if (userName) userName.textContent = AppData.currentUser.name;
  if (dropdownInitial) dropdownInitial.textContent = AppData.currentUser.initial;
  if (dropdownName) dropdownName.textContent = AppData.currentUser.name;
  if (dropdownPhone) dropdownPhone.textContent = AppData.currentUser.phone;
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  const targetTab = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
  const targetForm = document.getElementById(`${tab}-form`);

  if (targetTab) targetTab.classList.add('active');
  if (targetForm) targetForm.classList.add('active');
  showAuthMessage('login', '');
  showAuthMessage('register', '');
}

function logoutUser() {
  localStorage.removeItem(AUTH_LOCAL_SESSION_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  AppData.isLoggedIn = false;
  AppData.currentUser = null;
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
    dropdown.classList.add('hidden');
  }
  closeUserModal();
  showAuthSection();
  switchAuthTab('login');
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.reset();
  showAuthMessage('login', '');
  showToast("Tizimdan chiqdingiz.");
}

// ============================================
// 6. NAVIGATSIYA
// ============================================
function navigateTo(page) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  AppData.currentPage = page;
  if (window.location.hash !== `#${page}`) {
    window.history.pushState({ page }, '', `#${page}`);
  }

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });

  const doctorsSection = document.getElementById('doctors-section');
  if (doctorsSection) {
    doctorsSection.classList.add('hidden');
    doctorsSection.classList.remove('active');
  }

  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');
    targetPage.classList.add('animate-fadeIn');
    if (typeof AOS !== 'undefined') AOS.refreshHard();
  }

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) link.classList.add('active');
  });

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    mobileMenu.classList.add('hidden');
  }

  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  root.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
  if (page === 'favorites') renderFavoriteDoctors();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const validPages = ['home', 'specialties', 'clinics', 'clinic-dashboard', 'features', 'favorites', 'doctors', 'contact'];
  if (validPages.includes(hash) && hash !== AppData.currentPage) {
    navigateTo(hash);
  }
}

function scrollToSpecialties() {
  const el = document.getElementById('specialties');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// 7. MAVZU (Theme)
// ============================================
function toggleTheme() {
  const body = document.body;
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');

  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    AppData.theme = 'light';
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    AppData.theme = 'dark';
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
  }

  try { localStorage.setItem('medflow-theme', AppData.theme); } catch (e) {}
}

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem('medflow-theme');
    AppData.theme = savedTheme === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode', AppData.theme === 'light');
    document.body.classList.toggle('dark-mode', AppData.theme === 'dark');
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    if (sunIcon) sunIcon.classList.toggle('hidden', AppData.theme === 'light');
    if (moonIcon) moonIcon.classList.toggle('hidden', AppData.theme === 'dark');
  } catch (e) {}
}

// ============================================
// 8. QIDIRUV
// ============================================
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('search-results');

  if (!query) {
    if (resultsContainer) resultsContainer.classList.remove('active');
    document.querySelectorAll('.specialty-card').forEach(card => { card.style.display = ''; });
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.classList.add('hidden');
    return;
  }

  const matchedDoctors = AppData.doctors.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.specialty.toLowerCase().includes(query) ||
    d.location.city.toLowerCase().includes(query)
  );

  const matchedSpecialties = AppData.specialties.filter(s =>
    s.name.toLowerCase().includes(query)
  );

  if (resultsContainer) {
    if (matchedDoctors.length === 0 && matchedSpecialties.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 16px; color: var(--text-muted); text-align: center;">Hech narsa topilmadi</div>';
    } else {
      resultsContainer.innerHTML = `
        ${matchedSpecialties.map(s => `
          <div class="search-result-item" onclick="showDoctorsBySpecialty('${s.id}')" style="padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background=''">
            <i data-lucide="stethoscope" style="width: 16px; height: 16px; color: var(--primary-400);"></i>
            <span style="font-weight: 600;">${s.name}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">Mutaxassislik</span>
          </div>
        `).join('')}
        ${matchedDoctors.map(d => `
          <div class="search-result-item" onclick="openDoctorModal(${d.id})" style="padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background=''">
            <img src="${d.image}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${d.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${d.specialty} | ${d.location.city}</div>
            </div>
          </div>
        `).join('')}
      `;
    }
    resultsContainer.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const specialtyCards = document.querySelectorAll('.specialty-card');
  let hasVisible = false;
  specialtyCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = '';
      hasVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('no-results');
  if (noResults) noResults.classList.toggle('hidden', hasVisible);
}

// ============================================
// 9. DROPDOWN VA BILDIRISHNOMALAR
// ============================================
function initUserDropdown() {
  const trigger = document.getElementById('user-menu-trigger');
  const dropdown = document.getElementById('user-dropdown');

  if (!trigger || !dropdown) return;

  const setOpen = open => {
    dropdown.classList.toggle('active', open);
    dropdown.classList.toggle('hidden', !open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    setOpen(!dropdown.classList.contains('active'));
  });

  document.addEventListener('click', function(e) {
    if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dropdown.classList.contains('active')) {
      setOpen(false);
      trigger.focus();
    }
  });
}

function showNotifications() {
  let panel = document.getElementById('notifications-panel');
  if (panel && panel.classList.contains('active')) {
    closeNotificationsPanel();
    return;
  }

  const notifications = [
    { id: 1, title: 'Navbat yaqinlashmoqda', desc: 'Dr. Azizov qabuliga 15 daqiqa qoldi', time: '2 daqiqa oldin', type: 'info', read: false },
    { id: 2, title: 'Tashrif yakunlandi', desc: 'Dr. Karimova qabulidan tibbiy xulosa tayyor', time: '1 soat oldin', type: 'success', read: false },
    { id: 3, title: "Aksiya!", desc: 'Kardiologiya qabulida 20% chegirma', time: '3 soat oldin', type: 'promo', read: false }
  ];

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'notifications-panel';
    panel.className = 'notifications-panel hidden';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Bildirishnomalar');
    document.body.appendChild(panel);
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  panel.innerHTML = `
    <div class="notifications-header">
      <h4><i data-lucide="bell"></i> Bildirishnomalar <span>${unreadCount}</span></h4>
      <button class="btn-icon-only" onclick="closeNotificationsPanel()" style="width: 32px; height: 32px;">
        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
      </button>
    </div>
    <div class="notifications-list">
      ${notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" onclick="markNotificationRead(${n.id})">
          <div class="notification-icon ${n.type}">
            <i data-lucide="${n.type === 'info' ? 'info' : n.type === 'success' ? 'check-circle' : 'gift'}"></i>
          </div>
          <div class="notification-content">
            <h5>${n.title} ${!n.read ? '<span class="notification-dot"></span>' : ''}</h5>
            <p>${n.desc}</p>
          </div>
          <span class="notification-time">${n.time}</span>
        </div>
      `).join('')}
    </div>
    <div class="notifications-footer">
      <a href="#" onclick="event.preventDefault(); showToast('Barcha bildirishnomalar ko\'rildi'); closeNotificationsPanel();">Barchasini o'qish</a>
    </div>
  `;

  panel.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('active'));
  const trigger = document.getElementById('notifications-btn');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeNotificationsPanel() {
  const panel = document.getElementById('notifications-panel');
  if (panel) {
    panel.classList.remove('active');
    setTimeout(() => panel.classList.add('hidden'), 300);
  }
  const trigger = document.getElementById('notifications-btn');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function markNotificationRead(id) {
  showToast("Bildirishnoma o'qildi");
  const badge = document.querySelector('.notification-badge');
  if (badge) {
    const current = parseInt(badge.textContent) || 0;
    if (current > 0) badge.textContent = current - 1;
  }
}

// ============================================
// 10. MOBILE NAV & SCROLL
// ============================================
function initMobileBottomNav() {
  let bottomNav = document.getElementById('mobile-bottom-nav');

  if (!bottomNav) {
    bottomNav = document.createElement('nav');
    bottomNav.id = 'mobile-bottom-nav';
    bottomNav.className = 'mobile-bottom-nav';
    if (!AppData.isLoggedIn) bottomNav.classList.add('hidden');
    bottomNav.innerHTML = `
      <a href="#home" class="bottom-nav-item active" data-page="home" onclick="navigateTo('home'); return false;">
        <i data-lucide="home"></i><span>${translate('bottom.home', 'Bosh sahifa')}</span>
      </a>
      <a href="#specialties" class="bottom-nav-item" data-page="specialties" onclick="navigateTo('specialties'); return false;">
        <i data-lucide="stethoscope"></i><span>${translate('bottom.specialties', "Yo'nalishlar")}</span>
      </a>
      <a href="#doctors" class="bottom-nav-item" data-page="doctors" onclick="navigateTo('doctors'); return false;">
        <i data-lucide="users"></i><span>${translate('bottom.doctors', 'Shifokorlar')}</span>
      </a>
      <a href="#favorites" class="bottom-nav-item" data-page="favorites" onclick="navigateTo('favorites'); return false;">
        <i data-lucide="heart"></i><span>${translate('bottom.favorites', 'Sevimlilar')}</span>
      </a>
      <a href="#contact" class="bottom-nav-item" data-page="contact" onclick="navigateTo('contact'); return false;">
        <i data-lucide="message-circle"></i><span>${translate('bottom.contact', 'Aloqa')}</span>
      </a>
    `;
    document.body.appendChild(bottomNav);
  }

  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === AppData.currentPage);
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function initScrollToTop() {
  let btn = document.getElementById('scroll-to-top');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top hidden';
    btn.innerHTML = '<i data-lucide="chevron-up"></i>';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 500) {
      btn.classList.remove('hidden');
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }, 100));
}

function initScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  if (!AppData.isLoggedIn) progress.classList.add('hidden');
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Sahifa bo‘yicha holat');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  document.body.appendChild(progress);

  let scheduled = false;
  const update = () => {
    scheduled = false;
    const root = document.documentElement;
    const maxScroll = root.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0
      ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100))
      : 0;
    progress.style.transform = `scaleX(${percent / 100})`;
    progress.setAttribute('aria-valuenow', String(Math.round(percent)));
  };
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  update();
}

function showVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('active'));
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.remove('active');
}

// ============================================
// 11. RENDERLASH
// ============================================
function renderSpecialties() {
  const grid = document.getElementById('specialties-grid');
  const count = document.getElementById('specialty-count');
  if (!grid) return;

  if (count) count.textContent = AppData.specialties.length + " ta yo'nalish";

  grid.innerHTML = AppData.specialties.map((s, index) => `
    <div class="specialty-card" data-aos="fade-up" data-aos-delay="${index * 100}" onclick="showDoctorsBySpecialty('${s.id}')">
      <div class="specialty-gradient ${s.color}"></div>
      <div class="card-shine"></div>
      <div class="specialty-icon">
        <i data-lucide="${s.icon}"></i>
      </div>
      <h3 class="specialty-name">${getSpecialtyLabel(s.id, s.name)}</h3>
      <p class="specialty-desc">${currentLanguage === 'ru' ? getRussianSpecialtyDescription(s.id) : s.description}</p>
      <div class="specialty-footer">
        <span class="specialty-count">${AppData.doctors.filter(doctor => doctor.specialtyId === s.id).length} ${currentLanguage === 'ru' ? 'врача' : 'ta shifokor'}</span>
        <i data-lucide="arrow-right" class="specialty-arrow"></i>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
  updateFavoriteButtons();
  refreshScrollAnimations();
}

function getRussianSpecialtyDescription(specialtyId) {
  const descriptions = {
    cardiology: 'Заболевания сердца и сосудов',
    neurology: 'Заболевания нервной системы и головного мозга',
    pediatrics: 'Здоровье и заболевания детей',
    dermatology: 'Заболевания кожи',
    orthopedics: 'Заболевания костей и суставов',
    gynecology: 'Женское здоровье',
    dentistry: 'Здоровье зубов и полости рта',
    ophthalmology: 'Заболевания глаз'
  };
  return descriptions[specialtyId] || '';
}

function renderClinics() {
  const grid = document.getElementById('clinics-grid');
  if (!grid) return;

  const clinics = [...new Set(AppData.doctors.map(doctor => doctor.clinic))];
  grid.innerHTML = clinics.map((clinic, index) => {
    const doctors = AppData.doctors.filter(doctor => doctor.clinic === clinic);
    const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
    const city = doctors[0].location.city;
    const startingPrice = Math.min(...doctors.map(doctor => doctor.price));
    return `
      <article class="clinic-card" data-aos="fade-up" data-aos-delay="${index * 60}">
        <div class="clinic-card-icon"><i data-lucide="building-2"></i></div>
        <span class="clinic-card-city"><i data-lucide="map-pin"></i> ${city}</span>
        <h3>${clinic}</h3>
        <p>${doctors.length} ${currentLanguage === 'ru' ? 'врача' : 'ta shifokor'} · ${specialties.map(specialty => {
          const item = AppData.specialties.find(entry => entry.name === specialty);
          return getSpecialtyLabel(item?.id, specialty);
        }).join(', ')}</p>
        <div class="clinic-card-footer"><span>${currentLanguage === 'ru' ? 'Приём от' : 'Qabul'} <strong>${startingPrice.toLocaleString('uz-UZ')} so‘m</strong></span>
          <button type="button" class="btn btn-primary btn-sm" onclick="filterDoctorsByClinic('${clinic.replace(/'/g, "\\'")}')">${currentLanguage === 'ru' ? 'Врачи' : 'Shifokorlar'} <i data-lucide="arrow-right"></i></button>
        </div>
      </article>
    `;
  }).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  refreshScrollAnimations();
}

function getAvailabilityOverrides() {
  try {
    return JSON.parse(localStorage.getItem('medflow-doctor-availability') || '{}');
  } catch (error) {
    console.error('MedFlow qabul jadvalini o‘qib bo‘lmadi:', error);
    return {};
  }
}

function isDoctorAvailableToday(doctor) {
  const overrides = getAvailabilityOverrides();
  if (Object.prototype.hasOwnProperty.call(overrides, doctor.id)) return Boolean(overrides[doctor.id]);
  const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  return doctor.schedule.some(slot => slot.day === dayNames[new Date().getDay()]);
}

function renderClinicDashboard() {
  const select = document.getElementById('clinic-dashboard-select');
  const list = document.getElementById('clinic-dashboard-list');
  const stats = document.getElementById('clinic-dashboard-stats');
  if (!select || !list || !stats) return;

  const clinics = [...new Set(AppData.doctors.map(doctor => doctor.clinic))];
  const previous = select.value || localStorage.getItem('medflow-demo-clinic') || clinics[0];
  select.innerHTML = clinics.map(clinic => `<option value="${clinic}">${clinic}</option>`).join('');
  select.value = clinics.includes(previous) ? previous : clinics[0];
  localStorage.setItem('medflow-demo-clinic', select.value);

  const doctors = AppData.doctors.filter(doctor => doctor.clinic === select.value);
  const accepting = doctors.filter(isDoctorAvailableToday).length;
  const upcoming = currentUserData.appointments.filter(appointment => appointment.clinic === select.value && appointment.status === 'upcoming').length;
  stats.innerHTML = `
    <article><i data-lucide="users-round"></i><strong>${doctors.length}</strong><span>${translate('clinicDashboard.doctors', 'Shifokorlar')}</span></article>
    <article><i data-lucide="calendar-check"></i><strong>${accepting}</strong><span>${translate('clinicDashboard.today', 'Bugun qabul bor')}</span></article>
    <article><i data-lucide="calendar-clock"></i><strong>${upcoming}</strong><span>${translate('clinicDashboard.appointments', 'Demo navbatlar')}</span></article>
  `;
  list.innerHTML = `
    <div class="clinic-dashboard-list-heading"><h3>${select.value}</h3><span>${translate('clinicDashboard.todayStatus', 'Bugungi qabul holati')}</span></div>
    ${doctors.map(doctor => `
      <article class="clinic-dashboard-doctor">
        <img src="${doctor.image}" alt="${doctor.name}" loading="lazy">
        <div><strong>${doctor.name}</strong><span>${getSpecialtyLabel(doctor.specialtyId, doctor.specialty)} · ${doctor.hours}</span></div>
        <label><input type="checkbox" ${isDoctorAvailableToday(doctor) ? 'checked' : ''} onchange="setDoctorTodayAvailability(${doctor.id}, this.checked)"><span>${translate('clinicDashboard.toggle', 'Bugun qabul')}</span></label>
      </article>
    `).join('')}
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setDoctorTodayAvailability(doctorId, isAvailable) {
  const overrides = getAvailabilityOverrides();
  overrides[doctorId] = isAvailable;
  localStorage.setItem('medflow-doctor-availability', JSON.stringify(overrides));
  renderClinicDashboard();
  if (AppData.currentPage === 'doctors') filterDoctors();
  showToast(translate('clinicDashboard.saved', 'Demo jadval shu brauzerda yangilandi'));
}

function filterDoctorsByClinic(clinic) {
  navigateTo('doctors');
  ['city-filter', 'specialty-filter', 'rating-filter', 'price-filter', 'sort-filter'].forEach(id => {
    const filter = document.getElementById(id);
    if (filter) filter.value = '';
  });
  const todayFilter = document.getElementById('today-filter');
  if (todayFilter) todayFilter.checked = false;
  AppData.searchQuery = '';
  const search = document.getElementById('search-input');
  if (search) search.value = '';
  const filter = document.getElementById('clinic-filter');
  if (filter) {
    filter.value = clinic;
    filterDoctors();
  }
}

function renderFavoriteDoctors() {
  const grid = document.getElementById('favorites-grid');
  if (!grid) return;
  const favoriteIds = JSON.parse(localStorage.getItem('medflow-favorites') || '[]');
  const favorites = AppData.doctors.filter(doctor => favoriteIds.includes(doctor.id));

  grid.innerHTML = favorites.length
    ? favorites.map((doctor, index) => createDoctorCard(doctor, index)).join('')
    : `<div class="favorites-empty"><i data-lucide="heart"></i><h3>Hali sevimli shifokor yo‘q</h3><p>Shifokor kartasidagi yurak belgisini bosib, uni shu yerga saqlang.</p><button class="btn btn-primary" type="button" onclick="navigateTo('doctors')">Shifokorlarni ko‘rish <i data-lucide="arrow-right"></i></button></div>`;

  if (typeof lucide !== 'undefined') lucide.createIcons();
  updateFavoriteButtons();
  refreshScrollAnimations();
}

function renderDoctors() {
  const grid = document.getElementById('doctors-grid-full');
  if (!grid) return;

  grid.innerHTML = AppData.doctors.map((d, index) => createDoctorCard(d, index)).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  updateFavoriteButtons();
  refreshScrollAnimations();
}

function renderDashboardOverview() {
  const grid = document.getElementById('dashboard-doctors');
  if (!grid) return;

  grid.innerHTML = AppData.doctors.slice(0, 4)
    .map((doctor, index) => createDoctorCard(doctor, index))
    .join('');
  updateFavoriteButtons();

  const nextDoctor = AppData.doctors.find(doctor => doctor.online) || AppData.doctors[0];
  if (nextDoctor) {
    const doctorName = document.getElementById('dashboard-queue-doctor');
    const specialty = document.getElementById('dashboard-queue-specialty');
    const position = document.getElementById('dashboard-queue-position');
    const wait = document.getElementById('dashboard-queue-time');
    const clinic = document.getElementById('dashboard-queue-clinic');
    const avatar = document.querySelector('.next-queue-avatar');
    const panel = document.querySelector('.next-queue-panel');

    if (doctorName) doctorName.textContent = nextDoctor.name;
    if (specialty) specialty.textContent = nextDoctor.specialty;
    if (position) position.textContent = `#${nextDoctor.queue.current}`;
    if (wait) wait.textContent = `${nextDoctor.queue.waitTime} daqiqa`;
    if (clinic) clinic.textContent = nextDoctor.clinic;
    if (avatar) avatar.innerHTML = `<img src="${nextDoctor.image}" alt="${nextDoctor.name}" loading="lazy">`;
    if (panel) panel.querySelectorAll('[onclick="openDashboardDoctor()"]').forEach(button => {
      button.dataset.doctorId = String(nextDoctor.id);
    });
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
  updateFavoriteButtons();
  refreshScrollAnimations();
}

function openDashboardDoctor() {
  const button = document.querySelector('.next-queue-panel [data-doctor-id]');
  const doctorId = Number(button?.dataset.doctorId);
  if (doctorId) openDoctorModal(doctorId);
}

function refreshScrollAnimations() {
  if (typeof AOS !== 'undefined') AOS.refreshHard();
}

function populateFilters() {
  const specialtyFilter = document.getElementById('specialty-filter');
  if (specialtyFilter) {
    specialtyFilter.innerHTML = `
      <option value="">Barcha mutaxassisliklar</option>
      ${AppData.specialties.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
    `;
  }
  const clinicFilter = document.getElementById('clinic-filter');
  if (clinicFilter) {
    clinicFilter.innerHTML = `<option value="">Barcha klinikalar</option>${[...new Set(AppData.doctors.map(doctor => doctor.clinic))]
      .map(clinic => `<option value="${clinic}">${clinic}</option>`).join('')}`;
  }
}

function showDoctorsBySpecialty(specialtyId) {
  const specialty = AppData.specialties.find(s => s.id === specialtyId);
  if (!specialty) return;

  navigateTo('doctors');
  ['city-filter', 'rating-filter', 'clinic-filter', 'price-filter', 'sort-filter'].forEach(id => {
    const filter = document.getElementById(id);
    if (filter) filter.value = '';
  });
  const todayFilter = document.getElementById('today-filter');
  if (todayFilter) todayFilter.checked = false;
  AppData.searchQuery = '';
  const search = document.getElementById('search-input');
  if (search) search.value = '';
  const specialtyFilter = document.getElementById('specialty-filter');
  if (specialtyFilter) specialtyFilter.value = specialtyId;
  filterDoctors();
}

// ============================================
// 12. SHIFOKOR DETAL MODALI
// ============================================
function openDoctorModal(doctorId) {
  const doctor = AppData.doctors.find(d => d.id === doctorId);
  if (!doctor) return;

  AppData.selectedDoctor = doctor;

  const els = {
    'modal-doctor-img': { attr: 'src', val: doctor.image },
    'modal-doctor-name': { text: doctor.name },
    'modal-doctor-specialty': { text: getSpecialtyLabel(doctor.specialtyId, doctor.specialty) },
    'modal-doctor-rating': { text: doctor.rating.toFixed(1) },
    'modal-doctor-reviews': { text: doctor.reviews },
    'modal-doctor-exp': { text: `${doctor.experience} ${currentLanguage === 'ru' ? 'лет' : 'yil'}` },
    'modal-doctor-edu': { text: doctor.education },
    'modal-doctor-clinic': { text: doctor.clinic },
    'modal-doctor-location': { text: `${doctor.location.city}, ${doctor.location.district}${doctor.location.village ? ', ' + doctor.location.village : ''}` },
    'modal-doctor-hours': { text: doctor.hours },
    'modal-doctor-price': { text: doctor.price.toLocaleString('uz-UZ') + " so'm" },
    'modal-doctor-about': { text: doctor.about },
    'modal-doctor-phone': { text: doctor.phone },
    'modal-doctor-email': { text: doctor.email },
    'modal-queue-current': { text: doctor.queue.current },
    'modal-queue-wait': { text: doctor.queue.waitTime + ' daqiqa' }
  };

  Object.entries(els).forEach(([id, data]) => {
    const el = document.getElementById(id);
    if (el) {
      if (data.attr) el.setAttribute(data.attr, data.val);
      else if (data.text) el.textContent = data.text;
    }
  });

  const starsContainer = document.getElementById('modal-doctor-stars');
  if (starsContainer) {
    starsContainer.innerHTML = Array(5).fill(0).map((_, i) =>
      `<i data-lucide="star" ${i < Math.floor(doctor.rating) ? 'fill="currentColor" style="color: var(--amber-400);"' : 'style="color: var(--text-muted);"'}></i>`
    ).join('');
  }

  const statusEl = document.getElementById('modal-doctor-status');
  if (statusEl) {
    if (doctor.online) {
      statusEl.className = 'doctor-status online';
      statusEl.innerHTML = '<span></span> Onlayn';
    } else {
      statusEl.className = 'doctor-status offline';
      statusEl.innerHTML = '<span></span> Offlayn';
    }
  }

  const scheduleGrid = document.getElementById('modal-doctor-schedule');
  if (scheduleGrid) {
    scheduleGrid.innerHTML = doctor.schedule.map(s => `
      <div class="schedule-item">
        <span class="schedule-day">${s.day}</span>
        <span class="schedule-time">${s.time}</span>
      </div>
    `).join('');
  }

  const modal = document.getElementById('doctor-modal');
  if (modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function showAppointmentPreparation() {
  const doctor = AppData.selectedDoctor;
  if (!doctor) return;
  let modal = document.getElementById('appointment-prep-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'appointment-prep-modal';
    modal.className = 'modal hidden';
    document.body.appendChild(modal);
  }
  const points = currentLanguage === 'ru'
    ? [
      'Возьмите документ, удостоверяющий личность, и результаты предыдущих обследований.',
      'Запишите список принимаемых лекарств и известных аллергий.',
      'Запланируйте прибыть за 10–15 минут до приёма для регистрации.',
      'Не меняйте приём лекарств или лечение без консультации врача.'
    ]
    : [
      'Shaxsni tasdiqlovchi hujjat va oldingi tibbiy tekshiruv natijalarini olib keling.',
      'Qabul qilayotgan dorilar va ma’lum allergiyalaringiz ro‘yxatini yozib oling.',
      'Ro‘yxatdan o‘tish uchun qabuldan 10–15 daqiqa oldin kelishni rejalashtiring.',
      'Dori yoki davolash tartibini shifokor bilan maslahatlashmasdan o‘zgartirmang.'
    ];
  const preparationTitle = currentLanguage === 'ru' ? 'Подготовка к приёму' : 'Qabulga tayyorgarlik';
  const generalNote = currentLanguage === 'ru'
    ? 'Это общая организационная памятка, а не медицинская консультация или диагноз.'
    : 'Bu umumiy tashkiliy eslatma, tibbiy maslahat yoki tashxis emas.';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeAppointmentPreparation()"></div>
    <div class="modal-content preparation-modal-content">
      <button type="button" class="modal-close" onclick="closeAppointmentPreparation()" aria-label="Yopish"><i data-lucide="x"></i></button>
      <div class="preparation-heading"><span><i data-lucide="clipboard-check"></i></span><div><h3>${preparationTitle}</h3><p>${doctor.name} · ${getSpecialtyLabel(doctor.specialtyId, doctor.specialty)}</p></div></div>
      <ul>${points.map(point => `<li><i data-lucide="check"></i><span>${point}</span></li>`).join('')}</ul>
      <p class="demo-disclaimer">${generalNote}</p>
      <button type="button" class="btn btn-primary btn-full" onclick="closeAppointmentPreparation()">${currentLanguage === 'ru' ? 'Понятно' : 'Tushunarli'}</button>
    </div>
  `;
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('active'));
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeAppointmentPreparation() {
  const modal = document.getElementById('appointment-prep-modal');
  if (modal) modal.classList.remove('active');
}

function filterDoctors() {
  const cityFilter = document.getElementById('city-filter');
  const specialtyFilter = document.getElementById('specialty-filter');
  const ratingFilter = document.getElementById('rating-filter');

  const city = cityFilter ? cityFilter.value : '';
  const specialty = specialtyFilter ? specialtyFilter.value : '';
  const rating = ratingFilter ? parseFloat(ratingFilter.value) : 0;
  const clinic = document.getElementById('clinic-filter')?.value || '';
  const maxPrice = Number(document.getElementById('price-filter')?.value || 0);
  const todayOnly = Boolean(document.getElementById('today-filter')?.checked);
  const sortBy = document.getElementById('sort-filter')?.value || '';
  const query = (AppData.searchQuery || '').trim().toLocaleLowerCase();

  let filtered = AppData.doctors;

  if (query) {
    filtered = filtered.filter(d =>
      `${d.name} ${d.specialty} ${d.location.city} ${d.location.district} ${d.clinic}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }

  if (city) {
    filtered = filtered.filter(d => d.location.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (specialty) {
    filtered = filtered.filter(d => d.specialtyId === specialty);
  }

  if (rating > 0) {
    filtered = filtered.filter(d => d.rating >= rating);
  }
  if (clinic) filtered = filtered.filter(d => d.clinic === clinic);
  if (maxPrice) filtered = filtered.filter(d => d.price <= maxPrice);
  if (todayOnly) filtered = filtered.filter(isDoctorAvailableToday);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'experience') filtered = [...filtered].sort((a, b) => b.experience - a.experience);

  const grid = document.getElementById('doctors-grid-full');
  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1;">
          <div class="no-results-icon"><i data-lucide="search-x"></i></div>
          <h3>Shifokorlar topilmadi</h3>
          <p>Boshqa filter parametrlarini tanlang</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map((d, i) => createDoctorCard(d, i)).join('');
    }
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
  if (typeof AOS !== 'undefined') AOS.refresh();
  updateFavoriteButtons();
  renderDoctorCompareBar();
}

function toggleDoctorCompare(doctorId) {
  const selected = AppData.compareDoctorIds;
  const index = selected.indexOf(doctorId);
  if (index >= 0) {
    selected.splice(index, 1);
  } else if (selected.length >= 3) {
    showToast('Bir vaqtda ko‘pi bilan 3 ta shifokorni solishtirish mumkin', 'warning');
    return;
  } else {
    selected.push(doctorId);
  }
  document.querySelectorAll(`.doctor-compare-toggle[onclick*="(${doctorId})"]`).forEach(button => {
    const active = selected.includes(doctorId);
    button.setAttribute('aria-pressed', String(active));
    button.innerHTML = `<i data-lucide="${active ? 'check' : 'columns-2'}"></i><span>${active ? 'Tanlandi' : 'Solishtirish'}</span>`;
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
  renderDoctorCompareBar();
}

function renderDoctorCompareBar() {
  const bar = document.getElementById('doctor-compare-bar');
  if (!bar) return;
  const doctors = AppData.compareDoctorIds.map(id => AppData.doctors.find(doctor => doctor.id === id)).filter(Boolean);
  bar.classList.toggle('hidden', doctors.length === 0);
  if (!doctors.length) {
    bar.innerHTML = '';
    return;
  }
  bar.innerHTML = `
    <span><i data-lucide="columns-2"></i> Solishtirish uchun ${doctors.length}/3 shifokor tanlandi</span>
    <div><button type="button" class="btn btn-primary btn-sm" onclick="openDoctorComparison()" ${doctors.length < 2 ? 'disabled' : ''}>Solishtirish</button>
    <button type="button" class="btn btn-secondary btn-sm" onclick="clearDoctorCompare()">Tozalash</button></div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openDoctorComparison() {
  const doctors = AppData.compareDoctorIds.map(id => AppData.doctors.find(doctor => doctor.id === id)).filter(Boolean);
  if (doctors.length < 2) {
    showToast('Solishtirish uchun kamida 2 ta shifokor tanlang', 'warning');
    return;
  }
  const rows = [
    ['Mutaxassislik', doctor => doctor.specialty],
    ['Reyting', doctor => `${doctor.rating} / 5 (${doctor.reviews} sharh)`],
    ['Tajriba', doctor => `${doctor.experience} yil`],
    ['Qabul narxi', doctor => `${doctor.price.toLocaleString('uz-UZ')} so‘m`],
    ['Klinika', doctor => doctor.clinic],
    ['Manzil', doctor => `${doctor.location.city}, ${doctor.location.district}`],
    ['Bugungi jadval', doctor => isDoctorAvailableToday(doctor) ? 'Qabul bor' : 'Bugun qabul yo‘q'],
    ['Kutish vaqti', doctor => `${doctor.queue.waitTime} daqiqa`]
  ];
  let modal = document.getElementById('doctor-comparison-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'doctor-comparison-modal';
    modal.className = 'modal hidden';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeDoctorComparison()"></div>
    <div class="modal-content modal-large comparison-modal-content">
      <button type="button" class="modal-close" onclick="closeDoctorComparison()" aria-label="Yopish"><i data-lucide="x"></i></button>
      <div class="modal-header"><h3>Shifokorlarni solishtirish</h3></div>
      <div class="comparison-table-wrap"><table class="comparison-table">
        <thead><tr><th>Ko‘rsatkich</th>${doctors.map(doctor => `<th><img src="${doctor.image}" alt=""><strong>${doctor.name}</strong><small>${doctor.clinic}</small></th>`).join('')}</tr></thead>
        <tbody>${rows.map(([label, getter]) => `<tr><th>${label}</th>${doctors.map(doctor => `<td>${getter(doctor)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
      <p class="demo-disclaimer">Reyting va jadval demo ma’lumotlari; qabul vaqtini klinikadan tasdiqlang.</p>
    </div>
  `;
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('active'));
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeDoctorComparison() {
  const modal = document.getElementById('doctor-comparison-modal');
  if (modal) modal.classList.remove('active');
}

function clearDoctorCompare() {
  AppData.compareDoctorIds = [];
  document.querySelectorAll('.doctor-compare-toggle').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = '<i data-lucide="columns-2"></i><span>Solishtirish</span>';
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
  renderDoctorCompareBar();
}

// ============================================
// 13. NAVBAT, TO'LOV, BAHOLASH
// ============================================
function bookQueue() {
  if (!AppData.selectedDoctor) return;
  openPaymentModal();
}

function showCelebration(doctorName, time) {
  const modal = document.getElementById('celebration-modal');
  const celebrationDoctor = document.getElementById('celebration-doctor');
  const celebrationTime = document.getElementById('celebration-time');

  if (celebrationDoctor) celebrationDoctor.textContent = doctorName || 'Dr. Azizov';
  if (celebrationTime) celebrationTime.textContent = time || '14:30';

  if (modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  triggerConfetti();
  if (AppData.soundEnabled) playSuccessSound();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeCelebration() {
  const modal = document.getElementById('celebration-modal');
  if (modal) modal.classList.remove('active');
}

function rateDoctor() {
  closeQueueModal();

  const modal = document.getElementById('rating-modal');
  if (modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.remove('active');
    const icon = btn.querySelector('i');
    if (icon) icon.setAttribute('fill', 'none');
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeRatingModal() {
  const modal = document.getElementById('rating-modal');
  if (modal) modal.classList.remove('active');
}

function submitRating() {
  const activeStars = document.querySelectorAll('.star-btn.active');
  const rating = activeStars.length;

  if (rating === 0) {
    showToast('Iltimos, reyting tanlang!', 'warning');
    return;
  }

  const textarea = document.querySelector('#rating-modal textarea');
  const text = textarea ? textarea.value : '';

  if (AppData.selectedDoctor) {
    currentUserData.reviews.unshift({
      id: Date.now(),
      doctor: AppData.selectedDoctor.name,
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      text: text || 'Juda yaxshi xizmat!',
      helpful: 0
    });
    currentUserData.reviewsCount++;
  }

  closeRatingModal();
  showToast('Rahmat! Bahoyingiz qabul qilindi.', 'success');
  triggerConfetti();
}

// ============================================
// 14. NAVBAT KUZATUVI
// ============================================
function openQueueModal() {
  const modal = document.getElementById('queue-modal');
  if (!modal) return;

  const doctor = AppData.selectedDoctor;
  if (!doctor) return;

  document.getElementById('modal-doctor').textContent = doctor.name;
  document.getElementById('modal-specialty').textContent = doctor.specialty;
  document.getElementById('modal-time').textContent = doctor.queue.waitTime + ' daqiqa';
  document.getElementById('modal-phone').textContent = doctor.phone;

  AppData.currentQueuePosition = doctor.queue.current + 1;
  updateQueueDisplay();
  startQueueSimulation();

  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('active'));

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function startQueueSimulation() {
  if (AppData.queueInterval) clearInterval(AppData.queueInterval);

  AppData.queueInterval = setInterval(() => {
    if (AppData.currentQueuePosition > 1) {
      AppData.currentQueuePosition--;
      updateQueueDisplay();
      if (AppData.soundEnabled) playBeep();
    } else if (AppData.currentQueuePosition === 1) {
      clearInterval(AppData.queueInterval);
      AppData.currentQueuePosition = 0;
      updateQueueDisplay();
      showQueueAlert();
    }
  }, 8000);
}

function updateQueueDisplay() {
  const positionEl = document.getElementById('queue-position');
  const progressCircle = document.getElementById('progress-circle');

  if (positionEl) positionEl.textContent = AppData.currentQueuePosition;

  if (progressCircle) {
    const circumference = 2 * Math.PI * 56;
    const progress = AppData.currentQueuePosition > 0
      ? (AppData.currentQueuePosition / 10) * circumference
      : 0;
    progressCircle.style.strokeDasharray = `${circumference - progress} ${circumference}`;
    progressCircle.style.strokeDashoffset = '0';
  }
}

function showQueueAlert() {
  const alert = document.getElementById('queue-alert');
  const success = document.getElementById('queue-success');

  if (alert) {
    alert.classList.remove('hidden');
    alert.classList.add('active');
  }

  if (AppData.soundEnabled) playAlertSound();
  if (AppData.notificationsEnabled) showVoiceNotification("Navbatingiz keldi! Iltimos, qabulxonaga o'ting.");

  setTimeout(() => {
    if (alert) alert.classList.add('hidden');
    if (success) {
      success.classList.remove('hidden');
      success.classList.add('active');
    }
    if (AppData.soundEnabled) playSuccessSound();
    triggerConfetti();
  }, 4000);
}

function closeQueueModal() {
  const modal = document.getElementById('queue-modal');
  if (modal) modal.classList.remove('active');

  if (AppData.queueInterval) {
    clearInterval(AppData.queueInterval);
    AppData.queueInterval = null;
  }

  setTimeout(() => {
    const alert = document.getElementById('queue-alert');
    const success = document.getElementById('queue-success');
    if (alert) alert.classList.add('hidden');
    if (success) success.classList.add('hidden');
  }, 400);
}

// ============================================
// 15. TO'LOV TIZIMI
// ============================================
function openPaymentModal() {
  const doctor = AppData.selectedDoctor;
  if (!doctor) return;

  currentPaymentAmount = doctor.price;

  const els = {
    'payment-doctor': doctor.name,
    'payment-specialty': doctor.specialty,
    'payment-time': new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    'payment-amount': doctor.price.toLocaleString('uz-UZ') + " so'm",
    'pay-btn-amount': doctor.price.toLocaleString('uz-UZ') + " so'm"
  };

  Object.entries(els).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });

  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  initCardFormatting();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) modal.classList.remove('active');
}

function initCardFormatting() {
  const cardNumber = document.getElementById('card-number');
  const cardExpiry = document.getElementById('card-expiry');
  const cardCvv = document.getElementById('card-cvv');
  const cardLogo = document.getElementById('card-logo');

  if (cardNumber) {
    cardNumber.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.substring(0, 16);
      const parts = [];
      for (let i = 0; i < value.length; i += 4) parts.push(value.substring(i, i + 4));
      e.target.value = parts.join(' ');

      if (cardLogo) {
        if (value.startsWith('4')) {
          cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png';
          cardLogo.classList.add('visible');
        } else if (value.startsWith('5')) {
          cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png';
          cardLogo.classList.add('visible');
        } else if (value.startsWith('8600') || value.startsWith('5614')) {
          cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/UzCard_logo.png/100px-UzCard_logo.png';
          cardLogo.classList.add('visible');
        } else if (value.startsWith('9860')) {
          cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Humo_logo.png/100px-Humo_logo.png';
          cardLogo.classList.add('visible');
        } else {
          cardLogo.classList.remove('visible');
        }
      }
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.substring(0, 4);
      if (value.length >= 2) e.target.value = value.substring(0, 2) + '/' + value.substring(2);
      else e.target.value = value;
    });
  }

  if (cardCvv) {
    cardCvv.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }
}

function togglePromo() {
  const toggle = document.querySelector('.promo-toggle');
  const input = document.getElementById('promo-input');
  if (toggle) toggle.classList.toggle('active');
  if (input) input.classList.toggle('hidden');
}

function applyPromo() {
  const input = document.getElementById('promo-code');
  const message = document.getElementById('promo-message');
  const code = input ? input.value.trim().toUpperCase() : '';

  const promos = {
    'MEDFLOW10': { discount: 0.1, name: '10% chegirma' },
    'DOCTOR20': { discount: 0.2, name: '20% chegirma' },
    'FIRST': { discount: 0.15, name: 'Birinchi tashrif 15%' }
  };

  if (promos[code]) {
    appliedPromo = promos[code];
    const discount = currentPaymentAmount * appliedPromo.discount;
    const newAmount = currentPaymentAmount - discount;

    if (message) {
      message.textContent = `${appliedPromo.name} qo'llandi! (-${discount.toLocaleString('uz-UZ')} so'm)`;
      message.className = 'promo-message success';
    }

    const paymentAmount = document.getElementById('payment-amount');
    const payBtnAmount = document.getElementById('pay-btn-amount');
    if (paymentAmount) paymentAmount.textContent = newAmount.toLocaleString('uz-UZ') + " so'm";
    if (payBtnAmount) payBtnAmount.textContent = newAmount.toLocaleString('uz-UZ') + " so'm";

    showToast('Promo kod qo\'llandi!');
  } else {
    if (message) {
      message.textContent = 'Noto\'g\'ri promo kod';
      message.className = 'promo-message error';
    }
  }
}

function processPayment() {
  const btn = document.querySelector('.btn-pay');
  if (!btn) return;

  const originalText = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Qayta ishlanmoqda...';
  btn.disabled = true;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  setTimeout(() => {
    closePaymentModal();

    const successModal = document.getElementById('payment-success-modal');
    if (successModal) {
      const receiptId = document.getElementById('receipt-id');
      const receiptDate = document.getElementById('receipt-date');
      const receiptAmount = document.getElementById('receipt-amount');

      if (receiptId) receiptId.textContent = '#TRX-' + Date.now().toString().slice(-8);
      if (receiptDate) receiptDate.textContent = new Date().toLocaleDateString('uz-UZ');

      const finalAmount = appliedPromo
        ? (currentPaymentAmount * (1 - appliedPromo.discount)).toLocaleString('uz-UZ') + " so'm"
        : currentPaymentAmount.toLocaleString('uz-UZ') + " so'm";
      if (receiptAmount) receiptAmount.textContent = finalAmount;

      successModal.classList.remove('hidden');
      requestAnimationFrame(() => successModal.classList.add('active'));
    }

    triggerConfetti();
    btn.innerHTML = originalText;
    btn.disabled = false;
    appliedPromo = null;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 2000);
}

function closePaymentSuccess() {
  const modal = document.getElementById('payment-success-modal');
  if (modal) modal.classList.remove('active');

  setTimeout(() => {
    openQueueModal();
  }, 400);
}

function downloadReceipt() {
  showToast('Kvitansiya yuklanmoqda...');
  setTimeout(() => showToast('Yuklab olindi: receipt.pdf'), 1000);
}

// ============================================
// 16. FOYDALANUVCHI MODALLARI
// ============================================
function openUserModal(type) {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
    dropdown.classList.add('hidden');
  }

  const oldOverlay = document.getElementById('user-modal-overlay');
  const oldModal = document.getElementById('user-modal');
  if (oldOverlay) oldOverlay.remove();
  if (oldModal) oldModal.remove();

  const overlay = document.createElement('div');
  overlay.className = 'user-modal-overlay';
  overlay.id = 'user-modal-overlay';
  overlay.onclick = closeUserModal;
  document.body.appendChild(overlay);

  const modal = document.createElement('div');
  modal.className = 'user-modal';
  modal.id = 'user-modal';
  modal.innerHTML = buildUserModalContent(type);
  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    overlay.classList.add('active');
    modal.classList.add('active');
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();

  if (type === 'appointments') loadAppointmentsList();
  if (type === 'history') loadHistoryList();
  if (type === 'reviews') loadReviewsList();
  if (type === 'settings') loadSettingsValues();
}

function buildUserModalContent(type) {
  const titles = {
    profile: 'Profilim', appointments: 'Mening navbatlarim', history: 'Tibbiy tarix',
    reviews: 'Mening sharhlarim', settings: 'Sozlamalar', help: 'Yordam'
  };
  const icons = {
    profile: 'user', appointments: 'calendar', history: 'file-text',
    reviews: 'star', settings: 'settings', help: 'help-circle'
  };

  const contents = {
    profile: buildProfileContent(),
    appointments: buildAppointmentsContent(),
    history: buildHistoryContent(),
    reviews: buildReviewsContent(),
    settings: buildSettingsContent(),
    help: buildHelpContent()
  };

  return `
    <div class="user-modal-header">
      <h3><i data-lucide="${icons[type] || 'user'}"></i> ${titles[type] || 'Profil'}</h3>
      <button class="user-modal-close" onclick="closeUserModal()">
        <i data-lucide="x"></i>
      </button>
    </div>
    <div class="user-modal-body">
      ${contents[type] || contents.profile}
    </div>
  `;
}

function buildProfileContent() {
  const favoriteCount = JSON.parse(localStorage.getItem('medflow-favorites') || '[]').length;
  const profileFields = [currentUserData.firstName, currentUserData.lastName, currentUserData.email, currentUserData.birthDate, currentUserData.gender, currentUserData.address];
  const profileCompletion = Math.round(profileFields.filter(Boolean).length / profileFields.length * 100);
  return `
    <div class="modal-profile-card">
      <div class="modal-profile-avatar">${currentUserData.firstName.charAt(0)}</div>
      <div class="modal-profile-name">${currentUserData.firstName} ${currentUserData.lastName}</div>
      <div class="modal-profile-phone">${currentUserData.phone}</div>
      <span class="modal-profile-badge"><i data-lucide="user-round"></i> Demo profil</span>
    </div>
    <div class="modal-stats">
      <div class="modal-stat"><span class="modal-stat-value">${currentUserData.visits}</span><span class="modal-stat-label">Tashriflar</span></div>
      <div class="modal-stat"><span class="modal-stat-value">${currentUserData.doctorsCount}</span><span class="modal-stat-label">Shifokorlar</span></div>
      <div class="modal-stat"><span class="modal-stat-value">${currentUserData.reviewsCount}</span><span class="modal-stat-label">Sharhlar</span></div>
    </div>
    <div class="profile-completion">
      <div><strong>Profil to‘liqligi</strong><span>${profileCompletion}%</span></div>
      <div class="profile-progress"><span style="width: ${profileCompletion}%"></span></div>
    </div>
    <div class="profile-quick-actions">
      <button type="button" onclick="openUserModal('appointments')"><i data-lucide="calendar-days"></i><span>Navbatlarim</span><i data-lucide="chevron-right"></i></button>
      <button type="button" onclick="closeUserModal(); navigateTo('favorites')"><i data-lucide="heart"></i><span>Sevimlilar <b>${favoriteCount}</b></span><i data-lucide="chevron-right"></i></button>
      <button type="button" onclick="openUserModal('history')"><i data-lucide="file-clock"></i><span>Tibbiy tarix</span><i data-lucide="chevron-right"></i></button>
    </div>
    <form class="modal-form" id="modal-profile-form" onsubmit="saveProfile(event)">
      <div class="form-row">
        <div class="form-group"><label>Ism</label><input type="text" id="modal-firstName" value="${currentUserData.firstName}" disabled></div>
        <div class="form-group"><label>Familiya</label><input type="text" id="modal-lastName" value="${currentUserData.lastName}" disabled></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Telefon</label><input type="tel" id="modal-phone" value="${currentUserData.phone}" disabled></div>
        <div class="form-group"><label>Email</label><input type="email" id="modal-email" value="${currentUserData.email}" disabled></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Tug'ilgan sana</label><input type="date" id="modal-birthdate" value="${currentUserData.birthDate}" disabled></div>
        <div class="form-group"><label>Jinsi</label>
          <select id="modal-gender" disabled>
            <option value="">Tanlang</option>
            <option value="male" ${currentUserData.gender === 'male' ? 'selected' : ''}>Erkak</option>
            <option value="female" ${currentUserData.gender === 'female' ? 'selected' : ''}>Ayol</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Manzil</label><input type="text" id="modal-address" value="${currentUserData.address}" disabled></div>
      <div class="form-group"><label>O'zim haqimda</label><textarea id="modal-bio" rows="3" disabled>${currentUserData.bio}</textarea></div>
      <div class="modal-form-actions" id="modal-profile-actions" style="display: none;">
        <button type="button" class="btn btn-secondary" onclick="toggleModalEdit()">Bekor qilish</button>
        <button type="submit" class="btn btn-primary btn-glow">Saqlash</button>
      </div>
    </form>
    <button class="btn btn-secondary btn-full" onclick="toggleModalEdit()" id="modal-edit-btn" style="margin-top: 16px;">
      <i data-lucide="edit-3"></i><span>Profilni tahrirlash</span>
    </button>
  `;
}

function buildAppointmentsContent() {
  return `
    <div class="filter-pills" style="margin-bottom: 20px;">
      <button class="pill active" onclick="filterModalAppointments('all', this)">Barchasi</button>
      <button class="pill" onclick="filterModalAppointments('upcoming', this)">Kutilmoqda</button>
      <button class="pill" onclick="filterModalAppointments('completed', this)">Yakunlangan</button>
    </div>
    <div id="modal-appointments-list" class="modal-list"></div>
  `;
}

function buildHistoryContent() {
  return `
    <button class="btn btn-secondary btn-sm" onclick="downloadMedicalHistory()" style="margin-bottom: 20px;">
      <i data-lucide="download"></i><span>Yuklab olish (PDF)</span>
    </button>
    <div id="modal-history-list" class="modal-list"></div>
  `;
}

function buildReviewsContent() {
  return `<div id="modal-reviews-list" class="modal-list"></div>`;
}

function buildSettingsContent() {
  return `
    <div class="modal-settings-section">
      <h4>Bildirishnomalar</h4>
      <div class="modal-setting-item">
        <div class="modal-setting-info"><span class="modal-setting-title">SMS xabarnomalar</span><span class="modal-setting-desc">Navbat va eslatmalar</span></div>
        <label class="toggle-switch"><input type="checkbox" id="modal-setting-sms" checked onchange="updateSetting('sms', this.checked)"><span class="toggle-slider"></span></label>
      </div>
      <div class="modal-setting-item">
        <div class="modal-setting-info"><span class="modal-setting-title">Push bildirishnomalar</span><span class="modal-setting-desc">Brauzer orqali</span></div>
        <label class="toggle-switch"><input type="checkbox" id="modal-setting-push" checked onchange="updateSetting('push', this.checked)"><span class="toggle-slider"></span></label>
      </div>
      <div class="modal-setting-item">
        <div class="modal-setting-info"><span class="modal-setting-title">Ovozli xabarnoma</span><span class="modal-setting-desc">Navbat kelganda ovoz</span></div>
        <label class="toggle-switch"><input type="checkbox" id="modal-setting-voice" checked onchange="updateSetting('voice', this.checked)"><span class="toggle-slider"></span></label>
      </div>
    </div>
    <div class="modal-settings-section">
      <h4>Ko'rinish</h4>
      <div class="modal-setting-item">
        <div class="modal-setting-info"><span class="modal-setting-title">Qorong'u rejim</span><span class="modal-setting-desc">Qorong'u/kunduzgi mavzu</span></div>
        <label class="toggle-switch"><input type="checkbox" id="modal-setting-dark" checked onchange="toggleTheme()"><span class="toggle-slider"></span></label>
      </div>
    </div>
    <div class="modal-settings-section">
      <h4>Xavfsizlik</h4>
      <button class="btn btn-secondary btn-full" onclick="changePasswordModal()">
        <i data-lucide="lock"></i><span>Parolni o'zgartirish</span>
      </button>
    </div>
    <div class="modal-settings-section" style="border-color: var(--rose-500);">
      <h4 style="color: var(--rose-400);">Xavfli zona</h4>
      <button class="btn btn-danger btn-full" onclick="deleteAccountModal()">
        <i data-lucide="trash-2"></i><span>Akkauntni o'chirish</span>
      </button>
    </div>
  `;
}

function buildHelpContent() {
  return `
    <div class="modal-list">
      <div class="modal-list-item" style="cursor: pointer;" onclick="showVideoModal()">
        <div class="modal-list-icon" style="background: var(--gradient-primary);"><i data-lucide="play-circle"></i></div>
        <div class="modal-list-info"><h4>Qanday ishlaydi?</h4><p>Video qo'llanmani ko'rish</p></div>
        <i data-lucide="chevron-right" style="color: var(--text-muted);"></i>
      </div>
      <div class="modal-list-item">
        <div class="modal-list-icon" style="background: linear-gradient(135deg, #10b981, #06b6d4);"><i data-lucide="phone-call"></i></div>
        <div class="modal-list-info"><h4>Qo'ng'iroq qilish</h4><p>+998 71 200 00 00</p></div>
      </div>
      <div class="modal-list-item">
        <div class="modal-list-icon" style="background: linear-gradient(135deg, #f59e0b, #f43f5e);"><i data-lucide="message-circle"></i></div>
        <div class="modal-list-info"><h4>Telegram orqali</h4><p>@medflow_support</p></div>
      </div>
    </div>
  `;
}

function closeUserModal() {
  const overlay = document.getElementById('user-modal-overlay');
  const modal = document.getElementById('user-modal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  setTimeout(() => {
    if (overlay) overlay.remove();
    if (modal) modal.remove();
  }, 400);
}

function toggleModalEdit() {
  isEditingProfile = !isEditingProfile;
  const inputs = document.querySelectorAll('#modal-profile-form input, #modal-profile-form select, #modal-profile-form textarea');
  const actions = document.getElementById('modal-profile-actions');
  const editBtn = document.getElementById('modal-edit-btn');

  inputs.forEach(input => input.disabled = !isEditingProfile || input.id === 'modal-phone');
  if (actions) actions.style.display = isEditingProfile ? 'flex' : 'none';
  if (editBtn) editBtn.style.display = isEditingProfile ? 'none' : 'block';
}

function saveProfile(e) {
  e.preventDefault();
  currentUserData.firstName = document.getElementById('modal-firstName').value;
  currentUserData.lastName = document.getElementById('modal-lastName').value;
  currentUserData.phone = document.getElementById('modal-phone').value;
  currentUserData.email = document.getElementById('modal-email').value;
  currentUserData.birthDate = document.getElementById('modal-birthdate').value;
  currentUserData.gender = document.getElementById('modal-gender').value;
  currentUserData.address = document.getElementById('modal-address').value;
  currentUserData.bio = document.getElementById('modal-bio').value;

  const accounts = getStoredAccounts();
  const accountIndex = accounts.findIndex(account => account.username === AppData.currentUser?.accountUsername);
  if (accountIndex < 0) throw new Error('Profil akkauntga bog‘lanmadi. Qayta tizimga kiring.');
  accounts[accountIndex] = {
    ...accounts[accountIndex],
    firstName: currentUserData.firstName,
    lastName: currentUserData.lastName,
    phoneDisplay: currentUserData.phone,
    email: currentUserData.email
  };
  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
  saveCurrentUserData();
  updateUserUI();
  toggleModalEdit();
  showToast('Profil muvaffaqiyatli yangilandi!');
}

function loadAppointmentsList(filter = 'all') {
  const container = document.getElementById('modal-appointments-list');
  if (!container) return;

  let items = currentUserData.appointments;
  if (filter !== 'all') items = items.filter(a => a.status === filter);

  if (items.length === 0) {
    container.innerHTML = `
      <div class="modal-empty"><i data-lucide="calendar-x"></i><h4>Navbatlar yo'q</h4><p>Hozircha navbatlar mavjud emas</p></div>
    `;
  } else {
    container.innerHTML = items.map(app => `
      <div class="modal-list-item">
        <div class="modal-list-icon"><i data-lucide="stethoscope"></i></div>
        <div class="modal-list-info"><h4>${app.doctor}</h4><p>${app.specialty} &bull; ${app.date} &bull; ${app.time}</p></div>
        <span class="modal-list-badge badge-${app.status}">${app.status === 'upcoming' ? 'Kutilmoqda' : app.status === 'completed' ? 'Yakunlangan' : 'Bekor'}</span>
        ${app.status === 'upcoming' ? `<button type="button" class="btn btn-secondary btn-sm appointment-cancel" onclick="cancelAppointment(${app.id})">Bekor qilish</button>` : ''}
      </div>
    `).join('');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function cancelAppointment(appointmentId) {
  const appointment = currentUserData.appointments.find(item => item.id === appointmentId);
  if (!appointment || appointment.status !== 'upcoming') return;
  if (!window.confirm('Ushbu qabul navbatini bekor qilmoqchimisiz?')) return;

  appointment.status = 'cancelled';
  saveCurrentUserData();
  document.querySelectorAll('.filter-pills .pill').forEach((pill, index) => {
    pill.classList.toggle('active', index === 0);
  });
  loadAppointmentsList('all');
  showToast('Qabul navbati bekor qilindi');
}

function filterModalAppointments(type, btn) {
  document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  loadAppointmentsList(type);
}

function loadHistoryList() {
  const container = document.getElementById('modal-history-list');
  if (!container) return;

  if (currentUserData.history.length === 0) {
    container.innerHTML = `<div class="modal-empty"><i data-lucide="file-x"></i><h4>Tarix bo'sh</h4></div>`;
  } else {
    container.innerHTML = currentUserData.history.map(h => `
      <div class="modal-list-item">
        <div class="modal-list-icon"><i data-lucide="file-text"></i></div>
        <div class="modal-list-info">
          <h4>${h.doctor}</h4><p><strong>${h.diagnosis}</strong></p><p>${h.treatment}</p>
          <small style="color: var(--text-muted);">${h.date}</small>
        </div>
      </div>
    `).join('');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function downloadMedicalHistory() {
  showToast('Tibbiy tarix yuklanmoqda...');
  setTimeout(() => showToast('Yuklab olindi: medical-history.pdf'), 1500);
}

function loadReviewsList() {
  const container = document.getElementById('modal-reviews-list');
  if (!container) return;

  if (currentUserData.reviews.length === 0) {
    container.innerHTML = `<div class="modal-empty"><i data-lucide="message-square"></i><h4>Sharhlar yo'q</h4></div>`;
  } else {
    container.innerHTML = currentUserData.reviews.map(r => {
      const stars = Array(5).fill(0).map((_, i) =>
        `<i data-lucide="star" ${i < r.rating ? 'fill="currentColor"' : ''} style="width: 14px; height: 14px; color: var(--amber-400);"></i>`
      ).join('');
      return `
        <div class="modal-list-item">
          <div class="modal-list-icon" style="background: linear-gradient(135deg, #f59e0b, #f43f5e);"><i data-lucide="star"></i></div>
          <div class="modal-list-info">
            <h4>${r.doctor}</h4><div style="display: flex; gap: 2px; margin: 4px 0;">${stars}</div>
            <p>${r.text}</p><small style="color: var(--text-muted);">${r.date}</small>
          </div>
        </div>
      `;
    }).join('');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function loadSettingsValues() {
  ['sms', 'push', 'voice'].forEach(key => {
    const el = document.getElementById(`modal-setting-${key}`);
    if (el) {
      const saved = localStorage.getItem(`medflow_setting_${key}`);
      if (saved !== null) el.checked = JSON.parse(saved);
    }
  });
}

function updateSetting(key, value) {
  localStorage.setItem(`medflow_setting_${key}`, JSON.stringify(value));
  showToast('Sozlama saqlandi');
}

function changePasswordModal() {
  showToast("Parol o'zgartirish funksiyasi tez orada...");
}

function deleteAccountModal() {
  if (confirm("Haqiqatan ham akkauntingizni o'chirmoqchimisiz? Bu amal qaytarib bo'lmaydi!")) {
    showToast('Akkaunt o\'chirildi', 'error');
    setTimeout(() => location.reload(), 2000);
  }
}

// ============================================
// 17. SHIFOKOR ONBOARDING
// ============================================
function openDoctorOnboarding() {
  let modal = document.getElementById('doctor-onboarding-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'doctor-onboarding-modal';
    modal.className = 'modal hidden';
    modal.innerHTML = buildOnboardingHTML();
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('active'));
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeDoctorOnboarding() {
  const modal = document.getElementById('doctor-onboarding-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function buildOnboardingHTML() {
  const specialtiesOptions = AppData.specialties.map(s =>
    `<option value="${s.id}">${s.name}</option>`
  ).join('');

  const citiesOptions = AppData.cities.map(c =>
    `<option value="${c.id}">${c.name}</option>`
  ).join('');

  const workDaysHTML = ['Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'].map((day, i) => `
    <label class="checkbox-wrapper workday-checkbox" style="background: var(--bg-tertiary); padding: 10px 16px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--primary-500)'" onmouseout="this.style.borderColor='var(--border-color)'">
      <input type="checkbox" name="workDays" value="${day}" ${i < 5 ? 'checked' : ''}>
      <span class="checkmark"></span><span class="checkbox-text">${day}</span>
    </label>
  `).join('');

  return `
    <div class="modal-overlay" onclick="closeDoctorOnboarding()"></div>
    <div class="modal-content modal-large onboarding-modal">
      <div class="modal-header onboarding-header">
        <div class="modal-title-group">
          <div class="modal-icon onboarding-icon"><i data-lucide="user-plus"></i></div>
          <div><h3>Shifokor sifatida ro'yxatdan o'tish</h3><p>Ma'lumotlaringizni to'ldiring</p></div>
        </div>
        <button class="modal-close" onclick="closeDoctorOnboarding()" title="Yopish"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body onboarding-body">
        <form id="onboarding-form" onsubmit="submitDoctorOnboarding(event)">
          <div class="form-section">
            <div class="form-section-title">
              <div class="section-number">1</div>
              <div><h3>Shaxsiy ma'lumotlar</h3><p>Asosiy ma'lumotlaringizni kiriting</p></div>
            </div>
            <div class="photo-upload-area">
              <div class="photo-preview" onclick="document.getElementById('doctor-photo-input').click()">
                <i data-lucide="camera"></i><span>Rasm yuklash</span><small>JPG, PNG (max 5MB)</small>
              </div>
              <input type="file" id="doctor-photo-input" accept="image/*" style="display: none;" onchange="previewDoctorPhoto(this)">
            </div>
            <div class="form-row">
              <div class="form-group"><label>Ism <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="user" class="input-icon"></i><input type="text" name="firstName" placeholder="Masalan: Bahodir" required></div></div>
              <div class="form-group"><label>Familiya <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="user" class="input-icon"></i><input type="text" name="lastName" placeholder="Masalan: Azizov" required></div></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Telefon <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="phone" class="input-icon"></i><input type="tel" name="phone" placeholder="+998 90 123 45 67" required></div></div>
              <div class="form-group"><label>Email</label><div class="input-wrapper"><i data-lucide="mail" class="input-icon"></i><input type="email" name="email" placeholder="doctor@example.com"></div></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Tug'ilgan sana</label><div class="input-wrapper"><i data-lucide="calendar" class="input-icon"></i><input type="date" name="birthDate"></div></div>
              <div class="form-group"><label>Jinsi</label><div class="input-wrapper"><i data-lucide="users" class="input-icon"></i><select name="gender"><option value="">Tanlang</option><option value="male">Erkak</option><option value="female">Ayol</option></select></div></div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <div class="section-number">2</div>
              <div><h3>Kasbiy ma'lumotlar</h3><p>Ish tajribangiz va malakangiz</p></div>
            </div>
            <div class="form-group"><label>Mutaxassislik <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="stethoscope" class="input-icon"></i><select name="specialty" required><option value="">Mutaxassislik tanlang</option>${specialtiesOptions}</select></div></div>
            <div class="form-row">
              <div class="form-group"><label>Ish tajribasi (yil) <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="briefcase" class="input-icon"></i><input type="number" name="experience" placeholder="Masalan: 10" min="0" max="60" required></div></div>
              <div class="form-group"><label>Qabul narxi (so'm) <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="wallet" class="input-icon"></i><input type="number" name="price" placeholder="Masalan: 150000" min="0" step="5000" required></div></div>
            </div>
            <div class="form-group"><label>Ta'lim muassasasi <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="graduation-cap" class="input-icon"></i><input type="text" name="education" placeholder="Masalan: Toshkent Tibbiyot Akademiyasi" required></div></div>
            <div class="form-row">
              <div class="form-group"><label>Diplom raqami</label><div class="input-wrapper"><i data-lucide="award" class="input-icon"></i><input type="text" name="diplomaNumber" placeholder="Diplom raqami"></div></div>
              <div class="form-group"><label>Litsenziya raqami</label><div class="input-wrapper"><i data-lucide="shield-check" class="input-icon"></i><input type="text" name="licenseNumber" placeholder="Litsenziya raqami"></div></div>
            </div>
            <div class="form-group"><label>O'zim haqimda</label><textarea name="about" rows="4" placeholder="O'zingiz haqida qisqacha ma'lumot, tajribangiz, qiziqishlaringiz..."></textarea></div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <div class="section-number">3</div>
              <div><h3>Joylashuv</h3><p>Qayerda faoliyat ko'rsatasiz</p></div>
            </div>
            <div class="location-cascade">
              <div class="form-group"><label>Shahar <span class="required">*</span></label><select name="city" id="onboard-city" onchange="updateOnboardDistricts()" required><option value="">Shahar tanlang</option>${citiesOptions}</select></div>
              <div class="form-group"><label>Tuman</label><select name="district" id="onboard-district"><option value="">Avval shaharni tanlang</option></select></div>
              <div class="form-group"><label>Qishloq / Mahalla</label><input type="text" name="village" placeholder="Qishloq nomi"></div>
            </div>
            <div class="form-group"><label>To'liq manzil</label><div class="input-wrapper"><i data-lucide="map-pin" class="input-icon"></i><input type="text" name="address" placeholder="Ko'cha nomi, uy raqami, xonadon"></div></div>
            <div class="form-group"><label>Mo'ljal</label><div class="input-wrapper"><i data-lucide="navigation" class="input-icon"></i><input type="text" name="landmark" placeholder="Masalan: Chilonzor metro yonida"></div></div>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <div class="section-number">4</div>
              <div><h3>Ish joylari</h3><p>Qaysi shifoxonalarda faoliyat ko'rsatasiz</p></div>
            </div>
            <div id="workplace-list" class="workplace-list"></div>
            <button type="button" class="btn-add-workplace" onclick="addWorkplace()"><i data-lucide="plus-circle"></i><span>Yangi ish joyi qo'shish</span></button>
          </div>

          <div class="form-section">
            <div class="form-section-title">
              <div class="section-number">5</div>
              <div><h3>Ish jadvali</h3><p>Qabul vaqtlaringiz</p></div>
            </div>
            <div class="form-row time-row">
              <div class="form-group"><label>Ish boshlanishi</label><div class="input-wrapper"><i data-lucide="sunrise" class="input-icon"></i><input type="time" name="workStart" value="09:00"></div></div>
              <div class="form-group"><label>Ish tugashi</label><div class="input-wrapper"><i data-lucide="sunset" class="input-icon"></i><input type="time" name="workEnd" value="18:00"></div></div>
              <div class="form-group"><label>Tanaffus vaqti</label><div class="input-wrapper"><i data-lucide="coffee" class="input-icon"></i><input type="time" name="breakTime" value="13:00"></div></div>
            </div>
            <div class="form-group"><label>Ish kunlari</label><div class="workdays-grid">${workDaysHTML}</div></div>
            <div class="form-row">
              <div class="form-group"><label>Navbat vaqti (daqiqa)</label><div class="input-wrapper"><i data-lucide="timer" class="input-icon"></i><input type="number" name="appointmentDuration" value="20" min="5" max="120" step="5"></div></div>
              <div class="form-group"><label>Kunlik limit (bemor)</label><div class="input-wrapper"><i data-lucide="users" class="input-icon"></i><input type="number" name="dailyLimit" value="20" min="1" max="100"></div></div>
            </div>
          </div>

          <div class="onboarding-submit">
            <p class="terms-text"><i data-lucide="shield-check"></i> "Ro'yxatdan o'tish" tugmasini bosish orqali <a href="#" onclick="event.preventDefault(); showToast('Foydalanish shartlari tez orada...')">foydalanish shartlari</a> va <a href="#" onclick="event.preventDefault(); showToast('Maxfiylik siyosati tez orada...')">maxfiylik siyosati</a>ni qabul qilasiz.</p>
            <button type="submit" class="btn btn-primary btn-full btn-glow btn-lg"><span>Ro'yxatdan o'tish</span><i data-lucide="arrow-right"></i></button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function previewDoctorPhoto(input) {
  const preview = input.closest('.photo-upload-area').querySelector('.photo-preview');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Doctor photo" class="preview-img"><div class="photo-overlay"><i data-lucide="refresh-cw"></i><span>O'zgartirish</span></div>`;
      preview.classList.add('has-image');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateOnboardDistricts() {
  const cityId = document.getElementById('onboard-city').value;
  const districtSelect = document.getElementById('onboard-district');
  const city = AppData.cities.find(c => c.id === cityId);

  if (districtSelect) {
    if (city && city.districts) {
      districtSelect.innerHTML = `<option value="">Tuman tanlang</option>${city.districts.map(d => `<option value="${d}">${d}</option>`).join('')}`;
      districtSelect.disabled = false;
    } else {
      districtSelect.innerHTML = '<option value="">Avval shaharni tanlang</option>';
      districtSelect.disabled = true;
    }
  }
}

function addWorkplace() {
  workplaceCounter++;
  const list = document.getElementById('workplace-list');
  if (!list) return;

  const itemId = `workplace-item-${workplaceCounter}`;
  const item = document.createElement('div');
  item.className = 'workplace-item animate-fadeInUp';
  item.id = itemId;
  item.innerHTML = `
    <div class="wp-number">${workplaceCounter}</div>
    <div class="wp-fields">
      <div class="form-row wp-row">
        <div class="form-group wp-name"><label>Shifoxona nomi <span class="required">*</span></label><div class="input-wrapper"><i data-lucide="building-2" class="input-icon"></i><input type="text" name="workplaceName[]" placeholder="Masalan: MedLife Klinikasi" required></div></div>
        <div class="form-group wp-type"><label>Turi</label><select name="workplaceType[]"><option value="clinic">Klinika</option><option value="hospital">Shifoxona</option><option value="private">Shaxsiy kabinet</option><option value="center">Markaz</option></select></div>
      </div>
      <div class="form-row wp-row">
        <div class="form-group wp-address"><label>Manzil</label><div class="input-wrapper"><i data-lucide="map-pin" class="input-icon"></i><input type="text" name="workplaceAddress[]" placeholder="Shifoxona manzili"></div></div>
        <div class="form-group wp-phone"><label>Telefon</label><div class="input-wrapper"><i data-lucide="phone" class="input-icon"></i><input type="tel" name="workplacePhone[]" placeholder="+998 90 000 00 00"></div></div>
      </div>
    </div>
    <button type="button" class="wp-remove-btn" onclick="removeWorkplace('${itemId}')" title="O'chirish"><i data-lucide="trash-2"></i></button>
  `;

  list.appendChild(item);
  const firstInput = item.querySelector('input[name="workplaceName[]"]');
  if (firstInput) firstInput.focus();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function removeWorkplace(itemId) {
  const item = document.getElementById(itemId);
  if (item) {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateX(30px)';
    setTimeout(() => {
      item.remove();
      renumberWorkplaces();
    }, 300);
  }
}

function renumberWorkplaces() {
  const items = document.querySelectorAll('.workplace-item');
  items.forEach((item, index) => {
    const numberEl = item.querySelector('.wp-number');
    if (numberEl) numberEl.textContent = index + 1;
  });
}

function submitDoctorOnboarding(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const doctorData = {
    firstName: formData.get('firstName'), lastName: formData.get('lastName'),
    phone: formData.get('phone'), email: formData.get('email'),
    birthDate: formData.get('birthDate'), gender: formData.get('gender'),
    specialty: formData.get('specialty'), experience: parseInt(formData.get('experience')) || 0,
    price: parseInt(formData.get('price')) || 0, education: formData.get('education'),
    diplomaNumber: formData.get('diplomaNumber'), licenseNumber: formData.get('licenseNumber'),
    about: formData.get('about'), city: formData.get('city'), district: formData.get('district'),
    village: formData.get('village'), address: formData.get('address'), landmark: formData.get('landmark'),
    workStart: formData.get('workStart'), workEnd: formData.get('workEnd'), breakTime: formData.get('breakTime'),
    appointmentDuration: parseInt(formData.get('appointmentDuration')) || 20,
    dailyLimit: parseInt(formData.get('dailyLimit')) || 20,
    workDays: [], workplaces: []
  };

  document.querySelectorAll('input[name="workDays"]:checked').forEach(cb => doctorData.workDays.push(cb.value));

  document.querySelectorAll('.workplace-item').forEach(item => {
    const nameInput = item.querySelector('input[name="workplaceName[]"]');
    const typeInput = item.querySelector('select[name="workplaceType[]"]');
    const addressInput = item.querySelector('input[name="workplaceAddress[]"]');
    const phoneInput = item.querySelector('input[name="workplacePhone[]"]');

    if (nameInput && nameInput.value.trim()) {
      doctorData.workplaces.push({
        name: nameInput.value.trim(), type: typeInput ? typeInput.value : 'clinic',
        address: addressInput ? addressInput.value.trim() : '', phone: phoneInput ? phoneInput.value.trim() : ''
      });
    }
  });

  if (doctorData.workDays.length === 0) {
    showToast("Kamida bitta ish kunini tanlang!", 'error'); return;
  }
  if (doctorData.workplaces.length === 0) {
    showToast("Kamida bitta ish joyini qo'shing!", 'error'); return;
  }

  console.log('Yangi shifokor arizasi:', doctorData);
  showToast("Arizangiz qabul qilindi! Moderator tekshiruvidan o'tkaziladi.");
  closeDoctorOnboarding();

  setTimeout(() => {
    form.reset();
    const wpList = document.getElementById('workplace-list');
    if (wpList) wpList.innerHTML = '';
    workplaceCounter = 0;
    const photoPreview = document.querySelector('.photo-preview');
    if (photoPreview) {
      photoPreview.innerHTML = `<i data-lucide="camera"></i><span>Rasm yuklash</span><small>JPG, PNG (max 5MB)</small>`;
      photoPreview.classList.remove('has-image');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 400);

  triggerConfetti();
}

// ============================================
// 18. EVENT LISTENERLAR
// ============================================
function setupEventListeners() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      switchAuthTab(this.dataset.tab);
    });
  });

  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      if (input && icon) {
        if (input.type === 'password') {
          input.type = 'text';
          icon.setAttribute('data-lucide', 'eye-off');
        } else {
          input.type = 'password';
          icon.setAttribute('data-lucide', 'eye');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  });

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.dataset.page;
      if (page) navigateTo(page);
    });
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
      const icon = this.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('active')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('focus', function() {
      const results = document.getElementById('search-results');
      if (results && this.value.trim()) results.classList.add('active');
    });
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitDoctorSearch(this);
      }
    });
  }

  const mobileSearch = document.getElementById('mobile-search');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', debounce(handleSearch, 300));
    mobileSearch.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitDoctorSearch(this);
      }
    });
  }

  const cityFilter = document.getElementById('city-filter');
  const specialtyFilter = document.getElementById('specialty-filter');
  const ratingFilter = document.getElementById('rating-filter');

  if (cityFilter) cityFilter.addEventListener('change', filterDoctors);
  if (specialtyFilter) specialtyFilter.addEventListener('change', filterDoctors);
  if (ratingFilter) ratingFilter.addEventListener('change', filterDoctors);
  const clinicFilter = document.getElementById('clinic-filter');
  if (clinicFilter) clinicFilter.addEventListener('change', filterDoctors);
  const priceFilter = document.getElementById('price-filter');
  if (priceFilter) priceFilter.addEventListener('change', filterDoctors);
  const todayFilter = document.getElementById('today-filter');
  if (todayFilter) todayFilter.addEventListener('change', filterDoctors);
  const sortFilter = document.getElementById('sort-filter');
  if (sortFilter) sortFilter.addEventListener('change', filterDoctors);
  const clinicDashboardSelect = document.getElementById('clinic-dashboard-select');
  if (clinicDashboardSelect) clinicDashboardSelect.addEventListener('change', renderClinicDashboard);
  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) languageToggle.addEventListener('click', toggleLanguage);

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      const doctorsSection = document.getElementById('doctors-section');
      if (doctorsSection) {
        doctorsSection.classList.add('hidden');
        doctorsSection.classList.remove('active');
      }
      navigateTo('home');
    });
  }

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) modal.classList.remove('active');
    });
  });

  const closeDoctorModalBtn = document.getElementById('close-doctor-modal');
  if (closeDoctorModalBtn) {
    closeDoctorModalBtn.addEventListener('click', function() {
      const modal = document.getElementById('doctor-modal');
      if (modal) modal.classList.remove('active');
    });
  }

  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeQueueModal);

  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const rating = parseInt(this.dataset.rating);
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        const icon = b.querySelector('i');
        if (i < rating) {
          b.classList.add('active');
          if (icon) icon.setAttribute('fill', 'currentColor');
        } else {
          b.classList.remove('active');
          if (icon) icon.setAttribute('fill', 'none');
        }
      });
    });
  });

  const modalBookBtn = document.getElementById('modal-book-btn');
  if (modalBookBtn) modalBookBtn.addEventListener('click', bookQueue);

  const notifToggle = document.getElementById('notification-toggle');
  const soundToggle = document.getElementById('sound-toggle');

  if (notifToggle) {
    notifToggle.addEventListener('change', function() {
      AppData.notificationsEnabled = this.checked;
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('change', function() {
      AppData.soundEnabled = this.checked;
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Xabaringiz yuborildi! Tez orada javob beramiz.');
      this.reset();
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      showAuthMessage('login', '');
      const formData = new FormData(this);
      try {
        await loginWithCredentials(
          String(formData.get('login') || ''),
          String(formData.get('password') || ''),
          formData.get('remember') === 'on'
        );
        showToast('Tizimga muvaffaqiyatli kirdingiz!');
      } catch (error) {
        showAuthMessage('login', error instanceof Error ? error.message : 'Tizimga kirishda xatolik yuz berdi.');
      }
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      showAuthMessage('register', '');
      const formData = new FormData(this);
      const password = String(formData.get('password') || '');
      if (password !== String(formData.get('passwordConfirm') || '')) {
        showAuthMessage('register', 'Parollar bir xil emas.');
        return;
      }

      try {
        await registerAccount({
          firstName: String(formData.get('firstName') || ''),
          lastName: String(formData.get('lastName') || ''),
          usernameInput: String(formData.get('username') || ''),
          phoneInput: String(formData.get('phone') || ''),
          email: String(formData.get('email') || ''),
          password
        });
        this.reset();
        showToast("Akkaunt yaratildi. Tizimga kirdingiz!");
      } catch (error) {
        showAuthMessage('register', error instanceof Error ? error.message : 'Akkaunt yaratishda xatolik yuz berdi.');
      }
    });
  }

  const forgotPasswordLink = document.querySelector('.forgot-link');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthMessage('login', 'Parolni tiklash uchun hozircha qo‘llab-quvvatlash xizmatiga murojaat qiling.');
    });
  }

  window.addEventListener('scroll', debounce(function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  }, 50));

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
      });
      closeUserModal();
      closeNotificationsPanel();
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
      }
    }
  });

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('popstate', handleRoute);

  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
      selectedPaymentMethod = this.value;
      document.querySelectorAll('.method-item').forEach(item => item.classList.remove('active'));
      this.closest('.method-item').classList.add('active');
      const cardForm = document.getElementById('card-form');
      if (cardForm) cardForm.style.display = this.value === 'card' ? 'block' : 'none';
    });
  });
}

function submitDoctorSearch(input) {
  AppData.searchQuery = input.value.trim();
  const searchResults = document.getElementById('search-results');
  if (searchResults) searchResults.classList.remove('active');

  const desktopSearch = document.getElementById('search-input');
  const mobileSearch = document.getElementById('mobile-search');
  if (desktopSearch && desktopSearch !== input) desktopSearch.value = input.value;
  if (mobileSearch && mobileSearch !== input) mobileSearch.value = input.value;

  navigateTo('doctors');
  filterDoctors();
}

// ============================================
// 19. INIT
// ============================================
function initApp() {
  restoreAuthSession();
  setupEventListeners();
  populateFilters();
  applyLanguage();
  renderSpecialties();
  renderDoctors();
  renderDashboardOverview();
  renderClinics();
  renderClinicDashboard();
  animateCounters();
  initScrollProgress();
  handleRoute();
  initUserDropdown();
  loadTheme();
  updateFavoriteButtons();

  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
      }, 600);
    }
  }, 2000);
}

// ============================================
// 20. DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  initApp();

  setTimeout(() => {
    initMobileBottomNav();
    initScrollToTop();
  }, 100);
});

// ============================================
// GLOBAL EXPORTLAR
// ============================================
window.AppData = AppData;
window.navigateTo = navigateTo;
window.scrollToSpecialties = scrollToSpecialties;
window.showVideoModal = showVideoModal;
window.closeVideoModal = closeVideoModal;
window.showToast = showToast;
window.toggleTheme = toggleTheme;
window.openDoctorModal = openDoctorModal;
window.showDoctorsBySpecialty = showDoctorsBySpecialty;
window.bookQueue = bookQueue;
window.closeCelebration = closeCelebration;
window.closeQueueModal = closeQueueModal;
window.rateDoctor = rateDoctor;
window.closeRatingModal = closeRatingModal;
window.submitRating = submitRating;
window.filterDoctors = filterDoctors;
window.toggleDoctorCompare = toggleDoctorCompare;
window.openDoctorComparison = openDoctorComparison;
window.clearDoctorCompare = clearDoctorCompare;
window.showAppointmentPreparation = showAppointmentPreparation;
window.closeAppointmentPreparation = closeAppointmentPreparation;
window.filterDoctorsByClinic = filterDoctorsByClinic;
window.setDoctorTodayAvailability = setDoctorTodayAvailability;
window.toggleLanguage = toggleLanguage;
window.openDoctorOnboarding = openDoctorOnboarding;
window.closeDoctorOnboarding = closeDoctorOnboarding;
window.previewDoctorPhoto = previewDoctorPhoto;
window.updateOnboardDistricts = updateOnboardDistricts;
window.addWorkplace = addWorkplace;
window.removeWorkplace = removeWorkplace;
window.submitDoctorOnboarding = submitDoctorOnboarding;
window.triggerConfetti = triggerConfetti;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.togglePromo = togglePromo;
window.applyPromo = applyPromo;
window.processPayment = processPayment;
window.closePaymentSuccess = closePaymentSuccess;
window.downloadReceipt = downloadReceipt;
window.openUserModal = openUserModal;
window.closeUserModal = closeUserModal;
window.toggleModalEdit = toggleModalEdit;
window.saveProfile = saveProfile;
window.filterModalAppointments = filterModalAppointments;
window.downloadMedicalHistory = downloadMedicalHistory;
window.updateSetting = updateSetting;
window.changePasswordModal = changePasswordModal;
window.deleteAccountModal = deleteAccountModal;
window.showNotifications = showNotifications;
window.closeNotificationsPanel = closeNotificationsPanel;
window.markNotificationRead = markNotificationRead;
window.logoutUser = logoutUser;
window.showVoiceNotification = showVoiceNotification;
window.showCelebration = showCelebration;
window.openQueueModal = openQueueModal;
window.startQueueSimulation = startQueueSimulation;
window.updateQueueDisplay = updateQueueDisplay;
window.showQueueAlert = showQueueAlert;



// ============================================
// MEDFLOW - Premium Tibbiy Navbat Tizimi
// Part 8: Qo'shimcha Funksiyalar va UI Enhancement
// ============================================

// ============================================
// 1. LAZY LOADING RASM UCHUN
// ============================================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// 2. SMOOTH SCROLL ANCHOR LINKLAR UCHUN
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// 3. FORM VALIDATSIYA YORDAMCHILARI
// ============================================
function validatePhone(phone) {
  const regex = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  return regex.test(phone);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function formatPhoneInput(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.startsWith('998')) value = value.slice(3);

  const parts = [];
  if (value.length > 0) parts.push('+998');
  if (value.length > 0) parts.push(value.slice(0, 2));
  if (value.length > 2) parts.push(value.slice(2, 5));
  if (value.length > 5) parts.push(value.slice(5, 7));
  if (value.length > 7) parts.push(value.slice(7, 9));

  input.value = parts.join(' ').trim();
}

// ============================================
// 4. OFFLINE DETEKSIYA
// ============================================
function initOfflineDetection() {
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      showToast("Internet ulanishi yo'q. Ba'zi funksiyalar cheklangan.", 'warning');
    } else {
      showToast('Internet ulanishi tiklandi!', 'success');
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
}

// ============================================
// 5. BROWSER BILDIRISHNOMALARI
// ============================================
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function sendBrowserNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    });
  }
}

// ============================================
// 6. SESSIVA TAYMERI (Auto logout)
// ============================================
function initSessionTimer() {
  let sessionTimeout;
  const SESSION_DURATION = 30 * 60 * 1000; // 30 daqiqa

  function resetTimer() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      showToast('Sessiya tugadi. Qayta kiring.', 'warning');
      setTimeout(() => logoutUser(), 3000);
    }, SESSION_DURATION);
  }

  ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  resetTimer();
}

// ============================================
// 7. REAL-TIME NAVBAT YANGILANISHI (Simulyatsiya)
// ============================================
function initRealTimeQueue() {
  setInterval(() => {
    AppData.doctors.forEach(doctor => {
      const change = Math.random() > 0.5 ? -1 : 0;
      doctor.queue.current = Math.max(0, doctor.queue.current + change);
      doctor.queue.waitTime = Math.max(5, doctor.queue.waitTime + (change * 5));
    });

    // Modal ochiq bo'lsa UI ni yangilash
    const modal = document.getElementById('doctor-modal');
    if (modal && modal.classList.contains('active') && AppData.selectedDoctor) {
      const currentQueueEl = document.getElementById('modal-queue-current');
      const waitTimeEl = document.getElementById('modal-queue-wait');
      if (currentQueueEl) currentQueueEl.textContent = AppData.selectedDoctor.queue.current;
      if (waitTimeEl) waitTimeEl.textContent = AppData.selectedDoctor.queue.waitTime + ' daqiqa';
    }
  }, 30000);
}

// ============================================
// 8. ULASHISH FUNKSIYASI
// ============================================
function shareDoctor(doctorId) {
  const doctor = AppData.doctors.find(d => d.id === doctorId);
  if (!doctor) return;

  const shareData = {
    title: `${doctor.name} - ${doctor.specialty}`,
    text: `${doctor.name} bilan navbat oling! ${doctor.clinic}`,
    url: window.location.href + '#doctor=' + doctorId
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareData.url).then(() => {
      showToast('Havola nusxalandi!');
    });
  }
}

// ============================================
// 9. SEVIMLI SHIFOKORLAR
// ============================================
function toggleFavorite(doctorId) {
  let favorites = JSON.parse(localStorage.getItem('medflow-favorites') || '[]');

  if (favorites.includes(doctorId)) {
    favorites = favorites.filter(id => id !== doctorId);
    showToast('Sevimlilardan olib tashlandi');
  } else {
    favorites.push(doctorId);
    showToast("Sevimlilarga qo'shildi");
  }

  localStorage.setItem('medflow-favorites', JSON.stringify(favorites));
  updateFavoriteButtons();
  if (AppData.currentPage === 'favorites') renderFavoriteDoctors();
}

function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('medflow-favorites') || '[]');
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const doctorId = parseInt(btn.dataset.doctorId);
    const isFavorite = favorites.includes(doctorId);
    btn.classList.toggle('active', isFavorite);
    btn.setAttribute('aria-pressed', String(isFavorite));
    btn.setAttribute('aria-label', isFavorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo‘shish');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', 'heart');
      if (isFavorite) icon.setAttribute('fill', 'currentColor');
      else icon.removeAttribute('fill');
    }
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================
// 10. SO'NGI KO'RILGANLAR
// ============================================
function addToRecentlyViewed(doctorId) {
  let recent = JSON.parse(localStorage.getItem('medflow-recent') || '[]');
  recent = recent.filter(id => id !== doctorId);
  recent.unshift(doctorId);
  if (recent.length > 10) recent = recent.slice(0, 10);
  localStorage.setItem('medflow-recent', JSON.stringify(recent));
}

// ============================================
// 11. NAVBAT TARIXI
// ============================================
function addBooking(doctor, time, amount) {
  const bookings = JSON.parse(localStorage.getItem('medflow-bookings') || '[]');
  bookings.unshift({
    id: Date.now(),
    doctor: doctor.name,
    specialty: doctor.specialty,
    time: time,
    amount: amount,
    date: new Date().toISOString(),
    status: 'upcoming'
  });
  localStorage.setItem('medflow-bookings', JSON.stringify(bookings));
}

// ============================================
// 12. KALENDARGA EKSPORIT
// ============================================
function exportToCalendar(doctor, time) {
  const event = {
    title: `Qabul: ${doctor.name}`,
    description: `${doctor.specialty} - ${doctor.clinic}`,
    location: `${doctor.location.city}, ${doctor.location.district}`,
    startTime: new Date(),
    endTime: new Date(Date.now() + 30 * 60 * 1000)
  };

  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `medflow-appointment-${Date.now()}.ics`;
  a.click();
  URL.revokeObjectURL(url);

  showToast("Kalendar ga qo'shildi");
}

function generateICS(event) {
  const formatDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${formatDate(event.startTime)}
DTEND:${formatDate(event.endTime)}
END:VEVENT
END:VCALENDAR`;
}

// ============================================
// 13. KVITANSIYANI CHOP ETISH
// ============================================
function printReceipt() {
  const receiptWindow = window.open('', '_blank');
  const doctor = AppData.selectedDoctor;

  receiptWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kvitansiya - MedFlow</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 400px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { color: #3b82f6; margin: 0; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 1.2rem; font-weight: bold; color: #3b82f6; margin-top: 20px; }
        .footer { text-align: center; margin-top: 40px; color: #666; font-size: 0.9rem; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>MedFlow</h1>
        <p>Tibbiy navbat tizimi</p>
      </div>
      <div class="row"><span>Shifokor:</span><strong>${doctor ? doctor.name : '-'}</strong></div>
      <div class="row"><span>Mutaxassislik:</span><strong>${doctor ? doctor.specialty : '-'}</strong></div>
      <div class="row"><span>Sana:</span><strong>${new Date().toLocaleDateString('uz-UZ')}</strong></div>
      <div class="row"><span>Vaqt:</span><strong>${new Date().toLocaleTimeString('uz-UZ')}</strong></div>
      <div class="row total"><span>Jami:</span><strong>${doctor ? doctor.price.toLocaleString('uz-UZ') : '0'} so'm</strong></div>
      <div class="footer">
        <p>Rahmat! Sog'lig'ingizni asrang.</p>
        <p>medflow.uz</p>
      </div>
      <button class="no-print" onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; width: 100%;">Print</button>
    </body>
    </html>
  `);
  receiptWindow.document.close();
}

// ============================================
// 14. KLAVIATURA QISKA KALITLARI
// ============================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K - Qidirish
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    }

    // Escape - Modallarni yopish
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
      });
      closeUserModal();
      closeNotificationsPanel();
    }

    // Ctrl/Cmd + / - Yordam
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      showToast('Qisqa klavishlar: Ctrl+K - Qidirish, Escape - Yopish, Ctrl+/ - Yordam');
    }
  });
}

// ============================================
// 15. ACCESSIBILITY ENHANCEMENTS
// ============================================
function initAccessibility() {
  // Focus trap for modals
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  });

  // Reduce motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    if (typeof AOS !== 'undefined') {
      AOS.init({ disable: true });
    }
  }
}

// ============================================
// 16. XATOLIKLARNI USHLASH
// ============================================
window.onerror = function(message, source, lineno, colno, error) {
  console.error('[Error]', { message, source, lineno, colno, error });
  if (message && !message.includes('image')) {
    showToast('Xatolik yuz berdi. Sahifani yangilang.', 'error');
  }
  return true;
};

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise]', event.reason);
});
