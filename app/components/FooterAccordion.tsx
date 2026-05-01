"use client";

import { useEffect, useRef, useState } from "react";

// Wraps a footer column in <details> with a chevron summary.
// Desktop / tablet (>=721px): open by default, summary acts as plain heading.
// Phone (<=720px): collapsed by default, summary tapping toggles content.
export default function FooterAccordion({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const userToggled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => {
      // Only override state if the user hasn't manually toggled
      if (!userToggled.current) setOpen(!mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <details
      className={`foot-col foot-col-acc${className ? " " + className : ""}`}
      open={open}
      onToggle={(e) => {
        userToggled.current = true;
        setOpen((e.currentTarget as HTMLDetailsElement).open);
      }}
    >
      <summary>
        <h4>{title}</h4>
        <span className="foot-col-acc__chev" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6 L8 11 L13 6" />
          </svg>
        </span>
      </summary>
      {children}
    </details>
  );
}
