import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProgressTrack from "@/components/ProgressTrack";
import { degree } from "@/data/academic";

export default function Academic() {
  return (
    <section id="academic" className="mx-auto max-w-275 scroll-mt-4 px-5 py-20">
      <SectionHeading
        number="02"
        label="ACADEMIC"
        title="Academic"
        accent="Foundation"
        subtitle="Four years of building, breaking and learning"
      />

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4">
        <div className="flex items-center gap-3.5">
          <span className="grid size-11 place-items-center rounded-xl bg-foreground text-background">
            <GraduationCap size={20} />
          </span>
          <div>
            <h3 className="font-display font-bold">{degree.title}</h3>
            <p className="text-sm text-muted">
              {degree.major} · {degree.school}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-xs text-dim">
            Year {degree.currentYear} of {degree.totalYears}
          </p>
          <div className="mt-1.5 h-1 w-24 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent" style={{ width: `${degree.progress}%` }} />
          </div>
        </div>
      </div>

      <ProgressTrack />
    </section>
  );
}