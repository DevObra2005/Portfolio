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

  // Tapusin ang drag kahit saan ito naputol (bitaw, cancel, nawalang capture)
  function endDrag() {
    dragRef.current.active = false;
  }

  return (
    // Ring sa wrapper: naka-mask ang scroller kaya hindi kita ang sarili nitong outline
    <div className="rounded-2xl has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent">
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Gallery photos, scroll sideways"
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
        className="group/track flex cursor-grab overflow-x-auto select-none [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] focus-visible:outline-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((photo, i) => {
          const isCopy = i >= gallery.length;

          return (
            <figure
              key={i}
              aria-hidden={isCopy || undefined}
              className="group relative mr-4 shrink-0 overflow-hidden rounded-2xl border border-line"
            >
              <Image
                src={photo.image}
                alt=""
                placeholder="blur"
                sizes="320px"
                draggable={false}
                className="h-44 w-auto grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus-visible/track:grayscale-0 sm:h-56"
              />
              {/* Caption: hover sa mouse, laging kita sa touch, kita rin kapag naka-focus ang track */}
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/80 to-transparent p-3 text-left text-white transition duration-400 group-hover:translate-y-0 group-focus-visible/track:translate-y-0 [@media(hover:none)]:translate-y-0">
                <span className="block text-sm font-semibold">{photo.title}</span>
                <span className="block font-mono text-[11px] opacity-75">
                  {photo.tag} · {photo.date}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}