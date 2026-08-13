"use client";

import { useEffect, useRef, type ComponentType } from "react";
import { animate, createDrawable, stagger } from "animejs";

type IconComponent = ComponentType<{ className?: string }>;

export function AnimatedIcon({
  icon: Icon,
  className,
  delay = 0,
}: {
  icon: IconComponent;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;

    svg.style.opacity = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        try {
          const shapes = createDrawable(svg.querySelectorAll("path, circle, rect"));
          svg.style.opacity = "1";

          animate(shapes, {
            draw: ["0 0", "0 1"],
            duration: 900,
            delay: stagger(90, { start: delay }),
            ease: "outQuad",
          });
        } catch {
          svg.style.opacity = "1";
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="inline-flex shrink-0">
      <Icon className={className} />
    </div>
  );
}
