"use client";
import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import TailoredPDP from "./TailoredPDP";
import FabricPDP from "./FabricPDP";
import "../../styles/product.css";

export default function ProductPageClient({ slug }: { slug: string }) {
  const initial = PRODUCTS.find(p => p.slug === slug);
  const [currentSlug, setCurrentSlug] = useState<string>(initial ? slug : PRODUCTS[0].slug);

  const product = PRODUCTS.find(p => p.slug === currentSlug) || PRODUCTS[0];
  const isFabric = product.kind === "fabric";

  const switchProduct = (nextSlug: string) => {
    setCurrentSlug(nextSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="crumb t-mono-xs">
        <Link href="/">Home</Link><span className="sep">/</span>
        <Link href={`/collection?c=${isFabric ? "fabrics" : product.gender}`}>{product.catLink}</Link>
        <span className="sep">/</span>
        <span>{product.name}</span>
      </div>

      {isFabric
        ? <FabricPDP product={product} />
        : <TailoredPDP product={product} setCurrentSlug={switchProduct} />}
    </>
  );
}
