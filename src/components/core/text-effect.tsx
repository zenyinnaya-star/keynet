"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Preset = "fade" | "slide" | "scale" | "blur";
type Per = "char" | "word";

const PRESET_VARIANTS: Record<Preset, { item: Variants }> = {
  fade: {
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    item: {
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    item: {
      hidden: { opacity: 0, scale: 0.6 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    item: {
      hidden: { opacity: 0, filter: "blur(8px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
};

export function TextEffect({
  children,
  per = "word",
  preset = "fade",
  className,
  delay = 0,
  speedReveal = 1,
}: {
  children: string;
  per?: Per;
  preset?: Preset;
  className?: string;
  delay?: number;
  speedReveal?: number;
}) {
  const words = children.split(/(\s+)/);
  const { item } = PRESET_VARIANTS[preset];
  const stagger = 0.03 / speedReveal;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={container}
      className={cn("inline-block", className)}
    >
      {words.map((word, wordIndex) => {
        if (/^\s+$/.test(word)) return <span key={wordIndex}>{word}</span>;

        if (per === "word") {
          return (
            <motion.span key={wordIndex} variants={item} className="inline-block whitespace-nowrap">
              {word}
            </motion.span>
          );
        }

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <motion.span key={charIndex} variants={item} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
