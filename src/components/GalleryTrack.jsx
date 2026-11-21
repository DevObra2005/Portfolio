"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gallery } from "@/data/gallery";

const SPEED = 0.5;

export default function GalleryTrack() {
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const movedRef = useRef(false); // true kapag nag-drag (hindi click)
  const loop = [...gallery, ...gallery, ...gallery, ...gallery];

  // Aling litrato ang naka-"open" (may kulay + caption) — pinipindot sa phone
  const [activeIndex, setActiveIndex] = useState(null);
  const activeRef = useRef(null);

  // Habang may naka-open na litrato, huminto ang gallery para mabasa
  useEffect(() => {
    activeRef.current = activeIndex;
    if (activeIndex !== null) pause();
    else resumeLater();
  }, [activeIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // I-cache ang lapad: binabasa lang kapag nagbago ang laki, hindi bawat frame
    let half = el.scrollWidth / 2;
    const resizeObserver = new ResizeObserver(() => {
      half = el.scrollWidth / 2;
    });
    resizeObserver.observe(el);

    let pos = el.scrollWidth / 4;
    el.scrollLeft = pos;
    let frame = null;

    function step() {
      pos = pausedRef.current ? el.scrollLeft : pos + SPEED;

      if (pos >= half) pos -= half;
      else if (pos <= 0) pos += half;

      if (!pausedRef.current || Math.abs(el.scrollLeft - pos) > 1) {
        el.scrollLeft = pos;
      }

      frame = requestAnimationFrame(step);
    }

    // Tumatakbo lang ang loop habang nasa screen ang gallery
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === null) {
        pos = el.scrollLeft;
        frame = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });
    intersectionObserver.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  function pause() {
    clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  }

  function resumeLater(ms = 2000) {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      // Huwag tumakbo ulit habang may naka-open na litrato
      if (activeRef.current === null) pausedRef.current = false;
    }, ms);
  }

  function handleSelect(i) {
    if (movedRef.current) return; // drag ito, hindi pindot
    setActiveIndex((current) => (current === i ? null : i));
  }

  function handlePointerDown(e) {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    movedRef.current = false;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    pause();
  }

  function handlePointerMove(e) {
    const drag = dragRef.current;
    if (!drag.active) return;

    if (Math.abs(e.clientX - drag.startX) > 5) movedRef.current = true;

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

  // Tapusin ang drag kahit saan ito naputol (bitaw, cancel, nawalang capture)
  function endDrag() {
    dragRef.current.active = false;
  }

  return (
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Gallery photos"
        onPointerEnter={(e) => e.pointerType === "mouse" && pause()}
        onPointerLeave={(e) => e.pointerType === "mouse" && resumeLater(300)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onTouchStart={pause}
        onTouchEnd={() => resumeLater()}
        onFocus={pause}
        onBlur={() => resumeLater()}
        className="flex cursor-grab overflow-x-auto select-none [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((photo, i) => {
          const isCopy = i >= gallery.length;
          const isActive = activeIndex === i;

          return (
            // Pindot (phone) / click: magkakulay + lalabas ang caption. Hover sa desktop, focus sa keyboard.
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              aria-pressed={isActive}
              aria-hidden={isCopy || undefined}
              tabIndex={isCopy ? -1 : 0}
              className="group relative mr-4 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-line focus-visible:-outline-offset-4"
            >
              <Image
                src={photo.image}
                alt=""
                placeholder="blur"
                sizes="320px"
                draggable={false}
                className={`h-44 w-auto transition duration-700 group-focus-visible:grayscale-0 sm:h-56 ${
                  isActive ? "scale-105 grayscale-0" : "grayscale group-hover:scale-105 group-hover:grayscale-0"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 text-left text-white transition duration-400 group-focus-visible:translate-y-0 ${
                  isActive ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
                }`}
              >
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