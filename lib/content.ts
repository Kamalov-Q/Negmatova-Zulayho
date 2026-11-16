/**
 * Locale-independent data: links, images, phone numbers and feature flags.
 * Every piece of user-facing text lives in `lib/dictionaries/*` instead.
 */

export const navIds = ["men-haqimda", "universitet", "materiallar", "ochiq-dars", "aloqa"] as const;
export type NavId = (typeof navIds)[number];

export const person = {
  name: "Negmatova Zulayho Shermatovna",
  shortName: "Negmatova Zulayho",
  initials: "NZ",
  phone: { label: "+998 91 457 21 05", href: "tel:+998914572105" },
  email: null as { label: string; href: string } | null,
  telegram: { label: "@negmatovazulayxo", href: "https://t.me/negmatovazulayxo" },
  portrait: "/media/portrait-negmatova.jpg",
};

export const programIds = [
  "philology",
  "infoSystems",
  "computerEngineering",
  "uzbekLanguage",
] as const;
export type ProgramId = (typeof programIds)[number];

export const university = {
  short: "IPU",
  phone: { label: "(+998 75) 223-60-60", href: "tel:+998752236060" },
  email: { label: "ipu@ipuedu.uz", href: "mailto:ipu@ipuedu.uz" },
  website: "https://ipuedu.uz/",
  hemis: "https://student.ipu-edu.uz/dashboard/login",
  video: "https://www.youtube.com/watch?v=556kHjwS43I",
  programImages: {
    philology: "/media/program-1.jpg",
    infoSystems: "/media/program-2.jpg",
    computerEngineering: "/media/program-3.jpg",
    uzbekLanguage: "/media/program-4.jpg",
  } satisfies Record<ProgramId, string>,
};

/**
 * Materiallar hali yuklanmagan: kartochkalar havolani ochmaydi, o'rniga
 * "Yaqinda qo'shiladi" xabari chiqadi. Fayllar tayyor bo'lsa — `true` qiling.
 */
export const materialsAvailable: boolean = false;

export const materialIds = [
  "syllabus",
  "practical",
  "lectures",
  "tests",
  "independent",
  "glossary",
  "reading",
] as const;
export type MaterialId = (typeof materialIds)[number];

export const materialFiles: Record<MaterialId, { type: string; href: string }> = {
  syllabus: {
    type: "RAR",
    href: "https://drive.google.com/file/d/1cosDViAg4WOwucTVdwMPnUrSiqmOrxNk/view?usp=sharing",
  },
  practical: {
    type: "PDF",
    href: "https://drive.google.com/file/d/1gwdC7HIaZMgmuUYCNhD1JZgHZRbZNXXd/view?usp=drive_link",
  },
  lectures: {
    type: "PDF",
    href: "https://drive.google.com/file/d/18ZsMuUaizmCg5PQRz1emj5qMDKi1ucGL/view?usp=drive_link",
  },
  tests: {
    type: "PDF",
    href: "https://drive.google.com/file/d/1nlSC-1K7aZWAWSj7QWSv9BhUfg7o_86l/view?usp=sharing",
  },
  independent: {
    type: "PDF",
    href: "https://drive.google.com/file/d/1khcRlImgdfhs-RkOif6phRjzfNb1pdwo/view?usp=drive_link",
  },
  glossary: {
    type: "PDF",
    href: "https://drive.google.com/file/d/1iNZ6apoYo8wumZGoZqXUt1_Hnlm2CIX9/view?usp=drive_link",
  },
  reading: {
    type: "PDF",
    href: "https://drive.google.com/file/d/1rMTI8PLL1ryp2LMHECl9vN-Kh9_VMY6t/view?usp=drive_link",
  },
};

export const lessonPhotos = [
  "/media/lesson-placeholder-1.jpg",
  "/media/lesson-placeholder-2.jpg",
  "/media/lesson-placeholder-3.jpg",
  "/media/lesson-placeholder-4.jpg",
];

export const statValues = ["7", "2", "24/7"] as const;
