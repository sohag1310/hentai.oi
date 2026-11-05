import { Router } from "express";
import type { CatalogProvider, Language } from "../types.js";
export function episodeRoutes(provider: CatalogProvider) {
  const router = Router();
  router.get("/", async (req, res, next) => {
    try {
      const slug = String(req.query.slug || "");
      if (!/^[a-z0-9-]{1,100}$/i.test(slug)) return res.status(400).json({ success: false, error: "Invalid slug" });
      const season = Math.max(1, Math.min(100, Number(req.query.season) || 1));
      const ep = Math.max(1, Math.min(500, Number(req.query.ep) || 1));
      const server = String(req.query.server || "primary").slice(0, 60);
      const lang = (["hin", "eng", "sub"].includes(String(req.query.lang)) ? String(req.query.lang) : "hin") as Language;
      res.json({ success: true, ...await provider.episode(slug, season, ep, server, lang) });
    } catch (error) { next(error); }
  });
  return router;
}
