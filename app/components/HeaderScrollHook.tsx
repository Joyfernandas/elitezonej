"use client";
import { useEffect } from "react";

// Small client hook that toggles html[data-scrolled="true"] when the
// page has scrolled past 60px. CSS in page-chrome.css consumes that
// attribute to slim the header.
export default function HeaderScrollHook() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const apply = () => {
      raf = 0;
      root.dataset.scrolled = window.scrollY > 60 ? "true" : "false";
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
