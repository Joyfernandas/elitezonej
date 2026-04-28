"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const update = () => {
      const h = document.documentElement;
      const sc = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      el.style.setProperty("--progress", `${sc * 100}%`);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
