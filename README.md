# Omkar Visuals — Video Editor Portfolio

A premium, JSON-driven portfolio site for showcasing vertical (9:16) real estate videos hosted on YouTube. Built with React, Vite, Tailwind CSS v4, and Framer Motion. Fully static — no backend, no build-time API calls.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the app at `http://localhost:5184` with hot module reload.

## Build & Preview

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/`, ready to deploy anywhere that serves static files.

## Deployment (Vercel)

Push the repo to GitHub/GitLab/Bitbucket and import it in Vercel — the Vite preset is auto-detected (build command `vite build`, output directory `dist`). No environment variables are required. `vercel.json` at the repo root rewrites every path to `/index.html` so client-side routes (e.g. `/videos`) work on a direct load or refresh, not just via in-app navigation.

## Folder Structure

```
src/
├── data/            JSON content — the entire site's content model lives here
├── context/         VideoDataProvider — loads + normalizes the JSON catalog once
├── hooks/           useVideoData, useSearch, useCategoryFilter, useTheme, etc.
├── utils/           YouTube URL parsing, video/category normalization
├── components/
│   ├── layout/      Navbar, Footer, BackToTop
│   ├── sections/    Hero, FeaturedReel, CategoryRow
│   ├── video/       VideoCard, VideoModal, and their skeleton/error states
│   ├── filters/     SearchBar, FilterPills
│   └── ui/          Container, IconButton, ThemeToggle, AnimatedSectionTitle
└── pages/
    ├── HomePage.jsx  Composes every section above, in order (route: `/`)
    └── VideosPage.jsx Full searchable/filterable grid of every video (route: `/videos`)
```

## Adding a Category

You never edit component code to add a category. Two steps:

1. Create `src/data/<your-category-id>.json` containing an array of video objects (see format below).
2. Add `{ "id": "<your-category-id>", "name": "Your Category Name" }` to `src/data/categories.json`.

The filename **must** match the `id` you use in `categories.json`. The navigation, the filter pills, and a new horizontally-scrolling homepage row are generated automatically — nothing else to change.

## Adding / Updating Videos

Open the relevant category's JSON file and add an object to the array:

```json
{
  "id": 6,
  "title": "Oceanfront Estate Walkthrough",
  "youtube": "https://youtu.be/dQw4w9WgXcQ",
  "featured": true,
  "order": 6
}
```

**Required fields:** `id` (unique within the file), `title`, `youtube`.

**Optional fields** (all ignored gracefully if omitted): `featured` (boolean — appears in the homepage "Featured" reel), `order` (number — controls sort position within its row; lower is first), `description`, `client`, `location`, `year`, `tags` (array of strings), `duration`, `thumbnail` (custom thumbnail URL — overrides the auto-derived YouTube thumbnail), `poster`, `featuredImage`.

`youtube` accepts any of these formats: `https://youtu.be/ID`, `https://www.youtube.com/watch?v=ID`, `https://www.youtube.com/embed/ID`, `https://www.youtube.com/shorts/ID`, or a bare 11-character video ID.

### Bulk import with ChatGPT

Paste a list of YouTube links and ask ChatGPT to output a JSON array matching the schema above — the required fields are just `id`, `title`, and `youtube`, so a prompt like *"Convert these YouTube links into a JSON array of `{id, title, youtube, featured, order}` objects, incrementing `id` and `order` for each"* is enough to generate a ready-to-paste file.

### Invalid entries

If a video's `youtube` field can't be parsed, or `title`/`id` is missing, that entry renders as a premium "Video unavailable" placeholder card instead of crashing the page — check the browser console for a `Could not parse YouTube URL` warning to find the bad entry.

## Design Tokens

Colors, fonts, and dark-mode variant are defined in `src/index.css` via Tailwind v4's `@theme` block: `gold` (#C9A96E, accent), `ink` (#111111), `paper` (#F5F5F5), `hairline` / `hairline-dark` (borders). Dark mode is toggled by the navbar's theme button and persisted to `localStorage` — see `src/hooks/useTheme.js`.

## Performance Notes

- No YouTube `<iframe>` is ever created until a video card is clicked — cards show a static thumbnail with a play-button overlay; the modal mounts the iframe on open and unmounts it (stopping playback) on close.
- Card thumbnails are gated by `IntersectionObserver` (`useIntersectionReveal`) in addition to native `loading="lazy"`, so scrolling one category row never forces images in a different, still-offscreen row to load.
- Horizontal rows use native CSS scroll-snap, not a JS carousel — free GPU-accelerated scrolling that doesn't fight touch gestures.
