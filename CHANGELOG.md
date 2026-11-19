# Changelog — Omkar Visuals

## 2026-11-12 — Homepage reel, featured videos, contact email
- Homepage marquee (`src/data/homeReel.json`): replaced the 8 inherited real-estate clips with 8 Omkar Visuals Cloudinary MP4s
  (Final Draft, Health recovery sandeep, Coach app, taka la dentro zumba, Fround final reel, Group heart rate, Gym CRM, Sanjana reel).
- Homepage featured long-form cards: now Hare Krishna Mandir Pune "Sri Ram Jayam" (vOOg555aJT0) and
  "Na me bhaktah pranashyati" (iWtiwa5at8E); Netflix reels no longer featured.
- Footer contact email set to omkarpatil49549@gmail.com.

## 2026-11-12 — Video content replacement
- Removed all inherited archive videos and categories (real estate, lifestyle, commercials, etc. — 11 JSON files).
- New categories: Coreo.in, thefitway.io, Rebellious_editz, Hare Krishna Mandir Pune.
- Added 20 videos in the owner's order: 5 Coreo.in reels, 4 thefitway.io reels, 6 brand-campaign reels (Amazon miniTV ×2,
  Netflix ×2, MX Player ×2, with view counts as subtitles), 5 Hare Krishna Mandir Pune YouTube dramas (titles from YouTube).
- Added Instagram reel support: `src/utils/instagram.js`; `normalizeVideo.js` now resolves `instagram` or `youtube` and
  exposes `platform`, `thumbnailSources`, `orientation`, `subtitle`.
- `VideoCard`, `FeaturedReel` use `thumbnailSources`; `VideoModal` supports a 16:9 landscape frame; copy-link label is
  platform-aware; cards/modal show `subtitle`.
- Self-hosted 15 Instagram reel thumbnails in `public/thumbnails/`.
- Featured (homepage case studies): Netflix 8.8M, Netflix 4.4M.

## 2026-11-12 — Initial migration
- Created Omkar Visuals as an independent copy of the reference portfolio project (source left untouched).
- Rebranded package name, HTML metadata, web manifest, robots.txt, sitemap.xml, footer and logo alt text.
- Renamed `src/assets/arka-visuals-logo.png` → `src/assets/logo.png` (image content unchanged).
- Dev server port changed 5183 → 5184 so both projects can run side by side.
- Added `.claude/launch.json`, `PROJECT_CONTEXT.md`, `PROGRESS.md`, `CHANGELOG.md`.
