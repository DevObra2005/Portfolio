export default function DotBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(var(--dot)_1px,transparent_1px)] bg-size-[26px_26px] [mask-image:radial-gradient(ellipse_at_50%_30%,#000_30%,transparent_85%)]"
    />
  );
}