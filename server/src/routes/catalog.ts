import { Router } from "express";
import type { CatalogProvider } from "../types.js";
export function catalogRoutes(provider: CatalogProvider) {
  const router = Router();
  router.get("/", async (req, res, next) => {
    try {
      const page = Math.max(1, Math.min(500, Number(req.query.page) || 1));
      const search = String(req.query.search || "").slice(0, 100);
      const category = String(req.query.category || "").slice(0, 40);
      res.json({ success: true, page, animes: await provider.catalog({ page, search, category }) });
    } catch (error) { next(error); }
  });
  return router;
}
