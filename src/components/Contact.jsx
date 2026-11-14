import { Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { email, socials } from "@/data/socials";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-275 scroll-mt-4 px-5 py-20">
      <SectionHeading
        number="05"
        label="CONTACT"
        title="Get In"
        accent="Touch"
        subtitle="Have a project, an internship or a part-time role in mind? Send me a message."
      />

      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-3.5">
          <a href={`mailto:${email}`} className="flex items-center gap-3.5 rounded-2xl border border-line bg-card p-4.5 transition hover:border-accent">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line">
              <Mail size={18} />
            </span>
            <div>
              <p className="text-[11px] tracking-[0.12em] text-dim uppercase">Email</p>
              <p className="text-sm break-all">{email}</p>
            </div>
          </a>

          <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-card p-4.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line">
              <MapPin size={18} />
            </span>
            <div>
              <p className="text-[11px] tracking-[0.12em] text-dim uppercase">Location</p>
              <p className="text-sm">Pangasinan, Philippines</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4.5">
            <p className="text-[11px] tracking-[0.12em] text-dim uppercase">Socials</p>
            <div className="flex gap-2">
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

          <div className="rounded-2xl bg-foreground p-5 text-background">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold">
              <span className="size-2 rounded-full bg-accent" /> Available for work
            </p>
            <p className="mt-1.5 text-sm opacity-75">Open to part-time roles, freelance projects and internships.</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}