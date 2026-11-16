export type NavItem = { id: string; label: string };

export const nav: NavItem[] = [
  { id: "men-haqimda", label: "Men haqimda" },
  { id: "universitet", label: "Universitet" },
  { id: "materiallar", label: "Materiallar" },
  { id: "ochiq-dars", label: "Ochiq dars" },
  { id: "aloqa", label: "Aloqa" },
];

export const person = {
  name: "Negmatova Zulayho Shermatovna",
  shortName: "Negmatova Zulayho",
  initials: "NZ",
  role: "O'qituvchi",
  department: "Pedagogika va o'qitish metodikasi kafedrasi",
  university: "Iqtisodiyot va pedagogika universiteti",
  subject: "Pedagoglik kasbiga kirish",
  speciality: "Ta'lim-tarbiya nazariyasi va metodikasi (Boshlang'ich ta'lim)",
  address: "Qashqadaryo viloyati, Qarshi shahri",
  phone: { label: "+998 91 457 21 05", href: "tel:+998914572105" },
  // Elektron pochta hali berilmagan. Qiymat qo'yilsa, u sayt bo'ylab avtomatik paydo bo'ladi.
  email: null as { label: string; href: string } | null,
  telegram: { label: "@negmatovazulayxo", href: "https://t.me/negmatovazulayxo" },
  portrait: "/media/portrait-negmatova.jpg",
};

export const university = {
  name: "Iqtisodiyot va pedagogika universiteti",
  short: "IPU",
  tagline: "Qarshi shahridagi zamonaviy ta'lim maskani",
  description:
    "Universitet bakalavriat va magistratura yo'nalishlarida kunduzgi hamda sirtqi ta'lim shakllari bo'yicha mutaxassislar tayyorlaydi. Quyida 2024-yilgi qabul yo'nalishlaridan ba'zilari keltirilgan.",
  phone: { label: "(+998 75) 223-60-60", href: "tel:+998752236060" },
  email: { label: "ipu@ipuedu.uz", href: "mailto:ipu@ipuedu.uz" },
  address: "Qashqadaryo viloyati, Qarshi shahri, Ravoq MFY, I. Karimov ko'chasi, 13-U",
  website: "https://ipuedu.uz/",
  hemis: "https://student.ipu-edu.uz/dashboard/login",
  video: "https://www.youtube.com/watch?v=556kHjwS43I",
  programs: [
    { title: "Filologiya va tillarni o'qitish", note: "o'zbek tili", image: "/media/program-1.jpg" },
    { title: "Axborot tizimlari va texnologiyalari", note: "tarmoqlar va sohalar bo'yicha", image: "/media/program-2.jpg" },
    { title: "Kompyuter injiniringi", note: "axborot xavfsizligi", image: "/media/program-3.jpg" },
    { title: "O'zbek tili va adabiyoti", note: "bakalavriat", image: "/media/program-4.jpg" },
  ],
};

/**
 * Materiallar hali yuklanmagan: kartochkalar havolani ochmaydi, o'rniga
 * "Yaqinda qo'shiladi" xabari chiqadi. Fayllar tayyor bo'lsa — `true` qiling.
 */
export const materialsAvailable: boolean = false;

export type Material = {
  title: string;
  description: string;
  type: string;
  href: string;
};

export const materials: Material[] = [
  {
    title: "Fan dasturi va sillabus",
    description: "Fan bo'yicha ishchi dastur hamda sillabus hujjatlari.",
    type: "RAR",
    href: "https://drive.google.com/file/d/1cosDViAg4WOwucTVdwMPnUrSiqmOrxNk/view?usp=sharing",
  },
  {
    title: "Amaliy mashg'ulotlar uchun uslubiy ko'rsatma",
    description: "Amaliy mashg'ulotlarni tashkil etish bo'yicha uslubiy tavsiyalar.",
    type: "PDF",
    href: "https://drive.google.com/file/d/1gwdC7HIaZMgmuUYCNhD1JZgHZRbZNXXd/view?usp=drive_link",
  },
  {
    title: "Ma'ruza mashg'ulotlari",
    description: "Fan bo'yicha barcha ma'ruza mavzulari matni.",
    type: "PDF",
    href: "https://drive.google.com/file/d/18ZsMuUaizmCg5PQRz1emj5qMDKi1ucGL/view?usp=drive_link",
  },
  {
    title: "Test topshiriqlari",
    description: "Bilimni mustahkamlash va o'zini sinash uchun testlar.",
    type: "PDF",
    href: "https://drive.google.com/file/d/1nlSC-1K7aZWAWSj7QWSv9BhUfg7o_86l/view?usp=sharing",
  },
  {
    title: "Mustaqil ta'lim",
    description: "Mustaqil ta'lim mavzulari va topshiriqlar ro'yxati.",
    type: "PDF",
    href: "https://drive.google.com/file/d/1khcRlImgdfhs-RkOif6phRjzfNb1pdwo/view?usp=drive_link",
  },
  {
    title: "Glossariy",
    description: "Fanga oid asosiy atama va tushunchalar izohi.",
    type: "PDF",
    href: "https://drive.google.com/file/d/1iNZ6apoYo8wumZGoZqXUt1_Hnlm2CIX9/view?usp=drive_link",
  },
  {
    title: "Adabiyotlar fondi",
    description: "Tavsiya etilgan adabiyotlar va foydalanilgan manbalar.",
    type: "PDF",
    href: "https://drive.google.com/file/d/1rMTI8PLL1ryp2LMHECl9vN-Kh9_VMY6t/view?usp=drive_link",
  },
];

export const openLesson = {
  title: "Integratsion dars mashg'uloti",
  description:
    "Iqtisodiyot va pedagogika universiteti “Boshlang'ich ta'lim” yo'nalishi 2-kurs sirtqi ta'lim shakli talabalari hamda Pedagogika va uni o'qitish metodikasi kafedrasi o'qituvchisi Negmatova Zulayho Shermatovna tomonidan integratsion dars mashg'uloti tashkil etildi.",
  // Vaqtinchalik o'rin egallovchi suratlar. Haqiqiy suratlar tayyor bo'lganda
  // `/media/` ichiga qo'yib, quyidagi `src` qiymatlarini almashtirish kifoya.
  photos: [
    { src: "/media/lesson-placeholder-1.jpg", alt: "Ochiq dars surati tez orada qo'shiladi (1)" },
    { src: "/media/lesson-placeholder-2.jpg", alt: "Ochiq dars surati tez orada qo'shiladi (2)" },
    { src: "/media/lesson-placeholder-3.jpg", alt: "Ochiq dars surati tez orada qo'shiladi (3)" },
    { src: "/media/lesson-placeholder-4.jpg", alt: "Ochiq dars surati tez orada qo'shiladi (4)" },
  ],
};

export const stats = [
  { value: "7", label: "o'quv materiali" },
  { value: "2", label: "ta'lim shakli" },
  { value: "24/7", label: "onlayn murojaat" },
];
