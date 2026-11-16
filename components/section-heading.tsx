import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: Props) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
          tone === "dark"
            ? "bg-white/15 text-white"
            : "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
        }`}
      >
        <span className="size-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-[2.75rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed text-pretty sm:text-lg ${
            tone === "dark" ? "text-white/80" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
