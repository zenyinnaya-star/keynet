"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type SpecularButtonProps = {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  onClick?: () => void;
  className?: string;
};

const SIZE_PADDING: Record<NonNullable<SpecularButtonProps["size"]>, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-xs",
  lg: "px-9 py-4 text-sm",
};

export default function SpecularButton({
  children,
  size = "md",
  radius = 999,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 0,
  textColor = "#ffffff",
  lineColor = "#ffffff",
  baseColor = "#111111",
  intensity = 1,
  shineSize = 60,
  shineFade = 60,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 200,
  autoAnimate = false,
  onClick,
  className = "",
}: SpecularButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(autoAnimate);

  useEffect(() => {
    if (!followMouse) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
      const within = dist <= proximity + Math.max(rect.width, rect.height) / 2;
      setActive(within || autoAnimate);
      if (!within) return;
      setPos({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [followMouse, proximity, autoAnimate]);

  useEffect(() => {
    if (!autoAnimate) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = ((now - start) / 1000) * speed;
      setPos({
        x: 50 + Math.cos(t * Math.PI * 2) * 45 + 50 * 0,
        y: 50 + Math.sin(t * Math.PI * 2) * 45 * 0.4,
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoAnimate, speed]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden font-bold tracking-[0.2em] uppercase transition-transform duration-200 active:scale-[0.97] ${SIZE_PADDING[size]} ${className}`}
      style={{
        borderRadius: radius,
        color: textColor,
        backgroundColor: baseColor,
        border: `${thickness}px solid ${lineColor}`,
        transitionProperty: "transform, box-shadow",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background: tintOpacity > 0 ? tint : undefined,
          opacity: tintOpacity,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute transition-opacity"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: `${shineSize * 2}%`,
          height: `${shineSize * 2}%`,
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,0) ${shineFade}%)`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          opacity: active ? 1 : 0,
          transitionDuration: `${Math.max(0.05, speed)}s`,
        }}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
