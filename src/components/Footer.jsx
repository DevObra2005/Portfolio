import { MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { links } from "@/data/navigation";
import { email, socials } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line px-5 pt-14 pb-8">
      <div className="mx-auto grid max-w-275 gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#home" className="flex w-fit items-center gap-2.5 font-display text-[15px] font-bold">
            <Logo className="size-8" />
            <span>
              dev<span className="font-normal text-muted">obra</span>
              <span className="text-accent">_</span>
            </span>
          </a>
          <p className="mt-3 text-sm text-muted">Mark Joemarie Obra · Web Developer</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-dim">
            <MapPin size={14} /> Pangasinan, Philippines
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xs font-semibold tracking-[0.16em] uppercase">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted transition hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xs font-semibold tracking-[0.16em] uppercase">Connect</h3>
          <a href={`mailto:${email}`} className="text-sm break-all text-muted transition hover:text-accent">
            {email}
          </a>
          <div className="mt-4 flex gap-2">
            {socials
              .filter((s) => s.label !== "Email")
              .map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-[10px] border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mx-auto mt-12 max-w-275 text-center font-display text-[clamp(48px,13vw,150px)] leading-[0.85] font-extrabold tracking-tighter text-line select-none"
      >
        DEVOBRA
      </p>

      <p className="mt-6 text-center font-mono text-[11px] text-dim">
        © 2026 <span className="text-muted">Mark Joemarie Obra</span>. Built with Next.js &amp; Tailwind CSS.
      </p>
    </footer>
  );
}