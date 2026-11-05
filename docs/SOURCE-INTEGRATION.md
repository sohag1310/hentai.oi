# Connecting a real catalogue or video provider

The project ships with `DemoProvider` so it builds and runs without scraping a third-party
site or requiring a paid database. The sample MP4 is a public demonstration asset, not an
anime episode.

To connect a real source:
1. Use a provider/API you own or are licensed to access.
2. Implement the `CatalogProvider` interface in `server/src/types.ts`.
3. Return only poster and playback URLs you are authorized to display.
4. Confirm language, season, episode, and server mappings against provider documentation.
5. Add source-specific tests and caching before production deployment.

The URL patterns and CSS selectors in the supplied reference brief were marked unverified.
They have deliberately not been treated as confirmed integrations. This app does not bypass
anti-bot controls, extract hidden stream URLs, or relay copyrighted streams.
