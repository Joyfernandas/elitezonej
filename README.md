# Elite Zone J

Premium Indian tailoring and fashion e-commerce — built with Next.js 16 App Router.

**Live site:** [web-two-mocha-61.vercel.app](https://web-two-mocha-61.vercel.app)

---

## What it is

Elite Zone J is a made-to-measure clothing brand for men and women. The storefront covers the full shopping journey — browsing collections, viewing product details, booking bespoke fittings, and checking out.

18 products across suits, sherwanis, dresses, outerwear, sarees, and accessories. All tailored in Delhi and delivered across India in seven days.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19, pure CSS (no UI library) |
| Styling | Custom design system (`disturbia.css`) |
| Images | Next.js `<Image>` with WebP assets |
| Deployment | Vercel (auto-deploy on push to `master`) |
| Language | TypeScript |

## Project structure

```
app/
  components/       # Shared components (Header, Footer, HeroBanner, ProductCard…)
  page.tsx          # Homepage
  collection/       # Collection listing page
  products/[slug]/  # Product detail page
  bespoke/          # Bespoke booking page
  cart/             # Cart page
  disturbia.css     # Full design system
lib/
  products.ts       # Product catalogue (18 products)
public/
  generated/        # Product images (5 angles per product) + section images
```

## Key features

- 3-slide auto-scrolling hero banner with prev/next arrows
- Horizontal announce bar ticker (pause on hover)
- Mega menu navigation with hover bridge
- Product cards with hover alt-image and SALE badge
- Strikethrough sale pricing on product detail pages
- Bespoke appointment booking form
- Promo modal (50% OFF)
- Women's Collection full-width editorial banner
- Responsive across desktop, tablet, and mobile

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Connected to Vercel via GitHub integration. Every push to `master` auto-deploys to production.

```bash
git push origin master
```
