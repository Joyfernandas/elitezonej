import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustStrip from "../components/TrustStrip";
import CartClient from "./CartClient";

const HEADER_CSS = `
header.site { position:sticky; top:0; z-index:80; background:rgba(250,247,242,.96); backdrop-filter:blur(8px); border-bottom:var(--rule); }
.header-row { max-width:var(--container); margin:0 auto; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:var(--s-5); padding:var(--s-5) var(--pad-x-d); }
.brand { font-family:var(--font-display); font-weight:600; font-size:26px; text-align:center; }
.brand small { display:block; margin-top:2px; font-family:var(--font-mono); font-weight:500; font-size:9px; letter-spacing:.32em; text-transform:uppercase; color:var(--ink-3); }
.nav-primary { display:flex; gap:var(--s-6); list-style:none; margin:0; padding:0; }
.nav-primary > li > a { font-size:var(--t-label-size); letter-spacing:var(--t-label-ls); font-weight:500; padding:var(--s-2) 0; border-bottom:1px solid transparent; transition:color var(--d-fast) var(--ease), border-color var(--d-fast) var(--ease); display:inline-block; color:var(--ink); }
.nav-primary > li > a:hover { color:var(--accent); border-color:var(--accent); }
.nav-icons { display:flex; gap:var(--s-5); justify-content:flex-end; align-items:center; }
.nav-icons a { font-size:var(--t-label-size); font-weight:500; letter-spacing:var(--t-label-ls); color:var(--ink); }
.nav-icons a:hover { color:var(--accent); }
.bag-count { margin-left:4px; font-family:var(--font-mono); font-size:11px; color:var(--accent); }
@media (max-width:900px){ .nav-primary{display:none} .header-row{grid-template-columns:auto 1fr auto; padding:var(--s-4)} .brand{text-align:left;font-size:22px} }
.btn { transition:all var(--d-mid) var(--ease); text-decoration:none; }
.btn:hover { transform:translateY(-1px); }
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

export const metadata = { title: "Your bag — Elite Zone J" };

export default function CartPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HEADER_CSS }} />
      <Header />
      <CartClient />
      <TrustStrip />
      <Footer />
    </>
  );
}
