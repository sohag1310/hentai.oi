# Neon Anime Stream

A dark, responsive anime catalogue and video-player starter built with React + TypeScript + Tailwind and an Express + TypeScript API.

## Important source / rights note
This project intentionally does **not** scrape Hanime or another third-party streaming site, bypass anti-bot controls, or extract/relay copyrighted video embeds. The supplied brief names a hentai source and contains unverified selectors/URL assumptions. Instead, the backend uses a provider interface and safe demo catalogue. Connect a provider only when you have permission to display its metadata and streams. Use direct stream URLs from content you own, license, or are otherwise authorized to distribute.

## Requirements
- Node.js 20+
- npm 10+

## Run locally
```bash
npm install
cp server/.env.example server/.env
npm run dev
```
Frontend: http://localhost:5173  
API: http://localhost:4000/api/health

## Production build
```bash
npm run build
npm start
```
The Express server serves `client/dist` after building.

## Configure an authorized catalogue
Implement `CatalogProvider` in `server/src/provider.ts`. The default `DemoProvider` supplies local demo metadata and a sample public-domain MP4. Replace it with your own licensed catalogue/stream service. The API response contracts are documented by the TypeScript types in `server/src/types.ts`.

## API
- `GET /api/catalog?page=1&search=&category=`
- `GET /api/series/:slug?season=1&lang=sub`
- `GET /api/episode?slug=...&season=1&ep=1&server=primary&lang=sub`
- `GET /api/health`

## Production checklist
- Add authentication, rate limiting, request logging, and monitoring.
- Store provider credentials only on the server in environment variables.
- Add a database/cache for catalogue metadata and provider responses.
- Configure HTTPS, CSP, CORS allow-list, and secure headers.
- Confirm licensing, territorial restrictions, age controls, and takedown procedures.
- Do not expose private origin URLs or provider secrets to the browser.
