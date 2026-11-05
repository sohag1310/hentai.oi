# NEON LIVE — Direct Source Embed

This build is a lightweight wrapper around the source website. It does **not** create a fake catalogue or demo player. The homepage is loaded directly from `https://hanime.tv` inside an iframe, so the source website itself supplies its live pages, posters, navigation, and player.

## Watch URL format

The player shortcut constructs the requested route:

`https://hanime.tv/videos/hentai/{slug}?season={n}&ep={n}&server={server}&lang={lang}`

The incorrect `/videos/anime/` route is not used.

## Important browser limitation

The source website controls whether it permits being displayed inside another site's iframe. If its response sends `X-Frame-Options` or a restrictive Content-Security-Policy `frame-ancestors` directive, browsers will block the embedded view. This app intentionally does not proxy the source, rewrite its headers, spoof browser identity, bypass anti-bot measures, or extract protected media. Use **Open source** to visit the source directly in a new tab when embedding is blocked.

## Run locally

- Node.js 20+
- `npm install`
- `npm run dev`

## Build

- `npm run build`
- `npm start`

## Render

Deploy as a Node web service. Build command: `npm install && npm run build`. Start command: `npm start`. Set `NODE_ENV=production` and `PORT` is provided by Render.

This wrapper does not host or redistribute source-site content. Confirm that embedding and your intended use comply with the source site's current terms and applicable law.
