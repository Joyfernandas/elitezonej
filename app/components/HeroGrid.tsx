import Link from "next/link";

const TILES = [
  {
    eyebrow: "House · 2026",
    title: "Premium\nCollection",
    sub: "Discover our finest selection",
    cta: "Shop Now",
    href: "/collection?c=men",
    img: "/generated/_hero/premium.webp",
    pos: "center top",
    veil: "left",
  },
  {
    eyebrow: "New Arrivals",
    title: "New\nArrivals",
    sub: "Fresh styles for the season",
    cta: "Explore",
    href: "/collection?c=new",
    img: "/generated/_hero/new-arrivals.webp",
    pos: "center 25%",
    veil: "up",
  },
  {
    eyebrow: "Bespoke · Made-to-measure",
    title: "Made to\nMeasure",
    sub: "Tailored perfection",
    cta: "Customize",
    href: "/bespoke",
    img: "/generated/_hero/made-to-measure.webp",
    pos: "center center",
    veil: "right",
  },
] as const;

export default function HeroGrid() {
  return (
    <section className="hg" aria-label="Featured collections">
      <div className="hg-grain" aria-hidden="true" />
      {TILES.map((t, i) => (
        <Link
          key={t.title}
          href={t.href}
          className={`hg-tile hg-tile-${i + 1}`}
          aria-label={`${t.title.replace("\n", " ")} — ${t.sub}`}
          style={{ ["--idx" as string]: i }}
        >
          <div
            className="hg-img"
            role="img"
            aria-hidden="true"
            style={{ backgroundImage: `url(${t.img})`, backgroundPosition: t.pos }}
          />
          <div className={`hg-veil hg-veil-${t.veil}`} aria-hidden="true" />
          <div className="hg-shade" aria-hidden="true" />
          <div className="hg-copy">
            <span className="hg-eyebrow">{t.eyebrow}</span>
            <h2 className="hg-title">{t.title}</h2>
            <span className="hg-rule" aria-hidden="true" />
            <p className="hg-sub">{t.sub}</p>
            <span className="hg-cta">
              <span className="hg-cta-label">{t.cta}</span>
              <span className="hg-cta-arrow" aria-hidden="true">→</span>
              <span className="hg-cta-line" aria-hidden="true" />
            </span>
          </div>
          <span className="hg-foot-rule" aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}
