"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { group: "Shop", items: [
    { href: "/collection?c=men", label: "Men" },
    { href: "/collection?c=women", label: "Women" },
    { href: "/collection?c=festive", label: "Festive" },
  ]},
  { group: "Services", items: [
    { href: "/bespoke", label: "Bespoke" },
    { href: "/#editorial", label: "Editorial" },
  ]},
  { group: "Account", items: [
    { href: "/cart", label: "Bag" },
  ]},
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span /><span /><span />
      </button>

      <nav className="mobile-drawer" data-open={open} aria-hidden={!open}>
        <button className="close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        {LINKS.map(g => (
          <div key={g.group}>
            <div className="group">{g.group}</div>
            {g.items.map(i => (
              <Link key={i.href} href={i.href} onClick={() => setOpen(false)}>
                {i.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
