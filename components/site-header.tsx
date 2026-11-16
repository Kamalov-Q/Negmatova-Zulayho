"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/lib/content";
import { CloseIcon, MenuIcon, TelegramIcon } from "./icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently nearest the top of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock background scrolling while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        open
          ? "bg-[var(--surface)] shadow-[0_10px_30px_-20px_rgb(0_0_0/0.4)]"
          : scrolled
            ? "bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] shadow-[0_1px_0_0_var(--hairline),0_10px_30px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <a
          href="#top"
          className={`flex items-center gap-2.5 font-display text-base font-extrabold tracking-tight transition-colors ${
            scrolled || open ? "text-ink" : "text-white"
          }`}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-sm font-black text-white shadow-lg shadow-brand-500/25">
            {person.initials}
          </span>
          <span className="hidden sm:inline">{person.shortName}</span>
        </a>

        <nav aria-label="Asosiy menyu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      scrolled
                        ? isActive
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
                          : "text-ink-muted hover:text-ink"
                        : isActive
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={person.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.98] sm:inline-flex"
          >
            <TelegramIcon className="size-4" />
            Telegram
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            className={`grid size-11 place-items-center rounded-xl border transition lg:hidden ${
              scrolled || open
                ? "border-hairline text-ink hover:surface-muted"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-hairline surface lg:hidden"
      >
        <nav aria-label="Mobil menyu" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold transition-colors ${
                    active === item.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
                      : "text-ink hover:surface-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={person.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3.5 text-base font-semibold text-white"
          >
            <TelegramIcon className="size-5" />
            Telegramda yozish
          </a>
        </nav>
      </div>
    </header>
  );
}
