const allowedProtocols = new Set(["https:", "http:"]);
export function isAllowedMediaUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return allowedProtocols.has(url.protocol) && !["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  } catch { return false; }
}
