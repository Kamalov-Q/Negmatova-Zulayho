import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { AboutMe } from "@/components/about-me";
import { University } from "@/components/university";
import { Materials } from "@/components/materials";
import { OpenLesson } from "@/components/open-lesson";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <AboutMe dict={dict} />
        <University dict={dict} />
        <Materials dict={dict} />
        <OpenLesson dict={dict} />
        <Contact dict={dict} lang={lang} />
      </main>
      <SiteFooter dict={dict} />
      <BackToTop dict={dict} />
    </>
  );
}
