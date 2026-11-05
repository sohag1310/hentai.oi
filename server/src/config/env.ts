export const config = {
  port: Number(process.env.PORT || 4000),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
  cacheTtlMs: Number(process.env.CACHE_TTL_MS || 300000)
};
