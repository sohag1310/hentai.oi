import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DemoProvider } from "./provider.js";
import type { Language } from "./types.js";

const app = express();
const provider = new DemoProvider();
const port = Number(process.env.PORT || 4000);
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.NODE_ENV === "production" ? origin : true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

const validLang = (value: unknown): Language =>
  value === "eng" || value === "sub" ? value : "hin";
const positiveInt = (value: unknown, fallback: number) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/catalog", async (req, res, next) => {
  try {
    const page = positiveInt(req.query.page, 1);
    const search = String(req.query.search || "").slice(0, 100);
    const category = String(req.query.category || "").slice(0, 40);
    res.json({ success: true, page, animes: await provider.catalog({ page, search, category }) });
  } catch (error) { next(error); }
});
app.get("/api/series/:slug", async (req, res, next) => {
  try {
    const result = await provider.series(req.params.slug, positiveInt(req.query.season, 1), validLang(req.query.lang));
    if (!result) return res.status(404).json({ success: false, error: "Series not found" });
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
});
app.get("/api/episode", async (req, res, next) => {
  try {
    const slug = String(req.query.slug || "");
    if (!/^[a-z0-9-]{1,100}$/i.test(slug)) return res.status(400).json({ success: false, error: "Invalid slug" });
    const result = await provider.episode(slug, positiveInt(req.query.season, 1), positiveInt(req.query.ep, 1), String(req.query.server || "primary"), validLang(req.query.lang));
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: "An unexpected server error occurred." });
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, "../../client/dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
