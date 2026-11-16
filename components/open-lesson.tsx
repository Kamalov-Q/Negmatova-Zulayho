import { openLesson } from "@/lib/content";
import { Gallery } from "./gallery";
import { SectionHeading } from "./section-heading";

export function OpenLesson() {
  return (
    <section
      id="ochiq-dars"
      className="scroll-mt-24 bg-gradient-to-br from-brand-800 to-brand-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Ochiq dars"
          title={openLesson.title}
          description={openLesson.description}
          tone="dark"
          align="left"
        />
        <Gallery />
      </div>
    </section>
  );
}
