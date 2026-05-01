"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Product } from "@/lib/products";
import { fmtINR } from "@/lib/format";
import WishlistButton from "./WishlistButton";
import QuickAddButton from "./QuickAddButton";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Touch devices: cycle primary↔alt while card is in view (CSS keyframes
  // do the crossfade; IntersectionObserver toggles the .is-cycling class so
  // off-screen cards don't burn paint/battery). Desktop keeps hover-swap.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reduced || !isTouch) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) {
          el.classList.add("is-cycling");
        } else {
          el.classList.remove("is-cycling");
        }
      },
      { threshold: [0, 0.4, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="pcard qa-host" ref={ref}>
      <div className="plate">
        <Link href={`/products/${p.slug}`} aria-label={p.name}>
          <Image
            className="primary"
            src={`/generated/${p.slug}/01-front.webp`}
            alt={`${p.name} front view`}
            fill
            sizes="(max-width: 720px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
          <Image
            className="alt"
            src={`/generated/${p.slug}/02-overview.webp`}
            alt={`${p.name} overview`}
            fill
            sizes="(max-width: 720px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </Link>
        {(p.badge || p.salePrice) && (
          <div className="badge-stack">
            {p.salePrice && <span className="badge badge-sale t-mono-xs">Sale</span>}
            {p.badge && p.badge !== "Sale" && <span className="badge badge-new t-mono-xs">{p.badge}</span>}
          </div>
        )}
        <WishlistButton slug={p.slug} name={p.name} />
        <QuickAddButton product={p} />
      </div>
      <Link href={`/products/${p.slug}`} className="meta-link">
        <div className="meta">
          <h3 className="name">{p.name}</h3>
          <div className="row">
            {p.salePrice ? (
              <span className="price-group">
                <span className="price price-sale">{fmtINR(p.salePrice)}</span>
                <span className="price price-orig">{fmtINR(p.price)}</span>
              </span>
            ) : (
              <span className="price">{fmtINR(p.price)}</span>
            )}
            <span className="tag">{p.fabric} · {p.fit}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
