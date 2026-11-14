"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

export default function EmailCard({ email }) {
  const [copied, setCopied] = useState(false);

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
    <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-card p-4.5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line">
        <Mail size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] tracking-[0.12em] text-dim uppercase">Email</p>
        <p className="text-sm break-all">{email}</p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address"
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold transition hover:border-accent hover:text-accent"
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
    </div>
  );
}