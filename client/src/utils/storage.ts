const PREFIX = "neon-stream:";
export function readStringArray(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(PREFIX + key) || "[]");
    return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];
  } catch { return []; }
}
export function writeStringArray(key: string, values: string[]): void {
  try { localStorage.setItem(PREFIX + key, JSON.stringify([...new Set(values)])); } catch { /* storage can be unavailable */ }
}
