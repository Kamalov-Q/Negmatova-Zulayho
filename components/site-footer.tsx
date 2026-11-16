import { nav, person, university } from "@/lib/content";
import { MailIcon, MapPinIcon, PhoneIcon, TelegramIcon } from "./icons";

/**
 * Cache Components treats `new Date()` during render as an unstable value, so the
 * year is resolved inside a cached server function instead.
 */
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-[var(--surface)] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-sm font-black text-white">
                {person.initials}
              </span>
              {person.shortName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted text-pretty">
              {person.department} {person.role.toLowerCase()}si. &ldquo;{person.subject}&rdquo; fani
              bo'yicha o'quv materiallari va talabalar bilan aloqa sahifasi.
            </p>
            <a
              href={person.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <TelegramIcon className="size-4" />
              Telegram
            </a>
          </div>

          <nav aria-label="Pastki menyu">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Bo'limlar
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-ink-muted transition hover:text-brand-600 dark:hover:text-brand-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Aloqa
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <a href={person.phone.href} className="flex items-start gap-2.5 transition hover:text-brand-600 dark:hover:text-brand-300">
                  <PhoneIcon className="mt-0.5 size-4 shrink-0" />
                  {person.phone.label}
                </a>
              </li>
              {person.email ? (
                <li>
                  <a href={person.email.href} className="flex items-start gap-2.5 break-all transition hover:text-brand-600 dark:hover:text-brand-300">
                    <MailIcon className="mt-0.5 size-4 shrink-0" />
                    {person.email.label}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 size-4 shrink-0" />
                {person.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {person.shortName}. Barcha huquqlar himoyalangan.
          </p>
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-300"
          >
            {university.name}
          </a>
        </div>
      </div>
    </footer>
  );
}
