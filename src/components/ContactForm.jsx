"use client";

import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import { email as myEmail } from "@/data/socials";

const initialForm = { name: "", email: "", subject: "", message: "" };

const labelClass = "mb-1.5 block text-[11px] tracking-[0.12em] text-dim uppercase";
// text-base sa phone: nagzo-zoom ang iOS Safari kapag mas maliit sa 16px ang input
const inputClass = "w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base sm:text-sm outline-none transition placeholder:text-dim focus:border-accent focus:ring-3 focus:ring-accent/15";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [opened, setOpened] = useState(null); // ← BAGO: null | "app" | "gmail" | "blocked"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const subject = form.subject.trim() || `Portfolio inquiry from ${form.name}`;
  const body = `Hi Mark,\n\n${form.message}\n\n— ${form.name}\n${form.email}`;
  const mailtoUrl =
    `mailto:${myEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  function handleSubmit(e) {
    e.preventDefault();

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // ← BAGO

    if (isMobile) {
      // ← BAGO: sa phone, buksan ang email app (Gmail app sa Android, Mail sa iPhone)
      window.location.href = mailtoUrl;
      setOpened("app");
      setForm(initialForm);
    } else {
      // sa laptop, buksan ang Gmail sa bagong tab
      const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(myEmail)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      // Walang "noopener" sa features para malaman kung na-block ang popup;
      // pinuputol ang opener nang manual pagkatapos.
      const tab = window.open(gmailUrl, "_blank");

      if (tab) {
        tab.opener = null;
        setOpened("gmail");
        setForm(initialForm);
      } else {
        // Na-block: huwag burahin ang mensahe, ipakita ang ibang paraan
        setOpened("blocked");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-card p-6">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Juan Dela Cruz" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} placeholder="Tell me about your project..." className={`${inputClass} resize-y`} />
      </div>

      <button
        type="submit"
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Send size={16} /> Send Message {/* ← BAGO: hindi na "via Gmail" kasi app ang bubukas sa phone */}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {opened === "blocked" && (
          <span className="text-muted">
            Your browser blocked the Gmail tab. Your message is still here.{" "}
            <a href={mailtoUrl} className="font-semibold text-accent underline underline-offset-2">
              Use your email app
            </a>{" "}
            or allow pop-ups and press Send again.
          </span>
        )}
        {(opened === "app" || opened === "gmail") && (
          <span className="flex items-center gap-1.5 text-accent">
            <CircleCheck size={16} />
            {/* ← BAGO: ibang mensahe depende kung saan bumukas */}
            {opened === "app"
              ? "Your email app is open — just hit Send there."
              : "Gmail opened in a new tab — just hit Send there."}
          </span>
        )}
      </p>
    </form>
  );
}