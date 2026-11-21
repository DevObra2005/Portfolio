export default function TechMarquee({ items, reverse = false }) {
  const loop = [...items, ...items]; // dalawang kopya para walang putol

  return (
    <div className="stack-mask overflow-hidden py-1">
      <ul className={`stack-row flex w-max ${reverse ? "reverse" : ""}`}>
        {loop.map(({ name, icon: Icon, color, ai }, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length || undefined}
            style={{ "--brand": color ?? "var(--foreground)" }}
            className="group mr-3 flex shrink-0 items-center gap-2.5 rounded-[14px] border border-line bg-card py-2 pr-4 pl-2 transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-(--brand)"
          >
            {/* Icon box: may tint ng sariling brand color */}
            <span className="grid size-9 place-items-center rounded-[10px] bg-[color-mix(in_oklab,var(--brand)_12%,transparent)] text-(--brand) transition-transform duration-300 group-hover:scale-110">
              <Icon size={18} />
            </span>

            <span className="text-sm font-semibold whitespace-nowrap">{name}</span>

            {/* Maliit na badge para sa AI tools */}
            {ai && (
              <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                AI
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}