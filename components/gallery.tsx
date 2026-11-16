"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { openLesson } from "@/lib/content";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

const photos = openLesson.photos;

export function Gallery() {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Track which slide is centred so the dots stay in sync with manual swiping.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slideWidth = rail.scrollWidth / photos.length;
        setIndex(Math.min(photos.length - 1, Math.round(rail.scrollLeft / slideWidth)));
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
    const clamped = (next + photos.length) % photos.length;
    rail.scrollTo({ left: (rail.scrollWidth / photos.length) * clamped, behavior: "smooth" });
    setIndex(clamped);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % photos.length);
      if (event.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
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
          {photos.map((photo, i) => (
            <li key={photo.src} className="w-full shrink-0 snap-center md:w-[calc(50%-0.625rem)]">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full overflow-hidden rounded-3xl border border-white/15 bg-black/10"
                aria-label={`${i + 1}-suratni kattalashtirish`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
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
          <div className="flex items-center gap-2" role="tablist" aria-label="Suratlar">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`${i + 1}-surat`}
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
              aria-label="Oldingi surat"
              className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/15 active:scale-95"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              aria-label="Keyingi surat"
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
          aria-label="Surat ko'rinishi"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Yopish"
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <CloseIcon className="size-6" />
          </button>

          <figure className="max-h-full w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1400}
              height={1050}
              sizes="(max-width: 1024px) 92vw, 896px"
              className="max-h-[78vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/75">
              {photos[lightbox].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
            }}
            aria-label="Oldingi surat"
            className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % photos.length);
            }}
            aria-label="Keyingi surat"
            className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      ) : null}
    </>
  );
}
