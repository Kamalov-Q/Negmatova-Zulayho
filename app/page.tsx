import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { AboutMe } from "@/components/about-me";
import { University } from "@/components/university";
import { Materials } from "@/components/materials";
import { OpenLesson } from "@/components/open-lesson";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutMe />
        <University />
        <Materials />
        <OpenLesson />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
