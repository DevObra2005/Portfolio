"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Flame } from "lucide-react";
import { years } from "@/data/academic";

export default function ProgressTrack() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
            <div className="absolute top-0 bottom-0 left-1.75 w-0.5 bg-line-strong md:top-1.75 md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto" />

      <div
        className={`absolute top-0 left-1.75 w-0.5 bg-accent transition-all duration-1600 ease-out md:top-1.75 md:left-0 md:h-0.5 ${
          inView ? "h-full md:w-[calc(75%+20px)]" : "h-0 md:w-0"
        }`}
      />

            <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
        {years.map((y, i) => (
          <li key={y.n} className="relative pl-9 md:pl-0 md:pt-9">
            <span
              className={`absolute top-1 left-0 size-4 rounded-full border-2 transition-colors duration-300 md:top-0 ${
                inView ? "border-accent bg-accent" : "border-line-strong bg-background"
              }`}
              style={{ transitionDelay: `${i * 400}ms` }}
            >
              {y.current && inView && (
                <span className="absolute -inset-1.5 animate-ping rounded-full border-2 border-accent" />
              )}
            </span>

            <div
              className={`rounded-2xl bg-card p-4 transition-all duration-500 ${
                y.current ? "border-2 border-accent" : "border border-line"
              } ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              <p className={`font-mono text-[11px] ${y.current ? "text-accent" : "text-dim"}`}>
                {y.year} · {y.current ? "now" : y.n}
              </p>
              <h4 className="mt-1 font-display text-lg font-bold">{y.title}</h4>
              <p className="mb-3 text-xs text-muted">{y.sub}</p>

              <div className="flex flex-wrap gap-1.5">
                {y.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              {y.project && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <Flame size={14} className="text-accent" /> {y.project}
                  </p>
                  {y.projectStatus && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      <Check size={12} /> {y.projectStatus}
                    </span>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}