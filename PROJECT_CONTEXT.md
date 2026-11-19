# PROJECT_CONTEXT.md — Omkar Visuals

## Overview
Omkar Visuals is a static, JSON-driven video-editor portfolio website. It was migrated on 2026-11-12 from the reference project
`C:\Users\REBELLIOUS\Documents\Claude\Completed\real-estate-video-portfolio` (the "Arka Visuals / Vertical Films" site). That
folder is **read-only reference** — never edit it. This project has no runtime or file dependency on it.

## Stack
- React 19 + Vite 8 (SPA, `react-router-dom` v7)
- Tailwind CSS v4 via `@tailwindcss/vite` (design tokens in `src/index.css` `@theme`)
- Framer Motion (animations), react-icons
- oxlint (lint). No TypeScript, no test suite.
- Deploy target: Vercel (`vercel.json` rewrites all paths to `/index.html` for client routes).

## Backend / database
There is **no backend and no database**. All content is static JSON bundled at build time.
The only external integration is the contact form (see below).

## Routes (`src/App.jsx`)
| Route | Page | Contents |
|---|---|---|
| `/` | `pages/HomePage.jsx` | Hero, FeaturedReel (marquee + 2 featured case studies), Process, Testimonials, Contact, FAQ |
| `/videos` | `pages/VideosPage.jsx` | Full archive grid, category filter pills, navbar search |
| `/pricing` | `pages/PricingPage.jsx` | Editing levels / pricing (static copy) |

`VideoModal` (lazy-loaded) plays a YouTube embed when any video card is clicked.

## Video content system (the "Videos section")
Content type: **JSON data files** (no CMS, no API, no DB).

1. `src/data/categories.json` — ordered list of categories `{ id, name, parentId? }`. A `parentId` makes it a subcategory
   (shown nested under its parent in the filter pills). Current categories, in order: `coreo` (Coreo.in), `thefitway`
   (thefitway.io), `rebellious-editz` (Rebellious_editz — brand campaigns), `hare-krishna-mandir-pune`.
2. `src/data/<category-id>.json` — one file per category id, an array of videos. Loaded automatically by
   `src/data/index.js` via `import.meta.glob('./*.json')` — a file whose name matches no category id is ignored.
3. Video entry schema (normalized by `src/utils/normalizeVideo.js`):
   - required: `id`, `title`, and **one** link field:
     - `instagram` — reel/post URL (`/reel/`, `/reels/`, `/p/`, `/tv/`; tracking params ignored) → `utils/instagram.js`
     - `youtube` — watch / youtu.be / shorts / embed URL or bare id → `utils/youtube.js` (`&t=` timestamps are dropped)
   - `thumbnail` — **needed for Instagram** (no stable public thumbnail URL): self-host as
     `public/thumbnails/<shortcode>.jpg` and reference `/thumbnails/<shortcode>.jpg`. YouTube falls back to maxres→sd→hq.
   - optional: `subtitle` (line under the title; falls back to `location`), `orientation` (`"landscape"` → 16:9 player,
     default 9:16), `order` (sort key; ties sorted by title), `featured` (homepage case-study cards, first 2 used),
     `description`, `client`, `location`, `year`, `tags`, `duration`, `poster`, `featuredImage`.
   - Invalid entries (missing title / unparseable URL) render as an error card instead of crashing.
   - The normalized model adds `platform` (`youtube` | `instagram`), `embedUrl`, `watchUrl`, `thumbnailSources[]`.
4. `src/data/homeReel.json` — **separate** list for the homepage auto-scrolling marquee: `{ id, title, src }` where `src` is a
   direct MP4 URL (Cloudinary URLs get on-the-fly resize/poster transforms in `FeaturedReel.jsx`). Not YouTube/Instagram.
   Holds 8 Omkar Visuals clips (Cloudinary cloud `jwnees7f`).
5. Data flow: JSON → `context/VideoDataProvider.jsx` (normalize, sort, build category tree, collect featured) →
   `hooks/useVideoData.js` → pages/components.

### Instagram embed notes
- Player iframe: `https://www.instagram.com/reel/<code>/embed/`. Instagram draws its own header/footer around the video.
- Some reels cannot play inside embeds: Instagram shows "Watch on Instagram" and opens instagram.com (typically licensed
  music). Check by fetching `/reel/<code>/embed/captioned/`: contains `video_url` → plays inline; "Watch on Instagram" → doesn't.
  Currently affected: both Amazon miniTV reels (`C7mAqKvt1AI`, `CqzpDIbA_Mw`).
- Thumbnail fetch (unofficial endpoint; the CDN URL it redirects to expires, hence self-hosting):
  `curl -sL -A "Mozilla/5.0" "https://www.instagram.com/p/<code>/media/?size=l" -o public/thumbnails/<code>.jpg`

### Owner-supplied source pages
- https://www.instagram.com/coreo.in/ · https://www.instagram.com/thefitway.io/ · https://www.instagram.com/rebellious_editz/reels/
- Hare Krishna Mandir Pune (YouTube @hkmpune): sound design, track design, drama video editing.

## Important components
- `components/layout/Navbar.jsx` — floating navbar, logo (`src/assets/logo.png`), search, mobile menu
- `components/layout/Footer.jsx` — contact email (omkarpatil49549@gmail.com) + Instagram link (placeholder)
- `components/video/VideoCard.jsx`, `VideoModal.jsx`, `VideoCardError.jsx`, `VideoCardSkeleton.jsx`
- `components/filters/FilterPills.jsx`, `SearchBar.jsx`; hooks `useCategoryFilter` (URL-synced), `useSearch`
- `components/sections/ContactSection.jsx` — contact form

## Integrations & environment
| Variable | Used by | Purpose |
|---|---|---|
| `VITE_GOOGLE_SHEETS_ENDPOINT` | `ContactSection.jsx` | Google Apps Script web-app `/exec` URL that appends form submissions to a Google Sheet |

Copy `.env.example` → `.env.local` and fill it in. The value was **not** copied from the reference project (secrets policy);
the contact form will not deliver submissions until this is configured with an Omkar Visuals endpoint.
External assets: YouTube (embeds/thumbnails), Cloudinary (homepage reel MP4s), Google Fonts (Inter).

## Development
```bash
npm install      # or npm ci
npm run dev      # http://localhost:5184 (strictPort; reference project uses 5183)
npm run build    # outputs dist/
npm run lint     # oxlint
npm run preview
```
`.claude/launch.json` defines the `omkar-visuals` dev server for the Claude browser preview.

## Branding still inherited from the reference project
- `src/assets/logo.png` still renders "ARKA Visuals" artwork (only file name and alt text changed).
- `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og-image.png` are generic placeholders.
- Domain placeholder `omkarvisuals.example.com` in `index.html`, `robots.txt`, `sitemap.xml`, footer email.
- Copy in Hero / Process / Testimonials / FAQ / Pricing is unchanged (real-estate-flavored).
