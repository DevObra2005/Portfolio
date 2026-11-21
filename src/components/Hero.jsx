import { ArrowUpRight, Mail } from "lucide-react";
import { socials } from "@/data/socials";

// ngayon:
import WhatIBuild from "@/components/WhatIBuild";

export default function Hero() {

  return (
    <section
      id="home"
      className="mx-auto grid min-h-screen max-w-[1100px] items-center gap-12 px-5 pt-28 md:grid-cols-[1.1fr_0.9fr]"
    >
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
          <span className="size-[7px] rounded-full bg-accent" />
          Available for part-time work
        </span>

        <h1 className="mt-6 font-display text-[clamp(40px,6vw,64px)] leading-none font-extrabold tracking-tight">
          Mark Joemarie
          <span className="block text-muted">Obra</span>
        </h1>

        <p className="mt-4 font-mono text-lg font-medium">
          <span className="text-accent">&gt;</span> Software Developer
          <span className="animate-blink text-accent">_</span>
        </p>
        <p className="mt-1 mb-5 text-sm font-medium text-muted">
          Web Applications · Mobile Applications
        </p>

        <p className="mb-7 max-w-[520px] text-[15px] text-muted">
          I&apos;m an IT student who builds full-stack web applications with Laravel and React,
          with hands-on experience in Android development.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <a
            href="#projects"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
          >
            View Projects <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-foreground px-5 text-sm font-semibold transition hover:bg-foreground hover:text-background"
          >
            Let's Talk <Mail size={16} />
          </a>
        </div>

        <div className="mt-8 flex gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-[10px] border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
     <WhatIBuild />
    </section>
  );
}