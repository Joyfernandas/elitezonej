"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, fmtINR } from "@/lib/products";
import { CAT_DATA, SUBCATS } from "@/lib/subcats";

const CSS = `
.cat-header { max-width:var(--container); margin:0 auto; padding:var(--s-7) var(--pad-x-d) var(--s-5); border-bottom:var(--rule-strong); }
.cat-header .crumb { color:var(--ink-3); margin-bottom:var(--s-4); display:flex; gap:var(--s-3); }
.cat-header .crumb .sep { color:var(--ink-4); }
.cat-header h1 { margin:0 0 var(--s-4); font-family:var(--font-display); font-weight:500; font-size:clamp(36px,4.5vw,60px); line-height:1; letter-spacing:-.02em; }
.cat-header .standfirst { max-width:680px; color:var(--ink-2); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:18px; line-height:1.5; margin:0 0 var(--s-4); }
.cat-header .signed { color:var(--ink-3); }
.toolbar { max-width:var(--container); margin:0 auto; padding:var(--s-4) var(--pad-x-d); display:flex; justify-content:space-between; align-items:center; gap:var(--s-4); border-bottom:var(--rule); flex-wrap:wrap; }
.toolbar .count { color:var(--ink-3); }
.toolbar .sort { display:flex; align-items:center; gap:var(--s-3); }
.toolbar .sort label { margin:0; }
.toolbar select { width:auto; min-width:140px; padding:8px 12px; border:1px solid var(--paper-3); background:var(--paper); font-family:var(--font-mono); font-size:11px; letter-spacing:.06em; color:var(--ink); }
.plp { max-width:var(--container); margin:0 auto; padding:var(--s-5) var(--pad-x-d) var(--s-9); display:grid; grid-template-columns:240px 1fr; gap:var(--s-7); align-items:start; }
@media (max-width:900px) { .plp { grid-template-columns:1fr; gap:var(--s-5); } .cat-header { padding:var(--s-5) var(--pad-x-m) var(--s-4); } .toolbar { padding:var(--s-4) var(--pad-x-m); } .plp { padding:var(--s-5) var(--pad-x-m) var(--s-9); } }
.filters { position:sticky; top:104px; align-self:start; }
.filter-group { padding:var(--s-4) 0; border-bottom:var(--rule); }
.filter-group:first-child { padding-top:0; }
.filter-group h4 { margin:0 0 var(--s-3); font-family:var(--font-mono); font-weight:500; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink); }
.filter-chips { display:flex; flex-wrap:wrap; gap:6px; }
.filter-chips button { background:transparent; border:1px solid var(--paper-3); color:var(--ink-2); padding:6px 10px; font-family:var(--font-mono); font-size:11px; letter-spacing:.04em; cursor:pointer; transition:all var(--d-fast) var(--ease); }
.filter-chips button:hover { border-color:var(--ink); color:var(--ink); }
.filter-chips button.on { background:var(--ink); color:var(--paper); border-color:var(--ink); }
.price-row { display:flex; gap:var(--s-2); }
.price-row input { font-family:var(--font-mono); font-size:12px; padding:8px 10px; }
.clear-link { display:inline-block; margin-top:var(--s-3); color:var(--ink-2); font-size:13px; text-decoration:underline; text-underline-offset:3px; cursor:pointer; }
.clear-link:hover { color:var(--accent); }
@media (max-width:900px) { .filters { position:static; padding-bottom:var(--s-5); border-bottom:var(--rule); } }
@media (max-width:375px) { .cat-header { padding:var(--s-4) var(--s-3) var(--s-3); } .cat-header h1 { font-size:28px; } .cat-header .standfirst { font-size:15px; } .toolbar { padding:var(--s-3) var(--s-3); } .plp { padding:var(--s-4) var(--s-3) var(--s-7); } }
.grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-5); }
@media (max-width:900px) { .grid { grid-template-columns:repeat(2,1fr); gap:var(--s-3); } }
@media (max-width:520px) { .grid { grid-template-columns:1fr; } }
.pcard { display:flex; flex-direction:column; cursor:pointer; color:inherit; text-decoration:none; }
.pcard .plate { aspect-ratio:3/4; position:relative; overflow:hidden; background:var(--paper-2); }
.pcard .plate img { object-fit:cover; transition:opacity var(--d-slow) var(--ease); }
.pcard .plate img.alt { opacity:0; }
.pcard:hover .plate img.primary { opacity:0; }
.pcard:hover .plate img.alt { opacity:1; }
.pcard .badge { position:absolute; top:var(--s-3); left:var(--s-3); color:var(--paper); z-index:2; background:rgba(26,22,19,.9); padding:4px 10px; }
.pcard .meta { padding:var(--s-3) 0 var(--s-2); }
.pcard .name { font-family:var(--font-display); font-weight:500; font-size:18px; letter-spacing:-.005em; color:var(--ink); margin:0 0 var(--s-2); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.pcard .row { display:flex; justify-content:space-between; align-items:baseline; gap:var(--s-3); }
.pcard .price { font-family:var(--font-mono); font-weight:500; font-size:14px; color:var(--ink); letter-spacing:.02em; }
.pcard .tag { color:var(--ink-3); font-family:var(--font-body); font-size:11px; letter-spacing:.06em; }
.empty { grid-column:1/-1; padding:var(--s-9) var(--s-7); text-align:center; border:var(--rule); background:var(--paper-2); }
.empty h3 { font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.01em; margin:0 0 var(--s-4); line-height:1.1; }
.empty p { max-width:480px; margin:0 auto var(--s-5); color:var(--ink-2); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:18px; line-height:1.5; }
.empty form { display:flex; gap:0; max-width:380px; margin:0 auto; border:1px solid var(--ink); }
.empty form input { border:0; padding:12px 14px; flex:1; background:var(--paper); }
.empty form button { border:0; }
`;

type FilterKey = "fit" | "fabric" | "occasion" | "size";

export default function CollectionClient({ cat, sub }: { cat: string; sub: string }) {
  const [active, setActive] = useState<Record<FilterKey, Set<string>>>({
    fit: new Set(), fabric: new Set(), occasion: new Set(), size: new Set(),
  });
  const [sortKey, setSortKey] = useState("newest");

  const subData = sub ? SUBCATS[cat]?.[sub] : null;
  const headTitle = subData?.title || CAT_DATA[cat]?.title || "Collection";
  const headStand = subData?.stand || CAT_DATA[cat]?.stand || "";

  const toggle = (k: FilterKey, v: string) => {
    setActive(prev => {
      const next = { ...prev, [k]: new Set(prev[k]) };
      if (next[k].has(v)) next[k].delete(v); else next[k].add(v);
      return next;
    });
  };
  const clear = () => setActive({ fit: new Set(), fabric: new Set(), occasion: new Set(), size: new Set() });

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();
    if (cat === "men" || cat === "women") list = list.filter(p => p.gender === cat);
    else if (cat === "festive") list = list.filter(p => p.occasion === "Festive");
    else if (cat !== "all") list = list.filter(p => p.category === cat);
    if (sub) list = list.filter(p => p.sub === sub);
    if (active.fit.size) list = list.filter(p => active.fit.has(p.fit));
    if (active.fabric.size) list = list.filter(p => active.fabric.has(p.fabric));
    if (active.occasion.size) list = list.filter(p => active.occasion.has(p.occasion));
    if (sortKey === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sub, active, sortKey]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="cat-header">
        <div className="crumb t-mono-xs">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          {subData ? (
            <>
              <Link href={`/collection?c=${cat}`}>{CAT_DATA[cat]?.title || cat}</Link>
              <span className="sep">/</span>
              <span>{headTitle}</span>
            </>
          ) : (
            <span>{headTitle}</span>
          )}
        </div>
        <h1>{headTitle}</h1>
        <p className="standfirst">{headStand}</p>
        <div className="signed t-mono-xs">— By the Elite Zone J design team · Spring/Summer 2026</div>
      </section>

      <div className="toolbar">
        <span className="count t-mono-xs">{filtered.length} piece{filtered.length === 1 ? "" : "s"}</span>
        <div className="sort">
          <label className="t-mono-xs" style={{ color: "var(--ink-3)" }}>Sort by</label>
          <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
          </select>
        </div>
      </div>

      <section className="plp">
        <aside className="filters">
          {(["Slim","Tailored","Regular","Relaxed"]).map(group => null) /* placeholder */}
          <FilterGroup name="Fit" values={["Slim","Tailored","Regular","Relaxed"]} active={active.fit} onToggle={v => toggle("fit", v)} />
          <FilterGroup name="Fabric" values={["Wool","Linen","Cotton","Silk","Velvet"]} active={active.fabric} onToggle={v => toggle("fabric", v)} />
          <FilterGroup name="Occasion" values={["Wedding","Boardroom","Black Tie","Festive","Casual"]} active={active.occasion} onToggle={v => toggle("occasion", v)} />
          <FilterGroup name="Size" values={["36","38","40","42","44","46","XS","S","M","L","XL","XXL"]} active={active.size} onToggle={v => toggle("size", v)} />
          <div className="filter-group">
            <h4>Price (₹)</h4>
            <div className="price-row">
              <input type="number" placeholder="Min" />
              <input type="number" placeholder="Max" />
            </div>
          </div>
          <a className="clear-link" onClick={clear}>Clear all filters</a>
        </aside>

        <div className="grid">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="t-mono-xs" style={{ color: "var(--ink-3)", marginBottom: "var(--s-4)" }}>Arriving Spring/Summer 2026</div>
              <h3>This collection is being shot.</h3>
              <p>We&apos;re photographing the new season at our Delhi atelier this week. Pre-register and we&apos;ll write to you the morning it goes live.</p>
              <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("button") as HTMLButtonElement).textContent = "✓ Pre-registered"; }}>
                <input type="email" placeholder="Email address" required style={{ border: 0 }} />
                <button className="btn btn-primary" type="submit">Notify me</button>
              </form>
              <div style={{ marginTop: "var(--s-5)" }}>
                <Link href={`/collection?c=${cat}`} className="t-mono-xs" style={{ color: "var(--ink-2)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  View all {(CAT_DATA[cat]?.title || "pieces").toLowerCase()} →
                </Link>
              </div>
            </div>
          ) : (
            filtered.map(p => (
              <Link key={p.slug} className="pcard" href={`/products/${p.slug}`}>
                <div className="plate">
                  <Image className="primary" src={`/generated/${p.slug}/01-front.webp`} alt={`${p.name} front`} fill sizes="(max-width: 720px) 50vw, 33vw" loading="lazy" />
                  <Image className="alt" src={`/generated/${p.slug}/02-overview.webp`} alt={`${p.name} overview`} fill sizes="(max-width: 720px) 50vw, 33vw" loading="lazy" />
                  {p.badge && <span className="badge t-mono-xs">{p.badge}</span>}
                </div>
                <div className="meta">
                  <h3 className="name">{p.name}</h3>
                  <div className="row">
                    <span className="price">{fmtINR(p.price)}</span>
                    <span className="tag">{p.fabric} · {p.fit}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup({ name, values, active, onToggle }: { name: string; values: string[]; active: Set<string>; onToggle: (v: string) => void }) {
  return (
    <div className="filter-group">
      <h4>{name}</h4>
      <div className="filter-chips">
        {values.map(v => (
          <button key={v} className={active.has(v) ? "on" : ""} onClick={() => onToggle(v)}>{v}</button>
        ))}
      </div>
    </div>
  );
}
