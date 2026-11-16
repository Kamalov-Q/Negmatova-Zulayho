import Image from "next/image";
import { person, statValues } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { ArrowRightIcon, GraduationIcon } from "./icons";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <Image
        src="/media/hero-university.jpg"
        alt={dict.hero.photoAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center sm:object-[100%_0%]"
      />
      {/* Layered scrims keep the headline readable over the photo at every size. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/65 to-brand-800/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/75 via-transparent to-brand-950/40" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:text-sm">
            <GraduationIcon className="size-4" />
            {dict.person.university}
          </p>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            {dict.person.subject}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty sm:text-xl">
            {dict.hero.lead}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/75">
            <span className="font-semibold text-white">{person.name}</span>
            <span className="hidden size-1 rounded-full bg-white/40 sm:block" />
            <span>{dict.person.roleFull}</span>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#materiallar"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-accent-500/30 transition hover:bg-accent-600 active:scale-[0.98]"
            >
              {dict.hero.ctaMaterials}
              <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#men-haqimda"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98]"
            >
              {dict.hero.ctaAbout}
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
            {statValues.map((value, index) => (
              <div key={value}>
                <dt className="sr-only">{dict.hero.stats[index]}</dt>
                <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {value}
                </dd>
                <p className="mt-1 text-xs font-medium text-white/65 sm:text-sm">
                  {dict.hero.stats[index]}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#men-haqimda"
        aria-label={dict.hero.nextSection}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition hover:text-white md:flex"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          {dict.hero.scrollDown}
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-white/30">
          <span className="size-2 animate-bounce rounded-full bg-white" />
        </span>
      </a>
    </section>
  );
}
