import Image from "next/image";
import { programIds, university } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { fill } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ExternalIcon, MailIcon, MapPinIcon, PhoneIcon, PlayIcon } from "./icons";

export function University({ dict }: { dict: Dictionary }) {
  const contacts = [
    {
      label: dict.university.contacts.phone,
      value: university.phone.label,
      href: university.phone.href,
      Icon: PhoneIcon,
    },
    {
      label: dict.university.contacts.email,
      value: university.email.label,
      href: university.email.href,
      Icon: MailIcon,
    },
    { label: dict.university.contacts.address, value: dict.university.address, Icon: MapPinIcon },
  ];

  const links = [
    { href: university.website, label: dict.university.linkSite, primary: true },
    { href: university.hemis, label: dict.university.linkHemis },
    { href: university.video, label: dict.university.linkVideo, video: true },
  ];

  return (
    <section id="universitet" className="scroll-mt-24 bg-[var(--surface-muted)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={dict.university.eyebrow}
          title={dict.person.university}
          description={dict.university.description}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {contacts.map(({ label, value, href, Icon }, index) => {
            const body = (
              <>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <Icon className="size-6" />
                </span>
                <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  {label}
                </span>
                <span className="mt-1.5 block text-base font-semibold text-ink text-pretty">{value}</span>
              </>
            );
            const className =
              "flex h-full flex-col rounded-3xl border border-hairline bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5";

            return (
              <Reveal key={label} delay={index * 70}>
                {href ? (
                  <a href={href} className={className}>
                    {body}
                  </a>
                ) : (
                  <div className={className}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            {links.map(({ href, label, primary, video }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  primary
                    ? "inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[0.98]"
                    : "inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-[var(--surface)] px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand-300 active:scale-[0.98]"
                }
              >
                {video ? <PlayIcon className="size-4 text-accent-500" /> : null}
                {label}
                {video ? null : <ExternalIcon className="size-4" />}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-ink">
              {dict.university.programsTitle}
            </h3>
          </Reveal>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programIds.map((id, index) => {
              const program = dict.university.programs[id];
              return (
                <Reveal as="li" key={id} delay={index * 60}>
                  <figure className="group h-full overflow-hidden rounded-3xl border border-hairline bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10">
                    <div className="overflow-hidden">
                      <Image
                        src={university.programImages[id]}
                        alt={fill(dict.university.programAlt, { title: program.title })}
                        width={900}
                        height={900}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="p-5">
                      <p className="font-display text-base font-bold leading-snug text-ink text-pretty">
                        {program.title}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted">{program.note}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
