"use client";
import { useEffect } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  index: number;
  setIndex: (updater: (i: number) => number) => void;
};

export default function Lightbox({ open, onClose, images, index, setIndex }: Props) {
  useEffect(() => {
    if (!open) return;
    const len = images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex(i => (i - 1 + len) % len);
      if (e.key === "ArrowRight") setIndex(i => (i + 1) % len);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length, onClose, setIndex]);

  if (!open || images.length === 0) return null;

  const len = images.length;
  const current = images[index];

  return (
    <div
      className="lightbox"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <button className="lb-close t-mono-xs" onClick={onClose}>CLOSE</button>
      <button className="lb-nav lb-prev" onClick={() => setIndex(i => (i - 1 + len) % len)}>←</button>
      <div className="img-wrap">
        <Image src={current.src} alt={current.alt} fill sizes="92vw" priority />
      </div>
      <button className="lb-nav lb-next" onClick={() => setIndex(i => (i + 1) % len)}>→</button>
      <span className="lb-counter">0{index + 1} / 0{len}</span>
    </div>
  );
}
