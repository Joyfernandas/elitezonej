import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

// Social icons drawn in their conventional brand-recognisable silhouettes.
// Generic shapes — not pixel-copies of any brand's mark file. We render in
// monochrome so the footer reads as a quiet typographic page rather than a
// rainbow of colours competing with the wordmark.

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M13.5 22v-9h3.1l.4-3.6h-3.5V7.1c0-1 .3-1.7 1.7-1.7H17V2.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.7H7v3.6h3v9z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M17.7 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.5l4.5 5.9zM16.6 19.2h1.7L7.5 4.7H5.7z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.6 19.4c-.1-.8-.2-2.1.1-3l1.3-5.5s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.8 1.5 1.7 0 1-.7 2.5-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.7-2.2 3.7-5.5 0-2.9-2-4.9-5-4.9-3.4 0-5.4 2.5-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.4 1.5c0 .2-.2.3-.4.2-1.5-.7-2.5-2.9-2.5-4.7 0-3.8 2.8-7.4 8-7.4 4.2 0 7.5 3 7.5 7 0 4.2-2.6 7.5-6.3 7.5-1.2 0-2.4-.6-2.8-1.4l-.7 2.9c-.3 1-1 2.4-1.5 3.2A10 10 0 1 0 12 2z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M19.3 8.5a6.6 6.6 0 0 1-3.9-1.3v7.5a5.7 5.7 0 1 1-5.7-5.7c.4 0 .7 0 1 .1v3.3a2.6 2.6 0 1 0 1.8 2.5V2h3a3.6 3.6 0 0 0 3.8 3.6V8.5z"/>
    </svg>
  );
}

// Generic five-star rating badge in the visual family of public review
// widgets — green-on-white star squares. Does NOT claim association with
// any specific review platform.
function RatingBadge() {
  return (
    <div className="rating-badge">
      <div className="rating-label">Excellent</div>
      <div className="rating-stars" aria-label="Rated 4.8 out of 5">
        {[0,1,2,3,4].map(i => (
          <span key={i} className="star-square">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff">
              <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7L12 17.8 5.7 21.3l1.6-7L2 9.6 9 9z"/>
            </svg>
          </span>
        ))}
      </div>
      <div className="rating-meta">Verified buyer reviews</div>
    </div>
  );
}

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="site site--minimal">
        <div className="foot-bottom-min">
          <span>© 2026 Elite Zone J</span>
          <span>Visa · Mastercard · UPI · Net Banking · COD</span>
          <span>Designed and tailored in India</span>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Newsletter band — full-width centred above footer */}
      <section className="newsletter-band">
        <h3>Save 15% on your first order</h3>
        <NewsletterForm />
      </section>

      <footer className="site">
        <div className="foot-grid">
          <div className="foot-col">
            <h4>Help &amp; Info</h4>
            <ul>
              <li><Link href="/bespoke">Contact</Link></li>
              <li><Link href="/bespoke">FAQs</Link></li>
              <li><Link href="/cart">Size Guide</Link></li>
              <li><Link href="/cart">Delivery</Link></li>
              <li><Link href="/cart">Returns</Link></li>
              <li><Link href="/cart">T&amp;Cs</Link></li>
              <li><Link href="/cart">Privacy</Link></li>
            </ul>
          </div>

          <div className="foot-col foot-col-center">
            <h4>Elite Zone J</h4>
            <ul>
              <li><Link href="/bespoke">About</Link></li>
              <li><Link href="/bespoke">Our People</Link></li>
              <li><Link href="/collection?c=men">Our Product</Link></li>
              <li><Link href="/bespoke">Rewards</Link></li>
              <li><Link href="/bespoke">Referrals</Link></li>
              <li><Link href="/cart">E-Gift Cards</Link></li>
              <li><Link href="/bespoke">Sustainability</Link></li>
              <li><Link href="/bespoke">Careers</Link></li>
            </ul>
          </div>

          <div className="foot-col foot-col-social">
            <div className="social-row" aria-label="Social media">
              <a href="#" aria-label="Facebook"  className="social-icon"><FacebookIcon /></a>
              <a href="#" aria-label="X / Twitter" className="social-icon"><XIcon /></a>
              <a href="#" aria-label="Instagram" className="social-icon"><InstagramIcon /></a>
              <a href="#" aria-label="Pinterest" className="social-icon"><PinterestIcon /></a>
              <a href="#" aria-label="TikTok"    className="social-icon"><TikTokIcon /></a>
            </div>
            <RatingBadge />
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Elite Zone J</span>
          <div className="payments" aria-label="Accepted payment methods">
            <span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>UPI</span><span>NET BANKING</span><span>COD</span>
          </div>
        </div>
      </footer>
    </>
  );
}
