import type { Locale } from "../i18n";
import { uz, type Dictionary } from "./uz";
import { ru } from "./ru";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { uz, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
