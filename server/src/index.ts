import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DemoProvider } from "./provider.js";
import { config } from "./config/env.js";
import { catalogRoutes, seriesRoutes, episodeRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const app = express();
const provider = new DemoProvider();
app.disable("x-powered-by");
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: { directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    "img-src": ["'self'", "data:", "https://images.unsplash.com"],
    "media-src": ["'self'", "https://interactive-examples.mdn.mozilla.net", "blob:"],
    "frame-src": ["'self'", "https:"],
    "connect-src": ["'self'", "https:"]
  }}
}));
app.use(cors({ origin: config.nodeEnv === "production" ? config.clientOrigin : true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));
app.use("/api", rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: "draft-7", legacyHeaders: false }));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "neon-anime-stream", mode: "demo" }));
app.use("/api/catalog", catalogRoutes(provider));
app.use("/api/series", seriesRoutes(provider));
app.use("/api/episode", episodeRoutes(provider));

app.use("/api", notFound);
app.use(errorHandler);

const dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(dirname, "../../client/dist");
if (config.nodeEnv === "production") {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}
app.listen(config.port, () => console.log(`NEON API listening on port ${config.port}`));
