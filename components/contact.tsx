"use client";

import { useState, type FormEvent } from "react";
import { person } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  SpinnerIcon,
  TelegramIcon,
} from "./icons";

type Errors = Partial<Record<"name" | "phone" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

export function Contact({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const t = dict.contact.form;

  const fields = [
    {
      name: "name",
      label: t.name,
      type: "text",
      placeholder: t.namePlaceholder,
      required: true,
      autoComplete: "name",
    },
    {
      name: "direction",
      label: t.direction,
      type: "text",
      placeholder: t.directionPlaceholder,
      required: false,
      autoComplete: "off",
    },
    {
      name: "group",
      label: t.group,
      type: "text",
      placeholder: t.groupPlaceholder,
      required: false,
      autoComplete: "off",
    },
    {
      name: "phone",
      label: t.phone,
      type: "tel",
      placeholder: t.phonePlaceholder,
      required: true,
      autoComplete: "tel",
    },
  ] as const;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nextErrors: Errors = {};
    if (!data.name || data.name.trim().length < 3) {
      nextErrors.name = t.errors.name;
    }
    if (!/^[+()\d\s-]{7,20}$/.test(data.phone ?? "")) {
      nextErrors.phone = t.errors.phone;
    }
    if (!data.message || data.message.trim().length < 5) {
      nextErrors.message = t.errors.message;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The locale travels with the request so server-side validation replies
        // come back in the language the visitor is reading.
        body: JSON.stringify({ ...data, locale: lang }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result?.errors) setErrors(result.errors as Errors);
        setServerError(result?.error ?? t.genericError);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setServerError(t.networkError);
      setStatus("error");
    }
  }

  return (
    <section id="aloqa" className="scroll-mt-24 bg-[var(--surface-muted)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          description={dict.contact.description}
          align="left"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <Reveal className="flex flex-col gap-3">
            <a
              href={person.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-hairline bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                <TelegramIcon className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink-muted">
                  {dict.contact.telegramLead}
                </span>
                <span className="block truncate font-display text-base font-bold text-ink">
                  {person.telegram.label}
                </span>
              </span>
              <ArrowRightIcon className="size-5 shrink-0 text-brand-500 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={person.phone.href}
              className="group flex items-center gap-4 rounded-3xl border border-hairline bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-200">
                <PhoneIcon className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink-muted">
                  {dict.contact.phoneLabel}
                </span>
                <span className="block truncate font-display text-base font-bold text-ink">
                  {person.phone.label}
                </span>
              </span>
            </a>

            {person.email ? (
              <a
                href={person.email.href}
                className="group flex items-center gap-4 rounded-3xl border border-hairline bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-200">
                  <MailIcon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink-muted">
                    {dict.contact.emailLabel}
                  </span>
                  <span className="block truncate font-display text-base font-bold text-ink">
                    {person.email.label}
                  </span>
                </span>
              </a>
            ) : null}
          </Reveal>

          <Reveal delay={90}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-4xl border border-hairline bg-[var(--surface)] p-6 shadow-xl shadow-brand-900/5 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const error = errors[field.name as keyof Errors];
                  return (
                    <div key={field.name} className={field.name === "name" || field.name === "phone" ? "sm:col-span-2" : ""}>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-sm font-semibold text-ink"
                      >
                        {field.label}
                        {field.required ? (
                          <span className="ml-1 text-accent-500" aria-hidden>
                            *
                          </span>
                        ) : (
                          <span className="ml-1.5 text-xs font-normal text-ink-muted">
                            {t.optional}
                          </span>
                        )}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        required={field.required}
                        aria-invalid={error ? "true" : undefined}
                        aria-describedby={error ? `${field.name}-error` : undefined}
                        className={`w-full rounded-2xl border bg-transparent px-4 py-3.5 text-base text-ink transition placeholder:text-ink-muted/60 focus:outline-none focus:ring-4 ${
                          error
                            ? "border-accent-500 focus:ring-accent-500/15"
                            : "border-hairline focus:border-brand-500 focus:ring-brand-500/15"
                        }`}
                      />
                      {error ? (
                        <p id={`${field.name}-error`} className="mt-1.5 text-sm font-medium text-accent-500">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                })}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
                    {t.message}
                    <span className="ml-1 text-accent-500" aria-hidden>
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    required
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full resize-y rounded-2xl border bg-transparent px-4 py-3.5 text-base text-ink transition placeholder:text-ink-muted/60 focus:outline-none focus:ring-4 ${
                      errors.message
                        ? "border-accent-500 focus:ring-accent-500/15"
                        : "border-hairline focus:border-brand-500 focus:ring-brand-500/15"
                    }`}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1.5 text-sm font-medium text-accent-500">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  // min-width keeps the button from resizing when the label swaps
                  // to "sending", which otherwise shifts on every submit.
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-success-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-success-500/30 transition-all duration-200 hover:bg-success-600 hover:shadow-xl hover:shadow-success-500/35 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-success-500 disabled:hover:shadow-lg sm:w-auto sm:min-w-[13rem]"
                >
                  {status === "sending" ? (
                    <>
                      <SpinnerIcon className="size-5 animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <SendIcon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              <div aria-live="polite" className="mt-4">
                {status === "sent" ? (
                  <p className="flex items-start gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">
                    <CheckIcon className="mt-0.5 size-4 shrink-0" />
                    {t.success}
                  </p>
                ) : null}
                {status === "error" && serverError ? (
                  <p className="rounded-2xl bg-accent-500/10 px-4 py-3 text-sm font-semibold text-accent-600">
                    {serverError}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
