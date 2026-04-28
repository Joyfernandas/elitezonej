"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, fmtINR } from "@/lib/products";

const CSS = `
.cart-head { max-width:var(--container); margin:0 auto; padding:var(--s-7) var(--pad-x-d) var(--s-4); border-bottom:var(--rule-strong); display:flex; justify-content:space-between; align-items:flex-end; gap:var(--s-4); flex-wrap:wrap; }
.cart-head h1 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(32px,4vw,52px); line-height:1; letter-spacing:-.015em; }
.cart-head .meta { color:var(--ink-3); }
.wrap { max-width:var(--container); margin:0 auto; padding:var(--s-5) var(--pad-x-d) var(--s-9); display:grid; grid-template-columns:1.5fr 1fr; gap:var(--s-7); align-items:start; }
@media (max-width:900px) { .wrap { grid-template-columns:1fr; } }
.items { display:flex; flex-direction:column; }
.empty { padding:var(--s-7) 0; text-align:center; color:var(--ink-2); }
.empty p { margin:0 0 var(--s-4); }
.item { display:grid; grid-template-columns:120px 1fr auto; gap:var(--s-4); padding:var(--s-5) 0; border-bottom:var(--rule); align-items:start; }
.item .ph { width:120px; aspect-ratio:3/4; overflow:hidden; background:var(--paper-2); position:relative; }
.item .ph a { display:block; width:100%; height:100%; position:relative; }
.item .info .top { display:flex; justify-content:space-between; gap:var(--s-3); align-items:flex-start; }
.item .name { margin:0 0 var(--s-2); font-family:var(--font-display); font-weight:500; font-size:20px; letter-spacing:-.005em; line-height:1.2; }
.item .name a { color:var(--ink); }
.item .name a:hover { color:var(--accent); }
.item .price { font-family:var(--font-mono); font-weight:500; font-size:14px; color:var(--ink); white-space:nowrap; }
.item .specs { color:var(--ink-3); margin:0 0 var(--s-3); display:flex; gap:var(--s-3); flex-wrap:wrap; }
.item .qty-row { display:flex; align-items:center; gap:var(--s-4); margin-top:var(--s-2); }
.qty { display:inline-flex; border:1px solid var(--paper-3); }
.qty button { background:transparent; border:0; padding:8px 14px; font-family:var(--font-mono); font-size:14px; cursor:pointer; color:var(--ink); }
.qty button:hover { background:var(--paper-2); }
.qty span { padding:8px 12px; font-family:var(--font-mono); font-size:13px; min-width:36px; text-align:center; border-left:1px solid var(--paper-3); border-right:1px solid var(--paper-3); }
.item .remove { background:none; border:0; color:var(--ink-3); font-family:var(--font-body); font-size:13px; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }
.item .remove:hover { color:var(--accent); }
.item .alt-line { color:var(--ink-2); font-size:12px; margin-top:var(--s-2); }
.item .alt-line a { color:var(--ink-2); text-decoration:underline; text-underline-offset:3px; }
.item .alt-line a:hover { color:var(--accent); }
@media (max-width:600px) { .item { grid-template-columns:90px 1fr; } .item .ph { width:90px; } .item .info .top { flex-direction:column; } }
@media (max-width:375px) { .cart-head { padding:var(--s-5) var(--s-3) var(--s-3); } .cart-head h1 { font-size:28px; } .wrap { padding:var(--s-4) var(--s-3) var(--s-7); } .item { grid-template-columns:72px 1fr; gap:var(--s-3); } .item .ph { width:72px; } .item .name { font-size:16px; } .summary { padding:var(--s-4); } }

.summary { position:sticky; top:104px; align-self:start; padding:var(--s-5); background:var(--paper-2); border:var(--rule); }
.summary h2 { margin:0 0 var(--s-4); font-family:var(--font-display); font-weight:500; font-size:22px; line-height:1.1; }
.summary .row { display:flex; justify-content:space-between; padding:8px 0; font-family:var(--font-mono); font-size:13px; color:var(--ink-2); }
.summary .row b { color:var(--ink); font-weight:500; }
.summary .row.total { border-top:var(--rule); margin-top:var(--s-3); padding-top:var(--s-4); font-size:16px; }
.summary .row.total b { font-family:var(--font-display); font-style:normal; font-weight:600; font-size:22px; color:var(--ink); letter-spacing:-.01em; }
.promo { margin:var(--s-4) 0; }
.promo summary { cursor:pointer; list-style:none; color:var(--ink-2); text-decoration:underline; text-underline-offset:3px; font-size:13px; }
.promo summary::-webkit-details-marker { display:none; }
.promo .body { display:flex; gap:0; margin-top:var(--s-3); border:1px solid var(--paper-3); }
.promo input { border:0; padding:10px 12px; flex:1; font-family:var(--font-mono); font-size:12px; letter-spacing:.06em; text-transform:uppercase; background:var(--paper); }
.promo button { background:var(--ink); color:var(--paper); border:0; padding:0 var(--s-4); font-family:var(--font-mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; }
.summary .ctas { margin-top:var(--s-4); display:flex; flex-direction:column; gap:var(--s-3); }
.summary .reassure { margin-top:var(--s-4); padding-top:var(--s-3); border-top:var(--rule); display:flex; flex-direction:column; gap:8px; color:var(--ink-3); }

.worn-with { background:var(--paper-2); border-top:var(--rule); }
.worn-with .inner { max-width:var(--container); margin:0 auto; padding:var(--s-9) var(--pad-x-d); }
.worn-with .head { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.worn-with h3 { margin:0; font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.01em; }
.worn-with .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-5); }
@media (max-width:720px) { .worn-with .grid { grid-template-columns:1fr; } }
.pcard { display:flex; flex-direction:column; cursor:pointer; color:inherit; text-decoration:none; }
.pcard .plate { aspect-ratio:3/4; position:relative; overflow:hidden; background:var(--paper); }
.pcard .plate img { object-fit:cover; transition:transform var(--d-slow) var(--ease); }
.pcard:hover .plate img { transform:scale(1.04); }
.pcard .meta { padding:var(--s-3) 0 0; }
.pcard .name { font-family:var(--font-display); font-weight:500; font-size:18px; margin:0 0 6px; }
.pcard .row { display:flex; justify-content:space-between; }
.pcard .price { font-family:var(--font-mono); font-weight:500; font-size:14px; }
.pcard .tag { color:var(--ink-3); font-size:11px; }
`;

type Line = { slug: string; size: string; qty: number };

export default function CartClient() {
  const [bag, setBag] = useState<Line[]>([
    { slug: "heritage-three-piece", size: "40", qty: 1 },
    { slug: "midnight-slip-dress", size: "S", qty: 1 },
  ]);

  const lookup = (slug: string) => PRODUCTS.find(p => p.slug === slug)!;
  const subtotal = bag.reduce((s, it) => s + lookup(it.slug).price * it.qty, 0);
  const totalQty = bag.reduce((s, it) => s + it.qty, 0);

  const inc = (i: number) => setBag(b => b.map((x, j) => j === i ? { ...x, qty: x.qty + 1 } : x));
  const dec = (i: number) => setBag(b => b.map((x, j) => j === i ? { ...x, qty: Math.max(1, x.qty - 1) } : x));
  const rm = (i: number) => setBag(b => b.filter((_, j) => j !== i));

  const wornSlugs = PRODUCTS.filter(p => !bag.some(b => b.slug === p.slug)).slice(0, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="cart-head">
        <h1>Your bag</h1>
        <span className="meta t-mono-xs">{bag.length} piece{bag.length === 1 ? "" : "s"} · {fmtINR(subtotal)}</span>
      </section>

      <section className="wrap">
        <div className="items">
          {bag.length === 0 ? (
            <div className="empty">
              <p>Your bag is empty.</p>
              <Link className="btn btn-secondary" href="/collection?c=men">Shop the collection</Link>
            </div>
          ) : bag.map((it, i) => {
            const p = lookup(it.slug);
            return (
              <div key={i} className="item">
                <div className="ph">
                  <Link href={`/products/${p.slug}`}>
                    <Image src={`/generated/${p.slug}/01-front.webp`} alt={p.name} fill sizes="120px" />
                  </Link>
                </div>
                <div className="info">
                  <div className="top">
                    <h3 className="name"><Link href={`/products/${p.slug}`}>{p.name}</Link></h3>
                    <span className="price">{fmtINR(p.price * it.qty)}</span>
                  </div>
                  <div className="specs t-mono-xs">
                    <span>Size · {it.size}</span><span>·</span><span>{p.fabric} · {p.fit}</span>
                  </div>
                  <div className="qty-row">
                    <div className="qty">
                      <button onClick={() => dec(i)}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => inc(i)}>+</button>
                    </div>
                    <button className="remove" onClick={() => rm(i)}>Remove</button>
                  </div>
                  <div className="alt-line t-body-sm">Doesn&apos;t fit exactly? <Link href="/bespoke">Free alteration available within 30 days.</Link></div>
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
              <button>Apply</button>
            </div>
          </details>

          <div className="row total"><span>Total</span><b>{fmtINR(subtotal)}</b></div>

          <div className="ctas">
            <button className="btn btn-primary btn-lg btn-block">Checkout</button>
            <Link className="btn btn-secondary btn-block" href="/collection?c=men">Continue shopping</Link>
          </div>

          <div className="reassure t-mono-xs">
            <span>✓ Free alterations within 30 days</span>
            <span>✓ 7-day returns · Free reverse pickup</span>
            <span>✓ Razorpay secure · UPI · Cards · COD</span>
          </div>
        </aside>
      </section>

      <section className="worn-with">
        <div className="inner">
          <div className="head">
            <h3>Complete the look</h3>
            <span className="t-mono-xs" style={{ color: "var(--ink-3)" }}>Curated by the design team</span>
          </div>
          <div className="grid">
            {wornSlugs.map(p => (
              <Link key={p.slug} className="pcard" href={`/products/${p.slug}`}>
                <div className="plate"><Image src={`/generated/${p.slug}/01-front.webp`} alt={p.name} fill sizes="(max-width: 720px) 100vw, 33vw" loading="lazy" /></div>
                <div className="meta">
                  <h3 className="name">{p.name}</h3>
                  <div className="row">
                    <span className="price">{fmtINR(p.price)}</span>
                    <span className="tag">{p.fabric} · {p.fit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
