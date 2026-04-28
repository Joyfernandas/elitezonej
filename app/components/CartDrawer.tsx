"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer({ count = 0 }: { count?: number }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        className="cart-trigger"
        aria-label={`Open bag, ${count} items`}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z" />
        </svg>
        {count > 0 && <span className="bag-count">{String(count).padStart(2, "0")}</span>}
      </button>

      <div
        className="cart-overlay"
        data-open={open}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside className="cart-drawer" data-open={open} aria-hidden={!open} role="dialog" aria-label="Bag">
        <header className="cart-drawer-head">
          <span>Your Bag ({String(count).padStart(2, "0")})</span>
          <button className="close" aria-label="Close bag" onClick={() => setOpen(false)}>×</button>
        </header>

        <div className="cart-drawer-body">
          {count === 0 ? (
            <div className="cart-empty">
              <p>Your bag is empty.</p>
              <Link className="btn btn-secondary" href="/collection?c=men" onClick={() => setOpen(false)}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <p className="cart-stub">
              You have {count} item{count === 1 ? "" : "s"} in your bag.
            </p>
          )}
        </div>

        <footer className="cart-drawer-foot">
          <Link className="btn btn-primary btn-block" href="/cart" onClick={() => setOpen(false)}>
            View full bag
          </Link>
        </footer>
      </aside>
    </>
  );
}
