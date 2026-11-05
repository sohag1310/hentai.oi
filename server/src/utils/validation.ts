import { z } from "zod";
export const slugSchema = z.string().regex(/^[a-z0-9-]{1,100}$/i);
export const positiveIntSchema = z.coerce.number().int().positive().max(500).default(1);
export const languageSchema = z.enum(["hin", "eng", "sub"]).default("hin");
export function parseOrThrow<T>(schema: z.ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) throw Object.assign(new Error("Invalid request parameters"), { statusCode: 400 });
  return result.data;
}
