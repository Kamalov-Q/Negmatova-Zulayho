import Image from "next/image";
import type { ReactElement, SVGProps } from "react";
import { person } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { MailIcon, MapPinIcon, PhoneIcon, TelegramIcon } from "./icons";

const facts = [
  { label: "F.I.O", value: person.name },
  { label: "Ish joyi", value: person.university },
  { label: "Lavozim", value: person.role },
  { label: "Mutaxassisligi", value: person.speciality },
  { label: "Kafedra", value: person.department },
];

type ContactRow = {
  label: string;
  value: string;
  href?: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  external?: boolean;
};

const contacts: ContactRow[] = [
  { label: "Telefon", value: person.phone.label, href: person.phone.href, Icon: PhoneIcon },
  // Pochta manzili `lib/content.ts` da to'ldirilganda ushbu qator o'zi qo'shiladi.
  ...(person.email
    ? [{ label: "Elektron pochta", value: person.email.label, href: person.email.href, Icon: MailIcon }]
    : []),
  { label: "Telegram", value: person.telegram.label, href: person.telegram.href, Icon: TelegramIcon, external: true },
  { label: "Manzil", value: person.address, Icon: MapPinIcon },
];

export function AboutMe() {
  return (
    <section id="men-haqimda" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Men haqimda"
          title="Tanishib oling"
          description="Fanni o'qitish, talabalar bilan ishlash va uslubiy materiallar tayyorlash bo'yicha faoliyat olib boraman."
          align="left"
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <Reveal className="relative">
            {/* Capped at the source photo's usable size so the portrait is not upscaled into mush. */}
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-brand-200 to-brand-50 dark:from-brand-700/40 dark:to-brand-900/40" />
              <Image
                src={person.portrait}
                alt={`${person.name} — portret surati`}
                width={800}
                height={1066}
                sizes="384px"
                className="aspect-[3/4] w-full rounded-4xl object-cover object-top shadow-2xl shadow-brand-900/15"
              />
              <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-hairline bg-[var(--surface)] px-5 py-4 text-center shadow-xl">
                <p className="font-display text-base font-bold text-ink">{person.shortName}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{person.role}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 lg:mt-0">
            <Reveal delay={80}>
              <dl className="divide-y divide-[var(--hairline)] overflow-hidden rounded-3xl border border-hairline">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                      {fact.label}
                    </dt>
                    <dd className="text-base font-medium text-ink text-pretty">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {contacts.map(({ label, value, href, Icon, external }) => {
                  const inner = (
                    <>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-200">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink">{value}</span>
                      </span>
                    </>
                  );

                  const className =
                    "group flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3.5 transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5";

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className={className}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={className}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
