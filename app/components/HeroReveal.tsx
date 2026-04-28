"use client";
import { useEffect, useRef } from "react";

/**
 * Word-by-word rise animation on the hero headline.
 * Each word is wrapped in a .word-mask span and staggered by 80ms.
 * Parallax intentionally removed — fights with the Disturbia theme's
 * !important background-position anchoring on the hero image.
 */
export default function HeroReveal({ h1Selector = ".hero h1" }: { h1Selector?: string }) {
  const did = useRef(false);
  useEffect(() => {
    if (did.current) return;
    did.current = true;

    document.querySelectorAll<HTMLHeadingElement>(h1Selector).forEach((h) => {
      if (h.dataset.split === "1") return;
      h.dataset.split = "1";
      const html = h.innerHTML;
      const tokens = html.split(/(<[^>]+>|\s+)/).filter(Boolean);
      let idx = 0;
      h.innerHTML = tokens
        .map((t) => {
          if (/^<[^>]+>$/.test(t) || /^\s+$/.test(t)) return t;
          idx++;
          return `<span class="word-mask"><span style="transition-delay:${(idx - 1) * 80}ms">${t}</span></span>`;
        })
        .join("");
      requestAnimationFrame(() =>
        h.querySelectorAll(".word-mask").forEach((w) => w.classList.add("in"))
      );
    });
  }, [h1Selector]);
  return null;
}
