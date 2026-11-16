"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { materials, materialsAvailable } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ArrowRightIcon, FileIcon } from "./icons";

const TOAST_MESSAGE = "Yaqinda qo'shiladi";
const TOAST_DURATION = 2600;

export function Materials() {
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  // Every click restarts the countdown so rapid taps keep the toast on screen.
  const showToast = useCallback(() => {
    setToastVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToastVisible(false), TOAST_DURATION);
  }, []);

  const cardClassName =
    "group flex h-full w-full flex-col rounded-3xl border border-hairline bg-[var(--surface)] p-6 text-left transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/8";

  return (
    <section id="materiallar" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Fanga oid materiallar"
          title="O'quv materiallari"
          description={
            materialsAvailable
              ? "Har bir material Google Drive’da saqlanadi va yangi oynada ochiladi. Yuklab olish uchun fayl ustidagi yuklash tugmasidan foydalaning."
              : "Fan bo'yicha materiallar ro'yxati quyida keltirilgan. Fayllar hozircha tayyorlanmoqda va tez orada shu yerdan ochiladi."
          }
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => {
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-200">
                    <FileIcon className="size-6" />
                  </span>
                  <span className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-bold tracking-wider text-ink-muted">
                    {material.type}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink text-pretty">
                  {material.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
                  {material.description}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-brand-600 dark:text-brand-300">
                  {materialsAvailable ? "Ochish" : "Tez orada"}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </>
            );

            return (
              <Reveal as="li" key={material.title} delay={(index % 3) * 70}>
                {materialsAvailable ? (
                  <a
                    href={material.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {body}
                  </a>
                ) : (
                  <button type="button" onClick={showToast} className={cardClassName}>
                    {body}
                  </button>
                )}
              </Reveal>
            );
          })}
        </ul>

        {materialsAvailable ? (
          <Reveal className="mt-8">
            <p className="rounded-2xl border border-dashed border-hairline px-5 py-4 text-sm text-ink-muted">
              Fayl ochilmasa yoki ruxsat so'ralsa, Telegram orqali yozing — havolani yangilab
              beraman.
            </p>
          </Reveal>
        ) : null}
      </div>

      {/* Click feedback for the disabled cards; kept mounted so the status role
          announces the message instead of the whole region appearing. */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 left-4 right-20 z-50 flex justify-center transition-all duration-300 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toastVisible ? (
          <span className="rounded-full bg-brand-950 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-950/30 ring-1 ring-white/10">
            {TOAST_MESSAGE}
          </span>
        ) : null}
      </div>
    </section>
  );
}
