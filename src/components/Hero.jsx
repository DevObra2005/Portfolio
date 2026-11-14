import { ArrowUpRight, Mail } from "lucide-react";
import { socials } from "@/data/socials";

import CodeWindow from "@/components/CodeWindow";

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

        <h1 className="mt-6 mb-4 font-display text-[clamp(46px,7.4vw,76px)] leading-none font-extrabold tracking-tight">
          Web
          <span className="block text-muted">Developer</span>
        </h1>
        <p className="mb-7 max-w-[520px] text-[15px] text-muted">
          I'm <strong className="font-semibold text-foreground">Mark Joemarie Obra</strong>, a
          fourth-year IT student specializing in web development. I build full-stack web apps
          with Laravel and React, and I shipped a Unity training simulation for Android as my
          capstone.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <a
            href="#portfolio"
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
        {/* Chunk B, C, D, E dito */}
      </div>
     <CodeWindow />
    </section>
  );
}