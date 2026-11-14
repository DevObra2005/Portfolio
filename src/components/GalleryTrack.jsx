"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gallery } from "@/data/gallery";

const SPEED = 0.5;

export default function GalleryTrack() {
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);
    const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const loop = [...gallery, ...gallery, ...gallery, ...gallery];

  useEffect(() => {
    const el = scrollerRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = el.scrollWidth / 4;
    el.scrollLeft = pos;
    let frame;

    function step() {
      const half = el.scrollWidth / 2;

      pos = pausedRef.current ? el.scrollLeft : pos + SPEED;

      if (pos >= half) pos -= half;
      else if (pos <= 0) pos += half;

      if (!pausedRef.current || Math.abs(el.scrollLeft - pos) > 1) {
        el.scrollLeft = pos;
      }

      frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  function pause() {
    clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  }

  function resumeLater(ms = 2000) {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  }

  function handlePointerDown(e) {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    pause();
  }

  function handlePointerMove(e) {
    const drag = dragRef.current;
    if (!drag.active) return;

    const el = scrollerRef.current;
    const half = el.scrollWidth / 2;
    let target = drag.startScroll - (e.clientX - drag.startX);

    if (target >= half) {
      target -= half;
      drag.startScroll -= half;
    } else if (target <= 0) {
      target += half;
      drag.startScroll += half;
    }

    el.scrollLeft = target;
  }

  function handlePointerUp() {
    dragRef.current.active = false;
  }

  return (
    <div
      ref={scrollerRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && pause()}
      onPointerLeave={(e) => e.pointerType === "mouse" && resumeLater(300)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={pause}
      onTouchEnd={() => resumeLater()}
      className="flex cursor-grab overflow-x-auto select-none [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
        {loop.map((photo, i) => {
          const isCopy = i >= gallery.length;

          return (
            <button
              key={i}
              type="button"
              aria-hidden={isCopy}
              tabIndex={isCopy ? -1 : 0}
              className="group relative mr-4 shrink-0 overflow-hidden rounded-2xl border border-line outline-none"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                placeholder="blur"
                sizes="320px"
                draggable={false}
                className="h-44 w-auto grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus:grayscale-0 sm:h-56"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/80 to-transparent p-3 text-left text-white transition duration-400 group-hover:translate-y-0 group-focus:translate-y-0">
                <span className="block text-sm font-semibold">{photo.title}</span>
                <span className="block font-mono text-[11px] opacity-75">
                  {photo.tag} · {photo.date}
                </span>
              </span>
            </button>
          );
        })}
      </div>
  );
}