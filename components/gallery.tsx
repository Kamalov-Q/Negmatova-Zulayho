"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { lessonPhotos } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { fill } from "@/lib/i18n";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

const count = lessonPhotos.length;

export function Gallery({ dict }: { dict: Dictionary }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const altFor = useCallback(
    (i: number) => fill(dict.lesson.photoAlt, { n: i + 1 }),
    [dict.lesson.photoAlt],
  );

  // Track which slide is centred so the dots stay in sync with manual swiping.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slideWidth = rail.scrollWidth / count;
        setIndex(Math.min(count - 1, Math.round(rail.scrollLeft / slideWidth)));
      });
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = useCallback((next: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const clamped = (next + count) % count;
    rail.scrollTo({ left: (rail.scrollWidth / count) * clamped, behavior: "smooth" });
    setIndex(clamped);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % count);
      if (event.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + count) % count);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      <div className="relative mt-12">
        <ul
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {lessonPhotos.map((src, i) => (
            <li key={src} className="w-full shrink-0 snap-center md:w-[calc(50%-0.625rem)]">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full overflow-hidden rounded-3xl border border-white/15 bg-black/10"
                aria-label={fill(dict.lesson.enlarge, { n: i + 1 })}
              >
                <Image
                  src={src}
                  alt={altFor(i)}
                  width={1400}
                  height={1050}
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label={dict.lesson.photos}>
            {lessonPhotos.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={fill(dict.lesson.photoLabel, { n: i + 1 })}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  index === i ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              aria-label={dict.lesson.previous}
              className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/15 active:scale-95"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              aria-label={dict.lesson.next}
              className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/15 active:scale-95"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {lightbox !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dict.lesson.viewer}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={dict.lesson.close}
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <CloseIcon className="size-6" />
          </button>

          <figure className="max-h-full w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={lessonPhotos[lightbox]}
              alt={altFor(lightbox)}
              width={1400}
              height={1050}
              sizes="(max-width: 1024px) 92vw, 896px"
              className="max-h-[78vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/75">
              {altFor(lightbox)}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + count) % count);
            }}
            aria-label={dict.lesson.previous}
            className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % count);
            }}
            aria-label={dict.lesson.next}
            className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      ) : null}
    </>
  );
}
