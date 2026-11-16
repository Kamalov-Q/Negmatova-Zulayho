import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { person, university } from "@/lib/content";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const title = `${person.shortName} — ${person.subject}`;
const description = `${person.university} ${person.department} ${person.role.toLowerCase()}si ${person.name}ning shaxsiy sahifasi. "${person.subject}" fani bo'yicha ma'ruzalar, testlar, mustaqil ta'lim va boshqa o'quv materiallari.`;

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the real domain so social preview images resolve.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: title,
    template: `%s — ${person.shortName}`,
  },
  description,
  keywords: [
    "Pedagoglik kasbiga kirish",
    "Iqtisodiyot va pedagogika universiteti",
    person.name,
    person.shortName,
    "o'quv materiallari",
    "sillabus",
    "ma'ruza",
  ],
  authors: [{ name: person.name }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    title,
    description,
    siteName: person.shortName,
    images: [{ url: "/media/hero-university.jpg", width: 1280, height: 611, alt: university.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/hero-university.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1416" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${body.variable} ${display.variable} h-full`}>
      <head>
        {/* Marks JS as available so scroll-reveal can start hidden without ever
            trapping content for visitors with JS disabled. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased">
        <a
          href="#men-haqimda"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-brand-600 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Asosiy kontentga o'tish
        </a>
        {children}
      </body>
    </html>
  );
}
