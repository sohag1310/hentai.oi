import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config/env.js";

const app = express();
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: { directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    "frame-src": ["'self'", "https://hanime.tv", "https:"],
    "img-src": ["'self'", "data:", "https:"],
    "media-src": ["'self'", "https:", "blob:"],
    "connect-src": ["'self'", "https:"],
  } }
}));
app.use(morgan("tiny"));
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "neon-live-wrapper", mode: "direct-embed" }));

const dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(dirname, "../../client/dist");
if (config.nodeEnv === "production") {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}
app.listen(config.port, () => console.log(`NEON LIVE listening on port ${config.port}`));
