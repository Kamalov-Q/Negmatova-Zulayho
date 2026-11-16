import type { Dictionary } from "@/lib/dictionaries";
import { Gallery } from "./gallery";
import { SectionHeading } from "./section-heading";

export function OpenLesson({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="ochiq-dars"
      className="scroll-mt-24 bg-gradient-to-br from-brand-800 to-brand-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={dict.lesson.eyebrow}
          title={dict.lesson.title}
          description={dict.lesson.description}
          tone="dark"
          align="left"
        />
        <Gallery dict={dict} />
      </div>
    </section>
  );
}
