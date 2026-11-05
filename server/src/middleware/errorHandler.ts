import type { ErrorRequestHandler } from "express";
export const errorHandler: ErrorRequestHandler = (error: any, _req, res, _next) => {
  const status = Number(error?.statusCode) || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, error: status >= 500 ? "An unexpected server error occurred." : error.message });
};
