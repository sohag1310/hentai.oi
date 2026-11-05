import type { Language } from "../types";
export const LANGUAGES: ReadonlyArray<{ code: Language; name: string }> = [
  { code: "hin", name: "Hindi" },
  { code: "eng", name: "English" },
  { code: "sub", name: "Japanese (Sub)" }
];
export const CATEGORIES = ["All", "Adventure", "Fantasy", "Sci-Fi", "Drama"] as const;
