# Source display behavior

- The source homepage loads at `https://hanime.tv` in a browser iframe.
- All source-side poster rendering, page navigation and player UI remain controlled by the source website.
- The player shortcut uses `/videos/hentai/{slug}` and query parameters `season`, `ep`, `server`, and `lang`.
- No demo catalogue, generated poster list, local sample MP4, HTML scraping, reverse proxy, header spoofing, anti-bot bypass, or protected-stream extraction is included.
- If the source blocks iframe embedding, browser security prevents this wrapper from displaying it. The user can open the current source URL directly in a new tab.
