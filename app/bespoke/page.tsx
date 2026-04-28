import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustStrip from "../components/TrustStrip";
import BookingForm from "./BookingForm";

const CSS = `
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
.btn { transition:all var(--d-mid) var(--ease); text-decoration:none; }
.btn:hover { transform:translateY(-1px); }

.b-hero { display:grid; grid-template-columns:1.1fr 1fr; min-height:64vh; border-bottom:var(--rule); }
.b-hero .copy { padding:var(--s-9) var(--pad-x-d) var(--s-7); display:flex; flex-direction:column; justify-content:center; }
.b-hero .ix { color:var(--ink-3); margin-bottom:var(--s-4); display:flex; align-items:center; gap:var(--s-3); }
.b-hero .ix::before { content:""; width:32px; height:1px; background:var(--accent); }
.b-hero h1 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(40px,5.5vw,80px); line-height:1.05; letter-spacing:-.02em; }
.b-hero h1 em { font-style:italic; color:var(--accent); }
.b-hero p { max-width:520px; margin:var(--s-5) 0 0; color:var(--ink-2); font-family:var(--font-display); font-style:italic; font-weight:500; font-size:18px; line-height:1.55; }
.b-hero .ctas { margin-top:var(--s-7); display:flex; gap:var(--s-3); flex-wrap:wrap; }
.b-hero .img { position:relative; overflow:hidden; background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.3) 100%), url("/generated/_sections/service-bespoke.webp") center/cover no-repeat; }
@media (max-width:900px) { .b-hero { grid-template-columns:1fr; } .b-hero .img { min-height:380px; order:-1; } .b-hero .copy { padding:var(--s-7) var(--pad-x-m); } }

.services { padding:var(--s-9) 0; background:var(--paper-2); border-bottom:var(--rule); }
.services .row { max-width:var(--container); margin:0 auto; padding:0 var(--pad-x-d); }
.services .head { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.services h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(32px,4vw,52px); letter-spacing:-.015em; }
.services .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-5); }
@media (max-width:900px) { .services .grid { grid-template-columns:1fr; } .services .row { padding:0 var(--pad-x-m); } }
.svc { background:var(--paper); border:var(--rule); display:flex; flex-direction:column; }
.svc .photo { aspect-ratio:4/3; background-size:cover; background-position:center; }
.svc .body { padding:var(--s-5); display:flex; flex-direction:column; gap:var(--s-3); flex:1; }
.svc .ix { color:var(--ink-3); }
.svc h3 { margin:0; font-family:var(--font-display); font-weight:500; font-size:24px; letter-spacing:-.005em; }
.svc .price { font-family:var(--font-mono); font-weight:500; font-size:14px; color:var(--ink); padding:var(--s-2) 0; border-top:var(--rule); border-bottom:var(--rule); margin:var(--s-2) 0; }
.svc ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
.svc li { padding-left:18px; position:relative; color:var(--ink-2); font-size:13px; line-height:1.5; }
.svc li::before { content:"—"; position:absolute; left:0; color:var(--ink-3); }
.svc .cta { margin-top:auto; padding-top:var(--s-4); }
.svc-1 .photo { background-image:url("/generated/_sections/service-bespoke.webp"); }
.svc-2 .photo { background-image:url("/generated/_sections/service-sherwani.webp"); }
.svc-3 .photo { background-image:url("/generated/_sections/service-shirts.webp"); }

.process { padding:var(--s-9) var(--pad-x-d); max-width:var(--container); margin:0 auto; }
.process .head { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.process h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(32px,4vw,52px); letter-spacing:-.015em; }
.steps { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--s-5); }
@media (max-width:900px) { .steps { grid-template-columns:repeat(2,1fr); } }
@media (max-width:520px) { .steps { grid-template-columns:1fr; } }
.step .num { font-family:var(--font-display); font-style:italic; font-weight:500; font-size:48px; line-height:1; color:var(--accent); margin-bottom:var(--s-4); letter-spacing:-.04em; }
.step h4 { margin:0 0 var(--s-2); font-family:var(--font-display); font-weight:500; font-size:20px; letter-spacing:-.005em; }
.step p { margin:0; }
.step .photo { aspect-ratio:4/3; background-size:cover; background-position:center; margin-bottom:var(--s-4); }
.step-1 .photo { background-image:url("/generated/_sections/process-cloth.webp"); }
.step-2 .photo { background-image:url("/generated/_sections/service-bespoke.webp"); }
.step-3 .photo { background-image:url("/generated/_sections/process-measure.webp"); }
.step-4 .photo { background-image:url("/generated/_sections/process-finish.webp"); }

.atelier { background:var(--paper-2); padding:var(--s-9) 0; border-top:var(--rule); border-bottom:var(--rule); }
.atelier .row { max-width:var(--container); margin:0 auto; padding:0 var(--pad-x-d); display:grid; grid-template-columns:1fr 1.4fr; gap:var(--s-7); align-items:center; }
@media (max-width:900px) { .atelier .row { grid-template-columns:1fr; padding:0 var(--pad-x-m); } }
.atelier .copy h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(32px,4vw,52px); letter-spacing:-.015em; line-height:1.05; }
.atelier .copy p { color:var(--ink-2); margin:var(--s-4) 0 0; max-width:520px; }
.atelier .copy .stats { display:flex; gap:var(--s-7); margin-top:var(--s-5); padding-top:var(--s-4); border-top:var(--rule); flex-wrap:wrap; }
.atelier .stat { color:var(--ink-3); }
.atelier .stat b { display:block; margin-top:4px; font-family:var(--font-display); font-weight:500; font-size:24px; color:var(--ink); letter-spacing:-.01em; text-transform:none; }
.team { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--s-3); }
.team .person { display:flex; flex-direction:column; gap:var(--s-3); }
.team .ph { aspect-ratio:1; background-size:cover; background-position:center; border-radius:50%; overflow:hidden; }
.p1 { background-image:url("/generated/_team/team-aman.webp"); }
.p2 { background-image:url("/generated/_team/team-vikram.webp"); }
.p3 { background-image:url("/generated/_team/team-riya.webp"); }
.team h4 { margin:0; font-family:var(--font-display); font-weight:500; font-size:18px; letter-spacing:-.005em; }
.team .role { color:var(--ink-3); margin:0; font-size:11px; letter-spacing:.06em; font-family:var(--font-mono); text-transform:uppercase; }
.team .yrs { color:var(--ink-2); font-size:13px; margin:0; line-height:1.4; }
@media (max-width:600px) { .team { grid-template-columns:1fr; } }

.pricing { padding:var(--s-9) var(--pad-x-d); max-width:var(--container); margin:0 auto; }
.pricing h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(32px,4vw,52px); letter-spacing:-.015em; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.pricing-table { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border:var(--rule); }
@media (max-width:900px) { .pricing-table { grid-template-columns:1fr; } .pricing-table > div { border-right:0 !important; border-bottom:var(--rule); } }
.pricing-table > div { padding:var(--s-5); border-right:var(--rule); }
.pricing-table > div:last-child { border-right:0; }
.pricing-table h4 { margin:0 0 var(--s-3); font-family:var(--font-mono); font-weight:500; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-3); }
.pricing-table .from { font-family:var(--font-display); font-weight:500; font-size:32px; color:var(--ink); letter-spacing:-.01em; line-height:1; }
.pricing-table .from small { display:block; margin-top:6px; font-family:var(--font-mono); font-size:11px; letter-spacing:.06em; color:var(--ink-3); text-transform:uppercase; font-weight:500; }
.pricing-table p { margin:var(--s-3) 0 0; color:var(--ink-2); font-size:13px; line-height:1.55; }

.book { background:var(--ink); color:var(--paper); padding:var(--s-9) var(--pad-x-d); }
.book .row { max-width:var(--container); margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:var(--s-7); align-items:center; }
@media (max-width:900px) { .book .row { grid-template-columns:1fr; } }
.book .ix { color:var(--ink-4); margin-bottom:var(--s-3); }
.book h3 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(28px,4vw,46px); letter-spacing:-.01em; line-height:1.1; }
.book h3 em { color:var(--ink-4); font-style:italic; }
.book p { margin:var(--s-4) 0 0; color:var(--paper-3); max-width:480px; }
.book form { display:flex; flex-direction:column; gap:var(--s-3); padding:var(--s-5); background:rgba(255,255,255,.04); border:1px solid #2A2218; }
.book form .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:var(--s-3); }
@media (max-width:520px) { .book form .grid2 { grid-template-columns:1fr; } }
@media (max-width:375px) { .book { padding:var(--s-7) var(--s-3); } .pricing { padding:var(--s-7) var(--s-3); } .process { padding:var(--s-7) var(--s-3); } .quotes { padding:var(--s-7) var(--s-3); } }
.book input, .book select { background:transparent; border:1px solid #3A2A1C; color:var(--paper); padding:12px 14px; font-family:var(--font-body); font-size:13px; width:100%; }
.book input::placeholder { color:var(--ink-4); }
.book label { color:var(--ink-4); }
.book .btn { background:var(--paper); color:var(--ink); border-color:var(--paper); }
.book .btn:hover { background:var(--accent); border-color:var(--accent); color:var(--paper); }
.book .alt { margin-top:var(--s-3); display:flex; gap:var(--s-3); align-items:center; color:var(--paper-3); font-size:13px; }
.book .alt a { color:var(--paper); text-decoration:underline; text-underline-offset:3px; }

.quotes { padding:var(--s-9) var(--pad-x-d); max-width:var(--container); margin:0 auto; }
.quotes h2 { margin:0; font-family:var(--font-display); font-weight:500; font-size:clamp(28px,4vw,46px); letter-spacing:-.015em; padding-bottom:var(--s-4); border-bottom:var(--rule-strong); margin-bottom:var(--s-7); }
.quotes .grid { display:grid; grid-template-columns:repeat(2,1fr); gap:var(--s-7); }
@media (max-width:720px) { .quotes .grid { grid-template-columns:1fr; gap:var(--s-5); } }
.quote q { display:block; font-family:var(--font-display); font-style:italic; font-weight:500; font-size:22px; line-height:1.45; color:var(--ink); margin:0 0 var(--s-4); }
.quote .by { color:var(--ink-3); }
.quote .by b { color:var(--ink); font-family:var(--font-display); font-style:normal; font-weight:600; font-size:14px; letter-spacing:0; text-transform:none; }

.trust-strip { border-top:var(--rule); border-bottom:var(--rule); padding:var(--s-5) var(--pad-x-d); display:flex; justify-content:center; gap:var(--s-7); flex-wrap:wrap; align-items:center; }
.trust-strip span { color:var(--ink-3); }
.trust-strip .dot { width:3px; height:3px; background:var(--ink-4); border-radius:50%; display:inline-block; }
@media (max-width:720px){ .trust-strip{gap:var(--s-3); padding:var(--s-4)} .trust-strip .dot{display:none} }

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
.foot-grid .news button { background:var(--ink); color:var(--paper); border:0; padding:0 var(--s-5); font-family:var(--font-body); font-weight:500; font-size:12px; letter-spacing:.04em; cursor:pointer; transition:background var(--d-mid) var(--ease); }
.foot-grid .news button:hover { background:var(--accent); }
.foot-bottom { max-width:var(--container); margin:var(--s-7) auto 0; padding-top:var(--s-5); border-top:var(--rule); display:flex; justify-content:space-between; flex-wrap:wrap; gap:var(--s-4); color:var(--ink-3); }
@media (max-width:900px) { .foot-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:600px) { .foot-grid { grid-template-columns:1fr; } .foot-bottom { flex-direction:column; gap:var(--s-3); text-align:left; } }
`;

export const metadata = { title: "Bespoke & Made-to-Measure — Elite Zone J" };

export default function BespokePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Header />

      <section className="b-hero">
        <div className="copy">
          <div className="ix t-mono-xs">Bespoke · Made-to-Measure · Alterations</div>
          <h1>A suit cut to <em>your</em> figure.<br />Delivered in seven days.</h1>
          <p>Twelve in-house designers and twenty-six master tailors, working from our Delhi atelier.
            Visit us by appointment, or book a home fitting in Delhi, Mumbai, or Bangalore.</p>
          <div className="ctas">
            <Link className="btn btn-primary btn-lg" href="#book">Book a fitting</Link>
            <Link className="btn btn-secondary btn-lg" href="#process">How it works</Link>
          </div>
        </div>
        <div className="img" role="img" aria-label="Master tailor measuring a client at the Delhi atelier"></div>
      </section>

      <section className="services">
        <div className="row">
          <div className="head">
            <h2>Three ways to be tailored</h2>
            <span className="t-mono-xs" style={{ color: "var(--ink-3)" }}>From ₹3,500</span>
          </div>
          <div className="grid">
            <div className="svc svc-1">
              <div className="photo"></div>
              <div className="body">
                <span className="ix t-mono-xs">Bespoke</span>
                <h3>The Bespoke Suit</h3>
                <div className="price">From ₹45,000 · 4 to 6 weeks</div>
                <ul>
                  <li>Drafted to a paper pattern unique to your figure</li>
                  <li>Three fittings — basted, forward, finish</li>
                  <li>Hand-padded canvas, hand-stitched buttonholes</li>
                  <li>Lifetime mending; alterations free for first year</li>
                </ul>
                <div className="cta"><Link className="btn btn-primary btn-block" href="#book">Begin your suit</Link></div>
              </div>
            </div>
            <div className="svc svc-2">
              <div className="photo"></div>
              <div className="body">
                <span className="ix t-mono-xs">Made-to-Measure</span>
                <h3>Custom Sherwani</h3>
                <div className="price">From ₹28,000 · 7 days</div>
                <ul>
                  <li>Built on our base block, adjusted to your fourteen measurements</li>
                  <li>Choose cloth, lining, collar, length, and embroidery</li>
                  <li>One fitting included; alterations free for thirty days</li>
                  <li>Festive-ready in seven days</li>
                </ul>
                <div className="cta"><Link className="btn btn-primary btn-block" href="#book">Configure yours</Link></div>
              </div>
            </div>
            <div className="svc svc-3">
              <div className="photo"></div>
              <div className="body">
                <span className="ix t-mono-xs">Alterations</span>
                <h3>Alterations &amp; Fit Correction</h3>
                <div className="price">From ₹3,500 · 5 to 7 days</div>
                <ul>
                  <li>Bring in a piece you love; we&apos;ll re-cut it to fit</li>
                  <li>Trousers, jackets, shirts, sherwanis</li>
                  <li>Free for any Elite Zone J piece in its first year</li>
                  <li>Pickup &amp; return across Delhi, Mumbai, Bangalore</li>
                </ul>
                <div className="cta"><Link className="btn btn-primary btn-block" href="#book">Book alterations</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="head">
          <h2>How it&apos;s made</h2>
          <span className="t-mono-xs" style={{ color: "var(--ink-3)" }}>Four steps · Seven days</span>
        </div>
        <div className="steps">
          <div className="step step-1"><div className="photo"></div><div className="num">01</div><h4>Choose your cloth</h4><p className="t-body">Browse our cloth library — wools from Vitale Barberis Canonico and Reda 1865, Egyptian poplins from Thomas Mason, handwoven Indian silks. Order swatches free of charge.</p></div>
          <div className="step step-2"><div className="photo"></div><div className="num">02</div><h4>Get measured</h4><p className="t-body">Visit our Delhi atelier or book a home fitting in Delhi NCR, Mumbai, or Bangalore. Fourteen measurements, taken by our master tailors. Forty minutes, complimentary refreshment.</p></div>
          <div className="step step-3"><div className="photo"></div><div className="num">03</div><h4>We cut and stitch</h4><p className="t-body">Cut by hand from your paper pattern, basted for the first fitting, then constructed with hand-padded canvas and hand-stitched lapels.</p></div>
          <div className="step step-4"><div className="photo"></div><div className="num">04</div><h4>Receive in seven days</h4><p className="t-body">Delivered free across India in a hand-stitched garment bag. Free alterations within thirty days of delivery, until the fit is exactly right. Lifetime mending.</p></div>
        </div>
      </section>

      <section className="atelier">
        <div className="row">
          <div className="copy">
            <h2>Our atelier in Delhi</h2>
            <p className="t-body-lg">Twelve designers, twenty-six master tailors — between us, three hundred and seventy years on the bench. We design every piece in-house, cut every garment in our workroom, and put our names on every label.</p>
            <div className="stats">
              <div className="stat t-mono-xs">Designers<b>12</b></div>
              <div className="stat t-mono-xs">Master tailors<b>26</b></div>
              <div className="stat t-mono-xs">Average tenure<b>14 years</b></div>
              <div className="stat t-mono-xs">Founded<b>2012</b></div>
            </div>
          </div>
          <div className="team">
            <div className="person"><div className="ph p1"></div><h4>Aman Gupta</h4><p className="role">Lead Designer</p><p className="yrs">Twelve years on the bench. Three-piece suits and structured bandhgalas.</p></div>
            <div className="person"><div className="ph p2"></div><h4>Vikram Mehta</h4><p className="role">Master Tailor</p><p className="yrs">Eighteen years cutting. Trained in Savile Row construction technique.</p></div>
            <div className="person"><div className="ph p3"></div><h4>Riya Kapoor</h4><p className="role">Bespoke Specialist</p><p className="yrs">Nine years in zardozi and gota work. Festive sherwani lead designer.</p></div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <h2>Transparent pricing</h2>
        <div className="pricing-table">
          <div><h4>Bespoke Suit</h4><div className="from">₹45,000<small>Base · cloth from ₹3,500/m</small></div><p>Includes paper pattern, three fittings, lifetime mending, free alterations for one year.</p></div>
          <div><h4>Made-to-Measure Sherwani</h4><div className="from">₹28,000<small>Base · embroidery from ₹6,000</small></div><p>Includes one fitting, churidar, dupatta, cotton mulmul lining. Hand-worked zardozi quoted on selection.</p></div>
          <div><h4>Tailored Shirts</h4><div className="from">₹2,800<small>Per shirt · three for ₹7,500</small></div><p>Egyptian cotton poplin, single-needle stitching, mother-of-pearl buttons.</p></div>
        </div>
      </section>

      <section className="book" id="book">
        <div className="row">
          <div>
            <div className="ix t-mono-xs">Book a fitting</div>
            <h3>Choose your atelier or <em>we&apos;ll come to you.</em></h3>
            <p>By appointment only. Forty-minute fitting, complimentary chai or coffee, no pressure to order on the day. Bring a piece you love so we can match the fit.</p>
            <div className="alt">
              Or message us on WhatsApp: <a href="https://wa.me/919800000000">+91 98XXX XXXXX</a>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="quotes">
        <h2>What our customers say</h2>
        <div className="grid">
          <div className="quote">
            <q>&ldquo;I&apos;ve worn one of Aman&apos;s three-piece suits for every wedding I&apos;ve attended in the last four years. They&apos;ve taken it in twice for free and it still drapes like the day I bought it.&rdquo;</q>
            <div className="by t-mono-xs">— <b>Rohan Mehra</b>, Delhi · Investment Manager</div>
          </div>
          <div className="quote">
            <q>&ldquo;The home fitting in Mumbai was the deciding factor. The tailor came to my apartment, took fourteen measurements, asked questions a Savile Row cutter would ask. The sherwani arrived in seven days exactly.&rdquo;</q>
            <div className="by t-mono-xs">— <b>Arjun Shah</b>, Mumbai · Architect</div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <Footer />
    </>
  );
}
