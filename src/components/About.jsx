import { Code, Download, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import TechMarquee from "@/components/TechMarquee";
import { stackTop, stackBottom } from "@/data/stack";

/* Maliit na label na may linya — gagamitin sa EDUCATION at TECH STACK */
function SubLabel({ children, right }) {
  return (
    <div className="mt-18 mb-5 flex items-center gap-3.5">
      <span className="font-mono text-xs tracking-[0.14em] text-accent">{children}</span>
      <span className="h-px flex-1 bg-line" />
      {right && <span className="font-mono text-xs text-muted">{right}</span>}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-275 scroll-mt-4 px-5 py-20">
      <SectionHeading
        number="01"
        label="ABOUT"
        title="About"
        accent="me"
        subtitle="Turning ideas into working digital experiences"
      />

      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="font-mono text-[13px] text-dim">A bit about me</p>
          <h3 className="mt-1 mb-4 font-display text-[clamp(26px,3.6vw,34px)] leading-tight font-bold">
            I build systems that turn repetitive tasks into automated solutions.
          </h3>
          <p className="mb-3 text-[15px] text-muted">
            I&apos;m in my final year of BS Information Technology at UCU. What started with HTML and
            C++ in 2023 grew into building full systems — the kind where the database, the backend
            and the screen all have to make sense together.
          </p>
          <p className="mb-6 text-[15px] text-muted">
            My capstone, FireOps, pushed me past the browser into Unity, C# and Blender: a fire-safety
            training simulation for Android that reports scores to a Laravel API. It taught me the part
            I enjoy most — picking up a new tool fast when the problem calls for it.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="#"
              className="inline-flex min-h-11.5 items-center gap-2 rounded-xl border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
            >
              <Download size={16} /> Download CV
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-11.5 items-center gap-2 rounded-xl border border-foreground px-5 text-sm font-semibold transition hover:bg-foreground hover:text-background"
            >
              <Code size={16} /> View Projects
            </a>
          </div>
        </div>

        <div className="relative order-first mx-auto aspect-square w-[min(250px,64vw)] md:order-none">
          {/* 1. Glow */}
          <div className="absolute -inset-6 animate-pulse rounded-full bg-accent/25 blur-2xl" />

          {/* 2. Gradient ring */}
          <div className="absolute -inset-0.5 animate-[spin_8s_linear_infinite] rounded-full bg-conic from-accent via-transparent to-accent" />

          {/* 3. Photo */}
          <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-background bg-foreground">
            <Image
              src="/images/me.png"
              alt="Mark Joemarie Obra"
              fill
              sizes="250px"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* ---------- Education ---------- */}
      <SubLabel>EDUCATION</SubLabel>
        <div className="relative overflow-hidden rounded-[22px] border border-line bg-card">
          {/* Dekorasyon: violet glow + dot pattern */}
          <div className="pointer-events-none absolute -top-20 -left-12 size-60 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[14px_14px] text-foreground/10 [mask-image:linear-gradient(90deg,transparent,black)]" />

          <div className="relative flex flex-wrap items-center justify-between gap-6 px-6.5 py-6">
            {/* Course */}
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                <GraduationCap size={24} />
              </span>
              <div>
                <p className="font-display text-xl font-semibold sm:text-lg">Bachelor of Science in Information Technology</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                    Currently enrolled
                  </span>
                  <span className="rounded-full border border-line bg-surface px-2.5 py-1">4th Year</span>
                </div>
              </div>
            </div>

            {/* School */}
            <div className="sm:text-right">
              <p className="font-mono text-[11px] tracking-[0.14em] text-dim">SCHOOL</p>
              <p className="mt-1 font-semibold">Urdaneta City University</p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-muted">
                <MapPin size={13} /> Urdaneta City, Pangasinan, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Tech Stack ---------- */}
        <SubLabel right={`${stackTop.length + stackBottom.length} tools`}>TECH STACK</SubLabel>
        <div className="stack-track flex flex-col gap-3 rounded-[22px] border border-line bg-surface py-5.5">
          <TechMarquee items={stackTop} />
          <TechMarquee items={stackBottom} reverse />
        </div>
    </section>
  );
}