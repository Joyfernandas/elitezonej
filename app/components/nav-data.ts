export type NavLink = { href: string; label: string; meta?: string };
export type NavGroup = { title: string; items: NavLink[] };
export type NavCategory = {
  href: string;
  label: string;
  sale?: boolean;
  groups?: NavGroup[];
  footer?: { caption: string; ctaHref: string; ctaLabel: string };
};

export const NAV: NavCategory[] = [
  {
    href: "/collection?c=men",
    label: "Men",
    groups: [
      {
        title: "Suits",
        items: [
          { href: "/collection?c=men&sub=tuxedos", label: "Tuxedos", meta: "Black-tie · Single-button peak lapel" },
          { href: "/collection?c=men&sub=business-suits", label: "Business Suits", meta: "Two-piece · Slim & tailored" },
          { href: "/collection?c=men&sub=wedding-suits", label: "Wedding Suits", meta: "Three-piece · Sherwani · Bandhgala" },
        ],
      },
      {
        title: "Shirts",
        items: [
          { href: "/collection?c=men&sub=classic-shirts", label: "Classic Shirt", meta: "Spread & semi-spread collars" },
          { href: "/collection?c=men&sub=mandarin-shirts", label: "Mandarin Collar", meta: "Grandad & Nehru styles" },
          { href: "/collection?c=men&sub=pointed-shirts", label: "Pointed Collar", meta: "Forward-point & cutaway" },
        ],
      },
      {
        title: "Pants",
        items: [
          { href: "/collection?c=men&sub=tapered-pants", label: "Tapered Fit", meta: "Flat-front · Modern" },
          { href: "/collection?c=men&sub=bell-bottoms", label: "Bell Bottoms", meta: "Wide-flare retro" },
          { href: "/collection?c=men&sub=relaxed-pants", label: "Relaxed Fit", meta: "Easy through the leg" },
          { href: "/collection?c=men&sub=pleated-pants", label: "Pleated Pant", meta: "Single & double pleat" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { href: "/collection?c=men&sub=brooches", label: "Brooch", meta: "Lapel & sherwani" },
          { href: "/collection?c=men&sub=chains", label: "Chain", meta: "Pocket-watch & collar" },
          { href: "/collection?c=men&sub=rings", label: "Ring", meta: "Sterling silver, signet" },
          { href: "/collection?c=men&sub=glasses", label: "Glasses", meta: "Acetate & metal" },
          { href: "/collection?c=men&sub=belts", label: "Belt", meta: "Italian calfskin · Reversible" },
        ],
      },
    ],
    footer: {
      caption: "The Men’s Edit · Spring/Summer 2026",
      ctaHref: "/collection?c=men",
      ctaLabel: "View all men",
    },
  },
  {
    href: "/collection?c=women",
    label: "Women",
    groups: [
      {
        title: "Corsets",
        items: [
          { href: "/collection?c=women&sub=corsets", label: "Corsets", meta: "Boned · Hand-laced · Editorial" },
        ],
      },
      {
        title: "Formal Skirts",
        items: [
          { href: "/collection?c=women&sub=pencil-skirts", label: "Pencil", meta: "Knee-length · Tailored" },
          { href: "/collection?c=women&sub=a-line-skirts", label: "A-line", meta: "Mid-calf · Pleated" },
        ],
      },
      {
        title: "Dresses",
        items: [
          { href: "/collection?c=women&sub=office-wear", label: "Office Wear", meta: "Shirt-dress · Blazer-dress · Suiting" },
          { href: "/collection?c=women&sub=evening-gowns", label: "Evening Gowns", meta: "Bias-silk · Velvet · Lehenga" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { href: "/collection?c=women&sub=brooches", label: "Brooch", meta: "Statement & minimal" },
          { href: "/collection?c=women&sub=chains", label: "Chain", meta: "Layered & dainty" },
          { href: "/collection?c=women&sub=rings", label: "Ring", meta: "Sterling silver · Stack" },
          { href: "/collection?c=women&sub=glasses", label: "Glasses", meta: "Acetate & metal" },
          { href: "/collection?c=women&sub=belts", label: "Belt", meta: "Calfskin · Wide & corseted" },
        ],
      },
    ],
    footer: {
      caption: "The Women’s Edit · Spring/Summer 2026",
      ctaHref: "/collection?c=women",
      ctaLabel: "View all women",
    },
  },
  { href: "/collection?c=fabrics", label: "Fabrics" },
  { href: "/collection?c=festive", label: "Festive" },
  { href: "/bespoke", label: "Bespoke" },
  { href: "/#editorial", label: "Seasons" },
  { href: "/collection?c=men", label: "View All" },
  { href: "/collection?c=festive", label: "Sale", sale: true },
];
