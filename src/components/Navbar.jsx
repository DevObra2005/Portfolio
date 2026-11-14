"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { links } from "@/data/navigation";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [activePill, setActivePill] = useState({ left: 0, width: 0, visible: false });
  const [hoverPill, setHoverPill] = useState({ left: 0, width: 0, visible: false });

  const linkRefs = useRef({});
  const activeIdRef = useRef("home");
  const hoveringRef = useRef(false);

  function measure(id) {
    const el = linkRefs.current[id];
    return el ? { left: el.offsetLeft, width: el.offsetWidth, visible: true } : null;
  }

    useEffect(() => {
    function setActive(id) {
      activeIdRef.current = id;
      setActiveId(id);
      const pos = measure(id);
      if (pos) setActivePill(pos);
    }

    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    function remeasure() {
      const pos = measure(activeIdRef.current);
      if (pos) setActivePill(pos);
    }
    window.addEventListener("resize", remeasure);
    document.fonts.ready.then(remeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  function handleLinkEnter(id) {
    hoveringRef.current = true;
    const pos = measure(id);
    if (pos) setHoverPill(pos);
  }

  function handleLinksLeave() {
    hoveringRef.current = false;
    setHoverPill((prev) => ({ ...prev, visible: false }));
  }

  return (
    <>
    <nav className="fixed top-4 left-1/2 z-50 flex w-[min(1100px,calc(100%-24px))] -translate-x-1/2 items-center justify-between rounded-full border border-line bg-background/75 px-4 py-2 backdrop-blur-md">
        <a href="#home" className="flex items-center gap-2 font-display text-[15px] font-bold">
          <Logo className="size-7" />
          <span>
            dev<span className="font-normal text-muted">obra</span>
            <span className="text-accent">_</span>
          </span>
        </a>
      <div
        onMouseLeave={handleLinksLeave}
        className="relative hidden gap-1 rounded-full bg-surface p-1 md:flex"
      >
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-full bg-line transition-all duration-300 ease-out"
          style={{ left: hoverPill.left, width: hoverPill.width, opacity: hoverPill.visible ? 1 : 0 }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-full bg-foreground transition-all duration-500 ease-out"
          style={{ left: activePill.left, width: activePill.width, opacity: activePill.visible ? 1 : 0 }}
        />

        {links.map((link) => {
          const id = link.href.slice(1);
          const isActive = activeId === id;

          return (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (linkRefs.current[id] = el)}
              onMouseEnter={() => handleLinkEnter(id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative z-10 rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                isActive ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="grid size-10 place-items-center rounded-full border border-line md:hidden"
                >
                {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>
    </nav>

          {open && (
        <div className="fixed inset-x-3 top-20 z-40 flex flex-col rounded-2xl border border-line bg-background p-2 shadow-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-muted hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}