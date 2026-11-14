"use client";

import { useEffect, useState } from "react";
import { services } from "@/data/services";

/* ---------- Mga visual (isa bawat service) ---------- */

function WebVisual() {
  return (
    <div className="w-64 overflow-hidden rounded-xl border border-line bg-card shadow-[0_20px_40px_-28px_rgba(10,10,10,.4)]">
      {/* Browser top bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-2.5 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 h-3 flex-1 rounded bg-card" />
      </div>
      {/* Page na nabubuo */}
      <div className="relative flex flex-col gap-2 p-3">
        <div className="wib-build h-10 rounded-lg bg-foreground" />
        <div className="grid grid-cols-3 gap-2">
          <div className="wib-build h-9 rounded-md bg-line [animation-delay:250ms]" />
          <div className="wib-build h-9 rounded-md bg-line [animation-delay:400ms]" />
          <div className="wib-build h-9 rounded-md bg-line [animation-delay:550ms]" />
        </div>
        <div className="wib-build h-5 w-2/5 rounded-md bg-accent [animation-delay:800ms]" />
        <svg className="wib-cursor absolute top-0 left-0" width="16" height="16" viewBox="0 0 24 24">
          <path d="M4 2l16 9-7 2-3 7z" className="fill-foreground stroke-background" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="h-54 w-30 rounded-[26px] border border-line bg-card p-1.5 shadow-[0_20px_40px_-28px_rgba(10,10,10,.4)]">
      <div className="relative flex h-full flex-col gap-1.5 overflow-hidden rounded-[20px] border border-surface bg-background px-2 pt-5 pb-2">
        {/* Notch */}
        <span className="absolute top-1.5 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-line" />
        {/* Avatar + title */}
        <div className="wib-build flex items-center gap-1.5">
          <span className="size-3.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1/2 rounded-full bg-line-strong" />
        </div>
        <div className="wib-build h-11 rounded-[10px] bg-foreground [animation-delay:250ms]" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="wib-build h-8 rounded-lg bg-line [animation-delay:400ms]" />
          <div className="wib-build h-8 rounded-lg bg-line [animation-delay:550ms]" />
        </div>
        <div className="wib-build flex items-center gap-1.5 rounded-lg border border-surface bg-card p-1.5 [animation-delay:650ms]">
          <span className="size-3 rounded bg-line" />
          <span className="h-1 w-3/5 rounded-full bg-line" />
        </div>
        {/* Button + tap */}
        <div className="relative">
          <div className="wib-build h-5 rounded-md bg-accent [animation-delay:800ms]" />
          <span className="wib-tap absolute top-1/2 left-1/2 -mt-4 -ml-4 size-8 rounded-full bg-foreground" />
        </div>
        {/* Tab bar */}
        <div className="wib-build mt-auto flex justify-around border-t border-surface pt-1.5 [animation-delay:800ms]">
          <span className="size-2.5 rounded bg-accent" />
          <span className="size-2.5 rounded bg-line" />
          <span className="size-2.5 rounded bg-line" />
          <span className="size-2.5 rounded bg-line" />
        </div>
      </div>
    </div>
  );
}

function ApiVisual() {
  return (
    <div className="relative h-28 w-64">
      <div className="absolute top-8 left-0 grid h-12 w-16 place-items-center rounded-xl border border-line bg-card font-mono text-[11px] font-semibold">
        App
      </div>
      <div className="absolute top-8 right-0 grid h-12 w-16 place-items-center rounded-xl bg-foreground font-mono text-[11px] font-semibold text-background">
        API
      </div>
      {/* Dashed na linya */}
      <div className="absolute inset-x-18 top-13.75 h-0.5 bg-[repeating-linear-gradient(90deg,var(--line-strong)_0_6px,transparent_6px_12px)]" />
      {/* Request (violet) at response (green) */}
      <span className="wib-req absolute top-12.5 size-3 rounded-full bg-accent" />
      <span className="wib-res absolute top-12.5 size-3 rounded-full bg-green-600" />
      <span className="wib-label-req absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-accent">
        GET /api/projects
      </span>
      <span className="wib-label-res absolute top-19 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-green-600">
        200 OK · JSON
      </span>
    </div>
  );
}

// Lookup map: id → component (parang match() sa PHP)
const visuals = { web: WebVisual, mobile: MobileVisual, api: ApiVisual };

/* ---------- Ang card ---------- */

export default function WhatIBuild() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Visual = visuals[service.id];

  const DURATION = 4500; // 4.5s — dapat kapareho ng CSS (wib-progress)

  // Orasan: tuwing magbabago ang active, gagawa ng bagong 4.5s timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((current) => (current + 1) % services.length);
    }, DURATION);

    return () => clearTimeout(timer); // cleanup: burahin ang lumang timer
  }, [active]);

  return (
    <div className="wib-card w-full max-w-105 rounded-3xl border border-line bg-card p-4.5 shadow-[0_50px_90px_-60px_rgba(10,10,10,.45)]">
      {/* Progress bars */}
      <div className="grid grid-cols-3 gap-2">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${s.title}`}
            aria-current={i === active}
            className={`min-h-11 cursor-pointer pt-2 text-left font-mono text-[11px] tracking-[0.08em] transition-colors ${
              i === active ? "text-foreground" : "text-dim hover:text-muted"
            }`}
          >
            <span className="block h-0.75 overflow-hidden rounded-full bg-line">
              {i < active && <span className="block h-full w-full bg-foreground" />}
              {i === active && (
                <span className="wib-progress block h-full bg-accent" />
              )}
            </span>
            <span className="mt-2 block">
              {String(i + 1).padStart(2, "0")} {s.label.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Stage */}
      <div
        className="mt-3 grid h-60 place-items-center overflow-hidden rounded-2xl border border-line bg-background bg-[radial-gradient(var(--dot)_1px,transparent_1px)] bg-size-[16px_16px]"
        aria-hidden="true"
      >
        <Visual key={service.id} />
      </div>

      {/* Text — may key para mag-fade in tuwing lilipat */}
      <div key={service.id} className="wib-in">
        <div className="mt-3.5 flex items-baseline gap-2.5">
          <span className="font-mono text-xs text-accent">{String(active + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-xl font-extrabold tracking-tight">{service.title}</h3>
          <span className="ml-auto rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
            {service.tag}
          </span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{service.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {service.stack.map((tech) => (
            <span key={tech} className="rounded-lg bg-surface px-2.5 py-1 font-mono text-[11px]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="group mt-3.5 flex min-h-11 items-center justify-between border-t border-line px-1 pt-1 text-[13px]"
      >
        <span className="text-muted">Have an idea in mind?</span>
        <span className="font-bold text-accent">
          Let&apos;s build it{" "}
          <span className="inline-block transition group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
  );
}