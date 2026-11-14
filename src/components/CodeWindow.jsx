"use client";

import { useEffect, useState } from "react";

const colors = {
  keyword: "text-[#c792ea]",
  variable: "text-[#82aaff]",
  prop: "text-[#89ddff]",
  string: "text-[#c3e88d]",
  status: "text-[#f78c6c]",
  comment: "text-[#6e7681] italic",
  plain: "",
};

const lines = [
  [["const ", "keyword"], ["developer", "variable"], [" = {", "plain"]],
  [["  name", "prop"], [": ", "plain"], ['"Mark Joemarie"', "string"], [",", "plain"]],
  [["  role", "prop"], [": ", "plain"], ['"Web Developer"', "string"], [",", "plain"]],
  [["  school", "prop"], [": ", "plain"], ['"UCU — BSIT"', "string"], [",", "plain"]],
  [["  skills", "prop"], [": [", "plain"], ['"Laravel", "React", "Next.js"', "string"], ["],", "plain"]],
  [["  status", "prop"], [": ", "plain"], ['"Open for part-time"', "status"]],
  [["};", "plain"]],
  [["// building something cool...", "comment"]],
];

export default function CodeWindow() {
    const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= lines.length) return;

    const timer = setTimeout(() => setVisible(visible + 1), 180);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className="animate-float overflow-hidden rounded-2xl border border-[#21262d] bg-[#0d1117] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[11px] text-[#6e7681]">developer.js</span>
      </div>

      <pre className="p-5 font-mono text-[13px] leading-[1.85] whitespace-pre-wrap text-[#c9d1d9]">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${i < visible ? "opacity-100" : "opacity-0"}`}
          >
            {line.map(([text, type], j) => (
              <span key={j} className={colors[type]}>{text}</span>
            ))}
            {i === visible - 1 && (
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-[#c9d1d9]" />
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}