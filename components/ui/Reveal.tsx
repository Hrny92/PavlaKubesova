"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal — scroll-triggered fade+slide animace.
 * Trigger: element vstoupí do viewportu (IntersectionObserver, jednou).
 *
 * Props:
 *   delay     – zpoždění v ms (pro stagger efekt)
 *   direction – směr nájezdu: "up" | "left" | "right" | "none"
 *   duration  – délka animace v ms (default 700)
 *   className – předána wrappujícímu divu
 *   style     – předána wrappujícímu divu (override / layout)
 */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 700,
  className,
  style,
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const initial: Record<string, string> = {
    up:    "translateY(30px)",
    left:  "translateX(-38px)",
    right: "translateX(38px)",
    none:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initial[direction],
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
