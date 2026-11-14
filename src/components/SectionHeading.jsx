export default function SectionHeading({ number, label, title, accent, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <span className="mb-2.5 block font-mono text-xs tracking-[0.14em] text-accent">
        {number} / {label}
      </span>

      <h2 className="flex items-center justify-center gap-4 font-display text-[clamp(30px,4.8vw,44px)] font-bold">
        <span className="h-px max-w-50 flex-1 bg-linear-to-r from-transparent to-line-strong" />
        <span>
          {title} {accent && <span className="font-semibold text-muted">{accent}</span>}
        </span>
        <span className="h-px max-w-50 flex-1 bg-linear-to-l from-transparent to-line-strong" />
      </h2>

      {subtitle && <p className="mx-auto mt-2 max-w-140 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}