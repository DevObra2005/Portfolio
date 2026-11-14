"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

const initialForm = { name: "", email: "", subject: "", message: "" };

const labelClass = "mb-1.5 block text-[11px] tracking-[0.12em] text-dim uppercase";
const inputClass = "w-full rounded-xl border border-line bg-background px-3.5 py-3 text-sm outline-none transition placeholder:text-dim focus:border-accent focus:ring-3 focus:ring-accent/15";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
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
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} placeholder="Tell me about your project..." className={`${inputClass} resize-y`} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "sent" && (
          <span className="flex items-center gap-1.5 text-accent">
            <CircleCheck size={16} /> Message sent! I'll get back to you soon.
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-red-500">
            <CircleAlert size={16} /> {errorMessage}
          </span>
        )}
      </p>
    </form>
  );
}