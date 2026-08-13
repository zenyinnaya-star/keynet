"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type MorphingDialogContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  transition?: Transition;
};

const MorphingDialogContext = createContext<MorphingDialogContextValue | null>(null);

function useMorphingDialog() {
  const ctx = useContext(MorphingDialogContext);
  if (!ctx) throw new Error("Morphing dialog components must be used within <MorphingDialog>.");
  return ctx;
}

export function MorphingDialog({
  children,
  transition,
}: {
  children: ReactNode;
  transition?: Transition;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();

  return (
    <MorphingDialogContext.Provider value={{ isOpen, setIsOpen, uniqueId, transition }}>
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { isOpen, setIsOpen, uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`morphing-dialog-${uniqueId}`}
      onClick={() => setIsOpen(true)}
      animate={{ opacity: isOpen ? 0 : 1 }}
      transition={{ duration: 0.15 }}
      style={style}
      className={cn("cursor-pointer", className)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen(true);
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContainer({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useMorphingDialog();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, setIsOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="morphing-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { uniqueId, transition } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`morphing-dialog-${uniqueId}`}
      transition={transition}
      style={style}
      onClick={(event) => event.stopPropagation()}
      className={cn("pointer-events-auto max-h-[90vh] overflow-y-auto", className)}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.img
      layoutId={`morphing-dialog-img-${uniqueId}`}
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
    />
  );
}

export function MorphingDialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.h3 layoutId={`morphing-dialog-title-${uniqueId}`} className={cn("font-bold", className)}>
      {children}
    </motion.h3>
  );
}

export function MorphingDialogSubtitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.p layoutId={`morphing-dialog-subtitle-${uniqueId}`} className={cn("text-sm", className)}>
      {children}
    </motion.p>
  );
}

const DEFAULT_DESCRIPTION_VARIANTS: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

export function MorphingDialogDescription({
  children,
  className,
  variants = DEFAULT_DESCRIPTION_VARIANTS,
  disableLayoutAnimation,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  disableLayoutAnimation?: boolean;
}) {
  return (
    <motion.div
      key="morphing-dialog-description"
      layout={!disableLayoutAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogClose({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { setIsOpen } = useMorphingDialog();
  return (
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      aria-label="Close dialog"
      className={cn(
        "absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70",
        className,
      )}
    >
      {children ?? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      )}
    </button>
  );
}
