export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" className="h-full w-full" role="img">
        <path d="M5 8.5 13.3 16 5 23.5h6.3l8.4-7.5-8.4-7.5H5Z" fill="currentColor" />
        <path
          d="M18.5 8.5 27 16l-8.5 7.5h-6.1l8.4-7.5-8.4-7.5h6.1Z"
          fill="var(--keynex-teal-bright)"
          opacity=".86"
        />
        <path d="M15 12.6 18.9 16 15 19.4h-3.1l3.9-3.4-3.9-3.4H15Z" fill="var(--keynex-lilac)" opacity=".95" />
      </svg>
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-lg font-bold uppercase tracking-[0.18em] text-white ${className}`}>
      keyne<span className="wordmark-x">x</span>
    </span>
  );
}
