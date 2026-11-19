# PROGRESS.md — Omkar Visuals

_Last updated: 2026-11-12_

## Completed
- Migrated the reference project into this folder as an independent project (see CHANGELOG 2026-11-12 "Initial migration").
- Rebranded names/metadata; dev port 5184.
- **Video replacement:** removed all 62 inherited archive videos and their 11 categories; added the owner's 20 videos
  (15 Instagram reels + 5 YouTube videos) in 4 categories, in the order supplied.
- Added Instagram support to the existing JSON video pipeline (`utils/instagram.js`, `normalizeVideo.js`), self-hosted reel
  thumbnails in `public/thumbnails/`, landscape player mode for 16:9 YouTube videos, `subtitle` line (used for view counts).
- Homepage featured cards: Hare Krishna "Sri Ram Jayam" and "Na me bhaktah pranashyati" (YouTube, play from start; owner links had &t= timestamps).
- Homepage marquee replaced with 8 Omkar Visuals Cloudinary MP4s (verified loading in browser).
- Footer email: omkarpatil49549@gmail.com.
- Verified in browser: `/videos` shows 20 films, all filters correct (5/4/6/5), all thumbnails load; Instagram reel
  (Coreo.in 845K) plays inline; YouTube landscape video plays; homepage featured cards render; no app console errors.
  `npm run build` passes; `npm run lint` 0 errors, 1 inherited warning.

## Current status
All video content (archive, featured, marquee) is Omkar Visuals. Branding/copy still partly inherited.

## Pending (needs owner input)
- Replace `src/assets/logo.png` (shows "ARKA Visuals"), favicon, apple-touch-icon, og-image.
- Real domain and footer Instagram URL.
- Configure `VITE_GOOGLE_SHEETS_ENDPOINT`.
- Site copy (hero, process, testimonials, FAQ, pricing) is still real-estate-flavored.
- Optional: `git init`.

## Known issues
- Amazon miniTV reels (19.7M, 15M) cannot play inside the site — Instagram only shows "Watch on Instagram" for them.
  They still show the cover and link out. Fix options: YouTube/MP4 copies of those videos.
- Instagram embed shows Instagram's own header/footer chrome inside the 9:16 player (not a custom player).
- Thumbnails for Instagram reels are static copies; if a reel's cover changes, re-download it.
- Lint warning `react(only-export-components)` in `src/context/VideoDataProvider.jsx` (inherited).
- `npm audit` advisories in dev dependencies (inherited).
