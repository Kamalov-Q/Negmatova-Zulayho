"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navIds, person } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { localeNames, localeShort, locales, type Locale } from "@/lib/i18n";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  GlobeIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  TelegramIcon,
} from "./icons";

export function SiteHeader({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const sheetRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently nearest the top of the viewport.
  useEffect(() => {
    const sections = navIds
      .map((id) => document.getElementById(id))
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

  // Lock background scrolling while the mobile sheet is open, and move focus into it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setLangOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dismiss the language menu on any click outside of it.
  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [langOpen]);

  /* The current theme is read from the DOM on click rather than held in state, so
     the button renders identically on the server and never mismatches. */
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";

    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice simply lasts for this visit.
    }
  }, []);

  /**
   * Switching locale is a soft navigation, and Next's own post-navigation focus
   * handling calls scrollIntoView on the page's landmarks — which, with
   * `scroll-behavior: smooth`, glided the reader down to the footer. Passing
   * `scroll: false` hands scrolling back to us: the position simply stays put.
   */
  const switchLocale = useCallback(
    (locale: Locale) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setOpen(false);
      setLangOpen(false);
      router.push(`/${locale}`, { scroll: false });
    },
    [router],
  );

  // The logo scrolls home instead of linking to #top, so the address bar never
  // keeps a stale fragment. Omitting `behavior` uses the CSS scroll-behavior,
  // which already falls back to an instant jump under prefers-reduced-motion.
  const scrollHome = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setOpen(false);
      window.scrollTo({ top: 0 });
      if (window.location.hash) {
        window.history.replaceState(null, "", `/${lang}`);
      }
    },
    [lang],
  );

  const onLight = !scrolled && !open;

  // One shared shape for the utility controls so they read as a set rather than
  // as unrelated buttons: same height, same border, same hover.
  const utility = `inline-flex h-10 items-center justify-center rounded-xl border transition ${
    onLight
      ? "border-white/25 text-white hover:border-white/40 hover:bg-white/10"
      : "border-hairline text-ink hover:surface-muted"
  }`;
  const iconButton = `${utility} w-10`;

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
      {/* Dims the page behind the open sheet; tapping it closes the menu. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-0 bg-brand-950/50 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div className="relative z-20 mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:h-20 sm:px-6">
        <a
          href={`/${lang}`}
          onClick={scrollHome}
          className={`flex shrink-0 items-center gap-2.5 font-display text-base font-extrabold tracking-tight transition-colors ${
            onLight ? "text-white" : "text-ink"
          }`}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-sm font-black text-white shadow-lg shadow-brand-500/25">
            {person.initials}
          </span>
          <span className="hidden whitespace-nowrap sm:inline">{person.shortName}</span>
        </a>

        {/* The links sit inside one track so the bar reads as a single nav
            control instead of five free-floating buttons. */}
        <nav aria-label={dict.common.mainMenu} className="hidden flex-1 justify-center xl:flex">
          <ul
            className={`flex items-center gap-0.5 rounded-full border p-1 ${
              onLight
                ? "border-white/15 bg-white/10 backdrop-blur-sm"
                : "border-hairline bg-[var(--surface-muted)]"
            }`}
          >
            {navIds.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                      onLight
                        ? isActive
                          ? "bg-white text-brand-700 shadow-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                        : isActive
                          ? "bg-[var(--surface)] text-brand-700 shadow-sm dark:bg-brand-500/20 dark:text-brand-200"
                          : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {dict.nav[id]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
          {/* Collapsed to a single control: three visible language buttons made
              the bar feel like a toolbar. */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLangOpen((value) => !value)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              aria-label={dict.common.languageSwitch}
              className={`${utility} gap-1.5 px-2.5 text-xs font-bold`}
            >
              <GlobeIcon className="size-4" />
              {localeShort[lang]}
              <ChevronDownIcon
                className={`size-3.5 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              role="menu"
              aria-label={dict.common.language}
              className={`absolute right-0 top-full mt-2 w-44 origin-top-right rounded-2xl border border-hairline bg-[var(--surface)] p-1.5 shadow-xl shadow-brand-950/15 transition-all duration-200 ${
                langOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              {locales.map((locale) => {
                const isActive = locale === lang;
                return (
                  <a
                    key={locale}
                    role="menuitem"
                    href={`/${locale}`}
                    hrefLang={locale}
                    onClick={switchLocale(locale)}
                    aria-current={isActive ? "true" : undefined}
                    tabIndex={langOpen ? 0 : -1}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
                        : "text-ink-muted hover:surface-muted hover:text-ink"
                    }`}
                  >
                    {localeNames[locale]}
                    {isActive ? <CheckIcon className="size-4 shrink-0" /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dict.common.themeToggle}
            title={dict.common.themeTitle}
            className={iconButton}
          >
            {/* Which icon shows is decided in CSS by the same `dark` variant that
                drives the palette, so no theme state is needed to render it. */}
            <MoonIcon className="size-5 dark:hidden" />
            <SunIcon className="hidden size-5 dark:block" />
          </button>

          <a
            href={person.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.98] sm:inline-flex"
          >
            <TelegramIcon className="size-4" />
            {dict.common.telegram}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            className={`${iconButton} relative xl:hidden`}
          >
            <MenuIcon
              className={`absolute size-5 transition-all duration-300 ${
                open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <CloseIcon
              className={`absolute size-5 transition-all duration-300 ${
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={sheetRef}
        inert={!open}
        className={`absolute inset-x-0 top-full z-10 origin-top px-3 pb-4 transition-all duration-300 xl:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-3xl border border-hairline bg-[var(--surface)] p-3 shadow-2xl shadow-brand-950/25">
          <nav aria-label={dict.common.mobileMenu}>
            <ul className="flex flex-col gap-0.5">
              {navIds.map((id, index) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      // Rows cascade in behind the sheet itself rather than all at once.
                      style={{ transitionDelay: open ? `${70 + index * 40}ms` : "0ms" }}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-semibold transition-all duration-300 ${
                        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      } ${
                        isActive
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
                          : "text-ink hover:surface-muted"
                      }`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-xl text-[11px] font-black tabular-nums transition-colors ${
                          isActive
                            ? "bg-brand-500 text-white"
                            : "bg-[var(--surface-muted)] text-ink-muted"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{dict.nav[id]}</span>
                      <ChevronRightIcon
                        className={`size-4 shrink-0 transition-colors ${
                          isActive ? "text-brand-500 dark:text-brand-300" : "text-ink-muted/40"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-3 border-t border-hairline px-1 pt-3">
            <p className="px-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
              {dict.common.language}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {locales.map((locale) => {
                const isActive = locale === lang;
                return (
                  <a
                    key={locale}
                    href={`/${locale}`}
                    hrefLang={locale}
                    onClick={switchLocale(locale)}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-2xl border px-2 py-2.5 text-center text-sm font-semibold transition ${
                      isActive
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
                        : "border-hairline text-ink-muted hover:surface-muted hover:text-ink"
                    }`}
                  >
                    {localeNames[locale]}
                  </a>
                );
              })}
            </div>
          </div>

          <a
            href={person.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.99]"
          >
            <TelegramIcon className="size-5" />
            {dict.common.telegramWrite}
          </a>
        </div>
      </div>
    </header>
  );
}
