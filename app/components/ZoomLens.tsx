"use client";
import { useEffect, useRef, useState } from "react";

// Circular magnifier overlay that follows the cursor over a product
// image. Renders only on desktop (no hover:none, no reduced-motion).
//
//   targetSelector — querySelector for the container the lens reacts to
//   imageSrc       — the high-res image to magnify
//   zoom           — magnification factor (default 2)
//   size           — lens diameter in px (default 220)
type Props = {
  targetSelector: string;
  imageSrc: string;
  zoom?: number;
  size?: number;
};

export default function ZoomLens({ targetSelector, imageSrc, zoom = 2, size = 220 }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number; bgX: number; bgY: number; w: number; h: number } | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;
    targetRef.current = target;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // If outside, hide
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setPos(null);
        return;
      }
      // Background offset = how much of the zoomed image to show. We
      // shift it so the cursor's spot in the source maps to the lens centre.
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      setPos({ x: e.clientX, y: e.clientY, bgX, bgY, w: rect.width, h: rect.height });
    };
    const onLeave = () => setPos(null);

    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseleave", onLeave);
    return () => {
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, [targetSelector]);

  if (!pos) return null;

  return (
    <div
      className="zoom-lens"
      style={{
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${pos.w * zoom}px ${pos.h * zoom}px`,
        backgroundPosition: `${pos.bgX}% ${pos.bgY}%`,
      }}
      aria-hidden="true"
    />
  );
}
