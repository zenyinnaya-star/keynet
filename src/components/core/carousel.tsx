"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used within <Carousel>.");
  return ctx;
}

export function Carousel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = containerRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = item ? item.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <CarouselContext.Provider
      value={{
        containerRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev: () => scrollByAmount(-1),
        scrollNext: () => scrollByAmount(1),
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { containerRef } = useCarousel();
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CarouselItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-carousel-item className={cn("shrink-0 snap-start", className)}>
      {children}
    </div>
  );
}

export function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}: {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
}) {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel();

  if (!alwaysShow && !canScrollPrev && !canScrollNext) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!alwaysShow && !canScrollPrev}
        aria-label="Previous slide"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)] disabled:cursor-not-allowed disabled:opacity-30",
          classNameButton,
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!alwaysShow && !canScrollNext}
        aria-label="Next slide"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)] disabled:cursor-not-allowed disabled:opacity-30",
          classNameButton,
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
