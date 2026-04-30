"use client";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { fmtINR, fmtMeters } from "@/lib/format";
import { useCart } from "../components/CartProvider";
import WishlistButton from "../components/WishlistButton";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import "../styles/cart.css";


export default function CartClient() {
  const { items, count, subtotal, hydrated, removeItem, updateQty, clear } = useCart();

  // "Complete the look" — three products not currently in the bag, prefer
  // the same gender/category as the most-recent line.
  const lastSlugs = new Set(items.map(i => i.slug));
  const seed = items[items.length - 1];
  const seedProduct = seed ? PRODUCTS.find(p => p.slug === seed.slug) : null;
  const wornSlugs = PRODUCTS
    .filter(p => p.kind !== "fabric" && !lastSlugs.has(p.slug))
    .filter(p => !seedProduct || p.gender === seedProduct.gender || seedProduct.kind === "fabric")
    .slice(0, 3);

  return (
    <>
      <section className="cart-head">
        <h1>Your bag</h1>
        <span className="meta t-mono-xs">
          {hydrated ? `${count} item${count === 1 ? "" : "s"} · ${fmtINR(subtotal)}` : "Loading…"}
        </span>
      </section>

      <section className="cart-page-wrap">
        <div className="items">
          {!hydrated ? (
            <>
              {[0, 1].map(i => (
                <div key={i} className="item cart-skel" aria-hidden="true">
                  <div className="ph skel-shimmer" />
                  <div className="info">
                    <div className="skel-line skel-shimmer" style={{ width: "62%", height: 16 }} />
                    <div className="skel-line skel-shimmer" style={{ width: "32%", height: 12, marginTop: 8 }} />
                    <div className="skel-line skel-shimmer" style={{ width: "48%", height: 12, marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </>
          ) : items.length === 0 ? (
            <div className="empty">
              <p>Your bag is empty.</p>
              <Link className="btn btn-secondary" href="/collection?c=men">Shop the collection</Link>
            </div>
          ) : items.map(it => {
            const step = it.isFabric ? 0.5 : 1;
            const minQ = it.isFabric ? 0.5 : 1;
            return (
              <div key={it.id} className="item">
                <div className="ph">
                  <Link href={`/products/${it.slug}`}>
                    <Image src={it.imageSrc} alt={it.name} fill sizes="120px" />
                  </Link>
                </div>
                <div className="info">
                  <div className="top">
                    <h3 className="name"><Link href={`/products/${it.slug}`}>{it.name}</Link></h3>
                    <span className="price">{fmtINR(it.unitPrice * it.qty)}</span>
                  </div>
                  <div className="specs t-mono-xs">
                    {it.colour && <><span>Colour · {it.colour}</span><span>·</span></>}
                    {it.size && <><span>Size · {it.size}</span><span>·</span></>}
                    <span>{it.isFabric ? `Length · ${fmtMeters(it.qty)}` : `Qty · ${it.qty}`}</span>
                    <span>·</span>
                    <span>{fmtINR(it.unitPrice)}{it.isFabric ? "/m" : ""}</span>
                  </div>
                  <div className="qty-row">
                    <div className="qty">
                      <button
                        onClick={() => updateQty(it.id, it.qty - step)}
                        disabled={it.qty <= minQ}
                        aria-label="Decrease"
                      >−</button>
                      <span>{it.isFabric ? fmtMeters(it.qty) : it.qty}</span>
                      <button onClick={() => updateQty(it.id, it.qty + step)} aria-label="Increase">+</button>
                    </div>
                    <button className="remove" onClick={() => removeItem(it.id)}>Remove</button>
                  </div>
                  <div className="alt-line t-body-sm">
                    {it.isFabric
                      ? <>Need a custom dye lot? <Link href="/bespoke#book">Book the cloth desk.</Link></>
                      : <>Doesn&apos;t fit exactly? <Link href="/bespoke">Free alteration available within 30 days.</Link></>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          <div className="row"><span>Subtotal</span><b>{fmtINR(subtotal)}</b></div>
          <div className="row"><span>Free alterations</span><b>Included</b></div>
          <div className="row"><span>Estimated delivery</span><b>Free</b></div>
          <div className="row"><span>Estimated tax</span><b>Inclusive</b></div>

          <details className="promo">
            <summary>Have a code?</summary>
            <div className="body">
              <input placeholder="Enter code" />
              <button type="button">Apply</button>
            </div>
          </details>

          <div className="row total"><span>Total</span><b>{fmtINR(subtotal)}</b></div>

          <div className="ctas">
            <button
              className="btn btn-primary btn-lg btn-block"
              type="button"
              disabled={!hydrated || items.length === 0}
            >Checkout</button>
            <Link className="btn btn-secondary btn-block" href="/collection?c=men">Continue shopping</Link>
            {hydrated && items.length > 0 && (
              <button
                type="button"
                onClick={() => { if (confirm("Empty your bag?")) clear(); }}
                style={{ background: "none", border: 0, color: "var(--ink-3)", fontSize: 12, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, padding: 6 }}
              >Empty bag</button>
            )}
          </div>

          <div className="reassure t-mono-xs">
            <span>✓ Free alterations within 30 days</span>
            <span>✓ 7-day returns · Free reverse pickup</span>
            <span>✓ Razorpay secure · UPI · Cards · COD</span>
          </div>
        </aside>
      </section>

      {wornSlugs.length > 0 && (
        <section className="worn-with">
          <div className="inner">
            <SectionHead
              numeral={2}
              eyebrow="Complete the look"
              title="Pieces that wear together."
              meta="Curated by the design team"
            />
            <div className="grid">
              {wornSlugs.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) as 0 | 1 | 2 | 3} className="pcard">
                  <div className="plate" style={{ position: "relative" }}>
                    <Link href={`/products/${p.slug}`} aria-label={p.name}>
                      <Image src={`/generated/${p.slug}/01-front.webp`} alt={p.name} fill sizes="(max-width: 720px) 100vw, 33vw" loading="lazy" />
                    </Link>
                    <WishlistButton slug={p.slug} name={p.name} />
                  </div>
                  <Link href={`/products/${p.slug}`} className="meta-link">
                    <div className="meta">
                      <h3 className="name">{p.name}</h3>
                      <div className="row">
                        <span className="price">{fmtINR(p.price)}</span>
                        <span className="tag">{p.fabric} · {p.fit}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
