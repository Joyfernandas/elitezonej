"use client";
import { useEffect, useRef } from "react";

// Lightweight scroll parallax — translates the wrapped element by a
// percentage of its progress through the viewport. Pure CSS-vars + RAF
// throttle, no scroll listener thrash.
//
//   intensity 0.08 = move 8% of the element's height as it scrolls
//   direction "y" / "-y" = up or down
type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  direction?: "y" | "-y";
};

export default function Parallax({
  children,
  className = "",
  intensity = 0.08,
  direction = "-y",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const dir = direction === "-y" ? -1 : 1;

    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0..1 of element through viewport. -1 above, 0 entering, 1 leaving.
      const progress = (rect.top + rect.height / 2) / vh - 0.5;
      const offset = progress * rect.height * intensity * dir;
      el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity, direction]);

  return (
    <div ref={ref} className={`parallax ${className}`} data-parallax="true">
      {children}
    </div>
  );
}
