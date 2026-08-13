const PALETTE = [
  "bg-teal-600/25 text-teal-300",
  "bg-[var(--keynex-lilac)]/20 text-[var(--keynex-lilac)]",
  "bg-white/10 text-white",
];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function hashIndex(name: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash % mod;
}

export function ReviewerAvatar({ name, className = "h-9 w-9" }: { name: string; className?: string }) {
  const palette = PALETTE[hashIndex(name, PALETTE.length)];
  return (
    <div
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full text-xs font-bold ${palette} ${className}`}
    >
      {initialsFor(name)}
    </div>
  );
}
