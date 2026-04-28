import Link from "next/link";
import ProductCard from "./ProductCard";
import type { ComponentProps } from "react";

type Product = ComponentProps<typeof ProductCard>["p"];

type Props = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  products: Product[];
};

export default function EditorialSplit({
  title,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  imageSide = "left",
  products,
}: Props) {
  return (
    <section className={`ed-split ed-split--${imageSide}`}>
      <div
        className="ed-split-img"
        role="img"
        aria-label={imageAlt}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="ed-split-overlay">
          <h2>{title}</h2>
          <Link className="btn btn-primary" href={ctaHref}>{ctaLabel}</Link>
        </div>
      </div>
      <div className="ed-split-grid">
        {products.slice(0, 6).map(p => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
