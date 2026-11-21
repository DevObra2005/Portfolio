"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef(null);

  function applyTheme(next) {
    // I-apply agad sa <html> para makuha ng View Transition ang bagong itsura
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    flushSync(() => setTheme(next));
  }

  function handleClick() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Walang View Transitions (o reduced motion): palit agad, walang bilog
    if (!document.startViewTransition || reduced) {
      setTheme(next);
      return;
    }

    // Gitna ng button = pinanggagalingan ng bilog
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    // Radius na aabot hanggang sa pinakamalayong sulok ng screen
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Habang nagpapalit: patayin ang color transitions ng ibang elements
    // para ang bilog lang ang gumagalaw
    const root = document.documentElement;
    root.classList.add("theme-switching");

    const transition = document.startViewTransition(() => applyTheme(next));

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            // Nagsisimula sa laki mismo ng button, para kitang galing doon
            `circle(${rect.width / 2}px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          // Mabagal sa simula (kita ang pinanggalingan), bibilis, tapos lalapag nang malambot
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.finally(() => root.classList.remove("theme-switching"));
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-10 place-items-center rounded-full border border-line transition hover:bg-foreground hover:text-background"
    >
      <Moon size={18} className="dark:hidden" />
      <Sun size={18} className="hidden dark:block" />
    </button>
  );
}
