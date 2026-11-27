# EN Construction

Multi-page website for EN Construction, a Valenzuela City-based company offering construction, electrical works and solar installation across Metro Manila.

## Routes

| Route | Purpose |
|---|---|
| `/en-construction` | Company overview, service gateways, selected projects, FAQ |
| `/en-construction/construction` | Construction services and the townhouse renovation project |
| `/en-construction/electrical` | Electrical works with a more technical visual language, plus 3 electrical projects |
| `/en-construction/solar` | Solar services, process, indicative PH-market packages (3-year warranty) |
| `/en-construction/contact` | Quote request form (pre-selects the service from `?service=`) |

`/` redirects to `/en-construction`; the old `/solar` and `/quote` URLs redirect permanently.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, lucide-react, self-hosted Geist fonts.

## Structure

```text
src/app/en-construction/   pages + shared layout (skip link, navbar, footer)
src/components/ui/         Button, PageHero, SectionHeading, CapabilityGrid, ProjectCard, ProjectGallery, CTA, Reveal
src/components/layout/     Navbar, Footer
src/components/sections/   Faq, ContactForm
src/data/                  site.ts (contact details, nav), projects.ts, content.ts (copy, solar packages, FAQ)
```

## Editing content

- Contact details, socials and the copyright year: `src/data/site.ts` (socials with an empty URL stay hidden).
- Projects and photos: `src/data/projects.ts` + `public/images/projects/<slug>/`.
- Solar packages and FAQ: `src/data/content.ts`.

## Admin quotation maker (`/admin`)

A private, noindex page for making solar quotations. It is not linked from the public site or listed in the sitemap.

- **Password:** set `ADMIN_PASSWORD` in the hosting environment variables (and in `.env.local` locally), then redeploy. It is checked only on the server (`src/app/api/admin/session`), a route handler that Vercel, or Netlify's Next.js adapter, runs as a serverless function.
- **Data:** prices, terms, the current draft and quote history stay in the browser's local storage on that device. Nothing is stored on the server or in this repo. Never commit real prices or client details.
- **Prices:** start blank. A PDF cannot be made until every quoted item has a price and the required terms are filled in.
- **Code:** calculations in `src/lib/admin/quote.ts`, PDF layout in `src/lib/admin/pdf.ts`, screens in `src/components/admin/`.

## Develop

```bash
npm install
npm run dev
npm run build
```
