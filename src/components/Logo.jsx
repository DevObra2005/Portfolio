export default function Logo({ className = "" }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="120" className="fill-foreground" />
      <circle cx="256" cy="256" r="128" fill="none" strokeWidth="64" className="stroke-background" />
    </svg>
  );
}