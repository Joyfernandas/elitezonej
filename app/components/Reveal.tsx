"use client";
import { useEffect, useRef } from "react";

export default function Reveal({
  children, as = "div", delay = 0, className = "", ...rest
}: { children: React.ReactNode; as?: keyof React.JSX.IntrinsicElements; delay?: 0 | 1 | 2 | 3 | 4; className?: string } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`rev ${className}`}
      data-d={delay || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
