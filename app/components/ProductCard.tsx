import Link from "next/link";
import Image from "next/image";
import { Product, fmtINR } from "@/lib/products";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  return (
    <Link className="pcard" href={`/products/${p.slug}`}>
      <div className="plate">
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
        {p.badge && p.badge !== "Sale" && <span className="badge badge-new t-mono-xs">{p.badge}</span>}
        {p.salePrice && <span className="badge badge-sale t-mono-xs">Sale</span>}
      </div>
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
  );
}
