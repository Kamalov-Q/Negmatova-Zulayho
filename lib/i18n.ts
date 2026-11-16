/**
 * Locale constants only — safe to import from Client Components. The dictionaries
 * themselves live in `lib/dictionaries` so they never reach the client bundle
 * except as the single serialized object the page passes down.
 */
export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

/** Each language is always written in its own language, never translated. */
export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export const localeShort: Record<Locale, string> = { uz: "UZ", ru: "RU", en: "EN" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
