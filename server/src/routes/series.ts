import { Router } from "express";
import type { CatalogProvider, Language } from "../types.js";
export function seriesRoutes(provider: CatalogProvider) {
  const router = Router();
  router.get("/:slug", async (req, res, next) => {
    try {
      if (!/^[a-z0-9-]{1,100}$/i.test(req.params.slug)) return res.status(400).json({ success: false, error: "Invalid slug" });
      const season = Math.max(1, Math.min(100, Number(req.query.season) || 1));
      const lang = (["hin", "eng", "sub"].includes(String(req.query.lang)) ? String(req.query.lang) : "hin") as Language;
      const result = await provider.series(req.params.slug, season, lang);
      if (!result) return res.status(404).json({ success: false, error: "Series not found" });
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  });
  return router;
}
