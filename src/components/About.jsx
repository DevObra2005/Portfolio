import { Code, Download } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-275 scroll-mt-4 px-5 py-20">
      <SectionHeading
        number="01"
        label="ABOUT"
        title="About Me"
        subtitle="Turning ideas into working digital experiences"
      />

      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="font-mono text-[13px] text-dim">Hello, I'm</p>
          <h3 className="mt-1 mb-4 font-display text-[clamp(26px,3.6vw,34px)] font-bold">
            Mark Joemarie Obra
          </h3>
          <p className="mb-3 text-[15px] text-muted">
            I'm a BSIT student at UCU majoring in Web Development. Most of my work lives on the
            full stack: Laravel and PHP on the backend, React and Next.js on the front, and MySQL
            holding it together.
          </p>
          <p className="mb-6 text-[15px] text-muted">
            My capstone, FireOps, pushed me past the browser into Unity, C# and Blender — a
            fire-safety training simulation that talks to a Laravel API. I like projects like
            that, where I have to learn a new tool to get the job done.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="#"
              className="inline-flex min-h-11.5 items-center gap-2 rounded-xl border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
            >
              <Download size={16} /> Download CV
            </a>
            <a
              href="#portfolio"
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
              className="object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}