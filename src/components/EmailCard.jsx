"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";

export default function EmailCard({ email }) {
  const [copied, setCopied] = useState(false);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Hello from your portfolio")}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4.5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line">
          <Mail size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.12em] text-dim uppercase">Email</p>
          <p className="text-sm break-all">{email}</p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold transition hover:border-accent hover:text-accent sm:flex-none"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>

        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:-translate-y-0.5 sm:flex-none"
        >
          <ArrowUpRight size={14} /> Gmail
        </a>
      </div>
    </div>
  );
}