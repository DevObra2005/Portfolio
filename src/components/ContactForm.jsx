"use client";

import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import { email as myEmail } from "@/data/socials";

const initialForm = { name: "", email: "", subject: "", message: "" };

const labelClass = "mb-1.5 block text-[11px] tracking-[0.12em] text-dim uppercase";
const inputClass = "w-full rounded-xl border border-line bg-background px-3.5 py-3 text-sm outline-none transition placeholder:text-dim focus:border-accent focus:ring-3 focus:ring-accent/15";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [opened, setOpened] = useState(null); // ← BAGO: null | "app" | "gmail"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject = form.subject.trim() || `Portfolio inquiry from ${form.name}`;
    const body = `Hi Mark,\n\n${form.message}\n\n— ${form.name}\n${form.email}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // ← BAGO

    if (isMobile) {
      // ← BAGO: sa phone, buksan ang email app (Gmail app sa Android, Mail sa iPhone)
      const mailtoUrl =
        `mailto:${myEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      setOpened("app");
    } else {
      // sa laptop, buksan ang Gmail sa bagong tab
      const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(myEmail)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank", "noopener,noreferrer");
      setOpened("gmail");
    }

    setForm(initialForm);
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
        <label htmlFor="subject" className={labelClass}>Subject</label>
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
        {opened && (
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