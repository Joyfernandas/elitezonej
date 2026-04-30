"use client";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type ShownToast = { key: number; name: string; meta: string };

// Auto-dismiss in CSS (toast-out keyframe at 2400ms + 460ms = 2860ms total).
// We unmount slightly later so the out-animation can play to completion.
const DISMISS_MS = 2900;

export default function Toast() {
  const { lastAdded } = useCart();
  const [shown, setShown] = useState<ShownToast | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    const { item, nonce } = lastAdded;
    const meta = item.isFabric
      ? `${item.colour ?? ""} · ${item.qty}m`
      : item.size
      ? `Size ${item.size}`
      : "Added";
    setShown({ key: nonce, name: item.name, meta });
    const t = setTimeout(() => setShown(null), DISMISS_MS);
    return () => clearTimeout(t);
  }, [lastAdded]);

  if (!shown) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      <div className="toast" key={shown.key}>
        <span className="check" aria-hidden="true">✓</span>
        <span>Added</span>
        <span className="name">{shown.name}</span>
        <span className="meta">· {shown.meta}</span>
      </div>
    </div>
  );
}
