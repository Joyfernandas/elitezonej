"use client";

import { useWishlist } from "./WishlistProvider";

type Size = "sm" | "md";

export default function WishlistButton({
  slug,
  name,
  size = "sm",
  className = "",
  onTopOfImage = true,
}: {
  slug: string;
  name?: string;
  size?: Size;
  className?: string;
  /** Use light styling for placement over a dark image */
  onTopOfImage?: boolean;
}) {
  const { has, toggle, hydrated } = useWishlist();
  const saved = hydrated && has(slug);

  const px = size === "md" ? 22 : 18;

  return (
    <button
      type="button"
      className={`wl-btn wl-${size}${onTopOfImage ? " wl-overlay" : ""}${saved ? " on" : ""} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name ?? "item"} from wishlist` : `Save ${name ?? "item"} to wishlist`}
      title={saved ? "Saved — click to remove" : "Save to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={px}
        height={px}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
