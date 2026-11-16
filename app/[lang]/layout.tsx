import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { person } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Cache Components requires every root parameter to have at least one value.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const title = `${person.shortName} — ${dict.person.subject}`;

  return {
    // Set NEXT_PUBLIC_SITE_URL to the real domain so social preview images resolve.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: title, template: `%s — ${person.shortName}` },
    description: dict.meta.description,
    keywords: [...dict.meta.keywords, person.name, person.shortName],
    authors: [{ name: person.name }],
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
    },
    openGraph: {
      type: "website",
      locale: lang,
      alternateLocale: locales.filter((locale) => locale !== lang),
      title,
      description: dict.meta.description,
      siteName: person.shortName,
      images: [
        { url: "/media/hero-university.jpg", width: 1280, height: 611, alt: dict.person.university },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
      images: ["/media/hero-university.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1416" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    // The theme script below rewrites `data-theme` before React hydrates, which is
    // the one attribute mismatch React cannot know about in advance.
    <html
      lang={lang}
      className={`${body.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies a saved light/dark choice before first paint so the page never
            flashes the wrong palette. No stored choice means the OS decides. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{var t=localStorage.getItem("theme");` +
              `if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased">
        <a
          href="#men-haqimda"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-brand-600 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
