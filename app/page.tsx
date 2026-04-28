import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrustStrip from "./components/TrustStrip";
import ProductCard from "./components/ProductCard";
import Reveal from "./components/Reveal";
import HeroReveal from "./components/HeroReveal";
import EditorialSplit from "./components/EditorialSplit";
import CarouselShowcase from "./components/CarouselShowcase";
import PromoModal from "./components/PromoModal";
import HeroBanner from "./components/HeroBanner";
import { PRODUCTS } from "@/lib/products";

const HOME_CSS = `
header.site { position:sticky; top:0; z-index:80; background:rgba(250,247,242,.96); backdrop-filter:blur(8px); border-bottom:var(--rule); }
.header-row { max-width:var(--container); margin:0 auto; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:var(--s-5); padding:var(--s-5) var(--pad-x-d); }
.brand { font-family:var(--font-display); font-weight:600; font-size:26px; text-align:center; }
.brand small { display:block; margin-top:2px; font-family:var(--font-mono); font-weight:500; font-size:9px; letter-spacing:.32em; text-transform:uppercase; color:var(--ink-3); }
.nav-primary { display:flex; gap:var(--s-6); list-style:none; margin:0; padding:0; }
.nav-primary > li > a { font-size:var(--t-label-size); letter-spacing:var(--t-label-ls); font-weight:500; padding:var(--s-2) 0; border-bottom:1px solid transparent; transition:color var(--d-fast) var(--ease), border-color var(--d-fast) var(--ease); display:inline-block; color:var(--ink); }
.nav-primary > li > a:hover, .nav-primary > li > a.active { color:var(--accent); border-color:var(--accent); }
.nav-icons { display:flex; gap:var(--s-5); justify-content:flex-end; align-items:center; }
.nav-icons a { font-size:var(--t-label-size); font-weight:500; letter-spacing:var(--t-label-ls); color:var(--ink); }
.nav-icons a:hover { color:var(--accent); }
.bag-count { margin-left:4px; font-family:var(--font-mono); font-size:11px; color:var(--accent); }
@media (max-width:900px){ .nav-primary{display:none} .header-row{grid-template-columns:auto 1fr auto; padding:var(--s-4)} .brand{text-align:left;font-size:22px} }

/* Hero */
.hero { position:relative; display:grid; grid-template-columns:1.05fr 1fr; min-height:70vh; border-bottom:var(--rule); }
.hero-copy { padding:var(--s-9) var(--pad-x-d) var(--s-8); display:flex; flex-direction:column; justify-content:center; max-width:720px; }
.hero-eyebrow { margin-bottom:var(--s-5); color:var(--ink-3); display:flex; align-items:center; gap:var(--s-3); }
.hero-eyebrow::before { content:""; width:32px; height:1px; background:var(--accent); }
.hero h1 { margin:0; font-family:var(--font-display); font-weight:500; font-size:var(--t-display-xl-size); line-height:var(--t-display-xl-lh); letter-spacing:var(--t-display-xl-ls); }
.hero h1 em { font-style:italic; color:var(--accent); font-weight:500; }
.hero .deck { margin-top:var(--s-5); max-width:520px; color:var(--ink-2); }
.hero-ctas { margin-top:var(--s-7); display:flex; gap:var(--s-3); flex-wrap:wrap; }
.hero-meta { margin-top:var(--s-7); padding-top:var(--s-5); border-top:var(--rule); display:flex; gap:var(--s-7); flex-wrap:wrap; color:var(--ink-3); }
.hero-meta b { display:block; margin-top:4px; font-family:var(--font-display); font-weight:500; font-size:18px; color:var(--ink); letter-spacing:-.01em; text-transform:none; }
.hero-img { position:relative; overflow:hidden; background: linear-gradient(160deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.35) 100%), url("/generated/_sections/hero.webp") center/cover no-repeat; }
.hero-img::after { content:""; position:absolute; inset:0; background:linear-gradient(160deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.15) 60%, rgba(0,0,0,.45) 100%); }
@media (max-width:900px) { .hero { grid-template-columns:1fr; min-height:auto; } .hero-copy { padding:var(--s-7) var(--pad-x-m); } .hero-img { min-height:420px; order:-1; } }

/* Made for You */
.mfy { background:var(--paper-2); }
.mfy .grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:1px; background:var(--paper-3); }
.mfy .card { background:var(--paper); padding:0 0 var(--s-6); display:flex; flex-direction:column; cursor:pointer; overflow:hidden; transition:background var(--d-mid) var(--ease); color:inherit; text-decoration:none; }
.mfy .card:hover { background:var(--paper-2); }
.mfy .card .photo { aspect-ratio:4/3; background-size:cover; background-position:center; background-repeat:no-repeat; margin-bottom:var(--s-5); transition:transform var(--d-slow) var(--ease); }
.mfy .card:hover .photo { transform:scale(1.03); }
.mfy .card .body { padding:0 var(--s-6); display:flex; flex-direction:column; gap:var(--s-3); }
.mfy .ix { color:var(--ink-3); font-family:var(--font-mono); font-size:var(--t-mono-xs-size); letter-spacing:var(--t-mono-xs-ls); text-transform:uppercase; font-weight:500; }
.mfy h3 { margin:0; font-family:var(--font-display); font-weight:500; font-size:28px; letter-spacing:-.01em; }
.mfy p { margin:0; }
.mfy .arrow { margin-top:var(--s-4); color:var(--ink); font-weight:500; font-size:13px; letter-spacing:.04em; display:inline-flex; align-items:center; gap:8px; align-self:flex-start; }
.mfy .card:hover .arrow { color:var(--accent); }
.mfy-1 { background-image:url("/generated/_sections/service-bespoke.webp"); }
.mfy-2 { background-image:url("/generated/_sections/service-sherwani.webp"); }
.mfy-3 { background-image:url("/generated/_sections/service-shirts.webp"); }
@media (max-width:720px) { .mfy .grid { grid-template-columns:1fr; } }

/* Process */
.process .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-7); }
.process .step .photo { aspect-ratio:4/3; background-size:cover; background-position:center; margin-bottom:var(--s-4); }
.process .step .num { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:48px; line-height:1; color:var(--accent); letter-spacing:-.04em; }
.process .step h3 { margin:var(--s-4) 0 var(--s-2); font-family:var(--font-display); font-weight:500; font-size:22px; letter-spacing:-.01em; }
.process .step p { margin:0; }
.process .footer { margin-top:var(--s-7); padding-top:var(--s-5); border-top:var(--rule); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--s-4); }
.pr-1 { background-image:url("/generated/_sections/process-cloth.webp"); }
.pr-2 { background-image:url("/generated/_sections/process-measure.webp"); }
.pr-3 { background-image:url("/generated/_sections/process-finish.webp"); }
@media (max-width:720px) { .process .grid { grid-template-columns:1fr; gap:var(--s-6); } }

/* Editorial */
.editorial { display:grid; grid-template-columns:1fr 1fr; border-top:var(--rule); border-bottom:var(--rule); }
.editorial .img { position:relative; min-height:520px; overflow:hidden; background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,.25) 100%), url("/generated/_sections/editorial-wedding.webp") center top/cover no-repeat; }
.editorial .copy { padding:var(--s-9) var(--s-7); display:flex; flex-direction:column; justify-content:center; }
.editorial .ix { color:var(--ink-3); margin-bottom:var(--s-5); }
.editorial h3 { margin:0 0 var(--s-5); font-family:var(--font-display); font-weight:500; font-size:var(--t-display-lg-size); line-height:var(--t-display-lg-lh); letter-spacing:var(--t-display-lg-ls); }
.editorial p { margin:0 0 var(--s-5); max-width:480px; }
.editorial .signed { margin-top:var(--s-5); padding-top:var(--s-4); border-top:var(--rule); color:var(--ink-3); }
@media (max-width:900px) { .editorial { grid-template-columns:1fr; } .editorial .copy { padding:var(--s-7) var(--pad-x-m); } .editorial .img { min-height:380px; } }

/* Season grid */
.season .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-5); }
@media (max-width:900px) { .season .grid { grid-template-columns:repeat(2,1fr); gap:var(--s-3); } }
@media (max-width:520px) { .season .grid { grid-template-columns:1fr; } }
.pcard { display:flex; flex-direction:column; cursor:pointer; transition:transform 500ms var(--ease); color:inherit; text-decoration:none; }
.pcard:hover { transform:translateY(-3px); }
.pcard .plate { aspect-ratio:3/4; position:relative; overflow:hidden; background:var(--paper-2); box-shadow:0 0 0 0 rgba(0,0,0,0); transition:box-shadow 500ms var(--ease); }
.pcard:hover .plate { box-shadow:0 18px 40px -22px rgba(26,22,19,.45); }
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

/* Bespoke teaser */
.bespoke-teaser { background: linear-gradient(90deg, rgba(10,8,6,.92) 0%, rgba(10,8,6,.65) 55%, rgba(10,8,6,.35) 100%), url("/generated/_sections/atelier.webp") center/cover no-repeat; color:var(--paper); padding:var(--s-9) 0; position:relative; }
.bespoke-teaser .row { max-width:var(--container); margin:0 auto; padding:0 var(--pad-x-d); display:grid; grid-template-columns:1fr auto; gap:var(--s-7); align-items:center; }
.bespoke-teaser .ix { color:var(--ink-4); margin-bottom:var(--s-3); }
.bespoke-teaser h3 { margin:0 0 var(--s-4); font-family:var(--font-display); font-weight:500; font-size:var(--t-display-lg-size); line-height:1.1; letter-spacing:var(--t-display-lg-ls); max-width:720px; }
.bespoke-teaser h3 em { color:var(--ink-4); font-style:italic; font-weight:500; }
.bespoke-teaser p { margin:0; max-width:540px; color:var(--paper-3); }
.bespoke-teaser .btn { background:var(--paper); color:var(--ink); border-color:var(--paper); }
.bespoke-teaser .btn:hover { background:var(--accent); border-color:var(--accent); color:var(--paper); }
@media (max-width:900px) { .bespoke-teaser .row { grid-template-columns:1fr; padding:0 var(--pad-x-m); } .bespoke-teaser { padding:var(--s-7) 0; } }

/* Trust strip */
.trust-strip { border-top:var(--rule); border-bottom:var(--rule); padding:var(--s-5) var(--pad-x-d); display:flex; justify-content:center; align-items:center; gap:var(--s-7); flex-wrap:wrap; }
.trust-strip span { color:var(--ink-3); }
.trust-strip .dot { width:3px; height:3px; background:var(--ink-4); border-radius:50%; display:inline-block; }
@media (max-width:720px) { .trust-strip { gap:var(--s-3); padding:var(--s-4); } .trust-strip .dot { display:none; } }

/* Footer */
footer.site { background:var(--paper); border-top:var(--rule); padding:var(--s-9) var(--pad-x-d) var(--s-5); }
.foot-grid { max-width:var(--container); margin:0 auto; display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:var(--s-7); }
.foot-grid h4 { margin:0 0 var(--s-4); color:var(--ink-3); font-family:var(--font-mono); font-weight:500; font-size:var(--t-mono-xs-size); letter-spacing:var(--t-mono-xs-ls); text-transform:uppercase; }
.foot-grid ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:var(--s-3); }
.foot-grid ul a { color:var(--ink-2); font-size:14px; }
.foot-grid ul a:hover { color:var(--accent); }
.foot-grid .brand-block .brand-line { font-family:var(--font-display); font-weight:600; font-size:28px; color:var(--ink); margin-bottom:var(--s-3); letter-spacing:-.01em; }
.foot-grid .brand-block p { margin:0 0 var(--s-4); max-width:320px; color:var(--ink-2); }
.foot-grid .news { display:flex; gap:0; border:1px solid var(--paper-3); background:var(--paper); }
.foot-grid .news input { border:0; padding:12px 14px; flex:1; background:transparent; font-size:13px; }
.foot-grid .news button { background:var(--ink); color:var(--paper); border:0; padding:0 var(--s-5); font-family:var(--font-body); font-weight:500; font-size:12px; letter-spacing:.04em; cursor:pointer; transition:background var(--d-mid) var(--ease); background-image:linear-gradient(110deg, var(--ink) 0%, var(--ink) 38%, #2A2218 50%, var(--ink) 62%, var(--ink) 100%); background-size:200% 100%; animation:shimmer 7s linear infinite; }
.foot-grid .news button:hover { animation:none; background:var(--accent); }
@keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
.foot-bottom { max-width:var(--container); margin:var(--s-7) auto 0; padding-top:var(--s-5); border-top:var(--rule); display:flex; justify-content:space-between; flex-wrap:wrap; gap:var(--s-4); color:var(--ink-3); }
@media (max-width:900px) { .foot-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:600px) { .foot-grid { grid-template-columns:1fr; } .foot-bottom { flex-direction:column; gap:var(--s-3); text-align:left; } }

/* Ribbon */
.ribbon { position:relative; overflow:hidden; padding:var(--s-5) 0; border-top:var(--rule); border-bottom:var(--rule); background:var(--paper); }
.ribbon-track { display:flex; gap:var(--s-7); white-space:nowrap; width:max-content; animation:ribbon-slide 42s linear infinite; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:clamp(28px, 4.4vw, 56px); letter-spacing:-.005em; color:var(--ink); align-items:center; }
.ribbon:hover .ribbon-track { animation-play-state:paused; }
.ribbon-track em { color:var(--accent); font-style:italic; padding:0 .2em; }
.ribbon-track .star { display:inline-block; color:var(--accent); font-size:.55em; transform:translateY(-.25em); flex:0 0 auto; }
@keyframes ribbon-slide { to { transform:translateX(-50%); } }

/* Scroll progress */
.scroll-progress { position:fixed; top:0; left:0; right:0; height:2px; background:var(--paper-3); z-index:100; }
.scroll-progress::after { content:""; position:absolute; left:0; top:0; bottom:0; width:var(--progress, 0%); background:var(--accent); transition:width 80ms linear; }

/* Word reveals */
.word-mask { display:inline-block; overflow:hidden; vertical-align:top; line-height:1.1; padding-bottom:.04em; }
.word-mask > span { display:inline-block; transform:translateY(110%); transition:transform 1s cubic-bezier(.2,.7,.2,1); }
.word-mask.in > span { transform:none; }

/* Reveal blur */
.rev { filter:blur(4px); }
.rev.in { filter:blur(0); }

/* Buttons */
.btn { transition:background var(--d-mid) var(--ease), color var(--d-mid) var(--ease), border-color var(--d-mid) var(--ease), transform 250ms var(--ease); text-decoration:none; }
.btn:hover { transform:translateY(-1px); }

.sec-head { display:flex; align-items:flex-end; justify-content:space-between; gap:var(--s-5); padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.sec-head h2 { margin:0; }
.sec-head .meta { color:var(--ink-3); }
`;

export default function Home() {
  const men = PRODUCTS.filter(p => p.gender === "men").slice(0, 6);
  const women = PRODUCTS.filter(p => p.gender === "women").slice(0, 6);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_CSS }} />
      <div className="announce-bar" aria-label="FREE DELIVERY ON ORDERS OVER ₹15,000 — MADE-TO-MEASURE IN SEVEN DAYS">
        <div className="announce-ticker" aria-hidden="true">
          {[0,1].map(i => (
            <span key={i} className="announce-ticker__track">
              <span className="announce-item">Complimentary delivery on orders over <span className="announce-accent">₹15,000</span></span>
              <span className="announce-sep" />
              <span className="announce-item">Made-to-measure in <span className="announce-accent">seven days</span></span>
              <span className="announce-sep" />
              <span className="announce-item">Free alterations within <span className="announce-accent">30 days</span> of delivery</span>
              <span className="announce-sep" />
              <span className="announce-item">Bespoke appointments at our <span className="announce-accent">Delhi atelier</span></span>
              <span className="announce-sep" />
              <span className="announce-item">Home fittings in <span className="announce-accent">Delhi · Mumbai · Bangalore</span></span>
              <span className="announce-sep" />
            </span>
          ))}
        </div>
      </div>
      <Header />
      <PromoModal />

      <HeroBanner />
      <HeroReveal />

      {/* Carousel showcase #1 — heading-side row (Disturbia "New In" pattern) */}
      <CarouselShowcase
        title="New In"
        ctaLabel="View All Products"
        ctaHref="/collection?c=men"
        products={men.slice(0, 6)}
        headingSide="left"
      />

      {/* Editorial split #1 — image LEFT, products RIGHT */}
      <EditorialSplit
        title="The Men's Edit"
        ctaLabel="Shop Menswear"
        ctaHref="/collection?c=men"
        image="/generated/_sections/atelier.webp"
        imageAlt="Master tailor at the atelier"
        imageSide="left"
        products={men}
      />

      {/* Editorial split #2 — image RIGHT, products LEFT */}
      <EditorialSplit
        title="The Women's Edit"
        ctaLabel="Shop Womenswear"
        ctaHref="/collection?c=women"
        image="/generated/aria-pant-suit/01-front.webp"
        imageAlt="The Women's Edit — aria pant suit"
        imageSide="right"
        products={women}
      />

      {/* Carousel showcase #2 — heading on right (Disturbia "Women's Swimwear" pattern) */}
      <CarouselShowcase
        title="Festive Edit"
        ctaLabel="View All Products"
        ctaHref="/collection?c=festive"
        products={women.slice(0, 6)}
        headingSide="right"
      />

      {/* Women's Collection banner — full-width editorial strip */}
      <Link href="/collection?c=women" className="coll-banner" aria-label="Shop the Women's Collection">
        <div
          className="coll-banner-img"
          role="img"
          aria-label="Women's summer collection editorial"
          style={{ backgroundImage: "url(/generated/_sections/swim-banner.webp)" }}
        />
        <div className="coll-banner-overlay">
          <span className="coll-banner-eyebrow">New season</span>
          <h2>Women&apos;s Collection<em>.</em></h2>
          <span className="btn btn-primary coll-banner-cta">Shop Now</span>
        </div>
      </Link>

      {/* Made for You — pushed down, services come after products */}
      <section className="mfy">
        <div className="container" style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-9)" }}>
          <div className="sec-head">
            <Reveal as="h2" className="t-display-lg">Made for you</Reveal>
            <span className="meta t-mono-xs">Section · 01</span>
          </div>
          <div className="grid">
            <Reveal delay={1}>
              <Link className="card" href="/bespoke">
                <div className="photo mfy-1" role="img" aria-label="Master tailor measuring a client"></div>
                <div className="body">
                  <span className="ix">Bespoke</span>
                  <h3>The Bespoke Suit</h3>
                  <p className="t-body">Three fittings, paper pattern drafted to your figure, four to six weeks. From ₹45,000.</p>
                  <span className="arrow">Begin your suit <span>→</span></span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={2}>
              <Link className="card" href="/bespoke">
                <div className="photo mfy-2" role="img" aria-label="Festive sherwani in silk"></div>
                <div className="body">
                  <span className="ix">Made to measure</span>
                  <h3>Custom Sherwani</h3>
                  <p className="t-body">Choose your cloth, lining, collar, and length. Festive-ready in seven days. From ₹28,000.</p>
                  <span className="arrow">Configure yours <span>→</span></span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={3}>
              <Link className="card" href="/bespoke">
                <div className="photo mfy-3" role="img" aria-label="Tailored shirt detail"></div>
                <div className="body">
                  <span className="ix">Made to measure</span>
                  <h3>Tailored Shirts</h3>
                  <p className="t-body">Premium cotton, poplin, and linen. Cut to your measurements, delivered in five days. From ₹2,800.</p>
                  <span className="arrow">Order yours <span>→</span></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process page">
        <div className="container">
          <div className="sec-head">
            <Reveal as="h2" className="t-display-lg">How it&apos;s made</Reveal>
            <span className="meta t-mono-xs">Section · 02</span>
          </div>
          <div className="grid">
            <Reveal delay={1} className="step">
              <div className="photo pr-1" role="img" aria-label="Cloth library — wool swatches"></div>
              <div className="num">01</div>
              <h3>Choose your cloth</h3>
              <p className="t-body">Browse our cloth library — wools from Italian and English mills, premium Indian cottons, handwoven silks. Order swatches free.</p>
            </Reveal>
            <Reveal delay={2} className="step">
              <div className="photo pr-2" role="img" aria-label="Master tailor at the cutting table"></div>
              <div className="num">02</div>
              <h3>Get measured</h3>
              <p className="t-body">Visit our atelier or book a home fitting in Delhi, Mumbai, or Bangalore. Fourteen measurements, taken by our master tailors.</p>
            </Reveal>
            <Reveal delay={3} className="step">
              <div className="photo pr-3" role="img" aria-label="Finished suit, pressed and ready"></div>
              <div className="num">03</div>
              <h3>Receive in seven days</h3>
              <p className="t-body">Cut, stitched, and pressed in our workroom. Free alterations within thirty days of delivery — until the fit is right.</p>
            </Reveal>
          </div>
          <div className="footer">
            <span className="t-mono-xs">Standard delivery · Free across India</span>
            <Link className="btn btn-secondary" href="/bespoke#book">Book a fitting</Link>
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="editorial" id="editorial">
        <div className="img" role="img" aria-label="The Wedding Wardrobe — sherwani"></div>
        <div className="copy">
          <div className="ix t-mono-xs">Seasons · The Wedding Wardrobe</div>
          <Reveal as="h3">A six-piece capsule for the season&apos;s weddings &mdash; from <em>haldi</em> to reception.</Reveal>
          <Reveal as="p" delay={1} className="t-body">
            Indian wedding seasons run long. We designed a tight capsule of six pieces that
            cover every occasion from morning ceremonies to formal receptions — built around
            one tailored fit, three cloth weights, and the quiet hardware of an evening worth
            remembering.
          </Reveal>
          <Reveal as="p" delay={2} className="t-body">Photographed in Jaipur, January 2026.</Reveal>
          <Link className="btn btn-secondary" href="/collection?c=sherwani" style={{ alignSelf: "flex-start", marginTop: "var(--s-3)" }}>Shop the wedding wardrobe</Link>
          <div className="signed t-mono-xs">By the Elite Zone J design team</div>
        </div>
      </section>

      {/* Bespoke teaser */}
      <section className="bespoke-teaser">
        <div className="row">
          <div>
            <div className="ix t-mono-xs">Bespoke · Made-to-measure</div>
            <Reveal as="h3">Designed in our studio. <em>Stitched by our master tailors.</em></Reveal>
            <Reveal as="p" delay={1} className="t-body-lg">
              Twelve designers and twenty-six tailors, working from our Delhi atelier. Visit us by appointment,
              or book a home fitting in Delhi, Mumbai, or Bangalore.
            </Reveal>
          </div>
          <Link className="btn btn-lg" href="/bespoke">Visit the atelier</Link>
        </div>
      </section>

      <TrustStrip />
      <Footer />
    </>
  );
}
