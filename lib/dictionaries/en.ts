import type { Dictionary } from "./uz";

export const en: Dictionary = {

  nav: {
    "men-haqimda": "About me",
    universitet: "University",
    materiallar: "Materials",
    "ochiq-dars": "Open lesson",
    aloqa: "Contact",
  },

  common: {
    telegram: "Telegram",
    telegramWrite: "Message on Telegram",
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    footerMenu: "Footer menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToggle: "Toggle light and dark mode",
    themeTitle: "Light / dark mode",
    backToTop: "Back to top",
    skipToContent: "Skip to main content",
    language: "Language",
    languageSwitch: "Choose language",
  },

  person: {
    role: "Lecturer",
    department: "Department of Pedagogy and Teaching Methodology",
    university: "University of Economics and Pedagogy",
    subject: "Introduction to the Teaching Profession",
    speciality: "Upbringing in Primary Education",
    address: "Qashqadaryo region, Qarshi city",
    roleFull: "Lecturer at the Department of Pedagogy and Teaching Methodology",
  },

  hero: {
    lead: "Every resource for the course in one place — lectures, tests and independent-study assignments. Open to students and always at hand.",
    ctaMaterials: "Browse materials",
    ctaAbout: "About me",
    scrollDown: "Scroll",
    nextSection: "Go to the next section",
    photoAlt: "The University of Economics and Pedagogy building",
    stats: ["course materials", "study formats", "online enquiries"],
  },

  about: {
    eyebrow: "About me",
    title: "Get to know me",
    description:
      "I teach the course, work closely with students and prepare methodological materials.",
    portraitAlt: "{name} — portrait photo",
    facts: {
      name: "Full name",
      workplace: "Workplace",
      position: "Position",
      speciality: "Field",
      department: "Department",
    },
    contacts: {
      phone: "Phone",
      email: "Email",
      telegram: "Telegram",
      address: "Address",
    },
  },

  university: {
    eyebrow: "University",
    description:
      "The university trains specialists across bachelor's and master's programmes, in both full-time and part-time formats.",
    address: "13-U I. Karimov street, Ravoq neighbourhood, Qarshi, Qashqadaryo region",
    contacts: { phone: "Phone", email: "Email", address: "Address" },
    linkSite: "University website",
    linkHemis: "HEMIS for students",
    linkVideo: "Video about the university",
    programsTitle: "Admission tracks",
    programAlt: "Admission announcement for the {title} track",
    programs: {
      philology: { title: "Philology and Language Teaching", note: "Uzbek language" },
      infoSystems: {
        title: "Information Systems and Technologies",
        note: "by sector and industry",
      },
      computerEngineering: { title: "Computer Engineering", note: "information security" },
      uzbekLanguage: { title: "Uzbek Language and Literature", note: "bachelor's" },
    },
  },

  materials: {
    eyebrow: "Course resources",
    title: "Study materials",
    descriptionAvailable:
      "Each material is stored on Google Drive and opens in a new tab. Use the download button above the file to save a copy.",
    descriptionSoon:
      "The list of course materials is below. The files are still being prepared and will open here soon.",
    ctaOpen: "Open",
    ctaSoon: "Coming soon",
    toast: "Coming soon",
    note: "If a file won't open or asks for access, message me on Telegram and I'll refresh the link.",
    items: {
      syllabus: {
        title: "Course programme and syllabus",
        description: "The working programme and syllabus documents for the course.",
      },
      practical: {
        title: "Guidance for practical sessions",
        description: "Methodological recommendations for running practical sessions.",
      },
      lectures: {
        title: "Lecture sessions",
        description: "The full text of every lecture topic in the course.",
      },
      tests: {
        title: "Test assignments",
        description: "Tests for consolidating knowledge and checking your own progress.",
      },
      independent: {
        title: "Independent study",
        description: "Independent-study topics and the list of assignments.",
      },
      glossary: {
        title: "Glossary",
        description: "Explanations of the key terms and concepts in the course.",
      },
      reading: {
        title: "Reading list",
        description: "Recommended literature and the sources used in the course.",
      },
    },
  },

  lesson: {
    eyebrow: "Open lesson",
    title: "Integrated lesson",
    description:
      "An integrated lesson was held for second-year part-time students of the Primary Education programme at the University of Economics and Pedagogy, led by Negmatova Zulayho Shermatovna, lecturer at the Department of Pedagogy and Teaching Methodology.",
    photoAlt: "Open lesson photo coming soon ({n})",
    photos: "Photos",
    photoLabel: "Photo {n}",
    enlarge: "Enlarge photo {n}",
    previous: "Previous photo",
    next: "Next photo",
    close: "Close",
    viewer: "Photo viewer",
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    description:
      "Leave a message about anything related to the course — I'll reply as soon as I can.",
    telegramLead: "Telegram — the fastest way",
    phoneLabel: "Phone",
    emailLabel: "Email",
    form: {
      name: "Full name",
      namePlaceholder: "Aliyeva Nilufar",
      direction: "Programme",
      directionPlaceholder: "Primary Education",
      group: "Group",
      groupPlaceholder: "BT-21/2",
      phone: "Phone number",
      phonePlaceholder: "+998 90 123 45 67",
      message: "Message",
      messagePlaceholder: "Write your question or message…",
      optional: "(optional)",
      submit: "Send",
      sending: "Sending…",
      success: "Your message has been sent. I'll be in touch soon.",
      networkError: "Network error. Please message me on Telegram instead.",
      genericError: "The message wasn't sent. Please try again shortly.",
      errors: {
        name: "Please enter your full name.",
        phone: "Please enter a valid phone number.",
        message: "Please describe your question briefly.",
      },
      badRequest: "The request format is invalid.",
      sendFailed: "Something went wrong while sending. Please message me on Telegram.",
    },
  },

  footer: {
    tagline:
      "Lecturer at the Department of Pedagogy and Teaching Methodology. Course materials for “Introduction to the Teaching Profession”, and a way for students to get in touch.",
    sectionsTitle: "Sections",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },

  meta: {
    description:
      "The personal page of Negmatova Zulayho Shermatovna, lecturer at the Department of Pedagogy and Teaching Methodology, University of Economics and Pedagogy. Lectures, tests, independent study and other materials for “Introduction to the Teaching Profession”.",
    keywords: [
      "Introduction to the Teaching Profession",
      "University of Economics and Pedagogy",
      "course materials",
      "syllabus",
      "lectures",
    ],
  },
};
