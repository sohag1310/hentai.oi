# NEON Anime Stream — complete modular starter

A React + TypeScript + Tailwind frontend with an Express + TypeScript backend, modular API
routes, reusable player components, persistent My List, language/server controls, and a
Render Blueprint.

## Important content/source note
This is a working demo starter with sample catalogue data and a public demo video. It does
not scrape Hanime or any other third-party site, and it does not contain real anime episodes.
Connect only a source you own or are licensed to use. The supplied reference's URL patterns
and selectors were marked unverified, so they are documented rather than assumed to work.

## Requirements
- Node.js 20+
- npm 10+

## Run locally
```bash
npm install
npm run dev
```
Frontend: http://localhost:5173  
Backend: http://localhost:4000  
Health check: http://localhost:4000/api/health

## Production build
```bash
npm install
npm run check
npm run build
npm start
```

## Deploy on Render
1. Extract this ZIP.
2. Upload the folder contents to a GitHub repository (not the ZIP as a single file).
3. In Render choose **New → Blueprint** and connect that repository.
4. Render reads `render.yaml`, installs dependencies, builds both workspaces, and starts Express.
5. Check `/api/health` after deployment.

## Main API
- `GET /api/health`
- `GET /api/catalog?search=&category=&page=1`
- `GET /api/series/:slug?season=1&lang=hin`
- `GET /api/episode?slug=celestial-runner&season=1&ep=1&server=primary&lang=hin`

## Environment
See `server/.env.example`. Render sets `PORT` automatically.

## Notes
- `My List` is stored in the browser's local storage.
- The default provider returns demo catalogue data and a sample MP4.
- Video iframe playback depends on the external provider's own embed policy and CORS/security settings.
- This package has not been verified against a live third-party streaming source.
