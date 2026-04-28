"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, PRODUCTS, ANGLES, ANGLE_LABELS, fmtINR } from "@/lib/products";

const CSS = `
.switcher { background:var(--paper-2); border-bottom:var(--rule); padding:var(--s-3) var(--pad-x-d); }
.switcher-inner { max-width:var(--container); margin:0 auto; display:flex; align-items:center; gap:var(--s-4); flex-wrap:wrap; }
.switcher .lbl { color:var(--ink-3); flex:0 0 auto; }
.switcher-chips { display:flex; gap:var(--s-2); flex-wrap:wrap; }
.switcher-chips a { background:transparent; border:1px solid var(--paper-3); color:var(--ink-2); padding:6px 12px; font-family:var(--font-mono); font-weight:500; font-size:11px; letter-spacing:.06em; cursor:pointer; transition:all var(--d-fast) var(--ease); text-decoration:none; }
.switcher-chips a:hover { border-color:var(--ink); color:var(--ink); }
.switcher-chips a.on { background:var(--ink); color:var(--paper); border-color:var(--ink); }

.crumb { max-width:var(--container); margin:0 auto; padding:var(--s-4) var(--pad-x-d); display:flex; gap:var(--s-3); color:var(--ink-3); }
.crumb a:hover { color:var(--accent); }
.crumb .sep { color:var(--ink-4); }

.pd { display:grid; grid-template-columns:88px 1fr 380px; gap:var(--s-5); max-width:var(--container); margin:0 auto; padding:0 var(--pad-x-d) var(--s-9); align-items:start; }
.thumbs { display:flex; flex-direction:column; gap:var(--s-2); position:sticky; top:104px; align-self:start; }
.thumb { aspect-ratio:2/3; background:var(--paper-2); cursor:pointer; border:1px solid transparent; position:relative; overflow:hidden; transition:border-color var(--d-fast) var(--ease); }
.thumb img { width:100%; height:100%; object-fit:cover; display:block; }
.thumb:hover { border-color:var(--ink-4); }
.thumb.on { border-color:var(--ink); }
.thumb .num { position:absolute; bottom:6px; left:6px; color:rgba(250,247,242,.92); font-family:var(--font-mono); font-weight:500; font-size:10px; letter-spacing:.18em; mix-blend-mode:difference; pointer-events:none; }

.main { aspect-ratio:2/3; background:var(--paper-2); position:relative; overflow:hidden; cursor:zoom-in; }
.main .photo { position:absolute; inset:0; opacity:0; transition:opacity 500ms var(--ease); }
.main .photo.show { opacity:1; }
.main .photo img { width:100%; height:100%; object-fit:cover; }
.main .zoom-hint { position:absolute; bottom:var(--s-3); right:var(--s-3); color:var(--paper); padding:5px 10px; background:rgba(10,8,6,.65); pointer-events:none; opacity:0; transition:opacity var(--d-fast) var(--ease); z-index:5; }
.main:hover .zoom-hint { opacity:1; }

.info { display:flex; flex-direction:column; gap:var(--s-4); padding-top:0; position:sticky; top:104px; align-self:start; }
.info .ix { color:var(--ink-3); }
.info h1 { margin:0; font-family:var(--font-display); font-weight:500; font-size:32px; line-height:1.15; letter-spacing:-.01em; }
.info .editorial-line { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:17px; line-height:1.45; color:var(--ink-2); margin:0; }
.price-row { display:flex; align-items:baseline; gap:var(--s-3); padding:var(--s-3) 0; border-top:var(--rule); border-bottom:var(--rule); }
.price { font-family:var(--font-mono); font-weight:500; font-size:22px; color:var(--ink); letter-spacing:.02em; }
.price-sale { color: var(--sale); }
.price-orig { font-size:16px; color:var(--ink-3); text-decoration:line-through; font-weight:400; }
.tax-line { color:var(--ink-3); font-family:var(--font-mono); font-size:11px; letter-spacing:.06em; }

.field-block .head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:var(--s-2); }
.field-block .head label { margin:0; }
.field-block .head a { color:var(--ink-2); font-size:13px; text-decoration:underline; text-underline-offset:3px; }
.field-block .head a:hover { color:var(--accent); }
.sizes { display:flex; flex-wrap:wrap; gap:var(--s-2); }
.size { min-width:54px; min-height:46px; padding:var(--s-3); background:transparent; border:1px solid var(--paper-3); color:var(--ink); font-family:var(--font-mono); font-size:13px; cursor:pointer; transition:all var(--d-fast) var(--ease); }
.size:hover { border-color:var(--ink); }
.size.on { background:var(--ink); color:var(--paper); border-color:var(--ink); }
.size.oos { color:var(--ink-3); border-style:dashed; cursor:not-allowed; text-decoration:line-through; }
.ctas { display:flex; flex-direction:column; gap:var(--s-3); margin-top:var(--s-2); }
.delivery { display:flex; align-items:center; gap:var(--s-3); padding:var(--s-3) 0; border-top:var(--rule); }
.delivery .pin { padding:8px 12px; background:var(--paper-2); font-family:var(--font-mono); font-size:11px; letter-spacing:.06em; color:var(--ink-2); }
.delivery .text { color:var(--ink-2); font-size:13px; }
.delivery .text b { color:var(--ink); font-weight:500; }
.returns-line { color:var(--ink-3); }

.feature-list { padding-top:var(--s-3); border-top:var(--rule); }
.feature-list h4 { margin:0 0 var(--s-3); font-family:var(--font-mono); font-weight:500; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-3); }
.feature-list ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
.feature-list li { font-size:13px; color:var(--ink-2); padding-left:18px; position:relative; line-height:1.5; }
.feature-list li::before { content:"—"; position:absolute; left:0; color:var(--ink-3); }

@media (max-width:1100px) { .pd { grid-template-columns:64px 1fr; } .info { grid-column:1 / -1; position:static; padding-top:var(--s-5); } }
@media (max-width:720px) { .pd { grid-template-columns:1fr; gap:var(--s-3); padding:0 var(--pad-x-m) var(--s-7); } .thumbs { flex-direction:row; position:static; overflow-x:auto; padding-bottom:var(--s-2); } .thumb { flex:0 0 64px; } }
@media (max-width:375px) { .pd { padding:0 var(--s-3) var(--s-5); } .info h1 { font-size:24px; } .note { padding:var(--s-7) var(--s-3); } .note .body { grid-template-columns:1fr; } .note .portrait { margin:0 auto; } .info-acc { padding:0 var(--s-3) var(--s-7); } .worn .inner { padding:var(--s-7) var(--s-3); } .spec .inner { padding:var(--s-5) var(--s-3); } .spec td.k { width:100px; font-size:10px; } }

.spec { background:var(--paper-2); border-top:var(--rule); border-bottom:var(--rule); }
.spec .inner { max-width:var(--container); margin:0 auto; padding:var(--s-9) var(--pad-x-d); display:grid; grid-template-columns:1fr 2fr; gap:var(--s-8); }
.spec h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:32px; line-height:1.1; letter-spacing:-.01em; }
.spec .ix { color:var(--ink-3); margin-bottom:var(--s-3); }
.spec table { width:100%; border-collapse:collapse; font-family:var(--font-body); font-size:14px; }
.spec td { padding:var(--s-4) 0; border-bottom:var(--rule); vertical-align:top; }
.spec td.k { width:200px; font-family:var(--font-mono); font-weight:500; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-3); padding-right:var(--s-4); }
.spec td.v { color:var(--ink); }
@media (max-width:900px){ .spec .inner { grid-template-columns:1fr; gap:var(--s-5); padding:var(--s-7) var(--pad-x-m); } .spec td.k { width:140px; } }

.note { max-width:var(--container); margin:0 auto; padding:var(--s-9) var(--pad-x-d); }
.note .ix { color:var(--ink-3); margin-bottom:var(--s-4); }
.note .body { display:grid; grid-template-columns:auto 1fr; gap:var(--s-6); align-items:start; max-width:920px; }
.note .portrait { width:96px; height:96px; border-radius:50%; overflow:hidden; background-image:url("https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=200&q=80&auto=format&fit=crop"); background-size:cover; background-position:center; flex:0 0 96px; }
.note .body p { margin:0 0 var(--s-4); font-family:var(--font-display); font-weight:500; font-style:italic; font-size:21px; line-height:1.45; color:var(--ink); letter-spacing:-.005em; }
.note .signed { color:var(--ink-3); }
.note .signed b { font-family:var(--font-display); font-weight:600; font-style:normal; color:var(--ink); font-size:14px; letter-spacing:0; text-transform:none; }

.info-acc { max-width:var(--container); margin:0 auto; padding:0 var(--pad-x-d) var(--s-9); }
.info-acc details { border-top:var(--rule); padding:var(--s-4) 0; }
.info-acc details:last-of-type { border-bottom:var(--rule); }
.info-acc summary { cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-weight:500; font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink); }
.info-acc summary::-webkit-details-marker { display:none; }
.info-acc summary::after { content:"+"; font-family:var(--font-display); font-size:22px; color:var(--ink-3); }
.info-acc details[open] summary::after { content:"−"; }
.info-acc details > div { padding-top:var(--s-4); color:var(--ink-2); font-size:14px; line-height:1.7; max-width:720px; }

.worn { background:var(--paper-2); border-top:var(--rule); }
.worn .inner { max-width:var(--container); margin:0 auto; padding:var(--s-9) var(--pad-x-d); }
.worn .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-5); margin-top:var(--s-7); }
.worn .head { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); }
.worn h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:32px; letter-spacing:-.01em; }
.worn .pcard { display:flex; flex-direction:column; cursor:pointer; color:inherit; text-decoration:none; }
.worn .plate { aspect-ratio:3/4; position:relative; overflow:hidden; background:var(--paper); }
.worn .plate img { object-fit:cover; transition:transform var(--d-slow) var(--ease); }
.worn .pcard:hover .plate img { transform:scale(1.04); }
.worn .meta { padding:var(--s-3) 0 0; }
.worn .name { font-family:var(--font-display); font-weight:500; font-size:18px; margin:0 0 var(--s-2); }
.worn .row { display:flex; justify-content:space-between; }
.worn .price { font-family:var(--font-mono); font-weight:500; font-size:14px; }
.worn .tag { color:var(--ink-3); font-size:11px; }
@media (max-width:720px){ .worn .grid { grid-template-columns:1fr; } }

.lightbox { position:fixed; inset:0; background:rgba(10,8,6,.94); z-index:200; display:flex; align-items:center; justify-content:center; }
.lightbox .img-wrap { position:relative; width:92vw; height:92vh; }
.lightbox img { object-fit:contain !important; }
.lb-close, .lb-nav { position:absolute; background:transparent; border:1px solid rgba(250,247,242,.4); color:var(--paper); width:48px; height:48px; cursor:pointer; font-family:var(--font-mono); font-size:14px; transition:background var(--d-fast) var(--ease); z-index:201; }
.lb-close { top:24px; right:24px; }
.lb-prev { left:24px; top:50%; transform:translateY(-50%); }
.lb-next { right:24px; top:50%; transform:translateY(-50%); }
.lb-close:hover, .lb-nav:hover { background:rgba(250,247,242,.15); }
.lb-counter { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); color:var(--paper); font-family:var(--font-mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase; z-index:201; }
`;

export default function ProductPageClient({ slug }: { slug: string }) {
  const initial = PRODUCTS.find(p => p.slug === slug);
  const [currentSlug, setCurrentSlug] = useState<string>(initial ? slug : PRODUCTS[0].slug);
  const [angleIdx, setAngleIdx] = useState<number>(0);
  const [sizeOn, setSizeOn] = useState<string>("");
  const [lbOpen, setLbOpen] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<string>("Friday, 02 May");

  const product = PRODUCTS.find(p => p.slug === currentSlug) || PRODUCTS[0];

  useEffect(() => {
    const d = new Date(Date.now() + 7 * 86400000);
    setDeliveryDate(d.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long" }));
  }, []);

  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbOpen(false);
      if (e.key === "ArrowLeft") setAngleIdx(i => (i - 1 + ANGLES.length) % ANGLES.length);
      if (e.key === "ArrowRight") setAngleIdx(i => (i + 1) % ANGLES.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lbOpen]);

  // Reset angle when product changes
  useEffect(() => { setAngleIdx(0); setSizeOn(""); }, [currentSlug]);

  const others = PRODUCTS.filter(p => p.slug !== currentSlug).slice(0, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="switcher">
        <div className="switcher-inner">
          <span className="lbl t-mono-xs">Switch product</span>
          <div className="switcher-chips">
            {PRODUCTS.map(p => (
              <a key={p.slug} className={p.slug === currentSlug ? "on" : ""} onClick={(e) => { e.preventDefault(); setCurrentSlug(p.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }} href={`/products/${p.slug}`}>{p.name}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="crumb t-mono-xs">
        <Link href="/">Home</Link><span className="sep">/</span>
        <Link href={`/collection?c=${product.gender}`}>{product.catLink}</Link><span className="sep">/</span>
        <span>{product.name}</span>
      </div>

      <section className="pd">
        <div className="thumbs">
          {ANGLES.map((a, i) => (
            <div key={a} className={`thumb ${i === angleIdx ? "on" : ""}`} onClick={() => setAngleIdx(i)}>
              <Image src={`/generated/${currentSlug}/${a}.webp`} alt={`${ANGLE_LABELS[i]} view`} fill sizes="88px" loading="lazy" />
              <span className="num">0{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="main" onClick={() => setLbOpen(true)}>
          {ANGLES.map((a, i) => (
            <div key={a} className={`photo ${i === angleIdx ? "show" : ""}`}>
              <Image src={`/generated/${currentSlug}/${a}.webp`} alt={`${product.name} ${ANGLE_LABELS[i]}`} fill sizes="(max-width: 1100px) 100vw, 60vw" priority={i === 0} />
            </div>
          ))}
          <span className="zoom-hint t-mono-xs">Click to enlarge</span>
        </div>

        <div className="info">
          <div className="ix t-mono-xs">{product.cat}</div>
          <h1>{product.name}</h1>
          <p className="editorial-line">{product.line}</p>

          <div className="price-row">
            {product.salePrice ? (
              <>
                <span className="price price-sale">{fmtINR(product.salePrice)}</span>
                <span className="price price-orig">{fmtINR(product.price)}</span>
              </>
            ) : (
              <span className="price">{fmtINR(product.price)}</span>
            )}
            <span className="tax-line">Inclusive of all taxes</span>
          </div>

          <div className="field-block">
            <div className="head">
              <label>Size</label>
              <a href="#">Size guide</a>
            </div>
            <div className="sizes">
              {product.sizes.map(s => {
                const oos = s.endsWith("-oos");
                const v = oos ? s.replace("-oos", "") : s;
                const isOn = sizeOn === v && !oos;
                const cls = oos ? "size oos" : (isOn ? "size on" : "size");
                return <button key={s} className={cls} disabled={oos} onClick={() => !oos && setSizeOn(v)}>{v}</button>;
              })}
            </div>
            <Link className="t-body-sm" href="/bespoke" style={{ marginTop: "var(--s-3)", display: "inline-block", color: "var(--ink-2)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Don&apos;t know your size? Get measured at home →
            </Link>
          </div>

          <div className="ctas">
            <Link className="btn btn-primary btn-lg btn-block" href="/cart">Add to bag</Link>
            <Link className="btn btn-secondary btn-block" href="/bespoke#book">Book a fitting</Link>
          </div>

          <div className="delivery">
            <div className="pin">110001</div>
            <div className="text">Delivered by <b>{deliveryDate}</b> · Free shipping</div>
          </div>
          <div className="returns-line t-mono-xs">7-day returns · Free reverse pickup · Cash on delivery available</div>

          <div className="feature-list">
            <h4>Features</h4>
            <ul>
              {product.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Specification */}
      <section className="spec">
        <div className="inner">
          <div>
            <div className="ix t-mono-xs">Specification · 02</div>
            <h2>The cloth, cut, and construction.</h2>
          </div>
          <div>
            <table>
              <tbody>
                {product.spec.map(([k, v], i) => (
                  <tr key={i}><td className="k">{k}</td><td className="v">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Designer's note */}
      <section className="note">
        <div className="ix t-mono-xs">Designer&apos;s note · 03</div>
        <div className="body">
          <div className="portrait" aria-hidden="true"></div>
          <div>
            <p>{product.note}</p>
            <div className="signed t-mono-xs">— <b>Aman Gupta</b>, Lead Designer · Twelve years on the bench</div>
          </div>
        </div>
      </section>

      {/* Care, Delivery, Returns */}
      <section className="info-acc">
        <details><summary>Delivery</summary><div>Standard delivery is free across India and arrives in 3–5 working days. Express delivery available at checkout. International orders ship via DHL; duties calculated at checkout.</div></details>
        <details><summary>Returns &amp; alterations</summary><div>Free returns within 7 days of delivery. Free reverse pickup across all major Indian cities. Free alterations within 30 days — we&apos;ll re-cut to your fit at no charge.</div></details>
        <details><summary>Care</summary><div>Dry-clean only, infrequently. Steam between wears to refresh. Hang on a wide wooden hanger; do not fold for storage.</div></details>
      </section>

      {/* Worn With */}
      <section className="worn">
        <div className="inner">
          <div className="head">
            <h2>Complete the look</h2>
            <span className="t-mono-xs" style={{ color: "var(--ink-3)" }}>Curated by the design team</span>
          </div>
          <div className="grid">
            {others.map(p => (
              <a key={p.slug} className="pcard" href={`/products/${p.slug}`} onClick={(e) => { e.preventDefault(); setCurrentSlug(p.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <div className="plate"><Image src={`/generated/${p.slug}/01-front.webp`} alt={p.name} fill sizes="(max-width: 720px) 100vw, 33vw" loading="lazy" /></div>
                <div className="meta">
                  <h3 className="name">{p.name}</h3>
                  <div className="row"><span className="price">{fmtINR(p.price)}</span><span className="tag">{p.fabric} · {p.fit}</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {lbOpen && (
        <div className="lightbox" onClick={(e) => { if (e.target === e.currentTarget) setLbOpen(false); }} role="dialog" aria-modal="true">
          <button className="lb-close t-mono-xs" onClick={() => setLbOpen(false)}>CLOSE</button>
          <button className="lb-nav lb-prev" onClick={() => setAngleIdx(i => (i - 1 + ANGLES.length) % ANGLES.length)}>←</button>
          <div className="img-wrap">
            <Image src={`/generated/${currentSlug}/${ANGLES[angleIdx]}.webp`} alt={`${product.name} ${ANGLE_LABELS[angleIdx]}`} fill sizes="92vw" priority />
          </div>
          <button className="lb-nav lb-next" onClick={() => setAngleIdx(i => (i + 1) % ANGLES.length)}>→</button>
          <span className="lb-counter">0{angleIdx + 1} / 0{ANGLES.length}</span>
        </div>
      )}
    </>
  );
}
