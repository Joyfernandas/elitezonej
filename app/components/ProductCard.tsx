"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { fmtINR } from "@/lib/format";
import WishlistButton from "./WishlistButton";
import QuickAddButton from "./QuickAddButton";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  return (
    <div className="pcard qa-host">
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
