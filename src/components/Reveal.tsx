"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// wraps content so it fades/slides into view once it's scrolled into the viewport
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // watch the wrapped element and trigger the reveal once it enters the viewport, then stop watching
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { animationDelay: `${delayMs}ms` } : undefined}
      className={cn(!visible && "opacity-0", visible && "animate-fade-in-up", className)}
    >
      {children}
    </div>
  );
}
