# Project structure

- `client/src/App.tsx` — application shell and page state
- `client/src/components/` — reusable catalogue, player, language, server, and episode UI
- `client/src/services/api.ts` — typed API client
- `client/src/hooks/` — persistent user-list state
- `client/src/constants/` — language and category options
- `client/src/utils/` — browser storage and formatting helpers
- `server/src/index.ts` — Express app, security middleware, API mount points, static hosting
- `server/src/routes/` — catalog, series, and episode endpoints
- `server/src/provider.ts` — demo catalogue and authorized sample stream provider
- `server/src/config/` — environment configuration
- `server/src/middleware/` — API error and not-found handling
- `server/src/services/` — cache and URL policy helpers
- `server/src/tests/` — basic Node tests
