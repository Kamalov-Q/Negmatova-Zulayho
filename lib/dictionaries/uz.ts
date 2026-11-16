/**
 * Uzbek is the source of truth: `Dictionary` is derived from this object, so
 * adding a key here makes TypeScript demand the same key in `ru.ts` and `en.ts`.
 * `{n}` / `{title}` placeholders are substituted at the call site.
 */
export const uz = {

  nav: {
    "men-haqimda": "Men haqimda",
    universitet: "Universitet",
    materiallar: "Materiallar",
    "ochiq-dars": "Ochiq dars",
    aloqa: "Aloqa",
  },

  common: {
    telegram: "Telegram",
    telegramWrite: "Telegramda yozish",
    mainMenu: "Asosiy menyu",
    mobileMenu: "Mobil menyu",
    footerMenu: "Pastki menyu",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    themeToggle: "Kunduzgi va tungi rejimni almashtirish",
    themeTitle: "Kunduzgi / tungi rejim",
    backToTop: "Yuqoriga qaytish",
    skipToContent: "Asosiy kontentga o'tish",
    language: "Til",
    languageSwitch: "Tilni tanlash",
  },

  person: {
    role: "O'qituvchi",
    department: "Pedagogika va o'qitish metodikasi kafedrasi",
    university: "Iqtisodiyot va pedagogika universiteti",
    subject: "Pedagoglik kasbiga kirish",
    speciality: "Ta'lim-tarbiya nazariyasi va metodikasi (Boshlang'ich ta'lim)",
    address: "Qashqadaryo viloyati, Qarshi shahri",
    roleFull: "Pedagogika va o'qitish metodikasi kafedrasi o'qituvchisi",
  },

  hero: {
    lead: "Fan bo'yicha barcha o'quv materiallari, ma'ruzalar, testlar va mustaqil ta'lim topshiriqlari bir joyda. Talabalar uchun ochiq va doim qo'l ostida.",
    ctaMaterials: "Materiallarni ko'rish",
    ctaAbout: "Men haqimda",
    scrollDown: "Pastga",
    nextSection: "Keyingi bo'limga o'tish",
    photoAlt: "Iqtisodiyot va pedagogika universiteti binosi",
    stats: ["o'quv materiali", "ta'lim shakli", "onlayn murojaat"],
  },

  about: {
    eyebrow: "Men haqimda",
    title: "Tanishib oling",
    description:
      "Fanni o'qitish, talabalar bilan ishlash va uslubiy materiallar tayyorlash bo'yicha faoliyat olib boraman.",
    portraitAlt: "{name} — portret surati",
    facts: {
      name: "F.I.O",
      workplace: "Ish joyi",
      position: "Lavozim",
      speciality: "Mutaxassisligi",
      department: "Kafedra",
    },
    contacts: {
      phone: "Telefon",
      email: "Elektron pochta",
      telegram: "Telegram",
      address: "Manzil",
    },
  },

  university: {
    eyebrow: "Universitet",
    description:
      "Universitet bakalavriat va magistratura yo'nalishlarida kunduzgi hamda sirtqi ta'lim shakllari bo'yicha mutaxassislar tayyorlaydi. Quyida 2024-yilgi qabul yo'nalishlaridan ba'zilari keltirilgan.",
    address: "Qashqadaryo viloyati, Qarshi shahri, Ravoq MFY, I. Karimov ko'chasi, 13-U",
    contacts: { phone: "Telefon", email: "Elektron pochta", address: "Manzil" },
    linkSite: "Universitet sayti",
    linkHemis: "Talabalar uchun HEMIS",
    linkVideo: "Universitet haqida video",
    programsTitle: "Qabul yo'nalishlari",
    programAlt: "{title} yo'nalishi bo'yicha qabul e'loni",
    programs: {
      philology: { title: "Filologiya va tillarni o'qitish", note: "o'zbek tili" },
      infoSystems: {
        title: "Axborot tizimlari va texnologiyalari",
        note: "tarmoqlar va sohalar bo'yicha",
      },
      computerEngineering: { title: "Kompyuter injiniringi", note: "axborot xavfsizligi" },
      uzbekLanguage: { title: "O'zbek tili va adabiyoti", note: "bakalavriat" },
    },
  },

  materials: {
    eyebrow: "Fanga oid materiallar",
    title: "O'quv materiallari",
    descriptionAvailable:
      "Har bir material Google Drive’da saqlanadi va yangi oynada ochiladi. Yuklab olish uchun fayl ustidagi yuklash tugmasidan foydalaning.",
    descriptionSoon:
      "Fan bo'yicha materiallar ro'yxati quyida keltirilgan. Fayllar hozircha tayyorlanmoqda va tez orada shu yerdan ochiladi.",
    ctaOpen: "Ochish",
    ctaSoon: "Tez orada",
    toast: "Yaqinda qo'shiladi",
    note: "Fayl ochilmasa yoki ruxsat so'ralsa, Telegram orqali yozing — havolani yangilab beraman.",
    items: {
      syllabus: {
        title: "Fan dasturi va sillabus",
        description: "Fan bo'yicha ishchi dastur hamda sillabus hujjatlari.",
      },
      practical: {
        title: "Amaliy mashg'ulotlar uchun uslubiy ko'rsatma",
        description: "Amaliy mashg'ulotlarni tashkil etish bo'yicha uslubiy tavsiyalar.",
      },
      lectures: {
        title: "Ma'ruza mashg'ulotlari",
        description: "Fan bo'yicha barcha ma'ruza mavzulari matni.",
      },
      tests: {
        title: "Test topshiriqlari",
        description: "Bilimni mustahkamlash va o'zini sinash uchun testlar.",
      },
      independent: {
        title: "Mustaqil ta'lim",
        description: "Mustaqil ta'lim mavzulari va topshiriqlar ro'yxati.",
      },
      glossary: {
        title: "Glossariy",
        description: "Fanga oid asosiy atama va tushunchalar izohi.",
      },
      reading: {
        title: "Adabiyotlar fondi",
        description: "Tavsiya etilgan adabiyotlar va foydalanilgan manbalar.",
      },
    },
  },

  lesson: {
    eyebrow: "Ochiq dars",
    title: "Integratsion dars mashg'uloti",
    description:
      "Iqtisodiyot va pedagogika universiteti “Boshlang'ich ta'lim” yo'nalishi 2-kurs sirtqi ta'lim shakli talabalari hamda Pedagogika va uni o'qitish metodikasi kafedrasi o'qituvchisi Negmatova Zulayho Shermatovna tomonidan integratsion dars mashg'uloti tashkil etildi.",
    photoAlt: "Ochiq dars surati tez orada qo'shiladi ({n})",
    photos: "Suratlar",
    photoLabel: "{n}-surat",
    enlarge: "{n}-suratni kattalashtirish",
    previous: "Oldingi surat",
    next: "Keyingi surat",
    close: "Yopish",
    viewer: "Surat ko'rinishi",
  },

  contact: {
    eyebrow: "Aloqa",
    title: "Menga murojaat qiling",
    description:
      "Fan doirasidagi savol yoki muammolar bo'yicha xabar qoldiring — imkon qadar tez javob beraman.",
    telegramLead: "Telegram — eng tezkor yo'l",
    phoneLabel: "Telefon",
    emailLabel: "Elektron pochta",
    form: {
      name: "Ism-familiya",
      namePlaceholder: "Aliyeva Nilufar",
      direction: "Yo'nalish",
      directionPlaceholder: "Boshlang'ich ta'lim",
      group: "Guruh",
      groupPlaceholder: "BT-21/2",
      phone: "Telefon raqam",
      phonePlaceholder: "+998 90 123 45 67",
      message: "Xabar",
      messagePlaceholder: "Savolingiz yoki murojaatingizni yozing…",
      optional: "(ixtiyoriy)",
      submit: "Yuborish",
      sending: "Yuborilmoqda…",
      success: "Xabaringiz yuborildi. Tez orada bog'lanaman.",
      networkError: "Tarmoqda xatolik. Telegram orqali yozib qo'ying.",
      genericError: "Xabar yuborilmadi. Birozdan so'ng urinib ko'ring.",
      errors: {
        name: "Ism-familiyangizni to'liq kiriting.",
        phone: "Telefon raqamni to'g'ri kiriting.",
        message: "Savolingizni qisqacha yozing.",
      },
      badRequest: "So'rov formati noto'g'ri.",
      sendFailed: "Xabarni yuborishda xatolik. Telegram orqali yozing.",
    },
  },

  footer: {
    tagline:
      "Pedagogika va o'qitish metodikasi kafedrasi o'qituvchisi. “Pedagoglik kasbiga kirish” fani bo'yicha o'quv materiallari va talabalar bilan aloqa sahifasi.",
    sectionsTitle: "Bo'limlar",
    contactTitle: "Aloqa",
    rights: "Barcha huquqlar himoyalangan.",
  },

  meta: {
    description:
      "Iqtisodiyot va pedagogika universiteti Pedagogika va o'qitish metodikasi kafedrasi o'qituvchisi Negmatova Zulayho Shermatovnaning shaxsiy sahifasi. “Pedagoglik kasbiga kirish” fani bo'yicha ma'ruzalar, testlar, mustaqil ta'lim va boshqa o'quv materiallari.",
    keywords: [
      "Pedagoglik kasbiga kirish",
      "Iqtisodiyot va pedagogika universiteti",
      "o'quv materiallari",
      "sillabus",
      "ma'ruza",
    ],
  },
};

export type Dictionary = typeof uz;
